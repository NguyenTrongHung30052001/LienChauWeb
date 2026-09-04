import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Award, Factory, Clock, DollarSign } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const comparisonItems = [
    {
      criteria: 'Chất Lượng Sợi Đầu Vào',
      lienchau: '100% Sợi Polyester/Nylon/Cotton nguyên sinh, có chứng nhận GRS tái chế và Oeko-Tex Standard 100.',
      others: 'Sợi pha tái chế trôi nổi, độ đồng đều thấp, dễ xù lông sau 2-3 tuần sử dụng.'
    },
    {
      criteria: 'Lực Kéo Đứt & Kháng Mài Mòn',
      lienchau: 'Lực kéo đạt > 140 Newton; kháng mài mòn > 20.000 chu kỳ thử nghiệm Martindale qua lỗ xỏ khuy kim loại.',
      others: 'Lực kéo dưới 80N; sợi nhanh bai dão hoặc tưa đứt khi người dùng xiết mạnh.'
    },
    {
      criteria: 'Độ Bền Màu Ma Sát (Crocking)',
      lienchau: 'Nhuộm cao áp thẩm thấu lõi sợi; độ bền màu khô/ướt đạt Cấp 4.5 - 5 (ISO 105-X12), không lem màu ra giày trắng.',
      others: 'Nhuộm thường bề mặt; dễ phai hoặc thôi màu ra thân giày da trắng khi dính nước mưa hoặc mồ hôi.'
    },
    {
      criteria: 'Độ Bám Aglet Bấm Đầu Dây',
      lienchau: 'Dập ép khí nén lực lớn; lực giật tuột đầu bấm > 80 Newton. Đầu kim loại mạ PVD chống oxy hóa muối biển.',
      others: 'Dập thủ công, lực tuột < 30N; đầu mạ mỏng dễ gỉ sét và bong tróc lớp xi mạ.'
    },
    {
      criteria: 'Thời Gian Phát Mẫu & Báo Giá',
      lienchau: 'Báo giá trong 24 giờ; ra mẫu Lab Dip và gửi mẫu thử nghiệm thực tế tận văn phòng đối tác trong 48 giờ.',
      others: 'Chậm trễ 5 - 7 ngày; không hỗ trợ chỉnh sửa thông số dệt theo yêu cầu riêng.'
    },
    {
      criteria: 'Chứng Thư Chất Lượng Xuất Khẩu',
      lienchau: 'Cung cấp đầy đủ CO, CQ, Test Report phòng Lab Instron cho từng lô hàng xuất khẩu sang EU và Bắc Mỹ.',
      others: 'Không có chứng nhận kiểm định độc lập, rủi ro cao khi qua hải quan kiểm dịch.'
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-24 bg-white border-b border-zinc-200 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="pb-8 border-b border-zinc-200 mb-12">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">
              Tiêu Chuẩn Kiểm Soát Chất Lượng
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-900">
              Cam Kết Tiêu Chuẩn Kỹ Thuật Nhà Máy Liên Châu
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed pt-1">
              Bảng so sánh đối chiếu năng lực kiểm định chất lượng giữa quy trình dệt may công nghiệp Liên Châu và các đơn vị gia công phổ thông trên thị trường.
            </p>
          </div>
        </div>

        {/* Quality Comparison Matrix Table */}
        <div className="border border-zinc-200 rounded-sm overflow-hidden bg-white mb-14 shadow-xs">
          <div className="grid grid-cols-12 bg-zinc-100 border-b border-zinc-200 p-4 text-xs font-mono font-bold uppercase tracking-wider text-zinc-800">
            <div className="col-span-12 md:col-span-4">Tiêu Chí Đánh Giá Kỹ Thuật</div>
            <div className="col-span-12 md:col-span-4 text-emerald-800 flex items-center gap-1.5 mt-2 md:mt-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Nhà Máy Liên Châu (Chuẩn ISO 9001)</span>
            </div>
            <div className="col-span-12 md:col-span-4 text-zinc-500 flex items-center gap-1.5 mt-2 md:mt-0">
              <XCircle className="w-4 h-4 text-zinc-400" />
              <span>Gia Công Phổ Thông / Trôi Nổi</span>
            </div>
          </div>

          <div className="divide-y divide-zinc-200 text-xs">
            {comparisonItems.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 hover:bg-zinc-50/80 transition-colors gap-4">
                <div className="col-span-12 md:col-span-4 font-bold text-zinc-900 font-mono">
                  {item.criteria}
                </div>
                <div className="col-span-12 md:col-span-4 text-zinc-800 leading-relaxed bg-emerald-50/40 md:bg-transparent p-3 md:p-0 rounded-sm">
                  <span className="md:hidden text-[10px] font-mono font-bold text-emerald-700 block mb-1 uppercase">
                    Tiêu chuẩn Liên Châu:
                  </span>
                  {item.lienchau}
                </div>
                <div className="col-span-12 md:col-span-4 text-zinc-500 leading-relaxed bg-zinc-50 md:bg-transparent p-3 md:p-0 rounded-sm">
                  <span className="md:hidden text-[10px] font-mono font-bold text-zinc-400 block mb-1 uppercase">
                    Gia công thông thường:
                  </span>
                  {item.others}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Core Pillars of Trust */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase">01 • Chi Phí Tối Ưu</span>
            <h3 className="text-base font-bold uppercase text-zinc-900">Giá Gốc Trực Tiếp</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Cung ứng trực tiếp từ xưởng dệt tại KCN Sóng Thần 3, không qua trung gian thương mại, chiết khấu lũy tiến theo số lượng đơn hàng.
            </p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase">02 • Công Nghệ Cao</span>
            <h3 className="text-base font-bold uppercase text-zinc-900">250+ Máy Tự Động</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Dây chuyền dệt kim tròn và Jacquard vi tính tự động hóa hoàn toàn, đảm bảo chất lượng triệu mét dây đồng đều một chuẩn.
            </p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase">03 • R&amp;D Tốc Độ</span>
            <h3 className="text-base font-bold uppercase text-zinc-900">Mẫu Lab Dip 48H</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Đội ngũ kỹ sư phân tích mẫu vải gốc, phối màu Pantone theo yêu cầu và phát mẫu thực tế trong vòng 48 giờ làm việc.
            </p>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-sm space-y-2">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase">04 • Chuẩn Xuất Khẩu</span>
            <h3 className="text-base font-bold uppercase text-zinc-900">An Toàn &amp; Bền Vững</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Tuân thủ nghiêm ngặt tiêu chuẩn Oeko-Tex Standard 100 Class 1, chứng nhận GRS tái chế và quy định REACH của Liên minh Châu Âu.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
