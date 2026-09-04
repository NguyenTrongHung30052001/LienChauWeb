import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, ProductCategory, NewsArticle, JobOpening, CategoryItem, QuoteRequestItem, JobApplicationItem } from '../types';
import { PRODUCTS } from '../data/mockData';
import { NEWS_ARTICLES } from '../data/newsData';
import { JOB_OPENINGS } from '../data/careersData';
import { supabase } from '../lib/supabase';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'shoelace',
    name: 'Dây Giày Thể Thao & Sneaker',
    nameEn: 'Sports & Sneaker Shoelaces',
    description: 'Dây dệt tròn bện, bản dẹt thể thao, dây da sáp, dây phản quang cho giày chạy bộ, sneaker và boots.',
    icon: 'Layers',
    isFeatured: true
  },
  {
    id: 'webbing',
    name: 'Dây Đai Dệt Webbing Chịu Lực',
    nameEn: 'Heavy-Duty Webbing Tapes',
    description: 'Đai dệt Polyester High-Tenacity, Nylon bản 20mm - 50mm cho balo, túi xách cao cấp, đai an toàn.',
    icon: 'Shield',
    isFeatured: true
  },
  {
    id: 'elastic',
    name: 'Dây Thun Bản & Thun Tròn Co Giãn',
    nameEn: 'Elastic Bands & Bungee Cords',
    description: 'Thun bản lưng quần dệt thoi, thun dệt kim, thun tròn đàn hồi hồi phục > 98% chuẩn Oeko-Tex.',
    icon: 'Sliders',
    isFeatured: true
  },
  {
    id: 'drawstring',
    name: 'Dây Luồn Áo Quần & Hoodie',
    nameEn: 'Hoodie & Sportswear Drawstrings',
    description: 'Dây luồn tròn rỗng, luồn dẹt thời trang kèm đầu bấm kim loại khắc thương hiệu theo yêu cầu.',
    icon: 'Sparkles',
    isFeatured: true
  },
  {
    id: 'tipping',
    name: 'Gia Công Bấm Đầu Aglet Kim Loại',
    nameEn: 'Aglet Tipping & Finishing',
    description: 'Bấm đầu kim loại mạ PVD, khắc laser logo, màng co sinh học tự phân hủy PLA, bọc silicon.',
    icon: 'Cpu',
    isFeatured: true
  },
  {
    id: 'new',
    name: 'Sản Phẩm Mới (2026 & ECO-RPET)',
    nameEn: 'New Products & Eco Innovations',
    description: 'Dòng sản phẩm sợi tái chế GRS bảo vệ môi trường, giảm phát thải và dây dạ quang phát sáng ban đêm.',
    icon: 'Leaf',
    isFeatured: true
  },
  {
    id: 'fw25',
    name: 'Bộ Sưu Tập Xu Hướng FW25',
    nameEn: 'FW25 Collection Trends',
    description: 'Phối màu xu hướng tông đất trầm, họa tiết bện cổ điển Retro Hiking cho mùa thời trang quốc tế.',
    icon: 'Award',
    isFeatured: true
  }
];

export const INITIAL_QUOTES: QuoteRequestItem[] = [
  {
    id: 'quote-1001',
    createdAt: '2026-09-03 14:30',
    fullName: 'Trần Minh Đức',
    companyName: 'Tập đoàn Giày Biti\'s Hunters',
    email: 'duc.tm@bitis.com.vn',
    phone: '0918.234.567',
    productType: 'Dây Dẹt Thể Thao Sneaker Pro (Bản 8mm)',
    quantity: '50,000 cặp',
    lengthOption: '120cm',
    agletType: 'Kim loại khắc Laser logo Biti\'s',
    notes: 'Cần gửi mẫu KCS màu Trắng quang học và Đen nhám kèm bảng test lực kéo đứt > 150N.',
    status: 'new'
  },
  {
    id: 'quote-1002',
    createdAt: '2026-09-02 09:15',
    fullName: 'Michael Pham',
    companyName: 'Apex Footwear OEM (FOB Export)',
    email: 'michael@apexfootwear.vn',
    phone: '0903.888.999',
    productType: 'Dây Dệt Jacquard ECO-RPET 2026',
    quantity: '120,000 cặp',
    lengthOption: '140cm',
    agletType: 'Màng sinh học phân hủy PLA',
    notes: 'Yêu cầu chứng chỉ GRS Scope Certificate và Oeko-Tex Standard 100 Class 1.',
    status: 'quoted'
  },
  {
    id: 'quote-1003',
    createdAt: '2026-08-31 16:45',
    fullName: 'Lê Thị Thu Thảo',
    companyName: 'Công ty Cổ phần May Thêu Thể Thao Việt',
    email: 'thao.le@vietgarment.com',
    phone: '0938.456.789',
    productType: 'Dây Thun Bản Lưng Quần Dệt Thoi 40mm',
    quantity: '20,000 mét',
    lengthOption: 'Cuộn 100m',
    agletType: 'Không đầu bấm (Dạng cuộn)',
    notes: 'Độ giãn 120%, giặt sấy 60 độ C không bai nhão.',
    status: 'contacted'
  }
];

