export type JobPlatform = 
  | "ITviec" 
  | "TopCV" 
  | "LinkedIn" 
  | "VietnamWorks"
  | "RemoteOK" 
  | "Upwork" 
  | "Wellfound" 
  | "Direct Paste";

export type WorkMode = 
  | "Remote 100%" 
  | "Freelance / Contract" 
  | "Hybrid" 
  | "Onsite";

export type TargetMarket = 
  | "Global / Quốc Tế" 
  | "Việt Nam";

export type CurrencyType = "USD ($)" | "VNĐ";

export type BusinessDomain = 
  | "Fintech / Ngân hàng" 
  | "E-commerce & Bán lẻ" 
  | "Enterprise SaaS & B2B" 
  | "AI & Developer Tools"
  | "EdTech / Media";

export type SeniorityLevel = "Fresher / Junior" | "Middle Fullstack" | "Senior Fullstack / Lead";

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  logoText: string;
  platform: JobPlatform;
  workMode: WorkMode;
  market: TargetMarket;
  currency: CurrencyType;
  salary: string;
  location: string;
  postedAt: string;
  url: string; // DEEP LINK TRỎ THẲNG TỚI BÀI VIẾT TUYỂN DỤNG CỤ THỂ
  companyWebsite?: string;
  domain: BusinessDomain;
  level: SeniorityLevel;
  summary: string;
  requirements: {
    mustHave: string[];
    niceToHave: string[];
    yearsOfExp: string;
    techStack: string[];
  };
  rawDescription?: string;
}

export interface CandidateSkill {
  name: string;
  level: number; // 0 - 100
  category: "Frontend" | "Backend" | "Database & DevOps" | "BA & Methodologies";
  yearsOfExp: number;
}

export interface CVCandidateProfile {
  name: string;
  nickname: string;
  headline: string;
  education: string;
  yearsOfStudy: number;
  highlightEnterpriseExp: string;
  skills: CandidateSkill[];
  verifiedStrengths: string[];
}

export interface PreEmployIdea {
  title: string;
  businessProblem: string;
  proposedSolution: string;
  suggestedComponent: string;
  demoType: "fintech-ledger" | "ecommerce-checkout" | "saas-kanban";
  metricsImpact: string;
}

export interface MatchAnalysis {
  overallScore: number; // 0 - 100
  hardSkillScore: number;
  scaleAndExpScore: number;
  domainBaScore: number;
  matchTier: "Rất cao (Apply ngay)" | "Khá tốt (Cần tối ưu nhẹ)" | "Trung bình (Cần bù đắp skill)" | "Thấp (Gap lớn)";
  matchedSkills: string[];
  criticalGaps: string[]; // Thẻ đỏ: bắt buộc nhưng chưa có
  moderateGaps: string[]; // Thẻ vàng: có thể học nhanh trong 48h
  strengthsHighlight: string[];
  recommendations: string[];
  preEmployIdea: PreEmployIdea;
}
