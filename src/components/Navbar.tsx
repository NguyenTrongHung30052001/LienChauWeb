import React, { useState, useEffect } from 'react';
import { Menu, X, Layers, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenQuote
}) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'products', label: t.nav.products },
    { id: 'process', label: t.nav.process },
    { id: 'news', label: t.nav.news },
    { id: 'careers', label: t.nav.careers, badge: t.nav.urgentBadge },
    { id: 'contact', label: t.nav.contact }
  ];

  const handleLinkClick = (pageId: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white border-b border-zinc-200/90 shadow-2xs">
      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md py-2 shadow-sm'
            : 'bg-white py-2.5 sm:py-3'
        }`}
      >
        <div className="w-full max-w-[94%] 2xl:max-w-[85%] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Brand Logo - Liên Châu */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center group cursor-pointer shrink-0 py-0.5"
            title="Liên Châu"
          >
            <img
              src="https://theme.hstatic.net/200000421863/1000815266/14/logo.png?v=607"
              alt="Logo Liên Châu"
              className="h-10 sm:h-12 w-auto max-w-[160px] sm:max-w-[180px] object-contain transition-transform group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Desktop Navigation - Responsive & Never Clipped */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-4 2xl:gap-6 text-xs xl:text-[13px] font-semibold text-zinc-700">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-all py-1.5 px-2 xl:px-2.5 rounded-sm relative flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-700 font-bold bg-emerald-50/60'
                      : 'hover:text-emerald-700 hover:bg-zinc-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 bg-red-50 text-red-600 border border-red-200 text-[10px] font-mono font-bold rounded-sm uppercase">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher */}
          <div className="hidden sm:flex items-center shrink-0">
            <LanguageSwitcher variant="dropdown" />
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-emerald-600 rounded-sm cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-6 py-5 mt-2 space-y-4 shadow-xl animate-in slide-in-from-top duration-200 text-left">
          {/* Mobile Language Switcher */}
          <div className="pb-3 border-b border-zinc-100">
            <LanguageSwitcher variant="mobile-list" />
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-sm flex items-center justify-between border-b border-zinc-100 cursor-pointer text-left ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-zinc-800 hover:bg-zinc-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 text-[9px] font-mono rounded-sm">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
