import React from 'react';
import { ProductionProcess } from '../components/ProductionProcess';
import { ShieldCheck, Award, Microscope, Gauge, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ProcessPageProps {
  onNavigateToContact: () => void;
  onNavigateToProducts: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({
  onNavigateToContact,
  onNavigateToProducts
}) => {
  const { t, language } = useLanguage();

  const labTests = [
    {
      name: language === 'en' ? 'Tensile Breaking Force Test' : language === 'id' ? 'Uji Kekuatan Tarik Putus' : 'Kiểm Tra Lực Kéo Đứt (Tensile Breaking Force)',
      standard: 'ASTM D2256 / ISO 2062',
      equipment: language === 'en' ? 'Instron 500N Universal Electromechanical Tester' : language === 'id' ? 'Mesin Uji Tarik Universal Instron 500N' : 'Máy kéo nén điện tử vạn năng Instron 500N',
      purpose: language === 'en'
        ? 'Ensures laces withstand heavy knot tension, extreme sports stress, and high-load trekking without snapping.'
        : language === 'id'
        ? 'Memastikan tali tidak putus saat ditarik kencang saat diikat atau saat mengalami tekanan olahraga berat.'
        : 'Đảm bảo dây không đứt khi người dùng xiết mạnh hoặc khi chịu áp lực vận động thể thao mạnh.'
    },
    {
      name: language === 'en' ? 'Color Fastness to Crocking Test' : language === 'id' ? 'Uji Ketahanan Luntur Warna Terhadap Gesekan' : 'Kiểm Tra Độ Bền Màu Ma Sát (Color Fastness to Crocking)',
      standard: 'AATCC 8 / ISO 105-X12',
      equipment: language === 'en' ? 'Electronic Crockmeter with Calibrated Pressure' : language === 'id' ? 'Alat Uji Crockmeter Elektronik Terkalibrasi' : 'Thiết bị ma sát kế Crockmeter điện tử',
      purpose: language === 'en'
        ? 'Verifies zero pigment transfer to white shoe canvas or suede leather under both dry and wet sweat conditions (Grade 4-5 achieved).'
        : language === 'id'
        ? 'Memverifikasi tidak adanya noda warna pada kain sepatu putih atau kulit suede dalam kondisi kering maupun basah keringat (mencapai Grade 4-5).'
        : 'Đánh giá mức độ thôi màu dây sang thân giày vải trắng hoặc da lộn trong cả điều kiện khô và ướt mồ hôi (đạt cấp 4-5).'
    },
    {
      name: language === 'en' ? 'Martindale Abrasion Resistance Test' : language === 'id' ? 'Uji Ketahanan Abrasi Martindale' : 'Kiểm Tra Kháng Mài Mòn (Abrasion Resistance)',
      standard: 'Martindale Tester / SATRA TM154',
      equipment: language === 'en' ? 'Multi-Directional Martindale Friction Machine' : language === 'id' ? 'Mesin Gesek Multi-Arah Martindale' : 'Máy thử nghiệm cọ xát đa hướng Martindale',
      purpose: language === 'en'
        ? 'Simulates 20,000 continuous abrasion friction cycles through metallic shoe eyelets without fraying or fuzzing.'
        : language === 'id'
        ? 'Mensimulasikan 20.000 siklus gesekan terus-menerus melalui lubang tali sepatu logam (eyelet) tanpa serat terurai.'
        : 'Mô phỏng 20.000 chu kỳ cọ xát liên tục qua lỗ xỏ khuy kim loại (Eyelet) mà không bị xơ xù sợi.'
    },
    {
      name: language === 'en' ? 'Hazardous Chemicals & Heavy Metals Screening' : language === 'id' ? 'Pemeriksaan Bahan Kimia Berbahaya & Logam Berat' : 'Kiểm Định Hóa Chất Độc Hại & Kim Loại Nặng',
      standard: 'OEKO-TEX Standard 100 Class 1 & REACH',
      equipment: language === 'en' ? 'Independent Gas Chromatography Mass Spectrometry (GC-MS)' : language === 'id' ? 'Spektrometri Massa Kromatografi Gas (GC-MS) Independen' : 'Hệ thống sắc ký khí khối phổ GC-MS độc lập',
      purpose: language === 'en'
        ? 'Certified 100% free of lead, mercury, cadmium, and formaldehyde, ensuring safety for direct skin contact and baby footwear.'
        : language === 'id'
        ? 'Tersertifikasi 100% bebas timbal, merkuri, kadmium, dan formalin, aman bersentuhan langsung dengan kulit.'
        : 'Chứng nhận 100% không phát hiện chì, thủy ngân, formaldehyde, an toàn tuyệt đối khi tiếp xúc với da.'
    }
  ];

  return (
    <div className="bg-white text-zinc-900 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="text-left space-y-2 mb-12 pb-6 border-b border-zinc-200">
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block">
            {language === 'en' ? 'Manufacturing Capabilities & Closed-Loop Workflow' : language === 'id' ? 'Kemampuan Manufaktur & Alur Kerja Terpadu' : 'Quy Trình & Năng Lực Sản Xuất Khép Kín'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-900">
            {language === 'en' ? 'International Standard ISO 9001 Production Pipeline' : language === 'id' ? 'Lini Produksi Standar Internasional ISO 9001' : 'Dây Chuyền Chế Tác Tiêu Chuẩn Quốc Tế ISO 9001'}
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {language === 'en'
              ? 'From virgin yarn batch inspection, high-speed computerized Jacquard braiding to high-pressure eco-dyeing, ultrasonic tipping, and 100% QA/QC pass before dispatch.'
              : language === 'id'
              ? 'Dari pemeriksaan serat murni, kepang Jacquard komputer berkecepatan tinggi, pencelupan ramah lingkungan, tipping ultrasonik, hingga uji QA/QC 100% sebelum pengiriman.'
              : 'Từ khâu tuyển chọn nguồn sợi nguyên sinh, dệt đan Jacquard vi tính tốc độ cao đến xử lý hoàn tất nhiệt và kiểm định KCS 100% trước khi xuất kho.'}
          </p>
        </div>

        {/* 6 Stages Interactive Component */}
        <div className="mb-20">
          <ProductionProcess />
        </div>

        {/* Quality Lab Testing Section */}
        <div className="mb-20 text-left">
          <div className="text-left mb-8">
            <div className="inline-block mb-1">
              <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold tracking-widest uppercase font-mono rounded-sm">
                {language === 'en' ? 'Quality Control QC / QA' : language === 'id' ? 'Kontrol Kualitas QC / QA' : 'Kiểm Soát Chất Lượng QC / QA'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-zinc-900">
              {language === 'en' ? 'Physical & Chemical Laboratory Testing System' : language === 'id' ? 'Sistem Pengujian Laboratorium Fisik & Kimia' : 'Hệ Thống Thử Nghiệm Cơ Lý Phòng Thí Nghiệm'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              {language === 'en'
                ? 'Every export shipment is accompanied by precise physical testing certificates and batch QA reports.'
                : language === 'id'
                ? 'Setiap pengiriman ekspor disertai sertifikat uji fisik yang akurat dan laporan QA batch.'
                : 'Mỗi lô hàng xuất xưởng đều đi kèm biên bản thử nghiệm cơ lý đo đạc chuẩn xác.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {labTests.map((test, idx) => (
              <div
                key={idx}
                className="p-6 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-all rounded-sm shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-white border border-zinc-200 text-emerald-800 font-mono text-[10px] font-bold uppercase rounded-sm">
                    {language === 'en' ? 'Standard: ' : language === 'id' ? 'Standar: ' : 'Tiêu chuẩn: '}{test.standard}
                  </span>
                  <Microscope className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900">
                  {test.name}
                </h3>
                <p className="text-xs text-zinc-500 font-mono">
                  <strong>{language === 'en' ? 'Equipment:' : language === 'id' ? 'Peralatan:' : 'Thiết bị:'}</strong> {test.equipment}
                </p>
                <p className="text-xs text-zinc-700 leading-relaxed pt-1">
                  {test.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead-time SLA Commitment */}
        <div className="mb-20 p-8 sm:p-10 bg-zinc-900 text-white rounded-sm text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-400 font-mono">
                {language === 'en' ? '24 Hours' : language === 'id' ? '24 Jam' : '24 Giờ'}
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                {language === 'en' ? 'Rapid Quotation' : language === 'id' ? 'Penawaran Cepat' : 'Báo Giá Nhanh'}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {language === 'en'
                  ? 'Our engineering team calculates yarn consumption, tipping specs, and returns a detailed quotation within 24 business hours.'
                  : language === 'id'
                  ? 'Tim teknik kami menghitung kebutuhan benang, spesifikasi tipping, dan mengirimkan penawaran harga rinci dalam 24 jam kerja.'
                  : 'Đội ngũ kỹ sư tính toán định mức sợi, công nghệ bấm đầu và gửi bảng báo giá chi tiết trong vòng 24 giờ làm việc.'}
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-400 font-mono">
                {language === 'en' ? '48 Hours' : language === 'id' ? '48 Jam' : '48 Giờ'}
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                {language === 'en' ? 'Prototype Swatches' : language === 'id' ? 'Pembuatan Sampel Cepat' : 'Phát Mẫu Thử Nghiệm'}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {language === 'en'
                  ? 'Our R&D lab produces physical lab dip swatches, executes aglet tipping, and dispatches directly to your office for approval.'
                  : language === 'id'
                  ? 'Lab R&D kami memproduksi sampel fisik lab dip, memasang aglet, dan mengirimkannya langsung ke kantor Anda untuk disetujui.'
                  : 'Xưởng dệt R&D chạy mẫu lab dip thực tế, bấm đầu tipping và gửi phát nhanh tận văn phòng đối tác để kiểm duyệt.'}
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-400 font-mono">
                {language === 'en' ? '7 - 10 Days' : language === 'id' ? '7 - 10 Hari' : '7 - 10 Ngày'}
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                {language === 'en' ? 'Mass Production Dispatch' : language === 'id' ? 'Pengiriman Produksi Massal' : 'Sản Xuất Đơn Hàng Lớn'}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {language === 'en'
                  ? 'With a monthly output of 15 million meters, we guarantee on-time delivery for high-volume urgent export purchase orders.'
                  : language === 'id'
                  ? 'Dengan kapasitas 15 juta meter per bulan, kami menjamin pengiriman tepat waktu untuk pesanan ekspor volume besar yang mendesak.'
                  : 'Với công suất 15 triệu mét/tháng, chúng tôi cam kết tiến độ giao hàng đúng hẹn cho các đơn hàng xuất khẩu gấp.'}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Callout */}
        <div className="p-8 bg-emerald-50/70 border border-emerald-200 text-left rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">
              {language === 'en'
                ? 'Need to send physical samples or custom weaving technical drawings?'
                : language === 'id'
                ? 'Perlu mengirim sampel fisik atau gambar teknis tenun kustom?'
                : 'Cần gửi mẫu dây gốc hoặc bản vẽ kỹ thuật dệt riêng?'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600">
              {language === 'en'
                ? 'Lien Chau provides complimentary weave density analysis and sample quotes for footwear and garment factories.'
                : language === 'id'
                ? 'Lien Chau menyediakan analisis struktur tenun dan penawaran sampel gratis untuk pabrik alas kaki dan pakaian.'
                : 'Liên Châu nhận phân tích cấu trúc dệt và báo giá mẫu hoàn toàn miễn phí cho các xưởng da giày và may mặc.'}
            </p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm shadow-sm whitespace-nowrap shrink-0"
          >
            {language === 'en' ? 'Request Sample & Quote' : language === 'id' ? 'Minta Sampel & Harga' : 'Yêu Cầu Mẫu & Báo Giá'}
          </button>
        </div>

      </div>
    </div>
  );
};
