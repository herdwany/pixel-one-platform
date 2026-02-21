-- ============================================================
-- Migration 002: Add order_ref and details columns to orders
-- Apply this in the Supabase SQL Editor on existing projects
-- where public.orders was created without these columns.
-- This script is idempotent and safe to re-run.
-- ============================================================

alter table public.orders
  add column if not exists order_ref text unique,
  add column if not exists details jsonb;

-- ── PostgREST schema cache ───────────────────────────────────
-- After running this migration, PostgREST may still report
-- "Could not find the 'order_ref' column" for a short period
-- while its schema cache refreshes.  The cache reloads
-- automatically every few seconds; you can also force a reload
-- from the Supabase Dashboard → API → Reload schema cache.
