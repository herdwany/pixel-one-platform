import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = "https://www.pixelonevisuals.tech";

interface ServiceRow {
  id: number;
  title: string;
  description: string | null;
  descriptions: Record<string, string> | null;
  titles: Record<string, string> | null;
  price: number;
  image_url: string | null;
  category: string;
  features: string[] | null;
  features_i18n: Record<string, string[]> | null;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildDescription(svc: ServiceRow): string {
  const desc = svc.descriptions?.fr || svc.description || svc.title;
  const features: string[] =
    svc.features_i18n?.fr || (Array.isArray(svc.features) ? svc.features : []);
  if (!features.length) return desc;
  return `${desc} — ${features.join(", ")}`;
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    video: "Media > Digital Goods & Currency > Digital Goods > Video",
    design: "Media > Digital Goods & Currency > Digital Goods > Design",
    web: "Software > Computer Software",
  };
  return map[cat] || "Media > Digital Goods & Currency > Digital Goods";
}

function buildItemXml(svc: ServiceRow): string {
  const title = svc.titles?.fr || svc.title;
  const description = buildDescription(svc);
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
      <g:google_product_category>${escapeXml(categoryLabel(svc.category))}</g:google_product_category>
      <g:brand>Pixel One</g:brand>
    </item>`;
}

Deno.serve(async () => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: services, error } = await supabase
      .from("services")
      .select(
        "id, title, description, descriptions, titles, price, image_url, category, features, features_i18n"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;

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
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><error>${escapeXml(message)}</error>`,
      { status: 500, headers: { "Content-Type": "application/xml" } }
    );
  }
});
