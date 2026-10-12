import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import TerminalPlayground from "@/components/TerminalPlayground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* 1. Header with classic tabs & CV download modal */}
      <Header />

      <main className="flex-1">
        {/* 2. Hero Profile with Ktee /avatar.jpg, badges, CTAs & Verified Metrics */}
        <Hero />

        {/* 3. Academic & Enterprise Philosophy (3 Pillars) */}
        <About />

        {/* 4. Education (Học Vấn 5 Năm ĐH Tôn Đức Thắng) */}
        <Education />

        {/* 5. Experience (Kinh Nghiệm FPT IS & Luklak) */}
        <Experience />

        {/* 6. Projects (Kho 6 Dự Án Thực Chiến CAR Framework) */}
        <section id="projects" className="py-20 border-t border-[var(--surface-border)] bg-[var(--background)]">
          <div className="portfolio-container">
            <Projects />
          </div>
        </section>

        {/* 7. Tech Stack (Khung Công Nghệ & Kỹ Năng) */}
        <TechStack />

        {/* 8. Interactive CLI Terminal */}
        <section id="terminal" className="py-20 border-t border-[var(--surface-border)] bg-[var(--surface-subtle)]/40">
          <div className="portfolio-container">
            <TerminalPlayground />
          </div>
        </section>

        {/* 9. Contact Section */}
        <section id="contact" className="py-20 border-t border-[var(--surface-border)] bg-[var(--background)]">
          <div className="portfolio-container">
            <Contact />
          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
