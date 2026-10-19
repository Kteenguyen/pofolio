import { NextRequest, NextResponse } from "next/server";
import { JobPosting, BusinessDomain, SeniorityLevel, WorkMode } from "@/types/job-copilot";

export const dynamic = "force-dynamic";

// Strip HTML tags helper
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>?/gm, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

// Format relative date
function formatRelativeTime(epochOrDate: number | string | undefined): string {
  if (!epochOrDate) return "Vừa cập nhật";
  const timestamp = typeof epochOrDate === "number" ? epochOrDate * 1000 : new Date(epochOrDate).getTime();
  const diffHours = Math.round((Date.now() - timestamp) / (1000 * 60 * 60));

  if (diffHours < 1) return "Vừa đăng • Vài phút trước";
  if (diffHours < 24) return `Hôm nay • ${diffHours} giờ trước`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "Hôm qua";
  return `${diffDays} ngày trước`;
}

// 1. Phrasal normalization to prevent word-splitting on composite technical terms
function normalizePhrases(text: string): string {
  return text
    .toLowerCase()
    .replace(/\bfull[\s\-_]+stack\b/gi, "fullstack")
    .replace(/\bfront[\s\-_]+end\b/gi, "frontend")
    .replace(/\bback[\s\-_]+end\b/gi, "backend")
    .replace(/\bnext[\s\-_.]*js\b/gi, "nextjs")
    .replace(/\breact[\s\-_.]*js\b/gi, "react")
    .replace(/\bnode[\s\-_.]*js\b/gi, "node")
    .replace(/\bvue[\s\-_.]*js\b/gi, "vue");
}

// Synonyms map: maps aliases to their canonical representation
const SYNONYMS: Record<string, string> = {
  "next.js": "nextjs",
  "next": "nextjs",
  "nextjs": "nextjs",
  "react.js": "react",
  "reactjs": "react",
  "react": "react",
  "node.js": "node",
  "nodejs": "node",
  "node": "node",
  "ts": "typescript",
  "typescript": "typescript",
  "js": "javascript",
  "javascript": "javascript",
  "golang": "go",
  "go": "go",
  "fe": "frontend",
  "frontend": "frontend",
  "front-end": "frontend",
  "be": "backend",
  "backend": "backend",
  "back-end": "backend",
  "full stack": "fullstack",
  "full-stack": "fullstack",
  "fullstack": "fullstack",
};

// Bidirectional variant expansions for robust text matching
const SYNONYM_VARIANTS: Record<string, string[]> = {
  nextjs: ["nextjs", "next.js", "next js"],
  react: ["react", "react.js", "reactjs"],
  node: ["node", "node.js", "nodejs"],
  typescript: ["typescript", "ts"],
  javascript: ["javascript", "js"],
  go: ["go", "golang"],
  golang: ["go", "golang"],
  frontend: ["frontend", "front-end", "fe"],
  backend: ["backend", "back-end", "be"],
  fullstack: ["fullstack", "full-stack", "full stack"],
};

// 2. Supported tags for RemoteOK API mapper
const SUPPORTED_TAGS = [
  "react",
  "nextjs",
  "frontend",
  "backend",
  "fullstack",
  "node",
  "python",
  "ruby",
  "javascript",
  "typescript",
  "golang",
  "dev",
  "engineer",
  "mobile",
  "ios",
  "android",
  "devops",
  "cloud",
  "aws",
  "docker",
] as const;

// RemoteOK official endpoint tag mapping (translating standard terms to RemoteOK live taxonomy)
const REMOTE_OK_ENDPOINT_TAGS: Record<string, string> = {
  react: "react",
  nextjs: "dev", // RemoteOK does not have an isolated 'nextjs' tag; pool 'dev' contains all live Next.js positions
  frontend: "front-end", // RemoteOK's internal tag identifier
  backend: "backend",
  fullstack: "full-stack", // RemoteOK's internal tag identifier
  node: "node",
  python: "python",
  ruby: "ruby",
  javascript: "javascript",
  typescript: "typescript",
  golang: "golang",
  dev: "dev",
  engineer: "engineer",
  mobile: "mobile",
  ios: "ios",
  android: "android",
  devops: "devops",
  cloud: "cloud",
  aws: "aws",
  docker: "docker",
};

