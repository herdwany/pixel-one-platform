(function initAdminUsersModule() {
  async function list(page = 1, limit = 10) {
    return UsersAPI.listUsers({ page, limit });
  }

  async function ban(userId) {
    return UsersAPI.updateUser(userId, { is_banned: true });
  }

  async function unban(userId) {
    return UsersAPI.updateUser(userId, { is_banned: false });
  }

  async function promoteToAdmin(userId) {
    return UsersAPI.updateUser(userId, { role: 'admin' });
  }

  window.AdminUsersModule = { list, ban, unban, promoteToAdmin };
})();
