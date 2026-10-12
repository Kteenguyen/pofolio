export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  impact: string[];
  techStack: string[];
  category: "Full-Stack & Web" | "Backend & CSDL" | "Phân Tích BA & Nghiệp Vụ" | "Mobile & Khác";
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: "Doanh Nghiệp" | "Freelance" | "Dự Án Cộng Đồng";
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  duration: string;
  grade?: string;
  coursework: { name: string; score: string }[];
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level: number; note?: string }[];
}

export const portfolioData = {
  personal: {
    name: "Nguyễn Khoa Tài",
    nickname: "Ktee",
    title: "Full-Stack Software Engineer | Kỹ Sư CNTT (Hệ 5 Năm)",
    degreeLabel: "Đại học Tôn Đức Thắng (2021 – 2026)",
    headline: "Xây dựng các sản phẩm phần mềm chuẩn mực, hiệu năng cao và giải quyết trọn vẹn bài toán nghiệp vụ.",
    bio: "Kỹ sư Công nghệ Thông tin tốt nghiệp chương trình đào tạo 5 năm tại Đại học Tôn Đức Thắng với nền tảng khoa học máy tính vững chắc. Sở hữu kinh nghiệm thực chiến đa diện từ phát triển Front-End React/Next.js mượt mà, thiết kế Backend/APIs phân tán đến tư duy phân tích nghiệp vụ (BA) và trực tiếp điều phối triển khai phần mềm cho hơn 230 người dùng tại FPT IS.",
    email: "nguyenkhoatai2003@email.com",
    backupEmail: "nguyenkhoatai2003@gmail.com",
    phone: "0852723945",
    github: "https://github.com/Kteenguyen",
    githubUser: "Kteenguyen",
    telegram: "https://t.me/kteenguyen",
    linkedin: "https://linkedin.com",
    location: "TP. Hồ Chí Minh, Việt Nam",
    availableForHire: true,
    statusText: "Sẵn sàng đón nhận cơ hội mới",
  },

  stats: [
    { label: "Năm đào tạo Kỹ sư", value: "5 Năm" },
    { label: "End-users đào tạo tại FPT IS", value: "230+" },
    { label: "Bugs & sự cố đã xử lý", value: "60+" },
    { label: "Dự án thực tế & đồ án", value: "8+" },
  ],

  pillars: [
    {
      title: "Học Thuật Chuẩn Mực 5 Năm (Academic Rigor)",
      description: "Được tôi luyện qua chương trình đào tạo CNTT 5 năm tại ĐH Tôn Đức Thắng. Điểm số xuất sắc trong các môn cốt lõi: NodeJS (8.3), UI/UX Design (8.3), Phân tích Yêu cầu (8.1).",
    },
    {
      title: "Kinh Nghiệm Thực Địa Doanh Nghiệp (Enterprise Battle-Tested)",
      description: "Trực tiếp làm Trưởng nhóm triển khai FPT IS cho cơ quan Thi Hành Án Dân Sự; xây dựng sản phẩm Luklak với 7 trang, 17 component và hiệu ứng cuộn điện ảnh Cinematic Scroll.",
    },
    {
      title: "Tư Duy Cầu Nối Toàn Diện (Full-Stack + BA Mindset)",
      description: "Không chỉ viết code, tôi thấu hiểu sâu sắc nghiệp vụ kinh doanh, khơi gợi yêu cầu, vẽ sơ đồ UML bài bản và đảm bảo sản phẩm chuyển giao đạt đúng kỳ vọng của các bên liên quan.",
    },
  ],

  skillCategories: [
    {
      category: "Front-End & Trải Nghiệm Người Dùng (UI/UX)",
      description: "Thiết kế giao diện trực quan, chuyển động vi mô (Micro-animations) mượt mà và tối ưu Core Web Vitals",
      skills: [
        { name: "ReactJS (v18+) & Next.js", level: 92, note: "Hooks, Context API, App Router" },
        { name: "Tailwind CSS & SCSS/CSS3", level: 95, note: "Responsive đa thiết bị, Design System" },
        { name: "Framer Motion & Lenis Scroll", level: 88, note: "Cinematic Scroll, Spring Physics" },
        { name: "TypeScript & JavaScript ES6+", level: 90, note: "Clean Code, Strict Typing" },
        { name: "UI/UX Design trên Figma", level: 88, note: "Wireframing, Interactive Prototype" },
        { name: "WordPress CMS & Headless Migration", level: 88, note: "Theme Custom, Tối Ưu SEO, Di Chuyển Sang Next.js" },
      ],
    },
    {
      category: "Back-End & Kiến Trúc Dữ Liệu (Systems & Data)",
      description: "Xây dựng RESTful API phân tán, xác thực an toàn và tối ưu hóa truy vấn CSDL",
      skills: [
        { name: "Node.js & Express Framework", level: 90, note: "Điểm môn học: 8.3/10.0" },
        { name: "C# & ASP.NET Core MVC", level: 85, note: "Identity RBAC, Entity Framework Core" },
        { name: "MongoDB & Redis Caching", level: 85, note: "Flash Sale Realtime, Session Layer" },
        { name: "Microsoft SQL Server & PostgreSQL", level: 85, note: "Schema Design, Quan hệ 3NF" },
        { name: "RESTful APIs & Third-party Integrations", level: 90, note: "GHTK, VietQR, JWT Auth" },
      ],
    },
    {
      category: "Nghiệp Vụ BA, Triển Khai & Kiểm Thử (BA / QA / DevOps)",
      description: "Phân tích yêu cầu, kiểm thử chất lượng phần mềm và đưa hệ thống lên môi trường Production",
      skills: [
        { name: "Phân Tích Nghiệp Vụ (BA)", level: 88, note: "Điểm môn: 8.1 - Use Case, BRD, UML" },
        { name: "UAT Testing & Quản Lý Lỗi (Jira)", level: 88, note: "Phát hiện & xử lý 60 bugs tại FPT IS" },
        { name: "Triển Khai Máy Chủ VPS Linux", level: 85, note: "Cấu hình SSL, Nginx, Go-live" },
        { name: "Git, GitHub & Postman API", level: 92, note: "Version Control, API Contract" },
        { name: "Nghiên Cứu AI & AI Agents", level: 85, note: "Ứng dụng LLMs vào Workflow Automation" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "luklak-cinematic-web",
      title: "Hệ Thống Website Doanh Nghiệp Đa Trang & Cinematic Scroll (Luklak)",
      subtitle: "Enterprise Responsive Website with Lenis Smooth Scroll & Spring Physics",
      category: "Full-Stack & Web",
      featured: true,
      description: "Website thương hiệu doanh nghiệp gồm 7 trang hoàn chỉnh và 17 component tái sử dụng. Tích hợp hiệu ứng cuộn điện ảnh Lenis, Parallax video, text scroll-scrubbing và floating image theo con trỏ chuột.",
      problem: "Doanh nghiệp cần một diện mạo số sang trọng, đẳng cấp nhưng đòi hỏi hiệu năng cuộn phải đạt chuẩn 60fps mượt mà trên cả máy tính lẫn điện thoại.",
      solution: "Chuyển đổi trực tiếp mockup Figma sang Next.js/ReactJS với Tailwind CSS; phối hợp Lenis Smooth Scroll và Framer Motion useScroll/useTransform; triển khai lên VPS Linux và tối ưu hóa bộ nhớ đệm (Caching).",
      impact: [
        "Xây dựng thành công 7 trang chuẩn SEO và 17 component tái sử dụng.",
        "Trải nghiệm cuộn mượt mà chuẩn Cinematic, không giật lag trên mọi thiết bị.",
        "Triển khai Production thành công với chứng chỉ bảo mật SSL và deep-link hoàn hảo.",
      ],
      metrics: [
        { label: "Số trang web", value: "7 Trang" },
        { label: "Components tái sử dụng", value: "17+" },
        { label: "Tốc độ khung hình", value: "60 FPS" },
      ],
      techStack: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Lenis", "Figma", "VPS Linux"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "fpt-civil-judgment-suite",
      title: "Dự Án Triển Khai Hệ Thống Cơ Quan Thi Hành Án Dân Sự (FPT IS)",
      subtitle: "Government Enterprise System Deployment, UAT Testing & End-User Training",
      category: "Phân Tích BA & Nghiệp Vụ",
      featured: true,
      description: "Dự án chuyển đổi số trọng điểm của FPT IS cho cơ quan nhà nước. Đảm nhiệm vai trò Trưởng nhóm triển khai: điều phối golive, tổ chức đào tạo cho cán bộ và kiểm thử nghiệm thu.",
      problem: "Hệ thống nghiệp vụ phức tạp với khối lượng dữ liệu tư pháp lớn; người dùng cuối là các cán bộ công chức cần được hướng dẫn tỉ mỉ để chuyển đổi từ quy trình thủ công sang số hóa.",
      solution: "Đứng lớp tổ chức 15 buổi đào tạo (Training) cho hơn 230 người dùng cuối; phân loại và phối hợp đội Dev xử lý 60 lỗi nghiệp vụ/giao diện; cấu hình phần mềm và chứng thư số trực tiếp và từ xa.",
      impact: [
        "Đào tạo thành công cho hơn 230 cán bộ người dùng cuối nắm bắt quy trình.",
        "Phát hiện, phân loại và hỗ trợ xử lý dứt điểm 60 lỗi API và logic giao diện.",
        "Ký kết thành công biên bản nghiệm thu dự án đúng tiến độ bàn giao.",
      ],
      metrics: [
        { label: "Cán bộ đào tạo", value: "230+" },
        { label: "Buổi Training", value: "15 Buổi" },
        { label: "Bugs/CR xử lý", value: "60+" },
      ],
      techStack: ["FPT IS Platform", "UAT Testing", "Jira", "Chữ ký số", "UltraViewer", "SOP Manual"],
    },
    {
      id: "ecommerce-redis-flashsale",
      title: "Sàn Thương Mại Điện Tử & Đặt Hàng Trực Tuyến (Flash Sale Realtime)",
      subtitle: "E-Commerce Platform with Redis High-Concurrency Cache & Shipping Integration",
      category: "Backend & CSDL",
      featured: true,
      description: "Nền tảng thương mại điện tử hoàn chỉnh với giỏ hàng, thanh toán trực tuyến, cơ chế Flash Sale thời gian thực và tự động hóa tính phí vận chuyển.",
      problem: "Các đợt Flash Sale lưu lượng truy cập tăng vọt dễ dẫn đến nghẽn cơ sở dữ liệu và tình trạng mua vượt quá số lượng hàng tồn kho (Race Conditions).",
      solution: "Ứng dụng Redis làm bộ nhớ đệm tốc độ cao để khóa số lượng tồn kho theo thời gian thực; tích hợp API bên thứ 3 của Giao Hàng Tiết Kiệm (GHTK) để tự động tính phí ship theo địa giới hành chính.",
      impact: [
        "Phản hồi các truy vấn Flash Sale tức thì với độ trễ < 50ms nhờ Redis.",
        "Tích hợp luồng API vận chuyển GHTK thông suốt từ lúc đặt hàng đến khi tạo vận đơn.",
        "Hoàn thành kiểm thử toàn diện (Full System Testing) đạt độ tin cậy cao.",
      ],
      metrics: [
        { label: "Độ trễ Flash Sale", value: "<50ms" },
        { label: "Tích hợp GHTK", value: "100%" },
        { label: "Kiểm thử hệ thống", value: "Đạt" },
      ],
      techStack: ["Node.js", "Express.js", "MongoDB", "Redis", "JWT Auth", "GHTK API", "Postman"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "food-ordering-rbac-net",
      title: "Nền Tảng Đặt Món Trực Tuyến Phân Quyền Theo Vai Trò (RBAC)",
      subtitle: "Online Food Ordering Platform with ASP.NET Core & Partial Views Optimization",
      category: "Full-Stack & Web",
      featured: false,
      description: "Ứng dụng đặt món ăn với hệ thống phân quyền đa vai trò (Khách hàng, Quản lý nhà hàng, Quản trị viên hệ thống) xây dựng trên nền tảng .NET hiện đại.",
      problem: "Mã nguồn giao diện monolithic truyền thống cồng kềnh, khó bảo trì khi mở rộng thêm các danh mục món ăn và bảng điều khiển quản trị.",
      solution: "Tối ưu hóa kiến trúc Frontend bằng cách chia nhỏ thành các Partial Views và ViewComponents độc lập; tích hợp ASP.NET Core Identity để bảo vệ định tuyến và phân quyền nghiêm ngặt.",
      impact: [
        "Cắt giảm 30% thời gian bảo trì và cập nhật mã nguồn giao diện.",
        "Bảo mật truy cập tuyệt đối giữa các phân hệ quản trị và khách mua hàng.",
      ],
      metrics: [
        { label: "Thời gian bảo trì", value: "-30%" },
        { label: "Bảo mật RBAC", value: "100%" },
      ],
      techStack: ["C#", "ASP.NET Core", "Identity", "MS SQL Server", "Entity Framework Core"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "car-maintenance-system",
      title: "Hệ Thống Quản Lý Lịch Trình & Chi Phí Bảo Dưỡng Phương Tiện",
      subtitle: "Vehicle Maintenance & Repair History System with Enterprise UML Design",
      category: "Phân Tích BA & Nghiệp Vụ",
      featured: false,
      description: "Hệ thống quản lý vòng đời phương tiện, theo dõi lịch bảo dưỡng định kỳ, lịch sử sửa chữa phụ tùng và hạch toán tổng chi phí vận hành xe.",
      problem: "Thiếu công cụ chuẩn hóa khiến việc theo dõi lịch bảo dưỡng dễ bị bỏ sót, gây tốn kém chi phí đại tu xe đột xuất.",
      solution: "Tiến hành phân tích nghiệp vụ sâu sắc, vẽ sơ đồ Use Case, Activity và Sequence Diagram chuẩn mực; thiết kế CSDL quan hệ chặt chẽ trên SQL Server.",
      impact: [
        "Chuẩn hóa 100% tài liệu phân tích nghiệp vụ trước khi bước vào giai đoạn viết code.",
        "Theo dõi chính xác lịch sử thay thế phụ tùng và cảnh báo hạn đăng kiểm định kỳ.",
      ],
      metrics: [
        { label: "Độ chuẩn hóa UML", value: "100%" },
        { label: "Tiết kiệm chi phí", value: "Đo lường" },
      ],
      techStack: ["ASP.NET Core MVC", "MS SQL Server", "Draw.io", "UML Diagrams"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "odoo-sales-workflow",
      title: "Số Hóa Luồng Bán Hàng & Thu Ngân Doanh Nghiệp (Odoo ERP)",
      subtitle: "Internal Sales Order Management & Cashier Workflow Optimization",
      category: "Phân Tích BA & Nghiệp Vụ",
      featured: false,
      description: "Thiết kế và số hóa toàn bộ quy trình nghiệp vụ từ khâu tạo đơn hàng, áp dụng chương trình khuyến mãi đến thanh toán thu ngân nội bộ.",
      problem: "Quy trình ghi nhận đơn hàng tại quầy và kho thường bị lệch pha, gây khó khăn cho khâu đối soát doanh thu cuối ngày.",
      solution: "Mô hình hóa quy trình dòng dữ liệu (Data Flow) và xây dựng ứng dụng nội bộ kết nối trực tiếp với hệ sinh thái Odoo ERP.",
      impact: [
        "Rút ngắn thời gian thao tác thanh toán của thu ngân.",
        "Đảm bảo dữ liệu bán hàng đồng bộ tức thì với hệ thống quản lý kho.",
      ],
      metrics: [
        { label: "Đồng bộ kho", value: "Realtime" },
        { label: "Độ chính xác", value: "100%" },
      ],
      techStack: ["Odoo ERP", "Python", "Business Process Modeling", "System Testing"],
      githubUrl: "https://github.com/Kteenguyen",
    },
  ] as Project[],

  experience: [
    {
      id: "fpt-is",
      role: "Trưởng Nhóm Triển Khai Phần Mềm (Hệ Thống Cơ Quan Nhà Nước)",
      company: "Công ty Phần mềm FPT IS",
      period: "12/2025 – 01/2026",
      location: "TP. Hồ Chí Minh",
      type: "Doanh Nghiệp",
      description: "Đảm nhiệm vai trò Trưởng nhóm dự án triển khai ngắn hạn cho hệ thống thuộc cơ quan Thi Hành Án Dân Sự; phối hợp trực tiếp với lãnh đạo khách hàng để điều phối tiến độ và đảm bảo phần mềm go-live thành công.",
      achievements: [
        "Trực tiếp đứng lớp tổ chức 15 buổi đào tạo (Training) và hỗ trợ kiểm thử UAT cho hơn 230 cán bộ người dùng cuối.",
        "Thu thập, phân tích và phối hợp chặt chẽ với đội ngũ Back-End để xác định lỗi định dạng dữ liệu API trên UI; ghi nhận, phân loại và báo cáo dứt điểm 60 bugs giao diện/logic.",
        "Cài đặt phần mềm, cấu hình chữ ký số và hỗ trợ kỹ thuật trực tiếp/từ xa qua UltraViewer, Zalo; hoàn tất hồ sơ và ký kết biên bản nghiệm thu dự án đúng hạn.",
      ],
      skills: ["Triển khai phần mềm", "UAT Testing", "Đào tạo người dùng", "Chữ ký số", "Quản lý lỗi Jira", "Giao tiếp đối ngoại"],
    },
    {
      id: "luklak-freelance",
      role: "Lập Trình Viên Front-End & Kỹ Sư Triển Khai Hệ Thống",
      company: "Công ty Luklak (Dự Án Doanh Nghiệp)",
      period: "05/2026",
      location: "TP. Hồ Chí Minh (Remote/Hybrid)",
      type: "Freelance",
      description: "Chịu trách nhiệm trọn gói từ khảo sát yêu cầu bài toán số hóa của doanh nghiệp, thiết kế Wireframe/Prototype trên Figma đến lập trình hoàn thiện website và triển khai lên máy chủ VPS Linux Production.",
      achievements: [
        "Chuyển đổi thiết kế Figma thành website Responsive 7 trang hoàn chỉnh với 17 component tái sử dụng.",
        "Xây dựng hệ thống Cinematic Scroll cao cấp: kết hợp thư viện Lenis cho cuộn siêu mượt, Framer Motion useScroll/useTransform cho hiệu ứng parallax video, scroll-scrubbing text và floating image hiệu ứng Spring physics.",
        "Trực tiếp cấu hình môi trường máy chủ VPS Linux, thiết lập chứng chỉ SSL/tên miền, kiểm thử tích hợp (Integration Testing) và tối ưu hóa bộ nhớ đệm Caching trước khi bàn giao.",
      ],
      skills: ["ReactJS", "Next.js", "Tailwind CSS", "Framer Motion", "Lenis Smooth Scroll", "Figma", "VPS Linux", "SSL/Nginx"],
    },
    {
      id: "tsc-club",
      role: "Quản Trị Kênh Số & Phân Tích Dữ Liệu Tương Tác",
      company: "TSC Singing Club",
      period: "2023 – Hiện tại",
      location: "TP. Hồ Chí Minh",
      type: "Dự Án Cộng Đồng",
      description: "Quản lý nội dung fanpage, áp dụng tư duy cấu trúc nội dung và đo lường các chỉ số tương tác (Reach, Likes, Shares) để cải thiện mức độ tương tác của người dùng.",
      achievements: [
        "Ứng dụng kỹ thuật cấu trúc dữ liệu và On-page content optimization giúp gia tăng mức độ tiếp cận tự nhiên.",
        "Rèn luyện kỹ năng phân tích hành vi người dùng, phối hợp làm việc nhóm và truyền thông dự án.",
      ],
      skills: ["Phân tích dữ liệu người dùng", "Sáng tạo nội dung", "Truyền thông số", "Làm việc nhóm"],
    },
  ] as Experience[],

  education: [
    {
      id: "tdtu-degree",
      degree: "Cử Nhân / Kỹ Sư Công Nghệ Thông Tin",
      institution: "Đại học Tôn Đức Thắng (Ton Duc Thang University)",
      period: "2021 – 2026",
      duration: "Chương Trình Đào Tạo 5 Năm Toàn Thời Gian",
      grade: "Tốt nghiệp Chuyên ngành CNTT",
      coursework: [
        { name: "Lập trình NodeJS", score: "8.3 / 10.0" },
        { name: "Thiết kế Giao diện Người dùng (UI/UX Design)", score: "8.3 / 10.0" },
        { name: "Phân tích & Thiết kế Yêu cầu (BA & System Design)", score: "8.1 / 10.0" },
        { name: "Quản trị Hệ thống Thông tin Doanh nghiệp", score: "7.3 / 10.0" },
      ],
      highlights: [
        "Hành trình 5 năm đại học bài bản với hơn 150+ tín chỉ: Cấu trúc dữ liệu & Giải thuật, Mạng máy tính, Hệ quản trị CSDL, Kiến trúc phần mềm và Kiểm thử.",
        "Điểm số môn học chuyên ngành nổi bật trong cả hai lĩnh vực Kỹ thuật lập trình Back-End/Front-End và Phân tích nghiệp vụ hệ thống.",
        "Kỹ năng tự nghiên cứu sâu rộng, nhanh chóng nắm bắt công nghệ mới và ứng dụng trực tiếp vào các dự án phần mềm thực tế.",
      ],
    },
  ] as EducationItem[],

  certifications: [
    {
      name: "NodeJS Programming & Distributed Backend Architecture",
      issuer: "Đại học Tôn Đức Thắng (Điểm số: 8.3/10.0)",
      year: "2024",
    },
    {
      name: "User Interface Design & Human-Computer Interaction",
      issuer: "Đại học Tôn Đức Thắng (Điểm số: 8.3/10.0)",
      year: "2024",
    },
    {
      name: "Requirements Analysis & Enterprise System Modeling",
      issuer: "Đại học Tôn Đức Thắng (Điểm số: 8.1/10.0)",
      year: "2024",
    },
    {
      name: "Professional System Deployment & Customer Success",
      issuer: "FPT IS Company Project Certification",
      year: "2026",
    },
  ],
};
