"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, Briefcase, GitPullRequest, Award, CheckCircle2 } from "lucide-react";

export default function About() {
  const { data, ui } = useLanguage();

  const pillarIcons = [
    <GraduationCap key="edu" size={24} className="text-blue-600 dark:text-blue-400" />,
    <Briefcase key="exp" size={24} className="text-indigo-600 dark:text-indigo-400" />,
    <GitPullRequest key="bridge" size={24} className="text-emerald-600 dark:text-emerald-400" />,
  ];

  return (
    <section id="about" className="py-8 sm:py-10 lg:py-12 border-t border-[var(--surface-border)] bg-[var(--surface-subtle)]/50 relative">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-6 sm:mb-8">
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
            {ui.aboutBadge}
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight text-balance">
            {ui.aboutTitle}
          </h2>
          <p className="text-[var(--muted-foreground)] mt-3 max-w-2xl text-base leading-relaxed text-pretty">
            {ui.aboutDesc}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="card-glass rounded-2xl p-6 border border-[var(--surface-border)] flex flex-col justify-between tech-card-hover group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {pillarIcons[idx]}
                </div>
                <h3 className="text-base font-bold text-[var(--foreground)] mb-2.5 text-balance">
                  {pillar.title}
                </h3>
                <p className="text-xs lg:text-sm leading-relaxed text-[var(--muted-foreground)] text-pretty">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--surface-border)] flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <CheckCircle2 size={14} />
                <span>{ui.aboutEvidence}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Special Highlight Box */}
        <div className="mt-6 sm:mt-8 card-glass rounded-2xl p-6 lg:p-8 border border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-50/50 via-white to-transparent dark:from-blue-950/20 dark:via-[var(--surface)] dark:to-transparent flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Award size={26} />
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--foreground)] text-balance">
                {ui.aboutCommitmentTitle}
              </h4>
              <p className="text-xs lg:text-sm text-[var(--muted-foreground)] mt-1 max-w-2xl leading-relaxed text-pretty">
                {ui.aboutCommitmentDesc}
              </p>
            </div>
          </div>
          <Link
            href="/experience"
            onClick={(e) => {
              const el = document.getElementById("experience");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="touch-target px-5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--surface)] text-[var(--foreground)] border border-[var(--surface-border)] hover:border-blue-600 hover:text-blue-600 transition-all shrink-0 cursor-pointer shadow-sm whitespace-nowrap"
          >
            {ui.aboutViewExpBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
