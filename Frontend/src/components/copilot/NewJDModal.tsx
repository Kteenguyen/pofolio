"use client";

import { useState } from "react";
import { X, Sparkles, FileText, CheckCircle2, Globe, Link2, DollarSign } from "lucide-react";
import { JobPosting, WorkMode, TargetMarket } from "@/types/job-copilot";
import { parseRawJobText } from "@/lib/careerEngine";

interface NewJDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobAdded: (newJob: JobPosting) => void;
}

export default function NewJDModal({ isOpen, onClose, onJobAdded }: NewJDModalProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [workMode, setWorkMode] = useState<WorkMode>("Remote 100%");
  const [market, setMarket] = useState<TargetMarket>("Global / Quốc Tế");
  const [rawText, setRawText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const parsed = parseRawJobText(
        rawText,
        jobTitle || "Vị Trí Mới Cần Đánh Giá",
        jobUrl,
        workMode,
        market
      );
      if (companyName) {
        parsed.company = companyName;
        parsed.logoText = companyName.substring(0, 2).toUpperCase();
      }
      onJobAdded(parsed);
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  const handleSampleGlobalRemote = () => {
    setJobTitle("Full-Stack Next.js / TypeScript Engineer");
    setCompanyName("Vercel Ecosystem Partner");
    setJobUrl("https://remoteok.com/remote-jobs/remote-full-stack-developer-nextjs-typescript");
    setWorkMode("Remote 100%");
    setMarket("Global / Quốc Tế");
    setRawText(`Looking for a Full-Stack Next.js & TypeScript Engineer:
- 100% Worldwide Remote, USD $3,500 - $5,000 / month.
- Deep expertise in Next.js 15 App Router, React 19, Server Components and Tailwind CSS.
- Production experience with PostgreSQL, Prisma, Redis Caching.
- Strong written English communication for asynchronous workflows.`);
  };

  const handleSampleFreelance = () => {
    setJobTitle("Front-End React & Tailwind Dashboard (3-Month Sprint)");
    setCompanyName("Fintech US Client via Upwork");
    setJobUrl("https://www.upwork.com/freelance-jobs/react-nextjs-tailwind-dashboard/");
    setWorkMode("Freelance / Contract");
    setMarket("Global / Quốc Tế");
    setRawText(`Upwork Enterprise Project ($40 - $60 / hour):
- Build interactive merchant financial dashboard with real-time audit ledger.
- Zero-CLS optimistic checkout flow.
- Fast milestone delivery within 90 days.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-2xl p-4 sm:p-6 my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3 mb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">Dán & Phân Tích JD Mới (Toàn Cầu / VN)</h3>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                Tự động bóc tách yêu cầu, kiểm tra độ phù hợp CV và lưu Deep Link ứng tuyển
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

        {/* Quick Sample Presets */}
        <div className="mb-3.5 flex flex-wrap gap-2">
          <span className="text-[11px] font-semibold text-[var(--foreground)] self-center">Chọn nhanh mẫu test:</span>
          <button
            type="button"
            onClick={handleSampleGlobalRemote}
            className="touch-target px-2.5 py-1 rounded-lg text-[11px] font-medium bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors flex items-center gap-1"
          >
            <Globe size={12} /> Global Remote US ($4.5k)
          </button>
          <button
            type="button"
            onClick={handleSampleFreelance}
            className="touch-target px-2.5 py-1 rounded-lg text-[11px] font-medium bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
          >
            <DollarSign size={12} /> Upwork Freelance ($50/h)
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Tên Vị Trí
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="VD: Senior Next.js Developer"
                className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--surface-subtle)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Tên Công Ty / Khách Hàng
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="VD: RemoteOK / Upwork Client"
                className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--surface-subtle)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Deep Link URL Input */}
          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1 flex items-center gap-1">
              <Link2 size={13} className="text-blue-600" />
              <span>Link Bài Đăng Tuyển Dụng Thật (Deep Link URL)</span>
            </label>
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://remoteok.com/remote-jobs/... hoặc https://itviec.com/it-jobs/..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--surface-subtle)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500 font-mono text-[11px]"
            />
          </div>

          {/* Work Mode & Market Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Hình Thức Làm Việc
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--surface-subtle)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500"
              >
                <option value="Remote 100%">🌐 100% Remote Toàn Cầu</option>
                <option value="Freelance / Contract">💼 Freelance / Khoán Hợp Đồng</option>
                <option value="Hybrid">🏢 Hybrid (Linh Hoạt Văn Phòng)</option>
                <option value="Onsite">🏛️ Onsite Doanh Nghiệp</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Thị Trường & Tiền Tệ
              </label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value as TargetMarket)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--surface-subtle)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500"
              >
                <option value="Global / Quốc Tế">🌏 Thị Trường Quốc Tế (USD $)</option>
                <option value="Việt Nam">🇻🇳 Thị Trường Việt Nam (VNĐ)</option>
              </select>
            </div>
          </div>

          {/* Raw JD Text */}
          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              Nội Dung JD Hoặc Mô Tả Tuyển Dụng <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Dán toàn bộ nội dung tuyển dụng từ RemoteOK, Upwork, Wellfound, ITviec, TopCV, LinkedIn..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-[var(--surface-subtle)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500 font-mono leading-relaxed"
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
              <span>{isSubmitting ? "Đang Bóc Tách..." : "Phân Tích & Lưu Deep Link"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
