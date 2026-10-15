"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
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
import { useLanguage } from "@/context/LanguageContext";

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
  defaultRole,
}: InterviewModalProps) {
  const { data, ui, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"interview" | "contact">(initialTab);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const initialRole = defaultRole || (locale === "en" ? "Software Engineer / AI Agentic" : "Cử Nhân Kỹ Thuật Phần Mềm / AI Agentic");

  // Form data for Interview
  const [interviewForm, setInterviewForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    role: initialRole,
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
    navigator.clipboard.writeText(data.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleCopyDraft = () => {
    let textToCopy = "";
    if (activeTab === "interview") {
      textToCopy = `[Interview Request - Ktee]\nSender: ${interviewForm.name || "Recruiter"}\nCompany: ${interviewForm.company || "Enterprise"}\nEmail: ${interviewForm.email}\nPhone: ${interviewForm.phone}\nRole: ${interviewForm.role}\nFormat: ${interviewForm.meetingType}\nMessage: ${interviewForm.message || "Interview discussion"}`;
    } else {
      textToCopy = `[Callback Request - Ktee]\nContact: ${quickPhoneForm.name || "Recruiter"}\nPhone: ${quickPhoneForm.phone}\nNote: ${quickPhoneForm.note || "Callback request"}`;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const getMailtoUrl = () => {
    if (activeTab === "interview") {
      const subject = encodeURIComponent(
        `[Interview Request] ${interviewForm.name ? `${interviewForm.name} - ` : ""}${interviewForm.company || "Enterprise"} connecting with Ktee`
      );
      const body = encodeURIComponent(
        `Hi Ktee (Nguyen Khoa Tai),\n\nWe are interested in your profile for: ${interviewForm.role}.\nFormat: ${interviewForm.meetingType}\nContact: ${interviewForm.name}\nEmail: ${interviewForm.email}\nPhone: ${interviewForm.phone}\n\nMessage:\n${interviewForm.message || "We would like to invite you for an interview."}\n\nBest regards!`
      );
      return `mailto:${data.personal.email}?subject=${subject}&body=${body}`;
    } else {
      const subject = encodeURIComponent(
        `[Callback Request] ${quickPhoneForm.name || "Recruiter"} left phone number`
      );
      const body = encodeURIComponent(
        `Hi Ktee,\n\nPlease call me back at: ${quickPhoneForm.phone}\nName: ${quickPhoneForm.name}\nNote: ${quickPhoneForm.note || "Discuss opportunity"}\n\nThank you!`
      );
      return `mailto:${data.personal.email}?subject=${subject}&body=${body}`;
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
            name: quickPhoneForm.name || (locale === "en" ? "Quick Call Visitor" : "Khách gọi nhanh"),
            phone: quickPhoneForm.phone,
            message: quickPhoneForm.note || (locale === "en" ? "Callback requested" : "Để lại số điện thoại yêu cầu gọi lại"),
            type: "quick_callback",
          };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setSubmitted(true);
      } else {
        setErrorState(
          resData.message || (locale === "en" ? "Failed to connect to server. Please use fallback options below." : "Không thể gửi dữ liệu trực tiếp lên máy chủ. Bạn có thể sử dụng các kênh dự phòng bên dưới.")
        );
      }
    } catch {
      setErrorState(
        locale === "en"
          ? "Network connection interrupted. Direct fallback channels are available below."
          : "Kết nối mạng gián đoạn. Ktee đã sẵn sàng kênh dự phòng, bạn có thể gọi trực tiếp hoặc gửi email bên dưới."
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
      role: initialRole,
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
                alt={data.personal.name}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover object-top avatar-glow-sky"
              />
              <span
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[var(--surface)]"
                title="Verified Ktee Identity"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 id="interview-modal-title" className="text-sm sm:text-base font-black tracking-tight">
                  {activeTab === "interview" ? ui.interviewTitle : (locale === "en" ? "Direct Callback Request" : "Để Lại Số Liên Lạc Nhanh")}
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                  {locale === "en" ? "Response < 2h" : "Phản Hồi < 2h"}
                </span>
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                {data.personal.name} • {data.personal.degreeLabel}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.closeModal}
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
            <span>{ui.interviewTabInterview}</span>
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
            <span>{ui.interviewTabPhone}</span>
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
                    ? (locale === "en" ? "Interview Invitation Received!" : "Đã Tiếp Nhận Lời Mời Phỏng Vấn!")
                    : (locale === "en" ? "Phone Number Received!" : "Đã Tiếp Nhận Số Điện Thoại Của Bạn!")}
                </h4>
                <p className="text-xs text-emerald-800/90 dark:text-emerald-300 leading-relaxed">
                  {locale === "en"
                    ? "Your information has been routed directly into Ktee's system. Ktee will reply via Email or Phone within 2 business hours."
                    : "Thông tin của Quý Anh/Chị đã được chuyển trực tiếp vào hệ thống của Ktee. Ktee sẽ chủ động liên hệ phản hồi qua Email hoặc Số điện thoại trong vòng 2 giờ làm việc."}
                </p>
              </div>

              {/* Direct Quick Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${data.personal.phone}`}
                  className="touch-target flex-1 min-h-[44px] px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone size={15} />
                  <span>{locale === "en" ? `Call Directly (${data.personal.phone})` : `Gọi Ngay (${data.personal.phone})`}</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="touch-target flex-1 min-h-[44px] px-3 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 font-semibold text-xs hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  {ui.contactSendAnother}
                </button>
              </div>
            </div>
          ) : activeTab === "interview" ? (
            /* Tab 1: Detailed Interview Form */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorState && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>{errorState}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                    {locale === "en" ? "Contact Person Full Name:" : "Họ và tên Người liên hệ:"} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={interviewForm.name}
                      onChange={(e) => setInterviewForm({ ...interviewForm, name: e.target.value })}
                      placeholder={locale === "en" ? "John Doe / Tech Recruiter..." : "Nguyễn Văn A / Lead HR..."}
                      className="touch-target w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm"
                    />
                    <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                    {locale === "en" ? "Company / Enterprise Name:" : "Tên Công ty / Doanh nghiệp:"} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={interviewForm.company}
                      onChange={(e) => setInterviewForm({ ...interviewForm, company: e.target.value })}
                      placeholder={locale === "en" ? "Tech Corp..." : "Công ty Công nghệ ABC..."}
                      className="touch-target w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm"
                    />
                    <Building2 size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                    {locale === "en" ? "Official Contact Email:" : "Email nhận lịch hẹn:"} <span className="text-rose-500">*</span>
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
                    {locale === "en" ? "Contact Phone Number:" : "Số điện thoại liên hệ:"} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={interviewForm.phone}
                      onChange={(e) => setInterviewForm({ ...interviewForm, phone: e.target.value })}
                      placeholder="0901234567..."
                      className="touch-target w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm font-mono"
                    />
                    <Phone size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                  {locale === "en" ? "Position / Opportunity:" : "Vị trí tuyển dụng / Dự án trao đổi:"}
                </label>
                <input
                  type="text"
                  value={interviewForm.role}
                  onChange={(e) => setInterviewForm({ ...interviewForm, role: e.target.value })}
                  placeholder={initialRole}
                  className="touch-target w-full px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm font-semibold text-blue-600 dark:text-sky-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                  {locale === "en" ? "Brief Note / Interview Schedule:" : "Ghi chú nhanh / Lịch hẹn mong muốn:"}
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={interviewForm.message}
                    onChange={(e) => setInterviewForm({ ...interviewForm, message: e.target.value })}
                    placeholder={locale === "en" ? "E.g.: Schedule Google Meet on Tuesday 14:00..." : "Ví dụ: Trao đổi online qua Google Meet chiều thứ Ba tuần tới lúc 14h00..."}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 resize-none shadow-sm"
                  />
                  <MessageSquare size={14} className="absolute left-2.5 top-3 text-[var(--muted-foreground)]" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="touch-target w-full min-h-[46px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                <Send size={15} />
                <span>{loading ? "..." : ui.interviewSubmitBtn}</span>
              </button>
            </form>
          ) : (
            /* Tab 2: Quick Phone / Callback Form */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                  {locale === "en" ? "Your Phone Number for Ktee Callback:" : "Số điện thoại của Quý Anh/Chị để Ktee gọi lại:"} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={quickPhoneForm.phone}
                    onChange={(e) => setQuickPhoneForm({ ...quickPhoneForm, phone: e.target.value })}
                    placeholder="090xxxxxxx..."
                    className="touch-target w-full pl-8 pr-3 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm font-mono"
                  />
                  <Phone size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                  {locale === "en" ? "Full Name or Company (Optional):" : "Họ tên hoặc Tên Công ty (tùy chọn):"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={quickPhoneForm.name}
                    onChange={(e) => setQuickPhoneForm({ ...quickPhoneForm, name: e.target.value })}
                    placeholder={locale === "en" ? "Company name or contact name..." : "Tên công ty hoặc tên người liên hệ..."}
                    className="touch-target w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 shadow-sm"
                  />
                  <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--muted-foreground)] mb-1">
                  {locale === "en" ? "Brief Note:" : "Nội dung vắn tắt:"}
                </label>
                <textarea
                  rows={2}
                  value={quickPhoneForm.note}
                  onChange={(e) => setQuickPhoneForm({ ...quickPhoneForm, note: e.target.value })}
                  placeholder={locale === "en" ? "E.g.: Discuss Fullstack Developer opportunity..." : "Ví dụ: Liên hệ trao đổi vị trí Fullstack Developer..."}
                  className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)]/60 focus:outline-none focus:border-sky-500 resize-none shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="touch-target w-full min-h-[46px] rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                <Send size={15} />
                <span>{loading ? "..." : ui.interviewSubmitPhoneBtn}</span>
              </button>
            </form>
          )}

          {/* SAFE FALLBACK CHANNELS: 1-Tap Direct Options */}
          <div className="pt-3 border-t border-[var(--surface-border)] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted-foreground)]">
              <span>{locale === "en" ? "// SAFE DIRECT FALLBACK CHANNELS (1-TAP)" : "// KÊNH LIÊN HỆ DỰ PHÒNG AN TOÀN (1-CHẠM)"}</span>
              <span className="text-sky-600 dark:text-sky-400 font-semibold">{locale === "en" ? "Instant" : "Tức thì"}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${data.personal.phone}`}
                className="touch-target min-h-[44px] p-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 text-[var(--foreground)] font-semibold text-[11px] flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all text-center"
              >
                <Phone size={14} className="text-emerald-500 shrink-0" />
                <span className="truncate w-full">{locale === "en" ? "Direct Call" : "Gọi Điện"}</span>
              </a>

              <a
                href={getMailtoUrl()}
                className="touch-target min-h-[44px] p-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 text-[var(--foreground)] font-semibold text-[11px] flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all text-center"
              >
                <Mail size={14} className="text-indigo-500 shrink-0" />
                <span className="truncate w-full">{locale === "en" ? "Send Email" : "Mở Email"}</span>
              </a>

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
                    <span className="text-emerald-600 dark:text-emerald-400 truncate w-full">{ui.contactCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-sky-500 shrink-0" />
                    <span className="truncate w-full">{ui.contactCopy}</span>
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
            <span>{locale === "en" ? "Ready for interview discussions" : "Sẵn sàng tiếp nhận phỏng vấn ngay"}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline px-2 py-1 cursor-pointer"
          >
            {ui.closeModal}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
