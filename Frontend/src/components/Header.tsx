"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import CVDownloadModal from "./CVDownloadModal";
import { portfolioData } from "@/data/portfolioData";
import { Menu, X, FileDown, Code2 } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const navRoutes = [
    { label: "Tổng Quan", href: "/" },
    { label: "AI Copilot", href: "/copilot" },
    { label: "Học Vấn", href: "/education" },
    { label: "Kinh Nghiệm", href: "/experience" },
    { label: "Dự Án", href: "/projects" },
    { label: "Kỹ Năng", href: "/skills" },
    { label: "Liên Hệ", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--surface-border)]">
      <div className="portfolio-container h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Code2 size={19} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-[var(--foreground)] group-hover:text-blue-600 transition-colors">
              {portfolioData.personal.nickname}
              <span className="text-blue-600 dark:text-sky-400">.dev</span>
            </span>
            <span className="text-[10px] text-[var(--muted-foreground)] leading-none hidden sm:inline font-mono">
              ĐH Tôn Đức Thắng (2021-2026)
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Tabs (>= 1024px) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-[var(--surface-border)] shrink-0">
          {navRoutes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] flex items-center justify-center ${
                  isActive
                    ? "bg-[var(--surface)] text-blue-600 dark:text-sky-400 shadow-sm border border-[var(--surface-border)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]/50"
                }`}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Group */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setCvModalOpen(true)}
            aria-label="Tải Hồ Sơ CV PDF"
            className="hidden sm:inline-flex touch-target px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <FileDown size={14} />
            <span>Tải CV</span>
          </button>

          {/* Mobile / Tablet Menu Button (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
            className="lg:hidden touch-target w-11 h-11 rounded-xl flex items-center justify-center border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm hover:border-blue-600 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer lg:hidden border-t border-[var(--surface-border)] bg-[var(--background)] animate-fade-in">
          <nav className="flex flex-col gap-1.5">
            {navRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`touch-target px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between border transition-all ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--surface-border)] hover:border-blue-500"
                  }`}
                >
                  <span>{route.label}</span>
                  <span className="text-xs opacity-70">→</span>
                </Link>
              );
            })}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCvModalOpen(true);
                }}
                className="touch-target w-full px-4 py-3 rounded-xl text-center text-xs sm:text-sm font-semibold bg-blue-600 text-white flex items-center justify-center gap-2 shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <FileDown size={16} />
                <span>Tải Hồ Sơ CV (PDF 4 Phiên Bản)</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* CV Download Modal */}
      <CVDownloadModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </header>
  );
}
