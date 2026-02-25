(function initAdminOrdersModule() {
  async function list(page = 1, limit = 10) {
    return OrdersAPI.listAdminOrders({ page, limit });
  }

  async function updateStatus(orderId, status) {
    return OrdersAPI.updateOrderStatus(orderId, status);
  }

  async function remove(orderId) {
    return OrdersAPI.deleteOrder(orderId);
  }

  window.AdminOrdersModule = { list, updateStatus, remove };
})();
