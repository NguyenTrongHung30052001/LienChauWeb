import { Product, ProductionStep, CompanyStat } from '../types';

export const COMPANY_STATS: CompanyStat[] = [
  {
    id: 'exp',
    value: 16,
    suffix: '+ Năm',
    label: 'Kinh Nghiệm Chế Tác',
    sublabel: 'Tiên phong dệt đan phụ liệu giày từ 2010'
  },
  {
    id: 'capacity',
    value: 15,
    suffix: ' Triệu m',
    label: 'Công Suất Mỗi Tháng',
    sublabel: '250+ máy đệt kim đa đầu hiện đại'
  },
  {
    id: 'partners',
    value: 650,
    suffix: '+ Đối Tác',
    label: 'Thương Hiệu Toàn Cầu',
    sublabel: 'Xuất khẩu US, EU, Nhật Bản, Hàn Quốc'
  },
  {
    id: 'quality',
    value: 99.8,
    suffix: '%',
    label: 'Đạt Chuẩn Kiểm Định',
    sublabel: 'Chứng nhận ISO 9001 & Oeko-Tex Standard'
  }
];

export const PRODUCTS: Product[] = [
  // --- SẢN PHẨM MỚI ---
  {
    id: 'eco-rpet-new',
    name: 'Dây Dệt Jacquard ECO-RPET 2026',
    category: 'new',
    categoryName: 'Sản Phẩm Mới',
    subtitle: 'Sợi tái chế GRS bảo vệ môi trường, giảm 45% khí thải',
    material: '100% Recycled Polyester (RPET) từ chai nhựa tái sinh chuẩn Global Recycled Standard',
    widthOrDiameter: 'Bản dẹt 8mm - 10mm - 12mm',
    tensileStrength: '> 165 N (Độ dai vượt trội)',
    description: 'Dòng dây dệt thế hệ mới dệt hoa văn nổi Jacquard vi tính độ phân giải cao từ sợi tái chế GRS. Sợi có độ đanh chắc, bền màu tuyệt đối và có thể đính kèm nhãn mác sinh học chứng minh nguồn gốc xanh cho thương hiệu.',
    features: [
      'Đạt chứng nhận GRS (Global Recycled Standard) quốc tế',
      'Giảm 45% lượng khí thải carbon so với polyester nguyên sinh',
      'Đầu bấm Aglet màng sinh học phân hủy hoặc kim loại tái chế',
      'Dệt logo thương hiệu chìm nổi theo yêu cầu thiết kế'
    ],
    colors: ['#059669', '#10b981', '#1f2937', '#f3f4f6', '#d97706'],
    agletOptions: ['Màng sinh học phân hủy PLA', 'Kim loại tái chế khắc laser', 'Bọc silicon xanh'],
    moq: '1,000 cặp',
    badge: 'Mới ra mắt',
    modelColor: '#059669',
    modelTexture: 'woven',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    isNew: true
  },
  {
    id: 'nightglow-cord-new',
    name: 'Dây Luồn Dạ Quang NightGlow Tự Phát Sáng',
    category: 'new',
    categoryName: 'Sản Phẩm Mới',
    subtitle: 'Hấp thụ ánh sáng tự nhiên, phát quang rực rỡ trong đêm',
    material: 'Sợi Poly kết hợp phân tử bột lân tinh quang học cao cấp không độc hại',
    widthOrDiameter: 'Bản tròn Ø 5.0mm hoặc bản dẹt 10mm',
    tensileStrength: '> 140 N',
    description: 'Công nghệ dệt sợi phát quang độc quyền của Liên Châu, tự sạc quang năng dưới ánh mặt trời hoặc đèn điện và phát ánh sáng xanh lục dịu mắt liên tục 4-6 giờ trong điều kiện bóng tối.',
    features: [
      'Phát sáng huỳnh quang xanh lục sắc nét an toàn ban đêm',
      'Không phai, không giảm độ phát quang sau hơn 100 lần giặt',
      'Rất được ưa chuộng cho thời trang Cyberpunk, Streetwear, Đồ phượt',
      'Tùy chọn bấm đầu kim loại dạ quang đồng bộ'
    ],
    colors: ['#34d399', '#6ee7b7', '#065f46', '#111827'],
    agletOptions: ['Kim loại dạ quang', 'Silicon phát sáng', 'Màng acetate trong suốt'],
    moq: '500 cặp',
    badge: 'Công nghệ 2026',
    modelColor: '#34d399',
    modelTexture: 'reflective',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    isNew: true
  },

  // --- DÂY GIÀY ---
  {
    id: 'flat-sports',
    name: 'Dây Dẹt Thể Thao Sneaker Pro',
    category: 'shoelace',
    categoryName: 'Dây Giày',
    subtitle: 'Độ bền kéo vượt trội, dệt xương cá kép chống xoắn',
    material: '100% Sợi Polyester High-Tenacity dệt xương cá kép',
    widthOrDiameter: 'Bản dẹt 8mm - 10mm - 12mm',
    tensileStrength: '> 140 N (Chống đứt gãy)',
    description: 'Dây dẹt chuyên dụng cho giày chạy bộ, bóng rổ và sneaker thời trang. Kỹ thuật dệt xương cá hai lớp mang lại độ êm ái, bám rãnh xỏ khuyên và hạn chế tuột nút thắt khi vận động mạnh.',
    features: [
      'Chống bai dão sau 50,000 chu kỳ uốn gập',
      'Đầu dây bọc kim loại hợp kim mạ Gunmetal sang trọng',
      'Công nghệ nhuộm nhiệt cao áp không phai màu khi giặt',
      'Phù hợp với Nike Air Force 1, Jordan, Dunk, Pegasus'
    ],
    colors: ['#059669', '#0c0d0e', '#f8fafc', '#dc2626', '#2563eb', '#f59e0b'],
    agletOptions: ['Kim loại khắc Laser', 'Silicon dập nổi logo', 'Màng co nhiệt trong suốt'],
    moq: '500 cặp / màu',
    badge: 'Bán chạy nhất',
    modelColor: '#059669',
    modelTexture: 'woven',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'round-braided',
    name: 'Dây Tròn Bện Gia Cường Hiking & Boots',
    category: 'shoelace',
    categoryName: 'Dây Giày',
    subtitle: 'Lõi dù dệt đặc, chịu lực cực đại cho giày leo núi',
    material: 'Lớp vỏ Polyester 48 kim + Lõi dù Nylon chịu tải',
    widthOrDiameter: 'Đường kính Ø 4.5mm - 5.5mm',
    tensileStrength: '> 220 N (Chuyên dụng trekking)',
    description: 'Thiết kế bện tròn đan xen 2 màu tương phản (Dual-Tone). Cấu trúc lõi kép dày dặn bảo vệ chân tối đa trên địa hình gồ ghề, không ngậm nước và chống mài mòn cao.',
    features: [
      'Kháng sờn ma sát chuẩn Martindale > 25,000 vòng',
      'Lớp phủ fluorocarbon trượt nước nhẹ',
      'Đầu Aglet đồng thau thắt chốt lục giác cổ điển',
      'Chuyên dùng cho boots quân đội, Timberland, Red Wing'
    ],
    colors: ['#047857', '#1e293b', '#78350f', '#d97706', '#e2e8f0'],
    agletOptions: ['Đồng thau đúc cổ điển', 'Kim loại đen mờ', 'Hợp kim Titan'],
    moq: '500 cặp / màu',
    badge: 'Chịu tải cao',
    modelColor: '#047857',
    modelTexture: 'round',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'waxed-leather',
    name: 'Dây Da Bò Sáp Waxed Cao Cấp',
    category: 'shoelace',
    categoryName: 'Dây Giày',
    subtitle: 'Vẻ đẹp lịch lãm cho giày Tây Oxford, Derby & Loafer',
    material: '100% Sợi Cotton Ai Cập nhúng sáp ong tự nhiên / Da thuộc',
    widthOrDiameter: 'Bản tròn mảnh Ø 2.5mm - 3.0mm',
    tensileStrength: '> 95 N (Độ bóng sâu)',
    description: 'Quy trình phủ sáp ong thủ công tạo bề mặt bóng mờ quý phái, không xơ sợi và giữ nút thắt định hình hoàn hảo cho các quý ông phối đồ âu phục cao cấp.',
    features: [
      'Chống thấm nước tuyệt đối nhờ lớp phủ sáp tự nhiên',
      'Không bám bụi xơ, dễ lau chùi bảo quản',
      'Đầu aglet đồng đánh bóng vàng 18k hoặc bạc xước cao cấp',
      'Chuẩn quý tộc cho Oxford, Derby, Loafer cao cấp'
    ],
    colors: ['#78350f', '#1c1917', '#451a03', '#9a3412'],
    agletOptions: ['Đồng mạ vàng 18K', 'Bạc xước Antique', 'Kim loại mạ đen bóng'],
    moq: '300 cặp / màu',
    badge: 'Cao cấp (Premium)',
    modelColor: '#78350f',
    modelTexture: 'leather',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'reflective-3m',
    name: 'Dây Dệt Sợi Phản Quang 3M Siêu Sáng',
    category: 'shoelace',
    categoryName: 'Dây Giày',
    subtitle: 'Đảm bảo an toàn ban đêm & phong cách dạ quang',
    material: 'Polyester dệt tích hợp vi sợi thuỷ tinh phản xạ ánh sáng 3M Scotchlite',
    widthOrDiameter: 'Bản dẹt 9mm hoặc tròn 4.5mm',
    tensileStrength: '> 130 N',
    description: 'Sợi phản quang 3M đan xen tinh xảo phát sáng rực rỡ dưới ánh đèn pha xe hơi hoặc đèn flash máy ảnh, vừa bảo vệ người chạy bộ đêm vừa tạo điểm nhấn thị giác đường phố cực chất.',
    features: [
      'Góc phản xạ rộng 360 độ đạt tiêu chuẩn an toàn EN 471',
      'Hiệu ứng visual ấn tượng khi chụp ảnh bằng flash ban đêm',
      'Không bong tróc vi sợi dù giặt máy',
      'Rất được ưa chuộng cho Yeezy, UltraBoost, Sneaker Streetwear'
    ],
    colors: ['#94a3b8', '#1e293b', '#059669', '#10b981'],
    agletOptions: ['Kim loại phản quang', 'Trong suốt khắc chữ chìm', 'Kim loại Chrome bóng'],
    moq: '500 cặp / màu',
    badge: 'Bắt sáng 3M',
    modelColor: '#cbd5e1',
    modelTexture: 'reflective',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
  },

  // --- WEBBING ---
  {
    id: 'webbing-heavy-duty',
    name: 'Dây Đai Dệt High-Tenacity Poly Webbing',
    category: 'webbing',
    categoryName: 'Webbing',
    subtitle: 'Dây đai cường lực cho quai balo, túi xách & bảo hộ',
    material: '100% Sợi Polyester High-Tenacity dệt xương cá kép hoặc vân trơn Plain',
    widthOrDiameter: 'Bản rộng 20mm, 25mm, 38mm, 50mm (dày 1.2 - 2.5mm)',
    tensileStrength: '> 2,500 N đến 8,000 N (Chịu tải công nghiệp)',
    description: 'Dây đai dệt chuyên dụng cho quai balo du lịch, túi xách thời trang cao cấp, đai thắt lưng chiến thuật, đai bảo hộ lao động và đai vali xuất khẩu. Chống ma sát cực mạnh, kháng tia cực tím UV và không phai màu dưới nắng gắt.',
    features: [
      'Cấu trúc dệt chặt chẽ, mép viền bo nhiệt nhẵn mịn không xước tay',
      'Độ chịu tải từ 250kg đến hơn 800kg theo từng độ dày',
      'Nhuộm phân tán cao nhiệt đạt độ bền màu giặt cấp 4-5',
      'Cắt nhiệt siêu âm (Ultrasonic cutting) chống tưa đầu mép'
    ],
    colors: ['#1e293b', '#065f46', '#78350f', '#334155', '#dc2626', '#b45309'],
    agletOptions: ['Cắt nhiệt siêu âm', 'Bọc đầu kim loại', 'May xếp bọ viền'],
    moq: '1,000 mét / màu',
    badge: 'Chịu tải cao',
    modelColor: '#065f46',
    modelTexture: 'woven',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'webbing-jacquard-brand',
    name: 'Dây Đai Dệt Jacquard Logo & Hoa Văn Nổi',
    category: 'webbing',
    categoryName: 'Webbing',
    subtitle: 'Dệt nổi hoa văn, logo thương hiệu tinh xảo 2 mặt',
    material: 'Sợi Nylon bóng mềm mượt / Sợi Cotton Poly cao cấp phối màu',
    widthOrDiameter: 'Bản rộng 25mm, 32mm, 38mm, 45mm',
    tensileStrength: '> 1,800 N',
    description: 'Dây đai thời trang dệt chữ nổi và logo sắc nét chuẩn Pantone theo bản thiết kế độc quyền của các thương hiệu thời trang Streetwear, túi xách đeo chéo, dây máy ảnh và dây đeo thẻ cao cấp.',
    features: [
      'Độ phân giải dệt sắc sảo, dệt được cả font chữ mảnh 1.5mm',
      'Bề mặt mịn, cảm giác êm ái khi đeo vai không cọ xát rát da',
      'Đa dạng cấu trúc dệt: dệt chìm nổi, dệt đa tầng 2 mặt khác nhau',
      'Kiểm định an toàn môi trường không kim loại nặng'
    ],
    colors: ['#0f172a', '#059669', '#f59e0b', '#e2e8f0', '#b91c1c'],
    agletOptions: ['Móc kim loại xoay 360 độ', 'Đầu da bò may chốt', 'Bấm đinh tán đồng'],
    moq: '1,000 mét',
    badge: 'Tùy biến OEM',
    modelColor: '#0f172a',
    modelTexture: 'woven',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
  },

  // --- DÂY THUN ---
  {
    id: 'elastic-waistband',
    name: 'Dây Thun Bản Lưng Quần Dệt Thoi / Dệt Kim',
    category: 'elastic',
    categoryName: 'Dây Thun',
    subtitle: 'Độ đàn hồi co giãn bền bỉ, êm ái không hằn siết da',
    material: 'Lõi sợi cao su tự nhiên nhập khẩu bọc sợi Polyester / Spandex chống lão hóa',
    widthOrDiameter: 'Bản rộng 20mm, 25mm, 30mm, 40mm, 50mm',
    tensileStrength: 'Độ co giãn 160% - 180%, phục hồi đàn hồi 99%',
    description: 'Dây thun bản chuyên dụng cho cạp quần thể thao jogger, quần nỉ, đồ lót cao cấp, váy đầm và trang phục bảo hộ. Mép dệt bo viền chống quăn mép, mềm mại với làn da và không bị giãn nhão sau nhiều lần giặt sấy nhiệt độ cao.',
    features: [
      'Công nghệ dệt thoi mật độ cao không bị lồi lõm sợi cao su',
      'Giữ nguyên lực nén đàn hồi sau hơn 20,000 chu kỳ kéo giãn',
      'Không chứa chất gây dị ứng da đạt chuẩn Oeko-Tex Class 1',
      'Nhận dệt chữ logo thương hiệu trực tiếp lên bề mặt thun bản'
    ],
    colors: ['#111827', '#ffffff', '#059669', '#9ca3af', '#1e3a8a'],
    agletOptions: ['Cắt nhiệt chống tưa', 'Đóng cuộn 50m/cuộn', 'Đóng thùng carton công nghiệp'],
    moq: '2,000 mét / bản',
    badge: 'Co giãn chuẩn',
    modelColor: '#111827',
    modelTexture: 'woven',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'elastic-round-bungee',
    name: 'Dây Thun Tròn Co Giãn Đàn Hồi Cao (Bungee Cord)',
    category: 'elastic',
    categoryName: 'Dây Thun',
    subtitle: 'Thun tròn luồn bo áo gió, nón hoodie & phụ kiện thể thao',
    material: 'Lõi đa sợi cao su đàn hồi cao + Vỏ dệt sợi Poly bện chéo chống mài mòn',
    widthOrDiameter: 'Đường kính tròn Ø 2.0mm, 2.5mm, 3.0mm, 4.0mm, 5.0mm',
    tensileStrength: 'Độ giãn đàn hồi 200%',
    description: 'Dây thun tròn lõi cao su dẻo dai bọc sợi dệt chịu ma sát. Ứng dụng rộng rãi luồn gấu áo khoác dù, bo cổ áo gió, dây rút túi xách, ba lô leo núi và hệ thống xỏ dây giày lười thể thao nhanh.',
    features: [
      'Độ đàn hồi cực tốt, lực kéo êm tay không đứt ruột cao su',
      'Vỏ dệt bện khít bảo vệ lõi thun khỏi tia UV và oxy hóa',
      'Đa dạng màu sắc đơn sắc hoặc phối vệt đốm thể thao',
      'Tương thích hoàn hảo với các loại nút chặn chốt nhựa bấm (cord lock)'
    ],
    colors: ['#059669', '#18181b', '#ea580c', '#3b82f6', '#e4e4e7'],
    agletOptions: ['Bấm đầu kim loại', 'Đầu màng co nhiệt', 'Thắt nút nhiệt'],
    moq: '2,000 mét',
    badge: 'Đàn hồi cao',
    modelColor: '#059669',
    modelTexture: 'round',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=800&q=80'
  },

  // --- DÂY LUỒN ---
  {
    id: 'drawstring-hoodie',
    name: 'Dây Luồn Áo Hoodie & Quần Thể Thao Jogger',
    category: 'drawstring',
    categoryName: 'Dây Luồn',
    subtitle: 'Dệt tròn/dẹt Cotton tự nhiên, bấm đầu tipping kim loại sang trọng',
    material: '100% Sợi Cotton tự nhiên chải kỹ / Poly Cotton pha mềm rũ',
    widthOrDiameter: 'Bản dẹt 10mm - 15mm hoặc bản tròn Ø 6mm - 8mm',
    tensileStrength: '> 120 N (Chống bai xệ)',
    description: 'Dây luồn thời trang cao cấp phục vụ các xưởng may áo hoodie, áo khoác nỉ, quần jogger và quần short thể thao xuất khẩu. Chất liệu cotton tự nhiên mềm mại, bề mặt dệt vân mắt cáo hoặc xương cá sang trọng, đi kèm đầu bấm kim loại hoặc nhúng silicon.',
    features: [
      'Chất vải mềm mịn, độ rũ tự nhiên không bị xơ cứng khi giặt',
      'Cắt chiều dài theo yêu cầu: 120cm, 130cm, 140cm, 150cm...',
      'Bấm đầu kim loại khắc laser thương hiệu hoặc nhúng đầu cao su màu',
      'Đạt chứng nhận an toàn không formaldehyde dùng cho thời trang trẻ em'
    ],
    colors: ['#f8fafc', '#18181b', '#059669', '#78350f', '#94a3b8', '#dc2626'],
    agletOptions: ['Đầu kim loại khắc laser', 'Nhúng silicon chống tuột', 'Đầu thắt gút thủ công'],
    moq: '1,000 cặp',
    badge: 'May mặc xuất khẩu',
    modelColor: '#f8fafc',
    modelTexture: 'woven',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'drawstring-technical',
    name: 'Dây Luồn Kỹ Thuật Trượt Nước Cho Áo Gió Outdoor',
    category: 'drawstring',
    categoryName: 'Dây Luồn',
    subtitle: 'Lõi dù bện chặt, phủ lớp DWR kháng nước và chống sương muối',
    material: 'Sợi Polyester cường lực cao phủ màng chống thấm Durable Water Repellent',
    widthOrDiameter: 'Bản tròn Ø 4.0mm - 5.0mm',
    tensileStrength: '> 190 N',
    description: 'Dây luồn rút dây chuyên dụng cho áo khoác chống nước Gore-Tex, áo gió leo núi, áo mưa kỹ thuật và balo dã ngoại. Bề mặt phủ hoạt chất trượt nước khiến giọt nước lăn tròn rơi đi, không ngậm ẩm và nhanh khô.',
    features: [
      'Trượt nước cấp độ 4 (Spray Test AATCC 22)',
      'Không bị cứng giòn khi gặp thời tiết nhiệt độ thấp',
      'Bấm đầu bằng nhựa dẻo bọc nhiệt ép chân không kín nước',
      'Chống nấm mốc trong môi trường ẩm ướt nhiệt đới'
    ],
    colors: ['#065f46', '#1e293b', '#e11d48', '#d97706', '#64748b'],
    agletOptions: ['Bấm nhiệt kín nước', 'Đầu silicon dẻo', 'Hợp kim kẽm sơn tĩnh điện'],
    moq: '1,000 cặp',
    badge: 'Chống thấm DWR',
    modelColor: '#065f46',
    modelTexture: 'round',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
  },

  // --- TIPPING ---
  {
    id: 'tipping-metal-laser',
    name: 'Gia Công Bấm Đầu Kim Loại Khắc Laser & Mạ PVD',
    category: 'tipping',
    categoryName: 'Tipping',
    subtitle: 'Đầu Aglet kim loại cao cấp mạ đồng, vàng, xước mờ & titan',
    material: 'Hợp kim kẽm ZAMAK đúc áp lực / Đồng thau / Inox 304 không rỉ',
    widthOrDiameter: 'Kích thước lỗ ôm dây Ø 3.0mm, 4.0mm, 5.0mm, 6.0mm, 8.0mm',
    tensileStrength: 'Lực kẹp giữ đầu dây > 90 N (Chống tuột tuyệt đối)',
    description: 'Dịch vụ gia công bấm đầu dây kim loại bằng hệ thống máy ép dập khí nén chính xác cao. Đa dạng công nghệ xử lý bề mặt: mạ điện PVD, mạ Gunmetal bóng, vàng 18K, bạc mờ Antique, khắc logo laser vi tính siêu sắc nét.',
    features: [
      'Lực kẹp cực chặt, bảo hành không bung tuột trong suốt vòng đời sử dụng',
      'Công nghệ khắc laser CO2 và Fiber khắc logo sâu đến 0.2mm',
      'Kháng gỉ sét và chống oxy hóa muối biển chuẩn 48h Salt Spray Test',
      'Nhận làm khuôn logo đúc dập nổi theo hình dáng độc quyền của brand'
    ],
    colors: ['#e2e8f0', '#fbbf24', '#1e293b', '#b45309', '#94a3b8'],
    agletOptions: ['Đầu trụ tròn trơn', 'Đầu dập logo nổi', 'Đầu thắt vít ren lục giác', 'Đầu hình viên đạn'],
    moq: '2,000 cặp',
    badge: 'Gia công cao cấp',
    modelColor: '#e2e8f0',
    modelTexture: 'leather',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tipping-dipped-silicone',
    name: 'Bấm Đầu Silicon Nhúng Dẻo & Màng Co Nhiệt Acetate',
    category: 'tipping',
    categoryName: 'Tipping',
    subtitle: 'Đầu nhúng cao su chống trượt & màng acetate trong suốt in chữ',
    material: 'Màng Cellulose Acetate nhập khẩu & Hợp chất Silicon cao cấp nguyên sinh',
    widthOrDiameter: 'Phù hợp mọi kích cỡ dây từ dẹt 6mm - 20mm đến tròn Ø 2mm - 10mm',
    tensileStrength: 'Nhiệt độ kết dính nóng chảy 180°C liên kết bền chặt',
    description: 'Giải pháp bấm đầu thời trang phong cách thể thao năng động: kỹ thuật nhúng đầu silicon màu sắc mờ (matte finish) êm tay, hoặc bọc màng co nhiệt acetate trong suốt cho phép in logo chữ chìm bên trong lõi cực độc đáo.',
    features: [
      'Silicon đàn hồi dẻo dai, không bị nứt vỡ hay giòn gãy khi va đập',
      'Màng acetate ôm sát khít form dây, không để lại mép gờ cộm ngón tay',
      'Màu sắc silicon pha chuẩn theo bất kỳ mã màu Pantone nào',
      'Giải pháp tối ưu chi phí cho các đơn hàng xuất khẩu khối lượng lớn'
    ],
    colors: ['#059669', '#ef4444', '#3b82f6', '#18181b', '#ffffff'],
    agletOptions: ['Nhúng silicon mờ 25mm', 'Màng acetate in chữ vi tính', 'Bọc cao su dạ quang'],
    moq: '2,000 cặp',
    badge: 'Xu hướng mới',
    modelColor: '#059669',
    modelTexture: 'woven',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80'
  },

  // --- FW25 ---
  {
    id: 'fw25-retro-earth',
    name: 'Dây Giày Dệt Sợi Thô Vintage Tone Đất FW25',
    category: 'fw25',
    categoryName: 'FW25',
    subtitle: 'Bộ sưu tập Thu Đông 2025: Vintage Earth Tones & Cozy Heritage',
    material: 'Sợi Cotton tái chế pha sợi thô mộc kết hợp đầu aglet đồng thau xước mờ',
    widthOrDiameter: 'Bản dẹt 9mm dệt gân tổ ong Waffle dày dặn',
    tensileStrength: '> 150 N',
    description: 'Nằm trong bộ sưu tập Fall/Winter 2025 của Liên Châu, lấy cảm hứng từ thiên nhiên mùa đông với các tông màu rêu trầm olive, nâu đất nung terracotta, xám than chì và xanh rêu rừng. Kết cấu dệt gân nổi tạo chiều sâu xúc giác đầm ấm.',
    features: [
      'Bảng màu xu hướng FW25 độc quyền phát triển theo dự báo xu hướng quốc tế',
      'Cấu trúc dệt sợi bông thô tạo cảm giác ấm áp cổ điển Heritage',
      'Đầu bấm kim loại đồng cổ (Antique Brass) xử lý oxy hóa nghệ thuật',
      'Phù hợp hoàn hảo cho giày bốt mùa đông, giày Timberland, Redwing'
    ],
    colors: ['#78350f', '#065f46', '#9a3412', '#44403c', '#ca8a04'],
    agletOptions: ['Đồng cổ Antique Brass', 'Khắc laser hoa văn FW25', 'Bọc da bò thật'],
    moq: '500 cặp',
    badge: 'BST FW25',
    modelColor: '#78350f',
    modelTexture: 'woven',
    image: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=800&q=80',
    isFW25: true
  },
  {
    id: 'fw25-dual-tone-cord',
    name: 'Dây Luồn & Đai Webbing Phối Màu Dual-Tone FW25',
    category: 'fw25',
    categoryName: 'FW25',
    subtitle: 'Sợi dệt dày dặn giữ form, chống thấm gió lạnh Thu Đông',
    material: 'Polyester cường lực cao dệt hoa văn Jacquard hình học mùa đông',
    widthOrDiameter: 'Bản tròn Ø 6.5mm hoặc bản dẹt 15mm',
    tensileStrength: '> 180 N',
    description: 'Thiết kế phối 2 màu tương phản phong cách Outdoor Trail & Gorpcore. Dây có cấu trúc dệt dày dặn dẻo dai, giữ dáng form áo khoác phao, áo hoodie mùa đông và balo du lịch dã ngoại.',
    features: [
      'Chống chịu thời tiết lạnh âm độ không bị co rút biến dạng',
      'Đầu tipping hợp kim Titan mạ xám titan siêu bền',
      'Kết hợp sợi phản quang tinh tế bắt sáng trong sương mù',
      'Có sẵn bảng mẫu thực tế gửi tận nơi để nhà thiết kế phối mẫu'
    ],
    colors: ['#047857', '#b45309', '#1e293b', '#78350f'],
    agletOptions: ['Hợp kim Titan Gunmetal', 'Bọc silicon đen mờ', 'Khắc logo FW25'],
    moq: '500 cặp',
    badge: 'BST FW25',
    modelColor: '#047857',
    modelTexture: 'round',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    isFW25: true
  }
];

