import { User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import {
  INITIAL_SCHOOL_NEWS,
  INITIAL_SUBMISSIONS,
  ISSUE_01_ARTICLES,
  MAGAZINE_GOALS,
} from '../data/magazineData';
import { UI_COPY } from '../data/translations';
import {
  BOOTSTRAPPED_ADMIN_EMAIL,
  db,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';
import {
  MagazineArticle,
  SchoolNewsDispatch,
  SiteHomepageSettings,
  StudentSubmission,
  TrilingualText,
} from '../types/magazine';

export const DEFAULT_HOMEPAGE_SETTINGS: SiteHomepageSettings = {
  brandTitle: {
    ar: UI_COPY.ar.brandTitle,
    en: UI_COPY.en.brandTitle,
    fr: UI_COPY.fr.brandTitle,
  },
  schoolName: {
    ar: UI_COPY.ar.schoolName,
    en: UI_COPY.en.schoolName,
    fr: UI_COPY.fr.schoolName,
  },
  slogan: {
    ar: UI_COPY.ar.slogan,
    en: UI_COPY.en.slogan,
    fr: UI_COPY.fr.slogan,
  },
  volumeLine: {
    ar: UI_COPY.ar.issueHeader.volumeLine,
    en: UI_COPY.en.issueHeader.volumeLine,
    fr: UI_COPY.fr.issueHeader.volumeLine,
  },
  issueTitle: {
    ar: UI_COPY.ar.issueHeader.issueTitle,
    en: UI_COPY.en.issueHeader.issueTitle,
    fr: UI_COPY.fr.issueHeader.issueTitle,
  },
  coverStoryLabel: {
    ar: 'مقال الغلاف: كيف يساعدنا الذكاء الاصطناعي؟',
    en: 'Cover Story: Learning Smarter with AI',
    fr: 'À la une : L’IA au service des élèves',
  },
  heroImageUrl: '/src/assets/images/hero_digital_minds_1795166809525.jpg',
  goalsTitle: {
    ar: UI_COPY.ar.issueHeader.goalsTitle,
    en: UI_COPY.en.issueHeader.goalsTitle,
    fr: UI_COPY.fr.issueHeader.goalsTitle,
  },
  goals: MAGAZINE_GOALS,
  isPublished: true,
};

function sanitizeId(raw: string, fallbackPrefix = 'item'): string {
  const cleaned = raw.trim().replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 120);
  if (cleaned.length >= 2) return cleaned;
  return `${fallbackPrefix}-${Date.now()}`;
}

function clampStr(val: string | undefined, maxLen: number, fallback = '—'): string {
  const trimmed = (val ?? '').trim();
  if (!trimmed) return fallback;
  return trimmed.slice(0, maxLen);
}

function sanitizeTrilingual(t: TrilingualText | undefined, maxLen: number, fallback = '—'): TrilingualText {
  const ar = clampStr(t?.ar, maxLen, fallback);
  const en = clampStr(t?.en, maxLen, ar);
  const fr = clampStr(t?.fr, maxLen, en);
  return { ar, en, fr };
}

function sanitizeStringArray(arr: string[] | undefined, maxItems: number, maxLen: number, fallback: string): string[] {
  const list = (arr ?? [])
    .map((item) => item.trim().slice(0, maxLen))
    .filter((item) => item.length > 0)
    .slice(0, maxItems);
  return list.length > 0 ? list : [fallback];
}

export async function checkIsAdmin(user: User | null): Promise<boolean> {
  if (!user || !user.emailVerified) return false;
  if (user.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()) {
    return true;
  }
  try {
    const snap = await getDoc(doc(db, 'admins', user.uid));
    return snap.exists() && snap.data()?.role === 'admin';
  } catch (err) {
    console.warn('Admin status check returned error:', err);
    return false;
  }
}

export function subscribeHomepageSettings(
  onData: (settings: SiteHomepageSettings, fromFirestore: boolean) => void
): () => void {
  const ref = doc(db, 'site_settings', 'homepage');
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        onData(DEFAULT_HOMEPAGE_SETTINGS, false);
        return;
      }
      const d = snap.data();
      const goalsAr = Array.isArray(d.goalsAr) ? (d.goalsAr as string[]) : [];
      const goalsEn = Array.isArray(d.goalsEn) ? (d.goalsEn as string[]) : [];
      const goalsFr = Array.isArray(d.goalsFr) ? (d.goalsFr as string[]) : [];
      const maxCount = Math.max(goalsAr.length, goalsEn.length, goalsFr.length);
      const goals: TrilingualText[] =
        maxCount > 0
          ? Array.from({ length: maxCount }, (_, idx) => ({
              ar: goalsAr[idx] ?? goalsEn[idx] ?? '—',
              en: goalsEn[idx] ?? goalsAr[idx] ?? '—',
              fr: goalsFr[idx] ?? goalsEn[idx] ?? '—',
            }))
          : MAGAZINE_GOALS;

      onData(
        {
          brandTitle: d.brandTitle ?? DEFAULT_HOMEPAGE_SETTINGS.brandTitle,
          schoolName: d.schoolName ?? DEFAULT_HOMEPAGE_SETTINGS.schoolName,
          slogan: d.slogan ?? DEFAULT_HOMEPAGE_SETTINGS.slogan,
          volumeLine: d.volumeLine ?? DEFAULT_HOMEPAGE_SETTINGS.volumeLine,
          issueTitle: d.issueTitle ?? DEFAULT_HOMEPAGE_SETTINGS.issueTitle,
          coverStoryLabel: d.coverStoryLabel ?? DEFAULT_HOMEPAGE_SETTINGS.coverStoryLabel,
          heroImageUrl: d.heroImageUrl || DEFAULT_HOMEPAGE_SETTINGS.heroImageUrl,
          goalsTitle: d.goalsTitle ?? DEFAULT_HOMEPAGE_SETTINGS.goalsTitle,
          goals,
          isPublished: d.isPublished !== false,
        },
        true
      );
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'site_settings/homepage');
    }
  );
}

