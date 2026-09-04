import { JobOpening } from '../types';

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-textile-engineer',
    title: 'Kỹ Sư Kỹ Thuật Dệt & Phát Triển Mẫu Mới (D&P Engineer)',
    department: 'Sản Xuất & Kỹ Thuật',
    location: 'KCN Sóng Thần 3, Thủ Dầu Một, Bình Dương',
    type: 'Toàn thời gian',
    experience: 'Từ 2 năm kinh nghiệm',
    salary: '18,000,000 - 25,000,000 VNĐ + Thưởng KPI',
    deadline: '30/10/2026',
    urgent: true,
    description: 'Chịu trách nhiệm thiết kế cấu trúc sợi dệt, lập trình mẫu dệt Jacquard vi tính, phối màu theo chuẩn Pantone cho các đơn hàng dây giày và phụ liệu OEM của khách hàng quốc tế.',
    responsibilities: [
      'Nghiên cứu bản vẽ kỹ thuật hoặc mẫu gốc của khách hàng, phân tích cấu trúc đan/dệt và định lượng sợi.',
      'Thiết kế và cài đặt chương trình dệt hoa văn trên máy dệt kim Jacquard vi tính hiện đại.',
      'Chỉ đạo chạy thử mẫu lab dip, đo đạc thông số lực kéo đứt, độ co rút và độ bền màu.',
      'Phối hợp cùng phân xưởng sản xuất giải quyết sự cố kỹ thuật và tối ưu định mức nguyên phụ liệu.'
    ],
    requirements: [
      'Tốt nghiệp Cao đẳng/Đại học chuyên ngành Công nghệ Dệt may, Cơ khí dệt hoặc liên quan.',
      'Có từ 2 năm kinh nghiệm thiết kế mẫu trên các dòng máy dệt dây đai, dây dẹt hoặc dệt kim tròn.',
      'Am hiểu các loại sợi: Polyester, Nylon, Cotton, Sợi phản quang, Sợi RPET.',
      'Tính cách cẩn trọng, đam mê nghiên cứu kỹ thuật và chịu được áp lực tiến độ ra mẫu.'
    ],
    benefits: [
      'Mức lương cạnh tranh theo năng lực, xét tăng lương định kỳ hàng năm.',
      'Thưởng lương tháng 13 + Thưởng hiệu quả sản xuất dự án từ 1 - 3 tháng lương.',
      'Xe đưa đón nhân viên từ TP.HCM, Thuận An, Dĩ An và Thủ Dầu Một.',
      'Bảo hiểm y tế, BHXH đầy đủ và gói bảo hiểm sức khỏe PTI 24/7.',
      'Hỗ trợ cơm trưa chất lượng tại canteen máy lạnh của công ty.'
    ]
  },
  {
    id: 'job-loom-operator',
    title: 'Trưởng Ca Vận Hành Máy Dệt Dây Giày & Webbing',
    department: 'Sản Xuất & Kỹ Thuật',
    location: 'KCN Sóng Thần 3, Thủ Dầu Một, Bình Dương',
    type: 'Toàn thời gian (Làm theo ca)',
    experience: 'Từ 1 năm kinh nghiệm',
    salary: '12,000,000 - 16,000,000 VNĐ + Phụ cấp ca',
    deadline: '15/10/2026',
    urgent: true,
    description: 'Quản lý vận hành cụm máy dệt kim/dệt thoi trong ca sản xuất, giám sát chỉ số kỹ thuật và phân công nhiệm vụ cho công nhân đứng máy.',
    responsibilities: [
      'Nhận lệnh sản xuất từ Trưởng phòng, kiểm tra nguyên liệu sợi trước khi lên máy.',
      'Vận hành và giám sát hoạt động của 20 - 30 đầu máy dệt, xử lý nhanh các sự cố đứt sợi, lệch mật độ.',
      'Ghi chép nhật ký sản xuất ca, kiểm đếm số mét dây hoàn thành và bàn giao ca trơn tru.',
      'Đảm bảo tuân thủ nghiêm ngặt quy định an toàn lao động và 5S trong khu vực xưởng.'
    ],
    requirements: [
      'Nam/Nữ từ 22 - 40 tuổi, sức khỏe tốt, thị lực tốt.',
      'Có kinh nghiệm vận hành máy dệt dây giày, dây thun hoặc dệt đai ít nhất 1 năm.',
      'Có kỹ năng quản lý nhóm từ 5 - 10 công nhân, tinh thần trách nhiệm cao.'
    ],
    benefits: [
      'Thu nhập ổn định, phụ cấp ca đêm và phụ cấp chuyên cần hấp dẫn.',
      'Phát đồng phục và trang thiết bị bảo hộ lao động miễn phí.',
      'Chế độ phúc lợi đầy đủ: hiếu hỷ, sinh nhật, quà lễ Tết, du lịch hàng năm.',
      'Cơ hội học hỏi và thăng tiến lên Phó Quản Đốc Phân Xưởng.'
    ]
  },
  {
    id: 'job-qc-specialist',
    title: 'Chuyên Viên Kiểm Soát Chất Lượng Phụ Liệu (QC / QA Officer)',
    department: 'Kiểm Soát Chất Lượng QC/QA',
    location: 'KCN Sóng Thần 3, Thủ Dầu Một, Bình Dương',
    type: 'Toàn thời gian',
    experience: 'Từ 1.5 năm kinh nghiệm',
    salary: '13,000,000 - 18,000,000 VNĐ',
    deadline: '20/10/2026',
    urgent: false,
    description: 'Thực hiện kiểm tra chất lượng từ khâu nhập sợi, kiểm tra bán thành phẩm trên chuyền dệt (In-line) và nghiệm thu thành phẩm cuối cùng trước khi đóng gói xuất xưởng (Final QC).',
    responsibilities: [
      'Thực hiện test cơ lý tại phòng Lab: độ bền kéo đứt (Instron test), độ bền màu ma sát (Crockmeter), độ chống sờn.',
      'Kiểm tra quy cách đầu bấm Aglet: độ dài đầu màng/kim loại, độ chắc chắn không tuột.',
      'Lập báo cáo kiểm tra chất lượng (Inspection Report) theo tiêu chuẩn AQL 2.5 / 4.0.',
      'Làm việc với khách hàng hoặc bên kiểm định thứ 3 (SGS, Intertek, TUV) trong các buổi nghiệm thu đơn hàng.'
    ],
    requirements: [
      'Tốt nghiệp Cao đẳng trở lên chuyên ngành Quản lý chất lượng, Dệt may, Hóa nhuộm.',
      'Có kinh nghiệm làm QC/QA tại các nhà máy phụ liệu may mặc hoặc xưởng giày xuất khẩu.',
      'Nắm vững tiêu chuẩn kiểm định Oeko-Tex, ISO 9001 và các phương pháp test dệt may phổ biến.',
      'Biết tiếng Anh hoặc tiếng Trung cơ bản là lợi thế lớn.'
    ],
    benefits: [
      'Làm việc trong môi trường phòng thí nghiệm hiện đại, máy móc đo lường chuẩn xác.',
      'Lương thưởng xứng đáng với năng lực, phụ cấp trách nhiệm chuyên trách.',
      'Được công ty đài thọ tham gia các khóa đào tạo kiểm định chất lượng chuyên sâu.'
    ]
  },
  {
    id: 'job-b2b-sales',
    title: 'Nhân Viên Kinh Doanh B2B / Xuất Khẩu Phụ Liệu Giày Da',
    department: 'Kinh Doanh & Phát Triển Thị Trường',
    location: 'Văn phòng nhà máy Bình Dương (Có xe đưa đón từ TP.HCM)',
    type: 'Toàn thời gian',
    experience: 'Từ 1 năm kinh nghiệm B2B',
    salary: '12,000,000 - 20,000,000 VNĐ + % Hoa hồng doanh số cao',
    deadline: '31/10/2026',
    urgent: true,
    description: 'Khai thác và chăm sóc các khách hàng doanh nghiệp: các công ty sản xuất giày dép, xưởng gia công may mặc, thương hiệu thời trang trong nước và đối tác FDI xuất khẩu.',
    responsibilities: [
      'Tìm kiếm, tiếp cận các nhà máy giày thể thao, giày da, xưởng may túi xách/balo tại miền Nam và các tỉnh lân cận.',
      'Gửi mẫu catalogue, tư vấn thông số kỹ thuật và báo giá cho khách hàng.',
      'Theo dõi tiến độ duyệt mẫu, xúc tiến ký kết hợp đồng cung ứng và theo dõi công nợ.',
      'Tham gia các hội chợ, triển lãm ngành dệt may quốc tế để phát triển tệp khách hàng xuất khẩu.'
    ],
    requirements: [
      'Tốt nghiệp Cao đẳng/Đại học khối ngành Kinh tế, Quản trị kinh doanh, Ngoại thương hoặc Dệt may.',
      'Kỹ năng giao tiếp, đàm phán thương mại B2B tốt, hoạt bát và nhạy bén.',
      'Ưu tiên ứng viên có kinh nghiệm bán phụ liệu may mặc, da giày, bao bì hoặc nguyên phụ liệu công nghiệp.',
      'Tiếng Anh giao tiếp và soạn thảo hợp đồng thương mại khá.'
    ],
    benefits: [
      'Thu nhập không giới hạn với chính sách hoa hồng doanh số cực kỳ cạnh tranh trên thị trường.',
      'Được tiếp cận nguồn khách hàng tiềm năng lớn có sẵn từ uy tín 16 năm của Liên Châu.',
      'Cung cấp đầy đủ công cụ làm việc: laptop, sim điện thoại công tác, chi phí tiếp khách, xe đưa đón.'
    ]
  },
  {
    id: 'job-tipping-technician',
    title: 'Kỹ Thuật Viên Bấm Đầu Tipping & Pha Màu Phòng Lab',
    department: 'Sản Xuất & Kỹ Thuật',
    location: 'KCN Sóng Thần 3, Thủ Dầu Một, Bình Dương',
    type: 'Toàn thời gian',
    experience: 'Không yêu cầu kinh nghiệm (Được đào tạo)',
    salary: '9,500,000 - 13,000,000 VNĐ + Phụ cấp',
    deadline: '10/11/2026',
    urgent: false,
    description: 'Vận hành các thiết bị bấm đầu dây giày tự động (đầu acetate, đầu silicon, đầu kim loại dập nóng/nguội) và hỗ trợ pha màu lab dip.',
    responsibilities: [
      'Vận hành máy cắt dây theo độ dài quy định và máy bấm đầu Tipping tự động.',
      'Kiểm tra kích thước đầu bấm, độ phẳng mịn và độ dính nhiệt không bị hở mép.',
      'Hỗ trợ kỹ sư phòng Lab cân định lượng hóa chất nhuộm và kiểm tra độ bền màu.',
      'Bảo trì, bôi trơn máy móc định kỳ để thiết bị vận hành êm ái.'
    ],
    requirements: [
      'Tốt nghiệp THPT trở lên, ưu tiên tốt nghiệp trường nghề Trung cấp kỹ thuật/cơ khí.',
      'Chăm chỉ, nhanh nhẹn, mắt nhìn chuẩn màu sắc tốt.',
      'Chưa có kinh nghiệm sẽ được kỹ sư trưởng đào tạo bài bản từ đầu.'
    ],
    benefits: [
      'Được đào tạo tay nghề kỹ thuật chuyên sâu về công nghệ bấm đầu phụ liệu giày dép hiện đại.',
      'Đầy đủ chế độ bảo hiểm theo quy định của Luật lao động Việt Nam.',
      'Thưởng chuyên cần, thưởng năng suất hàng tháng.'
    ]
  }
];