export const PRODUCTION_STEPS: ProductionStep[] = [
  {
    step: 1,
    title: 'Tuyển Chọn Nguyên Liệu Sợi',
    subtitle: 'Nguồn sợi nguyên sinh & tái chế RPET chuẩn quốc tế',
    description: 'Nhập khẩu và kiểm định chất lượng sợi Polyester cường lực cao, sợi Cotton Ai Cập chải kỹ, và sợi dù Kevlar. Kiểm tra độ đều sợi, chỉ số sợi (denier) và độ bền kéo trước khi đưa vào chuyền.',
    details: [
      'Kiểm tra độ giãn dài và lực đứt sợi ban đầu',
      'Chuẩn bị bảng sợi theo tỉ lệ cấu trúc ruột/vỏ',
      'Đảm bảo 100% sợi không chứa hóa chất độc hại Oeko-Tex'
    ],
    machinery: 'Máy đo độ đều sợi điện tử & Phòng lab sợi quang học',
    duration: '1 - 2 Giờ / Lô',
    iconName: 'PackageCheck'
  },
  {
    step: 2,
    title: 'Dệt & Đan Tốc Độ Cao',
    subtitle: 'Hệ thống máy đan dệt kim 16 - 48 đầu tự động hóa',
    description: 'Hệ thống dàn máy đan dệt hiện đại tạo ra cấu trúc dây dẹt xương cá, dây tròn lõi xoắn hoặc dây dệt jacquard hoa văn phức tạp. Mật độ đan sợi chặt chẽ tạo cảm giác đầm tay và chống sờn.',
    details: [
      'Công nghệ đan tròn 32 thoi & 48 thoi đa hướng',
      'Cảm biến quang học tự dừng máy khi phát hiện lỗi đứt sợi',
      'Tốc độ đan 1,200 vòng/phút đạt năng suất vượt trội'
    ],
    machinery: 'Máy đệt kim tự động tốc độ cao thế hệ mới',
    duration: 'Năng suất 500,000 m / ngày',
    iconName: 'Boxes'
  },
  {
    step: 3,
    title: 'Nhuộm Màu & Xử Lý Bề Mặt',
    subtitle: 'Công nghệ nhuộm cao áp không phai & Phủ Nano',
    description: 'Nhuộm màu theo bảng mã Pantone quốc tế với thuốc nhuộm hữu cơ an toàn. Sau đó dây được xử lý hoàn tất bằng công nghệ phủ sáp ong, phủ nano trượt nước hoặc gia nhiệt định hình chống bai.',
    details: [
      'Độ bền màu giặt cấp 4.5+ theo chuẩn AATCC',
      'Hệ thống xử lý nước thải khép kín đạt tiêu chuẩn môi trường',
      'Tùy chọn phủ nano kháng nước, chống bám bẩn hoặc phủ sáp cao cấp'
    ],
    machinery: 'Nồi nhuộm áp suất cao phản lực & Lò hấp sấy chân không',
    duration: '3 - 4 Giờ / Mẻ',
    iconName: 'Palette'
  },
  {
    step: 4,
    title: 'Cắt Nhiệt & Bọc Đầu Aglet',
    subtitle: 'Cắt chính xác bằng laser & Dập đầu kim loại cao cấp',
    description: 'Dây được đo chiều dài tự động theo kích thước yêu cầu (90cm, 120cm, 140cm, 160cm...) với dung sai dưới 0.5cm. Tiến hành bọc đầu dây bằng màng co nhiệt acetate hoặc dập ép aglet kim loại khắc laser thương hiệu.',
    details: [
      'Dập ép màng acetate nhiệt độ cao ôm khít sợi dây',
      'Gia công Aglet kim loại: Hợp kim kẽm, Đồng thau, Thép không gỉ',
      'Khắc laser logo thương hiệu sắc nét hoặc in chữ dạ quang'
    ],
    machinery: 'Máy cắt nhiệt tự động & Máy dập aglet khí nén 4 trụ',
    duration: '1.5 Giây / Cặp dây',
    iconName: 'Scissors'
  },
  {
    step: 5,
    title: 'Kiểm Định Chất Lượng Nghiêm Ngặt',
    subtitle: 'Phòng Lab QA kiểm tra lực kéo, ma sát và độ phai',
    description: 'Từng lô sản phẩm xuất xưởng đều phải vượt qua 5 bài test tiêu chuẩn quốc tế: Lực kéo đứt (Tensile Test), Độ bền chà xát (Martindale Abrasion), Độ bền màu giặt (Color Fastness), Độ bám dính của Aglet và kiểm tra ngoại quan 100%.',
    details: [
      'Kiểm tra lực giữ đầu aglet không bị tuột > 60 N',
      'Kiểm định không chứa Formol, Azo và kim loại nặng',
      'Cấp chứng thư xuất xưởng CO/CQ cho từng đơn hàng'
    ],
    machinery: 'Máy đo lực kéo điện tử Instron & Máy ma sát Martindale',
    duration: '100% Lô hàng được kiểm thử',
    iconName: 'ShieldCheck'
  },
  {
    step: 6,
    title: 'Đóng Gói & Xuất Hàng Thành Phẩm',
    subtitle: 'Quy cách xuất khẩu công nghiệp hoặc Hộp bán lẻ',
    description: 'Đóng gói theo yêu cầu của đối tác: Bó 100 cặp bằng dây đai sinh học cho xưởng may giày công nghiệp, hoặc đóng cuộn tròn, vỉ ép nhựa, hộp carton cao cấp có tem chống hàng giả cho các thương hiệu retail.',
    details: [
      'Đóng gói hút chân không hoặc bao PE chống ẩm mốc',
      'Dán nhãn mã vạch Barcode / QR Code truy xuất nguồn gốc',
      'Vận chuyển toàn quốc bằng xe chuyên dụng và xuất khẩu đường biển/hàng không'
    ],
    machinery: 'Dây chuyền quấn cuộn & Đóng thùng carton tự động',
    duration: 'Xuất kho 24/7',
    iconName: 'Truck'
  }
];

