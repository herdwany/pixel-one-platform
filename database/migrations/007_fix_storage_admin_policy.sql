-- ============================================================
-- Migration 007: Fix Storage Admin Policy for Payment Proofs
-- 
-- Problem: The admin SELECT policy on storage.objects uses a
-- direct subquery on `profiles` which is itself gated by RLS,
-- causing the same recursion issue fixed in migration 006.
-- This migration replaces the storage policy to use the
-- `public.is_admin()` SECURITY DEFINER helper function.
-- ============================================================

-- Ensure is_admin() exists (safe to re-create)
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

-- ── Fix admin SELECT policy on storage.objects ──────────────
DROP POLICY IF EXISTS "payment_proofs_admin_select" ON storage.objects;
CREATE POLICY "payment_proofs_admin_select" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'payment-proofs'
    AND public.is_admin()
  );

-- ── Done ────────────────────────────────────────────────────
-- After running this, admin users should be able to create
-- signed URLs for payment proof files without 400 errors.
