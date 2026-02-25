(function initServicesApi() {
  const CACHE_TTL_SERVICES = 5 * 60 * 1000;
  const CACHE_TTL_SITE_CONTENT = 10 * 60 * 1000;

  async function listActive({ page = 1, limit = 10 } = {}) {
    const offset = (page - 1) * limit;
    const cacheKey = `services:active:${page}:${limit}`;
    const cached = window.PixelOneCache?.get(cacheKey);
    if (cached) return cached;

    const sb = getSupabaseClient();
    const { data, error } = await sb
      .from('services')
      .select('*')
      .eq('is_active', true)
      .eq('is_coming_soon', false)
      .order('sort_order', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    window.PixelOneCache?.set(cacheKey, data || [], CACHE_TTL_SERVICES);
    return data || [];
  }

  async function listComingSoon() {
    const cacheKey = 'services:coming-soon';
    const cached = window.PixelOneCache?.get(cacheKey);
    if (cached) return cached;

    const sb = getSupabaseClient();
    const { data, error } = await sb
      .from('services')
      .select('*')
      .eq('is_coming_soon', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    window.PixelOneCache?.set(cacheKey, data || [], CACHE_TTL_SERVICES);
    return data || [];
  }

  async function getById(id) {
    const sb = getSupabaseClient();
    const { data, error } = await sb.from('services').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async function listAdminAll() {
    const sb = getSupabaseClient();
    const { data, error } = await sb.from('services').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async function upsertService(payload, id = null) {
    const sb = getSupabaseClient();
    if (id) {
      const { error } = await sb.from('services').update(payload).eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await sb.from('services').insert(payload);
      if (error) throw error;
    }
    invalidateCaches();
  }

  async function deleteService(id) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('services').delete().eq('id', id);
    if (error) throw error;
    invalidateCaches();
  }

  async function getSiteContent() {
    const cacheKey = 'site-content:all';
    const cached = window.PixelOneCache?.get(cacheKey);
    if (cached) return cached;

    const sb = getSupabaseClient();
    const { data, error } = await sb.from('site_content').select('*').order('page').order('section');
    if (error) throw error;

    const content = data || [];
    window.PixelOneCache?.set(cacheKey, content, CACHE_TTL_SITE_CONTENT);
    return content;
  }

  function invalidateCaches() {
    window.PixelOneCache?.remove('site-content:all');
  }

  window.ServicesAPI = {
    listActive,
    listComingSoon,
    getById,
    listAdminAll,
    upsertService,
    deleteService,
    getSiteContent,
    invalidateCaches,
  };
})();
