// ============================================================
// Pixel One v2 – Supabase Client (Singleton)
// ============================================================

let _supabaseClient = null;

function getSupabaseClient() {
  if (_supabaseClient) return _supabaseClient;

  if (typeof CONFIG === "undefined") {
    throw new Error("[PixelOne] CONFIG is not defined.");
  }

  // 🛑 التعديل هنا: إضافة إعدادات الـ Auth لحفظ الجلسة في المتصفح
  _supabaseClient = supabase.createClient(
    CONFIG.SUPABASE_URL,
    CONFIG.SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true, // ضروري لبقاء المستخدم مسجلاً
        storageKey: 'pixelone-auth-token', // مفتاح موحد للتخزين
        storage: window.localStorage,
        autoRefreshToken: true,
        detectSessionInUrl: true // ضروري لالتقاط الرابط من الإيميل
      }
    }
  );

  return _supabaseClient;
}

// ── Convenience helpers ──────────────────────────────────────

async function getCurrentUser() {
  const sb = getSupabaseClient();
  
  // التحقق من الجلسة المخزنة
  const { data: { session }, error } = await sb.auth.getSession();

  if (error || !session) {
    return null;
  }
  
  return session.user;
}

async function getProfile(userId) {
  const { data, error } = await getSupabaseClient()
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data ?? null;
}

async function requireAuth(adminOnly = false) {
  const user = await getCurrentUser();
  if (!user) {
    // حفظ الصفحة الحالية للعودة إليها بعد تسجيل الدخول
    sessionStorage.setItem('redirect_after_login', window.location.href);
    window.location.href = "auth.html";
    return null;
  }
  
  const profile = await getProfile(user.id);
  
  if (profile?.is_banned) {
    await getSupabaseClient().auth.signOut();
    window.location.href = "auth.html";
    return null;
  }

  if (adminOnly && profile?.role !== "admin") {
    window.location.href = "dashboard.html";
    return null;
  }
  
  return { user, profile };
}