export async function saveHomepageSettings(
  settings: SiteHomepageSettings,
  adminUid: string
): Promise<void> {
  const path = 'site_settings/homepage';
  const ref = doc(db, 'site_settings', 'homepage');

  const goals = settings.goals.slice(0, 10);
  const payload = {
    brandTitle: sanitizeTrilingual(settings.brandTitle, 80, 'عقول رقمية'),
    schoolName: sanitizeTrilingual(settings.schoolName, 140, 'Egyptian Language School'),
    slogan: sanitizeTrilingual(settings.slogan, 140, 'Code Today, Shape Tomorrow'),
    volumeLine: sanitizeTrilingual(settings.volumeLine, 140, 'ISSUE 01'),
    issueTitle: sanitizeTrilingual(settings.issueTitle, 180, 'Issue 01'),
    coverStoryLabel: sanitizeTrilingual(settings.coverStoryLabel, 160, 'Cover Story'),
    heroImageUrl: clampStr(settings.heroImageUrl, 600, DEFAULT_HOMEPAGE_SETTINGS.heroImageUrl),
    goalsTitle: sanitizeTrilingual(settings.goalsTitle, 140, 'Goals'),
    goalsAr: sanitizeStringArray(goals.map((g) => g.ar), 10, 260, 'تنمية مهارات الطلاب'),
    goalsEn: sanitizeStringArray(goals.map((g) => g.en), 10, 260, 'Develop student skills'),
    goalsFr: sanitizeStringArray(goals.map((g) => g.fr), 10, 260, 'Développer les compétences'),
    isPublished: Boolean(settings.isPublished),
    updatedBy: sanitizeId(adminUid),
    updatedAt: serverTimestamp(),
  };

  try {
    const existing = await getDoc(ref);
    if (existing.exists()) {
      await updateDoc(ref, payload);
    } else {
      await setDoc(ref, {
        ...payload,
        ownerId: sanitizeId(adminUid),
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeArticles(
  isAdminMode: boolean,
  onData: (articles: MagazineArticle[], fromFirestore: boolean) => void
): () => void {
  const colRef = collection(db, 'articles');
  const q = isAdminMode
    ? query(colRef, orderBy('sortOrder', 'asc'))
    : query(colRef, where('isPublished', '==', true));

  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onData(ISSUE_01_ARTICLES, false);
        return;
      }
      const mapped: MagazineArticle[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          departmentNumber: d.departmentNumber ?? '01',
          department: d.department,
          title: d.title,
          subtitle: d.subtitle,
          juniorSummary: d.juniorSummary,
          author: d.author,
          readTimeMin: typeof d.readTimeMin === 'number' ? d.readTimeMin : 3,
          tier: d.tier ?? 'department',
          isBonus: Boolean(d.isBonus),
          imageUrl: d.imageUrl || undefined,
          body: {
            ar: Array.isArray(d.bodyAr) ? d.bodyAr : [],
            en: Array.isArray(d.bodyEn) ? d.bodyEn : [],
            fr: Array.isArray(d.bodyFr) ? d.bodyFr : [],
          },
          keyTakeaway: d.keyTakeaway,
          qrSlug: d.qrSlug ?? docSnap.id,
          sortOrder: typeof d.sortOrder === 'number' ? d.sortOrder : 0,
          isPublished: d.isPublished !== false,
        };
      });
      mapped.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
      onData(mapped, true);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'articles');
    }
  );
}

