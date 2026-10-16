"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import TechLogo from "./TechLogo";
import { Layers, ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function Projects() {
  const { data, ui, locale } = useLanguage();
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("ALL");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>(data.projects);

  // Keep dynamicProjects and activeProject in sync when locale changes
  useEffect(() => {
    setDynamicProjects(data.projects);
    if (activeProject) {
      const refreshed = data.projects.find((p) => p.id === activeProject.id);
      if (refreshed) {
        setActiveProject((prev) => ({
          ...refreshed,
          liveUrl: prev?.liveUrl || refreshed.liveUrl,
          githubUrl: prev?.githubUrl || refreshed.githubUrl,
          imageUrl: prev?.imageUrl || refreshed.imageUrl,
          images: prev?.images || refreshed.images,
        }));
      }
    }
  }, [data]);

  // Sync dynamically with Backend CMS if available
  useEffect(() => {
    fetch("http://localhost:3001/api/projects")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setDynamicProjects((prev) =>
            prev.map((localP) => {
              const remoteP = json.data.find((r: { id: string }) => r.id === localP.id);
              if (remoteP) {
                return {
                  ...localP,
                  liveUrl: remoteP.liveUrl || localP.liveUrl,
                  githubUrl: remoteP.githubUrl || localP.githubUrl,
                  imageUrl: remoteP.imageUrl || localP.imageUrl,
                  images: remoteP.images || localP.images,
                };
              }
              return localP;
            })
          );
        }
      })
      .catch(() => {
        // Fallback gracefully to local portfolioData
      });
  }, []);

  const categories = [
    { key: "ALL", label: ui.projCatAll },
    { key: "Full-Stack và Web", label: ui.projCatWeb },
    { key: "Backend và CSDL", label: ui.projCatBackend },
    { key: "Phân Tích BA và Nghiệp Vụ", label: ui.projCatBA },
  ];

  const filteredProjects =
    selectedCategoryKey === "ALL"
      ? dynamicProjects
      : dynamicProjects.filter((p) => p.category === selectedCategoryKey);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-sky-400 uppercase mb-1">
            {ui.projBadge}
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-[var(--foreground)] tracking-tight text-balance">
            {ui.projTitle}
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] mt-1 max-w-2xl text-pretty">
            {ui.projDesc}
          </p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategoryKey(cat.key)}
            className={`touch-target px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0 ${
              selectedCategoryKey === cat.key
                ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/20"
                : "bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--surface-border)] hover:border-blue-600 hover:text-[var(--foreground)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="project-grid-layout">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="card-glass rounded-2xl p-4 lg:p-5 border border-[var(--surface-border)] flex flex-col justify-between tech-card-hover group overflow-hidden"
          >
            <div>
              {/* Optional Project Showcase Image Banner */}
              {project.imageUrl && (
                <div className="relative mb-4 -mx-4 -mt-4 lg:-mx-5 lg:-mt-5 overflow-hidden border-b border-[var(--surface-border)] bg-slate-950 group/img">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-[16/9] w-full overflow-hidden cursor-pointer"
                      title={project.liveUrl}
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-600 text-white shadow-md flex items-center gap-1.5 transition-transform group-hover:scale-105">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>{project.liveUrl.includes("vercel.app") ? ui.projVercelDemo : ui.projLiveDemo}</span>
                        <ExternalLink size={11} />
                      </div>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="block relative aspect-[16/9] w-full overflow-hidden cursor-pointer text-left focus:outline-none"
                      title={project.title}
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      {project.images && project.images.length > 1 ? (
                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-blue-600 text-white shadow-md flex items-center gap-1.5 transition-transform group-hover:scale-105">
                          <Layers size={11} />
                          <span>{project.images.length} {ui.projPhotos}</span>
                        </div>
                      ) : (
                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-800/80 text-white shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                          <span>{ui.projBizDetails}</span>
                        </div>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {project.categoryEn && locale === "en" ? project.categoryEn : project.category}
                </span>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1.5 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                    <span>{project.liveUrl.includes("vercel.app") ? "Vercel Live" : ui.projLiveDemo}</span>
                    <ExternalLink size={10} />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono font-medium text-[var(--muted-foreground)]">
                    {locale === "en" ? "Enterprise System" : "Nghiệp Vụ Enterprise"}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors text-balance">
                {project.title}
              </h3>
              <p className="text-[11px] font-mono text-[var(--muted-foreground)] mt-0.5 text-pretty">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs text-[var(--muted-foreground)] mt-3 line-clamp-3 leading-relaxed text-pretty">
                {project.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 my-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-[var(--surface-border)]">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center px-1">
                    <div className="text-xs lg:text-sm font-black text-blue-600 dark:text-sky-400 font-mono">{m.value}</div>
                    <div className="text-[9px] text-[var(--muted-foreground)] leading-tight line-clamp-2 mt-0.5 text-pretty">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--surface-border)] whitespace-nowrap shrink-0"
                  >
                    <TechLogo name={tech} size={11} />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[var(--surface-border)] flex items-center justify-between gap-2 flex-wrap">
              <button
                onClick={() => setActiveProject(project)}
                className="touch-target px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white flex items-center gap-1.5 shadow-sm hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Layers size={13} />
                <span>{ui.projArchAnalysis}</span>
                <ArrowUpRight size={13} />
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <GithubIcon size={14} />
                    <span>{ui.projCode}</span>
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-[var(--muted-foreground)] whitespace-nowrap shrink-0">
                    {ui.projCodePending}
                  </span>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white flex items-center gap-1.5 hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap shrink-0"
                    title={project.liveUrl}
                  >
                    <span>{project.liveUrl.includes("vercel.app") ? ui.projVercelDemo : ui.projLiveDemo}</span>
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
    </div>
  );
}
