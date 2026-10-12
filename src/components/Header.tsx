"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { portfolioData } from "@/data/portfolioData";
import { Menu, X, FileDown, Code2 } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Về tôi", href: "#about" },
    { label: "Học vấn TDTU", href: "#education" },
    { label: "Kinh nghiệm thực tế", href: "#experience" },
    { label: "Dự án tiêu biểu", href: "#projects" },
    { label: "Kỹ năng", href: "#skills" },
    { label: "Terminal", href: "#terminal" },
    { label: "Liên hệ", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-header-bar border-b border-[var(--surface-border)]">
      <div className="portfolio-container h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Code2 size={19} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              {portfolioData.personal.nickname}
              <span className="text-[var(--accent)]">.dev</span>
            </span>
            <span className="text-[10px] font-medium text-[var(--muted-foreground)] tracking-wide">
              {portfolioData.personal.degreeLabel}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:text-[var(--accent)] transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Group */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="touch-target px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <FileDown size={15} className="mr-1.5" />
            Tải CV (PDF)
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex sm:hidden items-center gap-2">
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
        <div className="mobile-nav-drawer lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="touch-target px-4 py-3 rounded-xl text-sm font-medium text-[var(--foreground)] bg-[var(--surface)] border border-[var(--surface-border)] flex items-center justify-between hover:border-[var(--accent)] transition-all shadow-sm"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[var(--accent)]">→</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="touch-target mt-2 px-4 py-3.5 rounded-xl text-center text-sm font-semibold bg-blue-600 text-white flex items-center justify-center gap-2 shadow-sm"
            >
              <FileDown size={18} />
              Tải CV (PDF)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
