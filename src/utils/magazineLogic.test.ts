import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addUniqueId,
  clampFlipbookPage,
  createNewsDispatchRecord,
  createSavedSummaryRecord,
  createSubmissionRecord,
  evaluateBugHunt,
  evaluatePhishingAttempt,
  evaluateRobotNavigation,
  filterGlossaryTerms,
  generateQrMatrix,
  toggleIdInList,
  validateNewsDispatch,
  validateStudyInput,
  validateSubmission,
} from './magazineLogic';
import type { BugChallenge, GlossaryTerm, PhishingEmail } from '../types/magazine';

const sampleTerms: GlossaryTerm[] = [
  {
    id: 'algorithm',
    category: 'coding',
    ar: 'خوارزمية',
    en: 'Algorithm',
    fr: 'Algorithme',
    definition: {
      ar: 'مجموعة خطوات مرتبة لحل مشكلة.',
      en: 'An ordered sequence of steps to solve a problem.',
      fr: 'Une suite ordonnée d’étapes pour résoudre un problème.',
    },
    example: {
      ar: 'وصفة تحضير كوب شاي خطوة بخطوة.',
      en: 'A step-by-step recipe to sort student scores.',
      fr: 'Une recette étape par étape pour trier des notes.',
    },
  },
  {
    id: 'phishing',
    category: 'cybersecurity',
    ar: 'التصيد الإلكتروني',
    en: 'Phishing',
    fr: 'Hameçonnage',
    definition: {
      ar: 'محاولة خداع المستخدم لسرقة بياناته.',
      en: 'A deceptive message trying to steal credentials.',
      fr: 'Un message trompeur visant à voler des identifiants.',
    },
    example: {
      ar: 'رسالة تطلب كلمة مرورك بشكل عاجل.',
      en: 'An urgent link asking for your school password.',
      fr: 'Un lien urgent demandant votre mot de passe.',
    },
  },
];

test('filterGlossaryTerms filters by category and trilingual query', () => {
  assert.equal(filterGlossaryTerms(sampleTerms, '', 'all').length, 2);
  assert.equal(filterGlossaryTerms(sampleTerms, '', 'cybersecurity').length, 1);
  assert.equal(filterGlossaryTerms(sampleTerms, 'خوارزمية', 'all')[0].id, 'algorithm');
  assert.equal(filterGlossaryTerms(sampleTerms, 'hameçonnage', 'all')[0].id, 'phishing');
});

test('evaluateRobotNavigation switches between TURN_RIGHT, CAUTION, and FORWARD', () => {
  const blocked = evaluateRobotNavigation(15, 25);
  assert.equal(blocked.action, 'TURN_RIGHT');
  assert.ok(blocked.rightMotorPower < 0);

  const caution = evaluateRobotNavigation(30, 25);
  assert.equal(caution.action, 'CAUTION');
  assert.equal(caution.leftMotorPower, 55);

  const clear = evaluateRobotNavigation(60, 25);
  assert.equal(clear.action, 'FORWARD');
  assert.equal(clear.leftMotorPower, 100);
});

test('evaluatePhishingAttempt awards points only on accurate classification', () => {
  const email: PhishingEmail = {
    id: 'p1',
    senderName: 'Admin',
    senderAddress: 'help@els-verify-login.xyz',
    subject: { ar: 'عاجل', en: 'Urgent', fr: 'Urgent' },
    preview: { ar: 'تحقق', en: 'Verify', fr: 'Vérifiez' },
    body: { ar: 'أدخل كلمة المرور', en: 'Enter password', fr: 'Entrez mot de passe' },
    isPhishing: true,
    clues: [],
  };

  assert.deepEqual(evaluatePhishingAttempt(email, true), {
    correct: true,
    isPhishing: true,
    scoreDelta: 10,
  });
  assert.deepEqual(evaluatePhishingAttempt(email, false), {
    correct: false,
    isPhishing: true,
    scoreDelta: 0,
  });
});

test('evaluateBugHunt verifies exact line index', () => {
  const challenge: BugChallenge = {
    id: 'b1',
    language: 'Python',
    title: { ar: 'تحدي', en: 'Challenge', fr: 'Défi' },
    prompt: { ar: 'اختر السطر', en: 'Pick line', fr: 'Choisissez' },
    lines: ['x = 5', 'if x = 5:', '    print(x)'],
    bugLineIndex: 1,
    hint: { ar: 'تلميح', en: 'Hint', fr: 'Indice' },
    explanation: { ar: 'شرح', en: 'Explain', fr: 'Explication' },
    fixedLine: 'if x == 5:',
  };

  assert.equal(evaluateBugHunt(challenge, 1).correct, true);
  assert.equal(evaluateBugHunt(challenge, 0).correct, false);
});

