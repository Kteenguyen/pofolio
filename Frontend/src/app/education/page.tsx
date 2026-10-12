import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Education from "@/components/Education";
import About from "@/components/About";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function EducationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 portfolio-container py-4 lg:py-6 space-y-6">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors font-medium">
            <ArrowLeft size={14} />
            <span>Về Trang Tổng Quan (Bento Hub)</span>
          </Link>
          <span className="font-mono text-blue-600 dark:text-sky-400 font-bold">ROUTE: /education</span>
        </div>

        {/* Dedicated Education Component */}
        <Education />

        {/* 3 Academic Pillars Component */}
        <About />

        {/* Bottom Route Navigation Bar */}
        <div className="pt-4 border-t border-[var(--surface-border)] flex items-center justify-between">
          <Link
            href="/"
            className="touch-target px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Trang Tổng Quan</span>
          </Link>
          <Link
            href="/experience"
            className="touch-target px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Tiếp theo: Kinh Nghiệm FPT & Luklak</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
