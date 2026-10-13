"use client";

import { useState, useEffect } from "react";
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
  LayoutGrid,
  Clock,
  Camera,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Bot,
} from "lucide-react";

interface LightboxState {
  images: string[];
  currentIndex: number;
  title: string;
  captions: string[];
}

export default function Experience() {
  // Sort order: chronological (2021 -> Nay) or reverse (Nay -> 2021)
  const [sortOrder, setSortOrder] = useState<"chronological" | "reverse">("reverse");
  const [filterType, setFilterType] = useState<"all" | "enterprise" | "education">("all");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("powertech");

  // Lightbox Modal state for real evidence photos
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  // Close lightbox on ESC key & arrows
  useEffect(() => {
    if (!lightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") {
        setLightbox((prev) =>
          prev
            ? { ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }
            : null
        );
      }
      if (e.key === "ArrowLeft") {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
              }
            : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  // Chronological order (2021 -> 2025 -> 2026 -> Nay) - 6 Milestones
  const chronologicalList: ExperienceType[] = [
    // 1. TDTU 2021 - 2026
    portfolioData.experience.find((e) => e.id === "tdtu-engineering")!,
    // 2. FPT IS 10/2025 - 02/2026
    portfolioData.experience.find((e) => e.id === "fpt-is")!,
    // 3. Nam Gia Phát 02/2026 - 04/2026
    portfolioData.experience.find((e) => e.id === "namgiaphat-realestate")!,
    // 4. HomeNest 03/2026 - 06/2026
    portfolioData.experience.find((e) => e.id === "homenest-software")!,
    // 5. Luklak 05/2026
    portfolioData.experience.find((e) => e.id === "luklak-freelance")!,
    // 6. PowerTech 07/2026 - Nay
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

  // Tracker list following display sort order
  const trackerList = sortOrder === "reverse" ? [...chronologicalList].reverse() : chronologicalList;

  // Icon selector per milestone
  const getMilestoneIcon = (id: string) => {
    switch (id) {
      case "powertech":
        return <Zap size={16} className="text-sky-500" />;
      case "luklak-freelance":
        return <Layers size={16} className="text-emerald-500" />;
      case "homenest-software":
        return <FileSpreadsheet size={16} className="text-purple-500" />;
      case "namgiaphat-realestate":
        return <Building2 size={16} className="text-teal-500" />;
      case "fpt-is":
        return <ShieldCheck size={16} className="text-blue-500" />;
      case "tdtu-engineering":
        return <GraduationCap size={16} className="text-orange-500" />;
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
      case "homenest-software":
        return "border-purple-500 text-purple-500 bg-purple-500/10";
      case "namgiaphat-realestate":
        return "border-teal-500 text-teal-500 bg-teal-500/10";
      case "fpt-is":
        return "border-blue-500 text-blue-500 bg-blue-500/10";
      case "tdtu-engineering":
        return "border-orange-500 text-orange-500 bg-orange-500/10";
      default:
        return "border-blue-500 text-blue-500 bg-blue-500/10";
    }
  };

  // Asymmetric Corner Class generator for modern architectural rhythm
  const getAsymmetricClass = (index: number) => {
    const mod = index % 3;
    if (mod === 0) return "asymmetric-card-a";
    if (mod === 1) return "asymmetric-card-b";
    return "asymmetric-card-c";
  };

  const scrollToMilestone = (id: string) => {
    setActiveMilestoneId(id);
    const el = document.getElementById(`milestone-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const openFptLightbox = (index: number) => {
    setLightbox({
      images: ["/tha1.jpg", "/tha2.jpg"],
      currentIndex: index,
      title: "Minh Chứng Hiện Trường - Dự Án Thi Hành Án Dân Sự (FPT IS)",
      captions: [
        "Hình ảnh thực tế đứng lớp tổ chức 15 buổi đào tạo (Training) cho hơn 230 cán bộ và người dùng cuối tại Cơ quan Thi Hành Án Dân Sự.",
        "Hình ảnh thực tế triển khai go-live, cài đặt phần mềm, cấu hình chứng thư số và hoàn thiện biên bản nghiệm thu tại hiện trường.",
      ],
    });
  };

  return (
    <section
      id="experience"
      className="py-8 sm:py-10 lg:py-12 border-t border-[var(--surface-border)] bg-[var(--surface-subtle)]/40 relative overflow-hidden"
    >
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 uppercase mb-3">
              <Sparkles size={13} />
              <span>// BẢN ĐỒ KINH NGHIỆM THỰC CHIẾN MASTER CV</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              Hành Trình Kỹ Sư và Kinh Nghiệm Triển Khai
            </h2>
            <p className="text-[var(--muted-foreground)] mt-3 max-w-2xl text-sm lg:text-base leading-relaxed">
              Đồng bộ hóa 100% từ hồ sơ CV Master: Hành trình phát triển thực chiến từ nền tảng Kỹ sư 5 năm ĐH Tôn Đức Thắng đến các hệ thống chuyển đổi số doanh nghiệp, triển khai UAT thực tế và đào tạo 230+ cán bộ.
            </p>
          </div>

          {/* Filter & Layout Controls (Touch target >= 44px, flex-wrap) */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
            {/* View Mode Switcher: 3-Col Grid vs Vertical Timeline */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm gap-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`touch-target px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
                title="Chế độ Lưới 3 Cột Bo Góc Bất Đối Xứng"
              >
                <LayoutGrid size={14} />
                <span className="hidden sm:inline">Lưới 3 Cột</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("timeline")}
                className={`touch-target px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "timeline"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
                title="Chế độ Dòng Thời Gian Dọc"
              >
                <Clock size={14} />
                <span className="hidden sm:inline">Dòng Thời Gian</span>
              </button>
            </div>

            {/* Filter buttons */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setFilterType("all")}
                className={`touch-target px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterType === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Tất cả ({chronologicalList.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterType("enterprise")}
                className={`touch-target px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterType === "enterprise"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Doanh nghiệp ({chronologicalList.filter((e) => !e.isEducation).length})
              </button>
              <button
                type="button"
                onClick={() => setFilterType("education")}
                className={`touch-target px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterType === "education"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                Học vấn ({chronologicalList.filter((e) => e.isEducation).length})
              </button>
            </div>

            {/* Sort Toggle Button */}
            <button
              type="button"
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
            1. HORIZONTAL INTERACTIVE TIMELINE TRACKER (Guaranteed right <= 430px)
            ============================================================================== */}
        <div className="mb-10 p-3 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm experience-timeline-track">
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--surface-border)]">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]">
              <TrendingUp size={16} className="text-blue-600 dark:text-sky-400" />
              <span className="uppercase tracking-wider font-mono text-[11px]">
                Thanh Line Tiến Trình Kinh Nghiệm (Chronological Milestone Tracker)
              </span>
            </div>
            <span className="text-[11px] font-mono text-[var(--muted-foreground)] hidden sm:inline">
              Nhấp mốc để chuyển tới chi tiết thẻ
            </span>
          </div>

          {/* Timeline Nodes Grid */}
          <div className="relative pb-2 sm:pb-3 overflow-x-auto sm:overflow-x-visible">
            {/* Background connecting baseline at the bottom */}
            <div
              className={`absolute bottom-[3px] sm:bottom-[4px] left-4 sm:left-10 right-4 sm:right-10 h-1 sm:h-1.5 bg-gradient-to-r ${
                sortOrder === "reverse"
                  ? "from-sky-500 via-emerald-500 via-purple-500 via-teal-500 via-blue-500 to-orange-500"
                  : "from-orange-500 via-blue-500 via-teal-500 via-purple-500 via-emerald-500 to-sky-500"
              } rounded-full opacity-80`}
            />

            <div className="grid grid-cols-6 gap-1 sm:gap-2 w-full min-w-[320px]">
              {trackerList.map((milestone) => {
                const isActive = activeMilestoneId === milestone.id;
                const accent = getMilestoneAccent(milestone.id);

                return (
                  <button
                    key={milestone.id}
                    type="button"
                    onClick={() => scrollToMilestone(milestone.id)}
                    className="flex flex-col items-center group relative z-10 focus:outline-none cursor-pointer transition-all w-full min-w-0 touch-target min-h-[44px]"
                  >
                    {/* Circle Node */}
                    <div
                      className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-sm bg-[var(--surface)] ${
                        isActive
                          ? "scale-110 sm:scale-125 ring-2 sm:ring-4 ring-blue-500/20 " + accent
                          : "border-[var(--surface-border)] text-[var(--muted-foreground)] group-hover:scale-110 group-hover:border-blue-400"
                      }`}
                    >
                      {getMilestoneIcon(milestone.id)}
                    </div>

                    {/* Milestone Year Badge */}
                    <span
                      className={`mt-1 sm:mt-1.5 px-0.5 sm:px-1.5 py-0.5 rounded text-[7px] sm:text-[9.5px] font-mono font-bold tracking-tighter sm:tracking-tight transition-colors text-center whitespace-nowrap max-w-full truncate ${
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
                        ? "03–06/26"
                        : milestone.id === "namgiaphat-realestate"
                        ? "02–04/26"
                        : milestone.id === "fpt-is"
                        ? "10/25–2/26"
                        : "2021-2026"}
                    </span>

                    {/* Milestone Role & Company Short Label */}
                    <span className="text-[7.5px] sm:text-[10px] font-semibold text-[var(--foreground)] mt-0.5 text-center leading-tight truncate w-full px-0.5 group-hover:text-blue-600 dark:group-hover:text-sky-400">
                      {milestone.id === "tdtu-engineering"
                        ? "ĐH Tôn Đức Thắng"
                        : milestone.id === "homenest-software"
                        ? "HomeNest BA"
                        : milestone.id === "namgiaphat-realestate"
                        ? "Nam Gia Phát"
                        : milestone.id === "fpt-is"
                        ? "FPT IS"
                        : milestone.id === "luklak-freelance"
                        ? "Luklak"
                        : "PowerTech"}
                    </span>

                    {/* Milestone Base Foot Marker */}
                    <div className="mt-1.5 sm:mt-2 flex items-center justify-center">
                      <div
                        className={`w-2 h-2 rounded-full border-2 transition-all ${
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
            2A. 3-COLUMN ASYMMETRIC GRID VIEW (Show nhiều hơn 3 hàng 3 thẻ kinh nghiệm)
            ============================================================================== */}
        {viewMode === "grid" && (
          <div className="experience-3col-grid">
            {displayList.map((exp, idx) => {
              const isActive = activeMilestoneId === exp.id;
              const asymmetricClass = getAsymmetricClass(idx);

              return (
                <div
                  key={exp.id}
                  id={`milestone-${exp.id}`}
                  onClick={() => setActiveMilestoneId(exp.id)}
                  className={`asymmetric-card ${asymmetricClass} p-5 sm:p-6 lg:p-6 cursor-pointer ${
                    isActive ? "asymmetric-card-active" : ""
                  }`}
                >
                  {/* Top Meta Row */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {exp.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-[var(--foreground)] border border-[var(--surface-border)]">
                          {exp.yearBadge}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--muted-foreground)] flex items-center gap-1 shrink-0">
                        <MapPin size={11} className="text-indigo-500" />
                        <span className="truncate max-w-[110px]">{exp.location}</span>
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-lg lg:text-xl font-black text-[var(--foreground)] tracking-tight leading-snug">
                      {exp.role}
                    </h3>

                    {/* Company Name & Link */}
                    <div className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-sky-400 mt-1.5 flex items-center gap-1.5 flex-wrap">
                      {exp.isEducation ? <GraduationCap size={15} /> : <Building2 size={15} />}
                      <span>{exp.company}</span>
                      {exp.website && (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-0.5 text-xs text-sky-600 dark:text-sky-400 hover:underline ml-0.5 font-mono"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-2.5 line-clamp-3">
                      {exp.description}
                    </p>

                    {/* ==============================================================================
                        FPT IS REAL EVIDENCE PHOTO GALLERY (tha1.jpg & tha2.jpg)
                        ============================================================================== */}
                    {exp.id === "fpt-is" && exp.images && exp.images.length > 0 && (
                      <div className="mt-3.5 mb-2 p-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--surface-border)]">
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-sky-400 flex items-center gap-1">
                            <Camera size={12} />
                            <span>Minh Chứng Hiện Trường ({exp.images.length} Ảnh)</span>
                          </span>
                          <span className="text-[9px] text-[var(--muted-foreground)] font-mono">
                            Chạm xem phóng to
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {exp.images.map((imgSrc, imgIdx) => (
                            <button
                              key={imgIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openFptLightbox(imgIdx);
                              }}
                              className={`group/img relative overflow-hidden ${
                                imgIdx === 0 ? "asymmetric-thumb-a" : "asymmetric-thumb-b"
                              } border border-[var(--surface-border)] hover:border-blue-500 transition-all cursor-pointer focus:outline-none min-h-[72px] sm:min-h-[82px] w-full`}
                              title="Xem ảnh thực tế phóng to"
                            >
                              <img
                                src={imgSrc}
                                alt={`Ảnh thực tế ${imgIdx + 1} - ${exp.company}`}
                                className="w-full h-18 sm:h-20 object-cover group-hover/img:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-slate-900/30 group-hover/img:bg-slate-900/60 transition-colors flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-white/90 dark:bg-slate-800/90 text-blue-600 dark:text-sky-400 flex items-center justify-center opacity-85 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all shadow">
                                  <ZoomIn size={12} />
                                </div>
                              </div>
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-sm">
                                {imgIdx === 0 ? "Đào tạo 230+ CB" : "Go-live & Nghiệm thu"}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Nam Gia Phát Real Estate Visual Banner */}
                    {exp.id === "namgiaphat-realestate" && exp.imageUrl && (
                      <div className="mt-3.5 mb-2 relative overflow-hidden asymmetric-thumb-a border border-[var(--surface-border)]">
                        <img
                          src={exp.imageUrl}
                          alt="Cổng Bất Động Sản Nam Gia Phát"
                          className="w-full h-20 sm:h-22 object-cover"
                          loading="lazy"
                        />
                        <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-slate-900/85 text-teal-300 backdrop-blur-sm">
                          Bộ Lọc BĐS Đa Chiều &lt;100ms
                        </div>
                      </div>
                    )}

                    {/* Quantitative Metrics Row */}
                    {exp.metrics && exp.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-1.5 my-3.5 p-2 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)]">
                        {exp.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="text-center px-1">
                            <div className="text-[11px] sm:text-xs font-black text-blue-600 dark:text-sky-400 font-mono truncate">
                              {m.value}
                            </div>
                            <div className="text-[8.5px] text-[var(--muted-foreground)] uppercase tracking-wider font-semibold mt-0.5 truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Top Achievements List (compact) */}
                    <div className="mt-3 space-y-1.5 pt-2.5 border-t border-[var(--surface-border)]">
                      {exp.achievements.slice(0, 3).map((ach, achIdx) => (
                        <div
                          key={achIdx}
                          className="flex items-start gap-1.5 text-[11px] sm:text-xs text-[var(--foreground)] leading-relaxed"
                        >
                          <CheckCircle2
                            size={13}
                            className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                          />
                          <span className="line-clamp-2">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills tags footer */}
                  <div className="mt-4 pt-3 border-t border-[var(--surface-border)] flex flex-wrap gap-1 items-center">
                    {exp.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--muted-foreground)] border border-[var(--surface-border)]"
                      >
                        {skill}
                      </span>
                    ))}
                    {exp.skills.length > 5 && (
                      <span className="text-[9px] font-mono text-[var(--muted-foreground)]">
                        +{exp.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ==============================================================================
            2B. VERTICAL TIMELINE SPINE VIEW (Chế độ tuần tự chi tiết)
            ============================================================================== */}
        {viewMode === "timeline" && (
          <div className="relative pl-7 sm:pl-12 lg:pl-14 space-y-8 sm:space-y-10">
            {/* Vertical Glowing Line Spine */}
            <div className="absolute left-[13px] sm:left-[21px] lg:left-[25px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-sky-500 via-emerald-500 via-purple-500 via-teal-500 via-blue-500 to-orange-500 rounded-full" />

            {displayList.map((exp, idx) => {
              const isActive = activeMilestoneId === exp.id;
              const accent = getMilestoneAccent(exp.id);
              const asymmetricClass = getAsymmetricClass(idx);

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

                  {/* Milestone Card with Asymmetric Corners */}
                  <div
                    className={`asymmetric-card ${asymmetricClass} p-5 sm:p-6 lg:p-7 border transition-all duration-300 ${
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
                              <span>({exp.website.replace("https://", "")})</span>
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

                    {/* FPT IS REAL EVIDENCE PHOTO GALLERY (Timeline View) */}
                    {exp.id === "fpt-is" && exp.images && exp.images.length > 0 && (
                      <div className="mt-4 mb-3 p-3.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--surface-border)]">
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400 flex items-center gap-1.5">
                            <Camera size={14} />
                            <span>Minh Chứng Hình Ảnh Hiện Trường ({exp.images.length} Ảnh)</span>
                          </span>
                          <span className="text-[11px] text-[var(--muted-foreground)] font-mono">
                            Nhấp để phóng to chi tiết
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {exp.images.map((imgSrc, imgIdx) => (
                            <button
                              key={imgIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openFptLightbox(imgIdx);
                              }}
                              className={`group/img relative overflow-hidden ${
                                imgIdx === 0 ? "asymmetric-thumb-a" : "asymmetric-thumb-b"
                              } border border-[var(--surface-border)] hover:border-blue-500 transition-all cursor-pointer focus:outline-none min-h-[100px] w-full`}
                              title="Xem ảnh thực tế phóng to"
                            >
                              <img
                                src={imgSrc}
                                alt={`Ảnh thực tế ${imgIdx + 1} - ${exp.company}`}
                                className="w-full h-28 sm:h-32 object-cover group-hover/img:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-slate-900/30 group-hover/img:bg-slate-900/60 transition-colors flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 text-blue-600 dark:text-sky-400 flex items-center justify-center opacity-85 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all shadow">
                                  <ZoomIn size={15} />
                                </div>
                              </div>
                              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-sm">
                                {imgIdx === 0 ? "Đào tạo 230+ cán bộ" : "Go-live & nghiệm thu"}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Metrics Row */}
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
                      {exp.achievements.map((ach, aIdx) => (
                        <div
                          key={aIdx}
                          className="flex items-start gap-2.5 text-xs lg:text-sm text-[var(--foreground)] leading-relaxed"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                          />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skills tags */}
                    <div className="mt-5 pt-4 border-t border-[var(--surface-border)] flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] font-mono uppercase text-[var(--muted-foreground)] mr-1">
                        Kỹ năng:
                      </span>
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
        )}

        {/* ==============================================================================
            3. FULLSCREEN LIGHTBOX MODAL FOR REAL EVIDENCE PHOTOS
            ============================================================================== */}
        {lightbox && (
          <div
            className="experience-lightbox-backdrop"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <div
              className="experience-lightbox-container"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--surface-border)] bg-[var(--surface)]">
                <div className="flex items-center gap-2">
                  <Camera size={18} className="text-blue-600 dark:text-sky-400" />
                  <div>
                    <h4 className="text-sm font-bold text-[var(--foreground)] leading-tight">
                      {lightbox.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[var(--muted-foreground)]">
                      Ảnh {lightbox.currentIndex + 1} / {lightbox.images.length}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="lightbox-btn-touch rounded-full bg-[var(--surface-subtle)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--surface-border)] hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                  aria-label="Đóng cửa sổ"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Image Display */}
              <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[75vh] overflow-hidden">
                <img
                  src={lightbox.images[lightbox.currentIndex]}
                  alt={lightbox.captions[lightbox.currentIndex] || lightbox.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />

                {/* Prev Button */}
                {lightbox.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({
                        ...lightbox,
                        currentIndex:
                          (lightbox.currentIndex - 1 + lightbox.images.length) %
                          lightbox.images.length,
                      })
                    }
                    className="lightbox-btn-touch absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* Next Button */}
                {lightbox.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({
                        ...lightbox,
                        currentIndex: (lightbox.currentIndex + 1) % lightbox.images.length,
                      })
                    }
                    className="lightbox-btn-touch absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all"
                    aria-label="Ảnh tiếp theo"
                  >
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>

              {/* Caption Bar */}
              <div className="p-3.5 bg-[var(--surface)] border-t border-[var(--surface-border)]">
                <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
                  {lightbox.captions[lightbox.currentIndex]}
                </p>
                <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-[var(--muted-foreground)]">
                  <span>Dự án Thi Hành Án Dân Sự • FPT IS</span>
                  <span>Nhấn ESC hoặc nhấp ngoài để đóng</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
