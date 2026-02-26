-- Reset and seed professional multilingual blog posts
-- Requested by admin for live showcase content

BEGIN;

TRUNCATE TABLE public.blog_posts RESTART IDENTITY CASCADE;

INSERT INTO public.blog_posts (
  title, slug, image_url, video_url, content,
  title_en, content_en,
  title_ar, content_ar,
  is_published, view_count
)
VALUES
(
  'Stratégie de contenu 2026: convertir sans sacrifier la marque',
  'content-strategy-2026-conversion-brand',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80',
  'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  '<h2>Pourquoi la stratégie éditoriale est devenue critique</h2><p>En 2026, la compétition ne se joue plus فقط sur la publicité payante. Les marques qui gagnent structurent leur contenu autour de <strong>l''intention utilisateur</strong>, de la preuve sociale, et de la clarté commerciale.</p><h3>Plan d''exécution en 4 blocs</h3><ol><li><strong>Attraction:</strong> contenu TOFU avec SEO et formats courts.</li><li><strong>Considération:</strong> études de cas et comparatifs orientés décision.</li><li><strong>Conversion:</strong> pages services avec CTA clairs et preuves.</li><li><strong>Fidélisation:</strong> newsletter, mini-guides, offres récurrentes.</li></ol><blockquote>Règle d''or: chaque contenu doit avoir un objectif business mesurable.</blockquote><h3>Tableau KPI minimal</h3><table><thead><tr><th>KPI</th><th>Objectif</th><th>Périodicité</th></tr></thead><tbody><tr><td>Taux de clic (CTA)</td><td>&gt; 2.5%</td><td>Hebdomadaire</td></tr><tr><td>Temps moyen sur article</td><td>&gt; 2:30</td><td>Hebdomadaire</td></tr><tr><td>Leads qualifiés</td><td>+20% / trimestre</td><td>Mensuelle</td></tr></tbody></table><p>Consultez aussi notre page <a href="services.html">services</a> pour aligner contenu et offre commerciale.</p>',
  '2026 Content Strategy: Convert Without Diluting the Brand',
  '<h2>Why content strategy has become mission-critical</h2><p>In 2026, competition is no longer won by paid ads alone. Winning brands structure content around <strong>user intent</strong>, social proof, and commercial clarity.</p><h3>Execution plan in 4 blocks</h3><ol><li><strong>Attraction:</strong> TOFU SEO content and short-form formats.</li><li><strong>Consideration:</strong> case studies and decision-oriented comparisons.</li><li><strong>Conversion:</strong> service pages with clear CTAs and proof.</li><li><strong>Retention:</strong> newsletter, mini-guides, recurring offers.</li></ol><blockquote>Golden rule: each piece of content must map to a measurable business objective.</blockquote><h3>Minimum KPI dashboard</h3><table><thead><tr><th>KPI</th><th>Target</th><th>Cadence</th></tr></thead><tbody><tr><td>CTA click-through rate</td><td>&gt; 2.5%</td><td>Weekly</td></tr><tr><td>Average time on article</td><td>&gt; 2:30</td><td>Weekly</td></tr><tr><td>Qualified leads</td><td>+20% / quarter</td><td>Monthly</td></tr></tbody></table><p>See also our <a href="services.html">services</a> page to align content with offer design.</p>',
  'استراتيجية المحتوى 2026: تحويل أعلى بدون إضعاف الهوية',
  '<h2>لماذا أصبحت استراتيجية المحتوى ضرورية</h2><p>في 2026 لم تعد المنافسة تُحسم بالإعلانات الممولة فقط. العلامات الناجحة تبني محتواها حول <strong>نية المستخدم</strong>، والدليل الاجتماعي، والوضوح التجاري.</p><h3>خطة تنفيذ من 4 محاور</h3><ol><li><strong>الجذب:</strong> محتوى توعوي + SEO + فيديوهات قصيرة.</li><li><strong>التقييم:</strong> دراسات حالة ومقارنات تساعد القرار.</li><li><strong>التحويل:</strong> صفحات خدمات مع CTA واضح وأدلة ثقة.</li><li><strong>الولاء:</strong> نشرات بريدية وأدلة عملية وعروض متكررة.</li></ol><blockquote>القاعدة الذهبية: كل قطعة محتوى يجب أن ترتبط بهدف تجاري قابل للقياس.</blockquote><h3>لوحة مؤشرات أساسية</h3><table><thead><tr><th>المؤشر</th><th>الهدف</th><th>الدورية</th></tr></thead><tbody><tr><td>معدل النقر على CTA</td><td>أكثر من 2.5%</td><td>أسبوعي</td></tr><tr><td>متوسط وقت القراءة</td><td>أكثر من 2:30</td><td>أسبوعي</td></tr><tr><td>العملاء المحتملون المؤهلون</td><td>+20% كل ربع</td><td>شهري</td></tr></tbody></table><p>راجع أيضًا صفحة <a href="services.html">الخدمات</a> لربط المحتوى بالعرض التجاري.</p>',
  true,
  0
),
(
  'Production vidéo: workflow professionnel du brief à la livraison',
  'video-production-workflow-brief-to-delivery',
  'https://images.unsplash.com/photo-1574717024453-35405617fdf8?w=1400&q=80',
  'https://www.youtube.com/watch?v=jNQXAC9IVRw',
  '<h2>Un workflow clair évite 80% des retards</h2><p>La production vidéo échoue souvent à cause d''un brief flou. Un pipeline robuste protège la qualité, le timing, et la marge.</p><h3>Pipeline recommandé</h3><ul><li><strong>Pré-production:</strong> objectif, audience, script, moodboard.</li><li><strong>Tournage:</strong> plan de scènes + checklist matériel.</li><li><strong>Post-production:</strong> montage, sound design, color grading.</li><li><strong>Validation:</strong> 2 cycles de révision max, feedback structuré.</li></ul><p>Exemple de naming des exports:</p><pre><code>brand_campaign_format_v03.mp4</code></pre><p>Ressource utile: <a href="https://www.youtube.com/watch?v=jNQXAC9IVRw" target="_blank" rel="noopener">exemple vidéo</a>.</p>',
  'Video Production: A Professional Workflow from Brief to Delivery',
  '<h2>A clear workflow removes 80% of delays</h2><p>Video production often fails because the brief is vague. A strong pipeline protects quality, timeline, and margin.</p><h3>Recommended pipeline</h3><ul><li><strong>Pre-production:</strong> objective, audience, script, moodboard.</li><li><strong>Shooting:</strong> scene plan + gear checklist.</li><li><strong>Post-production:</strong> editing, sound design, color grading.</li><li><strong>Validation:</strong> max 2 revision cycles with structured feedback.</li></ul><p>Export naming example:</p><pre><code>brand_campaign_format_v03.mp4</code></pre><p>Useful reference: <a href="https://www.youtube.com/watch?v=jNQXAC9IVRw" target="_blank" rel="noopener">video example</a>.</p>',
  'إنتاج الفيديو: سير عمل احترافي من البريف حتى التسليم',
  '<h2>سير عمل واضح يقلل 80% من التأخير</h2><p>فشل مشاريع الفيديو غالبًا سببه بريف غير واضح. خط إنتاج مضبوط يحمي الجودة والوقت والربحية.</p><h3>سير العمل المقترح</h3><ul><li><strong>ما قبل الإنتاج:</strong> الهدف، الجمهور، السكريبت، المزاج البصري.</li><li><strong>التصوير:</strong> خطة مشاهد + قائمة تجهيزات.</li><li><strong>ما بعد الإنتاج:</strong> مونتاج، تصميم صوت، تصحيح ألوان.</li><li><strong>الاعتماد:</strong> دورتا مراجعة كحد أقصى مع ملاحظات منظمة.</li></ul><p>مثال تسمية الملفات:</p><pre><code>brand_campaign_format_v03.mp4</code></pre><p>مرجع مفيد: <a href="https://www.youtube.com/watch?v=jNQXAC9IVRw" target="_blank" rel="noopener">مثال فيديو</a>.</p>',
  true,
  0
),
(
  'Design system: comment unifier UI, marque et performance',
  'design-system-unify-ui-brand-performance',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1400&q=80',
  null,
  '<h2>Le design system n''est pas un luxe</h2><p>Un design system réduit les incohérences visuelles et accélère la production produit/marketing.</p><h3>Composants minimum à standardiser</h3><ul><li>Typographie: tailles, hiérarchie, espacement.</li><li>Couleurs: tokens primaires/secondaires et états.</li><li>Boutons & formulaires: variantes et comportements.</li><li>Cartes & sections: grilles et responsive rules.</li></ul><h3>Table de gouvernance</h3><table><thead><tr><th>Bloc</th><th>Owner</th><th>Règle</th></tr></thead><tbody><tr><td>UI Kit</td><td>Design Lead</td><td>Versionné toutes les 2 semaines</td></tr><tr><td>Composants Web</td><td>Frontend</td><td>Pas de couleur hardcodée</td></tr><tr><td>Contenu</td><td>Marketing</td><td>Ton et CTA cohérents</td></tr></tbody></table><p>Commencez par un audit puis itérez sprint par sprint.</p>',
  'Design System: Unifying UI, Brand, and Performance',
  '<h2>A design system is not a luxury</h2><p>A design system reduces visual inconsistency and speeds up both product and marketing delivery.</p><h3>Minimum components to standardize</h3><ul><li>Typography: size scale, hierarchy, spacing.</li><li>Colors: primary/secondary tokens and states.</li><li>Buttons & forms: variants and behavior.</li><li>Cards & sections: grid and responsive rules.</li></ul><h3>Governance table</h3><table><thead><tr><th>Area</th><th>Owner</th><th>Rule</th></tr></thead><tbody><tr><td>UI Kit</td><td>Design Lead</td><td>Version every 2 weeks</td></tr><tr><td>Web Components</td><td>Frontend</td><td>No hard-coded colors</td></tr><tr><td>Content</td><td>Marketing</td><td>Consistent tone and CTA</td></tr></tbody></table><p>Start with an audit, then iterate sprint by sprint.</p>',
  'نظام التصميم: توحيد الواجهة والهوية والأداء',
  '<h2>نظام التصميم ليس رفاهية</h2><p>نظام التصميم يقلل التباين البصري ويسرّع تنفيذ فرق المنتج والتسويق.</p><h3>الحد الأدنى للتوحيد</h3><ul><li>الطباعة: الأحجام، التسلسل، المسافات.</li><li>الألوان: رموز ألوان للحالات الأساسية والثانوية.</li><li>الأزرار والنماذج: المتغيرات والسلوك.</li><li>البطاقات والأقسام: شبكة وتجاوب موحد.</li></ul><h3>جدول الحوكمة</h3><table><thead><tr><th>المجال</th><th>المسؤول</th><th>القاعدة</th></tr></thead><tbody><tr><td>UI Kit</td><td>قائد التصميم</td><td>إصدار جديد كل أسبوعين</td></tr><tr><td>مكونات الويب</td><td>Frontend</td><td>منع الألوان الثابتة داخل الكود</td></tr><tr><td>المحتوى</td><td>Marketing</td><td>نبرة وCTA موحّدان</td></tr></tbody></table><p>ابدأ بتدقيق شامل ثم التطوير التدريجي على مستوى السبرنت.</p>',
  true,
  0
);

COMMIT;
