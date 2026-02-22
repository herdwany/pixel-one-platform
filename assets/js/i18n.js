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
    'nav.myspace':   'Mon espace',

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
    'services.title':        'Nos',
    'services.title.accent': 'Services',
    'services.desc':         'Des solutions créatives sur-mesure pour propulser votre marque.',
    'services.all':          'Voir tous les services',

    // ── Why Us ────────────────────────────────────────────────
    'why.title':        'Pourquoi',
    'why.title.accent': 'Pixel One',
    'why.title.suffix': ' ?',
    'why.desc':         'Un processus simple, transparent et efficace.',
    'why.fast.title':   'Livraison Rapide',
    'why.fast.desc':    'Délais respectés, toujours. Suivi en temps réel depuis votre tableau de bord.',
    'why.secure.title': 'Paiement Sécurisé',
    'why.secure.desc':  'Virement bancaire, CashPlus — votre preuve de paiement uploadée en un clic.',
    'why.support.title': 'Support WhatsApp',
    'why.support.desc':  'Après commande, notifiez l\'équipe directement sur WhatsApp en un clic.',

    // ── Process ───────────────────────────────────────────────
    'process.title':        'Comment ça',
    'process.title.accent': 'marche ?',
    'process.subtitle':     'Quatre étapes, zéro friction.',
    'process.step1':        'Choisissez un service',
    'process.step2':        'Remplissez le formulaire',
    'process.step3':        'Payez & uploadez le reçu',
    'process.step4':        'Suivez votre commande',

    // ── Contact CTA ───────────────────────────────────────────
    'contact.title':        'Prêt à démarrer votre',
    'contact.title.accent': 'projet',
    'contact.title.suffix': ' ?',
    'contact.desc':         'Notre équipe est disponible du lundi au vendredi, 9h–18h.',
    'contact.cta':          'Commencer maintenant',
    'contact.whatsapp':     'WhatsApp',

    // ── Footer ────────────────────────────────────────────────
    'footer.services':  'Services',
    'footer.login':     'Connexion',
    'footer.dashboard': 'Mon espace',
    'footer.made':      'Made in Morocco',

    // ── Categories ────────────────────────────────────────────
    'cat.video':  'Vidéo & Motion',
    'cat.design': 'Design Graphique',
    'cat.web':    'Développement Web',

    // ── Order statuses ────────────────────────────────────────
    'status.pending':     'En attente',
    'status.in_progress': 'En cours',
    'status.review':      'En révision',
    'status.done':        'Terminé',

    // ── Auth page ─────────────────────────────────────────────
    'auth.page.title':           'Connexion / Inscription — Pixel One',
    'auth.tagline':              'Votre espace créatif',
    'auth.tab.login':            'Connexion',
    'auth.tab.signup':           'Créer un compte',
    'auth.label.email':          'Email',
    'auth.label.password':       'Mot de passe',
    'auth.label.forgot':         'Mot de passe oublié ?',
    'auth.label.fullname':       'Nom complet',
    'auth.label.phone':          'Téléphone',
    'auth.btn.login':            'Se connecter',
    'auth.btn.signup':           'Créer mon compte',
    'auth.btn.loading':          'Chargement…',
    'auth.divider':              'OU',
    'auth.google':               'Continuer avec Google',
    'auth.back':                 '← Retour à l\'accueil',
    'auth.placeholder.email':    'email@exemple.com',
    'auth.placeholder.fullname': 'Mohamed Benali',
    'auth.placeholder.phone':    '+212 6XX XXX XXX',
    'auth.placeholder.pw.min':   'Minimum 8 caractères',
    'auth.msg.pw_min':           'Le mot de passe doit contenir au moins 8 caractères.',
    'auth.msg.signup_success':   'Compte créé ! Vérifiez votre email pour confirmer votre inscription.',
    'auth.msg.login_error':      'Erreur de connexion.',
    'auth.msg.signup_error':     'Erreur lors de l\'inscription.',
    'auth.msg.google_error':     'Erreur Google OAuth.',
    'auth.msg.forgot_email':     'Entrez votre email pour réinitialiser le mot de passe.',
    'auth.msg.forgot_sent':      'Email de réinitialisation envoyé !',
    'auth.msg.forgot_error':     'Erreur lors de la réinitialisation.',

    // ── Services page ─────────────────────────────────────────
    'svc.page.title':             'Services — Pixel One',
    'svc.header.title1':          'Catalogue des',
    'svc.header.title2':          'Services',
    'svc.header.desc':            'Choisissez votre service et commandez en quelques clics.',
    'svc.filter.search.label':    'Recherche',
    'svc.filter.search.ph':       'Montage vidéo…',
    'svc.filter.cat.label':       'Catégorie',
    'svc.filter.all':             'Tout',
    'svc.filter.price.label':     'Prix max',
    'svc.filter.reset':           'Réinitialiser',
    'svc.sort.default':           'Trier par défaut',
    'svc.sort.asc':               'Prix croissant',
    'svc.sort.desc':              'Prix décroissant',
    'svc.results':                'service(s) trouvé(s)',
    'svc.empty':                  'Aucun service trouvé pour ces critères.',
    'svc.loading':                'Chargement…',
    'svc.card.order':             'Commander',
    'svc.footer':                 'Agence Créative Maroc',

    // ── Service Details page ──────────────────────────────────
    'detail.page.title':          'Détails du Service — Pixel One',
    'detail.nav.services':        'Services',
    'detail.nav.myspace':         'Mon espace',
    'detail.back':                'Retour aux services',
    'detail.loading':             'Chargement du service…',
    'detail.notfound':            'Service introuvable.',
    'detail.notfound.back':       'Retour',
    'detail.features.title':      'Inclus dans ce service',
    'detail.trust.payment':       'Paiement sécurisé',
    'detail.trust.revisions':     'Révisions incluses',
    'detail.trust.support':       'Support WhatsApp',
    'detail.order.title':         'Commander ce service',
    'detail.form.name.label':     'Votre nom complet *',
    'detail.form.name.ph':        'Mohamed Benali',
    'detail.form.phone.label':    'WhatsApp / Téléphone *',
    'detail.form.phone.ph':       '+212 6XX XXX XXX',
    'detail.form.email.label':    'Email *',
    'detail.form.email.ph':       'email@exemple.com',
    'detail.form.notes.label':    'Notes / Détails supplémentaires',
    'detail.form.notes.ph':       'Décrivez vos besoins, couleurs, style…',
    'detail.payment.title':       'Informations de paiement',
    'detail.upload.label':        'Reçu de paiement *',
    'detail.upload.desc':         'Glissez votre reçu ici ou',
    'detail.upload.browse':       'parcourir',
    'detail.upload.hint':         'JPG, PNG ou PDF — max 5 Mo',
    'detail.btn.submit':          'Confirmer la commande',
    'detail.btn.processing':      'Traitement…',
    'detail.err.auth':            'Erreur: Vous devez être connecté pour passer une commande.',
    'detail.err.noproof':         'Erreur: Vous devez fournir une preuve de paiement.',
    'detail.err.general':         'Une erreur est survenue',
    'detail.success.title':       'Commande enregistrée !',
    'detail.success.ref':         'Référence :',
    'detail.success.whatsapp_desc': 'Notifiez l\'équipe sur WhatsApp pour confirmer votre commande.',
    'detail.success.whatsapp_btn':  'Notifier sur WhatsApp',
    'detail.success.orders':        'Voir mes commandes →',

    // Dynamic form fields — video
    'dynfield.video.duration.label': 'Durée souhaitée',
    'dynfield.video.duration.opt1':  'Moins de 1 min',
    'dynfield.video.duration.opt2':  '1–3 min',
    'dynfield.video.duration.opt3':  '3–5 min',
    'dynfield.video.duration.opt4':  'Plus de 5 min',
    'dynfield.video.style.label':    'Style vidéo',
    'dynfield.video.style.opt1':     'Corporate',
    'dynfield.video.style.opt2':     'Dynamique / Energétique',
    'dynfield.video.style.opt3':     'Cinématique',
    'dynfield.video.style.opt4':     'Animé / Motion Graphics',
    'dynfield.video.footage.label':  'Avez-vous des rushes ?',
    'dynfield.video.footage.opt1':   'Oui, je vais les envoyer',
    'dynfield.video.footage.opt2':   'Non, tournage inclus',

    // Dynamic form fields — design
    'dynfield.design.format.label':  'Format principal',
    'dynfield.design.format.opt1':   'Logo',
    'dynfield.design.format.opt2':   'Affiche / Flyer',
    'dynfield.design.format.opt3':   'Post Social Media',
    'dynfield.design.format.opt4':   'Identité complète',
    'dynfield.design.colors.label':  'Couleurs préférées',
    'dynfield.design.colors.ph':     'Ex : rouge, noir, doré',
    'dynfield.design.refs.label':    'Références / Inspirations (liens)',
    'dynfield.design.refs.ph':       'https://…',

    // Dynamic form fields — web
    'dynfield.web.pages.label':  'Nombre de pages',
    'dynfield.web.pages.opt1':   '1 page (One-Page)',
    'dynfield.web.pages.opt2':   '3–5 pages',
    'dynfield.web.pages.opt3':   'Plus de 5 pages',
    'dynfield.web.cms.label':    'CMS souhaité',
    'dynfield.web.cms.opt1':     'Pas de préférence',
    'dynfield.web.cms.opt2':     'WordPress',
    'dynfield.web.cms.opt3':     'Webflow',
    'dynfield.web.cms.opt4':     'Sur-mesure',
    'dynfield.web.domain.label': 'Avez-vous un nom de domaine ?',
    'dynfield.web.domain.opt1':  'Oui',
    'dynfield.web.domain.opt2':  'Non, à acheter',
    'dynfield.web.domain.opt3':  'Non, pas nécessaire',

    // ── Dashboard page ────────────────────────────────────────
    'dash.page.title':       'Mon Espace — Pixel One',
    'dash.logout':           'Déconnexion',
    'dash.header.title':     'Mon',
    'dash.header.accent':    'Espace',
    'dash.header.desc':      'Suivez l\'avancement de vos commandes en temps réel.',
    'dash.new.order':        'Nouvelle commande',
    'dash.loading':          'Chargement de vos commandes…',
    'dash.empty.title':      'Aucune commande',
    'dash.empty.desc':       'Vous n\'avez pas encore passé de commande.',
    'dash.empty.cta':        'Découvrir nos services',
    'dash.order.date':       'Commandé le',
    'dash.order.receipt':    'Voir le reçu',
    'dash.order.noproof':    'Reçu manquant',
    'dash.order.details':    'Détails de la commande',
    'dash.order.whatsapp':   'Contacter via WhatsApp',
    'dash.err.relogin':      'Se reconnecter',

    // ── Admin page ────────────────────────────────────────────
    'admin.page.title':       'Admin — Pixel One',
    'admin.nav.orders':       'Commandes',
    'admin.nav.services':     'Services',
    'admin.nav.blog':         'Blog',
    'admin.nav.stats':        'Statistiques',
    'admin.nav.client':       'Vue client',
    'admin.nav.logout':       'Déconnexion',
    'admin.orders.title':     'Commandes',
    'admin.stat.total':       'Commandes totales',
    'admin.stat.pending':     'En attente',
    'admin.stat.progress':    'En cours',
    'admin.stat.done':        'Terminées',
    'admin.filter.all':       'Toutes',
    'admin.filter.pending':   'En attente',
    'admin.filter.progress':  'En cours',
    'admin.filter.review':    'Révision',
    'admin.filter.done':      'Terminées',
    'admin.search.ph':        'Rechercher une ref…',
    'admin.table.ref':        'Réf.',
    'admin.table.client':     'Client',
    'admin.table.service':    'Service',
    'admin.table.status':     'Statut',
    'admin.table.date':       'Date',
    'admin.table.actions':    'Actions',
    'admin.table.empty':      'Aucune commande trouvée.',
    'admin.edit.btn':         'Modifier',
    'admin.receipt.btn':      'Reçu',
    'admin.services.title':   'Gestion des Services',
    'admin.services.add':     'Ajouter',
    'admin.blog.title':       'Publier un Article de Blog',
    'admin.blog.art.label':   'Titre de l\'article',
    'admin.blog.slug.label':  'Slug (URL)',
    'admin.blog.img.label':   'Image de couverture (URL)',
    'admin.blog.content.label': 'Contenu (Markdown supporté)',
    'admin.blog.submit':      'Publier l\'article',
    'admin.blog.success':     '✓ Article publié avec succès !',
    'admin.stats.title':      'Statistiques',
    'admin.stats.by_status':  'Commandes par statut',
    'admin.stats.by_cat':     'Revenus par catégorie',
    'admin.modal.title':      'Modifier la commande',
    'admin.modal.ref.label':  'Référence',
    'admin.modal.status.label': 'Statut',
    'admin.modal.save':       'Enregistrer',
    'admin.modal.client.title': 'Informations client',
    'admin.modal.client.name':  'Nom',
    'admin.modal.client.phone': 'Téléphone',
    'admin.modal.client.email': 'Email',
    'admin.modal.details.title': 'Détails de la commande',
    'admin.modal.proof.label':  'Preuve de paiement',
    'admin.modal.proof.open':   'Ouvrir en plein écran',
    'admin.modal.service':    'Service',
    'admin.view.btn':         'Détails',

    // ── Auth callback page ────────────────────────────────────
    'callback.status':   'Vérification de votre compte…',
    'callback.patience': 'Veuillez patienter quelques instants.',
  },

  en: {
    'page.title': 'Pixel One — Creative Agency Morocco',

    'nav.services':  'Services',
    'nav.why':       'Why us',
    'nav.contact':   'Contact',
    'nav.login':     'Sign in',
    'nav.cta':       'Our services',
    'nav.myspace':   'My space',

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

    'services.title':        'Our',
    'services.title.accent': 'Services',
    'services.desc':         'Tailor-made creative solutions to elevate your brand.',
    'services.all':          'View all services',

    'why.title':        'Why',
    'why.title.accent': 'Pixel One',
    'why.title.suffix': '?',
    'why.desc':         'A simple, transparent, and efficient process.',
    'why.fast.title':   'Fast Delivery',
    'why.fast.desc':    'Deadlines always met. Real-time tracking from your dashboard.',
    'why.secure.title': 'Secure Payment',
    'why.secure.desc':  'Bank transfer, CashPlus — upload your payment receipt in one click.',
    'why.support.title': 'WhatsApp Support',
    'why.support.desc':  'After ordering, notify the team directly on WhatsApp with one click.',

    'process.title':        'How does it',
    'process.title.accent': 'work?',
    'process.subtitle':     'Four steps, zero friction.',
    'process.step1':        'Choose a service',
    'process.step2':        'Fill in the form',
    'process.step3':        'Pay & upload receipt',
    'process.step4':        'Track your order',

    'contact.title':        'Ready to start your',
    'contact.title.accent': 'project',
    'contact.title.suffix': '?',
    'contact.desc':         'Our team is available Monday to Friday, 9am–6pm.',
    'contact.cta':          'Get started',
    'contact.whatsapp':     'WhatsApp',

    'footer.services':  'Services',
    'footer.login':     'Sign in',
    'footer.dashboard': 'My space',
    'footer.made':      'Made in Morocco',

    'cat.video':  'Video & Motion',
    'cat.design': 'Graphic Design',
    'cat.web':    'Web Development',

    'status.pending':     'Pending',
    'status.in_progress': 'In Progress',
    'status.review':      'Under Review',
    'status.done':        'Completed',

    'auth.page.title':           'Login / Sign Up — Pixel One',
    'auth.tagline':              'Your creative space',
    'auth.tab.login':            'Sign in',
    'auth.tab.signup':           'Create account',
    'auth.label.email':          'Email',
    'auth.label.password':       'Password',
    'auth.label.forgot':         'Forgot password?',
    'auth.label.fullname':       'Full name',
    'auth.label.phone':          'Phone',
    'auth.btn.login':            'Sign in',
    'auth.btn.signup':           'Create my account',
    'auth.btn.loading':          'Loading…',
    'auth.divider':              'OR',
    'auth.google':               'Continue with Google',
    'auth.back':                 '← Back to homepage',
    'auth.placeholder.email':    'email@example.com',
    'auth.placeholder.fullname': 'John Smith',
    'auth.placeholder.phone':    '+212 6XX XXX XXX',
    'auth.placeholder.pw.min':   'Minimum 8 characters',
    'auth.msg.pw_min':           'Password must be at least 8 characters.',
    'auth.msg.signup_success':   'Account created! Check your email to confirm your registration.',
    'auth.msg.login_error':      'Login error.',
    'auth.msg.signup_error':     'Sign-up error.',
    'auth.msg.google_error':     'Google OAuth error.',
    'auth.msg.forgot_email':     'Enter your email to reset your password.',
    'auth.msg.forgot_sent':      'Reset email sent!',
    'auth.msg.forgot_error':     'Error during password reset.',

    'svc.page.title':          'Services — Pixel One',
    'svc.header.title1':       'Service',
    'svc.header.title2':       'Catalogue',
    'svc.header.desc':         'Choose your service and order in a few clicks.',
    'svc.filter.search.label': 'Search',
    'svc.filter.search.ph':    'Video editing…',
    'svc.filter.cat.label':    'Category',
    'svc.filter.all':          'All',
    'svc.filter.price.label':  'Max price',
    'svc.filter.reset':        'Reset',
    'svc.sort.default':        'Default order',
    'svc.sort.asc':            'Price: low to high',
    'svc.sort.desc':           'Price: high to low',
    'svc.results':             'service(s) found',
    'svc.empty':               'No services found for these criteria.',
    'svc.loading':             'Loading…',
    'svc.card.order':          'Order',
    'svc.footer':              'Creative Agency Morocco',

    'detail.page.title':       'Service Details — Pixel One',
    'detail.nav.services':     'Services',
    'detail.nav.myspace':      'My space',
    'detail.back':             'Back to services',
    'detail.loading':          'Loading service…',
    'detail.notfound':         'Service not found.',
    'detail.notfound.back':    'Back',
    'detail.features.title':   'Included in this service',
    'detail.trust.payment':    'Secure payment',
    'detail.trust.revisions':  'Revisions included',
    'detail.trust.support':    'WhatsApp support',
    'detail.order.title':      'Order this service',
    'detail.form.name.label':  'Your full name *',
    'detail.form.name.ph':     'John Smith',
    'detail.form.phone.label': 'WhatsApp / Phone *',
    'detail.form.phone.ph':    '+212 6XX XXX XXX',
    'detail.form.email.label': 'Email *',
    'detail.form.email.ph':    'email@example.com',
    'detail.form.notes.label': 'Notes / Additional details',
    'detail.form.notes.ph':    'Describe your needs, colours, style…',
    'detail.payment.title':    'Payment information',
    'detail.upload.label':     'Payment receipt *',
    'detail.upload.desc':      'Drag your receipt here or',
    'detail.upload.browse':    'browse',
    'detail.upload.hint':      'JPG, PNG or PDF — max 5 MB',
    'detail.btn.submit':       'Confirm order',
    'detail.btn.processing':   'Processing…',
    'detail.err.auth':         'Error: You must be logged in to place an order.',
    'detail.err.noproof':      'Error: You must provide a payment receipt.',
    'detail.err.general':      'An error occurred',
    'detail.success.title':    'Order placed!',
    'detail.success.ref':      'Reference:',
    'detail.success.whatsapp_desc': 'Notify the team on WhatsApp to confirm your order.',
    'detail.success.whatsapp_btn':  'Notify on WhatsApp',
    'detail.success.orders':        'View my orders →',

    'dynfield.video.duration.label': 'Desired duration',
    'dynfield.video.duration.opt1':  'Less than 1 min',
    'dynfield.video.duration.opt2':  '1–3 min',
    'dynfield.video.duration.opt3':  '3–5 min',
    'dynfield.video.duration.opt4':  'More than 5 min',
    'dynfield.video.style.label':    'Video style',
    'dynfield.video.style.opt1':     'Corporate',
    'dynfield.video.style.opt2':     'Dynamic / Energetic',
    'dynfield.video.style.opt3':     'Cinematic',
    'dynfield.video.style.opt4':     'Animated / Motion Graphics',
    'dynfield.video.footage.label':  'Do you have raw footage?',
    'dynfield.video.footage.opt1':   'Yes, I will send them',
    'dynfield.video.footage.opt2':   'No, shooting included',

    'dynfield.design.format.label':  'Main format',
    'dynfield.design.format.opt1':   'Logo',
    'dynfield.design.format.opt2':   'Poster / Flyer',
    'dynfield.design.format.opt3':   'Social Media Post',
    'dynfield.design.format.opt4':   'Full brand identity',
    'dynfield.design.colors.label':  'Preferred colours',
    'dynfield.design.colors.ph':     'e.g.: red, black, gold',
    'dynfield.design.refs.label':    'References / Inspirations (links)',
    'dynfield.design.refs.ph':       'https://…',

    'dynfield.web.pages.label':  'Number of pages',
    'dynfield.web.pages.opt1':   '1 page (One-Page)',
    'dynfield.web.pages.opt2':   '3–5 pages',
    'dynfield.web.pages.opt3':   'More than 5 pages',
    'dynfield.web.cms.label':    'Preferred CMS',
    'dynfield.web.cms.opt1':     'No preference',
    'dynfield.web.cms.opt2':     'WordPress',
    'dynfield.web.cms.opt3':     'Webflow',
    'dynfield.web.cms.opt4':     'Custom',
    'dynfield.web.domain.label': 'Do you have a domain name?',
    'dynfield.web.domain.opt1':  'Yes',
    'dynfield.web.domain.opt2':  'No, need to buy one',
    'dynfield.web.domain.opt3':  'No, not needed',

    'dash.page.title':    'My Space — Pixel One',
    'dash.logout':        'Sign out',
    'dash.header.title':  'My',
    'dash.header.accent': 'Space',
    'dash.header.desc':   'Track the progress of your orders in real time.',
    'dash.new.order':     'New order',
    'dash.loading':       'Loading your orders…',
    'dash.empty.title':   'No orders',
    'dash.empty.desc':    'You haven\'t placed any orders yet.',
    'dash.empty.cta':     'Discover our services',
    'dash.order.date':    'Ordered on',
    'dash.order.receipt': 'View receipt',
    'dash.order.noproof': 'Receipt missing',
    'dash.order.details': 'Order details',
    'dash.order.whatsapp': 'Contact via WhatsApp',
    'dash.err.relogin':   'Sign in again',

    'admin.page.title':       'Admin — Pixel One',
    'admin.nav.orders':       'Orders',
    'admin.nav.services':     'Services',
    'admin.nav.blog':         'Blog',
    'admin.nav.stats':        'Statistics',
    'admin.nav.client':       'Client view',
    'admin.nav.logout':       'Sign out',
    'admin.orders.title':     'Orders',
    'admin.stat.total':       'Total orders',
    'admin.stat.pending':     'Pending',
    'admin.stat.progress':    'In progress',
    'admin.stat.done':        'Completed',
    'admin.filter.all':       'All',
    'admin.filter.pending':   'Pending',
    'admin.filter.progress':  'In progress',
    'admin.filter.review':    'Review',
    'admin.filter.done':      'Completed',
    'admin.search.ph':        'Search a ref…',
    'admin.table.ref':        'Ref.',
    'admin.table.client':     'Client',
    'admin.table.service':    'Service',
    'admin.table.status':     'Status',
    'admin.table.date':       'Date',
    'admin.table.actions':    'Actions',
    'admin.table.empty':      'No orders found.',
    'admin.edit.btn':         'Edit',
    'admin.receipt.btn':      'Receipt',
    'admin.services.title':   'Services Management',
    'admin.services.add':     'Add',
    'admin.blog.title':       'Publish a Blog Post',
    'admin.blog.art.label':   'Article title',
    'admin.blog.slug.label':  'Slug (URL)',
    'admin.blog.img.label':   'Cover image (URL)',
    'admin.blog.content.label': 'Content (Markdown supported)',
    'admin.blog.submit':      'Publish article',
    'admin.blog.success':     '✓ Article published successfully!',
    'admin.stats.title':      'Statistics',
    'admin.stats.by_status':  'Orders by status',
    'admin.stats.by_cat':     'Revenue by category',
    'admin.modal.title':      'Edit order',
    'admin.modal.ref.label':  'Reference',
    'admin.modal.status.label': 'Status',
    'admin.modal.save':       'Save',
    'admin.modal.client.title': 'Client information',
    'admin.modal.client.name':  'Name',
    'admin.modal.client.phone': 'Phone',
    'admin.modal.client.email': 'Email',
    'admin.modal.details.title': 'Order details',
    'admin.modal.proof.label':  'Payment proof',
    'admin.modal.proof.open':   'Open full screen',
    'admin.modal.service':    'Service',
    'admin.view.btn':         'Details',

    'callback.status':   'Verifying your account…',
    'callback.patience': 'Please wait a moment.',
  },

  ar: {
    'page.title': 'بيكسل ون — وكالة إبداعية بالمغرب',

    'nav.services':  'الخدمات',
    'nav.why':       'لماذا نحن',
    'nav.contact':   'تواصل',
    'nav.login':     'تسجيل الدخول',
    'nav.cta':       'خدماتنا',
    'nav.myspace':   'مساحتي',

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

    'services.title':        'خدماتنا',
    'services.title.accent': '',
    'services.desc':         'حلول إبداعية مخصصة لتعزيز علامتك التجارية.',
    'services.all':          'عرض جميع الخدمات',

    'why.title':        'لماذا',
    'why.title.accent': 'بيكسل ون',
    'why.title.suffix': '؟',
    'why.desc':         'عملية بسيطة وشفافة وفعّالة.',
    'why.fast.title':   'تسليم سريع',
    'why.fast.desc':    'نلتزم دائماً بالمواعيد. تتبّع مشروعك في الوقت الفعلي من لوحة التحكم.',
    'why.secure.title': 'دفع آمن',
    'why.secure.desc':  'تحويل بنكي أو CashPlus — ارفع إيصال الدفع بنقرة واحدة.',
    'why.support.title': 'دعم عبر واتساب',
    'why.support.desc':  'بعد الطلب، أخبر الفريق مباشرةً عبر واتساب بنقرة واحدة.',

    'process.title':        'كيف',
    'process.title.accent': 'يعمل؟',
    'process.subtitle':     'أربع خطوات، بدون تعقيد.',
    'process.step1':        'اختر خدمة',
    'process.step2':        'أكمل النموذج',
    'process.step3':        'ادفع وارفع الإيصال',
    'process.step4':        'تابع طلبك',

    'contact.title':        'هل أنت مستعد لبدء',
    'contact.title.accent': 'مشروعك',
    'contact.title.suffix': '؟',
    'contact.desc':         'فريقنا متاح من الاثنين إلى الجمعة، من 9 صباحاً حتى 6 مساءً.',
    'contact.cta':          'ابدأ الآن',
    'contact.whatsapp':     'واتساب',

    'footer.services':  'الخدمات',
    'footer.login':     'تسجيل الدخول',
    'footer.dashboard': 'مساحتي',
    'footer.made':      'صُنع في المغرب',

    'cat.video':  'فيديو وحركة',
    'cat.design': 'تصميم جرافيكي',
    'cat.web':    'تطوير الويب',

    'status.pending':     'في الانتظار',
    'status.in_progress': 'قيد التنفيذ',
    'status.review':      'قيد المراجعة',
    'status.done':        'مكتمل',

    'auth.page.title':           'تسجيل الدخول / إنشاء حساب — بيكسل ون',
    'auth.tagline':              'مساحتك الإبداعية',
    'auth.tab.login':            'تسجيل الدخول',
    'auth.tab.signup':           'إنشاء حساب',
    'auth.label.email':          'البريد الإلكتروني',
    'auth.label.password':       'كلمة المرور',
    'auth.label.forgot':         'نسيت كلمة المرور؟',
    'auth.label.fullname':       'الاسم الكامل',
    'auth.label.phone':          'رقم الهاتف',
    'auth.btn.login':            'تسجيل الدخول',
    'auth.btn.signup':           'إنشاء حسابي',
    'auth.btn.loading':          'جارٍ التحميل…',
    'auth.divider':              'أو',
    'auth.google':               'المتابعة بواسطة Google',
    'auth.back':                 '→ العودة إلى الصفحة الرئيسية',
    'auth.placeholder.email':    'email@example.com',
    'auth.placeholder.fullname': 'محمد بنعلي',
    'auth.placeholder.phone':    '+212 6XX XXX XXX',
    'auth.placeholder.pw.min':   '8 أحرف على الأقل',
    'auth.msg.pw_min':           'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل.',
    'auth.msg.signup_success':   'تم إنشاء الحساب! تحقق من بريدك الإلكتروني لتأكيد التسجيل.',
    'auth.msg.login_error':      'خطأ في تسجيل الدخول.',
    'auth.msg.signup_error':     'خطأ أثناء إنشاء الحساب.',
    'auth.msg.google_error':     'خطأ في مصادقة Google.',
    'auth.msg.forgot_email':     'أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور.',
    'auth.msg.forgot_sent':      'تم إرسال رسالة إعادة التعيين!',
    'auth.msg.forgot_error':     'خطأ أثناء إعادة التعيين.',

    'svc.page.title':          'الخدمات — بيكسل ون',
    'svc.header.title1':       'كتالوج',
    'svc.header.title2':       'الخدمات',
    'svc.header.desc':         'اختر خدمتك واطلبها في بضع نقرات.',
    'svc.filter.search.label': 'بحث',
    'svc.filter.search.ph':    'مونتاج فيديو…',
    'svc.filter.cat.label':    'الفئة',
    'svc.filter.all':          'الكل',
    'svc.filter.price.label':  'الحد الأقصى للسعر',
    'svc.filter.reset':        'إعادة تعيين',
    'svc.sort.default':        'الترتيب الافتراضي',
    'svc.sort.asc':            'السعر: من الأقل إلى الأعلى',
    'svc.sort.desc':           'السعر: من الأعلى إلى الأقل',
    'svc.results':             'خدمة موجودة',
    'svc.empty':               'لا توجد خدمات تطابق هذه المعايير.',
    'svc.loading':             'جارٍ التحميل…',
    'svc.card.order':          'اطلب الآن',
    'svc.footer':              'وكالة إبداعية — المغرب',

    'detail.page.title':       'تفاصيل الخدمة — بيكسل ون',
    'detail.nav.services':     'الخدمات',
    'detail.nav.myspace':      'مساحتي',
    'detail.back':             'العودة إلى الخدمات',
    'detail.loading':          'جارٍ تحميل الخدمة…',
    'detail.notfound':         'الخدمة غير موجودة.',
    'detail.notfound.back':    'رجوع',
    'detail.features.title':   'مدرج في هذه الخدمة',
    'detail.trust.payment':    'دفع آمن',
    'detail.trust.revisions':  'مراجعات مشمولة',
    'detail.trust.support':    'دعم عبر واتساب',
    'detail.order.title':      'اطلب هذه الخدمة',
    'detail.form.name.label':  'اسمك الكامل *',
    'detail.form.name.ph':     'محمد بنعلي',
    'detail.form.phone.label': 'واتساب / الهاتف *',
    'detail.form.phone.ph':    '+212 6XX XXX XXX',
    'detail.form.email.label': 'البريد الإلكتروني *',
    'detail.form.email.ph':    'email@example.com',
    'detail.form.notes.label': 'ملاحظات / تفاصيل إضافية',
    'detail.form.notes.ph':    'اصف احتياجاتك والألوان والأسلوب…',
    'detail.payment.title':    'معلومات الدفع',
    'detail.upload.label':     'إيصال الدفع *',
    'detail.upload.desc':      'اسحب إيصالك هنا أو',
    'detail.upload.browse':    'تصفح',
    'detail.upload.hint':      'JPG أو PNG أو PDF — الحد الأقصى 5 ميجابايت',
    'detail.btn.submit':       'تأكيد الطلب',
    'detail.btn.processing':   'جارٍ المعالجة…',
    'detail.err.auth':         'خطأ: يجب تسجيل الدخول لتقديم طلب.',
    'detail.err.noproof':      'خطأ: يجب تقديم إيصال الدفع.',
    'detail.err.general':      'حدث خطأ',
    'detail.success.title':    'تم تسجيل الطلب!',
    'detail.success.ref':      'المرجع:',
    'detail.success.whatsapp_desc': 'أخبر الفريق عبر واتساب لتأكيد طلبك.',
    'detail.success.whatsapp_btn':  'إرسال إشعار عبر واتساب',
    'detail.success.orders':        'عرض طلباتي →',

    'dynfield.video.duration.label': 'المدة المطلوبة',
    'dynfield.video.duration.opt1':  'أقل من دقيقة',
    'dynfield.video.duration.opt2':  '1–3 دقائق',
    'dynfield.video.duration.opt3':  '3–5 دقائق',
    'dynfield.video.duration.opt4':  'أكثر من 5 دقائق',
    'dynfield.video.style.label':    'أسلوب الفيديو',
    'dynfield.video.style.opt1':     'مؤسسي',
    'dynfield.video.style.opt2':     'ديناميكي / نشيط',
    'dynfield.video.style.opt3':     'سينمائي',
    'dynfield.video.style.opt4':     'متحرك / موشن جرافيكس',
    'dynfield.video.footage.label':  'هل لديك مشاهد مسجلة؟',
    'dynfield.video.footage.opt1':   'نعم، سأرسلها',
    'dynfield.video.footage.opt2':   'لا، التصوير مشمول',

    'dynfield.design.format.label':  'الصيغة الرئيسية',
    'dynfield.design.format.opt1':   'شعار',
    'dynfield.design.format.opt2':   'ملصق / فلاير',
    'dynfield.design.format.opt3':   'منشور سوشيال ميديا',
    'dynfield.design.format.opt4':   'هوية بصرية كاملة',
    'dynfield.design.colors.label':  'الألوان المفضلة',
    'dynfield.design.colors.ph':     'مثال: أحمر، أسود، ذهبي',
    'dynfield.design.refs.label':    'مراجع / إلهامات (روابط)',
    'dynfield.design.refs.ph':       'https://…',

    'dynfield.web.pages.label':  'عدد الصفحات',
    'dynfield.web.pages.opt1':   'صفحة واحدة',
    'dynfield.web.pages.opt2':   '3–5 صفحات',
    'dynfield.web.pages.opt3':   'أكثر من 5 صفحات',
    'dynfield.web.cms.label':    'نظام إدارة المحتوى المفضل',
    'dynfield.web.cms.opt1':     'لا تفضيل',
    'dynfield.web.cms.opt2':     'WordPress',
    'dynfield.web.cms.opt3':     'Webflow',
    'dynfield.web.cms.opt4':     'مخصص',
    'dynfield.web.domain.label': 'هل لديك اسم نطاق؟',
    'dynfield.web.domain.opt1':  'نعم',
    'dynfield.web.domain.opt2':  'لا، يجب شراؤه',
    'dynfield.web.domain.opt3':  'لا، غير ضروري',

    'dash.page.title':    'مساحتي — بيكسل ون',
    'dash.logout':        'تسجيل الخروج',
    'dash.header.title':  'مساحتي',
    'dash.header.accent': '',
    'dash.header.desc':   'تابع تقدم طلباتك في الوقت الفعلي.',
    'dash.new.order':     'طلب جديد',
    'dash.loading':       'جارٍ تحميل طلباتك…',
    'dash.empty.title':   'لا توجد طلبات',
    'dash.empty.desc':    'لم تقدم أي طلب بعد.',
    'dash.empty.cta':     'اكتشف خدماتنا',
    'dash.order.date':    'تاريخ الطلب',
    'dash.order.receipt': 'عرض الإيصال',
    'dash.order.noproof': 'الإيصال مفقود',
    'dash.order.details': 'تفاصيل الطلب',
    'dash.order.whatsapp': 'التواصل عبر واتساب',
    'dash.err.relogin':   'تسجيل الدخول مجدداً',

    'admin.page.title':       'الإدارة — بيكسل ون',
    'admin.nav.orders':       'الطلبات',
    'admin.nav.services':     'الخدمات',
    'admin.nav.blog':         'المدونة',
    'admin.nav.stats':        'الإحصائيات',
    'admin.nav.client':       'عرض العميل',
    'admin.nav.logout':       'تسجيل الخروج',
    'admin.orders.title':     'الطلبات',
    'admin.stat.total':       'إجمالي الطلبات',
    'admin.stat.pending':     'في الانتظار',
    'admin.stat.progress':    'قيد التنفيذ',
    'admin.stat.done':        'مكتملة',
    'admin.filter.all':       'الكل',
    'admin.filter.pending':   'في الانتظار',
    'admin.filter.progress':  'قيد التنفيذ',
    'admin.filter.review':    'مراجعة',
    'admin.filter.done':      'مكتملة',
    'admin.search.ph':        'ابحث عن مرجع…',
    'admin.table.ref':        'المرجع',
    'admin.table.client':     'العميل',
    'admin.table.service':    'الخدمة',
    'admin.table.status':     'الحالة',
    'admin.table.date':       'التاريخ',
    'admin.table.actions':    'إجراءات',
    'admin.table.empty':      'لا توجد طلبات.',
    'admin.edit.btn':         'تعديل',
    'admin.receipt.btn':      'الإيصال',
    'admin.services.title':   'إدارة الخدمات',
    'admin.services.add':     'إضافة',
    'admin.blog.title':       'نشر مقال',
    'admin.blog.art.label':   'عنوان المقال',
    'admin.blog.slug.label':  'الرابط (Slug)',
    'admin.blog.img.label':   'صورة الغلاف (URL)',
    'admin.blog.content.label': 'المحتوى (Markdown مدعوم)',
    'admin.blog.submit':      'نشر المقال',
    'admin.blog.success':     '✓ تم نشر المقال بنجاح!',
    'admin.stats.title':      'الإحصائيات',
    'admin.stats.by_status':  'الطلبات حسب الحالة',
    'admin.stats.by_cat':     'الإيرادات حسب الفئة',
    'admin.modal.title':      'تعديل الطلب',
    'admin.modal.ref.label':  'المرجع',
    'admin.modal.status.label': 'الحالة',
    'admin.modal.save':       'حفظ',
    'admin.modal.client.title': 'معلومات العميل',
    'admin.modal.client.name':  'الاسم',
    'admin.modal.client.phone': 'الهاتف',
    'admin.modal.client.email': 'البريد الإلكتروني',
    'admin.modal.details.title': 'تفاصيل الطلب',
    'admin.modal.proof.label':  'إيصال الدفع',
    'admin.modal.proof.open':   'فتح بملء الشاشة',
    'admin.modal.service':    'الخدمة',
    'admin.view.btn':         'التفاصيل',

    'callback.status':   'جارٍ التحقق من حسابك…',
    'callback.patience': 'يرجى الانتظار لحظات.',
  },
};

