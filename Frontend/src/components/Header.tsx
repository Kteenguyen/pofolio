"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { portfolioData } from "@/data/portfolioData";
import { Menu, X, FileDown, Code2, Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRoutes = [
    { label: "Tổng Quan", href: "/" },
    { label: "⚡ AI Career Copilot", href: "/copilot" },
    { label: "Học Vấn 5 Năm", href: "/education" },
    { label: "Kinh Nghiệm FPT & Luklak", href: "/experience" },
    { label: "Kho 6 Dự Án", href: "/projects" },
    { label: "Kỹ Năng & CLI", href: "/skills" },
    { label: "Liên Hệ", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--surface-border)]">
      <div className="portfolio-container h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Code2 size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-[var(--foreground)] group-hover:text-blue-600 transition-colors">
              {portfolioData.personal.nickname}
              <span className="text-blue-600 dark:text-sky-400">.dev</span>
            </span>
            <span className="text-[10px] text-[var(--muted-foreground)] leading-none hidden sm:inline">
              ĐH Tôn Đức Thắng (2021-2026)
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Routes */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-[var(--surface-border)]">
          {navRoutes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`touch-target px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
        <div className="hidden sm:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="http://localhost:3001/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-blue-500/30 text-blue-600 dark:text-sky-400 bg-blue-500/10 hover:bg-blue-500/20 transition-colors flex items-center gap-1"
          >
            <Sparkles size={13} />
            <span>CMS Admin</span>
          </a>
          <Link
            href="/contact"
            className="touch-target px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5"
          >
            <FileDown size={14} />
            <span>Tải CV</span>
          </Link>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex sm:hidden items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở menu điều hướng"
            className="touch-target w-11 h-11 rounded-xl flex items-center justify-center border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer lg:hidden border-t border-[var(--surface-border)] bg-[var(--background)]">
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
                      : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--surface-border)]"
                  }`}
                >
                  <span>{route.label}</span>
                  <span className="text-xs opacity-70">→</span>
                </Link>
              );
            })}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="http://localhost:3001/admin"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="touch-target px-4 py-3 rounded-xl text-center text-xs font-semibold border border-blue-500/30 text-blue-600 dark:text-sky-400 bg-blue-500/10 flex items-center justify-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>Mở Backend CMS Quản Trị Leads & Link (Port 3001)</span>
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="touch-target px-4 py-3 rounded-xl text-center text-xs font-semibold bg-blue-600 text-white flex items-center justify-center gap-2 shadow-sm"
              >
                <FileDown size={16} />
                <span>Liên Hệ Trực Tiếp & Tải CV (PDF)</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
