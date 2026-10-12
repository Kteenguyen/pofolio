import { portfolioData } from "@/data/portfolioData";
import { GraduationCap, Award, CheckCircle, BookOpen, Star } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-20 border-t border-[var(--surface-border)] bg-[var(--background)] relative">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
            // HỌC THUẬT & NỀN TẢNG ĐÀO TẠO 5 NĂM
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            Chương Trình Đào Tạo Kỹ Sư Tại ĐH Tôn Đức Thắng
          </h2>
          <p className="text-[var(--muted-foreground)] mt-3 max-w-2xl text-base leading-relaxed">
            Hành trình 5 năm toàn thời gian (2021 – 2026) trang bị tư duy toán học, thuật toán sâu sắc và năng lực làm chủ công nghệ từ tầng gốc rễ.
          </p>
        </div>

        {/* 5-Year Degree Showcase Card */}
        {portfolioData.education.map((edu) => (
          <div
            key={edu.id}
            className="card-glass rounded-3xl p-6 lg:p-8 border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 dark:from-[var(--surface)] dark:via-[var(--surface)] dark:to-blue-950/20 mb-10"
          >
            {/* Degree Title Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[var(--surface-border)]">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                  <GraduationCap size={30} />
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
                    {edu.duration}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)]">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    {edu.institution} • <span className="font-mono text-[var(--muted-foreground)] font-normal">{edu.period}</span>
                  </div>
                </div>
              </div>

              {edu.grade && (
                <div className="self-start lg:self-center px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-[var(--surface-border)] text-[var(--foreground)] text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span>{edu.grade}</span>
                </div>
              )}
            </div>

            {/* Coursework Score Cards - Apple Grid Style */}
            <div className="my-8">
              <div className="text-xs font-mono font-semibold text-[var(--muted-foreground)] uppercase mb-3">
                // ĐIỂM SỐ CÁC MÔN CHUYÊN NGÀNH CỐT LÕI (BẢNG ĐIỂM CHỨNG THỰC):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {edu.coursework.map((course) => (
                  <div
                    key={course.name}
                    className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-sm flex flex-col justify-between"
                  >
                    <span className="text-xs font-semibold text-[var(--foreground)] leading-snug">
                      {course.name}
                    </span>
                    <span className="mt-3 text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                      {course.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-3 pt-6 border-t border-[var(--surface-border)]">
              <div className="text-xs font-mono font-semibold text-[var(--muted-foreground)] uppercase">
                // ĐẶC THÙ CHƯƠNG TRÌNH & KẾT QUẢ ĐÀO TẠO:
              </div>
              {edu.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs lg:text-sm text-[var(--foreground)] leading-relaxed">
                  <CheckCircle size={17} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Certifications Section */}
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)] mb-4">
            <Award size={18} className="text-blue-600 dark:text-blue-400" />
            <span>Chứng Nhận Năng Lực & Đồ Án Kỹ Thuật:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioData.certifications.map((cert) => (
              <div
                key={cert.name}
                className="card-glass rounded-2xl p-5 border border-[var(--surface-border)] flex flex-col justify-between tech-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-blue-400 mb-2">
                    <span>{cert.year}</span>
                    <BookOpen size={14} />
                  </div>
                  <h4 className="text-xs lg:text-sm font-bold text-[var(--foreground)] leading-snug">
                    {cert.name}
                  </h4>
                </div>
                <div className="text-[11px] text-[var(--muted-foreground)] mt-3 pt-3 border-t border-[var(--surface-border)] font-medium">
                  {cert.issuer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
