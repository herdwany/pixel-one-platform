(function initAppState() {
  const state = {
    blog: {
      page: 1,
      limit: 10,
      search: '',
    },
    admin: {
      orders: { page: 1, limit: 10 },
      users: { page: 1, limit: 10 },
      comments: { page: 1, limit: 10 },
    },
  };

  function get(path) {
    return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), state);
  }

  function set(path, value) {
    const parts = path.split('.');
    const last = parts.pop();
    const target = parts.reduce((acc, part) => {
      if (!acc[part]) acc[part] = {};
      return acc[part];
    }, state);
    target[last] = value;
  }

  window.PixelOneState = { get, set };
})();
