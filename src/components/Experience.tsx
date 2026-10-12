import { portfolioData } from "@/data/portfolioData";
import { Briefcase, MapPin, Calendar, CheckCircle2, Building2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-20 border-t border-[var(--surface-border)] bg-[var(--surface-subtle)]/40">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
            // HÀNH TRÌNH THỰC CHIẾN DOANH NGHIỆP
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            Kinh Nghiệm Triển Khai & Phát Triển Phần Mềm
          </h2>
          <p className="text-[var(--muted-foreground)] mt-3 max-w-2xl text-base leading-relaxed">
            Chứng thực qua các dự án phần mềm có người dùng thật, khối lượng nghiệp vụ lớn và yêu cầu kỹ thuật khắt khe.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 lg:pl-8 border-l-2 border-blue-500/30 space-y-12">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[31px] lg:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-400 group-hover:scale-125 transition-transform shadow-sm" />

              <div className="card-glass rounded-2xl p-6 lg:p-7 border border-[var(--surface-border)]">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
                      {exp.type}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--foreground)]">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1.5">
                      <Building2 size={15} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)] font-mono">
                    <span className="flex items-center gap-1 bg-[var(--surface)] px-2.5 py-1 rounded-md border border-[var(--surface-border)] shadow-sm">
                      <Calendar size={13} /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1 bg-[var(--surface)] px-2.5 py-1 rounded-md border border-[var(--surface-border)] shadow-sm">
                      <MapPin size={13} /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs lg:text-sm text-[var(--muted-foreground)] leading-relaxed mt-2">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="mt-5 space-y-2.5 pt-4 border-t border-[var(--surface-border)]">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs lg:text-sm text-[var(--foreground)] leading-relaxed">
                      <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="mt-5 pt-4 border-t border-[var(--surface-border)] flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[var(--muted-foreground)] border border-[var(--surface-border)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
