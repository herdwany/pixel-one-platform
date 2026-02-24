-- ============================================================
-- Migration 008: Full seed for services table
-- This inserts ALL services (active + coming soon) from scratch.
-- Safe to run multiple times — uses title-based idempotency.
-- Run this in the Supabase SQL Editor.
-- ============================================================

-- ── Step 1: Ensure migration 005 columns exist ─────────────
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_active        boolean NOT NULL DEFAULT true;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_coming_soon   boolean NOT NULL DEFAULT false;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS sort_order       integer NOT NULL DEFAULT 0;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS titles           jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features_i18n    jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS description      text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS descriptions     jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS delivery_time    text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS revisions        integer NOT NULL DEFAULT 0;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS updated_at       timestamptz NOT NULL DEFAULT now();

-- ── Step 2: Create unique constraint on title for upsert ────
-- (only if it doesn't exist yet)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'services_title_unique'
  ) THEN
    ALTER TABLE public.services ADD CONSTRAINT services_title_unique UNIQUE (title);
  END IF;
END $$;

-- ── Step 3: Upsert active services ─────────────────────────

-- 1) Montage Vidéo Pro
INSERT INTO public.services (title, category, price, image_url, features, is_active, is_coming_soon, sort_order, titles, descriptions, features_i18n, delivery_time, revisions)
VALUES (
  'Montage Vidéo Pro',
  'video',
  500,
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
  '["Jusqu''à 5 min", "Sous-titres inclus", "2 révisions", "Musique libre de droits"]'::jsonb,
  true,
  false,
  1,
  '{"fr": "Montage Vidéo Pro", "en": "Pro Video Editing", "ar": "مونتاج فيديو احترافي"}'::jsonb,
  '{"fr": "Montage professionnel pour vos vidéos courtes, réels et contenus sociaux.", "en": "Professional editing for your short videos, reels and social content.", "ar": "مونتاج احترافي لفيديوهاتك القصيرة وريلز ومحتوى السوشيال ميديا."}'::jsonb,
  '{"fr": ["Jusqu''à 5 min", "Sous-titres inclus", "2 révisions", "Musique libre de droits"], "en": ["Up to 5 min", "Subtitles included", "2 revisions", "Royalty-free music"], "ar": ["حتى 5 دقائق", "ترجمة مشمولة", "مراجعتان", "موسيقى بدون حقوق"]}'::jsonb,
  '48h',
  2
)
ON CONFLICT (title) DO UPDATE SET
  category      = EXCLUDED.category,
  price         = EXCLUDED.price,
  image_url     = EXCLUDED.image_url,
  features      = EXCLUDED.features,
  is_active     = EXCLUDED.is_active,
  is_coming_soon = EXCLUDED.is_coming_soon,
  sort_order    = EXCLUDED.sort_order,
  titles        = EXCLUDED.titles,
  descriptions  = EXCLUDED.descriptions,
  features_i18n = EXCLUDED.features_i18n,
  delivery_time = EXCLUDED.delivery_time,
  revisions     = EXCLUDED.revisions;

-- 2) Logo & Identité Visuelle
INSERT INTO public.services (title, category, price, image_url, features, is_active, is_coming_soon, sort_order, titles, descriptions, features_i18n, delivery_time, revisions)
VALUES (
  'Logo & Identité Visuelle',
  'design',
  800,
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
  '["3 concepts initiaux", "Fichiers SVG / PNG / PDF", "3 révisions", "Charte graphique"]'::jsonb,
  true,
  false,
  2,
  '{"fr": "Logo & Identité Visuelle", "en": "Logo & Visual Identity", "ar": "شعار وهوية بصرية"}'::jsonb,
  '{"fr": "Création de logo professionnel et identité visuelle complète pour votre marque.", "en": "Professional logo creation and complete visual identity for your brand.", "ar": "تصميم شعار احترافي وهوية بصرية كاملة لعلامتك التجارية."}'::jsonb,
  '{"fr": ["3 concepts initiaux", "Fichiers SVG / PNG / PDF", "3 révisions", "Charte graphique"], "en": ["3 initial concepts", "SVG / PNG / PDF files", "3 revisions", "Brand guidelines"], "ar": ["3 مفاهيم أولية", "ملفات SVG / PNG / PDF", "3 مراجعات", "دليل الهوية البصرية"]}'::jsonb,
  '72h',
  3
)
ON CONFLICT (title) DO UPDATE SET
  category      = EXCLUDED.category,
  price         = EXCLUDED.price,
  image_url     = EXCLUDED.image_url,
  features      = EXCLUDED.features,
  is_active     = EXCLUDED.is_active,
  is_coming_soon = EXCLUDED.is_coming_soon,
  sort_order    = EXCLUDED.sort_order,
  titles        = EXCLUDED.titles,
  descriptions  = EXCLUDED.descriptions,
  features_i18n = EXCLUDED.features_i18n,
  delivery_time = EXCLUDED.delivery_time,
  revisions     = EXCLUDED.revisions;

