"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Code2, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const { data, ui } = useLanguage();

  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--surface)] py-12 text-xs text-[var(--muted-foreground)]">
      <div className="portfolio-container flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Rights */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Code2 size={14} />
            </div>
            <span className="font-bold text-sm text-[var(--foreground)]">
              {data.personal.nickname}.dev
            </span>
            <span className="font-mono text-blue-600 dark:text-sky-400 font-semibold">
              • {data.personal.degreeLabel}
            </span>
          </div>
          <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
            © {new Date().getFullYear()} {data.personal.name} ({data.personal.phone} • {data.personal.email}).
          </p>
        </div>

        {/* Tech Stack Badge */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span>Next.js 15 • TypeScript • Tailwind CSS</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-blue-600 dark:text-sky-400 font-semibold">
            <Heart size={12} className="text-red-500 fill-red-500" /> {ui.footerCrafted}
          </span>
        </div>

        {/* Back to top */}
        <a
          href="#"
          aria-label={ui.footerBackToTop}
          className="touch-target px-3 py-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span>{ui.footerBackToTop}</span>
          <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
}
