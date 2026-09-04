import React from 'react';
import { Product } from '../types';
import { X, Check, ShieldCheck, Download, Send, Sparkles, Scale, Ruler, Layers } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-zinc-200 shadow-2xl overflow-hidden text-left emerald-glow rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-sm">
              {product.badge || 'Sản phẩm tiêu chuẩn'}
            </span>
            {product.categoryName && (
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-sm uppercase tracking-wider">
                {product.categoryName}
              </span>
            )}
            <span className="text-[10px] text-zinc-500 font-mono font-bold">SPEC: #{product.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Top section: Image & Main title */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-5 aspect-[4/3] overflow-hidden border border-zinc-200 bg-zinc-100 rounded-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 space-y-2.5">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-zinc-900">
                {product.name}
              </h3>
              <p className="text-xs text-emerald-700 font-mono uppercase tracking-wider font-bold">
                {product.subtitle}
              </p>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {product.description}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[10px] rounded-sm">
                  MOQ: {product.moq}
                </span>
                <span className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[10px] rounded-sm">
                  Oeko-Tex Standard 100
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest font-mono">
                <Layers className="w-3 h-3 text-emerald-600" />
                <span>Vật liệu sợi</span>
              </div>
              <p className="text-xs font-bold text-zinc-800 uppercase">
                {product.material}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest font-mono">
                <Ruler className="w-3 h-3 text-emerald-600" />
                <span>Quy cách bản</span>
              </div>
              <p className="text-xs font-bold text-zinc-800">
                {product.widthOrDiameter}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest font-mono">
                <Scale className="w-3 h-3 text-emerald-600" />
                <span>Lực kéo đứt</span>
              </div>
              <p className="text-xs font-bold text-emerald-700 font-mono">
                {product.tensileStrength}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold text-zinc-800 uppercase tracking-widest font-mono">
              Đặc Tính Kỹ Thuật Nổi Bật:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 rounded-sm">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-[11px] leading-tight">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aglet options & Color samples */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-zinc-800 uppercase tracking-widest font-mono block">
                Tùy Chọn Đầu Aglet:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.agletOptions.map((opt, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-sm"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-zinc-800 uppercase tracking-widest font-mono block">
                Bảng Màu Cơ Bản (Pha Pantone):
              </span>
              <div className="flex items-center gap-2">
                {product.colors.map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 border border-zinc-300 rounded-sm shadow-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
                <span className="text-[10px] text-zinc-500 font-mono">+ 200 màu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] uppercase tracking-wider">Cam kết mẫu thử chuẩn 100% bản vẽ</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-300 transition-colors rounded-sm"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestQuote(product.name);
              }}
              className="px-6 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 rounded-sm shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Yêu Cầu Mẫu Thử / Báo Giá</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
