import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, Building2, Play, Pause, Repeat } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

export const PartnersMarquee: React.FC = () => {
  const { t, language } = useLanguage();
  const { partners } = useData();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const activePartners = partners.filter(p => p.status === 'active');
  const midPoint = Math.ceil(activePartners.length / 2);
  const row1Partners = [...activePartners.slice(0, midPoint), ...activePartners.slice(0, midPoint)];
  const row2Partners = [...activePartners.slice(midPoint), ...activePartners.slice(midPoint)];

  return (
    <section id="partners" className="py-20 lg:py-24 bg-zinc-50 border-b border-zinc-200 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
              Mạng Lưới Khách Hàng &amp; Chuỗi Cung Ứng
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
              Đồng Hành Cùng 650+ Nhãn Hàng &amp; Xưởng Giày Xuất Khẩu
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
              Cung ứng phụ liệu dây giày, webbing, dây thun và dây luồn cho các thương hiệu thể thao quốc tế và nhà máy gia công OEM tại Việt Nam.
            </p>
          </div>

          {/* Marquee Motion Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-700 rounded-sm">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-600 animate-pulse' : 'bg-zinc-400'}`}></span>
              <span>Chế độ: <strong>Chạy đảo chiều (Back &amp; Forth)</strong></span>
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm flex items-center gap-1.5"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tiếp tục</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Two-Row Back & Forth Scrolling Carousels */}
      <div className="space-y-3.5 relative w-full overflow-hidden py-4 border-y border-zinc-200 bg-zinc-50/50">
        {/* Gradient Fade Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Row 1: Chạy qua trái rồi chạy ngược lại qua phải */}
        <div
          className={`flex w-max ${isPlaying ? 'animate-marquee-back-forth' : ''} hover:[animation-play-state:paused]`}
          style={!isPlaying ? { animationPlayState: 'paused' } : {}}
        >
          {row1Partners.map((partner, index) => (
            <div
              key={`row1-${partner.name}-${index}`}
              className="flex items-center gap-3 mx-2 px-4 py-2.5 bg-white border border-zinc-200 hover:border-zinc-400 transition-colors shrink-0 rounded-sm"
            >
              <div className="w-7 h-7 bg-zinc-100 border border-zinc-200 rounded-xs flex items-center justify-center shrink-0 overflow-hidden">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-0.5" />
                ) : (
                  <Building2 className="w-3.5 h-3.5 text-zinc-700" />
                )}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold uppercase tracking-tight text-zinc-900 block font-mono">
                  {partner.name}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                  {partner.category} • {partner.country}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Chạy đảo chiều so le */}
        <div
          className={`flex w-max ${isPlaying ? 'animate-marquee-reverse-back-forth' : ''} hover:[animation-play-state:paused]`}
          style={!isPlaying ? { animationPlayState: 'paused' } : {}}
        >
          {row2Partners.map((partner, index) => (
            <div
              key={`row2-${partner.name}-${index}`}
              className="flex items-center gap-3 mx-2 px-4 py-2.5 bg-white border border-zinc-200 hover:border-zinc-400 transition-colors shrink-0 rounded-sm"
            >
              <div className="w-7 h-7 bg-zinc-100 border border-zinc-200 rounded-xs flex items-center justify-center shrink-0 overflow-hidden">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-0.5" />
                ) : (
                  <Building2 className="w-3.5 h-3.5 text-zinc-600" />
                )}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold uppercase tracking-tight text-zinc-900 block font-mono">
                  {partner.name}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                  {partner.category} • {partner.country}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Partner Feedback / Quotes */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-zinc-50 border border-zinc-200 p-6 flex flex-col justify-between text-left rounded-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-emerald-700">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-zinc-300" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200 mt-5">
                <h4 className="text-xs font-bold uppercase tracking-tight text-zinc-900">{item.author}</h4>
                <p className="text-[11px] text-emerald-700 font-medium">{item.role}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">{item.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
