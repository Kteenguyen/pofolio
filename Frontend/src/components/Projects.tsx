"use client";

import { useState, useEffect } from "react";
import { portfolioData, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import { Layers, ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>(portfolioData.projects);

  // Sync dynamically with Backend CMS if available
  useEffect(() => {
    fetch("http://localhost:3001/api/projects")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          // Merge dynamic URLs from CMS
          const merged = portfolioData.projects.map((localP) => {
            const remoteP = json.data.find((r: { id: string }) => r.id === localP.id);
            if (remoteP) {
              return {
                ...localP,
                liveUrl: remoteP.liveUrl || localP.liveUrl,
                githubUrl: remoteP.githubUrl || localP.githubUrl,
              };
            }
            return localP;
          });
          setDynamicProjects(merged);
        }
      })
      .catch(() => {
        // Fallback gracefully to local portfolioData
      });
  }, []);

  const categories = [
    "Tất cả",
    "Full-Stack & Web",
    "Backend & CSDL",
    "Phân Tích BA & Nghiệp Vụ",
  ];

  const filteredProjects = selectedCategory === "Tất cả"
    ? dynamicProjects
    : dynamicProjects.filter((p) => p.category === selectedCategory);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-sky-400 uppercase mb-1">
            // DANH MỤC 6 DỰ ÁN THỰC CHIẾN & NGHIỆP VỤ
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
            Kho Dự Án Kỹ Thuật Đã Triển Khai
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] mt-1 max-w-2xl">
            Tất cả dự án được chuẩn hóa theo mô hình CAR (Bối cảnh -&gt; Giải pháp -&gt; Kết quả). Link live demo và source code được đồng bộ trực tiếp từ Backend CMS.
          </p>
        </div>

        <a
          href="http://localhost:3001/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target px-3 py-1.5 rounded-xl text-xs font-semibold border border-blue-500/30 text-blue-600 dark:text-sky-400 bg-blue-500/10 hover:bg-blue-500/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Sparkles size={14} />
          <span>Cập nhật Link/Ảnh trong CRM ↗</span>
        </a>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`touch-target px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-sm ${
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
            className="card-glass rounded-2xl p-4 lg:p-5 border border-[var(--surface-border)] flex flex-col justify-between tech-card-hover group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {project.category}
                </span>

                {project.liveUrl ? (
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    ● Live Demo Sẵn Sàng
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    [Vui lòng bổ sung trong CRM]
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-[11px] font-mono text-[var(--muted-foreground)] mt-0.5">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs text-[var(--muted-foreground)] mt-3 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 my-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-[var(--surface-border)]">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-xs lg:text-sm font-black text-blue-600 dark:text-sky-400 font-mono">{m.value}</div>
                    <div className="text-[9px] text-[var(--muted-foreground)] truncate mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[var(--surface-border)] flex items-center justify-between gap-2 flex-wrap">
              <button
                onClick={() => setActiveProject(project)}
                className="touch-target px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white flex items-center gap-1.5 shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Layers size={13} />
                <span>Phân Tích Kiến Trúc</span>
                <ArrowUpRight size={13} />
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 transition-colors flex items-center gap-1"
                  >
                    <GithubIcon size={14} />
                    <span>Code</span>
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-[var(--muted-foreground)]">
                    Code: [Chờ cập nhật CMS]
                  </span>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white flex items-center gap-1 hover:bg-emerald-700 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
