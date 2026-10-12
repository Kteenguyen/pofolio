import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import StatsCounter from "./StatsCounter";
import { Sparkles, ArrowRight, GraduationCap, Terminal, MapPin, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-[#0b0f19] dark:to-slate-950">
      {/* Decorative ambient subtle background blur - contained within screen */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-72 sm:h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="portfolio-container flex flex-col items-start">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-xs font-medium text-[var(--foreground)] mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">{portfolioData.personal.statusText}</span>
          <span className="text-[var(--muted)]">|</span>
          <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
            <MapPin size={12} /> {portfolioData.personal.location}
          </span>
        </div>

        {/* Engineer Title & University Badge */}
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3">
          <Sparkles size={16} />
          <span>{portfolioData.personal.degreeLabel} • {portfolioData.personal.name}</span>
        </div>

        {/* Big Headline - Apple / Stripe typography */}
        <h1 className="hero-headline font-black text-[var(--foreground)] tracking-tight max-w-4xl">
          Nền tảng Kỹ thuật bài bản, <br className="hidden sm:inline" />
          <span className="text-blue-600 dark:text-sky-400">
            Kiến tạo giải pháp phần mềm thực chiến.
          </span>
        </h1>

        {/* Subheadline Bio */}
        <p className="hero-subheadline text-[var(--muted-foreground)] mt-6 max-w-3xl font-normal">
          {portfolioData.personal.bio}
        </p>

        {/* Fast Credentials Row */}
        <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-[var(--muted-foreground)] font-medium">
          <span className="flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-lg border border-[var(--surface-border)] shadow-sm">
            <GraduationCap size={15} className="text-blue-600 dark:text-blue-400" />
            <span>ĐH Tôn Đức Thắng (2021 – 2026)</span>
          </span>
          <span className="flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-lg border border-[var(--surface-border)] shadow-sm">
            <CheckCircle2 size={15} className="text-indigo-600 dark:text-indigo-400" />
            <span>FPT IS Trưởng Nhóm Triển Khai</span>
          </span>
          <span className="flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-lg border border-[var(--surface-border)] shadow-sm">
            <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
            <span>Luklak Web Cinematic Scroll</span>
          </span>
        </div>

        {/* Action Buttons Group */}
        <div className="button-group-responsive mt-8">
          <Link
            href="/copilot"
            className="touch-target px-6 py-3.5 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Sparkles size={16} className="text-amber-300 animate-pulse" />
            <span>⚡ AI Career Copilot (Thực Chiến)</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#projects"
            className="touch-target px-6 py-3.5 rounded-xl text-sm font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
          >
            <span>Xem 6 Dự Án Tiêu Biểu</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#education"
            className="touch-target px-6 py-3.5 rounded-xl text-sm font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <GraduationCap size={16} className="text-blue-600" />
            <span>Bảng Điểm & Học Vấn TDTU</span>
          </a>

          <a
            href="#terminal"
            className="touch-target px-5 py-3.5 rounded-xl text-sm font-mono border border-[var(--surface-border)] bg-[var(--surface)] text-blue-600 dark:text-blue-400 hover:border-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Terminal size={16} />
            <span>Interactive CLI</span>
          </a>
        </div>

        {/* 4 Stats Cards */}
        <StatsCounter />
      </div>
    </section>
  );
}
