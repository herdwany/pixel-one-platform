-- ============================================================
-- Migration 003: Add order lookup function for anonymous tracking
-- Allows users to look up their order by reference + email
-- without being authenticated.
-- Safe to run multiple times (CREATE OR REPLACE).
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

create or replace function public.lookup_order(p_ref text, p_email text)
returns setof public.orders
language sql
stable
security definer
as $$
  select o.*
  from public.orders o
  where o.order_ref = p_ref
    and (
      lower(trim(o.details->>'email')) = lower(trim(p_email))
      or exists (
        select 1 from auth.users u
        where u.id = o.user_id and lower(trim(u.email)) = lower(trim(p_email))
      )
    )
  limit 1;
$$;

-- Grant execute to authenticated and anonymous roles
grant execute on function public.lookup_order(text, text) to authenticated;
grant execute on function public.lookup_order(text, text) to anon;