export const PARTNERS = [
  { name: 'Nike Supplier Partner', category: 'Athletic Footwear', country: 'Global' },
  { name: 'Adidas OEM Tier-2', category: 'Sportswear', country: 'Germany' },
  { name: 'Puma Footwear', category: 'Lifestyle & Running', country: 'Global' },
  { name: 'Converse Heritage', category: 'Canvas Classics', country: 'USA' },
  { name: 'Vans Skateboarding', category: 'Action Sports', country: 'USA' },
  { name: 'Biti\'s Vietnam', category: 'National Footwear', country: 'Vietnam' },
  { name: 'Timberland Outdoor', category: 'Work & Boots', country: 'USA' },
  { name: 'Dr. Martens', category: 'Leather Footwear', country: 'UK' },
  { name: 'Ananas Sneaker', category: 'Vulcanized Shoes', country: 'Vietnam' },
  { name: 'New Balance OEM', category: 'Performance Running', country: 'USA' }
];

export const WHY_CHOOSE_US = [
  {
    id: 'quality',
    title: 'Chất Lượng Xuất Khẩu',
    desc: 'Đạt chuẩn ISO 9001:2015 và Oeko-Tex Standard 100 Class 1 an toàn cho người dùng, chịu lực kéo đứt >140N bền bỉ.',
    icon: 'Award',
    highlight: 'ISO & Oeko-Tex'
  },
  {
    id: 'factory-price',
    title: 'Giá Gốc Tận Nhà Máy',
    desc: 'Trực tiếp sản xuất khép kín từ khâu dệt đan đến thành phẩm không qua trung gian. Chiết khấu cao cho đơn hàng lớn.',
    icon: 'BadgePercent',
    highlight: 'Tiết kiệm 20-30%'
  },
  {
    id: 'customization',
    title: 'Tùy Chỉnh OEM / ODM Toàn Diện',
    desc: 'Dệt jacquard theo bản vẽ, nhuộm màu chuẩn Pantone, dập laser logo lên aglet kim loại và thiết kế bao bì thương hiệu riêng.',
    icon: 'Sparkles',
    highlight: 'Làm mẫu trong 48h'
  },
  {
    id: 'speed',
    title: 'Năng Lực Cung Ứng Thần Tốc',
    desc: 'Công suất 15 triệu mét/tháng đảm bảo tiến độ cho các xưởng may lớn. Giao hàng toàn quốc và hỗ trợ thủ tục hải quan xuất khẩu.',
    icon: 'Zap',
    highlight: '15 Triệu mét/tháng'
  }
];