// Font & direction config per language
const LANG_CONFIG = {
  fr: { font: 'Inter',                   dir: 'ltr', lineHeight: '1.6'  },
  en: { font: 'Inter',                   dir: 'ltr', lineHeight: '1.6'  },
  ar: { font: 'IBM Plex Sans Arabic',    dir: 'rtl', lineHeight: '1.85' },
};

// Display metadata per language (flag, short code, native label)
const LANG_META = {
  fr: { flag: '🇫🇷', code: 'FR', label: 'Français' },
  en: { flag: '🇺🇸', code: 'EN', label: 'English' },
  ar: { flag: '🇲🇦', code: 'AR', label: 'العربية' },
};

/**
 * Returns the translation for a given key in the current language.
 * Falls back to French, then the key itself.
 *
 * @param {string} key
 * @returns {string}
 */
function t(key) {
  const lang = getLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  if (dict[key] !== undefined) return dict[key];
  if (TRANSLATIONS.fr[key] !== undefined) return TRANSLATIONS.fr[key];
  return key;
}

/**
 * Returns the current active language code.
 * @returns {string}
 */
function getLang() {
  const saved = localStorage.getItem('px_lang') || 'fr';
  return Object.keys(TRANSLATIONS).includes(saved) ? saved : 'fr';
}

