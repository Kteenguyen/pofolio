"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ktee_portfolio_theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("ktee_portfolio_theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  if (!mounted) {
    return <div className="w-11 h-11" />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Chuyển đổi giao diện Sáng / Tối"
      className="touch-target w-11 h-11 rounded-xl flex items-center justify-center border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer shadow-sm"
    >
      {theme === "light" ? (
        <Moon size={18} className="text-slate-700" />
      ) : (
        <Sun size={18} className="text-amber-400" />
      )}
    </button>
  );
}
