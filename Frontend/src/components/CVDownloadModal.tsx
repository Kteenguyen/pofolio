"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FileText, Download, CheckCircle2 } from "lucide-react";

interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CV_LIST = [
  {
    id: "master",
    title: "Master Engineering Dossier (Hồ Sơ Toàn Diện)",
    subtitle: "Creative Technologist • Full-Stack Next.js 15 • Hệ Thống & BA",
    filename: "NguyenKhoaTai_s_CV.pdf",
    href: "/cv/NguyenKhoaTai_s_CV.pdf",
    badge: "Khuyên Dùng Cho Recruiter/CTO",
    badgeColor: "bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30 font-bold",
    isPrimary: true,
  },
  {
    id: "frontend",
    title: "Front-End & Creative WebGL Specialist",
    subtitle: "Next.js 15, Three.js 4D, React 19, TypeScript, Lenis 60 FPS",
    filename: "Front-end.pdf",
    href: "/cv/Front-end.pdf",
    badge: "Thực Chiến Luklak & PowerTech",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-sky-400 border-blue-500/20",
    isPrimary: false,
  },
  {
    id: "ba",
    title: "Chuyên Viên Phân Tích Nghiệp Vụ (BA)",
    subtitle: "BRD, SRS, User Stories, UML Sequence Modeling, UAT",
    filename: "BA.pdf",
    href: "/cv/BA.pdf",
    badge: "Chuẩn Hóa Nghiệp Vụ 5 Năm",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    isPrimary: false,
  },
  {
    id: "tester",
    title: "Software Quality & UAT Testing (QA/QC)",
    subtitle: "Test Case Design, 60+ UAT Scenarios, Jira Bug Lifecycle",
    filename: "Tester_en.pdf",
    href: "/cv/Tester_en.pdf",
    badge: "FPT IS THADS Verification",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    isPrimary: false,
  },
];

export default function CVDownloadModal({ isOpen, onClose }: CVDownloadModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-[var(--surface)] text-[var(--foreground)] rounded-t-2xl sm:rounded-2xl border border-[var(--surface-border)] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--surface-border)] flex items-center justify-between bg-[var(--surface-subtle)]">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src="/avatar.jpg"
                alt="Nguyễn Khoa Tài (Ktee)"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover object-top avatar-glow-sky"
              />
              <span
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[var(--surface)]"
                title="Verified Ktee Identity"
              />
            </div>
            <div>
              <h3 id="cv-modal-title" className="text-sm sm:text-base font-black tracking-tight">
                Hồ Sơ Năng Lực Kỹ Sư & CV Chuyên Ngành (PDF)
              </h3>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                Kỹ sư Nguyễn Khoa Tài (Ktee) • Nền tảng Kỹ thuật 5 Năm TDTU
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--surface-border)] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
          {CV_LIST.map((cv) => (
            <div
              key={cv.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                cv.isPrimary
                  ? "bg-sky-500/10 dark:bg-sky-950/30 border-sky-500/40 shadow-sm ring-1 ring-sky-500/20"
                  : "bg-[var(--surface-subtle)]/70 border-[var(--surface-border)] hover:border-slate-400 dark:hover:border-slate-600"
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold truncate ${cv.isPrimary ? "text-sky-600 dark:text-sky-300 font-black" : "text-[var(--foreground)]"}`}>
                    {cv.title}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${cv.badgeColor}`}>
                    {cv.badge}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] truncate">
                  {cv.subtitle}
                </p>
              </div>

              <a
                href={cv.href}
                download={cv.filename}
                target="_blank"
                rel="noopener noreferrer"
                className={`touch-target shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm min-h-[44px] cursor-pointer transition-colors ${
                  cv.isPrimary
                    ? "bg-sky-600 hover:bg-sky-500 text-white font-bold"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <Download size={14} />
                <span>Tải PDF</span>
              </a>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-[var(--surface-subtle)] border-t border-[var(--surface-border)] flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
            <CheckCircle2 size={13} />
            <span>Dữ liệu chứng thực 100% từ CV gốc</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline px-2 py-1"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
