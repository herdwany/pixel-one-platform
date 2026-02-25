(function initAdminCommentsModule() {
  async function list({ page = 1, limit = 10, filter = 'all' } = {}) {
    const sb = getSupabaseClient();
    let query = sb
      .from('blog_comments')
      .select('*, blog_posts(title, slug)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, (page - 1) * limit + limit - 1);

    if (filter === 'pending') query = query.eq('is_approved', false);
    if (filter === 'approved') query = query.eq('is_approved', true);

    const { data, error, count } = await query;
    if (error) throw error;
    return { rows: data || [], count: count || 0 };
  }

  async function approve(ids) {
    const sb = getSupabaseClient();
    const target = Array.isArray(ids) ? ids : [ids];
    const { error } = await sb.from('blog_comments').update({ is_approved: true }).in('id', target);
    if (error) throw error;
  }

  async function remove(ids) {
    const sb = getSupabaseClient();
    const target = Array.isArray(ids) ? ids : [ids];
    const { error } = await sb.from('blog_comments').delete().in('id', target);
    if (error) throw error;
  }

  async function reply(commentId, text) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('blog_comments').update({ admin_reply: text || null }).eq('id', commentId);
    if (error) throw error;
  }

  window.AdminCommentsModule = { list, approve, remove, reply };
})();
