// ═══════════════════════════════════════════════════════════════
// theme-manager.js — Dark/Light Mode + Dynamic Favicon Switching
// Load in <head> BEFORE Tailwind CDN to prevent FOUC
// ═══════════════════════════════════════════════════════════════
(function () {

  /* ── 1. Inject light-mode CSS overrides ──────────────────── */
  const css = document.createElement('style');
  css.id = 'px-theme-overrides';
  css.textContent = `
    /* ── Transition for smooth theme switching ── */
    html.theme-transition,
    html.theme-transition *,
    html.theme-transition *::before,
    html.theme-transition *::after {
      transition: background-color 0.3s ease, color 0.3s ease,
                  border-color 0.3s ease, box-shadow 0.3s ease !important;
    }

    /* ═══ LIGHT MODE OVERRIDES ═══════════════════════════════ */

    /* ── Body ── */
    html:not(.dark) body {
      background-color: #ffffff !important;
      color: #1f2937 !important;
    }
    html:not(.dark) body::before { opacity: 0.015 !important; }

    /* ── Navbar ── */
    html:not(.dark) nav {
      background: rgba(255,255,255,0.85) !important;
      border-color: #e5e7eb !important;
    }

    /* ── Text Colors ── */
    html:not(.dark) .text-white { color: #1f2937 !important; }
    html:not(.dark) .text-gray-300 { color: #374151 !important; }
    html:not(.dark) .text-gray-400 { color: #4b5563 !important; }
    html:not(.dark) .text-gray-500 { color: #6b7280 !important; }
    html:not(.dark) .text-gray-600 { color: #9ca3af !important; }

    /* ── Preserve white text on brand/red solid backgrounds ── */
    html:not(.dark) .bg-brand,
    html:not(.dark) .bg-brand-dark,
    html:not(.dark) .bg-red-500,
    html:not(.dark) .bg-red-600 { color: #ffffff !important; }

    /* ── Surface & Card backgrounds ── */
    html:not(.dark) .bg-surface { background-color: #f9fafb !important; }
    html:not(.dark) .bg-surface-card { background-color: #ffffff !important; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }

    /* ── Borders ── */
    html:not(.dark) .border-surface-border { border-color: #e5e7eb !important; }

    /* ── Hardcoded dark backgrounds ── */
    html:not(.dark) [class*="bg-[#050505]"] { background-color: #ffffff !important; }
    html:not(.dark) [class*="bg-[#0d0d0d]"] { background-color: #f9fafb !important; }
    html:not(.dark) [class*="bg-[#111]"]     { background-color: #ffffff !important; }
    html:not(.dark) [class*="bg-[#141414]"] { background-color: #ffffff !important; }
    html:not(.dark) [class*="bg-[#161616]"] { background-color: #ffffff !important; }
    html:not(.dark) [class*="bg-[#1a1a1a]"] { background-color: #f3f4f6 !important; }

    /* ── Hardcoded borders ── */
    html:not(.dark) [class*="border-[#252525]"],
    html:not(.dark) [class*="border-[#282828]"],
    html:not(.dark) [class*="border-[#1f1f1f]"] { border-color: #e5e7eb !important; }

    /* ── Black overlays ── */
    html:not(.dark) [class*="bg-black/7"]  { background-color: rgba(255,255,255,0.85) !important; }
    html:not(.dark) [class*="bg-black/8"]  { background-color: rgba(255,255,255,0.9) !important; }
    html:not(.dark) [class*="bg-black/9"]  { background-color: rgba(255,255,255,0.95) !important; }
    html:not(.dark) [class*="bg-black/5"]  { background-color: rgba(255,255,255,0.5) !important; }

    /* ── Hero gradient ── */
    html:not(.dark) .hero-gradient {
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,0,0,0.06) 0%, transparent 70%) !important;
    }

    /* ── Gradient overlays (e.g. hero video) ── */
    html:not(.dark) [class*="from-[#050505]"] {
      --tw-gradient-from: rgba(255,255,255,0.5) !important;
      --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important;
    }
    html:not(.dark) [class*="to-[#050505]"] {
      --tw-gradient-to: #ffffff !important;
    }

    /* ── Glow effects ── */
    html:not(.dark) .glow      { box-shadow: 0 4px 20px rgba(255,0,0,0.12) !important; }
    html:not(.dark) .glow-text { text-shadow: none !important; }

    /* ── Divider lines (h-px bg-[#282828]) ── */
    html:not(.dark) .h-px[class*="bg-[#2"] { background-color: #e5e7eb !important; }

    /* ── Status badges (keep their own colors) ── */
    html:not(.dark) [class*="status-"] { color: inherit; }

    /* ── Select / Input elements ── */
    html:not(.dark) select,
    html:not(.dark) input:not([type="submit"]):not([type="button"]),
    html:not(.dark) textarea {
      background-color: #f9fafb !important;
      color: #1f2937 !important;
      border-color: #d1d5db !important;
    }

    /* ── Sidebar (admin) ── */
    html:not(.dark) aside {
      background-color: #f9fafb !important;
      border-color: #e5e7eb !important;
    }
    html:not(.dark) .nav-item { color: #6b7280 !important; }
    html:not(.dark) .nav-item:hover,
    html:not(.dark) .nav-item.active { background: rgba(255,0,0,0.06) !important; color: #1f2937 !important; }

    /* ── Brand pill badges (bg-brand/10) ── */
    html:not(.dark) [class*="bg-brand/10"],
    html:not(.dark) [class*="bg-red-500/10"] {
      background-color: rgba(255,0,0,0.08) !important;
    }

    /* ── Toggle button ── */
    #theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
      transition: color 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
    }
    #theme-toggle:hover {
      transform: scale(1.15);
    }
    html.dark #theme-toggle:hover { background-color: rgba(255,255,255,0.08); }
    html:not(.dark) #theme-toggle:hover { background-color: rgba(0,0,0,0.06); }
  `;
  document.head.appendChild(css);


  /* ── 2. Determine & apply theme (runs synchronously in <head>) ── */
  const STORAGE_KEY = 'px_theme';
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }


  /* ── 3. Favicon switching ──────────────────────────────────── */
  function updateFavicons(dark) {
    const folder = dark ? '/icon/black' : '/icon/white';
    const targets = [
      ['link[rel="icon"][type="image/png"]',     'favicon-96x96.png'],
      ['link[rel="icon"][type="image/svg+xml"]',  'favicon.svg'],
      ['link[rel="shortcut icon"]',               'favicon.ico'],
      ['link[rel="apple-touch-icon"]',            'apple-touch-icon.png'],
      ['link[rel="manifest"]',                    'site.webmanifest'],
    ];
    targets.forEach(([selector, file]) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('href', folder + '/' + file);
    });
  }


  /* ── 4. Update toggle icon ─────────────────────────────────── */
  function updateToggleIcon(dark) {
    const icon = document.getElementById('theme-toggle-icon');
    if (!icon) return;
    // Dark mode active → show Sun (click to go Light)
    // Light mode active → show Moon (click to go Dark)
    icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }


  /* ── 5. Public toggle function ─────────────────────────────── */
  window.toggleTheme = function () {
    // Smooth transition class
    document.documentElement.classList.add('theme-transition');

    const nowDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(STORAGE_KEY, nowDark ? 'dark' : 'light');
    updateFavicons(nowDark);
    updateToggleIcon(nowDark);

    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 350);
  };


  /* ── 6. Apply on load ──────────────────────────────────────── */
  // Attempt immediate favicon update (link tags may already be parsed)
  updateFavicons(isDark);

  // Re-apply once DOM is fully ready (ensures all link tags are available)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      updateFavicons(isDark);
      updateToggleIcon(isDark);
    });
  } else {
    updateToggleIcon(isDark);
  }

})();
