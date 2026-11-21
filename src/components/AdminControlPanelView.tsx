import { FormEvent, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  CheckCircle2,
  Database,
  ExternalLink,
  FileText,
  FolderOpen,
  HardDrive,
  Home,
  LogOut,
  Newspaper,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
  Users,
  X,
} from 'lucide-react';
import {
  AdminMember,
  addAdminMember,
  deleteArticleFromDb,
  deleteSchoolNewsFromDb,
  deleteSubmissionFromDb,
  listAdminMembers,
  removeAdminMember,
  saveArticle,
  saveHomepageSettings,
  saveSchoolNewsToDb,
  seedDatabaseFromDefaults,
  updateSubmissionAdminInDb,
} from '../services/cmsDatabase';
import {
  listDriveFiles,
  renameDriveFile,
  trashDriveFile,
  uploadFileToDrive,
} from '../services/driveService';
import { BOOTSTRAPPED_ADMIN_EMAIL } from '../lib/firebase';
import {
  GoogleDriveFileItem,
  Lang,
  MagazineArticle,
  SchoolNewsDispatch,
  SiteHomepageSettings,
  StudentSubmission,
} from '../types/magazine';
import { GoogleSignInButton } from './GoogleSignInButton';

type AdminSubTab = 'homepage' | 'articles' | 'news' | 'showcase' | 'drive';

interface PendingConfirmAction {
  title: string;
  description: string;
  confirmLabel: string;
  isDanger?: boolean;
  onConfirm: () => Promise<void>;
}

