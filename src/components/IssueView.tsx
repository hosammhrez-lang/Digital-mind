import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Maximize2,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  EditionMode,
  IssueDisplayMode,
  Lang,
  MagazineArticle,
  SchoolNewsDispatch,
} from '../types/magazine';
import { UiCopy } from '../data/translations';
import { ISSUE_01_ARTICLES, MAGAZINE_GOALS, SCHOOL_LOGO_URL } from '../data/magazineData';
import { clampFlipbookPage } from '../utils/magazineLogic';
import { EditorialImage } from './EditorialImage';
import { QrCodeSvg } from './QrCodeSvg';
import { SchoolNewsSection } from './SchoolNewsSection';

interface IssueViewProps {
  lang: Lang;
  editionMode: EditionMode;
  copy: UiCopy['issueHeader'];
  readerCopy: UiCopy['reader'];
  schoolName: string;
  slogan: string;
  schoolNews: SchoolNewsDispatch[];
  bookmarkedIds: string[];
  readArticleIds: string[];
  onToggleBookmark: (id: string) => void;
  onMarkRead: (id: string) => void;
  onAddNews: (item: SchoolNewsDispatch) => void;
  onRemoveNews: (id: string) => void;
  onOpenArticle: (article: MagazineArticle) => void;
  onOpenNuhaWithArticle: (articleId: string) => void;
  onOpenNuha: () => void;
  onGoToLabs: () => void;
}

