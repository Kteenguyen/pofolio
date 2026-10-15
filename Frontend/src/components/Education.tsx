"use client";

import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, Award, CheckCircle, BookOpen, Star } from "lucide-react";

export default function Education() {
  const { data, ui } = useLanguage();

  return (
    <section id="education" className="py-8 sm:py-10 lg:py-12 border-t border-[var(--surface-border)] bg-[var(--background)] relative">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-6 sm:mb-8">
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
            {ui.eduBadge}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            {ui.eduTitle}
          </h2>
          <p className="text-[var(--muted-foreground)] mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm lg:text-base leading-relaxed">
            {ui.eduDesc}
          </p>
        </div>

        {/* 5-Year Degree Showcase Card */}
        {data.education.map((edu) => (
          <div
            key={edu.id}
            className="card-glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 dark:from-[var(--surface)] dark:via-[var(--surface)] dark:to-blue-950/20 mb-6 sm:mb-8"
          >
            {/* Degree Title Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[var(--surface-border)]">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                  <GraduationCap size={26} />
                </div>
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-1.5">
                    {edu.duration}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-[var(--foreground)] leading-snug">
                    {edu.degree}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    {edu.institution} • <span className="font-mono text-[var(--muted-foreground)] font-normal">{edu.period}</span>
                  </div>
                </div>
              </div>

              {edu.grade && (
                <div className="self-start lg:self-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-[var(--surface-border)] text-[var(--foreground)] text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <Star size={14} className="text-amber-500 fill-amber-500 shrink-0" />
                  <span>{edu.grade}</span>
                </div>
              )}
            </div>

            {/* Coursework Score Cards - Apple Grid Style */}
            <div className="my-4 sm:my-6">
              <div className="text-[11px] sm:text-xs font-mono font-semibold text-[var(--muted-foreground)] uppercase mb-2.5 sm:mb-3">
                {ui.eduScoreHeader}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {edu.coursework.map((course) => (
                  <div
                    key={course.name}
                    className="p-3 sm:p-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm flex flex-col justify-between"
                  >
                    <span className="text-[11px] sm:text-xs font-semibold text-[var(--foreground)] leading-snug line-clamp-2">
                      {course.name}
                    </span>
                    <span className="mt-2.5 sm:mt-3 text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                      {course.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-3 pt-6 border-t border-[var(--surface-border)]">
              <div className="text-xs font-mono font-semibold text-[var(--muted-foreground)] uppercase">
                {ui.eduHighlightsHeader}
              </div>
              {edu.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs lg:text-sm text-[var(--foreground)] leading-relaxed">
                  <CheckCircle size={17} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Certifications Section */}
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)] mb-4">
            <Award size={18} className="text-blue-600 dark:text-blue-400" />
            <span>{ui.eduCertHeader}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.certifications.map((cert) => (
              <div
                key={cert.name}
                className="card-glass rounded-2xl p-5 border border-[var(--surface-border)] flex flex-col justify-between tech-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-blue-400 mb-2">
                    <span>{cert.year}</span>
                    <BookOpen size={14} />
                  </div>
                  <h4 className="text-xs lg:text-sm font-bold text-[var(--foreground)] leading-snug">
                    {cert.name}
                  </h4>
                </div>
                <div className="text-[11px] text-[var(--muted-foreground)] mt-3 pt-3 border-t border-[var(--surface-border)] font-medium">
                  {cert.issuer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
