import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { Terminal, Database, Layout, Sparkles } from "lucide-react";
import TechLogo from "./TechLogo";

export default function TechStack() {
  const categoryIcons: Record<string, React.ReactNode> = {
    "AI Agentic và Tự Động Hóa Quy Trình": <Sparkles size={20} className="text-purple-600 dark:text-purple-400" />,
    "Front-End và Xây Dựng Web Trọn Gói": <Layout size={20} className="text-blue-600 dark:text-blue-400" />,
    "Back-End, CSDL và Tải Cao": <Terminal size={20} className="text-indigo-600 dark:text-indigo-400" />,
    "Nghiệp Vụ BA và DevOps Vận Hành": <Database size={20} className="text-emerald-600 dark:text-emerald-400" />,
  };

  return (
    <section id="skills" className="py-10 sm:py-14 lg:py-18 border-t border-[var(--surface-border)] bg-[var(--background)]">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
            // NĂNG LỰC KỸ THUẬT VÀ NGHIỆP VỤ
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            Khung Công Nghệ và Kỹ Năng Chuyên Môn
          </h2>
          <p className="text-[var(--muted-foreground)] mt-3 max-w-2xl text-base leading-relaxed">
            Sự phối hợp toàn diện giữa kỹ năng lập trình Full-Stack (React/Next.js, Node.js, C#), tư duy phân tích nghiệp vụ BA và năng lực triển khai thực tế.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {portfolioData.skillCategories.map((cat) => (
            <div
              key={cat.category}
              className="card-glass rounded-3xl p-6 lg:p-7 border border-[var(--surface-border)] flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {categoryIcons[cat.category] || <Sparkles size={20} className="text-blue-600 dark:text-blue-400" />}
                </div>
                <div>
                  <h3 className="text-sm lg:text-base font-bold text-[var(--foreground)]">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5 p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <TechLogo name={skill.name} size={16} />
                        <span className="font-semibold text-[var(--foreground)]">
                          {skill.name}
                        </span>
                      </div>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    {skill.note && (
                      <div className="text-[11px] text-[var(--muted-foreground)] font-mono pl-6">
                        ↳ {skill.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
