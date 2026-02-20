// ============================================================
// Pixel One v2 – Internationalisation (i18n)
// Supported languages: fr (default) | en | ar
// ============================================================

const TRANSLATIONS = {
  fr: {
    // ── Meta ──────────────────────────────────────────────────
    'page.title': 'Pixel One — Agence Créative Maroc',

    // ── Navbar ────────────────────────────────────────────────
    'nav.services':  'Services',
    'nav.why':       'Pourquoi nous',
    'nav.contact':   'Contact',
    'nav.login':     'Connexion',
    'nav.cta':       'Nos services',

    // ── Hero ──────────────────────────────────────────────────
    'hero.badge':    'Agence Créative — Maroc 🇲🇦',
    'hero.title':    'Votre vision,',
    'hero.title.accent': 'amplifiée.',
    'hero.desc':     'Design, vidéo et développement web premium pour les marques ambitieuses. Commandez en ligne, suivez votre projet en temps réel.',
    'hero.cta.primary':   'Voir les services',
    'hero.cta.secondary': 'Créer un compte',

    // ── Stats ─────────────────────────────────────────────────
    'stat.projects': 'Projets livrés',
    'stat.clients':  'Clients satisfaits',
    'stat.delay':    'Délai moyen',
    'stat.rating':   'Note moyenne',

    // ── Services section ──────────────────────────────────────
    'services.title':    'Nos',
    'services.title.accent': 'Services',
    'services.desc':     'Des solutions créatives sur-mesure pour propulser votre marque.',
    'services.all':      'Voir tous les services',

    // ── Why Us ────────────────────────────────────────────────
    'why.title':     'Pourquoi',
    'why.title.accent': 'Pixel One',
    'why.title.suffix': ' ?',
    'why.desc':      'Un processus simple, transparent et efficace.',
    'why.fast.title': 'Livraison Rapide',
    'why.fast.desc':  'Délais respectés, toujours. Suivi en temps réel depuis votre tableau de bord.',
    'why.secure.title': 'Paiement Sécurisé',
    'why.secure.desc':  'Virement bancaire, CashPlus — votre preuve de paiement uploadée en un clic.',
    'why.support.title': 'Support WhatsApp',
    'why.support.desc':  'Après commande, notifiez l\'équipe directement sur WhatsApp en un clic.',

    // ── Process ───────────────────────────────────────────────
    'process.title':    'Comment ça',
    'process.title.accent': 'marche ?',
    'process.subtitle': 'Quatre étapes, zéro friction.',
    'process.step1':    'Choisissez un service',
    'process.step2':    'Remplissez le formulaire',
    'process.step3':    'Payez & uploadez le reçu',
    'process.step4':    'Suivez votre commande',

    // ── Contact CTA ───────────────────────────────────────────
    'contact.title':    'Prêt à démarrer votre',
    'contact.title.accent': 'projet',
    'contact.title.suffix': ' ?',
    'contact.desc':     'Notre équipe est disponible du lundi au vendredi, 9h–18h.',
    'contact.cta':      'Commencer maintenant',
    'contact.whatsapp': 'WhatsApp',

    // ── Footer ────────────────────────────────────────────────
    'footer.services':   'Services',
    'footer.login':      'Connexion',
    'footer.dashboard':  'Mon espace',
    'footer.made':       'Made in Morocco',
  },

  en: {
    'page.title': 'Pixel One — Creative Agency Morocco',

    'nav.services':  'Services',
    'nav.why':       'Why us',
    'nav.contact':   'Contact',
    'nav.login':     'Sign in',
    'nav.cta':       'Our services',

    'hero.badge':    'Creative Agency — Morocco 🇲🇦',
    'hero.title':    'Your vision,',
    'hero.title.accent': 'amplified.',
    'hero.desc':     'Premium design, video, and web development for ambitious brands. Order online, track your project in real time.',
    'hero.cta.primary':   'View services',
    'hero.cta.secondary': 'Create an account',

    'stat.projects': 'Projects delivered',
    'stat.clients':  'Satisfied clients',
    'stat.delay':    'Average lead time',
    'stat.rating':   'Average rating',

    'services.title':    'Our',
    'services.title.accent': 'Services',
    'services.desc':     'Tailor-made creative solutions to elevate your brand.',
    'services.all':      'View all services',

    'why.title':     'Why',
    'why.title.accent': 'Pixel One',
    'why.title.suffix': '?',
    'why.desc':      'A simple, transparent, and efficient process.',
    'why.fast.title': 'Fast Delivery',
    'why.fast.desc':  'Deadlines always met. Real-time tracking from your dashboard.',
    'why.secure.title': 'Secure Payment',
    'why.secure.desc':  'Bank transfer, CashPlus — upload your payment receipt in one click.',
    'why.support.title': 'WhatsApp Support',
    'why.support.desc':  'After ordering, notify the team directly on WhatsApp with one click.',

    'process.title':    'How does it',
    'process.title.accent': 'work?',
    'process.subtitle': 'Four steps, zero friction.',
    'process.step1':    'Choose a service',
    'process.step2':    'Fill in the form',
    'process.step3':    'Pay & upload receipt',
    'process.step4':    'Track your order',

    'contact.title':    'Ready to start your',
    'contact.title.accent': 'project',
    'contact.title.suffix': '?',
    'contact.desc':     'Our team is available Monday to Friday, 9am–6pm.',
    'contact.cta':      'Get started',
    'contact.whatsapp': 'WhatsApp',

    'footer.services':   'Services',
    'footer.login':      'Sign in',
    'footer.dashboard':  'My space',
    'footer.made':       'Made in Morocco',
  },

  ar: {
    'page.title': 'بيكسل ون — وكالة إبداعية بالمغرب',

    'nav.services':  'الخدمات',
    'nav.why':       'لماذا نحن',
    'nav.contact':   'تواصل',
    'nav.login':     'تسجيل الدخول',
    'nav.cta':       'خدماتنا',

    'hero.badge':    'وكالة إبداعية — المغرب 🇲🇦',
    'hero.title':    'رؤيتك،',
    'hero.title.accent': 'مُعزَّزة.',
    'hero.desc':     'تصميم وفيديو وتطوير ويب احترافي للعلامات التجارية الطموحة. اطلب عبر الإنترنت وتابع مشروعك في الوقت الفعلي.',
    'hero.cta.primary':   'استعرض الخدمات',
    'hero.cta.secondary': 'إنشاء حساب',

    'stat.projects': 'مشروع مُنجز',
    'stat.clients':  'عملاء راضون',
    'stat.delay':    'متوسط وقت التسليم',
    'stat.rating':   'متوسط التقييم',

    'services.title':    'خدماتنا',
    // Arabic combines title + accent into one word; accent span is intentionally left untranslated
    'services.title.accent': '',
    'services.desc':     'حلول إبداعية مخصصة لتعزيز علامتك التجارية.',
    'services.all':      'عرض جميع الخدمات',

    'why.title':     'لماذا',
    'why.title.accent': 'بيكسل ون',
    'why.title.suffix': '؟',
    'why.desc':      'عملية بسيطة وشفافة وفعّالة.',
    'why.fast.title': 'تسليم سريع',
    'why.fast.desc':  'نلتزم دائماً بالمواعيد. تتبّع مشروعك في الوقت الفعلي من لوحة التحكم.',
    'why.secure.title': 'دفع آمن',
    'why.secure.desc':  'تحويل بنكي أو CashPlus — ارفع إيصال الدفع بنقرة واحدة.',
    'why.support.title': 'دعم عبر واتساب',
    'why.support.desc':  'بعد الطلب، أخبر الفريق مباشرةً عبر واتساب بنقرة واحدة.',

    'process.title':    'كيف',
    'process.title.accent': 'يعمل؟',
    'process.subtitle': 'أربع خطوات، بدون تعقيد.',
    'process.step1':    'اختر خدمة',
    'process.step2':    'أكمل النموذج',
    'process.step3':    'ادفع وارفع الإيصال',
    'process.step4':    'تابع طلبك',

    'contact.title':    'هل أنت مستعد لبدء',
    'contact.title.accent': 'مشروعك',
    'contact.title.suffix': '؟',
    'contact.desc':     'فريقنا متاح من الاثنين إلى الجمعة، من 9 صباحاً حتى 6 مساءً.',
    'contact.cta':      'ابدأ الآن',
    'contact.whatsapp': 'واتساب',

    'footer.services':   'الخدمات',
    'footer.login':      'تسجيل الدخول',
    'footer.dashboard':  'مساحتي',
    'footer.made':       'صُنع في المغرب',
  },
};

