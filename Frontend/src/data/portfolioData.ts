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
    title: "Creative Technologist & High-Performance Full-Stack Architect",
    degreeLabel: "Kỹ Sư CNTT (5 Năm Đào Tạo Chuẩn Mực) • ĐH Tôn Đức Thắng (2021 – 2026)",
    headline: "Giao thoa giữa thẩm mỹ chuyển động chuẩn Thụy Sĩ (Motion Design), kiến trúc hệ thống dữ liệu chịu tải cao và năng lực trực tiếp điều phối số hóa thực tế.",
    bio: "Kỹ sư Công nghệ Thông tin tốt nghiệp chương trình đào tạo 5 năm tại ĐH Tôn Đức Thắng. Sở hữu tổ hợp năng lực kép hiếm có: Kiến tạo trải nghiệm Front-End điện ảnh (Next.js 15, Three.js 4D, Lenis 60 FPS) kết hợp tư duy phân tích nghiệp vụ (BA) và trực tiếp điều phối triển khai giải pháp số hóa cho hơn 230 người dùng tại FPT IS.",
    email: "nguyenkhoatai2003@email.com",
    backupEmail: "nguyenkhoatai2003@gmail.com",
    phone: "0852723945",
    github: "https://github.com/Kteenguyen",
    githubUser: "Kteenguyen",
    telegram: "https://t.me/kteenguyen",
    linkedin: "https://linkedin.com",
    location: "TP. Hồ Chí Minh, Việt Nam",
    availableForHire: true,
    statusText: "Sẵn sàng đón nhận cơ hội Senior / Architect",
  },

  stats: [
    { label: "Cán bộ số hóa tại FPT IS", value: "230+" },
    { label: "Bugs & ngoại lệ UAT xử lý", value: "60+" },
    { label: "PageSpeed Mobile (CLS = 0)", value: "96/100" },
    { label: "Độ trễ Redis Flash-Sale", value: "<50ms" },
  ],

  pillars: [
    {
      title: "Kiến Trúc Kỹ Thuật Độc Bản (Full-Stack & Systems)",
      description: "Làm chủ Next.js 15 App Router, React 19, TypeScript và WebGL 4D. Thiết kế CSDL quan hệ chuẩn 3NF, phân tầng caching Redis giảm tải hệ thống vượt trội.",
    },
    {
      title: "Kinh Nghiệm Thực Chiến Doanh Nghiệp (Enterprise Battle-Tested)",
      description: "Trực tiếp điều phối go-live hệ thống THADS tại FPT IS cho 230 cán bộ; tái cấu trúc website PowerTech đạt Google PageSpeed 96/100; xây dựng Luklak với 7 trang đạt 60 FPS.",
    },
    {
      title: "Tư Duy Cầu Nối Nghiệp Vụ (Product & BA Leadership)",
      description: "Không dừng lại ở việc viết mã, tôi làm chủ toàn diện quy trình phân tích bài toán kinh doanh, khơi gợi yêu cầu, thiết kế sơ đồ UML chuẩn mực và bảo đảm sản phẩm bàn giao nghiệm thu 100%.",
    },
  ],

  skillCategories: [
    {
      category: "Front-End & Trải Nghiệm Người Dùng (UI/UX)",
      description: "Thiết kế giao diện trực quan, chuyển động vi mô (Micro-animations) mượt mà và tối ưu Core Web Vitals",
      skills: [
        { name: "ReactJS (v18+) & Next.js 15", level: 95, note: "App Router, Server Actions, Zero-CLS" },
        { name: "Tailwind CSS & Design System", level: 95, note: "Responsive 430px Mobile, Token Architecture" },
        { name: "Three.js & WebGL 4D Spatial", level: 90, note: "Procedural Shaders, Particle Nebulae, 60 FPS" },
        { name: "Framer Motion & Lenis Scroll", level: 92, note: "Cinematic Parallax, Spring Dynamics" },
        { name: "TypeScript & JavaScript ES6+", level: 92, note: "Strict Typing, Clean Code, Enterprise Patterns" },
        { name: "WordPress CMS & Headless Migration", level: 90, note: "Theme Custom, Tối Ưu SEO, Di Chuyển Sang Next.js" },
      ],
    },
    {
      category: "Back-End & Kiến Trúc Dữ Liệu (Systems & Data)",
      description: "Xây dựng RESTful API phân tán, xác thực an toàn và tối ưu hóa truy vấn CSDL",
      skills: [
        { name: "Node.js & Express Framework", level: 92, note: "Distributed APIs, JWT Auth, Microservices" },
        { name: "C# & ASP.NET Core MVC", level: 86, note: "Identity RBAC, Entity Framework Core" },
        { name: "Redis Caching & In-Memory Store", level: 90, note: "Flash Sale Realtime, Latency <50ms" },
        { name: "PostgreSQL & Supabase", level: 90, note: "Schema Design, 3NF Normalization, Row Security" },
        { name: "RESTful APIs & Third-party Integrations", level: 92, note: "GHTK, VietQR, ZaloPay, Webhooks" },
      ],
    },
    {
      category: "Nghiệp Vụ BA, Triển Khai & Kiểm Thử (BA / QA / DevOps)",
      description: "Phân tích yêu cầu, kiểm thử chất lượng phần mềm và đưa hệ thống lên môi trường Production",
      skills: [
        { name: "Phân Tích Nghiệp Vụ (BA)", level: 90, note: "Use Case, BRD, SRS, UML Sequence Modeling" },
        { name: "UAT Testing & Quản Lý Lỗi (Jira)", level: 92, note: "Kiểm thử thực địa & xử lý 60 bugs tại FPT IS" },
        { name: "Triển Khai Máy Chủ VPS Linux & Docker", level: 88, note: "Nginx Reverse Proxy, SSL, Docker Compose" },
        { name: "CI/CD & Version Control (Git)", level: 92, note: "GitHub Actions, Vercel Edge, Production Go-Live" },
        { name: "AI Agentic Workflows & Automation", level: 88, note: "Multi-Agent Systems, MCP 2.0, LLM Integration" },
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
      id: "powertech",
      role: "Kỹ Sư Fullstack Web & Tối Ưu Hóa Hiệu Năng (Next.js 15)",
      company: "Công Ty Năng Lượng Powertech Sài Gòn (powertech.vn)",
      period: "07/2026 – Hiện Tại",
      location: "TP. Hồ Chí Minh",
      type: "Doanh Nghiệp",
      description: "Chịu trách nhiệm tái cấu trúc toàn diện cổng thông tin năng lượng từ hệ thống WordPress cũ tải chậm (>4s) và giật layout (CLS 0.38) sang kiến trúc Next.js 15 App Router phân tầng độc lập.",
      achievements: [
        "Tối ưu tài nguyên triệt tiêu hoàn toàn hiện tượng nhấp nháy layout, đạt điểm Google PageSpeed Mobile 96/100 và CLS = 0 tuyệt đối.",
        "Thiết kế cấu trúc dữ liệu JSON-LD Schema chuẩn On-Page SEO và tăng tốc tải trang tức thì dưới 1.2s.",
        "Tỷ lệ thoát trang (Bounce Rate) của khách hàng doanh nghiệp giảm mạnh từ 58% xuống 21%.",
      ],
      skills: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Core Web Vitals", "WordPress Migration", "SEO Technical"],
    },
    {
      id: "fpt-is",
      role: "Kỹ Sư Triển Khai Thực Địa & Kiểm Thử UAT (Hệ Thống Nhà Nước)",
      company: "Công ty Phần mềm FPT IS",
      period: "12/2025 – 01/2026",
      location: "TP. Hồ Chí Minh",
      type: "Doanh Nghiệp",
      description: "Đảm nhiệm vai trò kỹ sư triển khai và hỗ trợ chuyển đổi số trọng điểm cho hệ thống thuộc cơ quan Thi Hành Án Dân Sự; phối hợp trực tiếp với lãnh đạo các chi cục để go-live phần mềm đúng tiến độ.",
      achievements: [
        "Trực tiếp đứng lớp tổ chức 15 buổi đào tạo (Training) và hỗ trợ kiểm thử UAT cho hơn 230 cán bộ người dùng cuối.",
        "Thu thập, phân tích và phối hợp chặt chẽ với đội ngũ Back-End để xác định lỗi định dạng dữ liệu API trên UI; ghi nhận, phân loại và xử lý dứt điểm 60 bugs giao diện/logic.",
        "Cài đặt phần mềm, cấu hình chữ ký số và hỗ trợ kỹ thuật trực tiếp/từ xa; hoàn tất hồ sơ và ký kết biên bản nghiệm thu dự án đúng hạn.",
      ],
      skills: ["Triển khai phần mềm", "UAT Testing", "Đào tạo người dùng", "Chữ ký số", "Quản lý lỗi Jira", "Giao tiếp đối ngoại"],
    },
    {
      id: "luklak-freelance",
      role: "Lập Trình Viên Full-Stack & Kỹ Sư Triển Khai Hệ Thống",
      company: "Công ty Luklak (Dự Án Doanh Nghiệp)",
      period: "05/2026",
      location: "TP. Hồ Chí Minh (Remote/Hybrid)",
      type: "Freelance",
      description: "Chịu trách nhiệm trọn gói từ khảo sát yêu cầu bài toán số hóa của doanh nghiệp, thiết kế Wireframe/Prototype trên Figma đến lập trình hoàn thiện website và triển khai lên máy chủ VPS Linux Production.",
      achievements: [
        "Chuyển đổi thiết kế Figma thành website Responsive 7 trang hoàn chỉnh với 17 component tái sử dụng.",
        "Xây dựng hệ thống Cinematic Scroll cao cấp: kết hợp thư viện Lenis cho cuộn siêu mượt 60 FPS, Framer Motion useScroll/useTransform cho hiệu ứng parallax video, scroll-scrubbing text và floating image hiệu ứng Spring physics.",
        "Trực tiếp cấu hình môi trường máy chủ VPS Linux, thiết lập chứng chỉ SSL/tên miền, kiểm thử tích hợp và tối ưu hóa bộ nhớ đệm Caching trước khi bàn giao.",
      ],
      skills: ["ReactJS", "Next.js", "Tailwind CSS", "Framer Motion", "Lenis Smooth Scroll", "Figma", "VPS Linux", "SSL/Nginx"],
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
        { name: "Lập trình NodeJS & Kiến Trúc Phân Tán", score: "Hệ Thống APIs Chịu Tải" },
        { name: "Thiết Kế Trải Nghiệm Người Dùng (UI/UX)", score: "Design System & Micro-Interactions" },
        { name: "Phân Tích & Thiết Kế Yêu Cầu (BA & System Modeling)", score: "Chuẩn Hóa BRD & UML" },
        { name: "Quản Trị Hệ Thống Thông Tin Doanh Nghiệp", score: "Quy Trình Vận Hành Doanh Nghiệp" },
      ],
      highlights: [
        "Hành trình 5 năm đại học bài bản với hơn 150+ tín chỉ: Cấu trúc dữ liệu & Giải thuật, Mạng máy tính, Hệ quản trị CSDL, Kiến trúc phần mềm và Kiểm thử chất lượng.",
        "Nền tảng song hành vững chắc: Làm chủ kỹ thuật lập trình Front-End/Back-End kết hợp tư duy phân tích nghiệp vụ hệ thống thực tế.",
        "Kỹ năng tự nghiên cứu sâu rộng, nhanh chóng làm chủ công nghệ mới và đưa vào ứng dụng thực tiễn giải quyết bài toán người dùng.",
      ],
    },
  ] as EducationItem[],

  certifications: [
    {
      name: "NodeJS Programming & Distributed Backend Architecture",
      issuer: "Đại học Tôn Đức Thắng (Chứng chỉ học thuật chuyên sâu)",
      year: "2024",
    },
    {
      name: "User Interface Design & Human-Computer Interaction",
      issuer: "Đại học Tôn Đức Thắng (Đồ án UI/UX xuất sắc)",
      year: "2024",
    },
    {
      name: "Requirements Analysis & Enterprise System Modeling",
      issuer: "Đại học Tôn Đức Thắng (Nghiên cứu BA doanh nghiệp)",
      year: "2024",
    },
    {
      name: "Professional System Deployment & Customer Success",
      issuer: "Chứng chỉ Triển khai Thực địa & Nghiệm thu Dự án FPT IS",
      year: "2026",
    },
  ],
};
