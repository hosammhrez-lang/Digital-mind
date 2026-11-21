import {
  BugChallenge,
  GlossaryTerm,
  LaunchScene,
  MagazineArticle,
  PhishingEmail,
  SchoolNewsDispatch,
  StudentSubmission,
  SuggestedIdea,
  TrilingualText,
} from '../types/magazine';

export const SCHOOL_LOGO_URL = '/assets/aistudio/______f55be9ad.jpg';
export const SCHOOL_FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=100057508656402';

export const MAGAZINE_GOALS: TrilingualText[] = [
  {
    ar: 'تنمية مهارات الطلاب في الحاسب الآلي والبرمجة والذكاء الاصطناعي.',
    en: 'Develop student fluency in computer science, programming, and AI.',
    fr: 'Développer les compétences des élèves en informatique, programmation et IA.',
  },
  {
    ar: 'تشجيع الابتكار والتفكير المنطقي وحل المشكلات.',
    en: 'Cultivate innovation, logical reasoning, and structured problem solving.',
    fr: 'Encourager l’innovation, la pensée logique et la résolution de problèmes.',
  },
  {
    ar: 'نشر الوعي بالأمن السيبراني والاستخدام الآمن والمسؤول للتكنولوجيا.',
    en: 'Promote cybersecurity literacy and responsible digital citizenship.',
    fr: 'Diffuser la sensibilisation à la cybersécurité et à l’usage responsable.',
  },
  {
    ar: 'دعم اللغات الثلاث من خلال محتوى تقني مبسط وجذاب.',
    en: 'Strengthen Arabic, English, and French through accessible tech storytelling.',
    fr: 'Soutenir les trois langues grâce à un contenu technique clair et accessible.',
  },
  {
    ar: 'اكتشاف الطلاب الموهوبين في البرمجة والتصميم والروبوتات.',
    en: 'Spotlight talented students in coding, UI design, and robotics.',
    fr: 'Révéler les élèves talentueux en programmation, design et robotique.',
  },
  {
    ar: 'إبراز جهود معلمي الحاسب الآلي والمشروعات التقنية بالمدرسة.',
    en: 'Highlight computer science educators and school-wide STEM initiatives.',
    fr: 'Valoriser le travail des enseignants d’informatique et les projets scolaires.',
  },
  {
    ar: 'تعزيز التعلم بالمشروعات والمسابقات والأنشطة العملية.',
    en: 'Accelerate project-based learning through recess challenges and competitions.',
    fr: 'Renforcer l’apprentissage par projets, concours et ateliers pratiques.',
  },
];

