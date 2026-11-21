import { useState } from 'react';
import { Copy, Check, Printer } from 'lucide-react';
import { Lang } from '../types/magazine';
import { UiCopy } from '../data/translations';
import {
  FOUR_WEEK_ROADMAP,
  GOVERNANCE_ROWS,
  LAUNCH_SCENES,
  ROTATING_BONUS_CATALOG,
  SCHOOL_LOGO_URL,
  SUCCESS_KPIS,
  buildOfficialProposalText,
} from '../data/magazineData';

interface LaunchHubViewProps {
  lang: Lang;
  copy: UiCopy['launch'];
}

export function LaunchHubView({ lang, copy }: LaunchHubViewProps) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [proposerName, setProposerName] = useState('قسم الحاسب الآلي — المدرسة المصرية للغات');
  const [proposalDate, setProposalDate] = useState('2026-11-20');
  const [copied, setCopied] = useState(false);

  const currentScene = LAUNCH_SCENES[sceneIdx];
  const proposalText = buildOfficialProposalText(proposerName, proposalDate);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(proposalText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12">
      <header className="no-print border-b border-[#E5E0D8] pb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
          {copy.heading}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-2xl">
          {copy.subheading}
        </p>
      </header>

      {/* 5-Scene Launch Assembly Script */}
      <section className="no-print rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E0D8] pb-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
              {copy.scriptTitle}
            </h2>
            <p className="mt-1 text-sm text-[#57534E]">{copy.scriptSubtitle}</p>
          </div>

          <div className="flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-[#F2EFE9] p-1 self-start">
            {LAUNCH_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => setSceneIdx(idx)}
                className={`rounded px-2.5 py-1.5 font-mono-tabular text-xs font-medium cursor-pointer ${
                  sceneIdx === idx
                    ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {scene.sceneNumber}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 text-xs text-[#57534E]">
            <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
              {currentScene.sceneNumber} / 05
            </span>
            <span className="font-mono-tabular">{currentScene.duration}</span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-semibold text-[#1C1917]">
            {currentScene.title[lang]}
          </h3>
          <p className="text-xs sm:text-sm text-[#57534E] italic">
            {currentScene.stageCue[lang]}
          </p>
          <blockquote className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-5 text-sm sm:text-base text-[#1C1917] leading-relaxed">
            {currentScene.script[lang]}
          </blockquote>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={sceneIdx === 0}
              onClick={() => setSceneIdx((i) => Math.max(0, i - 1))}
              className="rounded-md border border-[#D6CEBE] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#1C1917] hover:bg-[#F2EFE9] disabled:opacity-40 cursor-pointer"
            >
              {copy.prevScene}
            </button>
            <button
              type="button"
              disabled={sceneIdx === LAUNCH_SCENES.length - 1}
              onClick={() => setSceneIdx((i) => Math.min(LAUNCH_SCENES.length - 1, i + 1))}
              className="rounded-md bg-[#1E3A8A] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#172554] disabled:opacity-40 cursor-pointer"
            >
              {copy.nextScene}
            </button>
          </div>
        </div>
      </section>

      {/* 4-Week Execution Plan + Governance Table */}
      <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-6 rounded-md border border-[#E5E0D8] bg-white p-6 space-y-5">
          <h2 className="font-display text-xl font-semibold text-[#1C1917]">
            {copy.roadmapTitle}
          </h2>
          <ol className="space-y-4">
            {FOUR_WEEK_ROADMAP.map((step, idx) => (
              <li
                key={idx}
                className="border-b border-[#F2EFE9] pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                    {step.week[lang]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#1C1917]">{step.phase[lang]}</span>
                </div>
                <p className="mt-1.5 text-sm text-[#57534E] leading-relaxed">
                  {step.detail[lang]}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="lg:col-span-6 rounded-md border border-[#E5E0D8] bg-white p-6 space-y-5">
          <h2 className="font-display text-xl font-semibold text-[#1C1917]">
            {copy.governanceTitle}
          </h2>
          <dl className="divide-y divide-[#F2EFE9]">
            {GOVERNANCE_ROWS.map((row, idx) => (
              <div key={idx} className="py-3 grid grid-cols-3 gap-3 text-sm">
                <dt className="font-medium text-[#57534E]">{row.element[lang]}</dt>
                <dd className="col-span-2 text-[#1C1917] font-medium">
                  {row.proposal[lang]}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-[#E5E0D8] pt-4">
            <h3 className="text-sm font-semibold text-[#1C1917] mb-2">{copy.kpisTitle}</h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#57534E] list-disc ps-5">
              {SUCCESS_KPIS.map((kpi, idx) => (
                <li key={idx}>{kpi[lang]}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Rotating Bonus Columns Catalog */}
      <section className="no-print rounded-md border border-[#E5E0D8] bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-[#1C1917]">
          {lang === 'ar'
            ? 'جدول الأقسام الإضافية بالتناوب للأعداد القادمة'
            : lang === 'fr'
              ? 'Catalogue des rubriques alternées pour les prochains numéros'
              : 'Rotating Bonus Department Roster for Upcoming Issues'}
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ROTATING_BONUS_CATALOG.map((item, idx) => (
            <div
              key={idx}
              className="rounded border border-[#E5E0D8] bg-[#FBF9F5] p-3 text-xs space-y-1"
            >
              <p className="font-semibold text-[#1C1917]" dir="rtl">
                {item.ar}
              </p>
              <p className="text-[#1E3A8A] font-medium" dir="ltr">
                {item.en}
              </p>
              <p className="text-[#57534E]" dir="ltr">
                {item.fr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Official Principal Proposal Letter */}
      <section className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6">
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E0D8] pb-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
              {copy.proposalTitle}
            </h2>
            <p className="mt-1 text-sm text-[#57534E]">{copy.proposalSubtitle}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-xs font-semibold text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#14532D]" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4" aria-hidden="true" />
              )}
              <span>{copied ? copy.copiedProposal : copy.copyProposal}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A8A] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#172554] cursor-pointer"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>{copy.printProposal}</span>
            </button>
          </div>
        </div>

        <div className="no-print grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="proposer-name"
              className="block text-xs font-semibold text-[#1C1917] mb-1.5"
            >
              {copy.proposerNameLabel}
            </label>
            <input
              id="proposer-name"
              type="text"
              value={proposerName}
              onChange={(e) => setProposerName(e.target.value)}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="proposal-date"
              className="block text-xs font-semibold text-[#1C1917] mb-1.5"
            >
              {copy.proposalDateLabel}
            </label>
            <input
              id="proposal-date"
              type="date"
              value={proposalDate}
              onChange={(e) => setProposalDate(e.target.value)}
              className="w-full rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-3.5 py-2 text-sm font-mono-tabular text-[#1C1917] focus:border-[#1E3A8A] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div dir="rtl" className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
            <div className="flex items-center gap-3">
              <img
                src={SCHOOL_LOGO_URL}
                alt="شعار المدرسة المصرية للغات"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-contain border border-[#E5E0D8] bg-white p-0.5 shrink-0"
              />
              <div>
                <p className="font-display text-base font-semibold text-[#1C1917]">
                  المدرسة المصرية للغات
                </p>
                <p className="text-xs text-[#57534E]">
                  قسم الحاسب الآلي وتكنولوجيا المعلومات — مجلة «عقول رقمية»
                </p>
              </div>
            </div>
            <span className="font-mono-tabular text-xs text-[#57534E]">{proposalDate}</span>
          </div>

          <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-loose text-[#1C1917]">
            {proposalText}
          </pre>
        </div>
      </section>
    </div>
  );
}
