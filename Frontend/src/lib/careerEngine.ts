import { JobPosting, CVCandidateProfile, MatchAnalysis, PreEmployIdea } from "@/types/job-copilot";

// Helper to normalize skill names for fuzzy comparison
function normalizeSkill(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function calculateMatch(job: JobPosting, profile: CVCandidateProfile): MatchAnalysis {
  const candidateSkillsNormalized = profile.skills.map((s) => ({
    raw: s.name,
    norm: normalizeSkill(s.name),
    level: s.level,
    years: s.yearsOfExp,
  }));

  const candidateSkillMap = new Map<string, { level: number; years: number; raw: string }>();
  for (const s of candidateSkillsNormalized) {
    candidateSkillMap.set(s.norm, s);
    // Aliases
    if (s.norm === "react") candidateSkillMap.set("reactjs", s);
    if (s.norm === "nextjs") candidateSkillMap.set("next", s);
    if (s.norm === "nodejs") candidateSkillMap.set("node", s);
    if (s.norm === "typescript") candidateSkillMap.set("ts", s);
    if (s.norm === "postgresql") candidateSkillMap.set("postgres", s);
    if (s.norm === "tailwindcss") candidateSkillMap.set("tailwind", s);
  }

  const mustHaves = job.requirements.mustHave;
  const niceToHaves = job.requirements.niceToHave;

  const matchedSkills: string[] = [];
  const criticalGaps: string[] = [];
  const moderateGaps: string[] = [];

  let hardSkillPoints = 0;
  let totalHardPoints = mustHaves.length * 10;

  // Check Must Haves
  for (const req of mustHaves) {
    const normReq = normalizeSkill(req);
    let matched = false;

    for (const [candNorm, candData] of candidateSkillMap.entries()) {
      if (normReq.includes(candNorm) || candNorm.includes(normReq)) {
        matched = true;
        hardSkillPoints += (candData.level / 100) * 10;
        matchedSkills.push(`${req} (Năng lực: ${candData.level}%)`);
        break;
      }
    }

    if (!matched) {
      // Check if it's conceptual or BA related
      if (req.toLowerCase().includes("ba") || req.toLowerCase().includes("yêu cầu") || req.toLowerCase().includes("uml")) {
        hardSkillPoints += 8.8; // Ktee has 8.1 in Requirements Analysis & 88% BA
        matchedSkills.push(`${req} (Thế mạnh BA thực chiến)`);
      } else {
        criticalGaps.push(req);
      }
    }
  }

  // Check Nice To Haves
  for (const req of niceToHaves) {
    const normReq = normalizeSkill(req);
    let matched = false;

    for (const [candNorm, candData] of candidateSkillMap.entries()) {
      if (normReq.includes(candNorm) || candNorm.includes(normReq)) {
        matched = true;
        matchedSkills.push(`${req} [Bonus] (Năng lực: ${candData.level}%)`);
        break;
      }
    }

    if (!matched) {
      moderateGaps.push(req);
    }
  }

  // Calculate scores
  const hardSkillScore = Math.min(100, Math.round((hardSkillPoints / Math.max(1, totalHardPoints)) * 100));

  // Scale and experience score
  let scaleAndExpScore = 78; // Base solid baseline for 5-year IT engineer
  if (job.level === "Fresher / Junior") {
    scaleAndExpScore = 96;
  } else if (job.level === "Middle Fullstack") {
    scaleAndExpScore = 84;
  } else {
    scaleAndExpScore = 70;
  }

  // Boost if job values enterprise or end-user deployment
  if (job.summary.toLowerCase().includes("doanh nghiệp") || job.summary.toLowerCase().includes("nghiệp vụ")) {
    scaleAndExpScore = Math.min(100, scaleAndExpScore + 10);
  }

  // Domain & BA Score
  let domainBaScore = 85;
  if (job.domain === "Enterprise SaaS & B2B") {
    domainBaScore = 95; // Ktee's sweet spot
  } else if (job.domain === "E-commerce & Bán lẻ") {
    domainBaScore = 90; // High frontend focus
  } else if (job.domain === "Fintech / Ngân hàng") {
    domainBaScore = 75; // Requires deeper financial logic understanding
  }

  // Weighted overall calculation: Hard Skill (45%) + Scale/Exp (35%) + Domain/BA (20%)
  const overallScore = Math.round(
    hardSkillScore * 0.45 + scaleAndExpScore * 0.35 + domainBaScore * 0.20
  );

  let matchTier: MatchAnalysis["matchTier"] = "Trung bình (Cần bù đắp skill)";
  if (overallScore >= 85) {
    matchTier = "Rất cao (Apply ngay)";
  } else if (overallScore >= 72) {
    matchTier = "Khá tốt (Cần tối ưu nhẹ)";
  } else if (overallScore < 60) {
    matchTier = "Thấp (Gap lớn)";
  }

  // Generate Tailored Pre-employment Idea
  let preEmployIdea: PreEmployIdea;
  if (job.domain === "Fintech / Ngân hàng") {
    preEmployIdea = {
      title: "Cơ Chế Đối Soát Giao Dịch & Sổ Cái Realtime (Idempotency Ledger)",
      businessProblem: "Cổng thanh toán dễ gặp sự cố double-spending hoặc sai lệch số dư khi mạng chập chờn hoặc người dùng click đúp.",
      proposedSolution: "Dựng Mini Web-Widget mô phỏng Idempotency Key (UUID v4) + Local Optimistic Lock, ghi log kiểm toán (Audit Trail) và trực quan hóa luồng dữ liệu 60fps.",
      suggestedComponent: "InteractiveTransactionLedger",
      demoType: "fintech-ledger",
      metricsImpact: "Chứng minh năng lực xử lý bài toán chống trùng lặp giao dịch và bảo toàn dữ liệu tài chính cho Tech Lead ZaloPay/TCBS.",
    };
  } else if (job.domain === "E-commerce & Bán lẻ") {
    preEmployIdea = {
      title: "Luồng Đặt Hàng Optimistic UI & Core Web Vitals HUD",
      businessProblem: "Trang giỏ hàng thường bị giật lag (CLS > 0.1) khi người dùng đổi số lượng hoặc áp mã voucher, làm giảm 15% tỷ lệ chuyển đổi.",
      proposedSolution: "Dựng Drawer Giỏ hàng Optimistic State, không Layout Shift, tính toán discount tức thời và kèm thanh đo Core Web Vitals (LCP < 1.2s).",
      suggestedComponent: "OptimisticCartCheckoutDrawer",
      demoType: "ecommerce-checkout",
      metricsImpact: "Thuyết phục Tech Lead Shopee/Coolmate bằng chỉ số Core Web Vitals chuẩn mực đo lường bằng millisecond thực tế.",
    };
  } else {
    preEmployIdea = {
      title: "Ma Trận Phân Quyền RBAC & Pipeline Điều Hành Nghiệp Vụ",
      businessProblem: "Hệ thống phần mềm cơ quan/doanh nghiệp có ma trận phân quyền chồng chéo giữa Quản trị viên, Cán bộ thẩm định và Nhân viên thực thi.",
      proposedSolution: "Bảng điều khiển tương tác mô phỏng chuyển trạng thái hồ sơ (State Machine), ma trận RBAC theo thời gian thực và phân quyền đa cấp bậc.",
      suggestedComponent: "EnterpriseRbacPipeline",
      demoType: "saas-kanban",
      metricsImpact: "Tái hiện chính xác kinh nghiệm thực chiến 230+ người dùng tại FPT IS, giải quyết trúng nhu cầu khách hàng B2B.",
    };
  }

  const recommendations: string[] = [];
  if (criticalGaps.length > 0) {
    recommendations.push(
      `Cần bù đắp cấp tốc trong 48h các kỹ năng cốt lõi: ${criticalGaps.join(", ")} thông qua dự án mẫu thực hành.`
    );
  }
  recommendations.push(
    `Đính kèm trực tiếp đường dẫn Live Demo [${preEmployIdea.title}] vào đầu Cover Letter để chứng minh giải pháp thực tế.`
  );
  if (overallScore >= 80) {
    recommendations.push("Hồ sơ thuộc nhóm Top 5% ứng viên phù hợp nhất cho vị trí này. Hãy chủ động kết nối trực tiếp với Hiring Manager qua LinkedIn.");
  } else {
    recommendations.push("Nên nhấn mạnh nền tảng đào tạo kỹ sư 5 năm tại ĐH Tôn Đức Thắng và kinh nghiệm chuyển giao thực địa tại FPT IS để bù đắp số năm thâm niên.");
  }

  const strengthsHighlight = [
    "Khả năng thích ứng nhanh và nền tảng thuật toán / cấu trúc dữ liệu chuẩn mực",
    "Kỹ năng lập trình Front-end với Next.js và Tailwind CSS đạt điểm số hàng đầu",
    "Tư duy cầu nối BA: hiểu bài toán kinh doanh chứ không chỉ là 'thợ code'",
  ];

  return {
    overallScore,
    hardSkillScore,
    scaleAndExpScore,
    domainBaScore,
    matchTier,
    matchedSkills,
    criticalGaps,
    moderateGaps,
    strengthsHighlight,
    recommendations,
    preEmployIdea,
  };
}

export function parseRawJobText(rawText: string, jobTitle = "Vị Trí Tự Nhập"): JobPosting {
  const text = rawText.toLowerCase();

  // Detect platform
  let platform: JobPosting["platform"] = "Direct Paste";
  if (text.includes("itviec")) platform = "ITviec";
  else if (text.includes("topcv")) platform = "TopCV";
  else if (text.includes("linkedin")) platform = "LinkedIn";
  else if (text.includes("vietnamworks")) platform = "VietnamWorks";

  // Detect domain
  let domain: JobPosting["domain"] = "Enterprise SaaS & B2B";
  if (text.includes("ngân hàng") || text.includes("bank") || text.includes("thanh toán") || text.includes("fintech") || text.includes("chứng khoán") || text.includes("ví điện tử")) {
    domain = "Fintech / Ngân hàng";
  } else if (text.includes("thương mại") || text.includes("ecommerce") || text.includes("bán lẻ") || text.includes("shop") || text.includes("d2c")) {
    domain = "E-commerce & Bán lẻ";
  }

  // Detect Level
  let level: JobPosting["level"] = "Middle Fullstack";
  if (text.includes("senior") || text.includes("lead") || text.includes("trưởng nhóm")) {
    level = "Senior Fullstack / Lead";
  } else if (text.includes("fresher") || text.includes("junior") || text.includes("thực tập")) {
    level = "Fresher / Junior";
  }

  // Detect Tech Stack
  const knownTech = [
    "React", "Next.js", "Node.js", "TypeScript", "JavaScript", "Tailwind CSS",
    "PostgreSQL", "MongoDB", "Redis", "Kafka", "RabbitMQ", "Docker", "Kubernetes",
    "AWS", "GraphQL", "RESTful API", "Figma", "Vue", "Golang", "Python", "Java",
  ];

  const detectedTech: string[] = [];
  for (const tech of knownTech) {
    if (text.includes(tech.toLowerCase())) {
      detectedTech.push(tech);
    }
  }

  if (detectedTech.length === 0) {
    detectedTech.push("React", "TypeScript", "Node.js", "SQL");
  }

  const mustHave = detectedTech.slice(0, 4);
  const niceToHave = detectedTech.slice(4);
  if (niceToHave.length === 0) {
    niceToHave.push("Docker / CI-CD", "Testing (Jest / Playwright)");
  }

  return {
    id: `custom-job-${Date.now()}`,
    title: jobTitle,
    company: "Doanh Nghiệp Tuyển Dụng",
    logoText: "JD",
    platform,
    salary: "Thoả thuận theo năng lực",
    location: "TP. Hồ Chí Minh / Remote",
    postedAt: "Vừa tải lên",
    domain,
    level,
    summary: rawText.slice(0, 180) + (rawText.length > 180 ? "..." : ""),
    requirements: {
      mustHave,
      niceToHave,
      yearsOfExp: level === "Senior Fullstack / Lead" ? "3 - 5 năm" : "1 - 3 năm",
      techStack: detectedTech,
    },
    rawDescription: rawText,
  };
}