export async function saveArticle(
  article: MagazineArticle,
  adminUid: string
): Promise<void> {
  const id = sanitizeId(article.id, 'article');
  const path = `articles/${id}`;
  const ref = doc(db, 'articles', id);

  const payload = {
    departmentNumber: clampStr(article.departmentNumber, 16, '01'),
    department: sanitizeTrilingual(article.department, 100, 'قسم'),
    title: sanitizeTrilingual(article.title, 200, 'مقال جديد'),
    subtitle: sanitizeTrilingual(article.subtitle, 400, 'ملخص المقال'),
    juniorSummary: sanitizeTrilingual(article.juniorSummary, 600, article.subtitle?.ar || 'ملخص مبسط'),
    author: sanitizeTrilingual(article.author, 140, 'هيئة التحرير — ELS'),
    readTimeMin: Math.max(1, Math.min(60, Math.round(article.readTimeMin || 3))),
    tier: article.tier === 'lead' || article.tier === 'secondary' ? article.tier : 'department',
    isBonus: Boolean(article.isBonus),
    imageUrl: (article.imageUrl ?? '').trim().slice(0, 600),
    bodyAr: sanitizeStringArray(article.body?.ar, 12, 1800, 'محتوى المقال باللغة العربية.'),
    bodyEn: sanitizeStringArray(article.body?.en, 12, 1800, 'Article content in English.'),
    bodyFr: sanitizeStringArray(article.body?.fr, 12, 1800, 'Contenu de l’article en français.'),
    keyTakeaway: sanitizeTrilingual(article.keyTakeaway, 300, 'الخلاصة'),
    qrSlug: sanitizeId(article.qrSlug || id, 'els-qr'),
    sortOrder: Math.max(0, Math.min(1000, Math.round(article.sortOrder ?? 10))),
    isPublished: article.isPublished !== false,
    updatedAt: serverTimestamp(),
  };

  try {
    const existing = await getDoc(ref);
    if (existing.exists()) {
      await updateDoc(ref, payload);
    } else {
      await setDoc(ref, {
        ...payload,
        ownerId: sanitizeId(adminUid),
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteArticleFromDb(articleId: string): Promise<void> {
  const id = sanitizeId(articleId);
  try {
    await deleteDoc(doc(db, 'articles', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `articles/${id}`);
  }
}

export function subscribeSchoolNews(
  isAdminMode: boolean,
  onData: (items: SchoolNewsDispatch[], fromFirestore: boolean) => void
): () => void {
  const colRef = collection(db, 'school_news');
  const q = isAdminMode
    ? query(colRef, orderBy('publishedDate', 'desc'))
    : query(colRef, where('isPublished', '==', true));

  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_SCHOOL_NEWS, false);
        return;
      }
      const mapped: SchoolNewsDispatch[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          title: d.title,
          summary: d.summary,
          localizedTitle: d.localizedTitle,
          localizedSummary: d.localizedSummary,
          publishedDate: d.publishedDate,
          sourceUrl: d.sourceUrl,
          imageUrl: d.imageUrl || undefined,
          isPinned: Boolean(d.isPinned),
          isPublished: d.isPublished !== false,
        };
      });
      mapped.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
      onData(mapped, true);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'school_news');
    }
  );
}

