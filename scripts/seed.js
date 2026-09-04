import pg from 'pg';
import { readFileSync } from 'fs';

const rawUrl = "postgres://postgres.blnholdbkltvxeaavuyh:gxIFPL1ONEusBXH2@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres";

const client = new pg.Client({
  connectionString: rawUrl,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  try {
    await client.connect();
    console.log("Connected to Supabase to seed initial data...");

    // Check if products already exist
    const { rows: prodRows } = await client.query("SELECT COUNT(*) FROM products");
    if (parseInt(prodRows[0].count, 10) === 0) {
      console.log("Seeding products...");
      
      const initialProducts = [
        {
          id: 'eco-rpet-new',
          name: 'Dây Dệt Jacquard ECO-RPET 2026',
          category: 'new',
          category_name: 'Sản Phẩm Mới',
          subtitle: 'Sợi tái chế GRS bảo vệ môi trường, giảm 45% khí thải',
          material: '100% Recycled Polyester (RPET) từ chai nhựa tái sinh chuẩn Global Recycled Standard',
          width_or_diameter: 'Bản dẹt 8mm - 10mm - 12mm',
          tensile_strength: '> 165 N (Độ dai vượt trội)',
          description: 'Dòng dây dệt thế hệ mới dệt hoa văn nổi Jacquard vi tính độ phân giải cao từ sợi tái chế GRS. Sợi có độ đanh chắc, bền màu tuyệt đối và có thể đính kèm nhãn mác sinh học chứng minh nguồn gốc xanh cho thương hiệu.',
          features: ['Đạt chứng nhận GRS quốc tế', 'Giảm 45% khí thải carbon', 'Đầu bấm Aglet màng sinh học phân hủy', 'Dệt logo thương hiệu chìm nổi theo yêu cầu'],
          colors: ['#059669', '#10b981', '#1f2937', '#f3f4f6', '#d97706'],
          aglet_options: ['Màng sinh học PLA', 'Kim loại khắc laser', 'Bọc silicon xanh'],
          moq: '1,000 cặp',
          badge: 'Mới ra mắt',
          model_color: '#059669',
          model_texture: 'woven',
          image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
          is_new: true,
          featured: true
        },
        {
          id: 'shoelace-poly-flat',
          name: 'Dây Giày Bản Dẹt Dệt Thoi (Flat Polyester)',
          category: 'shoelace',
          category_name: 'Dây Giày Thể Thao',
          subtitle: 'Quy cách chuẩn cho giày Sneaker & Running',
          material: '100% High-Tenacity Filament Polyester',
          width_or_diameter: '8mm, 9mm, 10mm',
          tensile_strength: '> 140 N',
          description: 'Dòng dây giày dệt thoi phẳng bán chạy nhất, cấu trúc sợi dệt kín kẽ, bề mặt mịn không xù lông sau 10,000 lần ma sát.',
          features: ['Cấu trúc mật độ cao chống bai dão', 'Bền màu cấp độ 4-5 theo chuẩn AATCC', 'Tương thích đa dạng đầu bọc Aglet', 'Sẵn hơn 120 màu gốc'],
          colors: ['#ffffff', '#000000', '#dc2626', '#2563eb', '#16a34a', '#ca8a04'],
          aglet_options: ['Màng nhựa trong Cellulose Acetate', 'Kim loại mạ Gunmetal / Chrome', 'Ép nhiệt Silicon nhám'],
          moq: '2,000 cặp / màu',
          badge: 'Bán chạy nhất',
          model_color: '#ffffff',
          model_texture: 'flat',
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
          is_new: false,
          featured: true
        },
        {
          id: 'shoelace-round-athletic',
          name: 'Dây Tròn Lõi Đệm Chịu Lực (Round Athletic Rope)',
          category: 'shoelace',
          category_name: 'Dây Giày Thể Thao',
          subtitle: 'Chuyên dụng giày leo núi Trekking, Trail running',
          material: 'Lõi Nylon đàn hồi + Vỏ bọc Polyester bện kép 32 thoi',
          width_or_diameter: 'Đường kính Ø 4.5mm - 5.0mm',
          tensile_strength: '> 220 N (Chịu lực giật mạnh)',
          description: 'Dây tròn bện đa lõi có khả năng co giãn đàn hồi chống tụt nút thắt trong lúc vận động cường độ cao.',
          features: ['Cấu trúc bện 32 thoi đan chéo chịu ma sát', 'Lõi trợ lực trung tâm chống đứt gãy', 'Chống thấm nước nhẹ công nghệ DWR'],
          colors: ['#000000', '#eab308', '#ea580c', '#0891b2'],
          aglet_options: ['Đầu nhựa trong', 'Đầu ép nhiệt cao tần', 'Bấm đồng thau phủ nano'],
          moq: '1,500 cặp',
          badge: 'Chịu lực cao',
          model_color: '#ea580c',
          model_texture: 'round',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
          is_new: false,
          featured: true
        },
        {
          id: 'shoelace-cotton-waxed',
          name: 'Dây Giày Cotton Tráng Sáp (Waxed Cotton)',
          category: 'shoelace',
          category_name: 'Dây Giày Thể Thao',
          subtitle: 'Phong cách Dress Shoes, Boots da cao cấp',
          material: '100% Sợi bông Cotton tự nhiên chải kỹ + Lớp sáp phủ vi sinh',
          width_or_diameter: 'Bản tròn Ø 2.5mm hoặc Bản dẹt 6mm',
          tensile_strength: '> 95 N',
          description: 'Phủ sáp paraffin thân thiện môi trường giúp bề mặt dây đanh mịn, bóng mờ cổ điển và kháng nước tự nhiên.',
          features: ['Chất liệu cotton sinh thái 100%', 'Bề mặt phủ sáp mờ hạn chế bắt bụi', 'Dễ dàng tạo phom nơ giữ dáng giày tây'],
          colors: ['#1c1917', '#451a03', '#78350f', '#e7e5e4'],
          aglet_options: ['Đầu kim loại đồng cổ Vintage', 'Đầu mạ vàng Gold 18K', 'Bọc màng mỏng'],
          moq: '1,000 cặp',
          badge: 'Cao cấp',
          model_color: '#451a03',
          model_texture: 'waxed',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
          is_new: false,
          featured: true
        },
        {
          id: 'webbing-tactical',
          name: 'Dây Đai Dệt Webbing Nylon Tactical (Military Grade)',
          category: 'webbing',
          category_name: 'Dây Đai Webbing',
          subtitle: 'Balo du lịch, quai đeo đai an toàn, dây nịt',
          material: '100% Sợi Nylon 6.6 mật độ dệt quân sự',
          width_or_diameter: 'Bản rộng 25mm, 38mm, 50mm (Độ dày 1.8mm - 2.5mm)',
          tensile_strength: '> 8,500 N (Tải trọng 850kg)',
          description: 'Dây đai webbing tải trọng cực hạn, kháng tia UV, chống thối rữa và chịu ma sát khắc nghiệt.',
          features: ['Chống mài mòn chuẩn Mil-Spec', 'Kháng ẩm mốc, bền hóa chất tẩy rửa nhẹ', 'Đường dệt xương cá xương cá gân nổi chống trượt khoá'],
          colors: ['#1f2937', '#365314', '#713f12', '#374151'],
          aglet_options: ['Cắt nhiệt Laser chống tưa', 'Ép đầu định hình bằng sóng siêu âm'],
          moq: '500 mét',
          badge: 'Tiêu chuẩn Quân đội',
          model_color: '#365314',
          model_texture: 'webbing',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
          is_new: false,
          featured: true
        },
        {
          id: 'elastic-woven-high',
          name: 'Dây Thun Dệt Thoi Đàn Hồi Cao (Jacquard Elastic Band)',
          category: 'elastic',
          category_name: 'Dây Thun & Đàn Hồi',
          subtitle: 'Lưng quần thể thao, cổ giày lười slip-on, bảo hộ',
          material: 'Polyester Filament bọc sợi Spandex/Cao su thiên nhiên nhập khẩu',
          width_or_diameter: 'Bản 20mm - 60mm (Độ giãn 120% - 150%)',
          tensile_strength: 'Hồi phục phom > 98% sau 5,000 chu kỳ kéo giãn',
          description: 'Độ đàn hồi êm ái, tiếp xúc da mềm mại không gây hằn ngứa. Dệt hoa văn chữ hoặc logo thương hiệu sắc nét.',
          features: ['Độ đàn hồi vĩnh cửu không bị nhão', 'Công nghệ dệt vi tính chữ chìm/nổi đa chiều', 'Không chứa Formol và Kim loại nặng'],
          colors: ['#000000', '#ffffff', '#1e3a8a', '#991b1b'],
          aglet_options: ['Đóng cuộn 50m/cuộn', 'Cắt đoạn dập mép siêu âm'],
          moq: '1,000 mét',
          badge: 'Độ giãn chuẩn',
          model_color: '#000000',
          model_texture: 'elastic',
          image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80',
          is_new: false,
          featured: true
        }
      ];

      for (const p of initialProducts) {
        await client.query(
          `INSERT INTO products (
            id, name, category, category_name, subtitle, material, width_or_diameter,
            tensile_strength, description, features, colors, aglet_options, moq, badge,
            model_color, model_texture, image, is_new, featured
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
          ON CONFLICT (id) DO NOTHING`,
          [
            p.id, p.name, p.category, p.category_name, p.subtitle, p.material, p.width_or_diameter,
            p.tensile_strength, p.description, p.features, p.colors, p.aglet_options, p.moq, p.badge,
            p.model_color, p.model_texture, p.image, p.is_new, p.featured
          ]
        );
      }
      console.log("Products seeded!");
    }

    // Check categories
    const { rows: catRows } = await client.query("SELECT COUNT(*) FROM categories");
    if (parseInt(catRows[0].count, 10) === 0) {
      console.log("Seeding categories...");
      const initialCats = [
        { id: 'shoelace', name: 'Dây Giày Thể Thao', count: 18 },
        { id: 'webbing', name: 'Dây Đai Webbing', count: 12 },
        { id: 'elastic', name: 'Dây Thun & Đàn Hồi', count: 10 },
        { id: 'tipping', name: 'Đầu Bấm Aglet & Gia Công', count: 8 },
        { id: 'drawstring', name: 'Dây Luồn Hoodie & Thời Trang', count: 6 }
      ];
      for (const c of initialCats) {
        await client.query(
          `INSERT INTO categories (id, name, count) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING`,
          [c.id, c.name, c.count]
        );
      }
      console.log("Categories seeded!");
    }

    // Check news_articles
    const { rows: newsRows } = await client.query("SELECT COUNT(*) FROM news_articles");
    if (parseInt(newsRows[0].count, 10) === 0) {
      console.log("Seeding news articles...");
      const articles = [
        {
          id: 'trend-grs-rpet-2026',
          title: 'Xu Hướng Sợi Tái Chế GRS Trong Sản Xuất Dây Giày Toàn Cầu 2026',
          category: 'Xu Hướng',
          read_time: '4 phút đọc',
          published_at: '02 Tháng 09, 2026',
          summary: 'Các tập đoàn giày dép hàng đầu cam kết sử dụng tối thiểu 70% sợi tái chế RPET trong chuỗi cung ứng phụ liệu năm 2026.',
          content: 'Nhu cầu chuyển dịch sang vật liệu bền vững (Sustainable Footwear Materials) đang tăng trưởng vượt bậc với mức tăng hơn 42% trong năm 2026. Công ty Cổ phần Sản xuất Dệt Liên Châu đã chủ động đầu tư hệ thống máy dệt kim thế hệ mới chuyên dụng cho sợi tái chế Global Recycled Standard (GRS)...',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
          tags: ['GRS Sợi Tái Chế', 'Xu Hướng 2026', 'Phụ Liệu Xanh'],
          author: 'Kỹ sư Trưởng R&D Liên Châu',
          is_trending: true
        },
        {
          id: 'oeko-tex-standard-100-renewal',
          title: 'Liên Châu Tiếp Tục Đạt Chứng Nhận Oeko-Tex Standard 100 Cấp Độ 1',
          category: 'Chất Lượng',
          read_time: '3 phút đọc',
          published_at: '24 Tháng 08, 2026',
          summary: 'Viện kiểm định Hohenstein (Đức) chính thức cấp gia hạn chứng chỉ Oeko-Tex Standard 100 Class 1 cho toàn bộ sản phẩm dệt của Liên Châu.',
          content: 'Oeko-Tex Standard 100 Cấp độ 1 (Class 1) là tiêu chuẩn an toàn cao nhất, áp dụng nghiêm ngặt cho cả sản phẩm tiếp xúc trực tiếp với làn da nhạy cảm của trẻ sơ sinh và trẻ nhỏ. Điều này khẳng định quy trình nhuộm màu và hoàn tất sợi của Liên Châu hoàn toàn không chứa kim loại nặng, Azo dyes hay Formaldehyde.',
          image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80',
          tags: ['Oeko-Tex 100', 'ISO 9001', 'Kiểm Định Quốc Tế'],
          author: 'Phòng Quản Lý Chất Lượng QA/QC',
          is_trending: false
        },
        {
          id: 'vietnam-footwear-expo-2026',
          title: 'Liên Châu Ra Mắt Bộ Sưu Tập Dây Dệt Thu Đông FW25-26 Tại Shoes & Leather Expo',
          category: 'Sự Kiện',
          read_time: '5 phút đọc',
          published_at: '15 Tháng 08, 2026',
          summary: 'Hơn 50 dòng mẫu phụ liệu dệt Jacquard, reflective phản quang 3M và aglet kim loại mạ chân không thu hút hàng trăm đối tác B2B quốc tế.',
          content: 'Tại Triển lãm Quốc tế Da & Giày Việt Nam 2026, gian hàng trưng bày của Liên Châu JSC đã đón tiếp hơn 280 đoàn khách mua hàng đến từ Nhật Bản, Hàn Quốc, Hoa Kỳ và các nhà máy gia công OEM quy mô lớn tại Việt Nam và Đông Nam Á.',
          image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
          tags: ['Triển Lãm B2B', 'Bộ Sưu Tập Mới', 'Xuất Khẩu'],
          author: 'Ban Truyền Thông Doanh Nghiệp',
          is_trending: false
        }
      ];

      for (const a of articles) {
        await client.query(
          `INSERT INTO news_articles (id, title, category, read_time, published_at, summary, content, image, tags, author, is_trending)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (id) DO NOTHING`,
          [a.id, a.title, a.category, a.read_time, a.published_at, a.summary, a.content, a.image, a.tags, a.author, a.is_trending]
        );
      }
      console.log("News articles seeded!");
    }

    // Check jobs
    const { rows: jobRows } = await client.query("SELECT COUNT(*) FROM jobs");
    if (parseInt(jobRows[0].count, 10) === 0) {
      console.log("Seeding jobs...");
      const initialJobs = [
        {
          id: 'job-textile-rd-engineer',
          title: 'Kỹ Sư R&D Sợi Dệt & Phát Triển Sản Phẩm Mới',
          department: 'Nghiên Cứu & Phát Triển (R&D)',
          location: 'Nhà máy KCN Sóng Thần 3, Thủ Dầu Một, Bình Dương',
          type: 'Toàn thời gian (Full-time)',
          salary: '18,000,000 - 28,000,000 VNĐ / tháng',
          deadline: '30/10/2026',
          tags: ['R&D Sợi Dệt', 'CAD Dệt May', 'Sợi Tái Chế GRS'],
          overview: 'Chịu trách nhiệm nghiên cứu kết cấu sợi dệt, phát triển mẫu dây giày & webbing theo thiết kế của các thương hiệu giày quốc tế.',
          responsibilities: [
            'Thiết lập thông số kỹ thuật dệt trên máy dệt kim, máy dệt thoi đa thoi vi tính',
            'Phối hợp phòng thí nghiệm kiểm tra độ bền đứt, độ giãn dài và độ bền màu AATCC',
            'Phát triển ứng dụng sợi tái chế GRS và sợi sinh học mới'
          ],
          requirements: [
            'Tốt nghiệp Đại học chuyên ngành Kỹ thuật Dệt May hoặc Hóa Nhuộm',
            'Tối thiểu 2 năm kinh nghiệm thiết kế mẫu sợi dệt hoặc quản lý kỹ thuật dệt thoi/bện',
            'Có khả năng đọc tài liệu kỹ thuật tiếng Anh hoặc tiếng Trung'
          ],
          benefits: [
            'Lương thưởng tháng 13 + Thưởng hiệu quả dự án quý',
            'Xe đưa đón nhân viên từ TP.HCM đến nhà máy Bình Dương hàng ngày',
            'Bảo hiểm y tế quốc tế PVI Care 24/7'
          ],
          is_urgent: true
        },
        {
          id: 'job-b2b-sales-specialist',
          title: 'Chuyên Viên Kinh Doanh B2B / OEM Phụ Liệu May Mặc - Giày Dép',
          department: 'Kinh Doanh & Phát Triển Thị Trường',
          location: 'Văn phòng TP.HCM / Nhà máy Bình Dương',
          type: 'Toàn thời gian',
          salary: '14,000,000 - 25,000,000 VNĐ + Hoa hồng doanh số',
          deadline: '15/11/2026',
          tags: ['B2B Sales', 'OEM/ODM', 'Phụ Liệu Giày Dép'],
          overview: 'Tìm kiếm, kết nối và đàm phán hợp đồng cung ứng phụ liệu dệt may với các nhà máy sản xuất giày thể thao, túi xách xuất khẩu.',
          responsibilities: [
            'Phát triển mạng lưới khách hàng doanh nghiệp B2B (các xưởng may, nhà máy OEM giày dép)',
            'Tiếp nhận yêu cầu báo giá mẫu, gửi báo giá và theo dõi đơn đặt hàng thử nghiệm',
            'Tham gia các hội chợ triển lãm phụ liệu dệt may quốc tế'
          ],
          requirements: [
            'Kinh nghiệm 1+ năm bán hàng B2B phụ liệu ngành dệt may, da giày',
            'Kỹ năng giao tiếp và thuyết phục tốt, tiếng Anh hoặc tiếng Hoa giao tiếp thương mại'
          ],
          benefits: [
            'Hoa hồng kinh doanh không giới hạn theo phần trăm doanh số hợp đồng',
            'Phụ cấp công tác, xăng xe, điện thoại đầy đủ',
            'Cơ hội thăng tiến lên Trưởng nhóm Kinh doanh sau 6 tháng'
          ],
          is_urgent: true
        }
      ];

      for (const j of initialJobs) {
        await client.query(
          `INSERT INTO jobs (id, title, department, location, type, salary, deadline, tags, overview, responsibilities, requirements, benefits, is_urgent)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT (id) DO NOTHING`,
          [j.id, j.title, j.department, j.location, j.type, j.salary, j.deadline, j.tags, j.overview, j.responsibilities, j.requirements, j.benefits, j.is_urgent]
        );
      }
      console.log("Jobs seeded!");
    }

    console.log("All seeding completed successfully!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await client.end();
  }
}

seed();
