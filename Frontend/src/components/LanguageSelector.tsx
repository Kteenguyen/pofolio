"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage, Locale } from "@/context/LanguageContext";

interface LanguageOption {
  code: Locale;
  label: string;
  short: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "vi", label: "Tiếng Việt", short: "VI" },
  { code: "en", label: "English", short: "EN" },
];

interface LanguageSelectorProps {
  variant?: "header" | "segmented";
  onSelect?: (locale: Locale) => void;
}

export default function LanguageSelector({
  variant = "header",
  onSelect,
}: LanguageSelectorProps) {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lang nghe su kien click outside va phim Escape de dong dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const changeLocale = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
    if (onSelect) {
      onSelect(code);
    }
  };

  const currentLocale = mounted ? locale : "vi";
  const activeLang =
    LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  // BIEN THE 1: SEGMENTED DUAL-TAB (Dung trong Mobile Drawer Menu)
  if (variant === "segmented") {
    return (
      <div className="w-full flex items-center gap-1.5 p-1 bg-[var(--surface-subtle)] rounded-xl border border-[var(--surface-border)]">
        {LANGUAGES.map((lang) => {
          const isActive = lang.code === locale;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => changeLocale(lang.code)}
              className={`touch-target flex-1 min-h-[44px] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
              }`}
            >
              <span>{lang.label}</span>
              <span className="text-[10px] font-mono opacity-80 font-normal">({lang.short})</span>
            </button>
          );
        })}
      </div>
    );
  }

  // BIEN THE 2: HEADER DROPDOWN PILL (Dung tren thanh Header chinh ca Desktop va Mobile)
  // Toi uu sach se: Loai bo duplicate icon (Globe + Flag emoji), chi giu Globe icon + Text VI/EN + Chevron
  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Chon ngon ngu (Hien tai: ${activeLang.label})`}
        className="touch-target min-h-[44px] px-2.5 sm:px-3 rounded-xl flex items-center gap-1.5 border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-500 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
      >
        <Globe size={15} className="text-blue-600 dark:text-sky-400 shrink-0" />
        <span className="text-xs font-bold tracking-wide">
          {activeLang.short}
        </span>
        <ChevronDown
          size={12}
          className={`opacity-60 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Popover Menu tha xuong */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
        >
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--surface-border)] mb-1">
            {t("lang.select_title", "Chon Ngon Ngu / Language")}
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                role="menuitem"
                type="button"
                onClick={() => changeLocale(lang.code)}
                className={`touch-target w-full min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-sky-400 font-bold"
                    : "text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{lang.label}</span>
                  <span className="text-[10px] font-mono text-[var(--muted-foreground)] font-normal">
                    ({lang.short})
                  </span>
                </div>
                {isSelected && (
                  <Check size={14} className="text-blue-600 dark:text-sky-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
