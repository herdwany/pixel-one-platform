-- ============================================================
-- Migration 003: Create blog_posts table
-- Run this in Supabase SQL Editor.
-- ============================================================

create table if not exists public.blog_posts (
  id           bigint primary key generated always as identity,
  title        text not null,
  slug         text not null unique,
  image_url    text,
  content      text not null,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-update updated_at on row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute procedure public.set_updated_at();

-- ── Row Level Security ───────────────────────────────────────
alter table public.blog_posts enable row level security;

-- Everyone can read published posts
create policy "Public can read published blog posts"
  on public.blog_posts for select
  using (is_published = true);

-- Admins can do everything
create policy "Admins full access to blog_posts"
  on public.blog_posts for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
