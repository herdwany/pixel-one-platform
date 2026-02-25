// ============================================================
// Pixel One – Legal Pages Content (Privacy & Terms) – i18n
// ============================================================

const LEGAL_CONTENT = {
  privacy: {
    fr: {
      title: 'Politique de Confidentialité',
      badge: 'Juridique',
      updated: 'Dernière mise à jour : 23 février 2026',
      back: 'Retour à l\'accueil',
      sections: [
        {
          icon: 'fa-eye',
          title: '1. Introduction',
          html: `<p>Chez <strong>Pixel One</strong>, nous respectons votre vie privée et nous nous engageons à protéger les informations personnelles que vous partagez avec nous. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données lorsque vous utilisez notre site web et nos services.</p>`
        },
        {
          icon: 'fa-database',
          title: '2. Données Collectées',
          html: `<p class="mb-4">Lorsque vous vous connectez via <strong>Google OAuth</strong>, nous collectons les informations suivantes à des fins d'authentification uniquement :</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Nom complet</strong> — tel que fourni par votre compte Google.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Adresse email</strong> — utilisée pour identifier votre compte.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Photo de profil</strong> — affichée dans votre tableau de bord.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">Nous ne collectons aucune donnée supplémentaire au-delà de ce qui est nécessaire pour l'authentification et la gestion du compte.</p>`
        },
        {
          icon: 'fa-gear',
          title: '3. Utilisation des Données',
          html: `<p class="mb-3">Vos informations personnelles sont utilisées exclusivement pour :</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Créer et maintenir votre compte utilisateur sur notre plateforme.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Gérer et suivre vos commandes de services et livraisons de projets.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Communiquer avec vous concernant vos commandes et mises à jour.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins marketing.</p>`
        },
        {
          icon: 'fa-link',
          title: '4. Services Tiers',
          html: `<p class="mb-3">Nous utilisons les fournisseurs tiers suivants :</p>
          <div class="grid sm:grid-cols-2 gap-4 mt-4">
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1">Supabase</p>
              <p class="text-gray-400 text-sm">Utilisé pour l'authentification (via Google OAuth) et la gestion sécurisée de la base de données.</p>
            </div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1">Google OAuth</p>
              <p class="text-gray-400 text-sm">Fournit une fonctionnalité de connexion sécurisée. Les données partagées sont régies par la politique de confidentialité de Google.</p>
            </div>
          </div>
          <p class="text-gray-500 text-sm mt-4">Ces services ont leurs propres politiques de confidentialité, et nous vous encourageons à les consulter.</p>`
        },
        {
          icon: 'fa-user-shield',
          title: '5. Vos Droits',
          html: `<p class="mb-3">Vous avez le droit de :</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Accès</strong> — Demander une copie des données personnelles que nous détenons à votre sujet.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Suppression</strong> — Demander la suppression complète de votre compte et des données associées.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Rectification</strong> — Demander la correction d'informations personnelles inexactes.</span></li>
          </ul>
          <p class="mt-4">Pour exercer l'un de ces droits, veuillez contacter notre équipe de support à l'adresse ci-dessous.</p>`
        },
        {
          icon: 'fa-envelope',
          title: '6. Nous Contacter',
          highlight: true,
          html: `<p class="mb-4">Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, veuillez nous contacter :</p>
          <a href="mailto:contact@pixelonevisuals.tech" class="inline-flex items-center gap-3 bg-brand/10 border border-brand/30 hover:border-brand/60 px-5 py-3 rounded-xl transition group">
            <i class="fa-solid fa-paper-plane text-brand group-hover:translate-x-0.5 transition-transform"></i>
            <span class="font-medium">contact@pixelonevisuals.tech</span>
          </a>`
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      badge: 'Legal',
      updated: 'Last updated: February 23, 2026',
      back: 'Back to Home',
      sections: [
        {
          icon: 'fa-eye',
          title: '1. Introduction',
          html: `<p>At <strong>Pixel One</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.</p>`
        },
        {
          icon: 'fa-database',
          title: '2. Data We Collect',
          html: `<p class="mb-4">When you sign in using <strong>Google OAuth</strong>, we collect the following information for authentication purposes only:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Full Name</strong> — as provided by your Google account.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Email Address</strong> — used to identify your account.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Profile Picture</strong> — displayed within your user dashboard.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">We do not collect any additional data beyond what is required for authentication and account management.</p>`
        },
        {
          icon: 'fa-gear',
          title: '3. How We Use Your Data',
          html: `<p class="mb-3">Your personal information is used exclusively to:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Create and maintain your user account on our platform.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Manage and track your service orders and project deliveries.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Communicate with you regarding your orders and account updates.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>`
        },
        {
          icon: 'fa-link',
          title: '4. Third-Party Services',
          html: `<p class="mb-3">We rely on the following trusted third-party providers:</p>
          <div class="grid sm:grid-cols-2 gap-4 mt-4">
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1">Supabase</p>
              <p class="text-gray-400 text-sm">Used for user authentication (via Google OAuth) and secure database management.</p>
            </div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1">Google OAuth</p>
              <p class="text-gray-400 text-sm">Provides secure sign-in functionality. Data shared is governed by Google's own privacy policy.</p>
            </div>
          </div>
          <p class="text-gray-500 text-sm mt-4">These services have their own privacy policies, and we encourage you to review them.</p>`
        },
        {
          icon: 'fa-user-shield',
          title: '5. Your Rights',
          html: `<p class="mb-3">You have the right to:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Access</strong> — Request a copy of the personal data we hold about you.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Deletion</strong> — Request the complete deletion of your account and associated data.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>Correction</strong> — Request correction of any inaccurate personal information.</span></li>
          </ul>
          <p class="mt-4">To exercise any of these rights, please contact our support team at the email address provided below.</p>`
        },
        {
          icon: 'fa-envelope',
          title: '6. Contact Us',
          highlight: true,
          html: `<p class="mb-4">If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your data rights, please reach out to us:</p>
          <a href="mailto:contact@pixelonevisuals.tech" class="inline-flex items-center gap-3 bg-brand/10 border border-brand/30 hover:border-brand/60 px-5 py-3 rounded-xl transition group">
            <i class="fa-solid fa-paper-plane text-brand group-hover:translate-x-0.5 transition-transform"></i>
            <span class="font-medium">contact@pixelonevisuals.tech</span>
          </a>`
        }
      ]
    },
    ar: {
      title: 'سياسة الخصوصية',
      badge: 'قانوني',
      updated: 'آخر تحديث: 23 فبراير 2026',
      back: 'العودة إلى الرئيسية',
      sections: [
        {
          icon: 'fa-eye',
          title: '1. مقدمة',
          html: `<p>في <strong>بيكسل ون</strong>، نحترم خصوصيتك ونلتزم بحماية المعلومات الشخصية التي تشاركها معنا. توضح سياسة الخصوصية هذه كيف نجمع بياناتك ونستخدمها ونحميها عند استخدام موقعنا وخدماتنا.</p>`
        },
        {
          icon: 'fa-database',
          title: '2. البيانات التي نجمعها',
          html: `<p class="mb-4">عند تسجيل الدخول باستخدام <strong>Google OAuth</strong>، نجمع المعلومات التالية لأغراض المصادقة فقط:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>الاسم الكامل</strong> — كما هو مقدم من حساب Google الخاص بك.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>البريد الإلكتروني</strong> — يُستخدم لتحديد حسابك.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>صورة الملف الشخصي</strong> — تُعرض في لوحة التحكم الخاصة بك.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">لا نجمع أي بيانات إضافية تتجاوز ما هو مطلوب للمصادقة وإدارة الحساب.</p>`
        },
        {
          icon: 'fa-gear',
          title: '3. كيف نستخدم بياناتك',
          html: `<p class="mb-3">تُستخدم معلوماتك الشخصية حصرياً من أجل:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>إنشاء وصيانة حساب المستخدم الخاص بك على منصتنا.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>إدارة وتتبع طلبات الخدمة وعمليات تسليم المشاريع.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>التواصل معك بشأن طلباتك وتحديثات الحساب.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">لا نبيع أو نؤجر أو نشارك بياناتك الشخصية مع أطراف ثالثة لأغراض تسويقية.</p>`
        },
        {
          icon: 'fa-link',
          title: '4. الخدمات الخارجية',
          html: `<p class="mb-3">نعتمد على مزودي الخدمات الموثوقين التاليين:</p>
          <div class="grid sm:grid-cols-2 gap-4 mt-4">
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1">Supabase</p>
              <p class="text-gray-400 text-sm">يُستخدم لمصادقة المستخدم (عبر Google OAuth) وإدارة قاعدة البيانات بشكل آمن.</p>
            </div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1">Google OAuth</p>
              <p class="text-gray-400 text-sm">يوفر وظيفة تسجيل الدخول الآمن. البيانات المشتركة تخضع لسياسة خصوصية Google.</p>
            </div>
          </div>
          <p class="text-gray-500 text-sm mt-4">هذه الخدمات لديها سياسات خصوصية خاصة بها، ونشجعك على مراجعتها.</p>`
        },
        {
          icon: 'fa-user-shield',
          title: '5. حقوقك',
          html: `<p class="mb-3">لديك الحق في:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>الوصول</strong> — طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>الحذف</strong> — طلب الحذف الكامل لحسابك والبيانات المرتبطة به.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span><strong>التصحيح</strong> — طلب تصحيح أي معلومات شخصية غير دقيقة.</span></li>
          </ul>
          <p class="mt-4">لممارسة أي من هذه الحقوق، يرجى الاتصال بفريق الدعم لدينا على العنوان أدناه.</p>`
        },
        {
          icon: 'fa-envelope',
          title: '6. اتصل بنا',
          highlight: true,
          html: `<p class="mb-4">إذا كانت لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه، يرجى التواصل معنا:</p>
          <a href="mailto:contact@pixelonevisuals.tech" class="inline-flex items-center gap-3 bg-brand/10 border border-brand/30 hover:border-brand/60 px-5 py-3 rounded-xl transition group">
            <i class="fa-solid fa-paper-plane text-brand group-hover:translate-x-0.5 transition-transform"></i>
            <span class="font-medium">contact@pixelonevisuals.tech</span>
          </a>`
        }
      ]
    }
  },

  terms: {
    fr: {
      title: 'Conditions d\'Utilisation',
      badge: 'Juridique',
      updated: 'Dernière mise à jour : 23 février 2026',
      back: 'Retour à l\'accueil',
      sections: [
        {
          icon: 'fa-handshake',
          title: '1. Acceptation des Conditions',
          html: `<p>En accédant ou en utilisant le site web <strong>Pixel One</strong> et ses services, vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'acceptez pas une partie de ces conditions, vous devez cesser immédiatement d'utiliser la plateforme.</p>
          <p class="mt-3">Nous nous réservons le droit de mettre à jour ou de modifier ces conditions à tout moment. L'utilisation continue du service après les modifications constitue votre acceptation des conditions révisées.</p>`
        },
        {
          icon: 'fa-wand-magic-sparkles',
          title: '2. Services',
          html: `<p class="mb-4">Pixel One est une agence créative numérique fournissant des services professionnels incluant notamment :</p>
          <div class="grid sm:grid-cols-2 gap-3">
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-palette text-brand text-sm"></i><span class="text-sm">Logo & Identité de Marque</span></div>
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-display text-brand text-sm"></i><span class="text-sm">UI/UX & Web Design</span></div>
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-code text-brand text-sm"></i><span class="text-sm">Développement Web</span></div>
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-video text-brand text-sm"></i><span class="text-sm">Montage Vidéo & Motion Graphics</span></div>
          </div>
          <p class="text-gray-500 text-sm mt-4">Les détails des services, les prix et les délais de livraison sont indiqués sur chaque page de service et peuvent être mis à jour sans préavis.</p>`
        },
        {
          icon: 'fa-credit-card',
          title: '3. Paiements & Remboursements',
          html: `<p class="mb-3">En passant une commande, vous acceptez les conditions de paiement suivantes :</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span><strong>Tous les paiements sont définitifs</strong> une fois le processus de livraison commencé.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Le paiement doit être effectué avant le début du travail sur votre projet.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Les remboursements peuvent être envisagés au cas par cas <strong>uniquement si le travail n'a pas encore commencé</strong>.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Les litiges doivent être soulevés dans les 7 jours suivant la livraison.</span></li>
          </ul>`
        },
        {
          icon: 'fa-copyright',
          title: '4. Propriété Intellectuelle',
          html: `<div class="space-y-4">
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4"><p class="font-semibold mb-1"><i class="fa-solid fa-check-circle text-green-500 mr-2"></i>Propriété du Client</p><p class="text-gray-400 text-sm">Après paiement complet, le client reçoit la pleine propriété de tous les livrables finaux, y compris les fichiers source si applicable.</p></div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4"><p class="font-semibold mb-1"><i class="fa-solid fa-images text-brand mr-2"></i>Droits de Portfolio</p><p class="text-gray-400 text-sm">Pixel One conserve le droit de présenter les travaux réalisés dans ses portfolios et supports promotionnels, sauf si un accord de confidentialité (NDA) est signé.</p></div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4"><p class="font-semibold mb-1"><i class="fa-solid fa-ban text-yellow-500 mr-2"></i>Droits avant Livraison</p><p class="text-gray-400 text-sm">Tous les travaux en cours restent la propriété de Pixel One jusqu'à réception du paiement final et livraison officielle du projet.</p></div>
          </div>`
        },
        {
          icon: 'fa-lock',
          title: '5. Sécurité du Compte',
          html: `<p class="mb-3">En tant qu'utilisateur inscrit, vous êtes responsable de :</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>Garder vos identifiants de connexion et l'accès à votre compte sécurisés.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>Toutes les activités effectuées sous votre compte.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>Nous notifier immédiatement de tout accès non autorisé à votre compte.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">Pixel One n'est pas responsable des pertes résultant de la non-confidentialité de votre compte.</p>`
        },
        {
          icon: 'fa-triangle-exclamation',
          title: '6. Limitation de Responsabilité',
          html: `<p class="mb-3">Pixel One ne sera pas responsable des :</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Dommages indirects ou consécutifs résultant de l'utilisation de nos services.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Interruptions de service ou indisponibilité temporaire de la plateforme.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Pertes de données dues au non-respect de la sécurité du compte.</span></li>
          </ul>`
        },
        {
          icon: 'fa-envelope',
          title: '7. Contact',
          highlight: true,
          html: `<p class="mb-4">Pour toute question concernant ces conditions, contactez-nous :</p>
          <a href="mailto:contact@pixelonevisuals.tech" class="inline-flex items-center gap-3 bg-brand/10 border border-brand/30 hover:border-brand/60 px-5 py-3 rounded-xl transition group">
            <i class="fa-solid fa-paper-plane text-brand group-hover:translate-x-0.5 transition-transform"></i>
            <span class="font-medium">contact@pixelonevisuals.tech</span>
          </a>`
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      badge: 'Legal',
      updated: 'Last updated: February 23, 2026',
      back: 'Back to Home',
      sections: [
        {
          icon: 'fa-handshake',
          title: '1. Acceptance of Terms',
          html: `<p>By accessing or using the <strong>Pixel One</strong> website and its services, you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, you must discontinue use of the platform immediately.</p>
          <p class="mt-3">We reserve the right to update or modify these terms at any time. Continued use of the service after changes constitutes your acceptance of the revised terms.</p>`
        },
        {
          icon: 'fa-wand-magic-sparkles',
          title: '2. Services',
          html: `<p class="mb-4">Pixel One is a digital creative agency providing professional services including but not limited to:</p>
          <div class="grid sm:grid-cols-2 gap-3">
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-palette text-brand text-sm"></i><span class="text-sm">Logo & Brand Identity Design</span></div>
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-display text-brand text-sm"></i><span class="text-sm">UI/UX & Web Design</span></div>
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-code text-brand text-sm"></i><span class="text-sm">Web Development</span></div>
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-video text-brand text-sm"></i><span class="text-sm">Video Editing & Motion Graphics</span></div>
          </div>
          <p class="text-gray-500 text-sm mt-4">Service details, pricing, and delivery timelines are outlined on each individual service page and may be updated without prior notice.</p>`
        },
        {
          icon: 'fa-credit-card',
          title: '3. Payments & Refunds',
          html: `<p class="mb-3">By placing an order, you agree to the following payment terms:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span><strong>All payments are final</strong> once the service delivery process has begun.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Payment must be completed before work commences on your project.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Refunds may be considered on a case-by-case basis <strong>only if work has not yet started</strong>.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Disputes should be raised within 7 days of delivery by contacting our support team.</span></li>
          </ul>`
        },
        {
          icon: 'fa-copyright',
          title: '4. Intellectual Property',
          html: `<div class="space-y-4">
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4"><p class="font-semibold mb-1"><i class="fa-solid fa-check-circle text-green-500 mr-2"></i>Client Ownership</p><p class="text-gray-400 text-sm">Upon full payment, the client receives full ownership of all final delivered assets, including source files where applicable.</p></div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4"><p class="font-semibold mb-1"><i class="fa-solid fa-images text-brand mr-2"></i>Portfolio Rights</p><p class="text-gray-400 text-sm">Pixel One retains the right to showcase completed work in portfolios, case studies, and promotional materials unless a Non-Disclosure Agreement (NDA) is signed prior to the project.</p></div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4"><p class="font-semibold mb-1"><i class="fa-solid fa-ban text-yellow-500 mr-2"></i>Pre-delivery Rights</p><p class="text-gray-400 text-sm">All work-in-progress materials and drafts remain the property of Pixel One until final payment is received and the project is officially delivered.</p></div>
          </div>`
        },
        {
          icon: 'fa-lock',
          title: '5. Account Security',
          html: `<p class="mb-3">As a registered user, you are responsible for:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>Keeping your login credentials and account access secure at all times.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>All activities that occur under your account, whether authorized by you or not.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>Notifying us immediately if you suspect any unauthorized access to your account.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">Pixel One is not liable for any loss or damage arising from your failure to maintain the confidentiality of your account.</p>`
        },
        {
          icon: 'fa-triangle-exclamation',
          title: '6. Limitation of Liability',
          html: `<p class="mb-3">Pixel One shall not be liable for:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Indirect or consequential damages resulting from the use of our services.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Service interruptions or temporary platform unavailability.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Data loss due to account security non-compliance.</span></li>
          </ul>`
        },
        {
          icon: 'fa-envelope',
          title: '7. Contact',
          highlight: true,
          html: `<p class="mb-4">For any questions about these terms, contact us:</p>
          <a href="mailto:contact@pixelonevisuals.tech" class="inline-flex items-center gap-3 bg-brand/10 border border-brand/30 hover:border-brand/60 px-5 py-3 rounded-xl transition group">
            <i class="fa-solid fa-paper-plane text-brand group-hover:translate-x-0.5 transition-transform"></i>
            <span class="font-medium">contact@pixelonevisuals.tech</span>
          </a>`
        }
      ]
    },
    ar: {
      title: 'شروط الاستخدام',
      badge: 'قانوني',
      updated: 'آخر تحديث: 23 فبراير 2026',
      back: 'العودة إلى الرئيسية',
      sections: [
        {
          icon: 'fa-handshake',
          title: '1. قبول الشروط',
          html: `<p>من خلال الوصول إلى موقع <strong>بيكسل ون</strong> واستخدام خدماته، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا توافق على أي جزء من هذه الشروط، يجب عليك التوقف عن استخدام المنصة فوراً.</p>
          <p class="mt-3">نحتفظ بالحق في تحديث أو تعديل هذه الشروط في أي وقت. الاستمرار في استخدام الخدمة بعد التغييرات يعني قبولك للشروط المعدلة.</p>`
        },
        {
          icon: 'fa-wand-magic-sparkles',
          title: '2. الخدمات',
          html: `<p class="mb-4">بيكسل ون هي وكالة إبداعية رقمية تقدم خدمات احترافية تشمل على سبيل المثال لا الحصر:</p>
          <div class="grid sm:grid-cols-2 gap-3">
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-palette text-brand text-sm"></i><span class="text-sm">تصميم الشعارات والهوية البصرية</span></div>
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-display text-brand text-sm"></i><span class="text-sm">تصميم واجهة المستخدم وتجربة المستخدم</span></div>
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-code text-brand text-sm"></i><span class="text-sm">تطوير الويب</span></div>
            <div class="flex items-center gap-3 bg-[#0d0d0d] border border-surface-border rounded-xl px-4 py-3"><i class="fa-solid fa-video text-brand text-sm"></i><span class="text-sm">مونتاج الفيديو والموشن جرافيكس</span></div>
          </div>
          <p class="text-gray-500 text-sm mt-4">تفاصيل الخدمات والأسعار ومواعيد التسليم موضحة في كل صفحة خدمة وقد يتم تحديثها دون إشعار مسبق.</p>`
        },
        {
          icon: 'fa-credit-card',
          title: '3. المدفوعات والاسترجاع',
          html: `<p class="mb-3">عند تقديم طلب، فإنك توافق على شروط الدفع التالية:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span><strong>جميع المدفوعات نهائية</strong> بمجرد بدء عملية تقديم الخدمة.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>يجب إتمام الدفع قبل البدء في العمل على مشروعك.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>يمكن النظر في الاسترجاع حسب كل حالة <strong>فقط إذا لم يبدأ العمل بعد</strong>.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>يجب تقديم النزاعات خلال 7 أيام من التسليم.</span></li>
          </ul>`
        },
        {
          icon: 'fa-copyright',
          title: '4. الملكية الفكرية',
          html: `<div class="space-y-4">
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4"><p class="font-semibold mb-1"><i class="fa-solid fa-check-circle text-green-500 mr-2"></i>ملكية العميل</p><p class="text-gray-400 text-sm">بعد الدفع الكامل، يحصل العميل على الملكية الكاملة لجميع المواد النهائية المسلمة، بما في ذلك ملفات المصدر حيثما ينطبق.</p></div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4"><p class="font-semibold mb-1"><i class="fa-solid fa-images text-brand mr-2"></i>حقوق المعرض</p><p class="text-gray-400 text-sm">تحتفظ بيكسل ون بحق عرض الأعمال المنجزة في المعارض والمواد الترويجية ما لم يتم توقيع اتفاقية عدم إفصاح.</p></div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4"><p class="font-semibold mb-1"><i class="fa-solid fa-ban text-yellow-500 mr-2"></i>حقوق ما قبل التسليم</p><p class="text-gray-400 text-sm">جميع المواد قيد العمل تبقى ملكاً لبيكسل ون حتى استلام الدفع النهائي والتسليم الرسمي.</p></div>
          </div>`
        },
        {
          icon: 'fa-lock',
          title: '5. أمان الحساب',
          html: `<p class="mb-3">بصفتك مستخدماً مسجلاً، أنت مسؤول عن:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>الحفاظ على أمان بيانات تسجيل الدخول والوصول إلى حسابك.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>جميع الأنشطة التي تتم تحت حسابك.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>إخطارنا فوراً إذا كنت تشك في أي وصول غير مصرح به لحسابك.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">بيكسل ون ليست مسؤولة عن أي خسارة ناتجة عن عدم الحفاظ على سرية حسابك.</p>`
        },
        {
          icon: 'fa-triangle-exclamation',
          title: '6. تحديد المسؤولية',
          html: `<p class="mb-3">لن تكون بيكسل ون مسؤولة عن:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>الأضرار غير المباشرة أو التبعية الناتجة عن استخدام خدماتنا.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>انقطاعات الخدمة أو عدم توفر المنصة مؤقتاً.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>فقدان البيانات بسبب عدم الامتثال لأمان الحساب.</span></li>
          </ul>`
        },
        {
          icon: 'fa-envelope',
          title: '7. اتصل بنا',
          highlight: true,
          html: `<p class="mb-4">لأي أسئلة حول هذه الشروط، تواصل معنا:</p>
          <a href="mailto:contact@pixelonevisuals.tech" class="inline-flex items-center gap-3 bg-brand/10 border border-brand/30 hover:border-brand/60 px-5 py-3 rounded-xl transition group">
            <i class="fa-solid fa-paper-plane text-brand group-hover:translate-x-0.5 transition-transform"></i>
            <span class="font-medium">contact@pixelonevisuals.tech</span>
          </a>`
        }
      ]
    }
  },

  // ── Refund Policy ─────────────────────────────────────────
  refund: {
    fr: {
      title: 'Politique de Remboursement',
      badge: 'Juridique',
      updated: 'Dernière mise à jour : 25 février 2026',
      back: 'Retour à l\'accueil',
      sections: [
        {
          icon: 'fa-rotate-left',
          title: '1. Nature des Services Numériques',
          html: `<p><strong>Pixel One</strong> fournit des services numériques sur mesure, y compris le design graphique, le montage vidéo, le développement web et le motion design. En raison de la nature personnalisée et immatérielle de ces livrables :</p>
          <div class="bg-[#0d0d0d] border border-brand/20 rounded-xl p-4 mt-4">
            <p class="font-semibold text-brand"><i class="fa-solid fa-triangle-exclamation mr-2"></i>Aucun retour ni échange n'est possible sur les travaux terminés et livrés.</p>
          </div>
          <p class="text-gray-500 text-sm mt-4">Les services numériques ne sont pas des produits physiques et ne peuvent être « retournés ». Une fois le livrable final approuvé et remis, la vente est considérée comme définitive.</p>`
        },
        {
          icon: 'fa-ban',
          title: '2. Politique d\'Annulation',
          html: `<p class="mb-3">Les conditions d'annulation dépendent du stade d'avancement du projet :</p>
          <div class="space-y-3 mt-4">
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1"><i class="fa-solid fa-check-circle text-green-500 mr-2"></i>Avant le début du travail</p>
              <p class="text-gray-400 text-sm">Annulation gratuite avec remboursement intégral. Contactez-nous dès que possible.</p>
            </div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1"><i class="fa-solid fa-clock text-yellow-500 mr-2"></i>Travail en cours</p>
              <p class="text-gray-400 text-sm">Un remboursement partiel peut être envisagé, proportionnel au travail non encore réalisé. Les heures de travail déjà investies ne sont pas remboursables.</p>
            </div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1"><i class="fa-solid fa-xmark-circle text-red-500 mr-2"></i>Après livraison finale</p>
              <p class="text-gray-400 text-sm">Aucun remboursement n'est accordé une fois le projet terminé et les fichiers livrés au client.</p>
            </div>
          </div>`
        },
        {
          icon: 'fa-arrows-rotate',
          title: '3. Révisions & Modifications',
          html: `<p class="mb-3">Chaque service inclut un nombre défini de révisions, précisé dans la description du service :</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Les révisions couvertes par le forfait sont <strong>gratuites</strong> et doivent être demandées dans les <strong>7 jours</strong> suivant la livraison.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Les demandes de révision supplémentaires au-delà du quota inclus seront facturées séparément après accord mutuel.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Les changements majeurs de direction créative (rebrief complet) constituent un nouveau projet et non une révision.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">Les révisions ne sont pas un substitut au remboursement. Elles servent à affiner le travail selon le brief original.</p>`
        },
        {
          icon: 'fa-shield-halved',
          title: '4. Cas Exceptionnels',
          html: `<p class="mb-3">Un remboursement total ou partiel peut être accordé dans les situations suivantes :</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>Le service n'a jamais été livré et le projet n'a pas démarré.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>Une erreur technique grave de notre part rend le livrable inutilisable.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>Un paiement en double a été effectué par erreur.</span></li>
          </ul>
          <p class="mt-4">Chaque demande est traitée au cas par cas. Contactez-nous dans un délai de <strong>7 jours</strong> après la livraison.</p>`
        },
        {
          icon: 'fa-gavel',
          title: '5. Processus de Réclamation',
          html: `<p class="mb-3">Pour soumettre une demande de remboursement ou de réclamation :</p>
          <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-5 mt-3 space-y-3">
            <div class="flex items-start gap-3"><span class="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span><span>Envoyez un email à <strong>contact@pixelonevisuals.tech</strong> avec votre référence de commande.</span></div>
            <div class="flex items-start gap-3"><span class="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span><span>Décrivez le motif de votre réclamation de manière détaillée.</span></div>
            <div class="flex items-start gap-3"><span class="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span><span>Notre équipe examinera votre demande sous <strong>48 à 72 heures ouvrées</strong>.</span></div>
          </div>`
        },
        {
          icon: 'fa-envelope',
          title: '6. Nous Contacter',
          highlight: true,
          html: `<p class="mb-4">Pour toute question relative à cette politique de remboursement, contactez-nous :</p>
          <a href="mailto:contact@pixelonevisuals.tech" class="inline-flex items-center gap-3 bg-brand/10 border border-brand/30 hover:border-brand/60 px-5 py-3 rounded-xl transition group">
            <i class="fa-solid fa-paper-plane text-brand group-hover:translate-x-0.5 transition-transform"></i>
            <span class="font-medium">contact@pixelonevisuals.tech</span>
          </a>`
        }
      ]
    },
    en: {
      title: 'Refund Policy',
      badge: 'Legal',
      updated: 'Last updated: February 25, 2026',
      back: 'Back to Home',
      sections: [
        {
          icon: 'fa-rotate-left',
          title: '1. Nature of Digital Services',
          html: `<p><strong>Pixel One</strong> provides custom digital services including graphic design, video editing, web development, and motion design. Due to the personalized and intangible nature of these deliverables:</p>
          <div class="bg-[#0d0d0d] border border-brand/20 rounded-xl p-4 mt-4">
            <p class="font-semibold text-brand"><i class="fa-solid fa-triangle-exclamation mr-2"></i>No returns or exchanges are possible on completed and delivered work.</p>
          </div>
          <p class="text-gray-500 text-sm mt-4">Digital services are not physical products and cannot be "returned." Once the final deliverable is approved and handed over, the sale is considered final.</p>`
        },
        {
          icon: 'fa-ban',
          title: '2. Cancellation Policy',
          html: `<p class="mb-3">Cancellation terms depend on the project stage:</p>
          <div class="space-y-3 mt-4">
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1"><i class="fa-solid fa-check-circle text-green-500 mr-2"></i>Before Work Begins</p>
              <p class="text-gray-400 text-sm">Free cancellation with a full refund. Contact us as soon as possible.</p>
            </div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1"><i class="fa-solid fa-clock text-yellow-500 mr-2"></i>Work in Progress</p>
              <p class="text-gray-400 text-sm">A partial refund may be considered, proportional to the work not yet completed. Hours already invested are non-refundable.</p>
            </div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1"><i class="fa-solid fa-xmark-circle text-red-500 mr-2"></i>After Final Delivery</p>
              <p class="text-gray-400 text-sm">No refund is granted once the project is completed and files are delivered to the client.</p>
            </div>
          </div>`
        },
        {
          icon: 'fa-arrows-rotate',
          title: '3. Revisions & Modifications',
          html: `<p class="mb-3">Each service includes a defined number of revisions, specified in the service description:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Included revisions are <strong>free of charge</strong> and must be requested within <strong>7 days</strong> of delivery.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Additional revision requests beyond the included quota will be billed separately after mutual agreement.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>Major creative direction changes (complete re-brief) constitute a new project, not a revision.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">Revisions are not a substitute for refunds. They serve to refine the work according to the original brief.</p>`
        },
        {
          icon: 'fa-shield-halved',
          title: '4. Exceptional Cases',
          html: `<p class="mb-3">A full or partial refund may be granted in the following situations:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>The service was never delivered and the project has not started.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>A serious technical error on our part renders the deliverable unusable.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>A duplicate payment was made by mistake.</span></li>
          </ul>
          <p class="mt-4">Each request is handled on a case-by-case basis. Contact us within <strong>7 days</strong> of delivery.</p>`
        },
        {
          icon: 'fa-gavel',
          title: '5. Claim Process',
          html: `<p class="mb-3">To submit a refund request or claim:</p>
          <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-5 mt-3 space-y-3">
            <div class="flex items-start gap-3"><span class="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span><span>Email <strong>contact@pixelonevisuals.tech</strong> with your order reference.</span></div>
            <div class="flex items-start gap-3"><span class="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span><span>Describe the reason for your claim in detail.</span></div>
            <div class="flex items-start gap-3"><span class="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span><span>Our team will review your request within <strong>48 to 72 business hours</strong>.</span></div>
          </div>`
        },
        {
          icon: 'fa-envelope',
          title: '6. Contact Us',
          highlight: true,
          html: `<p class="mb-4">For any questions about this refund policy, please reach out to us:</p>
          <a href="mailto:contact@pixelonevisuals.tech" class="inline-flex items-center gap-3 bg-brand/10 border border-brand/30 hover:border-brand/60 px-5 py-3 rounded-xl transition group">
            <i class="fa-solid fa-paper-plane text-brand group-hover:translate-x-0.5 transition-transform"></i>
            <span class="font-medium">contact@pixelonevisuals.tech</span>
          </a>`
        }
      ]
    },
    ar: {
      title: 'سياسة الاسترجاع',
      badge: 'قانوني',
      updated: 'آخر تحديث: 25 فبراير 2026',
      back: 'العودة إلى الرئيسية',
      sections: [
        {
          icon: 'fa-rotate-left',
          title: '1. طبيعة الخدمات الرقمية',
          html: `<p>تقدم <strong>بيكسل ون</strong> خدمات رقمية مخصصة تشمل التصميم الجرافيكي، مونتاج الفيديو، تطوير الويب، والموشن ديزاين. نظراً للطبيعة المُخصصة وغير الملموسة لهذه المخرجات:</p>
          <div class="bg-[#0d0d0d] border border-brand/20 rounded-xl p-4 mt-4">
            <p class="font-semibold text-brand"><i class="fa-solid fa-triangle-exclamation mr-2"></i>لا يمكن إرجاع أو استبدال الأعمال المنجزة والمسلمة.</p>
          </div>
          <p class="text-gray-500 text-sm mt-4">الخدمات الرقمية ليست منتجات مادية ولا يمكن "إرجاعها". بمجرد الموافقة على المخرج النهائي وتسليمه، تُعتبر عملية البيع نهائية.</p>`
        },
        {
          icon: 'fa-ban',
          title: '2. سياسة الإلغاء',
          html: `<p class="mb-3">تعتمد شروط الإلغاء على مرحلة تقدم المشروع:</p>
          <div class="space-y-3 mt-4">
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1"><i class="fa-solid fa-check-circle text-green-500 mr-2"></i>قبل بدء العمل</p>
              <p class="text-gray-400 text-sm">إلغاء مجاني مع استرجاع كامل. تواصل معنا في أقرب وقت ممكن.</p>
            </div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1"><i class="fa-solid fa-clock text-yellow-500 mr-2"></i>أثناء العمل</p>
              <p class="text-gray-400 text-sm">يمكن النظر في استرجاع جزئي يتناسب مع العمل الذي لم يُنجز بعد. ساعات العمل المستثمرة غير قابلة للاسترجاع.</p>
            </div>
            <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-4">
              <p class="font-semibold mb-1"><i class="fa-solid fa-xmark-circle text-red-500 mr-2"></i>بعد التسليم النهائي</p>
              <p class="text-gray-400 text-sm">لا يتم منح أي استرجاع بمجرد اكتمال المشروع وتسليم الملفات للعميل.</p>
            </div>
          </div>`
        },
        {
          icon: 'fa-arrows-rotate',
          title: '3. التعديلات والمراجعات',
          html: `<p class="mb-3">تتضمن كل خدمة عدداً محدداً من التعديلات، موضحاً في وصف الخدمة:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>التعديلات المشمولة <strong>مجانية</strong> ويجب طلبها خلال <strong>7 أيام</strong> من التسليم.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>طلبات التعديل الإضافية التي تتجاوز الحصة المشمولة ستُحسب بشكل منفصل بعد الاتفاق المتبادل.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-chevron-right text-brand text-xs mt-1.5"></i><span>التغييرات الجذرية في الاتجاه الإبداعي تشكل مشروعاً جديداً وليست تعديلاً.</span></li>
          </ul>
          <p class="text-gray-500 text-sm mt-4">التعديلات ليست بديلاً عن الاسترجاع. إنها تهدف لتحسين العمل وفقاً للموجز الأصلي.</p>`
        },
        {
          icon: 'fa-shield-halved',
          title: '4. الحالات الاستثنائية',
          html: `<p class="mb-3">يمكن منح استرجاع كلي أو جزئي في الحالات التالية:</p>
          <ul class="space-y-2">
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>لم يتم تقديم الخدمة ولم يبدأ المشروع.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>خطأ تقني جسيم من طرفنا يجعل المخرج غير قابل للاستخدام.</span></li>
            <li class="flex items-start gap-3"><i class="fa-solid fa-check text-brand text-xs mt-1.5"></i><span>تم إجراء دفع مزدوج عن طريق الخطأ.</span></li>
          </ul>
          <p class="mt-4">كل طلب يُعالج حسب كل حالة. تواصل معنا خلال <strong>7 أيام</strong> من التسليم.</p>`
        },
        {
          icon: 'fa-gavel',
          title: '5. إجراءات المطالبة',
          html: `<p class="mb-3">لتقديم طلب استرجاع أو مطالبة:</p>
          <div class="bg-[#0d0d0d] border border-surface-border rounded-xl p-5 mt-3 space-y-3">
            <div class="flex items-start gap-3"><span class="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span><span>أرسل بريداً إلكترونياً إلى <strong>contact@pixelonevisuals.tech</strong> مع مرجع طلبك.</span></div>
            <div class="flex items-start gap-3"><span class="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span><span>صف سبب مطالبتك بالتفصيل.</span></div>
            <div class="flex items-start gap-3"><span class="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span><span>سيقوم فريقنا بمراجعة طلبك خلال <strong>48 إلى 72 ساعة عمل</strong>.</span></div>
          </div>`
        },
        {
          icon: 'fa-envelope',
          title: '6. اتصل بنا',
          highlight: true,
          html: `<p class="mb-4">لأي أسئلة حول سياسة الاسترجاع هذه، تواصل معنا:</p>
          <a href="mailto:contact@pixelonevisuals.tech" class="inline-flex items-center gap-3 bg-brand/10 border border-brand/30 hover:border-brand/60 px-5 py-3 rounded-xl transition group">
            <i class="fa-solid fa-paper-plane text-brand group-hover:translate-x-0.5 transition-transform"></i>
            <span class="font-medium">contact@pixelonevisuals.tech</span>
          </a>`
        }
      ]
    }
  }
};

/**
 * Renders a legal page (privacy, terms, or refund) with the current language.
 * @param {'privacy'|'terms'|'refund'} pageType
 */
function renderLegalPage(pageType) {
  const lang = getLang();
  const data = LEGAL_CONTENT[pageType]?.[lang] || LEGAL_CONTENT[pageType]?.en;
  if (!data) return;

  const titleEl = document.getElementById('legal-title');
  const badgeEl = document.getElementById('legal-badge');
  const updatedEl = document.getElementById('legal-updated');
  const backEl = document.getElementById('legal-back-text');
  const backBottomEl = document.getElementById('legal-back-bottom-text');
  const sectionsEl = document.getElementById('legal-sections');

  if (titleEl) titleEl.textContent = data.title;
  if (badgeEl) badgeEl.textContent = data.badge;
  if (updatedEl) updatedEl.textContent = data.updated;
  if (backEl) backEl.textContent = data.back;
  if (backBottomEl) backBottomEl.textContent = data.back;
  document.title = data.title + ' — Pixel One';

  if (sectionsEl) {
    sectionsEl.innerHTML = data.sections.map(sec => `
      <section class="bg-surface-card border ${sec.highlight ? 'border-brand/20' : 'border-surface-border'} rounded-2xl p-6 md:p-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center">
            <i class="fa-solid ${sec.icon} text-brand text-sm"></i>
          </div>
          <h2 class="text-xl font-bold">${sec.title}</h2>
        </div>
        <div class="leading-relaxed">${sec.html}</div>
      </section>
    `).join('');
  }
}
