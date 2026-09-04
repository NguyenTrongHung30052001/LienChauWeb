import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { Search, Filter, Sparkles, Layers, ArrowRight, Check, X } from 'lucide-react';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

interface ProductsPageProps {
  onSelectProductForQuote: (productName: string) => void;
  onNavigateToContact: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProductForQuote,
  onNavigateToContact
}) => {
  const { t, language } = useLanguage();
  const { products, categories: customCategories } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Dynamic categories from context if available, otherwise fallback tabs
  const defaultCategoryTabs = [
    { id: 'all', label: t.products.tabAll },
    { id: 'new', label: t.products.tabNew },
    { id: 'shoelace', label: t.products.tabShoelace },
    { id: 'webbing', label: t.products.tabWebbing },
    { id: 'elastic', label: t.products.tabElastic },
    { id: 'drawstring', label: t.products.tabDrawstring },
    { id: 'tipping', label: t.products.tabTipping },
    { id: 'fw25', label: t.products.tabFW25 }
  ];

  // Merge custom categories that might have been added in Admin (and not hidden)
  const additionalCategories = (customCategories || [])
    .filter(c => c.status !== 'hidden' && !defaultCategoryTabs.some(d => d.id === c.id))
    .map(c => ({ id: c.id, label: c.name }));

  const categories = [...defaultCategoryTabs, ...additionalCategories];

  const visibleProducts = (products || []).filter((p) => p.status !== 'hidden');

  const filteredProducts = visibleProducts.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRequestQuote = (prod: Product) => {
    setSelectedProduct(null);
    onSelectProductForQuote(prod.name);
    onNavigateToContact();
  };

  return (
    <div className="bg-white text-zinc-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="text-left space-y-2 mb-12 pb-6 border-b border-zinc-200">
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block">
            {language === 'en' ? 'Comprehensive Catalog • OEM / ODM Direct' : language === 'id' ? 'Katalog Komprehensif • Langsung Pabrik OEM / ODM' : 'Danh Mục Sản Phẩm Toàn Diện • OEM / ODM Direct'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-900">
            {language === 'en' ? 'Shoelace & Garment Trim Ecosystem' : language === 'id' ? 'Ekosistem Tali Sepatu & Aksesori Tekstil' : 'Hệ Sinh Thái Dây Giày & Phụ Liệu Dệt May'}
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {language === 'en'
              ? 'Over 200+ weaving specifications: Sneaker shoelaces, waxed boot laces, heavy-duty webbing, knitted elastics, hoodie drawstrings, and luxury metal tipping services.'
              : language === 'id'
              ? 'Lebih dari 200+ spesifikasi tenun: Tali sepatu sneaker, tali lilin bot, webbing penahan beban, tali elastis, tali serut hoodie, dan layanan tipping logam presisi.'
              : 'Hơn 200+ quy cách dệt đan: Dây giày sneaker, dây da sáp, dây đai webbing chịu tải, dây thun dệt kim, dây luồn hoodie thể thao và dịch vụ gia công bấm đầu tipping cao cấp.'}
          </p>
        </div>

        {/* Search Bar & Category Filter Bar */}
        <div className="space-y-4 mb-10 pb-6 border-b border-zinc-200">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search product name, material, specs...' : language === 'id' ? 'Cari nama produk, bahan, ukuran...' : 'Tìm tên sản phẩm, chất liệu, quy cách...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 text-xs text-zinc-900 outline-none rounded-sm transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-zinc-500 font-mono text-left sm:text-right">
              {language === 'en' ? (
                <>Showing: <strong>{filteredProducts.length}</strong> standard products</>
              ) : language === 'id' ? (
                <>Menampilkan: <strong>{filteredProducts.length}</strong> produk standar</>
              ) : (
                <>Hiển thị: <strong>{filteredProducts.length}</strong> sản phẩm tiêu chuẩn</>
              )}
            </div>
          </div>

          {/* 7 Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-zinc-200 hover:border-emerald-500 flex flex-col justify-between p-5 transition-all group rounded-sm shadow-xs hover:shadow-md"
            >
              <div className="space-y-3.5">
                {/* Image */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative aspect-square overflow-hidden bg-zinc-100 rounded-sm cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-emerald-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded-sm">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-zinc-900/80 text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded-sm backdrop-blur-xs">
                    MOQ: {product.moq}
                  </span>
                </div>

                {/* Meta */}
                <div>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold uppercase block mb-1">
                    {product.categoryName || product.category.toUpperCase()}
                  </span>
                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="text-base font-bold text-zinc-900 uppercase tracking-tight group-hover:text-emerald-700 transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-sm text-[11px] font-mono space-y-1 text-zinc-600">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">{t.products.specWidth}:</span>
                    <span className="font-bold text-zinc-800">{product.widthOrDiameter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">{t.products.specTensile}:</span>
                    <span className="font-bold text-emerald-700">{product.tensileStrength}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
                >
                  {t.products.viewDetail}
                </button>
                <button
                  onClick={() => handleRequestQuote(product)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm shadow-xs"
                >
                  {t.products.requestSample}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center text-zinc-500 space-y-2">
            <Layers className="w-10 h-10 mx-auto text-zinc-400" />
            <p className="text-sm font-bold">
              {language === 'en' ? 'No products match your criteria.' : language === 'id' ? 'Tidak ada produk yang cocok dengan pencarian Anda.' : 'Không tìm thấy sản phẩm nào phù hợp.'}
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-xs text-emerald-700 font-bold uppercase underline cursor-pointer"
            >
              {language === 'en' ? 'View all products' : language === 'id' ? 'Lihat semua produk' : 'Xem lại tất cả sản phẩm'}
            </button>
          </div>
        )}

      </div>

      {/* Modal Detail */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}
    </div>
  );
};
