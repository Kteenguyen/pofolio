"use client";

import { useState } from "react";
import { portfolioData, Experience as ExperienceType } from "@/data/portfolioData";
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  Building2,
  GraduationCap,
  ExternalLink,
  Sparkles,
  ArrowUpDown,
  Zap,
  Layers,
  ShieldCheck,
  FileSpreadsheet,
  TrendingUp,
} from "lucide-react";

export default function Experience() {
  // Sort order: chronological (2021 -> Nay) or reverse (Nay -> 2021)
  const [sortOrder, setSortOrder] = useState<"chronological" | "reverse">("reverse");
  const [filterType, setFilterType] = useState<"all" | "enterprise" | "education">("all");
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("powertech");

  // Chronological order (2021 -> 10/2025-02/2026 -> 03/2026-06/2026 -> 05/2026 -> 07/2026)
  const chronologicalList: ExperienceType[] = [
    // 1. TDTU 2021 - 2026
    portfolioData.experience.find((e) => e.id === "tdtu-engineering")!,
    // 2. FPT IS 10/2025 - 02/2026
    portfolioData.experience.find((e) => e.id === "fpt-is")!,
    // 3. HomeNest 03/2026 - 06/2026
    portfolioData.experience.find((e) => e.id === "homenest-software")!,
    // 4. Luklak 05/2026
    portfolioData.experience.find((e) => e.id === "luklak-freelance")!,
    // 5. PowerTech 07/2026 - Nay
    portfolioData.experience.find((e) => e.id === "powertech")!,
  ].filter(Boolean);

  // Filtered list
  const filteredList = chronologicalList.filter((exp) => {
    if (filterType === "enterprise") return !exp.isEducation;
    if (filterType === "education") return exp.isEducation;
    return true;
  });

  // Sorted list based on toggle
  const displayList = sortOrder === "reverse" ? [...filteredList].reverse() : filteredList;

  // Tracker list following display sort order (CV order: PowerTech -> Luklak -> FPT IS -> HomeNest -> TDTU)
  const trackerList = sortOrder === "reverse" ? [...chronologicalList].reverse() : chronologicalList;

  // Icon selector per milestone
  const getMilestoneIcon = (id: string) => {
    switch (id) {
      case "powertech":
        return <Zap size={16} className="text-sky-500" />;
      case "luklak-freelance":
        return <Layers size={16} className="text-emerald-500" />;
      case "fpt-is":
        return <ShieldCheck size={16} className="text-blue-500" />;
      case "homenest-software":
        return <FileSpreadsheet size={16} className="text-purple-500" />;
      case "tdtu-engineering":
        return <GraduationCap size={16} className="text-amber-500" />;
      default:
        return <Briefcase size={16} className="text-blue-500" />;
    }
  };

  // Border/glow color per milestone
  const getMilestoneAccent = (id: string) => {
    switch (id) {
      case "powertech":
        return "border-sky-500 text-sky-500 bg-sky-500/10";
      case "luklak-freelance":
        return "border-emerald-500 text-emerald-500 bg-emerald-500/10";
      case "fpt-is":
        return "border-blue-500 text-blue-500 bg-blue-500/10";
      case "homenest-software":
        return "border-purple-500 text-purple-500 bg-purple-500/10";
      case "tdtu-engineering":
        return "border-amber-500 text-amber-500 bg-amber-500/10";
      default:
        return "border-blue-500 text-blue-500 bg-blue-500/10";
    }
  };

  const scrollToMilestone = (id: string) => {
    setActiveMilestoneId(id);
    const el = document.getElementById(`milestone-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 border-t border-[var(--surface-border)] bg-[var(--surface-subtle)]/40 relative overflow-hidden">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 uppercase mb-3">
              <Sparkles size={13} />
              <span>// BẢN ĐỒ DÒNG THỜI GIAN KINH NGHIỆM THỰC CHIẾN</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              Hành Trình Kỹ Sư và Kinh Nghiệm Triển Khai
            </h2>
            <p className="text-[var(--muted-foreground)] mt-3 max-w-2xl text-sm lg:text-base leading-relaxed">
              Đồng bộ hóa 100% từ hồ sơ CV Master: Hành trình phát triển thực chiến từ nền tảng Kỹ sư 5 năm ĐH Tôn Đức Thắng đến các hệ thống chuyển đổi số doanh nghiệp.
            </p>
          </div>

          {/* Filter & Sort Controls (Touch target >= 44px, flex-wrap) */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
            {/* Filter buttons */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm flex-wrap gap-1">
              <button
                onClick={() => setFilterType("all")}
                className={`touch-target px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterType === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Tất cả ({chronologicalList.length})
              </button>
              <button
                onClick={() => setFilterType("enterprise")}
                className={`touch-target px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterType === "enterprise"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Doanh nghiệp (4)
              </button>
              <button
                onClick={() => setFilterType("education")}
                className={`touch-target px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterType === "education"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Học vấn (1)
              </button>
            </div>

            {/* Sort Toggle Button */}
            <button
              onClick={() => setSortOrder(sortOrder === "chronological" ? "reverse" : "chronological")}
              className="touch-target px-3.5 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-500 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Đổi thứ tự thời gian"
            >
              <ArrowUpDown size={14} className="text-blue-600 dark:text-sky-400" />
              <span className="hidden sm:inline">Thứ tự:</span>
              <span className="font-bold text-blue-600 dark:text-sky-400">
                {sortOrder === "chronological" ? "2021 → Nay" : "Nay → 2021"}
              </span>
            </button>
          </div>
        </div>

        {/* ==============================================================================
            1. HORIZONTAL INTERACTIVE TIMELINE LINE TRACKER (Guaranteed right <= 430px)
            ============================================================================== */}
        <div className="mb-12 p-3 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--surface-border)]">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]">
              <TrendingUp size={16} className="text-blue-600 dark:text-sky-400" />
              <span className="uppercase tracking-wider font-mono text-[11px]">
                Thanh Line Tiến Trình Kinh Nghiệm (Chronological Milestone Tracker)
              </span>
            </div>
            <span className="text-[11px] font-mono text-[var(--muted-foreground)] hidden sm:inline">
              Nhấp mốc để chuyển tới chi tiết
            </span>
          </div>

          {/* Timeline Nodes Grid */}
          <div className="relative pb-2 sm:pb-3">
            {/* Background connecting baseline at the bottom under the milestone feet */}
            <div
              className={`absolute bottom-[3px] sm:bottom-[4px] left-6 sm:left-12 right-6 sm:right-10 h-1 sm:h-1.5 bg-gradient-to-r ${
                sortOrder === "reverse"
                  ? "from-sky-500 via-emerald-500 via-purple-500 via-blue-500 to-amber-500"
                  : "from-amber-500 via-blue-500 via-purple-500 via-emerald-500 to-sky-500"
              } rounded-full opacity-80`}
            />

            {/* Arrowhead at the right end of the timeline line */}
            <div
              className={`absolute right-1 sm:right-3 bottom-[-2px] sm:bottom-[-2px] flex items-center transition-colors ${
                sortOrder === "reverse"
                  ? "text-amber-500 dark:text-amber-400"
                  : "text-sky-500 dark:text-sky-400"
              }`}
              title="Hướng tiến trình thời gian"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </div>

            <div className="grid grid-cols-5 gap-1 sm:gap-3 w-full">
              {trackerList.map((milestone) => {
                const isActive = activeMilestoneId === milestone.id;
                const accent = getMilestoneAccent(milestone.id);

                return (
                  <button
                    key={milestone.id}
                    onClick={() => scrollToMilestone(milestone.id)}
                    className="flex flex-col items-center group relative z-10 focus:outline-none cursor-pointer transition-all w-full touch-target min-h-[44px]"
                  >
                    {/* Circle Node */}
                    <div
                      className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all shadow-sm bg-[var(--surface)] ${
                        isActive
                          ? "scale-110 sm:scale-125 ring-2 sm:ring-4 ring-blue-500/20 " + accent
                          : "border-[var(--surface-border)] text-[var(--muted-foreground)] group-hover:scale-110 group-hover:border-blue-400"
                      }`}
                    >
                      {getMilestoneIcon(milestone.id)}
                    </div>

                    {/* Milestone Year Badge */}
                    <span
                      className={`mt-1.5 sm:mt-2 px-1 py-0.5 sm:px-2 sm:py-0.5 rounded text-[8.5px] sm:text-[11px] font-mono font-bold tracking-tight transition-colors text-center whitespace-nowrap ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-[var(--surface-subtle)] text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] border border-[var(--surface-border)]"
                      }`}
                    >
                      {milestone.id === "powertech"
                        ? "07/26-Nay"
                        : milestone.id === "luklak-freelance"
                        ? "05/2026"
                        : milestone.id === "homenest-software"
                        ? "03–06/2026"
                        : milestone.id === "fpt-is"
                        ? "10/25–02/26"
                        : "2021-2026"}
                    </span>

                    {/* Milestone Role & Company Short Label */}
                    <span className="text-[8.5px] sm:text-[11px] font-semibold text-[var(--foreground)] mt-0.5 text-center leading-tight break-words line-clamp-2 w-full px-0.5 group-hover:text-blue-600 dark:group-hover:text-sky-400">
                      {milestone.id === "tdtu-engineering"
                        ? "ĐH Tôn Đức Thắng"
                        : milestone.id === "homenest-software"
                        ? "HomeNest BA"
                        : milestone.id === "fpt-is"
                        ? "FPT IS"
                        : milestone.id === "luklak-freelance"
                        ? "Luklak 60FPS"
                        : "PowerTech"}
                    </span>

                    {/* Milestone Base Foot Marker (Trụ chân mốc kết nối vào đường line ở dưới) */}
                    <div className="mt-2 sm:mt-2.5 flex items-center justify-center">
                      <div
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border-2 transition-all ${
                          isActive
                            ? "bg-blue-600 border-white dark:border-slate-900 ring-2 ring-blue-500/40 scale-125"
                            : "bg-[var(--surface)] border-[var(--surface-border)] group-hover:border-blue-400 group-hover:scale-110"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==============================================================================
            2. VERTICAL TIMELINE SPINE & DETAILED MILESTONE CARDS
            ============================================================================== */}
        <div className="relative pl-7 sm:pl-12 lg:pl-14 space-y-10 sm:space-y-12">
          {/* Vertical Glowing Line Spine */}
          <div className="absolute left-[13px] sm:left-[21px] lg:left-[25px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-sky-500 via-emerald-500 via-blue-500 via-purple-500 to-amber-500 rounded-full" />

          {displayList.map((exp) => {
            const isActive = activeMilestoneId === exp.id;
            const accent = getMilestoneAccent(exp.id);

            return (
              <div
                key={exp.id}
                id={`milestone-${exp.id}`}
                onClick={() => setActiveMilestoneId(exp.id)}
                className="relative group transition-all"
              >
                {/* Timeline Node Pin on Spine */}
                <div
                  className={`absolute -left-[28px] sm:-left-[44px] lg:-left-[51px] top-4 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[var(--surface)] border-2 flex items-center justify-center transition-all duration-300 shadow-md ${
                    isActive
                      ? "scale-110 sm:scale-125 ring-2 sm:ring-4 ring-blue-500/25 " + accent
                      : "border-[var(--surface-border)] group-hover:scale-110 group-hover:border-blue-400"
                  }`}
                >
                  {getMilestoneIcon(exp.id)}
                </div>

                {/* Milestone Detailed Card */}
                <div
                  className={`card-glass rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-7 border transition-all duration-300 ${
                    isActive
                      ? "border-blue-500/60 shadow-lg shadow-blue-500/5 bg-[var(--surface)]"
                      : "border-[var(--surface-border)] hover:border-blue-500/40 hover:shadow-md"
                  }`}
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {exp.type}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-[var(--foreground)] border border-[var(--surface-border)]">
                          {exp.yearBadge}
                        </span>
                      </div>

                      {/* Role Title */}
                      <h3 className="text-xl lg:text-2xl font-black text-[var(--foreground)] tracking-tight">
                        {exp.role}
                      </h3>

                      {/* Company Name & Link */}
                      <div className="text-sm font-semibold text-blue-600 dark:text-sky-400 mt-1.5 flex items-center gap-1.5 flex-wrap">
                        {exp.isEducation ? <GraduationCap size={16} /> : <Building2 size={16} />}
                        <span>{exp.company}</span>
                        {exp.website && (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-xs text-sky-600 dark:text-sky-400 hover:underline ml-1 font-mono"
                          >
                            <span>(powertech.vn)</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Period & Location Pills */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)] font-mono self-start">
                      <span className="flex items-center gap-1 bg-[var(--surface-subtle)] px-2.5 py-1 rounded-md border border-[var(--surface-border)] shadow-sm shrink-0">
                        <Calendar size={13} className="text-blue-600 dark:text-sky-400" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1 bg-[var(--surface-subtle)] px-2.5 py-1 rounded-md border border-[var(--surface-border)] shadow-sm shrink-0">
                        <MapPin size={13} className="text-indigo-600 dark:text-indigo-400" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs lg:text-sm text-[var(--muted-foreground)] leading-relaxed mt-3">
                    {exp.description}
                  </p>

                  {/* Metrics Row (3-col quantitative stats) */}
                  {exp.metrics && exp.metrics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-5 p-3 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--surface-border)]">
                      {exp.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-center sm:text-left px-2 py-1">
                          <div className="text-xs lg:text-sm font-black text-blue-600 dark:text-sky-400 font-mono">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-semibold mt-0.5 leading-snug">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Achievements List */}
                  <div className="mt-5 space-y-2.5 pt-4 border-t border-[var(--surface-border)]">
                    <div className="text-[11px] font-mono font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                      // KẾT QUẢ ĐỊNH LƯỢNG &amp; THÀNH TỰU THỰC CHIẾN (CHỨNG THỰC TỪ CV):
                    </div>
                    {exp.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs lg:text-sm text-[var(--foreground)] leading-relaxed">
                        <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills tags */}
                  <div className="mt-5 pt-4 border-t border-[var(--surface-border)] flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] font-mono uppercase text-[var(--muted-foreground)] mr-1">Kỹ năng:</span>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--surface-subtle)] text-[var(--muted-foreground)] border border-[var(--surface-border)] hover:border-blue-400 hover:text-[var(--foreground)] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
