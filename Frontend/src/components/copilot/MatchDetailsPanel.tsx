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
  Layers,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface MatchDetailsPanelProps {
  job: JobPosting;
  candidate: CVCandidateProfile;
  match: MatchAnalysis;
}

export default function MatchDetailsPanel({ job, candidate, match }: MatchDetailsPanelProps) {
  // Determine badge color
  let scoreBadgeColor = "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
  if (match.overallScore < 70) {
    scoreBadgeColor = "text-amber-600 bg-amber-500/10 border-amber-500/20";
  }
  if (match.overallScore < 60) {
    scoreBadgeColor = "text-red-600 bg-red-500/10 border-red-500/20";
  }

  return (
    <div className="space-y-6">
      {/* 1. Header Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-blue-600/10 text-blue-600 tracking-wider">
                {job.platform}
              </span>
              <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                <Clock size={12} /> {job.postedAt}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--surface-subtle)] text-[var(--muted-foreground)]">
                {job.domain}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
              {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted-foreground)] mt-1.5">
              <span className="font-semibold text-[var(--foreground)] flex items-center gap-1">
                <Building size={13} className="text-blue-600" /> {job.company}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin size={13} /> {job.location}
              </span>
              <span>•</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {job.salary}
              </span>
            </div>
          </div>

          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--surface-subtle)] border border-[var(--surface-border)] hover:border-[var(--accent)] text-[var(--foreground)] flex items-center gap-1 transition-colors"
            >
              <span>Xem Tin Gốc</span>
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        <p className="text-xs leading-relaxed text-[var(--muted-foreground)] border-t border-[var(--surface-border)] pt-3 mt-3">
          {job.summary}
        </p>
      </div>

      {/* 2. Match Score & 3-Tier Breakdown */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--surface-border)] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-blue-600" />
            <h3 className="text-base font-bold text-[var(--foreground)]">Đo Lường Độ Phù Hợp Thực Tế</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${scoreBadgeColor}`}>
            Độ tương thích: {match.overallScore}% • {match.matchTier}
          </span>
        </div>

        {/* 3 Metric Breakdown Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
          {/* Metric 1 */}
          <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)]">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-[var(--foreground)]">Kỹ Năng Cốt Lõi (Hard Skills)</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{match.hardSkillScore}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--surface-border)] overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${match.hardSkillScore}%` }}
              />
            </div>
            <span className="block text-[10px] text-[var(--muted-foreground)] mt-1.5">
              React, Next.js, Node.js, TS
            </span>
          </div>

          {/* Metric 2 */}
          <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)]">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-[var(--foreground)]">Quy Mô & Kinh Nghiệm</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{match.scaleAndExpScore}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--surface-border)] overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${match.scaleAndExpScore}%` }}
              />
            </div>
            <span className="block text-[10px] text-[var(--muted-foreground)] mt-1.5">
              FPT IS 230+ users, 5 năm ĐH TDTU
            </span>
          </div>

          {/* Metric 3 */}
          <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)]">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-[var(--foreground)]">Nghiệp Vụ BA & Domain</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{match.domainBaScore}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--surface-border)] overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${match.domainBaScore}%` }}
              />
            </div>
            <span className="block text-[10px] text-[var(--muted-foreground)] mt-1.5">
              Phân tích yêu cầu, UML, Client
            </span>
          </div>
        </div>

        {/* 3. Skill Gap Matrix */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[var(--foreground)] block">
            Ma Trận Khoảng Trống Năng Lực (Skill Gap Matrix)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Red: Critical Gaps */}
            <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 mb-2">
                <XCircle size={14} />
                <span>Thiếu Bắt Buộc ({match.criticalGaps.length})</span>
              </div>
              {match.criticalGaps.length === 0 ? (
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  ✓ Đáp ứng trọn vẹn 100% yêu cầu cốt lõi!
                </span>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {match.criticalGaps.map((gap) => (
                    <span
                      key={gap}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-red-500/10 text-red-600 dark:text-red-300"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Yellow: Moderate Gaps */}
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">
                <AlertTriangle size={14} />
                <span>Cần Trau Dồi Thêm ({match.moderateGaps.length})</span>
              </div>
              {match.moderateGaps.length === 0 ? (
                <span className="text-[11px] text-emerald-600">✓ Không có thiếu sót đáng kể</span>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {match.moderateGaps.map((gap) => (
                    <span
                      key={gap}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Green: Matched Skills */}
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 size={14} />
                <span>Trùng Khớp Xuất Sắc ({match.matchedSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {match.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Action Recommendations */}
        <div className="mt-4 pt-3.5 border-t border-[var(--surface-border)]">
          <span className="text-xs font-semibold text-[var(--foreground)] block mb-2">
            Đề Xuất Hành Động Cải Thiện Trong 48h
          </span>
          <ul className="space-y-1.5">
            {match.recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-[var(--muted-foreground)] flex items-start gap-2">
                <span className="text-blue-600 font-bold shrink-0">0{i + 1}.</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. The Killer Feature: Pre-employment Proof of Work Demo */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
            <Briefcase size={16} className="text-blue-600" />
            <span>Pre-Employment Proof of Work (Sản Phẩm Mẫu Cho Nhà Tuyển Dụng)</span>
          </h3>
          <span className="text-[11px] text-[var(--muted-foreground)] hidden sm:inline">
            Tự động kích hoạt theo Domain nghiệp vụ của JD
          </span>
        </div>

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
  );
}
