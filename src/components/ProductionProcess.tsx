import React, { useState } from 'react';
import { PRODUCTION_STEPS } from '../data/mockData';
import { 
  PackageCheck, 
  Boxes, 
  Palette, 
  Scissors, 
  ShieldCheck, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Cpu
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const STEP_ICONS: { [key: string]: React.ElementType } = {
  PackageCheck,
  Boxes,
  Palette,
  Scissors,
  ShieldCheck,
  Truck
};

export const ProductionProcess: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  // Multilingual steps
  const localizedSteps = [
    {
      step: 1,
      title: language === 'en' ? 'Fiber Raw Material Selection' : language === 'id' ? 'Pemilihan Bahan Baku Serat' : 'Tuyển Chọn Nguyên Liệu Sợi',
      subtitle: language === 'en' ? 'Virgin fibers & certified RPET' : language === 'id' ? 'Serat murni & RPET bersertifikasi' : 'Nguồn sợi nguyên sinh & tái chế RPET chuẩn quốc tế',
      description: language === 'en'
        ? 'Rigorous testing of high-tenacity polyester, combed Egyptian cotton, and Kevlar fibers. Testing yarn denier, uniformity, and initial elongation before production staging.'
        : language === 'id'
        ? 'Pengujian ketat serat poliester berkekuatan tinggi, katun Mesir combed, dan Kevlar. Pemeriksaan denier benang, keseragaman, dan kekuatan tarik sebelum masuk lini produksi.'
        : 'Nhập khẩu và kiểm định chất lượng sợi Polyester cường lực cao, sợi Cotton Ai Cập chải kỹ, và sợi dù Kevlar. Kiểm tra độ đều sợi, chỉ số sợi (denier) và độ bền kéo trước khi đưa vào chuyền.',
      details: language === 'en' ? [
        'Initial elongation and tensile break testing',
        'Yarn batch preparation per core/sheath ratio',
        '100% free of hazardous chemicals (OEKO-TEX)'
      ] : language === 'id' ? [
        'Uji perpanjangan awal dan kekuatan putus benang',
        'Persiapan batch benang sesuai rasio inti/selubung',
        '100% bebas bahan kimia berbahaya (OEKO-TEX)'
      ] : [
        'Kiểm tra độ giãn dài và lực đứt sợi ban đầu',
        'Chuẩn bị bảng sợi theo tỉ lệ cấu trúc ruột/vỏ',
        'Đảm bảo 100% sợi không chứa hóa chất độc hại Oeko-Tex'
      ],
      machinery: language === 'en' ? 'Electronic Yarn Evenness Tester & Optical Lab' : language === 'id' ? 'Alat Uji Kerataan Benang Elektronik & Lab Optik' : 'Máy đo độ đều sợi điện tử & Phòng lab sợi quang học',
      duration: language === 'en' ? '1 - 2 Hours / Lot' : language === 'id' ? '1 - 2 Jam / Batch' : '1 - 2 Giờ / Lô',
      iconName: 'PackageCheck'
    },
    {
      step: 2,
      title: language === 'en' ? 'High-Speed Weaving & Braiding' : language === 'id' ? 'Penyiapan & Tenun Kecepatan Tinggi' : 'Dệt & Đan Tốc Độ Cao',
      subtitle: language === 'en' ? 'Automated 16 to 48 carrier braider fleet' : language === 'id' ? 'Armada mesin kepang otomatis 16 - 48 gelendong' : 'Hệ thống máy đan dệt kim 16 - 48 đầu tự động hóa',
      description: language === 'en'
        ? 'High-speed automated braiding creating herringbone flat laces, multi-core round cords, or complex Jacquard patterns with tight knit density.'
        : language === 'id'
        ? 'Kepang otomatis berkecepatan tinggi menghasilkan tali pipih herringbone, tali bulat inti ganda, atau motif Jacquard yang rapat.'
        : 'Hệ thống dàn máy đan dệt hiện đại tạo ra cấu trúc dây dẹt xương cá, dây tròn lõi xoắn hoặc dây dệt jacquard hoa văn phức tạp. Mật độ đan sợi chặt chẽ tạo cảm giác đầm tay và chống sờn.',
      details: language === 'en' ? [
        '32-carrier & 48-carrier multi-directional braiding',
        'Optical stop-motion sensors detect yarn snap instantly',
        'Consistent tension control avoiding diameter variance'
      ] : language === 'id' ? [
        'Kepang multi-arah 32 & 48 gelendong otomatis',
        'Sensor optik berhenti seketika jika benang putus',
        'Kontrol tegangan konstan mencegah perbedaan ketebalan'
      ] : [
        'Công nghệ đan tròn 32 thoi & 48 thoi đa hướng',
        'Cảm biến quang học tự dừng máy khi phát hiện lỗi đứt sợi',
        'Kiểm soát độ căng đồng đều chống biến dạng đường kính'
      ],
      machinery: language === 'en' ? '250 Automated Looms (Germany & Taiwan)' : language === 'id' ? '250 Alat Tenun Otomatis (Jerman & Taiwan)' : '250+ Dàn máy dệt tự động (Đức & Đài Loan)',
      duration: language === 'en' ? 'Continuous 24/7' : language === 'id' ? 'Operasi 24/7' : 'Vận hành 24/7',
      iconName: 'Boxes'
    },
    {
      step: 3,
      title: language === 'en' ? 'High-Pressure Eco Dyeing' : language === 'id' ? 'Pencelupan Warna Bertekanan Tinggi' : 'Nhuộm Màu Cao Áp Khép Kín',
      subtitle: language === 'en' ? 'Pantone Matching & Grade 4.5 Fastness' : language === 'id' ? 'Pencocokan Pantone & Ketahanan Luntur Tingkat 4.5' : 'Chuẩn màu Pantone & AATCC Cấp 4.5',
      description: language === 'en'
        ? 'High-temperature, high-pressure closed-vessel dyeing. Pigment molecules lock into fibers, resisting washing abrasion and sweat without bleeding.'
        : language === 'id'
        ? 'Pencelupan bejana tertutup suhu dan tekanan tinggi. Molekul pewarna meresap kuat ke serat, tahan luntur saat dicuci dan terkena keringat.'
        : 'Nhuộm áp suất cao trong buồng kín khép kín. Hạt màu thấm sâu vào từng tao sợi polyester/cotton, chịu được ma sát giặt và mồ hôi chân mà không phai màu.',
      details: language === 'en' ? [
        'Spectrophotometer color tolerance Delta E < 0.8',
        'Dry/Wet rub fastness Grade 4.5 - 5 (ISO 105-X12)',
        'Eco-friendly non-azo bio dyes (ZDHC certified)'
      ] : language === 'id' ? [
        'Toleransi warna spektrofotometer Delta E < 0.8',
        'Ketahanan gesek kering/basah Tingkat 4.5 - 5',
        'Pewarna ramah lingkungan bebas azo (sertifikasi ZDHC)'
      ] : [
        'Độ bền màu ma sát khô/ướt Cấp 4.5 - 5 (ISO 105-X12)',
        'Dung sai màu sắc quang học Delta E < 0.8',
        'Thuốc nhuộm sinh học ZDHC thân thiện môi trường'
      ],
      machinery: language === 'en' ? 'High-Pressure Dye Vat & D65 Light Booth' : language === 'id' ? 'Bejana Celup Tekanan Tinggi & Kotak Lampu D65' : 'Hệ thống nồi nhuộm cao áp & Buồng so màu D65',
      duration: language === 'en' ? '4 - 6 Hours / Batch' : language === 'id' ? '4 - 6 Jam / Batch' : '4 - 6 Giờ / Mẻ',
      iconName: 'Palette'
    },
    {
      step: 4,
      title: language === 'en' ? 'Precision Cutting & Aglet Tipping' : language === 'id' ? 'Pemotongan Presisi & Tipping Aglet' : 'Cắt Dây & Bấm Đầu Aglet',
      subtitle: language === 'en' ? 'Ultrasonic cut & hydraulic tipping press' : language === 'id' ? 'Potong ultrasonik & pasang aglet hidrolik' : 'Cắt siêu âm & dập đầu kim loại / màng co',
      description: language === 'en'
        ? 'Ultrasonic precision cutting to exact millimeter lengths without fraying, followed by hydraulic pressing of SUS304 steel, brass aglets, or acetate tipping.'
        : language === 'id'
        ? 'Pemotongan presisi ultrasonik hingga milimeter tanpa serat terurai, diikuti pemasangan aglet baja SUS304, kuningan, atau asetat secara hidrolik.'
        : 'Cắt dây bằng sóng siêu âm không để lại ba via xơ chỉ, sau đó bấm đầu aglet kim loại inox 304, đồng thau hoặc màng nhựa acetate theo kích thước chỉ định.',
      details: language === 'en' ? [
        'Length tolerance within ± 2.0mm',
        'Aglet pull-off retention force exceeds 80N',
        'Optional 1064nm fiber laser logo engraving'
      ] : language === 'id' ? [
        'Toleransi panjang sangat presisi ± 2.0mm',
        'Kekuatan cengkeram aglet melebihi 80 Newton',
        'Pilihan ukiran logo laser fiber 1064nm'
      ] : [
        'Dung sai chiều dài cực chuẩn trong mức ± 2.0mm',
        'Lực kẹp giữ đầu bấm đạt chuẩn trên 80 Newton',
        'Tùy chọn khắc laser logo fiber sắc nét'
      ],
      machinery: language === 'en' ? 'Automatic Aglet Tipping Machine & Ultrasonic Cutters' : language === 'id' ? 'Mesin Tipping Aglet Otomatis & Pemotong Ultrasonik' : 'Máy bấm đầu tự động & Cụm cắt siêu âm',
      duration: language === 'en' ? '250,000 Pairs / Day' : language === 'id' ? '250.000 Pasang / Hari' : '250.000 Cặp / Ngày',
      iconName: 'Scissors'
    },
    {
      step: 5,
      title: language === 'en' ? 'QA/QC Tensile & Friction Lab Testing' : language === 'id' ? 'Pengujian Laboratorium QA/QC' : 'Kiểm Định Cơ Lý Phòng Lab QA/QC',
      subtitle: language === 'en' ? 'Instron 500N tensile pull & Martindale test' : language === 'id' ? 'Uji tarik Instron 500N & abrasi Martindale' : 'Đo lực kéo đứt Instron & mài mòn SATRA',
      description: language === 'en'
        ? 'Independent testing on Instron pull testers, Martindale 20,000-cycle abrasion machines, and heavy environmental salt spray chambers.'
        : language === 'id'
        ? 'Pengujian independen pada mesin uji tarik Instron, mesin uji ketahanan abrasi 20.000 siklus, dan uji semprot garam.'
        : 'Lấy mẫu ngẫu nhiên đo lực kéo đứt trên máy Instron, kiểm tra độ mài mòn 20.000 chu kỳ SATRA và kiểm định độ bền nhiệt độ cao.',
      details: language === 'en' ? [
        'Breaking load verified against shoe brand standards',
        'Full test certificates (CO, CQ, Lab Report) issued',
        'Retain control samples for 12 months'
      ] : language === 'id' ? [
        'Beban putus diverifikasi sesuai standar merek alas kaki',
        'Penerbitan sertifikat uji lengkap (CO, CQ, Lab Report)',
        'Penyimpanan sampel kontrol selama 12 bulan'
      ] : [
        'Nghiệm thu lực kéo đứt đạt chuẩn nhãn hàng',
        'Cấp chứng thư CO, CQ và Test Report cho lô hàng',
        'Lưu mẫu đối chứng trong kho lưu trữ 12 tháng'
      ],
      machinery: language === 'en' ? 'Instron Tensile Tester & Martindale Abrasion Machine' : language === 'id' ? 'Mesin Uji Tarik Instron & Mesin Abrasi Martindale' : 'Máy đo lực kéo đứt Instron & Máy mài mòn Martindale',
      duration: language === 'en' ? 'Batch Sample Pass' : language === 'id' ? 'Lulus Uji Batch' : 'Theo Lô Nghiệm Thu',
      iconName: 'ShieldCheck'
    },
    {
      step: 6,
      title: language === 'en' ? 'Anti-Moisture Packaging & Global Logistics' : language === 'id' ? 'Pengemasan Anti Lembap & Pengiriman' : 'Đóng Gói Chống Ẩm & Xuất Xưởng',
      subtitle: language === 'en' ? 'Barcoded bundles, silica gel & 5-ply cartons' : language === 'id' ? 'Kemasan bersegel, desikan silika & karton 5 lapis' : 'Đóng bó mã vạch, gói hút ẩm & thùng 5 lớp',
      description: language === 'en'
        ? 'Pairs bundled neatly with individual barcodes, packed with food-grade silica desiccant, sealed in export 5-ply cartons with moisture barriers.'
        : language === 'id'
        ? 'Setiap pasang diikat rapi dengan barcode terpisah, diberi silica gel anti lembap, dan dikemas dalam karton ekspor 5 lapis.'
        : 'Dây được buộc bó cuộn tròn hoặc xếp thẳng gọn gàng, gắn tem mã vạch barcode truy xuất nguồn gốc, hút ẩm và đóng thùng carton 5 lớp chống ẩm mốc khi vận chuyển đường biển.',
      details: language === 'en' ? [
        'GS1 barcode stickers for warehouse scanning',
        'Heavy-duty PE moisture-barrier inner lining',
        'Express door-to-door delivery across domestic & global ports'
      ] : language === 'id' ? [
        'Label barcode GS1 untuk pemindaian pergudangan',
        'Lapisan dalam PE kedap udara tahan lembap',
        'Pengiriman cepat ke pelabuhan dan pabrik OEM mitra'
      ] : [
        'Dán tem barcode quét mã kho vận thông minh',
        'Bọc nilon PE chống thấm nước và hơi ẩm biển',
        'Giao hàng tận kho xưởng tại VN hoặc ra cảng quốc tế'
      ],
      machinery: language === 'en' ? 'Automated Strapping & Heat-Sealing Packaging Line' : language === 'id' ? 'Lini Pengemasan & Penyegelan Panas Otomatis' : 'Dây chuyền quấn màng co & đóng đai tự động',
      duration: language === 'en' ? '24 - 48 Hours Dispatch' : language === 'id' ? 'Kirim 24 - 48 Jam' : 'Giao 24 - 48 Giờ',
      iconName: 'Truck'
    }
  ];

  const currentStepData = localizedSteps.find((s) => s.step === activeStep) || localizedSteps[0];

  return (
    <section id="process" className="py-20 lg:py-24 bg-zinc-50 border-b border-zinc-200 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
              {t.processSec.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
              {t.processSec.title}
            </h2>
          </div>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-md leading-relaxed">
            {t.processSec.desc}
          </p>
        </div>

        {/* Stepper Pipeline Navigation (Desktop) */}
        <div className="hidden md:grid grid-cols-6 gap-2 mb-8 bg-zinc-50 p-2 border border-zinc-200 rounded-sm">
          {localizedSteps.map((step) => {
            const Icon = STEP_ICONS[step.iconName] || Boxes;
            const isSelected = activeStep === step.step;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`p-3 text-left transition-colors cursor-pointer rounded-sm border ${
                  isSelected
                    ? 'bg-white text-zinc-900 border-zinc-300 shadow-xs'
                    : 'bg-transparent text-zinc-600 border-transparent hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-700">
                    {language === 'en' ? `STAGE 0${step.step}` : language === 'id' ? `TAHAP 0${step.step}` : `GĐ 0${step.step}`}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-zinc-400'}`} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-tight line-clamp-1">
                  {step.title.split(' ')[0]} {step.title.split(' ')[1] || ''}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Panel */}
        <div className="p-6 sm:p-8 bg-white border border-zinc-200 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900 text-white rounded-xs">
                  {language === 'en' ? `Stage 0${currentStepData.step} / 06` : language === 'id' ? `Tahap 0${currentStepData.step} / 06` : `Giai đoạn 0${currentStepData.step} / 06`}
                </span>
                <span className="text-xs text-emerald-700 font-mono font-bold uppercase">
                  {currentStepData.subtitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900">
                {currentStepData.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Technical Specifications Checklist */}
              <div className="pt-2 space-y-2">
                <h4 className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider font-mono">
                  {language === 'en' ? 'Quality Control Parameters:' : language === 'id' ? 'Parameter Kontrol Kualitas:' : 'Quy Chuẩn Kiểm Soát Thông Số:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-mono">
                  {currentStepData.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed text-zinc-800">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Machine & Duration Box */}
            <div className="lg:col-span-4 p-5 bg-zinc-50 border border-zinc-200 space-y-4 rounded-sm">
              <div className="border-b border-zinc-200 pb-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  {language === 'en' ? 'Operating Machinery' : language === 'id' ? 'Mesin Operasional' : 'Thiết Bị Vận Hành'}
                </span>
                <p className="text-xs font-bold uppercase tracking-tight text-zinc-900 mt-1 font-mono">
                  {currentStepData.machinery}
                </p>
              </div>

              <div className="border-b border-zinc-200 pb-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  {language === 'en' ? 'Cycle Lead Time' : language === 'id' ? 'Waktu Siklus' : 'Thời Gian Chu Kỳ'}
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 font-mono mt-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentStepData.duration}</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveStep((prev) => (prev > 1 ? prev - 1 : 6))}
                  className="px-3.5 py-2 bg-white hover:bg-zinc-100 text-xs font-bold uppercase tracking-wider text-zinc-700 border border-zinc-200 transition-colors rounded-sm cursor-pointer"
                >
                  {language === 'en' ? '← Prev' : language === 'id' ? '← Sebelumnya' : '← Trước'}
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev < 6 ? prev + 1 : 1))}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors rounded-sm cursor-pointer shadow-xs"
                >
                  <span>{language === 'en' ? 'Next' : language === 'id' ? 'Selanjutnya' : 'Tiếp Theo'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="mt-6 space-y-2 md:hidden">
          {localizedSteps.map((step) => {
            const Icon = STEP_ICONS[step.iconName] || Boxes;
            const isSelected = activeStep === step.step;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`w-full p-3.5 text-left border rounded-sm transition-colors cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-tight">
                    {language === 'en' ? `Stage 0${step.step}: ` : language === 'id' ? `Tahap 0${step.step}: ` : `Giai đoạn 0${step.step}: `} {step.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">
                  {isSelected ? (language === 'en' ? 'Viewing' : language === 'id' ? 'Aktif' : 'Đang xem') : (language === 'en' ? 'Details' : language === 'id' ? 'Detail' : 'Chi tiết')}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
