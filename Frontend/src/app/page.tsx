import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
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

        <div className="section-divider-glow divider-hero-about" aria-hidden="true" />

        {/* 3. Academic & Enterprise Philosophy (3 Pillars) */}
        <About />

        <div className="section-divider-glow divider-about-edu" aria-hidden="true" />

        {/* 4. Education (Học Vấn 5 Năm ĐH Tôn Đức Thắng) */}
        <Education />

        <div className="section-divider-glow divider-edu-exp" aria-hidden="true" />

        {/* 5. Experience (Kinh Nghiệm FPT IS & Luklak) */}
        <Experience />

        <div className="section-divider-glow divider-exp-proj" aria-hidden="true" />

        {/* 6. Projects (Kho Dự Án Kỹ Thuật CAR Framework) */}
        <section id="projects" className="py-8 sm:py-10 lg:py-12 section-projects-spotlight relative overflow-hidden">
          <div className="portfolio-container">
            <Projects />
          </div>
        </section>

        <div className="section-divider-glow divider-proj-tech" aria-hidden="true" />

        {/* 7. Tech Stack (Khung Công Nghệ & Kỹ Năng) */}
        <TechStack />

        <div className="section-divider-glow divider-tech-contact" aria-hidden="true" />

        {/* 8. Contact Section */}
        <section id="contact" className="py-8 sm:py-10 lg:py-12 section-contact-hub relative overflow-hidden">
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
