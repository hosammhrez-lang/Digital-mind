import { Lang } from '../types/magazine';

export interface UiCopy {
  brandTitle: string;
  schoolName: string;
  slogan: string;
  nav: {
    issue: string;
    assistant: string;
    labs: string;
    glossary: string;
    showcase: string;
    launch: string;
    admin: string;
  };
  ctaSubmit: string;
  issueHeader: {
    volumeLine: string;
    issueTitle: string;
    editionStandard: string;
    editionJunior: string;
    editionLabel: string;
    readLead: string;
    readArticle: string;
    minRead: string;
    departmentsTitle: string;
    departmentsSubtitle: string;
    bonusBadge: string;
    goalsTitle: string;
    viewSpread: string;
    viewGrid: string;
    tocTitle: string;
    prevPage: string;
    nextPage: string;
    pageWord: string;
    bookmarkAdd: string;
    bookmarkSaved: string;
    readProgress: string;
    listenArticle: string;
    stopListening: string;
    summarizeWithAi: string;
  };
  reader: {
    close: string;
    keyTakeaway: string;
    juniorNote: string;
    qrTitle: string;
    qrSubtitle: string;
    authorLabel: string;
    prevArticle: string;
    nextArticle: string;
    fontSizeLabel: string;
    listenLabel: string;
    stopListenLabel: string;
    summarizeWithNuha: string;
    bookmarkLabel: string;
    bookmarkedLabel: string;
  };
  assistant: {
    heading: string;
    subheading: string;
    badgeName: string;
    modeSummarize: string;
    modeStudyGuide: string;
    modeExplain: string;
    modeQuiz: string;
    modeChat: string;
    articlePickerLabel: string;
    articlePickerPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    gradeLabel: string;
    gradePlaceholder: string;
    promptLabel: string;
    promptPlaceholders: {
      summarize: string;
      studyGuide: string;
      explain: string;
      quiz: string;
      chat: string;
    };
    sourceLabel: string;
    sourcePlaceholder: string;
    submitBtn: string;
    sendingBtn: string;
    clearChat: string;
    copyResult: string;
    copiedResult: string;
    saveSummary: string;
    savedToast: string;
    printSummary: string;
    savedSectionTitle: string;
    savedEmpty: string;
    deleteSaved: string;
    loadSaved: string;
    errEmpty: string;
    errShort: string;
    quickStarterTitle: string;
    quickStarters: string[];
    responseTitle: string;
    emptyResponseTitle: string;
    emptyResponseBody: string;
  };
  labs: {
    heading: string;
    subheading: string;
    phishingTab: string;
    bugTab: string;
    roboticsTab: string;
    phishingIntro: string;
    markPhishing: string;
    markSafe: string;
    nextEmail: string;
    scoreLabel: string;
    correctTag: string;
    incorrectTag: string;
    bugIntro: string;
    showHint: string;
    hideHint: string;
    fixedLineLabel: string;
    roboticsIntro: string;
    distanceLabel: string;
    thresholdLabel: string;
    leftMotor: string;
    rightMotor: string;
    statusForward: string;
    statusCaution: string;
    statusTurnRight: string;
  };
  glossary: {
    heading: string;
    subheading: string;
    searchPlaceholder: string;
    allCat: string;
    aiCat: string;
    codingCat: string;
    roboticsCat: string;
    cyberCat: string;
    emptyState: string;
    examplePrefix: string;
    countSuffix: string;
  };
  showcase: {
    heading: string;
    subheading: string;
    coderOfMonthLabel: string;
    coderName: string;
    coderGrade: string;
    coderAchievement: string;
    filterAll: string;
    filterApp: string;
    filterRobotics: string;
    filterGame: string;
    filterIdea: string;
    upvote: string;
    formTitle: string;
    formSubtitle: string;
    fieldName: string;
    fieldGrade: string;
    fieldCategory: string;
    fieldLanguage: string;
    fieldTitle: string;
    fieldSummary: string;
    submitBtn: string;
    successMsg: string;
    errName: string;
    errGrade: string;
    errTitle: string;
    errSummary: string;
    suggestionsHeading: string;
    suggestionsSubheading: string;
    pilotLabel: string;
  };
  launch: {
    heading: string;
    subheading: string;
    scriptTitle: string;
    scriptSubtitle: string;
    prevScene: string;
    nextScene: string;
    roadmapTitle: string;
    governanceTitle: string;
    kpisTitle: string;
    proposalTitle: string;
    proposalSubtitle: string;
    proposerNameLabel: string;
    proposalDateLabel: string;
    copyProposal: string;
    copiedProposal: string;
    printProposal: string;
  };
  footer: {
    copyright: string;
    editorialNote: string;
  };
}

