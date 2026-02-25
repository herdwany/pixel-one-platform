(function initAdminSiteContentModule() {
  async function list() {
    return ServicesAPI.getSiteContent();
  }

  async function saveBulk(updatesMap) {
    const sb = getSupabaseClient();
    const promises = Object.entries(updatesMap).map(([id, payload]) =>
      sb.from('site_content').update(payload).eq('id', Number(id))
    );

    const results = await Promise.all(promises);
    const failed = results.find(r => r.error);
    if (failed?.error) throw failed.error;

    ServicesAPI.invalidateCaches();
  }

  window.AdminSiteContentModule = { list, saveBulk };
})();
