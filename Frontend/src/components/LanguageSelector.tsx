"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

export type Locale = "vi" | "en";

interface LanguageOption {
  code: Locale;
  label: string;
  flag: string;
  short: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", short: "VI" },
  { code: "en", label: "English", flag: "🇬🇧", short: "EN" },
];

const STORAGE_KEY = "ktee_portfolio_locale";

interface LanguageSelectorProps {
  variant?: "header" | "segmented";
  onSelect?: (locale: Locale) => void;
}

export default function LanguageSelector({
  variant = "header",
  onSelect,
}: LanguageSelectorProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>("vi");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dong bo voi localStorage khi client mount va xu ly ngoai le an toan
  useEffect(() => {
    setMounted(true);
    let saved: Locale = "vi";
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "vi" || stored === "en") {
        saved = stored;
      }
    } catch {
      // Che do bao mat hoac trinh duyet chan localStorage
    }
    setCurrentLocale(saved);
    if (typeof document !== "undefined") {
      document.documentElement.lang = saved;
    }
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
    setCurrentLocale(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Xu ly ngoai le khi ghi bi chan
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = code;
    }
    setIsOpen(false);
    if (onSelect) {
      onSelect(code);
    }

    // Phat su kien thong bao cap nhat ngon ngu den toan bo he thong
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio_language_change", { detail: { locale: code } })
      );
    }
  };

  // Khung giu cho de chong loi Hydration Mismatch va giu Layout on dinh
  if (!mounted) {
    return variant === "segmented" ? (
      <div className="h-11 w-full bg-[var(--surface-subtle)] rounded-xl animate-pulse" />
    ) : (
      <div className="w-20 h-11 bg-[var(--surface-subtle)] rounded-xl animate-pulse" />
    );
  }

  const activeLang =
    LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  // BIEN THE 1: SEGMENTED DUAL-TAB (Dung trong Mobile Drawer Menu)
  if (variant === "segmented") {
    return (
      <div className="w-full flex items-center gap-1.5 p-1 bg-[var(--surface-subtle)] rounded-xl border border-[var(--surface-border)]">
        {LANGUAGES.map((lang) => {
          const isActive = lang.code === currentLocale;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => changeLocale(lang.code)}
              className={`touch-target flex-1 min-h-[44px] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
              }`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // BIEN THE 2: HEADER DROPDOWN PILL (Dung tren thanh Header chinh ca Desktop va Mobile)
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
        <span className="text-sm leading-none" aria-hidden="true">
          {activeLang.flag}
        </span>
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
            Chon Ngon Ngu / Language
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLocale;
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
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
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
