(function initAdminServicesModule() {
  async function listAll() {
    return ServicesAPI.listAdminAll();
  }

  async function save(payload, id = null) {
    return ServicesAPI.upsertService(payload, id);
  }

  async function remove(id) {
    return ServicesAPI.deleteService(id);
  }

  window.AdminServicesModule = { listAll, save, remove };
})();
