"use client";

import { useState } from "react";
import { JobPosting, MatchAnalysis, WorkMode, TargetMarket } from "@/types/job-copilot";
import {
  Search,
  Plus,
  Globe,
  DollarSign,
  RefreshCw,
  Radio,
  X,
  Command,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface JDAggregatorFeedProps {
  jobs: JobPosting[];
  selectedJobId: string;
  onSelectJob: (job: JobPosting) => void;
  onOpenNewModal: () => void;
  matchesMap: Map<string, MatchAnalysis>;
  isLoading?: boolean;
  onSearchLive?: (query: string) => void;
  onRefreshLive?: () => void;
  lastUpdatedTime?: string;
  autoRefreshEnabled?: boolean;
  countdown?: number;
}

export default function JDAggregatorFeed({
  jobs,
  selectedJobId,
  onSelectJob,
  onOpenNewModal,
  matchesMap,
  isLoading = false,
  onSearchLive,
  onRefreshLive,
  lastUpdatedTime,
  autoRefreshEnabled = true,
  countdown,
}: JDAggregatorFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeWorkMode, setActiveWorkMode] = useState<"ALL" | WorkMode>("ALL");
  const [activeMarket, setActiveMarket] = useState<"ALL" | TargetMarket>("ALL");

  // 10 Full Apple Capsule Tags
  const quickLiveKeywords = [
    "react",
    "nextjs",
    "frontend",
    "fullstack",
    "node",
    "typescript",
    "python",
    "golang",
    "devops",
    "mobile",
  ];

  const handleLiveSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchLive && searchQuery.trim()) {
      onSearchLive(searchQuery.trim());
    }
  };

  const handleQuickKeywordClick = (kw: string) => {
    setSearchQuery(kw);
    if (onSearchLive) {
      onSearchLive(kw);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (onSearchLive) {
      onSearchLive("react");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    // Search query in current results
    const matchSearch =
      searchQuery.trim() === "" ||
      (job.relevanceScore !== undefined && job.relevanceScore > 0) ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requirements.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      Boolean(job.rawDescription && job.rawDescription.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;

    // Work Mode Filter
    if (activeWorkMode !== "ALL" && job.workMode !== activeWorkMode) return false;

    // Market Filter
    if (activeMarket !== "ALL" && job.market !== activeMarket) return false;

    return true;
  });

  return (
    <div className="space-y-2">
      {/* Header Bar with Action Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)] flex items-center gap-1.5 truncate">
            <span>Sàn JD Realtime</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold badge-ios-green flex items-center gap-1 shrink-0">
              <Radio size={8} className="animate-pulse" /> {filteredJobs.length} Live
            </span>
          </h3>
          <p className="text-[9.5px] text-[var(--muted-foreground)] truncate">
            RemoteOK Live Feed • Dữ liệu thời gian thực
          </p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="btn-ktee-ios btn-ktee-primary shrink-0"
          title="Dán JD Mới để phân tích ngay"
        >
          <Plus size={12} />
          <span>Dán JD Mới</span>
        </button>
      </div>

      {/* Apple Spotlight Search Bar (Height 34px) */}
      <div className="flex items-center gap-1.5">
        <form onSubmit={handleLiveSearchSubmit} className="flex-1 flex items-center gap-1.5 min-w-0">
          <div className="ios-spotlight flex-1 min-w-0">
            <Search size={13} className="text-[var(--muted-foreground)] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Spotlight Search (React, Node, Golang...)"
              className="w-full text-[11.5px] text-[var(--foreground)] bg-transparent outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="w-4 h-4 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 flex items-center justify-center transition-colors shrink-0"
                title="Xóa tìm kiếm"
              >
                <X size={9} />
              </button>
            )}
            <span className="hidden md:flex items-center gap-0.5 px-1 py-0.5 rounded text-[8.5px] font-mono text-[var(--muted-foreground)] bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)] shrink-0 ml-1">
              <Command size={9} /> ↵
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="btn-ktee-ios btn-ktee-green shrink-0 disabled:opacity-50"
            title="Quét việc làm thời gian thực"
          >
            {isLoading ? <RefreshCw size={11} className="animate-spin" /> : <Search size={11} />}
            <span className="hidden sm:inline">Quét</span>
          </button>
        </form>

        {onRefreshLive && (
          <button
            type="button"
            onClick={onRefreshLive}
            disabled={isLoading}
            className="btn-ktee-ios btn-ktee-primary shrink-0 disabled:opacity-50"
            title={
              lastUpdatedTime
                ? `Đồng bộ Realtime (Vừa cập nhật: ${lastUpdatedTime}) - Bấm làm mới`
                : "Đồng bộ Realtime ngay"
            }
          >
            <Zap size={11} className={isLoading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Sync</span>
            {countdown !== undefined && autoRefreshEnabled && (
              <span className="font-mono text-[9px] bg-white/20 px-1 py-0.5 rounded ml-0.5">
                {countdown}s
              </span>
            )}
          </button>
        )}
      </div>

      {/* iOS Capsule Tags List (Font 9.5px, Pill 2px 8px) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none text-[9.5px] -mx-0.5 px-0.5">
        {quickLiveKeywords.map((kw) => {
          const isActive = searchQuery.toLowerCase() === kw;
          return (
            <button
              key={kw}
              type="button"
              onClick={() => handleQuickKeywordClick(kw)}
              disabled={isLoading}
              className={`ios-capsule ${isActive ? "active" : ""}`}
            >
              #{kw}
            </button>
          );
        })}
      </div>

      {/* Work Mode Filter: Compact iOS Segmented Control */}
      <div className="ios-segmented-control w-full">
        <button
          type="button"
          onClick={() => setActiveWorkMode("ALL")}
          className={`ios-segmented-item ${activeWorkMode === "ALL" ? "active" : ""}`}
        >
          Tất cả
        </button>
        <button
          type="button"
          onClick={() => setActiveWorkMode("Remote 100%")}
          className={`ios-segmented-item flex items-center gap-1 ${
            activeWorkMode === "Remote 100%" ? "active" : ""
          }`}
        >
          <Globe size={10} />
          <span>100% Remote</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveWorkMode("Freelance / Contract")}
          className={`ios-segmented-item flex items-center gap-1 ${
            activeWorkMode === "Freelance / Contract" ? "active" : ""
          }`}
        >
          <DollarSign size={10} />
          <span>Freelance</span>
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="p-3 rounded-xl ios-glass border border-[var(--ios-hairline)] text-center space-y-1 animate-pulse shadow-sm">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#007AFF]">
            <RefreshCw size={12} className="animate-spin" />
            <span>Đang tải việc làm từ RemoteOK Official API...</span>
          </div>
        </div>
      )}

      {/* iOS Job Cards List: Max Height 720px, Compact Padding */}
      <div className="space-y-2 max-h-[720px] overflow-y-auto pr-0.5 scrollbar-thin">
        {filteredJobs.map((job) => {
          const match = matchesMap.get(job.id);
          const isSelected = job.id === selectedJobId;
          const score = match ? match.overallScore : 70;

          // Apple Vibrant Badge by Score
          let scoreBadgeClass = "badge-ios-green";
          if (score < 75) scoreBadgeClass = "badge-ios-orange";
          if (score < 60) scoreBadgeClass = "badge-ios-red";

          // Apple Vibrant Work Mode Badge
          let workBadgeClass = "badge-ios-blue";
          if (job.workMode === "Freelance / Contract") workBadgeClass = "badge-ios-green";
          if (job.workMode === "Hybrid") workBadgeClass = "badge-ios-purple";
          if (job.workMode === "Onsite") workBadgeClass = "badge-ios-orange";

          return (
            <div
              key={job.id}
              onClick={() => onSelectJob(job)}
              className={`p-2.5 sm:p-3 rounded-[12px] cursor-pointer transition-all border text-left relative overflow-hidden ${
                isSelected
                  ? "bg-[var(--surface)] border-[#007AFF] shadow-sm ring-1 ring-[#007AFF]/30"
                  : "bg-[var(--surface)] border-[var(--ios-hairline)] hover:border-[#007AFF]/40 hover:shadow-xs"
              }`}
            >
              {/* Top Row: Platform, WorkMode & Match Badge */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                  <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase bg-[var(--ios-control-bg)] text-[var(--muted-foreground)] border border-[var(--ios-hairline)] shrink-0">
                    {job.platform}
                  </span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[8.5px] font-bold truncate shrink-0 ${workBadgeClass}`}>
                    {job.workMode}
                  </span>
                </div>

                {/* Score badge */}
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9.5px] font-bold font-mono shrink-0 ${scoreBadgeClass}`}>
                  <CheckCircle2 size={9} />
                  Khớp: {score}%
                </span>
              </div>

              {/* Title & Company */}
              <div className="min-w-0 mb-1">
                <h4 className="text-[12px] font-bold text-[var(--foreground)] line-clamp-1 leading-snug">
                  {job.title}
                </h4>
                <div className="text-[10px] text-[var(--muted-foreground)] truncate mt-0.5">
                  <span className="font-semibold text-[var(--foreground)]">{job.company}</span> • <span>{job.location.split("(")[0]}</span>
                </div>
              </div>

              {/* Hairline Divider */}
              <div className="h-[1px] w-full bg-[var(--ios-hairline)] my-1.5" />

              {/* Bottom Row: Salary & Tech Chips */}
              <div className="flex items-center justify-between gap-1.5">
                <span className="font-mono text-[11px] text-[#34C759] font-bold shrink-0">
                  {job.salary}
                </span>

                <div className="flex items-center gap-1 overflow-hidden">
                  {job.requirements.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.2 rounded text-[8.5px] font-mono bg-[var(--ios-control-bg)] text-[var(--muted-foreground)] border border-[var(--ios-hairline)] truncate max-w-[80px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {job.requirements.techStack.length > 3 && (
                    <span className="text-[8.5px] text-[var(--muted-foreground)] font-mono shrink-0">
                      +{job.requirements.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {!isLoading && filteredJobs.length === 0 && (
          <div className="p-4 text-center text-xs text-[var(--muted-foreground)] ios-glass rounded-[12px] border border-dashed border-[var(--ios-hairline)] space-y-1.5">
            <p className="font-semibold text-[var(--foreground)]">
              Không tìm thấy tin việc làm nào cho từ khóa &quot;{searchQuery}&quot;.
            </p>
            <p className="text-[10.5px] text-[var(--muted-foreground)]">
              Hệ thống không dùng dữ liệu mock. Vui lòng thử các từ khóa: #react, #nextjs, #fullstack hoặc bấm &quot;Dán JD Mới&quot;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
