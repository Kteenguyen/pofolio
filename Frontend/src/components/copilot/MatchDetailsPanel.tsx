"use client";

import { useState, useEffect } from "react";
import { JobPosting, CVCandidateProfile, MatchAnalysis } from "@/types/job-copilot";
import FintechLedgerDemo from "./proof-of-work/FintechLedgerDemo";
import EcommerceCheckoutDemo from "./proof-of-work/EcommerceCheckoutDemo";
import EnterpriseKanbanDemo from "./proof-of-work/EnterpriseKanbanDemo";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Briefcase,
  Building,
  MapPin,
  Clock,
  Sparkles,
  Globe,
  ExternalLink,
  ShieldCheck,
  Zap,
  FileText,
  Target,
  FlaskConical,
  Layers,
  ChevronRight,
} from "lucide-react";

interface MatchDetailsPanelProps {
  job: JobPosting;
  candidate: CVCandidateProfile;
  match: MatchAnalysis;
}

type DetailTab = "OVERVIEW" | "GAPS" | "SANDBOX";
type SandboxDemoType = "fintech-ledger" | "ecommerce-checkout" | "saas-kanban";

export default function MatchDetailsPanel({ job, candidate, match }: MatchDetailsPanelProps) {
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>("OVERVIEW");
  const [activeDemo, setActiveDemo] = useState<SandboxDemoType>(
    (match.preEmployIdea?.demoType as SandboxDemoType) || "fintech-ledger"
  );

  // Sync default demo when job changes
  useEffect(() => {
    if (match.preEmployIdea?.demoType) {
      setActiveDemo(match.preEmployIdea.demoType as SandboxDemoType);
    }
  }, [match.preEmployIdea?.demoType]);

  // Determine badge color Apple Vibrant
  let scoreBadgeClass = "badge-ios-green";
  if (match.overallScore < 75) scoreBadgeClass = "badge-ios-orange";
  if (match.overallScore < 60) scoreBadgeClass = "badge-ios-red";

  // Work mode badge style
  let workModeBadgeClass = "badge-ios-blue";
  if (job.workMode === "Freelance / Contract") workModeBadgeClass = "badge-ios-green";
  if (job.workMode === "Hybrid") workModeBadgeClass = "badge-ios-purple";
  if (job.workMode === "Onsite") workModeBadgeClass = "badge-ios-orange";

  return (
    <div className="space-y-3">
      {/* 1. Header Card: Job Info & Application Action */}
      <div className="ios-glass-card p-3.5 sm:p-4 border border-[var(--ios-hairline)] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase bg-[var(--ios-blue)] text-white tracking-wider">
                {job.platform}
              </span>
              <span className={`px-2 py-0.2 rounded-full text-[8.5px] font-bold ${workModeBadgeClass}`}>
                {job.workMode}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[8.5px] font-medium bg-[var(--ios-control-bg)] text-[var(--muted-foreground)] border border-[var(--ios-hairline)]">
                {job.market}
              </span>
              <span className="text-[10px] text-[var(--muted-foreground)] flex items-center gap-1 ml-0.5 font-mono">
                <Clock size={10} /> {job.postedAt}
              </span>
            </div>

            <h2 className="text-sm sm:text-base font-bold text-[var(--foreground)] tracking-tight leading-snug line-clamp-2">
              {job.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--muted-foreground)] mt-1.5">
              <span className="font-semibold text-[var(--foreground)] flex items-center gap-1 truncate">
                <Building size={12} className="text-[var(--ios-blue)] shrink-0" />
                <span className="truncate">{job.company}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 truncate">
                <MapPin size={12} className="shrink-0" />
                <span className="truncate">{job.location}</span>
              </span>
              <span>•</span>
              <span className="font-mono font-bold text-[#34C759] text-xs">
                {job.salary}
              </span>
            </div>
          </div>

          {/* Deep Link Button - Apple Primary Action Button */}
          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-1 mt-1 sm:mt-0">
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ktee-ios btn-ktee-primary h-8 px-3 text-[11px] font-bold shrink-0"
              title="Mở bài đăng thật trên RemoteOK để nộp đơn trực tiếp"
            >
              <span>Nộp Đơn Bài Đăng Thật</span>
              <ExternalLink size={11} />
            </a>
            <span className="text-[9.5px] text-[var(--muted-foreground)] flex items-center gap-1 font-mono">
              <ShieldCheck size={10} className="text-[#34C759]" /> RemoteOK Deep Link
            </span>
          </div>
        </div>

        {/* Deep URL Inspector Preview */}
        <div className="p-1.5 rounded-lg bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)] text-[10px] font-mono text-[var(--muted-foreground)] truncate mt-2.5 flex items-center gap-1.5">
          <Globe size={11} className="text-[var(--ios-blue)] shrink-0" />
          <span className="truncate">{job.url}</span>
        </div>
      </div>

      {/* 2. iOS High-Density Segmented Sub-Tabs */}
      <div className="ios-segmented-tabs w-full">
        <button
          type="button"
          onClick={() => setActiveDetailTab("OVERVIEW")}
          className={`ios-segmented-tab-btn ${activeDetailTab === "OVERVIEW" ? "active" : ""}`}
        >
          <FileText size={12} />
          <span>Tổng Quan & JD Gốc</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDetailTab("GAPS")}
          className={`ios-segmented-tab-btn ${activeDetailTab === "GAPS" ? "active" : ""}`}
        >
          <Target size={12} />
          <span>Phân Tích Gaps ({match.overallScore}%)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDetailTab("SANDBOX")}
          className={`ios-segmented-tab-btn ${activeDetailTab === "SANDBOX" ? "active" : ""}`}
        >
          <FlaskConical size={12} />
          <span>Interactive Sandbox</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* === TAB 1: OVERVIEW & RAW JD === */}
      {activeDetailTab === "OVERVIEW" && (
        <div className="space-y-3">
          {/* Summary Box */}
          <div className="ios-inset-card p-3 sm:p-4 border border-[var(--ios-hairline)] space-y-2">
            <h4 className="text-[11.5px] font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#007AFF]" />
              <span>Tóm Tắt Yêu Cầu Vị Trí</span>
            </h4>
            <p className="text-xs leading-relaxed text-[var(--foreground)] opacity-90">
              {job.summary}
            </p>
          </div>

          {/* Requirements Grid (Must have & Nice to have) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {/* Must-have */}
            <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--ios-hairline)] space-y-2">
              <div className="text-[11px] font-bold text-[var(--foreground)] flex items-center justify-between">
                <span>Yêu Cầu Bắt Buộc (Must-have)</span>
                <span className="text-[10px] font-mono text-[var(--ios-blue)]">
                  {job.requirements.mustHave.length} mục
                </span>
              </div>
              <ul className="space-y-1">
                {job.requirements.mustHave.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[var(--muted-foreground)]">
                    <ChevronRight size={11} className="text-[#007AFF] shrink-0 mt-0.5" />
                    <span className="leading-snug text-[var(--foreground)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice-to-have & Tech Stack */}
            <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--ios-hairline)] space-y-2">
              <div className="text-[11px] font-bold text-[var(--foreground)] flex items-center justify-between">
                <span>Ưu Tiên & Tech Stack</span>
                <span className="text-[10px] font-mono text-[var(--ios-green)]">
                  {job.requirements.techStack.length} techs
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {job.requirements.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-medium badge-ios-blue"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {job.requirements.niceToHave.length > 0 && (
                <ul className="space-y-1 pt-1.5 border-t border-[var(--ios-hairline)]">
                  {job.requirements.niceToHave.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[10.5px] text-[var(--muted-foreground)]">
                      <span className="text-[#34C759] shrink-0 font-bold">•</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Raw JD Section */}
          <div className="ios-inset-card p-3 sm:p-4 border border-[var(--ios-hairline)] space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[11.5px] font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={12} className="text-[var(--muted-foreground)]" />
                <span>Nội Dung JD Gốc Từ Nhà Tuyển Dụng</span>
              </h4>
              <span className="text-[10px] font-mono text-[var(--muted-foreground)]">
                RemoteOK API Dump
              </span>
            </div>

            <div className="max-h-[260px] overflow-y-auto pr-1 scrollbar-thin p-2.5 rounded-lg bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)] text-[11px] text-[var(--foreground)] leading-relaxed whitespace-pre-line font-mono opacity-85">
              {job.rawDescription || job.summary}
            </div>
          </div>
        </div>
      )}

      {/* === TAB 2: GAPS ANALYSIS & 48H ROADMAP === */}
      {activeDetailTab === "GAPS" && (
        <div className="space-y-3">
          {/* Header Score Overview */}
          <div className="ios-inset-card p-3 sm:p-4 border border-[var(--ios-hairline)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ios-hairline)] pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="ios-squircle-icon ios-squircle-blue">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                    Đo Lường Độ Tương Thích Năng Lực
                  </h3>
                  <p className="text-[10px] text-[var(--muted-foreground)]">
                    Thuật toán đối soát năng lực ứng viên Ktee theo JD
                  </p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono ${scoreBadgeClass}`}>
                {match.overallScore}% • {match.matchTier}
              </span>
            </div>

            {/* 3 Metric Breakdown Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
              {/* Hard Skills */}
              <div className="p-2.5 rounded-xl bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)]">
                <div className="flex justify-between items-center text-[10.5px] mb-1">
                  <span className="font-semibold text-[var(--foreground)]">Kỹ Năng Cốt Lõi</span>
                  <span className="font-mono font-bold text-[#007AFF]">{match.hardSkillScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface)] overflow-hidden border border-[var(--ios-hairline)]">
                  <div
                    className="h-full bg-[#007AFF] rounded-full transition-all duration-700"
                    style={{ width: `${match.hardSkillScore}%` }}
                  />
                </div>
                <span className="block text-[9.5px] text-[var(--muted-foreground)] mt-1 truncate">
                  React, Next.js, Node, TS
                </span>
              </div>

              {/* Scale & Experience */}
              <div className="p-2.5 rounded-xl bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)]">
                <div className="flex justify-between items-center text-[10.5px] mb-1">
                  <span className="font-semibold text-[var(--foreground)]">Quy Mô & Dự Án</span>
                  <span className="font-mono font-bold text-[#34C759]">{match.scaleAndExpScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface)] overflow-hidden border border-[var(--ios-hairline)]">
                  <div
                    className="h-full bg-[#34C759] rounded-full transition-all duration-700"
                    style={{ width: `${match.scaleAndExpScore}%` }}
                  />
                </div>
                <span className="block text-[9.5px] text-[var(--muted-foreground)] mt-1 truncate">
                  FPT IS 230+ users, TDTU
                </span>
              </div>

              {/* BA & Domain */}
              <div className="p-2.5 rounded-xl bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)]">
                <div className="flex justify-between items-center text-[10.5px] mb-1">
                  <span className="font-semibold text-[var(--foreground)]">Nghiệp Vụ BA</span>
                  <span className="font-mono font-bold text-[#AF52DE]">{match.domainBaScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface)] overflow-hidden border border-[var(--ios-hairline)]">
                  <div
                    className="h-full bg-[#AF52DE] rounded-full transition-all duration-700"
                    style={{ width: `${match.domainBaScore}%` }}
                  />
                </div>
                <span className="block text-[9.5px] text-[var(--muted-foreground)] mt-1 truncate">
                  Phân tích, UML, Stakeholders
                </span>
              </div>
            </div>

            {/* Skill Gap Matrix */}
            <div className="space-y-2">
              <span className="text-[10.5px] font-bold text-[var(--foreground)] uppercase tracking-wider block">
                Ma Trận Khoảng Trống Kỹ Năng
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Critical Gaps */}
                <div className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#FF3B30] mb-1.5">
                    <XCircle size={13} />
                    <span>Thiếu Bắt Buộc ({match.criticalGaps.length})</span>
                  </div>
                  {match.criticalGaps.length === 0 ? (
                    <span className="text-[10px] text-[#34C759] flex items-center gap-1 font-medium">
                      <CheckCircle2 size={12} className="shrink-0" />
                      <span>Đáp ứng 100% cốt lõi!</span>
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {match.criticalGaps.map((gap) => (
                        <span
                          key={gap}
                          className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-medium badge-ios-red"
                        >
                          {gap}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Moderate Gaps */}
                <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#FF9500] mb-1.5">
                    <AlertTriangle size={13} />
                    <span>Cần Trau Dồi ({match.moderateGaps.length})</span>
                  </div>
                  {match.moderateGaps.length === 0 ? (
                    <span className="text-[10px] text-[#34C759] flex items-center gap-1 font-medium">
                      <CheckCircle2 size={12} className="shrink-0" />
                      <span>Không có thiếu sót</span>
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {match.moderateGaps.map((gap) => (
                        <span
                          key={gap}
                          className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-medium badge-ios-orange"
                        >
                          {gap}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Matched Skills */}
                <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#34C759] mb-1.5">
                    <CheckCircle2 size={13} />
                    <span>Trùng Khớp ({match.matchedSkills.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto scrollbar-thin">
                    {match.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-medium badge-ios-green"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 48h Action Recommendations */}
            <div className="mt-3 pt-2.5 border-t border-[var(--ios-hairline)]">
              <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--foreground)] mb-1.5">
                <Zap size={13} className="text-[#FF9500]" />
                <span>Lộ Trình Bù Đắp Khoảng Trống Trong 48 Giờ</span>
              </div>
              <div className="space-y-1">
                {match.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)] flex items-start gap-2 text-xs"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[9px] font-bold font-mono shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-snug text-[var(--foreground)] text-[11px]">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === TAB 3: PROOF-OF-WORK INTERACTIVE SANDBOX === */}
      {activeDetailTab === "SANDBOX" && (
        <div className="ios-inset-card p-3 sm:p-4 border border-[var(--ios-hairline)] space-y-3">
          {/* Header & Demo Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--ios-hairline)] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="ios-squircle-icon ios-squircle-purple">
                <Briefcase size={14} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                  Interactive Proof-of-Work Widgets
                </h3>
                <p className="text-[10px] text-[var(--muted-foreground)]">
                  Mô phỏng nghiệp vụ thực chiến theo Domain JD ({job.company})
                </p>
              </div>
            </div>

            {/* 3 Demos Segmented Quick Switcher */}
            <div className="ios-segmented-control shrink-0">
              <button
                type="button"
                onClick={() => setActiveDemo("fintech-ledger")}
                className={`ios-segmented-item ${activeDemo === "fintech-ledger" ? "active" : ""}`}
              >
                Fintech
              </button>
              <button
                type="button"
                onClick={() => setActiveDemo("ecommerce-checkout")}
                className={`ios-segmented-item ${activeDemo === "ecommerce-checkout" ? "active" : ""}`}
              >
                Checkout
              </button>
              <button
                type="button"
                onClick={() => setActiveDemo("saas-kanban")}
                className={`ios-segmented-item ${activeDemo === "saas-kanban" ? "active" : ""}`}
              >
                Kanban
              </button>
            </div>
          </div>

          {/* Active Demo Widget */}
          <div className="overflow-x-hidden">
            {activeDemo === "fintech-ledger" && (
              <FintechLedgerDemo companyName={job.company} />
            )}
            {activeDemo === "ecommerce-checkout" && (
              <EcommerceCheckoutDemo companyName={job.company} />
            )}
            {activeDemo === "saas-kanban" && (
              <EnterpriseKanbanDemo companyName={job.company} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
