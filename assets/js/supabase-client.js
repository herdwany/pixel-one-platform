// assets/js/supabase-client.js

let _supabaseClient = null;

function getSupabaseClient() {
  if (_supabaseClient) return _supabaseClient;

  // التحقق من وجود الكونفيج
  if (typeof CONFIG === "undefined") {
    console.error("[PixelOne] CONFIG missing!");
    return null;
  }

  // إنشاء العميل مع إعدادات الحفظ الإجبارية
  _supabaseClient = supabase.createClient(
    CONFIG.SUPABASE_URL,
    CONFIG.SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true,         // ضروري: ابق مسجلاً
        storageKey: 'pixelone-auth',  // ضروري: مفتاح موحد للتخزين
        storage: window.localStorage, // ضروري: التخزين في المتصفح
        autoRefreshToken: true,
        detectSessionInUrl: true      // ضروري: التقاط الرابط من الإيميل
      }
    }
  );

  return _supabaseClient;
}

// دوال مساعدة (تأكد من وجودها في ملفك)
async function getCurrentUser() {
  const sb = getSupabaseClient();
  const { data: { session } } = await sb.auth.getSession();
  return session?.user ?? null;
}