-- Ensure seeded demo posts have complete media (image + video)

UPDATE public.blog_posts
SET video_url = COALESCE(video_url, 'https://www.youtube.com/watch?v=ScMzIvxBSi4')
WHERE slug = 'design-system-unify-ui-brand-performance';

UPDATE public.blog_posts
SET image_url = COALESCE(image_url, 'https://via.placeholder.com/1400x700?text=Pixel+One')
WHERE image_url IS NULL OR btrim(image_url) = '';
