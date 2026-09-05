import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PartnerItem } from '../../types';
import {
  Building2,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  TrendingUp,
  Globe
} from 'lucide-react';

export const AdminPartnersTab: React.FC = () => {
  const { partners, addPartner, updatePartner, deletePartner, togglePartnerStatus } = useData();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'hidden'>('all');
  const [trendFilter, setTrendFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<PartnerItem, 'id'>>({
    name: '',
    logo: '',
    fashionTrend: '',
    category: '',
    country: 'Việt Nam',
    status: 'active'
  });

  // Extract unique fashion trends for quick filter tags
  const uniqueTrends = Array.from(
    new Set(partners.map(p => p.fashionTrend).filter(Boolean))
  );

  const filteredPartners = partners.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.fashionTrend && p.fashionTrend.toLowerCase().includes(search.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
      (p.country && p.country.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesTrend = trendFilter === 'all' || p.fashionTrend === trendFilter;

    return matchesSearch && matchesStatus && matchesTrend;
  });

  const handleOpenAddModal = () => {
    setEditingPartner(null);
    setFormData({
      name: '',
      logo: '',
      fashionTrend: 'Xu hướng Sneaker Thể Thao & Outdoor',
      category: 'OEM Manufacturing',
      country: 'Việt Nam',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (partner: PartnerItem) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo || '',
      fashionTrend: partner.fashionTrend || '',
      category: partner.category || '',
      country: partner.country || 'Việt Nam',
      status: partner.status
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingPartner) {
      updatePartner(editingPartner.id, formData);
    } else {
      addPartner(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đối tác "${name}" khỏi hệ thống?`)) {
      deletePartner(id);
    }
  };

  // Image Upload handler (converts to Data URL for instant preview & persistence)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData(prev => ({ ...prev, logo: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const commonTrendSuggestions = [
    'Gorpcore & Outdoor Eco-Tech',
    'Retro Chunky Sneaker & 90s Vintage',
    'Chunky Skater & Y2K Fat Laces',
    'Athleisure & Seamless Knits',
    'Minimalist Monochrome & Clean Tone',
    'DWR Water-Repellent Functional',
    'Organic Cotton & Bio-Dyed Tones'
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>Quản Lý Danh Mục Đối Tác &amp; Xu Hướng Thời Trang</span>
          </h2>
          <p className="text-xs text-zinc-600 mt-1">
            Quản lý logo đối tác, nhãn hàng OEM, khách hàng xuất khẩu và xu hướng thời trang may mặc/giày dép hợp tác.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Đối Tác Mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên đối tác, phân loại, quốc gia, xu hướng..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 focus:bg-white text-xs text-zinc-800 rounded-sm outline-none transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 focus:bg-white text-xs text-zinc-800 rounded-sm outline-none transition-colors"
          >
            <option value="all">Tất cả trạng thái ({partners.length})</option>
            <option value="active">Đang hiển thị ({partners.filter(p => p.status === 'active').length})</option>
            <option value="hidden">Đang ẩn ({partners.filter(p => p.status === 'hidden').length})</option>
          </select>
        </div>

        {/* Trend Filter */}
        <div className="md:col-span-4">
          <select
            value={trendFilter}
            onChange={(e) => setTrendFilter(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 focus:bg-white text-xs text-zinc-800 rounded-sm outline-none transition-colors"
          >
            <option value="all">Tất cả xu hướng thời trang ({uniqueTrends.length} nhóm)</option>
            {uniqueTrends.map(trend => (
              <option key={trend} value={trend}>
                {trend}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Trend Badges */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] font-mono text-zinc-500 uppercase font-semibold mr-1 flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          Lọc nhanh:
        </span>
        <button
          onClick={() => setTrendFilter('all')}
          className={`px-2.5 py-1 text-[11px] rounded-xs font-mono transition-colors cursor-pointer ${
            trendFilter === 'all'
              ? 'bg-zinc-900 text-white font-bold'
              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
          }`}
        >
          Tất cả ({partners.length})
        </button>
        {uniqueTrends.slice(0, 5).map(trend => (
          <button
            key={trend}
            onClick={() => setTrendFilter(trendFilter === trend ? 'all' : trend)}
            className={`px-2.5 py-1 text-[11px] rounded-xs font-mono transition-colors cursor-pointer truncate max-w-[220px] ${
              trendFilter === trend
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
            title={trend}
          >
            {trend}
          </button>
        ))}
      </div>

      {/* Partners Table */}
      <div className="border border-zinc-200 rounded-sm overflow-hidden bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-600 font-mono uppercase text-[11px] tracking-wider">
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-4 w-28">Logo</th>
                <th className="py-3 px-4 min-w-[200px]">Tên Đối Tác</th>
                <th className="py-3 px-4 min-w-[220px]">Xu Hướng Thời Trang</th>
                <th className="py-3 px-4 min-w-[150px]">Lĩnh Vực / Phân Loại</th>
                <th className="py-3 px-4 w-32">Quốc Gia</th>
                <th className="py-3 px-3 w-24 text-center">Trạng Thái</th>
                <th className="py-3 px-3 w-28 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-500">
                    <Building2 className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
                    <p className="font-medium">Không tìm thấy đối tác nào phù hợp với bộ lọc</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Nhấp vào &quot;Thêm Đối Tác Mới&quot; để tạo hồ sơ hợp tác.</p>
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner, index) => (
                  <tr
                    key={partner.id}
                    className={`hover:bg-zinc-50/80 transition-colors ${
                      partner.status === 'hidden' ? 'bg-zinc-50/50 opacity-60' : ''
                    }`}
                  >
                    {/* Index */}
                    <td className="py-3 px-3 text-center text-zinc-400 font-mono">
                      {index + 1}
                    </td>

                    {/* Logo Preview */}
                    <td className="py-3 px-4">
                      {partner.logo ? (
                        <div className="w-16 h-10 bg-zinc-50 border border-zinc-200 rounded-xs flex items-center justify-center p-1 overflow-hidden group relative">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-h-full max-w-full object-contain"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // If image link fails, show fallback
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-10 bg-zinc-100 border border-dashed border-zinc-300 rounded-xs flex items-center justify-center text-zinc-400">
                          <Building2 className="w-4 h-4" />
                        </div>
                      )}
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-zinc-900 text-xs flex items-center gap-1.5">
                        <span>{partner.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
                        ID: {partner.id}
                      </span>
                    </td>

                    {/* Fashion Trend */}
                    <td className="py-3 px-4">
                      {partner.fashionTrend ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs text-[11px] font-medium">
                          <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{partner.fashionTrend}</span>
                        </span>
                      ) : (
                        <span className="text-zinc-400 text-[11px] italic">Chưa cập nhật xu hướng</span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-zinc-700">
                      <span className="font-mono text-[11px]">{partner.category || 'Đối tác gia công'}</span>
                    </td>

                    {/* Country */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] text-zinc-600 font-mono">
                        <Globe className="w-3 h-3 text-zinc-400" />
                        {partner.country || 'Việt Nam'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => togglePartnerStatus(partner.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs transition-colors cursor-pointer ${
                          partner.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                        }`}
                        title="Nhấp để chuyển đổi trạng thái Hiển thị / Ẩn"
                      >
                        {partner.status === 'active' ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Hiện</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Ẩn</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(partner)}
                          className="p-1.5 text-zinc-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xs transition-colors cursor-pointer"
                          title="Chỉnh sửa thông tin đối tác"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id, partner.name)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                          title="Xóa đối tác"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        <div className="bg-zinc-50 px-4 py-2.5 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-500 font-mono">
          <span>Tổng số đối tác: <strong>{partners.length}</strong> (Đang hiện: <strong>{partners.filter(p => p.status === 'active').length}</strong>)</span>
          <span>Hiển thị trên Marquee trang chủ &amp; Mục Khách Hàng B2B</span>
        </div>
      </div>

      {/* Modal Add / Edit Partner */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-zinc-300 rounded-sm shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-zinc-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  {editingPartner ? 'Chỉnh Sửa Thông Tin Đối Tác' : 'Thêm Đối Tác Mới'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              {/* Partner Name */}
              <div>
                <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                  Tên Đối Tác / Thương Hiệu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ví dụ: Taekwang Vina Footwear, Biti's Hunter, Pou Chen..."
                  className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Logo URL & Upload */}
              <div>
                <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                  Logo Đối Tác (Đường link URL hoặc tải ảnh lên)
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                    placeholder="https://... hoặc tải ảnh từ máy tính"
                    className="flex-1 px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none"
                  />
                  <label className="px-3 py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-sm text-zinc-700 font-mono text-[11px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors shrink-0">
                    <Upload className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Tải ảnh</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Logo Preview */}
                {formData.logo && (
                  <div className="p-2 bg-zinc-50 border border-zinc-200 rounded-xs flex items-center gap-3">
                    <div className="w-20 h-12 bg-white border border-zinc-200 rounded-xs p-1 flex items-center justify-center shrink-0">
                      <img
                        src={formData.logo}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] text-zinc-500 font-mono block">Xem trước logo</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, logo: '' }))}
                        className="text-[10px] text-red-600 hover:underline mt-0.5 cursor-pointer"
                      >
                        Xóa logo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Fashion Trend */}
              <div>
                <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1 flex items-center justify-between">
                  <span>Xu Hướng Thời Trang Hợp Tác</span>
                  <span className="text-emerald-700 font-normal lowercase">(sneaker, outdoor, athleisure...)</span>
                </label>
                <input
                  type="text"
                  value={formData.fashionTrend}
                  onChange={(e) => setFormData(prev => ({ ...prev, fashionTrend: e.target.value }))}
                  placeholder="Ví dụ: Gorpcore & Outdoor Eco-Tech, Chunky Y2K Laces..."
                  className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none mb-1.5"
                />
                
                {/* Suggestions */}
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 font-mono">Gợi ý xu hướng phổ biến:</span>
                  <div className="flex flex-wrap gap-1">
                    {commonTrendSuggestions.map(s => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setFormData(prev => ({ ...prev, fashionTrend: s }))}
                        className="text-[10px] px-1.5 py-0.5 bg-zinc-100 hover:bg-emerald-50 hover:text-emerald-800 border border-zinc-200 rounded-xs transition-colors cursor-pointer text-zinc-600 font-mono"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category & Country */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                    Lĩnh Vực / Phân Loại
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="OEM Manufacturing, Athletic..."
                    className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                    Quốc Gia / Khu Vực
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Việt Nam, Hàn Quốc / VN..."
                    className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                  Trạng Thái Hiển Thị
                </label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                      className="text-emerald-600"
                    />
                    <span className="text-zinc-800 font-medium">Hiển thị công khai</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="hidden"
                      checked={formData.status === 'hidden'}
                      onChange={() => setFormData(prev => ({ ...prev, status: 'hidden' }))}
                      className="text-emerald-600"
                    />
                    <span className="text-zinc-500">Ẩn tạm thời</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-100 rounded-sm font-medium transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingPartner ? 'Lưu Thay Đổi' : 'Thêm Đối Tác'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