export const INITIAL_APPLICATIONS: JobApplicationItem[] = [
  {
    id: 'app-01',
    jobId: 'job-weaving-eng',
    jobTitle: 'Kỹ Sư Vận Hành Máy Dệt Bện Tự Động',
    applicantName: 'Hoàng Văn Nam',
    applicantEmail: 'nam.hoang.textile@gmail.com',
    applicantPhone: '0979.112.233',
    applicantExperience: '4 năm kinh nghiệm máy dệt thoi & dệt kim Đài Loan tại KCN VSIP 1',
    applicantResumeLink: 'https://drive.google.com/cv-nam-textile.pdf',
    applicantNote: 'Em có thể đi làm theo ca sản xuất tại KCN Sóng Thần 3 ngay khi nhận việc.',
    createdAt: '2026-09-01 10:20',
    status: 'reviewed'
  },
  {
    id: 'app-02',
    jobId: 'job-qc-lead',
    jobTitle: 'Trưởng Nhóm Kiểm Soát Chất Lượng (QC Lead)',
    applicantName: 'Nguyễn Thị Bích Trâm',
    applicantEmail: 'bichtram.qc@outlook.com',
    applicantPhone: '0908.654.321',
    applicantExperience: '5 năm QC chuyền may và phụ liệu giày xuất khẩu chứng chỉ ISO/Oeko-Tex',
    applicantResumeLink: 'https://linkedin.com/in/bichtram-qc',
    applicantNote: 'Mong muốn làm việc lâu dài cùng ban điều hành nhà máy Liên Châu.',
    createdAt: '2026-09-02 15:40',
    status: 'new'
  }
];

interface DataContextType {
  products: Product[];
  categories: CategoryItem[];
  newsArticles: NewsArticle[];
  jobOpenings: JobOpening[];
  quotes: QuoteRequestItem[];
  applications: JobApplicationItem[];
  supabaseStatus: 'connected' | 'connecting' | 'error';
  lastSyncTime: string;
  syncFromSupabase: () => Promise<void>;

