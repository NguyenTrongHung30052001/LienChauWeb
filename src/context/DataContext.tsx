import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, ProductCategory, NewsArticle, JobOpening, CategoryItem, QuoteRequestItem, JobApplicationItem } from '../types';
import { supabase } from '../lib/supabase';

interface DataContextType {
  products: Product[];
  categories: CategoryItem[];
  newsArticles: NewsArticle[];
  articles: NewsArticle[];
  jobOpenings: JobOpening[];
  jobs: JobOpening[];
  quotes: QuoteRequestItem[];
  applications: JobApplicationItem[];
  supabaseStatus: 'connected' | 'connecting' | 'error';
  lastSyncTime: string;
  isLoading: boolean;
  syncFromSupabase: () => Promise<void>;

  // Products CRUD
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;

  // Categories CRUD
  addCategory: (cat: CategoryItem) => void;
  updateCategory: (id: string, updated: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;
  toggleCategoryStatus: (id: string) => void;

  // News CRUD
  addArticle: (article: Omit<NewsArticle, 'id'>) => NewsArticle;
  updateArticle: (id: string, updated: Partial<NewsArticle>) => void;
  deleteArticle: (id: string) => void;
  toggleArticleStatus: (id: string) => void;

  // Careers CRUD
  addJob: (job: Omit<JobOpening, 'id'>) => JobOpening;
  updateJob: (id: string, updated: Partial<JobOpening>) => void;
  deleteJob: (id: string) => void;
  toggleJobUrgent: (id: string) => void;
  toggleJobStatus: (id: string) => void;

  // Quotes
  addQuote: (quote: Omit<QuoteRequestItem, 'id' | 'createdAt' | 'status'>) => QuoteRequestItem;
  updateQuoteStatus: (id: string, status: QuoteRequestItem['status']) => void;
  deleteQuote: (id: string) => void;

  // Applications
  addApplication: (app: Omit<JobApplicationItem, 'id' | 'createdAt' | 'status'>) => JobApplicationItem;
  updateApplicationStatus: (id: string, status: JobApplicationItem['status']) => void;
  deleteApplication: (id: string) => void;

  // Backup & Reset
  clearCacheAndSync: () => Promise<void>;
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
  isFW25: row.is_fw25 ?? false,
  status: (row.status === 'hidden' ? 'hidden' : 'active') as 'active' | 'hidden'
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
  status: p.status || 'active',
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
  author: row.author || 'Ban Biên Tập Liên Châu',
  status: (row.status === 'hidden' ? 'hidden' : 'active') as 'active' | 'hidden'
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
  status: a.status || 'active',
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
  benefits: Array.isArray(row.benefits) ? row.benefits : [],
  status: (row.status === 'hidden' ? 'hidden' : 'active') as 'active' | 'hidden'
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
  status: j.status || 'active',
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Pure Supabase state: always fetched directly from Supabase tables
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequestItem[]>([]);
  const [applications, setApplications] = useState<JobApplicationItem[]>([]);

  // Fetch directly from Supabase
  const syncFromSupabase = useCallback(async () => {
    try {
      setSupabaseStatus('connecting');

      // 1. Products
      const { data: prods, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (!prodErr && Array.isArray(prods)) {
        setProducts(prods.map(mapRowToProduct));
      }

      // 2. Categories
      const { data: cats, error: catErr } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });
      if (!catErr && Array.isArray(cats)) {
        setCategories(
          cats.map((c) => ({
            id: c.id,
            name: c.name,
            nameEn: c.name,
            description: '',
            icon: 'Layers',
            isFeatured: true,
            status: (c.status === 'hidden' ? 'hidden' : 'active') as 'active' | 'hidden'
          }))
        );
      }

      // 3. News Articles
      const { data: arts, error: artErr } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (!artErr && Array.isArray(arts)) {
        setNewsArticles(arts.map(mapRowToArticle));
      }

      // 4. Jobs
      const { data: jbs, error: jobErr } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      if (!jobErr && Array.isArray(jbs)) {
        setJobOpenings(jbs.map(mapRowToJob));
      }

      // 5. Quotes
      const { data: qts, error: qtErr } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (!qtErr && Array.isArray(qts)) {
        setQuotes(qts.map(mapRowToQuote));
      }

      // 6. Applications
      const { data: apps, error: appErr } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (!appErr && Array.isArray(apps)) {
        setApplications(apps.map(mapRowToApplication));
      }

      setSupabaseStatus('connected');
      setIsLoading(false);
      const now = new Date();
      setLastSyncTime(
        now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch (e) {
      console.error('Supabase fetch error:', e);
      setSupabaseStatus('error');
      setIsLoading(false);
    }
  }, []);

  // Run initial sync on mount
  useEffect(() => {
    // Clear out any obsolete mock data stored in older sessions
    try {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.NEWS);
      localStorage.removeItem(STORAGE_KEYS.JOBS);
      localStorage.removeItem(STORAGE_KEYS.QUOTES);
      localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    } catch (e) {
      // ignore
    }
    syncFromSupabase();
  }, [syncFromSupabase]);

  // Subscribe to real-time changes across all Supabase tables
  useEffect(() => {
    const channel = supabase
      .channel('supabase-live-sync')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        syncFromSupabase();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [syncFromSupabase]);

  // Auto-sync when window re-gains focus (e.g. user updated Supabase in dashboard tab)
  useEffect(() => {
    const handleFocus = () => {
      syncFromSupabase();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [syncFromSupabase]);

  // Periodic polling every 10 seconds to ensure fresh data at all times
  useEffect(() => {
    const interval = setInterval(() => {
      syncFromSupabase();
    }, 10000);
    return () => clearInterval(interval);
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

  const toggleProductStatus = (id: string) => {
    setProducts(prev => {
      const next = prev.map(p => {
        if (p.id === id) {
          const nextStatus = p.status === 'hidden' ? 'active' : 'hidden';
          return { ...p, status: nextStatus as 'active' | 'hidden' };
        }
        return p;
      });
      const target = next.find(p => p.id === id);
      if (target) {
        supabase.from('products').update({ status: target.status, updated_at: new Date().toISOString() }).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase toggle product status error:', error);
        });
      }
      return next;
    });
  };

  // Categories Actions
  const addCategory = (cat: CategoryItem) => {
    setCategories(prev => {
      if (prev.some(c => c.id === cat.id)) return prev;
      return [...prev, cat];
    });
    supabase.from('categories').insert([{ id: cat.id, name: cat.name, count: 0, status: cat.status || 'active' }]).then(({ error }) => {
      if (error) console.error('Supabase insert category error:', error);
    });
  };

  const updateCategory = (id: string, updated: Partial<CategoryItem>) => {
    setCategories(prev => {
      const next = prev.map(c => (c.id === id ? { ...c, ...updated } : c));
      const target = next.find(c => c.id === id);
      if (target) {
        supabase.from('categories').update({ name: target.name, status: target.status || 'active' }).eq('id', id).then(({ error }) => {
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

  const toggleCategoryStatus = (id: string) => {
    setCategories(prev => {
      const next = prev.map(c => {
        if (c.id === id) {
          const nextStatus = c.status === 'hidden' ? 'active' : 'hidden';
          return { ...c, status: nextStatus as 'active' | 'hidden' };
        }
        return c;
      });
      const target = next.find(c => c.id === id);
      if (target) {
        supabase.from('categories').update({ status: target.status }).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase toggle category status error:', error);
        });
      }
      return next;
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

  const toggleArticleStatus = (id: string) => {
    setNewsArticles(prev => {
      const next = prev.map(a => {
        if (a.id === id) {
          const nextStatus = a.status === 'hidden' ? 'active' : 'hidden';
          return { ...a, status: nextStatus as 'active' | 'hidden' };
        }
        return a;
      });
      const target = next.find(a => a.id === id);
      if (target) {
        supabase.from('news_articles').update({ status: target.status, updated_at: new Date().toISOString() }).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase toggle article status error:', error);
        });
      }
      return next;
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

  const toggleJobStatus = (id: string) => {
    setJobOpenings(prev => {
      const next = prev.map(j => {
        if (j.id === id) {
          const nextStatus = j.status === 'hidden' ? 'active' : 'hidden';
          return { ...j, status: nextStatus as 'active' | 'hidden' };
        }
        return j;
      });
      const target = next.find(j => j.id === id);
      if (target) {
        supabase.from('jobs').update({ status: target.status, updated_at: new Date().toISOString() }).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase toggle job status error:', error);
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
  const addApplication = (appData: Omit<JobApplicationItem, 'id' | 'createdAt' | 'status'> | any): JobApplicationItem => {
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const applicantName = appData.applicantName || appData.name || '';
    const applicantEmail = appData.applicantEmail || appData.email || '';
    const applicantPhone = appData.applicantPhone || appData.phone || '';
    const applicantExperience = appData.applicantExperience || appData.experience || '';
    const applicantResumeLink = appData.applicantResumeLink || appData.resumeLink || '';
    const applicantNote = appData.applicantNote || appData.note || '';

    const newApp: JobApplicationItem = {
      ...appData,
      id: `app-${Date.now()}`,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantExperience,
      applicantResumeLink,
      applicantNote,
      createdAt: dateStr,
      status: 'new'
    };
    setApplications(prev => [newApp, ...(prev || [])]);
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

  // Clear local storage and force fresh sync from Supabase
  const clearCacheAndSync = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.NEWS);
      localStorage.removeItem(STORAGE_KEYS.JOBS);
      localStorage.removeItem(STORAGE_KEYS.QUOTES);
      localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    } catch (e) {
      console.error('Failed to clear storage cache', e);
    }
    await syncFromSupabase();
  };

  // Reset: clears local cache and strictly reloads directly from Supabase
  const resetToDefaults = () => {
    clearCacheAndSync();
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
        products: products || [],
        categories: categories || [],
        newsArticles: newsArticles || [],
        articles: newsArticles || [],
        jobOpenings: jobOpenings || [],
        jobs: jobOpenings || [],
        quotes: quotes || [],
        applications: applications || [],
        supabaseStatus,
        lastSyncTime,
        isLoading,
        syncFromSupabase,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        toggleCategoryStatus,
        addArticle,
        updateArticle,
        deleteArticle,
        toggleArticleStatus,
        addJob,
        updateJob,
        deleteJob,
        toggleJobUrgent,
        toggleJobStatus,
        addQuote,
        updateQuoteStatus,
        deleteQuote,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        clearCacheAndSync,
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
