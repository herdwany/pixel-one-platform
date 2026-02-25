(function initAdminBlogModule() {
  async function list() {
    const sb = getSupabaseClient();
    const { data, error } = await sb.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async function save(payload, id = null) {
    const sb = getSupabaseClient();
    if (id) {
      const { error } = await sb.from('blog_posts').update(payload).eq('id', id);
      if (error) throw error;
      return;
    }
    const { error } = await sb.from('blog_posts').insert(payload);
    if (error) throw error;
  }

  async function remove(id) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('blog_posts').delete().eq('id', id);
    if (error) throw error;
  }

  window.AdminBlogModule = { list, save, remove };
})();
