import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, PhoneCall, Mail, MapPin, Calculator, FileCheck } from 'lucide-react';
import { QuoteFormData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

interface QuoteFormProps {
  initialProduct?: string;
  onSuccess?: () => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ initialProduct = '', onSuccess }) => {
  const { t, language } = useLanguage();
  const { addQuote } = useData();

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    productType: initialProduct || 'Dây Dẹt Thể Thao Sneaker Pro',
    quantity: '1000-5000',
    lengthOption: '120cm',
    agletType: 'Kim loại khắc Laser',
    notes: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [submittedRefCode, setSubmittedRefCode] = useState<string>('');

  React.useEffect(() => {
    if (initialProduct) {
      if (initialProduct.startsWith('Yêu cầu báo giá:')) {
        setFormData(prev => ({ ...prev, notes: initialProduct }));
      } else {
        setFormData(prev => ({ ...prev, productType: initialProduct }));
      }
    }
  }, [initialProduct]);

  const productOptions = [
    'SẢN PHẨM MỚI: Dây Dệt Jacquard ECO-RPET 2026',
    'SẢN PHẨM MỚI: Dây Luồn Dạ Quang NightGlow',
    'DÂY GIÀY: Dây Dẹt Thể Thao Sneaker Pro',
    'DÂY GIÀY: Dây Tròn Bện Gia Cường Hiking & Boots',
    'DÂY GIÀY: Dây Da Bò Sáp Waxed Cao Cấp',
    'DÂY GIÀY: Dây Dệt Phản Quang 3M Siêu Sáng',
    'WEBBING: Dây Đai Dệt High-Tenacity Poly Webbing',
    'WEBBING: Dây Đai Dệt Jacquard Logo & Hoa Văn',
    'DÂY THUN: Thun Bản Lưng Quần Dệt Thoi / Dệt Kim',
    'DÂY THUN: Thun Tròn Co Giãn Bungee Cord',
    'DÂY LUỒN: Dây Luồn Áo Hoodie & Quần Thể Thao Jogger',
    'DÂY LUỒN: Dây Luồn Kỹ Thuật Trượt Nước DWR Outdoor',
    'TIPPING: Gia Công Bấm Đầu Kim Loại Khắc Laser & Mạ PVD',
    'TIPPING: Bấm Đầu Silicon Nhúng Dẻo & Màng Co Acetate',
    'FW25: Dây Giày Vintage Tone Đất FW25',
    'FW25: Dây Luồn & Đai Webbing Dual-Tone FW25',
    language === 'en' ? 'Custom / According to Buyer Spec Sheet' : language === 'id' ? 'Kustom / Sesuai Lembar Spesifikasi Pembeli' : 'Khác (Sản xuất theo mẫu hoặc bản vẽ riêng)'
  ];

  const quantityOptions = [
    { 
      label: language === 'en' ? '500 - 1,000 pairs (Sampling & Trial Batch)' : language === 'id' ? '500 - 1.000 pasang (Uji Coba & Sampel)' : '500 - 1,000 cặp (Đơn hàng thử nghiệm)', 
      value: '500-1000' 
    },
    { 
      label: language === 'en' ? '1,000 - 5,000 pairs (Mid-volume Production)' : language === 'id' ? '1.000 - 5.000 pasang (Produksi Menengah)' : '1,000 - 5,000 cặp (Quy mô vừa)', 
      value: '1000-5000' 
    },
    { 
      label: language === 'en' ? '5,000 - 20,000 pairs (High volume - 15% discount)' : language === 'id' ? '5.000 - 20.000 pasang (Volume Besar - Diskon 15%)' : '5,000 - 20,000 cặp (Quy mô lớn - Giảm 15%)', 
      value: '5000-20000' 
    },
    { 
      label: language === 'en' ? '> 20,000 pairs (Distributor & Export - Factory Direct Cost)' : language === 'id' ? '> 20.000 pasang (Distributor & Ekspor - Harga Pabrik)' : '> 20,000 cặp (Đại lý & Xuất khẩu - Giá gốc xưởng)', 
      value: '20000+' 
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) return;

    setStatus('loading');

    setTimeout(() => {
      const code = 'LC-' + Math.floor(100000 + Math.random() * 900000);
      addQuote({
        ...formData,
        refCode: code
      });
      setSubmittedRefCode(code);
      setStatus('success');
      if (onSuccess) onSuccess();
    }, 700);
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      productType: 'Dây Dẹt Thể Thao Sneaker Pro',
      quantity: '1000-5000',
      lengthOption: '120cm',
      agletType: 'Kim loại khắc Laser',
      notes: ''
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-white border-b border-zinc-200 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
              {language === 'en' ? 'B2B Quotation & Lab Dip Swatches' : language === 'id' ? 'Penawaran B2B & Sampel Lab Dip' : 'Báo Giá & Cung Cấp Mẫu Thử Nghiệm'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
              {language === 'en' ? 'Request Manufacturing Quote & Lab Dip Samples' : language === 'id' ? 'Minta Penawaran Produksi & Sampel Lab Dip' : 'Yêu Cầu Báo Giá Sản Xuất & Nhận Mẫu Lab Dip'}
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
              {language === 'en'
                ? 'Submit technical specifications for customized weaving. Lien Chau engineers will calculate cost sheets and dispatch physical swatches within 24 hours.'
                : language === 'id'
                ? 'Masukkan parameter spesifikasi rajut Anda. Tim insinyur tekstil Lien Chau akan menghitung lembar biaya dan mengirimkan paket sampel fisik dalam 24 jam.'
                : 'Điền thông số quy cách dệt đan cần gia công. Đội ngũ kỹ sư dệt may Liên Châu sẽ gửi bảng tính chi phí và gửi bưu kiện mẫu thực tế trong vòng 24 giờ.'}
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-600 shrink-0">
            <span className="inline-block p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
              {language === 'en' ? 'SLA Response:' : language === 'id' ? 'SLA Respons:' : 'SLA Phản hồi:'} <strong className="text-zinc-900">{language === 'en' ? 'Within 24 working hours' : language === 'id' ? 'Dalam 24 jam kerja' : 'Dưới 24 giờ làm việc'}</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Factory Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-zinc-50 border border-zinc-200 space-y-6 rounded-sm">
              <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900 font-mono">
                {language === 'en' ? 'OEM / ODM Project Onboarding Department' : language === 'id' ? 'Departemen Penerimaan Proyek OEM / ODM' : 'Bộ Phận Tiếp Nhận Dự Án OEM / ODM'}
              </h3>

              <div className="space-y-4 text-xs text-zinc-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white text-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200 rounded-xs">
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block font-mono uppercase tracking-wider font-bold">
                      {language === 'en' ? 'Direct Factory Line' : language === 'id' ? 'Telepon Langsung Pabrik' : 'Điện Thoại Nhà Máy'}
                    </span>
                    <a href="tel:+842743782444" className="font-bold text-zinc-900 hover:text-emerald-700 text-sm font-mono">
                      +84 274 378 2444 ({language === 'en' ? 'Sales Division' : language === 'id' ? 'Divisi Penjualan' : 'Phòng Kinh Doanh'})
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white text-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200 rounded-xs">
                    <Mail className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block font-mono uppercase tracking-wider font-bold">
                      {language === 'en' ? 'Tech Pack Receiving Email' : language === 'id' ? 'Email Penerimaan Tech Pack' : 'Email Tiếp Nhận Tech Pack'}
                    </span>
                    <a href="mailto:lienchau@lienchau.com" className="font-bold text-zinc-900 hover:text-emerald-700 font-mono">
                      lienchau@lienchau.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white text-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200 rounded-xs">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block font-mono uppercase tracking-wider font-bold">
                      {language === 'en' ? 'Factory & QC Inspection Lab' : language === 'id' ? 'Pabrik & Lab Inspeksi QC' : 'Nhà Máy & Văn Phòng KCS'}
                    </span>
                    <p className="font-medium text-zinc-700 leading-relaxed">
                      Lô CN7, Đường N5, KCN Sóng Thần 3, Phường Phú Tân, TP Thủ Dầu Một, Tỉnh Bình Dương
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Policy Callout */}
              <div className="p-4 bg-white border border-zinc-200 rounded-sm space-y-2">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                  {language === 'en' ? 'Sample Dispatch Policy' : language === 'id' ? 'Kebijakan Pengiriman Sampel' : 'Chính Sách Cung Cấp Mẫu Dây'}
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {language === 'en'
                    ? 'Lien Chau provides free existing warehouse material swatches. For custom Pantone dyeing or bespoke laser-engraved aglet molds, tooling fees are 100% credited against official production purchase orders.'
                    : language === 'id'
                    ? 'Pabrik menyediakan sampel gratis dari stok material yang ada. Untuk celupan warna khusus Pantone atau cetakan aglet logo laser, biaya pembukaan cetakan akan dikembalikan 100% saat pesanan resmi dibuat.'
                    : 'Nhà máy hỗ trợ gửi miễn phí mẫu có sẵn trong kho vật liệu. Với mẫu dệt riêng theo thiết kế Pantone hoặc khắc logo laser, chi phí mở khuôn aglet sẽ được hoàn lại 100% khi lên đơn đặt hàng chính thức.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 p-6 sm:p-8 rounded-sm shadow-xs">
            {status === 'success' ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900">
                    {language === 'en' ? 'Quote Request Successfully Logged' : language === 'id' ? 'Permintaan Penawaran Berhasil Dicatat' : 'Yêu Cầu Báo Giá Đã Được Ghi Nhận'}
                  </h3>
                  <p className="text-xs text-zinc-600 max-w-md mx-auto">
                    {language === 'en' ? 'Reference Code:' : language === 'id' ? 'Kode Referensi:' : 'Mã hồ sơ:'} <strong className="font-mono text-zinc-900">{submittedRefCode}</strong>. {language === 'en' ? 'A B2B accounts manager will contact you within 24 business hours.' : language === 'id' ? 'Manajer akun B2B akan menghubungi Anda dalam 24 jam kerja.' : 'Chuyên viên kinh doanh phụ trách ngành hàng sẽ liên hệ với quý khách trong vòng 24 giờ.'}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer"
                >
                  {language === 'en' ? 'Submit Another Inquiry' : language === 'id' ? 'Kirim Permintaan Lain' : 'Gửi Yêu Cầu Khác'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono block">
                      {language === 'en' ? 'Contact Full Name *' : language === 'id' ? 'Nama Lengkap Kontak *' : 'Họ & Tên Người Liên Hệ *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyen Van A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white text-xs text-zinc-900 rounded-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono block">
                      {language === 'en' ? 'Company / Footwear Brand' : language === 'id' ? 'Nama Perusahaan / Brand' : 'Tên Công Ty / Thương Hiệu'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'ABC Footwear Co., Ltd...' : language === 'id' ? 'PT ABC Footwear...' : 'Công ty Da Giày ABC...'}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white text-xs text-zinc-900 rounded-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono block">
                      {language === 'en' ? 'Phone / WhatsApp *' : language === 'id' ? 'Telepon / WhatsApp *' : 'Số Điện Thoại / Zalo *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white text-xs text-zinc-900 rounded-sm outline-none font-mono transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono block">
                      {language === 'en' ? 'Business Email *' : language === 'id' ? 'Email Perusahaan *' : 'Email Doanh Nghiệp *'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="purchasing@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white text-xs text-zinc-900 rounded-sm outline-none font-mono transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono block">
                    {language === 'en' ? 'Product Type / Specification Category' : language === 'id' ? 'Jenis Produk / Kategori Spesifikasi' : 'Quy Cách / Chủng Loại Sản Phẩm Cần Báo Giá'}
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white text-xs text-zinc-900 rounded-sm outline-none transition-colors"
                  >
                    {productOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono block">
                      {language === 'en' ? 'Estimated Order Quantity' : language === 'id' ? 'Estimasi Jumlah Pesanan' : 'Dự Kiến Số Lượng Đặt Hàng'}
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white text-xs text-zinc-900 rounded-sm outline-none transition-colors"
                    >
                      {quantityOptions.map((q) => (
                        <option key={q.value} value={q.value}>{q.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono block">
                      {language === 'en' ? 'Aglet / Tipping Requirement' : language === 'id' ? 'Spesifikasi Ujung Tali (Aglet)' : 'Yêu Cầu Bấm Đầu Aglet'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Laser-etched metal, acetate film, dipped silicone...' : language === 'id' ? 'Logam grafir laser, film asetat, silikon...' : 'Kim loại khắc laser, màng acetate, silicon...'}
                      value={formData.agletType}
                      onChange={(e) => setFormData({ ...formData, agletType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white text-xs text-zinc-900 rounded-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono block">
                    {language === 'en' ? 'Technical Notes (Width, Pantone, Tensile Strength)' : language === 'id' ? 'Catatan Teknis (Lebar, Warna Pantone, Kekuatan Tarik)' : 'Ghi Chú Kỹ Thuật (Khổ bản, Màu Pantone, Lực kéo đứt)'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={language === 'en' ? 'e.g., Flat 8mm, length 130cm, optical white, micro laser branding...' : language === 'id' ? 'misal: Pipih 8mm, panjang 130cm, putih optik, laser logo mikro...' : 'Ví dụ: Bản dẹt 8mm, dài 130cm, màu trắng quang học, khắc logo Nike vi mô...'}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white text-xs text-zinc-900 rounded-sm outline-none transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'en' ? 'Processing Request...' : language === 'id' ? 'Memproses Permintaan...' : 'Đang Xử Lý Hồ Sơ...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{language === 'en' ? 'Submit Quotation Request & Get Samples' : language === 'id' ? 'Kirim Permintaan Penawaran & Dapatkan Sampel' : 'Gửi Yêu Cầu Báo Giá & Nhận Mẫu Thử'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
