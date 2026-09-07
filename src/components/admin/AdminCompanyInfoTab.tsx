import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CompanyInfo } from '../../types';
import { Building2, Save, MapPin, Phone, Mail, Link as LinkIcon, Check, FileText } from 'lucide-react';

export const AdminCompanyInfoTab: React.FC = () => {
  const { companyInfo, updateCompanyInfo } = useData();

  const [formData, setFormData] = useState<CompanyInfo>({ ...companyInfo });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate save delay
    setTimeout(() => {
      updateCompanyInfo(formData);
      setIsSaving(false);
      setSaveMessage('Đã lưu thông tin công ty thành công!');
      
      setTimeout(() => setSaveMessage(''), 3000);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>Thông Tin Chung Công Ty</span>
          </h2>
          <p className="text-xs text-zinc-600 mt-1">
            Quản lý tên, địa chỉ, logo, chứng nhận và các liên kết mạng xã hội hiển thị trên Footer và trang chủ.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-xs disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Đang lưu...</span>
          ) : (
            <><Save className="w-4 h-4" /> <span>Lưu Thay Đổi</span></>
          )}
        </button>
      </div>

      {saveMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          {saveMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-zinc-800 border-b border-zinc-200 pb-2 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-600" /> Định Danh Doanh Nghiệp
          </h3>
          
          <div>
            <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Tên Công Ty Cổ Phần</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Tên Viết Tắt</label>
              <input type="text" name="shortName" value={formData.shortName} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Năm Thành Lập</label>
              <input type="number" name="establishedYear" value={formData.establishedYear} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Slogan</label>
            <input type="text" name="slogan" value={formData.slogan} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Mã Số Thuế</label>
              <input type="text" name="taxId" value={formData.taxId} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Nơi Cấp</label>
              <input type="text" name="taxIssuer" value={formData.taxIssuer} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Các Chứng Nhận (ISO, Oeko-Tex...)</label>
            <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
          </div>
        </div>

        {/* Contact & Location */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-zinc-800 border-b border-zinc-200 pb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" /> Liên Hệ & Địa Chỉ
          </h3>

          <div>
            <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Địa Chỉ Văn Phòng / Nhà Máy</label>
            <textarea name="address" rows={2} value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Điện Thoại</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none font-mono" />
            </div>
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Hotline</label>
              <input type="text" name="hotline" value={formData.hotline} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none font-mono text-emerald-700 font-bold" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Email Kính Doanh</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
          </div>
          
          <div>
            <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Giờ Làm Việc</label>
            <input type="text" name="workingHours" value={formData.workingHours} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
          </div>
        </div>

        {/* Media & Links */}
        <div className="space-y-4 md:col-span-2 mt-2">
          <h3 className="text-sm font-bold uppercase text-zinc-800 border-b border-zinc-200 pb-2 flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4 text-emerald-600" /> Tài Nguyên & Mạng Xã Hội
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">URL Logo Công Ty</label>
              <input type="text" name="logo" value={formData.logo} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
              {formData.logo && <img src={formData.logo} alt="Logo" className="h-10 object-contain mt-2 p-1 border border-zinc-200 rounded-sm" />}
            </div>
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">URL Logo Bộ Công Thương</label>
              <input type="text" name="bctLogo" value={formData.bctLogo} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
              {formData.bctLogo && <img src={formData.bctLogo} alt="BCT Logo" className="h-10 object-contain mt-2 p-1 border border-zinc-200 rounded-sm" />}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Facebook URL</label>
              <input type="text" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">Zalo URL / Phone</label>
              <input type="text" name="zaloUrl" value={formData.zaloUrl} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">YouTube URL</label>
              <input type="text" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">TikTok URL</label>
              <input type="text" name="tiktokUrl" value={formData.tiktokUrl} onChange={handleChange} className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
