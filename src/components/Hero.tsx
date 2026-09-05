import React from 'react';
import { ArrowRight, ShieldCheck, Factory, CheckCircle2, Sliders, ExternalLink } from 'lucide-react';
import { ProductSpecimenStudio } from './ProductSpecimenStudio';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onContactClick }) => {
  const { t, language } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-8 sm:pt-10 pb-16 lg:pt-12 lg:pb-20 bg-[#faf9f6] bg-textile-grid border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Top Industrial Meta Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-200/80 text-left">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-900 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              {t.hero.badge}
            </span>
            <span className="text-zinc-300">|</span>
            <span className="text-xs font-mono text-zinc-500 uppercase">
              KCN Sóng Thần 3, Bình Dương
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
            <span>ISO 9001:2015</span>
            <span>•</span>
            <span>OEKO-TEX STANDARD 100</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">GRS RECYCLED 4.0</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-10 lg:py-12">
          
          {/* Left Column: Authoritative Industrial Typography & Value Props */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold font-mono text-emerald-700 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                {t.hero.titlePart1} • {t.hero.titlePart3}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight uppercase text-zinc-900">
                {t.hero.titlePart2}
              </h1>
            </div>

            <p className="text-zinc-600 text-sm leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* Industrial Specification Highlights */}
            <div className="grid grid-cols-2 gap-3 py-2 text-xs text-zinc-700 font-mono">
              <div className="p-3 bg-white border border-zinc-200 rounded-sm shadow-2xs">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">{t.hero.stat2Label}</span>
                <span className="text-sm font-bold text-zinc-900">
                  {language === 'en' ? '18,000,000 m/mo' : language === 'id' ? '18.000.000 m/bln' : '18.000.000 m/tháng'}
                </span>
              </div>
              <div className="p-3 bg-white border border-zinc-200 rounded-sm shadow-2xs">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">{t.hero.stat1Label}</span>
                <span className="text-sm font-bold text-emerald-700">
                  {language === 'en' ? '250+ Looms' : language === 'id' ? '250+ Mesin' : '250+ Máy Dệt'}
                </span>
              </div>
              <div className="p-3 bg-white border border-zinc-200 rounded-sm shadow-2xs">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">
                  {language === 'en' ? 'Tensile Load ISO 13934' : language === 'id' ? 'Kekuatan Tarik ISO 13934' : 'Lực kéo đứt ISO 13934'}
                </span>
                <span className="text-sm font-bold text-zinc-900">&gt; 180N – 260N</span>
              </div>
              <div className="p-3 bg-white border border-zinc-200 rounded-sm shadow-2xs">
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">{t.hero.stat3Label}</span>
                <span className="text-sm font-bold text-emerald-700">100% Class 1</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={onContactClick}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95 rounded-sm cursor-pointer"
              >
                {t.hero.btnQuote}
              </button>
              <button
                onClick={() => scrollToSection('textile-lab')}
                className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors active:scale-95 rounded-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>{t.hero.btnLab}</span>
              </button>
              <button
                onClick={() => scrollToSection('braider-sim')}
                className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 font-bold text-xs uppercase tracking-wider transition-colors active:scale-95 rounded-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>{t.hero.btnBraider}</span>
              </button>
              <button
                onClick={() => scrollToSection('shoe-match-studio')}
                className="px-4 py-3 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-xs uppercase tracking-wider transition-colors border border-zinc-300 active:scale-95 rounded-sm cursor-pointer"
              >
                {t.hero.btnShoeMatch}
              </button>
              <button
                onClick={() => scrollToSection('b2b-calculator')}
                className="px-4 py-3 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-xs uppercase tracking-wider transition-colors border border-zinc-300 active:scale-95 rounded-sm cursor-pointer"
              >
                {t.hero.btnB2B}
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Fabric & Specimen Studio */}
          <div className="lg:col-span-6 w-full text-left">
            <ProductSpecimenStudio onSelectProductForQuote={onContactClick} />
          </div>

        </div>

        {/* Bottom Industrial Data Strip */}
        <div className="pt-8 border-t border-zinc-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono">
              {language === 'en' ? '16+ Years' : language === 'id' ? '16+ Tahun' : '16+ Năm'}
            </div>
            <div className="text-xs text-zinc-500 uppercase font-mono mt-0.5">{t.hero.stat4Label}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono">
              {language === 'en' ? '250+ Looms' : language === 'id' ? '250+ Mesin' : '250+ Máy'}
            </div>
            <div className="text-xs text-zinc-500 uppercase font-mono mt-0.5">{t.hero.stat1Label}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono">
              {language === 'en' ? '650+ Brands' : language === 'id' ? '650+ Mitra' : '650+ Đối Tác'}
            </div>
            <div className="text-xs text-zinc-500 uppercase font-mono mt-0.5">OEM / ODM / FOB</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono">
              {language === 'en' ? '100% QC Pass' : language === 'id' ? '100% Lulus QC' : '100% KCS'}
            </div>
            <div className="text-xs text-zinc-500 uppercase font-mono mt-0.5">{t.hero.stat3Label}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