export const COMPANY_PERKS = [
  {
    icon: 'Briefcase',
    title: 'Thu Nhập Xứng Đáng',
    desc: 'Lương cơ bản cạnh tranh, thưởng tháng 13, thưởng sản lượng và đánh giá tăng lương định kỳ.'
  },
  {
    icon: 'Bus',
    title: 'Xe Đưa Đón Miễn Phí',
    desc: 'Các tuyến xe đưa đón thuận tiện từ TP.HCM, Thuận An, Dĩ An và TP. Thủ Dầu Một.'
  },
  {
    icon: 'Utensils',
    title: 'Cơm Trưa Canteen',
    desc: 'Bữa ăn ca dinh dưỡng miễn phí nấu mới hàng ngày tại canteen sạch sẽ, điều hòa.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Bảo Hiểm Toàn Diện',
    desc: 'BHXH, BHYT, BHTN theo luật định cùng gói bảo hiểm tai nạn và sức khỏe PTI 24/7.'
  },
  {
    icon: 'GraduationCap',
    title: 'Đào Tạo & Thăng Tiến',
    desc: 'Lộ trình thăng tiến rõ ràng, được đào tạo trực tiếp từ các chuyên gia dệt may giàu kinh nghiệm.'
  },
  {
    icon: 'HeartHandshake',
    title: 'Văn Hóa Tôn Trọng',
    desc: 'Môi trường làm việc dân chủ, quan tâm đời sống công nhân viên, du lịch nghỉ mát thường niên.'
  }
];
