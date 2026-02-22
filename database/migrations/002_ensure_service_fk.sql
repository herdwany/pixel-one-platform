-- ============================================================
-- Migration 002: Ensure FK between orders.service_id and services
-- Created: 2026-02-22
-- Safe to run multiple times (idempotent).
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- 1. Ensure the service_id column exists (no-op if already present)
alter table public.orders
  add column if not exists service_id bigint;

-- 2. Add the FK constraint only if it is not already present
do $$
begin
  if not exists (
    select 1
    from   information_schema.table_constraints tc
    join   information_schema.key_column_usage   kcu
           on  kcu.constraint_name   = tc.constraint_name
           and kcu.constraint_schema = tc.constraint_schema
    where  tc.constraint_type  = 'FOREIGN KEY'
    and    tc.table_schema      = 'public'
    and    tc.table_name        = 'orders'
    and    kcu.column_name      = 'service_id'
  ) then
    alter table public.orders
      add constraint orders_service_id_fkey
      foreign key (service_id)
      references public.services (id)
      on delete set null;
  end if;
end;
$$;

-- 3. Useful index for join performance (idempotent)
create index if not exists orders_service_id_idx on public.orders (service_id);

-- ── Note ──────────────────────────────────────────────────────
-- After running this migration, go to:
--   Supabase Dashboard → Settings → API → "Reload schema cache"
-- or wait up to 60 s for PostgREST to auto-refresh.
-- This resolves the error:
--   "Could not find a relationship between 'orders' and 'services'
--    in the schema cache"
-- ============================================================
