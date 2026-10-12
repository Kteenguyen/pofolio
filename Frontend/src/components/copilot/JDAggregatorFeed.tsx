"use client";

import { useState } from "react";
import { JobPosting, MatchAnalysis } from "@/types/job-copilot";
import { Search, Plus, Filter, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

interface JDAggregatorFeedProps {
  jobs: JobPosting[];
  selectedJobId: string;
  onSelectJob: (job: JobPosting) => void;
  onOpenNewModal: () => void;
  matchesMap: Map<string, MatchAnalysis>;
}

export default function JDAggregatorFeed({
  jobs,
  selectedJobId,
  onSelectJob,
  onOpenNewModal,
  matchesMap,
}: JDAggregatorFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "HIGH_MATCH" | "NEED_SKILL" | "FINTECH" | "ECOMMERCE">("ALL");

  const filteredJobs = jobs.filter((job) => {
    const match = matchesMap.get(job.id);
    const score = match ? match.overallScore : 70;

    // Search query
    const matchSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requirements.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;

    // Filter tags
    if (activeFilter === "HIGH_MATCH") return score >= 75;
    if (activeFilter === "NEED_SKILL") return score < 75;
    if (activeFilter === "FINTECH") return job.domain === "Fintech / Ngân hàng";
    if (activeFilter === "ECOMMERCE") return job.domain === "E-commerce & Bán lẻ";

    return true;
  });

  return (
    <div className="space-y-3.5">
      {/* Header Bar with Action Button */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-1.5">
            <span>Sàn JD Tác Chiến</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/10 text-blue-600">
              {filteredJobs.length} Tin
            </span>
          </h3>
          <span className="text-[11px] text-[var(--muted-foreground)]">
            Tổng hợp thời gian thực từ ITviec, TopCV, LinkedIn
          </span>
        </div>

        <button
          onClick={onOpenNewModal}
          className="touch-target px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 shadow-sm transition-colors"
        >
          <Plus size={14} />
          <span>Dán JD Mới</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm theo vị trí, công ty hoặc tech stack..."
          className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] focus:outline-none focus:border-blue-500 shadow-sm"
        />
      </div>

      {/* Quick Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
        <button
          onClick={() => setActiveFilter("ALL")}
          className={`touch-target px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeFilter === "ALL"
              ? "bg-[var(--foreground)] text-[var(--background)] font-semibold"
              : "bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)] hover:text-[var(--foreground)]"
          }`}
        >
          Tất cả ({jobs.length})
        </button>

        <button
          onClick={() => setActiveFilter("HIGH_MATCH")}
          className={`touch-target px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeFilter === "HIGH_MATCH"
              ? "bg-emerald-600 text-white font-semibold"
              : "bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)] hover:text-emerald-600"
          }`}
        >
          Khớp cao (≥75%)
        </button>

        <button
          onClick={() => setActiveFilter("NEED_SKILL")}
          className={`touch-target px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeFilter === "NEED_SKILL"
              ? "bg-amber-600 text-white font-semibold"
              : "bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)] hover:text-amber-600"
          }`}
        >
          Cần bù đắp skill
        </button>

        <button
          onClick={() => setActiveFilter("FINTECH")}
          className={`touch-target px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeFilter === "FINTECH"
              ? "bg-blue-600 text-white font-semibold"
              : "bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)] hover:text-blue-600"
          }`}
        >
          Fintech
        </button>

        <button
          onClick={() => setActiveFilter("ECOMMERCE")}
          className={`touch-target px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeFilter === "ECOMMERCE"
              ? "bg-purple-600 text-white font-semibold"
              : "bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)] hover:text-purple-600"
          }`}
        >
          E-Commerce
        </button>
      </div>

      {/* Job Card List */}
      <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
        {filteredJobs.map((job) => {
          const match = matchesMap.get(job.id);
          const isSelected = job.id === selectedJobId;
          const score = match ? match.overallScore : 70;

          let scoreBadge = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
          if (score < 75) scoreBadge = "bg-amber-500/10 text-amber-600 dark:text-amber-400";
          if (score < 60) scoreBadge = "bg-red-500/10 text-red-600 dark:text-red-400";

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
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[var(--surface-subtle)] text-[var(--muted-foreground)]">
                      {job.platform}
                    </span>
                    <span className="text-[10px] text-[var(--muted-foreground)] truncate">{job.company}</span>
                  </div>

                  <h4 className="text-xs font-bold text-[var(--foreground)] line-clamp-1 leading-snug">
                    {job.title}
                  </h4>

                  <div className="flex items-center gap-2 text-[10px] text-[var(--muted-foreground)] mt-1">
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {job.salary}
                    </span>
                    <span>•</span>
                    <span>{job.location.split("(")[0]}</span>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="text-right shrink-0">
                  <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${scoreBadge}`}>
                    {score}%
                  </span>
                  <span className="block text-[9px] text-[var(--muted-foreground)] mt-0.5">Tương thích</span>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1 mt-2.5">
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

        {filteredJobs.length === 0 && (
          <div className="p-8 text-center text-xs text-[var(--muted-foreground)] bg-[var(--surface)] rounded-xl border border-dashed border-[var(--surface-border)]">
            Không tìm thấy JD nào phù hợp bộ lọc. Hãy bấm nút "Dán JD Mới" để thêm vào hệ thống!
          </div>
        )}
      </div>
    </div>
  );
}
