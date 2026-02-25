(function initNotificationsApi() {
  async function listMy({ userId, limit = 50 } = {}) {
    const sb = getSupabaseClient();
    const { data, error } = await sb
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async function markRead(notificationId) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('notifications').update({ is_read: true }).eq('id', notificationId);
    if (error) throw error;
  }

  async function markAllRead(userId) {
    const sb = getSupabaseClient();
    const { error } = await sb
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
  }

  window.NotificationsAPI = {
    listMy,
    markRead,
    markAllRead,
  };
})();
