import { useState } from 'react';
import { Search } from 'lucide-react';
import { GlossaryCategory, Lang } from '../types/magazine';
import { UiCopy } from '../data/translations';
import { GLOSSARY_TERMS } from '../data/magazineData';
import { filterGlossaryTerms } from '../utils/magazineLogic';

interface GlossaryViewProps {
  lang: Lang;
  copy: UiCopy['glossary'];
}

export function GlossaryView({ lang, copy }: GlossaryViewProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GlossaryCategory>('all');

  const filtered = filterGlossaryTerms(GLOSSARY_TERMS, query, category);

  const categories: { id: GlossaryCategory; label: string }[] = [
    { id: 'all', label: copy.allCat },
    { id: 'ai', label: copy.aiCat },
    { id: 'coding', label: copy.codingCat },
    { id: 'robotics', label: copy.roboticsCat },
    { id: 'cybersecurity', label: copy.cyberCat },
  ];

  return (
    <div className="space-y-8">
      <header className="border-b border-[#E5E0D8] pb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              {copy.heading}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-2xl">
              {copy.subheading}
            </p>
          </div>
          <p className="font-mono-tabular text-sm font-medium text-[#1E3A8A]">
            {filtered.length} {copy.countSuffix}
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <label htmlFor="glossary-search" className="sr-only">
              {copy.searchPlaceholder}
            </label>
            <Search
              className="w-4 h-4 text-[#57534E] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="glossary-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full rounded-md border border-[#D6CEBE] bg-white ps-10 pe-4 py-2 text-sm text-[#1C1917] placeholder:text-[#78716C] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 rounded-md border border-[#E5E0D8] bg-[#F2EFE9] p-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  category === cat.id
                    ? 'bg-white text-[#1E3A8A] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="rounded-md border border-[#E5E0D8] bg-white p-10 text-center text-sm text-[#57534E]">
          {copy.emptyState}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((term) => (
            <article
              key={term.id}
              className="flex flex-col justify-between rounded-md border border-[#E5E0D8] bg-white p-5 sm:p-6"
            >
              <div>
                <div className="grid grid-cols-3 gap-2 border-b border-[#E5E0D8] pb-3 text-xs">
                  <div>
                    <span className="block text-[11px] text-[#78716C]">العربية</span>
                    <span className="font-semibold text-[#1C1917]" dir="rtl">
                      {term.ar}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#78716C]">English</span>
                    <span className="font-semibold text-[#1E3A8A]" dir="ltr">
                      {term.en}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#78716C]">Français</span>
                    <span className="font-semibold text-[#1C1917]" dir="ltr">
                      {term.fr}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-[#1C1917] leading-relaxed">
                  {term.definition[lang]}
                </p>
              </div>

              <p className="mt-4 border-t border-[#F2EFE9] pt-3 text-xs text-[#57534E]">
                <span className="font-semibold text-[#1C1917]">{copy.examplePrefix}</span>{' '}
                {term.example[lang]}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