  // Products CRUD
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Categories CRUD
  addCategory: (cat: CategoryItem) => void;
  updateCategory: (id: string, updated: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;

  // News CRUD
  addArticle: (article: Omit<NewsArticle, 'id'>) => NewsArticle;
  updateArticle: (id: string, updated: Partial<NewsArticle>) => void;
  deleteArticle: (id: string) => void;

  // Careers CRUD
  addJob: (job: Omit<JobOpening, 'id'>) => JobOpening;
  updateJob: (id: string, updated: Partial<JobOpening>) => void;
  deleteJob: (id: string) => void;
  toggleJobUrgent: (id: string) => void;

  // Quotes
  addQuote: (quote: Omit<QuoteRequestItem, 'id' | 'createdAt' | 'status'>) => QuoteRequestItem;
  updateQuoteStatus: (id: string, status: QuoteRequestItem['status']) => void;
  deleteQuote: (id: string) => void;

  // Applications
  addApplication: (app: Omit<JobApplicationItem, 'id' | 'createdAt' | 'status'>) => JobApplicationItem;
  updateApplicationStatus: (id: string, status: JobApplicationItem['status']) => void;
  deleteApplication: (id: string) => void;

  // Backup & Reset
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'lienchau_products_v2',
  CATEGORIES: 'lienchau_categories_v2',
  NEWS: 'lienchau_news_v2',
  JOBS: 'lienchau_jobs_v2',
  QUOTES: 'lienchau_quotes_v2',
  APPLICATIONS: 'lienchau_applications_v2'
};

// Row mappers between App types and Supabase PostgreSQL tables
const mapRowToProduct = (row: any): Product => ({
  id: row.id,
  name: row.name,
  category: row.category as ProductCategory,
  categoryName: row.category_name || row.categoryName,
  subtitle: row.subtitle || '',
  material: row.material || '',
  widthOrDiameter: row.width_or_diameter || row.widthOrDiameter || '',
  tensileStrength: row.tensile_strength || row.tensileStrength || '',
  description: row.description || '',
  features: Array.isArray(row.features) ? row.features : [],
  colors: Array.isArray(row.colors) ? row.colors : [],
  agletOptions: Array.isArray(row.aglet_options) ? row.aglet_options : (Array.isArray(row.agletOptions) ? row.agletOptions : []),
  moq: row.moq || '1,000 cặp',
  badge: row.badge,
  modelColor: row.model_color || row.modelColor || '#1e293b',
  modelTexture: row.model_texture || row.modelTexture || 'woven',
  image: row.image || '',
  isNew: row.is_new ?? row.isNew ?? false,
  isFW25: row.is_fw25 ?? false
});

const mapProductToRow = (p: Product) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  category_name: p.categoryName || '',
  subtitle: p.subtitle || '',
  material: p.material || '',
  width_or_diameter: p.widthOrDiameter || '',
  tensile_strength: p.tensileStrength || '',
  description: p.description || '',
  features: p.features || [],
  colors: p.colors || [],
  aglet_options: p.agletOptions || [],
  moq: p.moq || '',
  badge: p.badge || '',
  model_color: p.modelColor || '',
  model_texture: p.modelTexture || 'woven',
  image: p.image || '',
  is_new: p.isNew ?? false,
  updated_at: new Date().toISOString()
});

const mapRowToArticle = (row: any): NewsArticle => ({
  id: row.id,
  title: row.title,
  slug: row.slug || row.id,
  category: row.category || 'Tin tức',
  date: row.published_at || (row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '15/02/2025'),
  readTime: row.read_time || '3 phút đọc',
  summary: row.summary || '',
  content: Array.isArray(row.content) ? row.content : [row.content || ''],
  image: row.image || '',
  tags: Array.isArray(row.tags) ? row.tags : [],
  author: row.author || 'Ban Biên Tập Liên Châu'
});

const mapArticleToRow = (a: NewsArticle) => ({
  id: a.id,
  title: a.title,
  slug: a.slug || a.id,
  category: a.category,
  read_time: a.readTime,
  published_at: a.date,
  summary: a.summary,
  content: Array.isArray(a.content) ? a.content.join('\n\n') : a.content,
  image: a.image,
  tags: a.tags,
  author: a.author,
  updated_at: new Date().toISOString()
});

const mapRowToJob = (row: any): JobOpening => ({
  id: row.id,
  title: row.title,
  department: row.department,
  location: row.location,
  type: row.type || 'Toàn thời gian',
  experience: row.experience || '1-3 năm',
  salary: row.salary || 'Thỏa thuận',
  deadline: row.deadline || '30/04/2025',
  urgent: row.is_urgent ?? false,
  description: row.overview || row.description || '',
  responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : [],
  requirements: Array.isArray(row.requirements) ? row.requirements : [],
  benefits: Array.isArray(row.benefits) ? row.benefits : []
});

const mapJobToRow = (j: JobOpening) => ({
  id: j.id,
  title: j.title,
  department: j.department,
  location: j.location,
  type: j.type,
  salary: j.salary,
  deadline: j.deadline,
  experience: j.experience,
  overview: j.description,
  responsibilities: j.responsibilities,
  requirements: j.requirements,
  benefits: j.benefits,
  is_urgent: j.urgent ?? false,
  updated_at: new Date().toISOString()
});

const mapRowToQuote = (row: any): QuoteRequestItem => ({
  id: row.id,
  createdAt: row.created_at ? new Date(row.created_at).toISOString().replace('T', ' ').substring(0, 16) : '',
  fullName: row.full_name || '',
  companyName: row.company || '',
  email: row.email || '',
  phone: row.phone || '',
  productType: row.product_interest || '',
  quantity: row.estimated_quantity ? `${row.estimated_quantity} ${row.unit || ''}`.trim() : '',
  lengthOption: '',
  agletType: '',
  notes: row.notes || row.custom_specs || '',
  status: 'new'
});

