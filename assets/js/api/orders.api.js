(function initOrdersApi() {
  async function createOrder(payload) {
    const sb = getSupabaseClient();
    const { data, error } = await sb
      .from('orders')
      .insert(payload)
      .select('id, order_ref, created_at, status')
      .single();

    if (error) throw error;
    return data;
  }

  async function listMyOrders({ page = 1, limit = 10 } = {}) {
    const offset = (page - 1) * limit;
    const sb = getSupabaseClient();
    const { data, error, count } = await sb
      .from('orders')
      .select('*, services(title, price, category)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { rows: data || [], count: count || 0 };
  }

  async function listAdminOrders({ page = 1, limit = 10 } = {}) {
    const offset = (page - 1) * limit;
    const sb = getSupabaseClient();
    const { data, error, count } = await sb
      .from('orders')
      .select('*, services(title, price, category), profiles(full_name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { rows: data || [], count: count || 0 };
  }

  async function updateOrderStatus(orderId, status) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('orders').update({ status }).eq('id', orderId);
    if (error) throw error;
  }

  async function deleteOrder(orderId) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('orders').delete().eq('id', orderId);
    if (error) throw error;
  }

  window.OrdersAPI = {
    createOrder,
    listMyOrders,
    listAdminOrders,
    updateOrderStatus,
    deleteOrder,
  };
})();