-- 3) Réels Instagram (x5)
INSERT INTO public.services (title, category, price, image_url, features, is_active, is_coming_soon, sort_order, titles, descriptions, features_i18n, delivery_time, revisions)
VALUES (
  'Réels Instagram (x5)',
  'video',
  1200,
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80',
  '["5 Réels 30 sec", "Musique licensiée", "Texte animé", "Format vertical optimisé"]'::jsonb,
  true,
  false,
  3,
  '{"fr": "Réels Instagram (x5)", "en": "Instagram Reels (x5)", "ar": "ريلز إنستغرام (×5)"}'::jsonb,
  '{"fr": "Pack de 5 réels Instagram dynamiques et engageants pour booster votre présence.", "en": "Pack of 5 dynamic and engaging Instagram reels to boost your presence.", "ar": "حزمة 5 ريلز إنستغرام ديناميكية وجذابة لتعزيز حضورك."}'::jsonb,
  '{"fr": ["5 Réels 30 sec", "Musique licensiée", "Texte animé", "Format vertical optimisé"], "en": ["5 Reels 30 sec", "Licensed music", "Animated text", "Optimized vertical format"], "ar": ["5 ريلز 30 ثانية", "موسيقى مرخصة", "نص متحرك", "تنسيق عمودي محسّن"]}'::jsonb,
  '72h',
  2
)
ON CONFLICT (title) DO UPDATE SET
  category      = EXCLUDED.category,
  price         = EXCLUDED.price,
  image_url     = EXCLUDED.image_url,
  features      = EXCLUDED.features,
  is_active     = EXCLUDED.is_active,
  is_coming_soon = EXCLUDED.is_coming_soon,
  sort_order    = EXCLUDED.sort_order,
  titles        = EXCLUDED.titles,
  descriptions  = EXCLUDED.descriptions,
  features_i18n = EXCLUDED.features_i18n,
  delivery_time = EXCLUDED.delivery_time,
  revisions     = EXCLUDED.revisions;

-- 4) Pack Social Media
INSERT INTO public.services (title, category, price, image_url, features, is_active, is_coming_soon, sort_order, titles, descriptions, features_i18n, delivery_time, revisions)
VALUES (
  'Pack Social Media',
  'design',
  600,
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
  '["20 visuels / mois", "Stories + Posts", "Calendrier éditorial", "Formats adaptés"]'::jsonb,
  true,
  false,
  4,
  '{"fr": "Pack Social Media", "en": "Social Media Pack", "ar": "باقة سوشيال ميديا"}'::jsonb,
  '{"fr": "20 visuels par mois pour vos réseaux sociaux avec un calendrier éditorial.", "en": "20 visuals per month for your social media with an editorial calendar.", "ar": "20 تصميم شهرياً لمواقع التواصل الاجتماعي مع تقويم تحريري."}'::jsonb,
  '{"fr": ["20 visuels / mois", "Stories + Posts", "Calendrier éditorial", "Formats adaptés"], "en": ["20 visuals / month", "Stories + Posts", "Editorial calendar", "Adapted formats"], "ar": ["20 تصميم / شهر", "ستوري + منشورات", "تقويم تحريري", "تنسيقات متوافقة"]}'::jsonb,
  '5 jours',
  2
)
ON CONFLICT (title) DO UPDATE SET
  category      = EXCLUDED.category,
  price         = EXCLUDED.price,
  image_url     = EXCLUDED.image_url,
  features      = EXCLUDED.features,
  is_active     = EXCLUDED.is_active,
  is_coming_soon = EXCLUDED.is_coming_soon,
  sort_order    = EXCLUDED.sort_order,
  titles        = EXCLUDED.titles,
  descriptions  = EXCLUDED.descriptions,
  features_i18n = EXCLUDED.features_i18n,
  delivery_time = EXCLUDED.delivery_time,
  revisions     = EXCLUDED.revisions;

-- ── Step 4: Upsert coming-soon services ─────────────────────

