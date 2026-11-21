import { FormEvent, useEffect, useState } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  FileText,
  HardDrive,
  HelpCircle,
  Layers,
  MessageSquare,
  Printer,
  RotateCcw,
  Send,
  Trash2,
} from 'lucide-react';
import {
  ChatTurn,
  Lang,
  MagazineArticle,
  SavedStudySummary,
  StudyMode,
} from '../types/magazine';
import { UiCopy } from '../data/translations';
import { uploadFileToDrive } from '../services/driveService';
import { createSavedSummaryRecord, validateStudyInput } from '../utils/magazineLogic';

interface NuhaAssistantViewProps {
  lang: Lang;
  copy: UiCopy['assistant'];
  articles: MagazineArticle[];
  savedSummaries: SavedStudySummary[];
  driveAccessToken: string | null;
  preloadedRequest: {
    articleId: string;
    mode: StudyMode;
    autoRun?: boolean;
    nonce: number;
  } | null;
  onConsumePreload: () => void;
  onSaveSummary: (item: SavedStudySummary) => void;
  onDeleteSummary: (id: string) => void;
  onRequestDriveSignIn: () => Promise<string | null>;
}

function FormattedStudyText({ text }: { text: string }) {
  const lines = text.split('\n');

  const renderInlineBold = (line: string) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={idx} className="font-semibold text-[#1C1917]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="space-y-2.5 text-sm sm:text-base text-[#1C1917] leading-relaxed">
      {lines.map((raw, idx) => {
        const line = raw.trim();
        if (!line) {
          return <div key={idx} className="h-1" />;
        }
        if (line.startsWith('### ') || line.startsWith('## ') || line.startsWith('# ')) {
          const cleanHeading = line.replace(/^#{1,3}\s+/, '');
          return (
            <h4
              key={idx}
              className="pt-2 font-display text-base sm:text-lg font-semibold text-[#1E3A8A]"
            >
              {renderInlineBold(cleanHeading)}
            </h4>
          );
        }
        if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
          return (
            <div key={idx} className="flex items-start gap-2.5 ps-1">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1E3A8A] shrink-0" aria-hidden="true" />
              <p className="flex-1">{renderInlineBold(line.slice(2))}</p>
            </div>
          );
        }
        const numberedMatch = line.match(/^(\d+[.)])\s+(.+)$/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2.5 ps-1">
              <span className="font-mono-tabular text-xs font-semibold text-[#1E3A8A] mt-1 shrink-0">
                {numberedMatch[1]}
              </span>
              <p className="flex-1">{renderInlineBold(numberedMatch[2])}</p>
            </div>
          );
        }
        return <p key={idx}>{renderInlineBold(line)}</p>;
      })}
    </div>
  );
}

