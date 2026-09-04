import React, { useState } from 'react';
import { COMPANY_PERKS } from '../data/careersData';
import { JobOpening } from '../types';
import { 
  Briefcase, MapPin, Clock, DollarSign, Calendar, ChevronRight, 
  Send, CheckCircle2, ShieldCheck, Bus, Utensils, GraduationCap, 
  HeartHandshake, X, FileText, AlertCircle, Sparkles 
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

interface CareersPageProps {
  onNavigateToContact: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = () => {
  const { t, language } = useLanguage();
  const { jobs = [], jobOpenings = [], addApplication } = useData();
  const currentJobs = (jobs || jobOpenings || []).filter((j) => j.status !== 'hidden');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [viewingJob, setViewingJob] = useState<JobOpening | null>(null);
  const [applyingJob, setApplyingJob] = useState<JobOpening | null>(null);

  // Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('');
  const [applicantResumeLink, setApplicantResumeLink] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const departments = [
    { id: 'all', label: language === 'en' ? 'All Roles' : language === 'id' ? 'Semua Posisi' : 'Tất Cả Vị Trí' },
    { id: 'Sản Xuất & Kỹ Thuật', label: language === 'en' ? 'Production & Tech' : language === 'id' ? 'Produksi & Teknik' : 'Sản Xuất & Kỹ Thuật' },
    { id: 'Kiểm Soát Chất Lượng QC/QA', label: language === 'en' ? 'QA / QC Inspection' : language === 'id' ? 'Pemeriksaan QA / QC' : 'QC / KCS' },
    { id: 'Kinh Doanh & Phát Triển Thị Trường', label: language === 'en' ? 'B2B Sales' : language === 'id' ? 'Penjualan B2B' : 'Kinh Doanh B2B' }
  ];

  const filteredJobs = (currentJobs || []).filter((job) => {
    return selectedDepartment === 'all' || job.department === selectedDepartment;
  });

  const handleApplyClick = (job: JobOpening) => {
    setViewingJob(null);
    setApplyingJob(job);
    setSubmitSuccess(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addApplication({
        jobId: applyingJob?.id || 'general',
        jobTitle: applyingJob?.title || 'Ứng tuyển chung',
        applicantName,
        applicantEmail,
        applicantPhone,
        applicantExperience,
        applicantResumeLink,
        applicantNote
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 600);
  };

  const getPerkIcon = (name: string) => {
    switch (name) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-emerald-600" />;
      case 'Bus': return <Bus className="w-5 h-5 text-emerald-600" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-emerald-600" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white text-zinc-900 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Page Title & Intro */}
        <div className="text-left space-y-2 mb-14 pb-6 border-b border-zinc-200">
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block">
            {language === 'en' ? 'Career Opportunities • Hiring 2026' : language === 'id' ? 'Peluang Karir • Rekrutmen 2026' : 'Cơ Hội Nghề Nghiệp • Tuyển Dụng 2026'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-900">
            {language === 'en' ? 'Join the Lien Chau Textile Team' : language === 'id' ? 'Bergabunglah dengan Tim Tekstil Lien Chau' : 'Gia Nhập Đội Ngũ Dệt May Liên Châu'}
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {language === 'en'
              ? 'We welcome skilled textile engineers, weaving machine operators, and international trade specialists to build world-class footwear trim supply chains.'
              : language === 'id'
              ? 'Kami menyambut insinyur tekstil berpengalaman, operator mesin rajut, dan spesialis penjualan B2B untuk bersama membangun rantai pasok aksesori sepatu berstandar dunia.'
              : 'Chúng tôi luôn chào đón các kỹ sư dệt may tài năng, trưởng ca vận hành máy và chuyên viên kinh doanh cùng xây dựng chuỗi cung ứng phụ liệu giày dép tiêu chuẩn xuất khẩu hàng đầu Việt Nam.'}
          </p>
        </div>

        {/* Why Join Us / Company Perks Grid */}
        <div className="mb-16">
          <div className="text-left mb-6">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900">
              {language === 'en' ? 'Benefits & Working Environment' : language === 'id' ? 'Manfaat & Lingkungan Kerja' : 'Quyền Lợi & Chế Độ Đãi Ngộ'}
            </h2>
            <p className="text-zinc-500 text-xs mt-1 font-mono uppercase">
              {language === 'en' ? 'Safe workplace, mutual respect, and transparent promotion pathways' : language === 'id' ? 'Tempat kerja aman, saling menghormati, dan jalur promosi transparan' : 'Môi trường làm việc an toàn, tôn trọng và lộ trình thăng tiến rõ ràng'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {COMPANY_PERKS.map((perk, i) => (
              <div
                key={i}
                className="p-5 bg-zinc-50 border border-zinc-200 hover:border-emerald-500 transition-all rounded-sm shadow-xs"
              >
                <div className="w-10 h-10 bg-white border border-zinc-200 rounded-sm flex items-center justify-center mb-3.5">
                  {getPerkIcon(perk.icon)}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900 mb-1.5">
                  {perk.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings Section */}
        <div className="text-left mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900">
                {language === 'en' ? 'Current Vacancies' : language === 'id' ? 'Lowongan Saat Ini' : 'Các Vị Trí Đang Tuyển Dụng'}
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                {language === 'en' ? 'Lien Chau Factory • Lot CN7, Song Than 3 IP, Binh Duong' : language === 'id' ? 'Pabrik Lien Chau • Lot CN7, KWS Song Than 3, Binh Duong' : 'Nhà máy Liên Châu • Lô CN7, Đường N5, KCN Sóng Thần 3, Bình Dương'}
              </p>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer whitespace-nowrap transition-colors ${
                    selectedDepartment === dept.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  {dept.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="p-10 text-center bg-zinc-50 border border-zinc-200 rounded-sm">
                <Briefcase className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-zinc-800 uppercase tracking-tight mb-1">
                  {language === 'en' ? 'No Active Vacancies Currently' : language === 'id' ? 'Tidak Ada Lowongan Saat Ini' : 'Hiện Chưa Có Vị Trí Tuyển Dụng Mới'}
                </h3>
                <p className="text-xs text-zinc-500 max-w-md mx-auto mb-4">
                  {language === 'en'
                    ? 'All previous openings have been filled. You are still welcome to submit an open general application for future opportunities.'
                    : language === 'id'
                    ? 'Semua posisi saat ini telah terisi. Anda tetap dipersilakan mengirimkan CV umum untuk kesempatan berikutnya.'
                    : 'Các vị trí tuyển dụng trước đó đã hoàn tất tuyển chọn. Quý ứng viên có thể gửi hồ sơ tự do bên dưới để bộ phận nhân sự lưu trữ và chủ động liên hệ khi có nhu cầu mới.'}
                </p>
                <button
                  onClick={() => handleApplyClick({
                    id: 'general',
                    title: 'Ứng tuyển tự do / General Application',
                    department: 'Nhân Sự & Tuyển Dụng',
                    location: 'KCN Sóng Thần 3, Bình Dương',
                    type: 'Toàn thời gian',
                    salary: 'Thỏa thuận',
                    experience: 'Tùy vị trí',
                    deadline: 'Thường xuyên',
                    description: 'Hồ sơ tự do gửi tới ban quản lý nhân sự nhà máy Dệt Liên Châu.',
                    requirements: [],
                    responsibilities: [],
                    benefits: []
                  })}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Submit General Application' : language === 'id' ? 'Kirim Lamaran Umum' : 'Gửi Hồ Sơ Ứng Tuyển Tự Do'}
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-5 sm:p-6 bg-white border border-zinc-200 hover:border-emerald-500 transition-all rounded-sm shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm">
                        {job.department}
                      </span>
                      {job.urgent && (
                        <span className="px-2 py-0.5 bg-red-50 border border-red-200 text-red-700 font-mono text-[9px] font-bold uppercase tracking-wider rounded-sm animate-pulse">
                          {language === 'en' ? 'Urgent' : language === 'id' ? 'Mendesak' : 'Tuyển Gấp'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-zinc-900 hover:text-emerald-700 transition-colors">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-600 font-mono">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        KCN Sóng Thần 3, Bình Dương
                      </span>
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <strong className="text-emerald-700">{job.salary}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {language === 'en' ? 'Deadline:' : language === 'id' ? 'Batas Waktu:' : 'Hạn nộp:'} {job.deadline}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setViewingJob(job)}
                      className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
                    >
                      {language === 'en' ? 'View Details' : language === 'id' ? 'Lihat Detail' : 'Xem Chi Tiết'}
                    </button>
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm shadow-sm"
                    >
                      {language === 'en' ? 'Apply Now' : language === 'id' ? 'Lamar Sekarang' : 'Ứng Tuyển Ngay'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* HR Contact Box */}
        <div className="p-6 sm:p-8 bg-zinc-50 border border-zinc-200 text-left rounded-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-1.5">
            <h3 className="text-base font-bold text-zinc-900 uppercase tracking-tight">
              {language === 'en' ? 'Lien Chau HR & Recruitment Department' : language === 'id' ? 'Departemen HR & Rekrutmen Pabrik Lien Chau' : 'Phòng Nhân Sự & Tuyển Dụng Nhà Máy Liên Châu'}
            </h3>
            <p className="text-xs text-zinc-600">
              {language === 'en'
                ? 'You can send your CV directly via recruitment email or call our HR hotline for direct on-site interview coordination at our factory.'
                : language === 'id'
                ? 'Anda dapat mengirimkan CV langsung melalui email rekrutmen atau menghubungi hotline HR untuk jadwal wawancara langsung di pabrik.'
                : 'Bạn có thể gửi CV trực tiếp qua email tuyển dụng hoặc liên hệ hotline nhân sự để được hướng dẫn nộp hồ sơ phỏng vấn trực tiếp tại xưởng.'}
            </p>
          </div>
          <div className="space-y-1 text-xs font-mono">
            <p><strong>{language === 'en' ? 'HR Hotline:' : language === 'id' ? 'Hotline HR:' : 'Hotline Tuyển Dụng:'}</strong> 0988.688.868 (Ms. Thảo - HR)</p>
            <p><strong>{language === 'en' ? 'Application Email:' : language === 'id' ? 'Email Lamaran:' : 'Email Nhận Hồ Sơ:'}</strong> hr@lienchau.com</p>
            <p><strong>{language === 'en' ? 'Interview Venue:' : language === 'id' ? 'Lokasi Wawancara:' : 'Địa chỉ phỏng vấn:'}</strong> Lô CN7, KCN Sóng Thần 3, Bình Dương</p>
          </div>
        </div>

      </div>

      {/* Job Details Modal */}
      {viewingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm border border-zinc-200 shadow-2xl p-6 sm:p-8 text-left relative">
            <button
              onClick={() => setViewingJob(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm">
                  {viewingJob.department}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900">
                  {viewingJob.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-600 pt-1">
                  <span>{language === 'en' ? 'Salary:' : language === 'id' ? 'Gaji:' : 'Mức lương:'} <strong className="text-emerald-700">{viewingJob.salary}</strong></span>
                  <span>•</span>
                  <span>{language === 'en' ? 'Experience:' : language === 'id' ? 'Pengalaman:' : 'Kinh nghiệm:'} {viewingJob.experience}</span>
                  <span>•</span>
                  <span>{language === 'en' ? 'Deadline:' : language === 'id' ? 'Batas Waktu:' : 'Hạn nộp:'} {viewingJob.deadline}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 text-xs leading-relaxed text-zinc-700">
                <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-xs font-mono">
                  {language === 'en' ? '1. Job Description' : language === 'id' ? '1. Deskripsi Pekerjaan' : '1. Mô Tả Công Việc'}
                </h4>
                <p>{viewingJob.description}</p>
                <ul className="list-disc pl-4 space-y-1 pt-1">
                  {viewingJob.responsibilities.map((res, idx) => (
                    <li key={idx}>{res}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="space-y-1 text-xs leading-relaxed text-zinc-700">
                <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-xs font-mono">
                  {language === 'en' ? '2. Candidate Requirements' : language === 'id' ? '2. Persyaratan Kandidat' : '2. Yêu Cầu Ứng Viên'}
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  {viewingJob.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-1 text-xs leading-relaxed text-zinc-700">
                <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-xs font-mono">
                  {language === 'en' ? '3. Employee Benefits' : language === 'id' ? '3. Manfaat Karyawan' : '3. Quyền Lợi Được Hưởng'}
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  {viewingJob.benefits.map((ben, idx) => (
                    <li key={idx}>{ben}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => setViewingJob(null)}
                  className="px-5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
                >
                  {language === 'en' ? 'Close' : language === 'id' ? 'Tutup' : 'Đóng'}
                </button>
                <button
                  onClick={() => handleApplyClick(viewingJob)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
                >
                  {language === 'en' ? 'Submit Application' : language === 'id' ? 'Kirim Lamaran' : 'Nộp Hồ Sơ Ứng Tuyển'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Online Application Form Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-sm border border-zinc-200 shadow-2xl p-6 sm:p-8 text-left relative">
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-zinc-900">
                  {language === 'en' ? 'Application Submitted Successfully!' : language === 'id' ? 'Lamaran Berhasil Dikirim!' : 'Nộp Hồ Sơ Thành Công!'}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                  {language === 'en'
                    ? `Thank you for applying for the position of ${applyingJob.title}. The Lien Chau recruitment board will review your profile and contact you within 48 business hours.`
                    : language === 'id'
                    ? `Terima kasih telah melamar posisi ${applyingJob.title}. Departemen rekrutmen Pabrik Lien Chau akan meninjau berkas Anda dan menghubungi dalam 48 jam kerja.`
                    : `Cảm ơn bạn đã ứng tuyển vào vị trí ${applyingJob.title}. Bộ phận tuyển dụng Nhà máy Liên Châu sẽ xem xét hồ sơ và liên hệ phỏng vấn trong vòng 48 giờ làm việc.`}
                </p>
                <button
                  onClick={() => setApplyingJob(null)}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
                >
                  {language === 'en' ? 'Done' : language === 'id' ? 'Selesai' : 'Hoàn Tất'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">
                    {language === 'en' ? 'Applying for role:' : language === 'id' ? 'Melamar posisi:' : 'Ứng tuyển vị trí:'}
                  </span>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900">
                    {applyingJob.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">{applyingJob.department} • {applyingJob.location}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 font-mono block mb-1">
                      {language === 'en' ? 'Full Name *' : language === 'id' ? 'Nama Lengkap *' : 'Họ Và Tên *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyen Van A"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 text-xs text-zinc-900 outline-none rounded-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 font-mono block mb-1">
                        {language === 'en' ? 'Phone / WhatsApp *' : language === 'id' ? 'Telepon / WhatsApp *' : 'Số Điện Thoại / Zalo *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0912 345 678"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 text-xs text-zinc-900 outline-none rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 font-mono block mb-1">
                        {language === 'en' ? 'Email Address *' : language === 'id' ? 'Alamat Email *' : 'Email Liên Hệ *'}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="candidate@gmail.com"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 text-xs text-zinc-900 outline-none rounded-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 font-mono block mb-1">
                      {language === 'en' ? 'Relevant Experience *' : language === 'id' ? 'Pengalaman Terkait *' : 'Kinh Nghiệm Làm Việc Liên Quan *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'en' ? 'e.g., 2 years operating weaving looms / 1 year footwear QA...' : language === 'id' ? 'misal: 2 tahun operator mesin rajut / 1 tahun QA sepatu...' : 'VD: 2 năm vận hành máy dệt / 1 năm QC da giày...'}
                      value={applicantExperience}
                      onChange={(e) => setApplicantExperience(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 text-xs text-zinc-900 outline-none rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 font-mono block mb-1">
                      {language === 'en' ? 'CV / Resume Link (Google Drive, Dropbox, LinkedIn...)' : language === 'id' ? 'Tautan CV / Resume (Google Drive, Dropbox, LinkedIn...)' : 'Link CV / Hồ Sơ Ứng Tuyển (Google Drive, Dropbox, TopCV...)'}
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/your-cv"
                      value={applicantResumeLink}
                      onChange={(e) => setApplicantResumeLink(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 text-xs text-zinc-900 outline-none rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 font-mono block mb-1">
                      {language === 'en' ? 'Self Introduction / Aspirations' : language === 'id' ? 'Pengenalan Diri / Harapan' : 'Giới Thiệu Bản Thân / Nguyện Vọng'}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={language === 'en' ? 'Tell us why you want to work at Lien Chau Factory...' : language === 'id' ? 'Ceritakan alasan Anda ingin bergabung dengan Pabrik Lien Chau...' : 'Chia sẻ lý do bạn muốn làm việc tại Nhà máy Liên Châu...'}
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 focus:border-emerald-600 text-xs text-zinc-900 outline-none resize-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyingJob(null)}
                    className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
                  >
                    {language === 'en' ? 'Cancel' : language === 'id' ? 'Batal' : 'Hủy Bỏ'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 rounded-sm disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>{language === 'en' ? 'Submitting...' : language === 'id' ? 'Mengirim...' : 'Đang gửi hồ sơ...'}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Submit Application' : language === 'id' ? 'Kirim Lamaran' : 'Gửi Hồ Sơ Ứng Tuyển'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
