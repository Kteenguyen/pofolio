export type JobPlatform = "ITviec" | "TopCV" | "LinkedIn" | "VietnamWorks" | "Direct Paste";

export type BusinessDomain = 
  | "Fintech / Ngân hàng" 
  | "E-commerce & Bán lẻ" 
  | "Enterprise SaaS & B2B" 
  | "EdTech / Media";

export type SeniorityLevel = "Fresher / Junior" | "Middle Fullstack" | "Senior Fullstack / Lead";

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  logoText: string;
  platform: JobPlatform;
  salary: string;
  location: string;
  postedAt: string;
  url?: string;
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