export const ISSUE_01_ARTICLES: MagazineArticle[] = [
  {
    id: 'ai-corner',
    departmentNumber: '01',
    department: {
      ar: 'نافذة على الذكاء الاصطناعي',
      en: 'AI Corner',
      fr: 'Le Coin de l’IA',
    },
    title: {
      ar: 'كيف يساعدنا الذكاء الاصطناعي في التعلم بذكاء ومسؤولية؟',
      en: 'How Does Artificial Intelligence Help Us Learn Smarter and Responsibly?',
      fr: 'Comment l’intelligence artificielle nous aide-t-elle à mieux apprendre ?',
    },
    subtitle: {
      ar: 'تبسيط مفاهيم الذكاء الاصطناعي وكيفية عمله واستخداماته في التعليم والطب والحياة اليومية.',
      en: 'Demystifying how AI recognizes patterns, supports personalized study, and requires human verification.',
      fr: 'Comprendre la reconnaissance de motifs et l’usage éthique des outils intelligents à l’école.',
    },
    juniorSummary: {
      ar: 'الذكاء الاصطناعي يشبه مساعدًا ذكيًا يتدرب على أمثلة كثيرة ليساعدنا في فهم الدروس الصعبة، لكن عقلنا البشري هو الذي يراجع الإجابة ويتأكد من صحتها دائمًا.',
      en: 'AI works like a study helper trained on thousands of examples. It can explain tricky science ideas step by step, while you remain the captain who checks every fact.',
      fr: 'L’IA ressemble à un assistant d’étude entraîné sur de nombreux exemples. Elle aide à comprendre les leçons, mais c’est toujours toi qui vérifies la réponse finale.',
    },
    author: {
      ar: 'أ. سلمى محمود — قسم الحاسب الآلي',
      en: 'Ms. Salma Mahmoud · CS Department',
      fr: 'Mme Salma Mahmoud · Département Info',
    },
    readTimeMin: 4,
    tier: 'lead',
    imageUrl: '/src/assets/images/article_ai_corner_1795166811448.jpg',
    imageCaption: {
      ar: 'شكل 1 — تمثيل مبسط للشبكات العصبية ومسارات التفكير المنطقي داخل الدفتر الرقمي.',
      en: 'Fig. 1 — Geometric illustration of neural pathways linking classroom notes and pattern models.',
      fr: 'Fig. 1 — Schéma des réseaux de neurones reliant les notes de cours aux modèles logiques.',
    },
    body: {
      ar: [
        'الذكاء الاصطناعي ليس سحرًا، بل هو مجموعة خوارزميات تتعلّم الأنماط من البيانات لتساعد الإنسان في التحليل والتلخيص والتنبؤ.',
        'في الفصول الدراسية بالمدرسة المصرية للغات، يمكن استخدام الذكاء الاصطناعي كمرشد تعليمي يشرح المسائل الرياضية خطوة بخطوة، أو يقترح تدريبات إضافية باللغتين الإنجليزية والفرنسية.',
        'القاعدة الذهبية في «عقول رقمية» هي الاستخدام المسؤول: لا تنسخ الإجابة كما هي، ولا تشارك بياناتك الشخصية، وتأكد دائمًا من صحة المعلومة مع معلمك أو من كتابك المدرسي.',
      ],
      en: [
        'Artificial intelligence is not magic—it is mathematics and pattern recognition trained on curated examples to assist humans with analysis, translation, and problem solving.',
        'Inside Egyptian Language School classrooms, students can treat AI as a patient tutor: breaking down a physics concept, practicing French vocabulary, or debugging syntax errors step by step.',
        'Our golden rule at Digital Minds is responsible authorship: never copy answers blindly, protect personal student data, and always verify generated facts with teachers and primary sources.',
      ],
      fr: [
        'L’intelligence artificielle n’est pas magique : c’est un ensemble d’algorithmes capables de repérer des régularités dans les données pour aider à analyser, traduire et résumer.',
        'Dans nos classes à l’École Égyptienne des Langues, l’IA peut servir de tuteur patient : reformuler une notion de sciences, s’exercer en anglais ou expliquer une erreur de code.',
        'La règle d’or d’Esprits Numériques reste la responsabilité : ne jamais copier sans comprendre, préserver ses données privées et toujours vérifier les résultats avec un enseignant.',
      ],
    },
    keyTakeaway: {
      ar: 'استخدم الذكاء الاصطناعي لفهم «لماذا وكيف» وليس للحصول على إجابة جاهزة.',
      en: 'Use AI to ask "why" and "how"—never as a shortcut around thinking.',
      fr: 'Utilisez l’IA pour comprendre le « pourquoi » et le « comment », jamais pour remplacer votre réflexion.',
    },
    qrSlug: 'els-issue01-ai-corner',
  },
  {
    id: 'coding-academy',
    departmentNumber: '02',
    department: {
      ar: 'مدرسة المبرمجين',
      en: 'Coding Academy',
      fr: 'L’Académie du Code',
    },
    title: {
      ar: 'أنشئ أول لعبة لك باستخدام Scratch في أربع خطوات',
      en: 'Build Your First Interactive Platformer Game in Scratch',
      fr: 'Créez votre premier jeu de plateforme avec Scratch',
    },
    subtitle: {
      ar: 'دروس برمجية متدرجة في Scratch و Python و HTML/CSS/JS مناسبة لمراحل المدرسة.',
      en: 'Step-by-step event loops, gravity variables, and collision blocks for beginners.',
      fr: 'Boucles d’événements, gravité et détection de collisions pour bien débuter.',
    },
    juniorSummary: {
      ar: 'في سكراتش نربط المكعبات الملونة معًا: مكعب للحركة يمينًا ويسارًا، ومكعب للقفز عند لمس المسافة، ومكعب لجمع النقاط عند لمس النجمة الذهبية.',
      en: 'Snap colorful code blocks together: one block moves your hero left and right, one block makes it jump, and an "if touching star" block adds 1 point to your score.',
      fr: 'Assemblez des blocs colorés : un bloc pour courir, un bloc pour sauter et un bloc « si touche l’étoile » pour gagner des points.',
    },
    author: {
      ar: 'أ. كريم نبيل — معمل البرمجة',
      en: 'Mr. Karim Nabil · Coding Lab',
      fr: 'M. Karim Nabil · Laboratoire Code',
    },
    readTimeMin: 5,
    tier: 'secondary',
    imageUrl: '/src/assets/images/article_coding_academy_1795166809373.jpg',
    imageCaption: {
      ar: 'شكل 2 — بناء منطق الحركة والقفز باستخدام لبنات Scratch داخل معمل الحاسب.',
      en: 'Fig. 2 — Middle school student assembling movement loops in the ELS technology lab.',
      fr: 'Fig. 2 — Assemblage des boucles de mouvement dans le laboratoire informatique.',
    },
    body: {
      ar: [
        'تبدأ كل لعبة ناجحة بثلاثة عناصر أساسية: كائن يتحكم فيه اللاعب، وهدف يجمعه، وعقبة يتجنبها.',
        'أنشئ متغيرًا باسم (Score) واجعل قيمته صفرًا عند الضغط على العلم الأخضر. استخدم حلقة التكرار (Forever) لفحص ضغطات الأسهم وتحديث الإحداثي X.',
        'لإضافة تحدٍّ حقيقي، أضف متغيرًا للسرعة يزداد كلما جمع اللاعب 5 عملات، ثم اختبر اللعبة مع زملائك في الفسحة!',
      ],
      en: [
        'Every great game starts with three essentials: a responsive hero sprite, a clear goal to collect, and an obstacle to outsmart.',
        'Create a variable named Score and reset it to 0 when the green flag is clicked. Inside a Forever loop, listen for Arrow keys to shift X position and Spacebar to trigger a smooth Y-axis jump.',
        'Ready to level up? Add a speed multiplier after every 5 coins collected and invite classmates to playtest your build.',
      ],
      fr: [
        'Tout bon jeu repose sur trois piliers : un personnage réactif, un objectif à atteindre et un obstacle à éviter.',
        'Créez une variable Score remise à zéro au clic sur le drapeau vert. Dans une boucle Répéter indéfiniment, testez les flèches pour déplacer le héros et la barre d’espace pour sauter.',
        'Pour aller plus loin, augmentez légèrement la vitesse tous les 5 points et faites tester votre jeu par vos camarades.',
      ],
    },
    keyTakeaway: {
      ar: 'اللعبة البسيطة المكتملة أفضل من فكرة معقدة غير منتهية.',
      en: 'A small playable game you finish beats a huge idea left unfinished.',
      fr: 'Un petit jeu complet et jouable vaut toujours mieux qu’un grand projet inachevé.',
    },
    qrSlug: 'els-issue01-scratch-game',
  },
  {
    id: 'robotics-innovation',
    departmentNumber: '03',
    department: {
      ar: 'الروبوتات والابتكار',
      en: 'Robotics & Innovation',
      fr: 'Robotique et Innovation',
    },
    title: {
      ar: 'كيف نصمم روبوتًا يتجنب العوائق باستخدام الحساس فوق الصوتي؟',
      en: 'Designing an Autonomous Obstacle-Avoiding Robot with Ultrasonic Sensors',
      fr: 'Concevoir un robot éviteur d’obstacles avec capteur ultrasonique',
    },
    subtitle: {
      ar: 'مشروعات الروبوتات، وأجهزة الاستشعار، والدوائر الإلكترونية، وتجارب STEM.',
      en: 'How HC-SR04 sound pulses measure distance and guide dual-motor steering.',
      fr: 'Comment les ondes sonores mesurent la distance et pilotent deux moteurs.',
    },
    juniorSummary: {
      ar: 'يرسل الحساس موجة صوتية لا نسمعها ترتد عن الجدار مثل صدى الصوت. إذا كان الجدار قريبًا جدًا، يدور الروبوت يمينًا ليكمل طريقه بأمان.',
      en: 'The ultrasonic sensor acts like bat ears: it sends an invisible sound echo. When a wall is closer than 25 cm, the robot turns right automatically.',
      fr: 'Le capteur fonctionne comme l’écho d’une chauve-souris : si un mur est à moins de 25 cm, le robot tourne à droite tout seul.',
    },
    author: {
      ar: 'فريق نادي الروبوتات — ELS',
      en: 'ELS Robotics Club Team',
      fr: 'Club Robotique de l’ELS',
    },
    readTimeMin: 4,
    tier: 'secondary',
    imageUrl: '/src/assets/images/article_robotics_lab_1795166810717.jpg',
    imageCaption: {
      ar: 'شكل 3 — نموذج أولي لروبوت مزود بحساس HC-SR04 ولوحة تحكم على طاولة المعمل.',
      en: 'Fig. 3 — Student-assembled rover chassis fitted with an HC-SR04 ultrasonic module.',
      fr: 'Fig. 3 — Châssis robotique équipé d’un module ultrasonique HC-SR04.',
    },
    body: {
      ar: [
        'يعتمد الروبوت ذاتي القيادة على دورة مستمرة: استشعار، ثم اتخاذ قرار، ثم تنفيذ حركة عبر المحركات.',
        'يقيس حساس HC-SR04 الزمن الذي تستغرقه الموجة الصوتية للذهاب والعودة، ثم يحوله إلى مسافة بالسنتيمتر.',
        'عندما تقل المسافة عن 25 سم، يتوقف المحرك الأيمن أو يدور للخلف بينما يتقدم المحرك الأيسر لينعطف الروبوت بسلاسة. جرّب ذلك في مختبر الروبوت التفاعلي بالمجلة!',
      ],
      en: [
        'Autonomous robots rely on a fast sense-think-act loop running dozens of times per second.',
        'An HC-SR04 ultrasonic sensor emits a 40 kHz pulse and times how long the echo takes to bounce back, converting microseconds into centimeters.',
        'Whenever distance drops below 25 cm, the microcontroller reverses the right wheel briefly so the chassis pivots cleanly. Try this live in our Interactive Robotics Lab!',
      ],
      fr: [
        'Un robot autonome suit en permanence la boucle : percevoir, décider, agir.',
        'Le capteur HC-SR04 envoie une impulsion ultrasonore et mesure le temps de retour de l’écho pour calculer la distance en centimètres.',
        'Sous le seuil de 25 cm, la carte inverse brièvement la roue droite afin de contourner l’obstacle. Testez ce principe dans notre atelier interactif !',
      ],
    },
    keyTakeaway: {
      ar: 'المعادلة الذهبية: المسافة = (الزمن × سرعة الصوت) ÷ 2.',
      en: 'Core formula: Distance = (Echo Time × Speed of Sound) ÷ 2.',
      fr: 'Formule clé : Distance = (Temps d’écho × Vitesse du son) ÷ 2.',
    },
    qrSlug: 'els-issue01-robotics-hc04',
  },
  {
    id: 'cybersecurity',
    departmentNumber: '04',
    department: {
      ar: 'الأمن السيبراني',
      en: 'Cybersecurity',
      fr: 'Cybersécurité',
    },
    title: {
      ar: 'هل تستطيع اكتشاف رسالة التصيّد الإلكتروني قبل فوات الأوان؟',
      en: 'Can You Spot a Phishing Message Before Clicking the Link?',
      fr: 'Savez-vous repérer un message d’hameçonnage avant de cliquer ?',
    },
    subtitle: {
      ar: 'حماية كلمات المرور، فحص الروابط المشبوهة، والخصوصية الرقمية للطلاب.',
      en: 'Four quick checks for suspicious domains, artificial urgency, and password safety.',
      fr: 'Quatre réflexes simples pour vérifier l’expéditeur et protéger ses mots de passe.',
    },
    juniorSummary: {
      ar: 'لا تضغط على أي رابط يعدك بجائزة فورية أو يهدد بإغلاق حسابك اليوم. اسأل والديك أو معلمك أولاً وتأكد من عنوان المرسل الحقيقي.',
      en: 'Never click links promising instant prizes or threatening to lock your account today. Always check the sender address with a parent or teacher.',
      fr: 'Ne cliquez jamais sur un lien promettant un cadeau urgent ou menaçant de fermer votre compte. Vérifiez toujours l’adresse réelle.',
    },
    author: {
      ar: 'أ. طارق حسن — مشرف الأمن الرقمي',
      en: 'Mr. Tarek Hassan · Digital Safety Lead',
      fr: 'M. Tarek Hassan · Sécurité Numérique',
    },
    readTimeMin: 3,
    tier: 'department',
    body: {
      ar: [
        'تعتمد رسائل التصيّد على الاستعجال والخوف أو الإغراء بجائزة مجانية لدفعك إلى إدخال كلمة مرورك في صفحة مزيفة.',
        'تحقق دائمًا من النطاق البريدي الحقيقي للمرسل؛ فقد يبدو الاسم مألوفًا بينما ينتهي العنوان بدومين غريب.',
        'استخدم كلمات مرور طويلة فريدة لكل حساب وفعّل التحقق بخطوتين (2FA) لحماية بريدك المدرسي.',
      ],
      en: [
        'Phishing relies on artificial urgency—claiming your account will be deleted in 2 hours—to make you skip careful inspection.',
        'Always inspect the full email domain after the @ symbol, hover before clicking links, and never enter school credentials on unfamiliar URLs.',
        'Enable two-factor authentication (2FA) and test your instincts in the Phishing Detective lab inside this portal.',
      ],
      fr: [
        'L’hameçonnage joue sur l’urgence ou la peur pour vous pousser à saisir votre mot de passe sur un faux formulaire.',
        'Vérifiez toujours le nom de domaine complet après le symbole @ et survolez les liens avant tout clic.',
        'Activez la double authentification et entraînez-vous dans notre atelier Anti-Hameçonnage.',
      ],
    },
    keyTakeaway: {
      ar: 'توقّف لخمس ثوانٍ وافحص عنوان المرسل قبل النقر على أي رابط.',
      en: 'Pause 5 seconds and inspect the domain after @ before every click.',
      fr: 'Prenez 5 secondes pour vérifier le domaine après @ avant chaque clic.',
    },
    qrSlug: 'els-issue01-cybersecurity',
  },
  {
    id: 'tech-in-our-life',
    departmentNumber: '05',
    department: {
      ar: 'التكنولوجيا في حياتنا',
      en: 'Tech in Our Life',
      fr: 'La Technologie au Quotidien',
    },
    title: {
      ar: 'ماذا يحدث خلف الشاشة عندما نضغط على زر البحث؟',
      en: 'What Happens Behind the Screen When We Press the Search Button?',
      fr: 'Que se passe-t-il derrière l’écran lorsque l’on appuie sur Rechercher ?',
    },
    subtitle: {
      ar: 'رحلة الاستعلام عبر DNS والخوادم السحابية والفهارس في أجزاء من الثانية.',
      en: 'Tracing DNS lookups, cloud servers, and search indexes in under 200 milliseconds.',
      fr: 'Le voyage d’une requête DNS à travers les serveurs et les index en moins de 200 ms.',
    },
    juniorSummary: {
      ar: 'محرك البحث يشبه أمين مكتبة فائق السرعة؛ لديه فهرس جاهز لكل الكتب في العالم، وعندما تسأل يعيد لك أنسب الصفحات في أقل من رمشة عين.',
      en: 'A search engine acts like a super-fast librarian with an organized index of billions of pages, returning the best match in the blink of an eye.',
      fr: 'Un moteur de recherche agit comme un bibliothécaire ultra-rapide qui consulte un index déjà classé en un clin d’œil.',
    },
    author: {
      ar: 'ندى أشرف — الصف الأول الثانوي',
      en: 'Nada Ashraf · Grade 10 Editorial Team',
      fr: 'Nada Ashraf · Rédaction Lycée',
    },
    readTimeMin: 3,
    tier: 'department',
    body: {
      ar: [
        'عند كتابة سؤال والضغط على زر البحث، يترجم نظام أسماء النطاقات (DNS) اسم الموقع إلى عنوان رقمي IP.',
        'بعدها لا يبحث المحرك في كل الإنترنت لحظيًا، بل يفحص فهرسًا ضخمًا أُعدّ مسبقًا ويرتّب النتائج حسب الصلة والدقة.',
        'كل ذلك يحدث عبر كابلات الألياف الضوئية ومراكز البيانات السحابية في أقل من ربع ثانية.',
      ],
      en: [
        'When you hit Enter, your browser first asks a DNS resolver to translate the website name into a numeric IP address.',
        'Search engines do not scan the entire web live; they query a pre-built inverted index stored across distributed cloud servers.',
        'Ranking algorithms sort results by relevance and clarity, delivering your answer over fiber-optic networks in under 200 milliseconds.',
      ],
      fr: [
        'Dès que vous validez, le système DNS traduit le nom du site en adresse IP numérique.',
        'Le moteur ne parcourt pas tout le web en direct : il interroge un index déjà structuré dans des centres de données.',
        'Les résultats arrivent par fibre optique en moins d’un quart de seconde.',
      ],
    },
    keyTakeaway: {
      ar: 'السرعة تأتي من الفهرسة المسبقة والتنظيم الذكي للبيانات.',
      en: 'Speed comes from smart indexing long before you type a query.',
      fr: 'La rapidité vient de l’indexation préalable et du tri intelligent.',
    },
    qrSlug: 'els-issue01-search-journey',
  },
  {
    id: 'student-showcase-article',
    departmentNumber: '06',
    department: {
      ar: 'إبداعات طلابنا',
      en: 'Student Showcase',
      fr: 'Les Créations des Élèves',
    },
    title: {
      ar: 'مشروع الشهر: تطبيق ذكي لتنظيم الواجبات المدرسية',
      en: 'Project of the Month: Trilingual Homework Organizer App',
      fr: 'Projet du Mois : Application Trilingue de Gestion des Devoirs',
    },
    subtitle: {
      ar: 'مساحة لعرض تطبيقات الطلاب وألعابهم وتصميماتهم الرقمية مع اسم الطالب والصف.',
      en: 'How Prep 2 student Omar Khaled designed a distraction-free deadline tracker.',
      fr: 'Comment Omar Khaled (2e Préparatoire) a conçu un outil simple pour suivre ses devoirs.',
    },
    juniorSummary: {
      ar: 'طالب في الصف الثاني الإعدادي صنع جدولاً رقميًا يذكّر الطلاب بمواعيد الواجبات والاختبارات بألوان واضحة وسهلة.',
      en: 'An 8th-grade student built a tidy digital checklist that reminds classmates of upcoming homework without noisy ads.',
      fr: 'Un élève a créé un agenda numérique sans publicité pour ne plus oublier aucun devoir.',
    },
    author: {
      ar: 'عمر خالد — الصف الثاني الإعدادي',
      en: 'Omar Khaled · Prep 2',
      fr: 'Omar Khaled · 2e Préparatoire',
    },
    readTimeMin: 3,
    tier: 'department',
    body: {
      ar: [
        'لاحظ عمر أن زملاءه ينسون مواعيد بعض الواجبات بين المواد العربية والإنجليزية والفرنسية، فقرر بناء حل عملي.',
        'استخدم HTML وCSS وJavaScript لحفظ المهام محليًا على الجهاز مع تصنيفها حسب المادة وتاريخ التسليم.',
        'يمكنك استعراض المشروع أو إضافة مشروعك الخاص مباشرة من قسم «الإبداعات» في هذه البوابة.',
      ],
      en: [
        'Noticing classmates juggling assignments across Arabic, English, and French tracks, Omar built a unified planner using HTML, CSS, and JavaScript.',
        'Tasks save locally in the browser and sort automatically by due date and subject priority.',
        'Explore Omar’s build and submit your own project in the Student Showcase tab.',
      ],
      fr: [
        'Voyant ses camarades jongler entre les devoirs en arabe, anglais et français, Omar a développé un agenda unifié en HTML, CSS et JavaScript.',
        'Les tâches sont enregistrées localement et classées par urgence.',
        'Découvrez son projet et proposez le vôtre dans l’onglet Créations.',
      ],
    },
    keyTakeaway: {
      ar: 'أفضل مشروع برمجي هو الذي يحل مشكلة يومية حقيقية حولك.',
      en: 'The best student project solves a real everyday problem at school.',
      fr: 'Les meilleurs projets résolvent un vrai besoin quotidien au sein de l’école.',
    },
    qrSlug: 'els-issue01-homework-app',
  },
  {
    id: 'think-and-solve',
    departmentNumber: '07',
    department: {
      ar: 'فكّر وحلّ',
      en: 'Think & Solve',
      fr: 'Réfléchis et Résous',
    },
    title: {
      ar: 'تحدي اكتشاف الخطأ في الكود: هل تجد الخلل في 30 ثانية؟',
      en: 'Debug Challenge: Spot the Logic Error in 30 Seconds',
      fr: 'Défi Débogage : Trouvez l’erreur logique en 30 secondes',
    },
    subtitle: {
      ar: 'ألغاز منطقية وتحديات خوارزمية واكتشاف الأخطاء البرمجية مع الحل عبر البوابة.',
      en: 'Algorithmic riddles and bug-hunting puzzles with instant interactive verification.',
      fr: 'Énigmes logiques et chasse aux erreurs avec correction interactive.',
    },
    juniorSummary: {
      ar: 'المبرمج الماهر يقرأ الكود كالمحقق! ابحث عن العلامة الناقصة أو الشرط المعكوس وجرّب الحل في المختبر.',
      en: 'Great coders read code like detectives. Look for a missing symbol or flipped condition inside the interactive lab.',
      fr: 'Les bons développeurs lisent le code comme des détectives : cherchez le symbole oublié dans l’atelier.',
    },
    author: {
      ar: 'لجنة المسابقات التقنية — ELS',
      en: 'ELS Tech Puzzle Committee',
      fr: 'Comité des Défis Tech ELS',
    },
    readTimeMin: 2,
    tier: 'department',
    body: {
      ar: [
        'الأخطاء البرمجية تنقسم إلى أخطاء كتابة (Syntax) وأخطاء منطق (Logic) تجعل البرنامج يعمل لكن بنتيجة خاطئة.',
        'في لغز هذا العدد: لماذا يعطي البرنامج علامة النجاح دائمًا رغم إدخال درجة أقل من المطلوب؟',
        'انتقل إلى تبويب «المختبرات» وجرّب تحدي «اكتشف الخطأ» للحصول على نقطة التحدي الفورية.',
      ],
      en: [
        'Bugs come in two main flavors: syntax typos that stop a program from running, and subtle logic bugs that produce the wrong result.',
        'In Issue 01’s challenge, inspect why an assignment operator (=) instead of a comparison (==) breaks a grading script.',
        'Head to the Interactive Labs tab to click the buggy line and test your debugging instinct.',
      ],
      fr: [
        'On distingue les erreurs de syntaxe (qui bloquent l’exécution) des erreurs de logique (qui faussent le résultat).',
        'Dans l’énigme du numéro 01, repérez pourquoi l’opérateur d’affectation (=) remplace à tort la comparaison (==).',
        'Rendez-vous dans l’onglet Ateliers pour cliquer sur la ligne fautive.',
      ],
    },
    keyTakeaway: {
      ar: 'الخطأ البرمجي خطوة طبيعية نحو فهم أعمق للكود.',
      en: 'Every bug you trace sharpens your mental model of how code executes.',
      fr: 'Chaque bug résolu renforce votre compréhension réelle du programme.',
    },
    qrSlug: 'els-issue01-think-solve',
  },
  {
    id: 'meet-the-expert',
    departmentNumber: '08',
    department: {
      ar: 'لقاء مع خبير',
      en: 'Meet the Expert',
      fr: 'Rencontre avec un Expert',
    },
    title: {
      ar: 'كيف تصبح مبرمجًا ناجحًا منذ المرحلة المدرسية؟',
      en: 'How Do You Become a Confident Programmer Starting in School?',
      fr: 'Comment devenir un bon programmeur dès le collège ou le lycée ?',
    },
    subtitle: {
      ar: 'حوار مع معلمي الحاسب الآلي وأوائل الطلبة حول أسرار التعلم العملي.',
      en: 'Advice from Egyptian Language School CS faculty and student competition finalists.',
      fr: 'Conseils des professeurs d’informatique et des élèves lauréats.',
    },
    juniorSummary: {
      ar: 'خصص 20 دقيقة يوميًا للتجربة، واصنع مشاريع صغيرة تحبها، ولا تخف أبدًا من رسائل الخطأ الحمراء.',
      en: 'Practice 20 minutes a day, build small projects you care about, and treat red error messages as helpful clues.',
      fr: 'Pratiquez 20 minutes par jour, créez de petits projets qui vous plaisent et voyez les erreurs comme des indices.',
    },
    author: {
      ar: 'حوار التحرير — أ. محمد عبد الرحمن',
      en: 'Editorial Interview · Mr. Mohamed Abdelrahman',
      fr: 'Entretien · M. Mohamed Abdelrahman',
    },
    readTimeMin: 4,
    tier: 'department',
    body: {
      ar: [
        'يؤكد معلمو الحاسب الآلي أن السر لا يكمن في حفظ الأكواد، بل في فهم الفكرة وتحليل المشكلة إلى خطوات صغيرة.',
        'نصيحة رقم 1: ابدأ بمشروع بسيط يهمك شخصيًا، مثل آلة حاسبة للدرجات أو لعبة أسئلة في التاريخ.',
        'نصيحة رقم 2: شارك عملك مع زملائك واقرأ أكواد غيرك؛ فالمجتمع المدرسي هو أفضل بيئة للنمو التقني.',
      ],
      en: [
        'Our CS teachers emphasize that programming mastery comes from breaking big problems into small testable steps—not memorizing syntax.',
        'Tip 1: Build small tools tied to your real interests, like a flashcards quiz or a physics unit converter.',
        'Tip 2: Share your code with peers. Explaining how your program works is the fastest way to spot improvements.',
      ],
      fr: [
        'Nos enseignants rappellent que l’essentiel n’est pas de mémoriser par cœur, mais de décomposer un problème en étapes simples.',
        'Conseil 1 : Créez de petits programmes liés à vos passions, comme un quiz de révision.',
        'Conseil 2 : Partagez vos créations et expliquez votre code à vos camarades.',
      ],
    },
    keyTakeaway: {
      ar: 'المثابرة اليومية البسيطة تصنع مبرمجًا محترفًا مع نهاية العام.',
      en: 'Twenty focused minutes a day compounds into real engineering skill.',
      fr: 'Vingt minutes de pratique régulière construisent de solides compétences.',
    },
    qrSlug: 'els-issue01-expert-interview',
  },
  {
    id: 'tech-three-languages',
    departmentNumber: '09',
    department: {
      ar: 'قاموس التقنية بثلاث لغات',
      en: 'Tech in Three Languages',
      fr: 'La Tech en Trois Langues',
    },
    title: {
      ar: '15 مصطلحًا تقنيًا أساسيًا بالعربية والإنجليزية والفرنسية',
      en: '15 Essential Tech Terms Across Arabic, English, and French',
      fr: '15 Termes Techniques Essentiels en Arabe, Anglais et Français',
    },
    subtitle: {
      ar: 'جسر لغوي يربط مصطلحات البرمجة والذكاء الاصطناعي بين مناهج اللغات الثلاث.',
      en: 'Bridging vocabulary across ELS language tracks—starting with Algorithm / Algorithme / خوارزمية.',
      fr: 'Un pont lexical entre les trois langues de l’école, à commencer par Algorithme.',
    },
    juniorSummary: {
      ar: 'تعلم نفس الكلمة التقنية بالعربية والإنجليزية والفرنسية لتفهم المقالات والفيديوهات العلمية حول العالم.',
      en: 'Learn each key tech word in Arabic, English, and French so you can read guides and collaborate anywhere.',
      fr: 'Apprenez chaque mot clé en trois langues pour lire la documentation technique internationale.',
    },
    author: {
      ar: 'هيئة تحرير اللغات — ELS',
      en: 'ELS Trilingual Editorial Desk',
      fr: 'Rédaction Trilingue ELS',
    },
    readTimeMin: 3,
    tier: 'department',
    body: {
      ar: [
        'يمتاز طلاب المدرسة المصرية للغات بإتقان أكثر من لغة، ويساعدهم هذا القاموس على توحيد المصطلحات العلمية.',
        'مثال العدد: خوارزمية (العربية) — Algorithm (English) — Algorithme (Français).',
        'تصفّح القاموس الكامل القابل للبحث من شريط التنقل بالأعلى لاستعراض جميع المصطلحات الخمسة عشر.',
      ],
      en: [
        'One of Egyptian Language School’s greatest strengths is multilingual fluency. Our dictionary connects CS concepts across all three tracks.',
        'Featured trio: خوارزمية (Arabic) — Algorithm (English) — Algorithme (French).',
        'Open the full searchable Glossary tab above to filter all 15 terms by AI, Coding, Robotics, or Cybersecurity.',
      ],
      fr: [
        'La maîtrise de trois langues est une force majeure à l’École Égyptienne des Langues. Ce lexique relie les notions techniques entre elles.',
        'Exemple phare : خوارزمية (Arabe) — Algorithm (Anglais) — Algorithme (Français).',
        'Consultez l’onglet Lexique ci-dessus pour explorer et filtrer les 15 définitions complètes.',
      ],
    },
    keyTakeaway: {
      ar: 'إتقان المصطلح بثلاث لغات يفتح لك أبواب البحث العلمي العالمي.',
      en: 'Knowing core tech terms in three languages unlocks global learning resources.',
      fr: 'Maîtriser le vocabulaire en trois langues ouvre l’accès aux ressources mondiales.',
    },
    qrSlug: 'els-issue01-glossary',
  },
  {
    id: 'tech-news-els',
    departmentNumber: '10',
    department: {
      ar: 'أخبارنا التقنية بالمدرسة',
      en: 'Tech News at ELS',
      fr: 'Actualités Tech de l’ELS',
    },
    title: {
      ar: 'حصاد أنشطة الحاسب الآلي وورش العمل والروبوتات هذا الشهر',
      en: 'Monthly Dispatch: Coding Workshops, STEM Fair & Student Recognition',
      fr: 'Bilan du Mois : Ateliers de Code, Foire STEM et Lauréats',
    },
    subtitle: {
      ar: 'تغطية فعاليات المدرسة المصرية للغات ومعارض المشروعات وتكريم المتميزين.',
      en: 'Highlights from the school computer labs, recess challenges, and upcoming exhibitions.',
      fr: 'Temps forts des laboratoires informatiques, défis de la récréation et expositions.',
    },
    juniorSummary: {
      ar: 'هذا الشهر شارك طلابنا في ورشة بناء الروبوت وتحدي الفسحة للألغاز البرمجية، وتم تكريم أفضل المشروعات.',
      en: 'This month students joined the weekend robotics build, solved recess coding riddles, and celebrated our Coder of the Month.',
      fr: 'Ce mois-ci, les élèves ont participé à l’atelier robotique et aux défis de la récréation.',
    },
    author: {
      ar: 'قسم الأنشطة والإعلام — ELS',
      en: 'ELS Student Media Desk',
      fr: 'Pôle Activités & Média ELS',
    },
    readTimeMin: 3,
    tier: 'department',
    body: {
      ar: [
        'شهد معمل الحاسب الآلي انطلاق ورشة «أول خطوة في Python وScratch» بمشاركة واسعة من طلاب المرحلتين الابتدائية والإعدادية.',
        'كما أُعلن عن مسابقة «تحدي الفسحة» الأسبوعي لاكتشاف الأخطاء البرمجية مع جوائز رمزية وشهادات تقدير.',
        'ترقبوا معرض المشروعات التقنية بنهاية الفصل الدراسي لعرض ابتكارات الطلاب أمام أولياء الأمور.',
      ],
      en: [
        'Over 65 students joined this month’s introductory workshops covering Scratch game mechanics and Python logic loops.',
        'Weekly "Recess Tech Challenges" now run every Tuesday, giving students a fun 10-minute puzzle with recognition certificates.',
        'Prepare your teams for the end-of-term ELS Innovation Showcase open to teachers and parents.',
      ],
      fr: [
        'Plus de 65 élèves ont participé aux ateliers de lancement dédiés à Scratch et Python.',
        'Les défis hebdomadaires de la récréation proposent chaque mardi une énigme algorithmique de 10 minutes.',
        'Préparez vos équipes pour l’exposition technologique de fin de trimestre devant les parents.',
      ],
    },
    keyTakeaway: {
      ar: 'تابع جدول الأنشطة الأسبوعي وشارك في تحدي الفسحة القادم.',
      en: 'Join Tuesday’s recess challenge and submit your team’s project early.',
      fr: 'Participez au défi du mardi et inscrivez votre équipe pour l’exposition.',
    },
    qrSlug: 'els-issue01-els-news',
  },
  {
    id: 'from-idea-to-project',
    departmentNumber: 'B1',
    department: {
      ar: 'من فكرة إلى مشروع',
      en: 'From Idea to Project',
      fr: 'De l’Idée au Projet',
    },
    title: {
      ar: 'قسم متجدد: كيف تحوّل فكرة صغيرة إلى نموذج أولي ناجح؟',
      en: 'Bonus Spotlight: Turning a Notebook Sketch into a Working Prototype',
      fr: 'Dossier Spécial : Transformer une idée sur papier en prototype',
    },
    subtitle: {
      ar: 'منهجية التصميم في 4 خطوات: الفهم، التخطيط، البناء السريع، والاختبار.',
      en: 'A practical 4-step student blueprint: Observe, Sketch, Build Small, Test.',
      fr: 'Une méthode en 4 étapes : Observer, Esquisser, Construire simple, Tester.',
    },
    juniorSummary: {
      ar: 'ارسم فكرتك على ورقة أولاً، ثم اصنع أبسط نسخة تعمل منها، واجعل صديقك يجربها ليخبرك كيف تصبح أفضل.',
      en: 'Draw your idea on paper first, build the smallest working version, and let a friend test it for feedback.',
      fr: 'Dessinez votre idée sur papier, réalisez une première version simple et faites-la tester par un ami.',
    },
    author: {
      ar: 'د. هبة علام — إرشاد الابتكار',
      en: 'Dr. Heba Allam · Innovation Advisor',
      fr: 'Dr Heba Allam · Conseil Innovation',
    },
    readTimeMin: 3,
    tier: 'department',
    isBonus: true,
    body: {
      ar: [
        'كثير من المشروعات تتوقف لأن أصحابها يحاولون بناء كل المزايا في يوم واحد.',
        'ابدأ برسم ثلاث شاشات فقط على الورق، ثم برمج الميزة الأساسية أولاً، واجعل زملاءك يجربونها مبكرًا.',
      ],
      en: [
        'Many student ideas stall because teams try to build ten features on day one.',
        'Sketch three key screens on paper, code one working core flow, and gather classmate feedback before expanding.',
      ],
      fr: [
        'Beaucoup de projets s’arrêtent parce que l’on veut tout programmer dès le premier jour.',
        'Dessinez trois écrans sur papier, codez une seule fonction centrale et recueillez vite des retours.',
      ],
    },
    keyTakeaway: {
      ar: 'ابدأ بنموذج أولي بسيط قابل للتجربة في أسبوع واحد.',
      en: 'Aim for a working one-week prototype before adding extras.',
      fr: 'Visez un premier prototype testable en une semaine.',
    },
    qrSlug: 'els-issue01-idea-to-project',
  },
  {
    id: 'parents-and-tech',
    departmentNumber: 'B2',
    department: {
      ar: 'أولياء الأمور والتكنولوجيا',
      en: 'Parents & Technology',
      fr: 'Parents et Technologie',
    },
    title: {
      ar: 'قسم متجدد: دليل الأسرة للاستخدام الآمن للإنترنت والذكاء الاصطناعي',
      en: 'Bonus Spotlight: A Family Guide to Safe AI & Screen Habits',
      fr: 'Dossier Spécial : Guide des familles pour un usage serein de l’IA',
    },
    subtitle: {
      ar: 'نصائح عملية للأهل لدعم فضول الأبناء التقني مع الحفاظ على الخصوصية والاتزان.',
      en: 'Practical steps for parents to encourage creative coding while keeping safety boundaries clear.',
      fr: 'Conseils pratiques pour encourager la créativité numérique en toute sécurité.',
    },
    juniorSummary: {
      ar: 'اجلس مع أسرتك مرة كل أسبوع لتجربوا معًا لعبة برمجية أو مشروعًا صنعته بيديك، واجعلوا وقت الشاشة وقتًا للإبداع لا للمشاهدة فقط.',
      en: 'Turn screen time into creation time by sharing your coding projects with family once a week.',
      fr: 'Transformez le temps d’écran en temps de création en montrant vos projets à votre famille.',
    },
    author: {
      ar: 'مجلس التحرير المشترك — ELS',
      en: 'ELS Faculty & Parent Council',
      fr: 'Conseil Pédagogique & Parents ELS',
    },
    readTimeMin: 3,
    tier: 'department',
    isBonus: true,
    body: {
      ar: [
        'أفضل حماية رقمية للأبناء هي الحوار المفتوح ومشاركة الأبناء اهتماماتهم البرمجية بدلاً من المنع التام.',
        'شجّع طفلك على التحول من مستهلك سلبي إلى صانع محتوى أو لعبة أو تجربة علمية مفيدة، مع تفعيل إعدادات الخصوصية الأساسية.',
      ],
      en: [
        'The strongest digital safety net is open family conversation—asking students to demo what they built rather than just restricting screens.',
        'Encourage shifting from passive scrolling to active creation in Scratch, Python, or digital design alongside clear privacy rules.',
      ],
      fr: [
        'La meilleure protection reste le dialogue ouvert : invitez vos enfants à présenter ce qu’ils créent en classe.',
        'Encouragez le passage d’une consommation passive à une création active dans un cadre clair.',
      ],
    },
    keyTakeaway: {
      ar: 'شجّع الانتقال من استهلاك الشاشة إلى صناعة التكنولوجيا.',
      en: 'Shift household screen habits from passive consumption to creative making.',
      fr: 'Favorisez la création numérique active plutôt que la consommation passive.',
    },
    qrSlug: 'els-issue01-parents-tech',
  },
];

