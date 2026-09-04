import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  Thermometer, 
  Leaf, 
  CheckCircle2, 
  Radio, 
  Layers,
  Clock,
  Building2,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const FactoryLiveCommandHUD: React.FC = () => {
  const { t, language } = useLanguage();
  const [dailyMeters, setDailyMeters] = useState<number>(542380);
  const [activeMachines, setActiveMachines] = useState<number>(248);
  const [humidity, setHumidity] = useState<number>(64.8);
  const [temperature, setTemperature] = useState<number>(26.4);

  // Micro-fluctuation to give an authentic live telemetry vibe
  useEffect(() => {
    const interval = setInterval(() => {
      setDailyMeters(prev => prev + Math.floor(Math.random() * 8) + 3);
      setHumidity(prev => +(64.5 + Math.random() * 0.8).toFixed(1));
      setTemperature(prev => +(26.2 + Math.random() * 0.5).toFixed(1));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const ACTIVE_BATCHES = language === 'en' ? [
    { id: 'LC-2609-01', client: 'FOB Sneaker Footwear Lot', item: '32-Spindle RPET Cord 120cm', qty: '85,000 Pairs', status: 'Laser Tipping Press', progress: 92 },
    { id: 'LC-2609-02', client: 'European Outdoor Apparel Brand', item: 'Waterproof Core Braid 4.5mm', qty: '40,000 Meters', status: 'High-Density Braiding', progress: 68 },
    { id: 'LC-2609-03', client: 'Export Leather Shoe Factory', item: 'Natural Waxed Round Cotton Cord', qty: '30,000 Pairs', status: 'KCS Tensile Pull Testing', progress: 84 },
    { id: 'LC-2609-04', client: 'Sportswear Garment Maker', item: '4-Way Stretch Knitted Elastic', qty: '120,000 Meters', status: '5-Ply Export Packaging', progress: 98 },
  ] : language === 'id' ? [
    { id: 'LC-2609-01', client: 'Pesanan Sepatu Sneaker FOB', item: 'Tali Rajut 32 Spul RPET 120cm', qty: '85.000 Pasang', status: 'Pemasangan Aglet Laser', progress: 92 },
    { id: 'LC-2609-02', client: 'Merek Perlengkapan Outdoor Eropa', item: 'Tali Kepang Inti Tahan Air 4.5mm', qty: '40.000 Meter', status: 'Anyaman Kerapatan Tinggi', progress: 68 },
    { id: 'LC-2609-03', client: 'Pabrik Sepatu Kulit Ekspor', item: 'Tali Katun Bulat Lilin Alami', qty: '30.000 Pasang', status: 'KCS Uji Tarik Beban', progress: 84 },
    { id: 'LC-2609-04', client: 'Pabrik Pakaian Olahraga', item: 'Tali Karet Elastis 4 Arah', qty: '120.000 Meter', status: 'Pengemasan Ekspor 5 Lapis', progress: 98 },
  ] : [
    { id: 'LC-2609-01', client: 'Đơn Hàng Giày Sneaker FOB', item: 'Dây Dệt 32 Thoi RPET 120cm', qty: '85.000 Cặp', status: 'Đang Ép Tipping Laser', progress: 92 },
    { id: 'LC-2609-02', client: 'Thương Hiệu Outdoor Châu Âu', item: 'Dây Bện Lõi Cáp Chống Nước 4.5mm', qty: '40.000 Mét', status: 'Dệt Thoi Mật Độ Cao', progress: 68 },
    { id: 'LC-2609-03', client: 'Xưởng Giày Da Xuất Khẩu', item: 'Dây Cotton Tròn Phủ Sáp Tự Nhiên', qty: '30.000 Cặp', status: 'KCS Kiểm Tra Lực Kéo', progress: 84 },
    { id: 'LC-2609-04', client: 'Nhà Máy May Mặc Thể Thao', item: 'Dây Thun Dệt Kim Co Giãn 4 Chiều', qty: '120.000 Mét', status: 'Đóng Thùng 5 Lớp', progress: 98 },
  ];

  return (
    <section className="py-12 bg-zinc-950 text-white border-b border-zinc-800 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                {t.hud.tag}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight uppercase">
                {t.hud.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              248/250 {language === 'en' ? 'Looms Active (99.2%)' : language === 'id' ? 'Mesin Siap (99.2%)' : 'Máy Sẵn Sàng (99.2%)'}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{language === 'en' ? 'Workshop: 5,000m² ISO 9001:2015' : language === 'id' ? 'Area Pabrik: 5.000m² ISO 9001:2015' : 'Phân Xưởng: 5.000m² Chuẩn ISO 9001:2015'}</span>
          </div>
        </div>

        {/* 4 Core Industrial Sensor Telemetry Gauges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-zinc-800">
          
          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-sm">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1">
              <span className="uppercase flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                {t.hud.metersToday}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">REALTIME</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {dailyMeters.toLocaleString(language === 'en' ? 'en-US' : 'vi-VN')} <span className="text-xs text-zinc-400 font-normal">{language === 'en' ? 'm/day' : 'm/ngày'}</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-1">
              {language === 'en' ? 'Exceeding daytime quota by 108%' : language === 'id' ? 'Mencapai 108% dari target shift harian' : 'Đạt 108% chỉ tiêu sản xuất ca ngày'}
            </div>
          </div>

          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-sm">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1">
              <span className="uppercase flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                {language === 'en' ? 'Weave Room Humidity' : language === 'id' ? 'Kelembapan Ruang Rajut' : 'Độ Ẩm Phòng Dệt'}
              </span>
              <span className="text-[10px] text-sky-400 font-bold">STANDARD</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {humidity}% <span className="text-xs text-zinc-400 font-normal">RH</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-1">
              {language === 'en' ? 'Optimal anti-breakage climate (65% RH)' : language === 'id' ? 'Iklim optimal mencegah putus serat (65% RH)' : 'Môi trường tối ưu chống đứt sợi (65% RH)'}
            </div>
          </div>

          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-sm">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1">
              <span className="uppercase flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                {language === 'en' ? 'Plant Temperature' : language === 'id' ? 'Suhu Pabrik' : 'Nhiệt Độ Xưởng'}
              </span>
              <span className="text-[10px] text-amber-400 font-bold">{t.hud.normalStatus}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {temperature}°C
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-1">
              {language === 'en' ? 'Negative-pressure HVAC active 24/7' : language === 'id' ? 'Sistem pendingin tekanan negatif aktif 24/7' : 'Hệ thống làm mát áp suất âm 24/7'}
            </div>
          </div>

          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-sm">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1">
              <span className="uppercase flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'en' ? 'GRS Recycled Yarn' : language === 'id' ? 'Bahan Daur Ulang GRS' : 'Vật Liệu Tái Chế GRS'}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">ECO 2026</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              1.450 <span className="text-xs text-zinc-400 font-normal">{language === 'en' ? 'kg/week' : 'kg/tuần'}</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-1">
              {language === 'en' ? 'rPET plastic bottles recycled into premium cords' : language === 'id' ? 'Botol plastik rPET didaur ulang jadi benang' : 'Vỏ chai rPET tái chế thành sợi dệt cao cấp'}
            </div>
          </div>

        </div>

        {/* Live Active Production Batches Tracker */}
        <div className="pt-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="uppercase font-bold text-zinc-300">
              {language === 'en' ? 'Production Lots Currently Running on Lines:' : language === 'id' ? 'Lô Hàng Đang Được Gia Công Trực Tiếp Tại Phân Xưởng:' : 'Các Lô Hàng Đang Được Gia Công Trực Tiếp Tại Phân Xưởng:'}
            </span>
            <span className="text-emerald-400 font-bold">{t.hud.statusStable}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACTIVE_BATCHES.map(batch => (
              <div key={batch.id} className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded-xs border border-emerald-800">
                      {batch.id}
                    </span>
                    <span className="text-xs font-bold text-zinc-200 truncate">{batch.client}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate">
                    {batch.item} • <span className="text-zinc-300 font-bold">{batch.qty}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[11px] font-mono font-bold text-emerald-400">{batch.status}</div>
                  <div className="w-24 bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${batch.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
