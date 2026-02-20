// ============================================================
// Pixel One v2 – Central Configuration
// ============================================================

const CONFIG = {
  // ── Supabase ────────────────────────────────────────────
  SUPABASE_URL: "https://spxayctwyigpyetprkej.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_-vkve_dZOn6BDCViDVHLrQ_EU2OL7SP",

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
    { value: "web",    label: "Développement Web" },
  ],

  // ── Service Catalog (seed / fallback) ───────────────────
  SERVICES: [
    {
      id: 1,
      title: "Montage Vidéo Pro",
      titles: { fr: "Montage Vidéo Pro", en: "Pro Video Editing", ar: "مونتاج فيديو احترافي" },
      category: "video",
      price: 500,
      image_url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
      features: ["Jusqu'à 5 min", "Sous-titres inclus", "2 révisions"],
      features_i18n: {
        fr: ["Jusqu'à 5 min", "Sous-titres inclus", "2 révisions"],
        en: ["Up to 5 min", "Subtitles included", "2 revisions"],
        ar: ["حتى 5 دقائق", "ترجمة مشمولة", "مراجعتان"],
      },
    },
    {
      id: 2,
      title: "Logo & Identité Visuelle",
      titles: { fr: "Logo & Identité Visuelle", en: "Logo & Visual Identity", ar: "شعار وهوية بصرية" },
      category: "design",
      price: 800,
      image_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
      features: ["3 concepts initiaux", "Fichiers SVG / PNG / PDF", "3 révisions"],
      features_i18n: {
        fr: ["3 concepts initiaux", "Fichiers SVG / PNG / PDF", "3 révisions"],
        en: ["3 initial concepts", "SVG / PNG / PDF files", "3 revisions"],
        ar: ["3 مفاهيم أولية", "ملفات SVG / PNG / PDF", "3 مراجعات"],
      },
    },
    {
      id: 3,
      title: "Site Vitrine One-Page",
      titles: { fr: "Site Vitrine One-Page", en: "One-Page Showcase Website", ar: "موقع عرض بصفحة واحدة" },
      category: "web",
      price: 2000,
      image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
      features: ["Design responsive", "Formulaire de contact", "Hébergement 1 an offert"],
      features_i18n: {
        fr: ["Design responsive", "Formulaire de contact", "Hébergement 1 an offert"],
        en: ["Responsive design", "Contact form", "1 year hosting included"],
        ar: ["تصميم متجاوب", "نموذج تواصل", "استضافة سنة مجانية"],
      },
    },
    {
      id: 4,
      title: "Réels Instagram (x5)",
      titles: { fr: "Réels Instagram (x5)", en: "Instagram Reels (x5)", ar: "ريلز إنستغرام (×5)" },
      category: "video",
      price: 1200,
      image_url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80",
      features: ["5 Réels 30 sec", "Musique licensiée", "Texte animé"],
      features_i18n: {
        fr: ["5 Réels 30 sec", "Musique licensiée", "Texte animé"],
        en: ["5 Reels 30 sec", "Licensed music", "Animated text"],
        ar: ["5 ريلز 30 ثانية", "موسيقى مرخصة", "نص متحرك"],
      },
    },
    {
      id: 5,
      title: "Pack Social Media",
      titles: { fr: "Pack Social Media", en: "Social Media Pack", ar: "باقة سوشيال ميديا" },
      category: "design",
      price: 600,
      image_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
      features: ["20 visuels / mois", "Stories + Posts", "Calendrier éditorial"],
      features_i18n: {
        fr: ["20 visuels / mois", "Stories + Posts", "Calendrier éditorial"],
        en: ["20 visuals / month", "Stories + Posts", "Editorial calendar"],
        ar: ["20 تصميم / شهر", "ستوري + منشورات", "تقويم تحريري"],
      },
    },
    {
      id: 6,
      title: "Application Web Sur-Mesure",
      titles: { fr: "Application Web Sur-Mesure", en: "Custom Web Application", ar: "تطبيق ويب مخصص" },
      category: "web",
      price: 8000,
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
      features: ["Analyse des besoins", "UI/UX design", "Livraison + maintenance 3 mois"],
      features_i18n: {
        fr: ["Analyse des besoins", "UI/UX design", "Livraison + maintenance 3 mois"],
        en: ["Requirements analysis", "UI/UX design", "Delivery + 3 months maintenance"],
        ar: ["تحليل المتطلبات", "تصميم UI/UX", "تسليم + صيانة 3 أشهر"],
      },
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
