"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import CVDownloadModal from "./CVDownloadModal";
import InterviewModal from "./InterviewModal";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, FileDown, ChevronRight, PhoneCall, CalendarCheck } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { ui } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [interviewTab, setInterviewTab] = useState<"interview" | "contact">("interview");

  const navRoutes = [
    { label: ui.navOverview, href: "/" },
    { label: ui.navEducation, href: "/education" },
    { label: ui.navExperience, href: "/experience" },
    { label: ui.navProjects, href: "/projects" },
    { label: ui.navSkills, href: "/skills" },
    { label: ui.navContact, href: "/contact" },
  ];

  const handleOpenInterview = (tab: "interview" | "contact" = "interview") => {
    setInterviewTab(tab);
    setInterviewModalOpen(true);
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 border-b border-[var(--surface-border)] transition-colors ${
        mobileMenuOpen ? "bg-[var(--background)] shadow-xl" : "bg-[var(--background)]/90 backdrop-blur-md"
      }`}
    >
      <div className="portfolio-container h-16 flex items-center justify-between gap-4">

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
        <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
          <LanguageSelector variant="header" />

          {/* Mời Phỏng Vấn (Tablet/Desktop) */}
          <button
            onClick={() => handleOpenInterview("interview")}
            aria-label={ui.inviteInterview}
            className="hidden sm:inline-flex touch-target px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <CalendarCheck size={14} />
            <span>{ui.inviteInterview}</span>
          </button>

          {/* Tải CV (Desktop/Tablet) */}
          <button
            onClick={() => setCvModalOpen(true)}
            aria-label={ui.downloadCv}
            className="hidden sm:inline-flex touch-target px-3.5 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 shadow-sm active:scale-[0.98] transition-all items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <FileDown size={14} />
            <span>{ui.downloadCv}</span>
          </button>

          {/* Mobile / Tablet Menu Button (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? ui.menuClose : ui.menuOpen}
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
                  <ChevronRight size={16} className="opacity-70" />
                </Link>
              );
            })}

            {/* Mobile Language Switcher (Segmented Control) */}
            <div className="pt-2">
              <div className="text-[10px] font-semibold text-[var(--muted-foreground)] px-1 mb-1.5 uppercase font-mono tracking-wider">
                // {ui.langSection}:
              </div>
              <LanguageSelector variant="segmented" onSelect={() => setMobileMenuOpen(false)} />
            </div>

            {/* Mobile Conversion CTA Pair in Drawer Menu */}
            <div className="pt-2.5 flex flex-col gap-2">
              <div className="text-[10px] font-semibold text-[var(--muted-foreground)] px-1 uppercase font-mono tracking-wider">
                // {ui.connectSection}
              </div>

              {/* Nút 1: Mời Phỏng Vấn (15s) */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenInterview("interview");
                }}
                className="touch-target w-full min-h-[48px] px-4 py-3 rounded-xl text-center text-xs sm:text-sm font-extrabold bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 text-white flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all cursor-pointer"
              >
                <CalendarCheck size={17} />
                <span>{ui.inviteInterview15s}</span>
              </button>

              {/* Nút 2: Để Lại Số Liên Lạc / Hotline 0852.723.945 */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenInterview("contact");
                }}
                className="touch-target w-full min-h-[48px] px-4 py-3 rounded-xl text-center text-xs sm:text-sm font-bold border border-sky-500/40 bg-sky-50/90 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer"
              >
                <PhoneCall size={16} className="text-sky-600 dark:text-sky-400" />
                <span>{ui.leaveContact}</span>
              </button>

              {/* Nút 3: Tải Hồ Sơ CV PDF */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCvModalOpen(true);
                }}
                className="touch-target w-full min-h-[44px] px-4 py-2.5 rounded-xl text-center text-xs font-semibold bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] flex items-center justify-center gap-2 hover:border-blue-500 active:scale-[0.99] transition-all cursor-pointer"
              >
                <FileDown size={15} className="text-blue-600 dark:text-sky-400" />
                <span>{ui.downloadCv4Versions}</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Interview & Quick Contact Modal */}
      <InterviewModal
        isOpen={interviewModalOpen}
        initialTab={interviewTab}
        onClose={() => setInterviewModalOpen(false)}
      />

      {/* CV Download Modal */}
      <CVDownloadModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </header>
  );
}
