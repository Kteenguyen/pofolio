"use client";

import { useState } from "react";
import { Users, Shield, Check, Copy, ArrowRight, Zap, AlertCircle } from "lucide-react";

type Role = "ADMIN_CEO" | "AUDITOR" | "OFFICER";
type CaseStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "EXECUTED";

interface CaseItem {
  id: string;
  title: string;
  officer: string;
  status: CaseStatus;
  amount: number;
}

export default function EnterpriseKanbanDemo({ companyName = "FPT IS / Enterprise SaaS" }: { companyName?: string }) {
  const [currentRole, setCurrentRole] = useState<Role>("AUDITOR");
  const [cases, setCases] = useState<CaseItem[]>([
    {
      id: "HS-2026-081",
      title: "Hồ sơ Thi hành án phân chia tài sản thừa kế",
      officer: "Nguyễn Văn Tuấn (FPT IS User #12)",
      status: "SUBMITTED",
      amount: 450000000,
    },
    {
      id: "HS-2026-082",
      title: "Quyết định cưỡng chế kê biên nhà xưởng B2",
      officer: "Trần Thị Lan (FPT IS User #45)",
      status: "DRAFT",
      amount: 1800000000,
    },
    {
      id: "HS-2026-079",
      title: "Biên bản đối soát tài chính thu hồi nợ",
      officer: "Lê Hoàng Nam (FPT IS User #88)",
      status: "APPROVED",
      amount: 320000000,
    },
  ]);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  const handleStatusChange = (caseId: string, nextStatus: CaseStatus) => {
    // RBAC Rule Verification
    if (nextStatus === "APPROVED" && currentRole !== "AUDITOR" && currentRole !== "ADMIN_CEO") {
      setFeedbackMsg({
        text: "⛔ TỪ CHỐI TRUY CẬP (RBAC Guard): Chỉ vai trò Chuyên Viên Thẩm Định hoặc Admin mới có quyền Phê Duyệt!",
        isError: true,
      });
      return;
    }

    if (nextStatus === "EXECUTED" && currentRole !== "ADMIN_CEO") {
      setFeedbackMsg({
        text: "⛔ TỪ CHỐI TRUY CẬP (RBAC Guard): Chỉ Ban Giám Đốc (ADMIN_CEO) mới có quyền Ban Hành Thi Hành Án!",
        isError: true,
      });
      return;
    }

    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: nextStatus } : c))
    );
    setFeedbackMsg({
      text: `✅ Chuyển trạng thái hồ sơ [${caseId}] sang [${nextStatus}] thành công! Ghi nhận log kiểm toán cho 230+ người dùng.`,
      isError: false,
    });
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const pitchText = `Kính gửi Anh/Chị Tuyển dụng & Tech Lead tại ${companyName},

Em là Nguyễn Khoa Tài (Ktee), tốt nghiệp Đại học Tôn Đức Thắng (Chương trình Kỹ sư 5 năm).

Em từng trực tiếp làm Trưởng nhóm triển khai phần mềm tại FPT IS cho cơ quan Thi Hành Án Dân Sự, trực tiếp đào tạo hơn 230 người dùng cuối và xử lý hơn 60 sự cố nghiệp vụ thực địa.

Hiểu rõ bài toán phân quyền phức tạp và quy trình nghiệp vụ nhiều cấp bậc của hệ thống doanh nghiệp tại ${companyName}, em đã chuẩn bị sẵn Bản Mẫu Kiến Trúc (Proof of Work):
- State Machine kiểm soát trạng thái hồ sơ nghiêm ngặt, chống nhảy cóc quy trình.
- Ma trận phân quyền RBAC (Role-Based Access Control) ngăn chặn vượt quyền ở cả tầng UI và API Guard.
- Tư duy cầu nối BA: phân tích nghiệp vụ, vẽ sơ đồ Use-Case UML chuẩn mực.

Anh/Chị có thể trải nghiệm trực tiếp live widget tại: https://ktee.dev/copilot
Em rất mong muốn mang kinh nghiệm thực chiến này để đóng góp cho các giải pháp phần mềm của quý công ty!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 sm:p-6 shadow-sm">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--surface-border)] pb-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-1">
            <Zap size={13} />
            <span>Interactive Proof-of-Work Demo</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
            Ma Trận Phân Quyền RBAC & Pipeline Hồ Sơ Doanh Nghiệp (FPT IS Real-World)
          </h4>
          <p className="text-xs text-[var(--muted-foreground)]">
            Mô phỏng quy trình kiểm duyệt đa cấp bậc và quản lý quyền hạn cho hơn 230 người dùng
          </p>
        </div>

        {/* Pitch Button */}
        <button
          onClick={copyToClipboard}
          className="touch-target px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors shadow-sm ml-auto"
        >
          {copiedPitch ? <Check size={14} className="text-white" /> : <Copy size={14} />}
          <span>{copiedPitch ? "Đã Copy Thư Giới Thiệu!" : "Copy Thư Pitch Cho Tech Lead"}</span>
        </button>
      </div>

      {/* Role Switcher Sandbox */}
      <div className="p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)] mb-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-blue-600" />
          <span className="text-xs font-semibold text-[var(--foreground)]">Giả lập Vai Trò (RBAC Switcher):</span>
        </div>

        <div className="flex items-center gap-1.5 bg-[var(--surface)] p-1 rounded-xl border border-[var(--surface-border)]">
          <button
            onClick={() => setCurrentRole("OFFICER")}
            className={`touch-target px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentRole === "OFFICER"
                ? "bg-blue-600 text-white font-semibold"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Nhân Viên Thực Thi
          </button>
          <button
            onClick={() => setCurrentRole("AUDITOR")}
            className={`touch-target px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentRole === "AUDITOR"
                ? "bg-blue-600 text-white font-semibold"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Chuyên Viên Thẩm Định
          </button>
          <button
            onClick={() => setCurrentRole("ADMIN_CEO")}
            className={`touch-target px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentRole === "ADMIN_CEO"
                ? "bg-purple-600 text-white font-semibold"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Admin Ban Giám Đốc
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`mb-4 p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border ${
            feedbackMsg.isError
              ? "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20"
              : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
          }`}
        >
          {feedbackMsg.isError ? <AlertCircle size={14} className="shrink-0" /> : <Zap size={14} className="shrink-0" />}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Cases List */}
      <div className="space-y-3">
        {cases.map((c) => (
          <div
            key={c.id}
            className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)] flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{c.id}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    c.status === "APPROVED"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : c.status === "EXECUTED"
                      ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                      : c.status === "SUBMITTED"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <h5 className="text-xs font-semibold text-[var(--foreground)] mt-1">{c.title}</h5>
              <div className="text-[11px] text-[var(--muted-foreground)] flex items-center gap-2 mt-0.5">
                <Users size={12} />
                <span>{c.officer}</span>
                <span>•</span>
                <span className="font-mono">{c.amount.toLocaleString("vi-VN")} đ</span>
              </div>
            </div>

            {/* Action Buttons with RBAC protection */}
            <div className="flex items-center gap-2">
              {c.status === "DRAFT" && (
                <button
                  onClick={() => handleStatusChange(c.id, "SUBMITTED")}
                  className="touch-target px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Trình Duyệt Hồ Sơ
                </button>
              )}

              {c.status === "SUBMITTED" && (
                <button
                  onClick={() => handleStatusChange(c.id, "APPROVED")}
                  className="touch-target px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1"
                >
                  Phê Duyệt (Cần Thẩm Định)
                </button>
              )}

              {c.status === "APPROVED" && (
                <button
                  onClick={() => handleStatusChange(c.id, "EXECUTED")}
                  className="touch-target px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center gap-1"
                >
                  Ban Hành (Cần Admin)
                </button>
              )}

              {c.status === "EXECUTED" && (
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <Check size={14} /> Đã Thi Hành Xong
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
