import React from 'react';
import { Phone, Mail, MapPin, Printer, ArrowUpRight, Award } from 'lucide-react';
import { PageId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

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
            <div className="flex items-center">
              <img
                src="https://theme.hstatic.net/200000421863/1000815266/14/logo.png?v=607"
                alt="Logo Liên Châu"
                className="h-12 sm:h-14 w-auto max-w-[170px] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              {t.footer.companyDesc}
            </p>

            <div className="space-y-1 text-xs text-zinc-500 font-mono">
              <p>{t.footer.taxId}: 3701234567 • {language === 'en' ? 'Binh Duong Dep. of Planning' : language === 'id' ? 'Dinas Penanaman Modal Binh Duong' : 'Sở KH&ĐT Bình Dương'}</p>
              <p>ISO 9001:2015 &amp; OEKO-TEX Standard 100 Class 1</p>
            </div>

            {/* Social Icons & Bo Cong Thuong Badge */}
            <div className="pt-2 space-y-3">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono block">
                  {language === 'en' ? 'Connect With Us' : language === 'id' ? 'Terhubung Dengan Kami' : 'Kết Nối Với Chúng Tôi'}
                </span>
                <div className="flex items-center gap-2">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-zinc-200 hover:border-[#1877F2] hover:bg-[#1877F2] text-zinc-600 hover:text-white flex items-center justify-center transition-all duration-200 group shadow-2xs cursor-pointer"
                    title="Facebook Liên Châu"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-zinc-200 hover:border-black hover:bg-black text-zinc-600 hover:text-white flex items-center justify-center transition-all duration-200 group shadow-2xs cursor-pointer"
                    title="TikTok Liên Châu"
                    aria-label="TikTok"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.36a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.64a6.34 6.34 0 0 0 10.82 4.48c.19-.19.36-.39.51-.61V11.2a8.16 8.16 0 0 0 5.12 1.83v-3.45a4.85 4.85 0 0 1-.02-.09z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-zinc-200 hover:border-[#FF0000] hover:bg-[#FF0000] text-zinc-600 hover:text-white flex items-center justify-center transition-all duration-200 group shadow-2xs cursor-pointer"
                    title="YouTube Liên Châu"
                    aria-label="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  {/* Zalo */}
                  <a
                    href="https://zalo.me/842743782444"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-zinc-200 hover:border-[#0068FF] hover:bg-[#0068FF] text-zinc-700 hover:text-white flex items-center justify-center transition-all duration-200 group shadow-2xs cursor-pointer"
                    title="Zalo Liên Châu: +842743782444"
                    aria-label="Zalo"
                  >
                    <span className="font-black text-[10px] tracking-tighter">Zalo</span>
                  </a>
                </div>
              </div>

              {/* ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG Badge */}
              <div className="pt-2">
                <a
                  href="http://online.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-90 transition-opacity"
                  title="Website đã thông báo với Bộ Công Thương"
                >
                  <img
                    src="https://theme.hstatic.net/200000421863/1000815266/14/logo_bct.png?v=607"
                    alt="Đã thông báo Bộ Công Thương"
                    className="h-11 sm:h-12 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </a>
              </div>
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
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono flex items-center justify-between">
              <span>{t.footer.contactCol}</span>
              <span className="text-xs text-emerald-700 font-mono font-bold">BÌNH DƯƠNG</span>
            </h4>
            
            <div className="space-y-2 text-xs text-zinc-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.contact.addressVal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Điện thoại: <a href="tel:+842743782444" className="font-mono text-zinc-900 hover:text-emerald-700 font-medium">+84 274 378 2444</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono">Fax: +84 274 378 2555</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Email: <a href="mailto:lienchau@lienchau.com" className="font-mono text-zinc-900 hover:text-emerald-700 font-medium">lienchau@lienchau.com</a></span>
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
          <p>Copyright © 2026 CÔNG TY CỔ PHẦN SẢN XUẤT DỆT LIÊN CHÂU. Powered by IT Department</p>

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
