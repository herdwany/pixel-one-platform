-- ============================================================
-- Migration 002: Add service_id column to public.orders
-- Apply this in the Supabase SQL Editor if public.orders
-- exists but is missing the service_id foreign key column.
-- Safe to run multiple times (uses IF NOT EXISTS / DO block).
-- ============================================================

-- 1. Add the column (no-op if it already exists)
alter table public.orders
  add column if not exists service_id bigint;

-- 2. Add the foreign key constraint (no-op if it already exists)
do $$
begin
  if not exists (
    select 1
    from   information_schema.table_constraints tc
    join   information_schema.key_column_usage  kcu
           on  tc.constraint_name = kcu.constraint_name
           and tc.table_schema    = kcu.table_schema
    where  tc.constraint_type = 'FOREIGN KEY'
    and    tc.table_schema    = 'public'
    and    tc.table_name      = 'orders'
    and    kcu.column_name    = 'service_id'
  ) then
    alter table public.orders
      add constraint orders_service_id_fkey
      foreign key (service_id)
      references public.services (id)
      on delete set null;
  end if;
end;
$$;

-- ── Note on Supabase schema cache ──────────────────────────
-- After running this migration the PostgREST schema cache may
-- take up to 60 seconds to refresh.  If you still see a
-- PGRST204 ("Could not find the 'service_id' column") error
-- immediately afterwards, wait one minute and retry, or go to
-- Settings → API → Reload schema cache.
-- ============================================================
