"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Project } from "@/data/portfolioData";
import { X, ExternalLink, CheckCircle2, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import TechLogo from "./TechLogo";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto card-glass rounded-3xl p-6 lg:p-8 border border-[var(--surface-border)] shadow-2xl bg-[var(--surface)] text-[var(--foreground)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ chi tiết dự án"
          className="touch-target absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center bg-[var(--background)] border border-[var(--surface-border)] text-[var(--foreground)] hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="pr-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
            {project.category}
          </span>
          <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-[var(--muted-foreground)] mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[var(--surface-border)]">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-base lg:text-lg font-black text-blue-600 dark:text-blue-400">{m.value}</div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Deep Dive CAR Sections */}
        <div className="space-y-4 text-xs lg:text-sm leading-relaxed">
          {/* Problem */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400 mb-1.5">
              <AlertCircle size={16} />
              <span>Bối Cảnh & Thách Thức Nghiệp Vụ (Context & Challenge):</span>
            </div>
            <p className="text-[var(--foreground)]">{project.problem}</p>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400 mb-1.5">
              <Lightbulb size={16} />
              <span>Giải Pháp Kỹ Thuật & Kiến Trúc (Architecture Solution):</span>
            </div>
            <p className="text-[var(--foreground)]">{project.solution}</p>
          </div>

          {/* Impact */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              <TrendingUp size={16} />
              <span>Kết Quả & Giá Trị Thực Tế Đạt Được (Measurable Impact):</span>
            </div>
            <ul className="space-y-1.5 text-[var(--foreground)]">
              {project.impact.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Chips kèm logo */}
        <div className="mt-6 pt-4 border-t border-[var(--surface-border)]">
          <div className="text-xs font-mono font-semibold text-[var(--muted-foreground)] mb-2">
            // CÔNG NGHỆ & CÔNG CỤ ÁP DỤNG:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-[var(--foreground)] border border-[var(--surface-border)]"
              >
                <TechLogo name={tech} size={14} />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target px-5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-2 shadow-sm"
            >
              <GithubIcon size={16} />
              <span>Mã Nguồn GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white flex items-center gap-2 shadow-sm hover:bg-blue-700 transition-colors"
            >
              <ExternalLink size={16} />
              <span>Trải Nghiệm Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
