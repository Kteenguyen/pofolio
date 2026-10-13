"use client";

import { useState } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import StatsCounter from "./StatsCounter";
import CVDownloadModal from "./CVDownloadModal";
import {
  Code2,
  ArrowRight,
  GraduationCap,
  Mail,
  MapPin,
  CheckCircle2,
  FileDown,
  Briefcase,
  FolderGit2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Hero() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <section className="pt-8 pb-10 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-18 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-[#0b0f19] dark:to-slate-950">
      {/* Decorative ambient subtle background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-72 sm:h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="portfolio-container">
        {/* Main Hero Profile Grid (12 cols on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Column: Typography, Bio, Credentials, Action Buttons (On the right on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[11px] sm:text-xs font-medium text-[var(--foreground)] mb-3 sm:mb-4 shadow-xs flex-wrap">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                {portfolioData.personal.statusText}
              </span>
              <span className="text-[var(--muted)] hidden sm:inline">|</span>
              <span className="flex items-center gap-1 text-[var(--muted-foreground)] shrink-0">
                <MapPin size={12} /> {portfolioData.personal.location}
              </span>
            </div>

            {/* Engineer Title & University Badges - Anti-Wrapping Chip Architecture */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-sky-300 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-blue-200/80 dark:border-blue-900/60">
                <Code2 size={13} className="text-blue-600 dark:text-sky-400 shrink-0" />
                <span>Cử Nhân Kỹ Thuật Phần Mềm</span>
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--surface)] text-[var(--muted-foreground)] font-mono text-[11px] sm:text-xs font-medium border border-[var(--surface-border)]">
                ĐH Tôn Đức Thắng (GPA 3.0)
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--surface)] text-[var(--foreground)] font-mono text-[11px] sm:text-xs font-bold border border-[var(--surface-border)]">
                Nguyễn Khoa Tài
              </span>
            </div>

            {/* Big Headline */}
            <h1 className="hero-headline font-black text-[var(--foreground)] tracking-tight max-w-2xl">
              Nền tảng Kỹ thuật bài bản, <br className="hidden sm:inline" />
              <span className="text-blue-600 dark:text-sky-400">
                Kiến tạo giải pháp phần mềm thực chiến.
              </span>
            </h1>

            {/* Subheadline Bio */}
            <p className="hero-subheadline text-[var(--muted-foreground)] mt-3 sm:mt-4 max-w-2xl font-normal leading-relaxed text-xs sm:text-sm lg:text-base">
              {portfolioData.personal.bio}
            </p>

            {/* Fast Credentials Row */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 mt-4 sm:mt-5 text-[11px] sm:text-xs text-[var(--muted-foreground)] font-medium">
              <span className="flex items-center gap-1.5 bg-[var(--surface)] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[var(--surface-border)] shadow-xs">
                <GraduationCap size={14} className="text-blue-600 dark:text-sky-400 shrink-0" />
                <span>ĐH Tôn Đức Thắng (GPA 3.0)</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[var(--surface)] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[var(--surface-border)] shadow-xs">
                <Zap size={14} className="text-sky-600 dark:text-sky-400 shrink-0" />
                <span>PowerTech Next.js 15 (PageSpeed 96)</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[var(--surface)] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[var(--surface-border)] shadow-xs">
                <CheckCircle2 size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>FPT IS (10/25–02/26 • 230+ Cán Bộ)</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[var(--surface)] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[var(--surface-border)] shadow-xs">
                <CheckCircle2 size={14} className="text-purple-600 dark:text-purple-400 shrink-0" />
                <span>HomeNest BA (03–06/2026)</span>
              </span>
            </div>

            {/* Primary Action Buttons (2 buttons side-by-side or stacked on tiny mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mt-5 sm:mt-7">
              <a
                href="#projects"
                className="touch-target w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <FolderGit2 size={16} className="text-white shrink-0" />
                <span>Xem 6 Dự Án Tiêu Biểu</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform shrink-0" />
              </a>

              <button
                onClick={() => setCvModalOpen(true)}
                className="touch-target w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white shadow-md hover:bg-emerald-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileDown size={16} className="shrink-0" />
                <span>Tải Hồ Sơ CV (PDF)</span>
              </button>
            </div>

            {/* Secondary Section Shortcut Chips (2 cols on mobile for generous text width) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 mt-3 w-full">
              <a
                href="#experience"
                className="touch-target px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <Briefcase size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Line Kinh Nghiệm</span>
              </a>

              <a
                href="#projects"
                className="touch-target px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <FolderGit2 size={14} className="text-blue-600 dark:text-sky-400 shrink-0" />
                <span>6 Dự Án</span>
              </a>

              <a
                href="#education"
                className="touch-target px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <GraduationCap size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Học Vấn 5 Năm</span>
              </a>

              <a
                href="#contact"
                className="touch-target px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <Mail size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Liên Hệ</span>
              </a>
            </div>
          </div>

          {/* Column: Hero Profile Card with Portrait Image /avatar.jpg (On the left on desktop) */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none order-2 lg:order-1 mt-4 lg:mt-0">
            <div className="card-glass rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-blue-200/80 dark:border-blue-900/50 shadow-xl relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-blue-50/20 dark:from-[var(--surface)] dark:via-[var(--surface)] dark:to-blue-950/20 group">
              
              {/* Portrait Image Frame - Hiển thị 100% trọn vẹn ảnh chân dung gốc, không cắt xén, không có dòng đè phía trên */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-900 group-hover:shadow-blue-500/10 transition-shadow">
                <img
                  src="/avatar.jpg"
                  alt="Nguyễn Khoa Tài (Ktee) - Cử Nhân Kỹ Thuật Phần Mềm"
                  className="w-full h-auto aspect-[1707/2560] object-cover block group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Thông tin & CTA Action theo đúng chỉ đạo:
                  1. Ở dưới: Năm học 2021 - 2026
                  2. Ở dưới nữa: 5+ dự án freelance thực chiến
                  3. Cuối cùng: 2 nút CTA xem CV và liên hệ */}
              <div className="mt-3.5 space-y-2.5">
                {/* 1. Ở dưới: Năm học 2021 - 2026 */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)] flex items-center justify-between transition-colors hover:border-blue-500/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <GraduationCap size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono text-[var(--muted-foreground)] tracking-wider block truncate">
                        Khoa CNTT • ĐH Tôn Đức Thắng
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-[var(--foreground)] truncate block">
                        Năm học 2021 – 2026
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800 shrink-0">
                    Cử Nhân KTPM
                  </span>
                </div>

                {/* 2. Ở dưới nữa: 5+ dự án freelance thực chiến */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)] flex items-center justify-between transition-colors hover:border-emerald-500/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Briefcase size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono text-[var(--muted-foreground)] tracking-wider block truncate">
                        Kinh Nghiệm Triển Khai Thực Tế
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-[var(--foreground)] truncate block">
                        5+ Dự Án Freelance Thực Chiến
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    Thực Chiến
                  </span>
                </div>

                {/* 3. Cuối cùng mới 2 nút CTA liên hệ với xem CV */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setCvModalOpen(true)}
                    className="touch-target w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <FileDown size={14} className="shrink-0" />
                    <span className="truncate">Xem CV</span>
                  </button>
                  <Link
                    href="/contact"
                    className="touch-target w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span className="truncate">Liên Hệ</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Verified Metrics Counter Cards */}
        <div className="mt-8 sm:mt-12 lg:mt-14 pt-6 sm:pt-8 border-t border-[var(--surface-border)]">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="text-xs font-mono font-semibold text-blue-600 dark:text-sky-400 uppercase tracking-widest">
              // CHỈ SỐ NĂNG LỰC ĐÃ ĐỐI SOÁT & XÁC THỰC
            </div>
            <span className="text-[11px] font-mono text-[var(--muted-foreground)] hidden sm:inline">
              FPT IS • Luklak • PowerTech • TDTU
            </span>
          </div>
          <StatsCounter />
        </div>
      </div>

      {/* CV Download Modal */}
      <CVDownloadModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </section>
  );
}
