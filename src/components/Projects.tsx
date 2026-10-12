"use client";

import { useState } from "react";
import { portfolioData, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import { ExternalLink, Layers, ArrowUpRight } from "lucide-react";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    "Tất cả",
    "Full-Stack & Web",
    "Backend & CSDL",
    "Phân Tích BA & Nghiệp Vụ",
  ];

  const filteredProjects = selectedCategory === "Tất cả"
    ? portfolioData.projects
    : portfolioData.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-t border-[var(--surface-border)] bg-[var(--background)] relative">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-8">
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
            // DỰ ÁN & HỒ SƠ KỸ THUẬT THỰC TẾ
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            6 Dự Án Tiêu Biểu & Nghiệp Vụ Triển Khai
          </h2>
          <p className="text-[var(--muted-foreground)] mt-3 max-w-2xl text-base leading-relaxed">
            Mỗi dự án đều phản ánh năng lực giải quyết bài toán thực tế: từ lập trình Front-End hiệu ứng điện ảnh, tối ưu hóa Back-End Redis đến phân tích sơ đồ UML chuẩn mực.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`touch-target px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-sm ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/20"
                  : "bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--surface-border)] hover:border-blue-600 hover:text-[var(--foreground)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="project-grid-layout">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card-glass rounded-3xl p-6 lg:p-7 border border-[var(--surface-border)] flex flex-col justify-between tech-card-hover group"
            >
              <div>
                {/* Header & Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      ★ Nổi Bật
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg lg:text-xl font-bold text-[var(--foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[var(--muted-foreground)] mt-1">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs lg:text-sm text-[var(--muted-foreground)] mt-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metrics Chips - Apple Style */}
                <div className="grid grid-cols-3 gap-2 my-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[var(--surface-border)]">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-sm font-black text-blue-600 dark:text-blue-400">{m.value}</div>
                      <div className="text-[10px] text-[var(--muted-foreground)] truncate mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[var(--surface-border)] flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveProject(project)}
                  className="touch-target px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white flex items-center gap-1.5 shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Layers size={14} />
                  <span>Phân Tích Kiến Trúc</span>
                  <ArrowUpRight size={14} />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target text-xs text-[var(--muted-foreground)] hover:text-blue-600 flex items-center gap-1 transition-colors"
                  >
                    <span>GitHub Code</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