export const ROTATING_BONUS_CATALOG: TrilingualText[] = [
  { ar: 'مهنة المستقبل', en: 'Career of the Future', fr: 'Le Métier du Futur' },
  { ar: 'صمّم بنفسك', en: 'DIY Tech Lab', fr: 'Atelier Tech DIY' },
  { ar: 'الحقيقة أم الخرافة؟', en: 'Fact or Myth?', fr: 'Vrai ou Faux ?' },
  { ar: 'المرأة في التكنولوجيا', en: 'Women in Tech', fr: 'Les Femmes dans la Tech' },
  { ar: 'أخلاقيات الذكاء الاصطناعي', en: 'AI Ethics', fr: 'Éthique de l’IA' },
  { ar: 'التقنية الخضراء', en: 'Green Technology', fr: 'Technologies Vertes' },
  { ar: 'من فكرة إلى مشروع (العدد 01)', en: 'From Idea to Project (Issue 01)', fr: 'De l’Idée au Projet (N° 01)' },
  { ar: 'أولياء الأمور والتكنولوجيا (العدد 01)', en: 'Parents & Technology (Issue 01)', fr: 'Parents et Technologie (N° 01)' },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'algorithm',
    category: 'coding',
    ar: 'خوارزمية',
    en: 'Algorithm',
    fr: 'Algorithme',
    definition: {
      ar: 'مجموعة خطوات منطقية مرتبة لحل مشكلة أو تنفيذ مهمة محددة.',
      en: 'A clear, ordered set of step-by-step instructions to solve a problem.',
      fr: 'Une suite ordonnée d’instructions précises permettant de résoudre un problème.',
    },
    example: {
      ar: 'خطوات ترتيب أسماء طلاب الفصل أبجديًا.',
      en: 'Step-by-step rules to sort student test scores from highest to lowest.',
      fr: 'Les étapes pour trier les notes d’une classe par ordre croissant.',
    },
  },
  {
    id: 'ai',
    category: 'ai',
    ar: 'الذكاء الاصطناعي',
    en: 'Artificial Intelligence',
    fr: 'Intelligence Artificielle',
    definition: {
      ar: 'أنظمة برمجية قادرة على التعلم من البيانات والتعرف إلى الأنماط ومساعدة الإنسان في اتخاذ القرار.',
      en: 'Software systems trained on data to recognize patterns, translate language, or assist decisions.',
      fr: 'Systèmes informatiques capables d’apprendre à partir de données et de reconnaître des motifs.',
    },
    example: {
      ar: 'تطبيق يترجم النصوص بين العربية والإنجليزية والفرنسية.',
      en: 'A model that classifies plant leaves or assists with language practice.',
      fr: 'Un outil qui identifie des plantes ou aide à réviser le vocabulaire.',
    },
  },
  {
    id: 'machine-learning',
    category: 'ai',
    ar: 'تعلّم الآلة',
    en: 'Machine Learning',
    fr: 'Apprentissage Automatique',
    definition: {
      ar: 'فرع من الذكاء الاصطناعي تتحسن فيه النماذج تلقائيًا عبر التدريب على أمثلة كثيرة.',
      en: 'A subfield of AI where computers improve accuracy by finding patterns in training examples.',
      fr: 'Branche de l’IA où les programmes améliorent leurs prédictions grâce aux exemples.',
    },
    example: {
      ar: 'تدريب البرنامج على 500 صورة ليميز بين الدائرة والمربع.',
      en: 'Training a classifier on 500 handwritten digits to recognize numbers.',
      fr: 'Entraîner un programme sur 500 chiffres manuscrits pour les reconnaître.',
    },
  },
  {
    id: 'variable',
    category: 'coding',
    ar: 'متغيّر',
    en: 'Variable',
    fr: 'Variable',
    definition: {
      ar: 'حاوية مسماة في الذاكرة تحفظ قيمة يمكن أن تتغير أثناء تشغيل البرنامج.',
      en: 'A named container in memory that stores a value which can change while code runs.',
      fr: 'Un espace nommé en mémoire qui conserve une valeur modifiable pendant l’exécution.',
    },
    example: {
      ar: 'متغير score = 10 في لعبة Scratch.',
      en: 'let score = 0; incremented whenever a player collects a coin.',
      fr: 'score = 0 qui augmente à chaque pièce collectée dans un jeu.',
    },
  },
  {
    id: 'loop',
    category: 'coding',
    ar: 'حلقة تكرار',
    en: 'Loop',
    fr: 'Boucle',
    definition: {
      ar: 'بنية برمجية تكرر تنفيذ أوامر محددة حتى يتحقق شرط معين.',
      en: 'A control structure that repeats a block of instructions automatically until a condition is met.',
      fr: 'Une structure qui répète automatiquement un bloc d’instructions selon une condition.',
    },
    example: {
      ar: 'تكرار فحص المسافة في الروبوت كل 100 مللي ثانية.',
      en: 'A for-loop printing numbers 1 to 10 without writing print ten times.',
      fr: 'Une boucle for affichant les nombres de 1 à 10 sans répétition manuelle.',
    },
  },
  {
    id: 'conditional',
    category: 'coding',
    ar: 'الشرط البرمجي',
    en: 'Conditional',
    fr: 'Condition',
    definition: {
      ar: 'تعليمة تتخذ مسارًا مختلفًا بناءً على تحقق عبارة منطقية (صواب أو خطأ).',
      en: 'An If / Else rule that chooses different actions depending on whether a test is true or false.',
      fr: 'Une instruction Si / Sinon qui choisit une action selon qu’un test est vrai ou faux.',
    },
    example: {
      ar: 'إذا كانت المسافة < 25 سم، انعطف يمينًا.',
      en: 'if (distance < 25) turnRight(); else moveForward();',
      fr: 'si distance < 25 alors tournerADroite() sinon avancer().',
    },
  },
  {
    id: 'debugging',
    category: 'coding',
    ar: 'تصحيح الأخطاء',
    en: 'Debugging',
    fr: 'Débogage',
    definition: {
      ar: 'عملية تتبع الكود لاكتشاف الأخطاء البرمجية أو المنطقية وإصلاحها.',
      en: 'The systematic process of finding, tracing, and fixing errors in source code.',
      fr: 'La démarche d’identification et de correction des erreurs dans un programme.',
    },
    example: {
      ar: 'استبدال = بـ == داخل جملة المقارنة في بايثون.',
      en: 'Spotting an off-by-one loop boundary causing an extra iteration.',
      fr: 'Repérer une erreur de comparaison qui fausse un calcul de note.',
    },
  },
  {
    id: 'sensor',
    category: 'robotics',
    ar: 'مستشعر (حساس)',
    en: 'Sensor',
    fr: 'Capteur',
    definition: {
      ar: 'قطعة إلكترونية تقيس البيئة المحيطة (كالمسافة أو الضوء أو الحرارة) وتحولها إلى إشارة رقمية.',
      en: 'A hardware component that measures distance, light, or temperature for a microcontroller.',
      fr: 'Un composant électronique qui mesure l’environnement et transmet des données.',
    },
    example: {
      ar: 'الحساس فوق الصوتي HC-SR04 لقياس المسافة أمام الروبوت.',
      en: 'An ultrasonic sensor measuring how far a rover is from a wall.',
      fr: 'Un capteur ultrasonique mesurant la distance d’un mur.',
    },
  },
  {
    id: 'microcontroller',
    category: 'robotics',
    ar: 'متحكم دقيق',
    en: 'Microcontroller',
    fr: 'Microcontrôleur',
    definition: {
      ar: 'شريحة حاسوبية صغيرة تقرأ مدخلات الحساسات وتشغّل المحركات والمصابيح وفق كود مبرمج.',
      en: 'A compact programmable chip that reads sensors and drives motors or LEDs.',
      fr: 'Une petite puce programmable qui lit les capteurs et pilote les moteurs.',
    },
    example: {
      ar: 'لوحة Arduino Uno أو Micro:bit في معمل المدرسة.',
      en: 'An Arduino Uno or BBC micro:bit powering a classroom weather station.',
      fr: 'Une carte Arduino Uno ou micro:bit pilotant une station météo scolaire.',
    },
  },
  {
    id: 'iot',
    category: 'robotics',
    ar: 'إنترنت الأشياء',
    en: 'Internet of Things (IoT)',
    fr: 'Internet des Objets (IdO)',
    definition: {
      ar: 'ربط الأجهزة اليومية والحساسات بالشبكة لتبادل البيانات والتحكم الذكي عن بُعد.',
      en: 'Everyday devices equipped with sensors and network links to share live data.',
      fr: 'Objets du quotidien équipés de capteurs et connectés pour échanger des données.',
    },
    example: {
      ar: 'مستشعر رطوبة التربة الذكي في حديقة المدرسة.',
      en: 'A smart classroom energy monitor reporting lighting usage.',
      fr: 'Un capteur d’humidité connecté pour l’arrosage automatique du jardin.',
    },
  },
  {
    id: 'cybersecurity',
    category: 'cybersecurity',
    ar: 'الأمن السيبراني',
    en: 'Cybersecurity',
    fr: 'Cybersécurité',
    definition: {
      ar: 'ممارسات وتقنيات لحماية الأجهزة والحسابات والبيانات من الاختراق أو السرقة.',
      en: 'Practices and tools that protect devices, accounts, and personal data from attack.',
      fr: 'Ensemble des pratiques protégeant les appareils, comptes et données personnelles.',
    },
    example: {
      ar: 'استخدام كلمات مرور قوية وتحديث المتصفح باستمرار.',
      en: 'Using unique passphrases and verifying website HTTPS certificates.',
      fr: 'Utiliser des mots de passe uniques et vérifier les certificats HTTPS.',
    },
  },
  {
    id: 'phishing',
    category: 'cybersecurity',
    ar: 'التصيّد الإلكتروني',
    en: 'Phishing',
    fr: 'Hameçonnage',
    definition: {
      ar: 'رسالة أو رابط مزيف يتظاهر بأنه من جهة موثوقة لخداع المستخدم وسرقة بياناته.',
      en: 'A fraudulent message pretending to be trusted to trick users into revealing passwords.',
      fr: 'Un message frauduleux imitant une source fiable pour voler des identifiants.',
    },
    example: {
      ar: 'بريد يطلب تحديث كلمة المرور عبر رابط غريب غير رسمي.',
      en: 'An urgent email from support@school-login-help.xyz asking for your PIN.',
      fr: 'Un courriel urgent demandant votre code sur un domaine inconnu.',
    },
  },
  {
    id: 'two-factor',
    category: 'cybersecurity',
    ar: 'التحقق بخطوتين',
    en: 'Two-Factor Authentication',
    fr: 'Double Authentification',
    definition: {
      ar: 'طبقة أمان إضافية تتطلب رمزًا مؤقتًا بجانب كلمة المرور لتسجيل الدخول.',
      en: 'A second verification step—such as a one-time code—required in addition to your password.',
      fr: 'Une étape supplémentaire exigeant un code temporaire en plus du mot de passe.',
    },
    example: {
      ar: 'رمز تحقق يصل إلى الهاتف عند فتح الحساب من جهاز جديد.',
      en: 'Entering a 6-digit authenticator code when signing in from a lab PC.',
      fr: 'Saisir un code temporaire à 6 chiffres lors d’une nouvelle connexion.',
    },
  },
  {
    id: 'cloud-computing',
    category: 'ai',
    ar: 'الحوسبة السحابية',
    en: 'Cloud Computing',
    fr: 'Informatique en Nuage',
    definition: {
      ar: 'تخزين الملفات وتشغيل التطبيقات عبر خوادم آمنة متصلة بالإنترنت بدلاً من الجهاز فقط.',
      en: 'Delivering storage, databases, and computing power over the internet from remote data centers.',
      fr: 'Stockage et exécution de services informatiques via des serveurs distants sur Internet.',
    },
    example: {
      ar: 'مشاركة عرض تقديمي للمشروع المدرسي وتحريره مع الفريق أونلاين.',
      en: 'Collaborating on a class presentation stored on shared cloud drives.',
      fr: 'Collaborer en ligne sur un exposé enregistré sur un espace partagé.',
    },
  },
  {
    id: 'neural-network',
    category: 'ai',
    ar: 'الشبكة العصبية',
    en: 'Neural Network',
    fr: 'Réseau de Neurones',
    definition: {
      ar: 'نموذج حاسوبي مستوحى من عمل الدماغ يربط عقدًا حسابية لاكتشاف الأنماط المعقدة.',
      en: 'A layered computing model inspired by neurons that learns complex visual and language patterns.',
      fr: 'Un modèle informatique en couches inspiré du cerveau pour traiter images et textes.',
    },
    example: {
      ar: 'تعرّف الكاميرا على خط اليد أو ترجمة الجمل بدقة.',
      en: 'Recognizing Arabic and Latin handwriting inside a scanning app.',
      fr: 'Reconnaître l’écriture manuscrite dans une application de numérisation.',
    },
  },
];

