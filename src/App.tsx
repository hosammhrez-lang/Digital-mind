import { useCallback, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  EditionMode,
  Lang,
  MagazineArticle,
  NavTab,
  SavedStudySummary,
  SchoolNewsDispatch,
  SiteHomepageSettings,
  StudentSubmission,
  StudyMode,
} from './types/magazine';
import { UI_COPY } from './data/translations';
import {
  INITIAL_SCHOOL_NEWS,
  INITIAL_SUBMISSIONS,
  ISSUE_01_ARTICLES,
  SCHOOL_FACEBOOK_URL,
} from './data/magazineData';
import {
  googleSignIn,
  initAuth,
  logout,
  testConnection,
} from './lib/firebase';
import {
  checkIsAdmin,
  createSubmissionInDb,
  DEFAULT_HOMEPAGE_SETTINGS,
  deleteSchoolNewsFromDb,
  saveSchoolNewsToDb,
  subscribeArticles,
  subscribeHomepageSettings,
  subscribeSchoolNews,
  subscribeSubmissions,
  upvoteSubmissionInDb,
} from './services/cmsDatabase';
import { addUniqueId, toggleIdInList } from './utils/magazineLogic';
import { TopBar } from './components/TopBar';
import { IssueView } from './components/IssueView';
import { NuhaAssistantView } from './components/NuhaAssistantView';
import { LabsView } from './components/LabsView';
import { GlossaryView } from './components/GlossaryView';
import { ShowcaseView } from './components/ShowcaseView';
import { LaunchHubView } from './components/LaunchHubView';
import { AdminControlPanelView } from './components/AdminControlPanelView';
import { ArticleReaderModal } from './components/ArticleReaderModal';

const BOOKMARKS_KEY = 'els_digital_minds_bookmarks_v1';
const READ_PROGRESS_KEY = 'els_digital_minds_read_v1';
const SUMMARIES_KEY = 'els_nuha_summaries_v1';

