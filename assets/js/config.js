// ============================================================
// Pixel One v2 – Central Configuration
// ============================================================

const CONFIG = {
  // ── Supabase ────────────────────────────────────────────
  SUPABASE_URL: "https://spxayctwyigpyetprkej.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweGF5Y3R3eWlncHlldHBya2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MDg1NTUsImV4cCI6MjA4NzE4NDU1NX0.WL42rSvFK5vziADKrPZ_j_hR0Vy9i6c3ZvsODq5h-rg",

  // ── Site Meta ───────────────────────────────────────────
  SITE_NAME: "Pixel One",
  SITE_TAGLINE: "Creative Agency — Morocco",
  WHATSAPP_NUMBER: "212600000000", // Admin WhatsApp (no + prefix for wa.me)

  // ── Bank Transfer Details ────────────────────────────────
  BANK_NAME: "CIH Bank",
  BANK_ACCOUNT: "123 456 789 00",
  CASHPLUS_NUMBER: "0600000000",

  // ── Service Categories ───────────────────────────────────
  CATEGORIES: [
    { value: "video",  label: "Vidéo & Motion" },
    { value: "design", label: "Design Graphique" },
  ],

  // ── Service Catalog (seed / fallback — design & video only) ──
  SERVICES: [
    {
      id: 1,
      title: "Montage Vidéo Pro",
      titles: { fr: "Montage Vidéo Pro", en: "Pro Video Editing", ar: "مونتاج فيديو احترافي" },
      descriptions: { fr: "Montage professionnel pour vos vidéos courtes, réels et contenus sociaux.", en: "Professional editing for your short videos, reels and social content.", ar: "مونتاج احترافي لفيديوهاتك القصيرة وريلز ومحتوى السوشيال ميديا." },
      category: "video",
      price: 500,
      image_url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
      features: ["Jusqu'à 5 min", "Sous-titres inclus", "2 révisions", "Musique libre de droits"],
      features_i18n: {
        fr: ["Jusqu'à 5 min", "Sous-titres inclus", "2 révisions", "Musique libre de droits"],
        en: ["Up to 5 min", "Subtitles included", "2 revisions", "Royalty-free music"],
        ar: ["حتى 5 دقائق", "ترجمة مشمولة", "مراجعتان", "موسيقى بدون حقوق"],
      },
      delivery_time: "48h",
      revisions: 2,
      is_active: true,
      is_coming_soon: false,
    },
    {
      id: 2,
      title: "Logo & Identité Visuelle",
      titles: { fr: "Logo & Identité Visuelle", en: "Logo & Visual Identity", ar: "شعار وهوية بصرية" },
      descriptions: { fr: "Création de logo professionnel et identité visuelle complète pour votre marque.", en: "Professional logo creation and complete visual identity for your brand.", ar: "تصميم شعار احترافي وهوية بصرية كاملة لعلامتك التجارية." },
      category: "design",
      price: 800,
      image_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
      features: ["3 concepts initiaux", "Fichiers SVG / PNG / PDF", "3 révisions", "Charte graphique"],
      features_i18n: {
        fr: ["3 concepts initiaux", "Fichiers SVG / PNG / PDF", "3 révisions", "Charte graphique"],
        en: ["3 initial concepts", "SVG / PNG / PDF files", "3 revisions", "Brand guidelines"],
        ar: ["3 مفاهيم أولية", "ملفات SVG / PNG / PDF", "3 مراجعات", "دليل الهوية البصرية"],
      },
      delivery_time: "72h",
      revisions: 3,
      is_active: true,
      is_coming_soon: false,
    },
    {
      id: 4,
      title: "Réels Instagram (x5)",
      titles: { fr: "Réels Instagram (x5)", en: "Instagram Reels (x5)", ar: "ريلز إنستغرام (×5)" },
      descriptions: { fr: "Pack de 5 réels Instagram dynamiques et engageants pour booster votre présence.", en: "Pack of 5 dynamic and engaging Instagram reels to boost your presence.", ar: "حزمة 5 ريلز إنستغرام ديناميكية وجذابة لتعزيز حضورك." },
      category: "video",
      price: 1200,
      image_url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80",
      features: ["5 Réels 30 sec", "Musique licensiée", "Texte animé", "Format vertical optimisé"],
      features_i18n: {
        fr: ["5 Réels 30 sec", "Musique licensiée", "Texte animé", "Format vertical optimisé"],
        en: ["5 Reels 30 sec", "Licensed music", "Animated text", "Optimized vertical format"],
        ar: ["5 ريلز 30 ثانية", "موسيقى مرخصة", "نص متحرك", "تنسيق عمودي محسّن"],
      },
      delivery_time: "72h",
      revisions: 2,
      is_active: true,
      is_coming_soon: false,
    },
    {
      id: 5,
      title: "Pack Social Media",
      titles: { fr: "Pack Social Media", en: "Social Media Pack", ar: "باقة سوشيال ميديا" },
      descriptions: { fr: "20 visuels par mois pour vos réseaux sociaux avec un calendrier éditorial.", en: "20 visuals per month for your social media with an editorial calendar.", ar: "20 تصميم شهرياً لمواقع التواصل الاجتماعي مع تقويم تحريري." },
      category: "design",
      price: 600,
      image_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
      features: ["20 visuels / mois", "Stories + Posts", "Calendrier éditorial", "Formats adaptés"],
      features_i18n: {
        fr: ["20 visuels / mois", "Stories + Posts", "Calendrier éditorial", "Formats adaptés"],
        en: ["20 visuals / month", "Stories + Posts", "Editorial calendar", "Adapted formats"],
        ar: ["20 تصميم / شهر", "ستوري + منشورات", "تقويم تحريري", "تنسيقات متوافقة"],
      },
      delivery_time: "5 jours",
      revisions: 2,
      is_active: true,
      is_coming_soon: false,
    },
  ],

  // ── Coming Soon Services (not orderable) ───────────────────
  COMING_SOON_SERVICES: [
    {
      id: 101,
      title: "Site Web Statique",
      titles: { fr: "Site Web Statique", en: "Static Website", ar: "موقع ويب ثابت" },
      descriptions: { fr: "Site vitrine moderne et responsive pour présenter votre activité.", en: "Modern and responsive showcase website to present your business.", ar: "موقع عرض حديث ومتجاوب لتقديم نشاطك." },
      category: "web",
      price: 2000,
      image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
      features: ["Design responsive", "SEO optimisé", "Hébergement inclus", "Formulaire de contact"],
      features_i18n: {
        fr: ["Design responsive", "SEO optimisé", "Hébergement inclus", "Formulaire de contact"],
        en: ["Responsive design", "SEO optimized", "Hosting included", "Contact form"],
        ar: ["تصميم متجاوب", "SEO محسّن", "استضافة مشمولة", "نموذج تواصل"],
      },
      is_coming_soon: true,
    },
    {
      id: 102,
      title: "Landing Page",
      titles: { fr: "Landing Page", en: "Landing Page", ar: "صفحة هبوط" },
      descriptions: { fr: "Page d'atterrissage optimisée pour la conversion de vos campagnes.", en: "Conversion-optimized landing page for your campaigns.", ar: "صفحة هبوط محسّنة لتحويل حملاتك الإعلانية." },
      category: "web",
      price: 1500,
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
      features: ["Page unique optimisée", "A/B Testing", "Intégration analytics", "Design conversion-focused"],
      features_i18n: {
        fr: ["Page unique optimisée", "A/B Testing", "Intégration analytics", "Design conversion-focused"],
        en: ["Optimized single page", "A/B Testing", "Analytics integration", "Conversion-focused design"],
        ar: ["صفحة واحدة محسّنة", "اختبار A/B", "تحليلات مدمجة", "تصميم موجه للتحويل"],
      },
      is_coming_soon: true,
    },
    {
      id: 103,
      title: "Application Web Sur-Mesure",
      titles: { fr: "Application Web Sur-Mesure", en: "Custom Web Application", ar: "تطبيق ويب مخصص" },
      descriptions: { fr: "Application web complète développée sur mesure selon vos besoins.", en: "Complete custom web application developed to your needs.", ar: "تطبيق ويب كامل مطور حسب احتياجاتك." },
      category: "web",
      price: 8000,
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
      features: ["Analyse des besoins", "UI/UX design", "Livraison + maintenance 3 mois", "Support dédié"],
      features_i18n: {
        fr: ["Analyse des besoins", "UI/UX design", "Livraison + maintenance 3 mois", "Support dédié"],
        en: ["Requirements analysis", "UI/UX design", "Delivery + 3 months maintenance", "Dedicated support"],
        ar: ["تحليل المتطلبات", "تصميم UI/UX", "تسليم + صيانة 3 أشهر", "دعم مخصص"],
      },
      is_coming_soon: true,
    },
  ],

  // ── Order Status Pipeline ────────────────────────────────
  ORDER_STATUSES: ["pending", "in_progress", "review", "done"],
  ORDER_STATUS_LABELS: {
    pending:     "En attente",
    in_progress: "En cours",
    review:      "En révision",
    done:        "Terminé",
  },

  // ── Default popularity weights per category ──────────────
  CATEGORY_BASE_SCORES: { video: 4, design: 3, web: 2 },
};

