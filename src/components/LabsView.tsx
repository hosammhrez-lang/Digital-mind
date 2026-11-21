import { useState } from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, ShieldAlert, Cpu } from 'lucide-react';
import { Lang } from '../types/magazine';
import { UiCopy } from '../data/translations';
import { BUG_CHALLENGES, PHISHING_EMAILS } from '../data/magazineData';
import {
  evaluateBugHunt,
  evaluatePhishingAttempt,
  evaluateRobotNavigation,
} from '../utils/magazineLogic';

interface LabsViewProps {
  lang: Lang;
  copy: UiCopy['labs'];
}

type ActiveLab = 'phishing' | 'bug' | 'robotics';

export function LabsView({ lang, copy }: LabsViewProps) {
  const [activeLab, setActiveLab] = useState<ActiveLab>('phishing');

  // Phishing Detective State
  const [emailIdx, setEmailIdx] = useState(0);
  const [phishingVerdict, setPhishingVerdict] = useState<{
    correct: boolean;
    userMarkedPhishing: boolean;
  } | null>(null);
  const [phishingScore, setPhishingScore] = useState(0);

  // Bug Hunt State
  const [bugIdx, setBugIdx] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Robotics Simulator State
  const [distanceCm, setDistanceCm] = useState(42);

  const currentEmail = PHISHING_EMAILS[emailIdx];
  const currentBug = BUG_CHALLENGES[bugIdx];
  const bugResult =
    selectedLine !== null ? evaluateBugHunt(currentBug, selectedLine) : null;
  const robotState = evaluateRobotNavigation(distanceCm, 25);

  const handlePhishingChoice = (markPhishing: boolean) => {
    if (phishingVerdict) return;
    const res = evaluatePhishingAttempt(currentEmail, markPhishing);
    setPhishingVerdict({ correct: res.correct, userMarkedPhishing: markPhishing });
    if (res.correct) {
      setPhishingScore((prev) => prev + res.scoreDelta);
    }
  };

  const handleNextEmail = () => {
    setEmailIdx((prev) => (prev + 1) % PHISHING_EMAILS.length);
    setPhishingVerdict(null);
  };

  const handleSelectBugChallenge = (idx: number) => {
    setBugIdx(idx);
    setSelectedLine(null);
    setShowHint(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E0D8] pb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            {copy.heading}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-2xl">
            {copy.subheading}
          </p>
        </div>

        {/* Segmented Lab Tabs */}
        <div
          role="tablist"
          aria-label="Interactive STEM Labs"
          className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-[#F2EFE9] p-1 self-start"
        >
          {(
            [
              { id: 'phishing', label: copy.phishingTab },
              { id: 'bug', label: copy.bugTab },
              { id: 'robotics', label: copy.roboticsTab },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeLab === tab.id}
              onClick={() => setActiveLab(tab.id)}
              className={`rounded px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeLab === tab.id
                  ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Lab 1: Cybersecurity Phishing Detective */}
      {activeLab === 'phishing' && (
        <section className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[#57534E] max-w-2xl">{copy.phishingIntro}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-mono-tabular text-[#57534E]">
                {emailIdx + 1} / {PHISHING_EMAILS.length}
              </span>
              <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                {copy.scoreLabel}: {phishingScore}
              </span>
            </div>
          </div>

          <div className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E0D8] pb-3 text-xs sm:text-sm">
              <div>
                <span className="font-semibold text-[#1C1917]">{currentEmail.senderName}</span>
                <span className="ms-2 font-mono-tabular text-[#57534E]" dir="ltr">
                  &lt;{currentEmail.senderAddress}&gt;
                </span>
              </div>
              <span className="text-xs text-[#57534E]">{currentEmail.preview[lang]}</span>
            </div>

            <h2 className="font-display text-lg sm:text-xl font-semibold text-[#1C1917]">
              {currentEmail.subject[lang]}
            </h2>
            <p className="text-sm sm:text-base text-[#1C1917] leading-relaxed bg-white border border-[#E5E0D8] rounded p-4">
              {currentEmail.body[lang]}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                disabled={phishingVerdict !== null}
                onClick={() => handlePhishingChoice(true)}
                className="inline-flex items-center gap-2 rounded-md border border-[#9A3412]/30 bg-white px-4 py-2 text-sm font-semibold text-[#9A3412] hover:bg-[#9A3412]/5 disabled:opacity-50 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" aria-hidden="true" />
                <span>{copy.markPhishing}</span>
              </button>

              <button
                type="button"
                disabled={phishingVerdict !== null}
                onClick={() => handlePhishingChoice(false)}
                className="inline-flex items-center gap-2 rounded-md border border-[#14532D]/30 bg-white px-4 py-2 text-sm font-semibold text-[#14532D] hover:bg-[#14532D]/5 disabled:opacity-50 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>{copy.markSafe}</span>
              </button>

              {phishingVerdict && (
                <button
                  type="button"
                  onClick={handleNextEmail}
                  className="ms-auto rounded-md bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#172554] cursor-pointer"
                >
                  {copy.nextEmail}
                </button>
              )}
            </div>
          </div>

          {phishingVerdict && (
            <div
              role="status"
              className={`rounded-md border p-5 space-y-3 ${
                phishingVerdict.correct
                  ? 'border-[#14532D]/30 bg-[#14532D]/5'
                  : 'border-[#9A3412]/30 bg-[#9A3412]/5'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-sm">
                {phishingVerdict.correct ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#14532D]" aria-hidden="true" />
                    <span className="text-[#14532D]">{copy.correctTag}</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-[#9A3412]" aria-hidden="true" />
                    <span className="text-[#9A3412]">{copy.incorrectTag}</span>
                  </>
                )}
              </div>
              <ul className="space-y-1.5 text-sm text-[#1C1917] list-disc ps-5">
                {currentEmail.clues.map((clue, idx) => (
                  <li key={idx}>{clue[lang]}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Lab 2: Think & Solve — Find the Bug */}
      {activeLab === 'bug' && (
        <section className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[#57534E] max-w-2xl">{copy.bugIntro}</p>
            <div className="flex items-center gap-2">
              {BUG_CHALLENGES.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectBugChallenge(idx)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium cursor-pointer ${
                    bugIdx === idx
                      ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                      : 'border-[#E5E0D8] bg-[#FBF9F5] text-[#1C1917] hover:bg-[#F2EFE9]'
                  }`}
                >
                  {ch.language}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-[#1C1917]">
              {currentBug.title[lang]}
            </h2>
            <p className="text-sm text-[#57534E]">{currentBug.prompt[lang]}</p>
          </div>

          {/* Clickable Code Lines (Always LTR for code readability) */}
          <div
            dir="ltr"
            className="rounded-md border border-[#E5E0D8] bg-[#1C1917] p-4 font-mono-tabular text-sm text-[#FBF9F5] overflow-x-auto"
          >
            {currentBug.lines.map((line, idx) => {
              const isSelected = selectedLine === idx;
              const isBugLine = idx === currentBug.bugLineIndex;
              let rowTone = 'hover:bg-white/10 border-transparent';
              if (isSelected && bugResult?.correct) {
                rowTone = 'bg-[#14532D]/60 border-[#4ADE80]/60';
              } else if (isSelected && !bugResult?.correct) {
                rowTone = 'bg-[#9A3412]/60 border-[#FB923C]/60';
              } else if (bugResult?.correct && isBugLine) {
                rowTone = 'bg-[#14532D]/40 border-[#4ADE80]/40';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedLine(idx)}
                  className={`w-full flex items-center gap-4 px-3 py-2 text-left rounded border transition-colors cursor-pointer ${rowTone}`}
                >
                  <span className="w-6 text-xs text-[#A8A29E] select-none">
                    0{idx + 1}
                  </span>
                  <code className="whitespace-pre">{line}</code>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-4 py-2 text-xs font-medium text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#1E3A8A]" aria-hidden="true" />
              <span>{showHint ? copy.hideHint : copy.showHint}</span>
            </button>
          </div>

          {showHint && (
            <div className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-4 text-sm text-[#1C1917]">
              {currentBug.hint[lang]}
            </div>
          )}

          {bugResult && (
            <div
              role="status"
              className={`rounded-md border p-5 space-y-2 ${
                bugResult.correct
                  ? 'border-[#14532D]/30 bg-[#14532D]/5'
                  : 'border-[#9A3412]/30 bg-[#9A3412]/5'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                {bugResult.correct ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#14532D]" aria-hidden="true" />
                    <span className="text-[#14532D]">{copy.correctTag}</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-[#9A3412]" aria-hidden="true" />
                    <span className="text-[#9A3412]">{copy.incorrectTag}</span>
                  </>
                )}
              </div>
              {bugResult.correct && (
                <>
                  <p className="text-sm text-[#1C1917]">{currentBug.explanation[lang]}</p>
                  <p className="text-xs font-medium text-[#57534E] pt-1">
                    {copy.fixedLineLabel}:{' '}
                    <code dir="ltr" className="font-mono-tabular bg-white px-2 py-0.5 rounded border border-[#E5E0D8] text-[#14532D]">
                      {currentBug.fixedLine}
                    </code>
                  </p>
                </>
              )}
            </div>
          )}
        </section>
      )}

      {/* Lab 3: Obstacle-Avoiding Robot Ultrasonic Simulator */}
      {activeLab === 'robotics' && (
        <section className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-sm text-[#57534E] max-w-2xl">{copy.roboticsIntro}</p>
            <span className="font-mono-tabular text-xs font-medium text-[#1E3A8A]">
              {copy.thresholdLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive SVG Ultrasonic Diagram */}
            <div dir="ltr" className="lg:col-span-7 rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-6">
              <svg
                viewBox="0 0 560 220"
                className="w-full h-auto"
                role="img"
                aria-label={`Ultrasonic robot distance simulation at ${robotState.distanceCm} centimeters`}
              >
                {/* Floor grid lines */}
                <line x1="20" y1="180" x2="540" y2="180" stroke="#D6CEBE" strokeWidth="2" />

                {/* Robot Chassis */}
                <rect x="40" y="108" width="110" height="58" rx="8" fill="#1E3A8A" />
                <circle cx="65" cy="172" r="14" fill="#1C1917" />
                <circle cx="125" cy="172" r="14" fill="#1C1917" />
                {/* HC-SR04 Ultrasonic Sensor */}
                <rect x="148" y="118" width="16" height="34" rx="2" fill="#0284C7" />
                <circle cx="158" cy="127" r="4" fill="#E0F2FE" />
                <circle cx="158" cy="143" r="4" fill="#E0F2FE" />

                {/* Obstacle Wall positioned dynamically by distanceCm */}
                {(() => {
                  const wallX = 185 + Math.round((robotState.distanceCm / 120) * 310);
                  const beamColor =
                    robotState.action === 'TURN_RIGHT'
                      ? '#9A3412'
                      : robotState.action === 'CAUTION'
                        ? '#B45309'
                        : '#14532D';
                  return (
                    <>
                      <line
                        x1="168"
                        y1="135"
                        x2={wallX}
                        y2="135"
                        stroke={beamColor}
                        strokeWidth="3"
                        strokeDasharray="6 6"
                      />
                      <text
                        x={(168 + wallX) / 2}
                        y="122"
                        textAnchor="middle"
                        fill={beamColor}
                        fontSize="13"
                        fontFamily="IBM Plex Mono, monospace"
                        fontWeight="600"
                      >
                        {robotState.distanceCm} cm
                      </text>
                      <rect
                        x={wallX}
                        y="60"
                        width="28"
                        height="120"
                        rx="4"
                        fill="#57534E"
                      />
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* Slider & Motor Logic Readout */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <label htmlFor="robot-distance-slider" className="font-medium text-[#1C1917]">
                    {copy.distanceLabel}
                  </label>
                  <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                    {robotState.distanceCm} cm
                  </span>
                </div>
                <input
                  id="robot-distance-slider"
                  type="range"
                  min={5}
                  max={100}
                  step={1}
                  value={distanceCm}
                  onChange={(e) => setDistanceCm(Number(e.target.value))}
                  className="w-full accent-[#1E3A8A] cursor-pointer"
                />
                <div className="flex justify-between text-xs font-mono-tabular text-[#57534E] mt-1">
                  <span>5 cm</span>
                  <span>25 cm</span>
                  <span>100 cm</span>
                </div>
              </div>

              <div
                role="status"
                className={`rounded-md border p-4 flex items-center gap-2.5 text-sm font-semibold ${
                  robotState.action === 'TURN_RIGHT'
                    ? 'border-[#9A3412]/30 bg-[#9A3412]/5 text-[#9A3412]'
                    : robotState.action === 'CAUTION'
                      ? 'border-[#B45309]/30 bg-[#B45309]/5 text-[#B45309]'
                      : 'border-[#14532D]/30 bg-[#14532D]/5 text-[#14532D]'
                }`}
              >
                <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  {robotState.action === 'TURN_RIGHT'
                    ? copy.statusTurnRight
                    : robotState.action === 'CAUTION'
                      ? copy.statusCaution
                      : copy.statusForward}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-3">
                  <p className="text-xs text-[#57534E]">{copy.leftMotor}</p>
                  <p className="mt-1 font-mono-tabular text-lg font-semibold text-[#1C1917]">
                    {robotState.leftMotorPower}%
                  </p>
                </div>
                <div className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-3">
                  <p className="text-xs text-[#57534E]">{copy.rightMotor}</p>
                  <p className="mt-1 font-mono-tabular text-lg font-semibold text-[#1C1917]">
                    {robotState.rightMotorPower}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
