import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, ArrowRight, ShieldCheck, Layers, Sparkles } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* 2026 Live Plant Operations Status Bar */}
      <div className="bg-zinc-950 text-white text-[11px] font-mono py-1 px-4 sm:px-8 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="truncate text-zinc-300">
            {t.nav.factoryLive}
          </span>
        </div>
        <div className="flex items-center gap-3 md:gap-4 text-zinc-400 shrink-0">
          <span className="hidden md:inline">{t.nav.standard}</span>
          <span className="hidden md:inline">•</span>
          <a href="tel:0903822188" className="hidden sm:inline text-emerald-400 hover:text-emerald-300 font-bold">
            {t.nav.hotline}: 0903.822.188
          </a>
          <span className="hidden sm:inline">•</span>
          {/* Quick Pill Switcher in Header Bar */}
          <LanguageSwitcher variant="compact-pill" />
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 py-2.5 shadow-sm'
            : 'bg-white border-b border-zinc-200/90 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between">
        {/* Brand Logo - Liên Châu */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer shrink-0"
        >
          <img
            src="https://theme.hstatic.net/200000421863/1000815266/14/logo.png?v=607"
            alt="Logo Liên Châu"
            className="h-10 sm:h-11 w-auto max-w-[140px] object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="font-bold text-lg sm:text-xl tracking-tight uppercase text-zinc-900 group-hover:text-emerald-700 transition-colors">
            Liên Châu
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-zinc-600">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors py-1 relative flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-700 font-bold'
                    : 'text-zinc-700 hover:text-emerald-600'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 bg-red-50 text-red-600 border border-red-200 text-[9px] font-mono font-bold rounded-sm uppercase">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Medium Navigation (lg) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors py-1 relative cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-emerald-700 font-bold' : 'text-zinc-700 hover:text-emerald-600'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher Dropdown */}
          <LanguageSwitcher variant="dropdown" />

          <a
            href="tel:0988688868"
            className="hidden 2xl:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-emerald-700 transition-colors border border-zinc-200 hover:border-emerald-500 px-3 py-2 bg-zinc-50 rounded-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono">0988.688.868</span>
          </a>

          <button
            onClick={() => handleLinkClick('contact')}
            className="bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 uppercase tracking-wider hover:bg-emerald-700 transition-all duration-200 shadow-md shadow-emerald-600/20 active:scale-95 rounded-sm cursor-pointer whitespace-nowrap"
          >
            {t.nav.requestQuoteBtn}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => handleLinkClick('contact')}
            className="sm:hidden px-3 py-1.5 bg-emerald-600 text-white font-bold text-[11px] uppercase tracking-wider rounded-sm cursor-pointer"
          >
            {t.nav.mobileQuoteBtn}
          </button>
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

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="tel:0988688868"
              className="flex items-center justify-center gap-2 py-2.5 bg-zinc-50 text-zinc-800 text-xs font-bold uppercase tracking-wider border border-zinc-200 rounded-sm"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>{t.nav.hotline}: 0988.688.868</span>
            </a>
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors rounded-sm cursor-pointer shadow-sm"
            >
              <span>{t.nav.mobileQuoteFull}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