export async function saveSchoolNewsToDb(
  item: SchoolNewsDispatch,
  adminUid: string
): Promise<void> {
  const id = sanitizeId(item.id, 'news');
  const path = `school_news/${id}`;
  const ref = doc(db, 'school_news', id);

  const safeDate = /^\d{4}-\d{2}-\d{2}$/.test(item.publishedDate.trim())
    ? item.publishedDate.trim()
    : new Date().toISOString().slice(0, 10);

  const payload = {
    title: clampStr(item.title, 220, 'خبر مدرسي'),
    summary: clampStr(item.summary, 1200, 'تفاصيل الخبر'),
    localizedTitle: sanitizeTrilingual(
      item.localizedTitle ?? { ar: item.title, en: item.title, fr: item.title },
      220,
      item.title
    ),
    localizedSummary: sanitizeTrilingual(
      item.localizedSummary ?? { ar: item.summary, en: item.summary, fr: item.summary },
      1200,
      item.summary
    ),
    publishedDate: safeDate,
    sourceUrl: clampStr(
      item.sourceUrl,
      600,
      'https://www.facebook.com/profile.php?id=100057508656402'
    ),
    imageUrl: (item.imageUrl ?? '').trim().slice(0, 600),
    isPinned: Boolean(item.isPinned),
    isPublished: item.isPublished !== false,
    updatedAt: serverTimestamp(),
  };

  try {
    const existing = await getDoc(ref);
    if (existing.exists()) {
      await updateDoc(ref, payload);
    } else {
      await setDoc(ref, {
        ...payload,
        ownerId: sanitizeId(adminUid),
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteSchoolNewsFromDb(newsId: string): Promise<void> {
  const id = sanitizeId(newsId);
  try {
    await deleteDoc(doc(db, 'school_news', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `school_news/${id}`);
  }
}

export function subscribeSubmissions(
  isAdminMode: boolean,
  onData: (items: StudentSubmission[], fromFirestore: boolean) => void
): () => void {
  const colRef = collection(db, 'submissions');
  const q = isAdminMode
    ? query(colRef, orderBy('votes', 'desc'))
    : query(colRef, where('isPublished', '==', true));

  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_SUBMISSIONS, false);
        return;
      }
      const mapped: StudentSubmission[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          studentName: d.studentName,
          grade: d.grade,
          category: d.category,
          language: d.language,
          title: d.title,
          summary: d.summary,
          createdAt: d.createdDate ?? '2026-11-20',
          isFeatured: Boolean(d.isFeatured),
          isPublished: d.isPublished !== false,
          votes: typeof d.votes === 'number' ? d.votes : 1,
          ownerId: d.ownerId,
        };
      });
      mapped.sort((a, b) => b.votes - a.votes);
      onData(mapped, true);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'submissions');
    }
  );
}

