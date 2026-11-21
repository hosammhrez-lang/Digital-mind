import { useState, FormEvent } from 'react';
import { ExternalLink, Plus, Trash2, CheckCircle2, X } from 'lucide-react';
import { Lang, SchoolNewsDispatch } from '../types/magazine';
import { SCHOOL_FACEBOOK_URL, SCHOOL_LOGO_URL } from '../data/magazineData';
import { createNewsDispatchRecord, validateNewsDispatch } from '../utils/magazineLogic';
import { EditorialImage } from './EditorialImage';
import { QrCodeSvg } from './QrCodeSvg';

interface SchoolNewsSectionProps {
  lang: Lang;
  dispatches: SchoolNewsDispatch[];
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
  onAddDispatch: (item: SchoolNewsDispatch) => void;
  onRemoveDispatch: (id: string) => void;
}

const NEWS_COPY: Record<
  Lang,
  {
    heading: string;
    subtitle: string;
    pageTitle: string;
    pageNote: string;
    visitPage: string;
    qrCaption: string;
    addToggleOpen: string;
    addToggleClose: string;
    fieldTitle: string;
    fieldDate: string;
    fieldUrl: string;
    fieldImageUrl: string;
    fieldSummary: string;
    publishBtn: string;
    readPost: string;
    photoSourceLabel: string;
    deletePost: string;
    savedNotice: string;
    errTitle: string;
    errSummary: string;
    errDate: string;
    errUrl: string;
  }
> = {
  ar: {
    heading: 'أخبار المدرسة — من الصفحة الرسمية على فيسبوك',
    subtitle:
      'أحدث المنشورات والفعاليات بالصور المنقولة مباشرة من الصفحة الرسمية للمدرسة المصرية بالدوحة على فيسبوك، مع إمكانية إضافة منشورات جديدة للعدد.',
    pageTitle: 'المدرسة المصرية بالدوحة — الصفحة الرسمية',
    pageNote: 'تُحدَّث أخبار الفعاليات والتكريمات عبر صفحة المدرسة الرسمية.',
    visitPage: 'فتح صفحة المدرسة على فيسبوك',
    qrCaption: 'امسح الرمز لفتح صفحة المدرسة',
    addToggleOpen: 'إدراج خبر من صفحة المدرسة',
    addToggleClose: 'إغلاق نموذج الخبر',
    fieldTitle: 'عنوان الخبر أو المنشور',
    fieldDate: 'تاريخ النشر',
    fieldUrl: 'رابط المنشور على فيسبوك (اختياري)',
    fieldImageUrl: 'رابط الصورة المرفقة (اختياري)',
    fieldSummary: 'نص أو ملخص الخبر من صفحة المدرسة',
    publishBtn: 'نشر الخبر في المجلة',
    readPost: 'عرض المنشور على فيسبوك',
    photoSourceLabel: 'صورة من الصفحة الرسمية على فيسبوك',
    deletePost: 'حذف الخبر',
    savedNotice: 'تمت إضافة الخبر من صفحة المدرسة إلى نشرة المجلة بنجاح.',
    errTitle: 'يرجى كتابة عنوان واضح للخبر (4 أحرف على الأقل).',
    errSummary: 'يرجى كتابة ملخص للخبر (10 أحرف على الأقل).',
    errDate: 'يرجى تحديد تاريخ النشر.',
    errUrl: 'يرجى إدخال رابط يبدأ بـ http:// أو https://.',
  },
  en: {
    heading: 'ELS School News — Direct from Official Facebook',
    subtitle:
      'Verified announcements and event photos published from the official Egyptian Language School in Doha Facebook page.',
    pageTitle: 'Egyptian Language School In Doha — Facebook',
    pageNote: 'Follow school-wide celebrations, awards, and activities or import new posts.',
    visitPage: 'Open School Facebook Page',
    qrCaption: 'Scan to visit ELS Facebook',
    addToggleOpen: 'Add Post from School Page',
    addToggleClose: 'Close Post Form',
    fieldTitle: 'News Headline',
    fieldDate: 'Publish Date',
    fieldUrl: 'Facebook Post URL (optional)',
    fieldImageUrl: 'Supporting Photo URL (optional)',
    fieldSummary: 'Post summary or announcement text',
    publishBtn: 'Publish School News',
    readPost: 'View Post on Facebook',
    photoSourceLabel: 'Photo sourced from ELS Facebook post',
    deletePost: 'Remove post',
    savedNotice: 'School news dispatch published to the magazine feed.',
    errTitle: 'Please enter a headline (at least 4 characters).',
    errSummary: 'Please enter a news summary (at least 10 characters).',
    errDate: 'Please select a publish date.',
    errUrl: 'URL must start with http:// or https://.',
  },
  fr: {
    heading: 'Actualités de l’École — En direct de Facebook',
    subtitle:
      'Dernières publications et photos officielles issues de la page Facebook de l’École Égyptienne des Langues à Doha.',
    pageTitle: 'École Égyptienne des Langues à Doha — Facebook',
    pageNote: 'Suivez la vie de l’établissement ou ajoutez une nouvelle actualité.',
    visitPage: 'Ouvrir la page Facebook',
    qrCaption: 'Scanner vers Facebook ELS',
    addToggleOpen: 'Importer un post de l’école',
    addToggleClose: 'Fermer le formulaire',
    fieldTitle: 'Titre de l’actualité',
    fieldDate: 'Date de publication',
    fieldUrl: 'Lien du post Facebook (optionnel)',
    fieldImageUrl: 'Lien de la photo (optionnel)',
    fieldSummary: 'Résumé ou texte de l’annonce scolaire',
    publishBtn: 'Publier l’actualité',
    readPost: 'Voir le post sur Facebook',
    photoSourceLabel: 'Photo issue du post Facebook officiel',
    deletePost: 'Supprimer',
    savedNotice: 'L’actualité scolaire a été ajoutée au journal.',
    errTitle: 'Veuillez saisir un titre (4 caractères minimum).',
    errSummary: 'Veuillez rédiger un résumé (10 caractères minimum).',
    errDate: 'Veuillez choisir une date.',
    errUrl: 'Le lien doit commencer par http:// ou https://.',
  },
};

