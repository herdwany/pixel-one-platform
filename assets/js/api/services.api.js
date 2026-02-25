(function initServicesApi() {
  const CACHE_TTL_SERVICES = 5 * 60 * 1000;
  const CACHE_TTL_SITE_CONTENT = 10 * 60 * 1000;

  function parseServiceJsonFields(service) {
    let features = service.features;
    if (!Array.isArray(features)) {
      try { features = JSON.parse(features || '[]'); } catch (_) { features = []; }
    }

    let features_i18n = service.features_i18n;
    if (typeof features_i18n === 'string') {
      try { features_i18n = JSON.parse(features_i18n); } catch (_) { features_i18n = {}; }
    }

    let titles = service.titles;
    if (typeof titles === 'string') {
      try { titles = JSON.parse(titles); } catch (_) { titles = {}; }
    }

    let descriptions = service.descriptions;
    if (typeof descriptions === 'string') {
      try { descriptions = JSON.parse(descriptions); } catch (_) { descriptions = {}; }
    }

    return {
      ...service,
      features,
      features_i18n: features_i18n || {},
      titles: titles || {},
      descriptions: descriptions || {},
    };
  }

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
    const rows = (data || []).map(parseServiceJsonFields);
    window.PixelOneCache?.set(cacheKey, rows, CACHE_TTL_SERVICES);
    return rows;
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
    const rows = (data || []).map(parseServiceJsonFields);
    window.PixelOneCache?.set(cacheKey, rows, CACHE_TTL_SERVICES);
    return rows;
  }

  async function listActiveAll() {
    const cacheKey = 'services:active:all';
    const cached = window.PixelOneCache?.get(cacheKey);
    if (cached) return cached;

    const sb = getSupabaseClient();
    const { data, error } = await sb
      .from('services')
      .select('*')
      .eq('is_active', true)
      .eq('is_coming_soon', false)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    const rows = (data || []).map(parseServiceJsonFields);
    window.PixelOneCache?.set(cacheKey, rows, CACHE_TTL_SERVICES);
    return rows;
  }

  async function getById(id) {
    const sb = getSupabaseClient();
    const { data, error } = await sb.from('services').select('*').eq('id', id).single();
    if (error) throw error;
    return parseServiceJsonFields(data);
  }

  async function listAdminAll() {
    const sb = getSupabaseClient();
    const { data, error } = await sb.from('services').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    return (data || []).map(parseServiceJsonFields);
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
    window.PixelOneCache?.remove('services:active:all');
  }

  window.ServicesAPI = {
    listActive,
    listActiveAll,
    listComingSoon,
    getById,
    listAdminAll,
    upsertService,
    deleteService,
    getSiteContent,
    invalidateCaches,
  };
})();
