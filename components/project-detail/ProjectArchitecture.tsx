import type { Project } from "@/content/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { shouldShowArchitecture } from "./section-visibility";

// Renders the Architecture section only when project.architecture has at
// least one node to draw -- omitted entirely (not an empty section)
// otherwise, per the "hide, don't disable" rule. Callers are expected to
// gate on `shouldShowArchitecture()` too, but this guard (calling the same
// helper) makes the component safe to render unconditionally as well.
export function ProjectArchitecture({ project }: { project: Project }) {
  if (!shouldShowArchitecture(project)) return null;
  // Safe: shouldShowArchitecture already confirmed project.architecture
  // exists and has at least one node.
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
