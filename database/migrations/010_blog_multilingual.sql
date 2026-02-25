-- ============================================================
-- Migration 010: Add multilingual columns to blog_posts
-- Adds title_en, title_ar, content_en, content_ar
-- Run this in Supabase SQL Editor.
-- ============================================================

-- ── Add English translation columns ─────────────────────────
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_en TEXT;

-- ── Add Arabic translation columns ──────────────────────────
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_ar TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_ar TEXT;
