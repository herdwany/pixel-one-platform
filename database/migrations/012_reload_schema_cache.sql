-- ============================================================
-- Migration 012: Reload PostgREST Schema Cache
-- Run this in Supabase SQL Editor to fix:
--   "Could not find the 'author_name' column of 'blog_comments' in the schema cache"
-- ============================================================

-- This notifies PostgREST to reload its schema cache
-- so it picks up any new/modified tables and columns
NOTIFY pgrst, 'reload schema';

-- Verify blog_comments table has the expected columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'blog_comments'
      AND column_name = 'author_name'
  ) THEN
    RAISE NOTICE 'Column author_name does not exist — creating blog_comments table...';
    
    CREATE TABLE IF NOT EXISTS public.blog_comments (
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

    CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
    CREATE INDEX IF NOT EXISTS idx_blog_comments_approved ON blog_comments(is_approved);

    ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Public can read approved comments"
      ON blog_comments FOR SELECT
      USING (is_approved = true);

    CREATE POLICY "Anyone can submit comments"
      ON blog_comments FOR INSERT
      WITH CHECK (is_approved = false);

    CREATE POLICY "Admin full access to comments"
      ON blog_comments FOR ALL
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
          AND profiles.role = 'admin'
        )
      );

    -- Reload schema again after creating table
    NOTIFY pgrst, 'reload schema';
  ELSE
    RAISE NOTICE 'blog_comments.author_name exists — schema cache reloaded.';
  END IF;
END $$;
