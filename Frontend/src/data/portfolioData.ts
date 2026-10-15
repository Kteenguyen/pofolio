export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  impact: string[];
  techStack: string[];
  category: "Full-Stack và Web" | "Backend và CSDL" | "Phân Tích BA và Nghiệp Vụ" | "Mobile và Khác" | "Full-Stack & Web" | "Backend & Databases" | "BA Analysis & Enterprise" | "Mobile & Others";
  categoryEn?: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  images?: string[];
  featured: boolean;
  metrics: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  yearBadge: string;
  location: string;
  type: string;
  typeEn?: string;
  website?: string;
  description: string;
  achievements: string[];
  skills: string[];
  metrics?: { label: string; value: string }[];
  isEducation?: boolean;
  imageUrl?: string;
  images?: string[];
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

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface PersonalInfo {
  name: string;
  nickname: string;
  title: string;
  degreeLabel: string;
  headline: string;
  bio: string;
  email: string;
  backupEmail: string;
  phone: string;
  github: string;
  githubUser: string;
  telegram: string;
  linkedin: string;
  location: string;
  english: string;
  availableForHire: boolean;
  statusText: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface PillarItem {
  title: string;
  description: string;
}

export interface PortfolioDataStructure {
  personal: PersonalInfo;
  stats: StatItem[];
  pillars: PillarItem[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: EducationItem[];
  certifications: Certification[];
}

// ==============================================================================
// 1. DATA TIẾNG VIỆT (VIETNAMESE)
// ==============================================================================
export const portfolioDataVi: PortfolioDataStructure = {
  personal: {
    name: "Nguyễn Khoa Tài",
    nickname: "Ktee",
    title: "Cử Nhân Chuyên Ngành Kỹ Thuật Phần Mềm | Định Hướng Fullstack và AI Agent Workflow",
    degreeLabel: "Cử Nhân Chuyên Ngành Kỹ Thuật Phần Mềm • ĐH Tôn Đức Thắng (GPA: 3.0 / 4.0)",
    headline: "Giao thoa giữa kiến trúc hệ thống dữ liệu chịu tải cao, trải nghiệm Front-End điện ảnh chuẩn Thụy Sĩ và tư duy cầu nối phân tích số hóa thực tế.",
    bio: "Cử nhân chuyên ngành Kỹ Thuật Phần Mềm tốt nghiệp Đại học Tôn Đức Thắng (GPA: 3.0 / 4.0), sở hữu kinh nghiệm thực tập (HomeNest, FPT IS) cùng năng lực phát triển các dự án Web/App thực tế. Tinh thần tự giác, ham học hỏi cao, liên tục làm chủ công nghệ mới và định hướng chuyên sâu mảng Fullstack và AI Agent Workflow. Mục tiêu năm tới xác lập vị trí chính thức ổn định trong ngành, tài chính vững vàng; mong muốn đồng hành và cống hiến lâu dài cùng Quý doanh nghiệp.",
    email: "nguyenkhoatai2003@gmail.com",
    backupEmail: "nguyenkhoatai2003@gmail.com",
    phone: "0852723945",
    github: "https://github.com/Kteenguyen",
    githubUser: "Kteenguyen",
    telegram: "https://t.me/kteenguyen",
    linkedin: "https://linkedin.com",
    location: "TP. Hồ Chí Minh, Việt Nam",
    english: "Aptis ESOL B1 (136/200)",
    availableForHire: true,
    statusText: "Sẵn sàng đón nhận cơ hội Cử Nhân Kỹ Thuật Phần Mềm / AI Agentic Engineer",
  },

  stats: [
    { label: "Cán bộ số hóa tại FPT IS", value: "230+" },
    { label: "Bugs và CR UAT xử lý", value: "60+" },
    { label: "PageSpeed Mobile (CLS = 0)", value: "96/100" },
    { label: "Độ trễ phản hồi Webhook", value: "<2s" },
  ],

  pillars: [
    {
      title: "Kiến Trúc AI Agentic và Fullstack (Modern Systems)",
      description: "Làm chủ Next.js 15 App Router, React 19, TypeScript và giao thức Model Context Protocol (MCP 2.0). Xây dựng quy trình tự động hóa 4 tầng và kiểm thử giao diện đa màn hình.",
    },
    {
      title: "Kinh Nghiệm Thực Chiến Doanh Nghiệp (Enterprise Battle-Tested)",
      description: "Trực tiếp điều phối go-live hệ thống THADS tại FPT IS cho 230 cán bộ; tái cấu trúc website PowerTech đạt Google PageSpeed 96/100; xây dựng Luklak với 7 trang đạt 60 FPS.",
    },
    {
      title: "Tư Duy Cầu Nối Nghiệp Vụ (Product và BA Leadership)",
      description: "Không dừng lại ở việc viết mã, tôi làm chủ toàn diện quy trình phân tích bài toán kinh doanh, khơi gợi yêu cầu, thiết kế sơ đồ UML chuẩn mực và bảo đảm sản phẩm bàn giao nghiệm thu 100%.",
    },
  ],

  skillCategories: [
    {
      category: "AI Agentic và Tự Động Hóa Quy Trình",
      description: "Xây dựng luồng quy trình thông minh, Model Context Protocol và tự động hóa tích hợp",
      skills: [
        { name: "Multi-Agent System và AI Workflows", level: 92, note: "Điều Phối Hệ Thống Agent 4 Tầng" },
        { name: "Model Context Protocol (MCP 2.0)", level: 90, note: "JSON-RPC, Tool Calling, Context Management" },
        { name: "Make.com và Webhook Ingress", level: 92, note: "Tự Động Hóa Realtime Phản Hồi <2s" },
        { name: "RAG và LLM Integration", level: 88, note: "OpenAI, Gemini, Anthropic APIs, Hybrid Search" },
        { name: "Autonomous Testing (CDP và Chrome)", level: 90, note: "Kiểm Thử Mobile 430px và Desktop Tự Động" },
      ],
    },
    {
      category: "Front-End và Xây Dựng Web Trọn Gói",
      description: "Thiết kế giao diện trực quan, chuyển động điện ảnh mượt mà và tối ưu Core Web Vitals",
      skills: [
        { name: "ReactJS (v19) & Next.js 15", level: 95, note: "App Router, Server Actions, Zero-CLS" },
        { name: "Tailwind CSS & Mobile-First", level: 95, note: "Viewport 430px Tuyệt Đối Không Tràn Viền" },
        { name: "Framer Motion & Lenis Scroll", level: 92, note: "Cinematic Parallax, Spring Dynamics 60 FPS" },
        { name: "TypeScript & JavaScript ES6+", level: 92, note: "Strict Typing, Clean Code, Enterprise Patterns" },
        { name: "Three.js & WebGL 4D Spatial", level: 90, note: "Procedural Shaders, Particle Systems" },
        { name: "WordPress CMS & Headless Migration", level: 90, note: "Di Chuyển Sang Next.js 15 Tối Ưu Tốc Độ" },
      ],
    },
    {
      category: "Back-End, CSDL và Tải Cao",
      description: "Xây dựng RESTful API phân tán, xác thực an toàn và tối ưu hóa truy vấn CSDL",
      skills: [
        { name: "Node.js & Express Framework", level: 92, note: "Distributed APIs, JWT Auth, Microservices" },
        { name: "PostgreSQL & Supabase", level: 92, note: "Schema Design, 3NF Normalization, Row Security" },
        { name: "Redis Caching & In-Memory Store", level: 90, note: "Flash Sale Realtime, Độ Trễ <50ms" },
        { name: "C# & ASP.NET Core MVC", level: 86, note: "Identity RBAC, Entity Framework Core" },
        { name: "MongoDB & MS SQL Server", level: 88, note: "Quan Hệ RDBMS, Indexing, Transaction ACID" },
        { name: "RESTful APIs & Webhook Integrations", level: 92, note: "HMAC Signature, Idempotency, VietQR" },
      ],
    },
    {
      category: "Nghiệp Vụ BA và DevOps Vận Hành",
      description: "Phân tích yêu cầu nghiệp vụ, kiểm thử chất lượng UAT và đưa hệ thống lên Production",
      skills: [
        { name: "Phân Tích Nghiệp Vụ (BA)", level: 92, note: "Khảo Sát Khách Hàng, BRD, SRS, Agile/Scrum" },
        { name: "Mô Hình Hóa Sơ Đồ UML", level: 90, note: "Use Case, Activity, Sequence Diagram" },
        { name: "UAT Testing & Quản Lý Lỗi (Jira)", level: 92, note: "Kiểm Thử Thực Địa và Xử Lý 60+ Bugs FPT IS" },
        { name: "Triển Khai Máy Chủ VPS Linux & Nginx", level: 88, note: "Reverse Proxy, SSL Let's Encrypt, Caching" },
        { name: "CI/CD & Version Control (Git)", level: 92, note: "GitHub Actions, Vercel Edge, Production Go-Live" },
        { name: "Chữ Ký Số & Bảo Mật Doanh Nghiệp", level: 88, note: "Cấu Hình Chứng Thư Số và Nghiệm Thu Khách Hàng" },
      ],
    },
  ],

  projects: [
    {
      id: "nam-gia-phat-realestate",
      title: "Cổng Bất Động Sản Doanh Nghiệp Nam Gia Phát",
      subtitle: "Enterprise Commercial Real Estate Portal with Multi-Dimensional Filtering",
      category: "Full-Stack và Web",
      featured: true,
      imageUrl: "/namgiaphat.jpg",
      liveUrl: "https://nam-gia-phat-demo.vercel.app/",
      description: "Xây dựng website bất động sản thương mại trên Next.js 15 App Router, React 19, Tailwind CSS và Ant Design; tối ưu hóa phân cấp danh mục căn hộ, nhà phố, đất nền khu vực Nam Sài Gòn.",
      problem: "Doanh nghiệp môi giới BĐS Nam Sài Gòn cần cổng thông tin số giới thiệu dự án, tìm kiếm phân loại sản phẩm nhanh và thu thập lead tư vấn chuẩn xác trên điện thoại.",
      solution: "Phát triển bộ lọc tìm kiếm sản phẩm đa chiều (mức giá, diện tích, vị trí) với độ trễ phản hồi tức thì, tích hợp form liên hệ tư vấn tự động và chuẩn tương thích 100% trên thiết bị di động.",
      impact: [
        "Phát triển hoàn chỉnh bộ lọc tìm kiếm đa chiều phản hồi tức thì dưới 100ms.",
        "Thiết kế chuẩn Mobile-First 430px cam kết 0 phần tử tràn viền.",
        "Triển khai Production thành công trên nền tảng Vercel với thời gian tải trang nhanh chóng.",
      ],
      metrics: [
        { label: "Tương thích Mobile", value: "100%" },
        { label: "Tốc độ tải trang", value: "<1.2s" },
        { label: "Bộ lọc đa chiều", value: "Tức thì" },
      ],
      techStack: ["Next.js 15", "React 19", "Tailwind CSS", "Ant Design", "TypeScript", "Vercel"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "bliss-homestay-automation",
      title: "Nghiên Cứu Phát Triển (GĐ 1): Tự Động Hóa Tin Nhắn Bliss Homestay",
      subtitle: "ManyChat Webhook Ingress & Make.com Automation Workflow",
      category: "Backend và CSDL",
      featured: true,
      description: "Nghiên cứu và phát triển (Giai đoạn 1) quy trình tự động hóa trả lời tin nhắn kết hợp Webhook ManyChat và Make.com thời gian thực, bắt trọn và phân giải cấu trúc dữ liệu JSON từ khách hàng.",
      problem: "Bliss Homestay tiếp nhận lượng lớn tin nhắn hỏi phòng phân tán trên nhiều kênh, thường xuyên bị chậm trễ phản hồi dẫn đến tỷ lệ rớt khách cao.",
      solution: "Triển khai vận hành cho Bliss Homestay: tự động phân loại nhu cầu, phản hồi thông tin phòng và báo giá tức thì với độ trễ <2 giây, cắt giảm 80% thời gian chờ và triệt tiêu 100% rủi ro bỏ sót tin nhắn.",
      impact: [
        "Phản hồi khách hàng tức thì với độ trễ dưới 2 giây.",
        "Cắt giảm 80% thời gian chờ đợi phản hồi của khách hàng.",
        "Triệt tiêu 100% rủi ro bỏ sót tin nhắn đặt phòng trong các khung giờ cao điểm.",
      ],
      metrics: [
        { label: "Độ trễ phản hồi", value: "<2s" },
        { label: "Thời gian chờ", value: "-80%" },
        { label: "Bỏ sót tin nhắn", value: "0%" },
      ],
      techStack: ["ManyChat", "Webhook Ingress", "Make.com", "JSON REST API", "Workflow Automation"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "ai-career-engine",
      title: "Động Cơ AI Phân Tích Khớp Việc Làm và Portfolio Cá Nhân",
      subtitle: "Realtime Job Match Engine with JD Keyword Extraction & Edge Network",
      category: "Full-Stack và Web",
      featured: true,
      liveUrl: "https://pofolio-b3w9.vercel.app/",
      description: "Xây dựng website cá nhân Production-Grade triển khai trên Vercel Edge Network với Next.js 15 App Router, React 19 và Tailwind CSS; thiết kế Mobile-First cam kết chuẩn 0 phần tử tràn viền.",
      problem: "Ứng viên cần công cụ trực quan để nhà tuyển dụng đối soát năng lực kỹ thuật và tính toán độ tương thích với mô tả công việc (JD) tuyển dụng trong thời gian thực.",
      solution: "Phát triển động cơ gợi ý nghề nghiệp (careerEngine.ts): bóc tách từ khóa mô tả công việc (JD), trích xuất kỹ năng yêu cầu và tính toán điểm tương thích ứng viên theo thuật toán trọng số thời gian thực.",
      impact: [
        "Bóc tách từ khóa JD và tính toán trọng số tương thích kỹ năng chính xác theo thời gian thực.",
        "Thiết kế giao diện chuẩn Mobile-First triệt tiêu hoàn toàn xê dịch bố cục (CLS = 0).",
        "Triển khai Production trên mạng lưới Vercel Edge toàn cầu với thời gian phản hồi cao.",
      ],
      metrics: [
        { label: "Tương thích JD", value: "Realtime" },
        { label: "Chỉ số CLS", value: "0" },
        { label: "Triển khai Edge", value: "100%" },
      ],
      techStack: ["Next.js 15", "React 19", "Tailwind CSS", "TypeScript", "Vercel Edge", "Career Engine"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "luklak-cinematic-web",
      title: "Website Doanh Nghiệp Đa Trang và Cinematic Scroll (Luklak)",
      subtitle: "Enterprise Responsive Website with Lenis Smooth Scroll 60 FPS & Spring Physics",
      category: "Full-Stack và Web",
      featured: true,
      imageUrl: "/luklak.jpg",
      description: "Xây dựng hoàn thiện website thương hiệu gồm 7 trang hoàn chỉnh và 17 components, chuyển đổi trực tiếp bản vẽ Figma sang mã nguồn Next.js/Tailwind CSS chuẩn mực.",
      problem: "Doanh nghiệp cần một diện mạo số sang trọng, đẳng cấp nhưng đòi hỏi hiệu năng cuộn phải đạt chuẩn 60fps mượt mà trên cả máy tính lẫn điện thoại.",
      solution: "Tích hợp hiệu ứng cuộn điện ảnh Cinematic Scroll 60 FPS (Lenis Scroll kết hợp Framer Motion parallax video và spring physics). Trực tiếp cấu hình máy chủ VPS Linux, cài đặt Nginx Reverse Proxy, cấp chứng chỉ SSL Let's Encrypt và tối ưu bộ nhớ đệm HTTP Caching.",
      impact: [
        "Xây dựng thành công 7 trang chuẩn SEO và 17 component tái sử dụng.",
        "Trải nghiệm cuộn mượt mà chuẩn Cinematic 60 FPS, không giật lag trên mọi thiết bị.",
        "Triển khai Production máy chủ VPS Linux với chứng chỉ SSL và bộ nhớ đệm tối ưu.",
      ],
      metrics: [
        { label: "Số trang web", value: "7 Trang" },
        { label: "Components tái sử dụng", value: "17+" },
        { label: "Tốc độ khung hình", value: "60 FPS" },
      ],
      techStack: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Lenis", "Figma", "VPS Linux", "SSL/Nginx"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "powertech-high-performance",
      title: "Tái Cấu Trúc Website Năng Lượng và Tối Ưu Hiệu Năng (PowerTech)",
      subtitle: "Next.js 15 App Router Migration, Zero-CLS & PageSpeed 96/100",
      category: "Full-Stack và Web",
      featured: true,
      imageUrl: "/powertech.png",
      liveUrl: "https://powertech.vn",
      description: "Tái cấu trúc website năng lượng từ nền tảng WordPress cũ bị lỗi giật bố cục CLS 0.38 và tải chậm >4s sang kiến trúc Next.js 15 App Router phân tầng độc lập.",
      problem: "Website WordPress cũ tải chậm hơn 4 giây, giật layout nghiêm trọng với chỉ số CLS 0.38 khiến tỷ lệ thoát trang doanh nghiệp lên đến 58%.",
      solution: "Tái thiết kế toàn bộ trên Next.js 15 App Router phân tầng độc lập; tối ưu tài nguyên triệt tiêu FOIT/FOUT, cấu hình Schema JSON-LD chuẩn On-Page SEO và tối ưu hóa bộ nhớ đệm.",
      impact: [
        "Điểm Google PageSpeed Mobile tăng vọt từ 42 lên 96/100.",
        "Triệt tiêu hoàn toàn xê dịch bố cục với chỉ số CLS = 0 tuyệt đối.",
        "Tỷ lệ thoát trang (Bounce Rate) giảm mạnh từ 58% xuống chỉ còn 21%.",
      ],
      metrics: [
        { label: "PageSpeed Mobile", value: "96/100" },
        { label: "Chỉ số CLS", value: "0" },
        { label: "Bounce Rate", value: "-37%" },
      ],
      techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Core Web Vitals", "WordPress Migration", "SEO Technical"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "fpt-civil-judgment-suite",
      title: "Dự Án Triển Khai Hệ Thống Cơ Quan Thi Hành Án Dân Sự (FPT IS)",
      subtitle: "Government Enterprise System Deployment, UAT Testing & End-User Training",
      category: "Phân Tích BA và Nghiệp Vụ",
      featured: true,
      imageUrl: "/tha1.jpg",
      images: ["/tha1.jpg", "/tha2.jpg"],
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
      title: "Sàn Thương Mại Điện Tử và Đặt Hàng Trực Tuyến (Flash Sale Realtime)",
      subtitle: "E-Commerce Platform with Redis High-Concurrency Cache & Shipping Integration",
      category: "Backend và CSDL",
      featured: false,
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
      category: "Full-Stack và Web",
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
      category: "Phân Tích BA và Nghiệp Vụ",
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
      category: "Phân Tích BA và Nghiệp Vụ",
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
  ],

  experience: [
    {
      id: "powertech",
      role: "Kỹ Sư Fullstack Web & Tối Ưu Hóa Hiệu Năng (Next.js 15)",
      company: "Công Ty Năng Lượng Powertech Sài Gòn (PowerTech)",
      website: "https://powertech.vn",
      period: "07/2026 – Hiện Tại",
      yearBadge: "07/2026 – Hiện Tại",
      location: "TP. Hồ Chí Minh, Việt Nam",
      type: "Doanh Nghiệp",
      description: "Thiết kế giao diện UI/UX Version 2 cho công ty điện năng lượng mặt trời, tối ưu nhận diện thương hiệu và trực tiếp xây dựng hệ thống CMS quản trị linh hoạt.",
      achievements: [
        "Thiết kế giao diện UI/UX Version 2 cho công ty điện năng lượng mặt trời, tối ưu nhận diện thương hiệu và trải nghiệm tương tác người dùng.",
        "Thiết kế và tối ưu hệ thống CMS quản trị, hỗ trợ cấu hình dữ liệu và cập nhật nội dung vận hành linh hoạt, nhanh chóng.",
        "Thiết kế giao diện trang Tuyển dụng mới và xây dựng module dynamic tự động thu thập thông tin ứng viên để đẩy leads về hệ thống CMS.",
        "Thiết kế, lập trình và vá lỗi dynamic rendering; chủ động xử lý các kịch bản dữ liệu fallback an toàn cho các nội dung do AI sinh ra.",
        "Thực hiện manual testing tỉ mỉ từng nút bấm (button), luồng thao tác và đảm bảo giao diện responsive chuẩn mực trên đa thiết bị.",
        "Hoàn thiện đóng gói, kiểm thử chấp nhận và trực tiếp bàn giao sản phẩm vận hành ổn định cho người dùng cuối.",
      ],
      skills: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "CMS Quản Trị", "Dynamic Rendering", "Manual Testing"],
      metrics: [
        { label: "Giao diện UI/UX", value: "Version 2" },
        { label: "CMS Quản trị", value: "Vận hành" },
        { label: "Kiểm thử chấp nhận", value: "100%" },
      ],
    },
    {
      id: "luklak-freelance",
      role: "Kỹ Sư Lập Trình Front-End Web (Freelance)",
      company: "Dự Án Doanh Nghiệp Khách Hàng Luklak",
      period: "05/2026",
      yearBadge: "05/2026",
      location: "TP. Hồ Chí Minh, Việt Nam",
      type: "Freelance",
      description: "Thiết kế và phát triển giao diện Front-End website thương hiệu gồm 7 trang hoàn chỉnh và 17 components, chuyển đổi trực tiếp bản vẽ Figma sang mã nguồn Next.js và Tailwind CSS chuẩn mực.",
      achievements: [
        "Thiết kế và phát triển giao diện Front-End website thương hiệu gồm 7 trang hoàn chỉnh và 17 components, chuyển đổi trực tiếp bản vẽ Figma sang mã nguồn Next.js và Tailwind CSS chuẩn mực.",
        "Tích hợp hiệu ứng cuộn điện ảnh Cinematic Scroll 60 FPS (Lenis Scroll kết hợp Framer Motion parallax video và spring physics), tối ưu trải nghiệm tương tác mượt mà.",
      ],
      skills: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Lenis Smooth Scroll", "Figma to Code", "UI/UX Front-End"],
      metrics: [
        { label: "Số trang web", value: "7 Trang" },
        { label: "Components", value: "17+" },
        { label: "Khung hình cuộn", value: "60 FPS" },
      ],
    },
    {
      id: "homenest-software",
      role: "Thực Tập Sinh Phân Tích Nghiệp Vụ (Business Analyst – BA)",
      company: "Công Ty HomeNest Software",
      period: "03/2026 – 06/2026",
      yearBadge: "03/2026 – 06/2026",
      location: "TP. Hồ Chí Minh, Việt Nam",
      type: "Thực Tập Doanh Nghiệp",
      description: "Hoàn thành kỳ thực tập doanh nghiệp tại HomeNest Software với vai trò BA. Khảo sát và thu thập yêu cầu bài toán số hóa của khách hàng thông qua Google Meet; mô hình hóa quy trình nghiệp vụ thông qua sơ đồ Use Case, Activity Diagram và tài liệu đặc tả yêu cầu phần mềm (SRS).",
      achievements: [
        "Khảo sát và thu thập yêu cầu bài toán số hóa qua Google Meet trực tiếp với khách hàng; mô hình hóa quy trình qua sơ đồ Use Case, Activity Diagram và tài liệu đặc tả SRS.",
        "Đóng vai trò cầu nối nghiệp vụ giữa khách hàng và đội ngũ lập trình, làm rõ logic chức năng và kiểm thử UAT để đảm bảo sản phẩm chuyển giao đúng kỳ vọng.",
        "Đề xuất tạo cuộc họp để triển khai ngôn ngữ thiết kế; thiết lập Timeline tiến độ công việc theo chuẩn mô hình Agile/Scrum.",
        "Phối hợp nhịp nhàng liên phòng ban: Developers, UI/UX, Graphic Design và duy trì cập nhật báo cáo tiến độ liên tục.",
      ],
      skills: ["Phân tích nghiệp vụ BA", "Khảo sát yêu cầu số hóa", "Sơ đồ Use Case & Activity", "Tài liệu đặc tả SRS", "Agile / Scrum", "Figma & Wireframe", "UAT Testing"],
      metrics: [
        { label: "Thời gian thực tập", value: "03–06/2026" },
        { label: "Tài liệu SRS & UML", value: "Chuẩn hóa" },
        { label: "Mô hình vận hành", value: "Agile/Scrum" },
      ],
    },
    {
      id: "namgiaphat-realestate",
      role: "Kỹ Sư Lập Trình Front-End Web (Freelance)",
      company: "Dự Án Doanh Nghiệp Khách Hàng Bất Động Sản Nam Gia Phát",
      period: "02/2026 – 04/2026",
      yearBadge: "02/2026 – 04/2026",
      location: "TP. Hồ Chí Minh, Việt Nam",
      type: "Freelance",
      description: "Xây dựng cổng thông tin bất động sản thương mại trên Next.js 15 App Router, React 19, Tailwind CSS và Ant Design; tối ưu hóa phân cấp danh mục căn hộ, nhà phố, đất nền khu vực Nam Sài Gòn.",
      achievements: [
        "Phát triển hoàn chỉnh bộ lọc tìm kiếm sản phẩm đa chiều (mức giá, diện tích, vị trí) với độ trễ phản hồi tức thì dưới 100ms.",
        "Thiết kế chuẩn Mobile-First 430px cam kết 0 phần tử tràn viền (CLS = 0), tối ưu thao tác chạm vuốt trên smartphone.",
        "Tích hợp form liên hệ tư vấn tự động thu thập lead khách hàng và đẩy dữ liệu về hệ thống quản lý.",
        "Triển khai Production thành công trên nền tảng Vercel với tốc độ tải trang dưới 1.2s.",
      ],
      skills: ["Next.js 15", "React 19", "Tailwind CSS", "Ant Design", "TypeScript", "Mobile-First 430px", "Vercel"],
      metrics: [
        { label: "Bộ lọc đa chiều", value: "<100ms" },
        { label: "Tương thích Mobile", value: "100%" },
        { label: "Tốc độ tải trang", value: "<1.2s" },
      ],
    },
    {
      id: "fpt-is",
      role: "Trưởng Nhóm Triển Khai Phần Mềm",
      company: "Công Ty Phần Mềm FPT IS (Hà Nội)",
      period: "10/2025 – 02/2026",
      yearBadge: "10/2025 – 02/2026",
      location: "Hà Nội – Đồng Tháp",
      type: "Doanh Nghiệp",
      imageUrl: "/tha1.jpg",
      images: ["/tha1.jpg", "/tha2.jpg"],
      description: "Tham gia dự án số hóa trọng điểm cho Cơ quan Thi Hành Án Dân Sự; điều phối quy trình triển khai phần mềm, hỗ trợ UAT và go-live hệ thống.",
      achievements: [
        "Tham gia dự án số hóa trọng điểm cho Cơ quan Thi Hành Án Dân Sự; điều phối quy trình triển khai phần mềm, hỗ trợ UAT và go-live hệ thống.",
        "Trực tiếp đứng lớp tổ chức 15 buổi đào tạo (Training) cho hơn 230 cán bộ và người dùng cuối, chuyển đổi quy trình thủ công sang số hóa.",
        "Phối hợp chặt chẽ với đội ngũ Back-End xác định lỗi giao diện và API, ghi nhận và xử lý dứt điểm 60+ bugs và yêu cầu thay đổi (CR).",
        "Cài đặt phần mềm, cấu hình chứng thư số và hỗ trợ kỹ thuật từ xa qua UltraViewer, hoàn thiện biên bản nghiệm thu dự án đúng hạn.",
      ],
      skills: ["FPT IS Platform", "UAT Testing", "Chữ ký số", "UltraViewer", "Đào tạo người dùng", "Quản lý lỗi Jira"],
      metrics: [
        { label: "Cán bộ đào tạo", value: "230+" },
        { label: "Buổi Training", value: "15 Buổi" },
        { label: "Bugs/CR xử lý", value: "60+" },
      ],
    },
    {
      id: "tdtu-engineering",
      role: "Cử Nhân Chuyên Ngành Kỹ Thuật Phần Mềm (ĐH Tôn Đức Thắng)",
      company: "Đại Học Tôn Đức Thắng (TDTU)",
      period: "2021 – 2026",
      yearBadge: "2021 – 2026",
      location: "TP. Hồ Chí Minh, Việt Nam",
      type: "Cử Nhân Học Vấn",
      isEducation: true,
      description: "Chương trình đào tạo Cử nhân chuyên ngành Kỹ Thuật Phần Mềm toàn thời gian tại Đại học Tôn Đức Thắng. Tốt nghiệp với điểm GPA 3.0 / 4.0 và bảng điểm môn chuyên ngành xuất sắc.",
      achievements: [
        "Điểm số môn học chuyên ngành cốt lõi: Lập trình NodeJS phân tán (8.3/10.0), Thiết kế Giao diện Người dùng UI/UX (8.3/10.0), Phân tích & Thiết kế Yêu cầu Phần mềm BA (8.1/10.0), Quản trị Hệ thống Doanh nghiệp (7.3/10.0).",
        "Hoàn thành 150+ tín chỉ học thuật chuyên sâu: Cấu trúc Dữ liệu & Giải thuật, Mạng Máy tính, Hệ Quản trị CSDL Quan hệ 3NF, Kiến trúc Phần mềm Phân tán, và Đảm bảo Chất lượng Phần mềm (QA/QC).",
        "Nền tảng song hành vững chắc: Làm chủ kỹ thuật lập trình Front-End/Back-End kết hợp tư duy phân tích nghiệp vụ hệ thống thực tế.",
      ],
      skills: ["NodeJS phân tán (8.3)", "UI/UX Design (8.3)", "Phân tích BA (8.1)", "Hệ thống DN (7.3)", "Cấu trúc dữ liệu", "CSDL 3NF", "QA/QC"],
      metrics: [
        { label: "GPA Tốt nghiệp", value: "3.0 / 4.0" },
        { label: "Tín chỉ hoàn thành", value: "150+ Tín chỉ" },
        { label: "Điểm NodeJS & UI/UX", value: "8.3 / 10.0" },
      ],
    },
  ],

  education: [
    {
      id: "tdtu-degree",
      degree: "Cử Nhân Chuyên Ngành Kỹ Thuật Phần Mềm",
      institution: "Đại Học Tôn Đức Thắng (TDTU)",
      period: "2021 – 2026",
      duration: "Chương Trình Đào Tạo Cử Nhân Toàn Thời Gian (2021 – 2026)",
      grade: "GPA: 3.0 / 4.0 (Cử Nhân Chuyên Ngành Kỹ Thuật Phần Mềm)",
      coursework: [
        { name: "Lập trình NodeJS phân tán", score: "8.3 / 10.0" },
        { name: "Thiết kế Giao diện Người dùng UI/UX", score: "8.3 / 10.0" },
        { name: "Phân tích & Thiết kế Yêu cầu Phần mềm (BA)", score: "8.1 / 10.0" },
        { name: "Quản trị Hệ thống Doanh nghiệp", score: "7.3 / 10.0" },
      ],
      highlights: [
        "Hoàn thành 150+ tín chỉ học thuật chuyên sâu: Cấu trúc Dữ liệu & Giải thuật, Mạng Máy tính, Hệ Quản trị CSDL Quan hệ, Kiến trúc Phần mềm Phân tán, và Đảm bảo Chất lượng Phần mềm (QA/QC).",
        "Nền tảng song hành vững chắc: Làm chủ kỹ thuật lập trình Front-End/Back-End kết hợp tư duy phân tích nghiệp vụ hệ thống thực tế.",
        "Kỹ năng tự nghiên cứu sâu rộng, nhanh chóng làm chủ công nghệ mới và đưa vào ứng dụng thực tiễn giải quyết bài toán người dùng.",
      ],
    },
  ],

  certifications: [
    {
      name: "Chứng Chỉ Tiếng Anh: Aptis ESOL B1 (136/200)",
      issuer: "British Council (Đọc hiểu tài liệu kỹ thuật chuyên sâu & giao tiếp)",
      year: "2025",
    },
    {
      name: "Chứng Chỉ Triển Khai Phần Mềm Chuyên Nghiệp & Nghiệm Thu Khách Hàng",
      issuer: "Công Ty Phần Mềm FPT IS (Hà Nội)",
      year: "2026",
    },
    {
      name: "Lập trình NodeJS & Kiến Trúc Phân Tán (Điểm: 8.3/10.0)",
      issuer: "Đại học Tôn Đức Thắng (Chứng chỉ học thuật chuyên sâu)",
      year: "2024",
    },
    {
      name: "Thiết Kế Giao Diện Người Dùng UI/UX (Điểm: 8.3/10.0)",
      issuer: "Đại học Tôn Đức Thắng (Đồ án UI/UX xuất sắc)",
      year: "2024",
    },
  ],
};

// ==============================================================================
// 2. DATA TIẾNG ANH (ENGLISH)
// ==============================================================================
export const portfolioDataEn: PortfolioDataStructure = {
  personal: {
    name: "Nguyen Khoa Tai",
    nickname: "Ktee",
    title: "Bachelor of Software Engineering | Fullstack & AI Agent Workflow",
    degreeLabel: "Bachelor of Software Engineering • Ton Duc Thang University (GPA: 3.0 / 4.0)",
    headline: "Converging high-concurrency data systems, Swiss-inspired cinematic Front-End experiences, and practical business analysis bridge mindset.",
    bio: "Bachelor of Software Engineering graduate from Ton Duc Thang University (GPA: 3.0 / 4.0), bringing battle-tested internship experience (HomeNest, FPT IS) and proven capability in developing production-grade Web/Mobile systems. Self-driven, eager to learn, and specialized in Fullstack & AI Agent Workflow. Seeking stable, long-term engineering roles to drive value for prospective enterprises.",
    email: "nguyenkhoatai2003@gmail.com",
    backupEmail: "nguyenkhoatai2003@gmail.com",
    phone: "0852723945",
    github: "https://github.com/Kteenguyen",
    githubUser: "Kteenguyen",
    telegram: "https://t.me/kteenguyen",
    linkedin: "https://linkedin.com",
    location: "Ho Chi Minh City, Vietnam",
    english: "Aptis ESOL B1 (136/200)",
    availableForHire: true,
    statusText: "Ready for Software Engineer / AI Agentic Engineer Opportunities",
  },

  stats: [
    { label: "Enterprise Users Trained at FPT IS", value: "230+" },
    { label: "UAT Bugs & Change Requests Resolved", value: "60+" },
    { label: "Mobile PageSpeed (Zero-CLS)", value: "96/100" },
    { label: "Webhook Ingress Response Latency", value: "<2s" },
  ],

  pillars: [
    {
      title: "AI Agentic Architecture & Fullstack (Modern Systems)",
      description: "Mastering Next.js 15 App Router, React 19, TypeScript, and Model Context Protocol (MCP 2.0). Architecting 4-tier autonomous squads and multi-screen visual QA verification.",
    },
    {
      title: "Enterprise Battle-Tested Experience (Field Implementation)",
      description: "Directly coordinated go-live for the Ministry Judgment Enforcement system at FPT IS for 230+ officers; refactored PowerTech to achieve Google PageSpeed 96/100; engineered Luklak with 7 responsive pages at 60 FPS.",
    },
    {
      title: "Business Analysis & Product Leadership (Bridge Mindset)",
      description: "Beyond code syntax, commanding the full business problem elicitation cycle, rigorous UML diagrams, and guaranteeing 100% successful milestone acceptance.",
    },
  ],

  skillCategories: [
    {
      category: "AI Agentic & Workflow Automation",
      description: "Architecting intelligent agent workflows, Model Context Protocol, and autonomous integrations",
      skills: [
        { name: "Multi-Agent System & AI Workflows", level: 92, note: "4-Tier Autonomous Squad Orchestration" },
        { name: "Model Context Protocol (MCP 2.0)", level: 90, note: "JSON-RPC, Tool Calling, Context Management" },
        { name: "Make.com & Webhook Ingress", level: 92, note: "Realtime Automation & Ingress Latency <2s" },
        { name: "RAG & LLM Integration", level: 88, note: "OpenAI, Gemini, Anthropic APIs, Hybrid Search" },
        { name: "Autonomous Testing (CDP & Chrome)", level: 90, note: "Automated Mobile 430px & Desktop Visual QA" },
      ],
    },
    {
      category: "Front-End & Complete Web Architecture",
      description: "Intuitive interface design, 60 FPS cinematic motion, and Core Web Vitals optimization",
      skills: [
        { name: "ReactJS (v19) & Next.js 15", level: 95, note: "App Router, Server Actions, Zero-CLS" },
        { name: "Tailwind CSS & Mobile-First", level: 95, note: "Viewport 430px Strict Zero-Overflow" },
        { name: "Framer Motion & Lenis Scroll", level: 92, note: "Cinematic Parallax, Spring Dynamics 60 FPS" },
        { name: "TypeScript & Modern JavaScript", level: 92, note: "Strict Typing, Clean Code, Enterprise Patterns" },
        { name: "Three.js & WebGL 4D Spatial", level: 90, note: "Procedural Shaders, Particle Systems" },
        { name: "WordPress CMS & Headless Migration", level: 90, note: "Headless Next.js 15 Speed Optimization" },
      ],
    },
    {
      category: "Back-End, Databases & High Concurrency",
      description: "Distributed RESTful APIs, secure authentication, and database query tuning",
      skills: [
        { name: "Node.js & Express Framework", level: 92, note: "Distributed APIs, JWT Auth, Microservices" },
        { name: "PostgreSQL & Supabase", level: 92, note: "Schema Design, 3NF Normalization, Row Security" },
        { name: "Redis Caching & In-Memory Store", level: 90, note: "Realtime Flash Sale, Latency <50ms" },
        { name: "C# & ASP.NET Core MVC", level: 86, note: "Identity RBAC, Entity Framework Core" },
        { name: "MongoDB & MS SQL Server", level: 88, note: "Relational RDBMS, Indexing, ACID Transactions" },
        { name: "RESTful APIs & Webhook Integrations", level: 92, note: "HMAC Signature, Idempotency, VietQR" },
      ],
    },
    {
      category: "Business Analysis (BA) & DevOps Operations",
      description: "Requirement elicitation, UAT QA quality assurance, and Production deployment",
      skills: [
        { name: "Business Analysis (BA)", level: 92, note: "Customer Elicitation, BRD, SRS, Agile/Scrum" },
        { name: "UML System Modeling", level: 90, note: "Use Case, Activity, Sequence Diagram" },
        { name: "UAT Testing & Defect Tracking (Jira)", level: 92, note: "Field Verification & 60+ FPT IS Defects Resolved" },
        { name: "Linux VPS & Nginx Server Deployment", level: 88, note: "Reverse Proxy, SSL Let's Encrypt, HTTP Caching" },
        { name: "CI/CD & Version Control (Git)", level: 92, note: "GitHub Actions, Vercel Edge, Production Go-Live" },
        { name: "Digital Signatures & Security Compliance", level: 88, note: "Digital Certificate Config & Client Acceptance" },
      ],
    },
  ],

  projects: [
    {
      id: "nam-gia-phat-realestate",
      title: "Nam Gia Phat Commercial Real Estate Portal",
      subtitle: "Enterprise Commercial Real Estate Portal with Multi-Dimensional Filtering",
      category: "Full-Stack & Web",
      featured: true,
      imageUrl: "/namgiaphat.jpg",
      liveUrl: "https://nam-gia-phat-demo.vercel.app/",
      description: "Engineered a high-performance commercial real estate platform on Next.js 15 App Router, React 19, Tailwind CSS, and Ant Design; optimized multi-level category taxonomy for apartments, townhouses, and land lots.",
      problem: "South Saigon real estate brokerages suffered from slow portals (>3s), clunky search filters, and severe mobile layout overflow.",
      solution: "Implemented client-side multi-criteria filtering (<100ms response), strict 430px mobile responsiveness with Zero-CLS, and automated lead capture.",
      impact: [
        "Delivered multi-criteria search filtering with sub-100ms instant responsiveness.",
        "Strict 430px Mobile-First viewport parity with zero layout shifts.",
        "Successful Production launch on Vercel with rapid page load under 1.2s.",
      ],
      metrics: [
        { label: "Mobile Parity", value: "100%" },
        { label: "Page Load Speed", value: "<1.2s" },
        { label: "Filter Latency", value: "Instant" },
      ],
      techStack: ["Next.js 15", "React 19", "Tailwind CSS", "Ant Design", "TypeScript", "Vercel"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "bliss-homestay-automation",
      title: "R&D Phase 1: Bliss Homestay Realtime Messaging Automation",
      subtitle: "ManyChat Webhook Ingress & Make.com Automation Workflow",
      category: "Backend & Databases",
      featured: true,
      description: "Researched and built Phase 1 automated guest messaging integrating real-time ManyChat Webhooks and Make.com scenarios, extracting and processing JSON payloads.",
      problem: "Bliss Homestay handled high chat volumes across disjoint channels, suffering response lags and high booking abandonment.",
      solution: "Engineered automated intent classification, room availability dispatch, and instant pricing quotes (<2s latency), cutting wait times by 80% and eliminating missed leads.",
      impact: [
        "Sub-2-second automated guest response time.",
        "80% reduction in customer inquiry waiting duration.",
        "Zero missed booking inquiries during peak seasonal surges.",
      ],
      metrics: [
        { label: "Response Latency", value: "<2s" },
        { label: "Wait Reduction", value: "-80%" },
        { label: "Missed Inquiries", value: "0%" },
      ],
      techStack: ["ManyChat", "Webhook Ingress", "Make.com", "JSON REST API", "Workflow Automation"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "ai-career-engine",
      title: "AI Job Fit Analysis Engine & Personal Portfolio",
      subtitle: "Realtime Job Match Engine with JD Keyword Extraction & Edge Network",
      category: "Full-Stack & Web",
      featured: true,
      liveUrl: "https://pofolio-b3w9.vercel.app/",
      description: "Engineered a Production-grade personal portfolio deployed on Vercel Edge Network using Next.js 15 App Router, React 19, and Tailwind CSS; built with strict Mobile-First zero-overflow standards.",
      problem: "Recruiters need an interactive, verifiable tool to cross-reference candidate skills against Job Descriptions (JD) in real time.",
      solution: "Developed career recommendation engine (careerEngine.ts): extracts JD keywords, matches technical competencies, and computes weighted match scores dynamically.",
      impact: [
        "Accurate real-time JD keyword parsing and weighted skill matching.",
        "Zero Cumulative Layout Shift (CLS = 0) across all mobile viewports.",
        "High-performance global deployment on Vercel Edge Network.",
      ],
      metrics: [
        { label: "JD Fit Analysis", value: "Realtime" },
        { label: "CLS Metric", value: "0" },
        { label: "Edge Delivery", value: "100%" },
      ],
      techStack: ["Next.js 15", "React 19", "Tailwind CSS", "TypeScript", "Vercel Edge", "Career Engine"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "luklak-cinematic-web",
      title: "Multi-Page Corporate Platform & Cinematic Motion (Luklak)",
      subtitle: "Enterprise Responsive Website with Lenis Smooth Scroll 60 FPS & Spring Physics",
      category: "Full-Stack & Web",
      featured: true,
      imageUrl: "/luklak.jpg",
      description: "Engineered a complete 7-page brand platform with 17 modular components, translating Figma specifications to pixel-perfect Next.js/Tailwind CSS.",
      problem: "Brand agency demanded a high-end Swiss aesthetic with 60 FPS buttery smooth scrolling across both desktop and mobile viewports.",
      solution: "Integrated Lenis cinematic scroll with Framer Motion spring physics and parallax video. Directly deployed Linux VPS, configured Nginx reverse proxy and Let's Encrypt SSL.",
      impact: [
        "Delivered 7 SEO-optimized pages and 17 reusable components.",
        "Maintained stable 60 FPS cinematic scroll without stutter on any device.",
        "Hardened production Linux VPS with SSL encryption and HTTP caching.",
      ],
      metrics: [
        { label: "Pages Built", value: "7 Pages" },
        { label: "Components", value: "17+" },
        { label: "Frame Rate", value: "60 FPS" },
      ],
      techStack: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Lenis", "Figma", "VPS Linux", "SSL/Nginx"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "powertech-high-performance",
      title: "Solar Energy Website Modernization & Core Web Vitals (PowerTech)",
      subtitle: "Next.js 15 App Router Migration, Zero-CLS & PageSpeed 96/100",
      category: "Full-Stack & Web",
      featured: true,
      imageUrl: "/powertech.png",
      liveUrl: "https://powertech.vn",
      description: "Modernized solar enterprise web platform from legacy WordPress (CLS 0.38, 4s+ load time) to isolated Next.js 15 App Router architecture.",
      problem: "Legacy WordPress platform took >4s to load, suffered extreme layout shifts (CLS 0.38), and drove mobile bounce rates up to 58%.",
      solution: "Redesigned with Next.js 15 App Router; eliminated FOIT/FOUT, implemented JSON-LD structured data for On-Page SEO, and fine-tuned edge caching.",
      impact: [
        "Surged Google PageSpeed Mobile score from 42 to 96/100.",
        "Completely eliminated visual layout shifts with strict CLS = 0.",
        "Plummeted corporate bounce rate from 58% down to 21%.",
      ],
      metrics: [
        { label: "Mobile PageSpeed", value: "96/100" },
        { label: "CLS Metric", value: "0" },
        { label: "Bounce Reduction", value: "-37%" },
      ],
      techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Core Web Vitals", "WordPress Migration", "SEO Technical"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "fpt-civil-judgment-suite",
      title: "Civil Judgment Enforcement Enterprise System Deployment (FPT IS)",
      subtitle: "Government Enterprise System Deployment, UAT Testing & End-User Training",
      category: "BA Analysis & Enterprise",
      featured: true,
      imageUrl: "/tha1.jpg",
      images: ["/tha1.jpg", "/tha2.jpg"],
      description: "Flagship government digital transformation project at FPT IS. Served as Implementation Team Lead: coordinated go-live, conducted user training, and led acceptance testing.",
      problem: "Complex legal workflows and massive judicial datasets required careful transition from manual paperwork to enterprise digital records for public servants.",
      solution: "Conducted 15 live training sessions for 230+ judicial officers; triaged and resolved 60+ business/UI defects with Dev teams; configured software and digital certificates.",
      impact: [
        "Successfully trained 230+ judicial officers to command the digital platform.",
        "Triaged, debugged, and resolved 60+ critical API and UI defects.",
        "Signed 100% on-time project handover and client acceptance protocols.",
      ],
      metrics: [
        { label: "Officers Trained", value: "230+" },
        { label: "Training Sessions", value: "15 Sessions" },
        { label: "Bugs/CR Resolved", value: "60+" },
      ],
      techStack: ["FPT IS Platform", "UAT Testing", "Jira", "Digital Certificates", "UltraViewer", "SOP Manual"],
    },
    {
      id: "ecommerce-redis-flashsale",
      title: "E-Commerce & Online Ordering System (Realtime Flash Sale)",
      subtitle: "E-Commerce Platform with Redis High-Concurrency Cache & Shipping Integration",
      category: "Backend & Databases",
      featured: false,
      description: "Full-featured e-commerce platform with shopping carts, online checkout, real-time Flash Sale lock mechanisms, and automated shipping fee calculations.",
      problem: "Flash sale traffic spikes caused database read contention and stock overselling (Race Conditions).",
      solution: "Employed Redis in-memory cache for real-time inventory atomic locks; integrated third-party GHTK logistics API for automated geographic rate calculation.",
      impact: [
        "Sub-50ms instant flash sale response latency powered by Redis caching.",
        "Seamless GHTK logistics integration from order placement to bill creation.",
        "High-confidence full system test coverage and verified fault tolerance.",
      ],
      metrics: [
        { label: "Flash Sale Latency", value: "<50ms" },
        { label: "GHTK Integration", value: "100%" },
        { label: "System Testing", value: "Passed" },
      ],
      techStack: ["Node.js", "Express.js", "MongoDB", "Redis", "JWT Auth", "GHTK API", "Postman"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "food-ordering-rbac-net",
      title: "Role-Based Access Control Food Ordering Platform (RBAC)",
      subtitle: "Online Food Ordering Platform with ASP.NET Core & Partial Views Optimization",
      category: "Full-Stack & Web",
      featured: false,
      description: "Food ordering application featuring multi-role access control (Customers, Restaurant Managers, Admins) built on modern .NET architecture.",
      problem: "Monolithic UI codebases became cumbersome to maintain as food menus and administrative dashboards expanded.",
      solution: "Modularized Frontend architecture using independent Partial Views and ViewComponents; secured routes using ASP.NET Core Identity RBAC.",
      impact: [
        "Cut UI maintenance and refactoring overhead by 30%.",
        "Strict role-based isolation between administrative portals and customer checkouts.",
      ],
      metrics: [
        { label: "Maintenance Time", value: "-30%" },
        { label: "RBAC Security", value: "100%" },
      ],
      techStack: ["C#", "ASP.NET Core", "Identity", "MS SQL Server", "Entity Framework Core"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "car-maintenance-system",
      title: "Vehicle Fleet Maintenance & Repair Lifecycle Management",
      subtitle: "Vehicle Maintenance & Repair History System with Enterprise UML Design",
      category: "BA Analysis & Enterprise",
      featured: false,
      description: "Vehicle lifecycle tracking system monitoring scheduled maintenance, parts replacement history, and total operating expenditure accounting.",
      problem: "Lack of standardized tracking resulted in missed service milestones and unexpected emergency repair expenses.",
      solution: "Conducted deep BA elicitation, drafted formal UML Use Case, Activity, and Sequence diagrams; built relational SQL Server schema.",
      impact: [
        "100% standardized UML documentation prior to software implementation.",
        "Accurate replacement part tracking with automated inspection alerts.",
      ],
      metrics: [
        { label: "UML Standard Parity", value: "100%" },
        { label: "Cost Savings", value: "Measured" },
      ],
      techStack: ["ASP.NET Core MVC", "MS SQL Server", "Draw.io", "UML Diagrams"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "odoo-sales-workflow",
      title: "Enterprise Sales & Cashier Workflow Digitization (Odoo ERP)",
      subtitle: "Internal Sales Order Management & Cashier Workflow Optimization",
      category: "BA Analysis & Enterprise",
      featured: false,
      description: "Designed and digitized end-to-end sales workflows from order creation and promotional discounts to internal POS checkout.",
      problem: "Discrepancies between front-counter orders and warehouse stock caused end-of-day revenue reconciliation bottlenecks.",
      solution: "Modeled Data Flow Diagrams (DFD) and developed internal tools directly interfaced with the Odoo ERP ecosystem.",
      impact: [
        "Accelerated cashier transaction throughput time.",
        "Real-time data synchronization between sales and warehouse inventories.",
      ],
      metrics: [
        { label: "Warehouse Sync", value: "Realtime" },
        { label: "Data Accuracy", value: "100%" },
      ],
      techStack: ["Odoo ERP", "Python", "Business Process Modeling", "System Testing"],
      githubUrl: "https://github.com/Kteenguyen",
    },
  ],

  experience: [
    {
      id: "powertech",
      role: "Full-Stack Web Architect & Performance Engineer (Next.js 15)",
      company: "Powertech Saigon Energy JSC (PowerTech)",
      website: "https://powertech.vn",
      period: "07/2026 – Present",
      yearBadge: "07/2026 – Present",
      location: "Ho Chi Minh City, Vietnam",
      type: "Enterprise",
      description: "Engineered Version 2 UI/UX for solar industrial enterprise, elevated corporate branding, and built a flexible headless CMS.",
      achievements: [
        "Architected Version 2 UI/UX for solar industrial firm, elevating brand authority and user engagement.",
        "Designed and tuned administrative CMS, enabling rapid data configuration and agile content deployment.",
        "Built responsive Careers portal and dynamic lead capture modules dispatching applications to CMS.",
        "Engineered and patched dynamic rendering pipelines with safe fallback handling for AI-generated content.",
        "Conducted meticulous manual QA testing across every interactive button, user flow, and responsive breakpoint.",
        "Finalized packaging, acceptance testing, and direct production handover to operational stakeholders.",
      ],
      skills: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Admin CMS", "Dynamic Rendering", "Manual Testing"],
      metrics: [
        { label: "UI/UX System", value: "Version 2" },
        { label: "Admin CMS", value: "Live" },
        { label: "Acceptance QA", value: "100%" },
      ],
    },
    {
      id: "luklak-freelance",
      role: "Front-End Engineer & UI Architect (Freelance)",
      company: "Luklak Creative Agency Client Platform",
      period: "05/2026",
      yearBadge: "05/2026",
      location: "Ho Chi Minh City, Vietnam",
      type: "Freelance",
      description: "Designed and implemented 7 responsive pages and 17 modular components, transforming Figma specifications into clean Next.js/Tailwind CSS.",
      achievements: [
        "Implemented 7 responsive brand pages and 17 modular components from Figma specs into Next.js/Tailwind CSS.",
        "Integrated 60 FPS Cinematic Scroll with Lenis and Framer Motion spring dynamics for seamless navigation.",
      ],
      skills: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Lenis Smooth Scroll", "Figma to Code", "UI/UX Front-End"],
      metrics: [
        { label: "Pages Built", value: "7 Pages" },
        { label: "Components", value: "17+" },
        { label: "Scroll FPS", value: "60 FPS" },
      ],
    },
    {
      id: "homenest-software",
      role: "Business Analyst Intern (BA)",
      company: "HomeNest Software Solutions Co., Ltd",
      period: "03/2026 – 06/2026",
      yearBadge: "03/2026 – 06/2026",
      location: "Ho Chi Minh City, Vietnam",
      type: "Enterprise Internship",
      description: "Completed corporate software internship at HomeNest as a Business Analyst. Elicited client digitization requirements via Google Meet; drafted Use Case and Activity diagrams alongside Software Requirement Specifications (SRS).",
      achievements: [
        "Conducted client requirement discovery sessions via Google Meet; modeled workflows into Use Case/Activity diagrams and SRS specifications.",
        "Acted as business liaison between stakeholders and development teams, clarifying feature logic and conducting UAT.",
        "Proposed design system alignment workshops and established delivery roadmaps adhering to Agile/Scrum sprints.",
        "Collaborated across engineering, UI/UX, and graphic design departments while maintaining continuous sprint reporting.",
      ],
      skills: ["Business Analysis (BA)", "Requirement Discovery", "Use Case & Activity UML", "SRS Documentation", "Agile / Scrum", "Figma Wireframing", "UAT Testing"],
      metrics: [
        { label: "Internship Period", value: "03–06/2026" },
        { label: "SRS & UML", value: "Standardized" },
        { label: "Process Model", value: "Agile/Scrum" },
      ],
    },
    {
      id: "namgiaphat-realestate",
      role: "Front-End Engineer & Mobile UX Lead (Freelance)",
      company: "Nam Gia Phat Investment & Real Estate JSC",
      period: "02/2026 – 04/2026",
      yearBadge: "02/2026 – 04/2026",
      location: "Ho Chi Minh City, Vietnam",
      type: "Freelance",
      description: "Engineered commercial real estate portal with Next.js 15 App Router, React 19, Tailwind CSS, and Ant Design; structured property taxonomies across South Saigon.",
      achievements: [
        "Engineered multi-criteria property search filters (price, area, location) with sub-100ms response time.",
        "Implemented strict 430px Mobile-First design guaranteeing zero overflow (CLS = 0) and smooth gestures.",
        "Integrated automated lead generation forms forwarding client inquiries directly to CRM storage.",
        "Deployed to Production on Vercel with page load speeds under 1.2 seconds.",
      ],
      skills: ["Next.js 15", "React 19", "Tailwind CSS", "Ant Design", "TypeScript", "Mobile-First 430px", "Vercel"],
      metrics: [
        { label: "Filter Latency", value: "<100ms" },
        { label: "Mobile Parity", value: "100%" },
        { label: "Page Load Speed", value: "<1.2s" },
      ],
    },
    {
      id: "fpt-is",
      role: "Software Implementation Team Lead",
      company: "FPT Information System Co., Ltd (FPT IS)",
      period: "10/2025 – 02/2026",
      yearBadge: "10/2025 – 02/2026",
      location: "Hanoi – Dong Thap, Vietnam",
      type: "Enterprise",
      imageUrl: "/tha1.jpg",
      images: ["/tha1.jpg", "/tha2.jpg"],
      description: "Key digital transformation rollout for Civil Judgment Enforcement agencies; coordinated software implementation, field UAT, and production go-live.",
      achievements: [
        "Spearheaded software rollout for judicial civil enforcement agency, overseeing UAT and production go-live.",
        "Conducted 15 hands-on training workshops for over 230 officers, successfully transitioning manual dossiers to digital records.",
        "Partnered with Back-End engineering to identify API and UI discrepancies, triaging and closing 60+ bugs and change requests.",
        "Configured software instances and digital signature certificates remotely via UltraViewer, securing project handover on schedule.",
      ],
      skills: ["FPT IS Platform", "UAT Testing", "Digital Signatures", "UltraViewer", "User Training", "Jira Defect Tracking"],
      metrics: [
        { label: "Officers Trained", value: "230+" },
        { label: "Training Sessions", value: "15 Sessions" },
        { label: "Defects Resolved", value: "60+" },
      ],
    },
    {
      id: "tdtu-engineering",
      role: "Bachelor of Software Engineering Graduate (TDTU)",
      company: "Ton Duc Thang University (TDTU)",
      period: "2021 – 2026",
      yearBadge: "2021 – 2026",
      location: "Ho Chi Minh City, Vietnam",
      type: "Academic Degree",
      isEducation: true,
      description: "Full-time Bachelor of Software Engineering program at Ton Duc Thang University. Graduated with GPA 3.0 / 4.0 and outstanding scores in core computing coursework.",
      achievements: [
        "Core specialized coursework scores: Distributed Node.js (8.3/10.0), UI/UX Interface Design (8.3/10.0), Software Requirements Analysis & Design BA (8.1/10.0), Enterprise Systems Management (7.3/10.0).",
        "Completed 150+ academic credits: Data Structures & Algorithms, Computer Networks, 3NF Relational DBMS, Distributed Software Architecture, and Software Quality Assurance (QA/QC).",
        "Balanced dual competency: Solid foundation in Front-End and Back-End engineering combined with real-world business analysis acumen.",
      ],
      skills: ["Distributed Node.js (8.3)", "UI/UX Design (8.3)", "BA Analysis (8.1)", "Enterprise Systems (7.3)", "Data Structures", "3NF DBMS", "QA/QC"],
      metrics: [
        { label: "Graduation GPA", value: "3.0 / 4.0" },
        { label: "Completed Credits", value: "150+ Credits" },
        { label: "Node.js & UI/UX Score", value: "8.3 / 10.0" },
      ],
    },
  ],

  education: [
    {
      id: "tdtu-degree",
      degree: "Bachelor of Software Engineering",
      institution: "Ton Duc Thang University (TDTU)",
      period: "2021 – 2026",
      duration: "5-Year Full-Time Bachelor Program (2021 – 2026)",
      grade: "GPA: 3.0 / 4.0 (Bachelor of Software Engineering)",
      coursework: [
        { name: "Distributed Node.js Programming", score: "8.3 / 10.0" },
        { name: "UI/UX Interface Design", score: "8.3 / 10.0" },
        { name: "Software Requirements Analysis & Design (BA)", score: "8.1 / 10.0" },
        { name: "Enterprise Systems Management", score: "7.3 / 10.0" },
      ],
      highlights: [
        "Completed 150+ academic credits: Data Structures & Algorithms, Computer Networks, Relational DBMS, Distributed Software Architecture, and Quality Assurance (QA/QC).",
        "Dual technical strength: Mastering Front-End and Back-End development paired with practical business requirement analysis.",
        "Independent technical research capability, rapidly commanding emerging frameworks to solve real-world user challenges.",
      ],
    },
  ],

  certifications: [
    {
      name: "English Proficiency: Aptis ESOL B1 (136/200)",
      issuer: "British Council (Professional technical documentation & communication)",
      year: "2025",
    },
    {
      name: "Professional Software Implementation & Acceptance Certification",
      issuer: "FPT Information System Co., Ltd (FPT IS)",
      year: "2026",
    },
    {
      name: "Distributed Node.js Programming & Architecture (Score: 8.3/10.0)",
      issuer: "Ton Duc Thang University (Academic Certification)",
      year: "2024",
    },
    {
      name: "UI/UX User Interface Design (Score: 8.3/10.0)",
      issuer: "Ton Duc Thang University (Excellence UI/UX Project)",
      year: "2024",
    },
  ],
};

// ==============================================================================
// 3. TỪ ĐIỂN UI DÀNH CHO CÁC COMPONENT (BILINGUAL UI TRANSLATIONS)
// ==============================================================================
export const uiTranslations: Record<"vi" | "en", Record<string, string>> = {
  vi: {
    // Navigation
    "nav.overview": "Tổng Quan",
    "nav.education": "Học Vấn",
    "nav.experience": "Kinh Nghiệm",
    "nav.projects": "Dự Án",
    "nav.skills": "Kỹ Năng",
    "nav.contact": "Liên Hệ",

    // Common CTAs & Buttons
    "cta.interview": "Mời Phỏng Vấn",
    "cta.interview_form_15s": "Mời Phỏng Vấn (Form 15 Giây)",
    "cta.download_cv": "Tải CV",
    "cta.download_cv_pdf": "Tải Hồ Sơ CV (PDF)",
    "cta.download_cv_pdf_4versions": "Tải Hồ Sơ CV (PDF 4 Phiên Bản)",
    "cta.leave_phone": "Để Lại Số",
    "cta.leave_phone_hotline": "Để Lại Số Liên Lạc (Hotline: 0852.723.945)",
    "cta.explore_projects": "Khám Phá Kho Dự Án",
    "cta.view_cv": "Xem CV",
    "cta.contact_now": "Liên Hệ",
    "cta.view_experience_details": "Xem Chi Tiết Kinh Nghiệm FPT và Luklak →",
    "cta.back_to_top": "Lên đầu trang",

    // Language Selector
    "lang.select_title": "Chọn Ngôn Ngữ / Language",
    "lang.vietnamese": "Tiếng Việt",
    "lang.english": "English",
    "lang.badge_vi": "VI",
    "lang.badge_en": "EN",

    // Hero Section
    "hero.badge_engineer": "Cử Nhân Kỹ Thuật Phần Mềm",
    "hero.badge_university": "ĐH Tôn Đức Thắng (GPA 3.0)",
    "hero.headline_prefix": "Nền tảng Kỹ thuật bài bản,",
    "hero.headline_highlight": "Kiến tạo giải pháp phần mềm thực chiến.",
    "hero.cred_university": "ĐH Tôn Đức Thắng (GPA 3.0)",
    "hero.cred_powertech": "PowerTech Next.js 15 (PageSpeed 96)",
    "hero.cred_fpt": "FPT IS (10/25–02/26 • 230+ Cán Bộ)",
    "hero.cred_homenest": "HomeNest BA (03–06/2026)",
    "hero.chip_experience": "Line Kinh Nghiệm",
    "hero.chip_projects": "Kho Dự Án",
    "hero.chip_education": "Học Vấn 5 Năm",
    "hero.chip_contact": "Liên Hệ",
    "hero.card_education_dept": "Khoa CNTT • ĐH Tôn Đức Thắng",
    "hero.card_education_years": "Năm học 2021 – 2026",
    "hero.card_education_badge": "Cử Nhân KTPM",
    "hero.card_freelance_dept": "Kinh Nghiệm Triển Khai Thực Tế",
    "hero.card_freelance_count": "5+ Dự Án Freelance Thực Chiến",
    "hero.card_freelance_badge": "Thực Chiến",

    // About Section
    "about.tag": "// VỀ TÔI VÀ TƯ DUY NGHỀ NGHIỆP",
    "about.heading": "Nền Tảng 5 Năm Học Thuật và Bản Lĩnh Thực Địa",
    "about.lead": "Hành trình 5 năm đại học tại ĐH Tôn Đức Thắng đã rèn luyện cho tôi tư duy giải quyết vấn đề bằng kiến trúc khoa học máy tính chuẩn mực, kết hợp cùng trải nghiệm trực tiếp làm việc với hơn 230 người dùng cuối tại FPT IS.",
    "about.proven_evidence": "Năng lực thực tế có chứng cứ",
    "about.commitment_title": "Cam kết chất lượng: Code chuẩn, Thấu hiểu nghiệp vụ và Triển khai bền bỉ",
    "about.commitment_desc": "Được chứng thực qua kết quả nghiệm thu thành công hệ thống Thi Hành Án Dân Sự tại FPT IS và sản phẩm thương hiệu Luklak với 7 trang web responsive hoàn hảo.",

    // Education Section
    "education.tag": "// HỌC THUẬT VÀ NỀN TẢNG ĐÀO TẠO 5 NĂM",
    "education.heading": "Chương Trình Đào Tạo Kỹ Sư Tại ĐH Tôn Đức Thắng",
    "education.lead": "Hành trình 5 năm toàn thời gian (2021 – 2026) trang bị tư duy toán học, thuật toán sâu sắc và năng lực làm chủ công nghệ từ tầng gốc rễ.",
    "education.scores_title": "// ĐIỂM SỐ CÁC MÔN CHUYÊN NGÀNH CỐT LÕI (BẢNG ĐIỂM CHỨNG THỰC):",
    "education.highlights_title": "// ĐẶC THÙ CHƯƠNG TRÌNH VÀ KẾT QUẢ ĐÀO TẠO:",
    "education.certs_title": "Chứng Nhận Năng Lực và Đồ Án Kỹ Thuật:",

    // Experience Section
    "exp.tag": "// BẢN ĐỒ KINH NGHIỆM THỰC CHIẾN MASTER CV",
    "exp.heading": "Hành Trình Kỹ Sư và Kinh Nghiệm Triển Khai",
    "exp.lead": "Đồng bộ hóa 100% từ hồ sơ CV Master: Hành trình phát triển thực chiến từ nền tảng Kỹ sư 5 năm ĐH Tôn Đức Thắng đến các hệ thống chuyển đổi số doanh nghiệp, triển khai UAT thực tế và đào tạo 230+ cán bộ.",
    "exp.view_grid": "Lưới 3 Cột",
    "exp.view_timeline": "Dòng Thời Gian",
    "exp.filter_all": "Tất cả",
    "exp.filter_enterprise": "Doanh nghiệp",
    "exp.filter_education": "Học vấn",
    "exp.order_label": "Thứ tự:",
    "exp.order_asc": "2021 → Nay",
    "exp.order_desc": "Nay → 2021",
    "exp.tracker_title": "Thanh Line Tiến Trình Kinh Nghiệm (Chronological Milestone Tracker)",
    "exp.tracker_hint": "Nhấp mốc để chuyển tới chi tiết thẻ",
    "exp.field_evidence": "Minh Chứng Hiện Trường",
    "exp.photos_count": "Ảnh",
    "exp.achievements_title": "// KẾT QUẢ VÀ ĐÓNG GÓP THỰC TẾ:",
    "exp.skills_title": "// KỸ NĂNG VÀ CÔNG NGHỆ ỨNG DỤNG:",

    // Projects Section
    "projects.tag": "// DANH MỤC KHO DỰ ÁN THỰC CHIẾN VÀ NGHIỆP VỤ",
    "projects.heading": "Kho Dự Án Kỹ Thuật Đã Triển Khai",
    "projects.lead": "Tất cả dự án được chuẩn hóa theo mô hình CAR (Bối cảnh -> Giải pháp -> Kết quả) với kiến trúc kỹ thuật thực chiến.",
    "projects.filter_all": "Tất cả",
    "projects.live_demo": "Live Demo",
    "projects.github_code": "Mã Nguồn GitHub",
    "projects.details": "Xem Chi Tiết CAR",
    "projects.tech_stack": "Công nghệ:",

    // Skills Section
    "skills.tag": "// NĂNG LỰC KỸ THUẬT VÀ NGHIỆP VỤ",
    "skills.heading": "Khung Công Nghệ và Kỹ Năng Chuyên Môn",
    "skills.lead": "Sự phối hợp toàn diện giữa kỹ năng lập trình Full-Stack (React/Next.js, Node.js, C#), tư duy phân tích nghiệp vụ BA và năng lực triển khai thực tế.",

    // Contact Section
    "contact.tag": "// THÔNG TIN LIÊN HỆ & GỬI LỜI MỜI",
    "contact.heading": "Kết Nối Tuyển Dụng & Hợp Tác Kỹ Thuật",
    "contact.lead": "Tôi luôn sẵn sàng đón nhận cơ hội việc làm Cử nhân Kỹ thuật Phần mềm / Full-Stack Engineer / AI Agentic Engineer tại các doanh nghiệp công nghệ.",
    "contact.form_name": "Họ và tên của Quý vị",
    "contact.form_email": "Địa chỉ Email",
    "contact.form_phone": "Số điện thoại liên lạc",
    "contact.form_message": "Lời nhắn hoặc mô tả công việc (JD)",
    "contact.form_submit": "Gửi Lời Mời Ngay",
    "contact.form_submitting": "Đang gửi thông tin...",
    "contact.form_success": "Đã gửi thông tin thành công! Tôi sẽ phản hồi Quý vị trong thời gian sớm nhất.",

    // Footer
    "footer.engineer": "Kỹ Sư Thực Chiến",
    "footer.rights": "Bản quyền thuộc về",
  },

  en: {
    // Navigation
    "nav.overview": "Overview",
    "nav.education": "Education",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    // Common CTAs & Buttons
    "cta.interview": "Interview Invite",
    "cta.interview_form_15s": "Interview Invite (15-Sec Form)",
    "cta.download_cv": "Resume PDF",
    "cta.download_cv_pdf": "Download Resume (PDF)",
    "cta.download_cv_pdf_4versions": "Download Resume (PDF 4 Editions)",
    "cta.leave_phone": "Leave Contact",
    "cta.leave_phone_hotline": "Leave Contact Info (Hotline: 0852.723.945)",
    "cta.explore_projects": "Explore Projects",
    "cta.view_cv": "View Resume",
    "cta.contact_now": "Contact",
    "cta.view_experience_details": "View FPT & Luklak Details →",
    "cta.back_to_top": "Back to top",

    // Language Selector
    "lang.select_title": "Choose Language",
    "lang.vietnamese": "Tiếng Việt",
    "lang.english": "English",
    "lang.badge_vi": "VI",
    "lang.badge_en": "EN",

    // Hero Section
    "hero.badge_engineer": "Software Engineering Bachelor",
    "hero.badge_university": "Ton Duc Thang Univ (GPA 3.0)",
    "hero.headline_prefix": "Rigorous Engineering Foundation,",
    "hero.headline_highlight": "Crafting Battle-Tested Digital Solutions.",
    "hero.cred_university": "Ton Duc Thang Univ (GPA 3.0)",
    "hero.cred_powertech": "PowerTech Next.js 15 (PageSpeed 96)",
    "hero.cred_fpt": "FPT IS (10/25–02/26 • 230+ Officers)",
    "hero.cred_homenest": "HomeNest BA (03–06/2026)",
    "hero.chip_experience": "Experience Line",
    "hero.chip_projects": "Projects Vault",
    "hero.chip_education": "5-Year Degree",
    "hero.chip_contact": "Contact",
    "hero.card_education_dept": "Faculty of IT • Ton Duc Thang Univ",
    "hero.card_education_years": "Academic Years 2021 – 2026",
    "hero.card_education_badge": "SE Bachelor",
    "hero.card_freelance_dept": "Field Implementation Experience",
    "hero.card_freelance_count": "5+ Production Freelance Projects",
    "hero.card_freelance_badge": "Battle-Tested",

    // About Section
    "about.tag": "// ABOUT ME & ENGINEERING PHILOSOPHY",
    "about.heading": "5-Year Academic Foundation & Battle-Tested Field Acumen",
    "about.lead": "A 5-year curriculum at Ton Duc Thang University cultivated rigorous computer science architectural thinking, compounded with direct field delivery for over 230 enterprise users at FPT IS.",
    "about.proven_evidence": "Verifiable Empirical Evidence",
    "about.commitment_title": "Quality Commitment: Clean Code, Domain Mastery & Resilient Delivery",
    "about.commitment_desc": "Proven through successful production go-live of the Civil Enforcement Suite at FPT IS and Luklak's 7-page responsive brand platform.",

    // Education Section
    "education.tag": "// 5-YEAR ACADEMIC RIGOR & DEGREE",
    "education.heading": "Software Engineering Degree at Ton Duc Thang University",
    "education.lead": "A 5-year full-time curriculum (2021 – 2026) cultivating deep algorithm thinking and bottom-up technology mastery.",
    "education.scores_title": "// CORE MAJOR COURSEWORK SCORES (VERIFIED TRANSCRIPT):",
    "education.highlights_title": "// PROGRAM HIGHLIGHTS & DEGREE OUTCOMES:",
    "education.certs_title": "Technical Certifications & Capstone Projects:",

    // Experience Section
    "exp.tag": "// MASTER CV BATTLE-TESTED CAREER MAP",
    "exp.heading": "Engineering Journey & Implementation Track Record",
    "exp.lead": "100% synchronized with Master CV: Evolution from 5-year Software Engineering training to enterprise digital transformation, UAT QA testing, and training 230+ officers.",
    "exp.view_grid": "3-Col Grid",
    "exp.view_timeline": "Timeline View",
    "exp.filter_all": "All",
    "exp.filter_enterprise": "Enterprise",
    "exp.filter_education": "Education",
    "exp.order_label": "Order:",
    "exp.order_asc": "2021 → Present",
    "exp.order_desc": "Present → 2021",
    "exp.tracker_title": "Chronological Milestone Tracker Line",
    "exp.tracker_hint": "Click milestone to jump to details",
    "exp.field_evidence": "Field Evidence",
    "exp.photos_count": "Photos",
    "exp.achievements_title": "// DELIVERABLES & MEASURABLE IMPACT:",
    "exp.skills_title": "// APPLIED TECH STACK & METHODOLOGY:",

    // Projects Section
    "projects.tag": "// PRODUCTION & ENTERPRISE PROJECT VAULT",
    "projects.heading": "Deployed Technical Project Portfolio",
    "projects.lead": "All projects strictly adhere to the CAR framework (Context -> Action -> Result) with real-world technical architecture.",
    "projects.filter_all": "All",
    "projects.live_demo": "Live Demo",
    "projects.github_code": "GitHub Source",
    "projects.details": "View CAR Details",
    "projects.tech_stack": "Tech Stack:",

    // Skills Section
    "skills.tag": "// TECHNICAL MASTERY & DOMAIN ACUMEN",
    "skills.heading": "Core Engineering Framework & Competencies",
    "skills.lead": "Comprehensive synergy across Full-Stack coding (React/Next.js, Node.js, C#), Business Analysis (BA) discovery, and production rollout.",

    // Contact Section
    "contact.tag": "// CONTACT INFORMATION & INQUIRY",
    "contact.heading": "Talent Acquisition & Technical Collaboration",
    "contact.lead": "Open for Software Engineer / Full-Stack Engineer / AI Agentic Engineer opportunities across progressive tech enterprises.",
    "contact.form_name": "Your Full Name",
    "contact.form_email": "Your Business Email",
    "contact.form_phone": "Phone Number",
    "contact.form_message": "Message or Job Description (JD)",
    "contact.form_submit": "Submit Inquiry",
    "contact.form_submitting": "Transmitting details...",
    "contact.form_success": "Information received successfully! I will get back to you promptly.",

    // Footer
    "footer.engineer": "Battle-Tested Engineer",
    "footer.rights": "All rights reserved by",
  },
};

// Default export
export const portfolioData = portfolioDataVi;

export type PortfolioData = PortfolioDataStructure;

export function getPortfolioData(locale: "vi" | "en"): PortfolioDataStructure {
  return locale === "en" ? portfolioDataEn : portfolioDataVi;
}
