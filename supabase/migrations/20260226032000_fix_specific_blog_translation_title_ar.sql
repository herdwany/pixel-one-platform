-- Backfill known untranslated Arabic title for specific imported post

UPDATE public.blog_posts
SET title_ar = 'أفضل 30 تصميم مدونة سيلهمك في 2026'
WHERE slug = '30-best-blog-designs-that-will-inspire-you-in-2026'
  AND (title_ar IS NULL OR btrim(title_ar) = '' OR lower(title_ar) = lower(title_en));