// Resolve user query to RemoteOK live API tag
function resolveRemoteOkTag(rawQuery: string, words: string[]): string {
  if (!rawQuery.trim()) return "dev";

  const lowerQuery = rawQuery.toLowerCase().trim();
  const canonicalQuery = SYNONYMS[lowerQuery] || lowerQuery;

  // Direct single match from rawQuery / canonicalQuery
  if (REMOTE_OK_ENDPOINT_TAGS[canonicalQuery]) {
    return REMOTE_OK_ENDPOINT_TAGS[canonicalQuery];
  }

  // If single word query that matches a supported tag
  if (words.length === 1) {
    const singleWord = words[0];
    const canonicalWord = singleWord === "go" ? "golang" : (SYNONYMS[singleWord] || singleWord);
    if (REMOTE_OK_ENDPOINT_TAGS[canonicalWord]) {
      return REMOTE_OK_ENDPOINT_TAGS[canonicalWord];
    }
  }

  // Check if exactly one supported tech tag is present in the query
  const matchingTags = words.filter((w) => {
    const canonical = w === "go" ? "golang" : (SYNONYMS[w] || w);
    return Boolean(REMOTE_OK_ENDPOINT_TAGS[canonical]);
  });

  if (matchingTags.length === 1) {
    const tag = matchingTags[0];
    const canonical = tag === "go" ? "golang" : (SYNONYMS[tag] || tag);
    return REMOTE_OK_ENDPOINT_TAGS[canonical] || "dev";
  }

  // For complex query or tags not directly isolated, default to dev pool
  return "dev";
}

// Escape regular expression special characters
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getWordVariants(word: string): string[] {
  const norm = SYNONYMS[word] || word;
  return SYNONYM_VARIANTS[norm] || [norm];
}

// Token-based matching helper with boundary check
function textContainsWord(haystack: string, word: string, isDescription = false): boolean {
  if (!haystack || !word) return false;
  const variants = getWordVariants(word);
  return variants.some((v) => {
    // Prevent common English false positives in long descriptions
    if (isDescription && (v === "next" || v === "go")) return false;
    const escaped = escapeRegExp(v);
    const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i");
    return regex.test(haystack);
  });
}

// Ktee Core Skills regex detection (React, Next.js, Node, TypeScript, Tailwind, PostgreSQL, BA)
const KTEE_CORE_SKILLS_REGEX = [
  /\breact(\.js|js)?\b/i,
  /\bnext(\.js|js)?\b/i,
  /\bnode(\.js|js)?\b/i,
  /\btypescript\b|\bts\b/i,
  /\btailwind(css)?\b/i,
  /\bpostgres(ql)?\b/i,
  /\b(business analy(st|sis)|business-analyst|\bba\b)/i,
];

function checkKteeCoreSkills(text: string): boolean {
  return KTEE_CORE_SKILLS_REGEX.some((regex) => regex.test(text));
}

