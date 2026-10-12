"use client";

import React, { useEffect } from "react";
import { X, FileText, Download, CheckCircle2 } from "lucide-react";

interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CV_LIST = [
  {
    id: "frontend",
    title: "Front-End Software Engineer",
    subtitle: "ReactJS, Next.js 15, TypeScript, Tailwind, WebGL",
    filename: "Front-end.pdf",
    href: "/cv/Front-end.pdf",
    badge: "Thực Chiến Luklak & FPT",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-sky-400 border-blue-500/20",
  },
  {
    id: "ba",
    title: "Chuyên Viên Phân Tích Nghiệp Vụ (BA)",
    subtitle: "UML, SRS, User Stories, UAT, TDTU 8.1/10",
    filename: "BA.pdf",
    href: "/cv/BA.pdf",
    badge: "Nghiệp Vụ Chuẩn 5 Năm",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  {
    id: "tester",
    title: "Software Tester (QA/QC Engineer)",
    subtitle: "Test Case, Regression, Jira, Selenium, UAT",
    filename: "Tester_en.pdf",
    href: "/cv/Tester_en.pdf",
    badge: "FPT IS 60+ Test Scenarios",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    id: "helpdesk",
    title: "Kỹ Sư Helpdesk & Hệ Thống IT",
    subtitle: "Linux VPS, Windows Server, Mạng, Triển Khai 230 Users",
    filename: "Heldesk_VI.pdf",
    href: "/cv/Heldesk_VI.pdf",
    badge: "Hỗ Trợ Người Dùng FPT",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    id: "seo",
    title: "Chuyên Viên Technical SEO",
    subtitle: "Core Web Vitals, Schema JSON-LD, On-page, Performance",
    filename: "SEO.pdf",
    href: "/cv/SEO.pdf",
    badge: "Tối Ưu 100/100 Lighthouse",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  },
];

export default function CVDownloadModal({ isOpen, onClose }: CVDownloadModalProps) {
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

  if (!isOpen) return null;

  return (
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
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <FileText size={18} />
            </div>
            <div>
              <h3 id="cv-modal-title" className="text-sm sm:text-base font-black tracking-tight">
                Kho 5 Bản CV Chuyên Ngành (PDF)
              </h3>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                Kỹ sư Nguyễn Khoa Tài (Ktee) • ĐH Tôn Đức Thắng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--surface-border)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 divide-y divide-[var(--surface-border)]">
          {CV_LIST.map((cv) => (
            <div key={cv.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold truncate text-[var(--foreground)]">
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
                className="touch-target shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm min-h-[44px]"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Tải PDF</span>
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
    </div>
  );
}
