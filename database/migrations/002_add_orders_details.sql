-- ============================================================
-- Migration 002: Add missing columns to orders table
-- Apply this in the Supabase SQL Editor if your orders table
-- was created manually and is missing columns required by the
-- frontend (e.g. details, order_ref, service_id, status, etc.).
-- All statements use ADD COLUMN IF NOT EXISTS and are idempotent.
-- ============================================================

-- Core reference / FK columns
alter table public.orders
  add column if not exists order_ref text unique;

alter table public.orders
  add column if not exists service_id bigint
    references public.services (id) on delete set null;

-- Status with allowed values
alter table public.orders
  add column if not exists status text not null default 'pending';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.orders'::regclass
      and conname   = 'orders_status_check'
  ) then
    alter table public.orders
      add constraint orders_status_check
        check (status in ('pending', 'in_progress', 'review', 'done'));
  end if;
end;
$$;

-- Dynamic form data (the column that triggers PGRST204 when absent)
alter table public.orders
  add column if not exists details jsonb not null default '{}'::jsonb;

-- Payment proof columns
alter table public.orders
  add column if not exists payment_proof_url  text;

alter table public.orders
  add column if not exists payment_proof_path text;

-- Audit timestamps
alter table public.orders
  add column if not exists created_at timestamptz not null default now();

alter table public.orders
  add column if not exists updated_at timestamptz not null default now();

-- Auto-update updated_at trigger (safe to re-create)
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

-- Notify PostgREST to reload its schema cache so the new columns
-- are visible immediately without a server restart.
notify pgrst, 'reload schema';
