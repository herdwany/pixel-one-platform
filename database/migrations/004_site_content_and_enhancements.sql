-- ============================================================
-- Migration 004: Site Content Management + Service Enhancements
-- Run this in Supabase SQL Editor
-- ============================================================

-- ── Add i18n and description columns to services ────────────
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS titles jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS features_i18n jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

-- ── Add columns to blog_posts for richer content ────────────
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS excerpt text,
  ADD COLUMN IF NOT EXISTS author text DEFAULT 'Pixel One';

-- ── Site Content table for page customization ───────────────
CREATE TABLE IF NOT EXISTS public.site_content (
  id          bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  page        text NOT NULL,
  section     text NOT NULL,
  content_key text NOT NULL,
  value_fr    text,
  value_en    text,
  value_ar    text,
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(page, section, content_key)
);

-- RLS for site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read site_content
DROP POLICY IF EXISTS "site_content_select_all" ON public.site_content;
CREATE POLICY "site_content_select_all" ON public.site_content
  FOR SELECT USING (true);

-- Only admin can write site_content
DROP POLICY IF EXISTS "site_content_admin_write" ON public.site_content;
CREATE POLICY "site_content_admin_write" ON public.site_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Auto-update updated_at on site_content
CREATE OR REPLACE FUNCTION public.set_site_content_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS site_content_updated_at ON public.site_content;
CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE PROCEDURE public.set_site_content_updated_at();

-- ── Seed default site content ───────────────────────────────
INSERT INTO public.site_content (page, section, content_key, value_fr, value_en, value_ar) VALUES
  -- Home Hero
  ('home', 'hero', 'badge', 'Agence Créative — Maroc 🇲🇦', 'Creative Agency — Morocco 🇲🇦', 'وكالة إبداعية — المغرب 🇲🇦'),
  ('home', 'hero', 'title', 'Votre vision,', 'Your vision,', 'رؤيتك،'),
  ('home', 'hero', 'title_accent', 'amplifiée.', 'amplified.', 'مضاعفة.'),
  ('home', 'hero', 'description', 'Design, vidéo et développement web premium pour les marques ambitieuses.', 'Premium design, video, and web development for ambitious brands.', 'تصميم وفيديو وتطوير ويب متميز للعلامات التجارية الطموحة.'),
  ('home', 'hero', 'cta_primary', 'Voir les services', 'View services', 'عرض الخدمات'),
  ('home', 'hero', 'cta_secondary', 'Créer un compte', 'Create an account', 'إنشاء حساب'),
  -- Home Stats
  ('home', 'stats', 'projects_count', '150+', '150+', '+150'),
  ('home', 'stats', 'clients_pct', '98%', '98%', '٪98'),
  ('home', 'stats', 'delay', '72h', '72h', '72 ساعة'),
  ('home', 'stats', 'rating', '5★', '5★', '★5'),
  -- Home Why Us
  ('home', 'why', 'title', 'Pourquoi', 'Why', 'لماذا'),
  ('home', 'why', 'title_accent', 'Pixel One', 'Pixel One', 'Pixel One'),
  ('home', 'why', 'description', 'Un processus simple, transparent et efficace.', 'A simple, transparent, and efficient process.', 'عملية بسيطة وشفافة وفعالة.'),
  -- Home Contact
  ('home', 'contact', 'title', 'Prêt à démarrer votre', 'Ready to start your', 'مستعد لبدء'),
  ('home', 'contact', 'title_accent', 'projet', 'project', 'مشروعك'),
  ('home', 'contact', 'description', 'Notre équipe est disponible du lundi au vendredi, 9h–18h.', 'Our team is available Monday to Friday, 9am–6pm.', 'فريقنا متاح من الإثنين إلى الجمعة، 9 صباحاً - 6 مساءً.')
ON CONFLICT (page, section, content_key) DO NOTHING;

-- ── Add admin delete policy for orders ──────────────────────
DROP POLICY IF EXISTS "orders_admin_delete" ON public.orders;
CREATE POLICY "orders_admin_delete" ON public.orders
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );
