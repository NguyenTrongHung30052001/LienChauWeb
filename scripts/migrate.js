import pg from 'pg';

// Parse connection string and remove sslmode query so pg respects ssl: { rejectUnauthorized: false }
const rawUrl = "postgres://postgres.blnholdbkltvxeaavuyh:gxIFPL1ONEusBXH2@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres";

const client = new pg.Client({
  connectionString: rawUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    console.log("Connecting to Supabase PostgreSQL...");
    await client.connect();
    console.log("Connected successfully!");

    console.log("Creating tables...");
    await client.query(`
      -- 1. Products Table
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        category_name TEXT,
        subtitle TEXT,
        material TEXT,
        width_or_diameter TEXT,
        tensile_strength TEXT,
        description TEXT,
        features TEXT[],
        colors TEXT[],
        aglet_options TEXT[],
        moq TEXT,
        badge TEXT,
        model_color TEXT,
        model_texture TEXT,
        image TEXT,
        is_new BOOLEAN DEFAULT false,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 2. Categories Table
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        count INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 3. News Articles Table
      CREATE TABLE IF NOT EXISTS news_articles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        read_time TEXT,
        published_at TEXT,
        summary TEXT,
        content TEXT,
        image TEXT,
        tags TEXT[],
        author TEXT,
        is_trending BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 4. Jobs Table
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        department TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT NOT NULL,
        salary TEXT NOT NULL,
        deadline TEXT,
        tags TEXT[],
        overview TEXT,
        responsibilities TEXT[],
        requirements TEXT[],
        benefits TEXT[],
        is_urgent BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 5. Applications Table
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        job_id TEXT,
        job_title TEXT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        experience TEXT,
        resume_link TEXT,
        note TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 6. Quote Requests Table
      CREATE TABLE IF NOT EXISTS quote_requests (
        id TEXT PRIMARY KEY,
        ref_code TEXT,
        full_name TEXT NOT NULL,
        company TEXT,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        product_interest TEXT,
        estimated_quantity TEXT,
        unit TEXT,
        custom_specs TEXT,
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log("Tables created successfully!");

    // Configure RLS policies to allow anon read and write
    console.log("Configuring RLS policies...");
    await client.query(`
      ALTER TABLE products ENABLE ROW LEVEL SECURITY;
      ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
      ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
      ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
      ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
      ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Public access products" ON products;
      CREATE POLICY "Public access products" ON products FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public access categories" ON categories;
      CREATE POLICY "Public access categories" ON categories FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public access news_articles" ON news_articles;
      CREATE POLICY "Public access news_articles" ON news_articles FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public access jobs" ON jobs;
      CREATE POLICY "Public access jobs" ON jobs FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public access applications" ON applications;
      CREATE POLICY "Public access applications" ON applications FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public access quote_requests" ON quote_requests;
      CREATE POLICY "Public access quote_requests" ON quote_requests FOR ALL USING (true) WITH CHECK (true);
    `);
    console.log("RLS policies configured successfully!");

  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await client.end();
  }
}

run();