export function NuhaAssistantView({
  lang,
  copy,
  articles,
  savedSummaries,
  driveAccessToken,
  preloadedRequest,
  onConsumePreload,
  onSaveSummary,
  onDeleteSummary,
  onRequestDriveSignIn,
}: NuhaAssistantViewProps) {
  const [mode, setMode] = useState<StudyMode>('summarize');
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [singleOutput, setSingleOutput] = useState('');
  const [outputTitle, setOutputTitle] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatTurn[]>([]);
  const [copied, setCopied] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [driveSaving, setDriveSaving] = useState(false);
  const [driveNotice, setDriveNotice] = useState<{ text: string; url?: string } | null>(null);

  const buildArticleSource = (article: MagazineArticle, activeLang: Lang): string => {
    const paragraphs = article.body[activeLang].join('\n\n');
    return `${article.title[activeLang]}\n${article.subtitle[activeLang]}\n\n${paragraphs}\n\n${article.keyTakeaway[activeLang]}`;
  };

  const runStudyRequest = async (params: {
    targetMode: StudyMode;
    targetPrompt: string;
    targetSource: string;
    targetSubject: string;
    targetGrade: string;
  }) => {
    setValidationError(null);
    setApiError(null);
    setSavedNotice(false);

    const check = validateStudyInput({
      mode: params.targetMode,
      prompt: params.targetPrompt,
      sourceText: params.targetSource,
    });

    if (!check.valid) {
      setValidationError(check.error === 'empty_input' ? copy.errEmpty : copy.errShort);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/assistant/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: params.targetMode,
          prompt: params.targetPrompt,
          sourceText: params.targetSource,
          subject: params.targetSubject,
          gradeLevel: params.targetGrade,
          lang,
          history: params.targetMode === 'chat' ? chatHistory : undefined,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        setApiError(
          data.error ||
            (lang === 'ar'
              ? 'تعذر الاتصال بالمساعد الذكي نُهى حاليًا.'
              : lang === 'fr'
                ? 'Impossible de contacter Nuha pour le moment.'
                : 'Unable to reach Nuha study service right now.')
        );
        return;
      }

      if (params.targetMode === 'chat') {
        const userMessage = params.targetPrompt.trim() || params.targetSource.trim();
        setChatHistory((prev) => [
          ...prev,
          { role: 'user', text: userMessage },
          { role: 'model', text: data.reply! },
        ]);
        setPrompt('');
      } else {
        setSingleOutput(data.reply);
        const derivedTitle =
          params.targetPrompt.trim().slice(0, 72) ||
          params.targetSource.trim().split('\n')[0].slice(0, 72);
        setOutputTitle(derivedTitle);
      }
    } catch {
      setApiError(
        lang === 'ar'
          ? 'حدث خطأ في الاتصال بالخادم المحلي. تأكد من تشغيل الخادم ثم أعد المحاولة.'
          : lang === 'fr'
            ? 'Erreur de connexion au serveur.'
            : 'Network error communicating with the study server.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!preloadedRequest) return;
    const article = articles.find((a) => a.id === preloadedRequest.articleId);
    if (!article) {
      onConsumePreload();
      return;
    }
    const text = buildArticleSource(article, lang);
    const defaultFocus =
      lang === 'ar'
        ? `لخّص مقال «${article.title[lang]}» في نقاط واضحة للطلاب`
        : lang === 'fr'
          ? `Résume l'article « ${article.title[lang]} » en points clairs`
          : `Summarize "${article.title[lang]}" into clear student study notes`;
    setMode(preloadedRequest.mode);
    setSelectedArticleId(article.id);
    setSubject(article.department[lang]);
    setSourceText(text);
    setPrompt(defaultFocus);
    onConsumePreload();

    if (preloadedRequest.autoRun) {
      void runStudyRequest({
        targetMode: preloadedRequest.mode,
        targetPrompt: defaultFocus,
        targetSource: text,
        targetSubject: article.department[lang],
        targetGrade: gradeLevel,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadedRequest?.nonce]);

  const handleArticlePick = (articleId: string) => {
    setSelectedArticleId(articleId);
    const found = articles.find((a) => a.id === articleId);
    if (!found) return;
    setSourceText(buildArticleSource(found, lang));
    setSubject(found.department[lang]);
    if (!prompt.trim()) {
      setPrompt(
        lang === 'ar'
          ? `لخّص مقال «${found.title[lang]}»`
          : lang === 'fr'
            ? `Résumer « ${found.title[lang]} »`
            : `Summarize "${found.title[lang]}"`
      );
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void runStudyRequest({
      targetMode: mode,
      targetPrompt: prompt,
      targetSource: sourceText,
      targetSubject: subject,
      targetGrade: gradeLevel,
    });
  };

  const handleQuickStarter = (starter: string) => {
    setPrompt(starter);
    if (starter.toLowerCase().includes('hc-sr04')) {
      const robotics = articles.find((a) => a.id === 'robotics-innovation');
      if (robotics) setSourceText(buildArticleSource(robotics, lang));
    } else if (starter.includes('العدد الأول') || starter.includes('Issue 01') || starter.includes('Numéro 01')) {
      const aiArt = articles.find((a) => a.id === 'ai-corner');
      if (aiArt) setSourceText(buildArticleSource(aiArt, lang));
    }
  };

  const activeDisplayText =
    mode === 'chat'
      ? chatHistory
          .filter((turn) => turn.role === 'model')
          .map((turn) => turn.text)
          .join('\n\n---\n\n')
      : singleOutput;

  const handleCopy = async () => {
    if (!activeDisplayText) return;
    try {
      await navigator.clipboard.writeText(activeDisplayText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard permission denials
    }
  };

  const handleSaveToNotebook = () => {
    if (!activeDisplayText) return;
    const record = createSavedSummaryRecord({
      mode,
      title: outputTitle || prompt.slice(0, 64),
      subject,
      gradeLevel,
      content: activeDisplayText,
      lang,
    });
    onSaveSummary(record);
    setSavedNotice(true);
  };

  const handleSaveToGoogleDrive = async () => {
    if (!activeDisplayText || driveSaving) return;
    setDriveNotice(null);
    setApiError(null);
    setDriveSaving(true);
    try {
      let token = driveAccessToken;
      if (!token) {
        token = await onRequestDriveSignIn();
      }
      if (!token) {
        setDriveNotice({
          text:
            lang === 'ar'
              ? 'يرجى تسجيل الدخول بحساب Google لمنح صلاحية حفظ الملف في Drive.'
              : lang === 'fr'
                ? 'Connectez-vous avec Google pour enregistrer dans Drive.'
                : 'Sign in with Google to authorize saving to Google Drive.',
        });
        return;
      }
      const safeTitle = (outputTitle || prompt || 'nuha-study-notes')
        .trim()
        .replace(/[^\p{L}\p{N}\s_-]/gu, '')
        .slice(0, 48) || 'nuha-study-notes';
      const fileName = `${safeTitle}-${new Date().toISOString().slice(0, 10)}.txt`;
      const header = `Digital Minds — Nuha Study Notes\nSubject: ${subject || 'General'}\nGrade: ${gradeLevel || 'ELS'}\n\n`;
      const uploaded = await uploadFileToDrive({
        token,
        fileName,
        content: header + activeDisplayText,
        mimeType: 'text/plain',
      });
      setDriveNotice({
        text:
          lang === 'ar'
            ? `تم حفظ الملخص في Google Drive باسم «${uploaded.name}».`
            : lang === 'fr'
              ? `Enregistré sur Google Drive sous « ${uploaded.name} ».`
              : `Saved to Google Drive as "${uploaded.name}".`,
        url: uploaded.webViewLink,
      });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Google Drive upload failed.');
    } finally {
      setDriveSaving(false);
    }
  };

  const modes: { id: StudyMode; label: string; icon: typeof FileText }[] = [
    { id: 'summarize', label: copy.modeSummarize, icon: FileText },
    { id: 'study-guide', label: copy.modeStudyGuide, icon: Layers },
    { id: 'explain', label: copy.modeExplain, icon: BookOpen },
    { id: 'quiz', label: copy.modeQuiz, icon: HelpCircle },
    { id: 'chat', label: copy.modeChat, icon: MessageSquare },
  ];

  const promptPlaceholder =
    mode === 'summarize'
      ? copy.promptPlaceholders.summarize
      : mode === 'study-guide'
        ? copy.promptPlaceholders.studyGuide
        : mode === 'explain'
          ? copy.promptPlaceholders.explain
          : mode === 'quiz'
            ? copy.promptPlaceholders.quiz
            : copy.promptPlaceholders.chat;

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="border-b border-[#E5E0D8] pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono-tabular font-semibold text-[#1E3A8A]">
            {copy.badgeName}
          </p>
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
      </header>

      {/* Mode Selector Bar */}
      <div
        role="tablist"
        aria-label={copy.heading}
        className="flex flex-wrap items-center gap-2 border-b border-[#E5E0D8] pb-4"
      >
        {modes.map((m) => {
          const Icon = m.icon;
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setMode(m.id);
                setValidationError(null);
              }}
              className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white font-semibold'
                  : 'border-[#E5E0D8] bg-white text-[#1C1917] hover:bg-[#F2EFE9]'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Split Workbench */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column (5 cols) */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="no-print lg:col-span-5 rounded-md border border-[#E5E0D8] bg-white p-6 space-y-4"
        >
          {/* Quick Article Preload */}
          <div>
            <label
              htmlFor="nuha-article-picker"
              className="block text-xs font-semibold text-[#1C1917] mb-1.5"
            >
              {copy.articlePickerLabel}
            </label>
            <select
              id="nuha-article-picker"
              value={selectedArticleId}
              onChange={(e) => handleArticlePick(e.target.value)}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
            >
              <option value="">{copy.articlePickerPlaceholder}</option>
              {articles.map((art) => (
                <option key={art.id} value={art.id}>
                  {art.departmentNumber} — {art.title[lang]}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="nuha-subject"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                {copy.subjectLabel}
              </label>
              <input
                id="nuha-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={copy.subjectPlaceholder}
                className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="nuha-grade"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                {copy.gradeLabel}
              </label>
              <input
                id="nuha-grade"
                type="text"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                placeholder={copy.gradePlaceholder}
                className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="nuha-prompt"
              className="block text-xs font-semibold text-[#1C1917] mb-1.5"
            >
              {copy.promptLabel}
            </label>
            <textarea
              id="nuha-prompt"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={promptPlaceholder}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2.5 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="nuha-source"
              className="block text-xs font-semibold text-[#1C1917] mb-1.5"
            >
              {copy.sourceLabel}
            </label>
            <textarea
              id="nuha-source"
              rows={4}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={copy.sourcePlaceholder}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2.5 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          {validationError && (
            <p role="alert" className="text-xs font-medium text-[#9A3412]">
              {validationError}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {mode === 'chat' && chatHistory.length > 0 ? (
              <button
                type="button"
                onClick={() => setChatHistory([])}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#D6CEBE] bg-white px-3.5 py-2 text-xs font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copy.clearChat}</span>
              </button>
            ) : (
              <span />
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#172554] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>{loading ? copy.sendingBtn : copy.submitBtn}</span>
            </button>
          </div>

          {/* Quick Starters */}
          <div className="border-t border-[#E5E0D8] pt-4 space-y-2">
            <p className="text-xs font-semibold text-[#57534E]">{copy.quickStarterTitle}</p>
            <div className="flex flex-col gap-1.5">
              {copy.quickStarters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => handleQuickStarter(starter)}
                  className="text-start rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-3 py-2 text-xs text-[#1C1917] hover:border-[#1E3A8A]/50 hover:bg-[#F2EFE9] transition-colors cursor-pointer"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Nuha Response & Notebook Output Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8">
            <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D8] pb-4">
              <h2 className="font-display text-lg sm:text-xl font-semibold text-[#1C1917]">
                {copy.responseTitle}
              </h2>

              {activeDisplayText && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-[#14532D]" aria-hidden="true" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    <span>{copied ? copy.copiedResult : copy.copyResult}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveToNotebook}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#1E3A8A]/30 bg-[#1E3A8A]/5 px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] hover:bg-[#1E3A8A]/10 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{copy.saveSummary}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveToGoogleDrive}
                    disabled={driveSaving}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#1E3A8A]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] hover:bg-[#1E3A8A]/5 disabled:opacity-60 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <HardDrive className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>
                      {driveSaving
                        ? lang === 'ar'
                          ? 'جاري الحفظ...'
                          : lang === 'fr'
                            ? 'Envoi...'
                            : 'Saving...'
                        : lang === 'ar'
                          ? 'حفظ في Google Drive'
                          : lang === 'fr'
                            ? 'Enregistrer sur Drive'
                            : 'Save to Google Drive'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3 py-1.5 text-xs font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{copy.printSummary}</span>
                  </button>
                </div>
              )}
            </div>

            {savedNotice && (
              <div
                role="status"
                className="no-print mt-4 rounded-md border border-[#14532D]/30 bg-[#14532D]/5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#14532D]"
              >
                {copy.savedToast}
              </div>
            )}

            {driveNotice && (
              <div
                role="status"
                className="no-print mt-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-[#1E3A8A]/30 bg-[#1E3A8A]/5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1E3A8A]"
              >
                <span>{driveNotice.text}</span>
                {driveNotice.url && (
                  <a
                    href={driveNotice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold"
                  >
                    {lang === 'ar' ? 'فتح في Drive' : lang === 'fr' ? 'Ouvrir dans Drive' : 'Open in Drive'}
                  </a>
                )}
              </div>
            )}

            {apiError && (
              <div
                role="alert"
                className="mt-4 rounded-md border border-[#9A3412]/30 bg-[#9A3412]/5 p-4 text-sm text-[#9A3412] leading-relaxed"
              >
                {apiError}
              </div>
            )}

            <div className="mt-5">
              {loading && (
                <div className="py-10 text-center space-y-2">
                  <p className="text-sm font-medium text-[#1E3A8A]">{copy.sendingBtn}</p>
                </div>
              )}

              {!loading && mode === 'chat' && chatHistory.length > 0 && (
                <div className="space-y-4">
                  {chatHistory.map((turn, idx) => (
                    <div
                      key={idx}
                      className={`rounded-md border p-4 ${
                        turn.role === 'user'
                          ? 'border-[#D6CEBE] bg-[#FBF9F5]'
                          : 'border-[#E5E0D8] bg-white'
                      }`}
                    >
                      <p className="text-xs font-semibold text-[#1E3A8A] mb-1.5">
                        {turn.role === 'user'
                          ? lang === 'ar'
                            ? 'سؤالك'
                            : lang === 'fr'
                              ? 'Votre question'
                              : 'Your Question'
                          : copy.badgeName}
                      </p>
                      <FormattedStudyText text={turn.text} />
                    </div>
                  ))}
                </div>
              )}

              {!loading && mode !== 'chat' && singleOutput && (
                <div className="max-w-prose">
                  <FormattedStudyText text={singleOutput} />
                </div>
              )}

              {!loading &&
                ((mode === 'chat' && chatHistory.length === 0) ||
                  (mode !== 'chat' && !singleOutput)) && (
                  <div className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-6 space-y-2">
                    <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                      {copy.emptyResponseTitle}
                    </h3>
                    <p className="text-sm text-[#57534E] leading-relaxed">
                      {copy.emptyResponseBody}
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Saved Summaries Notebook */}
          <section
            aria-labelledby="saved-summaries-heading"
            className="no-print rounded-md border border-[#E5E0D8] bg-white p-6 space-y-4"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#E5E0D8] pb-3">
              <h3
                id="saved-summaries-heading"
                className="font-display text-lg font-semibold text-[#1C1917]"
              >
                {copy.savedSectionTitle}
              </h3>
              <span className="font-mono-tabular text-xs text-[#57534E]">
                {savedSummaries.length}
              </span>
            </div>

            {savedSummaries.length === 0 ? (
              <p className="text-sm text-[#57534E]">{copy.savedEmpty}</p>
            ) : (
              <div className="space-y-3">
                {savedSummaries.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                        <span className="font-mono-tabular font-medium text-[#1E3A8A]">
                          {item.createdAt}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.gradeLevel}</span>
                      </div>
                      <h4 className="mt-1 font-display text-base font-semibold text-[#1C1917] truncate">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setMode(item.mode === 'chat' ? 'study-guide' : item.mode);
                          setSingleOutput(item.content);
                          setOutputTitle(item.title);
                          setSubject(item.subject);
                          setGradeLevel(item.gradeLevel);
                        }}
                        className="rounded-md border border-[#D6CEBE] bg-white px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] hover:bg-[#F2EFE9] cursor-pointer whitespace-nowrap"
                      >
                        {copy.loadSaved}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteSummary(item.id)}
                        aria-label={`${copy.deleteSaved}: ${item.title}`}
                        className="rounded-md border border-[#E5E0D8] bg-white p-1.5 text-[#57534E] hover:text-[#9A3412] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
