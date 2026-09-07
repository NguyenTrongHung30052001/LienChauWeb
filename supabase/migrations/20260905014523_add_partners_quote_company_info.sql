-- Supabase SQL Schema cho Bảng: Đối Tác, Quy Cách Báo Giá, và Thông Tin Công Ty

-- =====================================================================================
-- 1. Bảng: partners (Đối Tác & Khách Hàng)
-- =====================================================================================
CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    country TEXT NOT NULL,
    trend TEXT, -- Xu hướng thời trang (nếu có)
    logo TEXT, -- URL logo
    status TEXT DEFAULT 'active', -- 'active' hoặc 'hidden'
    order_index INTEGER DEFAULT 0, -- Dùng để sắp xếp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================================
-- 2. Bảng: quote_specs (Quy Cách / Chủng Loại Sản Phẩm Báo Giá)
-- =====================================================================================
CREATE TABLE quote_specs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category_group TEXT NOT NULL, -- Nhóm danh mục (Dây giày, Webbing...)
    default_moq TEXT,
    sample_lead_time TEXT,
    description TEXT, -- Ghi chú kỹ thuật
    status TEXT DEFAULT 'active', -- 'active' hoặc 'hidden'
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================================
-- 3. Bảng: company_info (Thông Tin Chung Công Ty)
-- Lưu ý: Bảng này thường chỉ có 1 dòng duy nhất.
-- =====================================================================================
CREATE TABLE company_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    slogan TEXT,
    logo TEXT,
    bct_logo TEXT,
    address TEXT NOT NULL,
    tax_id TEXT NOT NULL,
    tax_issuer TEXT,
    certifications TEXT,
    phone TEXT NOT NULL,
    hotline TEXT,
    email TEXT NOT NULL,
    working_hours TEXT,
    facebook_url TEXT,
    tiktok_url TEXT,
    youtube_url TEXT,
    zalo_url TEXT,
    google_maps_url TEXT,
    factory_coordinates TEXT,
    established_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies (Optional nhưng khuyến nghị)
-- Cho phép đọc (SELECT) tất cả mọi người (Anonymous)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON partners FOR SELECT USING (true);
-- Cho phép chỉnh sửa cần thêm quy tắc tùy vào thiết lập xác thực của bạn

ALTER TABLE quote_specs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON quote_specs FOR SELECT USING (true);

ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON company_info FOR SELECT USING (true);
