(function initUsersApi() {
  async function listUsers({ page = 1, limit = 10 } = {}) {
    const offset = (page - 1) * limit;
    const sb = getSupabaseClient();
    const { data, error, count } = await sb
      .from('profiles')
      .select('id, full_name, phone, role, created_at, has_agreed_to_terms, agreed_at, is_banned, avatar_url', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { rows: data || [], count: count || 0 };
  }

  async function updateUser(userId, payload) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('profiles').update(payload).eq('id', userId);
    if (error) throw error;
  }

  async function updateMyProfile(userId, payload) {
    return updateUser(userId, payload);
  }

  async function upsertProfile(payload) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('profiles').upsert(payload, { onConflict: 'id' });
    if (error) throw error;
  }

  window.UsersAPI = {
    listUsers,
    updateUser,
    updateMyProfile,
    upsertProfile,
  };
})();
