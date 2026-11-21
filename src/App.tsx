import { useCallback, useEffect, useState } from 'react';
import {
  EditionMode,
  Lang,
  MagazineArticle,
  NavTab,
  SavedStudySummary,
  SchoolNewsDispatch,
  StudentSubmission,
  StudyMode,
} from './types/magazine';
import { UI_COPY } from './data/translations';
import {
  INITIAL_SCHOOL_NEWS,
  INITIAL_SUBMISSIONS,
  SCHOOL_FACEBOOK_URL,
} from './data/magazineData';
import { addUniqueId, toggleIdInList } from './utils/magazineLogic';
import { TopBar } from './components/TopBar';
import { IssueView } from './components/IssueView';
import { NuhaAssistantView } from './components/NuhaAssistantView';
import { LabsView } from './components/LabsView';
import { GlossaryView } from './components/GlossaryView';
import { ShowcaseView } from './components/ShowcaseView';
import { LaunchHubView } from './components/LaunchHubView';
import { ArticleReaderModal } from './components/ArticleReaderModal';

const STORAGE_KEY = 'els_digital_minds_submissions_v1';
const NEWS_STORAGE_KEY = 'els_digital_minds_news_v3';
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

  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial seed data
    }
    return INITIAL_SUBMISSIONS;
  });

  const [schoolNews, setSchoolNews] = useState<SchoolNewsDispatch[]>(() => {
    try {
      const saved = window.localStorage.getItem(NEWS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial news seed
    }
    return INITIAL_SCHOOL_NEWS;
  });

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
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // Ignore storage quota errors
    }
  }, [submissions]);

  useEffect(() => {
    try {
      window.localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(schoolNews));
    } catch {
      // Ignore storage quota errors
    }
  }, [schoolNews]);

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

  const handleOpenSubmit = () => {
    setActiveTab('showcase');
    setTimeout(() => {
      const el = document.getElementById('submission-form');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleAddSubmission = (item: StudentSubmission) => {
    setSubmissions((prev) => [item, ...prev]);
  };

  const handleVoteSubmission = (id: string) => {
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, votes: item.votes + 1 } : item))
    );
  };

  const handleAddNews = (item: SchoolNewsDispatch) => {
    setSchoolNews((prev) => [item, ...prev]);
  };

  const handleRemoveNews = (id: string) => {
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <TopBar
        brandTitle={copy.brandTitle}
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
            schoolName={copy.schoolName}
            slogan={copy.slogan}
            schoolNews={schoolNews}
            bookmarkedIds={bookmarkedIds}
            readArticleIds={readArticleIds}
            onToggleBookmark={handleToggleBookmark}
            onMarkRead={handleMarkRead}
            onAddNews={handleAddNews}
            onRemoveNews={handleRemoveNews}
            onOpenArticle={handleOpenArticle}
            onOpenNuhaWithArticle={handleSummarizeWithNuha}
            onOpenNuha={() => setActiveTab('assistant')}
            onGoToLabs={() => setActiveTab('labs')}
          />
        )}

        {activeTab === 'assistant' && (
          <NuhaAssistantView
            lang={lang}
            copy={copy.assistant}
            savedSummaries={savedSummaries}
            preloadedRequest={nuhaPreload}
            onConsumePreload={() => setNuhaPreload(null)}
            onSaveSummary={handleSaveSummary}
            onDeleteSummary={handleDeleteSummary}
          />
        )}

        {activeTab === 'labs' && <LabsView lang={lang} copy={copy.labs} />}

        {activeTab === 'glossary' && <GlossaryView lang={lang} copy={copy.glossary} />}

        {activeTab === 'showcase' && (
          <ShowcaseView
            lang={lang}
            copy={copy.showcase}
            submissions={submissions}
            onAddSubmission={handleAddSubmission}
            onVoteSubmission={handleVoteSubmission}
          />
        )}

        {activeTab === 'launch' && <LaunchHubView lang={lang} copy={copy.launch} />}
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
