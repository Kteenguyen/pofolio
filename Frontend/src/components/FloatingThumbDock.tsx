"use client";

import React, { useState } from "react";
import { PhoneCall, CalendarCheck, FileDown } from "lucide-react";
import InterviewModal from "./InterviewModal";
import CVDownloadModal from "./CVDownloadModal";

export default function FloatingThumbDock() {
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"interview" | "contact">("interview");
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleOpenInterview = () => {
    setModalTab("interview");
    setInterviewModalOpen(true);
  };

  const handleOpenContact = () => {
    setModalTab("contact");
    setInterviewModalOpen(true);
  };

  return (
    <>
      {/* Floating Sticky Bottom Thumb Dock (Mobile Only < 768px) */}
      <aside
        aria-label="Thanh công cụ chuyển đổi tuyển dụng ngón tay cái"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)]/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-[var(--surface-border)] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-2.5 pt-2 pb-[max(10px,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-[430px] mx-auto flex items-center gap-2">
          {/* Nút 1: Để Lại Số Liên Lạc / Hotline 0852.723.945 */}
          <button
            type="button"
            onClick={handleOpenContact}
            aria-label="Để lại số liên lạc hoặc gọi ngay cho Ktee"
            className="touch-target flex-1 min-h-[48px] px-2 rounded-xl border border-sky-500/40 bg-sky-50/90 dark:bg-sky-950/60 active:bg-sky-100 dark:active:bg-sky-900/80 text-sky-700 dark:text-sky-300 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shadow-sm select-none"
          >
            <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0">
              <PhoneCall size={13} className="animate-pulse" />
            </div>
            <div className="flex flex-col text-left leading-tight min-w-0">
              <span className="font-extrabold whitespace-nowrap truncate">Để Lại Số</span>
              <span className="text-[9px] font-mono opacity-85 whitespace-nowrap truncate">0852.723.945</span>
            </div>
          </button>

          {/* Nút 2: Mời Phỏng Vấn (15s) - Primary Conversion CTA */}
          <button
            type="button"
            onClick={handleOpenInterview}
            aria-label="Mở form mời phỏng vấn nhanh trong 15 giây"
            className="touch-target flex-[1.25] min-h-[48px] px-3 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 active:from-blue-700 active:to-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25 active:scale-[0.98] transition-all cursor-pointer select-none"
          >
            <CalendarCheck size={16} className="shrink-0" />
            <div className="flex flex-col text-left leading-tight min-w-0">
              <span className="whitespace-nowrap font-black">Mời Phỏng Vấn</span>
              <span className="text-[9px] font-mono text-sky-100 opacity-90 whitespace-nowrap">Form 15s • Ưu tiên</span>
            </div>
          </button>

          {/* Nút 3: Tải CV Kỹ Sư (PDF) */}
          <button
            type="button"
            onClick={() => setCvModalOpen(true)}
            aria-label="Tải Hồ Sơ CV PDF Kỹ Sư Ktee"
            className="touch-target w-11 h-11 min-h-[48px] rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] active:bg-[var(--surface)] text-[var(--foreground)] flex items-center justify-center shrink-0 active:scale-[0.98] transition-all cursor-pointer shadow-sm select-none"
            title="Tải CV Kỹ Sư (PDF)"
          >
            <FileDown size={18} className="text-blue-600 dark:text-sky-400" />
          </button>
        </div>
      </aside>

      {/* Modal Phỏng Vấn & Để Lại Số Liên Lạc */}
      <InterviewModal
        isOpen={interviewModalOpen}
        initialTab={modalTab}
        onClose={() => setInterviewModalOpen(false)}
      />

      {/* Modal Tải CV PDF */}
      <CVDownloadModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </>
  );
}