interface AdminControlPanelViewProps {
  lang: Lang;
  user: User | null;
  driveAccessToken: string | null;
  isAdmin: boolean;
  isAuthReady: boolean;
  isSettingsFromDb: boolean;
  isArticlesFromDb: boolean;
  isNewsFromDb: boolean;
  siteSettings: SiteHomepageSettings;
  articles: MagazineArticle[];
  schoolNews: SchoolNewsDispatch[];
  submissions: StudentSubmission[];
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

const COPY: Record<
  Lang,
  {
    heading: string;
    subheading: string;
    signInPromptTitle: string;
    signInPromptBody: string;
    signInBtn: string;
    reconnectDrive: string;
    signOut: string;
    dbConnected: string;
    dbFallback: string;
    adminBadge: string;
    viewerBadge: string;
    seedBtn: string;
    seedTitle: string;
    seedDesc: string;
    tabHomepage: string;
    tabArticles: string;
    tabNews: string;
    tabShowcase: string;
    tabDrive: string;
    saveHomepage: string;
    savedMsg: string;
    addArticle: string;
    addNews: string;
    editBtn: string;
    deleteBtn: string;
    cancelBtn: string;
    confirmBtn: string;
    driveTitle: string;
    driveDesc: string;
    driveSearchPlaceholder: string;
    driveRefresh: string;
    driveBackupBtn: string;
    driveRenamePrompt: string;
  }
> = {
  ar: {
    heading: 'وحدة التحكم الرئيسية وقاعدة البيانات',
    subheading:
      'تحكم كامل في جميع بيانات الواجهة الرئيسية للمجلة، والمقالات، وأخبار المدرسة، وإبداعات الطلاب مع مزامنة فورية لقاعدة بيانات Firestore وملفات Google Drive.',
    signInPromptTitle: 'تسجيل الدخول لتفعيل التحرير السحابي وربط Google Drive',
    signInPromptBody:
      'سجّل الدخول بحساب Google المعتمد للتحكم في بيانات الواجهة الرئيسية وتعديل قاعدة البيانات، أو لربط ملفاتك ونسخك الاحتياطية على Google Drive.',
    signInBtn: 'تسجيل الدخول عبر Google',
    reconnectDrive: 'تجديد صلاحية Google Drive',
    signOut: 'تسجيل الخروج',
    dbConnected: 'متصل بقاعدة البيانات المباشرة (Firestore)',
    dbFallback: 'يعرض حاليًا البيانات الافتراضية — اضغط «تهيئة قاعدة البيانات» لحفظها في Firestore',
    adminBadge: 'صلاحية مدير النظام',
    viewerBadge: 'حساب مستخدم (للقراءة وربط Drive)',
    seedBtn: 'تهيئة ومزامنة قاعدة البيانات',
    seedTitle: 'تهيئة قاعدة البيانات بالبيانات الافتراضية؟',
    seedDesc:
      'سيتم حفظ إعدادات الواجهة الرئيسية وجميع مقالات العدد الأول وأخبار المدرسة وإبداعات الطلاب داخل قاعدة بيانات Firestore المباشرة لتتمكن من تعديلها فورًا.',
    tabHomepage: 'الواجهة الرئيسية',
    tabArticles: 'المقالات والصفحات',
    tabNews: 'أخبار المدرسة',
    tabShowcase: 'إبداعات الطلاب والمدراء',
    tabDrive: 'Google Drive والنسخ الاحتياطي',
    saveHomepage: 'حفظ بيانات الواجهة الرئيسية',
    savedMsg: 'تم حفظ التعديلات في قاعدة البيانات بنجاح وتحديث الواجهة الرئيسية فورًا.',
    addArticle: 'إضافة مقال جديد',
    addNews: 'إضافة خبر جديد',
    editBtn: 'تعديل',
    deleteBtn: 'حذف',
    cancelBtn: 'إلغاء',
    confirmBtn: 'تأكيد التنفيذ',
    driveTitle: 'ملفات Google Drive والنسخ الاحتياطي للمجلة',
    driveDesc:
      'استعرض ملفاتك على Google Drive أو احفظ نسخة احتياطية كاملة من بيانات المجلة والواجهة الرئيسية مباشرة داخل Drive.',
    driveSearchPlaceholder: 'ابحث باسم الملف داخل Google Drive...',
    driveRefresh: 'تحديث الملفات',
    driveBackupBtn: 'نسخ احتياطي لقاعدة البيانات إلى Drive',
    driveRenamePrompt: 'الاسم الجديد للملف',
  },
  en: {
    heading: 'Master Control Panel & Database Studio',
    subheading:
      'Manage all main homepage settings, magazine articles, school news dispatches, and showcase submissions backed by Cloud Firestore and Google Drive.',
    signInPromptTitle: 'Sign in with Google to Manage Homepage Database & Drive',
    signInPromptBody:
      'Sign in with an authorized Google account to edit live homepage content in Firestore and browse or back up files with Google Drive.',
    signInBtn: 'Sign in with Google',
    reconnectDrive: 'Reconnect Google Drive',
    signOut: 'Sign Out',
    dbConnected: 'Live Firestore Database Active',
    dbFallback: 'Showing default seed — click "Seed Firestore Database" to persist editable records',
    adminBadge: 'Admin Access Granted',
    viewerBadge: 'Signed-In User (Drive enabled)',
    seedBtn: 'Seed / Sync Firestore Database',
    seedTitle: 'Seed Firestore with Default Issue Data?',
    seedDesc:
      'This writes homepage settings, all Issue 01 articles, Facebook school news dispatches, and showcase entries to Firestore for live editing.',
    tabHomepage: 'Homepage & Masthead',
    tabArticles: 'Articles & Pages',
    tabNews: 'School News',
    tabShowcase: 'Showcase & Admins',
    tabDrive: 'Google Drive',
    saveHomepage: 'Save Homepage Settings',
    savedMsg: 'Changes saved to Firestore database and synced live.',
    addArticle: 'Add New Article',
    addNews: 'Add School News',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    cancelBtn: 'Cancel',
    confirmBtn: 'Confirm',
    driveTitle: 'Google Drive Workspace & Backups',
    driveDesc:
      'Browse files in Google Drive, attach links to articles/news, or upload a complete JSON snapshot of your magazine database.',
    driveSearchPlaceholder: 'Search Google Drive files by name...',
    driveRefresh: 'Refresh Drive Files',
    driveBackupBtn: 'Export CMS Backup to Drive',
    driveRenamePrompt: 'New file name',
  },
  fr: {
    heading: 'Panneau de Contrôle & Base de Données',
    subheading:
      'Gérez toutes les données de la page d’accueil, les articles, les actualités et les projets d’élèves avec Firestore et Google Drive.',
    signInPromptTitle: 'Connectez-vous avec Google pour gérer la base et Google Drive',
    signInPromptBody:
      'Connectez-vous avec un compte autorisé pour modifier le contenu en direct dans Firestore et gérer vos fichiers Google Drive.',
    signInBtn: 'Se connecter avec Google',
    reconnectDrive: 'Reconnecter Google Drive',
    signOut: 'Déconnexion',
    dbConnected: 'Base Firestore Active',
    dbFallback: 'Données par défaut — cliquez sur « Initialiser la base Firestore »',
    adminBadge: 'Accès Administrateur',
    viewerBadge: 'Utilisateur connecté',
    seedBtn: 'Initialiser / Synchroniser Firestore',
    seedTitle: 'Initialiser Firestore avec les données du numéro ?',
    seedDesc:
      'Enregistre les paramètres d’accueil, les articles, les actualités et les créations dans Firestore.',
    tabHomepage: 'Page d’accueil',
    tabArticles: 'Articles & Pages',
    tabNews: 'Actualités',
    tabShowcase: 'Créations & Admins',
    tabDrive: 'Google Drive',
    saveHomepage: 'Enregistrer la page d’accueil',
    savedMsg: 'Modifications enregistrées dans Firestore avec succès.',
    addArticle: 'Nouvel article',
    addNews: 'Nouvelle actualité',
    editBtn: 'Modifier',
    deleteBtn: 'Supprimer',
    cancelBtn: 'Annuler',
    confirmBtn: 'Confirmer',
    driveTitle: 'Google Drive & Sauvegardes',
    driveDesc:
      'Parcourez vos fichiers Drive et sauvegardez l’intégralité de la base du magazine sur Google Drive.',
    driveSearchPlaceholder: 'Rechercher un fichier sur Drive...',
    driveRefresh: 'Actualiser',
    driveBackupBtn: 'Sauvegarder la base sur Drive',
    driveRenamePrompt: 'Nouveau nom du fichier',
  },
};

export function AdminControlPanelView({
  lang,
  user,
  driveAccessToken,
  isAdmin,
  isAuthReady,
  isSettingsFromDb,
  isArticlesFromDb,
  isNewsFromDb,
  siteSettings,
  articles,
  schoolNews,
  submissions,
  onSignIn,
  onSignOut,
}: AdminControlPanelViewProps) {
  const copy = COPY[lang];
  const [subTab, setSubTab] = useState<AdminSubTab>(isAdmin ? 'homepage' : 'drive');
  const [authLoading, setAuthLoading] = useState(false);
  const [busyMsg, setBusyMsg] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirmAction | null>(null);

  // Homepage Settings Draft State
  const [homeDraft, setHomeDraft] = useState<SiteHomepageSettings>(siteSettings);
  useEffect(() => {
    setHomeDraft(siteSettings);
  }, [siteSettings]);

  // Articles Editor State
  const [editingArticle, setEditingArticle] = useState<MagazineArticle | null>(null);
  const [articleBodyTextAr, setArticleBodyTextAr] = useState('');
  const [articleBodyTextEn, setArticleBodyTextEn] = useState('');
  const [articleBodyTextFr, setArticleBodyTextFr] = useState('');

  // News Editor State
  const [editingNews, setEditingNews] = useState<SchoolNewsDispatch | null>(null);

  // Admin Delegation State
  const [adminMembers, setAdminMembers] = useState<AdminMember[]>([]);
  const [newAdminUid, setNewAdminUid] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');

  // Google Drive State
  const [driveFiles, setDriveFiles] = useState<GoogleDriveFileItem[]>([]);
  const [driveSearch, setDriveSearch] = useState('');
  const [driveLoading, setDriveLoading] = useState(false);
  const [renamingFile, setRenamingFile] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (isAdmin && subTab === 'drive' && !driveAccessToken) {
      // keep current tab
    } else if (isAdmin && subTab === 'showcase') {
      void listAdminMembers()
        .then(setAdminMembers)
        .catch(() => {
          // Non-bootstrapped admins may not list all admins per Pillar 8
        });
    }
  }, [isAdmin, subTab, driveAccessToken]);

  const loadDriveFiles = async (searchQuery = driveSearch) => {
    if (!driveAccessToken) return;
    setDriveLoading(true);
    setErrorMsg(null);
    try {
      const files = await listDriveFiles({ token: driveAccessToken, query: searchQuery });
      setDriveFiles(files);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Google Drive load failed');
    } finally {
      setDriveLoading(false);
    }
  };

  useEffect(() => {
    if (driveAccessToken && subTab === 'drive') {
      void loadDriveFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driveAccessToken, subTab]);

  const handleLoginClick = async () => {
    setAuthLoading(true);
    setErrorMsg(null);
    try {
      await onSignIn();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Sign-in cancelled or failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSaveHomepage = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusyMsg(copy.saveHomepage);
    setStatusMsg(null);
    setErrorMsg(null);
    try {
      await saveHomepageSettings(homeDraft, user.uid);
      setStatusMsg(copy.savedMsg);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save homepage settings.');
    } finally {
      setBusyMsg(null);
    }
  };

  const openArticleEditor = (art?: MagazineArticle) => {
    const base: MagazineArticle = art
      ? { ...art }
      : {
          id: `article-${Date.now()}`,
          departmentNumber: String(articles.length + 1).padStart(2, '0'),
          department: { ar: 'قسم جديد', en: 'New Section', fr: 'Nouvelle Rubrique' },
          title: { ar: 'عنوان المقال الجديد', en: 'New Article Title', fr: 'Nouveau Titre' },
          subtitle: { ar: 'وصف مختصر للمقال', en: 'Short editorial summary', fr: 'Résumé court' },
          juniorSummary: { ar: 'ملخص مبسط للصغار', en: 'Simple summary for juniors', fr: 'Résumé junior' },
          author: { ar: 'هيئة تحرير عقول رقمية', en: 'Digital Minds Editorial', fr: 'Rédaction Esprits Numériques' },
          readTimeMin: 3,
          tier: 'department',
          isBonus: false,
          imageUrl: '',
          body: {
            ar: ['الفقرة الأولى من المقال.'],
            en: ['First paragraph of the article.'],
            fr: ['Premier paragraphe de l’article.'],
          },
          keyTakeaway: { ar: 'الخلاصة العملية', en: 'Key takeaway', fr: 'À retenir' },
          qrSlug: `els-article-${Date.now()}`,
          sortOrder: articles.length + 1,
          isPublished: true,
        };
    setEditingArticle(base);
    setArticleBodyTextAr(base.body.ar.join('\n\n'));
    setArticleBodyTextEn(base.body.en.join('\n\n'));
    setArticleBodyTextFr(base.body.fr.join('\n\n'));
  };

  const handleSaveArticle = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !editingArticle) return;
    setBusyMsg(copy.editBtn);
    setStatusMsg(null);
    setErrorMsg(null);
    try {
      const updated: MagazineArticle = {
        ...editingArticle,
        body: {
          ar: articleBodyTextAr.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean),
          en: articleBodyTextEn.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean),
          fr: articleBodyTextFr.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean),
        },
      };
      await saveArticle(updated, user.uid);
      setEditingArticle(null);
      setStatusMsg(copy.savedMsg);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save article.');
    } finally {
      setBusyMsg(null);
    }
  };

  const openNewsEditor = (item?: SchoolNewsDispatch) => {
    if (item) {
      setEditingNews({
        ...item,
        localizedTitle: item.localizedTitle ?? { ar: item.title, en: item.title, fr: item.title },
        localizedSummary: item.localizedSummary ?? {
          ar: item.summary,
          en: item.summary,
          fr: item.summary,
        },
      });
    } else {
      const today = new Date().toISOString().slice(0, 10);
      setEditingNews({
        id: `news-${Date.now()}`,
        title: '',
        summary: '',
        localizedTitle: { ar: '', en: '', fr: '' },
        localizedSummary: { ar: '', en: '', fr: '' },
        publishedDate: today,
        sourceUrl: 'https://www.facebook.com/profile.php?id=100057508656402',
        imageUrl: '',
        isPinned: false,
        isPublished: true,
      });
    }
  };

  const handleSaveNews = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !editingNews) return;
    setBusyMsg(copy.addNews);
    setStatusMsg(null);
    setErrorMsg(null);
    try {
      const titleAr = editingNews.localizedTitle?.ar.trim() || editingNews.title.trim();
      const summaryAr = editingNews.localizedSummary?.ar.trim() || editingNews.summary.trim();
      const payload: SchoolNewsDispatch = {
        ...editingNews,
        title: editingNews.title.trim() || titleAr,
        summary: editingNews.summary.trim() || summaryAr,
        localizedTitle: {
          ar: titleAr || 'خبر مدرسي',
          en: editingNews.localizedTitle?.en.trim() || titleAr || 'School News',
          fr: editingNews.localizedTitle?.fr.trim() || titleAr || 'Actualité',
        },
        localizedSummary: {
          ar: summaryAr || 'تفاصيل الخبر',
          en: editingNews.localizedSummary?.en.trim() || summaryAr || 'School news summary',
          fr: editingNews.localizedSummary?.fr.trim() || summaryAr || 'Résumé scolaire',
        },
      };
      await saveSchoolNewsToDb(payload, user.uid);
      setEditingNews(null);
      setStatusMsg(copy.savedMsg);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save news dispatch.');
    } finally {
      setBusyMsg(null);
    }
  };

  const handleSeedDatabase = () => {
    if (!user) return;
    setPendingConfirm({
      title: copy.seedTitle,
      description: copy.seedDesc,
      confirmLabel: copy.confirmBtn,
      onConfirm: async () => {
        await seedDatabaseFromDefaults(user.uid);
        setStatusMsg(copy.savedMsg);
      },
    });
  };

  const handleBackupToDrive = async () => {
    if (!driveAccessToken) return;
    setBusyMsg(copy.driveBackupBtn);
    setStatusMsg(null);
    setErrorMsg(null);
    try {
      const backupPayload = {
        exportedAt: new Date().toISOString(),
        project: 'Digital Minds ELS CMS',
        siteSettings: homeDraft,
        articles,
        schoolNews,
        submissions,
      };
      const file = await uploadFileToDrive({
        token: driveAccessToken,
        fileName: `digital-minds-cms-backup-${new Date().toISOString().slice(0, 10)}.json`,
        content: JSON.stringify(backupPayload, null, 2),
        mimeType: 'application/json',
      });
      setStatusMsg(
        lang === 'ar'
          ? `تم حفظ النسخة الاحتياطية في Google Drive بنجاح: ${file.name}`
          : `Saved CMS backup to Google Drive: ${file.name}`
      );
      await loadDriveFiles();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Backup upload to Google Drive failed.');
    } finally {
      setBusyMsg(null);
    }
  };

  const handleAddAdmin = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !newAdminUid.trim() || !newAdminEmail.trim()) return;
    setErrorMsg(null);
    try {
      await addAdminMember(newAdminUid.trim(), newAdminEmail.trim(), user.uid);
      setNewAdminUid('');
      setNewAdminEmail('');
      setAdminMembers(await listAdminMembers());
      setStatusMsg(copy.savedMsg);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to add admin member.');
    }
  };

  const hasLiveDb = isSettingsFromDb || isArticlesFromDb || isNewsFromDb;

  return (
    <div className="space-y-8">
      {/* Header & Auth Status */}
      <header className="border-b border-[#E5E0D8] pb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#1E3A8A]">
              <Database className="w-4 h-4" aria-hidden="true" />
              <span>{hasLiveDb ? copy.dbConnected : copy.dbFallback}</span>
            </span>
          </div>
          <h1
            className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]"
            style={{ textWrap: 'balance' }}
          >
            {copy.heading}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-3xl leading-relaxed">
            {copy.subheading}
          </p>
        </div>

        {/* Account Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {!user ? (
            <GoogleSignInButton
              label={copy.signInBtn}
              loading={authLoading || !isAuthReady}
              onClick={handleLoginClick}
            />
          ) : (
            <div className="flex flex-wrap items-center gap-3 rounded-md border border-[#E5E0D8] bg-white px-4 py-2.5">
              <div className="text-xs">
                <p className="font-semibold text-[#1C1917]">{user.displayName || user.email}</p>
                <p className="text-[#57534E] font-mono-tabular">
                  {isAdmin ? copy.adminBadge : copy.viewerBadge}
                </p>
              </div>
              {!driveAccessToken && (
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#1E3A8A]/40 bg-[#1E3A8A]/5 px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] hover:bg-[#1E3A8A]/10 cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{copy.reconnectDrive}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => void onSignOut()}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copy.signOut}</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {statusMsg && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-md border border-[#14532D]/30 bg-[#14532D]/5 px-4 py-3 text-sm font-medium text-[#14532D]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{statusMsg}</span>
          </div>
          <button type="button" onClick={() => setStatusMsg(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-md border border-[#9A3412]/30 bg-[#9A3412]/5 px-4 py-3 text-sm text-[#9A3412]"
        >
          <span>{errorMsg}</span>
          <button type="button" onClick={() => setErrorMsg(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Unauthenticated Gate */}
      {!user && (
        <section className="rounded-lg border border-[#D6CEBE] bg-white p-8 max-w-2xl space-y-4">
          <div className="flex items-center gap-2.5 text-[#1E3A8A]">
            <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold text-[#1C1917]">
              {copy.signInPromptTitle}
            </h2>
          </div>
          <p className="text-sm text-[#57534E] leading-relaxed">{copy.signInPromptBody}</p>
          <p className="text-xs font-mono-tabular text-[#57534E]">
            Admin: {BOOTSTRAPPED_ADMIN_EMAIL}
          </p>
          <GoogleSignInButton
            label={copy.signInBtn}
            loading={authLoading || !isAuthReady}
            onClick={handleLoginClick}
          />
        </section>
      )}

      {/* Authenticated Control Panel */}
      {user && (
        <>
          {/* Action & Sub-Tab Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E0D8] pb-4">
            <div role="tablist" className="flex flex-wrap items-center gap-2">
              {isAdmin && (
                <>
                  {(
                    [
                      { id: 'homepage', label: copy.tabHomepage, icon: Home },
                      { id: 'articles', label: `${copy.tabArticles} (${articles.length})`, icon: FileText },
                      { id: 'news', label: `${copy.tabNews} (${schoolNews.length})`, icon: Newspaper },
                      { id: 'showcase', label: `${copy.tabShowcase} (${submissions.length})`, icon: Users },
                    ] as const
                  ).map((t) => {
                    const Icon = t.icon;
                    const active = subTab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSubTab(t.id)}
                        className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                          active
                            ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white font-semibold'
                            : 'border-[#E5E0D8] bg-white text-[#1C1917] hover:bg-[#F2EFE9]'
                        }`}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </>
              )}

              <button
                type="button"
                role="tab"
                aria-selected={subTab === 'drive'}
                onClick={() => setSubTab('drive')}
                className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  subTab === 'drive'
                    ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white font-semibold'
                    : 'border-[#E5E0D8] bg-white text-[#1C1917] hover:bg-[#F2EFE9]'
                }`}
              >
                <HardDrive className="w-4 h-4" aria-hidden="true" />
                <span>{copy.tabDrive}</span>
              </button>
            </div>

            {isAdmin && (
              <button
                type="button"
                onClick={handleSeedDatabase}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#1E3A8A]/40 bg-[#1E3A8A]/5 px-4 py-2 text-xs sm:text-sm font-semibold text-[#1E3A8A] hover:bg-[#1E3A8A]/10 cursor-pointer whitespace-nowrap"
              >
                <Database className="w-4 h-4" aria-hidden="true" />
                <span>{copy.seedBtn}</span>
              </button>
            )}
          </div>

          {!isAdmin && subTab !== 'drive' && (
            <div className="rounded-md border border-[#E5E0D8] bg-white p-6 text-sm text-[#57534E] space-y-2">
              <p>
                {lang === 'ar'
                  ? `أنت مسجّل حاليًا بالحساب (${user.email}). صلاحية تعديل قاعدة بيانات الواجهة الرئيسية مخصصة للمدير (${BOOTSTRAPPED_ADMIN_EMAIL})، بينما يمكنك استخدام تبويب Google Drive مباشرة.`
                  : `Signed in as ${user.email}. Homepage CMS editing requires admin authorization (${BOOTSTRAPPED_ADMIN_EMAIL}). Google Drive tab remains available.`}
              </p>
            </div>
          )}

          {/* SUB-TAB 1: HOMEPAGE SETTINGS */}
          {isAdmin && subTab === 'homepage' && (
            <form onSubmit={handleSaveHomepage} className="space-y-6 rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['ar', 'en', 'fr'] as const).map((l) => (
                  <div key={`brand-${l}`}>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Brand Title ({l.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={homeDraft.brandTitle[l]}
                      onChange={(e) =>
                        setHomeDraft({
                          ...homeDraft,
                          brandTitle: { ...homeDraft.brandTitle, [l]: e.target.value },
                        })
                      }
                      className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-sm"
                    />
                  </div>
                ))}

                {(['ar', 'en', 'fr'] as const).map((l) => (
                  <div key={`school-${l}`}>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      School Name ({l.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={homeDraft.schoolName[l]}
                      onChange={(e) =>
                        setHomeDraft({
                          ...homeDraft,
                          schoolName: { ...homeDraft.schoolName, [l]: e.target.value },
                        })
                      }
                      className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-sm"
                    />
                  </div>
                ))}

                {(['ar', 'en', 'fr'] as const).map((l) => (
                  <div key={`slogan-${l}`}>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Slogan ({l.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={homeDraft.slogan[l]}
                      onChange={(e) =>
                        setHomeDraft({
                          ...homeDraft,
                          slogan: { ...homeDraft.slogan, [l]: e.target.value },
                        })
                      }
                      className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-sm"
                    />
                  </div>
                ))}

                {(['ar', 'en', 'fr'] as const).map((l) => (
                  <div key={`vol-${l}`}>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Volume Line ({l.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={homeDraft.volumeLine[l]}
                      onChange={(e) =>
                        setHomeDraft({
                          ...homeDraft,
                          volumeLine: { ...homeDraft.volumeLine, [l]: e.target.value },
                        })
                      }
                      className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-sm"
                    />
                  </div>
                ))}

                {(['ar', 'en', 'fr'] as const).map((l) => (
                  <div key={`issue-${l}`}>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Issue Hero Headline ({l.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={homeDraft.issueTitle[l]}
                      onChange={(e) =>
                        setHomeDraft({
                          ...homeDraft,
                          issueTitle: { ...homeDraft.issueTitle, [l]: e.target.value },
                        })
                      }
                      className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-sm"
                    />
                  </div>
                ))}

                {(['ar', 'en', 'fr'] as const).map((l) => (
                  <div key={`cover-${l}`}>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Cover Frame Caption ({l.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={homeDraft.coverStoryLabel[l]}
                      onChange={(e) =>
                        setHomeDraft({
                          ...homeDraft,
                          coverStoryLabel: { ...homeDraft.coverStoryLabel, [l]: e.target.value },
                        })
                      }
                      className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#E5E0D8] pt-5">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Hero Cover Image URL
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={homeDraft.heroImageUrl}
                    onChange={(e) => setHomeDraft({ ...homeDraft, heroImageUrl: e.target.value })}
                    className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-sm font-mono-tabular"
                  />
                </div>
                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-[#1C1917] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={homeDraft.isPublished}
                      onChange={(e) => setHomeDraft({ ...homeDraft, isPublished: e.target.checked })}
                      className="h-4 w-4 accent-[#1E3A8A]"
                    />
                    <span>
                      {lang === 'ar' ? 'نشر إعدادات الواجهة للجمهور' : 'Published on Public Homepage'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Dynamic Goals Editor */}
              <div className="border-t border-[#E5E0D8] pt-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-semibold text-[#1C1917]">
                    {lang === 'ar' ? 'أهداف المجلة على الواجهة الرئيسية' : 'Homepage Guiding Goals'} ({homeDraft.goals.length}/10)
                  </h2>
                  {homeDraft.goals.length < 10 && (
                    <button
                      type="button"
                      onClick={() =>
                        setHomeDraft({
                          ...homeDraft,
                          goals: [
                            ...homeDraft.goals,
                            { ar: 'هدف جديد', en: 'New goal', fr: 'Nouvel objectif' },
                          ],
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إضافة هدف' : 'Add Goal'}</span>
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {homeDraft.goals.map((goal, idx) => (
                    <div key={idx} className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-3">
                      <input
                        type="text"
                        value={goal.ar}
                        aria-label={`Goal ${idx + 1} AR`}
                        onChange={(e) => {
                          const next = [...homeDraft.goals];
                          next[idx] = { ...goal, ar: e.target.value };
                          setHomeDraft({ ...homeDraft, goals: next });
                        }}
                        className="rounded border border-[#D6CEBE] bg-white px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        value={goal.en}
                        aria-label={`Goal ${idx + 1} EN`}
                        onChange={(e) => {
                          const next = [...homeDraft.goals];
                          next[idx] = { ...goal, en: e.target.value };
                          setHomeDraft({ ...homeDraft, goals: next });
                        }}
                        className="rounded border border-[#D6CEBE] bg-white px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        value={goal.fr}
                        aria-label={`Goal ${idx + 1} FR`}
                        onChange={(e) => {
                          const next = [...homeDraft.goals];
                          next[idx] = { ...goal, fr: e.target.value };
                          setHomeDraft({ ...homeDraft, goals: next });
                        }}
                        className="rounded border border-[#D6CEBE] bg-white px-2.5 py-1.5 text-xs"
                      />
                      {homeDraft.goals.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const next = homeDraft.goals.filter((_, i) => i !== idx);
                            setHomeDraft({ ...homeDraft, goals: next });
                          }}
                          className="p-1.5 text-[#57534E] hover:text-[#9A3412] cursor-pointer"
                          aria-label="Remove goal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={Boolean(busyMsg)}
                  className="inline-flex items-center gap-2 rounded-md bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#172554] disabled:opacity-60 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{busyMsg || copy.saveHomepage}</span>
                </button>
              </div>
            </form>
          )}

          {/* SUB-TAB 2: ARTICLES CMS */}
          {isAdmin && subTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                  {copy.tabArticles} ({articles.length})
                </h2>
                <button
                  type="button"
                  onClick={() => openArticleEditor()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#172554] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{copy.addArticle}</span>
                </button>
              </div>

              {editingArticle && (
                <form
                  onSubmit={handleSaveArticle}
                  className="rounded-md border-2 border-[#1E3A8A]/40 bg-white p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                    <h3 className="font-display text-lg font-semibold text-[#1E3A8A]">
                      {editingArticle.title[lang]}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingArticle(null)}
                      className="p-1 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Dept #</label>
                      <input
                        type="text"
                        value={editingArticle.departmentNumber}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, departmentNumber: e.target.value })
                        }
                        className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm font-mono-tabular"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Tier</label>
                      <select
                        value={editingArticle.tier}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            tier: e.target.value as MagazineArticle['tier'],
                          })
                        }
                        className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm"
                      >
                        <option value="lead">Lead</option>
                        <option value="secondary">Secondary</option>
                        <option value="department">Department</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Read Min</label>
                      <input
                        type="number"
                        min={1}
                        max={60}
                        value={editingArticle.readTimeMin}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            readTimeMin: Number(e.target.value) || 3,
                          })
                        }
                        className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm font-mono-tabular"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Sort Order</label>
                      <input
                        type="number"
                        min={1}
                        max={1000}
                        value={editingArticle.sortOrder ?? 1}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            sortOrder: Number(e.target.value) || 1,
                          })
                        }
                        className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm font-mono-tabular"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(['ar', 'en', 'fr'] as const).map((l) => (
                      <div key={`dept-${l}`}>
                        <label className="block text-xs font-semibold mb-1">
                          Department ({l.toUpperCase()})
                        </label>
                        <input
                          type="text"
                          value={editingArticle.department[l]}
                          onChange={(e) =>
                            setEditingArticle({
                              ...editingArticle,
                              department: { ...editingArticle.department, [l]: e.target.value },
                            })
                          }
                          className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm"
                        />
                      </div>
                    ))}
                    {(['ar', 'en', 'fr'] as const).map((l) => (
                      <div key={`title-${l}`}>
                        <label className="block text-xs font-semibold mb-1">
                          Title ({l.toUpperCase()})
                        </label>
                        <input
                          type="text"
                          value={editingArticle.title[l]}
                          onChange={(e) =>
                            setEditingArticle({
                              ...editingArticle,
                              title: { ...editingArticle.title, [l]: e.target.value },
                            })
                          }
                          className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm"
                        />
                      </div>
                    ))}
                    {(['ar', 'en', 'fr'] as const).map((l) => (
                      <div key={`sub-${l}`}>
                        <label className="block text-xs font-semibold mb-1">
                          Subtitle ({l.toUpperCase()})
                        </label>
                        <input
                          type="text"
                          value={editingArticle.subtitle[l]}
                          onChange={(e) =>
                            setEditingArticle({
                              ...editingArticle,
                              subtitle: { ...editingArticle.subtitle, [l]: e.target.value },
                            })
                          }
                          className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm"
                        />
                      </div>
                    ))}
                    {(['ar', 'en', 'fr'] as const).map((l) => (
                      <div key={`body-${l}`}>
                        <label className="block text-xs font-semibold mb-1">
                          Body Paragraphs ({l.toUpperCase()})
                        </label>
                        <textarea
                          rows={4}
                          value={l === 'ar' ? articleBodyTextAr : l === 'en' ? articleBodyTextEn : articleBodyTextFr}
                          onChange={(e) => {
                            if (l === 'ar') setArticleBodyTextAr(e.target.value);
                            else if (l === 'en') setArticleBodyTextEn(e.target.value);
                            else setArticleBodyTextFr(e.target.value);
                          }}
                          className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-xs"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Image URL</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={editingArticle.imageUrl ?? ''}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, imageUrl: e.target.value })
                        }
                        className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm font-mono-tabular"
                      />
                    </div>
                    <div className="flex items-end gap-5">
                      <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingArticle.isPublished !== false}
                          onChange={(e) =>
                            setEditingArticle({ ...editingArticle, isPublished: e.target.checked })
                          }
                          className="accent-[#1E3A8A]"
                        />
                        <span>Published</span>
                      </label>
                      <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(editingArticle.isBonus)}
                          onChange={(e) =>
                            setEditingArticle({ ...editingArticle, isBonus: e.target.checked })
                          }
                          className="accent-[#1E3A8A]"
                        />
                        <span>Bonus Column</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingArticle(null)}
                      className="rounded-md border border-[#D6CEBE] px-4 py-2 text-xs font-medium cursor-pointer"
                    >
                      {copy.cancelBtn}
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-5 py-2 text-xs font-semibold text-white cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{copy.confirmBtn}</span>
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((art) => (
                  <article
                    key={art.id}
                    className="rounded-md border border-[#E5E0D8] bg-white p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#57534E]">
                        <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                          {art.departmentNumber} · {art.department[lang]}
                        </span>
                        <span className="font-mono-tabular">{art.tier}</span>
                      </div>
                      <h3 className="mt-1.5 font-display text-base font-semibold text-[#1C1917]">
                        {art.title[lang]}
                      </h3>
                      <p className="mt-1 text-xs text-[#57534E] line-clamp-2">{art.subtitle[lang]}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-[#E5E0D8] pt-3">
                      <button
                        type="button"
                        onClick={() => openArticleEditor(art)}
                        className="inline-flex items-center gap-1 rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>{copy.editBtn}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPendingConfirm({
                            title: `${copy.deleteBtn}: ${art.title[lang]}`,
                            description:
                              lang === 'ar'
                                ? 'هل أنت متأكد من حذف هذا المقال نهائيًا من قاعدة بيانات Firestore؟'
                                : 'Permanently delete this article from Firestore?',
                            confirmLabel: copy.deleteBtn,
                            isDanger: true,
                            onConfirm: async () => {
                              await deleteArticleFromDb(art.id);
                            },
                          })
                        }
                        className="inline-flex items-center gap-1 rounded border border-[#9A3412]/30 bg-[#9A3412]/5 px-3 py-1.5 text-xs font-medium text-[#9A3412] hover:bg-[#9A3412]/10 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{copy.deleteBtn}</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: SCHOOL NEWS CMS */}
          {isAdmin && subTab === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                  {copy.tabNews} ({schoolNews.length})
                </h2>
                <button
                  type="button"
                  onClick={() => openNewsEditor()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#172554] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{copy.addNews}</span>
                </button>
              </div>

              {editingNews && (
                <form
                  onSubmit={handleSaveNews}
                  className="rounded-md border-2 border-[#1E3A8A]/40 bg-white p-6 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">Arabic Title</label>
                      <input
                        type="text"
                        value={editingNews.localizedTitle?.ar ?? editingNews.title}
                        onChange={(e) =>
                          setEditingNews({
                            ...editingNews,
                            title: e.target.value,
                            localizedTitle: {
                              ...(editingNews.localizedTitle ?? { ar: '', en: '', fr: '' }),
                              ar: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Publish Date</label>
                      <input
                        type="date"
                        value={editingNews.publishedDate}
                        onChange={(e) =>
                          setEditingNews({ ...editingNews, publishedDate: e.target.value })
                        }
                        className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm font-mono-tabular"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Facebook Post URL</label>
                      <input
                        type="url"
                        dir="ltr"
                        value={editingNews.sourceUrl}
                        onChange={(e) =>
                          setEditingNews({ ...editingNews, sourceUrl: e.target.value })
                        }
                        className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm font-mono-tabular"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Photo URL</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={editingNews.imageUrl ?? ''}
                        onChange={(e) =>
                          setEditingNews({ ...editingNews, imageUrl: e.target.value })
                        }
                        className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm font-mono-tabular"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Summary (Arabic)</label>
                    <textarea
                      rows={3}
                      value={editingNews.localizedSummary?.ar ?? editingNews.summary}
                      onChange={(e) =>
                        setEditingNews({
                          ...editingNews,
                          summary: e.target.value,
                          localizedSummary: {
                            ...(editingNews.localizedSummary ?? { ar: '', en: '', fr: '' }),
                            ar: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingNews.isPublished !== false}
                        onChange={(e) =>
                          setEditingNews({ ...editingNews, isPublished: e.target.checked })
                        }
                        className="accent-[#1E3A8A]"
                      />
                      <span>Published on Homepage</span>
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingNews(null)}
                        className="rounded-md border border-[#D6CEBE] px-4 py-2 text-xs font-medium cursor-pointer"
                      >
                        {copy.cancelBtn}
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-5 py-2 text-xs font-semibold text-white cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{copy.confirmBtn}</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schoolNews.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-md border border-[#E5E0D8] bg-white p-4 flex flex-col justify-between gap-3"
                  >
                    <div className="flex gap-3">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 rounded object-cover border border-[#E5E0D8] shrink-0"
                        />
                      )}
                      <div>
                        <span className="font-mono-tabular text-xs font-semibold text-[#1E3A8A]">
                          {item.publishedDate}
                        </span>
                        <h3 className="mt-1 font-display text-sm font-semibold text-[#1C1917]">
                          {item.localizedTitle ? item.localizedTitle[lang] : item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-[#E5E0D8] pt-3">
                      <button
                        type="button"
                        onClick={() => openNewsEditor(item)}
                        className="inline-flex items-center gap-1 rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>{copy.editBtn}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPendingConfirm({
                            title: `${copy.deleteBtn}: ${item.title}`,
                            description:
                              lang === 'ar'
                                ? 'هل تريد حذف هذا الخبر من قاعدة بيانات المدرسة؟'
                                : 'Remove this school news dispatch from Firestore?',
                            confirmLabel: copy.deleteBtn,
                            isDanger: true,
                            onConfirm: async () => {
                              await deleteSchoolNewsFromDb(item.id);
                            },
                          })
                        }
                        className="inline-flex items-center gap-1 rounded border border-[#9A3412]/30 bg-[#9A3412]/5 px-3 py-1.5 text-xs font-medium text-[#9A3412] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{copy.deleteBtn}</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: SHOWCASE MODERATION & ADMINS */}
          {isAdmin && subTab === 'showcase' && (
            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                  {lang === 'ar' ? 'إدارة مشاركات الطلاب' : 'Student Showcase Moderation'} ({submissions.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {submissions.map((sub) => (
                    <article
                      key={sub.id}
                      className="rounded-md border border-[#E5E0D8] bg-white p-4 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#57534E]">
                          <span>
                            {sub.studentName} · {sub.grade}
                          </span>
                          <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                            {sub.votes} votes
                          </span>
                        </div>
                        <h3 className="mt-1 font-display text-base font-semibold text-[#1C1917]">
                          {sub.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#57534E] line-clamp-2">{sub.summary}</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[#E5E0D8] pt-3">
                        <button
                          type="button"
                          onClick={() =>
                            void updateSubmissionAdminInDb({
                              ...sub,
                              isFeatured: !sub.isFeatured,
                            })
                          }
                          className={`inline-flex items-center gap-1 rounded border px-3 py-1.5 text-xs font-medium cursor-pointer ${
                            sub.isFeatured
                              ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                              : 'border-[#D6CEBE] bg-[#FBF9F5] text-[#1C1917]'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{sub.isFeatured ? 'Featured' : 'Feature'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPendingConfirm({
                              title: `${copy.deleteBtn}: ${sub.title}`,
                              description:
                                lang === 'ar'
                                  ? 'حذف هذه المشاركة الطلابية من قاعدة البيانات؟'
                                  : 'Delete this student showcase entry from Firestore?',
                              confirmLabel: copy.deleteBtn,
                              isDanger: true,
                              onConfirm: async () => {
                                await deleteSubmissionFromDb(sub.id);
                              },
                            })
                          }
                          className="inline-flex items-center gap-1 rounded border border-[#9A3412]/30 bg-[#9A3412]/5 px-3 py-1.5 text-xs font-medium text-[#9A3412] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{copy.deleteBtn}</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Delegated Admin Management */}
              <section className="rounded-md border border-[#E5E0D8] bg-white p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                  {lang === 'ar' ? 'إدارة المشرفين (Admins)' : 'Delegated Administrators'}
                </h3>
                <p className="text-xs text-[#57534E] font-mono-tabular">
                  Primary Owner: {BOOTSTRAPPED_ADMIN_EMAIL}
                </p>

                <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Firebase User UID"
                    value={newAdminUid}
                    onChange={(e) => setNewAdminUid(e.target.value)}
                    className="rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-xs font-mono-tabular"
                  />
                  <input
                    type="email"
                    placeholder="Admin Email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="rounded border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-xs"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#172554] cursor-pointer"
                  >
                    {lang === 'ar' ? 'إضافة مشرف' : 'Add Admin'}
                  </button>
                </form>

                {adminMembers.length > 0 && (
                  <div className="space-y-2">
                    {adminMembers.map((adm) => (
                      <div
                        key={adm.uid}
                        className="flex items-center justify-between rounded border border-[#E5E0D8] bg-[#FBF9F5] px-3 py-2 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-[#1C1917]">{adm.email}</span>
                          <span className="ms-2 font-mono-tabular text-[#57534E]">{adm.uid}</span>
                        </div>
                        {adm.uid !== user.uid && (
                          <button
                            type="button"
                            onClick={() =>
                              setPendingConfirm({
                                title: `Remove Admin: ${adm.email}`,
                                description: 'Revoke admin editing rights for this account?',
                                confirmLabel: copy.deleteBtn,
                                isDanger: true,
                                onConfirm: async () => {
                                  await removeAdminMember(adm.uid);
                                  setAdminMembers(await listAdminMembers());
                                },
                              })
                            }
                            className="text-[#9A3412] hover:underline cursor-pointer"
                          >
                            {copy.deleteBtn}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {/* SUB-TAB 5: GOOGLE DRIVE WORKSPACE */}
          {subTab === 'drive' && (
            <section className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E5E0D8] pb-5">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                    {copy.driveTitle}
                  </h2>
                  <p className="mt-1 text-sm text-[#57534E]">{copy.driveDesc}</p>
                </div>

                {!driveAccessToken ? (
                  <GoogleSignInButton
                    label={copy.reconnectDrive}
                    loading={authLoading}
                    onClick={handleLoginClick}
                  />
                ) : (
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => void handleBackupToDrive()}
                      disabled={Boolean(busyMsg)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#172554] cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>{copy.driveBackupBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => void loadDriveFiles()}
                      disabled={driveLoading}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${driveLoading ? 'animate-spin' : ''}`} />
                      <span>{copy.driveRefresh}</span>
                    </button>
                  </div>
                )}
              </div>

              {driveAccessToken && (
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      void loadDriveFiles(driveSearch);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={driveSearch}
                      onChange={(e) => setDriveSearch(e.target.value)}
                      placeholder={copy.driveSearchPlaceholder}
                      className="flex-1 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm focus:border-[#1E3A8A] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-md border border-[#D6CEBE] bg-white px-4 py-2 text-xs sm:text-sm font-medium hover:bg-[#F2EFE9] cursor-pointer"
                    >
                      <FolderOpen className="w-4 h-4 inline me-1" />
                      <span>{copy.driveRefresh}</span>
                    </button>
                  </form>

                  {renamingFile && (
                    <div className="rounded-md border border-[#1E3A8A]/40 bg-[#FBF9F5] p-4 flex flex-wrap items-center gap-3">
                      <label className="text-xs font-semibold text-[#1C1917]">
                        {copy.driveRenamePrompt}:
                      </label>
                      <input
                        type="text"
                        value={renamingFile.name}
                        onChange={(e) =>
                          setRenamingFile({ ...renamingFile, name: e.target.value })
                        }
                        className="flex-1 min-w-[200px] rounded border border-[#D6CEBE] bg-white px-3 py-1.5 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPendingConfirm({
                            title: `Rename Google Drive File?`,
                            description: `Rename file to "${renamingFile.name}" on Google Drive?`,
                            confirmLabel: copy.confirmBtn,
                            onConfirm: async () => {
                              await renameDriveFile({
                                token: driveAccessToken,
                                fileId: renamingFile.id,
                                newName: renamingFile.name,
                              });
                              setRenamingFile(null);
                              await loadDriveFiles();
                            },
                          })
                        }
                        className="rounded bg-[#1E3A8A] px-3.5 py-1.5 text-xs font-semibold text-white cursor-pointer"
                      >
                        {copy.confirmBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRenamingFile(null)}
                        className="rounded border border-[#D6CEBE] px-3 py-1.5 text-xs cursor-pointer"
                      >
                        {copy.cancelBtn}
                      </button>
                    </div>
                  )}

                  {driveFiles.length === 0 ? (
                    <p className="text-sm text-[#57534E]">
                      {driveLoading
                        ? 'Loading Google Drive files...'
                        : lang === 'ar'
                          ? 'لا توجد ملفات مطابقة. يمكنك رفع نسخة احتياطية للمجلة الآن.'
                          : 'No files found. Click "Export CMS Backup to Drive" to create your first file.'}
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {driveFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="font-medium text-sm text-[#1C1917] truncate">{file.name}</p>
                            <p className="text-xs font-mono-tabular text-[#57534E]">
                              {file.mimeType}
                              {file.modifiedTime ? ` · ${file.modifiedTime.slice(0, 10)}` : ''}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded border border-[#D6CEBE] bg-white px-2.5 py-1 text-xs font-medium text-[#1E3A8A] hover:bg-[#F2EFE9]"
                              >
                                <span>Drive</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => setRenamingFile({ id: file.id, name: file.name })}
                              className="inline-flex items-center gap-1 rounded border border-[#D6CEBE] bg-white px-2.5 py-1 text-xs font-medium hover:bg-[#F2EFE9] cursor-pointer"
                            >
                              <Pencil className="w-3 h-3" />
                              <span>{copy.editBtn}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setPendingConfirm({
                                  title: `Move "${file.name}" to Google Drive Trash?`,
                                  description:
                                    lang === 'ar'
                                      ? `سيتم نقل الملف "${file.name}" إلى سلة المهملات في Google Drive.`
                                      : `This will move "${file.name}" to your Google Drive trash.`,
                                  confirmLabel: copy.deleteBtn,
                                  isDanger: true,
                                  onConfirm: async () => {
                                    await trashDriveFile({
                                      token: driveAccessToken,
                                      fileId: file.id,
                                    });
                                    await loadDriveFiles();
                                  },
                                })
                              }
                              className="inline-flex items-center gap-1 rounded border border-[#9A3412]/30 bg-white px-2.5 py-1 text-xs font-medium text-[#9A3412] hover:bg-[#9A3412]/5 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>{copy.deleteBtn}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </section>
          )}
        </>
      )}

      {/* Explicit React Confirmation Modal for ALL Mutating/Destructive Actions */}
      {pendingConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/60 p-4"
        >
          <div className="max-w-md w-full rounded-lg border border-[#D6CEBE] bg-white p-6 shadow-xl space-y-4">
            <h3 className="font-display text-lg font-semibold text-[#1C1917]">
              {pendingConfirm.title}
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed">{pendingConfirm.description}</p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPendingConfirm(null)}
                className="rounded-md border border-[#D6CEBE] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
              >
                {copy.cancelBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  const action = pendingConfirm;
                  setPendingConfirm(null);
                  setBusyMsg(action.confirmLabel);
                  setErrorMsg(null);
                  void action
                    .onConfirm()
                    .catch((err) =>
                      setErrorMsg(err instanceof Error ? err.message : 'Action failed.')
                    )
                    .finally(() => setBusyMsg(null));
                }}
                className={`rounded-md px-4 py-2 text-xs sm:text-sm font-semibold text-white cursor-pointer ${
                  pendingConfirm.isDanger
                    ? 'bg-[#9A3412] hover:bg-[#7C2D12]'
                    : 'bg-[#1E3A8A] hover:bg-[#172554]'
                }`}
              >
                {pendingConfirm.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
