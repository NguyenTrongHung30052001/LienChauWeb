import React from 'react';
import { Hero } from '../components/Hero';
import { AboutCompany } from '../components/AboutCompany';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { ProductionProcess } from '../components/ProductionProcess';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PartnersMarquee } from '../components/PartnersMarquee';
import { QuoteForm } from '../components/QuoteForm';
import { TextileWeaveLab } from '../components/TextileWeaveLab';
import { B2BQuoteCalculator } from '../components/B2BQuoteCalculator';
import { FactoryLiveCommandHUD } from '../components/FactoryLiveCommandHUD';
import { InteractiveLoomSimulator } from '../components/InteractiveLoomSimulator';
import { ShoeColorMatchStudio } from '../components/ShoeColorMatchStudio';
import { useData } from '../context/DataContext';
import { Calendar, Clock, ArrowRight, Briefcase, MapPin, Building2, Cpu, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProductForQuote: (productName: string) => void;
  selectedProductForQuote: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProductForQuote,
  selectedProductForQuote
}) => {
  const { t, language } = useLanguage();
  const { newsArticles, jobs } = useData();
  const latestNews = (newsArticles || []).slice(0, 3);
  const urgentJobs = (jobs || []).slice(0, 3);

  const handleCustomQuoteRequest = (specText: string) => {
    onSelectProductForQuote(specText);
    onNavigate('contact');
  };

  return (
    <div>
      {/* 1. Hero with Textile 2026 Visual Style & Specimen Studio */}
      <Hero
        onExploreProducts={() => onNavigate('products')}
        onContactClick={() => onNavigate('contact')}
      />

      {/* 2. Factory Live Telemetry HUD (2026 Smart Plant) */}
      <FactoryLiveCommandHUD />

      {/* 3. Textile Weaving Architecture & Tensile Stress Testing Lab */}
      <TextileWeaveLab
        onRequestQuoteWithPattern={handleCustomQuoteRequest}
      />

      {/* 4. High-Speed Braiding Machine Mechanical Simulation Section */}
      <section id="braider-sim" className="py-16 lg:py-20 bg-zinc-900 border-b border-zinc-800 text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-800 mb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 rounded-sm text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'en' ? 'High-Precision Textile Mechanics' : language === 'id' ? 'Mekanika Tekstil Presisi Tinggi' : 'Cơ Học Dệt May Chính Xác'}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white">
                {language === 'en' ? 'Interactive 32-Spindle Maypole Braider Simulator' : language === 'id' ? 'Simulator Mesin Kepang 32 Gelendong Otomatis' : 'Mô Phỏng Cụm Máy Dệt Bện Tự Động 32 Thoi'}
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {language === 'en'
                  ? 'Explore the Maypole braiding pattern with planetary gears ensuring maximum tensile strength while maintaining a supple hand-feel.'
                  : language === 'id'
                  ? 'Pelajari prinsip kepang Maypole jalur angka-8 dengan roda gigi planet untuk kekuatan tarik maksimal tanpa mengorbankan kelembutan.'
                  : 'Khám phá nguyên lý đan sợi hình số 8 (Maypole Braider) với hệ bánh xe hành tinh giúp dây giày đạt độ bền đứt tối đa mà vẫn giữ được độ mềm êm ái.'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('process')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-xs whitespace-nowrap self-start sm:self-auto shrink-0 border border-zinc-700"
            >
              <span>{language === 'en' ? 'View 6-Step Process' : language === 'id' ? 'Lihat 6 Langkah Proses' : 'Xem Quy Trình 6 Bước'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <InteractiveLoomSimulator
            onPatternCreated={handleCustomQuoteRequest}
          />
        </div>
      </section>

      {/* 5. Shoe Silhouette & Pantone Matching Studio */}
      <ShoeColorMatchStudio
        onSelectFormulaForQuote={handleCustomQuoteRequest}
      />

      {/* 6. Featured Products Showcase */}
      <FeaturedProducts
        onSelectProductForQuote={(prodName) => {
          onSelectProductForQuote(prodName);
          onNavigate('contact');
        }}
      />

      {/* 7. B2B Quick Specification & Cost Estimation Console */}
      <B2BQuoteCalculator
        onDirectQuoteSubmit={handleCustomQuoteRequest}
      />

      {/* 8. About Company Overview with Stats */}
      <AboutCompany />

      {/* 9. Production Process Pipeline */}
      <ProductionProcess />

      {/* 10. Why Choose Us / Quality Matrix */}
      <WhyChooseUs />

      {/* 11. Partners Marquee Running Back and Forth */}
      <PartnersMarquee />

      {/* 12. Latest News & Market Trends Section on Home */}
      <section className="py-20 lg:py-24 bg-white border-b border-zinc-200 text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-200 mb-10">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
                {language === 'en' ? 'Technical Bulletins & Industry Trends' : language === 'id' ? 'Buletin Teknis & Tren Industri' : 'Bản Tin Kỹ Thuật & Xu Hướng Ngành'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
                {t.news.title}
              </h2>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                {t.news.subtitle}
              </p>
            </div>

            <button
              onClick={() => onNavigate('news')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm whitespace-nowrap self-start sm:self-auto shrink-0"
            >
              <span>{language === 'en' ? 'View All Articles' : language === 'id' ? 'Lihat Semua Artikel' : 'Xem Tất Cả Tin Tức'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <div
                  key={article.id}
                  onClick={() => onNavigate('news')}
                  className="bg-white border border-zinc-200 hover:border-zinc-400 p-5 flex flex-col justify-between transition-colors group cursor-pointer rounded-sm shadow-xs"
                >
                  <div className="space-y-3.5">
                    <div className="relative overflow-hidden aspect-[16/10] rounded-sm bg-zinc-100 border border-zinc-200">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-zinc-900 text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded-xs">
                        {article.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 mt-4 flex items-center justify-between text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                    <span>{language === 'en' ? 'Read Article' : language === 'id' ? 'Baca Artikel' : 'Chi tiết bài viết'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-sm text-center text-xs text-zinc-500">
              {language === 'en' ? 'News articles are updated directly from Supabase server.' : 'Tin tức đang được đồng bộ trực tiếp từ máy chủ Supabase.'}
            </div>
          )}
        </div>
      </section>

      {/* 13. Careers Spotlight Section on Home */}
      <section className="py-20 lg:py-24 bg-zinc-50 border-b border-zinc-200 text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
                {language === 'en' ? 'Recruitment 2026' : language === 'id' ? 'Perekrutan 2026' : 'Tuyển Dụng Nhân Sự 2026'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
                {t.careers.title}
              </h2>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                {t.careers.subtitle}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('careers')}
                  className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 rounded-sm cursor-pointer shadow-xs"
                >
                  <span>{language === 'en' ? 'Explore Open Positions' : language === 'id' ? 'Lihat Semua Posisi' : 'Xem Tất Cả Vị Trí Tuyển Dụng'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {urgentJobs.length > 0 ? (
                urgentJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => onNavigate('careers')}
                    className="p-4 sm:p-5 bg-white border border-zinc-200 hover:border-zinc-400 transition-colors rounded-sm flex items-center justify-between gap-4 cursor-pointer group shadow-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-zinc-100 text-zinc-800 text-[9px] font-mono font-bold uppercase rounded-xs">
                          {job.department}
                        </span>
                        {job.urgent && (
                          <span className="text-[9px] font-mono text-red-600 font-bold uppercase">
                            • {language === 'en' ? 'Urgent' : language === 'id' ? 'Mendesak' : 'Tuyển gấp'}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono">
                        {language === 'en' ? 'Salary: ' : language === 'id' ? 'Gaji: ' : 'Lương: '}<strong className="text-zinc-900">{job.salary}</strong> • {job.experience}
                      </p>
                    </div>

                    <span className="p-2 bg-zinc-100 group-hover:bg-zinc-200 text-zinc-700 transition-colors rounded-sm shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 bg-white border border-dashed border-zinc-300 rounded-sm text-center space-y-2">
                  <Briefcase className="w-8 h-8 mx-auto text-zinc-400" />
                  <h4 className="text-sm font-bold text-zinc-800 uppercase tracking-tight">
                    {language === 'en' ? 'Currently accepting open applications' : 'Đang tiếp nhận hồ sơ ứng tuyển tự do'}
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    {language === 'en'
                      ? 'Lien Chau factory regularly welcomes talent in textile weaving, engineering & QC operations. Submit your resume at our Careers page.'
                      : 'Nhà máy dệt Liên Châu liên tục tiếp nhận hồ sơ kỹ thuật dệt bện, vận hành máy và QC kiểm định chất lượng.'}
                  </p>
                  <button
                    onClick={() => onNavigate('careers')}
                    className="mt-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Submit Resume' : 'Nộp Hồ Sơ Ứng Tuyển'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 14. Instant Quotation Section */}
      <QuoteForm
        initialProduct={selectedProductForQuote}
        onSuccess={() => {}}
      />
    </div>
  );
};
