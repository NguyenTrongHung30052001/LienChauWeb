import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Product, ProductCategory, NewsArticle, JobOpening, CategoryItem, QuoteRequestItem, JobApplicationItem, PageId } from '../types';
import {
  LayoutDashboard,
  Package,
  Layers,
  FileText,
  Briefcase,
  Inbox,
  Plus,
  Pencil,
  Trash2,
  Search,
  Check,
  X,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Tag,
  Building2,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Sliders,
  DollarSign,
  MapPin,
  Flame,
  CheckCircle2,
  ChevronRight,
  Filter,
  Database
} from 'lucide-react';

interface AdminPageProps {
  onNavigateToPublicPage: (page: PageId) => void;
}

type AdminTab = 'dashboard' | 'products' | 'categories' | 'news' | 'careers' | 'quotes';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigateToPublicPage }) => {
  const {
    products,
    categories,
    newsArticles,
    jobOpenings,
    quotes,
    applications,
    supabaseStatus,
    lastSyncTime,
    syncFromSupabase,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
    addArticle,
    updateArticle,
    deleteArticle,
    toggleArticleStatus,
    addJob,
    updateJob,
    deleteJob,
    toggleJobUrgent,
    toggleJobStatus,
    updateQuoteStatus,
    deleteQuote,
    updateApplicationStatus,
    deleteApplication,
    clearCacheAndSync,
    resetToDefaults,
    exportDataJSON,
    importDataJSON
  } = useData();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Search queries per tab
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productStatusFilter, setProductStatusFilter] = useState<'all' | 'active' | 'hidden'>('all');
  const [newsSearch, setNewsSearch] = useState('');
  const [careersSearch, setCareersSearch] = useState('');
  const [quotesFilter, setQuotesFilter] = useState<'all' | 'new' | 'contacted' | 'quoted' | 'closed'>('all');

  // Modals state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);

  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);

  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

  const [viewingQuote, setViewingQuote] = useState<QuoteRequestItem | null>(null);
  const [careersSubTab, setCareersSubTab] = useState<'jobs' | 'applicants'>('jobs');

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Helper to handle export
  const handleExport = () => {
    const dataStr = exportDataJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lienchau-cms-backup-${new Date().toISOString().substring(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Đã xuất dữ liệu sao lưu CMS thành công!', 'success');
  };

  // Helper to handle import
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importDataJSON(content);
        if (ok) {
          showToast('Nhập dữ liệu sao lưu thành công!', 'success');
        } else {
          showToast('Tệp sao lưu không đúng định dạng!', 'error');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Filtered lists
  const filteredProducts = useMemo(() => {
    return (products || []).filter((p) => {
      const matchCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
      const matchStatus = productStatusFilter === 'all' || (p.status || 'active') === productStatusFilter;
      const matchSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.material.toLowerCase().includes(productSearch.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [products, productCategoryFilter, productStatusFilter, productSearch]);

  const filteredNews = useMemo(() => {
    return (newsArticles || []).filter((a) => {
      return (
        a.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
        a.category.toLowerCase().includes(newsSearch.toLowerCase()) ||
        a.summary.toLowerCase().includes(newsSearch.toLowerCase())
      );
    });
  }, [newsArticles, newsSearch]);

  const filteredJobs = useMemo(() => {
    return (jobOpenings || []).filter((j) => {
      return (
        j.title.toLowerCase().includes(careersSearch.toLowerCase()) ||
        j.department.toLowerCase().includes(careersSearch.toLowerCase()) ||
        j.location.toLowerCase().includes(careersSearch.toLowerCase())
      );
    });
  }, [jobOpenings, careersSearch]);

  const filteredQuotes = useMemo(() => {
    return (quotes || []).filter((q) => {
      if (quotesFilter === 'all') return true;
      return q.status === quotesFilter;
    });
  }, [quotes, quotesFilter]);

  // Quick stats
  const pendingQuotesCount = (quotes || []).filter((q) => q.status === 'new').length;
  const urgentJobsCount = (jobOpenings || []).filter((j) => j.urgent).length;
  const newProductsCount = (products || []).filter((p) => p.isNew).length;

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col font-sans pt-24 pb-16">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-28 right-6 z-50 px-5 py-3 rounded-sm shadow-xl flex items-center gap-3 border text-sm font-medium transition-all transform duration-200 ${
            notification.type === 'success'
              ? 'bg-emerald-950 text-emerald-100 border-emerald-700'
              : notification.type === 'error'
              ? 'bg-red-950 text-red-100 border-red-700'
              : 'bg-zinc-900 text-zinc-100 border-zinc-700'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Admin Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Header Ribbon */}
        <div className="bg-white border border-zinc-200 rounded-sm p-6 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase rounded-sm border border-emerald-200">
                Hệ Thống CMS Quản Trị
              </span>
              <span className="text-zinc-400">•</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[11px] font-mono font-medium border bg-zinc-50 border-zinc-200">
                <Database className={`w-3.5 h-3.5 ${supabaseStatus === 'connected' ? 'text-emerald-600' : supabaseStatus === 'connecting' ? 'text-amber-500 animate-spin' : 'text-rose-500'}`} />
                <span className="text-zinc-700">Supabase:</span>
                <span className={`font-semibold ${supabaseStatus === 'connected' ? 'text-emerald-700' : supabaseStatus === 'connecting' ? 'text-amber-600' : 'text-rose-600'}`}>
                  {supabaseStatus === 'connected' ? 'Đã Kết Nối' : supabaseStatus === 'connecting' ? 'Đang đồng bộ...' : 'Chế độ Cache'}
                </span>
                {lastSyncTime !== 'Chưa đồng bộ' && (
                  <span className="text-zinc-400 text-[10px] hidden sm:inline">({lastSyncTime})</span>
                )}
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 flex items-center gap-2">
              Công ty Cổ phần Sản xuất Dệt Liên Châu
            </h1>
            <p className="text-xs text-zinc-600 mt-1">
              Quản lý danh mục sản phẩm, bài viết kỹ thuật, thông tin tuyển dụng &amp; đơn yêu cầu báo giá B2B.
            </p>
          </div>

          {/* Quick Action Tools */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={async () => {
                showToast('Đang tải dữ liệu mới nhất từ Supabase Cloud...', 'info');
                await syncFromSupabase();
                showToast('Đã đồng bộ cơ sở dữ liệu Supabase thành công!', 'success');
              }}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Đồng bộ lại dữ liệu từ Supabase PostgreSQL"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đồng Bộ Supabase</span>
            </button>

            <button
              onClick={async () => {
                if (window.confirm('Xóa sạch bộ nhớ đệm (cache trình duyệt) và tải trực tiếp dữ liệu từ Supabase để loại bỏ triệt để các dữ liệu đã bị xóa?')) {
                  showToast('Đang dọn sạch cache và đồng bộ Supabase...', 'info');
                  await clearCacheAndSync();
                  showToast('Đã làm sạch cache và đồng bộ theo Supabase!', 'success');
                }
              }}
              className="px-3 py-2 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 text-xs font-medium rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Xóa cache trình duyệt và tải mới dữ liệu từ Supabase"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline">Làm Sạch Cache</span>
            </button>

            <button
              onClick={() => onNavigateToPublicPage('home')}
              className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Mở giao diện website chính"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Xem Web Khách Hàng</span>
            </button>

            <button
              onClick={handleExport}
              className="px-3 py-2 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 text-xs font-medium rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Tải tệp JSON sao lưu toàn bộ cơ sở dữ liệu"
            >
              <Download className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline">Sao Lưu JSON</span>
            </button>

            <label className="px-3 py-2 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 text-xs font-medium rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline">Nhập JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>

            <button
              onClick={() => {
                if (window.confirm('Khôi phục toàn bộ danh mục, sản phẩm, bài viết và tuyển dụng về dữ liệu gốc ban đầu?')) {
                  resetToDefaults();
                  showToast('Đã khôi phục dữ liệu mẫu của nhà máy thành công!', 'info');
                }
              }}
              className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-sm transition-colors cursor-pointer"
              title="Khôi phục dữ liệu mặc định của nhà máy"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-zinc-200 bg-white px-3 py-2 rounded-t-sm overflow-x-auto scrollbar-none shadow-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Tổng Quan</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'products'
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Sản Phẩm</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-zinc-200 text-zinc-800 rounded-full font-mono">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Danh Mục</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-zinc-200 text-zinc-800 rounded-full font-mono">
              {categories.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'news'
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Bài Viết &amp; Tin Tức</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-zinc-200 text-zinc-800 rounded-full font-mono">
              {newsArticles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('careers')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'careers'
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Tuyển Dụng</span>
            {urgentJobsCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] bg-red-100 text-red-700 rounded-full font-mono font-bold">
                {urgentJobsCount} gấp
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Yêu Cầu Báo Giá</span>
            {pendingQuotesCount > 0 ? (
              <span className="px-1.5 py-0.5 text-[10px] bg-emerald-600 text-white rounded-full font-mono font-bold animate-pulse">
                {pendingQuotesCount} mới
              </span>
            ) : (
              <span className="px-1.5 py-0.5 text-[10px] bg-zinc-200 text-zinc-800 rounded-full font-mono">
                {quotes.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white border-x border-b border-zinc-200 p-6 rounded-b-sm shadow-xs">
          
          {/* ========================================================= */}
          {/* 1. DASHBOARD TAB */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div
                  onClick={() => setActiveTab('products')}
                  className="p-5 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 rounded-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Sản Phẩm</span>
                    <Package className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-zinc-900">{products.length}</div>
                  <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                    <span className="text-emerald-700 font-bold">{newProductsCount} mẫu mới</span> • {categories.length} phân loại
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('categories')}
                  className="p-5 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 rounded-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Danh Mục</span>
                    <Layers className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-zinc-900">{categories.length}</div>
                  <div className="text-[11px] text-zinc-500 mt-1">
                    Dây giày, Webbing, Thun, Tipping...
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('news')}
                  className="p-5 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 rounded-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Bài Viết</span>
                    <FileText className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-zinc-900">{newsArticles.length}</div>
                  <div className="text-[11px] text-zinc-500 mt-1">
                    Kỹ thuật, Xu hướng, Bản tin nhà máy
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('quotes')}
                  className="p-5 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 rounded-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Đơn Báo Giá</span>
                    <Inbox className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-zinc-900">{quotes.length}</div>
                  <div className="text-[11px] text-zinc-500 mt-1">
                    <span className="text-emerald-700 font-bold">{pendingQuotesCount} yêu cầu mới</span> chưa xử lý
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Recent Leads / Quotes */}
                <div className="lg:col-span-2 border border-zinc-200 rounded-sm p-5 bg-zinc-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-emerald-600" />
                      Yêu Cầu Báo Giá Gần Đây
                    </h3>
                    <button
                      onClick={() => setActiveTab('quotes')}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Xem tất cả ({quotes.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {quotes.slice(0, 4).map((q) => (
                      <div
                        key={q.id}
                        className="p-3.5 bg-white border border-zinc-200 rounded-sm flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900">{q.fullName}</span>
                            <span className="text-zinc-400">•</span>
                            <span className="text-zinc-600 font-medium">{q.companyName}</span>
                            <span
                              className={`px-1.5 py-0.2 rounded-xs text-[10px] font-mono uppercase font-bold ${
                                q.status === 'new'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : q.status === 'quoted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-zinc-100 text-zinc-700'
                              }`}
                            >
                              {q.status === 'new' ? 'Mới' : q.status === 'quoted' ? 'Đã báo giá' : q.status}
                            </span>
                          </div>
                          <p className="text-zinc-500 line-clamp-1">
                            {q.productType} • Số lượng: <span className="font-mono text-zinc-700">{q.quantity}</span>
                          </p>
                          <p className="text-[11px] text-zinc-400 font-mono">{q.createdAt} • SĐT: {q.phone}</p>
                        </div>
                        <button
                          onClick={() => {
                            setViewingQuote(q);
                            setActiveTab('quotes');
                          }}
                          className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-sm font-medium shrink-0 cursor-pointer"
                        >
                          Chi tiết
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Col: Quick Management Shortcuts */}
                <div className="border border-zinc-200 rounded-sm p-5 bg-zinc-50/50 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Thao Tác Nhanh
                  </h3>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setActiveTab('products');
                        setIsNewProductModalOpen(true);
                      }}
                      className="w-full p-3 bg-white hover:bg-emerald-50 border border-zinc-200 hover:border-emerald-300 text-zinc-900 text-xs font-bold uppercase rounded-sm flex items-center justify-between transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4 text-emerald-600" />
                        Thêm Sản Phẩm Mới
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('categories');
                        setIsNewCategoryModalOpen(true);
                      }}
                      className="w-full p-3 bg-white hover:bg-emerald-50 border border-zinc-200 hover:border-emerald-300 text-zinc-900 text-xs font-bold uppercase rounded-sm flex items-center justify-between transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4 text-emerald-600" />
                        Tạo Danh Mục Mới
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('news');
                        setIsNewArticleModalOpen(true);
                      }}
                      className="w-full p-3 bg-white hover:bg-emerald-50 border border-zinc-200 hover:border-emerald-300 text-zinc-900 text-xs font-bold uppercase rounded-sm flex items-center justify-between transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4 text-emerald-600" />
                        Viết Bài Bản Tin Mới
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('careers');
                        setIsNewJobModalOpen(true);
                      }}
                      className="w-full p-3 bg-white hover:bg-emerald-50 border border-zinc-200 hover:border-emerald-300 text-zinc-900 text-xs font-bold uppercase rounded-sm flex items-center justify-between transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4 text-emerald-600" />
                        Đăng Tin Tuyển Dụng
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>

                  {/* Supabase Database Info Card */}
                  <div className="pt-3 border-t border-zinc-200">
                    <div className="p-3 bg-white border border-emerald-200 rounded-sm shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900">
                          <Database className="w-4 h-4 text-emerald-600" />
                          <span>Supabase Cloud DB</span>
                        </div>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          PostgreSQL Live
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-zinc-600 bg-zinc-50 p-2 rounded-xs border border-zinc-200 break-all">
                        blnholdbkltvxeaavuyh.supabase.co
                      </div>
                      <div className="text-[11px] text-zinc-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Bảng Products:</span>
                          <span className="font-mono font-bold text-zinc-800">{products.length} bản ghi</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bảng Categories:</span>
                          <span className="font-mono font-bold text-zinc-800">{categories.length} bản ghi</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bảng News Articles:</span>
                          <span className="font-mono font-bold text-zinc-800">{newsArticles.length} bài viết</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bảng Jobs:</span>
                          <span className="font-mono font-bold text-zinc-800">{jobOpenings.length} vị trí</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bảng Quote Requests:</span>
                          <span className="font-mono font-bold text-zinc-800">{quotes.length} báo giá</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bảng Applications:</span>
                          <span className="font-mono font-bold text-zinc-800">{applications.length} hồ sơ</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                        <span>Lần đồng bộ: {lastSyncTime}</span>
                        <span className="text-emerald-700 font-bold">RLS: Bật</span>
                      </div>
                      <button
                        onClick={async () => {
                          showToast('Đang xóa sạch cache và tải mới dữ liệu từ Supabase...', 'info');
                          await clearCacheAndSync();
                          showToast('Đã làm sạch cache và đồng bộ Supabase!', 'success');
                        }}
                        className="w-full mt-1.5 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase rounded-sm border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Xóa Cache &amp; Đồng Bộ Lại</span>
                      </button>
                    </div>
                  </div>

                  {/* Company System Info */}
                  <div className="pt-3 border-t border-zinc-200 text-[11px] text-zinc-500 space-y-1">
                    <p className="font-bold text-zinc-700">Công ty Cổ phần Sản xuất Dệt Liên Châu</p>
                    <p>Địa chỉ: KCN Sóng Thần 3, P. Phú Tân, TP. Thủ Dầu Một, Bình Dương</p>
                    <p>Hotline: 0988.688.868 • MST: 3702988123</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. PRODUCTS TAB */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-zinc-300 rounded-sm text-xs focus:outline-emerald-600 w-56 sm:w-64"
                    />
                  </div>

                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="py-2 px-3 border border-zinc-300 rounded-sm text-xs bg-white text-zinc-700 focus:outline-emerald-600 cursor-pointer"
                  >
                    <option value="all">Tất cả danh mục ({products.length})</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={productStatusFilter}
                    onChange={(e) => setProductStatusFilter(e.target.value as any)}
                    className="py-2 px-3 border border-zinc-300 rounded-sm text-xs bg-white text-zinc-700 focus:outline-emerald-600 cursor-pointer font-medium"
                  >
                    <option value="all">Tất cả trạng thái ({(products || []).length})</option>
                    <option value="active">Chỉ hiển thị ({(products || []).filter(p => p.status !== 'hidden').length})</option>
                    <option value="hidden">Chỉ đang ẩn ({(products || []).filter(p => p.status === 'hidden').length})</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsNewProductModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Sản Phẩm Mới</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto border border-zinc-200 rounded-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Hình ảnh</th>
                      <th className="p-3">Tên Sản Phẩm</th>
                      <th className="p-3">Danh Mục</th>
                      <th className="p-3">Khổ Bản</th>
                      <th className="p-3">Lực Kéo</th>
                      <th className="p-3">MOQ</th>
                      <th className="p-3">Trạng Thái</th>
                      <th className="p-3">Huy Hiệu</th>
                      <th className="p-3 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-zinc-50/80 transition-colors">
                        <td className="p-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 object-cover rounded-sm border border-zinc-200"
                          />
                        </td>
                        <td className="p-3 max-w-xs">
                          <div className="font-bold text-zinc-900">{prod.name}</div>
                          <div className="text-[11px] text-zinc-500 line-clamp-1">{prod.subtitle}</div>
                          <div className="text-[10px] text-zinc-400 font-mono mt-0.5">ID: {prod.id}</div>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 font-medium rounded-xs text-[11px]">
                            {categories.find((c) => c.id === prod.category)?.name || prod.category}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-zinc-600 whitespace-nowrap">{prod.widthOrDiameter}</td>
                        <td className="p-3 font-mono text-emerald-700 font-bold whitespace-nowrap">{prod.tensileStrength}</td>
                        <td className="p-3 font-mono text-zinc-600 whitespace-nowrap">{prod.moq}</td>
                        <td className="p-3 whitespace-nowrap">
                          {prod.status === 'hidden' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-200 text-zinc-700 rounded-xs text-[10px] font-mono font-bold uppercase border border-zinc-300">
                              <EyeOff className="w-3 h-3 text-zinc-500" />
                              Ẩn
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-xs text-[10px] font-mono font-bold uppercase border border-emerald-200">
                              <Eye className="w-3 h-3 text-emerald-600" />
                              Hiển Thị
                            </span>
                          )}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {prod.isNew && (
                            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-xs">
                              Mới 2026
                            </span>
                          )}
                          {prod.isFW25 && (
                            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase rounded-xs ml-1">
                              FW25
                            </span>
                          )}
                          {prod.badge && !prod.isNew && !prod.isFW25 && (
                            <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-700 text-[10px] rounded-xs">
                              {prod.badge}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                toggleProductStatus(prod.id);
                                showToast(prod.status === 'hidden' ? `Đã hiển thị sản phẩm "${prod.name}"` : `Đã ẩn sản phẩm "${prod.name}"`, 'info');
                              }}
                              className={`px-2 py-1 text-xs rounded-sm border font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                                prod.status === 'hidden'
                                  ? 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                              }`}
                              title={prod.status === 'hidden' ? 'Bấm để Hiện sản phẩm trên website' : 'Bấm để Ẩn sản phẩm khỏi website'}
                            >
                              {prod.status === 'hidden' ? <EyeOff className="w-3.5 h-3.5 text-zinc-500" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                              <span>{prod.status === 'hidden' ? 'Hiện' : 'Ẩn'}</span>
                            </button>
                            <button
                              onClick={() => setEditingProduct(prod)}
                              className="p-1.5 text-zinc-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-sm transition-colors cursor-pointer"
                              title="Chỉnh sửa sản phẩm"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Xóa sản phẩm "${prod.name}"?`)) {
                                  deleteProduct(prod.id);
                                  showToast(`Đã xóa sản phẩm ${prod.name}`, 'info');
                                }
                              }}
                              className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors cursor-pointer"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-zinc-500">
                          Không tìm thấy sản phẩm nào phù hợp với bộ lọc tìm kiếm.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. CATEGORIES TAB */}
          {/* ========================================================= */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div>
                  <h3 className="text-sm font-bold uppercase text-zinc-900 tracking-wider">
                    Danh Mục Sản Phẩm Dệt ({categories.length})
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Phân loại các dòng phụ liệu dây giày, webbing, thun, dây luồn phục vụ thị trường trong nước và xuất khẩu.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewCategoryModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tạo Danh Mục Mới</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(categories || []).map((cat) => {
                  const productCount = (products || []).filter((p) => p.category === cat.id).length;
                  return (
                    <div
                      key={cat.id}
                      className="p-5 border border-zinc-200 rounded-sm bg-zinc-50 hover:border-emerald-500 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-white border border-zinc-200 text-zinc-600 font-mono text-[10px] uppercase font-bold rounded-xs">
                            SLUG: {cat.id}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {cat.status === 'hidden' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-200 text-zinc-700 text-[10px] font-bold font-mono uppercase rounded-xs border border-zinc-300">
                                <EyeOff className="w-3 h-3 text-zinc-500" />
                                Ẩn
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono uppercase rounded-xs border border-emerald-200">
                                <Eye className="w-3 h-3 text-emerald-600" />
                                Hiển Thị
                              </span>
                            )}
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono rounded-full">
                              {productCount} sp
                            </span>
                          </div>
                        </div>
                        <h4 className="font-bold text-sm text-zinc-900">{cat.name}</h4>
                        {cat.nameEn && (
                          <p className="text-[11px] text-zinc-500 italic">{cat.nameEn}</p>
                        )}
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          {cat.description || 'Chưa có mô tả kỹ thuật.'}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-zinc-200 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setProductCategoryFilter(cat.id);
                            setActiveTab('products');
                          }}
                          className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Xem sản phẩm</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              toggleCategoryStatus(cat.id);
                              showToast(cat.status === 'hidden' ? `Đã hiển thị danh mục "${cat.name}"` : `Đã ẩn danh mục "${cat.name}"`, 'info');
                            }}
                            className={`px-2 py-1 text-xs rounded-sm border font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                              cat.status === 'hidden'
                                ? 'bg-zinc-200 text-zinc-700 border-zinc-300 hover:bg-zinc-300'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            }`}
                            title={cat.status === 'hidden' ? 'Bấm để Hiện trên website' : 'Bấm để Ẩn khỏi website'}
                          >
                            {cat.status === 'hidden' ? <EyeOff className="w-3.5 h-3.5 text-zinc-500" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                            <span>{cat.status === 'hidden' ? 'Hiện' : 'Ẩn'}</span>
                          </button>
                          <button
                            onClick={() => setEditingCategory(cat)}
                            className="p-1.5 text-zinc-600 hover:text-emerald-700 hover:bg-white rounded-sm transition-colors cursor-pointer"
                            title="Sửa danh mục"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Xác nhận xóa danh mục "${cat.name}"?`)) {
                                deleteCategory(cat.id);
                                showToast(`Đã xóa danh mục ${cat.name}`, 'info');
                              }
                            }}
                            className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-white rounded-sm transition-colors cursor-pointer"
                            title="Xóa danh mục"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. NEWS & ARTICLES TAB */}
          {/* ========================================================= */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết, tác giả, chủ đề..."
                    value={newsSearch}
                    onChange={(e) => setNewsSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-zinc-300 rounded-sm text-xs focus:outline-emerald-600 w-64"
                  />
                </div>

                <button
                  onClick={() => setIsNewArticleModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Viết Bài Bản Tin Mới</span>
                </button>
              </div>

              {/* News Grid */}
              <div className="space-y-4">
                {filteredNews.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 border border-zinc-200 rounded-sm bg-white hover:border-emerald-500 transition-all flex flex-col md:flex-row items-start gap-4"
                  >
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full md:w-36 h-28 object-cover rounded-sm border border-zinc-200 shrink-0"
                    />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {art.status === 'hidden' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-200 text-zinc-700 text-[10px] font-bold font-mono uppercase rounded-xs border border-zinc-300">
                            <EyeOff className="w-3 h-3 text-zinc-500" />
                            Ẩn
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono uppercase rounded-xs border border-emerald-200">
                            <Eye className="w-3 h-3 text-emerald-600" />
                            Hiển Thị
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs text-[10px] font-mono font-bold uppercase">
                          {art.category}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {art.date} • {art.readTime}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-medium">
                          Bởi: {art.author}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-zinc-900 leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {art.summary}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {art.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.2 bg-zinc-100 text-zinc-600 rounded-xs text-[10px] font-mono"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => {
                          toggleArticleStatus(art.id);
                          showToast(art.status === 'hidden' ? `Đã hiển thị bài viết "${art.title}"` : `Đã ẩn bài viết "${art.title}"`, 'info');
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-sm flex items-center gap-1 transition-colors cursor-pointer border ${
                          art.status === 'hidden'
                            ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                        title={art.status === 'hidden' ? 'Bấm để Hiện trên website' : 'Bấm để Ẩn khỏi website'}
                      >
                        {art.status === 'hidden' ? <EyeOff className="w-3.5 h-3.5 text-zinc-500" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>{art.status === 'hidden' ? 'Hiện' : 'Ẩn'}</span>
                      </button>
                      <button
                        onClick={() => setEditingArticle(art)}
                        className="px-3 py-1.5 bg-zinc-100 hover:bg-emerald-50 text-zinc-700 hover:text-emerald-700 text-xs font-medium rounded-sm flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Xóa bài viết "${art.title}"?`)) {
                            deleteArticle(art.id);
                            showToast(`Đã xóa bài viết ${art.title}`, 'info');
                          }
                        }}
                        className="px-3 py-1.5 bg-zinc-100 hover:bg-red-50 text-zinc-700 hover:text-red-600 text-xs font-medium rounded-sm flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. CAREERS TAB */}
          {/* ========================================================= */}
          {activeTab === 'careers' && (
            <div className="space-y-6">
              {/* Sub-tabs: Jobs vs Applicants */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCareersSubTab('jobs')}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                      careersSubTab === 'jobs'
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    Vị Trí Đang Tuyển ({jobOpenings.length})
                  </button>
                  <button
                    onClick={() => setCareersSubTab('applicants')}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                      careersSubTab === 'applicants'
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    <span>Hồ Sơ Ứng Tuyển</span>
                    <span className="px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-mono rounded-full">
                      {applications.length}
                    </span>
                  </button>
                </div>

                {careersSubTab === 'jobs' && (
                  <button
                    onClick={() => setIsNewJobModalOpen(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Đăng Vị Trí Mới</span>
                  </button>
                )}
              </div>

              {/* Jobs List */}
              {careersSubTab === 'jobs' && (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 border border-zinc-200 rounded-sm bg-white hover:border-emerald-500 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-base text-zinc-900">{job.title}</h4>
                            {job.status === 'hidden' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-200 text-zinc-700 text-[10px] font-bold font-mono uppercase rounded-xs border border-zinc-300">
                                <EyeOff className="w-3 h-3 text-zinc-500" />
                                Ẩn
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono uppercase rounded-xs border border-emerald-200">
                                <Eye className="w-3 h-3 text-emerald-600" />
                                Hiển Thị
                              </span>
                            )}
                            {job.urgent && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold font-mono uppercase rounded-xs border border-red-200">
                                Tuyển gấp
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                            <span className="text-zinc-700 font-medium">{job.department}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span className="font-mono text-emerald-700 font-bold">{job.salary}</span>
                            <span>•</span>
                            <span>Hạn: {job.deadline}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              toggleJobStatus(job.id);
                              showToast(job.status === 'hidden' ? `Đã hiển thị vị trí "${job.title}"` : `Đã ẩn vị trí "${job.title}"`, 'info');
                            }}
                            className={`px-2.5 py-1 text-xs rounded-sm border font-medium cursor-pointer transition-colors flex items-center gap-1 ${
                              job.status === 'hidden'
                                ? 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            }`}
                            title={job.status === 'hidden' ? 'Bấm để Hiện tin tuyển dụng trên website' : 'Bấm để Ẩn tin tuyển dụng khỏi website'}
                          >
                            {job.status === 'hidden' ? <EyeOff className="w-3.5 h-3.5 text-zinc-500" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                            <span>{job.status === 'hidden' ? 'Hiện' : 'Ẩn'}</span>
                          </button>
                          <button
                            onClick={() => toggleJobUrgent(job.id)}
                            className={`px-2.5 py-1 text-xs rounded-sm border font-medium cursor-pointer transition-colors ${
                              job.urgent
                                ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                                : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                            }`}
                            title="Bật/Tắt nhãn Tuyển gấp"
                          >
                            {job.urgent ? 'Bỏ gấp' : 'Đánh dấu gấp'}
                          </button>
                          <button
                            onClick={() => setEditingJob(job)}
                            className="p-2 text-zinc-600 hover:text-emerald-700 hover:bg-zinc-100 rounded-sm transition-colors cursor-pointer"
                            title="Chỉnh sửa vị trí"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Xóa tin tuyển dụng "${job.title}"?`)) {
                                deleteJob(job.id);
                                showToast(`Đã xóa tin tuyển dụng ${job.title}`, 'info');
                              }
                            }}
                            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors cursor-pointer"
                            title="Xóa tin tuyển dụng"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500 font-mono">
                        <span>Kinh nghiệm: {job.experience}</span>
                        <span>•</span>
                        <span>{job.responsibilities.length} nhiệm vụ chính</span>
                        <span>•</span>
                        <span>{job.requirements.length} yêu cầu</span>
                      </div>
                    </div>
                  ))}
                  {filteredJobs.length === 0 && (
                    <div className="p-8 text-center text-zinc-500 text-xs border border-dashed border-zinc-200 rounded-sm">
                      Không có tin tuyển dụng nào trong cơ sở dữ liệu (hoặc đã xóa trên Supabase).
                    </div>
                  )}
                </div>
              )}

              {/* Applicants List */}
              {careersSubTab === 'applicants' && (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 border border-zinc-200 rounded-sm bg-white hover:border-emerald-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-zinc-900">{app.applicantName}</span>
                          <span className="text-zinc-400">•</span>
                          <span className="text-xs text-emerald-800 font-medium">Vị trí: {app.jobTitle}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                          <span>SĐT: <span className="font-mono text-zinc-800">{app.applicantPhone}</span></span>
                          <span>•</span>
                          <span>Email: <span className="font-mono text-zinc-800">{app.applicantEmail}</span></span>
                          <span>•</span>
                          <span className="font-mono text-[11px]">{app.createdAt}</span>
                        </div>
                        <p className="text-xs text-zinc-600 mt-1">
                          Kinh nghiệm: {app.applicantExperience}
                        </p>
                        {app.applicantNote && (
                          <p className="text-xs text-zinc-500 italic">
                            Ghi chú: "{app.applicantNote}"
                          </p>
                        )}
                        {app.applicantResumeLink && (
                          <a
                            href={app.applicantResumeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline pt-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Xem liên kết CV / Portfolio</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                          className="py-1.5 px-2.5 border border-zinc-300 rounded-sm text-xs bg-white focus:outline-emerald-600 cursor-pointer font-medium"
                        >
                          <option value="new">Mới nộp</option>
                          <option value="reviewed">Đã xem hồ sơ</option>
                          <option value="interview">Mời phỏng vấn</option>
                          <option value="rejected">Không phù hợp</option>
                        </select>
                        <button
                          onClick={() => {
                            if (window.confirm(`Xóa hồ sơ của ${app.applicantName}?`)) {
                              deleteApplication(app.id);
                              showToast(`Đã xóa hồ sơ ${app.applicantName}`, 'info');
                            }
                          }}
                          className="p-1.5 text-zinc-400 hover:text-red-600 rounded-sm cursor-pointer"
                          title="Xóa hồ sơ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <div className="p-8 text-center text-zinc-500 text-xs border border-dashed border-zinc-200 rounded-sm">
                      Chưa có hồ sơ ứng tuyển trực tuyến nào gửi vào hệ thống.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. QUOTES & LEADS TAB */}
          {/* ========================================================= */}
          {activeTab === 'quotes' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Lọc trạng thái:</span>
                  {(['all', 'new', 'contacted', 'quoted', 'closed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setQuotesFilter(st)}
                      className={`px-2.5 py-1 text-xs rounded-sm font-medium transition-colors cursor-pointer ${
                        quotesFilter === st
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      {st === 'all'
                        ? 'Tất cả'
                        : st === 'new'
                        ? 'Mới'
                        : st === 'contacted'
                        ? 'Đã liên hệ'
                        : st === 'quoted'
                        ? 'Đã báo giá'
                        : 'Hoàn tất'}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-zinc-500 font-mono">
                  Tổng số: {filteredQuotes.length} đơn
                </div>
              </div>

              <div className="space-y-4">
                {filteredQuotes.map((q) => (
                  <div
                    key={q.id}
                    className="p-5 border border-zinc-200 rounded-sm bg-white hover:border-emerald-500 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-base text-zinc-900">{q.fullName}</span>
                          <span className="text-zinc-400">•</span>
                          <span className="font-medium text-emerald-800 text-xs">{q.companyName}</span>
                          <span
                            className={`px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase font-bold ${
                              q.status === 'new'
                                ? 'bg-emerald-100 text-emerald-800'
                                : q.status === 'quoted'
                                ? 'bg-blue-100 text-blue-800'
                                : q.status === 'contacted'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-zinc-100 text-zinc-700'
                            }`}
                          >
                            {q.status === 'new'
                              ? 'Mới tiếp nhận'
                              : q.status === 'contacted'
                              ? 'Đang tư vấn KCS'
                              : q.status === 'quoted'
                              ? 'Đã gửi báo giá FOB'
                              : 'Hoàn tất'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 pt-1">
                          <span>SĐT: <strong className="font-mono text-zinc-900">{q.phone}</strong></span>
                          <span>Email: <strong className="font-mono text-zinc-900">{q.email}</strong></span>
                          <span>Ngày gửi: <strong className="font-mono text-zinc-700">{q.createdAt}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                        <select
                          value={q.status}
                          onChange={(e) => updateQuoteStatus(q.id, e.target.value as any)}
                          className="py-1.5 px-3 border border-zinc-300 rounded-sm text-xs bg-white focus:outline-emerald-600 cursor-pointer font-medium"
                        >
                          <option value="new">Mới tiếp nhận</option>
                          <option value="contacted">Đang tư vấn</option>
                          <option value="quoted">Đã gửi báo giá</option>
                          <option value="closed">Đóng / Hoàn tất</option>
                        </select>
                        <button
                          onClick={() => {
                            if (window.confirm(`Xóa yêu cầu của ${q.fullName}?`)) {
                              deleteQuote(q.id);
                              showToast(`Đã xóa đơn báo giá của ${q.fullName}`, 'info');
                            }
                          }}
                          className="p-1.5 text-zinc-400 hover:text-red-600 rounded-sm cursor-pointer"
                          title="Xóa đơn"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm text-xs space-y-1">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-zinc-700">
                        <div>
                          <span className="text-zinc-400 block text-[10px] uppercase font-mono">Dòng Sản Phẩm</span>
                          <span className="font-bold text-zinc-900">{q.productType}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[10px] uppercase font-mono">Số Lượng Yêu Cầu</span>
                          <span className="font-mono font-bold text-emerald-700">{q.quantity}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[10px] uppercase font-mono">Quy Cách &amp; Aglet</span>
                          <span className="text-zinc-800">{q.lengthOption} • {q.agletType}</span>
                        </div>
                      </div>
                      {q.notes && (
                        <div className="pt-2 border-t border-zinc-200 text-zinc-600">
                          <span className="text-zinc-400 text-[10px] uppercase font-mono block">Ghi Chú Kỹ Thuật:</span>
                          <p className="italic">"{q.notes}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {filteredQuotes.length === 0 && (
                  <div className="p-8 text-center text-zinc-500 text-xs border border-dashed border-zinc-200 rounded-sm">
                    Không có đơn báo giá nào trong mục này.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL: THÊM / CHỈNH SỬA SẢN PHẨM */}
      {/* ========================================================= */}
      {(isNewProductModalOpen || editingProduct) && (
        <ProductFormModal
          categories={categories}
          initialData={editingProduct}
          onClose={() => {
            setIsNewProductModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={(prodData) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, prodData);
              showToast(`Đã cập nhật sản phẩm "${prodData.name}"`, 'success');
            } else {
              addProduct(prodData);
              showToast(`Đã tạo sản phẩm mới "${prodData.name}"`, 'success');
            }
            setIsNewProductModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: THÊM / CHỈNH SỬA DANH MỤC */}
      {/* ========================================================= */}
      {(isNewCategoryModalOpen || editingCategory) && (
        <CategoryFormModal
          initialData={editingCategory}
          onClose={() => {
            setIsNewCategoryModalOpen(false);
            setEditingCategory(null);
          }}
          onSave={(catData) => {
            if (editingCategory) {
              updateCategory(editingCategory.id, catData);
              showToast(`Đã cập nhật danh mục "${catData.name}"`, 'success');
            } else {
              addCategory(catData);
              showToast(`Đã tạo danh mục mới "${catData.name}"`, 'success');
            }
            setIsNewCategoryModalOpen(false);
            setEditingCategory(null);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: THÊM / CHỈNH SỬA BÀI VIẾT */}
      {/* ========================================================= */}
      {(isNewArticleModalOpen || editingArticle) && (
        <ArticleFormModal
          initialData={editingArticle}
          onClose={() => {
            setIsNewArticleModalOpen(false);
            setEditingArticle(null);
          }}
          onSave={(artData) => {
            if (editingArticle) {
              updateArticle(editingArticle.id, artData);
              showToast(`Đã cập nhật bài viết "${artData.title}"`, 'success');
            } else {
              addArticle(artData);
              showToast(`Đã đăng bài viết mới "${artData.title}"`, 'success');
            }
            setIsNewArticleModalOpen(false);
            setEditingArticle(null);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: THÊM / CHỈNH SỬA TUYỂN DỤNG */}
      {/* ========================================================= */}
      {(isNewJobModalOpen || editingJob) && (
        <JobFormModal
          initialData={editingJob}
          onClose={() => {
            setIsNewJobModalOpen(false);
            setEditingJob(null);
          }}
          onSave={(jobData) => {
            if (editingJob) {
              updateJob(editingJob.id, jobData);
              showToast(`Đã cập nhật vị trí "${jobData.title}"`, 'success');
            } else {
              addJob(jobData);
              showToast(`Đã đăng tuyển dụng "${jobData.title}"`, 'success');
            }
            setIsNewJobModalOpen(false);
            setEditingJob(null);
          }}
        />
      )}
    </div>
  );
};

// =========================================================
// SUB-COMPONENT: PRODUCT FORM MODAL
// =========================================================
interface ProductFormModalProps {
  categories: CategoryItem[];
  initialData: Product | null;
  onClose: () => void;
  onSave: (data: Omit<Product, 'id'>) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  categories,
  initialData,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: initialData?.name || '',
    category: initialData?.category || 'shoelace',
    subtitle: initialData?.subtitle || '',
    material: initialData?.material || '100% High-Grade Polyester',
    widthOrDiameter: initialData?.widthOrDiameter || 'Bản dẹt 8mm',
    tensileStrength: initialData?.tensileStrength || '> 150 N',
    description: initialData?.description || '',
    features: initialData?.features || ['Độ bền kéo vượt chuẩn ISO 2062', 'Đạt chuẩn Oeko-Tex Standard 100 Class 1'],
    colors: initialData?.colors || ['#000000', '#ffffff', '#059669', '#d97706'],
    agletOptions: initialData?.agletOptions || ['Kim loại khắc Laser', 'Màng Acetate trong suốt'],
    moq: initialData?.moq || '1,000 cặp',
    badge: initialData?.badge || '',
    modelColor: initialData?.modelColor || '#059669',
    modelTexture: initialData?.modelTexture || 'woven',
    image: initialData?.image || 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    status: initialData?.status || 'active',
    isNew: initialData?.isNew || false,
    isFW25: initialData?.isFW25 || false
  });

  const [featuresText, setFeaturesText] = useState(
    (initialData?.features || ['Độ bền kéo vượt chuẩn ISO 2062', 'Đạt chuẩn Oeko-Tex Standard 100 Class 1']).join('\n')
  );

  const [agletText, setAgletText] = useState(
    (initialData?.agletOptions || ['Kim loại khắc Laser', 'Màng Acetate trong suốt']).join(', ')
  );

  const [colorsText, setColorsText] = useState(
    (initialData?.colors || ['#000000', '#ffffff', '#059669', '#d97706']).join(', ')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFeatures = featuresText.split('\n').map((s) => s.trim()).filter(Boolean);
    const finalAglets = agletText.split(',').map((s) => s.trim()).filter(Boolean);
    const finalColors = colorsText.split(',').map((s) => s.trim()).filter(Boolean);

    onSave({
      ...formData,
      features: finalFeatures,
      agletOptions: finalAglets,
      colors: finalColors
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-zinc-300 rounded-sm w-full max-w-3xl my-8 overflow-hidden shadow-2xl">
        <div className="p-5 bg-zinc-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold uppercase tracking-tight">
              {initialData ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
            </h3>
            <p className="text-xs text-zinc-400">
              Công ty Cổ phần Sản xuất Dệt Liên Châu • Quản trị kỹ thuật sản phẩm
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">Tên Sản Phẩm *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
                placeholder="VD: Dây Dẹt Thể Thao Sneaker Pro"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Danh Mục Phân Loại *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Tiêu Đề Phụ / Tóm Tắt Kỹ Thuật</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
              placeholder="VD: Dệt mật độ cao chống giãn, chịu lực ma sát vượt trội"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">Quy Cách Khổ Bản</label>
              <input
                type="text"
                value={formData.widthOrDiameter}
                onChange={(e) => setFormData({ ...formData, widthOrDiameter: e.target.value })}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono"
                placeholder="VD: Bản dẹt 8mm - 10mm"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Lực Kéo Đứt (Tensile)</label>
              <input
                type="text"
                value={formData.tensileStrength}
                onChange={(e) => setFormData({ ...formData, tensileStrength: e.target.value })}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono"
                placeholder="VD: > 160 N (ISO 2062)"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">MOQ (Đơn Tối Thiểu)</label>
              <input
                type="text"
                value={formData.moq}
                onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono"
                placeholder="VD: 1,000 cặp hoặc 3,000m"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Chất Liệu Sợi Dệt</label>
            <input
              type="text"
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
              placeholder="VD: 100% Recycled Polyester (RPET) GRS hoặc Nylon 66"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Mô Tả Chi Tiết Sản Phẩm</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 leading-relaxed"
              placeholder="Mô tả công dụng, tính chất sợi, ứng dụng sản xuất giày dép hay may mặc..."
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              Đặc Tính Kỹ Thuật Nổi Bật (Mỗi dòng một đặc tính)
            </label>
            <textarea
              rows={3}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono text-[11px]"
              placeholder="Độ bền kéo vượt chuẩn ISO 2062&#10;Độ bền màu mồ hôi và ma sát cấp 4-5&#10;Chứng chỉ Oeko-Tex Standard 100 Class 1"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">
                Tùy Chọn Đầu Aglet (cách nhau dấu phẩy)
              </label>
              <input
                type="text"
                value={agletText}
                onChange={(e) => setAgletText(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
                placeholder="Kim loại khắc Laser, Bọc silicon, Màng PLA"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">
                Bảng Màu Hex (cách nhau dấu phẩy)
              </label>
              <input
                type="text"
                value={colorsText}
                onChange={(e) => setColorsText(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono"
                placeholder="#000000, #ffffff, #059669, #d97706"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">URL Hình Ảnh Đại Diện</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm">
            <label className="block font-bold text-zinc-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Trạng Thái Hiển Thị Sản Phẩm
            </label>
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="productStatus"
                  value="active"
                  checked={(formData.status || 'active') === 'active'}
                  onChange={() => setFormData({ ...formData, status: 'active' })}
                  className="w-4 h-4 text-emerald-600 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hiển thị trên website (Khách hàng xem được)</span>
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="productStatus"
                  value="hidden"
                  checked={formData.status === 'hidden'}
                  onChange={() => setFormData({ ...formData, status: 'hidden' })}
                  className="w-4 h-4 text-zinc-600 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <EyeOff className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Ẩn khỏi website (Tạm dừng hiển thị)</span>
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-zinc-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded-xs"
              />
              <span className="font-bold text-zinc-800">Đánh dấu Sản Phẩm Mới (2026)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFW25}
                onChange={(e) => setFormData({ ...formData, isFW25: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded-xs"
              />
              <span className="font-bold text-zinc-800">Thuộc Bộ Sưu Tập FW25</span>
            </label>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold uppercase rounded-sm cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase rounded-sm cursor-pointer transition-colors shadow-sm"
            >
              {initialData ? 'Lưu Thay Đổi' : 'Tạo Sản Phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================
// SUB-COMPONENT: CATEGORY FORM MODAL
// =========================================================
interface CategoryFormModalProps {
  initialData: CategoryItem | null;
  onClose: () => void;
  onSave: (data: CategoryItem) => void;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  initialData,
  onClose,
  onSave
}) => {
  const [id, setId] = useState(initialData?.id || '');
  const [name, setName] = useState(initialData?.name || '');
  const [nameEn, setNameEn] = useState(initialData?.nameEn || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<'active' | 'hidden'>(initialData?.status || 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: id.toLowerCase().trim().replace(/\s+/g, '-'),
      name,
      nameEn,
      description,
      status,
      isFeatured: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border border-zinc-300 rounded-sm w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 bg-zinc-900 text-white flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-tight">
            {initialData ? 'Chỉnh Sửa Danh Mục' : 'Tạo Danh Mục Mới'}
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-zinc-700 mb-1">Mã Định Danh (Slug ID) *</label>
            <input
              type="text"
              required
              disabled={!!initialData}
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono disabled:bg-zinc-100"
              placeholder="VD: shoelace, webbing, rpet-cord"
            />
            <p className="text-[11px] text-zinc-400 mt-1">Dùng để phân loại URL và lọc sản phẩm.</p>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Tên Danh Mục (Tiếng Việt) *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
              placeholder="VD: Dây Giày Thể Thao & Sneaker"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Tên Danh Mục (Tiếng Anh)</label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
              placeholder="VD: Athletic & Sneaker Shoelaces"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Mô Tả Danh Mục</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 leading-relaxed"
              placeholder="Mô tả tóm tắt chủng loại, ứng dụng của danh mục này..."
            />
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm">
            <label className="block font-bold text-zinc-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Trạng Thái Hiển Thị Danh Mục
            </label>
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="catStatus"
                  value="active"
                  checked={status === 'active'}
                  onChange={() => setStatus('active')}
                  className="w-4 h-4 text-emerald-600 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hiển thị trên website</span>
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="catStatus"
                  value="hidden"
                  checked={status === 'hidden'}
                  onChange={() => setStatus('hidden')}
                  className="w-4 h-4 text-zinc-600 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <EyeOff className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Ẩn khỏi website</span>
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold uppercase rounded-sm cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase rounded-sm cursor-pointer transition-colors"
            >
              {initialData ? 'Lưu Thay Đổi' : 'Tạo Danh Mục'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================
// SUB-COMPONENT: ARTICLE FORM MODAL
// =========================================================
interface ArticleFormModalProps {
  initialData: NewsArticle | null;
  onClose: () => void;
  onSave: (data: Omit<NewsArticle, 'id'>) => void;
}

const ArticleFormModal: React.FC<ArticleFormModalProps> = ({
  initialData,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'Kỹ Thuật');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().substring(0, 10));
  const [readTime, setReadTime] = useState(initialData?.readTime || '4 phút đọc');
  const [author, setAuthor] = useState(initialData?.author || 'Ban Kỹ Thuật Dệt Liên Châu');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [paragraphs, setParagraphs] = useState((initialData?.content || ['']).join('\n\n'));
  const [image, setImage] = useState(initialData?.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80');
  const [tagsText, setTagsText] = useState((initialData?.tags || ['Dệt may', 'ISO 2062', 'Xu hướng 2026']).join(', '));
  const [status, setStatus] = useState<'active' | 'hidden'>(initialData?.status || 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contentArr = paragraphs.split('\n\n').map((p) => p.trim()).filter(Boolean);
    const tagsArr = tagsText.split(',').map((t) => t.trim()).filter(Boolean);

    onSave({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      date,
      readTime,
      author,
      summary,
      content: contentArr.length > 0 ? contentArr : [summary],
      image,
      tags: tagsArr,
      status
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-zinc-300 rounded-sm w-full max-w-2xl my-8 overflow-hidden shadow-2xl">
        <div className="p-4 bg-zinc-900 text-white flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-tight">
            {initialData ? 'Chỉnh Sửa Bài Viết' : 'Viết Bài Bản Tin Mới'}
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div>
            <label className="block font-bold text-zinc-700 mb-1">Tiêu Đề Bài Viết *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
              placeholder="VD: Xu Hướng Phối Màu Dây Giày Thu Đông FW25..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">Chủ Đề / Danh Mục</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 bg-white"
              >
                <option value="Kỹ Thuật">Kỹ Thuật</option>
                <option value="Xu Hướng">Xu Hướng</option>
                <option value="Sản Xuất">Sản Xuất</option>
                <option value="Kỹ Thuật & Chất Lượng">Kỹ Thuật &amp; Chất Lượng</option>
                <option value="Sự Kiện">Sự Kiện &amp; Triển Lãm</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Ngày Đăng</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono"
                placeholder="2026-09-04"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Thời Gian Đọc</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
                placeholder="VD: 5 phút đọc"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Tác Giả</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
              placeholder="VD: Ban Kỹ Thuật Dệt Liên Châu"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Tóm Tắt Ngắn</label>
            <textarea
              rows={2}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 leading-relaxed"
              placeholder="Tóm tắt ngắn 1-2 câu hiển thị ở danh sách bài viết..."
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              Nội Dung Chi Tiết (Cách nhau bằng 2 lần xuống dòng để tạo đoạn văn mới)
            </label>
            <textarea
              rows={6}
              value={paragraphs}
              onChange={(e) => setParagraphs(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 leading-relaxed font-sans"
              placeholder="Nhập nội dung bài viết chi tiết tại đây..."
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">URL Hình Ảnh Bài Viết</label>
            <input
              type="url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Tags (cách nhau dấu phẩy)</label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
              placeholder="Dệt may, ISO 2062, Xu hướng 2026, ECO-RPET"
            />
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm">
            <label className="block font-bold text-zinc-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Trạng Thái Hiển Thị Bài Viết
            </label>
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="articleStatus"
                  value="active"
                  checked={status === 'active'}
                  onChange={() => setStatus('active')}
                  className="w-4 h-4 text-emerald-600 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hiển thị trên website</span>
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="articleStatus"
                  value="hidden"
                  checked={status === 'hidden'}
                  onChange={() => setStatus('hidden')}
                  className="w-4 h-4 text-zinc-600 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <EyeOff className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Ẩn khỏi website</span>
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold uppercase rounded-sm cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase rounded-sm cursor-pointer transition-colors"
            >
              {initialData ? 'Lưu Thay Đổi' : 'Đăng Bài Viết'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================
// SUB-COMPONENT: JOB FORM MODAL
// =========================================================
interface JobFormModalProps {
  initialData: JobOpening | null;
  onClose: () => void;
  onSave: (data: Omit<JobOpening, 'id'>) => void;
}

const JobFormModal: React.FC<JobFormModalProps> = ({
  initialData,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [department, setDepartment] = useState(initialData?.department || 'Sản Xuất & Kỹ Thuật');
  const [location, setLocation] = useState(initialData?.location || 'KCN Sóng Thần 3, Bình Dương');
  const [type, setType] = useState(initialData?.type || 'Toàn thời gian (Theo ca)');
  const [experience, setExperience] = useState(initialData?.experience || '1 - 3 năm');
  const [salary, setSalary] = useState(initialData?.salary || '10 - 15 Triệu + Thưởng');
  const [deadline, setDeadline] = useState(initialData?.deadline || '30/10/2026');
  const [urgent, setUrgent] = useState(initialData?.urgent || false);
  const [status, setStatus] = useState<'active' | 'hidden'>(initialData?.status || 'active');
  const [description, setDescription] = useState(initialData?.description || '');
  const [respText, setRespText] = useState((initialData?.responsibilities || ['Vận hành máy dệt kim đan tròn 32 thoi', 'Giám sát chỉ số KCS']).join('\n'));
  const [reqText, setReqText] = useState((initialData?.requirements || ['Có chứng chỉ nghề dệt may', 'Chịu khó, cẩn thận']).join('\n'));
  const [benText, setBenText] = useState((initialData?.benefits || ['Cơm trưa nhà máy miễn phí', 'Xe đưa đón từ TP.HCM và Thủ Dầu Một', 'Bảo hiểm đầy đủ']).join('\n'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      department,
      location,
      type,
      experience,
      salary,
      deadline,
      urgent,
      status,
      description: description || 'Gia nhập đội ngũ sản xuất phụ liệu dệt may Liên Châu tại Bình Dương.',
      responsibilities: respText.split('\n').map((s) => s.trim()).filter(Boolean),
      requirements: reqText.split('\n').map((s) => s.trim()).filter(Boolean),
      benefits: benText.split('\n').map((s) => s.trim()).filter(Boolean)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-zinc-300 rounded-sm w-full max-w-2xl my-8 overflow-hidden shadow-2xl">
        <div className="p-4 bg-zinc-900 text-white flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-tight">
            {initialData ? 'Chỉnh Sửa Vị Trí Tuyển Dụng' : 'Đăng Vị Trí Mới'}
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div>
            <label className="block font-bold text-zinc-700 mb-1">Chức Danh / Vị Trí Tuyển Dụng *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
              placeholder="VD: Kỹ Sư Vận Hành Máy Dệt Bện Tự Động"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">Phòng Ban *</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 bg-white"
              >
                <option value="Sản Xuất & Kỹ Thuật">Sản Xuất &amp; Kỹ Thuật</option>
                <option value="Kiểm Soát Chất Lượng QC/QA">Kiểm Soát Chất Lượng QC/QA</option>
                <option value="Kinh Doanh & Phát Triển Thị Trường">Kinh Doanh &amp; B2B</option>
                <option value="Vận Hành Nhà Máy & Bảo Trì">Bảo Trì &amp; Cơ Điện</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Mức Lương *</label>
              <input
                type="text"
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono"
                placeholder="VD: 12 - 18 Triệu + Thưởng năng suất"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">Địa Điểm Làm Việc</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
                placeholder="KCN Sóng Thần 3, Bình Dương"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Kinh Nghiệm</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600"
                placeholder="VD: 2+ năm kinh nghiệm"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Hạn Nộp Hồ Sơ</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 font-mono"
                placeholder="VD: 30/11/2026"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">Mô Tả Tổng Quan Về Công Việc</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 leading-relaxed"
              placeholder="Tóm tắt ngắn gọn vị trí công tác tại nhà máy dệt Liên Châu..."
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              Nhiệm Vụ Chính (Mỗi dòng một nhiệm vụ)
            </label>
            <textarea
              rows={3}
              value={respText}
              onChange={(e) => setRespText(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 leading-relaxed font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              Yêu Cầu Năng Lực (Mỗi dòng một yêu cầu)
            </label>
            <textarea
              rows={3}
              value={reqText}
              onChange={(e) => setReqText(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 leading-relaxed font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              Quyền Lợi &amp; Chế Độ Đãi Ngộ (Mỗi dòng một chế độ)
            </label>
            <textarea
              rows={3}
              value={benText}
              onChange={(e) => setBenText(e.target.value)}
              className="w-full p-2.5 border border-zinc-300 rounded-sm focus:outline-emerald-600 leading-relaxed font-mono text-[11px]"
            />
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm">
            <label className="block font-bold text-zinc-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Trạng Thái Hiển Thị Tin Tuyển Dụng
            </label>
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="jobStatus"
                  value="active"
                  checked={status === 'active'}
                  onChange={() => setStatus('active')}
                  className="w-4 h-4 text-emerald-600 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hiển thị trên website (Đang nhận hồ sơ)</span>
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="jobStatus"
                  value="hidden"
                  checked={status === 'hidden'}
                  onChange={() => setStatus('hidden')}
                  className="w-4 h-4 text-zinc-600 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <EyeOff className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Ẩn khỏi website (Tạm đóng tuyển dụng)</span>
                </span>
              </label>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded-xs"
              />
              <span className="font-bold text-red-700">Đánh dấu vị trí "Tuyển Gấp" (Ưu tiên hiển thị trên web)</span>
            </label>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold uppercase rounded-sm cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase rounded-sm cursor-pointer transition-colors"
            >
              {initialData ? 'Lưu Thay Đổi' : 'Đăng Tuyển Dụng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
