import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck, Factory, Award } from 'lucide-react';
import { PageId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-12 text-zinc-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-zinc-200 text-left">
          
          {/* Col 1: Brand & Intro (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://theme.hstatic.net/200000421863/1000815266/14/logo.png?v=607"
                alt="Logo Liên Châu"
                className="h-10 w-auto max-w-[130px] object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-1.5 uppercase font-mono">
                LIÊN CHÂU
                <span className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-800 font-mono font-bold border border-emerald-200 rounded-sm">
                  OEM
                </span>
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              {t.footer.companyDesc}
            </p>

            <div className="space-y-1 text-xs text-zinc-500 font-mono">
              <p>{t.footer.taxId}: 3701234567 • {language === 'en' ? 'Binh Duong Dep. of Planning' : language === 'id' ? 'Dinas Penanaman Modal Binh Duong' : 'Sở KH&ĐT Bình Dương'}</p>
              <p>ISO 9001:2015 &amp; OEKO-TEX Standard 100 Class 1</p>
            </div>

            {/* Social / Direct Connect Badges */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => handleNav('contact')}
                className="px-2.5 py-1 bg-white border border-zinc-200 text-zinc-700 hover:text-emerald-700 hover:border-emerald-500 transition-colors font-mono text-[11px] rounded-sm cursor-pointer"
              >
                Hotline 24/7
              </button>
              <button
                onClick={() => handleNav('news')}
                className="px-2.5 py-1 bg-white border border-zinc-200 text-zinc-700 hover:text-emerald-700 hover:border-emerald-500 transition-colors font-mono text-[11px] rounded-sm cursor-pointer"
              >
                {t.nav.news}
              </button>
              <button
                onClick={() => handleNav('careers')}
                className="px-2.5 py-1 bg-white border border-zinc-200 text-zinc-700 hover:text-emerald-700 hover:border-emerald-500 transition-colors font-mono text-[11px] rounded-sm cursor-pointer"
              >
                {t.nav.careers}
              </button>
            </div>

            {/* In-Footer Language Selector */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                {language === 'en' ? 'Select language:' : language === 'id' ? 'Pilih bahasa:' : 'Ngôn ngữ giao diện:'}
              </span>
              <LanguageSwitcher variant="footer-inline" />
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-mono">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600 font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-emerald-700 transition-colors cursor-pointer text-left">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-emerald-700 transition-colors cursor-pointer text-left">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-emerald-700 transition-colors cursor-pointer text-left">
                  {t.nav.products}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('process')} className="hover:text-emerald-700 transition-colors cursor-pointer text-left">
                  {t.nav.process}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('news')} className="hover:text-emerald-700 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>{t.nav.news}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-emerald-700 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>{t.nav.careers}</span>
                  <span className="text-[9px] px-1 bg-red-50 text-red-600 border border-red-200 rounded-xs">Hot</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-emerald-700 transition-colors cursor-pointer text-left">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-mono">
              {t.footer.categories}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600 font-medium">
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {language === 'en' ? 'ECO-RPET Recycled Jacquard' : language === 'id' ? 'Jacquard Daur Ulang ECO-RPET' : 'Dây Dệt Jacquard ECO-RPET 2026'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t.footer.itemShoelace}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t.footer.itemWebbing}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t.footer.itemElastic}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t.footer.itemDrawstring}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t.footer.itemTipping}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t.footer.itemFW25}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Factory Coordinates & Map (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-mono flex items-center justify-between">
              <span>{t.footer.contactCol}</span>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">BÌNH DƯƠNG</span>
            </h4>
            
            <div className="space-y-2 text-xs text-zinc-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.contact.addressVal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono">Hotline: 0988.688.868</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono">Email: contact@lienchau.com</span>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full aspect-[16/9] border border-zinc-200 bg-zinc-100 relative overflow-hidden rounded-sm mt-2">
              <iframe
                title="Bản đồ nhà máy Liên Châu - KCN Sóng Thần 3"
                src="https://maps.google.com/maps?q=KCN%20S%C3%B3ng%20Th%E1%BA%A7n%203%20Ph%C3%BA%20T%C3%A2n%20Th%E1%BB%A7%20D%E1%BA%A7u%20M%E1%BB%99t%20B%C3%ACnh%20D%C6%B0%C6%A1ng&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>{t.footer.copyright}</p>

          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('contact')} className="hover:text-emerald-700 transition-colors uppercase tracking-wider cursor-pointer">
              {t.footer.security}
            </button>
            <button
              onClick={scrollToTop}
              className="text-emerald-700 hover:text-emerald-900 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
