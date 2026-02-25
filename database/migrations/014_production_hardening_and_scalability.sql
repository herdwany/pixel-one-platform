-- ============================================================
-- Migration 014: Production hardening + scalability foundation
-- ============================================================

-- ── Admin helper functions (safe for RLS checks) ─────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.has_role(required_role text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = required_role
  );
$$;

-- ── 1) Order reference generation in DB (no client generation) ───
CREATE OR REPLACE FUNCTION public.generate_order_ref()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  ref text;
BEGIN
  ref := 'PX-' || upper(substr(md5(random()::text), 1, 6));
  RETURN ref;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_order_ref_trigger()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_ref IS NULL OR btrim(NEW.order_ref) = '' THEN
    LOOP
      NEW.order_ref := public.generate_order_ref();
      EXIT WHEN NOT EXISTS (
        SELECT 1 FROM public.orders o WHERE o.order_ref = NEW.order_ref
      );
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_order_ref ON public.orders;
CREATE TRIGGER set_order_ref
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.order_ref IS NULL OR btrim(NEW.order_ref) = '')
  EXECUTE FUNCTION public.set_order_ref_trigger();

CREATE UNIQUE INDEX IF NOT EXISTS orders_order_ref_key ON public.orders(order_ref);

-- ── 2) Blog comments: moderation first + safer policies ───────────
ALTER TABLE public.blog_comments
  ALTER COLUMN is_approved SET DEFAULT false;

-- Ensure reply/likes IDs are aligned with BIGINT comments PK
ALTER TABLE public.blog_comments
  ALTER COLUMN parent_id TYPE bigint USING NULLIF(parent_id::text, '')::bigint;

ALTER TABLE public.comment_likes
  ALTER COLUMN comment_id TYPE bigint USING NULLIF(comment_id::text, '')::bigint;

DROP POLICY IF EXISTS "Anyone can submit comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Public can read approved comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Admin full access to comments" ON public.blog_comments;
DROP POLICY IF EXISTS "blog_comments_public_read_approved" ON public.blog_comments;
DROP POLICY IF EXISTS "blog_comments_insert_unapproved" ON public.blog_comments;
DROP POLICY IF EXISTS "blog_comments_admin_all" ON public.blog_comments;
DROP POLICY IF EXISTS "blog_comments_moderation_roles" ON public.blog_comments;

CREATE POLICY "blog_comments_public_read_approved" ON public.blog_comments
  FOR SELECT
  USING (is_approved = true OR public.is_admin() OR public.has_role('moderator'));

CREATE POLICY "blog_comments_insert_unapproved" ON public.blog_comments
  FOR INSERT
  WITH CHECK (coalesce(is_approved, false) = false);

CREATE POLICY "blog_comments_moderation_roles" ON public.blog_comments
  FOR UPDATE
  USING (public.is_admin() OR public.has_role('moderator'))
  WITH CHECK (public.is_admin() OR public.has_role('moderator'));

CREATE POLICY "blog_comments_admin_delete" ON public.blog_comments
  FOR DELETE
  USING (public.is_admin() OR public.has_role('moderator'));

-- ── 3) Lock down notifications + system-generated triggers only ───
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notifications_insert_auth" ON public.notifications;
DROP POLICY IF EXISTS "notifications_insert_admin" ON public.notifications;

CREATE POLICY "notifications_insert_admin" ON public.notifications
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Keep read/update own and admin-all compatibility
DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "notifications_update_own" ON public.notifications;
CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "notifications_admin_all" ON public.notifications;
CREATE POLICY "notifications_admin_all" ON public.notifications
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.notify_on_reply_or_like()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  parent_user_id uuid;
  actor_name text;
BEGIN
  IF TG_TABLE_NAME = 'blog_comments' THEN
    IF NEW.parent_id IS NULL OR NEW.user_id IS NULL THEN
      RETURN NEW;
    END IF;

    SELECT c.user_id INTO parent_user_id
    FROM public.blog_comments c
    WHERE c.id = NEW.parent_id;

    IF parent_user_id IS NULL OR parent_user_id = NEW.user_id THEN
      RETURN NEW;
    END IF;

    SELECT coalesce(p.full_name, 'Un utilisateur') INTO actor_name
    FROM public.profiles p
    WHERE p.id = NEW.user_id;

    INSERT INTO public.notifications(user_id, type, message)
    VALUES (parent_user_id, 'reply', actor_name || ' a répondu à votre commentaire.');

    RETURN NEW;
  END IF;

  IF TG_TABLE_NAME = 'comment_likes' THEN
    SELECT c.user_id INTO parent_user_id
    FROM public.blog_comments c
    WHERE c.id = NEW.comment_id;

    IF parent_user_id IS NULL OR parent_user_id = NEW.user_id THEN
      RETURN NEW;
    END IF;

    SELECT coalesce(p.full_name, 'Un utilisateur') INTO actor_name
    FROM public.profiles p
    WHERE p.id = NEW.user_id;

    INSERT INTO public.notifications(user_id, type, message)
    VALUES (parent_user_id, 'like', actor_name || ' a aimé votre commentaire.');

    RETURN NEW;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_on_reply ON public.blog_comments;
