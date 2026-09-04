import React, { useState } from 'react';
import { Check, ArrowRight, Eye, Award, Box } from 'lucide-react';
import { Interactive3DCordViewer } from './Interactive3DCordViewer';
import { useLanguage } from '../i18n/LanguageContext';

interface SpecimenOption {
  id: string;
  tabLabel: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  tensile: string;
  width: string;
  elongation: string;
  colorFastness: string;
  image: string;
  macroImage: string;
  colors: { name: string; hex: string }[];
  aglets: { name: string; type: string; color: string }[];
}

const SPECIMENS_BY_LANG: Record<'vi' | 'en' | 'id', SpecimenOption[]> = {
  vi: [
    {
      id: 'jacquard-rpet',
      tabLabel: 'Jacquard RPET',
      name: 'Dây Dệt Jacquard ECO-RPET',
      category: 'Sneaker & Athleisure',
      badge: 'Chất Liệu Xanh GRS',
      description: 'Dệt hoa văn chìm nổi vi tính từ sợi tái sinh RPET, mật độ đan khít, chống tưa mép và giữ form nơ hoàn hảo.',
      tensile: '> 165 N (Kiểm định Instron)',
      width: 'Bản dẹt 8mm - 10mm - 12mm',
      elongation: 'Dưới 3.5% khi kéo tải nặng',
      colorFastness: 'Cấp độ 4.5/5 (Tiêu chuẩn ISO 105)',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Xanh Emerald Eco', hex: '#059669' },
        { name: 'Trắng Sữa Sneaker', hex: '#f4f4f5' },
        { name: 'Đen Carbon Matte', hex: '#18181b' },
        { name: 'Xanh Cobalt Sport', hex: '#2563eb' },
        { name: 'Đỏ Ruby Runner', hex: '#dc2626' },
        { name: 'Vàng Amber', hex: '#d97706' },
      ],
      aglets: [
        { name: 'Gunmetal Mờ', type: 'Kim Loại PVD', color: '#3f3f46' },
        { name: 'Bạc Chrome Laser', type: 'Khắc Logo', color: '#e4e4e7' },
        { name: 'Vàng 18K Sang Trọng', type: 'Mạ Điện Phân', color: '#eab308' },
        { name: 'Màng Sinh Học PLA', type: 'Tự Phân Hủy', color: '#10b981' },
      ]
    },
    {
      id: 'reflective-3m',
      tabLabel: '3M Phản Quang',
      name: 'Dây Phản Quang 3M Scotchlite',
      category: 'Safety & Running Gear',
      badge: 'Phản Quang Cường Độ Cao',
      description: 'Dệt đan xen dải hạt thủy tinh micro-prismatic 3M bắt sáng rực rỡ khi gặp đèn pha, tối ưu an toàn thể thao đêm.',
      tensile: '> 150 N (Chịu lực cao)',
      width: 'Bản tròn 4.5mm hoặc dẹt 8mm',
      elongation: 'Dưới 4.0%',
      colorFastness: 'Cấp 4-5/5 kháng thời tiết',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Bạc Titanium Phản Quang', hex: '#94a3b8' },
        { name: 'Đen Stealth Dạ Quang', hex: '#18181b' },
        { name: 'Xanh Neon Dạ Quang', hex: '#22c55e' },
        { name: 'Cam Cảnh Báo An Toàn', hex: '#ea580c' },
      ],
      aglets: [
        { name: 'Bạc Khắc Laser', type: 'Kim Loại 3M', color: '#e4e4e7' },
        { name: 'Silicon Trong Suốt', type: 'Nhiệt Dẻo', color: '#cbd5e1' },
        { name: 'Gunmetal Đen Mờ', type: 'Kim Loại PVD', color: '#27272a' },
      ]
    },
    {
      id: 'waxed-leather',
      tabLabel: 'Dây Sáp Waxed',
      name: 'Dây Sáp Waxed Chống Nước',
      category: 'Dress Shoes & Boots',
      badge: 'Chống Thấm Sáp Ong',
      description: 'Sợi 100% Cotton chải kỹ phủ sáp ong tự nhiên tạo độ bóng mượt cổ điển, kháng nước tuyệt đối cho giày Tây cao cấp.',
      tensile: '> 135 N (Cứng cáp, định hình nơ)',
      width: 'Dây dẹt 5mm hoặc tròn 2.5mm',
      elongation: 'Gần như không co giãn (< 2%)',
      colorFastness: 'Chuẩn sáp không lem màu',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Đen Bóng Da Sáp', hex: '#09090b' },
        { name: 'Nâu Cà Phê Dark Brown', hex: '#451a03' },
        { name: 'Vàng Da Bò Tan/Cognac', hex: '#92400e' },
        { name: 'Rượu Vang Burgundy', hex: '#7f1d1d' },
      ],
      aglets: [
        { name: 'Đồng Cổ Brass', type: 'Kim Loại Vintage', color: '#b45309' },
        { name: 'Gunmetal Mờ', type: 'Kim Loại PVD', color: '#3f3f46' },
        { name: 'Vàng Gold 18K', type: 'Mạ Điện Phân', color: '#eab308' },
      ]
    },
    {
      id: 'round-trekking',
      tabLabel: 'Tròn Bện Lõi',
      name: 'Dây Tròn Bện Lõi Core-Braid',
      category: 'Outdoor & Tactical Boots',
      badge: 'Kháng Ma Sát Cực Đại',
      description: 'Kết cấu dệt kép lõi chịu lực Nylon bên trong và vỏ ngoài Polyester chống mài mòn, ma sát cao cho giày leo núi và bảo hộ.',
      tensile: '> 220 N (Siêu tải trọng)',
      width: 'Bản tròn đường kính 4.5mm - 6.0mm',
      elongation: 'Dưới 5% đàn hồi giảm chấn',
      colorFastness: 'Cấp 5/5 chống tia UV ngoài trời',
      image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Rêu Quân Đội Khaki', hex: '#3f4f2c' },
        { name: 'Cam Cảnh Báo Trek', hex: '#c2410c' },
        { name: 'Đen Than Hoạt Tính', hex: '#1c1917' },
        { name: 'Xanh Navy Núi Đá', hex: '#1e293b' },
      ],
      aglets: [
        { name: 'Bọc Kim Loại Bấm Ngàm', type: 'Cơ Khí Khóa Chặt', color: '#52525b' },
        { name: 'Đầu Cao Su Silicon Đúc', type: 'Chống Nước', color: '#27272a' },
        { name: 'Bạc Mờ Kháng Va Đập', type: 'Hợp Kim Kẽm', color: '#d4d4d8' },
      ]
    }
  ],
  en: [
    {
      id: 'jacquard-rpet',
      tabLabel: 'Jacquard RPET',
      name: 'ECO-RPET Jacquard Cord',
      category: 'Sneaker & Athleisure',
      badge: 'GRS Recycled Fiber',
      description: 'Computerized jacquard weave engineered with recycled RPET yarns. High knot retention and edge abrasion resistance.',
      tensile: '> 165 N (Instron Certified)',
      width: 'Flat 8mm - 10mm - 12mm',
      elongation: '< 3.5% Under Heavy Load',
      colorFastness: 'Grade 4.5/5 (ISO 105)',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Emerald Eco Green', hex: '#059669' },
        { name: 'Sneaker Off-White', hex: '#f4f4f5' },
        { name: 'Carbon Matte Black', hex: '#18181b' },
        { name: 'Sport Cobalt Blue', hex: '#2563eb' },
        { name: 'Runner Ruby Red', hex: '#dc2626' },
        { name: 'Amber Gold', hex: '#d97706' },
      ],
      aglets: [
        { name: 'Matte Gunmetal', type: 'PVD Coated Metal', color: '#3f3f46' },
        { name: 'Laser Chrome Silver', type: 'Custom Engraved', color: '#e4e4e7' },
        { name: '18K Luxury Gold', type: 'Electroplated', color: '#eab308' },
        { name: 'PLA Bio-Membrane', type: 'Biodegradable', color: '#10b981' },
      ]
    },
    {
      id: 'reflective-3m',
      tabLabel: '3M Reflective',
      name: '3M Scotchlite Reflective Cord',
      category: 'Safety & Running Gear',
      badge: 'High-Vis Retroreflective',
      description: 'Engineered with 3M micro-prismatic glass bead retroreflective yarns, providing 360° headlight visibility.',
      tensile: '> 150 N (High Tensile)',
      width: 'Round 4.5mm or Flat 8mm',
      elongation: '< 4.0%',
      colorFastness: 'Grade 4-5/5 Weatherproof',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Titanium Reflective Silver', hex: '#94a3b8' },
        { name: 'Stealth Reflective Black', hex: '#18181b' },
        { name: 'Neon Glow Green', hex: '#22c55e' },
        { name: 'High-Vis Safety Orange', hex: '#ea580c' },
      ],
      aglets: [
        { name: 'Laser Silver', type: '3M Metal', color: '#e4e4e7' },
        { name: 'Clear Silicone', type: 'Thermoplastic', color: '#cbd5e1' },
        { name: 'Matte Gunmetal', type: 'PVD Metal', color: '#27272a' },
      ]
    },
    {
      id: 'waxed-leather',
      tabLabel: 'Waxed Cord',
      name: 'Waterproof Waxed Cord',
      category: 'Dress Shoes & Boots',
      badge: 'Beeswax Waterproofed',
      description: '100% combed long-staple cotton sealed with natural beeswax for a lustrous vintage glaze and moisture barrier.',
      tensile: '> 135 N (Structured Knot)',
      width: 'Flat 5mm or Round 2.5mm',
      elongation: 'Non-stretch (< 2%)',
      colorFastness: 'Bleed-proof Wax Seal',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Glazed Black', hex: '#09090b' },
        { name: 'Dark Roast Brown', hex: '#451a03' },
        { name: 'Cognac / Tan', hex: '#92400e' },
        { name: 'Vintage Burgundy', hex: '#7f1d1d' },
      ],
      aglets: [
        { name: 'Vintage Brass', type: 'Antiqued Brass', color: '#b45309' },
        { name: 'Matte Gunmetal', type: 'PVD Metal', color: '#3f3f46' },
        { name: '18K Electro Gold', type: 'Electroplated', color: '#eab308' },
      ]
    },
    {
      id: 'round-trekking',
      tabLabel: 'Core Braid',
      name: 'Core-Braid Trekking Cord',
      category: 'Outdoor & Tactical Boots',
      badge: 'Extreme Friction Resistance',
      description: 'Dual-core reinforced architecture with internal high-modulus Nylon core wrapped in abrasion-resistant Polyester sheath.',
      tensile: '> 220 N (Heavy Duty)',
      width: 'Round Diameter 4.5mm - 6.0mm',
      elongation: '< 5% Shock Absorbing',
      colorFastness: 'Grade 5/5 UV Resistant',
      image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Military Khaki Olive', hex: '#3f4f2c' },
        { name: 'Safety Alert Orange', hex: '#c2410c' },
        { name: 'Activated Charcoal Black', hex: '#1c1917' },
        { name: 'Alpine Granite Navy', hex: '#1e293b' },
      ],
      aglets: [
        { name: 'Crimp Metal Clasp', type: 'Mechanical Grip', color: '#52525b' },
        { name: 'Molded Rubber Tip', type: 'Waterproof', color: '#27272a' },
        { name: 'Matte Zinc Silver', type: 'Impact Alloy', color: '#d4d4d8' },
      ]
    }
  ],
  id: [
    {
      id: 'jacquard-rpet',
      tabLabel: 'Jacquard RPET',
      name: 'Tali Anyam Jacquard ECO-RPET',
      category: 'Sneaker & Olahraga',
      badge: 'Serat Daur Ulang GRS',
      description: 'Anyaman jacquard presisi komputer dengan serat daur ulang RPET ramah lingkungan. Tahan gesekan tepi dan simpul kokoh.',
      tensile: '> 165 N (Uji Instron)',
      width: 'Pipih 8mm - 10mm - 12mm',
      elongation: '< 3.5% Beban Berat',
      colorFastness: 'Tingkat 4.5/5 (ISO 105)',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Hijau Eco Emerald', hex: '#059669' },
        { name: 'Putih Sneaker', hex: '#f4f4f5' },
        { name: 'Hitam Matte Karbon', hex: '#18181b' },
        { name: 'Biru Kobalt Sport', hex: '#2563eb' },
        { name: 'Merah Ruby', hex: '#dc2626' },
        { name: 'Kuning Amber', hex: '#d97706' },
      ],
      aglets: [
        { name: 'Gunmetal Doff', type: 'Logam PVD', color: '#3f3f46' },
        { name: 'Perak Chrome Laser', type: 'Ukiran Logo', color: '#e4e4e7' },
        { name: 'Emas Mewah 18K', type: 'Elektroplating', color: '#eab308' },
        { name: 'Membran Bio PLA', type: 'Mudah Terurai', color: '#10b981' },
      ]
    },
    {
      id: 'reflective-3m',
      tabLabel: '3M Reflektif',
      name: 'Tali Reflektif 3M Scotchlite',
      category: 'Keamanan & Lari',
      badge: 'Refleksi Sorotan Tinggi',
      description: 'Ditenun dengan benang manik mikro-prisma 3M memantulkan cahaya lampu kendaraan secara instan untuk keamanan malam.',
      tensile: '> 150 N (Tarik Kuat)',
      width: 'Bulat 4.5mm atau Pipih 8mm',
      elongation: '< 4.0%',
      colorFastness: 'Tingkat 4-5/5 Tahan Cuaca',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Perak Titanium Reflektif', hex: '#94a3b8' },
        { name: 'Hitam Stealth Reflektif', hex: '#18181b' },
        { name: 'Hijau Neon Terang', hex: '#22c55e' },
        { name: 'Oranye Peringatan', hex: '#ea580c' },
      ],
      aglets: [
        { name: 'Perak Laser', type: 'Logam 3M', color: '#e4e4e7' },
        { name: 'Silikon Transparan', type: 'Termoplastik', color: '#cbd5e1' },
        { name: 'Gunmetal Doff', type: 'Logam PVD', color: '#27272a' },
      ]
    },
    {
      id: 'waxed-leather',
      tabLabel: 'Tali Waxed',
      name: 'Tali Lilin Waxed Kedap Air',
      category: 'Sepatu Pantofel & Boot',
      badge: 'Lapisan Lilin Alami',
      description: '100% Katun disisir halus berlapis lilin lebah alami menciptakan kilau mewah vintage dan perlindungan kedap air.',
      tensile: '> 135 N (Simpul Tegas)',
      width: 'Pipih 5mm atau Bulat 2.5mm',
      elongation: 'Nyaris Tanpa Melar (< 2%)',
      colorFastness: 'Warna Lilin Tahan Luntur',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Hitam Mengkilap', hex: '#09090b' },
        { name: 'Cokelat Gelap Kopi', hex: '#451a03' },
        { name: 'Cokelat Tan / Cognac', hex: '#92400e' },
        { name: 'Merah Burgundy Vintage', hex: '#7f1d1d' },
      ],
      aglets: [
        { name: 'Kuningan Antik', type: 'Logam Vintage', color: '#b45309' },
        { name: 'Gunmetal Doff', type: 'Logam PVD', color: '#3f3f46' },
        { name: 'Emas 18K', type: 'Elektroplating', color: '#eab308' },
      ]
    },
    {
      id: 'round-trekking',
      tabLabel: 'Tali Berinti',
      name: 'Tali Bulat Berinti Core-Braid',
      category: 'Sepatu Gunung & Taktikal',
      badge: 'Ketahanan Gesek Ekstrem',
      description: 'Struktur ganda berinti nilon kekuatan tinggi dilapisi anyaman poliester tahan gesek untuk kegiatan luar ruangan ekstrem.',
      tensile: '> 220 N (Kapasitas Ekstrem)',
      width: 'Bulat Diameter 4.5mm - 6.0mm',
      elongation: '< 5% Redaman Getaran',
      colorFastness: 'Tingkat 5/5 Tahan UV',
      image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
      macroImage: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
      colors: [
        { name: 'Khaki Zaitun Militer', hex: '#3f4f2c' },
        { name: 'Oranye Darurat Trek', hex: '#c2410c' },
        { name: 'Hitam Arang Karbon', hex: '#1c1917' },
        { name: 'Biru Navy Granit', hex: '#1e293b' },
      ],
      aglets: [
        { name: 'Ujung Logam Penjepit', type: 'Kuncian Mekanis', color: '#52525b' },
        { name: 'Karet Silikon Cetak', type: 'Kedap Air', color: '#27272a' },
        { name: 'Perak Seng Doff', type: 'Paduan Antibenturan', color: '#d4d4d8' },
      ]
    }
  ]
};

