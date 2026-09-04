import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { Calendar, Clock, ArrowRight, Tag, User, Search, X, Share2, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

interface NewsPageProps {
  onNavigateToContact: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigateToContact }) => {
  const { t, language } = useLanguage();
  const { articles = [], newsArticles = [] } = useData();
  const currentArticles = (articles || newsArticles || []).filter((a) => a.status !== 'hidden');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const categories = [
    { id: 'all', label: language === 'en' ? 'All News' : language === 'id' ? 'Semua Berita' : 'Tất Cả Tin Tức' },
    { id: 'Xu Hướng', label: language === 'en' ? 'FW25 Trends' : language === 'id' ? 'Tren FW25' : 'Xu Hướng FW25' },
    { id: 'Sản Xuất', label: language === 'en' ? 'Factory Ops' : language === 'id' ? 'Operasi Pabrik' : 'Hoạt Động Nhà Máy' },
    { id: 'Kỹ Thuật & Chất Lượng', label: language === 'en' ? 'Standards & QC' : language === 'id' ? 'Standar & QC' : 'Kỹ Thuật & Tiêu Chuẩn' },
    { id: 'Kỹ Thuật', label: language === 'en' ? 'Weaving Tech' : language === 'id' ? 'Teknologi Tenun' : 'Công Nghệ Dệt' },
    { id: 'Sự Kiện', label: language === 'en' ? 'Events & Expos' : language === 'id' ? 'Acara & Pameran' : 'Sự Kiện & Triển Lãm' }
  ];

  const filteredArticles = (currentArticles || []).filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some((tg) => tg.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = currentArticles && currentArticles.length > 0 ? currentArticles[0] : null;

  return (
    <div className="bg-white text-zinc-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Page Header */}
        <div className="text-left space-y-2 mb-12 pb-6 border-b border-zinc-200">
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block">
            {language === 'en' ? 'Industry Insights & Corporate News' : language === 'id' ? 'Wawasan Industri & Berita Perusahaan' : 'Tin Tức & Hoạt Động Doanh Nghiệp'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-900">
            {language === 'en' ? 'Market Intelligence & Textile Trends' : language === 'id' ? 'Intelijen Pasar & Tren Tekstil' : 'Thông Tin Thị Trường & Dệt May'}
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {language === 'en'
              ? 'Global footwear raw materials intelligence, weaving laboratory test reports, and real-time production updates from Lien Chau Factory at Song Than 3 Industrial Park.'
              : language === 'id'
              ? 'Pembaruan bahan baku alas kaki global, laporan uji laboratorium tenun, dan berita produksi dari Pabrik Lien Chau di Kawasan Industri Song Than 3.'
              : 'Cập nhật xu hướng nguyên phụ liệu giày dép thế giới, báo cáo kiểm định chất lượng dệt đan và các sự kiện sản xuất mới nhất từ Nhà máy Liên Châu tại KCN Sóng Thần 3.'}
          </p>
        </div>

        {/* Featured Top Article */}
        {featuredArticle && (
          <div
            onClick={() => setSelectedArticle(featuredArticle)}
            className="mb-14 p-6 sm:p-8 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-all group cursor-pointer rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left"
          >
            <div className="lg:col-span-7 overflow-hidden rounded-sm relative aspect-[16/10]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm">
                {language === 'en' ? 'FW25 Spotlight' : language === 'id' ? 'Sorotan FW25' : 'Tiêu Điểm FW25'}
              </span>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {featuredArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  {featuredArticle.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight leading-snug">
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3">
                {featuredArticle.summary}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  {language === 'en' ? 'Read full article' : language === 'id' ? 'Baca artikel lengkap' : 'Đọc toàn văn bài viết'} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap rounded-sm cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search articles, keywords...' : language === 'id' ? 'Cari artikel, kata kunci...' : 'Tìm bài viết, từ khóa...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 text-xs text-zinc-900 outline-none rounded-sm"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white border border-zinc-200 hover:border-emerald-500 flex flex-col justify-between p-5 transition-all group cursor-pointer shadow-sm hover:shadow-md rounded-sm"
            >
              <div className="space-y-3.5">
                <div className="relative overflow-hidden aspect-[16/10] rounded-sm bg-zinc-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-zinc-900/80 text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded-sm backdrop-blur-xs">
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

                <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight leading-snug line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between text-xs font-bold text-emerald-700 uppercase tracking-wider">
                <span>{language === 'en' ? 'Read full article' : language === 'id' ? 'Lihat detail' : 'Xem chi tiết'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="py-16 text-center text-zinc-500 space-y-2">
            <BookOpen className="w-10 h-10 mx-auto text-zinc-400" />
            <p className="text-sm font-bold">
              {language === 'en' ? 'No articles match your keyword.' : language === 'id' ? 'Tidak ada artikel yang cocok dengan kata kunci.' : 'Không tìm thấy bài viết nào phù hợp với từ khóa.'}
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-xs text-emerald-700 font-bold uppercase underline cursor-pointer"
            >
              {language === 'en' ? 'View all articles' : language === 'id' ? 'Lihat semua artikel' : 'Xem tất cả bài viết'}
            </button>
          </div>
        )}

        {/* Newsletter / Contact Callout */}
        <div className="mt-16 p-8 bg-zinc-50 border border-zinc-200 text-left rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">
              {language === 'en'
                ? 'Need the latest sample catalog & project pricing schedule?'
                : language === 'id'
                ? 'Butuh katalog sampel terbaru & jadwal penawaran harga proyek?'
                : 'Cần nhận Catalogue mẫu mới & Báo giá dự án định kỳ?'}
            </h3>
            <p className="text-xs text-zinc-600">
              {language === 'en'
                ? 'Subscribe to get FW25 trend lookbooks and export trims specifications from Lien Chau R&D division.'
                : language === 'id'
                ? 'Dapatkan lookbook tren FW25 dan spesifikasi aksesori ekspor dari departemen R&D Lien Chau.'
                : 'Đăng ký nhận tài liệu xu hướng FW25 và danh mục phụ liệu xuất khẩu từ bộ phận R&D Liên Châu.'}
            </p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer rounded-sm shadow-sm"
          >
            {language === 'en' ? 'Contact Factory R&D' : language === 'id' ? 'Hubungi R&D Pabrik' : 'Liên Hệ Ban R&D Nhà Máy'}
          </button>
        </div>

      </div>

      {/* Article Full Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm border border-zinc-200 shadow-2xl p-6 sm:p-8 text-left relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-widest font-mono rounded-sm">
                  {selectedArticle.category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-zinc-900 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-mono pb-4 border-b border-zinc-200">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedArticle.readTime}
                </span>
              </div>

              <div className="rounded-sm overflow-hidden aspect-[16/9] my-4">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-3.5 text-zinc-700 text-xs sm:text-sm leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase font-mono text-zinc-500 mr-1">
                  {language === 'en' ? 'Topics:' : language === 'id' ? 'Topik:' : 'Chủ đề:'}
                </span>
                {selectedArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
                >
                  {language === 'en' ? 'Close Window' : language === 'id' ? 'Tutup Jendela' : 'Đóng cửa sổ'}
                </button>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onNavigateToContact();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
                >
                  {language === 'en' ? 'Request Sample Of This Spec' : language === 'id' ? 'Minta Sampel Spesifikasi Ini' : 'Yêu Cầu Mẫu Dây Này'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
