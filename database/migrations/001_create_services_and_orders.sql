-- ============================================================
-- Migration 001: Create services and orders tables
-- Apply this in the Supabase SQL Editor if only public.profiles
-- exists and public.services / public.orders are missing.
-- ============================================================

-- ── services ────────────────────────────────────────────────
create table if not exists public.services (
  id         bigint primary key generated always as identity,
  title      text not null,
  category   text not null check (category in ('video', 'design', 'web')),
  price      numeric(10,2) not null,
  features   jsonb,
  image_url  text,
  created_at timestamptz not null default now()
);

-- ── orders ──────────────────────────────────────────────────
create table if not exists public.orders (
  id                 bigint primary key generated always as identity,
  order_ref          text not null unique,
  user_id            uuid references auth.users (id) on delete cascade,
  service_id         bigint references public.services (id) on delete set null,
  status             text not null default 'pending'
                       check (status in ('pending', 'in_progress', 'review', 'done')),
  details            jsonb,
  payment_proof_url  text,
  payment_proof_path text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- Auto-update updated_at on row change
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

-- ── Row Level Security ───────────────────────────────────────
alter table public.services enable row level security;
alter table public.orders   enable row level security;

drop policy if exists "services_select_all"   on public.services;
create policy "services_select_all" on public.services
  for select using (true);

drop policy if exists "services_admin_write"  on public.services;
create policy "services_admin_write" on public.services
  for all using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "orders_select_own"     on public.orders;
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id or user_id is null);

drop policy if exists "orders_insert_own"     on public.orders;
create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id or user_id is null);

drop policy if exists "orders_update_own"     on public.orders;
create policy "orders_update_own" on public.orders
  for update using (auth.uid() = user_id);

drop policy if exists "orders_admin_all"      on public.orders;
create policy "orders_admin_all" on public.orders
  for all using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ── Seed Services ────────────────────────────────────────────
insert into public.services (title, category, price, features, image_url) values
  (
    'Montage Vidéo Pro', 'video', 500,
    '["Jusqu''à 5 min","Sous-titres inclus","2 révisions"]',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80'
  ),
  (
    'Logo & Identité Visuelle', 'design', 800,
    '["3 concepts initiaux","Fichiers SVG / PNG / PDF","3 révisions"]',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80'
  ),
  (
    'Site Vitrine One-Page', 'web', 2000,
    '["Design responsive","Formulaire de contact","Hébergement 1 an offert"]',
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80'
  ),
  (
    'Réels Instagram (x5)', 'video', 1200,
    '["5 Réels 30 sec","Musique licensiée","Texte animé"]',
    'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80'
  ),
  (
    'Pack Social Media', 'design', 600,
    '["20 visuels / mois","Stories + Posts","Calendrier éditorial"]',
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80'
  ),
  (
    'Application Web Sur-Mesure', 'web', 8000,
    '["Analyse des besoins","UI/UX design","Livraison + maintenance 3 mois"]',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80'
  )
on conflict do nothing;
