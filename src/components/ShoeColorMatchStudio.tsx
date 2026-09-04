import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Info,
  Ruler
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ShoeArchetype {
  id: string;
  name: string;
  category: string;
  recommendedLength: string;
  recommendedWidth: string;
  recommendedAglet: string;
  pantoneRecommendation: string;
  description: string;
  shoeAccentColor: string;
  eyeletCount: number;
}

const SHOE_ARCHETYPES_BY_LANG: Record<'vi' | 'en' | 'id', ShoeArchetype[]> = {
  vi: [
    {
      id: 'retro-court',
      name: 'Retro Court & Low-Top Sneaker',
      category: 'Casual & Lifestyle (Samba / Dunk / Stan Smith)',
      recommendedLength: '120 cm (47 inch)',
      recommendedWidth: 'Bản Dẹt 7mm - 8mm',
      recommendedAglet: 'Kim loại Gunmetal dập chìm logo',
      pantoneRecommendation: 'PANTONE 19-4007 TCX (Anthracite)',
      description: 'Dây bản dẹt dệt kim mật độ cao chống quăn mép, mềm mại khi buộc nơ cổ điển.',
      shoeAccentColor: '#27272a',
      eyeletCount: 6
    },
    {
      id: 'high-top-street',
      name: 'High-Top Basketball & Skateboard',
      category: 'Streetwear (AJ1 / Chuck 70 / Forum High)',
      recommendedLength: '160 cm - 180 cm (63 - 72 inch)',
      recommendedWidth: 'Bản Dẹt 8.5mm Dày 1.6mm',
      recommendedAglet: 'Đầu kim loại khắc Laser 2 đầu',
      pantoneRecommendation: 'PANTONE 18-1662 TCX (Flame Scarlet)',
      description: 'Chiều dài tối ưu luồn qua 8-9 lỗ xỏ, dệt sợi RPET chịu lực kéo siết mạnh mẽ.',
      shoeAccentColor: '#dc2626',
      eyeletCount: 8
    },
    {
      id: 'performance-runner',
      name: 'Marathon & Speed Runner',
      category: 'Running & Marathon (Alphafly / Adizero)',
      recommendedLength: '115 cm - 125 cm (Kèm gân chống tuột nơ)',
      recommendedWidth: 'Dây Răng Cưa Khóa Nơ (Notched) 6mm',
      recommendedAglet: 'Màng nhiệt siêu nhẹ tàng hình 0.1mm',
      pantoneRecommendation: 'PANTONE 13-0630 TCX (Safety Yellow)',
      description: 'Cấu trúc dệt rãnh gai chống tuột nơ trong suốt 42km chạy cường độ cao.',
      shoeAccentColor: '#059669',
      eyeletCount: 6
    },
    {
      id: 'tactical-trail',
      name: 'Trail Hiking & Outdoor Boot',
      category: 'Outdoor & Trekking (Salomon / Timberland)',
      recommendedLength: '140 cm - 150 cm',
      recommendedWidth: 'Dây Tròn Lõi Cáp Siêu Chịu Lực 4.5mm',
      recommendedAglet: 'Đồng đúc dập răng cưa chịu va đập đá sỏi',
      pantoneRecommendation: 'PANTONE 19-0822 TCX (Burnt Olive)',
      description: 'Bện 32 thoi bọc lõi chịu ma sát cực đại với khoen móc kim loại địa hình gồ ghề.',
      shoeAccentColor: '#92400e',
      eyeletCount: 7
    }
  ],
  en: [
    {
      id: 'retro-court',
      name: 'Retro Court & Low-Top Sneaker',
      category: 'Casual & Lifestyle (Samba / Dunk / Stan Smith)',
      recommendedLength: '120 cm (47 in)',
      recommendedWidth: 'Flat 7mm - 8mm',
      recommendedAglet: 'Debossed Gunmetal Alloy Cap',
      pantoneRecommendation: 'PANTONE 19-4007 TCX (Anthracite)',
      description: 'High-density flat knit preventing curling, engineered for iconic retro silhouette knots.',
      shoeAccentColor: '#27272a',
      eyeletCount: 6
    },
    {
      id: 'high-top-street',
      name: 'High-Top Basketball & Skateboard',
      category: 'Streetwear (AJ1 / Chuck 70 / Forum High)',
      recommendedLength: '160 cm - 180 cm (63 - 72 in)',
      recommendedWidth: 'Flat 8.5mm (1.6mm Thickness)',
      recommendedAglet: 'Laser-Etched Metal Aglet',
      pantoneRecommendation: 'PANTONE 18-1662 TCX (Flame Scarlet)',
      description: 'Engineered length for 8–9 eyelet patterns, braided with high-modulus RPET fiber.',
      shoeAccentColor: '#dc2626',
      eyeletCount: 8
    },
    {
      id: 'performance-runner',
      name: 'Marathon & Speed Runner',
      category: 'Running & Marathon (Alphafly / Adizero)',
      recommendedLength: '115 cm - 125 cm (Anti-Slip Ribbed)',
      recommendedWidth: 'Notched Ribbed Cord 6mm',
      recommendedAglet: 'Ultra-light 0.1mm Clear Heat-Shrink',
      pantoneRecommendation: 'PANTONE 13-0630 TCX (Safety Yellow)',
      description: 'Notched weave locking the bow securely throughout full 42km race marathons.',
      shoeAccentColor: '#059669',
      eyeletCount: 6
    },
    {
      id: 'tactical-trail',
      name: 'Trail Hiking & Outdoor Boot',
      category: 'Outdoor & Trekking (Salomon / Timberland)',
      recommendedLength: '140 cm - 150 cm',
      recommendedWidth: 'Reinforced Round Cable Core 4.5mm',
      recommendedAglet: 'Impact-resistant Serrated Brass Aglet',
      pantoneRecommendation: 'PANTONE 19-0822 TCX (Burnt Olive)',
      description: '32-carrier core braid built for aggressive terrain friction against metal D-rings.',
      shoeAccentColor: '#92400e',
      eyeletCount: 7
    }
  ],
  id: [
    {
      id: 'retro-court',
      name: 'Retro Court & Low-Top Sneaker',
      category: 'Kasual & Gaya Hidup (Samba / Dunk / Stan Smith)',
      recommendedLength: '120 cm (47 inci)',
      recommendedWidth: 'Pipih 7mm - 8mm',
      recommendedAglet: 'Logam Gunmetal Cap Emboss Logo',
      pantoneRecommendation: 'PANTONE 19-4007 TCX (Anthracite)',
      description: 'Tali pipih rajut kepadatan tinggi antibengkok, lembut dan rapi untuk simpul retro.',
      shoeAccentColor: '#27272a',
      eyeletCount: 6
    },
    {
      id: 'high-top-street',
      name: 'High-Top Basketball & Skateboard',
      category: 'Streetwear (AJ1 / Chuck 70 / Forum High)',
      recommendedLength: '160 cm - 180 cm (63 - 72 inci)',
      recommendedWidth: 'Pipih 8.5mm Tebal 1.6mm',
      recommendedAglet: 'Ujung Logam Ukir Laser Ganda',
      pantoneRecommendation: 'PANTONE 18-1662 TCX (Flame Scarlet)',
      description: 'Panjang optimal untuk 8-9 lubang tali, serat RPET kokoh menahan tarikan kuat.',
      shoeAccentColor: '#dc2626',
      eyeletCount: 8
    },
    {
      id: 'performance-runner',
      name: 'Marathon & Speed Runner',
      category: 'Lari & Maraton (Alphafly / Adizero)',
      recommendedLength: '115 cm - 125 cm (Gerigi Antilepas)',
      recommendedWidth: 'Anyaman Bergerigi Pengunci 6mm',
      recommendedAglet: 'Pelindung Panas Ringan Transparan 0.1mm',
      pantoneRecommendation: 'PANTONE 13-0630 TCX (Safety Yellow)',
      description: 'Struktur berusuk mengunci simpul tali agar tidak terlepas sepanjang lari 42km.',
      shoeAccentColor: '#059669',
      eyeletCount: 6
    },
    {
      id: 'tactical-trail',
      name: 'Trail Hiking & Outdoor Boot',
      category: 'Outdoor & Trekking (Salomon / Timberland)',
      recommendedLength: '140 cm - 150 cm',
      recommendedWidth: 'Bulat Inti Kabel Kuat 4.5mm',
      recommendedAglet: 'Kuningan Cor Bergerigi Tahan Benturan',
      pantoneRecommendation: 'PANTONE 19-0822 TCX (Burnt Olive)',
      description: 'Kepangan 32-spul berinti tahan gesekan ekstrem pada cincin logam medan berbatu.',
      shoeAccentColor: '#92400e',
      eyeletCount: 7
    }
  ]
};

