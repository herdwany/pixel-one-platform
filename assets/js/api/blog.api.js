(function initBlogApi() {
  async function listPublished({ page = 1, limit = 10, search = '' } = {}) {
    const offset = (page - 1) * limit;
    const sb = getSupabaseClient();

    let query = sb
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search && search.trim()) {
      const searchText = search.trim().replace(/\s+/g, ' & ');
      query = query.textSearch('search_vector', searchText, { type: 'websearch' });
    }

    const { data, error, count } = await query;
    if (error) throw error;
    return { rows: data || [], count: count || 0 };
  }

  async function getPublishedBySlug(slug) {
    const sb = getSupabaseClient();
    const { data, error } = await sb
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    if (error) throw error;
    return data;
  }

  async function incrementViewCount(postId, nextCount) {
    const sb = getSupabaseClient();
    const { error } = await sb
      .from('blog_posts')
      .update({ view_count: nextCount })
      .eq('id', postId);
    if (error) throw error;
  }

  async function listApprovedComments(postId) {
    const sb = getSupabaseClient();
    const { data, error } = await sb
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .eq('is_approved', true)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async function listCommentLikes(commentIds) {
    if (!commentIds.length) return [];
    const sb = getSupabaseClient();
    const { data, error } = await sb
      .from('comment_likes')
      .select('comment_id, user_id')
      .in('comment_id', commentIds);
    if (error) throw error;
    return data || [];
  }

  async function submitComment(payload) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('blog_comments').insert(payload);
    if (error) throw error;
  }

  async function submitReply(payload) {
    const sb = getSupabaseClient();
    const { error } = await sb.from('blog_comments').insert(payload);
    if (error) throw error;
  }

  async function toggleLike({ commentId, userId }) {
    const sb = getSupabaseClient();
    const { data: existing } = await sb
      .from('comment_likes')
      .select('user_id')
      .eq('user_id', userId)
      .eq('comment_id', commentId)
      .maybeSingle();

    if (existing) {
      const { error } = await sb.from('comment_likes').delete()
        .eq('user_id', userId)
        .eq('comment_id', commentId);
      if (error) throw error;
      return { liked: false };
    }

    const { error } = await sb.from('comment_likes').insert({ user_id: userId, comment_id: commentId });
    if (error) throw error;
    return { liked: true };
  }

  window.BlogAPI = {
    listPublished,
    getPublishedBySlug,
    incrementViewCount,
    listApprovedComments,
    listCommentLikes,
    submitComment,
    submitReply,
    toggleLike,
  };
})();
