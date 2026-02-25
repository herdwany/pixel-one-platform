(function initStorageApi() {
  async function createSignedUrl(bucket, path, expiresInSeconds = 60) {
    const sb = getSupabaseClient();
    const { data, error } = await sb.storage.from(bucket).createSignedUrl(path, expiresInSeconds);
    if (error) throw error;
    return data?.signedUrl || null;
  }

  async function upload(bucket, path, file, options = {}) {
    const sb = getSupabaseClient();
    const { error } = await sb.storage.from(bucket).upload(path, file, options);
    if (error) throw error;
  }

  function getPublicUrl(bucket, path) {
    const sb = getSupabaseClient();
    const { data } = sb.storage.from(bucket).getPublicUrl(path);
    return data?.publicUrl || null;
  }

  window.StorageAPI = {
    createSignedUrl,
    upload,
    getPublicUrl,
  };
})();
