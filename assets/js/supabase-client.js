// ============================================================
// Pixel One v2 – Supabase Client (Singleton)
// ============================================================
// Requires the Supabase JS CDN to be loaded before this script.
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

let _supabaseClient = null;

/**
 * Returns the singleton Supabase client instance.
 * Initialises it on first call using CONFIG values.
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
 * Returns null (instead of throwing) when no profile row exists yet
 * — normal for brand-new Google OAuth users before trigger fires.
 * Valid roles: 'admin' | 'client'
 */
async function getProfile(userId) {
  const { data, error } = await getSupabaseClient()
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  // PGRST116 = "no rows returned" — new user has no profile row yet
  if (error && error.code !== 'PGRST116') throw error;
  return data ?? null;
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
  const profile = await getProfile(user.id);
  if (profile?.is_banned) {
    await getSupabaseClient().auth.signOut();
    window.location.href = "auth.html";
    return null;
  }
  if (adminOnly) {
    if (profile?.role !== "admin") {
      window.location.href = "dashboard.html";
      return null;
    }
  }
  return { user, profile };
}

/**
 * Builds a pre-filled WhatsApp link to notify the admin.
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