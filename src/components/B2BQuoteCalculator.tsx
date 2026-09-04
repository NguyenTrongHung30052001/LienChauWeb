import React, { useState } from 'react';
import { Calculator, Package, Clock, ShieldCheck, ArrowRight, Check, Sparkles, Send } from 'lucide-react';

interface B2BQuoteCalculatorProps {
  onDirectQuoteSubmit?: (specSummary: string) => void;
}

export const B2BQuoteCalculator: React.FC<B2BQuoteCalculatorProps> = ({ onDirectQuoteSubmit }) => {
  const [productType, setProductType] = useState<string>('shoelace-sneaker');
  const [material, setMaterial] = useState<string>('rpet');
  const [lengthCm, setLengthCm] = useState<number>(120);
  const [widthMm, setWidthMm] = useState<number>(6);
  const [tippingType, setTippingType] = useState<string>('metal-gunmetal');
  const [quantityPairs, setQuantityPairs] = useState<number>(5000);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Specifications calculations
  const weightPerPairGram = Math.round((lengthCm * 0.045) + (widthMm * 0.4) + (tippingType.includes('metal') ? 4.5 : 0.8));
  const totalWeightKg = ((weightPerPairGram * quantityPairs) / 1000).toFixed(1);
  const pairsPerCarton = 500;
  const totalCartons = Math.ceil(quantityPairs / pairsPerCarton);
  
  // Lead times based on quantity
  const sampleLeadDays = 2;
  const productionLeadDays = quantityPairs <= 10000 ? 5 : quantityPairs <= 50000 ? 8 : 12;

  const handleSendToContact = () => {
    const materialLabel = material === 'rpet' ? 'Polyester Tái Chế GRS' : material === 'cotton' ? 'Cotton Tự Nhiên' : 'Polyamide Siêu Bền';
    const tippingLabel = tippingType === 'metal-gunmetal' ? 'Đầu Kim Loại Gunmetal' : tippingType === 'clear-plastic' ? 'Đầu Màng Trong Suốt' : 'Đầu Silicon Nhúng';
    
    const summary = `Yêu cầu báo giá: ${productType} | Sợi: ${materialLabel} | Kích thước: ${lengthCm}cm x ${widthMm}mm | Đầu bọc: ${tippingLabel} | Số lượng: ${quantityPairs.toLocaleString('vi-VN')} cặp (Ước tính ${totalWeightKg}kg / ${totalCartons} thùng)`;
    
    if (onDirectQuoteSubmit) {
      onDirectQuoteSubmit(summary);
    }
  };

  return (
    <section id="b2b-calculator" className="py-20 lg:py-24 bg-zinc-50 border-b border-zinc-200 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-sm text-xs font-mono text-emerald-800 font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              Công Cụ Định Lượng B2B Trực Tuyến
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
              Dự Toán Quy Cách &amp; Tiến Độ Đơn Hàng Sợi
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Dành riêng cho Merchandiser &amp; Phòng Thu Mua: Tính toán tức thì khối lượng tịnh, số lượng thùng carton xuất khẩu và thời gian bàn giao mẫu thử tận xưởng.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-mono text-zinc-400 block uppercase">Tiêu chuẩn đóng gói</span>
            <span className="text-xs font-mono font-bold text-zinc-800">Thùng Carton 5 Lớp + Túi Hút Ẩm</span>
          </div>
        </div>

        {/* Two-Column Industrial Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Selection Matrix */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-zinc-200 rounded-sm space-y-6 shadow-xs">
            
            {/* 1. Product Type */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-800 uppercase block">
                1. Loại Phụ Liệu Sợi Dệt
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'shoelace-sneaker', label: 'Dây Giày Sneaker' },
                  { id: 'shoelace-leather', label: 'Dây Da Sáp Bọc Wax' },
                  { id: 'hoodie-cord', label: 'Dây Luồn Áo Hoodie' },
                  { id: 'elastic-cord', label: 'Dây Thun Co Giãn' },
                  { id: 'webbing-tape', label: 'Dây Đai Webbing Balo' },
                  { id: 'reflective-cord', label: 'Dây Sợi Phản Quang' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProductType(item.id)}
                    className={`p-2.5 text-xs text-left border rounded-sm transition-all cursor-pointer ${
                      productType === item.id
                        ? 'border-emerald-600 bg-emerald-50/60 font-bold text-emerald-900'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Material Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-800 uppercase block">
                2. Thành Phần Sợi &amp; Tiêu Chuẩn Xanh
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'rpet', title: 'Recycled Poly GRS', desc: 'Sợi tái chế rPET, chuẩn US/EU' },
                  { id: 'cotton', title: '100% Combed Cotton', desc: 'Mềm mại, nhuộm màu tự nhiên' },
                  { id: 'polyamide', title: 'High-Tenacity Nylon', desc: 'Chống mài mòn, chịu lực cao' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    className={`p-3 text-left border rounded-sm transition-all cursor-pointer ${
                      material === m.id
                        ? 'border-emerald-600 bg-emerald-50/60 font-bold text-emerald-900'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{m.title}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Dimensions (Length & Width) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-zinc-800 uppercase">Chiều Dài:</span>
                  <span className="font-bold text-emerald-700">{lengthCm} cm</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="180"
                  step="5"
                  value={lengthCm}
                  onChange={(e) => setLengthCm(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>60cm (Giày trẻ em)</span>
                  <span>120cm (Chuẩn)</span>
                  <span>180cm (High-top)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-zinc-800 uppercase">Bản Rộng / Đường Kính:</span>
                  <span className="font-bold text-emerald-700">{widthMm} mm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="1"
                  value={widthMm}
                  onChange={(e) => setWidthMm(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>2mm (Tròn)</span>
                  <span>6mm - 8mm (Dẹt)</span>
                  <span>15mm (Bản to)</span>
                </div>
              </div>
            </div>

            {/* 4. Tipping Type */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-800 uppercase block">
                3. Công Nghệ Gia Công Đầu Bọc (Aglet Tipping)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'metal-gunmetal', label: 'Kim Loại Gunmetal' },
                  { id: 'clear-plastic', label: 'Nhựa Trong Suốt' },
                  { id: 'silicone-dip', label: 'Nhúng Silicone' },
                  { id: 'laser-engraved', label: 'Khắc Laser Logo' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTippingType(t.id)}
                    className={`p-2.5 text-xs text-center border rounded-sm transition-all cursor-pointer ${
                      tippingType === t.id
                        ? 'border-emerald-600 bg-emerald-50/60 font-bold text-emerald-900'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Order Quantity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-zinc-800 uppercase">4. Sản Lượng Đặt Hàng (Cặp / Bộ):</span>
                <span className="font-bold text-emerald-700 text-sm">{quantityPairs.toLocaleString('vi-VN')} Cặp</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[1000, 3000, 5000, 10000, 30000, 50000, 100000].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setQuantityPairs(qty)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-sm border cursor-pointer ${
                      quantityPairs === qty
                        ? 'border-emerald-600 bg-emerald-600 text-white font-bold'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {qty.toLocaleString('vi-VN')}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Real-time Output & Export Spec Sheet */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-zinc-900 text-white p-6 rounded-sm border border-zinc-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Bản Ước Tính Sản Xuất B2B
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">STATUS: READY</span>
              </div>

              {/* Matrix of Estimates */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-sm">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-mono uppercase">
                    <Package className="w-3.5 h-3.5 text-emerald-400" />
                    Tổng Khối Lượng
                  </div>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    {totalWeightKg} <span className="text-xs font-normal text-zinc-400">kg</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    ~{weightPerPairGram}g / cặp
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-sm">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-mono uppercase">
                    <Package className="w-3.5 h-3.5 text-emerald-400" />
                    Đóng Thùng Carton
                  </div>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    {totalCartons} <span className="text-xs font-normal text-zinc-400">thùng</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    500 cặp / thùng 5 lớp
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-sm">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-mono uppercase">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Giao Mẫu Test Lab
                  </div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                    {sampleLeadDays} <span className="text-xs font-normal text-zinc-400">ngày</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    Gửi mẫu tận xưởng khách
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-sm">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-mono uppercase">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Sản Xuất Đại Trà
                  </div>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    {productionLeadDays} <span className="text-xs font-normal text-zinc-400">ngày</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    Dây chuyền dệt kim 24/7
                  </div>
                </div>
              </div>

              {/* Guarantee list */}
              <div className="space-y-2 pt-2 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Miễn phí 100% làm mẫu thử &amp; phối màu Pantone</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Chứng chỉ Oeko-Tex Standard 100 đính kèm từng lô</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cam kết đổi trả 100% nếu sai lệch lực kéo đứt</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleSendToContact}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-150 rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                >
                  <Send className="w-4 h-4 text-zinc-950" />
                  <span>Gửi Yêu Cầu Báo Giá Đơn Hàng Này</span>
                </button>
              </div>

            </div>

            {/* Industrial Direct Hotline Helper */}
            <div className="p-4 bg-white border border-zinc-200 rounded-sm flex items-center justify-between text-left">
              <div>
                <div className="text-xs font-mono font-bold text-zinc-900">Cần Báo Giá Gấp Trong 15 Phút?</div>
                <div className="text-[11px] text-zinc-500">Kỹ sư trưởng nhà máy sẵn sàng tiếp nhận bản vẽ &amp; mẫu vải</div>
              </div>
              <a
                href="tel:+842743782444"
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold rounded-sm shrink-0"
              >
                +84 274 378 2444
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
