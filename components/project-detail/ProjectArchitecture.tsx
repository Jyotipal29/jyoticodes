import type { Project } from "@/content/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { shouldShowArchitecture } from "./section-visibility";

export function ProjectArchitecture({ project }: { project: Project }) {
  if (!shouldShowArchitecture(project)) return null;
  const architecture = project.architecture!;

  return (
    <section className="mt-16 border-t border-border pt-16">
      <h2 className="font-mono text-sm tracking-widest text-gray-400 uppercase">
        Architecture
      </h2>
      <div className="mt-8 overflow-x-auto rounded-md border border-border bg-surface-1 p-6">
        <ArchitectureDiagram architecture={architecture} />
      </div>
    </section>
  );
}
