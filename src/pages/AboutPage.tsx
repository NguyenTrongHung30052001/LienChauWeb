import React, { useState } from 'react';
import { COMPANY_STATS } from '../data/mockData';
import { Award, ShieldCheck, Factory, Cpu, Users, Globe2, Sparkles, CheckCircle2, ChevronRight, Gauge } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutPageProps {
  onNavigateToContact: () => void;
  onNavigateToProducts: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToContact, onNavigateToProducts }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'braiding' | 'dyeing' | 'tipping' | 'lab'>('braiding');

  const workshops = [
    {
      id: 'braiding',
      title: language === 'en' ? 'High-Speed Braiding & Weaving' : language === 'id' ? 'Pemintalan & Penenunan Kecepatan Tinggi' : 'Phân Xưởng Dệt Đan Sợi Tốc Độ Cao',
      subtitle: language === 'en' ? '250+ Automated Multi-Head Looms' : language === 'id' ? '250+ Alat Tenun Multi-Kepala Otomatis' : '250+ Cụm Máy Dệt Đa Đầu Tự Động',
      desc: language === 'en'
        ? 'Circular braiding, shuttle weaving, and computerized Jacquard machines imported from Taiwan and Germany, equipped with optical yarn break detection sensors, reaching 1,500 rpm.'
        : language === 'id'
        ? 'Mesin tenun melingkar, tenun shuttle, dan Jacquard komputer dari Taiwan dan Jerman dengan sensor optik putus benang otomatis, mencapai 1.500 rpm.'
        : 'Hệ thống máy dệt kim đan tròn, dệt thoi và dệt Jacquard vi tính nhập khẩu từ Đài Loan và Đức, trang bị cảm biến sợi quang học dừng tự động khi đứt chỉ, đạt tốc độ đan 1.500 vòng/phút.',
      specs: language === 'en' ? [
        'Production Capacity: 500,000 meters / day',
        'Capability: Flat 4mm - 35mm, Round Ø 1.5mm - 12mm',
        'Computerized 3D Jacquard patterns matching CAD files',
        'Defect rate below 0.05%'
      ] : language === 'id' ? [
        'Kapasitas Produksi: 500.000 meter / hari',
        'Rentang Ukuran: Pipih 4mm - 35mm, Bulat Ø 1.5mm - 12mm',
        'Tenun Jacquard 3D terkomputerisasi sesuai file CAD',
        'Tingkat cacat di bawah 0,05%'
      ] : [
        'Công suất dệt: 500.000 mét dây/ngày',
        'Khả năng dệt: Bản dẹt 4mm - 35mm, bản tròn Ø 1.5mm - 12mm',
        'Dệt Jacquard chữ nổi, hoa văn 3D vi tính chuẩn thiết kế CAD',
        'Tỷ lệ phế phẩm kiểm định dưới 0.05%'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'dyeing',
      title: language === 'en' ? 'Dyeing & Surface Finishing' : language === 'id' ? 'Pencelupan Serat & Finishing Permukaan' : 'Phân Xưởng Nhuộm Sợi & Hoàn Tất Bề Mặt',
      subtitle: language === 'en' ? 'Pantone Matching & DWR Waterproofing' : language === 'id' ? 'Standar Pantone & Lapisan Tahan Air DWR' : 'Chuẩn Màu Pantone Quốc Tế & Chống Thấm DWR',
      desc: language === 'en'
        ? 'High-pressure closed-vessel dyeing line with Class A wastewater treatment. Eco-friendly bio dyes free from harmful Azo chemicals and Formaldehyde.'
        : language === 'id'
        ? 'Lini pencelupan bertekanan tinggi dengan pengolahan limbah Kelas A. Pewarna ramah lingkungan bebas bahan kimia berbahaya Azo dan Formalin.'
        : 'Dây chuyền nhuộm cao áp khép kín với hệ thống xử lý nước thải chuẩn A KCN Sóng Thần 3. Thuốc nhuộm thân thiện môi trường, không chứa chất độc hại Azo hay Formaldehyde.',
      specs: language === 'en' ? [
        'Dry/wet rub fastness Grade 4-5 (ISO 105-X12)',
        'Spectrophotometer color accuracy Delta E < 0.8',
        'Heat-set anti-pilling and DWR water-repellent coating',
        'Lab dip sample turnaround: 24 - 48 hours'
      ] : language === 'id' ? [
        'Ketahanan luntur gesek kering/basah Tingkat 4-5',
        'Akurasi warna spektrofotometer Delta E < 0,8',
        'Perlakuan panas anti-pilling & lapisan hidrofobik DWR',
        'Waktu pembuatan sampel lab dip: 24 - 48 jam'
      ] : [
        'Độ bền màu ma sát khô/ướt đạt cấp 4-5 (ISO 105-X12)',
        'Khả năng phối màu chuẩn sai số Delta E < 0.8',
        'Xử lý gia nhiệt chống xù lông và phủ nano chống thấm nước DWR',
        'Thời gian ra mẫu lab dip màu: 24 - 48 giờ'
      ],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'tipping',
      title: language === 'en' ? 'Aglet Tipping & Packaging' : language === 'id' ? 'Pemasangan Aglet & Pengemasan' : 'Phân Xưởng Bấm Đầu Tipping & Đóng Gói',
      subtitle: language === 'en' ? 'Acetate Film, Metal Aglets & Silicone Dip' : language === 'id' ? 'Film Asetat, Aglet Logam & Celup Silikon' : 'Bấm Màng Acetate, Đầu Kim Loại & Silicon',
      desc: language === 'en'
        ? 'Equipped with 35 high-capacity automated tipping presses. Providing complete fashion aglet solutions: clear acetate heat-shrink, PVD coated laser-engraved metal, and silicone dipping.'
        : language === 'id'
        ? 'Dilengkapi 35 mesin tipping otomatis berkecepatan tinggi. Solusi aglet lengkap: plastik asetat susut panas, logam berlapis PVD ukir laser, dan ujung silikon.'
        : 'Trang bị 35 máy dập đầu tự động năng suất cao. Cung cấp đầy đủ các giải pháp aglet thời trang: bọc màng nhựa co nhiệt acetate trong suốt, bấm đầu hợp kim mạ PVD khắc laser logo và nhúng đầu silicon dẻo.',
      specs: language === 'en' ? [
        'Tipping capacity: 250,000 pairs / day',
        'Aglet pull-off tensile retention > 80 Newton',
        'Micro-precision laser brand logo engraving',
        'Spool packaging, roll bundles, or blister OEM cards'
      ] : language === 'id' ? [
        'Kapasitas pemasangan aglet: 250.000 pasang / hari',
        'Kekuatan tarik aglet melebihi 80 Newton',
        'Ukiran logo laser presisi tinggi',
        'Kemasan gulungan spool, ikatan atau blister OEM'
      ] : [
        'Năng suất bấm đầu: 250.000 cặp dây/ngày',
        'Lực kéo tuột đầu bấm thử nghiệm > 80 Newton',
        'Khắc laser logo thương hiệu sắc nét vi mô',
        'Đóng gói cuộn spool, bó cuộn hoặc ép vỉ barcode OEM'
      ],
      image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'lab',
      title: language === 'en' ? 'QA/QC Physical Testing Lab' : language === 'id' ? 'Laboratorium Pengujian QA/QC' : 'Phòng Thí Nghiệm & Kiểm Định Chất Lượng (QA/QC Lab)',
      subtitle: language === 'en' ? 'ISO 9001:2015 & OEKO-TEX Standard 100' : language === 'id' ? 'Standar ISO 9001:2015 & OEKO-TEX Standard 100' : 'Đạt Chuẩn ISO 9001:2015 & Oeko-Tex Standard 100',
      desc: language === 'en'
        ? 'Independent QA lab controlling quality from yarn intake to export dispatch. Equipped with Instron tensile testers, Martindale/Crockmeter abrasion testers, and D65/TL84 light booths.'
        : language === 'id'
        ? 'Lab QA independen mengontrol kualitas dari bahan baku hingga barang siap kirim. Dilengkapi mesin uji tarik Instron, uji abrasi Crockmeter, dan bilik cahaya D65/TL84.'
        : 'Phòng Lab độc lập kiểm soát chất lượng từ sợi đầu vào đến thành phẩm xuất xưởng. Trang bị máy đo lực kéo đứt điện tử Instron, máy kiểm tra độ bền màu ma sát Crockmeter và buồng tủ so màu tiêu chuẩn D65/TL84.',
      specs: language === 'en' ? [
        'Tensile breaking load tests up to 500 Newton',
        'Heavy metals, phthalates, and formaldehyde screening',
        'Official CO, CQ, and batch Test Reports issued',
        'Compliant with EU REACH and US CPSIA regulations'
      ] : language === 'id' ? [
        'Uji beban tarik putus hingga 500 Newton',
        'Pemeriksaan timbal, ftalat, dan formalin',
        'Penerbitan sertifikat resmi CO, CQ, dan Laporan Uji',
        'Sesuai dengan regulasi ekspor EU REACH dan US CPSIA'
      ] : [
        'Kiểm tra lực kéo đứt chịu tải lên đến 500 Newton',
        'Kiểm định nồng độ chì, cadmi, phthalates và formaldehyde',
        'Cấp biên bản nghiệm thu CO, CQ và Test Report cho từng lô hàng',
        'Tuân thủ quy chuẩn xuất khẩu REACH (EU) và CPSIA (Hoa Kỳ)'
      ],
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const currentTab = workshops.find((w) => w.id === activeTab) || workshops[0];

  return (
    <div className="bg-white text-zinc-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="text-left space-y-2 mb-14 pb-6 border-b border-zinc-200">
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block">
            {language === 'en' ? 'Company Profile • Lien Chau Vietnam' : language === 'id' ? 'Profil Perusahaan • Lien Chau Vietnam' : 'Hồ Sơ Doanh Nghiệp • Liên Châu Vietnam'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-900">
            {language === 'en' ? '16 Years Accompanying Global Footwear Industry' : language === 'id' ? '16 Tahun Mendampingi Industri Alas Kaki Global' : '16 Năm Đồng Hành Cùng Ngành Da Giày Toàn Cầu'}
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {language === 'en'
              ? 'Established in 2010 in the Song Than 3 Industrial Zone, Binh Duong, Lien Chau Textile Manufacturing Joint Stock Company has developed into a premier shoelace, webbing, elastic tape, and drawstring manufacturing partner for over 650 global brands and OEM factories.'
              : language === 'id'
              ? 'Didirikan pada tahun 2010 di Kawasan Industri Song Than 3, Binh Duong, Lien Chau Co., Ltd. telah berkembang menjadi mitra manufaktur tali sepatu, pita anyam, tali elastis, dan tali serut terpercaya bagi lebih dari 650 merek global dan pabrik OEM.'
              : 'Thành lập từ năm 2010 tại trung tâm công nghiệp dệt may Bình Dương, Công ty Cổ phần Sản xuất Dệt Liên Châu đã phát triển thành nhà máy sản xuất phụ liệu dây giày, webbing, dây thun và dây luồn uy tín hàng đầu cho hơn 650 thương hiệu và tập đoàn giày quốc tế.'}
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 text-left">
          <div className="p-6 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-all rounded-sm shadow-xs">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-700 font-mono tracking-tight mb-1">
              16+ <span className="text-base text-zinc-500 font-normal">{language === 'en' ? 'Years' : language === 'id' ? 'Tahun' : 'Năm'}</span>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-1">
              {t.about.stat1}
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono">
              {language === 'en' ? 'Established since 2010' : language === 'id' ? 'Didirikan sejak 2010' : 'Thành lập từ năm 2010'}
            </p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-all rounded-sm shadow-xs">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-700 font-mono tracking-tight mb-1">
              15M+ <span className="text-base text-zinc-500 font-normal">m</span>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-1">
              {t.about.stat2}
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono">
              {language === 'en' ? '250+ automated looms' : language === 'id' ? '250+ mesin beroperasi' : '250+ máy dệt đan vận hành'}
            </p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-all rounded-sm shadow-xs">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-700 font-mono tracking-tight mb-1">
              650+
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-1">
              {t.about.stat3}
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono">
              {language === 'en' ? 'Exporting to 48 nations' : language === 'id' ? 'Ekspor ke 48 negara' : 'Xuất khẩu 48 thị trường'}
            </p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-all rounded-sm shadow-xs">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-700 font-mono tracking-tight mb-1">
              99.8%
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-1">
              {t.about.stat4}
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono">
              {language === 'en' ? 'ISO 9001:2015 certified' : language === 'id' ? 'Standar ISO 9001:2015' : 'Kiểm soát KCS nghiêm ngặt'}
            </p>
          </div>
        </div>

        {/* Story & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left mb-24">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest">
              {language === 'en' ? 'History & Mission' : language === 'id' ? 'Sejarah & Misi' : 'Lịch Sử & Sứ Mệnh'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-zinc-900">
              {language === 'en' ? 'Crafting Perfect Trims from Every Fiber' : language === 'id' ? 'Menciptakan Aksesori Sempurna dari Setiap Helai Benang' : 'Kiến Tạo Phụ Liệu Hoàn Hảo Từ Từng Sợi Dệt'}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              <p>
                {language === 'en'
                  ? 'Starting from a small workshop with 20 manual weaving heads, Lien Chau has continuously reinvested in cutting-edge machinery. Today, our factory in Song Than 3 Industrial Zone covers over 5,000m² with 250+ fully automated looms.'
                  : language === 'id'
                  ? 'Bermula dari bengkel kecil dengan 20 mesin tenun manual, Lien Chau terus berinvestasi pada mesin mutakhir. Kini pabrik kami di Kawasan Industri Song Than 3 berdiri seluas lebih dari 5.000m² dengan lebih dari 250 mesin otomatis.'
                  : 'Khởi đầu từ một xưởng dệt đan quy mô nhỏ với 20 đầu máy dệt thủ công, Liên Châu không ngừng tái đầu tư công nghệ hiện đại. Đến nay, nhà máy của chúng tôi tại KCN Sóng Thần 3 đã sở hữu diện tích hơn 5.000m² cùng hơn 250 thiết bị tự động hóa hoàn toàn.'}
              </p>
              <p>
                {language === 'en'
                  ? 'Our mission is to provide garment and footwear trim solutions meeting global export standards at direct manufacturer prices, helping OEM partners accelerate product development and strengthen competitiveness.'
                  : language === 'id'
                  ? 'Misi kami adalah menyediakan solusi aksesori pakaian dan alas kaki berstandar ekspor global dengan harga produsen langsung, membantu mitra OEM mempercepat siklus produk dan meningkatkan daya saing.'
                  : 'Sứ mệnh của Liên Châu là cung cấp giải pháp phụ liệu may mặc và da giày đạt chuẩn chất lượng xuất khẩu thế giới với chi phí trực tiếp tận gốc xưởng, hỗ trợ các đối tác rút ngắn chu kỳ phát triển sản phẩm mới và nâng cao năng lực cạnh tranh toàn cầu.'}
              </p>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-bold text-zinc-800 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'en' ? 'ISO 9001 Certified Factory' : language === 'id' ? 'Pabrik Bersertifikasi ISO 9001' : 'Nhà máy đạt chuẩn ISO 9001'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Oeko-Tex Standard 100 Class 1</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'en' ? 'GRS Recycled Certified' : language === 'id' ? 'Sertifikasi Daur Ulang GRS' : 'Chứng nhận GRS tái chế'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'en' ? 'Export to 48+ Nations' : language === 'id' ? 'Ekspor ke 48+ Negara' : 'Xuất khẩu 48+ quốc gia'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden aspect-[4/3] border border-zinc-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                alt="Nhà xưởng Liên Châu Sóng Thần 3"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-sm border border-zinc-200 text-left rounded-sm">
                <p className="text-xs font-bold uppercase text-zinc-900">
                  {language === 'en' ? 'Lien Chau Plant • Song Than 3 IP, Binh Duong' : language === 'id' ? 'Pabrik Lien Chau • KI Song Than 3, Binh Duong' : 'Nhà Máy Liên Châu • KCN Sóng Thần 3, Bình Dương'}
                </p>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  {language === 'en' ? '5,000m² Scale • 250+ Automated Braiders • 15 Million Meters/Month' : language === 'id' ? 'Kapasitas 5.000m² • 250+ Mesin Tenun • 15 Juta Meter/Bulan' : 'Quy mô 5.000m² • 250+ Máy dệt kim tự động • 15 Triệu mét dây/tháng'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Workshop Showcase */}
        <div className="mb-24 text-left">
          <div className="text-left mb-6">
            <div className="inline-block mb-1">
              <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold tracking-widest uppercase font-mono rounded-sm">
                {language === 'en' ? 'Factory Infrastructure' : language === 'id' ? 'Infrastruktur Pabrik' : 'Hạ Tầng Công Nghệ'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-zinc-900">
              {language === 'en' ? 'Closed-Loop Manufacturing Workshops' : language === 'id' ? 'Sistem Fasilitas Produksi Terpadu' : 'Hệ Thống Phân Xưởng Sản Xuất Khép Kín'}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 mb-8 overflow-x-auto scrollbar-none">
            {workshops.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Active Tab Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 border border-zinc-200 p-6 sm:p-8 rounded-sm">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs text-emerald-700 font-mono font-bold uppercase">
                {currentTab.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900">
                {currentTab.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {currentTab.desc}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono">
                  {language === 'en' ? 'Technical Specifications & Standards:' : language === 'id' ? 'Spesifikasi & Standar Teknis:' : 'Thông số & Tiêu chuẩn kỹ thuật:'}
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-700">
                  {currentTab.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 overflow-hidden rounded-sm aspect-[16/10] border border-zinc-200 shadow-sm">
              <img
                src={currentTab.image}
                alt={currentTab.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* CTA Callout */}
        <div className="p-8 sm:p-10 bg-emerald-50/70 border border-emerald-200 text-left rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 uppercase tracking-tight">
              {language === 'en'
                ? 'Interested in visiting our factory or requesting free test swatches?'
                : language === 'id'
                ? 'Tertarik mengunjungi pabrik kami atau meminta sampel uji gratis?'
                : 'Quý khách có nhu cầu tham quan nhà máy hoặc yêu cầu mẫu test?'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600">
              {language === 'en'
                ? 'Lien Chau engineering specialists are always ready to welcome you at Song Than 3 Industrial Park, Binh Duong.'
                : language === 'id'
                ? 'Tim teknisi tekstil Lien Chau selalu siap menyambut Anda di KI Song Than 3, Binh Duong.'
                : 'Đội ngũ kỹ thuật dệt may của Liên Châu luôn sẵn sàng đón tiếp tại KCN Sóng Thần 3, Bình Dương.'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToProducts}
              className="px-5 py-2.5 bg-white border border-zinc-200 hover:border-emerald-500 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
            >
              {language === 'en' ? 'View Catalog' : language === 'id' ? 'Lihat Produk' : 'Xem Sản Phẩm'}
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm shadow-sm"
            >
              {t.nav.quote}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
