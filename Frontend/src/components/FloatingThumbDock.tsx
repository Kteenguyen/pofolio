"use client";

import React, { useState } from "react";
import { FileDown, Send, Sparkles } from "lucide-react";
import CVDownloadModal from "./CVDownloadModal";

export default function FloatingThumbDock() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Sticky Bottom Thumb Dock (Mobile Only) */}
      <aside
        aria-label="Thanh công cụ chuyển đổi nhanh ngón tay cái"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)]/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-[var(--surface-border)] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-3 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-[430px] mx-auto flex items-center gap-2">
          {/* Primary Action (60% Width): 1-Tap CV Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
            className="touch-target flex-[3] min-h-[48px] px-3.5 rounded-xl bg-sky-600 active:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <FileDown size={17} className="shrink-0" />
            <span className="whitespace-nowrap">Tải Hồ Sơ CV (PDF)</span>
          </button>

          {/* Secondary Action (40% Width): Direct Chat / Contact */}
          <a
            href="https://t.me/kteenguyen"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target flex-[2] min-h-[48px] px-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] active:bg-[var(--surface)] text-[var(--foreground)] font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
          >
            <Send size={15} className="text-sky-500 shrink-0" />
            <span className="truncate">Telegram</span>
          </a>
        </div>
      </aside>

      {/* CV Download Modal Sheet */}
      <CVDownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
