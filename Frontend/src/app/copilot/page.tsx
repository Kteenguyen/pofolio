"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { initialJobFeed, defaultCandidateProfile } from "@/data/mockJobFeed";
import { JobPosting, MatchAnalysis } from "@/types/job-copilot";
import { calculateMatch } from "@/lib/careerEngine";
import JDAggregatorFeed from "@/components/copilot/JDAggregatorFeed";
import MatchDetailsPanel from "@/components/copilot/MatchDetailsPanel";
import NewJDModal from "@/components/copilot/NewJDModal";
import {
  Code2,
  Sparkles,
  ArrowLeft,
  Briefcase,
  TrendingUp,
  AlertCircle,
  FileCheck2,
} from "lucide-react";

export default function CopilotPage() {
  const [jobs, setJobs] = useState<JobPosting[]>(initialJobFeed);
  const [selectedJobId, setSelectedJobId] = useState<string>(initialJobFeed[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"FEED" | "DETAILS">("DETAILS");

  // Precompute match analysis for all jobs
  const matchesMap = useMemo(() => {
    const map = new Map<string, MatchAnalysis>();
    for (const j of jobs) {
      map.set(j.id, calculateMatch(j, defaultCandidateProfile));
    }
    return map;
  }, [jobs]);

  const selectedJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || jobs[0];
  }, [jobs, selectedJobId]);

  const selectedMatch = useMemo(() => {
    return matchesMap.get(selectedJob.id) || calculateMatch(selectedJob, defaultCandidateProfile);
  }, [selectedJob, matchesMap]);

  // Overall Statistics
  const avgMatchScore = useMemo(() => {
    let sum = 0;
    matchesMap.forEach((m) => (sum += m.overallScore));
    return Math.round(sum / Math.max(1, matchesMap.size));
  }, [matchesMap]);

  const totalCriticalGaps = useMemo(() => {
    return selectedMatch.criticalGaps.length;
  }, [selectedMatch]);

  const handleJobAdded = (newJob: JobPosting) => {
    setJobs([newJob, ...jobs]);
    setSelectedJobId(newJob.id);
    setMobileTab("DETAILS");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600 selection:text-white pb-12">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--surface-border)]">
        <div className="copilot-container h-16 flex items-center justify-between">
          {/* Brand & Back Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="touch-target px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] bg-[var(--surface-subtle)] border border-[var(--surface-border)] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Về Portfolio</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                <Sparkles size={16} />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-[var(--foreground)] flex items-center gap-1.5">
                  <span>AI Career Copilot</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-blue-600 text-white">
                    Live
                  </span>
                </h1>
                <p className="text-[10px] text-[var(--muted-foreground)] hidden sm:block">
                  Đối soát CV & Kiến trúc Proof-of-Work thực chiến
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href="#contact"
              className="touch-target px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Code2 size={14} />
              <span>Ứng Tuyển Cùng Ktee</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="copilot-container pt-6 space-y-6">
        {/* 4 Stats Grid: Mandatory 2x2 grid on mobile (iPhone 14 Pro Max 430px) */}
        <section className="copilot-stats-grid">
          {/* Box 1 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[var(--muted-foreground)] mb-1">
              <span className="text-[11px] font-medium">JD Quét Realtime</span>
              <Briefcase size={15} className="text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--foreground)]">
              {jobs.length} Tin
            </div>
            <span className="text-[10px] text-[var(--muted-foreground)] mt-1">ITviec, TopCV, LinkedIn</span>
          </div>

          {/* Box 2 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[var(--muted-foreground)] mb-1">
              <span className="text-[11px] font-medium">Độ Phù Hợp Bình Quân</span>
              <TrendingUp size={15} className="text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {avgMatchScore}%
            </div>
            <span className="text-[10px] text-[var(--muted-foreground)] mt-1">Chuẩn Fullstack & BA</span>
          </div>

          {/* Box 3 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[var(--muted-foreground)] mb-1">
              <span className="text-[11px] font-medium">Lỗ Hổng Cần Bù Đắp</span>
              <AlertCircle size={15} className="text-amber-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
              {totalCriticalGaps} Skill
            </div>
            <span className="text-[10px] text-[var(--muted-foreground)] mt-1">Có Roadmap 48h</span>
          </div>

          {/* Box 4 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[var(--muted-foreground)] mb-1">
              <span className="text-[11px] font-medium">Proof of Work Sẵn Sàng</span>
              <FileCheck2 size={15} className="text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
              3 Demos
            </div>
            <span className="text-[10px] text-[var(--muted-foreground)] mt-1">Live Interactive Widget</span>
          </div>
        </section>

        {/* Mobile View Tab Switcher (< 768px) */}
        <div className="block lg:hidden">
          <div className="copilot-mobile-tab-bar">
            <button
              onClick={() => setMobileTab("FEED")}
              className={`copilot-mobile-tab-btn touch-target ${
                mobileTab === "FEED"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Sàn JD Tuyển Dụng ({jobs.length})
            </button>
            <button
              onClick={() => setMobileTab("DETAILS")}
              className={`copilot-mobile-tab-btn touch-target ${
                mobileTab === "DETAILS"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Phân Tích & Proof-of-Work
            </button>
          </div>
        </div>

        {/* Main Work Area: Master-Detail Split Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Feed Column */}
          <div
            className={`lg:col-span-4 ${
              mobileTab === "FEED" ? "block" : "hidden lg:block"
            }`}
          >
            <JDAggregatorFeed
              jobs={jobs}
              selectedJobId={selectedJob.id}
              onSelectJob={(j) => {
                setSelectedJobId(j.id);
                setMobileTab("DETAILS");
              }}
              onOpenNewModal={() => setIsModalOpen(true)}
              matchesMap={matchesMap}
            />
          </div>

          {/* Right Details Column */}
          <div
            className={`lg:col-span-8 ${
              mobileTab === "DETAILS" ? "block" : "hidden lg:block"
            }`}
          >
            <MatchDetailsPanel
              job={selectedJob}
              candidate={defaultCandidateProfile}
              match={selectedMatch}
            />
          </div>
        </section>
      </main>

      {/* New JD Ingestion Modal */}
      <NewJDModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJobAdded={handleJobAdded}
      />
    </div>
  );
}
