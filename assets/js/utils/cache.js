(function initCacheUtils() {
  const PREFIX = 'px_cache:';

  function now() {
    return Date.now();
  }

  function key(rawKey) {
    return `${PREFIX}${rawKey}`;
  }

  function set(rawKey, value, ttlMs) {
    const payload = {
      value,
      expiresAt: ttlMs ? now() + ttlMs : null,
    };
    localStorage.setItem(key(rawKey), JSON.stringify(payload));
  }

  function get(rawKey) {
    const raw = localStorage.getItem(key(rawKey));
    if (!raw) return null;

    try {
      const payload = JSON.parse(raw);
      if (payload.expiresAt && payload.expiresAt < now()) {
        localStorage.removeItem(key(rawKey));
        return null;
      }
      return payload.value;
    } catch (_) {
      localStorage.removeItem(key(rawKey));
      return null;
    }
  }

  function remove(rawKey) {
    localStorage.removeItem(key(rawKey));
  }

  window.PixelOneCache = { set, get, remove };
})();
