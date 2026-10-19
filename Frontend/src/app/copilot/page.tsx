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
  RefreshCw,
  Clock,
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

  // 60-second countdown auto-refresh timer: mỗi 1s, khi = 0 và autoRefreshEnabled thì tự động gọi fetchRealLiveJobs(activeSearchTerm, true)
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#007AFF] selection:text-white pb-12 overflow-x-hidden">
      {/* iOS 18 Navigation Bar: Frosted Glassmorphism + Hairline Border */}
      <header className="sticky top-0 z-40 ios-glass border-b border-[var(--ios-hairline)] transition-all">
        <div className="copilot-container h-16 flex items-center justify-between gap-2">
          {/* Brand & Back Button */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Link
              href="/"
              className="btn-ktee-ios"
              title="Quay lại trang Portfolio cá nhân"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#007AFF] flex items-center justify-center text-white shadow-md shadow-[#007AFF]/25 shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs sm:text-sm font-bold tracking-tight text-[var(--foreground)] flex items-center gap-1.5 truncate">
                  <span>AI Career Copilot</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase badge-ios-green flex items-center gap-1 shrink-0">
                    <Radio size={9} className="animate-pulse" /> 100% Live
                  </span>
                </h1>
                <p className="text-[10px] text-[var(--muted-foreground)] hidden sm:block truncate">
                  macOS Sequoia Control Center • RemoteOK Official API • Zero Mock
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Controls: Apple Styled */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <a
              href="#contact"
              className="btn-ktee-ios btn-ktee-primary hidden sm:inline-flex"
            >
              <Code2 size={13} />
              <span>Ứng Tuyển Cùng Ktee</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="copilot-container pt-5 space-y-4 sm:space-y-6">
        {/* Live Source Status & Realtime Sync Indicator Bar */}
        <div className="p-3 sm:p-3.5 rounded-2xl ios-glass flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs border border-[var(--ios-hairline)] shadow-sm">
          {/* Left: LED sync indicator + Last Updated + Source */}
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                {autoRefreshEnabled && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    autoRefreshEnabled ? "bg-[#34C759]" : "bg-neutral-400"
                  }`}
                ></span>
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--foreground)] truncate">
                {autoRefreshEnabled ? (
                  <>
                    🟢 Đang Đồng Bộ Realtime{" "}
                    <span className="font-mono text-[#34C759] font-bold">
                      (Tự động quét sau {countdown}s)
                    </span>
                  </>
                ) : (
                  <span className="text-[var(--muted-foreground)]">
                    ⏸️ Tự động quét: Đã tạm dừng
                  </span>
                )}
              </span>
            </div>

            {lastUpdatedTime && (
              <span className="inline-flex items-center gap-1 text-[10.5px] text-[var(--foreground)] bg-[var(--ios-control-bg)] px-2.5 py-0.5 rounded-full border border-[var(--ios-hairline)] font-mono font-medium shrink-0">
                <Clock size={11} className="text-[#007AFF]" />
                <span>Vừa cập nhật: {lastUpdatedTime}</span>
              </span>
            )}

            <span className="text-[10px] text-[var(--muted-foreground)] hidden xl:inline truncate">
              • Nguồn: {lastFetchedSource}
            </span>
          </div>

          {/* Right: Controls & Actions (Toggle Switch + Nút Làm Mới Chuẩn Sếp Ktee + Keyword Tag) */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2.5 shrink-0">
            {/* Tag từ khóa active */}
            <span className="px-2 py-0.5 rounded-full badge-ios-blue text-[10px] font-mono font-bold flex items-center gap-1 shrink-0">
              <SlidersHorizontal size={10} />
              #{activeSearchTerm}
            </span>

            {/* iOS Toggle Switch Bật/Tắt Tự Động Quét (Touch target >= 44px) */}
            <div className="flex items-center gap-2 select-none">
              <span className="text-[11px] text-[var(--muted-foreground)] font-medium hidden sm:inline">
                Tự Động Quét
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={autoRefreshEnabled}
                onClick={() => setAutoRefreshEnabled((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#007AFF] before:absolute before:-inset-2 before:content-[''] ${
                  autoRefreshEnabled ? "bg-[#34C759]" : "bg-neutral-400 dark:bg-neutral-600"
                }`}
                title={autoRefreshEnabled ? "Bật: Đang tự động quét sau mỗi 60s" : "Tắt: Tạm dừng tự động quét"}
              >
                <span className="sr-only">Bật/Tắt Tự Động Quét</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    autoRefreshEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Nút Bấm Tinh Gọn Chuẩn Sếp Ktee: [ ⚡ Làm Mới Ngay ] (Height 34px, Font 11.5px, Touch Target >= 44px) */}
            <button
              type="button"
              onClick={() => fetchRealLiveJobs(activeSearchTerm, true)}
              disabled={isLoading}
              className="btn-ktee-ios btn-ktee-primary text-[11.5px] disabled:opacity-50 shrink-0"
              title="Làm mới dữ liệu việc làm thực tế ngay lập tức (Bỏ qua cache)"
            >
              <Zap size={12} className={isLoading ? "animate-spin" : ""} />
              <span>⚡ Làm Mới Ngay</span>
            </button>
          </div>
        </div>

        {/* 4 iOS KPI Widget Cards: Mandatory 2x2 grid on mobile (iPhone 14 Pro Max 430px) */}
        <section className="copilot-stats-grid">
          {/* Card 1: Total Live Jobs */}
          <div className="ios-widget-card group">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[var(--muted-foreground)] tracking-tight">
                JD Quét Realtime
              </span>
              <div className="ios-squircle-icon ios-squircle-blue">
                <Briefcase size={16} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--foreground)] tracking-tight">
                {isLoading ? "Đang tải..." : `${jobs.length} Tin`}
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px] text-[var(--muted-foreground)]">
                <span>RemoteOK Free API</span>
                <span className="font-mono text-[#007AFF] font-bold">100% Thật</span>
              </div>
            </div>
          </div>

          {/* Card 2: Average Match Score */}
          <div className="ios-widget-card group">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[var(--muted-foreground)] tracking-tight">
                Độ Phù Hợp TB
              </span>
              <div className="ios-squircle-icon ios-squircle-green">
                <TrendingUp size={16} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#34C759] tracking-tight">
                {isLoading ? "--" : `${avgMatchScore}%`}
              </div>
              {/* Apple Style Micro Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-[var(--ios-control-bg)] mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#34C759] rounded-full transition-all duration-700"
                  style={{ width: `${avgMatchScore}%` }}
                />
              </div>
              <div className="text-[10px] text-[var(--muted-foreground)] mt-1 truncate">
                Chuẩn Fullstack & BA
              </div>
            </div>
          </div>

          {/* Card 3: Skill Gaps */}
          <div className="ios-widget-card group">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[var(--muted-foreground)] tracking-tight">
                Lỗ Hổng Kỹ Năng
              </span>
              <div className="ios-squircle-icon ios-squircle-orange">
                <AlertCircle size={16} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#FF9500] tracking-tight">
                {isLoading ? "--" : `${totalCriticalGaps} Skill`}
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px] text-[var(--muted-foreground)]">
                <span>Job Đang Chọn</span>
                <span className="text-[#FF9500] font-semibold">Lộ trình 48h</span>
              </div>
            </div>
          </div>

          {/* Card 4: Proof of Work Demos */}
          <div className="ios-widget-card group">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[var(--muted-foreground)] tracking-tight">
                Proof of Work
              </span>
              <div className="ios-squircle-icon ios-squircle-purple">
                <FileCheck2 size={16} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#AF52DE] tracking-tight">
                3 Demos
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px] text-[var(--muted-foreground)]">
                <span>Interactive Sandbox</span>
                <span className="text-[#AF52DE] font-semibold">Real Domain</span>
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
              <Briefcase size={14} className="mr-1.5" />
              Sàn Việc Làm ({jobs.length})
            </button>
            <button
              onClick={() => setMobileTab("DETAILS")}
              className={`copilot-mobile-tab-btn ${mobileTab === "DETAILS" ? "active" : ""}`}
            >
              <Layers size={14} className="mr-1.5" />
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
            className={`lg:col-span-8 ${
              mobileTab === "DETAILS" ? "block" : "hidden lg:block"
            }`}
          >
            {apiError ? (
              <div className="p-6 sm:p-8 rounded-2xl ios-glass border border-red-500/30 text-center space-y-3">
                <AlertCircle size={32} className="mx-auto text-[#FF3B30]" />
                <h3 className="text-sm sm:text-base font-bold text-[#FF3B30]">
                  Lỗi Kết Nối API Realtime
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
              <div className="p-8 rounded-2xl ios-glass border border-dashed border-[var(--ios-hairline)] text-center text-xs text-[var(--muted-foreground)]">
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
