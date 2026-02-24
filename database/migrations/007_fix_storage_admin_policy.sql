-- ============================================================
-- Migration 007: Fix RLS Recursion & Storage Admin Policy
--
-- Problem 1: Migration 006 set profiles_admin_all to use
--   is_admin(), but is_admin() queries profiles → infinite
--   recursion. PostgreSQL CAN resolve inline subqueries
--   (via profiles_select_own) but CANNOT see through functions.
--
-- Problem 2: Storage admin SELECT policy on payment-proofs
--   used an inline subquery on profiles, also causing recursion.
--
-- Fix: Revert profiles policy to inline subquery (PostgreSQL
--   resolves it via the profiles_select_own non-recursive path),
--   and keep is_admin() only for non-profiles tables (orders,
--   services, storage).
-- ============================================================

-- ── 1. Ensure is_admin() exists ─────────────────────────────
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

-- ── 2. Fix profiles admin policy (revert to inline subquery) ─
--   PostgreSQL can resolve self-referencing inline subqueries
--   because profiles_select_own (auth.uid() = id) provides
--   a non-recursive evaluation path for the current user's row.
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ── 3. Fix storage admin SELECT policy ──────────────────────
DROP POLICY IF EXISTS "payment_proofs_admin_select" ON storage.objects;
CREATE POLICY "payment_proofs_admin_select" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'payment-proofs'
    AND public.is_admin()
  );

-- ── Done ────────────────────────────────────────────────────
-- profiles → inline subquery (no recursion, PG resolves it)
-- orders/services/storage → is_admin() function (no recursion,
--   different table context)
