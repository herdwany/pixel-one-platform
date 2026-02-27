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

    /* ── FIX: Aggressive overrides from pixel-design.css ── */
    html:not(.dark) h1,
    html:not(.dark) h2,
    html:not(.dark) h3,
    html:not(.dark) h4 {
      color: #111827 !important;
      text-shadow: none !important;
    }
    html:not(.dark) p,
    html:not(.dark) li {
      color: #374151 !important;
    }
    /* ───────────────────────────────────────────────────────── */


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

    /* ── Hardcoded gray text (privacy/terms/blog pages) ── */
    html:not(.dark) [class*="text-[#e5e5e5]"] { color: #374151 !important; }
    html:not(.dark) [class*="text-[#e5e"] { color: #374151 !important; }

    /* ── bg-card alias (blog page) ── */
    html:not(.dark) .bg-card { background-color: #ffffff !important; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }

    /* ── Blog prose content (light mode) ── */
    html:not(.dark) .prose h1,
    html:not(.dark) .prose h2,
    html:not(.dark) .prose h3 { color: #1f2937 !important; }
    html:not(.dark) .prose p,
    html:not(.dark) .prose li,
    html:not(.dark) .prose ul,
    html:not(.dark) .prose ol { color: #374151 !important; }
    html:not(.dark) .prose blockquote { color: #6b7280 !important; border-left-color: #ff0000 !important; }
    html:not(.dark) .prose code { background: #f3f4f6 !important; color: #dc2626 !important; }
    html:not(.dark) .prose pre { background: #f9fafb !important; border-color: #e5e7eb !important; }
    html:not(.dark) .prose pre code { background: none !important; color: #374151 !important; }
    html:not(.dark) .prose hr { border-color: #e5e7eb !important; }
    html:not(.dark) .prose img { box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

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

    /* ── Mobile Menu ── */
    #mobile-menu {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
    #mobile-menu.open { max-height: 600px; }

    /* ── Dropdown animation ── */
    @keyframes px-dropdown-in {
      from { opacity: 0; transform: translateY(-6px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    #lang-dropdown:not(.hidden) { animation: px-dropdown-in 0.2s ease-out; }

    /* ── Nav scroll shadow ── */
    nav.scrolled { box-shadow: 0 1px 12px rgba(0,0,0,0.25); }
    html:not(.dark) nav.scrolled { box-shadow: 0 1px 8px rgba(0,0,0,0.06); }

    /* ── Page entrance animations ── */
    @keyframes px-fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: none; }
    }
    .animate-fade-up { animation: px-fade-up 0.6s ease-out both; }

    @keyframes px-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .animate-fade-in { animation: px-fade-in 0.5s ease-out both; }
  `;
  document.head.appendChild(css);


  /* ── 2. Determine & apply theme (runs synchronously in <head>) ── */
  const STORAGE_KEY = 'px_theme';
  const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getEffectiveTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved === 'dark';
    return systemQuery.matches;
  }

  const isDark = getEffectiveTheme();
  document.documentElement.classList.toggle('dark', isDark);


  /* ── 3. Favicon switching ──────────────────────────────────── */
  function updateFavicons(dark) {
    const folder = dark ? '/icon/black' : '/icon/white';
    const targets = [
      ['link[rel="icon"][type="image/png"]',     'favicon-96x96.png'],
      ['link[rel="icon"][type="image/svg+xml"]',  'favicon.svg'],
      ['link[rel="shortcut icon"]',               'favicon.ico'],
      ['link[rel="apple-touch-icon"]',            'apple-touch-icon.png'],
    ];
    targets.forEach(([selector, file]) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('href', folder + '/' + file);
    });
  }


  /* ── 4. Update toggle icon(s) ──────────────────────────────── */
  function updateToggleIcon(dark) {
    const cls = 'theme-toggle-icon fa-solid ' + (dark ? 'fa-sun' : 'fa-moon');
    document.querySelectorAll('.theme-toggle-icon').forEach(function (i) { i.className = cls; });
    const legacy = document.getElementById('theme-toggle-icon');
    if (legacy) legacy.className = cls;
  }


  /* ── 5. Apply theme with transition ────────────────────────── */
  function applyTheme(dark, animate) {
    if (animate) document.documentElement.classList.add('theme-transition');
    document.documentElement.classList.toggle('dark', dark);
    updateFavicons(dark);
    updateToggleIcon(dark);
    if (animate) setTimeout(function () { document.documentElement.classList.remove('theme-transition'); }, 350);
  }


  /* ── 6. Public toggle function ─────────────────────────────── */
  window.toggleTheme = function (e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const nowDark = !document.documentElement.classList.contains('dark');
    localStorage.setItem(STORAGE_KEY, nowDark ? 'dark' : 'light');
    applyTheme(nowDark, true);
  };


  /* ── 7. Listen for system theme changes ─────────────────────── */
  try {
    systemQuery.addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches, true);
    });
  } catch (_) { /* Safari < 14 fallback */ }


  /* ── 8. Mobile menu toggle ─────────────────────────────────── */
  window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobile-menu');
    const icon = document.querySelector('#mobile-menu-btn i');
    if (!menu) return;
    const opening = !menu.classList.contains('open');
    if (opening) {
      menu.classList.remove('hidden');
      requestAnimationFrame(function () {
        menu.style.maxHeight = menu.scrollHeight + 'px';
        menu.classList.add('open');
      });
      if (icon) icon.className = 'fa-solid fa-xmark text-sm';
    } else {
      menu.style.maxHeight = '0';
      menu.classList.remove('open');
      if (icon) icon.className = 'fa-solid fa-bars text-sm';
      setTimeout(function () { if (!menu.classList.contains('open')) menu.classList.add('hidden'); }, 350);
    }
  };


  /* ── 9. Navbar scroll effect ───────────────────────────────── */
  function initNavScroll() {
    const nav = document.getElementById('main-nav') || document.querySelector('nav');
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ── 10. Apply on load ─────────────────────────────────────── */
  updateFavicons(isDark);

  function onReady() {
    updateFavicons(isDark);
    updateToggleIcon(isDark);
    initNavScroll();
    document.querySelectorAll('img').forEach(function (img) {
      if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
    });
    document.addEventListener('langchange', function () {
      var menu = document.getElementById('mobile-menu');
      if (menu && menu.classList.contains('open')) window.toggleMobileMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

})();