// Font & direction config per language
const LANG_CONFIG = {
  fr: { font: 'Inter', dir: 'ltr' },
  en: { font: 'Inter', dir: 'ltr' },
  ar: { font: 'Cairo', dir: 'rtl' },
};

/**
 * Applies the chosen language to the page.
 * - Updates <html> lang + dir attributes
 * - Persists the choice to localStorage
 * - Updates body font-family
 * - Updates document <title>
 * - Translates all elements with data-i18n="key"
 *
 * @param {string} lang – 'fr' | 'en' | 'ar'
 */
function setLanguage(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  const cfg = LANG_CONFIG[lang];
  const html = document.documentElement;

  // Update <html> attributes
  html.setAttribute('lang', lang);
  html.setAttribute('dir', cfg.dir);

  // Persist choice
  localStorage.setItem('px_lang', lang);

  // Update font-family
  document.body.style.fontFamily = `'${cfg.font}', sans-serif`;

  // Update page title
  if (dict['page.title']) document.title = dict['page.title'];

  // Translate all marked elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });
}

/**
 * Initialises i18n on DOMContentLoaded.
 * Uses the stored preference, falling back to 'fr'.
 * All [data-i18n] target elements are text-only leaves — no child elements
 * are nested inside them — so setting textContent is safe.
 */
function initI18n() {
  const saved = localStorage.getItem('px_lang') || 'fr';
  const valid = Object.keys(TRANSLATIONS).includes(saved) ? saved : 'fr';
  setLanguage(valid);

  // Keep the language switcher in sync with the current selection
  const switcher = document.getElementById('lang-switcher');
  if (switcher) {
    switcher.value = valid;
    switcher.addEventListener('change', () => setLanguage(switcher.value));
  }
}

document.addEventListener('DOMContentLoaded', initI18n);