export async function createSubmissionInDb(
  item: StudentSubmission,
  userUid: string
): Promise<void> {
  const id = sanitizeId(item.id, 'sub');
  const path = `submissions/${id}`;
  try {
    await setDoc(doc(db, 'submissions', id), {
      studentName: clampStr(item.studentName, 120, 'Student'),
      grade: clampStr(item.grade, 80, 'ELS'),
      category: item.category,
      language: item.language,
      title: clampStr(item.title, 200, 'Project'),
      summary: clampStr(item.summary, 1000, 'Project description'),
      createdDate: clampStr(item.createdAt, 32, new Date().toISOString().slice(0, 10)),
      isFeatured: false,
      votes: 1,
      isPublished: true,
      ownerId: sanitizeId(userUid),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function upvoteSubmissionInDb(submissionId: string): Promise<void> {
  const id = sanitizeId(submissionId);
  const path = `submissions/${id}`;
  try {
    await updateDoc(doc(db, 'submissions', id), {
      votes: increment(1),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function updateSubmissionAdminInDb(
  item: StudentSubmission
): Promise<void> {
  const id = sanitizeId(item.id);
  const path = `submissions/${id}`;
  try {
    await updateDoc(doc(db, 'submissions', id), {
      studentName: clampStr(item.studentName, 120, 'Student'),
      grade: clampStr(item.grade, 80, 'ELS'),
      category: item.category,
      language: item.language,
      title: clampStr(item.title, 200, 'Project'),
      summary: clampStr(item.summary, 1000, 'Project description'),
      isFeatured: Boolean(item.isFeatured),
      isPublished: item.isPublished !== false,
      votes: Math.max(0, Math.min(100000, Math.round(item.votes || 0))),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteSubmissionFromDb(submissionId: string): Promise<void> {
  const id = sanitizeId(submissionId);
  try {
    await deleteDoc(doc(db, 'submissions', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `submissions/${id}`);
  }
}

export interface AdminMember {
  uid: string;
  email: string;
  role: 'admin';
  addedBy: string;
}

export async function listAdminMembers(): Promise<AdminMember[]> {
  try {
    const snap = await getDocs(collection(db, 'admins'));
    return snap.docs.map((d) => ({
      uid: d.id,
      email: d.data().email ?? '',
      role: 'admin',
      addedBy: d.data().addedBy ?? '',
    }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'admins');
  }
}

export async function addAdminMember(
  targetUid: string,
  targetEmail: string,
  actorUid: string
): Promise<void> {
  const uid = sanitizeId(targetUid);
  const path = `admins/${uid}`;
  try {
    await setDoc(doc(db, 'admins', uid), {
      uid,
      email: clampStr(targetEmail, 160, 'admin@els.edu.eg'),
      role: 'admin',
      addedBy: sanitizeId(actorUid),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function removeAdminMember(targetUid: string): Promise<void> {
  const uid = sanitizeId(targetUid);
  try {
    await deleteDoc(doc(db, 'admins', uid));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `admins/${uid}`);
  }
}

/**
 * Seeds or restores the live Firestore database from the built-in Digital Minds editorial catalog.
 */
export async function seedDatabaseFromDefaults(adminUid: string): Promise<void> {
  const uid = sanitizeId(adminUid);
  try {
    const batch = writeBatch(db);

    const homepageRef = doc(db, 'site_settings', 'homepage');
    const existingHomepage = await getDoc(homepageRef);
    const goals = DEFAULT_HOMEPAGE_SETTINGS.goals.slice(0, 10);
    const homepagePayload = {
      brandTitle: DEFAULT_HOMEPAGE_SETTINGS.brandTitle,
      schoolName: DEFAULT_HOMEPAGE_SETTINGS.schoolName,
      slogan: DEFAULT_HOMEPAGE_SETTINGS.slogan,
      volumeLine: DEFAULT_HOMEPAGE_SETTINGS.volumeLine,
      issueTitle: DEFAULT_HOMEPAGE_SETTINGS.issueTitle,
      coverStoryLabel: DEFAULT_HOMEPAGE_SETTINGS.coverStoryLabel,
      heroImageUrl: DEFAULT_HOMEPAGE_SETTINGS.heroImageUrl,
      goalsTitle: DEFAULT_HOMEPAGE_SETTINGS.goalsTitle,
      goalsAr: goals.map((g) => g.ar),
      goalsEn: goals.map((g) => g.en),
      goalsFr: goals.map((g) => g.fr),
      isPublished: true,
      updatedBy: uid,
      updatedAt: serverTimestamp(),
    };
    if (existingHomepage.exists()) {
      batch.update(homepageRef, homepagePayload);
    } else {
      batch.set(homepageRef, {
        ...homepagePayload,
        ownerId: uid,
        createdAt: serverTimestamp(),
      });
    }

    ISSUE_01_ARTICLES.forEach((art, idx) => {
      const id = sanitizeId(art.id);
      batch.set(doc(db, 'articles', id), {
        departmentNumber: art.departmentNumber,
        department: art.department,
        title: art.title,
        subtitle: art.subtitle,
        juniorSummary: art.juniorSummary,
        author: art.author,
        readTimeMin: art.readTimeMin,
        tier: art.tier,
        isBonus: Boolean(art.isBonus),
        imageUrl: (art.imageUrl ?? '').slice(0, 600),
        bodyAr: art.body.ar,
        bodyEn: art.body.en,
        bodyFr: art.body.fr,
        keyTakeaway: art.keyTakeaway,
        qrSlug: sanitizeId(art.qrSlug),
        sortOrder: idx + 1,
        isPublished: true,
        ownerId: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    INITIAL_SCHOOL_NEWS.forEach((news) => {
      const id = sanitizeId(news.id);
      batch.set(doc(db, 'school_news', id), {
        title: news.title,
        summary: news.summary,
        localizedTitle: news.localizedTitle ?? { ar: news.title, en: news.title, fr: news.title },
        localizedSummary:
          news.localizedSummary ?? { ar: news.summary, en: news.summary, fr: news.summary },
        publishedDate: news.publishedDate,
        sourceUrl: news.sourceUrl,
        imageUrl: news.imageUrl ?? '',
        isPinned: Boolean(news.isPinned),
        isPublished: true,
        ownerId: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    INITIAL_SUBMISSIONS.forEach((sub) => {
      const id = sanitizeId(sub.id);
      batch.set(doc(db, 'submissions', id), {
        studentName: sub.studentName,
        grade: sub.grade,
        category: sub.category,
        language: sub.language,
        title: sub.title,
        summary: sub.summary,
        createdDate: sub.createdAt,
        isFeatured: Boolean(sub.isFeatured),
        votes: sub.votes,
        isPublished: true,
        ownerId: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'batch_seed_cms');
  }
}
