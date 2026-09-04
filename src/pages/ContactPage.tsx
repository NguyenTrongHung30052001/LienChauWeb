import React from 'react';
import { QuoteForm } from '../components/QuoteForm';
import { MapPin, PhoneCall, Mail, Clock, ShieldCheck, Factory, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ContactPageProps {
  initialProduct?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialProduct = '' }) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white text-zinc-900 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="text-left space-y-2 mb-12 pb-6 border-b border-zinc-200">
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block">
            {language === 'en' ? 'Direct Factory Contact • Song Than 3 IP' : language === 'id' ? 'Kontak Langsung Pabrik • KWS Song Than 3' : 'Liên Hệ Trực Tiếp Nhà Máy • KCN Sóng Thần 3'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-900">
            {language === 'en' ? 'Request Quotation & Free Lab Dip Samples' : language === 'id' ? 'Permintaan Penawaran Harga & Sampel Uji Gratis' : 'Yêu Cầu Báo Giá & Gửi Mẫu Thử Miễn Phí'}
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {language === 'en'
              ? 'Footwear, bag, and garment manufacturers are invited to submit technical specifications or call our direct factory hotline to receive wholesale quotes within 2 business hours.'
              : language === 'id'
              ? 'Produsen sepatu, tas, dan pakaian olahraga dipersilakan mengirim spesifikasi teknis atau menghubungi hotline pabrik untuk penawaran harga grosir dalam 2 jam kerja.'
              : 'Quý doanh nghiệp sản xuất giày dép, xưởng may túi xách, balo vui lòng gửi thông tin quy cách hoặc liên hệ hotline để nhận báo giá chiết khấu tận xưởng trong 2 giờ.'}
          </p>
        </div>

        {/* 3 Contact Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 text-left">
          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
            <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-sm flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900">
              {language === 'en' ? 'Quotation & Technical Hotline' : language === 'id' ? 'Hotline Konsultasi & Penawaran' : 'Hotline Tư Vấn Báo Giá'}
            </h3>
            <p className="text-xs text-zinc-600">
              {language === 'en' ? 'Weaving technical advice & bulk discount tier:' : language === 'id' ? 'Dukungan teknis rajut & diskon volume besar:' : 'Hỗ trợ kỹ thuật dệt & chiết khấu số lượng lớn:'}
            </p>
            <a href="tel:0988688868" className="text-base font-bold text-emerald-700 hover:text-emerald-800 font-mono block">
              0988.688.868
            </a>
            <p className="text-[10px] text-zinc-500 font-mono">{language === 'en' ? 'WhatsApp / Zalo on-call 24/7' : language === 'id' ? 'WhatsApp / Zalo siaga 24/7' : 'Zalo / Viber trực 24/7'}</p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
            <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-sm flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900">
              {language === 'en' ? 'Tech Pack & Spec Inquiries' : language === 'id' ? 'Email Penerimaan Tech Pack' : 'Email Tiếp Nhận Bản Vẽ'}
            </h3>
            <p className="text-xs text-zinc-600">
              {language === 'en' ? 'Submit spec sheets, tech packs or CAD artwork:' : language === 'id' ? 'Kirim file spec sheet, tech pack atau desain CAD:' : 'Gửi file spec sheet, tech pack hoặc mẫu thiết kế:'}
            </p>
            <a href="mailto:contact@lienchau.com" className="text-sm font-bold text-emerald-700 hover:text-emerald-800 font-mono block">
              contact@lienchau.com
            </a>
            <p className="text-[10px] text-zinc-500 font-mono">{language === 'en' ? 'Formal quotation within 2 hrs' : language === 'id' ? 'Respon penawaran dalam 2 jam' : 'Phản hồi báo giá trong 2h'}</p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
            <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-sm flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900">
              {language === 'en' ? 'Factory Complex Address' : language === 'id' ? 'Alamat Kompleks Pabrik' : 'Địa Chỉ Nhà Máy'}
            </h3>
            <p className="text-xs text-zinc-600">
              {language === 'en' ? 'Direct manufacturing facility:' : language === 'id' ? 'Fasilitas produksi langsung:' : 'Phân xưởng sản xuất trực tiếp:'}
            </p>
            <p className="text-xs font-bold text-zinc-900 font-mono leading-relaxed">
              Lô CN7, Đường N5, KCN Sóng Thần 3, P. Phú Tân, TP. Thủ Dầu Một, Bình Dương
            </p>
            <p className="text-[10px] text-zinc-500 font-mono">{language === 'en' ? 'Hours: Mon - Sat (07:30 - 17:30)' : language === 'id' ? 'Buka: Sen - Sab (07:30 - 17:30)' : 'Mở cửa: T2 - T7 (07:30 - 17:30)'}</p>
          </div>
        </div>

        {/* Quotation Form Section */}
        <div className="mb-20">
          <QuoteForm
            initialProduct={initialProduct}
            onSuccess={() => {}}
          />
        </div>

        {/* Factory Location & Transportation Guide */}
        <div className="p-8 bg-zinc-50 border border-zinc-200 text-left rounded-sm space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Factory className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900">
                {language === 'en' ? 'Strategic Logistics Location in Song Than 3 IP' : language === 'id' ? 'Lokasi Logistik Strategis di KWS Song Than 3' : 'Vị Trí Logistics Chiến Lược Tại KCN Sóng Thần 3'}
              </h3>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {language === 'en'
                ? 'Lien Chau Factory is positioned at Binh Duong arterial logistics corridor, connecting directly to National Route 13, My Phuoc - Tan Van Highway, Cat Lai Seaport, and Tan Son Nhat Airport. This enables rapid same-day materials dispatch to key manufacturing clusters across Binh Duong, Dong Nai, Ho Chi Minh City, Tay Ninh, and Long An.'
                : language === 'id'
                ? 'Pabrik Lien Chau berada di arteri logistik utama provinsi Binh Duong, terhubung langsung ke Jalan Raya Nasional 13, Jalan Tol My Phuoc - Tan Van, Pelabuhan Cat Lai, dan Bandara Tan Son Nhat. Memungkinkan pengiriman bahan baku di hari yang sama ke klaster pabrik di Binh Duong, Dong Nai, Kota Ho Chi Minh, Tay Ninh, dan Long An.'
                : 'Nhà máy Liên Châu nằm tại nút giao logistics huyết mạch của tỉnh Bình Dương, kết nối trực tiếp với Quốc lộ 13, đường Mỹ Phước - Tân Vạn, cảng Cát Lái và sân bay Tân Sơn Nhất. Thuận tiện cho việc giao nhận nguyên phụ liệu nhanh chóng trong ngày tới các cụm nhà máy tại Bình Dương, Đồng Nai, TP.HCM, Tây Ninh và Long An.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono text-zinc-700">
            <div className="p-3 bg-white border border-zinc-200 rounded-sm">
              <strong>{language === 'en' ? 'Southeast Region Delivery:' : language === 'id' ? 'Pengiriman Wilayah Tenggara:' : 'Thời gian giao hàng Đông Nam Bộ:'}</strong>
              <p className="text-zinc-500 text-[11px] mt-0.5">{language === 'en' ? 'Within 12 - 24 hours' : language === 'id' ? 'Dalam 12 - 24 jam' : 'Trong vòng 12 - 24 giờ'}</p>
            </div>
            <div className="p-3 bg-white border border-zinc-200 rounded-sm">
              <strong>{language === 'en' ? 'Nationwide Shipping:' : language === 'id' ? 'Pengiriman Seluruh Negeri:' : 'Giao hàng toàn quốc:'}</strong>
              <p className="text-zinc-500 text-[11px] mt-0.5">{language === 'en' ? 'Express Courier / Freight 24 - 48h' : language === 'id' ? 'Ekspedisi / Kurir Kilat 24 - 48 jam' : 'Gửi chành xe / Chuyển phát nhanh 24 - 48h'}</p>
            </div>
            <div className="p-3 bg-white border border-zinc-200 rounded-sm">
              <strong>{language === 'en' ? 'Export FCL / LCL:' : language === 'id' ? 'Ekspor FCL / LCL:' : 'Xuất khẩu FCL / LCL:'}</strong>
              <p className="text-zinc-500 text-[11px] mt-0.5">{language === 'en' ? 'Cat Lai Port, Cai Mep - Thi Vai' : language === 'id' ? 'Pelabuhan Cat Lai, Cai Mep - Thi Vai' : 'Cảng Cát Lái, Cái Mép - Thị Vải'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
