import React, { useState } from 'react';
import { Menu, X, Sparkles, Globe, Heart } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  isPremium: boolean;
  setIsPremium: (val: boolean) => void;
  onOpenCheckin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  isPremium,
  setIsPremium,
  onOpenCheckin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard },
    { id: 'checkin', label: t.nav.checkin },
    { id: 'meal', label: t.nav.meal },
    { id: 'nutrition', label: t.nav.nutrition },
    { id: 'body', label: t.nav.bodyInsights },
    { id: 'stores', label: t.nav.stores },
    { id: 'learn', label: t.nav.learn },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#4A2234] text-[#FAF7F2] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                L
              </div>
              <span className="font-serif-cormorant text-2xl md:text-3xl font-semibold tracking-wider text-[#4A2234] whitespace-nowrap">
                {t.brandName}
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap transition-colors py-1 relative ${
                  activeTab === item.id
                    ? 'text-[#4A2234] font-semibold'
                    : 'hover:text-[#4A2234]'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C4677E] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions (Language toggle, Freemium toggle, Primary CTA) */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-[#D8CECE] bg-white text-stone-700 hover:bg-[#F3EDE2] transition-colors whitespace-nowrap"
              title="Toggle English / اردو"
            >
              <Globe className="w-3.5 h-3.5 text-[#C4677E]" />
              <span>{language === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Freemium Indicator / Switcher */}
            <button
              onClick={() => setIsPremium(!isPremium)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                isPremium
                  ? 'bg-[#4A2234] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#EFE8DD] text-stone-700 hover:bg-[#E5DCCF]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isPremium ? 'Lunara Plus' : 'Free Tier'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenCheckin}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-[#C4677E] hover:bg-[#B3566D] rounded-lg shadow-sm transition-transform active:scale-95 whitespace-nowrap"
            >
              <Heart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.hero.startCheckin}</span>
              <span className="sm:hidden">{t.nav.checkin}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DEC8] bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-[#F2E8DC] text-[#4A2234] font-semibold'
                  : 'text-stone-700 hover:bg-[#F7F2EA]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
