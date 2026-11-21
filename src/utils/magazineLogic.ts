import {
  BugChallenge,
  GlossaryCategory,
  GlossaryTerm,
  Lang,
  PhishingEmail,
  SavedStudySummary,
  SchoolNewsDispatch,
  StudentSubmission,
  StudyMode,
  SubmissionCategory,
} from '../types/magazine';

export function filterGlossaryTerms(
  terms: GlossaryTerm[],
  query: string,
  category: GlossaryCategory
): GlossaryTerm[] {
  const normalizedQuery = query.trim().toLowerCase();
  return terms.filter((term) => {
    if (category !== 'all' && term.category !== category) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    const haystack = [
      term.ar,
      term.en,
      term.fr,
      term.definition.ar,
      term.definition.en,
      term.definition.fr,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export interface RobotNavigationState {
  distanceCm: number;
  thresholdCm: number;
  action: 'FORWARD' | 'CAUTION' | 'TURN_RIGHT';
  leftMotorPower: number;
  rightMotorPower: number;
}

export function evaluateRobotNavigation(
  distanceCm: number,
  thresholdCm = 25
): RobotNavigationState {
  const clamped = Math.max(2, Math.min(120, Math.round(distanceCm)));
  if (clamped < thresholdCm) {
    return {
      distanceCm: clamped,
      thresholdCm,
      action: 'TURN_RIGHT',
      leftMotorPower: 85,
      rightMotorPower: -60,
    };
  }
  if (clamped < thresholdCm + 15) {
    return {
      distanceCm: clamped,
      thresholdCm,
      action: 'CAUTION',
      leftMotorPower: 55,
      rightMotorPower: 55,
    };
  }
  return {
    distanceCm: clamped,
    thresholdCm,
    action: 'FORWARD',
    leftMotorPower: 100,
    rightMotorPower: 100,
  };
}

export interface PhishingResult {
  correct: boolean;
  isPhishing: boolean;
  scoreDelta: number;
}

export function evaluatePhishingAttempt(
  email: PhishingEmail,
  userMarkedPhishing: boolean
): PhishingResult {
  const correct = email.isPhishing === userMarkedPhishing;
  return {
    correct,
    isPhishing: email.isPhishing,
    scoreDelta: correct ? 10 : 0,
  };
}

export interface BugHuntResult {
  correct: boolean;
  selectedLine: number;
  expectedLine: number;
}

export function evaluateBugHunt(
  challenge: BugChallenge,
  selectedLineIndex: number
): BugHuntResult {
  return {
    correct: selectedLineIndex === challenge.bugLineIndex,
    selectedLine: selectedLineIndex,
    expectedLine: challenge.bugLineIndex,
  };
}

export interface SubmissionInput {
  studentName: string;
  grade: string;
  category: SubmissionCategory;
  language: Lang;
  title: string;
  summary: string;
}

export interface SubmissionValidation {
  valid: boolean;
  errors: Partial<Record<keyof SubmissionInput, string>>;
}

export function validateSubmission(input: SubmissionInput): SubmissionValidation {
  const errors: Partial<Record<keyof SubmissionInput, string>> = {};
  if (input.studentName.trim().length < 2) {
    errors.studentName = 'required_name';
  }
  if (input.grade.trim().length < 1) {
    errors.grade = 'required_grade';
  }
  if (input.title.trim().length < 4) {
    errors.title = 'required_title';
  }
  if (input.summary.trim().length < 12) {
    errors.summary = 'required_summary';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createSubmissionRecord(
  input: SubmissionInput,
  now = new Date()
): StudentSubmission {
  return {
    id: `sub-${now.getTime()}-${Math.floor(Math.random() * 1000)}`,
    studentName: input.studentName.trim(),
    grade: input.grade.trim(),
    category: input.category,
    language: input.language,
    title: input.title.trim(),
    summary: input.summary.trim(),
    createdAt: now.toISOString().slice(0, 10),
    votes: 1,
  };
}

/**
 * Generates a deterministic 17x17 matrix with standard 3-corner finder patterns
 * for rendering clean scannable-style lesson QR codes without external APIs.
 */
export function generateQrMatrix(seedText: string, size = 17): boolean[][] {
  const matrix: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );

  const placeFinder = (rowOffset: number, colOffset: number) => {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const isBorder = r === 0 || r === 4 || c === 0 || c === 4;
        const isCenter = r === 2 && c === 2;
        matrix[rowOffset + r][colOffset + c] = isBorder || isCenter;
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 5);
  placeFinder(size - 5, 0);

  let hash = 2166136261;
  for (let i = 0; i < seedText.length; i++) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inTopLeft = r < 6 && c < 6;
      const inTopRight = r < 6 && c >= size - 6;
      const inBottomLeft = r >= size - 6 && c < 6;
      if (inTopLeft || inTopRight || inBottomLeft) {
        continue;
      }
      hash ^= (r * 31 + c * 17) & 0xff;
      hash = Math.imul(hash, 16777619);
      matrix[r][c] = (Math.abs(hash) % 10) < 5;
    }
  }

  return matrix;
}

export interface NewsDispatchInput {
  title: string;
  summary: string;
  publishedDate: string;
  sourceUrl: string;
}

export interface NewsDispatchValidation {
  valid: boolean;
  errors: Partial<Record<keyof NewsDispatchInput, string>>;
}

export function validateNewsDispatch(input: NewsDispatchInput): NewsDispatchValidation {
  const errors: Partial<Record<keyof NewsDispatchInput, string>> = {};
  if (input.title.trim().length < 4) {
    errors.title = 'required_title';
  }
  if (input.summary.trim().length < 10) {
    errors.summary = 'required_summary';
  }
  if (!input.publishedDate.trim()) {
    errors.publishedDate = 'required_date';
  }
  const trimmedUrl = input.sourceUrl.trim();
  if (trimmedUrl && !/^https?:\/\/.+/i.test(trimmedUrl)) {
    errors.sourceUrl = 'invalid_url';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createNewsDispatchRecord(
  input: NewsDispatchInput,
  defaultSourceUrl: string,
  now = new Date()
): SchoolNewsDispatch {
  return {
    id: `news-${now.getTime()}-${Math.floor(Math.random() * 1000)}`,
    title: input.title.trim(),
    summary: input.summary.trim(),
    publishedDate: input.publishedDate.trim(),
    sourceUrl: input.sourceUrl.trim() || defaultSourceUrl,
  };
}

export function clampFlipbookPage(index: number, totalPages: number): number {
  if (totalPages <= 0) return 0;
  return Math.max(0, Math.min(totalPages - 1, Math.floor(index)));
}

export function toggleIdInList(list: string[], id: string): string[] {
  if (list.includes(id)) {
    return list.filter((item) => item !== id);
  }
  return [...list, id];
}

export function addUniqueId(list: string[], id: string): string[] {
  return list.includes(id) ? list : [...list, id];
}

export interface StudyValidationResult {
  valid: boolean;
  error?: 'empty_input' | 'too_short';
}

export function validateStudyInput(input: {
  mode: StudyMode;
  prompt: string;
  sourceText: string;
}): StudyValidationResult {
  const combinedLength = input.prompt.trim().length + input.sourceText.trim().length;
  if (combinedLength === 0) {
    return { valid: false, error: 'empty_input' };
  }
  if (combinedLength < 3) {
    return { valid: false, error: 'too_short' };
  }
  return { valid: true };
}

export function createSavedSummaryRecord(
  input: {
    mode: StudyMode;
    title: string;
    subject: string;
    gradeLevel: string;
    content: string;
    lang: Lang;
  },
  now = new Date()
): SavedStudySummary {
  const cleanTitle = input.title.trim();
  const fallbackTitle =
    cleanTitle ||
    input.content
      .trim()
      .replace(/^#+\s*/gm, '')
      .split('\n')[0]
      .slice(0, 64) ||
    'Study Summary';

  return {
    id: `summary-${now.getTime()}-${Math.floor(Math.random() * 1000)}`,
    mode: input.mode,
    title: fallbackTitle,
    subject: input.subject.trim() || 'General',
    gradeLevel: input.gradeLevel.trim() || 'ELS',
    content: input.content.trim(),
    createdAt: now.toISOString().slice(0, 10),
    lang: input.lang,
  };
}