export const PHISHING_EMAILS: PhishingEmail[] = [
  {
    id: 'phish-1',
    senderName: 'ELS Portal Security',
    senderAddress: 'verify@els-portal-security-alert.xyz',
    subject: {
      ar: 'عاجل: سيتم إيقاف حسابك المدرسي خلال ساعتين!',
      en: 'URGENT: Your school account will be suspended in 2 hours!',
      fr: 'URGENT : Votre compte scolaire sera suspendu dans 2 heures !',
    },
    preview: {
      ar: 'اضغط هنا لتأكيد كلمة المرور فورًا لتجنب الحذف.',
      en: 'Click immediately to re-enter your password and avoid deletion.',
      fr: 'Cliquez vite pour confirmer votre mot de passe.',
    },
    body: {
      ar: 'عزيزي الطالب، تم رصد دخول غير معتاد. أدخل اسم المستخدم وكلمة المرور عبر الرابط http://els-verify-free.xyz/login خلال ساعتين وإلا سيتم إغلاق الحساب نهائيًا.',
      en: 'Dear Student, unusual activity was detected. Re-enter your full username and password at http://els-verify-free.xyz/login within 2 hours or your account will be permanently deleted.',
      fr: 'Cher élève, une activité inhabituelle a été détectée. Saisissez votre mot de passe sur http://els-verify-free.xyz/login sous 2 heures.',
    },
    isPhishing: true,
    clues: [
      {
        ar: 'نطاق المرسل ينتهي بـ .xyz وليس نطاق المدرسة الرسمي.',
        en: 'Suspicious sender domain (.xyz) impersonating the school.',
        fr: 'Domaine suspect (.xyz) usurpant le nom de l’école.',
      },
      {
        ar: 'تهديد زمني عاجل (خلال ساعتين) لدفعك إلى التسرع.',
        en: 'Artificial 2-hour countdown pressure to force a hasty click.',
        fr: 'Pression artificielle d’urgence (2 heures) pour éviter la réflexion.',
      },
      {
        ar: 'طلب مباشر لإدخال كلمة المرور عبر رابط خارجي غير مشفّر.',
        en: 'Requests your password directly on an unencrypted http:// link.',
        fr: 'Demande directe de mot de passe sur un lien http:// non chiffré.',
      },
    ],
  },
  {
    id: 'safe-1',
    senderName: 'ELS Computer Lab',
    senderAddress: 'robotics-club@els.edu.eg',
    subject: {
      ar: 'موعد ورشة الروبوتات الأسبوعية — الثلاثاء في الفسحة الكبرى',
      en: 'Weekly Robotics Workshop Schedule — Tuesday Break',
      fr: 'Programme de l’atelier Robotique — Mardi à la pause',
    },
    preview: {
      ar: 'نرحب بطلاب الصفوف الإعدادية في معمل الحاسب 2.',
      en: 'Join us in Computer Lab 2 to test ultrasonic rover sensors.',
      fr: 'Rendez-vous au laboratoire 2 pour tester les capteurs ultrasoniques.',
    },
    body: {
      ar: 'مرحبًا بأعضاء النادي، تُعقد جلسة تجارب الحساس فوق الصوتي يوم الثلاثاء الساعة 11:15 صباحًا في معمل الحاسب 2. لا يُطلب تسجيل أي كلمات مرور.',
      en: 'Hello club members! Our ultrasonic sensor test session takes place Tuesday at 11:15 AM in Computer Lab 2. Bring your project notebooks—no links or passwords required.',
      fr: 'Bonjour ! La séance pratique sur les capteurs aura lieu mardi à 11h15 au laboratoire 2. Aucun lien ni mot de passe demandé.',
    },
    isPhishing: false,
    clues: [
      {
        ar: 'نطاق البريد رسمي (.edu.eg) ومطابق لقسم المدرسة.',
        en: 'Verified school domain (@els.edu.eg).',
        fr: 'Adresse officielle de l’établissement (@els.edu.eg).',
      },
      {
        ar: 'لا تطلب الرسالة أي روابط خارجية أو كلمات مرور أو بيانات حساسة.',
        en: 'No external login links, threats, or credential requests.',
        fr: 'Aucun lien de connexion suspect ni demande d’identifiants.',
      },
    ],
  },
  {
    id: 'phish-2',
    senderName: 'Tech Prize Committee',
    senderAddress: 'rewards@free-tablet-contest.info',
    subject: {
      ar: 'مبروك! ربحت جهاز لوحي من مسابقة البرمجة',
      en: 'Congratulations! Claim your free coding tablet prize',
      fr: 'Félicitations ! Réclamez votre tablette gratuite',
    },
    preview: {
      ar: 'أدخل رقم هاتف ولي الأمر ورمز التحقق لاستلام الجائزة.',
      en: 'Enter parent phone number and SMS verification code to claim.',
      fr: 'Saisissez le numéro d’un parent et le code SMS reçu.',
    },
    body: {
      ar: 'تم اختيارك عشوائيًا للفوز بجهاز لوحي! لتأكيد الشحن أرسل رمز التحقق الذي سيصلك عبر SMS وأدخل بيانات البطاقة.',
      en: 'You were randomly selected to win a new tablet! To confirm shipping, reply with the 6-digit SMS code sent to your phone right now.',
      fr: 'Vous avez été tiré au sort ! Envoyez le code SMS à 6 chiffres pour confirmer la livraison gratuite.',
    },
    isPhishing: true,
    clues: [
      {
        ar: 'جائزة مفاجئة لم تشترك بها عبر عنوان غير رسمي (.info).',
        en: 'Unsolicited prize claim from an unverified .info address.',
        fr: 'Gain inattendu provenant d’un domaine non officiel (.info).',
      },
      {
        ar: 'طلب خطير لرموز التحقق (SMS OTP) التي تخص حساباتك الخاصة.',
        en: 'Asking for a 6-digit SMS verification code is a classic account-takeover trick.',
        fr: 'Demander un code SMS de vérification est une tentative de vol de compte.',
      },
    ],
  },
];

