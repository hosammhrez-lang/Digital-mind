export type Lang = 'ar' | 'en' | 'fr';

export type EditionMode = 'standard' | 'junior';

export type NavTab = 'issue' | 'assistant' | 'labs' | 'glossary' | 'showcase' | 'launch';

export type IssueDisplayMode = 'spread' | 'grid';

export type StudyMode = 'summarize' | 'study-guide' | 'explain' | 'quiz' | 'chat';

export type TrilingualText = Record<Lang, string>;

export type GlossaryCategory = 'all' | 'ai' | 'coding' | 'robotics' | 'cybersecurity';

export interface GlossaryTerm {
  id: string;
  category: Exclude<GlossaryCategory, 'all'>;
  ar: string;
  en: string;
  fr: string;
  definition: TrilingualText;
  example: TrilingualText;
}

export interface MagazineArticle {
  id: string;
  departmentNumber: string;
  department: TrilingualText;
  title: TrilingualText;
  subtitle: TrilingualText;
  juniorSummary: TrilingualText;
  author: TrilingualText;
  readTimeMin: number;
  tier: 'lead' | 'secondary' | 'department';
  isBonus?: boolean;
  imageUrl?: string;
  imageCaption?: TrilingualText;
  body: Record<Lang, string[]>;
  keyTakeaway: TrilingualText;
  qrSlug: string;
}

export interface PhishingEmail {
  id: string;
  senderName: string;
  senderAddress: string;
  subject: TrilingualText;
  preview: TrilingualText;
  body: TrilingualText;
  isPhishing: boolean;
  clues: TrilingualText[];
}

export interface BugChallenge {
  id: string;
  language: string;
  title: TrilingualText;
  prompt: TrilingualText;
  lines: string[];
  bugLineIndex: number; // 0-indexed
  hint: TrilingualText;
  explanation: TrilingualText;
  fixedLine: string;
}

export type SubmissionCategory = 'app' | 'robotics' | 'game' | 'idea';

export interface StudentSubmission {
  id: string;
  studentName: string;
  grade: string;
  category: SubmissionCategory;
  language: Lang;
  title: string;
  summary: string;
  createdAt: string;
  isFeatured?: boolean;
  votes: number;
}

export interface SuggestedIdea {
  id: string;
  pillar: TrilingualText;
  title: TrilingualText;
  impact: TrilingualText;
  description: TrilingualText;
  howToPilot: TrilingualText;
}

export interface LaunchScene {
  id: string;
  sceneNumber: string;
  duration: string;
  title: TrilingualText;
  stageCue: TrilingualText;
  script: TrilingualText;
}

export interface SchoolNewsDispatch {
  id: string;
  title: string;
  summary: string;
  localizedTitle?: TrilingualText;
  localizedSummary?: TrilingualText;
  publishedDate: string;
  sourceUrl: string;
  imageUrl?: string;
  isPinned?: boolean;
}

export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

export interface SavedStudySummary {
  id: string;
  mode: StudyMode;
  title: string;
  subject: string;
  gradeLevel: string;
  content: string;
  createdAt: string;
  lang: Lang;
}