test('validateSubmission rejects empty/short inputs and accepts valid submissions', () => {
  const invalid = validateSubmission({
    studentName: '',
    grade: '',
    category: 'app',
    language: 'en',
    title: 'Hi',
    summary: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.studentName);
  assert.ok(invalid.errors.title);

  const validInput = {
    studentName: 'Mariam Tarek',
    grade: 'Prep 2',
    category: 'robotics' as const,
    language: 'ar' as const,
    title: 'Smart Classroom Light Sensor',
    summary: 'Uses an LDR resistor and Arduino to dim LEDs automatically.',
  };
  assert.equal(validateSubmission(validInput).valid, true);
  const record = createSubmissionRecord(validInput, new Date('2026-11-20T10:00:00Z'));
  assert.equal(record.createdAt, '2026-11-20');
  assert.equal(record.studentName, 'Mariam Tarek');
});

test('generateQrMatrix produces deterministic finder-bordered boolean matrix', () => {
  const m1 = generateQrMatrix('els-issue-01-ai');
  const m2 = generateQrMatrix('els-issue-01-ai');
  assert.equal(m1.length, 17);
  assert.deepEqual(m1, m2);
  // Top-left finder corner must be filled
  assert.equal(m1[0][0], true);
  assert.equal(m1[2][2], true);
});

test('validateNewsDispatch validates required fields and optional URL format', () => {
  const invalid = validateNewsDispatch({
    title: 'Hi',
    summary: 'Short',
    publishedDate: '',
    sourceUrl: 'not-a-url',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.summary);
  assert.ok(invalid.errors.publishedDate);
  assert.ok(invalid.errors.sourceUrl);

  const valid = validateNewsDispatch({
    title: 'معرض الابتكار بالمدرسة',
    summary: 'تغطية افتتاح معرض مشروعات الطلاب في معمل الحاسب الآلي.',
    publishedDate: '2026-11-20',
    sourceUrl: '',
  });
  assert.equal(valid.valid, true);

  const record = createNewsDispatchRecord(
    {
      title: 'معرض الابتكار بالمدرسة',
      summary: 'تغطية افتتاح معرض مشروعات الطلاب في معمل الحاسب الآلي.',
      publishedDate: '2026-11-20',
      sourceUrl: '',
    },
    'https://www.facebook.com/profile.php?id=100057508656402'
  );
  assert.equal(record.sourceUrl, 'https://www.facebook.com/profile.php?id=100057508656402');
});

test('clampFlipbookPage and bookmark helpers behave deterministically', () => {
  assert.equal(clampFlipbookPage(-2, 12), 0);
  assert.equal(clampFlipbookPage(5, 12), 5);
  assert.equal(clampFlipbookPage(99, 12), 11);
  assert.equal(clampFlipbookPage(3, 0), 0);

  const afterAdd = toggleIdInList(['ai-corner'], 'robotics-innovation');
  assert.deepEqual(afterAdd, ['ai-corner', 'robotics-innovation']);
  assert.deepEqual(toggleIdInList(afterAdd, 'ai-corner'), ['robotics-innovation']);
  assert.deepEqual(addUniqueId(['ai-corner'], 'ai-corner'), ['ai-corner']);
});

test('validateStudyInput and createSavedSummaryRecord validate and structure study notes', () => {
  assert.deepEqual(validateStudyInput({ mode: 'summarize', prompt: ' ', sourceText: '' }), {
    valid: false,
    error: 'empty_input',
  });
  assert.deepEqual(validateStudyInput({ mode: 'explain', prompt: 'AI', sourceText: '' }), {
    valid: false,
    error: 'too_short',
  });
  assert.deepEqual(
    validateStudyInput({
      mode: 'study-guide',
      prompt: 'Photosynthesis stages',
      sourceText: '',
    }),
    { valid: true }
  );

  const note = createSavedSummaryRecord(
    {
      mode: 'study-guide',
      title: '',
      subject: 'Science',
      gradeLevel: 'Prep 2',
      content: '### Light Reactions\nPlants convert light energy.',
      lang: 'en',
    },
    new Date('2026-11-20T12:00:00Z')
  );
  assert.equal(note.title, 'Light Reactions');
  assert.equal(note.createdAt, '2026-11-20');
  assert.equal(note.subject, 'Science');
});
