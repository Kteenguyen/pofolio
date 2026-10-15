"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Project } from "@/data/portfolioData";
import { X, ExternalLink, CheckCircle2, AlertCircle, Lightbulb, TrendingUp, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import TechLogo from "./TechLogo";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const [mounted, setMounted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

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

  const projectImages = project.images && project.images.length > 0 ? project.images : (project.imageUrl ? [project.imageUrl] : []);
  const currentImage = projectImages[activeImageIndex] || project.imageUrl;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto card-glass rounded-3xl p-6 lg:p-8 border border-[var(--surface-border)] shadow-2xl bg-[var(--surface)] text-[var(--foreground)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={isEn ? "Close project details modal" : "Đóng cửa sổ chi tiết dự án"}
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

        {/* Optional Project Showcase Image Banner & Gallery */}
        {currentImage && (
          <div className="my-5 space-y-2">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-slate-950 shadow-md group">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/9] w-full overflow-hidden cursor-pointer"
                  title={isEn ? `Open live experience: ${project.liveUrl}` : `Mở trải nghiệm trực tiếp: ${project.liveUrl}`}
                >
                  <img
                    src={currentImage}
                    alt={`${project.title} - ${isEn ? "Image" : "Ảnh"} ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-600 text-white backdrop-blur-md shadow-lg flex items-center gap-2 transition-transform group-hover:scale-105">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>{project.liveUrl.includes("vercel.app") ? (isEn ? "Live Vercel Demo" : "Trải Nghiệm Demo Vercel") : (isEn ? "Live Web Experience" : "Trải Nghiệm Live Web")}</span>
                    <ExternalLink size={13} />
                  </div>
                </a>
              ) : (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={currentImage}
                    alt={`${project.title} - ${isEn ? "Image" : "Ảnh"} ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                  {projectImages.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-blue-600/90 text-white backdrop-blur-md shadow-lg flex items-center gap-1.5">
                      <ImageIcon size={13} />
                      <span>{isEn ? `Image ${activeImageIndex + 1} / ${projectImages.length}` : `Ảnh ${activeImageIndex + 1} / ${projectImages.length}`}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Prev / Next controls if multiple images (Touch targets >= 44px) */}
              {projectImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : projectImages.length - 1));
                    }}
                    aria-label={isEn ? "Previous image" : "Xem ảnh trước"}
                    className="touch-target absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/75 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev < projectImages.length - 1 ? prev + 1 : 0));
                    }}
                    aria-label={isEn ? "Next image" : "Xem ảnh kế tiếp"}
                    className="touch-target absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/75 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg z-10"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Row if multiple images */}
            {projectImages.length > 1 && (
              <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                {projectImages.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all flex-1 aspect-[16/9] min-h-[44px] max-w-[140px] cursor-pointer touch-target ${
                      activeImageIndex === idx
                        ? "border-blue-500 ring-2 ring-blue-500/30 scale-100 opacity-100"
                        : "border-[var(--surface-border)] opacity-60 hover:opacity-90 hover:border-blue-400"
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 py-0.5 text-center text-[9px] font-mono text-white">
                      {isEn ? `Img ${idx + 1}` : `Ảnh ${idx + 1}`}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

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
              <span>{isEn ? "Context & Business Challenge:" : "Bối Cảnh & Thách Thức Nghiệp Vụ (Context & Challenge):"}</span>
            </div>
            <p className="text-[var(--foreground)]">{project.problem}</p>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400 mb-1.5">
              <Lightbulb size={16} />
              <span>{isEn ? "Technical Solution & Architecture:" : "Giải Pháp Kỹ Thuật & Kiến Trúc (Architecture Solution):"}</span>
            </div>
            <p className="text-[var(--foreground)]">{project.solution}</p>
          </div>

          {/* Impact */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              <TrendingUp size={16} />
              <span>{isEn ? "Measurable Impact & Real-World Value:" : "Kết Quả & Giá Trị Thực Tế Đạt Được (Measurable Impact):"}</span>
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
            // {isEn ? "APPLIED TECHNOLOGIES & TOOLS:" : "CÔNG NGHỆ & CÔNG CỤ ÁP DỤNG:"}
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
              <span>{isEn ? "GitHub Repository" : "Mã Nguồn GitHub"}</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white flex items-center gap-2 shadow-sm hover:bg-emerald-700 transition-colors"
            >
              <ExternalLink size={16} />
              <span>{project.liveUrl.includes("vercel.app") ? (isEn ? `Live Vercel Demo (${project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')})` : `Mở Trải Nghiệm Demo Vercel (${project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')})`) : (isEn ? "Live Demo Experience" : "Trải Nghiệm Live Demo")}</span>
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
