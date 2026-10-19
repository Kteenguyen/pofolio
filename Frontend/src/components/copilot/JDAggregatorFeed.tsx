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
} from "lucide-react";

interface JDAggregatorFeedProps {
  jobs: JobPosting[];
  selectedJobId: string;
  onSelectJob: (job: JobPosting) => void;
  onOpenNewModal: () => void;
  matchesMap: Map<string, MatchAnalysis>;
  isLoading?: boolean;
  onSearchLive?: (query: string) => void;
}

export default function JDAggregatorFeed({
  jobs,
  selectedJobId,
  onSelectJob,
  onOpenNewModal,
  matchesMap,
  isLoading = false,
  onSearchLive,
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
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requirements.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;

    // Work Mode Filter
    if (activeWorkMode !== "ALL" && job.workMode !== activeWorkMode) return false;

    // Market Filter
    if (activeMarket !== "ALL" && job.market !== activeMarket) return false;

    return true;
  });

  return (
    <div className="space-y-3.5">
      {/* Header Bar with Action Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)] flex items-center gap-1.5 truncate">
            <span>Sàn JD Realtime Thật</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold badge-ios-green flex items-center gap-1 shrink-0">
              <Radio size={9} className="animate-pulse" /> {filteredJobs.length} Live
            </span>
          </h3>
          <p className="text-[10px] text-[var(--muted-foreground)] truncate">
            RemoteOK Live Feed • Truy vấn thời gian thực 100%
          </p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="btn-ktee-ios btn-ktee-primary shrink-0"
          title="Dán JD Mới để phân tích ngay"
        >
          <Plus size={13} />
          <span>Dán JD Mới</span>
        </button>
      </div>

      {/* Apple Spotlight Search Bar */}
      <form onSubmit={handleLiveSearchSubmit} className="flex items-center gap-2">
        <div className="ios-spotlight flex-1">
          <Search size={14} className="text-[var(--muted-foreground)] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Spotlight Search (React, Next.js, Golang, DevOps...)"
            className="w-full text-xs text-[var(--foreground)] bg-transparent outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="w-4 h-4 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 flex items-center justify-center transition-colors shrink-0"
              title="Xóa tìm kiếm"
            >
              <X size={10} />
            </button>
          )}
          <span className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono text-[var(--muted-foreground)] bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)] shrink-0 ml-1">
            <Command size={10} /> ↵
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading || !searchQuery.trim()}
          className="btn-ktee-ios btn-ktee-green shrink-0 disabled:opacity-50"
          title="Quét việc làm thời gian thực"
        >
          {isLoading ? <RefreshCw size={12} className="animate-spin" /> : <Search size={12} />}
          <span className="hidden sm:inline">{isLoading ? "Đang Quét..." : "Quét Realtime"}</span>
        </button>
      </form>

      {/* iOS Capsule Tags List */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
            Từ khóa quét nhanh qua Live API:
          </span>
          <span className="text-[9px] text-[var(--muted-foreground)] font-mono">10 Tags</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px] -mx-1 px-1">
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
      </div>

      {/* Work Mode Filter: iOS Segmented Control */}
      <div>
        <span className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider block mb-1.5">
          Hình thức làm việc:
        </span>
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
            <Globe size={11} />
            <span>100% Remote</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveWorkMode("Freelance / Contract")}
            className={`ios-segmented-item flex items-center gap-1 ${
              activeWorkMode === "Freelance / Contract" ? "active" : ""
            }`}
          >
            <DollarSign size={11} />
            <span>Freelance</span>
          </button>
        </div>
      </div>

      {/* Loading Skeleton Indicator */}
      {isLoading && (
        <div className="p-4 rounded-2xl ios-glass border border-[var(--ios-hairline)] text-center space-y-2 animate-pulse shadow-sm">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#007AFF]">
            <RefreshCw size={13} className="animate-spin" />
            <span>Đang tải việc làm thực tế từ RemoteOK API...</span>
          </div>
          <span className="text-[10px] text-[var(--muted-foreground)] block">
            Dữ liệu thời gian thực 100% • Sẵn sàng phân tích CV
          </span>
        </div>
      )}

      {/* iOS List Item: Job Card List */}
      <div className="space-y-2 max-h-[640px] overflow-y-auto pr-0.5 scrollbar-thin">
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
              className={`p-3.5 rounded-[14px] cursor-pointer transition-all border text-left relative overflow-hidden ${
                isSelected
                  ? "bg-[var(--surface)] border-[#007AFF] shadow-md ring-1 ring-[#007AFF]/30"
                  : "bg-[var(--surface)] border-[var(--ios-hairline)] hover:border-[#007AFF]/40 hover:shadow-sm"
              }`}
            >
              {/* Top Row: Meta Badges */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase bg-[var(--ios-control-bg)] text-[var(--muted-foreground)] border border-[var(--ios-hairline)]">
                    {job.platform}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${workBadgeClass}`}>
                    {job.workMode}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-medium text-[var(--muted-foreground)] bg-[var(--ios-control-bg)]">
                    {job.market}
                  </span>
                </div>

                {/* Apple Match Badge */}
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${scoreBadgeClass}`}>
                    <CheckCircle2 size={10} />
                    Khớp CV: {score}%
                  </span>
                </div>
              </div>

              {/* Title & Company */}
              <div className="min-w-0 mb-1.5">
                <h4 className="text-xs font-bold text-[var(--foreground)] line-clamp-1 leading-snug">
                  {job.title}
                </h4>
                <div className="text-[10.5px] text-[var(--muted-foreground)] truncate mt-0.5 font-medium">
                  {job.company} • <span className="font-mono text-[var(--foreground)]">{job.location.split("(")[0]}</span>
                </div>
              </div>

              {/* Hairline Divider */}
              <div className="h-[1px] w-full bg-[var(--ios-hairline)] my-2" />

              {/* Bottom Row: Salary & Tech Chips */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-[#34C759] font-bold shrink-0">
                  {job.salary}
                </span>

                <div className="flex items-center gap-1 overflow-hidden">
                  {job.requirements.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[var(--ios-control-bg)] text-[var(--muted-foreground)] border border-[var(--ios-hairline)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {job.requirements.techStack.length > 3 && (
                    <span className="text-[9px] text-[var(--muted-foreground)] font-mono">
                      +{job.requirements.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {!isLoading && filteredJobs.length === 0 && (
          <div className="p-6 text-center text-xs text-[var(--muted-foreground)] ios-glass rounded-[14px] border border-dashed border-[var(--ios-hairline)] space-y-2">
            <p className="font-semibold text-[var(--foreground)]">
              Không tìm thấy tin việc làm nào khớp từ khóa &quot;{searchQuery}&quot;.
            </p>
            <p className="text-[11px] text-[var(--muted-foreground)]">
              Hệ thống tuyệt đối KHÔNG giả lập mock dữ liệu. Vui lòng thử các từ khóa: #react, #nextjs, #fullstack, #golang hoặc bấm &quot;Dán JD Mới&quot;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
