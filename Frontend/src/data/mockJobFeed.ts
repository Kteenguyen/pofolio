import { JobPosting, CVCandidateProfile } from "@/types/job-copilot";

export const defaultCandidateProfile: CVCandidateProfile = {
  name: "Nguyễn Khoa Tài",
  nickname: "Ktee",
  headline: "Full-Stack Software Engineer | Kỹ Sư CNTT (Hệ 5 Năm)",
  education: "Đại học Tôn Đức Thắng (2021 – 2026)",
  yearsOfStudy: 5,
  highlightEnterpriseExp: "Trưởng nhóm triển khai FPT IS cho cơ quan Thi Hành Án Dân Sự (230+ End-users, xử lý 60+ sự cố)",
  skills: [
    { name: "React", level: 92, category: "Frontend", yearsOfExp: 3 },
    { name: "Next.js", level: 90, category: "Frontend", yearsOfExp: 2.5 },
    { name: "TypeScript", level: 90, category: "Frontend", yearsOfExp: 2.5 },
    { name: "Tailwind CSS", level: 95, category: "Frontend", yearsOfExp: 3 },
    { name: "JavaScript ES6+", level: 92, category: "Frontend", yearsOfExp: 4 },
    { name: "Framer Motion", level: 88, category: "Frontend", yearsOfExp: 2 },
    { name: "Node.js", level: 86, category: "Backend", yearsOfExp: 3 },
    { name: "Express.js", level: 85, category: "Backend", yearsOfExp: 2.5 },
    { name: "PostgreSQL", level: 84, category: "Database & DevOps", yearsOfExp: 2 },
    { name: "RESTful API", level: 90, category: "Backend", yearsOfExp: 3 },
    { name: "Git / GitHub", level: 90, category: "Database & DevOps", yearsOfExp: 4 },
    { name: "Docker", level: 70, category: "Database & DevOps", yearsOfExp: 1 },
    { name: "Phân tích Yêu cầu (BA) & UML", level: 88, category: "BA & Methodologies", yearsOfExp: 2.5 },
    { name: "Agile / Scrum", level: 85, category: "BA & Methodologies", yearsOfExp: 2 },
    { name: "Figma UI/UX", level: 85, category: "Frontend", yearsOfExp: 2 },
  ],
  verifiedStrengths: [
    "Khả năng triển khai hệ thống thực địa cho 230+ người dùng doanh nghiệp (FPT IS)",
    "Thành thạo kiến trúc Next.js App Router, Server Components và Clean Code",
    "Tư duy cầu nối BA: phân tích nghiệp vụ, vẽ sơ đồ ca sử dụng UML và giao tiếp khách hàng tốt",
    "Hệ thống hóa thiết kế với Tailwind CSS & tối ưu Core Web Vitals",
  ],
};

