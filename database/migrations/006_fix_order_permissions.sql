-- ============================================================
-- Migration 006: Fix Order Permissions for Admin
-- Run this in Supabase SQL Editor.
--
-- Problem: Admin users cannot UPDATE/DELETE orders because the
-- RLS subquery on `profiles` is itself gated by RLS, causing
-- permission recursion. This migration:
--   1. Creates a SECURITY DEFINER helper `public.is_admin()`
--      that bypasses RLS on profiles.
--   2. Drops existing restrictive policies on `orders`.
--   3. Creates explicit admin policies for SELECT, UPDATE, DELETE.
--   4. Grants admin SELECT on all relevant tables.
-- ============================================================

-- ── 1. Helper function (bypasses RLS on profiles) ───────────
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

-- ── 2. Drop existing order policies ─────────────────────────
DROP POLICY IF EXISTS "orders_select_own"   ON public.orders;
DROP POLICY IF EXISTS "orders_insert_own"   ON public.orders;
DROP POLICY IF EXISTS "orders_update_own"   ON public.orders;
DROP POLICY IF EXISTS "orders_admin_all"    ON public.orders;
DROP POLICY IF EXISTS "orders_admin_select" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_update" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_delete" ON public.orders;

-- ── 3. Recreate client policies ─────────────────────────────
-- Clients can see their own orders (+ anonymous orders)
CREATE POLICY "orders_select_own" ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Clients can create orders for themselves
CREATE POLICY "orders_insert_own" ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Clients can update their own orders (e.g. adding payment proof)
CREATE POLICY "orders_update_own" ON public.orders
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── 4. Explicit admin policies (using is_admin()) ───────────
-- Admin: SELECT all orders
CREATE POLICY "orders_admin_select" ON public.orders
  FOR SELECT
  USING (public.is_admin());

-- Admin: UPDATE any order (status changes, etc.)
CREATE POLICY "orders_admin_update" ON public.orders
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admin: DELETE any order
CREATE POLICY "orders_admin_delete" ON public.orders
  FOR DELETE
  USING (public.is_admin());

-- Admin: INSERT orders on behalf of clients
CREATE POLICY "orders_admin_insert" ON public.orders
  FOR INSERT
  WITH CHECK (public.is_admin());

-- ── 5. Fix admin policies on other tables too ───────────────
-- profiles: replace the admin policy to use is_admin()
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- services: replace admin write policy
DROP POLICY IF EXISTS "services_admin_write" ON public.services;
CREATE POLICY "services_admin_write" ON public.services
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── Done ────────────────────────────────────────────────────
-- Verify: SELECT public.is_admin();  -- should return true for admin users