export function SchoolNewsSection({
  lang,
  dispatches,
  isAdmin = false,
  onOpenAdmin,
  onAddDispatch,
  onRemoveDispatch,
}: SchoolNewsSectionProps) {
  const copy = NEWS_COPY[lang];
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [publishedDate, setPublishedDate] = useState('2026-11-20');
  const [sourceUrl, setSourceUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSavedNotice(false);

    const validation = validateNewsDispatch({
      title,
      summary,
      publishedDate,
      sourceUrl,
    });

    if (!validation.valid) {
      const mapped: Record<string, string> = {};
      if (validation.errors.title) mapped.title = copy.errTitle;
      if (validation.errors.summary) mapped.summary = copy.errSummary;
      if (validation.errors.publishedDate) mapped.publishedDate = copy.errDate;
      if (validation.errors.sourceUrl) mapped.sourceUrl = copy.errUrl;
      setErrors(mapped);
      return;
    }

    const record = createNewsDispatchRecord(
      { title, summary, publishedDate, sourceUrl },
      SCHOOL_FACEBOOK_URL
    );
    const trimmedImage = imageUrl.trim();
    if (trimmedImage && /^https?:\/\/.+/i.test(trimmedImage)) {
      record.imageUrl = trimmedImage;
    }
    onAddDispatch(record);
    setErrors({});
    setTitle('');
    setSourceUrl('');
    setImageUrl('');
    setSummary('');
    setSavedNotice(true);
  };

  return (
    <section
      aria-labelledby="school-news-heading"
      className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6"
    >
      {/* Top School Identity & Facebook Link Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E5E0D8] pb-6">
        <div className="flex items-start gap-4">
          <img
            src={SCHOOL_LOGO_URL}
            alt="شعار المدرسة المصرية للغات — Egyptian Language School Emblem"
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain border border-[#E5E0D8] bg-white p-1 shrink-0"
          />
          <div>
            <h2
              id="school-news-heading"
              className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]"
            >
              {copy.heading}
            </h2>
            <p className="mt-1.5 text-sm text-[#57534E] max-w-2xl leading-relaxed">
              {copy.subtitle}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={SCHOOL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#1E3A8A] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#172554] transition-colors whitespace-nowrap shrink-0"
              >
                <span>{copy.visitPage}</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setFormOpen((prev) => !prev)}
                aria-expanded={formOpen}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#D6CEBE] bg-[#FBF9F5] px-4 py-2 text-xs sm:text-sm font-medium text-[#1C1917] hover:bg-[#F2EFE9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {formOpen ? (
                  <X className="w-4 h-4 text-[#1E3A8A]" aria-hidden="true" />
                ) : (
                  <Plus className="w-4 h-4 text-[#1E3A8A]" aria-hidden="true" />
                )}
                <span>{formOpen ? copy.addToggleClose : copy.addToggleOpen}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-3 self-start lg:self-center shrink-0">
          <QrCodeSvg value={SCHOOL_FACEBOOK_URL} label={copy.qrCaption} size={76} />
          <div className="max-w-[130px]">
            <p className="text-xs font-semibold text-[#1C1917]">{copy.pageTitle}</p>
            <p className="mt-1 text-[11px] text-[#57534E]">{copy.qrCaption}</p>
          </div>
        </div>
      </div>

      {/* Expandable Form to Import/Add Post from School Facebook Page */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-md border border-[#D6CEBE] bg-[#FBF9F5] p-5 space-y-4"
        >
          {!isAdmin && onOpenAdmin && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-[#1E3A8A]/25 bg-white px-4 py-2.5 text-xs text-[#57534E]">
              <span>
                {lang === 'ar'
                  ? 'معاينة محلية: لنشر الخبر في قاعدة البيانات الدائمة للجميع، سجّل الدخول كمشرف في وحدة التحكم.'
                  : lang === 'fr'
                    ? 'Aperçu local : connectez-vous en tant qu’administrateur pour publier dans la base de données.'
                    : 'Local preview mode: sign in as Admin in the Control Panel to save news permanently to Firestore.'}
              </span>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="font-semibold text-[#1E3A8A] hover:underline cursor-pointer shrink-0"
              >
                {lang === 'ar' ? 'فتح وحدة التحكم' : lang === 'fr' ? 'Ouvrir l’administration' : 'Open Control Panel'}
              </button>
            </div>
          )}

          {savedNotice && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-md border border-[#14532D]/30 bg-[#14532D]/5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#14532D]"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{copy.savedNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="news-title"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                {copy.fieldTitle}
              </label>
              <input
                id="news-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-[#D6CEBE] bg-white px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-[#9A3412]">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="news-date"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                {copy.fieldDate}
              </label>
              <input
                id="news-date"
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                className="w-full rounded-md border border-[#D6CEBE] bg-white px-3.5 py-2 text-sm font-mono-tabular text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
              {errors.publishedDate && (
                <p className="mt-1 text-xs text-[#9A3412]">{errors.publishedDate}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="news-url"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                {copy.fieldUrl}
              </label>
              <input
                id="news-url"
                type="url"
                dir="ltr"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder={SCHOOL_FACEBOOK_URL}
                className="w-full rounded-md border border-[#D6CEBE] bg-white px-3.5 py-2 text-sm font-mono-tabular text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
              {errors.sourceUrl && (
                <p className="mt-1 text-xs text-[#9A3412]">{errors.sourceUrl}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="news-image-url"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                {copy.fieldImageUrl}
              </label>
              <input
                id="news-image-url"
                type="url"
                dir="ltr"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-md border border-[#D6CEBE] bg-white px-3.5 py-2 text-sm font-mono-tabular text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="news-summary"
              className="block text-xs font-semibold text-[#1C1917] mb-1.5"
            >
              {copy.fieldSummary}
            </label>
            <textarea
              id="news-summary"
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-md border border-[#D6CEBE] bg-white px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1E3A8A] focus:outline-none"
            />
            {errors.summary && (
              <p className="mt-1 text-xs text-[#9A3412]">{errors.summary}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-[#1E3A8A] px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#172554] transition-colors cursor-pointer"
            >
              {copy.publishBtn}
            </button>
          </div>
        </form>
      )}

      {/* Dispatches Grid with Real Facebook Event Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {dispatches.map((item) => {
          const displayTitle = item.localizedTitle ? item.localizedTitle[lang] : item.title;
          const displaySummary = item.localizedSummary ? item.localizedSummary[lang] : item.summary;
          return (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-md border border-[#E5E0D8] bg-[#FBF9F5] overflow-hidden"
            >
              <div>
                {item.imageUrl && (
                  <div className="relative h-52 sm:h-56 overflow-hidden border-b border-[#E5E0D8] bg-[#EFECE5]">
                    <EditorialImage
                      src={item.imageUrl}
                      alt={displayTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 text-xs text-[#57534E]">
                    <span className="font-mono-tabular font-medium text-[#1E3A8A]">
                      {item.publishedDate}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.imageUrl && (
                        <span className="text-[11px] text-[#57534E]">
                          {copy.photoSourceLabel}
                        </span>
                      )}
                      {!item.isPinned && isAdmin && (
                        <button
                          type="button"
                          onClick={() => onRemoveDispatch(item.id)}
                          aria-label={`${copy.deletePost}: ${item.title}`}
                          className="inline-flex items-center gap-1 text-xs text-[#57534E] hover:text-[#9A3412] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 font-display text-base sm:text-lg font-semibold text-[#1C1917] leading-snug">
                    {displayTitle}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#57534E] leading-relaxed">
                    {displaySummary}
                  </p>
                </div>
              </div>

              <div className="mx-5 mb-5 border-t border-[#E5E0D8] pt-3">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline"
                >
                  <span>{copy.readPost}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