export const BUG_CHALLENGES: BugChallenge[] = [
  {
    id: 'bug-python-grade',
    language: 'Python',
    title: {
      ar: 'لغز التقييم البرمجي (Python)',
      en: 'Python Grading Condition Bug',
      fr: 'Erreur de condition en Python',
    },
    prompt: {
      ar: 'هذا البرنامج يفترض أن يطبع Passed فقط إذا كانت الدرجة 50 فأكثر، لكنه يعطي خطأ أو سلوكًا غير متوقع. انقر على السطر الخاطئ:',
      en: 'This script should print "Passed" only when score equals 100, yet it fails to run properly. Click the buggy line:',
      fr: 'Ce script doit afficher « Passed » uniquement quand le score vaut 100, mais il contient une erreur. Cliquez sur la ligne fautive :',
    },
    lines: [
      'student_name = "Mariam"',
      'score = 85',
      'if score = 100:',
      '    print("Perfect Score!")',
      'else:',
      '    print("Keep practicing!")',
    ],
    bugLineIndex: 2,
    hint: {
      ar: 'تذكّر الفرق بين علامة إسناد القيمة (=) وعلامة المقارنة (==) في بايثون.',
      en: 'Check how Python distinguishes assigning a value (=) from comparing two values (==).',
      fr: 'Vérifiez la différence entre l’affectation (=) et la comparaison (==) en Python.',
    },
    explanation: {
      ar: 'السطر 3 يستخدم = بدلاً من == للمقارنة داخل جملة if، مما يسبب خطأ SyntaxError.',
      en: 'Line 3 uses single = (assignment) instead of == (equality comparison) inside an if statement.',
      fr: 'La ligne 3 utilise = (affectation) au lieu de == (comparaison) dans le test conditionnel.',
    },
    fixedLine: 'if score == 100:',
  },
  {
    id: 'bug-js-loop',
    language: 'JavaScript',
    title: {
      ar: 'لغز عدّاد النقاط (JavaScript)',
      en: 'JavaScript Score Counter Loop',
      fr: 'Boucle de score en JavaScript',
    },
    prompt: {
      ar: 'يجب أن يجمع الكود نقاط 3 جولات في القائمة، لكنه يتجاوز العنصر الأخير أو يتعطل. حدد السطر الخاطئ:',
      en: 'This loop should add all 3 round scores, but it adds undefined on the last step. Click the buggy line:',
      fr: 'Cette boucle doit additionner les 3 manches, mais elle dépasse la fin du tableau. Cliquez sur la ligne fautive :',
    },
    lines: [
      'const rounds = [10, 20, 30];',
      'let total = 0;',
      'for (let i = 0; i <= rounds.length; i++) {',
      '  total += rounds[i];',
      '}',
      'console.log(total);',
    ],
    bugLineIndex: 2,
    hint: {
      ar: 'فهارس المصفوفة ذات 3 عناصر هي 0 و 1 و 2 فقط! هل يجب استخدام <= أم < ؟',
      en: 'A 3-item array only has indexes 0, 1, and 2. Should the loop condition use <= or < ?',
      fr: 'Un tableau de 3 éléments a pour indices 0, 1 et 2. Faut-il écrire <= ou < ?',
    },
    explanation: {
      ar: 'استخدام <= يجعل i يصل إلى 3 (خارج حدود المصفوفة)، والصواب i < rounds.length.',
      en: 'Using <= reaches index 3 (rounds[3] is undefined). Strict < stops cleanly at index 2.',
      fr: 'Écrire <= atteint l’indice 3 qui n’existe pas. Il faut utiliser < rounds.length.',
    },
    fixedLine: 'for (let i = 0; i < rounds.length; i++) {',
  },
];

