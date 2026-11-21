import { useEffect, useRef, useState } from 'react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { EditionMode, Lang, MagazineArticle } from '../types/magazine';
import { UiCopy } from '../data/translations';
import { EditorialImage } from './EditorialImage';
import { QrCodeSvg } from './QrCodeSvg';

interface ArticleReaderModalProps {
  article: MagazineArticle | null;
  articles: MagazineArticle[];
  lang: Lang;
  editionMode: EditionMode;
  copy: UiCopy['reader'];
  minReadLabel: string;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onNavigateArticle: (article: MagazineArticle) => void;
  onSummarizeWithNuha: (articleId: string) => void;
  onClose: () => void;
}

type FontScale = 'sm' | 'md' | 'lg';

export function ArticleReaderModal({
  article,
  articles,
  lang,
  editionMode,
  copy,
  minReadLabel,
  isBookmarked,
  onToggleBookmark,
  onNavigateArticle,
  onSummarizeWithNuha,
  onClose,
}: ArticleReaderModalProps) {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontScale, setFontScale] = useState<FontScale>('md');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    setScrollProgress(0);
    scrollContainerRef.current?.scrollTo({ top: 0 });
    stopSpeech();
    return () => {
      stopSpeech();
    };
  }, [article?.id, lang]);

  useEffect(() => {
    if (!article) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopSpeech();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [article, onClose]);

  if (!article) return null;

  const currentIdx = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIdx > 0 ? articles[currentIdx - 1] : null;
  const nextArticle =
    currentIdx >= 0 && currentIdx < articles.length - 1
      ? articles[currentIdx + 1]
      : null;

  const paragraphs = article.body[lang];

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    if (isSpeaking) {
      stopSpeech();
      return;
    }
    const textToRead =
      editionMode === 'junior'
        ? `${article.title[lang]}. ${article.juniorSummary[lang]}`
        : `${article.title[lang]}. ${article.subtitle[lang]}. ${paragraphs.join(' ')}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    setScrollProgress(Math.min(100, Math.round((el.scrollTop / maxScroll) * 100)));
  };

  const textClass =
    fontScale === 'sm'
      ? 'text-sm leading-relaxed'
      : fontScale === 'lg'
        ? 'text-lg leading-loose'
        : 'text-base leading-relaxed';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-article-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/65 p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          stopSpeech();
          onClose();
        }
      }}
    >
      <article
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-[#D6CEBE] bg-[#FBF9F5] shadow-2xl"
      >
        {/* Reading Progress Bar */}
        <div className="sticky top-0 z-10 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-[#E5E0D8]">
          <div className="h-1 w-full bg-[#EFECE5]">
            <div
              className="h-full bg-[#1E3A8A] transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          <div className="px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
              <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                {article.departmentNumber}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#1C1917]">{article.department[lang]}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">
                {article.readTimeMin} {minReadLabel}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Font Size Selector */}
              <div
                role="group"
                aria-label={copy.fontSizeLabel}
                className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-white p-0.5 text-xs"
              >
                {(
                  [
                    { id: 'sm', label: 'A-' },
                    { id: 'md', label: 'A' },
                    { id: 'lg', label: 'A+' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFontScale(opt.id)}
                    aria-pressed={fontScale === opt.id}
                    className={`rounded px-2 py-1 font-mono-tabular transition-colors cursor-pointer ${
                      fontScale === opt.id
                        ? 'bg-[#1E3A8A] text-white font-semibold'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Audio Listen */}
              <button
                type="button"
                onClick={handleToggleSpeech}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isSpeaking
                    ? 'border-[#9A3412]/40 bg-[#9A3412]/10 text-[#9A3412]'
                    : 'border-[#E5E0D8] bg-white text-[#1C1917] hover:bg-[#F2EFE9]'
                }`}
              >
                {isSpeaking ? (
                  <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#1E3A8A]" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">
                  {isSpeaking ? copy.stopListenLabel : copy.listenLabel}
                </span>
              </button>

              {/* Bookmark Toggle */}
              <button
                type="button"
                onClick={() => onToggleBookmark(article.id)}
                aria-pressed={isBookmarked}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'border-[#1E3A8A]/40 bg-[#1E3A8A]/10 text-[#1E3A8A]'
                    : 'border-[#E5E0D8] bg-white text-[#1C1917] hover:bg-[#F2EFE9]'
                }`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#1E3A8A]' : ''}`}
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">
                  {isBookmarked ? copy.bookmarkedLabel : copy.bookmarkLabel}
                </span>
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  onClose();
                }}
                aria-label={copy.close}
                className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-xs font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span>{copy.close}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <header>
            <h2
              id="reader-article-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917] leading-snug"
              style={{ textWrap: 'balance' }}
            >
              {article.title[lang]}
            </h2>
            <p className="mt-3 text-base text-[#57534E] leading-relaxed">
              {article.subtitle[lang]}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D8] pb-4">
              <p className="text-xs text-[#57534E]">
                {copy.authorLabel}: <span className="font-medium text-[#1C1917]">{article.author[lang]}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  onSummarizeWithNuha(article.id);
                }}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#172554] transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copy.summarizeWithNuha}</span>
              </button>
            </div>
          </header>

          {article.imageUrl && (
            <figure className="mt-6">
              <EditorialImage
                src={article.imageUrl}
                alt={article.title[lang]}
                className="w-full h-64 sm:h-80 object-cover rounded-md border border-[#E5E0D8]"
              />
              {article.imageCaption && (
                <figcaption className="mt-2 text-xs text-[#57534E] italic">
                  {article.imageCaption[lang]}
                </figcaption>
              )}
            </figure>
          )}

          <div className="mt-6 max-w-2xl space-y-4 text-[#1C1917]">
            {editionMode === 'junior' ? (
              <div className="rounded-md border border-[#D6CEBE] bg-white p-5">
                <p className="text-xs font-semibold text-[#1E3A8A] mb-2">
                  {copy.juniorNote}
                </p>
                <p className={textClass}>{article.juniorSummary[lang]}</p>
              </div>
            ) : (
              paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0 && lang !== 'ar'
                      ? `${textClass} first-letter:font-display first-letter:text-4xl first-letter:font-semibold first-letter:me-2 first-letter:float-start first-letter:leading-none first-letter:text-[#1E3A8A]`
                      : textClass
                  }
                >
                  {para}
                </p>
              ))
            )}
          </div>

          {/* Key Takeaway & Companion QR Block */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-center border-t border-[#E5E0D8] pt-6">
            <div className="rounded-md border border-[#E5E0D8] bg-white p-4">
              <p className="text-xs font-semibold text-[#1E3A8A] mb-1">
                {copy.keyTakeaway}
              </p>
              <p className="text-sm font-medium text-[#1C1917] leading-relaxed">
                {article.keyTakeaway[lang]}
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-md border border-[#E5E0D8] bg-white p-3">
              <QrCodeSvg
                value={`https://els.edu.eg/digital-minds/${article.qrSlug}`}
                label={`${copy.qrTitle}: ${article.title[lang]}`}
                size={84}
              />
              <div className="max-w-[160px]">
                <p className="text-xs font-semibold text-[#1C1917]">{copy.qrTitle}</p>
                <p className="mt-1 text-xs text-[#57534E] leading-snug">
                  {copy.qrSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Page Navigation */}
          <nav
            aria-label="Article pagination"
            className="mt-8 flex items-center justify-between gap-4 border-t border-[#E5E0D8] pt-5"
          >
            <button
              type="button"
              disabled={!prevArticle}
              onClick={() => prevArticle && onNavigateArticle(prevArticle)}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#D6CEBE] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#1C1917] hover:bg-[#F2EFE9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {lang === 'ar' ? (
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              ) : (
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              )}
              <span>{copy.prevArticle}</span>
            </button>

            <span className="font-mono-tabular text-xs font-semibold text-[#57534E]">
              {String(currentIdx + 1).padStart(2, '0')} / {articles.length}
            </span>

            <button
              type="button"
              disabled={!nextArticle}
              onClick={() => nextArticle && onNavigateArticle(nextArticle)}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#D6CEBE] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#1C1917] hover:bg-[#F2EFE9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{copy.nextArticle}</span>
              {lang === 'ar' ? (
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>
      </article>
    </div>
  );
}