const LACE_PALETTES_BY_LANG: Record<'vi' | 'en' | 'id', { name: string; hex: string; pantone: string }[]> = {
  vi: [
    { name: 'Xanh Emerald Eco', hex: '#059669', pantone: '17-5641 TCX Emerald' },
    { name: 'Trắng Sữa Sneaker', hex: '#f4f4f5', pantone: '11-0601 TCX Bright White' },
    { name: 'Đen Carbon Matte', hex: '#18181b', pantone: '19-4004 TCX Caviar' },
    { name: 'Đỏ Năng Động', hex: '#dc2626', pantone: '18-1662 TCX Racing Red' },
    { name: 'Xanh Cobalt Sport', hex: '#2563eb', pantone: '19-4052 TCX Classic Blue' },
    { name: 'Vàng Amber', hex: '#f59e0b', pantone: '14-0852 TCX Freesia' },
    { name: 'Cam Cảnh Báo', hex: '#ea580c', pantone: '16-1454 TCX Kumquat' },
    { name: 'Hồng Cyber Y2K', hex: '#ec4899', pantone: '17-1928 TCX Fuchsia' },
  ],
  en: [
    { name: 'Emerald Eco Green', hex: '#059669', pantone: '17-5641 TCX Emerald' },
    { name: 'Sneaker Bright White', hex: '#f4f4f5', pantone: '11-0601 TCX Bright White' },
    { name: 'Carbon Matte Black', hex: '#18181b', pantone: '19-4004 TCX Caviar' },
    { name: 'Dynamic Racing Red', hex: '#dc2626', pantone: '18-1662 TCX Racing Red' },
    { name: 'Cobalt Sport Blue', hex: '#2563eb', pantone: '19-4052 TCX Classic Blue' },
    { name: 'Amber Glow Yellow', hex: '#f59e0b', pantone: '14-0852 TCX Freesia' },
    { name: 'High-Vis Safety Orange', hex: '#ea580c', pantone: '16-1454 TCX Kumquat' },
    { name: 'Cyber Y2K Fuchsia', hex: '#ec4899', pantone: '17-1928 TCX Fuchsia' },
  ],
  id: [
    { name: 'Hijau Eco Emerald', hex: '#059669', pantone: '17-5641 TCX Emerald' },
    { name: 'Putih Terang Sneaker', hex: '#f4f4f5', pantone: '11-0601 TCX Bright White' },
    { name: 'Hitam Matte Karbon', hex: '#18181b', pantone: '19-4004 TCX Caviar' },
    { name: 'Merah Balap Dinamis', hex: '#dc2626', pantone: '18-1662 TCX Racing Red' },
    { name: 'Biru Kobalt Sport', hex: '#2563eb', pantone: '19-4052 TCX Classic Blue' },
    { name: 'Kuning Amber Freesia', hex: '#f59e0b', pantone: '14-0852 TCX Freesia' },
    { name: 'Oranye Peringatan', hex: '#ea580c', pantone: '16-1454 TCX Kumquat' },
    { name: 'Cyber Y2K Fuchsia', hex: '#ec4899', pantone: '17-1928 TCX Fuchsia' },
  ]
};

