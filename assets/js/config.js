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
      category: "video",
      price: 500,
      image_url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
      features: ["Jusqu'à 5 min", "Sous-titres inclus", "2 révisions"],
    },
    {
      id: 2,
      title: "Logo & Identité Visuelle",
      category: "design",
      price: 800,
      image_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
      features: ["3 concepts initiaux", "Fichiers SVG / PNG / PDF", "3 révisions"],
    },
    {
      id: 3,
      title: "Site Vitrine One-Page",
      category: "web",
      price: 2000,
      image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
      features: ["Design responsive", "Formulaire de contact", "Hébergement 1 an offert"],
    },
    {
      id: 4,
      title: "Réels Instagram (x5)",
      category: "video",
      price: 1200,
      image_url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80",
      features: ["5 Réels 30 sec", "Musique licensiée", "Texte animé"],
    },
    {
      id: 5,
      title: "Pack Social Media",
      category: "design",
      price: 600,
      image_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
      features: ["20 visuels / mois", "Stories + Posts", "Calendrier éditorial"],
    },
    {
      id: 6,
      title: "Application Web Sur-Mesure",
      category: "web",
      price: 8000,
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
      features: ["Analyse des besoins", "UI/UX design", "Livraison + maintenance 3 mois"],
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
};
