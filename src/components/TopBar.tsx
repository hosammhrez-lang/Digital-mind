import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavTab } from '../types/magazine';
import { UiCopy } from '../data/translations';
import { SCHOOL_LOGO_URL } from '../data/magazineData';

interface TopBarProps {
  brandTitle: string;
  nav: UiCopy['nav'];
  ctaLabel: string;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSubmit: () => void;
}

const TAB_ORDER: NavTab[] = ['issue', 'assistant', 'labs', 'glossary', 'showcase', 'launch', 'admin'];

export function TopBar({
  brandTitle,
  nav,
  ctaLabel,
  activeTab,
  onSelectTab,
  onOpenSubmit,
}: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileOpen(false);
  };

  return (
    <header className="no-print border-b border-[#E5E0D8] bg-[#FBF9F5]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 py-4">
        {/* Zone 1: School Crest + Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('issue')}
          className="inline-flex items-center gap-2.5 font-display text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
        >
          <img
            src={SCHOOL_LOGO_URL}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-contain border border-[#E5E0D8] bg-white p-0.5 shrink-0"
          />
          <span>{brandTitle}</span>
        </button>

        {/* Zone 2: Single-line text nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-4 lg:gap-5 text-xs lg:text-sm font-medium"
        >
          {TAB_ORDER.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleNav(tab)}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                  isActive
                    ? 'border-[#1E3A8A] text-[#1E3A8A] font-semibold'
                    : 'border-transparent text-[#57534E] hover:text-[#1C1917] hover:border-[#D6CEBE]'
                }`}
              >
                {nav[tab]}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA button (+ mobile menu button on small viewports) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenSubmit}
            className="rounded-md bg-[#1E3A8A] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#172554] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            {ctaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center rounded-md border border-[#E5E0D8] p-2 text-[#1C1917] hover:bg-[#F2EFE9] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#E5E0D8] bg-white px-4 py-3 flex flex-col gap-1"
        >
          {TAB_ORDER.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleNav(tab)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-start rounded-md px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold'
                    : 'text-[#1C1917] hover:bg-[#F2EFE9]'
                }`}
              >
                {nav[tab]}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
