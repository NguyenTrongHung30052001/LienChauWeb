export type ProductCategory =
  | 'new'
  | 'shoelace'
  | 'webbing'
  | 'elastic'
  | 'drawstring'
  | 'tipping'
  | 'fw25';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName?: string;
  subtitle: string;
  material: string;
  widthOrDiameter: string;
  tensileStrength: string;
  description: string;
  features: string[];
  colors: string[];
  agletOptions: string[];
  moq: string;
  badge?: string;
  modelColor: string;
  modelTexture: 'woven' | 'leather' | 'reflective' | 'round';
  image: string;
  isNew?: boolean;
  isFW25?: boolean;
}

export interface ProductionStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  machinery: string;
  duration: string;
  iconName: string;
}

export interface CompanyStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export type PageId =
  | 'home'
  | 'about'
  | 'products'
  | 'process'
  | 'news'
  | 'careers'
  | 'contact';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  image: string;
  author: string;
  tags: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  deadline: string;
  urgent?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productType: string;
  quantity: string;
  lengthOption: string;
  agletType: string;
  notes: string;
}