export const TESTIMONIALS = [
  {
    author: 'Nguyễn Tuấn Kiệt',
    role: 'Giám đốc Thu mua & Cung ứng',
    company: 'Công ty Cổ phần Giày Da Xuất Khẩu Đông Á',
    comment: 'Liên Châu đã là đối tác cung cấp dây giày chính cho chuỗi nhà máy của chúng tôi suốt 6 năm qua. Độ đồng đều về màu sắc và lực kéo rất ổn định, tỷ lệ lỗi kiểm định dưới 0.1%.',
    rating: 5
  },
  {
    author: 'Trần Hoàng Nam',
    role: 'Founder & Giám đốc Sáng tạo',
    company: 'Thương hiệu Sneaker Streetwear',
    comment: 'Chúng tôi cần loại dây dẹt dệt Jacquard logo thương hiệu kèm đầu Aglet hợp kim mạ Gunmetal bóng mờ. Liên Châu làm mẫu test chuẩn đét chỉ sau 3 ngày làm việc. Quá ấn tượng!',
    rating: 5
  },
  {
    author: 'David Harrison',
    role: 'Sourcing Director Asia-Pacific',
    company: 'Global Outdoor Footwear Brands',
    comment: 'The round braided boot laces from Lien Chau exceeded our tensile and abrasion requirements. Outstanding customer service and on-time shipment compliance.',
    rating: 5
  }
];