interface ShoeColorMatchStudioProps {
  onSelectFormulaForQuote?: (specSummary: string) => void;
}

export const ShoeColorMatchStudio: React.FC<ShoeColorMatchStudioProps> = ({ onSelectFormulaForQuote }) => {
  const { language } = useLanguage();
  const archetypes = SHOE_ARCHETYPES_BY_LANG[language] || SHOE_ARCHETYPES_BY_LANG.vi;
  const palettes = LACE_PALETTES_BY_LANG[language] || LACE_PALETTES_BY_LANG.vi;

  const [selectedShoeId, setSelectedShoeId] = useState<string>('retro-court');
  const [selectedLaceColor, setSelectedLaceColor] = useState<string>('#059669');
  const [shoeBaseTone, setShoeBaseTone] = useState<'white' | 'dark' | 'cream'>('white');

  const shoe = archetypes.find(s => s.id === selectedShoeId) || archetypes[0];
  const activeColorObj = palettes.find(c => c.hex === selectedLaceColor) || palettes[0];

  const handleSendToQuote = () => {
    const summary = language === 'en'
      ? `Color Matching: ${shoe.name} | Cord Color: ${activeColorObj.name} (${activeColorObj.pantone}) | Spec: ${shoe.recommendedLength} x ${shoe.recommendedWidth} | Tip: ${shoe.recommendedAglet}`
      : language === 'id'
      ? `Pencocokan Warna: ${shoe.name} | Warna Tali: ${activeColorObj.name} (${activeColorObj.pantone}) | Spesifikasi: ${shoe.recommendedLength} x ${shoe.recommendedWidth} | Ujung: ${shoe.recommendedAglet}`
      : `Phối màu giày ${shoe.name} | Màu dây: ${activeColorObj.name} (${activeColorObj.pantone}) | Quy cách: ${shoe.recommendedLength} x ${shoe.recommendedWidth} | Đầu bọc: ${shoe.recommendedAglet}`;
    if (onSelectFormulaForQuote) {
      onSelectFormulaForQuote(summary);
    }
  };

  const uiText = {
    vi: {
      badge: 'Trạm Phối Màu Pantone & Mô Phỏng Dáng Giày',
      title: 'Trực Quan Hóa Phụ Liệu Lên Form Giày Thực Tế',
      desc: 'Thử nghiệm màu sắc dây dệt, bản rộng và phương thức bấm đầu aglet trực tiếp trên các phom dáng sneaker thịnh hành nhất thị trường trước khi duyệt mẫu lab.',
      deltaE: 'Độ lệch màu tiêu chuẩn',
      deltaEVal: 'Delta E (ΔE) < 0.5 (Mắt thường không phân biệt)',
      liveSim: 'MÔ PHỎNG XỎ DÂY TRỰC TIẾP',
      upperLabel: 'Thân Giày:',
      tones: { white: 'Trắng', dark: 'Đen', cream: 'Be Kem' },
      selectedColor: 'Màu Đang Chọn:',
      paletteHeader: 'Bảng Màu Nhuộm Chuẩn Quốc Tế (Pantone Formula)',
      specBadge: 'Quy Cách Đề Xuất Cho Dòng Giày',
      lengthLabel: 'Chiều dài khuyến nghị:',
      widthLabel: 'Bản rộng / Đường kính:',
      agletLabel: 'Phương pháp bấm đầu:',
      pantoneLabel: 'Mã màu Pantone chỉ định:',
      fastnessLabel: 'Độ bền màu khi ma sát:',
      fastnessVal: 'Cấp 4.5/5 (AATCC 8)',
      sampleTimeLabel: 'Thời gian nhuộm test màu:',
      sampleTimeVal: '24 Giờ giao mẫu',
      cta: 'Yêu Cầu Mẫu Phối Màu Này',
      guarantee: 'Cam kết chuẩn màu Pantone 100% trong phòng Lab D65',
      rdNoticeTitle: 'Lưu Ý Dành Cho Bộ Phận R&D Giày:',
      rdNoticeDesc: 'Đối với giày chạy marathon, nhà máy Liên Châu áp dụng công nghệ dệt sọc xương cá gồ ghề (anti-slip notched weave), tăng hệ số ma sát giữa 2 tai thắt nơ lên 40%, hạn chế tối đa nguy cơ tuột dây khi vận động mạnh.'
    },
    en: {
      badge: 'Pantone Colorway & Shoe Silhouette Studio',
      title: 'Visualize Trims Directly On Real Footwear Silhouettes',
      desc: 'Test cord weave hues, dimensions, and aglet finishes live across trending sneaker archetypes before approving sample lab dips.',
      deltaE: 'Standard Color Tolerance',
      deltaEVal: 'Delta E (ΔE) < 0.5 (Imperceptible to human eye)',
      liveSim: 'LIVE SILHOUETTE FIT SIMULATION',
      upperLabel: 'Shoe Upper:',
      tones: { white: 'White', dark: 'Black', cream: 'Off-White' },
      selectedColor: 'Selected Colorway:',
      paletteHeader: 'International Standard Dye Palette (Pantone Formula)',
      specBadge: 'Engineered Shoe Category Specs',
      lengthLabel: 'Recommended Length:',
      widthLabel: 'Width / Diameter:',
      agletLabel: 'Aglet Tipping Finish:',
      pantoneLabel: 'Specified Pantone Code:',
      fastnessLabel: 'Crocking Color Fastness:',
      fastnessVal: 'Grade 4.5/5 (AATCC 8)',
      sampleTimeLabel: 'Lab Dip Dispatch Time:',
      sampleTimeVal: '24–48 Hours',
      cta: 'Request This Colorway Sample',
      guarantee: 'Guaranteed 100% Pantone accuracy verified under D65 standard lighting',
      rdNoticeTitle: 'Footwear R&D Engineering Tip:',
      rdNoticeDesc: 'For high-impact performance shoes, Lien Chau deploys anti-slip notched herringbone weaves, increasing knot friction by over 40% to eliminate unintended lace untying during runs.'
    },
    id: {
      badge: 'Studio Warna Pantone & Siluet Sepatu',
      title: 'Visualisasi Tali Langsung Pada Siluet Sepatu Nyata',
      desc: 'Uji paduan warna tali, dimensi lebar, dan ujung aglet secara langsung pada berbagai model sepatu populer sebelum menyetujui sampel lab.',
      deltaE: 'Toleransi Warna Standar',
      deltaEVal: 'Delta E (ΔE) < 0.5 (Tidak kasat mata)',
      liveSim: 'SIMULASI PASANG TALI LANGSUNG',
      upperLabel: 'Bahan Sepatu:',
      tones: { white: 'Putih', dark: 'Hitam', cream: 'Krem' },
      selectedColor: 'Warna Terpilih:',
      paletteHeader: 'Palet Standar Pewarnaan Internasional (Formula Pantone)',
      specBadge: 'Spesifikasi Rekomendasi Kategori Sepatu',
      lengthLabel: 'Rekomendasi Panjang:',
      widthLabel: 'Lebar / Diameter:',
      agletLabel: 'Finishing Ujung Aglet:',
      pantoneLabel: 'Kode Warna Pantone:',
      fastnessLabel: 'Ketahanan Warna Gesek:',
      fastnessVal: 'Tingkat 4.5/5 (AATCC 8)',
      sampleTimeLabel: 'Waktu Kirim Sampel Lab:',
      sampleTimeVal: '24–48 Jam',
      cta: 'Minta Sampel Warna Ini',
      guarantee: 'Jaminan akurasi warna Pantone 100% diuji dengan pencahayaan standar D65',
      rdNoticeTitle: 'Catatan Untuk Tim R&D Sepatu:',
      rdNoticeDesc: 'Untuk sepatu maraton performa tinggi, Lien Chau menggunakan teknologi rajut gerigi antilepas, meningkatkan gesekan simpul sebesar 40% agar tali tidak terlepas saat bergerak aktif.'
    }
  }[language] || {
    badge: 'Pantone Colorway & Shoe Silhouette Studio',
    title: 'Visualize Trims Directly On Real Footwear Silhouettes',
    desc: 'Test cord weave hues, dimensions, and aglet finishes live across trending sneaker archetypes before approving sample lab dips.',
    deltaE: 'Standard Color Tolerance',
    deltaEVal: 'Delta E (ΔE) < 0.5 (Imperceptible to human eye)',
    liveSim: 'LIVE SILHOUETTE FIT SIMULATION',
    upperLabel: 'Shoe Upper:',
    tones: { white: 'White', dark: 'Black', cream: 'Off-White' },
    selectedColor: 'Selected Colorway:',
    paletteHeader: 'International Standard Dye Palette (Pantone Formula)',
    specBadge: 'Engineered Shoe Category Specs',
    lengthLabel: 'Recommended Length:',
    widthLabel: 'Width / Diameter:',
    agletLabel: 'Aglet Tipping Finish:',
    pantoneLabel: 'Specified Pantone Code:',
    fastnessLabel: 'Crocking Color Fastness:',
    fastnessVal: 'Grade 4.5/5 (AATCC 8)',
    sampleTimeLabel: 'Lab Dip Dispatch Time:',
    sampleTimeVal: '24–48 Hours',
    cta: 'Request This Colorway Sample',
    guarantee: 'Guaranteed 100% Pantone accuracy verified under D65 standard lighting',
    rdNoticeTitle: 'Footwear R&D Engineering Tip:',
    rdNoticeDesc: 'For high-impact performance shoes, Lien Chau deploys anti-slip notched herringbone weaves, increasing knot friction by over 40% to eliminate unintended lace untying during runs.'
  };

  return (
    <section id="shoe-match-studio" className="py-20 lg:py-24 bg-white border-b border-zinc-200 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-sm text-xs font-mono text-emerald-800 font-bold uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5 text-emerald-600" />
              {uiText.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
              {uiText.title}
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {uiText.desc}
            </p>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">{uiText.deltaE}</span>
            <span className="text-xs font-mono font-bold text-emerald-700">{uiText.deltaEVal}</span>
          </div>
        </div>

        {/* Shoe Silhouette Selector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {archetypes.map((item) => {
            const isSelected = item.id === selectedShoeId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedShoeId(item.id)}
                className={`p-3.5 text-left border rounded-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-600/30'
                    : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isSelected ? 'text-emerald-700' : 'text-zinc-500'
                  }`}>
                    {item.recommendedWidth}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{item.recommendedLength.split(' ')[0]}</span>
                </div>
                <div className="font-bold text-sm text-zinc-900 line-clamp-1">
                  {item.name}
                </div>
                <div className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                  {item.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* Studio Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Vector Shoe Visualizer with Dynamic Laces */}
          <div className="lg:col-span-7 bg-zinc-950 p-6 sm:p-8 rounded-sm border border-zinc-800 text-white space-y-6">
            
            {/* Top Bar on Stage */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-emerald-400 font-bold uppercase">{uiText.liveSim}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-zinc-500 text-[11px] mr-1">{uiText.upperLabel}</span>
                {(['white', 'dark', 'cream'] as const).map(tone => (
                  <button
                    key={tone}
                    onClick={() => setShoeBaseTone(tone)}
                    className={`px-2 py-0.5 rounded-xs text-[10px] font-mono transition-colors ${
                      shoeBaseTone === tone ? 'bg-zinc-700 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {uiText.tones[tone]}
                  </button>
                ))}
              </div>
            </div>

            {/* Graphic Silhouette & Dynamic Lace Canvas Display */}
            <div className="relative h-64 sm:h-72 w-full rounded-sm bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 flex items-center justify-center p-4 overflow-hidden">
              
              {/* Decorative factory grid background */}
              <div className="absolute inset-0 bg-textile-grid opacity-5 pointer-events-none" />

              {/* Clean Geometric Vector Shoe Profile */}
              <svg viewBox="0 0 500 280" className="w-full h-full max-h-60 drop-shadow-2xl">
                <defs>
                  {/* Subtle Sole Shadow */}
                  <filter id="shoe-shadow" x="-5%" y="-5%" width="110%" height="120%">
                    <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Ground Shadow */}
                <ellipse cx="250" cy="245" rx="190" ry="12" fill="#000000" opacity="0.4" filter="blur(4px)" />

                {/* 1. Outsole (Rubber Bottom) */}
                <path
                  d="M 90 220 C 130 232, 380 234, 420 205 C 410 225, 360 232, 250 232 C 160 232, 100 228, 90 220 Z"
                  fill="#71717a"
                />

                {/* 2. Midsole (Cushioning EVA / Rubber) */}
                <path
                  d="M 85 210 C 120 225, 385 225, 425 195 L 420 215 C 380 235, 120 235, 80 218 Z"
                  fill={shoeBaseTone === 'dark' ? '#27272a' : '#f4f4f5'}
                  stroke="#52525b"
                  strokeWidth="1"
                />

                {/* Midsole Texture Accent Groove */}
                <path
                  d="M 110 218 Q 250 226 395 208"
                  stroke="#3f3f46"
                  strokeWidth="1.5"
                  fill="none"
                />

                {/* 3. Upper Body Main Silhouette */}
                <path
                  d="M 85 210 
                     C 70 170, 100 130, 130 115 
                     C 155 100, 175 120, 205 135 
                     C 230 148, 270 140, 310 155 
                     C 350 170, 395 180, 425 195 
                     C 385 225, 120 225, 85 210 Z"
                  fill={shoeBaseTone === 'white' ? '#fafafa' : shoeBaseTone === 'cream' ? '#f5f5f0' : '#18181b'}
                  stroke="#3f3f46"
                  strokeWidth="2"
                  filter="url(#shoe-shadow)"
                />

                {/* 4. Collar / Heel Lining */}
                <path
                  d="M 125 117 C 135 110, 160 110, 170 120 L 160 135 C 150 130, 135 128, 125 117 Z"
                  fill="#3f3f46"
                />

                {/* 5. Heel Counter Accent Badge */}
                <path
                  d="M 85 210 C 72 175, 90 140, 115 130 C 108 160, 105 190, 120 214 Z"
                  fill={shoe.shoeAccentColor}
                  opacity="0.8"
                />

                {/* 6. Iconic Lateral Stripe / Wave Overlay */}
                <path
                  d="M 150 175 Q 230 160 360 190 L 340 198 Q 230 172 140 185 Z"
                  fill={shoe.shoeAccentColor}
                  opacity="0.85"
                />

                {/* 7. Toe Cap Mudguard Overlay */}
                <path
                  d="M 330 185 C 365 180, 400 188, 425 195 C 400 208, 360 205, 335 200 Z"
                  fill={shoeBaseTone === 'dark' ? '#27272a' : '#e4e4e7'}
                  opacity="0.6"
                />

                {/* 8. Eyelet Facing / Lace Stay Line */}
                <path
                  d="M 215 142 L 310 168"
                  stroke="#71717a"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.5"
                />

                {/* Eyelets (Metallic Grommets) */}
                {[
                  { x: 220, y: 144 },
                  { x: 242, y: 150 },
                  { x: 264, y: 156 },
                  { x: 286, y: 162 },
                  { x: 308, y: 168 }
                ].map((eyelet, i) => (
                  <circle
                    key={i}
                    cx={eyelet.x}
                    cy={eyelet.y}
                    r="3.5"
                    fill="#18181b"
                    stroke="#a1a1aa"
                    strokeWidth="1.5"
                  />
                ))}

                {/* 9. DYNAMIC SHOELACE PATHS (Driven by Selected Palette Color) */}
                {/* Lace Criss-Cross Pattern Across Eyelets */}
                <path
                  d="M 220 144 Q 235 138 242 150"
                  stroke={selectedLaceColor}
                  strokeWidth={selectedShoeId === 'retro-court' || selectedShoeId === 'high-top-street' ? '5.5' : '4'}
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 242 150 Q 255 145 264 156"
                  stroke={selectedLaceColor}
                  strokeWidth={selectedShoeId === 'retro-court' || selectedShoeId === 'high-top-street' ? '5.5' : '4'}
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 264 156 Q 275 152 286 162"
                  stroke={selectedLaceColor}
                  strokeWidth={selectedShoeId === 'retro-court' || selectedShoeId === 'high-top-street' ? '5.5' : '4'}
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 286 162 Q 298 158 308 168"
                  stroke={selectedLaceColor}
                  strokeWidth={selectedShoeId === 'retro-court' || selectedShoeId === 'high-top-street' ? '5.5' : '4'}
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Center Bow Knot */}
                <ellipse
                  cx="275"
                  cy="138"
                  rx="6"
                  ry="5"
                  fill={selectedLaceColor}
                  stroke="#18181b"
                  strokeWidth="1"
                />

                {/* Left Knot Loop */}
                <path
                  d="M 272 136 C 255 120, 240 125, 252 138 C 260 142, 270 140, 273 138"
                  stroke={selectedLaceColor}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Right Knot Loop */}
                <path
                  d="M 278 136 C 295 118, 310 124, 298 138 C 290 142, 280 140, 277 138"
                  stroke={selectedLaceColor}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Lace Hanging Tails with Aglet Finish */}
                <path
                  d="M 270 142 L 255 160"
                  stroke={selectedLaceColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Metal Aglet Cap on Left Tail */}
                <line x1="256" y1="155" x2="252" y2="167" stroke="#e4e4e7" strokeWidth="5.5" strokeLinecap="round" />
                
                <path
                  d="M 292 122 L 315 155"
                  stroke={selectedLaceColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Metal Aglet Cap on Right Tail */}
                <line x1="312" y1="150" x2="318" y2="162" stroke="#e4e4e7" strokeWidth="5.5" strokeLinecap="round" />
              </svg>

              {/* Floating Spec Capsule */}
              <div className="absolute bottom-3 left-3 bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-xs border border-zinc-800 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedLaceColor }} />
                <span>{uiText.selectedColor} <strong>{activeColorObj.name}</strong></span>
              </div>
            </div>

            {/* Color Palette Selector Matrix */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                <span className="font-bold text-zinc-300 uppercase">
                  {uiText.paletteHeader}
                </span>
                <span className="text-emerald-400">{activeColorObj.pantone}</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {palettes.map((color) => {
                  const isSelected = color.hex === selectedLaceColor;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedLaceColor(color.hex)}
                      className={`h-11 rounded-xs border transition-all cursor-pointer flex flex-col items-center justify-center p-1 relative ${
                        isSelected
                          ? 'border-emerald-400 ring-2 ring-emerald-500 scale-105'
                          : 'border-zinc-800 hover:border-zinc-600'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name} - ${color.pantone}`}
                    >
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-black/70 flex items-center justify-center text-white">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Technical Specifications & Factory Quote Hand-off */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm space-y-5">
              <div className="border-b border-zinc-200 pb-4">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs mb-1.5 border border-emerald-200">
                  <Ruler className="w-3.5 h-3.5" />
                  {uiText.specBadge}
                </div>
                <h3 className="text-xl font-bold text-zinc-900">
                  {shoe.name}
                </h3>
                <p className="text-xs text-zinc-600 mt-1">
                  {shoe.description}
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-500">{uiText.lengthLabel}</span>
                  <span className="font-bold text-zinc-900">{shoe.recommendedLength}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-500">{uiText.widthLabel}</span>
                  <span className="font-bold text-zinc-900">{shoe.recommendedWidth}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-500">{uiText.agletLabel}</span>
                  <span className="font-bold text-zinc-900 text-right max-w-[55%]">{shoe.recommendedAglet}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-500">{uiText.pantoneLabel}</span>
                  <span className="font-bold text-emerald-700">{activeColorObj.pantone}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-500">{uiText.fastnessLabel}</span>
                  <span className="font-bold text-zinc-900">{uiText.fastnessVal}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-zinc-500">{uiText.sampleTimeLabel}</span>
                  <span className="font-bold text-emerald-700">{uiText.sampleTimeVal}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSendToQuote}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{uiText.cta}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{uiText.guarantee}</span>
              </div>
            </div>

            {/* Quick Sourcing Advice */}
            <div className="p-4 bg-white border border-zinc-200 rounded-sm text-xs font-mono space-y-2">
              <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600" />
                {uiText.rdNoticeTitle}
              </div>
              <p className="text-zinc-600 leading-relaxed">
                {uiText.rdNoticeDesc}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
