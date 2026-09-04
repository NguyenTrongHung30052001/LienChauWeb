import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface WeavePattern {
  id: string;
  name: string;
  category: string;
  spindles: string;
  composition: string;
  dtex: string;
  breakStrengthN: number;
  elongationMax: number;
  recommendedUse: string;
  visualColor: string;
  patternType: 'braid' | 'herringbone' | 'ripstop' | 'tubular' | 'reflective';
}

const WEAVE_PATTERNS_BY_LANG: Record<'vi' | 'en' | 'id', WeavePattern[]> = {
  vi: [
    {
      id: 'diamond-32',
      name: 'Dệt Bện Kim Cương 32 Thoi Siêu Bền',
      category: 'Sneaker Thể Thao Cao Cấp',
      spindles: '32 Thoi dệt xoắn chéo',
      composition: '100% Recycled Polyester DTY 150D/48F',
      dtex: '300D x 2',
      breakStrengthN: 185,
      elongationMax: 18,
      recommendedUse: 'Dòng giày chạy marathon, giày bóng rổ, sneaker hàng hiệu',
      visualColor: '#10b981',
      patternType: 'braid'
    },
    {
      id: 'herringbone-flat',
      name: 'Dệt Xương Cá Phẳng Chống Quăn Mép',
      category: 'Casual & Thời Trang Vintage',
      spindles: '24 Kim dệt thoi mật độ cao',
      composition: '100% Sợi Cotton Chải Kỹ (Combed Cotton)',
      dtex: '400D',
      breakStrengthN: 155,
      elongationMax: 12,
      recommendedUse: 'Sneaker vải canvas, giày da phong cách retro, dây luồn áo hoodie',
      visualColor: '#0284c7',
      patternType: 'herringbone'
    },
    {
      id: 'ripstop-tactical',
      name: 'Dệt Lõi Gia Cường Sợi Chống Cắt & Cháy',
      category: 'Giày Bảo Hộ & Quân Đội',
      spindles: '16 Thoi dệt bọc lõi Kevlar Aramid',
      composition: 'Nylon 6.6 High-Tenacity + Lõi Sợi Aramid',
      dtex: '600D x 3',
      breakStrengthN: 260,
      elongationMax: 8,
      recommendedUse: 'Giày leo núi trekking, ủng công trường, thiết bị bảo hộ lao động',
      visualColor: '#d97706',
      patternType: 'ripstop'
    },
    {
      id: 'tubular-elastic',
      name: 'Dệt Ống Đàn Hồi Co Giãn 4 Chiều',
      category: 'Giày Lười & Áo Khoác Outdoor',
      spindles: '28 Thoi dệt bao quanh lõi cao su',
      composition: 'Polyester bao ngoài + Lõi Cao Su Thiên Nhiên Malaysia',
      dtex: '250D Core-Spun',
      breakStrengthN: 140,
      elongationMax: 140,
      recommendedUse: 'Dây rút gấu áo khoác gió, giày thể thao slip-on không cần buộc dây',
      visualColor: '#8b5cf6',
      patternType: 'tubular'
    },
    {
      id: 'reflective-jacquard',
      name: 'Dệt Phản Quang Dạ Quang 3M Tiêu Chuẩn',
      category: 'Dã Ngoại & An Toàn Ban Đêm',
      spindles: '32 Thoi đan xen chỉ phản xạ quang học',
      composition: 'Recycled Poly + Sợi Vi Hạt Thủy Tinh Phản Quang',
      dtex: '350D Reflective',
      breakStrengthN: 170,
      elongationMax: 15,
      recommendedUse: 'Trang phục chạy bộ ban đêm, giày dạ hội thể thao, balo cứu hộ',
      visualColor: '#ec4899',
      patternType: 'reflective'
    }
  ],
  en: [
    {
      id: 'diamond-32',
      name: '32-Spindle Diamond Interlock Braid',
      category: 'Performance Running & Athleisure',
      spindles: '32 Cross-twisted Spindles',
      composition: '100% Recycled Polyester DTY 150D/48F',
      dtex: '300D x 2',
      breakStrengthN: 185,
      elongationMax: 18,
      recommendedUse: 'Marathon racing shoes, basketball footwear, luxury lifestyle sneakers',
      visualColor: '#10b981',
      patternType: 'braid'
    },
    {
      id: 'herringbone-flat',
      name: 'High-Density Anti-Curling Herringbone',
      category: 'Casual & Retro Classic Sneakers',
      spindles: '24 High-density Needle Shuttle',
      composition: '100% Combed Long-Staple Cotton',
      dtex: '400D',
      breakStrengthN: 155,
      elongationMax: 12,
      recommendedUse: 'Canvas low-tops, vintage dress leather sneakers, hoodie drawstrings',
      visualColor: '#0284c7',
      patternType: 'herringbone'
    },
    {
      id: 'ripstop-tactical',
      name: 'Aramid Reinforced Cut-Resistant Braid',
      category: 'Tactical & Industrial Safety',
      spindles: '16 Spindles with Kevlar Aramid Core',
      composition: 'Nylon 6.6 High-Tenacity + Aramid Core',
      dtex: '600D x 3',
      breakStrengthN: 260,
      elongationMax: 8,
      recommendedUse: 'Mountaineering boots, tactical combat gear, certified safety shoes',
      visualColor: '#d97706',
      patternType: 'ripstop'
    },
    {
      id: 'tubular-elastic',
      name: '4-Way Stretch Tubular Shock Cord',
      category: 'Slip-On Athletic & Outerwear',
      spindles: '28 Spindles Covering Rubber Core',
      composition: 'Braided Poly Sheath + Malaysian Natural Rubber',
      dtex: '250D Core-Spun',
      breakStrengthN: 140,
      elongationMax: 140,
      recommendedUse: 'Windbreaker cinch cords, slip-on bungee lacing, athletic toggles',
      visualColor: '#8b5cf6',
      patternType: 'tubular'
    },
    {
      id: 'reflective-jacquard',
      name: '3M Scotchlite Retroreflective Weave',
      category: 'Night Safety & High-Visibility',
      spindles: '32 Spindles with Prismatic Tracer',
      composition: 'Recycled Poly + 3M Micro-Glass Bead Yarns',
      dtex: '350D Reflective',
      breakStrengthN: 170,
      elongationMax: 15,
      recommendedUse: 'Night running sneakers, tactical rescue gear, reflective outerwear',
      visualColor: '#ec4899',
      patternType: 'reflective'
    }
  ],
  id: [
    {
      id: 'diamond-32',
      name: 'Anyaman Braid Intan 32-Spul Ekstra Kuat',
      category: 'Sepatu Olahraga & Sneaker Premium',
      spindles: '32 Spul Anyam Silang Presisi',
      composition: '100% Recycled Polyester DTY 150D/48F',
      dtex: '300D x 2',
      breakStrengthN: 185,
      elongationMax: 18,
      recommendedUse: 'Sepatu lari maraton, basket, dan sneaker kasual bermerek',
      visualColor: '#10b981',
      patternType: 'braid'
    },
    {
      id: 'herringbone-flat',
      name: 'Anyam Tulang Ikan Pipih Antigulung',
      category: 'Kasual & Sneaker Bergaya Retro',
      spindles: '24 Jarum Tenun Kepadatan Tinggi',
      composition: '100% Serat Katun Disisir Halus',
      dtex: '400D',
      breakStrengthN: 155,
      elongationMax: 12,
      recommendedUse: 'Sneaker kanvas kasual, sepatu kulit vintage, tali jaket hoodie',
      visualColor: '#0284c7',
      patternType: 'herringbone'
    },
    {
      id: 'ripstop-tactical',
      name: 'Anyaman Inti Aramid Antigores & Tahan Panas',
      category: 'Sepatu Keselamatan Kerja & Militer',
      spindles: '16 Spul Melapisi Inti Serat Kevlar',
      composition: 'Nilon 6.6 High-Tenacity + Inti Aramid',
      dtex: '600D x 3',
      breakStrengthN: 260,
      elongationMax: 8,
      recommendedUse: 'Sepatu gunung trekking, bot keselamatan proyek, alat pelindung kerja',
      visualColor: '#d97706',
      patternType: 'ripstop'
    },
    {
      id: 'tubular-elastic',
      name: 'Tali Tabung Elastis Fleksibel 4-Arah',
      category: 'Sepatu Slip-On & Jaket Luar Ruangan',
      spindles: '28 Spul Melapisi Inti Karet Alam',
      composition: 'Poliester Anyam Luar + Karet Alam Malaysia',
      dtex: '250D Core-Spun',
      breakStrengthN: 140,
      elongationMax: 140,
      recommendedUse: 'Tali serut jaket angin, tali lentur sepatu slip-on tanpa ikat',
      visualColor: '#8b5cf6',
      patternType: 'tubular'
    },
    {
      id: 'reflective-jacquard',
      name: 'Anyaman Reflektif Standar 3M Scotchlite',
      category: 'Aktivitas Malam & Keamanan Sorot',
      spindles: '32 Spul Anyam Benang Manik Kaca Reflektif',
      composition: 'Poly Daur Ulang + Serat Manik Kaca 3M',
      dtex: '350D Reflective',
      breakStrengthN: 170,
      elongationMax: 15,
      recommendedUse: 'Sepatu lari malam hari, ransel keselamatan, pakaian reflektif',
      visualColor: '#ec4899',
      patternType: 'reflective'
    }
  ]
};

