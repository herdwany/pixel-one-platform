(function initAuthApi() {
  async function signInWithPassword({ email, password }) {
    const sb = getSupabaseClient();
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp({ email, password, metadata }) {
    const sb = getSupabaseClient();
    const { error, data } = await sb.auth.signUp({
      email,
      password,
      options: { data: metadata || {} },
    });
    if (error) throw error;
    return data;
  }

  async function signInWithGoogleOAuth(redirectTo) {
    const sb = getSupabaseClient();
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
    if (error) throw error;
  }

  async function resetPasswordForEmail(email, redirectTo) {
    const sb = getSupabaseClient();
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
  }

  async function setSessionFromUrlHash() {
    const sb = getSupabaseClient();
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    if (!access_token || !refresh_token) return false;

    const { error } = await sb.auth.setSession({ access_token, refresh_token });
    if (error) throw error;
    return true;
  }

  window.AuthAPI = {
    signInWithPassword,
    signUp,
    signInWithGoogleOAuth,
    resetPasswordForEmail,
    setSessionFromUrlHash,
  };
})();
