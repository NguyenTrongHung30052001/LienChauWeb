import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { QuoteSpecItem } from '../../types';
import {
  FileCheck2,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  Package,
  Check,
  X,
  Layers,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const AdminQuoteSpecsTab: React.FC = () => {
  const { quoteSpecs, addQuoteSpec, updateQuoteSpec, deleteQuoteSpec, toggleQuoteSpecStatus } = useData();

  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'hidden'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState<QuoteSpecItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<QuoteSpecItem, 'id'>>({
    name: '',
    categoryGroup: 'Dây Giày (Shoelaces)',
    moq: '1,000 cặp',
    sampleLeadTime: '2-3 ngày làm việc',
    notes: '',
    status: 'active'
  });

  // Extract unique category groups for filtering
  const uniqueGroups = Array.from(
    new Set(quoteSpecs.map(s => s.categoryGroup).filter(Boolean))
  );

  const filteredSpecs = quoteSpecs.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.categoryGroup && s.categoryGroup.toLowerCase().includes(search.toLowerCase())) ||
      (s.notes && s.notes.toLowerCase().includes(search.toLowerCase())) ||
      (s.moq && s.moq.toLowerCase().includes(search.toLowerCase()));

    const matchesGroup = groupFilter === 'all' || s.categoryGroup === groupFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

    return matchesSearch && matchesGroup && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingSpec(null);
    setFormData({
      name: '',
      categoryGroup: 'Dây Giày (Shoelaces)',
      moq: '1,000 cặp',
      sampleLeadTime: '2-3 ngày làm việc',
      notes: 'Bấm đầu màng co acetate hoặc đầu kim loại theo yêu cầu.',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (spec: QuoteSpecItem) => {
    setEditingSpec(spec);
    setFormData({
      name: spec.name,
      categoryGroup: spec.categoryGroup,
      moq: spec.moq,
      sampleLeadTime: spec.sampleLeadTime || '2-3 ngày làm việc',
      notes: spec.notes || '',
      status: spec.status
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingSpec) {
      updateQuoteSpec(editingSpec.id, formData);
    } else {
      addQuoteSpec(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa chủng loại/quy cách báo giá "${name}"?`)) {
      deleteQuoteSpec(id);
    }
  };

  const commonCategoryGroups = [
    'Dây Giày (Shoelaces)',
    'Dây Đai Dệt (Webbing Tape)',
    'Dây Thun Co Giãn (Elastic Band)',
    'Dây Luồn Thời Trang (Drawcord)',
    'Gia Công Bấm Đầu (Tipping & Aglet)',
    'Bộ Sưu Tập Xu Hướng FW25'
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-900 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-600" />
            <span>Quản Lý Danh Mục Quy Cách / Chủng Loại Sản Phẩm Báo Giá</span>
          </h2>
          <p className="text-xs text-zinc-600 mt-1">
            Cấu hình danh mục chủng loại dây dệt, quy cách kỹ thuật, MOQ và thời gian làm mẫu xuất hiện tại form Yêu Cầu Báo Giá trên toàn bộ website.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Quy Cách Báo Giá</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên quy cách, nhóm sản phẩm, MOQ, ghi chú..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 focus:bg-white text-xs text-zinc-800 rounded-sm outline-none transition-colors"
          />
        </div>

        {/* Group Filter */}
        <div className="md:col-span-3">
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 focus:bg-white text-xs text-zinc-800 rounded-sm outline-none transition-colors"
          >
            <option value="all">Tất cả nhóm ({quoteSpecs.length})</option>
            {uniqueGroups.map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 focus:bg-white text-xs text-zinc-800 rounded-sm outline-none transition-colors"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang áp dụng ({quoteSpecs.filter(s => s.status === 'active').length})</option>
            <option value="hidden">Đang ẩn ({quoteSpecs.filter(s => s.status === 'hidden').length})</option>
          </select>
        </div>
      </div>

      {/* Quick Group Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] font-mono text-zinc-500 uppercase font-semibold mr-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          Phân nhóm:
        </span>
        <button
          onClick={() => setGroupFilter('all')}
          className={`px-2.5 py-1 text-[11px] rounded-xs font-mono transition-colors cursor-pointer ${
            groupFilter === 'all'
              ? 'bg-zinc-900 text-white font-bold'
              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
          }`}
        >
          Tất cả ({quoteSpecs.length})
        </button>
        {uniqueGroups.map(group => (
          <button
            key={group}
            onClick={() => setGroupFilter(groupFilter === group ? 'all' : group)}
            className={`px-2.5 py-1 text-[11px] rounded-xs font-mono transition-colors cursor-pointer truncate max-w-[200px] ${
              groupFilter === group
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
            title={group}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Specs Table */}
      <div className="border border-zinc-200 rounded-sm overflow-hidden bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-600 font-mono uppercase text-[11px] tracking-wider">
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-4 min-w-[240px]">Quy Cách / Chủng Loại Cần Báo Giá</th>
                <th className="py-3 px-4 min-w-[170px]">Nhóm Danh Mục</th>
                <th className="py-3 px-4 w-32">MOQ Tối Thiểu</th>
                <th className="py-3 px-4 w-36">Thời Gian Mẫu</th>
                <th className="py-3 px-4 min-w-[200px]">Ghi Chú Kỹ Thuật</th>
                <th className="py-3 px-3 w-24 text-center">Trạng Thái</th>
                <th className="py-3 px-3 w-24 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredSpecs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-500">
                    <FileCheck2 className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
                    <p className="font-medium">Không tìm thấy quy cách sản phẩm nào phù hợp</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Nhấp vào &quot;Thêm Quy Cách Báo Giá&quot; để tạo mục lựa chọn mới.</p>
                  </td>
                </tr>
              ) : (
                filteredSpecs.map((spec, index) => (
                  <tr
                    key={spec.id}
                    className={`hover:bg-zinc-50/80 transition-colors ${
                      spec.status === 'hidden' ? 'bg-zinc-50/50 opacity-60' : ''
                    }`}
                  >
                    {/* Index */}
                    <td className="py-3 px-3 text-center text-zinc-400 font-mono">
                      {index + 1}
                    </td>

                    {/* Spec Name */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-zinc-900 text-xs flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>{spec.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
                        Mã: {spec.id}
                      </span>
                    </td>

                    {/* Category Group */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-xs text-[11px] font-mono">
                        {spec.categoryGroup}
                      </span>
                    </td>

                    {/* MOQ */}
                    <td className="py-3 px-4 font-mono font-bold text-emerald-800 text-[11px]">
                      {spec.moq}
                    </td>

                    {/* Sample Lead Time */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-zinc-600 text-[11px] font-mono">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        {spec.sampleLeadTime || '2-3 ngày'}
                      </span>
                    </td>

                    {/* Notes */}
                    <td className="py-3 px-4 text-zinc-600 text-[11px]">
                      {spec.notes ? (
                        <span>{spec.notes}</span>
                      ) : (
                        <span className="text-zinc-400 italic">Không có</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggleQuoteSpecStatus(spec.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs transition-colors cursor-pointer ${
                          spec.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                        }`}
                        title="Nhấp để chuyển đổi trạng thái"
                      >
                        {spec.status === 'active' ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Áp Dụng</span>
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
                          onClick={() => handleOpenEditModal(spec)}
                          className="p-1.5 text-zinc-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xs transition-colors cursor-pointer"
                          title="Chỉnh sửa quy cách"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(spec.id, spec.name)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                          title="Xóa quy cách"
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
          <span>Tổng số chủng loại báo giá: <strong>{quoteSpecs.length}</strong> (Đang áp dụng: <strong>{quoteSpecs.filter(s => s.status === 'active').length}</strong>)</span>
          <span>Tự động đồng bộ vào danh sách lựa chọn trong form Báo Giá Khách Hàng B2B</span>
        </div>
      </div>

      {/* Modal Add / Edit Spec */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-zinc-300 rounded-sm shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-zinc-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  {editingSpec ? 'Chỉnh Sửa Quy Cách Báo Giá' : 'Thêm Quy Cách Báo Giá Mới'}
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
              {/* Spec Name */}
              <div>
                <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                  Tên Quy Cách / Chủng Loại Sản Phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ví dụ: DÂY GIÀY: Dây Dẹt Thể Thao Sneaker Pro..."
                  className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Category Group */}
              <div>
                <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                  Nhóm Sản Phẩm
                </label>
                <input
                  type="text"
                  value={formData.categoryGroup}
                  onChange={(e) => setFormData(prev => ({ ...prev, categoryGroup: e.target.value }))}
                  placeholder="Dây Giày, Dây Đai Dệt, Dây Thun..."
                  className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none mb-1.5"
                />
                <div className="flex flex-wrap gap-1">
                  {commonCategoryGroups.map(g => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setFormData(prev => ({ ...prev, categoryGroup: g }))}
                      className="text-[10px] px-1.5 py-0.5 bg-zinc-100 hover:bg-emerald-50 hover:text-emerald-800 border border-zinc-200 rounded-xs transition-colors cursor-pointer text-zinc-600 font-mono"
                    >
                      + {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* MOQ & Lead Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                    MOQ Tối Thiểu
                  </label>
                  <input
                    type="text"
                    value={formData.moq}
                    onChange={(e) => setFormData(prev => ({ ...prev, moq: e.target.value }))}
                    placeholder="Ví dụ: 1,000 cặp, 500m, 50kg..."
                    className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                    Thời Gian Làm Mẫu Thử
                  </label>
                  <input
                    type="text"
                    value={formData.sampleLeadTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, sampleLeadTime: e.target.value }))}
                    placeholder="Ví dụ: 2-3 ngày làm việc"
                    className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                  Ghi Chú Kỹ Thuật / Chi Tiết Đi Kèm
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Ví dụ: Đóng gói cuộn hoặc cặp, khắc laser theo yêu cầu..."
                  className="w-full px-3 py-2 border border-zinc-300 rounded-sm text-xs focus:border-emerald-600 focus:outline-none resize-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-[11px] font-bold font-mono text-zinc-700 uppercase mb-1">
                  Trạng Thái Áp Dụng
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
                    <span className="text-zinc-800 font-medium">Áp dụng trong bảng báo giá</span>
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
                    <span className="text-zinc-500">Ẩn (Tạm ngưng)</span>
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
                  <span>{editingSpec ? 'Lưu Thay Đổi' : 'Thêm Quy Cách'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