const mapRowToApplication = (row: any): JobApplicationItem => ({
  id: row.id,
  createdAt: row.created_at ? new Date(row.created_at).toISOString().replace('T', ' ').substring(0, 16) : '',
  jobId: row.job_id || '',
  jobTitle: row.job_title || '',
  applicantName: row.name || row.applicant_name || '',
  applicantEmail: row.email || row.applicant_email || '',
  applicantPhone: row.phone || row.applicant_phone || '',
  applicantExperience: row.experience || row.applicant_experience || '',
  applicantResumeLink: row.resume_link || row.applicant_resume_link || '',
  applicantNote: row.note || row.applicant_note || '',
  status: 'new'
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabaseStatus, setSupabaseStatus] = useState<'connected' | 'connecting' | 'error'>('connecting');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Chưa đồng bộ');

  // 1. Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return PRODUCTS;
  });

  // 2. Categories
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading categories from localStorage', e);
    }
    return INITIAL_CATEGORIES;
  });

  // 3. News Articles
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading news from localStorage', e);
    }
    return NEWS_ARTICLES;
  });

  // 4. Job Openings
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading jobs from localStorage', e);
    }
    return JOB_OPENINGS;
  });

  // 5. Quotes / Leads
  const [quotes, setQuotes] = useState<QuoteRequestItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading quotes from localStorage', e);
    }
    return INITIAL_QUOTES;
  });

  // 6. Applications
  const [applications, setApplications] = useState<JobApplicationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading applications from localStorage', e);
    }
    return INITIAL_APPLICATIONS;
  });

  // Fetch from Supabase
  const syncFromSupabase = useCallback(async () => {
    try {
      setSupabaseStatus('connecting');
      // 1. Products
      const { data: prods, error: prodErr } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!prodErr && prods && prods.length > 0) {
        setProducts(prods.map(mapRowToProduct));
      }

      // 2. Categories
      const { data: cats, error: catErr } = await supabase.from('categories').select('*');
      if (!catErr && cats && cats.length > 0) {
        setCategories(prev => {
          const existingMap = new Map(prev.map(c => [c.id, c]));
          cats.forEach(c => {
            if (!existingMap.has(c.id)) {
              existingMap.set(c.id, {
                id: c.id,
                name: c.name,
                nameEn: c.name,
                description: '',
                icon: 'Layers',
                isFeatured: true
              });
            }
          });
          return Array.from(existingMap.values());
        });
      }

      // 3. News Articles
      const { data: arts, error: artErr } = await supabase.from('news_articles').select('*').order('created_at', { ascending: false });
      if (!artErr && arts && arts.length > 0) {
        setNewsArticles(arts.map(mapRowToArticle));
      }

      // 4. Jobs
      const { data: jbs, error: jobErr } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
      if (!jobErr && jbs && jbs.length > 0) {
        setJobOpenings(jbs.map(mapRowToJob));
      }

      // 5. Quotes
      const { data: qts, error: qtErr } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false });
      if (!qtErr && qts && qts.length > 0) {
        setQuotes(qts.map(mapRowToQuote));
      }

      // 6. Applications
      const { data: apps, error: appErr } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
      if (!appErr && apps && apps.length > 0) {
        setApplications(apps.map(mapRowToApplication));
      }

      setSupabaseStatus('connected');
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error('Supabase initial fetch error:', e);
      setSupabaseStatus('error');
    }
  }, []);

  // Run initial sync on mount
  useEffect(() => {
    syncFromSupabase();
  }, [syncFromSupabase]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to persist products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to persist categories', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsArticles));
    } catch (e) {
      console.error('Failed to persist news', e);
    }
  }, [newsArticles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobOpenings));
    } catch (e) {
      console.error('Failed to persist jobs', e);
    }
  }, [jobOpenings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
    } catch (e) {
      console.error('Failed to persist quotes', e);
    }
  }, [quotes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error('Failed to persist applications', e);
    }
  }, [applications]);

  // Product Actions
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newId = `prod-${Date.now()}`;
    const newProd: Product = {
      ...productData,
      id: newId
    };
    setProducts(prev => [newProd, ...prev]);
    // Supabase persist
    supabase.from('products').insert([mapProductToRow(newProd)]).then(({ error }) => {
      if (error) console.error('Supabase insert product error:', error);
    });
    return newProd;
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => {
      const next = prev.map(p => (p.id === id ? { ...p, ...updated } : p));
      const target = next.find(p => p.id === id);
      if (target) {
        supabase.from('products').update(mapProductToRow(target)).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase update product error:', error);
        });
      }
      return next;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    supabase.from('products').delete().eq('id', id).then(({ error }) => {
      if (error) console.error('Supabase delete product error:', error);
    });
  };

  // Categories Actions
  const addCategory = (cat: CategoryItem) => {
    setCategories(prev => {
      if (prev.some(c => c.id === cat.id)) return prev;
      return [...prev, cat];
    });
    supabase.from('categories').insert([{ id: cat.id, name: cat.name, count: 0 }]).then(({ error }) => {
      if (error) console.error('Supabase insert category error:', error);
    });
  };

  const updateCategory = (id: string, updated: Partial<CategoryItem>) => {
    setCategories(prev => {
      const next = prev.map(c => (c.id === id ? { ...c, ...updated } : c));
      const target = next.find(c => c.id === id);
      if (target) {
        supabase.from('categories').update({ name: target.name }).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase update category error:', error);
        });
      }
      return next;
    });
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    supabase.from('categories').delete().eq('id', id).then(({ error }) => {
      if (error) console.error('Supabase delete category error:', error);
    });
  };

  // News Actions
  const addArticle = (articleData: Omit<NewsArticle, 'id'>): NewsArticle => {
    const newId = `news-${Date.now()}`;
    const newArt: NewsArticle = {
      ...articleData,
      id: newId
    };
    setNewsArticles(prev => [newArt, ...prev]);
    supabase.from('news_articles').insert([mapArticleToRow(newArt)]).then(({ error }) => {
      if (error) console.error('Supabase insert article error:', error);
    });
    return newArt;
  };

  const updateArticle = (id: string, updated: Partial<NewsArticle>) => {
    setNewsArticles(prev => {
      const next = prev.map(a => (a.id === id ? { ...a, ...updated } : a));
      const target = next.find(a => a.id === id);
      if (target) {
        supabase.from('news_articles').update(mapArticleToRow(target)).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase update article error:', error);
        });
      }
      return next;
    });
  };

  const deleteArticle = (id: string) => {
    setNewsArticles(prev => prev.filter(a => a.id !== id));
    supabase.from('news_articles').delete().eq('id', id).then(({ error }) => {
      if (error) console.error('Supabase delete article error:', error);
    });
  };

  // Jobs Actions
  const addJob = (jobData: Omit<JobOpening, 'id'>): JobOpening => {
    const newId = `job-${Date.now()}`;
    const newJob: JobOpening = {
      ...jobData,
      id: newId
    };
    setJobOpenings(prev => [newJob, ...prev]);
    supabase.from('jobs').insert([mapJobToRow(newJob)]).then(({ error }) => {
      if (error) console.error('Supabase insert job error:', error);
    });
    return newJob;
  };

  const updateJob = (id: string, updated: Partial<JobOpening>) => {
    setJobOpenings(prev => {
      const next = prev.map(j => (j.id === id ? { ...j, ...updated } : j));
      const target = next.find(j => j.id === id);
      if (target) {
        supabase.from('jobs').update(mapJobToRow(target)).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase update job error:', error);
        });
      }
      return next;
    });
  };

  const deleteJob = (id: string) => {
    setJobOpenings(prev => prev.filter(j => j.id !== id));
    supabase.from('jobs').delete().eq('id', id).then(({ error }) => {
      if (error) console.error('Supabase delete job error:', error);
    });
  };

  const toggleJobUrgent = (id: string) => {
    setJobOpenings(prev => {
      const next = prev.map(j => (j.id === id ? { ...j, urgent: !j.urgent } : j));
      const target = next.find(j => j.id === id);
      if (target) {
        supabase.from('jobs').update({ is_urgent: target.urgent }).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase toggle urgent error:', error);
        });
      }
      return next;
    });
  };

  // Quotes Actions
  const addQuote = (quoteData: Omit<QuoteRequestItem, 'id' | 'createdAt' | 'status'>): QuoteRequestItem => {
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newQuote: QuoteRequestItem = {
      ...quoteData,
      id: `quote-${Date.now()}`,
      createdAt: dateStr,
      status: 'new'
    };
    setQuotes(prev => [newQuote, ...prev]);
    supabase.from('quote_requests').insert([{
      id: newQuote.id,
      ref_code: newQuote.id,
      full_name: newQuote.fullName,
      company: newQuote.companyName || '',
      email: newQuote.email,
      phone: newQuote.phone,
      product_interest: newQuote.productType || '',
      estimated_quantity: newQuote.quantity || '',
      unit: '',
      custom_specs: `Độ dài: ${newQuote.lengthOption || 'N/A'}, Aglet: ${newQuote.agletType || 'N/A'}`,
      notes: newQuote.notes || ''
    }]).then(({ error }) => {
      if (error) console.error('Supabase insert quote error:', error);
    });
    return newQuote;
  };

  const updateQuoteStatus = (id: string, status: QuoteRequestItem['status']) => {
    setQuotes(prev =>
      prev.map(q => (q.id === id ? { ...q, status } : q))
    );
  };

  const deleteQuote = (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
    supabase.from('quote_requests').delete().eq('id', id).then(({ error }) => {
      if (error) console.error('Supabase delete quote error:', error);
    });
  };

  // Applications Actions
  const addApplication = (appData: Omit<JobApplicationItem, 'id' | 'createdAt' | 'status'>): JobApplicationItem => {
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newApp: JobApplicationItem = {
      ...appData,
      id: `app-${Date.now()}`,
      createdAt: dateStr,
      status: 'new'
    };
    setApplications(prev => [newApp, ...prev]);
    supabase.from('applications').insert([{
      id: newApp.id,
      job_id: newApp.jobId,
      job_title: newApp.jobTitle,
      name: newApp.applicantName,
      email: newApp.applicantEmail,
      phone: newApp.applicantPhone,
      experience: newApp.applicantExperience || '',
      resume_link: newApp.applicantResumeLink || '',
      note: newApp.applicantNote || ''
    }]).then(({ error }) => {
      if (error) console.error('Supabase insert application error:', error);
    });
    return newApp;
  };

  const updateApplicationStatus = (id: string, status: JobApplicationItem['status']) => {
    setApplications(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    supabase.from('applications').delete().eq('id', id).then(({ error }) => {
      if (error) console.error('Supabase delete application error:', error);
    });
  };

  // Reset to factory defaults
  const resetToDefaults = () => {
    setProducts(PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setNewsArticles(NEWS_ARTICLES);
    setJobOpenings(JOB_OPENINGS);
    setQuotes(INITIAL_QUOTES);
    setApplications(INITIAL_APPLICATIONS);
    try {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.NEWS);
      localStorage.removeItem(STORAGE_KEYS.JOBS);
      localStorage.removeItem(STORAGE_KEYS.QUOTES);
      localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
  };

  // Export JSON
  const exportDataJSON = (): string => {
    const backup = {
      exportedAt: new Date().toISOString(),
      company: 'Công ty Cổ phần Sản xuất Dệt Liên Châu',
      products,
      categories,
      newsArticles,
      jobOpenings,
      quotes,
      applications
    };
    return JSON.stringify(backup, null, 2);
  };

  // Import JSON
  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.products && Array.isArray(data.products)) setProducts(data.products);
      if (data.categories && Array.isArray(data.categories)) setCategories(data.categories);
      if (data.newsArticles && Array.isArray(data.newsArticles)) setNewsArticles(data.newsArticles);
      if (data.jobOpenings && Array.isArray(data.jobOpenings)) setJobOpenings(data.jobOpenings);
      if (data.quotes && Array.isArray(data.quotes)) setQuotes(data.quotes);
      if (data.applications && Array.isArray(data.applications)) setApplications(data.applications);
      return true;
    } catch (e) {
      console.error('Failed to import JSON', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        newsArticles,
        jobOpenings,
        quotes,
        applications,
        supabaseStatus,
        lastSyncTime,
        syncFromSupabase,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addArticle,
        updateArticle,
        deleteArticle,
        addJob,
        updateJob,
        deleteJob,
        toggleJobUrgent,
        addQuote,
        updateQuoteStatus,
        deleteQuote,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
