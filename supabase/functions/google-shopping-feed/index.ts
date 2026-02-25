import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ✅ التصحيح هنا: أضفنا علامة التعجب (!) لنخبر النظام أن هذه القيم موجودة بالتأكيد
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = "https://www.pixelonevisuals.tech";

// ── Types ───────────────────────────────────────────────────
interface I18nMap {
  fr?: string;
  en?: string;
  ar?: string;
}

interface ServiceRow {
  id: number;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
  features: string[] | string | null;
  titles: I18nMap | null;
  descriptions: I18nMap | null;
  features_i18n: Record<string, string[]> | null;
}

// ── Helpers ─────────────────────────────────────────────────
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function escapeXml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseFeatures(raw: string[] | string | null): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

/** Pick English title → French fallback → raw title */
function getTitle(svc: ServiceRow): string {
  if (svc.titles && typeof svc.titles === 'object') {
      return svc.titles.en || svc.titles.fr || svc.title;
  }
  return svc.title;
}

/** Pick English description → French fallback → raw description → title */
function getDescription(svc: ServiceRow): string {
  let base = svc.description || svc.title;
  
  if (svc.descriptions && typeof svc.descriptions === 'object') {
      base = svc.descriptions.en || svc.descriptions.fr || base;
  }

  const features = (svc.features_i18n && svc.features_i18n.en) 
    ? svc.features_i18n.en 
    : parseFeatures(svc.features);

  if (!features.length) return base;
  return `${base} — ${features.join(", ")}`;
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    "Video Editing": "Media > Digital Goods & Currency > Digital Goods > Video",
    "Graphic Design": "Media > Digital Goods & Currency > Digital Goods > Design",
    "Web Development": "Software > Computer Software",
  };
  return map[cat] || "Media > Digital Goods & Currency > Digital Goods";
}

function buildItemXml(svc: ServiceRow): string {
  const title = getTitle(svc);
  const description = getDescription(svc);
  const link = `${SITE_URL}/service-details.html?id=${svc.id}`;
  const imageLink = svc.image_url || `${SITE_URL}/icon/black/favicon-96x96.png`;
  const price = Number(svc.price).toFixed(2);

  return `    <item>
      <g:id>${svc.id}</g:id>
      <title>${escapeXml(title)}</title>
      <description>${escapeXml(description)}</description>
      <link>${escapeXml(link)}</link>
      <g:image_link>${escapeXml(imageLink)}</g:image_link>
      <g:price>${price} MAD</g:price>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:identifier_exists>false</g:identifier_exists>
      <g:google_product_category>${escapeXml(categoryLabel(svc.category))}</g:google_product_category>
      <g:brand>Pixel One</g:brand>
    </item>`;
}

// ── Handler ─────────────────────────────────────────────────
Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  try {
    // ✅ إنشاء العميل هنا مباشرة لضمان عدم حدوث مشاكل في النطاق
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: services, error } = await supabase
      .from("services")
      .select("id, title, description, price, image_url, category, features, titles, descriptions, features_i18n")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!services || services.length === 0) throw new Error("No active services found");

    const items = (services as ServiceRow[]).map(buildItemXml).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Pixel One — Creative Agency Morocco</title>
    <link>${SITE_URL}</link>
    <description>Design, video and web development services by Pixel One.</description>
${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><error>${escapeXml(message)}</error>`,
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/xml" },
      }
    );
  }
});