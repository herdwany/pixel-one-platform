-- ============================================================
-- Migration 009: Blog CMS Enhancement
-- Adds video_url, view_count to blog_posts
-- Creates blog_comments table with rating & admin_reply
-- ============================================================

-- ── Add new columns to blog_posts ────────────────────────────
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- ── Create blog_comments table ───────────────────────────────
CREATE TABLE IF NOT EXISTS blog_comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT FALSE,
  admin_reply TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_approved ON blog_comments(is_approved);

-- ── RLS Policies ─────────────────────────────────────────────
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved comments
CREATE POLICY "Public can read approved comments"
  ON blog_comments FOR SELECT
  USING (is_approved = true);

-- Anyone can insert comments (they start unapproved)
CREATE POLICY "Anyone can submit comments"
  ON blog_comments FOR INSERT
  WITH CHECK (is_approved = false);

-- Admin can do everything with comments
CREATE POLICY "Admin full access to comments"
  ON blog_comments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Allow anon to update view_count on blog_posts
CREATE POLICY "Anyone can increment view count"
  ON blog_posts FOR UPDATE
  USING (is_published = true)
  WITH CHECK (is_published = true);
