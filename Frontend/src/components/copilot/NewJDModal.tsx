"use client";

import { useState } from "react";
import { X, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { JobPosting } from "@/types/job-copilot";
import { parseRawJobText } from "@/lib/careerEngine";

interface NewJDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobAdded: (newJob: JobPosting) => void;
}

export default function NewJDModal({ isOpen, onClose, onJobAdded }: NewJDModalProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rawText, setRawText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const parsed = parseRawJobText(rawText, jobTitle || "Vị Trí Mới Cần Đánh Giá");
      if (companyName) {
        parsed.company = companyName;
        parsed.logoText = companyName.substring(0, 2).toUpperCase();
      }
      onJobAdded(parsed);
      setIsSubmitting(false);
      onClose();
    }, 350);
  };

  const handleSamplePaste = () => {
    setJobTitle("Senior Fullstack Developer (Next.js, Microservices)");
    setCompanyName("MoMo Financial Services");
    setRawText(`MoMo đang tìm kiếm Senior Fullstack Developer:
- Bắt buộc thành thạo React, Next.js App Router, TypeScript và Tailwind CSS.
- Có kinh nghiệm với Node.js, RESTful API và cơ sở dữ liệu PostgreSQL.
- Ưu tiên ứng viên có kiến thức về Redis Caching, RabbitMQ và bảo mật cổng thanh toán.
- Yêu cầu tối thiểu 2-4 năm kinh nghiệm làm việc thực tế.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3.5 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">Dán & Phân Tích JD Mới</h3>
              <p className="text-xs text-[var(--muted-foreground)]">
                Bóc tách tự động yêu cầu kỹ thuật & đo lường % độ phù hợp với CV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="touch-target w-8 h-8 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Tên Vị Trí (Tuỳ chọn)
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="VD: Fullstack React / Node.js"
                className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--surface-subtle)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Tên Công Ty (Tuỳ chọn)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="VD: VNG / MoMo / FPT"
                className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--surface-subtle)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[var(--foreground)]">
                Nội Dung JD Hoặc Mô Tả Tuyển Dụng <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleSamplePaste}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
              >
                <FileText size={12} /> Dán nội dung mẫu MoMo
              </button>
            </div>
            <textarea
              required
              rows={6}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Dán toàn bộ nội dung tuyển dụng từ ITviec, TopCV, LinkedIn vào đây..."
              className="w-full px-3 py-2.5 rounded-xl text-xs bg-[var(--surface-subtle)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500 font-mono leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[var(--surface-border)]">
            <button
              type="button"
              onClick={onClose}
              className="touch-target px-4 py-2 rounded-xl text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !rawText.trim()}
              className="touch-target px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
            >
              <CheckCircle2 size={14} />
              <span>{isSubmitting ? "Đang Bóc Tách..." : "Phân Tích Ngay"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
