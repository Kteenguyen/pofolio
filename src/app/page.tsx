import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TerminalPlayground from "@/components/TerminalPlayground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-cyan-500 selection:text-white">
      {/* Fixed Navigation Bar */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Education />
        <TerminalPlayground />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
