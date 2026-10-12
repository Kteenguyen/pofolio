import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { portfolioData } from "@/data/portfolioData";
import {
  GraduationCap,
  Briefcase,
  Layers,
  Terminal,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  ExternalLink,
  Code2
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 portfolio-container py-4 lg:py-6 space-y-4">
        {/* ROW 1: PROFILE HERO STRIP (HIGH DENSITY) */}
        <section className="card-glass rounded-2xl p-4 lg:p-6 border border-[var(--surface-border)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {portfolioData.personal.statusText}
                </span>
                <span className="text-[var(--muted-foreground)]">•</span>
                <span className="font-mono text-blue-600 dark:text-sky-400 font-bold">
                  {portfolioData.personal.degreeLabel}
                </span>
                <span className="text-[var(--muted-foreground)]">•</span>
                <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
                  <MapPin size={12} /> {portfolioData.personal.location}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[var(--foreground)]">
                {portfolioData.personal.name} ({portfolioData.personal.nickname})
                <span className="block text-sm sm:text-base font-semibold text-blue-600 dark:text-sky-400 mt-1">
                  Full-Stack Software Engineer • Tư Duy Phân Tích Nghiệp Vụ BA • Kỹ Sư Thực Chiến
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-3xl leading-relaxed">
                {portfolioData.personal.bio}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="touch-target px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white flex items-center justify-center gap-2 shadow-sm hover:bg-blue-700 transition-colors"
              >
                <Phone size={14} />
                <span>Gọi: {portfolioData.personal.phone}</span>
              </a>

              <Link
                href="/contact"
                className="touch-target px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Mail size={14} />
                <span>Gửi Lời Mời Phỏng Vấn</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ROW 2: 4 VERIFIED METRICS (ZERO FLUFF) */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {portfolioData.stats.map((stat) => (
            <div
              key={stat.label}
              className="card-glass rounded-xl p-3 border border-[var(--surface-border)] flex flex-col justify-center"
            >
              <div className="text-lg lg:text-2xl font-black text-blue-600 dark:text-sky-400 font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] font-medium text-[var(--muted-foreground)] mt-0.5 truncate">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* ROW 3: BENTO DUAL-COLUMNS (ACADEMIC + ENTERPRISE) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bento Box 1: Academic Rigor TDTU */}
          <div className="card-glass rounded-2xl p-4 lg:p-5 border border-blue-500/20 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-sky-400 uppercase">
                  <GraduationCap size={16} />
                  <span>Học Thuật 5 Năm • ĐH Tôn Đức Thắng</span>
                </div>
                <span className="text-[11px] font-mono text-[var(--muted-foreground)]">2021 – 2026</span>
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                Cử nhân / Kỹ sư Công nghệ Thông tin (Hệ 5 Năm Toàn Thời Gian)
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Nền tảng hơn 150+ tín chỉ: Cấu trúc dữ liệu & Giải thuật, Hệ thống phân tán, An toàn thông tin và Kiểm thử phần mềm.
              </p>

              {/* 4 Core Grades Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-[var(--surface-border)]">
                {portfolioData.education[0].coursework.map((c) => (
                  <div key={c.name} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-[var(--surface-border)] text-center">
                    <div className="text-xs font-black text-blue-600 dark:text-sky-400 font-mono">{c.score}</div>
                    <div className="text-[10px] text-[var(--muted-foreground)] truncate mt-0.5">{c.name.split(" (")[0]}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/education"
              className="touch-target text-xs font-semibold text-blue-600 dark:text-sky-400 flex items-center gap-1 hover:underline pt-2"
            >
              <span>Xem bảng điểm chi tiết & chương trình đào tạo</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Bento Box 2: Enterprise Battle-Tested (FPT IS & Luklak) */}
          <div className="card-glass rounded-2xl p-4 lg:p-5 border border-indigo-500/20 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  <Briefcase size={16} />
                  <span>Thực Chiến Doanh Nghiệp • FPT IS & Luklak</span>
                </div>
                <span className="text-[11px] font-mono text-[var(--muted-foreground)]">Dự Án Lớn</span>
              </div>

              <div className="space-y-3">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-[var(--surface-border)]">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--foreground)]">
                    <span>FPT IS (12/2025 - 01/2026)</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">230 Users • 60 Bugs</span>
                  </div>
                  <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                    Trưởng nhóm triển khai hệ thống Thi Hành Án Dân Sự; tổ chức 15 buổi đào tạo, nghiệm thu đúng hạn.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-[var(--surface-border)]">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--foreground)]">
                    <span>Luklak Freelance (05/2026)</span>
                    <span className="font-mono text-blue-600 dark:text-sky-400">7 Trang Web • Lenis Scroll</span>
                  </div>
                  <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                    Lập trình Front-End 17 components tái sử dụng, hiệu ứng điện ảnh Cinematic Scroll, cấu hình VPS Linux.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/experience"
              className="touch-target text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline pt-2"
            >
              <span>Xem chi tiết vai trò & số liệu thực tế tại FPT IS / Luklak</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

        {/* ROW 4: 6 REAL PROJECTS SNAPSHOT & DIRECT LINK */}
        <section className="card-glass rounded-2xl p-4 lg:p-5 border border-[var(--surface-border)] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                <Layers size={17} className="text-blue-600 dark:text-sky-400" />
                <span>Kho 6 Dự Án Tiêu Biểu & Nghiệp Vụ Thực Tế</span>
              </h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Bao gồm Front-End hiệu ứng cao cấp, Back-End Redis Flash Sale, ASP.NET Core RBAC và sơ đồ nghiệp vụ BA UML.
              </p>
            </div>
            <Link
              href="/projects"
              className="touch-target px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0"
            >
              Xem Cả 6 Dự Án →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {portfolioData.projects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-[var(--surface-border)] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-sky-400 border border-blue-500/20 font-bold">
                    {p.category}
                  </span>
                  <h4 className="text-xs font-bold text-[var(--foreground)] mt-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-[var(--muted-foreground)] line-clamp-2 mt-1">
                    {p.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--surface-border)] flex items-center justify-between text-[11px]">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {p.metrics[0].value} {p.metrics[0].label}
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-[10px]">
                    [Vui lòng bổ sung trong CRM]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROW 5: QUICK TECH STACK & TERMINAL SNAPSHOT */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 card-glass rounded-2xl p-4 border border-[var(--surface-border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400 uppercase">
                  // KHUNG CÔNG NGHỆ CHÍNH (FULL-STACK & BA)
                </span>
                <Link href="/skills" className="text-xs text-blue-600 dark:text-sky-400 font-semibold hover:underline">
                  Xem tất cả kỹ năng →
                </Link>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  "ReactJS (v18+)", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll",
                  "Node.js (8.3/10)", "Express", "ASP.NET Core", "Redis Caching", "MongoDB", "MS SQL Server",
                  "Phân Tích Nghiệp Vụ BA (8.1/10)", "UAT Testing (Jira)", "VPS Linux & SSL", "AI & AI Agents"
                ].map((s) => (
                  <span
                    key={s}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[var(--foreground)] border border-[var(--surface-border)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[var(--muted-foreground)] mt-3">
              Tất cả kỹ năng đều được chứng thực qua bảng điểm Đại học Tôn Đức Thắng và các dự án thực tế tại FPT IS & Luklak.
            </p>
          </div>

          <div className="card-glass rounded-2xl p-4 border border-[var(--surface-border)] flex flex-col justify-between bg-slate-900 text-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-2">
                <Terminal size={14} />
                <span>Developer CLI Terminal</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                ktee@tdtu:~$ cat quick-contact.sh<br />
                <span className="text-emerald-400">PHONE:</span> {portfolioData.personal.phone}<br />
                <span className="text-blue-400">EMAIL:</span> {portfolioData.personal.email}<br />
                <span className="text-amber-400">STATUS:</span> Available for hire
              </p>
            </div>
            <Link
              href="/skills"
              className="touch-target mt-3 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-cyan-400 border border-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-700 transition-colors"
            >
              <Terminal size={13} />
              <span>Mở Interactive Terminal Đầy Đủ →</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
