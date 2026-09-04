import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProcessPage } from './pages/ProcessPage';
import { NewsPage } from './pages/NewsPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { PhoneCall, FileText, ArrowUp, ShieldCheck } from 'lucide-react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { DataProvider } from './context/DataContext';

function AppContent() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Parse initial page from hash if available
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages: PageId[] = ['home', 'about', 'products', 'process', 'news', 'careers', 'contact', 'admin'];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductForQuote = (productName: string) => {
    setSelectedProductForQuote(productName);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuote={() => navigateTo('contact')}
      />

      {/* 2. Main Page Render */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProductForQuote={handleSelectProductForQuote}
            selectedProductForQuote={selectedProductForQuote}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigateToContact={() => navigateTo('contact')}
            onNavigateToProducts={() => navigateTo('products')}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onSelectProductForQuote={handleSelectProductForQuote}
            onNavigateToContact={() => navigateTo('contact')}
          />
        )}

        {currentPage === 'process' && (
          <ProcessPage
            onNavigateToContact={() => navigateTo('contact')}
            onNavigateToProducts={() => navigateTo('products')}
          />
        )}

        {currentPage === 'news' && (
          <NewsPage
            onNavigateToContact={() => navigateTo('contact')}
          />
        )}

        {currentPage === 'careers' && (
          <CareersPage
            onNavigateToContact={() => navigateTo('contact')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialProduct={selectedProductForQuote}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigateToPublicPage={navigateTo}
          />
        )}
      </main>

      {/* 3. Global Footer (Hide if inside admin or keep footer) */}
      <Footer onNavigate={navigateTo} />

      {/* 4. Floating Action Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto p-2.5 bg-white text-zinc-700 hover:text-emerald-700 hover:border-emerald-500 border border-zinc-200 shadow-md rounded-full transition-all cursor-pointer hover:scale-105"
            title={t.common.back}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Quick Quote Floating Button */}
        {currentPage !== 'admin' && (
          <button
            onClick={() => navigateTo('contact')}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-xs shadow-xl hover:scale-105 active:scale-95 transition-all group font-mono rounded-full border border-zinc-700 cursor-pointer"
            title={t.nav.mobileQuoteFull}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">{t.nav.mobileQuoteBtn}</span>
            <span className="sm:hidden">{t.nav.mobileQuoteBtn}</span>
          </button>
        )}

        {/* Hotline Direct Call Button */}
        <a
          href="tel:0988688868"
          className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all group font-mono rounded-full border border-emerald-500"
          title="Hotline: 0988.688.868"
        >
          <PhoneCall className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">0988.688.868</span>
          <span className="sm:hidden">HOTLINE</span>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </LanguageProvider>
  );
}
