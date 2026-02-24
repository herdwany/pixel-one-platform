-- ============================================================
-- Migration 005: Service enhancements
-- Adds: is_active, is_coming_soon, sort_order, titles (JSONB),
--        features_i18n (JSONB), description, delivery_time, revisions
-- ============================================================

-- ── New columns ─────────────────────────────────────────────
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

-- Allow 'coming_soon' as a virtual category indicator
ALTER TABLE public.services DROP CONSTRAINT IF EXISTS services_category_check;
ALTER TABLE public.services ADD CONSTRAINT services_category_check
  CHECK (category IN ('video', 'design', 'web'));

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_services_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS services_updated_at ON public.services;
CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE PROCEDURE public.set_services_updated_at();

-- ── Seed updated services (upsert) ─────────────────────────
-- Delete old web services
DELETE FROM public.services WHERE category = 'web';

-- Update existing design/video services with enhanced data
UPDATE public.services SET
  is_active = true,
  is_coming_soon = false,
  sort_order = 1,
  titles = '{"fr": "Montage Vidéo Pro", "en": "Pro Video Editing", "ar": "مونتاج فيديو احترافي"}',
  descriptions = '{"fr": "Montage professionnel pour vos vidéos courtes, réels et contenus sociaux.", "en": "Professional editing for your short videos, reels and social content.", "ar": "مونتاج احترافي لفيديوهاتك القصيرة وريلز ومحتوى السوشيال ميديا."}',
  features_i18n = '{"fr": ["Jusqu''à 5 min", "Sous-titres inclus", "2 révisions", "Musique libre de droits"], "en": ["Up to 5 min", "Subtitles included", "2 revisions", "Royalty-free music"], "ar": ["حتى 5 دقائق", "ترجمة مشمولة", "مراجعتان", "موسيقى بدون حقوق"]}',
  delivery_time = '48h',
  revisions = 2
WHERE title = 'Montage Vidéo Pro';

UPDATE public.services SET
  is_active = true,
  is_coming_soon = false,
  sort_order = 2,
  titles = '{"fr": "Logo & Identité Visuelle", "en": "Logo & Visual Identity", "ar": "شعار وهوية بصرية"}',
  descriptions = '{"fr": "Création de logo professionnel et identité visuelle complète pour votre marque.", "en": "Professional logo creation and complete visual identity for your brand.", "ar": "تصميم شعار احترافي وهوية بصرية كاملة لعلامتك التجارية."}',
  features_i18n = '{"fr": ["3 concepts initiaux", "Fichiers SVG / PNG / PDF", "3 révisions", "Charte graphique"], "en": ["3 initial concepts", "SVG / PNG / PDF files", "3 revisions", "Brand guidelines"], "ar": ["3 مفاهيم أولية", "ملفات SVG / PNG / PDF", "3 مراجعات", "دليل الهوية البصرية"]}',
  delivery_time = '72h',
  revisions = 3
WHERE title = 'Logo & Identité Visuelle';

UPDATE public.services SET
  is_active = true,
  is_coming_soon = false,
  sort_order = 3,
  titles = '{"fr": "Réels Instagram (x5)", "en": "Instagram Reels (x5)", "ar": "ريلز إنستغرام (×5)"}',
  descriptions = '{"fr": "Pack de 5 réels Instagram dynamiques et engageants pour booster votre présence.", "en": "Pack of 5 dynamic and engaging Instagram reels to boost your presence.", "ar": "حزمة 5 ريلز إنستغرام ديناميكية وجذابة لتعزيز حضورك."}',
  features_i18n = '{"fr": ["5 Réels 30 sec", "Musique licensiée", "Texte animé", "Format vertical optimisé"], "en": ["5 Reels 30 sec", "Licensed music", "Animated text", "Optimized vertical format"], "ar": ["5 ريلز 30 ثانية", "موسيقى مرخصة", "نص متحرك", "تنسيق عمودي محسّن"]}',
  delivery_time = '72h',
  revisions = 2
