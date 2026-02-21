-- ============================================================
-- Migration: Bring public.orders up to the current schema
-- Safe to run on any project, even one that already has some
-- of these columns – every statement uses IF NOT EXISTS.
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- Add all columns that may be missing from older deployments
alter table public.orders
  add column if not exists order_ref          text,
  add column if not exists service_id         bigint references public.services (id) on delete set null,
  add column if not exists details            jsonb,
  add column if not exists payment_proof_url  text,
  add column if not exists payment_proof_path text;

-- Ensure order_ref has a unique index (idempotent)
create unique index if not exists orders_order_ref_key on public.orders (order_ref);

-- Ensure the updated_at trigger exists
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

-- ── Note on Supabase schema cache ──────────────────────────
-- After running this migration, the PostgREST schema cache may
-- take up to 60 seconds to refresh.  If you still see a
-- PGRST204 error immediately afterwards, wait one minute and
-- retry, or go to Settings → API → Reload schema cache.
-- ============================================================
