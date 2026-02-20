-- ============================================================
-- Migration: Add payment_proof_path column to orders table
-- Run this in the Supabase SQL Editor on existing projects.
-- ============================================================

alter table public.orders
  add column if not exists payment_proof_path text;