export const INITIAL_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub-homework-app',
    studentName: 'Omar Khaled',
    grade: 'Prep 2',
    category: 'app',
    language: 'en',
    title: 'ELS Homework & Exam Organizer',
    summary:
      'Trilingual web checklist built with HTML, CSS, and LocalStorage so classmates never miss Arabic, English, or French assignments.',
    createdAt: '2026-11-12',
    isFeatured: true,
    votes: 34,
  },
  {
    id: 'sub-rover-bot',
    studentName: 'Youssef & Jana Team',
    grade: 'Prep 3',
    category: 'robotics',
    language: 'ar',
    title: 'روبوت تفادي العوائق الذكي (HC-SR04)',
    summary:
      'نموذج سيارة روبوتية مبرمجة بلغة Arduino C++ تتوقف وتنعطف تلقائيًا عند الاقتراب من أي جدار بأقل من 25 سم.',
    createdAt: '2026-11-14',
    votes: 28,
  },
  {
    id: 'sub-scratch-nile',
    studentName: 'Laila Sherif',
    grade: 'Primary 6',
    category: 'game',
    language: 'fr',
    title: 'Défi du Nil — Jeu Éducatif Scratch',
    summary:
      'Un jeu de plateforme interactif en Scratch où les joueurs répondent à des questions de sciences pour traverser le Nil.',
    createdAt: '2026-11-16',
    votes: 22,
  },
];

export const SUGGESTED_IDEAS: SuggestedIdea[] = [
  {
    id: 'idea-recess-hackathon',
    pillar: {
      ar: 'نشاط ميداني',
      en: 'School Activity',
      fr: 'Activité Scolaire',
    },
    title: {
      ar: 'تحدي الفسحة الأسبوعي (10-Minute Recess Bug Hunt)',
      en: 'Weekly 10-Minute Recess Bug Hunt & Leaderboard',
      fr: 'Défi hebdomadaire de 10 minutes à la récréation',
    },
    impact: {
      ar: 'يرفع مشاركة الطلاب 3 أضعاف عبر منافسة سريعة وممتعة.',
      en: 'Turns break time into collaborative logic play without needing extra lab hours.',
      fr: 'Transforme la pause en défi logique collaboratif sans surcharger l’emploi du temps.',
    },
    description: {
      ar: 'تُعلّق بطاقة لغز برمجي مع رمز QR في ممرات المدرسة كل ثلاثاء، ويمسح الطلاب الرمز لتقديم الحل في 10 دقائق ويفوز الأسرع بوسام في العدد التالي.',
      en: 'Post a weekly puzzle poster with a QR code on corridor boards every Tuesday. Students scan, debug a 6-line snippet, and top solvers earn credit in the next issue.',
      fr: 'Affichez chaque mardi une énigme avec QR code dans les couloirs ; les meilleurs découvreurs de bugs sont cités dans le numéro suivant.',
    },
    howToPilot: {
      ar: 'طباعة 3 ملصقات فقط في الدور الأول والثاني لأسبوع تجريبي واحد.',
      en: 'Print 3 corridor posters linking to the Think & Solve lab for a 2-week trial.',
      fr: 'Imprimer 3 affiches reliant vers l’atelier Chasse au Bug pendant deux semaines.',
    },
  },
  {
    id: 'idea-trilingual-audio',
    pillar: {
      ar: 'دعم اللغات',
      en: 'Trilingual Fluency',
      fr: 'Maîtrise Trilingue',
    },
    title: {
      ar: 'بطاقات النطق والترجمة الفورية لقاموس التقنية',
      en: 'Classroom Trilingual Flashcards & QR Wall Posters',
      fr: 'Affiches murales QR pour le lexique trilingue',
    },
    impact: {
      ar: 'يربط معمل الحاسب بحصص اللغة الإنجليزية والفرنسية والعربية.',
      en: 'Connects CS lessons directly with Arabic, English, and French language teachers.',
      fr: 'Relie directement les cours d’informatique aux cours de langues.',
    },
    description: {
      ar: 'تحويل مصطلحات «قاموس التقنية بثلاث لغات» إلى بطاقات جيب قابلة للطباعة وتحديات ترجمة سريعة بين الفرق الطلابية في الأنشطة اللاصفية.',
      en: 'Convert the 15 glossary trios into printable classroom flashcard decks and inter-class terminology relay games.',
      fr: 'Transformer les 15 trios du lexique en jeux de cartes imprimables pour des tournois entre classes.',
    },
    howToPilot: {
      ar: 'تنظيم مسابقة مصطلحات تقنية لمدة 15 دقيقة بين فصلين في المرحلة الإعدادية.',
      en: 'Host a 15-minute trilingual terminology relay between two Prep classes.',
      fr: 'Organiser un relais de vocabulaire de 15 minutes entre deux classes.',
    },
  },
  {
    id: 'idea-green-iot',
    pillar: {
      ar: 'التقنية الخضراء',
      en: 'Green Tech & STEM',
      fr: 'Tech Verte & STEM',
    },
    title: {
      ar: 'تحدي «مدرستنا الخضراء» بحساسات الترشيد',
      en: 'Green ELS Campus Audit: Energy & Water Sensor Challenge',
      fr: 'Audit Campus Vert : Défi capteurs énergie et eau',
    },
    impact: {
      ar: 'يربط البرمجة والروبوتات بمشروع بيئي ملموس داخل المدرسة.',
      en: 'Applies robotics and sensors to real campus sustainability goals.',
      fr: 'Applique la robotique et les capteurs à l’écologie concrète de l’école.',
    },
    description: {
      ar: 'تصميم فرق طلابية لنماذج أولية تقيس إضاءة الفصول غير المستخدمة أو رطوبة تربة حديقة المدرسة، وتوثيق النتائج في قسم «التقنية الخضراء».',
      en: 'Student teams prototype classroom light-reminders or garden soil-moisture sensors and publish measured water savings in Issue 02.',
      fr: 'Des équipes conçoivent des capteurs d’humidité pour le jardin scolaire et publient leurs résultats dans le Numéro 02.',
    },
    howToPilot: {
      ar: 'اختيار فريق واحد من نادي الروبوتات لتجربة حساس الرطوبة مع أستاذ العلوم.',
      en: 'Pair one Robotics Club team with Science teachers on a single planter box.',
      fr: 'Associer une équipe du club robotique aux professeurs de sciences.',
    },
  },
  {
    id: 'idea-parent-night',
    pillar: {
      ar: 'شراكة الأسرة',
      en: 'Parent Partnership',
      fr: 'Lien Famille-École',
    },
    title: {
      ar: 'نشرة «الأمان الرقمي في المنزل» بصفحة واحدة للأهالي',
      en: 'One-Page Family Digital Safety Digest with Every Issue',
      fr: 'Fiche mensuelle Sécurité Numérique pour les parents',
    },
    impact: {
      ar: 'يزيد ثقة أولياء الأمور في دور المدرسة في التوجيه الرقمي.',
      en: 'Builds strong parent-school alignment on healthy AI use and privacy.',
      fr: 'Renforce la confiance des familles sur l’usage encadré de l’IA.',
    },
    description: {
      ar: 'إرفاق ملخص قابل للطباعة أو المشاركة عبر جروبات الفصول يشرح للأهل أحدث أدوات التعلم الآمن وكيفية مناقشة الخصوصية مع الأبناء.',
      en: 'Include a printable 1-page parent summary in Arabic & English explaining safe AI study habits and password hygiene.',
      fr: 'Joindre une fiche claire d’une page expliquant les bons réflexes de confidentialité et d’usage de l’IA.',
    },
    howToPilot: {
      ar: 'إرسال ملخص العدد الأول مع دعوة معرض المشروعات التقنية.',
      en: 'Share the Issue 01 digest alongside invitations to the STEM Showcase.',
      fr: 'Diffuser la première fiche avec l’invitation à l’exposition technologique.',
    },
  },
];

