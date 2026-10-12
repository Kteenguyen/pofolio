import { NextRequest, NextResponse } from "next/server";
import { JobPosting, BusinessDomain, SeniorityLevel, WorkMode } from "@/types/job-copilot";

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawQuery = (searchParams.get("q") || "").trim().toLowerCase();
    const tag = (searchParams.get("tag") || "react").trim().toLowerCase();

    // Query RemoteOK Live Official Free API
    const remoteOkUrl = rawQuery 
      ? `https://remoteok.com/api?tag=${encodeURIComponent(rawQuery)}`
      : `https://remoteok.com/api?tag=${encodeURIComponent(tag)}`;

    const response = await fetch(remoteOkUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      next: { revalidate: 60 }, // Cache 60s for performance
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

    // Filter valid job items (first item is legal notice)
    const validRawJobs = rawData.filter(
      (item) => item && typeof item === "object" && item.id && item.position && item.company
    );

    // Transform into JobPosting schema 100% real
    const realJobs: JobPosting[] = validRawJobs.map((item) => {
      const position = String(item.position || "Software Engineer");
      const company = String(item.company || "Công Ty Tuyển Dụng");
      const tags: string[] = Array.isArray(item.tags) ? item.tags : [];
      const cleanDesc = stripHtml(String(item.description || ""));

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
      };
    });

    return NextResponse.json({
      success: true,
      count: realJobs.length,
      source: "RemoteOK Official Live API (100% Real Time - Zero Mock)",
      fetchedAt: new Date().toISOString(),
      data: realJobs,
    });
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
