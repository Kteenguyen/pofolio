"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Calendar,
  CalendarCheck,
  Phone,
  PhoneCall,
  Mail,
  Copy,
  Check,
  Send,
  Building2,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "interview" | "contact";
  defaultRole?: string;
}

export default function InterviewModal({
  isOpen,
  onClose,
  initialTab = "interview",
  defaultRole = "Cử Nhân Kỹ Thuật Phần Mềm / AI Agentic",
}: InterviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"interview" | "contact">(initialTab);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Form data for Interview
  const [interviewForm, setInterviewForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    role: defaultRole,
    meetingType: "Online (Google Meet / Zoom)",
    message: "",
  });

  // Form data for Quick Callback / Phone
  const [quickPhoneForm, setQuickPhoneForm] = useState({
    name: "",
    phone: "",
    note: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setErrorState(null);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(portfolioData.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleCopyDraft = () => {
    let textToCopy = "";
    if (activeTab === "interview") {
      textToCopy = `[Lời mời phỏng vấn Ktee]\nNgười gửi: ${interviewForm.name || "Nhà tuyển dụng"}\nĐơn vị: ${interviewForm.company || "Doanh nghiệp"}\nEmail: ${interviewForm.email}\nSĐT: ${interviewForm.phone}\nVị trí: ${interviewForm.role}\nHình thức: ${interviewForm.meetingType}\nNội dung: ${interviewForm.message || "Mời phỏng vấn trao đổi cơ hội"}`;
    } else {
      textToCopy = `[Để lại số liên lạc Ktee]\nNgười liên hệ: ${quickPhoneForm.name || "Nhà tuyển dụng"}\nSố điện thoại: ${quickPhoneForm.phone}\nGhi chú: ${quickPhoneForm.note || "Yêu cầu gọi lại trao đổi"}`;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const getMailtoUrl = () => {
    if (activeTab === "interview") {
      const subject = encodeURIComponent(
        `[Lời mời phỏng vấn] ${interviewForm.name ? `${interviewForm.name} - ` : ""}${interviewForm.company || "Nhà tuyển dụng"} kết nối với Ktee`
      );
      const body = encodeURIComponent(
        `Chào Ktee (Nguyễn Khoa Tài),\n\nChúng tôi quan tâm đến hồ sơ của bạn cho vị trí: ${interviewForm.role}.\n\nHình thức: ${interviewForm.meetingType}\nNgười liên hệ: ${interviewForm.name}\nEmail: ${interviewForm.email}\nSố điện thoại: ${interviewForm.phone}\n\nNội dung trao đổi:\n${interviewForm.message || "Mời bạn tham gia buổi phỏng vấn trao đổi cơ hội hợp tác."}\n\nTrân trọng!`
      );
      return `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
    } else {
      const subject = encodeURIComponent(
        `[Yêu cầu gọi lại] ${quickPhoneForm.name || "Nhà tuyển dụng"} để lại số liên lạc`
      );
      const body = encodeURIComponent(
        `Chào Ktee,\n\nTôi muốn bạn liên hệ lại qua số điện thoại: ${quickPhoneForm.phone}\nHọ tên: ${quickPhoneForm.name}\nGhi chú: ${quickPhoneForm.note || "Trao đổi công việc"}\n\nCảm ơn bạn!`
      );
      return `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorState(null);

    const payload =
      activeTab === "interview"
        ? {
            ...interviewForm,
            type: "interview_schedule",
          }
        : {
            name: quickPhoneForm.name || "Khách gọi nhanh",
            phone: quickPhoneForm.phone,
            message: quickPhoneForm.note || "Để lại số điện thoại yêu cầu gọi lại",
            type: "quick_callback",
          };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorState(
          data.message ||
            "Không thể gửi dữ liệu trực tiếp lên máy chủ. Bạn có thể sử dụng các kênh dự phòng bên dưới."
        );
      }
    } catch {
      setErrorState(
        "Kết nối mạng gián đoạn. Ktee đã sẵn sàng kênh dự phòng, bạn có thể gọi trực tiếp hoặc gửi email bên dưới."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorState(null);
    setInterviewForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      role: defaultRole,
      meetingType: "Online (Google Meet / Zoom)",
      message: "",
    });
    setQuickPhoneForm({
      name: "",
      phone: "",
      note: "",
    });
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="interview-modal-title"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-lg bg-[var(--surface)] text-[var(--foreground)] rounded-t-2xl sm:rounded-2xl border border-[var(--surface-border)] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--surface-border)] flex items-center justify-between bg-[var(--surface-subtle)]">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src="/avatar.jpg"
                alt="Ktee - Nguyễn Khoa Tài"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover object-top avatar-glow-sky"
              />
              <span
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[var(--surface)]"
                title="Sẵn sàng tiếp nhận"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 id="interview-modal-title" className="text-sm sm:text-base font-black tracking-tight">
                  {activeTab === "interview" ? "Mời Phỏng Vấn Với Ktee" : "Để Lại Số Liên Lạc Nhanh"}
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                  Phản Hồi &lt; 2h
                </span>
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                Kỹ sư Nguyễn Khoa Tài • ĐH Tôn Đức Thắng (GPA 3.0 / 4.0)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--surface-border)] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector Header */}
        <div className="px-4 pt-3 pb-0 bg-[var(--surface-subtle)]/50 border-b border-[var(--surface-border)] flex gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("interview");
              setSubmitted(false);
              setErrorState(null);
            }}
            className={`touch-target flex-1 pb-2.5 pt-1 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "interview"
                ? "border-sky-600 text-sky-600 dark:text-sky-400"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            <CalendarCheck size={15} />
            <span>Mời Phỏng Vấn (15s)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("contact");
              setSubmitted(false);
              setErrorState(null);
            }}
            className={`touch-target flex-1 pb-2.5 pt-1 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "contact"
                ? "border-sky-600 text-sky-600 dark:text-sky-400"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            <PhoneCall size={15} />
            <span>Để Lại Số / Hotline</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {submitted ? (
            /* Success Feedback Card */
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 size={26} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-emerald-900 dark:text-emerald-200">
                  {activeTab === "interview"
                    ? "Đã Tiếp Nhận Lời Mời Phỏng Vấn!"
                    : "Đã Tiếp Nhận Số Điện Thoại Của Bạn!"}
                </h4>
                <p className="text-xs text-emerald-800/90 dark:text-emerald-300 leading-relaxed">
                  Thông tin của Quý Anh/Chị đã được chuyển trực tiếp vào hệ thống của Ktee. Ktee sẽ chủ động liên hệ phản hồi qua Email hoặc Số điện thoại trong vòng 2 giờ làm việc.
                </p>
              </div>

              {/* Direct Quick Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="touch-target flex-1 min-h-[44px] px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone size={15} />
                  <span>Gọi Ngay ({portfolioData.personal.phone})</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="touch-target flex-1 min-h-[44px] px-3 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 font-semibold text-xs hover:bg-emerald-50 transition-colors"
                >
                  Gửi thông tin khác
                </button>
              </div>
            </div>
          ) : activeTab === "interview" ? (
            /* Tab 1: Detailed Interview Form */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Error banner if API fails */}
              {errorState && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                  <div className="space-y-1">
                    <p className="font-medium">{errorState}</p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300">
                      Quý Anh/Chị vui lòng bấm gọi hoặc mở email dự phòng bên dưới để không bị gián đoạn.
                    </p>
                  </div>
                </div>
              )}

              {/* Row 1: Name and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                    Họ và tên của Quý Anh/Chị: <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={interviewForm.name}
                      onChange={(e) => setInterviewForm({ ...interviewForm, name: e.target.value })}
                      placeholder="Nguyễn Văn A (HR / Tech Lead)..."
                      className="touch-target w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm"
                    />
                    <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                    Công ty / Đơn vị tuyển dụng:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={interviewForm.company}
                      onChange={(e) => setInterviewForm({ ...interviewForm, company: e.target.value })}
                      placeholder="Tên công ty tuyển dụng..."
                      className="touch-target w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm"
                    />
                    <Building2 size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  </div>
                </div>
              </div>

              {/* Row 2: Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                    Email nhận phản hồi: <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={interviewForm.email}
                      onChange={(e) => setInterviewForm({ ...interviewForm, email: e.target.value })}
                      placeholder="hr@company.com..."
                      className="touch-target w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm"
                    />
                    <Mail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                    Số điện thoại liên hệ:
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={interviewForm.phone}
                      onChange={(e) => setInterviewForm({ ...interviewForm, phone: e.target.value })}
                      placeholder="0901234567..."
                      className="touch-target w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm"
                    />
                    <Phone size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  </div>
                </div>
              </div>

              {/* Row 3: Role and Meeting Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                    Vị trí phỏng vấn / Trao đổi:
                  </label>
                  <select
                    value={interviewForm.role}
                    onChange={(e) => setInterviewForm({ ...interviewForm, role: e.target.value })}
                    className="touch-target w-full px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] focus:outline-none focus:border-sky-500 shadow-sm"
                  >
                    <option value="Cử Nhân Kỹ Thuật Phần Mềm / Fullstack">Cử Nhân Kỹ Thuật Phần Mềm / Fullstack</option>
                    <option value="Front-End Specialist (Next.js / React 19)">Front-End Specialist (Next.js / React 19)</option>
                    <option value="AI Agentic Workflow / MCP Engineer">AI Agentic Workflow / MCP Engineer</option>
                    <option value="Chuyên Viên Phân Tích Nghiệp Vụ (BA)">Chuyên Viên Phân Tích Nghiệp Vụ (BA)</option>
                    <option value="Software Quality / QA UAT Testing">Software Quality / QA UAT Testing</option>
                    <option value="Dự án Freelance / Gia công phần mềm">Dự án Freelance / Gia công phần mềm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                    Hình thức gặp mặt dự kiến:
                  </label>
                  <select
                    value={interviewForm.meetingType}
                    onChange={(e) => setInterviewForm({ ...interviewForm, meetingType: e.target.value })}
                    className="touch-target w-full px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] focus:outline-none focus:border-sky-500 shadow-sm"
                  >
                    <option value="Online (Google Meet / Zoom / Teams)">Online (Google Meet / Zoom / Teams)</option>
                    <option value="Gặp trực tiếp On-site (TP. Hồ Chí Minh)">Gặp trực tiếp On-site (TP. Hồ Chí Minh)</option>
                    <option value="Gọi điện thoại trao đổi sơ bộ">Gọi điện thoại trao đổi sơ bộ</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                  Lời nhắn / Khung giờ thuận tiện:
                </label>
                <textarea
                  rows={2}
                  value={interviewForm.message}
                  onChange={(e) => setInterviewForm({ ...interviewForm, message: e.target.value })}
                  placeholder="Ví dụ: Mời Ktee phỏng vấn lúc 9h30 sáng thứ Năm qua Google Meet..."
                  className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 resize-none shadow-sm"
                />
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="touch-target w-full min-h-[46px] rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                <Send size={15} />
                <span>{loading ? "Đang gửi dữ liệu..." : "Gửi Lời Mời Phỏng Vấn (Tức Thì)"}</span>
              </button>
            </form>
          ) : (
            /* Tab 2: Quick Phone / Callback Form */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Direct Hotline Call Banner */}
              <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <PhoneCall size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-sky-700 dark:text-sky-300 font-semibold uppercase">
                      HOTLINE TRỰC TIẾP
                    </div>
                    <div className="text-sm font-black font-mono text-[var(--foreground)]">
                      0852.723.945
                    </div>
                  </div>
                </div>
                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="touch-target px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <Phone size={14} />
                  <span>Gọi Ngay</span>
                </a>
              </div>

              {/* Error banner if API fails */}
              {errorState && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                  <p className="font-medium">{errorState}</p>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                  Số điện thoại của Quý Anh/Chị để Ktee gọi lại: <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={quickPhoneForm.phone}
                    onChange={(e) => setQuickPhoneForm({ ...quickPhoneForm, phone: e.target.value })}
                    placeholder="Nhập số điện thoại của bạn (090xxxxxxx)..."
                    className="touch-target w-full pl-8 pr-3 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm font-mono"
                  />
                  <Phone size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                  Họ tên hoặc Tên Công ty (tùy chọn):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={quickPhoneForm.name}
                    onChange={(e) => setQuickPhoneForm({ ...quickPhoneForm, name: e.target.value })}
                    placeholder="Tên công ty hoặc tên người liên hệ..."
                    className="touch-target w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm"
                  />
                  <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                  Nội dung vắn tắt:
                </label>
                <textarea
                  rows={2}
                  value={quickPhoneForm.note}
                  onChange={(e) => setQuickPhoneForm({ ...quickPhoneForm, note: e.target.value })}
                  placeholder="Ví dụ: Liên hệ trao đổi vị trí Fullstack Developer..."
                  className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 resize-none shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="touch-target w-full min-h-[46px] rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                <Send size={15} />
                <span>{loading ? "Đang gửi dữ liệu..." : "Yêu Cầu Ktee Gọi Lại Ngay"}</span>
              </button>
            </form>
          )}

          {/* ========================================================================= */}
          {/* SAFE FALLBACK CHANNELS: 1-Tap Direct Options (tel:, mailto:, copy)        */}
          {/* ========================================================================= */}
          <div className="pt-3 border-t border-[var(--surface-border)] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted-foreground)]">
              <span>// KÊNH LIÊN HỆ DỰ PHÒNG AN TOÀN (1-CHẠM)</span>
              <span className="text-sky-600 dark:text-sky-400 font-semibold">Tức thì</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Option 1: tel: Direct Call */}
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="touch-target min-h-[44px] p-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 text-[var(--foreground)] font-semibold text-[11px] flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all text-center"
              >
                <Phone size={14} className="text-emerald-500 shrink-0" />
                <span className="truncate w-full">Gọi Điện</span>
              </a>

              {/* Option 2: mailto: Direct Email */}
              <a
                href={getMailtoUrl()}
                className="touch-target min-h-[44px] p-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 text-[var(--foreground)] font-semibold text-[11px] flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all text-center"
              >
                <Mail size={14} className="text-indigo-500 shrink-0" />
                <span className="truncate w-full">Mở Email</span>
              </a>

              {/* Option 3: Copy Phone / Draft */}
              <button
                type="button"
                onClick={
                  activeTab === "interview"
                    ? interviewForm.name || interviewForm.message
                      ? handleCopyDraft
                      : handleCopyPhone
                    : quickPhoneForm.phone
                    ? handleCopyDraft
                    : handleCopyPhone
                }
                className="touch-target min-h-[44px] p-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 text-[var(--foreground)] font-semibold text-[11px] flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all text-center cursor-pointer"
              >
                {copiedPhone || copiedDraft ? (
                  <>
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400 truncate w-full">Đã Chép</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-sky-500 shrink-0" />
                    <span className="truncate w-full">Sao Chép</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[var(--surface-subtle)] border-t border-[var(--surface-border)] flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-[10px] sm:text-[11px]">
            <CheckCircle2 size={13} />
            <span>Sẵn sàng tiếp nhận phỏng vấn ngay</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline px-2 py-1 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