export const LAUNCH_SCENES: LaunchScene[] = [
  {
    id: 'scene-1',
    sceneNumber: '01',
    duration: '1:00',
    title: {
      ar: 'المشهد الأول: افتتاحية بصرية ثلاثية اللغات',
      en: 'Scene 1: Visual Opening & Trilingual Welcome',
      fr: 'Scène 1 : Ouverture visuelle et accueil trilingue',
    },
    stageCue: {
      ar: 'تظهر على الشاشة صور متتابعة للحاسب الآلي والبرمجة والروبوتات والذكاء الاصطناعي مع موسيقى افتتاحية هادئة ذات طابع تقني.',
      en: 'Screen cycles through ELS computer lab, robotics, and AI visuals accompanied by calm ambient tech instrumentation.',
      fr: 'L’écran diffuse des images d’informatique, de robotique et d’IA sur une musique sobre et moderne.',
    },
    script: {
      ar: 'المقدّم: في عالم تتسارع فيه التكنولوجيا، لم يعد الحاسب الآلي مجرد جهاز نستخدمه، ولم تعد البرمجة مجرد مجموعة من الأوامر؛ بل أصبحت جميعها أدوات نصنع بها المعرفة ونبتكر بها الحلول. ومن هنا، تنطلق فكرتنا اليوم من المدرسة المصرية للغات لنقدم مشروعًا يجمع العلم والإبداع واللغات والتكنولوجيا في مساحة واحدة.',
      en: 'Presenter: In a world where technology is rapidly evolving, computers are no longer just tools, programming is more than writing code, and AI is no longer a distant dream. Today, Egyptian Language School introduces a new educational initiative bringing together technology, creativity, languages, and student talent.',
      fr: 'Présentateur : Aujourd’hui, l’informatique ne se limite plus à l’utilisation d’ordinateurs. Ce sont des outils pour apprendre, innover et construire l’avenir. L’École Égyptienne des Langues présente un projet éducatif réunissant technologie, créativité, langues et talents des élèves.',
    },
  },
  {
    id: 'scene-2',
    sceneNumber: '02',
    duration: '1:00',
    title: {
      ar: 'المشهد الثاني: الإعلان عن اسم المجلة',
      en: 'Scene 2: Official Title Reveal',
      fr: 'Scène 2 : Révélation du nom du magazine',
    },
    stageCue: {
      ar: 'يظهر شعار المجلة على الشاشة باللغات الثلاث: عقول رقمية — DIGITAL MINDS — ESPRITS NUMÉRIQUES.',
      en: 'Main screen reveals the trilingual masthead: DIGITAL MINDS / ESPRITS NUMÉRIQUES / عقول رقمية.',
      fr: 'L’écran principal révèle le titre trilingue : ESPRITS NUMÉRIQUES / DIGITAL MINDS / عقول رقمية.',
    },
    script: {
      ar: 'المقدّم: يسعدنا أن نعلن عن إطلاق مجلة المدرسة المصرية للغات للحاسب الآلي والبرمجة والذكاء الاصطناعي، لتكون نافذة على المعرفة الرقمية، ومنصة لإبداعات طلابنا، وجسرًا يربط بين التعليم والتكنولوجيا واللغات الثلاث.',
      en: 'Presenter: We are proud to introduce Digital Minds, the Egyptian Language School magazine dedicated to computer science, programming, and artificial intelligence—a window into digital knowledge and a platform for student creativity.',
      fr: 'Présentateur : Nous sommes fiers de présenter Esprits Numériques, le magazine de l’École Égyptienne des Langues consacré à l’informatique, à la programmation et à l’intelligence artificielle.',
    },
  },
  {
    id: 'scene-3',
    sceneNumber: '03',
    duration: '2:00',
    title: {
      ar: 'المشهد الثالث: استعراض أقسام المجلة على المسرح',
      en: 'Scene 3: Six Students Present Core Sections',
      fr: 'Scène 3 : Présentation des rubriques par six élèves',
    },
    stageCue: {
      ar: 'يعرض ستة طلاب بطاقات الأقسام مع نموذج لعبة برمجية، أو روبوت طلابي، أو تجربة ذكاء اصطناعي مباشرة.',
      en: 'Six student presenters hold section placards alongside a live Scratch demo and student-built obstacle rover.',
      fr: 'Six élèves présentent les rubriques clés avec une démonstration Scratch et un robot éviteur d’obstacles.',
    },
    script: {
      ar: 'الطالب 1: نافذة الذكاء الاصطناعي (AI Corner) · الطالب 2: مدرسة المبرمجين (Coding Academy) · الطالب 3: الروبوتات والابتكار (Robotics) · الطالب 4: الأمن السيبراني (Cybersecurity) · الطالب 5: إبداعات طلابنا (Student Showcase) · الطالب 6: قاموس التقنية بثلاث لغات (Tech in Three Languages).',
      en: 'Student 1: AI Corner · Student 2: Coding Academy · Student 3: Robotics & Innovation · Student 4: Cybersecurity · Student 5: Student Showcase · Student 6: Tech in Three Languages—each paired with a real classroom example.',
      fr: 'Élève 1 : Le Coin de l’IA · Élève 2 : L’Académie du Code · Élève 3 : Robotique · Élève 4 : Cybersécurité · Élève 5 : Les Créations des Élèves · Élève 6 : La Tech en Trois Langues.',
    },
  },
  {
    id: 'scene-4',
    sceneNumber: '04',
    duration: '1:00',
    title: {
      ar: 'المشهد الرابع: رسالة المجلة الثلاثية',
      en: 'Scene 4: The Digital Minds Manifesto',
      fr: 'Scène 4 : Le manifeste du magazine',
    },
    stageCue: {
      ar: 'تُلقى الرسالة بالتناوب بين العربية والإنجليزية والفرنسية أمام الحضور.',
      en: 'Three students deliver the closing manifesto line-by-line in Arabic, English, and French.',
      fr: 'Trois élèves prononcent le message final en arabe, en anglais puis en français.',
    },
    script: {
      ar: 'نحن لا نريد طلابًا يستهلكون التكنولوجيا فقط، بل نريد طلابًا يفهمونها، ويبدعون بها، ويستخدمونها بمسؤولية. نريد لكل فكرة أن تجد فرصة، ولكل موهبة أن تجد مساحة، ولكل طالب أن يكتشف قدرته على صناعة المستقبل.',
      en: 'We do not want students merely to consume technology. We want them to understand it, create with it, and use it responsibly. Every idea deserves an opportunity, and every student deserves the chance to shape the future.',
      fr: 'Nous ne voulons pas que les élèves se contentent d’utiliser la technologie. Nous voulons qu’ils la comprennent, qu’ils créent grâce à elle et qu’ils l’utilisent de manière responsable.',
    },
  },
  {
    id: 'scene-5',
    sceneNumber: '05',
    duration: '0:45',
    title: {
      ar: 'المشهد الخامس: الختام ودعوة المشاركة',
      en: 'Scene 5: Closing & Call for Student Submissions',
      fr: 'Scène 5 : Clôture et appel à contributions',
    },
    stageCue: {
      ar: 'يظهر رمز QR للعدد الأول على الشاشة لدعوة الطلاب لتسجيل مشاريعهم.',
      en: 'Screen displays the Issue 01 QR code inviting students to submit projects for Issue 02.',
      fr: 'L’écran affiche le QR code du Numéro 01 pour recueillir les projets du prochain numéro.',
    },
    script: {
      ar: 'نبرمج اليوم لنصنع المستقبل — شاركونا مشاريعكم وأفكاركم في العدد القادم من «عقول رقمية»!',
      en: 'Code Today, Shape Tomorrow — scan the portal QR code and submit your project for Issue 02!',
      fr: 'Programmer aujourd’hui, façonner demain — partagez vos créations pour le prochain numéro !',
    },
  },
];

export const FOUR_WEEK_ROADMAP: {
  week: TrilingualText;
  phase: TrilingualText;
  detail: TrilingualText;
}[] = [
  {
    week: { ar: 'الأسبوع 01', en: 'Week 01', fr: 'Semaine 01' },
    phase: { ar: 'التخطيط', en: 'Planning', fr: 'Planification' },
    detail: {
      ar: 'اعتماد الاسم والهوية والأقسام وتحديد فريق التحرير من المعلمين والطلاب.',
      en: 'Finalize masthead identity, core departments, and teacher-student editorial board.',
      fr: 'Valider l’identité, les rubriques et l’équipe éditoriale enseignants-élèves.',
    },
  },
  {
    week: { ar: 'الأسبوع 02', en: 'Week 02', fr: 'Semaine 02' },
    phase: { ar: 'جمع المحتوى', en: 'Content Gathering', fr: 'Collecte' },
    detail: {
      ar: 'استقبال مشاركات الطلاب وإعداد المقالات والدروس والتحديات البرمجية.',
      en: 'Collect student projects, write tutorials, and prepare coding/security labs.',
      fr: 'Recueillir les projets des élèves, rédiger les tutoriels et préparer les défis.',
    },
  },
  {
    week: { ar: 'الأسبوع 03', en: 'Week 03', fr: 'Semaine 03' },
    phase: { ar: 'التحرير والتصميم', en: 'Editing & Layout', fr: 'Édition & Maquette' },
    detail: {
      ar: 'المراجعة العلمية واللغوية وإخراج العدد باللغات الثلاث وربط رموز QR.',
      en: 'Scientific & trilingual proofreading, layout design, and QR code linking.',
      fr: 'Relecture scientifique et linguistique en 3 langues et intégration des QR codes.',
    },
  },
  {
    week: { ar: 'الأسبوع 04', en: 'Week 04', fr: 'Semaine 04' },
    phase: { ar: 'الاعتماد والإطلاق', en: 'Approval & Launch', fr: 'Validation & Lancement' },
    detail: {
      ar: 'مراجعة إدارة المدرسة، ثم نشر المجلة والتعريف بها في طابور الصباح والفصول.',
      en: 'School leadership sign-off, portal release, and 5-minute assembly showcase.',
      fr: 'Approbation de la direction, mise en ligne et présentation en assemblée.',
    },
  },
];

export const GOVERNANCE_ROWS: {
  element: TrilingualText;
  proposal: TrilingualText;
}[] = [
  {
    element: { ar: 'الجهة المشرفة', en: 'Supervising Body', fr: 'Supervision' },
    proposal: {
      ar: 'إدارة المدرسة وقسم الحاسب الآلي',
      en: 'School Administration & CS Department',
      fr: 'Direction de l’école et Département Informatique',
    },
  },
  {
    element: { ar: 'رئيس التحرير', en: 'Editor-in-Chief', fr: 'Rédacteur en chef' },
    proposal: {
      ar: 'معلم الحاسب الآلي أو من تكلفه الإدارة',
      en: 'Lead CS Educator assigned by Administration',
      fr: 'Enseignant d’informatique désigné par la direction',
    },
  },
  {
    element: { ar: 'فريق التحرير', en: 'Editorial Board', fr: 'Comité de rédaction' },
    proposal: {
      ar: 'معلمون وطلاب من المراحل المختلفة',
      en: 'Teachers & student editors across grade levels',
      fr: 'Enseignants et élèves des différents cycles',
    },
  },
  {
    element: { ar: 'اللغات', en: 'Languages', fr: 'Langues' },
    proposal: {
      ar: 'العربية والإنجليزية والفرنسية',
      en: 'Arabic, English & French',
      fr: 'Arabe, Anglais et Français',
    },
  },
  {
    element: { ar: 'دورية الإصدار', en: 'Cadence', fr: 'Périodicité' },
    proposal: {
      ar: 'عدد شهري أو كل شهرين',
      en: 'Monthly or Bi-monthly Issue',
      fr: 'Mensuel ou bimestriel',
    },
  },
  {
    element: { ar: 'منصة النشر', en: 'Publishing Channel', fr: 'Diffusion' },
    proposal: {
      ar: 'بوابة عقول رقمية التفاعلية + نسخة PDF',
      en: 'Digital Minds Web Portal + Printable PDF Edition',
      fr: 'Portail interactif Esprits Numériques + PDF imprimable',
    },
  },
];

export const SUCCESS_KPIS: TrilingualText[] = [
  {
    ar: 'عدد المشاركات الطلابية المنشورة خلال أول 3 أعداد',
    en: 'Total student projects & articles published across Issues 01–03',
    fr: 'Nombre de projets d’élèves publiés sur les 3 premiers numéros',
  },
  {
    ar: 'انتظام دورية الإصدار شهريًا أو كل شهرين',
    en: 'On-time publication cadence across the academic term',
    fr: 'Régularité de parution tout au long du trimestre',
  },
  {
    ar: 'نسبة تفاعل الطلاب في تحديات الفسحة ومسابقات التصحيح',
    en: 'Student participation rate in recess challenges & bug hunts',
    fr: 'Taux de participation aux défis de la récréation',
  },
  {
    ar: 'تقييم المعلمين وأولياء الأمور لجودة المحتوى وفائدته التعليمية',
    en: 'Teacher & parent feedback on educational impact and clarity',
    fr: 'Retours des enseignants et des parents sur la valeur pédagogique',
  },
];

