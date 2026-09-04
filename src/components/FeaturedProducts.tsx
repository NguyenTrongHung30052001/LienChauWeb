import React, { useState } from 'react';
import { Product } from '../types';
import { ProductDetailModal } from './ProductDetailModal';
import { ArrowRight, SlidersHorizontal, Check, Eye } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

interface FeaturedProductsProps {
  onSelectProductForQuote: (productName: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onSelectProductForQuote }) => {
  const { t, language } = useLanguage();
  const { products } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: language === 'en' ? 'All Products' : language === 'id' ? 'Semua Produk' : 'Tất Cả' },
    { id: 'shoelace', label: t.productsSec.tabs.shoelace },
    { id: 'webbing', label: t.productsSec.tabs.webbing },
    { id: 'elastic', label: t.productsSec.tabs.elastic },
    { id: 'drawstring', label: t.productsSec.tabs.drawstring },
    { id: 'tipping', label: t.productsSec.tabs.tipping },
  ];

  const filteredProducts = (products || []).filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  ).slice(0, 6);

  const handleRequestQuote = (productName: string) => {
    setSelectedProduct(null);
    onSelectProductForQuote(productName);
  };

  return (
    <section id="products" className="py-20 lg:py-24 bg-white border-b border-zinc-200 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200 mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
              {t.productsSec.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
              {t.productsSec.title}
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
              {t.productsSec.desc}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid - Clean, Architectural B2B Presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-zinc-200 hover:border-zinc-400 transition-colors p-5 flex flex-col justify-between rounded-sm shadow-xs group"
            >
              <div className="space-y-4">
                {/* Product Image */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative aspect-square overflow-hidden bg-zinc-100 border border-zinc-200 rounded-sm cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-zinc-900 text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded-xs">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-white/95 text-zinc-900 font-mono text-[9px] font-bold uppercase tracking-wider border border-zinc-200 rounded-xs shadow-xs">
                    {t.productsSec.moqLabel}: {product.moq}
                  </span>
                </div>

                {/* Product Meta */}
                <div>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase block mb-1">
                    {product.categoryName || product.category.toUpperCase()}
                  </span>
                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="text-base font-bold text-zinc-900 uppercase tracking-tight group-hover:text-emerald-700 transition-colors cursor-pointer leading-snug"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Technical Specs Box */}
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm text-xs font-mono space-y-1.5 text-zinc-700">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-[11px] uppercase">
                      {language === 'en' ? 'Spec:' : language === 'id' ? 'Spesifikasi:' : 'Quy cách:'}
                    </span>
                    <span className="font-bold text-zinc-900">{product.widthOrDiameter}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-[11px] uppercase">
                      {language === 'en' ? 'Tensile:' : language === 'id' ? 'Kekuatan Tarik:' : 'Lực kéo đứt:'}
                    </span>
                    <span className="font-bold text-emerald-700">{product.tensileStrength}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-[11px] uppercase">
                      {language === 'en' ? 'Fiber Material:' : language === 'id' ? 'Bahan Serat:' : 'Chất liệu sợi:'}
                    </span>
                    <span className="font-bold text-zinc-800">{product.material}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-200 mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
                >
                  {t.productsSec.viewDetail}
                </button>
                <button
                  onClick={() => handleRequestQuote(product.name)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm shadow-xs"
                >
                  {t.productsSec.requestQuote}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Catalog Callout */}
        <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold uppercase tracking-tight text-zinc-900">
              {language === 'en'
                ? 'Need custom weave specifications or laser-etched logo tipping?'
                : language === 'id'
                ? 'Butuh spesifikasi anyaman khusus atau ukiran logo laser?'
                : 'Cần thiết kế riêng quy cách dệt hoặc khắc logo laser theo yêu cầu?'}
            </h4>
            <p className="text-xs text-zinc-600">
              {language === 'en'
                ? 'Lien Chau provides complimentary Lab Dip swatches and custom yarn tailoring to your Tech Pack.'
                : language === 'id'
                ? 'Lien Chau menyediakan sampel Lab Dip gratis dan penyesuaian benang sesuai Tech Pack pelanggan.'
                : 'Liên Châu hỗ trợ dệt mẫu Lab Dip miễn phí và tùy chỉnh thông số sợi theo Tech Pack của khách hàng.'}
            </p>
          </div>
          <button
            onClick={() => onSelectProductForQuote('Dây Giày Thiết Kế Riêng Theo Tech Pack')}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm whitespace-nowrap shrink-0"
          >
            {language === 'en' ? 'Request Custom Sample' : language === 'id' ? 'Minta Sampel Kustom' : 'Yêu Cầu Dệt Mẫu Riêng'}
          </button>
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}
    </section>
  );
};