CREATE TRIGGER trg_notify_on_reply
  AFTER INSERT ON public.blog_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_reply_or_like();

DROP TRIGGER IF EXISTS trg_notify_on_like ON public.comment_likes;
CREATE TRIGGER trg_notify_on_like
  AFTER INSERT ON public.comment_likes
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_reply_or_like();

CREATE OR REPLACE FUNCTION public.notify_on_order_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NOT NULL AND OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.notifications(user_id, type, message)
    VALUES (
      NEW.user_id,
      'order_update',
      'La commande ' || coalesce(NEW.order_ref, '') || ' est passée au statut: ' || NEW.status
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_on_order_status_change ON public.orders;
CREATE TRIGGER trg_notify_on_order_status_change
  AFTER UPDATE OF status ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_order_status_change();

-- ── 4) Rate limiting table + triggers ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.request_logs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  action text NOT NULL,
  identifier text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_request_logs_lookup
  ON public.request_logs(action, identifier, created_at DESC);

CREATE OR REPLACE FUNCTION public.enforce_rate_limit(
  p_action text,
  p_identifier text,
  p_max integer,
  p_window_seconds integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count integer;
BEGIN
  SELECT count(*)::int INTO current_count
  FROM public.request_logs
  WHERE action = p_action
    AND identifier = p_identifier
    AND created_at > now() - make_interval(secs => p_window_seconds);

  IF current_count >= p_max THEN
    RAISE EXCEPTION 'Rate limit exceeded for %', p_action
      USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.request_logs(action, identifier)
  VALUES (p_action, p_identifier);
END;
$$;

CREATE OR REPLACE FUNCTION public.enforce_comment_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  identifier text;
BEGIN
  identifier := coalesce(NEW.user_id::text, lower(trim(NEW.author_email)), 'anon');
  PERFORM public.enforce_rate_limit('blog_comment', identifier, 5, 60);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.enforce_like_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM public.enforce_rate_limit('comment_like', coalesce(NEW.user_id::text, 'anon'), 10, 60);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_comments_rate_limit ON public.blog_comments;
CREATE TRIGGER trg_comments_rate_limit
  BEFORE INSERT ON public.blog_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_comment_rate_limit();

DROP TRIGGER IF EXISTS trg_likes_rate_limit ON public.comment_likes;
CREATE TRIGGER trg_likes_rate_limit
  BEFORE INSERT ON public.comment_likes
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_like_rate_limit();

-- ── 5) Performance indexes ────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_post_id ON public.blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);

-- ── 6) Full-text search for blog posts ────────────────────────────
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS search_vector tsvector;

CREATE INDEX IF NOT EXISTS blog_search_idx
  ON public.blog_posts USING GIN(search_vector);

CREATE OR REPLACE FUNCTION public.update_blog_search_vector()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.title_en, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.title_ar, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.content, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(NEW.content_en, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(NEW.content_ar, '')), 'B');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_blog_search_vector ON public.blog_posts;
CREATE TRIGGER trg_blog_search_vector
  BEFORE INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_search_vector();

UPDATE public.blog_posts
SET search_vector =
  setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('simple', coalesce(title_en, '')), 'A') ||
  setweight(to_tsvector('simple', coalesce(title_ar, '')), 'A') ||
  setweight(to_tsvector('simple', coalesce(content, '')), 'B') ||
  setweight(to_tsvector('simple', coalesce(content_en, '')), 'B') ||
  setweight(to_tsvector('simple', coalesce(content_ar, '')), 'B')
WHERE search_vector IS NULL;

-- ── 7) Granular role foundation (backward compatible) ─────────────
CREATE TABLE IF NOT EXISTS public.roles (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  code text UNIQUE NOT NULL,
  label text NOT NULL
);

INSERT INTO public.roles(code, label)
VALUES
  ('admin', 'Administrator'),
  ('editor', 'Editor'),
  ('moderator', 'Moderator'),
  ('client', 'Client')
ON CONFLICT (code) DO NOTHING;

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('admin', 'editor', 'moderator', 'client'));

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role_id bigint REFERENCES public.roles(id);

UPDATE public.profiles p
SET role_id = r.id
FROM public.roles r
WHERE r.code = p.role
  AND (p.role_id IS NULL OR p.role_id <> r.id);

-- Editors can manage blog posts only
DROP POLICY IF EXISTS "blog_posts_editor_manage" ON public.blog_posts;
CREATE POLICY "blog_posts_editor_manage" ON public.blog_posts
  FOR ALL
  USING (public.is_admin() OR public.has_role('editor'))
  WITH CHECK (public.is_admin() OR public.has_role('editor'));

-- Moderators can manage comments (already added above)

-- ── 8) System logging table for security + ops events ──────────────
CREATE TABLE IF NOT EXISTS public.system_logs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  level text NOT NULL CHECK (level IN ('info', 'warn', 'error')),
  message text NOT NULL,
  context jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_system_logs_level_created
  ON public.system_logs(level, created_at DESC);

ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "system_logs_admin_all" ON public.system_logs;
CREATE POLICY "system_logs_admin_all" ON public.system_logs
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