-- 5) Site Web Statique
INSERT INTO public.services (title, category, price, image_url, features, is_active, is_coming_soon, sort_order, titles, descriptions, features_i18n, delivery_time, revisions)
VALUES (
  'Site Web Statique',
  'web',
  2000,
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
  '["Design responsive", "SEO optimisé", "Hébergement inclus", "Formulaire de contact"]'::jsonb,
  false,
  true,
  10,
  '{"fr": "Site Web Statique", "en": "Static Website", "ar": "موقع ويب ثابت"}'::jsonb,
  '{"fr": "Site vitrine moderne et responsive pour présenter votre activité.", "en": "Modern and responsive showcase website to present your business.", "ar": "موقع عرض حديث ومتجاوب لتقديم نشاطك."}'::jsonb,
  '{"fr": ["Design responsive", "SEO optimisé", "Hébergement inclus", "Formulaire de contact"], "en": ["Responsive design", "SEO optimized", "Hosting included", "Contact form"], "ar": ["تصميم متجاوب", "SEO محسّن", "استضافة مشمولة", "نموذج تواصل"]}'::jsonb,
  NULL,
  0
)
ON CONFLICT (title) DO UPDATE SET
  category      = EXCLUDED.category,
  price         = EXCLUDED.price,
  image_url     = EXCLUDED.image_url,
  features      = EXCLUDED.features,
  is_active     = EXCLUDED.is_active,
  is_coming_soon = EXCLUDED.is_coming_soon,
  sort_order    = EXCLUDED.sort_order,
  titles        = EXCLUDED.titles,
  descriptions  = EXCLUDED.descriptions,
  features_i18n = EXCLUDED.features_i18n,
  delivery_time = EXCLUDED.delivery_time,
  revisions     = EXCLUDED.revisions;

-- 6) Landing Page
INSERT INTO public.services (title, category, price, image_url, features, is_active, is_coming_soon, sort_order, titles, descriptions, features_i18n, delivery_time, revisions)
VALUES (
  'Landing Page',
  'web',
  1500,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  '["Page unique optimisée", "A/B Testing", "Intégration analytics", "Design conversion-focused"]'::jsonb,
  false,
  true,
  11,
  '{"fr": "Landing Page", "en": "Landing Page", "ar": "صفحة هبوط"}'::jsonb,
  '{"fr": "Page d''atterrissage optimisée pour la conversion de vos campagnes.", "en": "Conversion-optimized landing page for your campaigns.", "ar": "صفحة هبوط محسّنة لتحويل حملاتك الإعلانية."}'::jsonb,
  '{"fr": ["Page unique optimisée", "A/B Testing", "Intégration analytics", "Design conversion-focused"], "en": ["Optimized single page", "A/B Testing", "Analytics integration", "Conversion-focused design"], "ar": ["صفحة واحدة محسّنة", "اختبار A/B", "تحليلات مدمجة", "تصميم موجه للتحويل"]}'::jsonb,
  NULL,
  0
)
ON CONFLICT (title) DO UPDATE SET
  category      = EXCLUDED.category,
  price         = EXCLUDED.price,
  image_url     = EXCLUDED.image_url,
  features      = EXCLUDED.features,
  is_active     = EXCLUDED.is_active,
  is_coming_soon = EXCLUDED.is_coming_soon,
  sort_order    = EXCLUDED.sort_order,
  titles        = EXCLUDED.titles,
  descriptions  = EXCLUDED.descriptions,
  features_i18n = EXCLUDED.features_i18n,
  delivery_time = EXCLUDED.delivery_time,
  revisions     = EXCLUDED.revisions;

-- 7) Application Web Sur-Mesure
INSERT INTO public.services (title, category, price, image_url, features, is_active, is_coming_soon, sort_order, titles, descriptions, features_i18n, delivery_time, revisions)
VALUES (
  'Application Web Sur-Mesure',
  'web',
  8000,
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
  '["Analyse des besoins", "UI/UX design", "Livraison + maintenance 3 mois", "Support dédié"]'::jsonb,
  false,
  true,
  12,
  '{"fr": "Application Web Sur-Mesure", "en": "Custom Web Application", "ar": "تطبيق ويب مخصص"}'::jsonb,
  '{"fr": "Application web complète développée sur mesure selon vos besoins.", "en": "Complete custom web application developed to your needs.", "ar": "تطبيق ويب كامل مطور حسب احتياجاتك."}'::jsonb,
  '{"fr": ["Analyse des besoins", "UI/UX design", "Livraison + maintenance 3 mois", "Support dédié"], "en": ["Requirements analysis", "UI/UX design", "Delivery + 3 months maintenance", "Dedicated support"], "ar": ["تحليل المتطلبات", "تصميم UI/UX", "تسليم + صيانة 3 أشهر", "دعم مخصص"]}'::jsonb,
  NULL,
  0
)
ON CONFLICT (title) DO UPDATE SET
  category      = EXCLUDED.category,
  price         = EXCLUDED.price,
  image_url     = EXCLUDED.image_url,
  features      = EXCLUDED.features,
  is_active     = EXCLUDED.is_active,
  is_coming_soon = EXCLUDED.is_coming_soon,
  sort_order    = EXCLUDED.sort_order,
  titles        = EXCLUDED.titles,
  descriptions  = EXCLUDED.descriptions,
  features_i18n = EXCLUDED.features_i18n,
  delivery_time = EXCLUDED.delivery_time,
  revisions     = EXCLUDED.revisions;

-- ── Verify ──────────────────────────────────────────────────
SELECT id, title, category, price, is_active, is_coming_soon, sort_order
FROM public.services
ORDER BY sort_order;