// ── Popular Offers Algorithm ─────────────────────────────────
// Tracks user interactions in localStorage to surface personalised offers.

// In-memory cache to avoid repeated JSON.parse calls within the same session
let _viewsCache = null;
let _prefsCache = null;

function _getViewsCache() {
  if (!_viewsCache) {
    try { _viewsCache = JSON.parse(localStorage.getItem('px_svc_views') || '{}'); }
    catch (_) { _viewsCache = {}; }
  }
  return _viewsCache;
}
function _getPrefsCache() {
  if (!_prefsCache) {
    try { _prefsCache = JSON.parse(localStorage.getItem('px_cat_prefs') || '{}'); }
    catch (_) { _prefsCache = {}; }
  }
  return _prefsCache;
}

/**
 * Records a service-detail page view.
 * Called by service-details.html when a service is rendered.
 * @param {number} serviceId
 * @param {string} category
 */
function trackServiceView(serviceId, category) {
  try {
    const views = _getViewsCache();
    views[serviceId] = (views[serviceId] || 0) + 1;
    localStorage.setItem('px_svc_views', JSON.stringify(views));

    if (category) {
      const prefs = _getPrefsCache();
      prefs[category] = (prefs[category] || 0) + 1;
      localStorage.setItem('px_cat_prefs', JSON.stringify(prefs));
    }
  } catch (_) { /* localStorage unavailable */ }
}

/**
 * Returns services sorted by a composite popularity score:
 *   score = (personal views × 3) + (category preference × 2) + base category weight
 * Falls back to catalog order when no interaction data exists.
 * @param {number} [count] – number of services to return (default: all)
 * @returns {Array}
 */
function getPopularServices(count) {
  const views = _getViewsCache();
  const prefs = _getPrefsCache();
  const base  = CONFIG.CATEGORY_BASE_SCORES || {};
  const n     = count || CONFIG.SERVICES.length;

  return CONFIG.SERVICES
    .map(s => ({
      ...s,
      _score: (views[s.id]      || 0) * 3
            + (prefs[s.category] || 0) * 2
            + (base[s.category]  || 1),
    }))
    .sort((a, b) => b._score - a._score)
    .slice(0, n);
}