(function initErrorHandler() {
  function buildUserMessage(error, fallback) {
    if (!error) return fallback || 'Une erreur est survenue.';
    const code = error.code || error.status;

    if (code === 'P0001') return 'Trop de requêtes. Réessayez dans une minute.';
    if (code === '23505') return 'Une donnée similaire existe déjà.';
    if (code === '42501') return 'Action non autorisée.';

    return fallback || 'Une erreur est survenue. Veuillez réessayer.';
  }

  async function handleError(error, context = 'unknown', options = {}) {
    const safeMessage = buildUserMessage(error, options.fallbackMessage);

    if (options.logToConsole !== false) {
      console.error(`[PixelOne][${context}]`, {
        message: error?.message,
        code: error?.code,
        status: error?.status,
      });
    }

    if (options.logToSystem !== false) {
      try {
        const sb = getSupabaseClient();
        await sb.from('system_logs').insert({
          level: options.level || 'error',
          message: error?.message || safeMessage,
          context: {
            context,
            code: error?.code || null,
            status: error?.status || null,
          },
        });
      } catch (_) {
        // silent by design
      }
    }

    return safeMessage;
  }

  window.PixelOneErrorHandler = {
    handleError,
    buildUserMessage,
  };
})();
