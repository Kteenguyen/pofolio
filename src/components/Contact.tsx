"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Mail, Phone, MapPin, Copy, Check, Send, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(portfolioData.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 border-t border-[var(--surface-border)] bg-[var(--surface-subtle)]/50 relative">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="text-xs font-mono font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
            // THÔNG TIN LIÊN HỆ TRỰC TIẾP
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            Kết Nối & Trao Đổi Cơ Hội Hợp Tác
          </h2>
          <p className="text-[var(--muted-foreground)] mt-3 max-w-2xl text-base leading-relaxed">
            Tôi luôn sẵn sàng trao đổi về các vị trí Software Engineer (Full-Stack / Front-End / Back-End), các dự án chuyển đổi số hoặc vai trò cầu nối Business Analyst.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Direct Info & Quick Action */}
          <div className="space-y-4">
            {/* Phone Card */}
            <div className="card-glass rounded-2xl p-6 border border-[var(--surface-border)]">
              <div className="text-xs font-mono text-[var(--muted-foreground)] mb-1">
                // SỐ ĐIỆN THOẠI TRỰC TIẾP
              </div>
              <div className="flex items-center justify-between gap-3 mt-3">
                <a href={`tel:${portfolioData.personal.phone}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={19} />
                  </div>
                  <span className="font-mono text-base font-bold text-[var(--foreground)] group-hover:text-blue-600 transition-colors">
                    {portfolioData.personal.phone}
                  </span>
                </a>
                <button
                  onClick={handleCopyPhone}
                  aria-label="Sao chép số điện thoại"
                  className="touch-target px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--surface)] border border-[var(--surface-border)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                >
                  {copiedPhone ? (
                    <>
                      <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Email Card */}
            <div className="card-glass rounded-2xl p-6 border border-[var(--surface-border)]">
              <div className="text-xs font-mono text-[var(--muted-foreground)] mb-1">
                // ĐỊA CHỈ EMAIL CÁ NHÂN
              </div>
              <div className="flex items-center justify-between gap-3 mt-3">
                <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={19} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-blue-600 transition-colors break-all">
                      {portfolioData.personal.email}
                    </span>
                    <span className="text-[11px] text-[var(--muted-foreground)]">
                      {portfolioData.personal.backupEmail}
                    </span>
                  </div>
                </a>
                <button
                  onClick={handleCopyEmail}
                  aria-label="Sao chép địa chỉ email"
                  className="touch-target px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--surface)] border border-[var(--surface-border)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Status Card */}
            <div className="card-glass rounded-2xl p-6 border border-[var(--surface-border)] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--foreground)] flex items-center justify-center shrink-0">
                  <MapPin size={19} />
                </div>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Địa bàn làm việc:</div>
                  <div className="text-sm font-semibold text-[var(--foreground)]">
                    {portfolioData.personal.location} (On-site / Hybrid / Remote)
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--surface-border)] flex items-center justify-between">
                <span className="text-xs text-[var(--muted-foreground)]">Trạng thái:</span>
                <span className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {portfolioData.personal.statusText}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <GithubIcon size={16} />
                <span>GitHub ({portfolioData.personal.githubUser})</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Right Column: Fast Contact Form */}
          <div className="card-glass rounded-2xl p-6 lg:p-7 border border-[var(--surface-border)]">
            <h3 className="text-base lg:text-lg font-bold text-[var(--foreground)] mb-1">
              Gửi Tin Nhắn Nhanh Tới Ktee
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-6">
              Vui lòng để lại thông tin trao đổi, tôi sẽ phản hồi qua email hoặc số điện thoại trong vòng 24 giờ.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-center space-y-2">
                <Check size={32} className="mx-auto" />
                <div className="font-bold text-base">Cảm ơn bạn đã liên hệ!</div>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Tin nhắn đã được ghi nhận. Ktee sẽ phản hồi bạn trong thời gian sớm nhất.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5">
                    Họ và tên của bạn:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A / Công ty XYZ..."
                    className="touch-target w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs lg:text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5">
                    Email nhận phản hồi:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com..."
                    className="touch-target w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs lg:text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5">
                    Nội dung trao đổi / Lời mời phỏng vấn:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mô tả vị trí công việc, dự án hoặc yêu cầu hợp tác..."
                    className="w-full p-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-xs lg:text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-blue-600 resize-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="touch-target w-full py-3.5 rounded-xl text-xs lg:text-sm font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={16} />
                  <span>Gửi Tin Nhắn Trực Tiếp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
