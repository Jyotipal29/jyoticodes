import { projects } from "@/content/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "./ProjectCard";

// Renders content/projects.ts in array order (R10) at 1/2/3 columns
// (mobile/tablet/desktop). Server-renderable itself -- the Motion/layoutId
// logic lives one level down in ProjectCard.
export function ProjectsGrid() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" label="Projects" />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Things I&apos;ve <span className="text-accent italic">built</span>.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
