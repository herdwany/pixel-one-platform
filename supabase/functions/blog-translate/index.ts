import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TRANSLATE_ENDPOINT = Deno.env.get("BLOG_TRANSLATE_ENDPOINT") || "https://api.mymemory.translated.net/get";
const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "https://www.pixelonevisuals.tech";
const GOOGLE_TRANSLATE_ENDPOINT = "https://translate.googleapis.com/translate_a/single";

const ALLOWED_LANGS = new Set(["fr", "en", "ar"]);

type TranslatePayload = {
  sourceLang: "fr" | "en" | "ar";
  targetLang: "fr" | "en" | "ar";
  title: string;
  content: string;
  format?: "plain" | "html";
};

function corsHeaders(origin: string | null) {
  const allowed = origin && (origin === ALLOWED_ORIGIN || origin === "http://localhost:5500" || origin === "http://127.0.0.1:5500");
  return {
    "Access-Control-Allow-Origin": allowed && origin ? origin : ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  };
}

function isLikelyHtml(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(String(content || ""));
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function normalizeForCompare(value: string): string {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function looksUntranslated(source: string, translated: string): boolean {
  if (!translated) return true;
  return normalizeForCompare(source) === normalizeForCompare(translated);
}

async function translateTextGoogle(text: string, sourceLang: string, targetLang: string): Promise<string> {
  const source = String(text || "").trim();
  if (!source) return "";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const url = `${GOOGLE_TRANSLATE_ENDPOINT}?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(source)}`;
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return "";
    const data = await res.json();
    const merged = Array.isArray(data?.[0])
      ? data[0].map((row: unknown[]) => String(row?.[0] || "")).join("")
      : "";
    return decodeHtmlEntities(merged.trim());
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
  }
}

async function translateTextRobust(text: string, sourceLang: string, targetLang: string): Promise<string> {
  const source = String(text || "").trim();
  if (!source || sourceLang === targetLang) return source;

  let translated = await translateText(source, sourceLang, targetLang);
  if (!looksUntranslated(source, translated)) return translated;

  if (sourceLang !== "fr" && targetLang !== "fr") {
    const pivotFr = await translateText(source, sourceLang, "fr");
    if (pivotFr && !looksUntranslated(source, pivotFr)) {
      const fromFr = await translateText(pivotFr, "fr", targetLang);
      if (!looksUntranslated(source, fromFr)) return fromFr;
    }
  }

  if (sourceLang !== "en" && targetLang !== "en") {
    const pivotEn = await translateText(source, sourceLang, "en");
    if (pivotEn && !looksUntranslated(source, pivotEn)) {
      const fromEn = await translateText(pivotEn, "en", targetLang);
      if (!looksUntranslated(source, fromEn)) return fromEn;
    }
  }

  return translated || source;
}

async function translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
  const source = String(text || "").trim();
  if (!source) return "";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const url = `${TRANSLATE_ENDPOINT}?q=${encodeURIComponent(source)}&langpair=${sourceLang}|${targetLang}`;
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return await translateTextGoogle(source, sourceLang, targetLang);
    }
    const data = await res.json();
    const primary = decodeHtmlEntities(String(data?.responseData?.translatedText || "").trim());
    if (sourceLang !== targetLang && looksUntranslated(source, primary)) {
      const secondary = await translateTextGoogle(source, sourceLang, targetLang);
      return secondary || primary;
    }
    return primary;
  } catch {
    return await translateTextGoogle(source, sourceLang, targetLang);
  } finally {
    clearTimeout(timeout);
  }
}

async function translateHtmlPreservingStructure(html: string, sourceLang: string, targetLang: string): Promise<string> {
  const src = String(html || "").trim();
  if (!src) return "";

  const parts = src.split(/(<[^>]+>)/g);
  const translatedParts: string[] = [];

  for (const part of parts) {
    if (!part) {
      translatedParts.push(part);
      continue;
    }

    if (part.startsWith("<") && part.endsWith(">")) {
      translatedParts.push(part);
      continue;
    }

    const trimmed = part.trim();
    if (!trimmed || /^https?:\/\//i.test(trimmed)) {
      translatedParts.push(part);
      continue;
    }

    const leading = part.match(/^\s*/)?.[0] || "";
    const trailing = part.match(/\s*$/)?.[0] || "";
    const translated = await translateTextRobust(trimmed, sourceLang, targetLang);
    translatedParts.push(`${leading}${translated || trimmed}${trailing}`);
  }

  return translatedParts.join("");
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing auth token" }), {
        status: 401,
        headers,
      });
    }

    const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: userData, error: userError } = await authClient.auth.getUser();
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers,
      });
    }

    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: profile, error: profileError } = await adminClient
      .from("profiles")
      .select("role")
      .eq("id", userData.user.id)
      .maybeSingle();

    if (profileError || profile?.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers,
      });
    }

    const body = (await req.json()) as TranslatePayload;
    const sourceLang = String(body?.sourceLang || "").trim();
    const targetLang = String(body?.targetLang || "").trim();
    const title = String(body?.title || "").trim();
    const content = String(body?.content || "").trim();
    const format = body?.format === "html" || isLikelyHtml(content) ? "html" : "plain";

    if (!ALLOWED_LANGS.has(sourceLang) || !ALLOWED_LANGS.has(targetLang) || sourceLang === targetLang) {
      return new Response(JSON.stringify({ error: "Invalid language pair" }), {
        status: 400,
        headers,
      });
    }

    if (!title || !content) {
      return new Response(JSON.stringify({ error: "Missing title/content" }), {
        status: 400,
        headers,
      });
    }

    if (title.length > 500 || content.length > 120000) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413,
        headers,
      });
    }

    const translatedTitle = await translateTextRobust(title, sourceLang, targetLang);
    const translatedContent = format === "html"
      ? await translateHtmlPreservingStructure(content, sourceLang, targetLang)
      : await translateTextRobust(content, sourceLang, targetLang);

    return new Response(
      JSON.stringify({
        ok: true,
        sourceLang,
        targetLang,
        format,
        title: translatedTitle || title,
        content: translatedContent || content,
        partialFallback: !translatedTitle || !translatedContent,
      }),
      { status: 200, headers }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected translation error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers,
    });
  }
});
