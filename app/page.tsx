import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Writing } from "@/components/sections/Writing";
import { DailyLogs } from "@/components/sections/DailyLogs";
import { Library } from "@/components/sections/Library";
import { Experiments } from "@/components/sections/Experiments";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Composes every home-page section (R1, R3, R4, R14) behind the sticky Nav
// rendered in app/layout.tsx, in the brief's order.
//
// Hero and Career are deliberately NOT wrapped in `AnimatedSection`:
// - Hero should feel immediately present on load rather than fading in.
// - Career already reveals its own timeline entries via per-item
//   `whileInView` motion (see Career.tsx), and wrapping its whole section in
//   an ancestor that animates a `transform` would silently break its
//   `md:sticky` sidebar (a `transform` on any ancestor -- even one settled
//   at an identity `translateY(0px)` -- creates a new containing block and
//   disables `position: sticky` in descendants across browsers).
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
        <Writing />
      </AnimatedSection>

      <AnimatedSection>
        <DailyLogs />
      </AnimatedSection>

      <AnimatedSection>
        <Library />
      </AnimatedSection>

      <AnimatedSection>
        <Experiments />
      </AnimatedSection>

      <AnimatedSection>
        <Contact />
      </AnimatedSection>

      <Footer />
    </main>
  );
}