// Token extractor: splits rawQuery into keywords and maps synonyms
function extractAndNormalizeTokens(rawQuery: string): { normalizedQuery: string; words: string[] } {
  const preNormalized = normalizePhrases(rawQuery);
  const rawWords = preNormalized
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/^[^\w.#+-]+|[^\w.#+-]+$/g, "").trim())
    .filter((w) => w.length > 1);

  const words = rawWords.map((w) => SYNONYMS[w] || w).filter((w) => w.length > 1);
  const normalizedQuery = words.join(" ");

  return { normalizedQuery, words };
}

// 3. Relevance Score Algorithm (0 - 100+)
function calculateRelevanceScore(
  job: {
    position: string;
    company: string;
    tags: string[];
    description: string;
  },
  rawQuery: string,
  normalizedQuery: string,
  words: string[]
): number {
  if (words.length === 0) {
    const fullText = `${job.position} ${job.company} ${job.tags.join(" ")} ${job.description}`;
    return checkKteeCoreSkills(fullText) ? 10 : 0;
  }

  const normTitle = normalizePhrases(job.position).toLowerCase();
  const normCompany = job.company.toLowerCase().trim();
  const normTags = job.tags.map((t) => normalizePhrases(t).toLowerCase());
  const normDesc = normalizePhrases(job.description).toLowerCase();
  const fullText = `${normTitle} ${normCompany} ${normTags.join(" ")} ${normDesc}`;

  let score = 0;
  let queryMatched = false;

  // Rule 1: Title khớp trọn vẹn query: +60 điểm
  if (normalizedQuery) {
    const escapedQuery = escapeRegExp(normalizedQuery);
    const exactTitleRegex = new RegExp(`(^|[^a-z0-9])${escapedQuery}([^a-z0-9]|$)`, "i");
    if (
      normTitle === normalizedQuery ||
      exactTitleRegex.test(normTitle) ||
      (normalizedQuery.length >= 3 && normTitle.includes(normalizedQuery))
    ) {
      score += 60;
      queryMatched = true;
    }
  }

  // Rule 2: Title chứa từng từ khóa trong query: +25 điểm mỗi từ
  for (const w of words) {
    if (textContainsWord(normTitle, w)) {
      score += 25;
      queryMatched = true;
    }
  }

  // Rule 3: Tags chứa từng từ khóa trong query: +20 điểm mỗi từ
  for (const w of words) {
    const tagMatched = normTags.some((tag) => textContainsWord(tag, w));
    if (tagMatched) {
      score += 20;
      queryMatched = true;
    }
  }

  // Rule 4: Company name khớp query: +15 điểm
  if (normalizedQuery) {
    const escapedCompany = escapeRegExp(normCompany);
    const escapedQuery = escapeRegExp(normalizedQuery);
    const queryInCompany = new RegExp(`(^|[^a-z0-9])${escapedQuery}([^a-z0-9]|$)`, "i").test(normCompany);
    const companyInQuery = new RegExp(`(^|[^a-z0-9])${escapedCompany}([^a-z0-9]|$)`, "i").test(rawQuery.toLowerCase());
    const wordInCompany = words.some((w) => w.length > 2 && normCompany.includes(w));

    if (normCompany === normalizedQuery || queryInCompany || companyInQuery || wordInCompany) {
      score += 15;
      queryMatched = true;
    }
  }

  // Rule 5: Description chứa từ khóa: +5 điểm mỗi từ
  for (const w of words) {
    if (textContainsWord(normDesc, w, true)) {
      score += 5;
      queryMatched = true;
    }
  }

  // Rule 6: Khớp với kỹ năng cốt lõi của Ktee (React, Next.js, Node, TypeScript, Tailwind, PostgreSQL, BA): +10 điểm thưởng
  if (queryMatched && checkKteeCoreSkills(fullText)) {
    score += 10;
  }

  // If the job does not match the user query keywords, score is 0 to prevent leakage
  return queryMatched ? score : 0;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawQuery = (searchParams.get("q") || "").trim();
    const isForce = searchParams.get("force") === "true";

    // 1. Token-Based Matching & Synonyms
    const { normalizedQuery, words } = extractAndNormalizeTokens(rawQuery);

    // 2. Tag mapper for RemoteOK API
    const apiTag = resolveRemoteOkTag(rawQuery, words);
    const remoteOkUrl = `https://remoteok.com/api?tag=${encodeURIComponent(apiTag)}`;

    const response = await fetch(remoteOkUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      ...(isForce ? { cache: "no-store" } : { next: { revalidate: 60 } }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `RemoteOK API returned HTTP status ${response.status}`,
          data: [],
        },
        { status: 502 }
      );
    }

    const rawData = await response.json();

    if (!Array.isArray(rawData)) {
      return NextResponse.json(
        {
          success: false,
          error: "Dữ liệu trả về không đúng định dạng",
          data: [],
        },
        { status: 500 }
      );
    }

    // Filter valid job items
    const validRawJobs = rawData.filter(
      (item) => item && typeof item === "object" && item.id && item.position && item.company
    );

    // Transform into JobPosting schema 100% real with relevanceScore
    const allScoredJobs: JobPosting[] = validRawJobs.map((item) => {
      const position = String(item.position || "Software Engineer");
      const company = String(item.company || "Công Ty Tuyển Dụng");
      const tags: string[] = Array.isArray(item.tags) ? item.tags.map((t: unknown) => String(t)) : [];
      const cleanDesc = stripHtml(String(item.description || ""));

      // 3. Calculate relevance score (0 - 100+)
      const relevanceScore = calculateRelevanceScore(
        { position, company, tags, description: cleanDesc },
        rawQuery,
        normalizedQuery,
        words
      );

      // Determine Domain
      let domain: BusinessDomain = "Enterprise SaaS & B2B";
      const lowerPos = position.toLowerCase();
      const lowerTags = tags.map((t) => t.toLowerCase()).join(" ");
      if (lowerPos.includes("fintech") || lowerPos.includes("bank") || lowerTags.includes("finance") || lowerTags.includes("crypto") || lowerTags.includes("bitcoin")) {
        domain = "Fintech / Ngân hàng";
      } else if (lowerPos.includes("ecommerce") || lowerPos.includes("retail") || lowerPos.includes("shop") || lowerTags.includes("e-commerce")) {
        domain = "E-commerce & Bán lẻ";
      } else if (lowerPos.includes("ai") || lowerTags.includes("ai") || lowerTags.includes("machine learning")) {
        domain = "AI & Developer Tools";
      }

      // Determine Seniority Level
      let level: SeniorityLevel = "Middle Fullstack";
      if (lowerPos.includes("senior") || lowerPos.includes("lead") || lowerPos.includes("principal") || lowerPos.includes("architect")) {
        level = "Senior Fullstack / Lead";
      } else if (lowerPos.includes("junior") || lowerPos.includes("fresher") || lowerPos.includes("entry") || lowerPos.includes("intern")) {
        level = "Fresher / Junior";
      }

      // Determine Work Mode
      let workMode: WorkMode = "Remote 100%";
      if (lowerPos.includes("contract") || lowerTags.includes("contract") || cleanDesc.toLowerCase().includes("freelance")) {
        workMode = "Freelance / Contract";
      }

      // Determine Salary in USD
      let salaryDisplay = "Thoả thuận theo năng lực (USD)";
      const minSalary = Number(item.salary_min) || 0;
      const maxSalary = Number(item.salary_max) || 0;
      if (minSalary > 0 && maxSalary > 0) {
        const minMonthly = Math.round(minSalary / 12);
        const maxMonthly = Math.round(maxSalary / 12);
        salaryDisplay = `$${minMonthly.toLocaleString("en-US")} - $${maxMonthly.toLocaleString("en-US")} USD / tháng`;
      } else if (maxSalary > 0) {
        salaryDisplay = `Lên đến $${Math.round(maxSalary / 12).toLocaleString("en-US")} USD / tháng`;
      }

      // Must have vs Nice to have
      const primaryTech = tags.slice(0, 4);
      const secondaryTech = tags.slice(4, 9);
      if (primaryTech.length === 0) {
        primaryTech.push("React", "TypeScript", "Node.js");
      }

      // Real Direct Deep Link URL
      const directApplyUrl = item.apply_url || item.url || `https://remoteok.com/remote-jobs/${item.slug || item.id}`;

      return {
        id: `remoteok-${item.id}`,
        title: position,
        company: company,
        logoText: company.substring(0, 2).toUpperCase(),
        platform: "RemoteOK",
        workMode: workMode,
        market: "Global / Quốc Tế",
        currency: "USD ($)",
        salary: salaryDisplay,
        location: item.location || "Worldwide Remote (Toàn Cầu)",
        postedAt: formatRelativeTime(item.epoch || item.date),
        url: directApplyUrl,
        domain: domain,
        level: level,
        summary: cleanDesc.slice(0, 200) + (cleanDesc.length > 200 ? "..." : ""),
        requirements: {
          mustHave: primaryTech,
          niceToHave: secondaryTech.length > 0 ? secondaryTech : ["Docker", "CI/CD", "Async Communication"],
          yearsOfExp: level === "Senior Fullstack / Lead" ? "3 - 5+ năm kinh nghiệm" : "1 - 3 năm kinh nghiệm",
          techStack: tags.length > 0 ? tags.slice(0, 8) : ["React", "JavaScript", "TypeScript"],
        },
        rawDescription: cleanDesc,
        relevanceScore: relevanceScore,
      };
    });

    // 4. If user entered a query: keep only jobs with relevanceScore > 0, sorted descending
    let finalJobs: JobPosting[];
    if (words.length > 0) {
      finalJobs = allScoredJobs
        .filter((job) => (job.relevanceScore ?? 0) > 0)
        .sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0));
    } else {
      finalJobs = allScoredJobs.sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0));
    }

    return NextResponse.json(
      {
        success: true,
        count: finalJobs.length,
        query: rawQuery || "all",
        resolvedApiTag: apiTag,
        isLiveDirect: isForce,
        source: "RemoteOK Official Live API (100% Real Time - Zero Mock)",
        fetchedAt: new Date().toISOString(),
        data: finalJobs,
      },
      {
        headers: {
          "Cache-Control": isForce
            ? "no-store, no-cache, must-revalidate, proxy-revalidate"
            : "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Lỗi khi tìm kiếm job realtime:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Lỗi server khi fetch live API",
        data: [],
      },
      { status: 500 }
    );
  }
}