export function buildOfficialProposalText(proposerName: string, dateStr: string): string {
  const safeName = proposerName.trim() || '.................................';
  const safeDate = dateStr.trim() || '.................................';
  return `مقترح إنشاء مجلة المدرسة المصرية للغات للحاسب الآلي والبرمجة والذكاء الاصطناعي

السيد الأستاذ/ مدير المدرسة المصرية للغات المحترم،
تحية طيبة وبعد،،

انطلاقًا من حرص المدرسة على مواكبة التطورات التكنولوجية، وتنمية مهارات الطلاب الرقمية، وتشجيع الابتكار والإبداع، نتقدم إلى سيادتكم بمقترح إنشاء مجلة تعليمية إلكترونية متخصصة في الحاسب الآلي والبرمجة والذكاء الاصطناعي، تصدر باللغات العربية والإنجليزية والفرنسية.

ونقترح أن تحمل المجلة اسم «عقول رقمية | Digital Minds | Esprits Numériques»، وأن تكون منصة تعليمية تفاعلية تسهم في نشر المعرفة التقنية، وإبراز مواهب الطلاب، وتنمية مهارات التفكير المنطقي وحل المشكلات، وتعزيز الاستخدام الآمن والمسؤول للتكنولوجيا.

وتتضمن المجلة مجموعة من الأقسام المتخصصة، من أبرزها: الذكاء الاصطناعي، والبرمجة، والروبوتات والابتكار، والأمن السيبراني، والتكنولوجيا في حياتنا، وإبداعات الطلاب، والمسابقات التقنية، وقاموس المصطلحات التقنية باللغات الثالث. كما يتضمن المقترح تشكيل فريق إشرافي وتحريري من المعلمين والطلاب، وإصدار مجلة إلكترونية دورية، مع إمكانية تطويرها مستقبلاً إلى منصة تعليمية تفاعلية تضم مشروعات الطلاب ودروسًا تطبيقية ومسابقات تقنية.

ونأمل من سيادتكم التكرم بدراسة المقترح والموافقة على البدء في إعداد العدد التجريبي، بما يعزز مكانة المدرسة في مجال التعليم الرقمي، ويدعم توجهها نحو الابتكار والتعلم المستمر.

وتفضلوا بقبول فائق الاحترام والتقدير،،

مقدم المقترح: ${safeName}
القسم: الحاسب الآلي وتكنولوجيا المعلومات
التاريخ: ${safeDate}`;
}

export const INITIAL_SCHOOL_NEWS: SchoolNewsDispatch[] = [
  {
    id: 'fb-childhood-day-all',
    title: 'احتفالات يوم الطفولة بالمدرسة المصرية بالدوحة بمشاركة جميع الأقسام',
    summary:
      'احتفلت المدرسة المصرية بالدوحة بيوم الطفولة ١٩ نوفمبر ٢٠٢٦ بحضور استشاري التعليم بوزارة التعليم القطرية السيدة/ سلوى العبد الله، برعاية أ/ فاروق شعبان زين الدين المدير العام ومشاركة جميع الأقسام.',
    localizedTitle: {
      ar: 'احتفالات يوم الطفولة بالمدرسة المصرية بالدوحة بمشاركة جميع الأقسام',
      en: 'Children’s Day Celebrations Across All ELS Doha Departments',
      fr: 'Célébration de la Journée de l’Enfance dans tous les cycles de l’ELS Doha',
    },
    localizedSummary: {
      ar: 'احتفلت المدرسة المصرية بالدوحة بيوم الطفولة ١٩ نوفمبر ٢٠٢٦ بحضور استشاري التعليم بوزارة التعليم القطرية السيدة/ سلوى العبد الله، برعاية أ/ فاروق شعبان زين الدين المدير العام ومشاركة جميع الأقسام.',
      en: 'Egyptian Language School in Doha celebrated Children’s Day on Nov 19, 2026 in the presence of Ministry of Education consultant Ms. Salwa Al-Abdullah, under the patronage of Director General Mr. Farouk Shaban Zein El-Din with all departments participating.',
      fr: 'L’École Égyptienne des Langues à Doha a célébré la Journée de l’Enfance le 19 novembre 2026 en présence de Mme Salwa Al-Abdullah (ministère de l’Éducation), sous le patronage du directeur général M. Farouk Shaban Zein El-Din.',
    },
    publishedDate: '2026-11-19',
    sourceUrl: 'https://www.facebook.com/reel/1151700923885627',
    imageUrl: '/assets/facebook-news/1151700923885627.jpg',
    isPinned: true,
  },
  {
    id: 'fb-childhood-day-leadership',
    title: 'مدير المدرسة والمعلمون يشاركون الأطفال فرحتهم باحتفالات يوم الطفولة',
    summary:
      'شارك مدير المدرسة ومعلمو المدرسة المصرية بالدوحة الأطفال فرحتهم باحتفالات يوم الطفولة ١٩ نوفمبر ٢٠٢٦، مع جزيل الشكر والتقدير لكل من رسم بسمة على وجوه بريئة وأسعد قلوبًا صغيرة.',
    localizedTitle: {
      ar: 'مدير المدرسة والمعلمون يشاركون الأطفال فرحتهم باحتفالات يوم الطفولة',
      en: 'School Leadership & Teachers Join Students for Children’s Day',
      fr: 'La direction et les enseignants célèbrent la Journée de l’Enfance',
    },
    localizedSummary: {
      ar: 'شارك مدير المدرسة ومعلمو المدرسة المصرية بالدوحة الأطفال فرحتهم باحتفالات يوم الطفولة ١٩ نوفمبر ٢٠٢٦، مع جزيل الشكر والتقدير لكل من رسم بسمة على وجوه بريئة وأسعد قلوبًا صغيرة.',
      en: 'School leadership and teachers joined students in celebrating Children’s Day on Nov 19, 2026, expressing warm appreciation to everyone who brought joy and smiles across the campus.',
      fr: 'La direction et les enseignants ont partagé la joie des élèves le 19 novembre 2026, avec de chaleureux remerciements à toute l’équipe éducative.',
    },
    publishedDate: '2026-11-19',
    sourceUrl: 'https://www.facebook.com/reel/1151263387499421',
    imageUrl: '/assets/facebook-news/1151263387499421.jpg',
    isPinned: true,
  },
  {
    id: 'fb-kg-childhood-day',
    title: 'احتفال روضة المدرسة المصرية للغات بالدوحة بيوم الطفولة',
    summary:
      'لقطات من احتفال روضة المدرسة المصرية للغات بالدوحة بيوم الطفولة يوم الخميس ١٩ نوفمبر ٢٠٢٦، مع توجيه جزيل الشكر للمعلمات الفضليات على جهودهن لإسعاد الأطفال.',
    localizedTitle: {
      ar: 'احتفال روضة المدرسة المصرية للغات بالدوحة بيوم الطفولة',
      en: 'Kindergarten Division Celebrates Children’s Day',
      fr: 'La section Maternelle fête la Journée de l’Enfance',
    },
    localizedSummary: {
      ar: 'لقطات من احتفال روضة المدرسة المصرية للغات بالدوحة بيوم الطفولة يوم الخميس ١٩ نوفمبر ٢٠٢٦، مع توجيه جزيل الشكر للمعلمات الفضليات على جهودهن لإسعاد الأطفال.',
      en: 'Highlights from the ELS Doha Kindergarten Children’s Day celebration on Thursday, Nov 19, 2026, with special gratitude to the KG teachers for organizing the activities.',
      fr: 'Temps forts de la fête de la Journée de l’Enfance en maternelle le jeudi 19 novembre 2026, avec un grand merci aux enseignantes.',
    },
    publishedDate: '2026-11-19',
    sourceUrl: 'https://www.facebook.com/reel/1871668654180507',
    imageUrl: '/assets/facebook-news/1871668654180507.jpg',
    isPinned: true,
  },
  {
    id: 'fb-tolerance-award',
    title: 'المدرسة المصرية بالدوحة تفوز بجائزة أفضل مشاركة في يوم التسامح الدولي',
    summary:
      'فازت المدرسة بجائزة أفضل مشاركة في يوم التسامح الدولي ضمن فعاليات مبادرة «أخلاقنا» يوم السبت ١٤ نوفمبر ٢٠٢٦ بأكاديمية قطر الوكرة، مع الشكر لفريق الإعداد والتدريب: أ/ كريمة وأ/ مصطفى بمعاونة أ/ سيد وأ/ محمد صابر وأ/ البشبيشي وأ/ داليا.',
    localizedTitle: {
      ar: 'المدرسة المصرية بالدوحة تفوز بجائزة أفضل مشاركة في يوم التسامح الدولي',
      en: 'ELS Doha Wins Best Participation Award at International Tolerance Day',
      fr: 'L’ELS Doha remporte le Prix de la Meilleure Participation (Tolérance)',
    },
    localizedSummary: {
      ar: 'فازت المدرسة بجائزة أفضل مشاركة في يوم التسامح الدولي ضمن فعاليات مبادرة «أخلاقنا» يوم السبت ١٤ نوفمبر ٢٠٢٦ بأكاديمية قطر الوكرة، مع الشكر لفريق الإعداد والتدريب: أ/ كريمة وأ/ مصطفى بمعاونة أ/ سيد وأ/ محمد صابر وأ/ البشبيشي وأ/ داليا.',
      en: 'ELS Doha won the Best Participation Award for International Day for Tolerance during the “Akhlaquna” initiative on Nov 14, 2026 at Qatar Academy Al Wakrah—thanks to coaches Ms. Karima, Mr. Mostafa, Mr. Sayed, Mr. Mohamed Saber, Mr. El-Beshbeshy, and Ms. Dalia.',
      fr: 'L’école a remporté le prix de la meilleure participation à la Journée internationale de la tolérance (« Akhlaquna ») le 14 novembre 2026 à Qatar Academy Al Wakrah.',
    },
    publishedDate: '2026-11-14',
    sourceUrl: 'https://www.facebook.com/reel/1482845020389575',
    imageUrl: '/assets/facebook-news/1482845020389575.jpg',
    isPinned: true,
  },
  {
    id: 'fb-scout-camp',
    title: 'المعسكر الكشفي للمدرسة المصرية للغات بالدوحة مع الكشافة والهلال الأحمر القطري',
    summary:
      'أقيم المعسكر الكشفي للمدرسة المصرية للغات بالدوحة يوم السبت ٧ نوفمبر ٢٠٢٦ بالتعاون مع جمعية الكشافة والهلال الأحمر القطري لتعزيز روح العمل الجماعي والمهارات الميدانية.',
    localizedTitle: {
      ar: 'المعسكر الكشفي للمدرسة المصرية للغات بالدوحة مع الكشافة والهلال الأحمر القطري',
      en: 'ELS Doha Student Scout Camp with Qatar Scouts & Red Crescent',
      fr: 'Camp Scout de l’ELS Doha avec les Scouts et le Croissant-Rouge du Qatar',
    },
    localizedSummary: {
      ar: 'أقيم المعسكر الكشفي للمدرسة المصرية للغات بالدوحة يوم السبت ٧ نوفمبر ٢٠٢٦ بالتعاون مع جمعية الكشافة والهلال الأحمر القطري لتعزيز روح العمل الجماعي والمهارات الميدانية.',
      en: 'Egyptian Language School in Doha hosted its student Scout Camp on Saturday, Nov 7, 2026 in collaboration with the Qatar Scouts Association and Qatar Red Crescent.',
      fr: 'L’école a organisé son camp scout étudiant le samedi 7 novembre 2026 en partenariat avec l’Association des Scouts et le Croissant-Rouge du Qatar.',
    },
    publishedDate: '2026-11-07',
    sourceUrl: 'https://www.facebook.com/reel/1866433564524152',
    imageUrl: '/assets/facebook-news/1866433564524152.jpg',
    isPinned: true,
  },
  {
    id: 'fb-october-celebration',
    title: 'احتفالات أكتوبر ٢٠٢٦ بالمدرسة المصرية لغات بالدوحة',
    summary:
      'تغطية احتفالات أكتوبر ٢٠٢٦ بالمدرسة المصرية لغات بالدوحة يوم الخميس ٨ أكتوبر ٢٠٢٦ بمشاركة الطلاب وهيئة التدريس في فقرات وطنية وثقافية متنوعة.',
    localizedTitle: {
      ar: 'احتفالات أكتوبر ٢٠٢٦ بالمدرسة المصرية لغات بالدوحة',
      en: 'October 2026 Celebrations at Egyptian Language School in Doha',
      fr: 'Célébrations d’Octobre 2026 à l’École Égyptienne des Langues à Doha',
    },
    localizedSummary: {
      ar: 'تغطية احتفالات أكتوبر ٢٠٢٦ بالمدرسة المصرية لغات بالدوحة يوم الخميس ٨ أكتوبر ٢٠٢٦ بمشاركة الطلاب وهيئة التدريس في فقرات وطنية وثقافية متنوعة.',
      en: 'Students and faculty celebrated the October 2026 festivities at Egyptian Language School in Doha on Thursday, Oct 8, 2026 with cultural and student presentations.',
      fr: 'Élèves et enseignants ont célébré les festivités d’octobre 2026 le jeudi 8 octobre 2026 à l’École Égyptienne des Langues à Doha.',
    },
    publishedDate: '2026-10-08',
    sourceUrl: 'https://www.facebook.com/reel/2178765526854807',
    imageUrl: '/assets/facebook-news/2178765526854807.jpg',
    isPinned: true,
  },
];