export const initialJobFeed: JobPosting[] = [
  {
    id: "job-vng-zalopay",
    title: "Senior / Middle Fullstack Engineer (Next.js & Node.js)",
    company: "ZaloPay (VNG Corporation)",
    logoText: "ZP",
    platform: "ITviec",
    salary: "28.000.000 - 45.000.000 VNĐ",
    location: "TP. Hồ Chí Minh (Quận 7)",
    postedAt: "Hôm nay • 2 giờ trước",
    url: "https://itviec.com",
    domain: "Fintech / Ngân hàng",
    level: "Middle Fullstack",
    summary: "Xây dựng cổng thanh toán trực tuyến và microservices xử lý hàng triệu giao dịch mỗi ngày. Đòi hỏi tư duy tối ưu hóa độ trễ, kiểm soát dòng tiền và idempotency.",
    requirements: {
      mustHave: [
        "ReactJS",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Redis Caching",
        "Kiến trúc Microservices",
      ],
      niceToHave: [
        "RabbitMQ / Kafka",
        "Docker / Kubernetes",
        "Kinh nghiệm xử lý bài toán đối soát tài chính hoặc ngân hàng",
      ],
      yearsOfExp: "2 - 4 năm kinh nghiệm",
      techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Kafka", "Docker"],
    },
    rawDescription: `Tuyển Middle/Senior Fullstack Engineer làm việc tại dự án ZaloPay Merchant Portal & Core Payment Gateway.
Yêu cầu:
- Thành thạo React/Next.js App Router, TypeScript, Tailwind CSS.
- Kinh nghiệm làm việc với Node.js (NestJS hoặc Express) kết hợp cơ sở dữ liệu PostgreSQL.
- Bắt buộc hiểu về cơ chế Caching (Redis), chống duplicate giao dịch (Idempotency).
- Ưu tiên ứng viên có kiến thức về Message Queue (RabbitMQ / Kafka) và tư duy bảo mật giao dịch tài chính.`,
  },
  {
    id: "job-shopee-frontend",
    title: "Frontend Engineer (React / Next.js - Core Shopping Flow)",
    company: "Shopee Vietnam",
    logoText: "SP",
    platform: "LinkedIn",
    salary: "30.000.000 - 50.000.000 VNĐ",
    location: "TP. Hồ Chí Minh (Quận 1)",
    postedAt: "Hôm qua",
    url: "https://linkedin.com",
    domain: "E-commerce & Bán lẻ",
    level: "Middle Fullstack",
    summary: "Chịu trách nhiệm trực tiếp về trải nghiệm giỏ hàng, đặt hàng và thanh toán trên nền tảng Web Desktop & Mobile Web với hàng chục triệu lượt truy cập đồng thời trong các đợt Mega Sale (11.11, 12.12).",
    requirements: {
      mustHave: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Performance Optimization (Core Web Vitals)",
        "State Management (Zustand/Redux)",
      ],
      niceToHave: [
        "Webpack / Turbopack build optimization",
        "A/B Testing & Micro-frontends",
        "Unit Testing (Jest, Playwright)",
      ],
      yearsOfExp: "2+ năm kinh nghiệm",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Playwright"],
    },
    rawDescription: `Shopee đang tìm kiếm Frontend Engineers xuất sắc cho luồng Core Checkout & Cart.
- Tối ưu hóa Largest Contentful Paint (LCP) dưới 1.2s và Cumulative Layout Shift (CLS) = 0.
- Xây dựng trải nghiệm giỏ hàng mượt mà, hỗ trợ offline checkout preview và optimistic updates.
- Phối hợp chặt chẽ với Product Managers và Backend teams để thiết kế hợp đồng API chuẩn mực.`,
  },
  {
    id: "job-fpt-enterprise",
    title: "Chuyên Viên Phát Triển Phần Mềm Doanh Nghiệp (Fullstack & BA)",
    company: "FPT Information System (FPT IS)",
    logoText: "FPT",
    platform: "TopCV",
    salary: "18.000.000 - 30.000.000 VNĐ",
    location: "TP. Hồ Chí Minh (Khu CNC)",
    postedAt: "3 ngày trước",
    url: "https://topcv.vn",
    domain: "Enterprise SaaS & B2B",
    level: "Fresher / Junior",
    summary: "Triển khai và nâng cấp các phân hệ điều hành nghiệp vụ cho khối Doanh nghiệp và Cơ quan Nhà nước. Đóng vai trò cầu nối giữa nghiệp vụ khách hàng và mã nguồn hệ thống.",
    requirements: {
      mustHave: [
        "React hoặc Vue",
        "Node.js",
        "SQL (PostgreSQL hoặc SQL Server)",
        "Tư duy phân tích yêu cầu (BA)",
        "Vẽ sơ đồ UML & viết tài liệu URS/SRS",
      ],
      niceToHave: [
        "Kinh nghiệm làm việc thực địa với người dùng cơ quan nhà nước",
        "Git flow, Agile/Scrum",
      ],
      yearsOfExp: "1 - 2 năm kinh nghiệm (Chấp nhận cử nhân CNTT hệ 5 năm có kinh nghiệm thực tế)",
      techStack: ["React", "Node.js", "PostgreSQL", "UML", "Agile", "TypeScript"],
    },
    rawDescription: `FPT IS tìm kiếm kỹ sư Fullstack có thế mạnh về tư duy phân tích nghiệp vụ (BA):
- Khảo sát thực tế, phỏng vấn người dùng cuối để đặc tả yêu cầu phần mềm.
- Xây dựng các module quản lý quy trình, phân quyền RBAC và báo cáo thống kê.
- Tham gia hỗ trợ người dùng cuối và sửa chữa các lỗi nghiệp vụ phát sinh.`,
  },
  {
    id: "job-tcbs-wealth",
    title: "Software Engineer (Fintech Wealth Management Platform)",
    company: "Techcombank Securities (TCBS)",
    logoText: "TC",
    platform: "ITviec",
    salary: "25.000.000 - 40.000.000 VNĐ",
    location: "TP. Hồ Chí Minh & Hà Nội",
    postedAt: "Hôm nay",
    url: "https://itviec.com",
    domain: "Fintech / Ngân hàng",
    level: "Middle Fullstack",
    summary: "Xây dựng các công cụ phân tích tài chính cá nhân, bảng giá cổ phiếu realtime qua WebSocket và giao diện giao dịch thông minh.",
    requirements: {
      mustHave: [
        "React",
        "TypeScript",
        "WebSocket Realtime",
        "Chart.js / TradingView Lightweight Charts",
        "RESTful API & GraphQL",
      ],
      niceToHave: [
        "Golang hoặc Java backend",
        "Hiểu biết về thị trường chứng khoán, trái phiếu",
      ],
      yearsOfExp: "2+ năm kinh nghiệm",
      techStack: ["React", "TypeScript", "WebSocket", "Lightweight Charts", "GraphQL"],
    },
    rawDescription: `Đội ngũ TCBS WealthTech tìm kiếm Kỹ sư Frontend/Fullstack phát triển bảng điều khiển tài sản cá nhân:
- Tối ưu rendering biểu đồ nến và dữ liệu sổ lệnh với tần suất 60fps.
- Đảm bảo bảo mật phiên giao dịch, cơ chế xác thực đa lớp (MFA).`,
  },
  {
    id: "job-coolmate-growth",
    title: "Frontend Web Developer (D2C E-Commerce Brand)",
    company: "Coolmate Vietnam",
    logoText: "CM",
    platform: "TopCV",
    salary: "16.000.000 - 24.000.000 VNĐ",
    location: "TP. Hồ Chí Minh",
    postedAt: "4 ngày trước",
    url: "https://topcv.vn",
    domain: "E-commerce & Bán lẻ",
    level: "Fresher / Junior",
    summary: "Phát triển nền tảng D2C Coolmate 2.0 với tốc độ tải trang dưới 1 giây, tính năng đề xuất size thông minh và hệ thống khuyến mãi linh hoạt.",
    requirements: {
      mustHave: [
        "React / Next.js",
        "Tailwind CSS",
        "Responsive Mobile-First",
        "Tối ưu hình ảnh & Web Vitals",
      ],
      niceToHave: [
        "Tích hợp cổng thanh toán VNPay, MoMo, ZaloPay",
        "Headless E-commerce (Shopify/Saleor)",
      ],
      yearsOfExp: "1+ năm kinh nghiệm",
      techStack: ["Next.js", "Tailwind CSS", "TypeScript", "VNPay", "Shopify API"],
    },
    rawDescription: `Coolmate tuyển dụng Web Developer đồng hành cùng đội ngũ Growth & Tech:
- Đảm bảo điểm Google PageSpeed Insights trên Mobile >= 90.
- Xây dựng trải nghiệm chọn size và gợi ý phối đồ tương tác trực quan.`,
  },
];