export default function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const [editionMode, setEditionMode] = useState<EditionMode>('standard');
  const [activeTab, setActiveTab] = useState<NavTab>('issue');
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);
  const [nuhaPreload, setNuhaPreload] = useState<{
    articleId: string;
    mode: StudyMode;
    autoRun?: boolean;
    nonce: number;
  } | null>(null);

  // Firebase Auth & Google Drive OAuth (in-memory only)
  const [user, setUser] = useState<User | null>(null);
  const [driveAccessToken, setDriveAccessToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Live Cloud Firestore CMS state with static editorial defaults before seeding
  const [siteSettings, setSiteSettings] = useState<SiteHomepageSettings>(DEFAULT_HOMEPAGE_SETTINGS);
  const [isSettingsFromDb, setIsSettingsFromDb] = useState(false);

  const [articles, setArticles] = useState<MagazineArticle[]>(ISSUE_01_ARTICLES);
  const [isArticlesFromDb, setIsArticlesFromDb] = useState(false);

  const [schoolNews, setSchoolNews] = useState<SchoolNewsDispatch[]>(INITIAL_SCHOOL_NEWS);
  const [isNewsFromDb, setIsNewsFromDb] = useState(false);

  const [submissions, setSubmissions] = useState<StudentSubmission[]>(INITIAL_SUBMISSIONS);
  const [isSubmissionsFromDb, setIsSubmissionsFromDb] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(BOOKMARKS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore parse errors
    }
    return [];
  });

  const [readArticleIds, setReadArticleIds] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(READ_PROGRESS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore parse errors
    }
    return ['ai-corner'];
  });

  const [savedSummaries, setSavedSummaries] = useState<SavedStudySummary[]>(() => {
    try {
      const saved = window.localStorage.getItem(SUMMARIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore parse errors
    }
    return [];
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    void testConnection();
    const unsubAuth = initAuth((authUser, token) => {
      setUser(authUser);
      setDriveAccessToken(token);
      if (authUser) {
        void checkIsAdmin(authUser).then((adminStatus) => {
          setIsAdmin(adminStatus);
          setIsAuthReady(true);
        });
      } else {
        setIsAdmin(false);
        setIsAuthReady(true);
      }
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    const unsubSettings = subscribeHomepageSettings((nextSettings, fromDb) => {
      setSiteSettings(nextSettings);
      setIsSettingsFromDb(fromDb);
    });
    const unsubArticles = subscribeArticles(isAdmin, (nextArticles, fromDb) => {
      setArticles(nextArticles);
      setIsArticlesFromDb(fromDb);
    });
    const unsubNews = subscribeSchoolNews(isAdmin, (nextNews, fromDb) => {
      setSchoolNews(nextNews);
      setIsNewsFromDb(fromDb);
    });
    const unsubSubs = subscribeSubmissions(isAdmin, (nextSubs, fromDb) => {
      setSubmissions(nextSubs);
      setIsSubmissionsFromDb(fromDb);
    });

    return () => {
      unsubSettings();
      unsubArticles();
      unsubNews();
      unsubSubs();
    };
  }, [isAdmin]);

  useEffect(() => {
    try {
      window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(READ_PROGRESS_KEY, JSON.stringify(readArticleIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [readArticleIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SUMMARIES_KEY, JSON.stringify(savedSummaries));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedSummaries]);

  const copy = UI_COPY[lang];

  const handleSignIn = async () => {
    const result = await googleSignIn();
    setUser(result.user);
    setDriveAccessToken(result.accessToken);
    const adminStatus = await checkIsAdmin(result.user);
    setIsAdmin(adminStatus);
  };

  const handleRequestDriveSignIn = async (): Promise<string | null> => {
    const result = await googleSignIn();
    setUser(result.user);
    setDriveAccessToken(result.accessToken);
    const adminStatus = await checkIsAdmin(result.user);
    setIsAdmin(adminStatus);
    return result.accessToken;
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setDriveAccessToken(null);
    setIsAdmin(false);
  };

  const handleOpenSubmit = () => {
    setActiveTab('showcase');
    setTimeout(() => {
      const el = document.getElementById('submission-form');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleAddSubmission = async (item: StudentSubmission) => {
    if (user?.emailVerified) {
      await createSubmissionInDb(item, user.uid);
      if (!isSubmissionsFromDb) {
        setSubmissions((prev) => [item, ...prev]);
      }
      return;
    }
    setSubmissions((prev) => [item, ...prev]);
  };

  const handleVoteSubmission = async (id: string) => {
    if (user?.emailVerified && isSubmissionsFromDb) {
      await upvoteSubmissionInDb(id);
      return;
    }
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, votes: item.votes + 1 } : item))
    );
  };

  const handleAddNews = async (item: SchoolNewsDispatch) => {
    if (isAdmin && user) {
      await saveSchoolNewsToDb(item, user.uid);
      return;
    }
    setSchoolNews((prev) => [item, ...prev]);
  };

  const handleRemoveNews = async (id: string) => {
    if (isAdmin && isNewsFromDb) {
      await deleteSchoolNewsFromDb(id);
      return;
    }
    setSchoolNews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => toggleIdInList(prev, id));
  };

  const handleMarkRead = useCallback((id: string) => {
    setReadArticleIds((prev) => addUniqueId(prev, id));
  }, []);

  const handleOpenArticle = (article: MagazineArticle) => {
    handleMarkRead(article.id);
    setSelectedArticle(article);
  };

  const handleSummarizeWithNuha = (articleId: string) => {
    setSelectedArticle(null);
    setNuhaPreload({
      articleId,
      mode: 'summarize',
      autoRun: false,
      nonce: Date.now(),
    });
    setActiveTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveSummary = (item: SavedStudySummary) => {
    setSavedSummaries((prev) => [item, ...prev]);
  };

  const handleDeleteSummary = (id: string) => {
    setSavedSummaries((prev) => prev.filter((item) => item.id !== id));
  };

  const publishedArticles = articles.filter((a) => a.isPublished !== false);
  const publishedNews = schoolNews.filter((n) => n.isPublished !== false);
  const publishedSubmissions = submissions.filter((s) => s.isPublished !== false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <TopBar
        brandTitle={siteSettings.brandTitle[lang]}
        nav={copy.nav}
        ctaLabel={copy.ctaSubmit}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSubmit={handleOpenSubmit}
      />

      {/* Workspace Utility Strip (below Top Bar, keeps Header clean per Top Bar Contract) */}
      <div className="no-print border-b border-[#E5E0D8] bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Trilingual Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#57534E] hidden sm:inline">
              {lang === 'ar' ? 'اللغة:' : lang === 'fr' ? 'Langue :' : 'Language:'}
            </span>
            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-[#F2EFE9] p-0.5"
            >
              {(
                [
                  { id: 'ar', label: 'العربية' },
                  { id: 'en', label: 'English' },
                  { id: 'fr', label: 'Français' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLang(opt.id)}
                  aria-pressed={lang === opt.id}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === opt.id
                      ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reading Mode Toggle (Standard vs Junior Explorer) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#57534E] hidden sm:inline">
              {copy.issueHeader.editionLabel}:
            </span>
            <div
              role="group"
              aria-label={copy.issueHeader.editionLabel}
              className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-[#F2EFE9] p-0.5"
            >
              <button
                type="button"
                onClick={() => setEditionMode('standard')}
                aria-pressed={editionMode === 'standard'}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  editionMode === 'standard'
                    ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {copy.issueHeader.editionStandard}
              </button>
              <button
                type="button"
                onClick={() => setEditionMode('junior')}
                aria-pressed={editionMode === 'junior'}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  editionMode === 'junior'
                    ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {copy.issueHeader.editionJunior}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-[1200px] px-4 sm:px-6 py-8 sm:py-10">
        {activeTab === 'issue' && (
          <IssueView
            lang={lang}
            editionMode={editionMode}
            copy={copy.issueHeader}
            readerCopy={copy.reader}
            siteSettings={siteSettings}
            articles={publishedArticles.length > 0 ? publishedArticles : ISSUE_01_ARTICLES}
            schoolNews={publishedNews}
            bookmarkedIds={bookmarkedIds}
            readArticleIds={readArticleIds}
            isAdmin={isAdmin}
            onToggleBookmark={handleToggleBookmark}
            onMarkRead={handleMarkRead}
            onAddNews={handleAddNews}
            onRemoveNews={handleRemoveNews}
            onOpenArticle={handleOpenArticle}
            onOpenNuhaWithArticle={handleSummarizeWithNuha}
            onOpenNuha={() => setActiveTab('assistant')}
            onGoToLabs={() => setActiveTab('labs')}
            onOpenAdmin={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'assistant' && (
          <NuhaAssistantView
            lang={lang}
            copy={copy.assistant}
            articles={publishedArticles.length > 0 ? publishedArticles : ISSUE_01_ARTICLES}
            savedSummaries={savedSummaries}
            driveAccessToken={driveAccessToken}
            preloadedRequest={nuhaPreload}
            onConsumePreload={() => setNuhaPreload(null)}
            onSaveSummary={handleSaveSummary}
            onDeleteSummary={handleDeleteSummary}
            onRequestDriveSignIn={handleRequestDriveSignIn}
          />
        )}

        {activeTab === 'labs' && <LabsView lang={lang} copy={copy.labs} />}

        {activeTab === 'glossary' && <GlossaryView lang={lang} copy={copy.glossary} />}

        {activeTab === 'showcase' && (
          <ShowcaseView
            lang={lang}
            copy={copy.showcase}
            submissions={publishedSubmissions}
            user={user}
            onSignIn={handleSignIn}
            onAddSubmission={handleAddSubmission}
            onVoteSubmission={handleVoteSubmission}
          />
        )}

        {activeTab === 'launch' && <LaunchHubView lang={lang} copy={copy.launch} />}

        {activeTab === 'admin' && (
          <AdminControlPanelView
            lang={lang}
            user={user}
            driveAccessToken={driveAccessToken}
            isAdmin={isAdmin}
            isAuthReady={isAuthReady}
            isSettingsFromDb={isSettingsFromDb}
            isArticlesFromDb={isArticlesFromDb}
            isNewsFromDb={isNewsFromDb}
            siteSettings={siteSettings}
            articles={articles}
            schoolNews={schoolNews}
            submissions={submissions}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="no-print border-t border-[#E5E0D8] bg-white py-6">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#57534E]">
          <p>{copy.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span>{copy.footer.editorialNote}</span>
            <span aria-hidden="true">·</span>
            <a
              href={SCHOOL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1E3A8A] hover:underline"
            >
              {lang === 'ar'
                ? 'صفحة المدرسة على فيسبوك'
                : lang === 'fr'
                  ? 'Page Facebook de l’école'
                  : 'ELS Official Facebook'}
            </a>
          </div>
        </div>
      </footer>

      {/* Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        articles={publishedArticles.length > 0 ? publishedArticles : ISSUE_01_ARTICLES}
        lang={lang}
        editionMode={editionMode}
        copy={copy.reader}
        minReadLabel={copy.issueHeader.minRead}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onNavigateArticle={handleOpenArticle}
        onSummarizeWithNuha={handleSummarizeWithNuha}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