/**
 * Applies the chosen language to the page.
 * - Updates <html> lang + dir attributes
 * - Persists the choice to localStorage
 * - Updates body font-family and line-height
 * - Updates document <title>
 * - Translates all elements with data-i18n / data-i18n-key / data-i18n-ph
 * - Updates the custom language-switcher dropdown UI
 *
 * @param {string} lang – 'fr' | 'en' | 'ar'
 */
function setLanguage(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  const cfg  = LANG_CONFIG[lang];
  const meta = LANG_META[lang];
  const html = document.documentElement;

  // Update <html> attributes
  html.setAttribute('lang', lang);
  html.setAttribute('dir', cfg.dir);

  // Persist choice & mark first-visit complete
  localStorage.setItem('px_lang', lang);
  localStorage.setItem('px_lang_selected', '1');

  // Swap body lang class (lang-fr / lang-en / lang-ar)
  ['lang-fr', 'lang-en', 'lang-ar'].forEach(c => document.body.classList.remove(c));
  document.body.classList.add('lang-' + lang);

  // Update font-family and line-height
  document.body.style.fontFamily   = `'${cfg.font}', sans-serif`;
  document.body.style.lineHeight   = cfg.lineHeight;

  // Update page title
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n');
    if (dict[key] !== undefined) document.title = dict[key];
  } else if (dict['page.title']) {
    document.title = dict['page.title'];
  }

  // Translate text content  (data-i18n)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // Translate button / element text via data-i18n-key
  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-key');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // Translate placeholder attributes
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });

  // ── Update custom language-dropdown button UI ────────────
  const flagEl = document.getElementById('lang-flag');
  const codeEl = document.getElementById('lang-code');
  if (flagEl) flagEl.textContent = meta.flag;
  if (codeEl) codeEl.textContent = meta.code;

  // Highlight active option
  document.querySelectorAll('.lang-opt').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('text-white',   active);
    btn.classList.toggle('bg-brand/10',  active);
  });

  // Close the dropdown
  const dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.add('hidden');

  // Fire a custom event so page scripts can re-render dynamic content
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/**
 * Initialises i18n on DOMContentLoaded.
 * Uses the stored preference, falling back to 'fr'.
 */
function initI18n() {
  const valid = getLang();
  setLanguage(valid);

  // ── Custom dropdown toggle ──────────────────────────────
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', e => {
      e.stopPropagation();
      const dd = document.getElementById('lang-dropdown');
      if (dd) dd.classList.toggle('hidden');
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', e => {
    const wrapper = document.getElementById('lang-dropdown-wrapper');
    const dd      = document.getElementById('lang-dropdown');
    if (dd && wrapper && !wrapper.contains(e.target)) dd.classList.add('hidden');
  });

  // Legacy: keep old <select class="lang-switcher"> working
  document.querySelectorAll('select.lang-switcher').forEach(sw => {
    sw.value = valid;
    sw.addEventListener('change', () => setLanguage(sw.value));
  });
}

document.addEventListener('DOMContentLoaded', initI18n);
