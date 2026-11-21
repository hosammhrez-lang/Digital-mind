import { useState, FormEvent } from 'react';
import { User } from 'firebase/auth';
import { Award, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { Lang, StudentSubmission, SubmissionCategory } from '../types/magazine';
import { UiCopy } from '../data/translations';
import { SUGGESTED_IDEAS } from '../data/magazineData';
import { createSubmissionRecord, validateSubmission } from '../utils/magazineLogic';
import { GoogleSignInButton } from './GoogleSignInButton';

interface ShowcaseViewProps {
  lang: Lang;
  copy: UiCopy['showcase'];
  submissions: StudentSubmission[];
  user: User | null;
  onSignIn: () => Promise<void>;
  onAddSubmission: (item: StudentSubmission) => Promise<void> | void;
  onVoteSubmission: (id: string) => Promise<void> | void;
}

type FilterCategory = 'all' | SubmissionCategory;

export function ShowcaseView({
  lang,
  copy,
  submissions,
  user,
  onSignIn,
  onAddSubmission,
  onVoteSubmission,
}: ShowcaseViewProps) {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  // Form state
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [category, setCategory] = useState<SubmissionCategory>('app');
  const [submissionLang, setSubmissionLang] = useState<Lang>(lang);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredSubmissions =
    filter === 'all'
      ? submissions
      : submissions.filter((item) => item.category === filter);

  const handleTriggerSignIn = async () => {
    setSigningIn(true);
    setAuthNotice(null);
    try {
      await onSignIn();
    } catch (err) {
      setAuthNotice(err instanceof Error ? err.message : 'Sign-in failed.');
    } finally {
      setSigningIn(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setAuthNotice(null);

    const validation = validateSubmission({
      studentName,
      grade,
      category,
      language: submissionLang,
      title,
      summary,
    });

    if (!validation.valid) {
      const mapped: Record<string, string> = {};
      if (validation.errors.studentName) mapped.studentName = copy.errName;
      if (validation.errors.grade) mapped.grade = copy.errGrade;
      if (validation.errors.title) mapped.title = copy.errTitle;
      if (validation.errors.summary) mapped.summary = copy.errSummary;
      setErrors(mapped);
      return;
    }

    const record = createSubmissionRecord({
      studentName,
      grade,
      category,
      language: submissionLang,
      title,
      summary,
    });

    await onAddSubmission(record);
    setErrors({});
    setStudentName('');
    setGrade('');
    setTitle('');
    setSummary('');
    setSubmitSuccess(true);
  };

  const categoryLabels: Record<SubmissionCategory, string> = {
    app: copy.filterApp,
    robotics: copy.filterRobotics,
    game: copy.filterGame,
    idea: copy.filterIdea,
  };

  return (
    <div className="space-y-12">
      <header className="border-b border-[#E5E0D8] pb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
          {copy.heading}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-2xl">
          {copy.subheading}
        </p>
      </header>

      {/* Coder of the Month Spotlight */}
      <section
        aria-label={copy.coderOfMonthLabel}
        className="rounded-md border border-[#D6CEBE] bg-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A8A]">
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>{copy.coderOfMonthLabel}</span>
          </div>
          <h2 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
            {copy.coderName}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#1E3A8A]">{copy.coderGrade}</p>
          <p className="mt-2 text-sm text-[#57534E] leading-relaxed max-w-2xl">
            {copy.coderAchievement}
          </p>
        </div>

        <div className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-5 py-4 text-center">
          <p className="font-mono-tabular text-2xl font-semibold text-[#1C1917]">
            {submissions.length}
          </p>
          <p className="text-xs text-[#57534E]">
            {lang === 'ar'
              ? 'مشاركة طلابية منشورة'
              : lang === 'fr'
                ? 'projets publiés'
                : 'published entries'}
          </p>
        </div>
      </section>

      {/* Student Submissions Grid & Filter */}
      <section aria-label="Student projects feed" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1 rounded-md border border-[#E5E0D8] bg-[#F2EFE9] p-1">
            {(
              [
                { id: 'all', label: copy.filterAll },
                { id: 'app', label: copy.filterApp },
                { id: 'robotics', label: copy.filterRobotics },
                { id: 'game', label: copy.filterGame },
                { id: 'idea', label: copy.filterIdea },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubmissions.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-md border border-[#E5E0D8] bg-white p-5 sm:p-6"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#57534E]">
                  <span className="font-medium text-[#1E3A8A]">
                    {categoryLabels[item.category]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.grade}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular uppercase">{item.language}</span>
                </div>

                <h3 className="mt-2.5 font-display text-lg font-semibold text-[#1C1917] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E5E0D8] pt-3">
                <div className="text-xs text-[#57534E]">
                  <span className="font-medium text-[#1C1917]">{item.studentName}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{item.createdAt}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!user?.emailVerified) {
                      setAuthNotice(
                        lang === 'ar'
                          ? 'يرجى تسجيل الدخول بحساب Google للتصويت وحفظ الإعجاب في قاعدة البيانات.'
                          : lang === 'fr'
                            ? 'Connectez-vous avec Google pour voter.'
                            : 'Sign in with Google to upvote projects in the live database.'
                      );
                      return;
                    }
                    void onVoteSubmission(item.id);
                  }}
                  aria-label={`${copy.upvote} ${item.title}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-2.5 py-1 text-xs font-medium text-[#1C1917] hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors cursor-pointer shrink-0"
                >
                  <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="font-mono-tabular">{item.votes}</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {authNotice && (
          <div
            role="status"
            className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#1E3A8A]/30 bg-white px-4 py-3 text-xs sm:text-sm text-[#1E3A8A]"
          >
            <span>{authNotice}</span>
            <GoogleSignInButton
              label={lang === 'ar' ? 'تسجيل الدخول بـ Google' : 'Sign in with Google'}
              loading={signingIn}
              onClick={handleTriggerSignIn}
            />
          </div>
        )}
      </section>

      {/* Live Student Project & Idea Submission Form */}
      <section
        id="submission-form"
        aria-labelledby="submission-form-heading"
        className="scroll-mt-8 rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2
              id="submission-form-heading"
              className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]"
            >
              {copy.formTitle}
            </h2>
            <p className="mt-1 text-sm text-[#57534E]">{copy.formSubtitle}</p>
          </div>
          {!user?.emailVerified && (
            <GoogleSignInButton
              label={lang === 'ar' ? 'تسجيل الدخول للحفظ في السحابة' : 'Sign in with Google'}
              loading={signingIn}
              onClick={handleTriggerSignIn}
            />
          )}
        </div>

        {submitSuccess && (
          <div
            role="status"
            className="mt-4 flex items-center gap-2 rounded-md border border-[#14532D]/30 bg-[#14532D]/5 px-4 py-3 text-sm font-medium text-[#14532D]"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{copy.successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="sub-name" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              {copy.fieldName}
            </label>
            <input
              id="sub-name"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none"
            />
            {errors.studentName && (
              <p className="mt-1 text-xs text-[#9A3412]">{errors.studentName}</p>
            )}
          </div>

          <div>
            <label htmlFor="sub-grade" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              {copy.fieldGrade}
            </label>
            <input
              id="sub-grade"
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder={lang === 'ar' ? 'مثال: الصف الثاني الإعدادي' : 'e.g. Prep 2 / Grade 8'}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none"
            />
            {errors.grade && (
              <p className="mt-1 text-xs text-[#9A3412]">{errors.grade}</p>
            )}
          </div>

          <div>
            <label htmlFor="sub-cat" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              {copy.fieldCategory}
            </label>
            <select
              id="sub-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value as SubmissionCategory)}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none"
            >
              <option value="app">{copy.filterApp}</option>
              <option value="robotics">{copy.filterRobotics}</option>
              <option value="game">{copy.filterGame}</option>
              <option value="idea">{copy.filterIdea}</option>
            </select>
          </div>

          <div>
            <label htmlFor="sub-lang" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              {copy.fieldLanguage}
            </label>
            <select
              id="sub-lang"
              value={submissionLang}
              onChange={(e) => setSubmissionLang(e.target.value as Lang)}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="sub-title" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              {copy.fieldTitle}
            </label>
            <input
              id="sub-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-[#9A3412]">{errors.title}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="sub-summary" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              {copy.fieldSummary}
            </label>
            <textarea
              id="sub-summary"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none"
            />
            {errors.summary && (
              <p className="mt-1 text-xs text-[#9A3412]">{errors.summary}</p>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-[#1E3A8A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#172554] transition-colors cursor-pointer"
            >
              {copy.submitBtn}
            </button>
          </div>
        </form>
      </section>

      {/* Recommended Ideas to Elevate Digital Minds */}
      <section aria-labelledby="suggested-ideas-heading" className="space-y-6">
        <div className="border-b border-[#E5E0D8] pb-4">
          <h2
            id="suggested-ideas-heading"
            className="font-display text-2xl font-semibold text-[#1C1917]"
          >
            {copy.suggestionsHeading}
          </h2>
          <p className="mt-1 text-sm text-[#57534E]">{copy.suggestionsSubheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUGGESTED_IDEAS.map((idea) => (
            <article
              key={idea.id}
              className="flex flex-col justify-between rounded-md border border-[#E5E0D8] bg-white p-6"
            >
              <div>
                <p className="text-xs font-semibold text-[#1E3A8A] whitespace-nowrap">
                  {idea.pillar[lang]}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#1C1917] leading-snug">
                  {idea.title[lang]}
                </h3>
                <p className="mt-1.5 text-xs font-medium text-[#1C1917]/80">
                  {idea.impact[lang]}
                </p>
                <p className="mt-2.5 text-sm text-[#57534E] leading-relaxed">
                  {idea.description[lang]}
                </p>
              </div>

              <div className="mt-4 border-t border-[#F2EFE9] pt-3 text-xs text-[#1C1917]">
                <span className="font-semibold text-[#1E3A8A]">{copy.pilotLabel}: </span>
                <span>{idea.howToPilot[lang]}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