WHERE title = 'Réels Instagram (x5)';

UPDATE public.services SET
  is_active = true,
  is_coming_soon = false,
  sort_order = 4,
  titles = '{"fr": "Pack Social Media", "en": "Social Media Pack", "ar": "باقة سوشيال ميديا"}',
  descriptions = '{"fr": "20 visuels par mois pour vos réseaux sociaux avec un calendrier éditorial.", "en": "20 visuals per month for your social media with an editorial calendar.", "ar": "20 تصميم شهرياً لمواقع التواصل الاجتماعي مع تقويم تحريري."}',
  features_i18n = '{"fr": ["20 visuels / mois", "Stories + Posts", "Calendrier éditorial", "Formats adaptés"], "en": ["20 visuals / month", "Stories + Posts", "Editorial calendar", "Adapted formats"], "ar": ["20 تصميم / شهر", "ستوري + منشورات", "تقويم تحريري", "تنسيقات متوافقة"]}',
  delivery_time = '5 jours',
  revisions = 2
WHERE title = 'Pack Social Media';

-- Insert Coming Soon services
INSERT INTO public.services (title, category, price, features, image_url, is_active, is_coming_soon, sort_order, titles, descriptions, features_i18n, delivery_time, revisions)
VALUES
  (
    'Site Web Statique', 'web', 2000,
    '["Design responsive", "SEO optimisé", "Hébergement inclus"]',
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
    false, true, 10,
    '{"fr": "Site Web Statique", "en": "Static Website", "ar": "موقع ويب ثابت"}',
    '{"fr": "Site vitrine moderne et responsive pour présenter votre activité.", "en": "Modern and responsive showcase website to present your business.", "ar": "موقع عرض حديث ومتجاوب لتقديم نشاطك."}',
    '{"fr": ["Design responsive", "SEO optimisé", "Hébergement inclus", "Formulaire de contact"], "en": ["Responsive design", "SEO optimized", "Hosting included", "Contact form"], "ar": ["تصميم متجاوب", "SEO محسّن", "استضافة مشمولة", "نموذج تواصل"]}',
    '7 jours', 2
  ),
  (
    'Landing Page', 'web', 1500,
    '["Page unique optimisée", "A/B Testing", "Intégration analytics"]',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    false, true, 11,
    '{"fr": "Landing Page", "en": "Landing Page", "ar": "صفحة هبوط"}',
    '{"fr": "Page d''atterrissage optimisée pour la conversion de vos campagnes.", "en": "Conversion-optimized landing page for your campaigns.", "ar": "صفحة هبوط محسّنة لتحويل حملاتك الإعلانية."}',
    '{"fr": ["Page unique optimisée", "A/B Testing", "Intégration analytics", "Design conversion-focused"], "en": ["Optimized single page", "A/B Testing", "Analytics integration", "Conversion-focused design"], "ar": ["صفحة واحدة محسّنة", "اختبار A/B", "تحليلات مدمجة", "تصميم موجه للتحويل"]}',
    '5 jours', 2
  ),
  (
    'Application Web Sur-Mesure', 'web', 8000,
    '["Analyse des besoins", "UI/UX design", "Maintenance 3 mois"]',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    false, true, 12,
    '{"fr": "Application Web Sur-Mesure", "en": "Custom Web Application", "ar": "تطبيق ويب مخصص"}',
    '{"fr": "Application web complète développée sur mesure selon vos besoins.", "en": "Complete custom web application developed to your needs.", "ar": "تطبيق ويب كامل مطور حسب احتياجاتك."}',
    '{"fr": ["Analyse des besoins", "UI/UX design", "Livraison + maintenance 3 mois", "Support dédié"], "en": ["Requirements analysis", "UI/UX design", "Delivery + 3 months maintenance", "Dedicated support"], "ar": ["تحليل المتطلبات", "تصميم UI/UX", "تسليم + صيانة 3 أشهر", "دعم مخصص"]}',
    '30 jours', 3
  )
ON CONFLICT DO NOTHING;
