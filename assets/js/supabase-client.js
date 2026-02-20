// ============================================================
// Pixel One v2 – Supabase Client (Singleton)
// ============================================================
// Requires the Supabase JS CDN to be loaded before this script.
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

let _supabaseClient = null;

/**
 * Returns the singleton Supabase client instance.
 * Initialises it on first call using CONFIG values.
 *
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
function getSupabaseClient() {
  if (_supabaseClient) return _supabaseClient;

  if (typeof CONFIG === "undefined") {
    throw new Error(
      "[PixelOne] CONFIG is not defined. Make sure config.js is loaded before supabase-client.js."
    );
  }

  if (typeof supabase === "undefined" || typeof supabase.createClient !== "function") {
    throw new Error(
      "[PixelOne] Supabase JS SDK not found. Add the CDN script before supabase-client.js."
    );
  }

  _supabaseClient = supabase.createClient(
    CONFIG.SUPABASE_URL,
    CONFIG.SUPABASE_ANON_KEY
  );

  return _supabaseClient;
}

// ── Convenience helpers ──────────────────────────────────────

/**
 * Returns the currently authenticated user, or null.
 */
async function getCurrentUser() {
  const { data: { user } } = await getSupabaseClient().auth.getUser();
  return user;
}

/**
 * Returns the profile row for the given userId.
 */
async function getProfile(userId) {
  const { data, error } = await getSupabaseClient()
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Redirects to auth.html if no user is logged in.
 * Call on every protected page (dashboard, admin).
 *
 * @param {boolean} adminOnly – if true, also checks role === 'admin'
 */
async function requireAuth(adminOnly = false) {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "auth.html";
    return null;
  }
  if (adminOnly) {
    const profile = await getProfile(user.id);
    if (profile?.role !== "admin") {
      window.location.href = "dashboard.html";
      return null;
    }
    return { user, profile };
  }
  const profile = await getProfile(user.id);
  return { user, profile };
}

/**
 * Generates a unique order reference like "PX-A3F2".
 * Uses base-36 timestamp + random chars to reduce collision risk.
 */
function generateOrderRef() {
  const ts  = Date.now().toString(36).toUpperCase().slice(-3);
  const rnd = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `PX-${ts}${rnd}`;
}

/**
 * Builds a pre-filled WhatsApp link to notify the admin.
 *
 * @param {object} order – { order_ref, service_title, total }
 */
function buildWhatsAppLink(order) {
  const text = encodeURIComponent(
    `Bonjour Pixel One 👋\n` +
    `Je viens de passer la commande *${order.order_ref}*.\n` +
    `Service : ${order.service_title}\n` +
    `Montant : ${order.total} MAD\n` +
    `Veuillez confirmer ma commande. Merci !`
  );
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${text}`;
}
