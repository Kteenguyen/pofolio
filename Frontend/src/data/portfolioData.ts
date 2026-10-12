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
  yearBadge: string;
  location: string;
  type: "Doanh Nghiệp" | "Freelance" | "Dự Án Cộng Đồng" | "Học Thuật & Đào Tạo" | "Thực Tập Doanh Nghiệp" | "Học Vấn Kỹ Sư";
  website?: string;
  description: string;
  achievements: string[];
  skills: string[];
  metrics?: { label: string; value: string }[];
  isEducation?: boolean;
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
    title: "Kỹ Sư Phần Mềm (Web/App) | Định Hướng Fullstack AI Agent Workflow",
    degreeLabel: "Kỹ Sư CNTT (5 Năm Đào Tạo Chuẩn Mực) • ĐH Tôn Đức Thắng (GPA: 3.0 / 4.0)",
    headline: "Giao thoa giữa kiến trúc hệ thống dữ liệu chịu tải cao, trải nghiệm Front-End điện ảnh chuẩn Thụy Sĩ và tư duy cầu nối phân tích số hóa thực tế.",
    bio: "Kỹ sư CNTT tốt nghiệp chương trình đào tạo 5 năm tại Đại học Tôn Đức Thắng (GPA: 3.0 / 4.0), sở hữu kinh nghiệm thực tập doanh nghiệp (FPT IS, HomeNest 2 Tháng) cùng năng lực triển khai các dự án Web/App thực tế. Tinh thần tự giác, ham học hỏi cao, liên tục trau dồi công nghệ mới và định hướng phát triển chuyên sâu mảng AI Agent Workflow.",
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
    statusText: "Sẵn sàng đón nhận cơ hội Kỹ Sư Phần Mềm / AI Agentic Engineer",
  },

  stats: [
    { label: "Cán bộ số hóa tại FPT IS", value: "230+" },
    { label: "Bugs & CR UAT xử lý", value: "60+" },
    { label: "PageSpeed Mobile (CLS = 0)", value: "96/100" },
    { label: "Độ trễ phản hồi Webhook", value: "<2s" },
  ],

  pillars: [
    {
      title: "Kiến Trúc AI Agentic & Fullstack (Modern Systems)",
      description: "Làm chủ Next.js 15 App Router, React 19, TypeScript và giao thức Model Context Protocol (MCP 2.0). Xây dựng luồng tác tử tự trị 4 tầng và tự động hóa kiểm thử đa màn hình.",
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
      category: "AI Agentic & Tự Động Hóa Quy Trình",
      description: "Xây dựng luồng tác tử tự trị, Model Context Protocol và tự động hóa tích hợp",
      skills: [
        { name: "Multi-Agent System & AI Workflows", level: 92, note: "Điều Phối 4 Tầng Tác Tử Tự Trị" },
        { name: "Model Context Protocol (MCP 2.0)", level: 90, note: "JSON-RPC, Tool Calling, Context Management" },
        { name: "Make.com & Webhook Ingress", level: 92, note: "Tự Động Hóa Realtime Phản Hồi <2s" },
        { name: "RAG & LLM Integration", level: 88, note: "OpenAI, Gemini, Anthropic APIs, Hybrid Search" },
        { name: "Autonomous Testing (CDP & Chrome)", level: 90, note: "Kiểm Thử Mobile 430px & Desktop Tự Động" },
      ],
    },
    {
      category: "Front-End & Xây Dựng Web Trọn Gói",
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
      category: "Back-End, CSDL & Tải Cao",
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
      category: "Nghiệp Vụ BA & DevOps Vận Hành",
      description: "Phân tích yêu cầu nghiệp vụ, kiểm thử chất lượng UAT và đưa hệ thống lên Production",
      skills: [
        { name: "Phân Tích Nghiệp Vụ (BA)", level: 92, note: "Khảo Sát Khách Hàng, BRD, SRS, Agile/Scrum" },
        { name: "Mô Hình Hóa Sơ Đồ UML", level: 90, note: "Use Case, Activity, Sequence Diagram" },
        { name: "UAT Testing & Quản Lý Lỗi (Jira)", level: 92, note: "Kiểm Thử Thực Địa & Xử Lý 60+ Bugs FPT IS" },
        { name: "Triển Khai Máy Chủ VPS Linux & Nginx", level: 88, note: "Reverse Proxy, SSL Let\x27s Encrypt, Caching" },
        { name: "CI/CD & Version Control (Git)", level: 92, note: "GitHub Actions, Vercel Edge, Production Go-Live" },
        { name: "Chữ Ký Số & Bảo Mật Doanh Nghiệp", level: 88, note: "Cấu Hình Chứng Thư Số & Nghiệm Thu Khách Hàng" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "ai-agentic-mcp",
      title: "Nền Tảng AI Agentic Tự Trị 4 Tầng & Động Cơ Giao Thức MCP",
      subtitle: "Multi-Agent System with MCP 2.0, JSON-RPC & Autonomous CDP Browser Testing",
      category: "Full-Stack & Web",
      featured: true,
      description: "Thiết kế hệ thống đa tác tử 4 tầng tự trị: Supreme Leader (phân rã yêu cầu), Database Schema Architect (3NF/Supabase), QA Lead (chỉ huy Webhook HMAC, Chaos Simulator 429/502), và DevOps Parity Officer.",
      problem: "Phát triển phần mềm truyền thống tốn nhiều thời gian review thủ công, kiểm thử đa nền tảng và dễ phát sinh lỗi xung đột schema, tràn viền mobile.",
      solution: "Tích hợp máy chủ Model Context Protocol (MCP 2.0) qua JSON-RPC và tự động hóa kiểm thử giao diện qua Chrome DevTools Protocol (CDP) trên Mobile 430px và Desktop; điều phối 4 tầng tác tử độc lập.",
      impact: [
        "Thiết lập thành công mô hình 4 tầng tác tử tự trị phối hợp qua JSON-RPC Protocol.",
        "Cắt giảm 70% thời gian review code và kiểm thử tự động trên Chrome thật.",
        "Tích hợp Supabase 3NF và giả lập Chaos Testing 429/502 chuẩn enterprise.",
      ],
      metrics: [
        { label: "Mô hình tác tử", value: "4 Tầng" },
        { label: "Thời gian review", value: "-70%" },
        { label: "Giao thức", value: "MCP 2.0" },
      ],
      techStack: ["TypeScript", "Next.js 15", "MCP 2.0", "Supabase", "LLMs", "JSON-RPC", "CDP Browser"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "nam-gia-phat-realestate",
      title: "Cổng Bất Động Sản Doanh Nghiệp Nam Gia Phát",
      subtitle: "Enterprise Commercial Real Estate Portal with Multi-Dimensional Filtering",
      category: "Full-Stack & Web",
      featured: true,
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
      id: "ai-career-engine",
      title: "Động Cơ AI Phân Tích Khớp Việc Làm & Portfolio Cá Nhân",
      subtitle: "Realtime Job Match Engine with JD Keyword Extraction & Edge Network",
      category: "Full-Stack & Web",
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
      id: "bliss-homestay-automation",
      title: "Nghiên Cứu Phát Triển (GĐ 1): Tự Động Hóa Tin Nhắn Bliss Homestay",
      subtitle: "Realtime Webhook Ingress & Make.com Automation Workflow",
      category: "Backend & CSDL",
      featured: true,
      description: "Nghiên cứu và phát triển (Giai đoạn 1) quy trình tự động hóa trả lời tin nhắn trên nền tảng Make.com kết hợp Webhook Ingress thời gian thực, bắt trọn và phân giải cấu trúc dữ liệu JSON từ khách hàng.",
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
      techStack: ["Webhook Ingress", "Make.com", "JSON REST API", "Workflow Automation", "Cloud Integrations"],
      githubUrl: "https://github.com/Kteenguyen",
    },
    {
      id: "luklak-cinematic-web",
      title: "Website Doanh Nghiệp Đa Trang & Cinematic Scroll (Luklak)",
      subtitle: "Enterprise Responsive Website with Lenis Smooth Scroll 60 FPS & Spring Physics",
      category: "Full-Stack & Web",
      featured: true,
      description: "Xây dựng hoàn thiện website thương hiệu gồm 7 trang hoàn chỉnh và 17 components, chuyển đổi trực tiếp bản vẽ Figma sang mã nguồn Next.js/Tailwind CSS chuẩn mực.",
      problem: "Doanh nghiệp cần một diện mạo số sang trọng, đẳng cấp nhưng đòi hỏi hiệu năng cuộn phải đạt chuẩn 60fps mượt mà trên cả máy tính lẫn điện thoại.",
      solution: "Tích hợp hiệu ứng cuộn điện ảnh Cinematic Scroll 60 FPS (Lenis Scroll kết hợp Framer Motion parallax video và spring physics). Trực tiếp cấu hình máy chủ VPS Linux, cài đặt Nginx Reverse Proxy, cấp chứng chỉ SSL Let\x27s Encrypt và tối ưu bộ nhớ đệm HTTP Caching.",
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
      title: "Tái Cấu Trúc Website Năng Lượng & Tối Ưu Hiệu Năng (PowerTech)",
      subtitle: "Next.js 15 App Router Migration, Zero-CLS & PageSpeed 96/100",
      category: "Full-Stack & Web",
      featured: true,
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
      category: "Phân Tích BA & Nghiệp Vụ",
      featured: false,
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
      company: "Công Ty Năng Lượng Powertech Sài Gòn (PowerTech)",
      website: "https://powertech.vn",
      period: "07/2026 – Hiện Tại",
      yearBadge: "07/2026 – Hiện Tại",
      location: "TP. Hồ Chí Minh, Việt Nam",
      type: "Doanh Nghiệp",
      description: "Tái cấu trúc website năng lượng từ nền tảng WordPress cũ bị lỗi giật bố cục CLS 0.38 và tải chậm >4s sang kiến trúc Next.js 15 App Router phân tầng độc lập.",
      achievements: [
        "Tối ưu tài nguyên triệt tiêu FOIT/FOUT, điểm Google PageSpeed Mobile tăng từ 42 lên 96/100, triệt tiêu hoàn toàn xê dịch bố cục (CLS = 0).",
        "Thiết kế cấu trúc dữ liệu JSON-LD Schema chuẩn On-Page SEO và tăng tốc tải trang tức thì dưới 1.2s.",
        "Tỷ lệ thoát trang (Bounce Rate) của khách hàng doanh nghiệp giảm mạnh từ 58% xuống 21%.",
      ],
      skills: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Core Web Vitals", "WordPress Migration", "SEO Technical"],
      metrics: [
        { label: "PageSpeed Mobile", value: "96/100" },
        { label: "Chỉ số CLS", value: "0" },
        { label: "Giảm Bounce Rate", value: "-37%" },
      ],
    },
    {
      id: "luklak-freelance",
      role: "Lập Trình Viên Fullstack Web & Kỹ Sư Triển Khai (Freelance)",
      company: "Dự Án Doanh Nghiệp Khách Hàng Luklak",
      period: "05/2026",
      yearBadge: "05/2026",
      location: "TP. Hồ Chí Minh, Việt Nam",
      type: "Freelance",
      description: "Xây dựng hoàn thiện website thương hiệu gồm 7 trang hoàn chỉnh và 17 components, chuyển đổi trực tiếp bản vẽ Figma sang mã nguồn Next.js/Tailwind CSS chuẩn mực.",
      achievements: [
        "Xây dựng hoàn thiện website thương hiệu gồm 7 trang hoàn chỉnh và 17 components, chuyển đổi trực tiếp bản vẽ Figma sang mã nguồn Next.js/Tailwind CSS chuẩn mực.",
        "Tích hợp hiệu ứng cuộn điện ảnh Cinematic Scroll 60 FPS (Lenis Scroll kết hợp Framer Motion parallax video và spring physics).",
        "Trực tiếp cấu hình máy chủ VPS Linux, cài đặt Nginx Reverse Proxy, cấp chứng chỉ SSL Let\x27s Encrypt và tối ưu bộ nhớ đệm HTTP Caching.",
      ],
      skills: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Lenis Smooth Scroll", "Figma", "VPS Linux", "SSL/Nginx"],
      metrics: [
        { label: "Số trang web", value: "7 Trang" },
        { label: "Components", value: "17+" },
        { label: "Khung hình cuộn", value: "60 FPS" },
      ],
    },
    {
      id: "fpt-is",
      role: "Thực Tập Sinh / Trưởng Nhóm Triển Khai Phần Mềm & UAT",
      company: "Công Ty Phần Mềm FPT IS (Hà Nội)",
      period: "12/2025 – 01/2026",
      yearBadge: "12/2025 – 01/2026",
      location: "Hà Nội – TP. Hồ Chí Minh",
      type: "Doanh Nghiệp",
      description: "Tham gia dự án số hóa trọng điểm cho Cơ quan Thi Hành Án Dân Sự; điều phối quy trình triển khai phần mềm, hỗ trợ UAT và go-live hệ thống.",
      achievements: [
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
      id: "homenest-software",
      role: "Thực Tập Sinh Phân Tích Nghiệp Vụ (Business Analyst – BA)",
      company: "Công Ty HomeNest Software",
      period: "2025 (2 Tháng)",
      yearBadge: "2025 (2 Tháng)",
      location: "TP. Hồ Chí Minh, Việt Nam",
      type: "Thực Tập Doanh Nghiệp (2 Tháng)",
      description: "Hoàn thành kỳ thực tập doanh nghiệp 2 tháng với vai trò BA. Khảo sát và thu thập yêu cầu bài toán số hóa của khách hàng thông qua Google Meet; mô hình hóa quy trình nghiệp vụ thông qua sơ đồ Use Case, Activity Diagram và tài liệu đặc tả yêu cầu phần mềm (SRS).",
      achievements: [
        "Hoàn thành trọn vẹn kỳ thực tập doanh nghiệp 2 tháng với đánh giá xuất sắc từ người hướng dẫn và doanh nghiệp.",
        "Đóng vai trò cầu nối nghiệp vụ giữa khách hàng và đội ngũ lập trình, làm rõ logic chức năng và kiểm thử chấp nhận để đảm bảo sản phẩm chuyển giao đúng kỳ vọng.",
        "Đề xuất tạo cuộc họp để triển khai ngôn ngữ thiết kế; thiết lập Timeline tiến độ công việc theo chuẩn mô hình Agile/Scrum.",
        "Phối hợp nhuần nhuyễn thông tin liên phòng ban: Developers, UI/UX, Graphic Design và duy trì cập nhật báo cáo tiến độ liên tục.",
      ],
      skills: ["Phân tích nghiệp vụ BA", "Thực tập 2 tháng", "Khảo sát yêu cầu số hóa", "Sơ đồ Use Case & Activity", "Tài liệu đặc tả SRS", "Agile / Scrum", "Figma & Wireframe"],
      metrics: [
        { label: "Thời gian thực tập", value: "2 Tháng" },
        { label: "Tài liệu SRS & UML", value: "Chuẩn hóa" },
        { label: "Mô hình vận hành", value: "Agile/Scrum" },
      ],
    },
    {
      id: "tdtu-engineering",
      role: "Kỹ Sư Công Nghệ Thông Tin (Chương Trình Đào Tạo Kỹ Sư 5 Năm)",
      company: "Đại Học Tôn Đức Thắng (TDTU)",
      period: "2021 – 2026",
      yearBadge: "2021 – 2026",
      location: "TP. Hồ Chí Minh, Việt Nam",
      type: "Học Vấn Kỹ Sư",
      isEducation: true,
      description: "Chương trình đào tạo Kỹ sư 5 năm toàn thời gian với hơn 150+ tín chỉ học thuật chuyên sâu. Tốt nghiệp với điểm GPA 3.0 / 4.0 và bảng điểm môn chuyên ngành xuất sắc.",
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
  ] as Experience[],

  education: [
    {
      id: "tdtu-degree",
      degree: "Kỹ Sư Công Nghệ Thông Tin (Chương Trình Kỹ Sư 5 Năm)",
      institution: "Đại Học Tôn Đức Thắng (TDTU)",
      period: "2021 – 2026",
      duration: "Chương Trình Đào Tạo Kỹ Sư 5 Năm Toàn Thời Gian",
      grade: "GPA: 3.0 / 4.0 (Tốt Nghiệp Kỹ Sư CNTT)",
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
  ] as EducationItem[],

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
