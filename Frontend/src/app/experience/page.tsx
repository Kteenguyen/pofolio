import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 portfolio-container py-4 lg:py-6 space-y-6">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <Link href="/education" className="flex items-center gap-1 hover:text-blue-600 transition-colors font-medium">
            <ArrowLeft size={14} />
            <span>Xem Học Vấn TDTU</span>
          </Link>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">ROUTE: /experience</span>
        </div>

        {/* Dedicated Experience Component */}
        <Experience />

        {/* Bottom Route Navigation Bar */}
        <div className="pt-4 border-t border-[var(--surface-border)] flex items-center justify-between">
          <Link
            href="/education"
            className="touch-target px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-blue-600 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Học Vấn 5 Năm</span>
          </Link>
          <Link
            href="/projects"
            className="touch-target px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Tiếp theo: Kho 6 Dự Án Tiêu Biểu</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