export function IssueView({
  lang,
  editionMode,
  copy,
  readerCopy,
  schoolName,
  slogan,
  schoolNews,
  bookmarkedIds,
  readArticleIds,
  onToggleBookmark,
  onMarkRead,
  onAddNews,
  onRemoveNews,
  onOpenArticle,
  onOpenNuhaWithArticle,
  onOpenNuha,
  onGoToLabs,
}: IssueViewProps) {
  const [displayMode, setDisplayMode] = useState<IssueDisplayMode>('spread');
  const [pageIndex, setPageIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);
  const [savedOnly, setSavedOnly] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const visibleArticles = savedOnly
    ? ISSUE_01_ARTICLES.filter((a) => bookmarkedIds.includes(a.id))
    : ISSUE_01_ARTICLES;

  const safeIndex = clampFlipbookPage(pageIndex, visibleArticles.length);
  const currentArticle = visibleArticles[safeIndex] ?? ISSUE_01_ARTICLES[0];

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    stopSpeech();
    if (currentArticle) {
      onMarkRead(currentArticle.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArticle?.id, lang]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleTurnPage = (nextIndex: number) => {
    const clamped = clampFlipbookPage(nextIndex, visibleArticles.length);
    setFlipDirection(clamped >= safeIndex ? 1 : -1);
    setPageIndex(clamped);
  };

  const handleToggleSpeech = (article: MagazineArticle) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      stopSpeech();
      return;
    }
    const textToRead =
      editionMode === 'junior'
        ? `${article.title[lang]}. ${article.juniorSummary[lang]}`
        : `${article.title[lang]}. ${article.subtitle[lang]}. ${article.body[lang].join(' ')}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const leadArticle = ISSUE_01_ARTICLES.find((a) => a.tier === 'lead') ?? ISSUE_01_ARTICLES[0];
  const secondaryArticles = ISSUE_01_ARTICLES.filter((a) => a.tier === 'secondary');
  const departmentArticles = ISSUE_01_ARTICLES.filter((a) => a.tier === 'department');
  const readPercent = Math.round((readArticleIds.length / ISSUE_01_ARTICLES.length) * 100);

  const kpiItems =
    lang === 'ar'
      ? [
          { value: '12', label: 'صفحة رقمية تفاعلية في العدد' },
          { value: `${readArticleIds.length}/12`, label: 'تقدّمك في قراءة المجلة' },
          { value: '15', label: 'مصطلحًا بثلاث لغات' },
          { value: '01', label: 'المساعد الذكي «نُهى» للدراسة' },
        ]
      : lang === 'fr'
        ? [
            { value: '12', label: 'Pages interactives du numéro' },
            { value: `${readArticleIds.length}/12`, label: 'Progression de lecture' },
            { value: '15', label: 'Termes en trois langues' },
            { value: '01', label: 'Assistant d’étude IA Nuha' },
          ]
        : [
            { value: '12', label: 'Interactive E-Magazine Pages' },
            { value: `${readArticleIds.length}/12`, label: 'Your Issue Reading Progress' },
            { value: '15', label: 'Trilingual Tech Glossary Terms' },
            { value: '01', label: 'Nuha Personal AI Study Tutor' },
          ];

  const isCurrentBookmarked = currentArticle ? bookmarkedIds.includes(currentArticle.id) : false;

  return (
    <div className="space-y-14">
      {/* Interactive E-Magazine Cover Masthead */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-b border-[#E5E0D8] pb-10">
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-mono-tabular font-semibold text-[#1E3A8A] tracking-wide">
              {copy.volumeLine}
            </p>
            <h1
              className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#1C1917] leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {copy.issueTitle}
            </h1>
            <div className="mt-4 flex items-center gap-3 max-w-xl">
              <img
                src={SCHOOL_LOGO_URL}
                alt="Egyptian Language School Logo"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-contain border border-[#E5E0D8] bg-white p-0.5 shrink-0"
              />
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                {schoolName} — <span className="font-medium text-[#1C1917]">{slogan}</span>
              </p>
            </div>

            {/* Magazine Reading Progress Bar */}
            <div className="mt-6 rounded-md border border-[#E5E0D8] bg-white p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1C1917]">
                  {readArticleIds.length} / {ISSUE_01_ARTICLES.length} {copy.readProgress}
                </span>
                <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                  {readPercent}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#EFECE5]">
                <div
                  className="h-full bg-[#1E3A8A] transition-all duration-300"
                  style={{ width: `${readPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#interactive-flipbook"
              onClick={() => setDisplayMode('spread')}
              className="inline-flex items-center gap-2 rounded-md bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#172554] transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>{copy.readLead}</span>
            </a>

            <button
              type="button"
              onClick={onOpenNuha}
              className="inline-flex items-center gap-2 rounded-md border border-[#1E3A8A]/40 bg-white px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] hover:bg-[#1E3A8A]/5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>
                {lang === 'ar'
                  ? 'اسأل المساعد الذكي نُهى'
                  : lang === 'fr'
                    ? 'Ouvrir l’assistant Nuha'
                    : 'Open AI Tutor Nuha'}
              </span>
            </button>

            <button
              type="button"
              onClick={onGoToLabs}
              className="inline-flex items-center gap-2 rounded-md border border-[#D6CEBE] bg-white px-4 py-2.5 text-sm font-medium text-[#1C1917] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
            >
              {lang === 'ar'
                ? 'المختبرات'
                : lang === 'fr'
                  ? 'Ateliers'
                  : 'Labs'}
            </button>
          </div>
        </div>

        {/* Right Hero: Framed Digital Magazine Cover Spread */}
        <div className="lg:col-span-6 flex">
          <div className="relative flex-1 flex flex-col rounded-lg border-2 border-[#D6CEBE] bg-white p-3 sm:p-4 shadow-md">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-2 mb-3 text-[11px] font-mono-tabular text-[#57534E]">
              <span>ELS · DOHA · E-EDITION</span>
              <span className="font-semibold text-[#1E3A8A]">ISSUE N° 01 / 2026</span>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-md border border-[#E5E0D8] bg-[#EFECE5]">
              <EditorialImage
                src="/src/assets/images/hero_digital_minds_1795166809525.jpg"
                alt={
                  lang === 'ar'
                    ? 'غلاف العدد الأول من مجلة عقول رقمية الإلكترونية'
                    : lang === 'fr'
                      ? 'Couverture du Numéro 01 d’Esprits Numériques'
                      : 'Digital Minds Issue 01 Interactive E-Magazine Cover'
                }
                className="w-full h-64 sm:h-80 lg:h-full object-cover"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
              <span>
                {lang === 'ar'
                  ? 'مقال الغلاف: كيف يساعدنا الذكاء الاصطناعي؟'
                  : lang === 'fr'
                    ? 'À la une : L’IA au service des élèves'
                    : 'Cover Story: Learning Smarter with AI'}
              </span>
              <button
                type="button"
                onClick={() => onOpenArticle(leadArticle)}
                className="inline-flex items-center gap-1 font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
              >
                <span>{copy.readArticle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Operational KPI Strip */}
      <section aria-label="Publication overview metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiItems.map((item) => (
          <div
            key={item.label}
            className="rounded-md border border-[#E5E0D8] bg-white p-5"
          >
            <p className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#1E3A8A]">
              {item.value}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#57534E]">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Interactive Electronic Magazine Reader Section */}
      <section id="interactive-flipbook" aria-labelledby="flipbook-section-heading" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E0D8] pb-4">
          <div>
            <h2 id="flipbook-section-heading" className="font-display text-2xl font-semibold text-[#1C1917]">
              {copy.tocTitle}
            </h2>
            <p className="mt-1 text-sm text-[#57534E]">{copy.departmentsSubtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Bookmark Filter Toggle */}
            <button
              type="button"
              onClick={() => {
                setSavedOnly((prev) => !prev);
                setPageIndex(0);
              }}
              aria-pressed={savedOnly}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                savedOnly
                  ? 'border-[#1E3A8A] bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold'
                  : 'border-[#D6CEBE] bg-white text-[#1C1917] hover:bg-[#F2EFE9]'
              }`}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${savedOnly ? 'fill-[#1E3A8A]' : ''}`}
                aria-hidden="true"
              />
              <span>
                {copy.bookmarkSaved} ({bookmarkedIds.length})
              </span>
            </button>

            {/* Spread vs Grid Switcher */}
            <div
              role="group"
              aria-label="Magazine view mode"
              className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-[#F2EFE9] p-0.5"
            >
              <button
                type="button"
                onClick={() => setDisplayMode('spread')}
                aria-pressed={displayMode === 'spread'}
                className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  displayMode === 'spread'
                    ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copy.viewSpread}</span>
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('grid')}
                aria-pressed={displayMode === 'grid'}
                className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  displayMode === 'grid'
                    ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copy.viewGrid}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mode 1: Two-Page Interactive Digital Magazine Flipbook Spread */}
        {displayMode === 'spread' && (
          <div className="rounded-xl border-2 border-[#D6CEBE] bg-[#F2EFE9] p-2 sm:p-4 shadow-lg">
            {visibleArticles.length === 0 ? (
              <div className="rounded-lg bg-white p-10 text-center space-y-3">
                <p className="text-sm text-[#57534E]">
                  {lang === 'ar'
                    ? 'لا توجد مقالات محفوظة في المفضلة بعد. اضغط على أيقونة الحفظ لإضافة مقال.'
                    : lang === 'fr'
                      ? 'Aucun article enregistré pour le moment.'
                      : 'No bookmarked articles yet. Click Save Bookmark on any spread page.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSavedOnly(false)}
                  className="rounded-md bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white cursor-pointer"
                >
                  {lang === 'ar' ? 'عرض جميع الصفحات' : lang === 'fr' ? 'Voir toutes les pages' : 'Show All Pages'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 rounded-lg border border-[#D6CEBE] bg-white overflow-hidden">
                {/* Left / Start Folio Page: Interactive Table of Contents Spine */}
                <aside className="lg:col-span-4 border-b lg:border-b-0 lg:border-e border-[#E5E0D8] bg-[#FBF9F5] p-4 sm:p-5 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 mb-3">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        {copy.tocTitle}
                      </span>
                      <span className="font-mono-tabular text-xs font-semibold text-[#1E3A8A]">
                        {String(safeIndex + 1).padStart(2, '0')} / {String(visibleArticles.length).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="space-y-1 max-h-[460px] overflow-y-auto pe-1">
                      {visibleArticles.map((art, idx) => {
                        const isSelected = idx === safeIndex;
                        const isRead = readArticleIds.includes(art.id);
                        const isSaved = bookmarkedIds.includes(art.id);
                        return (
                          <button
                            key={art.id}
                            type="button"
                            onClick={() => handleTurnPage(idx)}
                            className={`w-full text-start rounded-md px-3 py-2.5 text-xs transition-colors flex items-start justify-between gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-[#1E3A8A] text-white font-semibold'
                                : 'text-[#1C1917] hover:bg-[#EFECE5]'
                            }`}
                          >
                            <div className="flex items-start gap-2 min-w-0">
                              <span
                                className={`font-mono-tabular shrink-0 ${
                                  isSelected ? 'text-white/90' : 'text-[#1E3A8A] font-semibold'
                                }`}
                              >
                                {art.departmentNumber}
                              </span>
                              <span className="leading-snug line-clamp-2">
                                {art.department[lang]}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0 pt-0.5">
                              {isSaved && (
                                <Bookmark
                                  className={`w-3.5 h-3.5 ${
                                    isSelected ? 'fill-white text-white' : 'fill-[#1E3A8A] text-[#1E3A8A]'
                                  }`}
                                  aria-hidden="true"
                                />
                              )}
                              {isRead && (
                                <CheckCircle2
                                  className={`w-3.5 h-3.5 ${
                                    isSelected ? 'text-white/90' : 'text-[#14532D]'
                                  }`}
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Spread Tip */}
                  <div className="rounded-md border border-[#E5E0D8] bg-white p-3 text-[11px] text-[#57534E] leading-relaxed">
                    {lang === 'ar'
                      ? 'تصفّح صفحات العدد كالمجلة الورقية، أو اطلب من «نُهى» تلخيص أي صفحة في نقاط للمذاكرة.'
                      : lang === 'fr'
                        ? 'Feuilletez chaque rubrique ou demandez à Nuha d’en créer une fiche de révision.'
                        : 'Flip through all 12 pages like an editorial spread or send any page straight to Nuha AI.'}
                  </div>
                </aside>

                {/* Right / End Magazine Spread Canvas */}
                <div className="lg:col-span-8 flex flex-col justify-between bg-white p-5 sm:p-8 min-h-[540px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.article
                      key={currentArticle.id}
                      initial={{ opacity: 0, x: flipDirection * (lang === 'ar' ? -18 : 18) }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: flipDirection * (lang === 'ar' ? 18 : -18) }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="space-y-5"
                    >
                      {/* Page Toolbar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D8] pb-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                          <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                            {copy.pageWord} {String(safeIndex + 1).padStart(2, '0')}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-[#1C1917]">
                            {currentArticle.department[lang]}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {currentArticle.readTimeMin} {copy.minRead}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleSpeech(currentArticle)}
                            className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                              isSpeaking
                                ? 'border-[#9A3412]/40 bg-[#9A3412]/10 text-[#9A3412]'
                                : 'border-[#E5E0D8] bg-[#FBF9F5] text-[#1C1917] hover:bg-[#F2EFE9]'
                            }`}
                          >
                            {isSpeaking ? (
                              <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5 text-[#1E3A8A]" aria-hidden="true" />
                            )}
                            <span>{isSpeaking ? copy.stopListening : copy.listenArticle}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleBookmark(currentArticle.id)}
                            aria-pressed={isCurrentBookmarked}
                            className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                              isCurrentBookmarked
                                ? 'border-[#1E3A8A]/40 bg-[#1E3A8A]/10 text-[#1E3A8A]'
                                : 'border-[#E5E0D8] bg-[#FBF9F5] text-[#1C1917] hover:bg-[#F2EFE9]'
                            }`}
                          >
                            <Bookmark
                              className={`w-3.5 h-3.5 ${isCurrentBookmarked ? 'fill-[#1E3A8A]' : ''}`}
                              aria-hidden="true"
                            />
                            <span>{isCurrentBookmarked ? copy.bookmarkSaved : copy.bookmarkAdd}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onOpenNuhaWithArticle(currentArticle.id)}
                            className="inline-flex items-center gap-1 rounded-md bg-[#1E3A8A] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#172554] transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{copy.summarizeWithAi}</span>
                          </button>
                        </div>
                      </div>

                      {/* Article Title & Author */}
                      <header>
                        <h3
                          className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[#1C1917] leading-snug"
                          style={{ textWrap: 'balance' }}
                        >
                          {currentArticle.title[lang]}
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-[#57534E] leading-relaxed">
                          {currentArticle.subtitle[lang]}
                        </p>
                        <p className="mt-2 text-xs text-[#57534E]">
                          {readerCopy.authorLabel}:{' '}
                          <span className="font-medium text-[#1C1917]">{currentArticle.author[lang]}</span>
                        </p>
                      </header>

                      {/* Optional Spread Photography */}
                      {currentArticle.imageUrl && (
                        <figure>
                          <EditorialImage
                            src={currentArticle.imageUrl}
                            alt={currentArticle.title[lang]}
                            className="w-full h-56 sm:h-64 object-cover rounded-md border border-[#E5E0D8]"
                          />
                          {currentArticle.imageCaption && (
                            <figcaption className="mt-1.5 text-xs text-[#57534E] italic">
                              {currentArticle.imageCaption[lang]}
                            </figcaption>
                          )}
                        </figure>
                      )}

                      {/* Editorial Body Paragraphs */}
                      <div className="space-y-3 text-sm sm:text-base text-[#1C1917] leading-relaxed max-w-prose">
                        {editionMode === 'junior' ? (
                          <div className="rounded-md border border-[#D6CEBE] bg-[#FBF9F5] p-4">
                            <p className="text-xs font-semibold text-[#1E3A8A] mb-1.5">
                              {readerCopy.juniorNote}
                            </p>
                            <p>{currentArticle.juniorSummary[lang]}</p>
                          </div>
                        ) : (
                          currentArticle.body[lang].map((para, idx) => (
                            <p
                              key={idx}
                              className={
                                idx === 0 && lang !== 'ar'
                                  ? 'first-letter:font-display first-letter:text-4xl first-letter:font-semibold first-letter:me-2 first-letter:float-start first-letter:leading-none first-letter:text-[#1E3A8A]'
                                  : ''
                              }
                            >
                              {para}
                            </p>
                          ))
                        )}
                      </div>

                      {/* Takeaway + QR Strip */}
                      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-4">
                        <div>
                          <p className="text-xs font-semibold text-[#1E3A8A] mb-1">
                            {readerCopy.keyTakeaway}
                          </p>
                          <p className="text-sm font-medium text-[#1C1917]">
                            {currentArticle.keyTakeaway[lang]}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <QrCodeSvg
                            value={`https://els.edu.eg/digital-minds/${currentArticle.qrSlug}`}
                            label={currentArticle.title[lang]}
                            size={64}
                          />
                          <button
                            type="button"
                            onClick={() => onOpenArticle(currentArticle)}
                            className="inline-flex items-center gap-1 rounded-md border border-[#D6CEBE] bg-white px-3 py-1.5 text-xs font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer whitespace-nowrap"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-[#1E3A8A]" aria-hidden="true" />
                            <span>{copy.readArticle}</span>
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>

                  {/* Bottom Page Flipper Controls */}
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#E5E0D8] pt-4">
                    <button
                      type="button"
                      disabled={safeIndex <= 0}
                      onClick={() => handleTurnPage(safeIndex - 1)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-4 py-2 text-xs sm:text-sm font-semibold text-[#1C1917] hover:bg-[#EFECE5] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {lang === 'ar' ? (
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      )}
                      <span>{copy.prevPage}</span>
                    </button>

                    <span className="font-mono-tabular text-xs font-semibold text-[#57534E]">
                      {copy.pageWord} {String(safeIndex + 1).padStart(2, '0')} /{' '}
                      {String(visibleArticles.length).padStart(2, '0')}
                    </span>

                    <button
                      type="button"
                      disabled={safeIndex >= visibleArticles.length - 1}
                      onClick={() => handleTurnPage(safeIndex + 1)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#172554] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span>{copy.nextPage}</span>
                      {lang === 'ar' ? (
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mode 2: Full Editorial Grid View */}
        {displayMode === 'grid' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Lead Feature Card */}
              <article className="lg:col-span-7 flex flex-col justify-between rounded-md border border-[#E5E0D8] bg-white overflow-hidden">
                {leadArticle.imageUrl && (
                  <div className="h-64 sm:h-72 overflow-hidden border-b border-[#E5E0D8] bg-[#EFECE5]">
                    <EditorialImage
                      src={leadArticle.imageUrl}
                      alt={leadArticle.title[lang]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                      <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                        {leadArticle.departmentNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-[#1C1917]">{leadArticle.department[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">
                        {leadArticle.readTimeMin} {copy.minRead}
                      </span>
                    </div>
                    <h3
                      className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-[#1C1917] leading-snug"
                      style={{ textWrap: 'balance' }}
                    >
                      {leadArticle.title[lang]}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#57534E] leading-relaxed">
                      {editionMode === 'junior'
                        ? leadArticle.juniorSummary[lang]
                        : leadArticle.subtitle[lang]}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E0D8] pt-4">
                    <span className="text-xs text-[#57534E]">{leadArticle.author[lang]}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenNuhaWithArticle(leadArticle.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#57534E] hover:text-[#1E3A8A] cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{copy.summarizeWithAi}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenArticle(leadArticle)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>{copy.readArticle}</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Secondary Features Column */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {secondaryArticles.map((article) => (
                  <article
                    key={article.id}
                    className="flex-1 flex flex-col justify-between rounded-md border border-[#E5E0D8] bg-white overflow-hidden"
                  >
                    {article.imageUrl && (
                      <div className="h-44 overflow-hidden border-b border-[#E5E0D8] bg-[#EFECE5]">
                        <EditorialImage
                          src={article.imageUrl}
                          alt={article.title[lang]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#57534E]">
                          <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                            {article.departmentNumber}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-[#1C1917]">{article.department[lang]}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {article.readTimeMin} {copy.minRead}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-lg sm:text-xl font-semibold text-[#1C1917] leading-snug">
                          {article.title[lang]}
                        </h3>
                        <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                          {editionMode === 'junior'
                            ? article.juniorSummary[lang]
                            : article.subtitle[lang]}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 border-t border-[#E5E0D8] pt-3">
                        <span className="text-xs text-[#57534E] truncate">{article.author[lang]}</span>
                        <button
                          type="button"
                          onClick={() => onOpenArticle(article)}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <span>{copy.readArticle}</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentArticles.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col justify-between rounded-md border border-[#E5E0D8] bg-white p-5 sm:p-6 hover:border-[#1E3A8A]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#57534E]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                          {article.departmentNumber}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-[#1C1917]">{article.department[lang]}</span>
                      </div>
                      {article.isBonus && (
                        <span className="text-xs font-medium text-[#9A3412]">
                          {copy.bonusBadge}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-display text-lg font-semibold text-[#1C1917] leading-snug">
                      {article.title[lang]}
                    </h3>
                    <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                      {editionMode === 'junior'
                        ? article.juniorSummary[lang]
                        : article.subtitle[lang]}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E5E0D8] pt-3">
                    <span className="text-xs font-mono-tabular text-[#57534E]">
                      {article.readTimeMin} {copy.minRead}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenArticle(article)}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1E3A8A] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>{copy.readArticle}</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* School Official Facebook News & Dispatches (with real Facebook photos) */}
      <SchoolNewsSection
        lang={lang}
        dispatches={schoolNews}
        onAddDispatch={onAddNews}
        onRemoveDispatch={onRemoveNews}
      />

      {/* Seven Guiding Goals */}
      <section aria-labelledby="goals-heading" className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8">
        <h2 id="goals-heading" className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
          {copy.goalsTitle}
        </h2>
        <ol className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          {MAGAZINE_GOALS.map((goal, idx) => (
            <li key={idx} className="flex items-baseline gap-3 border-b border-[#F2EFE9] pb-3">
              <span className="font-mono-tabular text-xs font-semibold text-[#1E3A8A] shrink-0">
                0{idx + 1}.
              </span>
              <span className="text-sm text-[#1C1917] leading-relaxed">{goal[lang]}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