interface ProductSpecimenStudioProps {
  onSelectProductForQuote?: (name: string) => void;
}

export const ProductSpecimenStudio: React.FC<ProductSpecimenStudioProps> = ({ onSelectProductForQuote }) => {
  const { language } = useLanguage();
  const presets = SPECIMENS_BY_LANG[language] || SPECIMENS_BY_LANG.vi;

  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedAgletIndex, setSelectedAgletIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'product' | 'macro' | '3d'>('product');

  const current = presets[activePresetIndex] || presets[0];
  const currentColor = current.colors[selectedColorIndex] || current.colors[0];
  const currentAglet = current.aglets[selectedAgletIndex] || current.aglets[0];

  const handleSwitchPreset = (idx: number) => {
    setActivePresetIndex(idx);
    setSelectedColorIndex(0);
    setSelectedAgletIndex(0);
  };

  const labels = {
    vi: {
      header: 'Phòng Trưng Bày Mẫu Kỹ Thuật • Specimen Studio',
      overview: 'Tổng Thể',
      macro: 'Soi Vân',
      view3d: '3D 360°',
      colorLabel: 'Bảng màu tiêu biểu:',
      colorPrefix: 'Màu:',
      agletLabel: 'Kiểu gia công đầu Aglet:',
      agletPrefix: 'Đầu bọc Aglet:',
      tensilePrefix: 'Lực kéo:',
      widthLabel: 'Quy cách bản:',
      tensileLabel: 'Tải kéo đứt:',
      elongationLabel: 'Độ co giãn:',
      colorFastnessLabel: 'Độ bền màu:',
      disclaimer: '* Liên Châu hỗ trợ làm mẫu Lab miễn phí theo thông số kỹ thuật và mã màu Pantone của quý khách.',
      cta: 'Yêu Cầu Mẫu Thử',
    },
    en: {
      header: 'Technical Specimen Studio • Material Lab',
      overview: 'Overview',
      macro: 'Weave Zoom',
      view3d: '3D 360°',
      colorLabel: 'Available Color Palette:',
      colorPrefix: 'Color:',
      agletLabel: 'Aglet Tipping Finish:',
      agletPrefix: 'Aglet Tip:',
      tensilePrefix: 'Tensile:',
      widthLabel: 'Width / Spec:',
      tensileLabel: 'Tensile Load:',
      elongationLabel: 'Elongation:',
      colorFastnessLabel: 'Color Fastness:',
      disclaimer: '* Free custom lab dips and yarn swatches produced within 24–48 hours to your exact Pantone code.',
      cta: 'Request Lab Sample',
    },
    id: {
      header: 'Studio Spesimen Teknis • Laboratorium Bahan',
      overview: 'Tinjauan',
      macro: 'Perbesar Anyam',
      view3d: '3D 360°',
      colorLabel: 'Pilihan Palet Warna:',
      colorPrefix: 'Warna:',
      agletLabel: 'Pilihan Ujung Aglet:',
      agletPrefix: 'Ujung Aglet:',
      tensilePrefix: 'Kekuatan Tarik:',
      widthLabel: 'Lebar / Spesifikasi:',
      tensileLabel: 'Beban Tarik:',
      elongationLabel: 'Elastisitas:',
      colorFastnessLabel: 'Ketahanan Warna:',
      disclaimer: '* Sampel lab gratis dibuat dalam 24–48 jam sesuai kode warna Pantone dan spesifikasi Anda.',
      cta: 'Minta Sampel Lab',
    },
  }[language] || {
    header: 'Technical Specimen Studio • Material Lab',
    overview: 'Overview',
    macro: 'Weave Zoom',
    view3d: '3D 360°',
    colorLabel: 'Available Color Palette:',
    colorPrefix: 'Color:',
    agletLabel: 'Aglet Tipping Finish:',
    agletPrefix: 'Aglet Tip:',
    tensilePrefix: 'Tensile:',
    widthLabel: 'Width / Spec:',
    tensileLabel: 'Tensile Load:',
    elongationLabel: 'Elongation:',
    colorFastnessLabel: 'Color Fastness:',
    disclaimer: '* Free custom lab dips and yarn swatches produced within 24–48 hours to your exact Pantone code.',
    cta: 'Request Lab Sample',
  };

  return (
    <div className="border border-zinc-300 rounded-sm bg-zinc-50 p-2 shadow-sm text-left">
      {/* Studio Header Meta */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-zinc-200 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span className="font-bold text-zinc-900 uppercase text-[11px] tracking-wide">
            {labels.header}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs font-mono font-bold border border-emerald-200">
          <Award className="w-3 h-3" />
          <span>OEM / ODM QUALITY</span>
        </div>
      </div>

      <div className="bg-white p-4 space-y-4">
        {/* 1. Category Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-xs">
          {presets.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => handleSwitchPreset(idx)}
              className={`px-2 py-2 text-center rounded-xs transition-all border cursor-pointer ${
                activePresetIndex === idx
                  ? 'bg-zinc-900 border-zinc-900 text-white font-bold shadow-xs'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <div className="text-[10px] uppercase font-bold truncate">{preset.tabLabel}</div>
              <div className="text-[9px] text-zinc-400 truncate mt-0.5 hidden sm:block">
                {preset.badge}
              </div>
            </button>
          ))}
        </div>

        {/* 2. Main Visual Inspection Showcase */}
        <div className="relative rounded-sm overflow-hidden border border-zinc-200 bg-zinc-900 group aspect-[16/10] sm:aspect-[16/9]">
          {viewMode === '3d' ? (
            <div className="w-full h-full">
              <Interactive3DCordViewer
                cordColor={currentColor.hex}
                patternType={current.id === 'reflective-3m' ? 'reflective' : current.id === 'waxed-leather' ? 'waxed' : 'braided'}
                agletFinish={currentAglet.type.includes('Gold') || currentAglet.name.includes('Vàng') || currentAglet.name.includes('Emas') ? 'gold' : currentAglet.type.includes('Laser') ? 'silver' : currentAglet.type.includes('Silicon') || currentAglet.type.includes('Karet') ? 'neon' : 'gunmetal'}
              />
            </div>
          ) : (
            <>
              <img
                src={viewMode === 'product' ? current.image : current.macroImage}
                alt={current.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
              />

              {/* Color Filter Overlay Indicator */}
              <div 
                className="absolute inset-0 opacity-15 mix-blend-color pointer-events-none transition-colors duration-300"
                style={{ backgroundColor: currentColor.hex }}
              />
            </>
          )}

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            <span className="px-2.5 py-1 bg-zinc-900 text-emerald-400 font-mono text-[10px] font-bold uppercase rounded-xs border border-zinc-700 tracking-wider">
              {current.badge}
            </span>
            <span className="px-2 py-0.5 bg-zinc-900 text-white font-mono text-[9px] rounded-xs border border-zinc-700">
              {current.category}
            </span>
          </div>

          {/* Toggle View Mode: Product vs Macro Sợi vs 3D */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-zinc-900 p-1 rounded-xs border border-zinc-700 z-10">
            <button
              onClick={() => setViewMode('product')}
              className={`px-2 py-1 text-[10px] font-mono rounded-xs transition-colors cursor-pointer ${
                viewMode === 'product'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {labels.overview}
            </button>
            <button
              onClick={() => setViewMode('macro')}
              className={`px-2 py-1 text-[10px] font-mono rounded-xs transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === 'macro'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{labels.macro}</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-2 py-1 text-[10px] font-mono rounded-xs transition-colors cursor-pointer flex items-center gap-1 ${
                viewMode === '3d'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Box className="w-3 h-3 text-emerald-300" />
              <span>{labels.view3d}</span>
            </button>
          </div>

          {/* Active Color & Aglet Overlay Banner */}
          {viewMode !== '3d' && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 text-white flex flex-wrap items-end justify-between gap-2 pointer-events-none">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-white flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full border border-white/40 inline-block shrink-0 shadow-sm"
                    style={{ backgroundColor: currentColor.hex }}
                  />
                  <span>{labels.colorPrefix} {currentColor.name}</span>
                </div>
                <div className="text-[10px] text-zinc-300 font-mono mt-0.5">
                  {labels.agletPrefix} <span className="text-emerald-400 font-bold">{currentAglet.name}</span> ({currentAglet.type})
                </div>
              </div>

              <div className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-1 rounded-xs border border-zinc-700">
                {labels.tensilePrefix} <span className="text-white font-bold">{current.tensile.split(' ')[0]} {current.tensile.split(' ')[1]}</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Interactive Swatches: Color Palette & Aglet Finishes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-zinc-100">
          
          {/* Swatch 1: Màu Sắc Sợi */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
              <span>{labels.colorLabel}</span>
              <span className="text-zinc-700 font-bold">{currentColor.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {current.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorIndex(i)}
                  className={`w-7 h-7 rounded-sm border cursor-pointer transition-all flex items-center justify-center relative ${
                    selectedColorIndex === i
                      ? 'ring-2 ring-emerald-600 ring-offset-1 scale-110 shadow-xs'
                      : 'border-zinc-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColorIndex === i && (
                    <Check className={`w-3.5 h-3.5 ${['#f4f4f5', '#94a3b8'].includes(c.hex) ? 'text-zinc-900' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Swatch 2: Tipping Aglet Đầu Bọc */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
              <span>{labels.agletLabel}</span>
              <span className="text-emerald-700 font-bold">{currentAglet.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {current.aglets.map((aglet, i) => (
                <button
                  key={aglet.name}
                  onClick={() => setSelectedAgletIndex(i)}
                  className={`px-2 py-1.5 text-[10px] font-mono rounded-xs border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    selectedAgletIndex === i
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full border border-zinc-400 shrink-0"
                    style={{ backgroundColor: aglet.color }}
                  />
                  <span className="truncate">{aglet.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 4. Industrial Technical Specification Data Strip */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left font-mono">
          <div>
            <span className="text-[9px] text-zinc-400 uppercase block">{labels.widthLabel}</span>
            <span className="text-xs font-bold text-zinc-800">{current.width}</span>
          </div>
          <div>
            <span className="text-[9px] text-zinc-400 uppercase block">{labels.tensileLabel}</span>
            <span className="text-xs font-bold text-emerald-700">{current.tensile}</span>
          </div>
          <div>
            <span className="text-[9px] text-zinc-400 uppercase block">{labels.elongationLabel}</span>
            <span className="text-xs font-bold text-zinc-800">{current.elongation}</span>
          </div>
          <div>
            <span className="text-[9px] text-zinc-400 uppercase block">{labels.colorFastnessLabel}</span>
            <span className="text-xs font-bold text-zinc-800">{current.colorFastness}</span>
          </div>
        </div>

        {/* Action Button: Yêu cầu gửi mẫu thực tế */}
        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <p className="text-zinc-500 text-[11px] leading-relaxed">
            {labels.disclaimer}
          </p>
          {onSelectProductForQuote && (
            <button
              onClick={() => onSelectProductForQuote(current.name)}
              className="shrink-0 px-3.5 py-2 bg-zinc-900 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider font-mono rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              <span>{labels.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
