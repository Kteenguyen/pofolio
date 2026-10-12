"use client";

import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft } from "lucide-react";

interface HistoryEntry {
  command: string;
  output: string | React.ReactNode;
}

export default function TerminalPlayground() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-blue-400 font-bold">
            🚀 Chào mừng đến với Ktee Interactive Terminal v1.0.0
          </p>
          <p className="text-slate-400">
            Gõ <span className="text-amber-400 font-mono">help</span> để khám phá hồ sơ năng lực của Kỹ sư Nguyễn Khoa Tài.
          </p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-blue-400 font-bold">Danh sách lệnh hỗ trợ:</p>
            <p>• <span className="text-amber-400">about</span> : Xem chân dung kỹ sư & định vị chuyên môn</p>
            <p>• <span className="text-amber-400">edu</span> : Xem học vấn ĐH Tôn Đức Thắng & bảng điểm môn cốt lõi</p>
            <p>• <span className="text-amber-400">exp</span> : Xem kinh nghiệm thực tế FPT IS (230 users) & Luklak (7 pages)</p>
            <p>• <span className="text-amber-400">projects</span> : Xem danh mục 6 dự án kỹ thuật thực tế</p>
            <p>• <span className="text-amber-400">skills</span> : Xem khung công nghệ Full-Stack & BA</p>
            <p>• <span className="text-amber-400">contact</span> : Lấy SĐT, Email và GitHub cá nhân</p>
            <p>• <span className="text-amber-400">clear</span> : Xóa màn hình dòng lệnh</p>
            <p>• <span className="text-emerald-400">sudo hire</span> : Tính năng kết nối phỏng vấn trực tiếp</p>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="text-xs space-y-1">
            <p className="font-bold text-white">{portfolioData.personal.name} ({portfolioData.personal.nickname})</p>
            <p className="text-blue-400">{portfolioData.personal.title}</p>
            <p className="text-slate-300">{portfolioData.personal.bio}</p>
          </div>
        );
        break;

      case "edu":
      case "education":
        output = (
          <div className="text-xs space-y-1">
            <p className="font-bold text-white">Đại học Tôn Đức Thắng (Ton Duc Thang University - 2021 – 2026)</p>
            <p className="text-sky-400">Năng lực chuyên ngành cốt lõi:</p>
            <p>• Lập trình NodeJS: <span className="text-emerald-400 font-bold">Hệ Thống APIs Chịu Tải & CSDL</span></p>
            <p>• Thiết kế Giao diện Người dùng (UI/UX): <span className="text-emerald-400 font-bold">Design System & Three.js 4D</span></p>
            <p>• Phân tích & Thiết kế Yêu cầu (BA): <span className="text-emerald-400 font-bold">Chuẩn Hóa BRD & UML</span></p>
            <p>• Quản trị Hệ thống Thông tin: <span className="text-emerald-400 font-bold">Quy Trình Vận Hành Doanh Nghiệp</span></p>
          </div>
        );
        break;

      case "exp":
      case "experience":
        output = (
          <div className="text-xs space-y-2">
            <div>
              <p className="text-amber-400 font-bold">[12/2025 – 01/2026] FPT IS (Thi Hành Án Dân Sự)</p>
              <p className="text-slate-300">• Trưởng nhóm triển khai, đào tạo 230+ người dùng, xử lý 60 bugs/CR.</p>
            </div>
            <div>
              <p className="text-amber-400 font-bold">[05/2026] Luklak (Freelance)</p>
              <p className="text-slate-300">• Front-End & Deployment: 7 trang, 17 components, Lenis Smooth Scroll, VPS Linux.</p>
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-xs space-y-2">
            {portfolioData.skillCategories.map((c) => (
              <div key={c.category}>
                <span className="text-blue-400 font-bold">[{c.category}]</span>:{" "}
                <span className="text-slate-200">
                  {c.skills.map((s) => `${s.name} (${s.level}%)`).join(", ")}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="text-xs space-y-1.5">
            {portfolioData.projects.map((p, idx) => (
              <div key={p.id}>
                <span className="text-amber-400 font-bold">#{idx + 1} {p.title}</span>{" "}
                <span className="text-blue-400">[{p.category}]</span>:{" "}
                <span className="text-slate-400">{p.subtitle}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-xs space-y-1 text-slate-200">
            <p>Họ tên: <span className="text-white font-bold">{portfolioData.personal.name}</span></p>
            <p>Số điện thoại: <span className="text-emerald-400 font-bold">{portfolioData.personal.phone}</span></p>
            <p>Email: <span className="text-blue-400">{portfolioData.personal.email}</span></p>
            <p>GitHub: <span className="text-blue-400">{portfolioData.personal.github}</span></p>
            <p>Địa chỉ: <span className="text-white">{portfolioData.personal.location}</span></p>
          </div>
        );
        break;

      case "sudo hire":
      case "hire":
        output = (
          <div className="text-xs p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 space-y-1">
            <p className="font-bold">✨ Access Granted: Ktee is ready for Full-Stack / BA roles!</p>
            <p>Hotline: {portfolioData.personal.phone} | Email: {portfolioData.personal.email}</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <span className="text-red-400 text-xs">
            Lệnh không hợp lệ: &quot;{cmd}&quot;. Gõ &quot;help&quot; để xem hướng dẫn.
          </span>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  return (
    <section id="terminal" className="py-20 border-t border-[var(--surface-border)] bg-[var(--background)]">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-8">
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
            // KHÁM PHÁ TƯƠNG TÁC (DEVELOPER CLI)
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            Developer Interactive Playground
          </h2>
          <p className="text-[var(--muted-foreground)] mt-3 max-w-2xl text-base leading-relaxed">
            Dành cho các Tech Lead, Giám đốc Kỹ thuật muốn đối soát thông tin nhanh qua giao diện dòng lệnh. Hãy thử gõ <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">help</code>, <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">edu</code>, <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">exp</code>, hoặc <code className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">contact</code>.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="w-full rounded-2xl border border-slate-800 bg-[#070b14] text-slate-200 font-mono shadow-xl overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="h-10 px-4 bg-[#0d1322] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 ml-2 font-mono flex items-center gap-1.5">
                <TerminalIcon size={12} className="text-blue-400" />
                ktee@tdtu-engineer:~ (zsh)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Sparkles size={12} />
              <span>Next.js 15 Fast Terminal</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-6 min-h-[260px] max-h-[420px] overflow-y-auto space-y-4 text-xs sm:text-sm">
            {history.map((entry, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="text-slate-500">ktee@portfolio:~$</span>
                  <span className="font-semibold">{entry.command}</span>
                </div>
                <div className="pl-4 border-l border-slate-800 py-1">
                  {entry.output}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Bar */}
          <form onSubmit={handleCommand} className="p-3 bg-[#0d1322] border-t border-slate-800 flex items-center gap-2">
            <span className="text-blue-400 text-xs sm:text-sm pl-2 shrink-0">ktee@portfolio:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Gõ lệnh (help, edu, exp, projects, contact, sudo hire)..."
              className="touch-target w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              aria-label="Nhập lệnh terminal"
            />
            <button
              type="submit"
              aria-label="Thực thi lệnh"
              className="touch-target w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 cursor-pointer"
            >
              <CornerDownLeft size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