export const UI_COPY: Record<Lang, UiCopy> = {
  ar: {
    brandTitle: 'عقول رقمية',
    schoolName: 'المدرسة المصرية للغات — مجلة التكنولوجيا والابتكار',
    slogan: 'نبرمج اليوم لنصنع المستقبل',
    nav: {
      issue: 'العدد الأول',
      assistant: 'المساعد نُهى',
      labs: 'المختبرات',
      glossary: 'القاموس',
      showcase: 'الإبداعات',
      launch: 'خطة الإطلاق',
      admin: 'لوحة التحكم',
    },
    ctaSubmit: 'شارك بمشروعك',
    issueHeader: {
      volumeLine: 'الإصدار 01 · مجلة إلكترونية تفاعلية ثلاثية اللغات · 2026',
      issueTitle: 'العدد الأول: بوابتنا إلى المستقبل الرقمي',
      editionStandard: 'النسخة الكاملة',
      editionJunior: 'نسخة الصغار المبسطة',
      editionLabel: 'مستوى القراءة',
      readLead: 'افتح قارئ المجلة التفاعلي',
      readArticle: 'قراءة المقال',
      minRead: 'دقائق قراءة',
      departmentsTitle: 'أقسام المجلة الثابتة والمتجددة',
      departmentsSubtitle: 'عشرة أقسام ثابتة في كل عدد مع قسمين إضافيين بالتناوب لإثراء المعرفة التقنية.',
      bonusBadge: 'قسم إضافي للعدد',
      goalsTitle: 'أهداف عقول رقمية السبعة',
      viewSpread: 'عرض المجلة التفاعلي',
      viewGrid: 'عرض كل الأقسام',
      tocTitle: 'فهرس العدد التفاعلي',
      prevPage: 'الصفحة السابقة',
      nextPage: 'الصفحة التالية',
      pageWord: 'صفحة',
      bookmarkAdd: 'حفظ في المفضلة',
      bookmarkSaved: 'محفوظ',
      readProgress: 'مقروء',
      listenArticle: 'استماع صوتي',
      stopListening: 'إيقاف الصوت',
      summarizeWithAi: 'لخّص مع نُهى',
    },
    reader: {
      close: 'إغلاق',
      keyTakeaway: 'الخلاصة العملية',
      juniorNote: 'ملخص مبسط لطلاب المرحلة الابتدائية',
      qrTitle: 'رمز الوصول السريع للمشروع',
      qrSubtitle: 'امسح الرمز لفتح التطبيق العملي أو ملف الشرح داخل الفصل',
      authorLabel: 'بقلم',
      prevArticle: 'المقال السابق',
      nextArticle: 'المقال التالي',
      fontSizeLabel: 'حجم الخط',
      listenLabel: 'قراءة صوتية',
      stopListenLabel: 'إيقاف القراءة',
      summarizeWithNuha: 'لخّص هذا المقال مع المساعد نُهى',
      bookmarkLabel: 'حفظ المقال',
      bookmarkedLabel: 'في مفضلتي',
    },
    assistant: {
      heading: 'نُهى — مساعدك الدراسي الذكي بالذكاء الاصطناعي',
      subheading:
        'مساعد شخصي لطلاب المدرسة المصرية للغات لتلخيص الدروس ومقالات المجلة، وإنشاء ملخصات مراجعة منظمة، وشرح المفاهيم الصعبة خطوة بخطوة.',
      badgeName: 'نُهى · رفيق المذاكرة الذكي',
      modeSummarize: 'تلخيص نص',
      modeStudyGuide: 'إنشاء ملخص دراسي',
      modeExplain: 'شرح مبسط',
      modeQuiz: 'أسئلة مراجعة',
      modeChat: 'محادثة دراسية',
      articlePickerLabel: 'أو استورد مقالاً من العدد الأول مباشرة',
      articlePickerPlaceholder: '— اختر مقالاً من المجلة لتحميل نصه —',
      subjectLabel: 'المادة الدراسية',
      subjectPlaceholder: 'مثال: الحاسب الآلي، العلوم، الرياضيات...',
      gradeLabel: 'المرحلة / الصف',
      gradePlaceholder: 'مثال: الثاني الإعدادي',
      promptLabel: 'موضوع الدرس أو سؤالك للمساعد نُهى',
      promptPlaceholders: {
        summarize: 'اكتب نقطة التركيز المطلوبة (مثال: ركّز على أهم 5 نقاط للحفظ)...',
        studyGuide: 'اكتب عنوان الدرس أو أفكاره الرئيسية لإنشاء ورقة مراجعة شاملة...',
        explain: 'ما المفهوم أو المسألة التي تريد أن تشرحها لك نُهى ببساطة؟',
        quiz: 'اكتب اسم الدرس لإنشاء 4 أسئلة تدريبية مع نموذج الإجابة...',
        chat: 'اسأل نُهى أي سؤال دراسي أو اطلب خطة مذاكرة ليومك...',
      },
      sourceLabel: 'نص الدرس أو الفقرة المراد تلخيصها (اختياري في الشرح والمحادثة)',
      sourcePlaceholder: 'الصق هنا فقرة من كتابك المدرسي أو من مقال المجلة...',
      submitBtn: 'اطلب من نُهى',
      sendingBtn: 'نُهى تُجهّز الإجابة...',
      clearChat: 'محادثة جديدة',
      copyResult: 'نسخ النتيجة',
      copiedResult: 'تم النسخ',
      saveSummary: 'حفظ في دفتر الملخصات',
      savedToast: 'تم حفظ الملخص في دفترك الشخصي.',
      printSummary: 'طباعة الملخص',
      savedSectionTitle: 'دفتر الملخصات المحفوظة',
      savedEmpty: 'لم تحفظ أي ملخصات بعد. جرّب إنشاء ملخص دراسي واضغط «حفظ في دفتر الملخصات».',
      deleteSaved: 'حذف الملخص',
      loadSaved: 'عرض الملخص',
      errEmpty: 'يرجى كتابة موضوع أو سؤال أو لصق نص أولاً.',
      errShort: 'يرجى كتابة 3 أحرف على الأقل لتتمكن نُهى من مساعدتك.',
      quickStarterTitle: 'أمثلة سريعة للتجربة',
      quickStarters: [
        'لخّص مقال الذكاء الاصطناعي من العدد الأول في 5 نقاط سهلة',
        'أنشئ ملخصًا دراسيًا عن الفرق بين المتغيرات والحلقات التكرارية في بايثون',
        'اشرح لي كيف يعمل الحساس فوق الصوتي HC-SR04 كأنني في الصف الخامس',
        'اصنع 4 أسئلة مراجعة عن الوقاية من التصيّد الإلكتروني',
      ],
      responseTitle: 'إجابة نُهى والملخص المقترح',
      emptyResponseTitle: 'مرحبًا بك! أنا نُهى، رفيقتك في المذاكرة',
      emptyResponseBody:
        'اختر نوع المساعدة من الأعلى — تلخيص نص، أو إنشاء ملخص دراسي للطباعة، أو شرح مفهوم صعب — أو استورد مقالاً من مجلة «عقول رقمية» للبدء فورًا.',
    },
    labs: {
      heading: 'المختبرات التفاعلية — فكّر وجرّب',
      subheading: 'تطبيقات عملية للأمن السيبراني، واكتشاف الأخطاء البرمجية، ومحاكاة حساسات الروبوت.',
      phishingTab: 'كشف التصيّد',
      bugTab: 'اكتشف الخطأ',
      roboticsTab: 'روبوت العوائق',
      phishingIntro: 'افحص رسائل البريد الواردة وحدد ما إذا كانت رسالة آمنة أم محاولة تصيد إلكتروني.',
      markPhishing: 'تصيّد إلكتروني',
      markSafe: 'رسالة موثوقة',
      nextEmail: 'الرسالة التالية',
      scoreLabel: 'النقاط',
      correctTag: 'تقييم صحيح',
      incorrectTag: 'راجع المؤشرات',
      bugIntro: 'انقر على السطر البرمجي الذي يحتوي على الخطأ المنطقي أو الإملائي لإصلاح البرنامج.',
      showHint: 'عرض التلميح',
      hideHint: 'إخفاء التلميح',
      fixedLineLabel: 'التصحيح المقترح',
      roboticsIntro: 'حرّك شريط المسافة لاختبار استجابة الحساس فوق الصوتي وتوجيه المحركين تلقائيًا.',
      distanceLabel: 'المسافة المقاسة (سم)',
      thresholdLabel: 'عتبة الأمان: 25 سم',
      leftMotor: 'المحرك الأيسر',
      rightMotor: 'المحرك الأيمن',
      statusForward: 'المسار آمن · تقدم للأمام',
      statusCaution: 'عائق قريب · تخفيف السرعة',
      statusTurnRight: 'عائق مكتشف · انعطف يمينًا',
    },
    glossary: {
      heading: 'قاموس التقنية بثلاث لغات',
      subheading: '15 مصطلحًا أساسيًا في الحاسب الآلي والبرمجة والذكاء الاصطناعي بالعربية والإنجليزية والفرنسية.',
      searchPlaceholder: 'ابحث بالعربية أو الإنجليزية أو الفرنسية...',
      allCat: 'الكل',
      aiCat: 'الذكاء الاصطناعي',
      codingCat: 'البرمجة',
      roboticsCat: 'الروبوتات',
      cyberCat: 'الأمن السيبراني',
      emptyState: 'لم يتم العثور على مصطلح مطابق لبحثك.',
      examplePrefix: 'مثال:',
      countSuffix: 'مصطلحًا',
    },
    showcase: {
      heading: 'إبداعات طلابنا ومقترحات التطوير',
      subheading: 'منصة لعرض مشروعات طلاب المدرسة المصرية للغات واقتراح أفكار جديدة ترفع قيمة المجلة.',
      coderOfMonthLabel: 'مبرمج الشهر',
      coderName: 'عمر خالد — الصف الثاني الإعدادي',
      coderGrade: 'تطبيق تنظيم الواجبات المدرسية (ELS Planner)',
      coderAchievement: 'صمّم تطبيق ويب خفيف لمساعدة زملائه على متابعة مواعيد التسليم باللغات الثلاث.',
      filterAll: 'الكل',
      filterApp: 'تطبيقات',
      filterRobotics: 'روبوتات',
      filterGame: 'ألعاب',
      filterIdea: 'أفكار مقترحة',
      upvote: 'تأييد',
      formTitle: 'أضف مشروعك أو اقترح فكرة للمجلة',
      formSubtitle: 'تُضاف المشاركات المعتمدة فورًا إلى معرض الطلاب لتشجيع الموهوبين.',
      fieldName: 'اسم الطالب / المعلم',
      fieldGrade: 'الصف الدراسي أو القسم',
      fieldCategory: 'التصنيف',
      fieldLanguage: 'لغة المشاركة',
      fieldTitle: 'عنوان المشروع أو الفكرة',
      fieldSummary: 'وصف مختصر للفكرة والتقنية المستخدمة',
      submitBtn: 'نشر المشاركة',
      successMsg: 'تمت إضافة مشاركتك إلى المعرض بنجاح.',
      errName: 'يرجى كتابة الاسم (حرفان على الأقل).',
      errGrade: 'يرجى تحديد الصف الدراسي.',
      errTitle: 'يرجى كتابة عنوان واضح (4 أحرف على الأقل).',
      errSummary: 'يرجى كتابة وصف مختصر (12 حرفًا على الأقل).',
      suggestionsHeading: 'أفكار مقترحة لرفع قيمة «عقول رقمية»',
      suggestionsSubheading: 'حزمة مبادرات عملية قابلة للتنفيذ الفوري داخل المدرسة مع كل عدد جديد.',
      pilotLabel: 'خطوة التجربة الأولى',
    },
    launch: {
      heading: 'مركز الإطلاق والاعتماد المدرسي',
      subheading: 'سيناريو حفل الإطلاق الثلاثي، خطة التنفيذ خلال 4 أسابيع، والصيغة الرسمية لمدير المدرسة.',
      scriptTitle: 'سيناريو حفل إطلاق المجلة (5–7 دقائق)',
      scriptSubtitle: 'استعرض مشاهد التقديم باللغات الثلاث كما تُلقى على مسرح المدرسة.',
      prevScene: 'المشهد السابق',
      nextScene: 'المشهد التالي',
      roadmapTitle: 'مراحل التنفيذ (4 أسابيع)',
      governanceTitle: 'هيكل التشغيل ومؤشرات النجاح',
      kpisTitle: 'مؤشرات القياس بعد أول 3 أعداد',
      proposalTitle: 'الصيغة الرسمية لتقديم المقترح لإدارة المدرسة',
      proposalSubtitle: 'عدّل الاسم والتاريخ ثم انسخ أو اطبع الخطاب الرسمي الجاهز للتوقيع.',
      proposerNameLabel: 'اسم مقدم المقترح',
      proposalDateLabel: 'التاريخ',
      copyProposal: 'نسخ النص الرسمي',
      copiedProposal: 'تم النسخ',
      printProposal: 'طباعة الخطاب',
    },
    footer: {
      copyright: 'عقول رقمية — المدرسة المصرية للغات · قسم الحاسب الآلي وتكنولوجيا المعلومات',
      editorialNote: 'مشروع تعليمي ثلاثي اللغات (العربية · الإنجليزية · الفرنسية)',
    },
  },
  en: {
    brandTitle: 'Digital Minds',
    schoolName: 'Egyptian Language School — Technology & Innovation Magazine',
    slogan: 'Code Today, Shape Tomorrow.',
    nav: {
      issue: 'Issue 01',
      assistant: 'AI Tutor Nuha',
      labs: 'Labs',
      glossary: 'Glossary',
      showcase: 'Showcase',
      launch: 'Launch Hub',
      admin: 'Control Panel',
    },
    ctaSubmit: 'Submit Project',
    issueHeader: {
      volumeLine: 'ISSUE 01 · INTERACTIVE DIGITAL E-MAGAZINE · 2026',
      issueTitle: 'Issue 01: Our Gateway to the Digital Future',
      editionStandard: 'Standard Edition',
      editionJunior: 'Junior Explorer',
      editionLabel: 'Reading Mode',
      readLead: 'Open Interactive Reader',
      readArticle: 'Read Feature',
      minRead: 'min read',
      departmentsTitle: 'Core & Rotating Magazine Departments',
      departmentsSubtitle: 'Ten permanent sections every issue, paired with two rotating spotlight columns.',
      bonusBadge: 'Issue 01 Bonus Column',
      goalsTitle: 'Seven Guiding Goals',
      viewSpread: 'E-Magazine Flipbook',
      viewGrid: 'Full Issue Grid',
      tocTitle: 'Interactive Issue Index',
      prevPage: 'Previous Page',
      nextPage: 'Next Page',
      pageWord: 'Page',
      bookmarkAdd: 'Save Bookmark',
      bookmarkSaved: 'Bookmarked',
      readProgress: 'read',
      listenArticle: 'Listen',
      stopListening: 'Stop Audio',
      summarizeWithAi: 'Summarize with Nuha',
    },
    reader: {
      close: 'Close',
      keyTakeaway: 'Practical Takeaway',
      juniorNote: 'Simplified summary tailored for younger readers',
      qrTitle: 'Quick-Scan Lesson QR',
      qrSubtitle: 'Scan to launch the companion lab or classroom starter file',
      authorLabel: 'By',
      prevArticle: 'Previous Article',
      nextArticle: 'Next Article',
      fontSizeLabel: 'Text Size',
      listenLabel: 'Read Aloud',
      stopListenLabel: 'Stop Audio',
      summarizeWithNuha: 'Summarize with Nuha AI',
      bookmarkLabel: 'Bookmark',
      bookmarkedLabel: 'Bookmarked',
    },
    assistant: {
      heading: 'Nuha — Your Personal AI Study Mentor',
      subheading:
        'Built for Egyptian Language School students to summarize lessons or magazine articles, generate printable study sheets, and explain tricky topics step by step.',
      badgeName: 'Nuha · AI Study Companion',
      modeSummarize: 'Summarize',
      modeStudyGuide: 'Study Sheet',
      modeExplain: 'Explain Simply',
      modeQuiz: 'Practice Quiz',
      modeChat: 'Study Chat',
      articlePickerLabel: 'Or load an Issue 01 article directly',
      articlePickerPlaceholder: '— Select an article to preload —',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g., Computer Science, Science, Math...',
      gradeLabel: 'Grade Level',
      gradePlaceholder: 'e.g., Prep 2 / Grade 8',
      promptLabel: 'Topic, Study Goal, or Question for Nuha',
      promptPlaceholders: {
        summarize: 'What should Nuha focus on? (e.g., 5 key bullet points)...',
        studyGuide: 'Enter the lesson title or key topics for a structured revision sheet...',
        explain: 'Which concept or homework problem would you like explained clearly?',
        quiz: 'Enter a lesson topic to generate 4 practice questions with an answer key...',
        chat: 'Ask Nuha any study question or ask for a quick revision plan...',
      },
      sourceLabel: 'Lesson Notes or Passage to Summarize (optional for Q&A/Chat)',
      sourcePlaceholder: 'Paste your textbook notes, lesson paragraph, or article content here...',
      submitBtn: 'Ask Nuha',
      sendingBtn: 'Nuha is preparing your notes...',
      clearChat: 'New Chat',
      copyResult: 'Copy Output',
      copiedResult: 'Copied',
      saveSummary: 'Save to Study Notebook',
      savedToast: 'Summary saved to your Study Notebook.',
      printSummary: 'Print Summary',
      savedSectionTitle: 'Saved Study Summaries',
      savedEmpty: 'No saved summaries yet. Generate a summary and click "Save to Study Notebook".',
      deleteSaved: 'Delete summary',
      loadSaved: 'Open summary',
      errEmpty: 'Please enter a topic, question, or paste text first.',
      errShort: 'Please write at least 3 characters so Nuha can help.',
      quickStarterTitle: 'Try a Quick Study Prompt',
      quickStarters: [
        'Summarize the Issue 01 AI Corner article in 5 clear points',
        'Create a study sheet comparing variables and loops in Python',
        'Explain how an HC-SR04 ultrasonic sensor works in simple terms',
        'Make 4 practice quiz questions on spotting phishing emails',
      ],
      responseTitle: 'Nuha Study Output',
      emptyResponseTitle: 'Hi! I’m Nuha, your Digital Minds Study Companion',
      emptyResponseBody:
        'Pick a study mode above—Summarize, Study Sheet, Explain Simply, Practice Quiz, or Chat—or preload any Issue 01 article to get started.',
    },
    labs: {
      heading: 'Interactive STEM & Security Labs',
      subheading: 'Hands-on exercises in phishing detection, code debugging, and ultrasonic robotics.',
      phishingTab: 'Phishing Detective',
      bugTab: 'Find the Bug',
      roboticsTab: 'Obstacle Robot',
      phishingIntro: 'Inspect incoming student inbox messages and classify each one as safe or a phishing attempt.',
      markPhishing: 'Flag as Phishing',
      markSafe: 'Mark as Safe',
      nextEmail: 'Next Message',
      scoreLabel: 'Score',
      correctTag: 'Accurate Call',
      incorrectTag: 'Check the Clues',
      bugIntro: 'Select the exact line of code containing the logic or syntax bug to repair the program.',
      showHint: 'Show Hint',
      hideHint: 'Hide Hint',
      fixedLineLabel: 'Verified Fix',
      roboticsIntro: 'Adjust the obstacle distance slider to test the ultrasonic sensor rule and live motor output.',
      distanceLabel: 'Measured Distance (cm)',
      thresholdLabel: 'Safety Threshold: 25 cm',
      leftMotor: 'Left Motor',
      rightMotor: 'Right Motor',
      statusForward: 'PATH CLEAR · MOVE FORWARD',
      statusCaution: 'OBJECT NEAR · SLOW APPROACH',
      statusTurnRight: 'OBSTACLE DETECTED · TURN RIGHT',
    },
    glossary: {
      heading: 'Tech in Three Languages',
      subheading: 'Fifteen foundational CS, programming, robotics, and AI terms in Arabic, English, and French.',
      searchPlaceholder: 'Search in Arabic, English, or French...',
      allCat: 'All',
      aiCat: 'AI',
      codingCat: 'Coding',
      roboticsCat: 'Robotics',
      cyberCat: 'Cybersecurity',
      emptyState: 'No matching technical terms found.',
      examplePrefix: 'Example:',
      countSuffix: 'terms',
    },
    showcase: {
      heading: 'Student Showcase & Idea Lab',
      subheading: 'Highlighting student software, robotics builds, and actionable proposals to elevate every issue.',
      coderOfMonthLabel: 'Coder of the Month',
      coderName: 'Omar Khaled — Prep 2',
      coderGrade: 'ELS Homework Organizer Web App',
      coderAchievement: 'Built a lightweight trilingual planner helping classmates track deadlines without distractions.',
      filterAll: 'All',
      filterApp: 'Apps',
      filterRobotics: 'Robotics',
      filterGame: 'Games',
      filterIdea: 'Suggested Ideas',
      upvote: 'Endorse',
      formTitle: 'Submit a Student Project or Magazine Idea',
      formSubtitle: 'Approved entries publish directly to the live showcase feed.',
      fieldName: 'Student or Teacher Name',
      fieldGrade: 'Grade / Department',
      fieldCategory: 'Category',
      fieldLanguage: 'Primary Language',
      fieldTitle: 'Project or Idea Title',
      fieldSummary: 'Brief explanation and tools used',
      submitBtn: 'Publish Entry',
      successMsg: 'Your entry has been added to the Student Showcase.',
      errName: 'Please enter a name (at least 2 characters).',
      errGrade: 'Please enter your grade or department.',
      errTitle: 'Please enter a descriptive title (at least 4 characters).',
      errSummary: 'Please add a brief summary (at least 12 characters).',
      suggestionsHeading: 'Recommended Ideas to Elevate Digital Minds',
      suggestionsSubheading: 'Concrete enhancements designed to deepen student engagement across ELS.',
      pilotLabel: 'First Pilot Step',
    },
    launch: {
      heading: 'School Launch & Editorial Hub',
      subheading: 'The 5-scene trilingual assembly script, 4-week rollout schedule, and official Principal proposal.',
      scriptTitle: 'School Assembly Launch Script (5–7 min)',
      scriptSubtitle: 'Step through all five scenes prepared for the student presenters and school leadership.',
      prevScene: 'Previous Scene',
      nextScene: 'Next Scene',
      roadmapTitle: '4-Week Rollout Schedule',
      governanceTitle: 'Project Governance & Format',
      kpisTitle: 'Success Metrics (After 3 Issues)',
      proposalTitle: 'Official Proposal Letter to School Management',
      proposalSubtitle: 'Customize proposer details below, then copy or print the formal Arabic proposal.',
      proposerNameLabel: 'Proposer Name',
      proposalDateLabel: 'Date',
      copyProposal: 'Copy Proposal',
      copiedProposal: 'Copied',
      printProposal: 'Print Letter',
    },
    footer: {
      copyright: 'Digital Minds — Egyptian Language School · Computer Science & IT Department',
      editorialNote: 'Trilingual Student Edition (Arabic · English · French)',
    },
  },
  fr: {
    brandTitle: 'Esprits Numériques',
    schoolName: 'École Égyptienne des Langues — Magazine Technologie & Innovation',
    slogan: 'Programmer aujourd’hui, façonner demain.',
    nav: {
      issue: 'Numéro 01',
      assistant: 'Assistant Nuha',
      labs: 'Ateliers',
      glossary: 'Lexique',
      showcase: 'Créations',
      launch: 'Lancement',
      admin: 'Administration',
    },
    ctaSubmit: 'Soumettre',
    issueHeader: {
      volumeLine: 'NUMÉRO 01 · E-MAGAZINE SCOLAIRE INTERACTIF · 2026',
      issueTitle: 'Numéro 01 : Notre Porte vers l’Avenir Numérique',
      editionStandard: 'Édition Complète',
      editionJunior: 'Édition Junior',
      editionLabel: 'Niveau de lecture',
      readLead: 'Ouvrir le lecteur interactif',
      readArticle: 'Lire l’article',
      minRead: 'min de lecture',
      departmentsTitle: 'Rubriques Permanentes et Alternées',
      departmentsSubtitle: 'Dix rubriques fixes par numéro accompagnées de deux dossiers thématiques en alternance.',
      bonusBadge: 'Dossier Spécial N° 01',
      goalsTitle: 'Les Sept Objectifs du Magazine',
      viewSpread: 'Feuilleter le Magazine',
      viewGrid: 'Vue Complète',
      tocTitle: 'Sommaire Interactif',
      prevPage: 'Page précédente',
      nextPage: 'Page suivante',
      pageWord: 'Page',
      bookmarkAdd: 'Enregistrer',
      bookmarkSaved: 'Enregistré',
      readProgress: 'lus',
      listenArticle: 'Écouter',
      stopListening: 'Arrêter l’audio',
      summarizeWithAi: 'Résumer avec Nuha',
    },
    reader: {
      close: 'Fermer',
      keyTakeaway: 'À retenir',
      juniorNote: 'Résumé simplifié pour les plus jeunes élèves',
      qrTitle: 'QR Code de l’atelier',
      qrSubtitle: 'Scannez pour ouvrir le fichier compagnon en classe',
      authorLabel: 'Par',
      prevArticle: 'Article précédent',
      nextArticle: 'Article suivant',
      fontSizeLabel: 'Taille du texte',
      listenLabel: 'Lecture audio',
      stopListenLabel: 'Arrêter',
      summarizeWithNuha: 'Résumer avec l’assistant Nuha',
      bookmarkLabel: 'Sauvegarder',
      bookmarkedLabel: 'Sauvegardé',
    },
    assistant: {
      heading: 'Nuha — Votre Assistant d’Étude Personnel IA',
      subheading:
        'Conçu pour les élèves de l’École Égyptienne des Langues afin de résumer les leçons, créer des fiches de révision et expliquer les notions complexes étape par étape.',
      badgeName: 'Nuha · Compagnon d’Étude IA',
      modeSummarize: 'Résumer',
      modeStudyGuide: 'Fiche de Révision',
      modeExplain: 'Expliquer simplement',
      modeQuiz: 'Quiz rapide',
      modeChat: 'Discussion d’étude',
      articlePickerLabel: 'Ou importer un article du Numéro 01',
      articlePickerPlaceholder: '— Choisir un article du magazine —',
      subjectLabel: 'Matière',
      subjectPlaceholder: 'Ex : Informatique, Sciences, Maths...',
      gradeLabel: 'Classe / Niveau',
      gradePlaceholder: 'Ex : 2e Préparatoire',
      promptLabel: 'Sujet, objectif ou question pour Nuha',
      promptPlaceholders: {
        summarize: 'Précisez l’angle souhaité (ex : 5 points essentiels à retenir)...',
        studyGuide: 'Saisissez le titre de la leçon pour générer une fiche de révision...',
        explain: 'Quelle notion souhaitez-vous que Nuha vous explique simplement ?',
        quiz: 'Indiquez un thème pour créer 4 questions d’entraînement corrigées...',
        chat: 'Posez une question de cours ou demandez un plan de révision...',
      },
      sourceLabel: 'Texte ou notes de cours à résumer (optionnel en chat)',
      sourcePlaceholder: 'Collez ici votre texte, leçon ou article du magazine...',
      submitBtn: 'Demander à Nuha',
      sendingBtn: 'Nuha rédige la réponse...',
      clearChat: 'Nouvelle discussion',
      copyResult: 'Copier',
      copiedResult: 'Copié',
      saveSummary: 'Sauvegarder la fiche',
      savedToast: 'Fiche enregistrée dans votre carnet de révision.',
      printSummary: 'Imprimer',
      savedSectionTitle: 'Carnet de Fiches Sauvegardées',
      savedEmpty: 'Aucune fiche enregistrée. Créez une fiche puis cliquez sur « Sauvegarder ».',
      deleteSaved: 'Supprimer la fiche',
      loadSaved: 'Ouvrir la fiche',
      errEmpty: 'Veuillez saisir une question ou coller un texte.',
      errShort: 'Veuillez saisir au moins 3 caractères.',
      quickStarterTitle: 'Exemples rapides',
      quickStarters: [
        'Résume l’article IA du Numéro 01 en 5 points clés',
        'Crée une fiche de révision sur les variables et les boucles en Python',
        'Explique simplement le fonctionnement du capteur ultrasonique HC-SR04',
        'Prépare 4 questions pour repérer un message d’hameçonnage',
      ],
      responseTitle: 'Réponse et synthèse de Nuha',
      emptyResponseTitle: 'Bonjour ! Je suis Nuha, votre compagnon d’étude',
      emptyResponseBody:
        'Choisissez un mode ci-dessus — Résumé, Fiche de révision, Explication, Quiz ou Discussion — ou importez un article du magazine pour commencer.',
    },
    labs: {
      heading: 'Ateliers Interactifs STEM & Sécurité',
      subheading: 'Exercices pratiques : détection d’hameçonnage, débogage et simulation de robot à capteur.',
      phishingTab: 'Anti-Hameçonnage',
      bugTab: 'Chasse au Bug',
      roboticsTab: 'Robot Capteur',
      phishingIntro: 'Analysez la boîte de réception et indiquez si chaque message est légitime ou frauduleux.',
      markPhishing: 'Hameçonnage',
      markSafe: 'Message sûr',
      nextEmail: 'Message suivant',
      scoreLabel: 'Score',
      correctTag: 'Bonne analyse',
      incorrectTag: 'Vérifiez les indices',
      bugIntro: 'Cliquez sur la ligne de code contenant l’erreur logique ou syntaxique pour réparer le script.',
      showHint: 'Voir l’indice',
      hideHint: 'Masquer l’indice',
      fixedLineLabel: 'Correction validée',
      roboticsIntro: 'Déplacez le curseur de distance pour observer la réaction du capteur ultrasonique.',
      distanceLabel: 'Distance mesurée (cm)',
      thresholdLabel: 'Seuil de sécurité : 25 cm',
      leftMotor: 'Moteur gauche',
      rightMotor: 'Moteur droit',
      statusForward: 'VOIE LIBRE · AVANCER',
      statusCaution: 'OBSTACLE PROCHE · RALENTIR',
      statusTurnRight: 'OBSTACLE DÉTECTÉ · TOURNER À DROITE',
    },
    glossary: {
      heading: 'La Tech en Trois Langues',
      subheading: 'Quinze termes essentiels d’informatique, IA et robotique en arabe, anglais et français.',
      searchPlaceholder: 'Rechercher en arabe, anglais ou français...',
      allCat: 'Tout',
      aiCat: 'IA',
      codingCat: 'Code',
      roboticsCat: 'Robotique',
      cyberCat: 'Cybersécurité',
      emptyState: 'Aucun terme technique correspondant trouvé.',
      examplePrefix: 'Exemple :',
      countSuffix: 'termes',
    },
    showcase: {
      heading: 'Les Créations des Élèves & Idées',
      subheading: 'Vitrine des applications, projets robotiques et suggestions pour enrichir les prochains numéros.',
      coderOfMonthLabel: 'Codeur du Mois',
      coderName: 'Omar Khaled — 2e Préparatoire',
      coderGrade: 'Application d’organisation des devoirs ELS',
      coderAchievement: 'A conçu un agenda trilingue léger permettant aux élèves de suivre leurs échéances.',
      filterAll: 'Tout',
      filterApp: 'Applications',
      filterRobotics: 'Robotique',
      filterGame: 'Jeux',
      filterIdea: 'Idées suggérées',
      upvote: 'Soutenir',
      formTitle: 'Proposer un Projet ou une Idée de Rubrique',
      formSubtitle: 'Les propositions s’ajoutent immédiatement à la vitrine scolaire.',
      fieldName: 'Nom de l’élève ou de l’enseignant',
      fieldGrade: 'Classe / Département',
      fieldCategory: 'Catégorie',
      fieldLanguage: 'Langue principale',
      fieldTitle: 'Titre du projet ou de l’idée',
      fieldSummary: 'Description courte et outils utilisés',
      submitBtn: 'Publier',
      successMsg: 'Votre contribution a été ajoutée à la vitrine.',
      errName: 'Veuillez saisir un nom (2 caractères minimum).',
      errGrade: 'Veuillez indiquer la classe ou le département.',
      errTitle: 'Veuillez saisir un titre clair (4 caractères minimum).',
      errSummary: 'Veuillez rédiger une description (12 caractères minimum).',
      suggestionsHeading: 'Idées Recommandées pour Enrichir le Magazine',
      suggestionsSubheading: 'Des initiatives concrètes prêtes à être déployées dès les prochains numéros.',
      pilotLabel: 'Première étape pilote',
    },
    launch: {
      heading: 'Lancement & Gouvernance Scolaire',
      subheading: 'Scénario de présentation trilingue en 5 scènes, calendrier sur 4 semaines et lettre officielle.',
      scriptTitle: 'Scénario de Lancement à l’École (5–7 min)',
      scriptSubtitle: 'Parcourez les 5 scènes préparées pour les élèves présentateurs.',
      prevScene: 'Scène précédente',
      nextScene: 'Scène suivante',
      roadmapTitle: 'Calendrier de Déploiement (4 Semaines)',
      governanceTitle: 'Organisation & Indicateurs de Réussite',
      kpisTitle: 'Indicateurs après 3 numéros',
      proposalTitle: 'Proposition Officielle à la Direction',
      proposalSubtitle: 'Personnalisez le nom et la date puis copiez ou imprimez la lettre officielle.',
      proposerNameLabel: 'Nom du porteur de projet',
      proposalDateLabel: 'Date',
      copyProposal: 'Copier le texte',
      copiedProposal: 'Copié',
      printProposal: 'Imprimer',
    },
    footer: {
      copyright: 'Esprits Numériques — École Égyptienne des Langues · Département Informatique',
      editorialNote: 'Édition scolaire trilingue (Arabe · Anglais · Français)',
    },
  },
};