interface TextileWeaveLabProps {
  onRequestQuoteWithPattern?: (patternName: string) => void;
}

export const TextileWeaveLab: React.FC<TextileWeaveLabProps> = ({ onRequestQuoteWithPattern }) => {
  const { language } = useLanguage();
  const patterns = WEAVE_PATTERNS_BY_LANG[language] || WEAVE_PATTERNS_BY_LANG.vi;

  const [selectedPatternId, setSelectedPatternId] = useState<string>('diamond-32');
  const [appliedTensionN, setAppliedTensionN] = useState<number>(95);
  const [magnification, setMagnification] = useState<'40x' | '100x' | '200x'>('100x');

  const pattern = patterns.find(p => p.id === selectedPatternId) || patterns[0];

  // Calculate simulated elongation based on applied tension
  const tensionRatio = Math.min(appliedTensionN / pattern.breakStrengthN, 1);
  const currentElongation = (tensionRatio * pattern.elongationMax).toFixed(1);
  const safetyFactor = (pattern.breakStrengthN / Math.max(appliedTensionN, 1)).toFixed(2);
  const isOverStressed = appliedTensionN > pattern.breakStrengthN * 0.85;

  const ui = {
    vi: {
      badge: 'Công Nghệ Dệt May Tiêu Chuẩn Quốc Tế',
      title: 'Phòng Lab Cấu Trúc Sợi & Kiểm Định Độ Bền Kéo',
      desc: 'Mô phỏng cấu trúc vân dệt vi mô, mật độ đan chéo và thử nghiệm kéo đứt theo tiêu chuẩn ISO 13934-1 trước khi đưa vào sản xuất hàng loạt.',
      testStd: 'Tiêu chuẩn kiểm nghiệm',
      testStdVal: 'ISO 13934 • OEKO-TEX CLASS 1',
      microScan: 'QUAN SÁT VÂN SỢI KÍNH HIỂN VI',
      zoom: 'Độ Phóng:',
      structure: 'CẤU TRÚC:',
      kcsPass: 'KCS ĐẠT: GRADE 1',
      tensileSim: 'Mô Phỏng Thử Lực Kéo KCS (Tensile Load)',
      elongationNow: 'Độ Dãn Dài Hiện Tại',
      safetyRatio: 'Hệ Số An Toàn',
      fiberState: 'Trạng Thái Sợi',
      stateHighLoad: 'Cảnh Báo Tải Cao',
      stateStable: 'Ổn Định 100%',
      specTitle: 'Bảng Thông Số Kỹ Thuật Chi Tiết',
      compositionLabel: 'Thành phần sợi:',
      dtexLabel: 'Chỉ số sợi (Dtex):',
      spindlesLabel: 'Quy cách máy dệt:',
      breakStrengthLabel: 'Lực kéo đứt tối thiểu:',
      elongationLabel: 'Độ giãn đàn hồi:',
      washFastnessLabel: 'Độ bền màu giặt (AATCC 61):',
      washFastnessVal: 'Cấp 4 - 5 (Tối đa)',
      labTimeLabel: 'Thời gian dệt mẫu Lab:',
      labTimeVal: '24 – 48 giờ',
      cta: 'Yêu Cầu Mẫu Thử Kiểu Dệt Này',
      freeSample: 'Miễn phí 100% mẫu sợi thực tế gửi tận xưởng',
      certOekoDesc: 'Không chứa kim loại nặng, an toàn tiếp xúc da trẻ em',
      certGrsDesc: 'Sợi tái chế rPET đạt chuẩn Global Recycled Standard'
    },
    en: {
      badge: 'International Standard Textile Engineering',
      title: 'Fiber Weave Micro-Lab & Tensile Testing Simulator',
      desc: 'Simulate microscopic yarn weaves, interlacing density, and tensile breaking strength in compliance with ISO 13934-1 before bulk manufacturing.',
      testStd: 'Test Standard',
      testStdVal: 'ISO 13934 • OEKO-TEX CLASS 1',
      microScan: 'MICROSCOPIC FIBER WEAVE SCAN',
      zoom: 'Zoom:',
      structure: 'STRUCTURE:',
      kcsPass: 'QA PASSED: GRADE 1',
      tensileSim: 'Tensile Load & Rupture Simulator (Newton)',
      elongationNow: 'Current Elongation',
      safetyRatio: 'Safety Factor',
      fiberState: 'Yarn Integrity',
      stateHighLoad: 'Warning: Near Peak',
      stateStable: '100% Stable Range',
      specTitle: 'Detailed Technical Specifications',
      compositionLabel: 'Fiber Composition:',
      dtexLabel: 'Yarn Count (Dtex):',
      spindlesLabel: 'Braider Geometry:',
      breakStrengthLabel: 'Minimum Breaking Load:',
      elongationLabel: 'Elongation at Break:',
      washFastnessLabel: 'Wash Color Fastness (AATCC 61):',
      washFastnessVal: 'Grade 4 - 5 (Excellent)',
      labTimeLabel: 'Lab Dip & Weave Turnaround:',
      labTimeVal: '24–48 Hours',
      cta: 'Request Sample For This Weave',
      freeSample: '100% complimentary physical lab samples delivered to your facility',
      certOekoDesc: 'Certified zero heavy metals, skin-safe for infants and kids',
      certGrsDesc: 'Certified post-consumer rPET yarns under Global Recycled Standard'
    },
    id: {
      badge: 'Teknologi Tekstil Standar Internasional',
      title: 'Laboratorium Anyaman Serat & Simulator Uji Tarik',
      desc: 'Simulasikan struktur anyaman mikroskopis, kerapatan silang, dan kekuatan tarik putus sesuai standar ISO 13934-1 sebelum produksi massal.',
      testStd: 'Standar Pengujian',
      testStdVal: 'ISO 13934 • OEKO-TEX CLASS 1',
      microScan: 'PEMINDAIAN SERAT MIKROSKOPIS',
      zoom: 'Perbesaran:',
      structure: 'STRUKTUR:',
      kcsPass: 'KCS LULUS: TINGKAT 1',
      tensileSim: 'Simulasi Beban Uji Tarik KCS (Newton)',
      elongationNow: 'Perpanjangan Saat Ini',
      safetyRatio: 'Faktor Keamanan',
      fiberState: 'Kondisi Serat',
      stateHighLoad: 'Peringatan Beban Tinggi',
      stateStable: '100% Rentang Stabil',
      specTitle: 'Tabel Spesifikasi Teknis Lengkap',
      compositionLabel: 'Komposisi Serat:',
      dtexLabel: 'Ketebalan Serat (Dtex):',
      spindlesLabel: 'Konfigurasi Mesin Anyam:',
      breakStrengthLabel: 'Kekuatan Tarik Putus Min:',
      elongationLabel: 'Elastisitas Regang:',
      washFastnessLabel: 'Ketahanan Cuci (AATCC 61):',
      washFastnessVal: 'Tingkat 4 - 5 (Maksimal)',
      labTimeLabel: 'Waktu Pembuatan Sampel Lab:',
      labTimeVal: '24 – 48 Jam',
      cta: 'Minta Sampel Pola Anyaman Ini',
      freeSample: '100% sampel benang fisik gratis dikirim langsung ke pabrik Anda',
      certOekoDesc: 'Bebas logam berat berbahaya, aman untuk kulit anak dan bayi',
      certGrsDesc: 'Serat rPET daur ulang bersertifikasi Global Recycled Standard'
    }
  }[language] || {
    badge: 'International Standard Textile Engineering',
    title: 'Fiber Weave Micro-Lab & Tensile Testing Simulator',
    desc: 'Simulate microscopic yarn weaves, interlacing density, and tensile breaking strength in compliance with ISO 13934-1 before bulk manufacturing.',
    testStd: 'Test Standard',
    testStdVal: 'ISO 13934 • OEKO-TEX CLASS 1',
    microScan: 'MICROSCOPIC FIBER WEAVE SCAN',
    zoom: 'Zoom:',
    structure: 'STRUCTURE:',
    kcsPass: 'QA PASSED: GRADE 1',
    tensileSim: 'Tensile Load & Rupture Simulator (Newton)',
    elongationNow: 'Current Elongation',
    safetyRatio: 'Safety Factor',
    fiberState: 'Yarn Integrity',
    stateHighLoad: 'Warning: Near Peak',
    stateStable: '100% Stable Range',
    specTitle: 'Detailed Technical Specifications',
    compositionLabel: 'Fiber Composition:',
    dtexLabel: 'Yarn Count (Dtex):',
    spindlesLabel: 'Braider Geometry:',
    breakStrengthLabel: 'Minimum Breaking Load:',
    elongationLabel: 'Elongation at Break:',
    washFastnessLabel: 'Wash Color Fastness (AATCC 61):',
    washFastnessVal: 'Grade 4 - 5 (Excellent)',
    labTimeLabel: 'Lab Dip & Weave Turnaround:',
    labTimeVal: '24–48 Hours',
    cta: 'Request Sample For This Weave',
    freeSample: '100% complimentary physical lab samples delivered to your facility',
    certOekoDesc: 'Certified zero heavy metals, skin-safe for infants and kids',
    certGrsDesc: 'Certified post-consumer rPET yarns under Global Recycled Standard'
  };

  return (
    <section id="textile-lab" className="py-20 lg:py-24 bg-white border-b border-zinc-200 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-sm text-xs font-mono text-emerald-800 font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              {ui.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
              {ui.title}
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {ui.desc}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] font-mono text-zinc-400 block uppercase">{ui.testStd}</span>
              <span className="text-xs font-mono font-bold text-zinc-800">{ui.testStdVal}</span>
            </div>
          </div>
        </div>

        {/* Interactive Weave Pattern Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
          {patterns.map((p) => {
            const isSelected = p.id === selectedPatternId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPatternId(p.id);
                  if (appliedTensionN > p.breakStrengthN) {
                    setAppliedTensionN(Math.round(p.breakStrengthN * 0.6));
                  }
                }}
                className={`p-3 text-left border rounded-sm transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-600/30' 
                    : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.visualColor }} />
                  <span className="text-[10px] font-mono text-zinc-400 font-bold">{p.breakStrengthN}N</span>
                </div>
                <div className="font-bold text-xs text-zinc-900 line-clamp-1">{p.name}</div>
                <div className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">{p.category}</div>
              </button>
            );
          })}
        </div>

        {/* Lab Testing Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Microscope HUD & Tension Testing */}
          <div className="lg:col-span-7 bg-zinc-950 p-6 sm:p-8 rounded-sm border border-zinc-800 text-white space-y-6">
            
            {/* Top Bar with Magnification controls */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  {ui.microScan}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-zinc-800 p-1 rounded-sm text-[11px] font-mono">
                <span className="text-zinc-400 px-2">{ui.zoom}</span>
                {(['40x', '100x', '200x'] as const).map(zoom => (
                  <button
                    key={zoom}
                    onClick={() => setMagnification(zoom)}
                    className={`px-2 py-0.5 rounded-xs transition-colors ${
                      magnification === zoom ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {zoom}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Micro Weave Canvas Display */}
            <div className="relative h-64 sm:h-72 w-full rounded-sm overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center">
              
              {/* Dynamic SVG Weave Texture Pattern based on selection */}
              <div className="absolute inset-0 opacity-90 transition-transform duration-300" style={{
                transform: `scale(${magnification === '40x' ? 1 : magnification === '100x' ? 1.4 : 1.9})`
              }}>
                {pattern.patternType === 'braid' && (
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="braid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="#10b981" strokeWidth="2.5" opacity="0.75" />
                        <path d="M10 20 L20 10 L30 20 L20 30 Z" fill="#047857" opacity="0.3" />
                        <line x1="0" y1="0" x2="40" y2="40" stroke="#34d399" strokeWidth="1" strokeDasharray="2,2" />
                        <line x1="40" y1="0" x2="0" y2="40" stroke="#059669" strokeWidth="1.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#braid-pattern)" />
                  </svg>
                )}

                {pattern.patternType === 'herringbone' && (
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="herringbone-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M0 0 L15 15 L0 30" fill="none" stroke="#38bdf8" strokeWidth="2" />
                        <path d="M15 0 L30 15 L15 30" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                        <line x1="15" y1="0" x2="15" y2="30" stroke="#0369a1" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#herringbone-pattern)" />
                  </svg>
                )}

                {pattern.patternType === 'ripstop' && (
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="ripstop-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="36" height="36" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                        <line x1="0" y1="18" x2="36" y2="18" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3,3" />
                        <line x1="18" y1="0" x2="18" y2="36" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3,3" />
                        <circle cx="18" cy="18" r="4" fill="#fbbf24" opacity="0.7" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#ripstop-pattern)" />
                  </svg>
                )}

                {pattern.patternType === 'tubular' && (
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="tubular-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="#a78bfa" strokeWidth="1.8" />
                        <circle cx="12" cy="12" r="5" fill="#7c3aed" opacity="0.5" />
                        <line x1="0" y1="12" x2="24" y2="12" stroke="#8b5cf6" strokeWidth="1.2" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#tubular-pattern)" />
                  </svg>
                )}

                {pattern.patternType === 'reflective' && (
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="reflective-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M0 0 L40 40 M40 0 L0 40" stroke="#f472b6" strokeWidth="2" />
                        <rect x="12" y="12" width="16" height="16" fill="#ffffff" opacity="0.85" />
                        <line x1="0" y1="20" x2="40" y2="20" stroke="#db2777" strokeWidth="1.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#reflective-pattern)" />
                  </svg>
                )}
              </div>

              {/* Optical HUD Crosshair Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>WARP TENSION: {appliedTensionN}N</span>
                  <span>DTEX: {pattern.dtex}</span>
                </div>

                <div className="self-center flex items-center justify-center">
                  <div className="w-16 h-16 border border-emerald-400/40 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-400">{ui.structure} {pattern.spindles}</span>
                  <span className="text-emerald-400 font-bold uppercase">{ui.kcsPass}</span>
                </div>
              </div>

            </div>

            {/* Tensile Testing Slider Simulator */}
            <div className="space-y-3 bg-zinc-950 p-4 rounded-sm border border-zinc-800">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  {ui.tensileSim}
                </span>
                <span className={`font-bold text-sm ${isOverStressed ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {appliedTensionN} N / {pattern.breakStrengthN} N
                </span>
              </div>

              <input
                type="range"
                min="10"
                max={pattern.breakStrengthN + 20}
                value={appliedTensionN}
                onChange={(e) => setAppliedTensionN(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono text-zinc-400">
                <div className="bg-zinc-900 p-2 rounded-xs border border-zinc-800">
                  <span className="text-zinc-500 block text-[9px] uppercase">{ui.elongationNow}</span>
                  <span className="text-white font-bold">{currentElongation}%</span>
                </div>
                <div className="bg-zinc-900 p-2 rounded-xs border border-zinc-800">
                  <span className="text-zinc-500 block text-[9px] uppercase">{ui.safetyRatio}</span>
                  <span className={`font-bold ${Number(safetyFactor) < 1.2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {safetyFactor}x
                  </span>
                </div>
                <div className="bg-zinc-900 p-2 rounded-xs border border-zinc-800">
                  <span className="text-zinc-500 block text-[9px] uppercase">{ui.fiberState}</span>
                  <span className="text-white font-bold">
                    {isOverStressed ? ui.stateHighLoad : ui.stateStable}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Industrial Specifications & Direct Factory Action */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Spec Card */}
            <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm space-y-5">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                  {ui.specTitle}
                </span>
                <h3 className="text-lg font-bold text-zinc-900 mt-1">
                  {pattern.name}
                </h3>
                <p className="text-xs text-zinc-600 mt-1">
                  {pattern.recommendedUse}
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-zinc-200/80">
                  <span className="text-zinc-500">{ui.compositionLabel}</span>
                  <span className="font-bold text-zinc-900 text-right max-w-[60%]">{pattern.composition}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200/80">
                  <span className="text-zinc-500">{ui.dtexLabel}</span>
                  <span className="font-bold text-zinc-900">{pattern.dtex}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200/80">
                  <span className="text-zinc-500">{ui.spindlesLabel}</span>
                  <span className="font-bold text-zinc-900">{pattern.spindles}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200/80">
                  <span className="text-zinc-500">{ui.breakStrengthLabel}</span>
                  <span className="font-bold text-emerald-700">{pattern.breakStrengthN} N</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200/80">
                  <span className="text-zinc-500">{ui.elongationLabel}</span>
                  <span className="font-bold text-zinc-900">{pattern.elongationMax}%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200/80">
                  <span className="text-zinc-500">{ui.washFastnessLabel}</span>
                  <span className="font-bold text-emerald-700">{ui.washFastnessVal}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-zinc-500">{ui.labTimeLabel}</span>
                  <span className="font-bold text-zinc-900">{ui.labTimeVal}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => onRequestQuoteWithPattern && onRequestQuoteWithPattern(pattern.name)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{ui.cta}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{ui.freeSample}</span>
                </div>
              </div>

            </div>

            {/* Quality Certifications Badge Grid */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3 bg-white border border-zinc-200 rounded-sm">
                <div className="text-[11px] font-mono font-bold text-zinc-900 uppercase">OEKO-TEX® 100</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{ui.certOekoDesc}</div>
              </div>
              <div className="p-3 bg-white border border-zinc-200 rounded-sm">
                <div className="text-[11px] font-mono font-bold text-zinc-900 uppercase">GRS 4.0 VERIFIED</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{ui.certGrsDesc}</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
