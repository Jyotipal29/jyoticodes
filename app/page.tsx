import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />

      <AnimatedSection>
        <About />
      </AnimatedSection>

      <Career />

      <AnimatedSection>
        <ProjectsGrid />
      </AnimatedSection>

      <AnimatedSection>
        <Contact />
      </AnimatedSection>

      <Footer />
    </main>
  );
}
