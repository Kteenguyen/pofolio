"use client";

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
} from "lucide-react";

interface MatchDetailsPanelProps {
  job: JobPosting;
  candidate: CVCandidateProfile;
  match: MatchAnalysis;
}

export default function MatchDetailsPanel({ job, candidate, match }: MatchDetailsPanelProps) {
  // Determine badge color Apple Vibrant
  let scoreBadgeClass = "badge-ios-green";
  if (match.overallScore < 75) {
    scoreBadgeClass = "badge-ios-orange";
  }
  if (match.overallScore < 60) {
    scoreBadgeClass = "badge-ios-red";
  }

  // Work mode badge style
  let workModeBadgeClass = "badge-ios-blue";
  if (job.workMode === "Freelance / Contract") workModeBadgeClass = "badge-ios-green";
  if (job.workMode === "Hybrid") workModeBadgeClass = "badge-ios-purple";
  if (job.workMode === "Onsite") workModeBadgeClass = "badge-ios-orange";

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. iOS Detail Sheet: Header Card with Deep Link Application CTA */}
      <div className="ios-glass-card p-4 sm:p-6 border border-[var(--ios-hairline)] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[var(--ios-blue)] text-white tracking-wider">
                {job.platform}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${workModeBadgeClass}`}>
                {job.workMode}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-[var(--ios-control-bg)] text-[var(--muted-foreground)] border border-[var(--ios-hairline)]">
                {job.market}
              </span>
              <span className="text-[11px] text-[var(--muted-foreground)] flex items-center gap-1 ml-1 font-mono">
                <Clock size={11} /> {job.postedAt}
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-bold text-[var(--foreground)] tracking-tight leading-snug">
              {job.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[var(--muted-foreground)] mt-2">
              <span className="font-semibold text-[var(--foreground)] flex items-center gap-1 truncate">
                <Building size={13} className="text-[var(--ios-blue)] shrink-0" />
                <span className="truncate">{job.company}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 truncate">
                <MapPin size={13} className="shrink-0" />
                <span className="truncate">{job.location}</span>
              </span>
              <span>•</span>
              <span className="font-mono font-bold text-[#34C759] text-xs sm:text-sm">
                {job.salary}
              </span>
            </div>
          </div>

          {/* Deep Link Button - Apple Primary Action Button */}
          <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-1.5 w-full sm:w-auto mt-2 sm:mt-0">
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ktee-ios btn-ktee-primary w-full sm:w-auto h-9 px-4 text-xs font-bold"
              title="Mở bài đăng gốc trên RemoteOK để nộp đơn trực tiếp"
            >
              <span>Ứng Tuyển Bài Đăng Thật</span>
              <ExternalLink size={13} />
            </a>
            <span className="text-[10px] text-[var(--muted-foreground)] flex items-center justify-center sm:justify-end gap-1 font-mono">
              <ShieldCheck size={11} className="text-[#34C759]" /> RemoteOK Deep Link 100%
            </span>
          </div>
        </div>

        {/* Deep URL Inspector Preview */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)] text-[10.5px] font-mono text-[var(--muted-foreground)] truncate mt-3 flex items-center gap-2">
          <Globe size={13} className="text-[var(--ios-blue)] shrink-0" />
          <span className="truncate">{job.url}</span>
        </div>

        <p className="text-xs leading-relaxed text-[var(--foreground)] border-t border-[var(--ios-hairline)] pt-3 mt-3 opacity-90">
          {job.summary}
        </p>
      </div>

      {/* 2. iOS Inset Grouped Card: Match Score & 3-Tier Breakdown */}
      <div className="ios-inset-card p-4 sm:p-5 border border-[var(--ios-hairline)]">
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[var(--ios-hairline)] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="ios-squircle-icon ios-squircle-blue">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                Đo Lường Độ Tương Thích Năng Lực
              </h3>
              <p className="text-[10px] text-[var(--muted-foreground)]">
                Thuật toán đối soát đa tiêu chí dựa trên hồ sơ ứng viên Ktee
              </p>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${scoreBadgeClass}`}>
            Độ tương thích: {match.overallScore}% • {match.matchTier}
          </span>
        </div>

        {/* 3 Metric Breakdown Bars with Apple SF Style Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {/* Hard Skills */}
          <div className="p-3 rounded-xl bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-medium text-[var(--foreground)] text-[11px]">Kỹ Năng Cốt Lõi</span>
              <span className="font-mono font-bold text-[#007AFF] text-xs">{match.hardSkillScore}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--surface)] overflow-hidden border border-[var(--ios-hairline)]">
              <div
                className="h-full bg-[#007AFF] rounded-full transition-all duration-700"
                style={{ width: `${match.hardSkillScore}%` }}
              />
            </div>
            <span className="block text-[10px] text-[var(--muted-foreground)] mt-1.5 truncate">
              React, Next.js, Node.js, TS
            </span>
          </div>

          {/* Scale & Experience */}
          <div className="p-3 rounded-xl bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-medium text-[var(--foreground)] text-[11px]">Quy Mô & Kinh Nghiệm</span>
              <span className="font-mono font-bold text-[#34C759] text-xs">{match.scaleAndExpScore}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--surface)] overflow-hidden border border-[var(--ios-hairline)]">
              <div
                className="h-full bg-[#34C759] rounded-full transition-all duration-700"
                style={{ width: `${match.scaleAndExpScore}%` }}
              />
            </div>
            <span className="block text-[10px] text-[var(--muted-foreground)] mt-1.5 truncate">
              FPT IS 230+ users, ĐH TDTU
            </span>
          </div>

          {/* BA & Domain */}
          <div className="p-3 rounded-xl bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-medium text-[var(--foreground)] text-[11px]">Nghiệp Vụ BA & Domain</span>
              <span className="font-mono font-bold text-[#AF52DE] text-xs">{match.domainBaScore}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--surface)] overflow-hidden border border-[var(--ios-hairline)]">
              <div
                className="h-full bg-[#AF52DE] rounded-full transition-all duration-700"
                style={{ width: `${match.domainBaScore}%` }}
              />
            </div>
            <span className="block text-[10px] text-[var(--muted-foreground)] mt-1.5 truncate">
              Phân tích yêu cầu, UML, Stakeholders
            </span>
          </div>
        </div>

        {/* Skill Gap Matrix: 3 Inset Cells */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold text-[var(--foreground)] uppercase tracking-wider block">
            Ma Trận Khoảng Trống Năng Lực (Skill Gap Matrix)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {/* Critical Gaps */}
            <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF3B30] mb-2">
                <XCircle size={14} />
                <span>Thiếu Bắt Buộc ({match.criticalGaps.length})</span>
              </div>
              {match.criticalGaps.length === 0 ? (
                <span className="text-[11px] text-[#34C759] flex items-center gap-1 font-medium">
                  <CheckCircle2 size={13} className="shrink-0" />
                  <span>Đáp ứng trọn vẹn 100% yêu cầu cốt lõi!</span>
                </span>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {match.criticalGaps.map((gap) => (
                    <span
                      key={gap}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium badge-ios-red"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Moderate Gaps */}
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF9500] mb-2">
                <AlertTriangle size={14} />
                <span>Cần Trau Dồi Thêm ({match.moderateGaps.length})</span>
              </div>
              {match.moderateGaps.length === 0 ? (
                <span className="text-[11px] text-[#34C759] flex items-center gap-1 font-medium">
                  <CheckCircle2 size={13} className="shrink-0" />
                  <span>Không có thiếu sót đáng kể</span>
                </span>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {match.moderateGaps.map((gap) => (
                    <span
                      key={gap}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium badge-ios-orange"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Matched Skills */}
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#34C759] mb-2">
                <CheckCircle2 size={14} />
                <span>Trùng Khớp Xuất Sắc ({match.matchedSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto scrollbar-thin">
                {match.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium badge-ios-green"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 48h Action Recommendations */}
        <div className="mt-4 pt-3.5 border-t border-[var(--ios-hairline)]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-2">
            <Zap size={14} className="text-[#FF9500]" />
            <span>Lộ Trình Bù Đắp Khoảng Trống Trong 48 Giờ</span>
          </div>
          <div className="space-y-1.5">
            {match.recommendations.map((rec, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-[var(--ios-control-bg)] border border-[var(--ios-hairline)] flex items-start gap-2.5 text-xs text-[var(--muted-foreground)]"
              >
                <span className="w-5 h-5 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[10px] font-bold font-mono shrink-0">
                  {i + 1}
                </span>
                <span className="leading-snug text-[var(--foreground)] text-[11.5px]">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. The Killer Feature: Pre-employment Proof of Work Demo */}
      <div className="ios-inset-card p-4 sm:p-5 border border-[var(--ios-hairline)]">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ios-hairline)] pb-3">
          <div className="flex items-center gap-2">
            <div className="ios-squircle-icon ios-squircle-purple">
              <Briefcase size={16} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                Pre-Employment Proof of Work (Sản Phẩm Mẫu Cho Nhà Tuyển Dụng)
              </h3>
              <p className="text-[10px] text-[var(--muted-foreground)]">
                Mô phỏng nghiệp vụ thực chiến được tự động kích hoạt theo Domain JD ({job.company})
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold badge-ios-purple">
            Live Sandbox
          </span>
        </div>

        <div className="overflow-x-hidden">
          {match.preEmployIdea.demoType === "fintech-ledger" && (
            <FintechLedgerDemo companyName={job.company} />
          )}
          {match.preEmployIdea.demoType === "ecommerce-checkout" && (
            <EcommerceCheckoutDemo companyName={job.company} />
          )}
          {match.preEmployIdea.demoType === "saas-kanban" && (
            <EnterpriseKanbanDemo companyName={job.company} />
          )}
        </div>
      </div>
    </div>
  );
}
