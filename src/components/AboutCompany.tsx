import React, { useEffect, useState, useRef } from 'react';
import { COMPANY_STATS } from '../data/mockData';
import { Award, ShieldCheck, Factory, Gauge, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface TabItem {
  id: string;
  tabLabel: string;
  title: string;
  image: string;
  badge: string;
  description: string;
  stats: string;
  technicalSpecs: string[];
}

export const AboutCompany: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('weaving');
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    exp: 0,
    capacity: 0,
    partners: 0,
    quality: 0
  });

  const WORKSHOP_TABS: TabItem[] = [
    {
      id: 'weaving',
      tabLabel: language === 'en' ? 'Weaving & Braiding' : language === 'id' ? 'Tenun & Kepang' : 'Dệt Đan Kim',
      title: language === 'en'
        ? 'High-Speed Knitting & Computerized Jacquard Workshop'
        : language === 'id'
        ? 'Bengkel Rajut Kecepatan Tinggi & Jacquard Komputer'
        : 'Phân Xưởng Dệt Đan Kim & Jacquard Vi Tính',
      badge: language === 'en' ? '250+ Automated Looms' : language === 'id' ? '250+ Alat Tenun Otomatis' : '250+ Cụm máy dệt tự động',
      description: language === 'en'
        ? 'Equipped with circular knitting, shuttle looms, and computerized Jacquard systems imported from Germany and Taiwan. Optical sensors auto-stop on yarn breakages, ensuring ultra-smooth surface consistency.'
        : language === 'id'
        ? 'Dilengkapi dengan rajut bundar, alat tenun shuttle, dan sistem Jacquard terkomputerisasi yang diimpor dari Jerman dan Taiwan. Sensor optik berhenti otomatis saat benang putus.'
        : 'Trang bị hệ thống máy dệt kim đan tròn, dệt thoi và dệt Jacquard vi tính nhập khẩu từ Đức và Đài Loan. Cảm biến quang học tự ngắt khi đứt chỉ, đảm bảo bề mặt sợi dệt phẳng mịn, không lỗi sợi.',
      stats: language === 'en' ? 'Output: 500,000 m / day' : language === 'id' ? 'Kapasitas: 500.000 m / hari' : 'Công suất: 500.000 mét / ngày',
      technicalSpecs: language === 'en' ? [
        'Round Braiding: Ø 1.5mm - 12mm',
        'Flat Ribbon Width: 4mm - 35mm',
        'Spindle RPM: 1,500 rpm',
        'Defect Rate: < 0.05%'
      ] : language === 'id' ? [
        'Diameter rajut bundar: Ø 1.5mm - 12mm',
        'Lebar pita datar: 4mm - 35mm',
        'Kecepatan spindel: 1.500 rpm',
        'Tingkat cacat: < 0.05%'
      ] : [
        'Đường kính đan tròn: Ø 1.5mm - 12mm',
        'Khổ bản dệt dẹt / thoi: 4mm - 35mm',
        'Tốc độ đan kim: 1.500 vòng/phút',
        'Tỷ lệ lỗi dệt: < 0.05%'
      ],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'dyeing',
      tabLabel: language === 'en' ? 'Pressure Dyeing' : language === 'id' ? 'Pencelupan Warna' : 'Nhuộm Cao Áp',
      title: language === 'en'
        ? 'High-Pressure Yarn Dyeing & Finishing Facility'
        : language === 'id'
        ? 'Fasilitas Pencelupan Benang Tekanan Tinggi & Finishing'
        : 'Phân Xưởng Nhuộm Màu Cao Áp & Hoàn Tất Sợi',
      badge: language === 'en' ? 'Pantone & AATCC Grade 4.5' : language === 'id' ? 'Standar Pantone & AATCC Tingkat 4.5' : 'Chuẩn màu Pantone & AATCC Cấp 4.5',
      description: language === 'en'
        ? 'Closed-chamber high-pressure dyeing. Dye molecules penetrate deep into every polyester/cotton ply, resisting washing friction and sweat without color bleed. Full wastewater treatment compliance.'
        : language === 'id'
        ? 'Pencelupan bertekanan tinggi ruang tertutup. Molekul warna menembus ke dalam serat poliester/katun, tahan luntur saat dicuci dan terkena keringat. Pengolahan air limbah terpadu.'
        : 'Nhuộm áp suất cao trong buồng kín khép kín. Hạt màu thấm sâu vào từng tao sợi polyester/cotton, chịu được ma sát giặt và mồ hôi chân mà không phai màu. Nước thải xử lý theo tiêu chuẩn môi trường KCN Sóng Thần 3.',
      stats: language === 'en' ? 'Lab Dip Turnaround: 24 - 48h' : language === 'id' ? 'Waktu Sampel Lab: 24 - 48 jam' : 'Thời gian ra mẫu màu: 24 - 48 giờ',
      technicalSpecs: language === 'en' ? [
        'Rubbing Fastness: Grade 4.5 - 5 (ISO 105-X12)',
        'Color Tolerance: Delta E < 0.8',
        'Eco-Dyes: ZDHC & Oeko-Tex Compliant',
        'Optional Finish: Nano DWR Waterproof Coating'
      ] : language === 'id' ? [
        'Ketahanan gesek kering/basah: Tingkat 4.5 - 5 (ISO 105-X12)',
        'Toleransi warna: Delta E < 0.8',
        'Pewarna ramah lingkungan: ZDHC & Oeko-Tex',
        'Pelapisan anti air nano DWR'
      ] : [
        'Độ bền màu ma sát khô/ướt: Cấp 4.5 - 5 (ISO 105-X12)',
        'Dung sai màu sắc: Delta E < 0.8',
        'Thuốc nhuộm sinh học: Chuẩn ZDHC & Oeko-Tex',
        'Phủ công nghệ chống thấm nước nano DWR'
      ],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'aglet',
      tabLabel: language === 'en' ? 'Aglet & Laser Tipping' : language === 'id' ? 'Ujung Tipping Aglet' : 'Bấm Đầu Aglet',
      title: language === 'en'
        ? 'Metal Aglet Tipping & Fiber Laser Engraving Workshop'
        : language === 'id'
        ? 'Bengkel Pemasangan Aglet Logam & Ukiran Laser Fiber'
        : 'Phân Xưởng Bấm Đầu Aglet Kim Loại & Khắc Laser',
      badge: language === 'en' ? '35 Hydraulic & Pneumatic Presses' : language === 'id' ? '35 Mesin Cetak Hidrolik' : '35 Máy dập đầu thủy lực & khí nén',
      description: language === 'en'
        ? 'Specializing in SUS304 stainless steel, brass, zinc alloy PVD aglets, and clear cellulose acetate heat-shrink wrapping. Crisp micro laser branding.'
        : language === 'id'
        ? 'Spesialis aglet baja tahan karat SUS304, kuningan, paduan seng PVD, dan selulosa asetat transparan. Ukiran laser mikro sangat presisi.'
        : 'Chuyên gia công bấm đầu aglet inox 304 không gỉ, đồng thau cổ điển, hợp kim kẽm mạ PVD và màng nhựa co nhiệt acetate trong suốt. Khắc laser logo sắc nét từng chi tiết vi mô.',
      stats: language === 'en' ? 'Retention Force: > 80 Newton' : language === 'id' ? 'Kekuatan Tarik Ujung: > 80 Newton' : 'Lực tuột đầu bấm: > 80 Newton',
      technicalSpecs: language === 'en' ? [
        'Metal Aglet Length: 15mm - 25mm',
        'Finishes: Gunmetal, Chrome, Matte Gold, Antique Brass',
        '1064nm Fiber Laser Micro Engraving',
        'Tipping Capacity: 250,000 pairs / day'
      ] : language === 'id' ? [
        'Panjang aglet logam: 15mm - 25mm',
        'Finishing: Gunmetal, Chrome, Matte Gold, Kuningan Kuno',
        'Ukiran laser serat 1064nm mikroskopis',
        'Kapasitas produksi: 250.000 pasang / hari'
      ] : [
        'Độ dài aglet kim loại: 15mm - 25mm',
        'Bề mặt hoàn thiện: Gunmetal, Chrome bóng, Vàng mờ, Đồng cổ',
        'Khắc logo vi mô bằng laser fiber bước sóng 1064nm',
        'Năng suất bấm đầu: 250.000 cặp dây/ngày'
      ],
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'lab',
      tabLabel: language === 'en' ? 'QA/QC Physical Lab' : language === 'id' ? 'Lab QA/QC Fisik' : 'Phòng Lab QA/QC',
      title: language === 'en'
        ? 'Physical Testing Laboratory & QA/QC Quality Inspection'
        : language === 'id'
        ? 'Laboratorium Pengujian Fisik & Inspeksi Kualitas QA/QC'
        : 'Phòng Thí Nghiệm Cơ Lý & Kiểm Định Chất Lượng QA/QC',
      badge: language === 'en' ? 'ISO 9001:2015 Certified' : language === 'id' ? 'Sertifikasi ISO 9001:2015' : 'Tiêu chuẩn quốc tế ISO 9001:2015',
      description: language === 'en'
        ? 'Independent testing lab equipped with electronic tensile testers, Martindale abrasion testers, and D65/TL84 lightboxes. Official CO, CQ, and batch test reports provided.'
        : language === 'id'
        ? 'Laboratorium independen dilengkapi penguji kekuatan tarik Instron, penguji abrasi Martindale, dan kotak lampu D65/TL84. Menyediakan CO, CQ, dan laporan uji per batch.'
        : 'Phòng Lab độc lập trang bị máy đo lực kéo đứt điện tử Instron, máy kiểm tra độ mài mòn Martindale và buồng tủ so màu D65/TL84. Cấp chứng thư CO, CQ và Test Report cho từng lô hàng xuất khẩu.',
      stats: language === 'en' ? 'Pass Acceptance Rate: 99.85%' : language === 'id' ? 'Tingkat Kelulusan: 99.85%' : 'Tỷ lệ nghiệm thu đạt: 99.85%',
      technicalSpecs: language === 'en' ? [
        '500N Tensile Pull Strength Tester',
        'SATRA 20,000 Cycles Abrasion Tester',
        'Zero Lead & Formaldehyde Residuals',
        '12-Month Counterpart Sample Retention'
      ] : language === 'id' ? [
        'Uji kekuatan tarik beban 500N',
        'Uji ketahanan abrasi 20.000 siklus SATRA',
        'Bebas timbal & formaldehida (0%)',
        'Penyimpanan arsip sampel 12 bulan'
      ] : [
        'Máy đo lực kéo Instron tải trọng 500N',
        'Kiểm tra kháng mài mòn 20.000 chu kỳ SATRA',
        'Kiểm định tồn dư chì & formaldehyde = 0',
        'Lưu trữ hồ sơ mẫu đối chứng 12 tháng'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const currentTab = WORKSHOP_TABS.find((t) => t.id === activeTab) || WORKSHOP_TABS[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounts({
        exp: 16,
        capacity: 15,
        partners: 650,
        quality: 100
      });
      setHasAnimated(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="py-20 lg:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200 mb-12 text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
              {t.about.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 tracking-tight uppercase">
              {t.about.title}
            </h2>
          </div>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-md leading-relaxed">
            {t.about.desc}
          </p>
        </div>

        {/* 4 Stats Grid - High Contrast, Solid Typography, Zero Gradient */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm">
            <div className="text-3xl sm:text-4xl font-bold text-zinc-900 font-mono tracking-tight mb-1">
              {counts.exp}+ <span className="text-base text-zinc-500 font-normal">{language === 'en' ? 'Years' : language === 'id' ? 'Tahun' : 'Năm'}</span>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              {t.about.stat3}
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">
              {language === 'en' ? 'Established in 2010' : language === 'id' ? 'Didirikan sejak 2010' : 'Khởi sự từ xưởng dệt đan năm 2010'}
            </p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm">
            <div className="text-3xl sm:text-4xl font-bold text-zinc-900 font-mono tracking-tight mb-1">
              {counts.capacity}M+ <span className="text-base text-zinc-500 font-normal">{language === 'en' ? 'm/month' : language === 'id' ? 'm/bulan' : 'm/tháng'}</span>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              {t.about.stat2}
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">
              {language === 'en' ? '250+ automated looms' : language === 'id' ? '250+ mesin beroperasi' : '250+ máy dệt đan vận hành liên tục'}
            </p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm">
            <div className="text-3xl sm:text-4xl font-bold text-zinc-900 font-mono tracking-tight mb-1">
              {counts.partners}+ <span className="text-base text-zinc-500 font-normal">{language === 'en' ? 'Partners' : language === 'id' ? 'Mitra' : 'Đối tác'}</span>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              {language === 'en' ? 'Brands & OEM Factories' : language === 'id' ? 'Merek & Pabrik OEM' : 'Thương Hiệu & Xưởng OEM'}
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">
              {language === 'en' ? 'Exporting to 48 countries' : language === 'id' ? 'Ekspor ke 48 negara' : 'Xuất khẩu 48 thị trường quốc tế'}
            </p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-700 font-mono tracking-tight mb-1">
              {counts.quality}% <span className="text-base text-zinc-500 font-normal">{language === 'en' ? 'Pass' : language === 'id' ? 'Lolos' : 'KCS'}</span>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              {t.about.stat4}
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">
              ISO 9001:2015 &amp; OEKO-TEX Standard 100
            </p>
          </div>
        </div>

        {/* Industrial Workshop Infrastructure Showcase */}
        <div className="border border-zinc-200 bg-white rounded-sm text-left">
          {/* Workshop Selection Tabs */}
          <div className="flex items-center gap-1 border-b border-zinc-200 p-2 overflow-x-auto scrollbar-none bg-zinc-50">
            {WORKSHOP_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {tab.tabLabel}
              </button>
            ))}
          </div>

          {/* Active Workshop Details */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image */}
            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-sm border border-zinc-200 bg-zinc-100">
              <img
                src={currentTab.image}
                alt={currentTab.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-zinc-900/90 text-white text-xs font-mono flex items-center justify-between backdrop-blur-xs rounded-xs">
                <span>{currentTab.badge}</span>
                <span className="text-emerald-400 font-bold">{currentTab.stats}</span>
              </div>
            </div>

            {/* Technical Parameters */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold uppercase">
                  {language === 'en' ? 'Technical Specifications' : language === 'id' ? 'Spesifikasi Teknis Fasilitas' : 'Thông Tin Kỹ Thuật Phân Xưởng'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mt-1">
                  {currentTab.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {currentTab.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 font-mono block">
                  {language === 'en' ? 'Operating & Quality Standards:' : language === 'id' ? 'Standar Operasional & Kualitas:' : 'Tiêu chuẩn vận hành & nghiệm thu:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-700">
                  {currentTab.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
