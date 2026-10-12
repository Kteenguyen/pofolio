"use client";

import { useState } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import StatsCounter from "./StatsCounter";
import CVDownloadModal from "./CVDownloadModal";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Terminal,
  MapPin,
  CheckCircle2,
  FileDown,
  Briefcase,
  FolderGit2,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-[#0b0f19] dark:to-slate-950">
      {/* Decorative ambient subtle background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-72 sm:h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="portfolio-container">
        {/* Main Hero Profile Grid (12 cols on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography, Bio, Credentials, Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-xs font-medium text-[var(--foreground)] mb-4 shadow-sm flex-wrap">
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

            {/* Engineer Title & University Badge */}
            <div className="flex items-center gap-2 text-blue-600 dark:text-sky-400 font-mono text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3 flex-wrap">
              <Sparkles size={16} className="shrink-0" />
              <span>{portfolioData.personal.degreeLabel} • {portfolioData.personal.name}</span>
            </div>

            {/* Big Headline */}
            <h1 className="hero-headline font-black text-[var(--foreground)] tracking-tight max-w-2xl">
              Nền tảng Kỹ thuật bài bản, <br className="hidden sm:inline" />
              <span className="text-blue-600 dark:text-sky-400">
                Kiến tạo giải pháp phần mềm thực chiến.
              </span>
            </h1>

            {/* Subheadline Bio */}
            <p className="hero-subheadline text-[var(--muted-foreground)] mt-4 sm:mt-5 max-w-2xl font-normal leading-relaxed">
              {portfolioData.personal.bio}
            </p>

            {/* Fast Credentials Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-5 text-xs text-[var(--muted-foreground)] font-medium">
              <span className="flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-xl border border-[var(--surface-border)] shadow-sm">
                <GraduationCap size={15} className="text-blue-600 dark:text-sky-400 shrink-0" />
                <span>ĐH Tôn Đức Thắng (2021 – 2026)</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-xl border border-[var(--surface-border)] shadow-sm">
                <CheckCircle2 size={15} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>FPT IS Trưởng Nhóm Triển Khai (230 Cán Bộ)</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-xl border border-[var(--surface-border)] shadow-sm">
                <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Luklak Web Cinematic 60 FPS</span>
              </span>
            </div>

            {/* Action Buttons Group (No overflow, touch target >= 44px, flex-wrap) */}
            <div className="button-group-responsive mt-7 flex flex-wrap gap-2.5 sm:gap-3 w-full">
              <Link
                href="/copilot"
                className="touch-target px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles size={16} className="text-amber-300 animate-pulse shrink-0" />
                <span>⚡ AI Career Copilot</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>

              <button
                onClick={() => setCvModalOpen(true)}
                className="touch-target px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white shadow-md hover:bg-emerald-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileDown size={16} className="shrink-0" />
                <span>Tải Hồ Sơ CV (PDF)</span>
              </button>

              <a
                href="#projects"
                className="touch-target px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
              >
                <FolderGit2 size={15} className="text-blue-600 dark:text-sky-400 shrink-0" />
                <span>Kho 6 Dự Án</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
              </a>

              <a
                href="#education"
                className="touch-target px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <GraduationCap size={15} className="text-blue-600 dark:text-sky-400 shrink-0" />
                <span>Học Vấn 5 Năm</span>
              </a>

              <a
                href="#experience"
                className="touch-target px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Briefcase size={15} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Kinh Nghiệm Thực Chiến</span>
              </a>

              <a
                href="#terminal"
                className="touch-target px-4 py-3 rounded-xl text-xs sm:text-sm font-mono border border-[var(--surface-border)] bg-[var(--surface)] text-blue-600 dark:text-sky-400 hover:border-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Terminal size={15} className="shrink-0" />
                <span>CLI Terminal</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Profile Card with Portrait Image /avatar.jpg */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <div className="card-glass rounded-3xl p-5 sm:p-6 border border-blue-200/80 dark:border-blue-900/50 shadow-xl relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-blue-50/20 dark:from-[var(--surface)] dark:via-[var(--surface)] dark:to-blue-950/20 group">
              
              {/* Card Top Pill: Verified Identity */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--surface-border)]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-sky-300 text-xs font-bold border border-blue-500/20">
                  <ShieldCheck size={14} className="text-blue-600 dark:text-sky-400" />
                  <span>Verified Identity • Ktee</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>ĐH Tôn Đức Thắng</span>
                </div>
              </div>

              {/* Portrait Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-900 group-hover:shadow-blue-500/10 transition-shadow">
                <img
                  src="/avatar.jpg"
                  alt="Kỹ sư Nguyễn Khoa Tài (Ktee)"
                  className="w-full aspect-[4/4.2] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
                
                {/* Floating Role Badge over Image bottom */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">Nguyễn Khoa Tài (Ktee)</p>
                    <p className="text-[10px] text-slate-300 truncate">Software Engineer • BA Lead</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-blue-600 text-white">
                    5 Năm TDTU
                  </span>
                </div>
              </div>

              {/* Quick Info & Action Bar */}
              <div className="mt-4 pt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)]">
                    <span className="text-[10px] text-[var(--muted-foreground)] block">Triển Khai THADS</span>
                    <span className="font-bold text-[var(--foreground)]">230+ Cán Bộ</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)]">
                    <span className="text-[10px] text-[var(--muted-foreground)] block">Tốt Nghiệp Kỹ Sư</span>
                    <span className="font-bold text-[var(--foreground)]">Khoa CNTT TDTU</span>
                  </div>
                </div>

                {/* Profile Card Footer Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setCvModalOpen(true)}
                    className="touch-target flex-1 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <FileDown size={14} />
                    <span>Tải CV PDF (4 Bản)</span>
                  </button>
                  <Link
                    href="/contact"
                    className="touch-target px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Liên Hệ</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Verified Metrics Counter Cards */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-[var(--surface-border)]">
          <div className="flex items-center justify-between mb-4">
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
