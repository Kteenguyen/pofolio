"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { defaultCandidateProfile } from "@/data/mockJobFeed";
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
  Radio,
  SlidersHorizontal,
  Layers,
  Zap,
} from "lucide-react";

export default function CopilotPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"FEED" | "DETAILS">("DETAILS");
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastFetchedSource, setLastFetchedSource] = useState<string>("RemoteOK Official Live API");
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>("react");
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>("");
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(60);

  // Fetch 100% real live jobs from API (Zero Mock / Zero Fallback)
  const fetchRealLiveJobs = async (query = "react", isForce = false) => {
    setIsLoading(true);
    setApiError(null);
    setActiveSearchTerm(query);
    try {
      const url = `/api/jobs/search?q=${encodeURIComponent(query)}${isForce ? "&force=true" : ""}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Máy chủ trả về mã HTTP ${res.status}`);
      }
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setJobs(json.data);
        if (json.data.length > 0) {
          if (!selectedJobId || !json.data.some((j: JobPosting) => j.id === selectedJobId)) {
            setSelectedJobId(json.data[0].id);
          }
        }
        setLastFetchedSource(json.source || "RemoteOK Official Live API");
        const now = new Date();
        setLastUpdatedTime(
          now.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        );
        setCountdown(60);
      } else {
        throw new Error(json.error || "Không thể tải danh sách việc làm thực tế");
      }
    } catch (err) {
      console.error("Lỗi fetch real jobs:", err);
      setApiError(err instanceof Error ? err.message : "Lỗi kết nối API");
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial mount: load real jobs
  useEffect(() => {
    fetchRealLiveJobs("react", false);
  }, []);

  // 60-second countdown auto-refresh timer
  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchRealLiveJobs(activeSearchTerm, true);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRefreshEnabled, activeSearchTerm]);

  // Precompute match analysis for all jobs
  const matchesMap = useMemo(() => {
    const map = new Map<string, MatchAnalysis>();
    for (const j of jobs) {
      map.set(j.id, calculateMatch(j, defaultCandidateProfile));
    }
    return map;
  }, [jobs]);

  const selectedJob = useMemo(() => {
    if (jobs.length === 0) return null;
    return jobs.find((j) => j.id === selectedJobId) || jobs[0];
  }, [jobs, selectedJobId]);

  const selectedMatch = useMemo(() => {
    if (!selectedJob) return null;
    return matchesMap.get(selectedJob.id) || calculateMatch(selectedJob, defaultCandidateProfile);
  }, [selectedJob, matchesMap]);

  // Overall Statistics
  const avgMatchScore = useMemo(() => {
    if (matchesMap.size === 0) return 0;
    let sum = 0;
    matchesMap.forEach((m) => (sum += m.overallScore));
    return Math.round(sum / matchesMap.size);
  }, [matchesMap]);

  const totalCriticalGaps = useMemo(() => {
    if (!selectedMatch) return 0;
    return selectedMatch.criticalGaps.length;
  }, [selectedMatch]);

  const handleJobAdded = (newJob: JobPosting) => {
    setJobs([newJob, ...jobs]);
    setSelectedJobId(newJob.id);
    setMobileTab("DETAILS");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#007AFF] selection:text-white pb-8 overflow-x-hidden">
      {/* iOS 18 Compact Unified Toolbar: Merged Top Bar + Live Sync Indicator */}
      <header className="sticky top-0 z-40 ios-glass border-b border-[var(--ios-hairline)] transition-all">
        <div className="copilot-container-compact h-13 sm:h-14 flex items-center justify-between gap-2">
          {/* Left: Portfolio Back + Squircle + App Name + Live Pulse LED + Countdown */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/"
              className="btn-ktee-ios shrink-0"
              title="Quay lại Portfolio"
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#007AFF] flex items-center justify-center text-white shadow-sm shadow-[#007AFF]/30 shrink-0">
                <Sparkles size={14} />
              </div>
              <div className="min-w-0 flex items-center gap-1.5">
                <h1 className="text-xs sm:text-sm font-bold tracking-tight text-[var(--foreground)] truncate">
                  AI Career Copilot
                </h1>
                
                {/* Live Realtime Pulse LED Badge */}
                <div className="hidden xs:flex items-center gap-1 px-1.5 py-0.5 rounded-full badge-ios-green text-[9px] font-mono font-bold shrink-0">
                  <span className="relative flex h-2 w-2 shrink-0">
                    {autoRefreshEnabled && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75"></span>
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        autoRefreshEnabled ? "bg-[#34C759]" : "bg-neutral-400"
                      }`}
                    ></span>
                  </span>
                  <span>
                    {autoRefreshEnabled ? `Quét sau: ${countdown}s` : "Tạm dừng"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Tag + Làm Mới + Auto Toggle + ThemeToggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Active search keyword pill */}
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full badge-ios-blue text-[9.5px] font-mono font-bold shrink-0">
              <SlidersHorizontal size={9} />
              #{activeSearchTerm}
            </span>

            {/* iOS Auto-sync Toggle (Touch Target >= 44px) */}
            <div
              className="flex items-center gap-1.5 select-none"
              title={autoRefreshEnabled ? `Tự động quét mỗi 60s (còn ${countdown}s)` : "Tự động quét đã tạm dừng"}
            >
              <span className="text-[10.5px] text-[var(--muted-foreground)] font-medium hidden lg:inline">
                Tự Động
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={autoRefreshEnabled}
                onClick={() => setAutoRefreshEnabled((prev) => !prev)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#007AFF] before:absolute before:-inset-2 before:content-[''] ${
                  autoRefreshEnabled ? "bg-[#34C759]" : "bg-neutral-400 dark:bg-neutral-600"
                }`}
              >
                <span className="sr-only">Bật/Tắt Tự Động Quét</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    autoRefreshEnabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Quick Refresh Button (32px, Font 11.5px, Touch Target >= 44px) */}
            <button
              type="button"
              onClick={() => fetchRealLiveJobs(activeSearchTerm, true)}
              disabled={isLoading}
              className="btn-ktee-ios btn-ktee-primary shrink-0 disabled:opacity-50"
              title="Làm mới dữ liệu việc làm thực tế ngay lập tức (Bỏ qua cache)"
            >
              <Zap size={11} className={isLoading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">⚡ Làm Mới</span>
            </button>

            <ThemeToggle />

            <a
              href="#contact"
              className="btn-ktee-ios btn-ktee-green hidden xl:inline-flex shrink-0"
            >
              <Code2 size={12} />
              <span>Ứng Tuyển</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Work Area */}
      <main className="copilot-container-compact pt-3 sm:pt-4 space-y-2.5 sm:space-y-3">
        {/* 4 iOS KPI Horizontal Cards: 68px Height, Compact & Balanced */}
        <section className="copilot-stats-grid">
          {/* Card 1: Live Scanned Jobs */}
          <div className="ios-kpi-card">
            <div className="ios-squircle-icon ios-squircle-blue">
              <Briefcase size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-[10.5px] text-[var(--muted-foreground)] font-semibold truncate">
                <span className="truncate">JD Quét Realtime</span>
                <span className="text-[#007AFF] font-bold text-[9px] shrink-0 ml-1">100% Thật</span>
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-[var(--foreground)] tracking-tight leading-tight mt-0.5 truncate">
                {isLoading ? "Đang tải..." : `${jobs.length} Tin`}
              </div>
            </div>
          </div>

          {/* Card 2: Average Match Score */}
          <div className="ios-kpi-card">
            <div className="ios-squircle-icon ios-squircle-green">
              <TrendingUp size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-[10.5px] text-[var(--muted-foreground)] font-semibold truncate">
                <span className="truncate">Độ Phù Hợp TB</span>
                <span className="text-[#34C759] font-bold text-[9px] shrink-0 ml-1">Fullstack/BA</span>
              </div>
              <div className="flex items-center justify-between gap-1.5 mt-0.5">
                <span className="text-sm sm:text-base font-bold font-mono text-[#34C759] tracking-tight leading-tight">
                  {isLoading ? "--" : `${avgMatchScore}%`}
                </span>
                <div className="flex-1 max-w-[44px] h-1.5 rounded-full bg-[var(--ios-control-bg)] overflow-hidden">
                  <div
                    className="h-full bg-[#34C759] rounded-full transition-all duration-700"
                    style={{ width: `${avgMatchScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Skill Gaps */}
          <div className="ios-kpi-card">
            <div className="ios-squircle-icon ios-squircle-orange">
              <AlertCircle size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-[10.5px] text-[var(--muted-foreground)] font-semibold truncate">
                <span className="truncate">Lỗ Hổng Kỹ Năng</span>
                <span className="text-[#FF9500] font-bold text-[9px] shrink-0 ml-1">Lộ trình 48h</span>
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-[#FF9500] tracking-tight leading-tight mt-0.5 truncate">
                {isLoading ? "--" : `${totalCriticalGaps} Skill`}
              </div>
            </div>
          </div>

          {/* Card 4: Proof of Work */}
          <div className="ios-kpi-card">
            <div className="ios-squircle-icon ios-squircle-purple">
              <FileCheck2 size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-[10.5px] text-[var(--muted-foreground)] font-semibold truncate">
                <span className="truncate">Proof of Work</span>
                <span className="text-[#AF52DE] font-bold text-[9px] shrink-0 ml-1">Interactive</span>
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-[#AF52DE] tracking-tight leading-tight mt-0.5 truncate">
                3 Demos
              </div>
            </div>
          </div>
        </section>

        {/* Mobile View iOS Segmented Tab Switcher (< 1024px) */}
        <div className="block lg:hidden">
          <div className="copilot-mobile-tab-bar">
            <button
              onClick={() => setMobileTab("FEED")}
              className={`copilot-mobile-tab-btn ${mobileTab === "FEED" ? "active" : ""}`}
            >
              <Briefcase size={13} className="mr-1" />
              Sàn JD ({jobs.length})
            </button>
            <button
              onClick={() => setMobileTab("DETAILS")}
              className={`copilot-mobile-tab-btn ${mobileTab === "DETAILS" ? "active" : ""}`}
            >
              <Layers size={13} className="mr-1" />
              Phân Tích & Demos
            </button>
          </div>
        </div>

        {/* Main Work Area: Master-Detail Split Grid (Compact gap-3) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
          {/* Left Feed Column */}
          <div
            className={`lg:col-span-5 xl:col-span-4 ${
              mobileTab === "FEED" ? "block" : "hidden lg:block"
            }`}
          >
            <JDAggregatorFeed
              jobs={jobs}
              selectedJobId={selectedJob?.id || ""}
              onSelectJob={(j) => {
                setSelectedJobId(j.id);
                setMobileTab("DETAILS");
              }}
              onOpenNewModal={() => setIsModalOpen(true)}
              matchesMap={matchesMap}
              isLoading={isLoading}
              onSearchLive={(q) => fetchRealLiveJobs(q)}
              onRefreshLive={() => fetchRealLiveJobs(activeSearchTerm, true)}
              lastUpdatedTime={lastUpdatedTime}
              autoRefreshEnabled={autoRefreshEnabled}
              countdown={countdown}
            />
          </div>

          {/* Right Details Column */}
          <div
            className={`lg:col-span-7 xl:col-span-8 ${
              mobileTab === "DETAILS" ? "block" : "hidden lg:block"
            }`}
          >
            {apiError ? (
              <div className="p-5 sm:p-6 rounded-xl ios-glass border border-red-500/30 text-center space-y-2.5">
                <AlertCircle size={28} className="mx-auto text-[#FF3B30]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#FF3B30]">
                  Lỗi Kết Nối API Realtime: {apiError}
                </h3>
                <button
                  onClick={() => fetchRealLiveJobs(activeSearchTerm, true)}
                  className="btn-ktee-ios btn-ktee-primary"
                >
                  Thử Lại Kết Nối
                </button>
              </div>
            ) : selectedJob && selectedMatch ? (
              <MatchDetailsPanel
                job={selectedJob}
                candidate={defaultCandidateProfile}
                match={selectedMatch}
              />
            ) : (
              <div className="p-6 rounded-xl ios-glass border border-dashed border-[var(--ios-hairline)] text-center text-xs text-[var(--muted-foreground)]">
                {isLoading
                  ? "Đang truy vấn dữ liệu việc làm thực tế từ RemoteOK Official API..."
                  : "Chưa có việc làm nào được chọn. Hãy chọn một công việc từ sàn việc làm."}
              </div>
            )}
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
