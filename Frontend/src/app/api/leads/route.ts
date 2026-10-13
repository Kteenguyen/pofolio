import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, company, role, type } = body;

    // Validate minimum required info
    if (!name && !phone && !email) {
      return NextResponse.json(
        { success: false, message: "Vui lòng cung cấp ít nhất số điện thoại, email hoặc họ tên." },
        { status: 400 }
      );
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      name: name || "Ẩn danh / Nhà tuyển dụng",
      company: company || "",
      role: role || "",
      email: email || "",
      phone: phone || "",
      type: type || "interview_or_contact",
      message: message || "Yêu cầu liên hệ / phỏng vấn từ giao diện Mobile",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    // Forward to Backend Express on port 3001 if reachable
    try {
      const backendRes = await fetch("http://localhost:3001/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${newLead.name}${newLead.company ? ` (${newLead.company})` : ""}`,
          email: newLead.email || "recruiter-mobile@portfolio.internal",
          phone: newLead.phone,
          message: `[${newLead.role || "Phỏng vấn"}] ${newLead.message}`,
        }),
        signal: AbortSignal.timeout(1500),
      });
      if (backendRes.ok) {
        return NextResponse.json({
          success: true,
          message: "Gửi lời mời phỏng vấn thành công tới Backend!",
          data: newLead,
        });
      }
    } catch {
      // Backend not running or timeout, fallback gracefully
    }

    // Local file fallback persistence if directory exists
    try {
      const fallbackDir = path.join(process.cwd(), "../Backend/data");
      const fallbackFile = path.join(fallbackDir, "leads.json");
      if (fs.existsSync(fallbackDir)) {
        let existing: any[] = [];
        if (fs.existsSync(fallbackFile)) {
          existing = JSON.parse(fs.readFileSync(fallbackFile, "utf8"));
        }
        existing.unshift(newLead);
        fs.writeFileSync(fallbackFile, JSON.stringify(existing, null, 2), "utf8");
      }
    } catch {
      // Ignore file write errors in edge/serverless environments
    }

    return NextResponse.json({
      success: true,
      message: "Lời mời phỏng vấn của Quý Anh/Chị đã được tiếp nhận thành công!",
      data: newLead,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Đã xảy ra lỗi khi tiếp nhận dữ liệu." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Leads API endpoint active",
  });
}
