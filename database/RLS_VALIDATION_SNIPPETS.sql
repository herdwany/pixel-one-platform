-- ============================================================
-- Pixel One - RLS Validation Snippets (Production Hardening)
-- Run in Supabase SQL Editor after applying migrations 001-014
-- ============================================================

-- 1) Verify policies existence for critical tables
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('orders', 'blog_comments', 'comment_likes', 'notifications', 'profiles', 'system_logs')
ORDER BY tablename, policyname;

-- 2) Confirm notifications table has no broad public INSERT policy
SELECT policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'notifications'
ORDER BY policyname;

-- 3) Verify order_ref trigger and function are present
SELECT tgname AS trigger_name, tgenabled, pg_get_triggerdef(oid)
FROM pg_trigger
WHERE tgrelid = 'public.orders'::regclass
  AND NOT tgisinternal;

SELECT proname, pg_get_functiondef(p.oid)
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND proname IN ('generate_order_ref', 'set_order_ref_trigger', 'notify_on_reply_or_like', 'notify_on_order_status_change');

-- 4) Verify rate limit logs and system logs tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('request_logs', 'system_logs', 'roles');

-- 5) Verify blog search vector index
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = 'blog_posts'
  AND indexname = 'blog_search_idx';

-- 6) Quick smoke checks (run as authenticated user through app):
-- - Submit comment: should insert with is_approved = false
-- - Like comment > 10 times/min: should fail with rate limit
-- - Attempt direct notification insert from client: should fail by RLS
