"use client";

import { useState } from "react";
import { JobPosting, MatchAnalysis, WorkMode, TargetMarket } from "@/types/job-copilot";
import { Search, Plus, Globe, Briefcase, Building, DollarSign, RefreshCw, Radio } from "lucide-react";

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
  const [matchScoreFilter, setMatchScoreFilter] = useState<"ALL" | "HIGH" | "MEDIUM">("ALL");

  const quickLiveKeywords = ["react", "nextjs", "frontend", "fullstack", "node", "typescript", "python"];

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

  const filteredJobs = jobs.filter((job) => {
    const match = matchesMap.get(job.id);
    const score = match ? match.overallScore : 70;

    // Search query in current results
    const matchSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requirements.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;

    // Work Mode Filter
    if (activeWorkMode !== "ALL" && job.workMode !== activeWorkMode) return false;

    // Market Filter
    if (activeMarket !== "ALL" && job.market !== activeMarket) return false;

    // Match Score Filter
    if (matchScoreFilter === "HIGH" && score < 75) return false;
    if (matchScoreFilter === "MEDIUM" && score >= 75) return false;

    return true;
  });

  return (
    <div className="space-y-3">
      {/* Header Bar with Action Button */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-1.5">
            <span>Sàn JD Realtime Thật</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Radio size={10} className="animate-pulse" /> {filteredJobs.length} Tin Live
            </span>
          </h3>
          <p className="text-[10px] text-[var(--muted-foreground)]">
            RemoteOK Live Feed • Truy vấn thời gian thực 100%
          </p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="touch-target px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 shadow-sm transition-colors shrink-0"
        >
          <Plus size={14} />
          <span>Dán JD Mới</span>
        </button>
      </div>

      {/* Live Search Form */}
      <form onSubmit={handleLiveSearchSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Gõ từ khóa (React, Next.js, Node, Python...)"
            className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500 shadow-sm font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !searchQuery.trim()}
          className="touch-target px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50 flex items-center gap-1 shrink-0"
        >
          {isLoading ? <RefreshCw size={13} className="animate-spin" /> : <Search size={13} />}
          <span>{isLoading ? "Đang Quét..." : "Quét Realtime"}</span>
        </button>
      </form>

      {/* Quick Live Keyword Tags */}
      <div>
        <span className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider block mb-1">
          Từ khóa quét nhanh qua Live API:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
          {quickLiveKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => handleQuickKeywordClick(kw)}
              disabled={isLoading}
              className={`px-2 py-0.5 rounded-md font-mono font-medium transition-colors border ${
                searchQuery.toLowerCase() === kw
                  ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                  : "bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--surface-border)] hover:text-emerald-600 hover:border-emerald-500/50"
              }`}
            >
              #{kw}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Work Mode Filter Pills */}
      <div>
        <span className="text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider block mb-1">
          Lọc hình thức làm việc:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          <button
            onClick={() => setActiveWorkMode("ALL")}
            className={`touch-target px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeWorkMode === "ALL"
                ? "bg-[var(--foreground)] text-[var(--background)] font-semibold"
                : "bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)]"
            }`}
          >
            Tất cả hình thức
          </button>
          <button
            onClick={() => setActiveWorkMode("Remote 100%")}
            className={`touch-target px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeWorkMode === "Remote 100%"
                ? "bg-blue-600 text-white font-semibold"
                : "bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)] hover:text-blue-600"
            }`}
          >
            <Globe size={11} /> 100% Remote
          </button>
          <button
            onClick={() => setActiveWorkMode("Freelance / Contract")}
            className={`touch-target px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeWorkMode === "Freelance / Contract"
                ? "bg-emerald-600 text-white font-semibold"
                : "bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)] hover:text-emerald-600"
            }`}
          >
            <DollarSign size={11} /> Freelance / Hợp đồng
          </button>
        </div>
      </div>

      {/* Loading Skeleton Indicator */}
      {isLoading && (
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-2 animate-pulse">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600">
            <RefreshCw size={14} className="animate-spin" />
            <span>Đang kết nối RemoteOK Official API lấy việc làm mới nhất...</span>
          </div>
          <span className="text-[10px] text-[var(--muted-foreground)] block">
            100% dữ liệu thực thời gian thực • Tuyệt đối không fallback
          </span>
        </div>
      )}

      {/* Job Card List */}
      <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
        {filteredJobs.map((job) => {
          const match = matchesMap.get(job.id);
          const isSelected = job.id === selectedJobId;
          const score = match ? match.overallScore : 70;

          let scoreBadge = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
          if (score < 75) scoreBadge = "bg-amber-500/10 text-amber-600 dark:text-amber-400";
          if (score < 60) scoreBadge = "bg-red-500/10 text-red-600 dark:text-red-400";

          let workModeStyle = "bg-blue-500/10 text-blue-600";
          if (job.workMode === "Freelance / Contract") workModeStyle = "bg-emerald-500/10 text-emerald-600";
          if (job.workMode === "Hybrid") workModeStyle = "bg-purple-500/10 text-purple-600";
          if (job.workMode === "Onsite") workModeStyle = "bg-slate-500/10 text-slate-600 dark:text-slate-300";

          return (
            <div
              key={job.id}
              onClick={() => onSelectJob(job)}
              className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left ${
                isSelected
                  ? "bg-[var(--surface)] border-blue-600 shadow-md ring-1 ring-blue-600/30"
                  : "bg-[var(--surface)] border-[var(--surface-border)] hover:border-[var(--accent)] hover:shadow-sm"
              }`}
            >
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[var(--surface-subtle)] text-[var(--muted-foreground)]">
                  {job.platform}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${workModeStyle}`}>
                  {job.workMode}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-[var(--muted-foreground)]">
                  {job.market}
                </span>
              </div>

              {/* Title & Score */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[var(--foreground)] line-clamp-1 leading-snug">
                    {job.title}
                  </h4>
                  <div className="text-[10px] text-[var(--muted-foreground)] truncate mt-0.5">
                    {job.company}
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="text-right shrink-0">
                  <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${scoreBadge}`}>
                    {score}%
                  </span>
                  <span className="block text-[8px] text-[var(--muted-foreground)]">Khớp CV</span>
                </div>
              </div>

              {/* Salary & Location */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-[var(--muted-foreground)] mt-2">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {job.salary}
                </span>
                <span>•</span>
                <span className="truncate">{job.location.split("(")[0]}</span>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {job.requirements.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 rounded text-[9px] bg-[var(--surface-subtle)] text-[var(--muted-foreground)]"
                  >
                    {tech}
                  </span>
                ))}
                {job.requirements.techStack.length > 3 && (
                  <span className="px-1 py-0.5 text-[9px] text-[var(--muted-foreground)]">
                    +{job.requirements.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {!isLoading && filteredJobs.length === 0 && (
          <div className="p-8 text-center text-xs text-[var(--muted-foreground)] bg-[var(--surface)] rounded-xl border border-dashed border-[var(--surface-border)] space-y-2">
            <p className="font-semibold text-[var(--foreground)]">
              Không tìm thấy tin việc làm realtime nào cho từ khóa &quot;{searchQuery}&quot; trên sàn.
            </p>
            <p className="text-[11px] text-[var(--muted-foreground)]">
              Hệ thống tuyệt đối KHÔNG ngụy tạo fallback giả mạo. Vui lòng bấm vào các thẻ từ khóa (#react, #nextjs, #fullstack) hoặc bấm &quot;Dán JD Mới&quot; để phân tích.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
