import type { Project } from "@/content/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

// Renders the Architecture section only when `project.architecture` is
// present -- omitted entirely (not an empty section) otherwise, per the
// "hide, don't disable" rule. Callers are expected to gate on
// `shouldShowArchitecture()` too, but this guard makes the component safe
// to render unconditionally as well.
export function ProjectArchitecture({ project }: { project: Project }) {
  if (!project.architecture) return null;

  return (
    <section className="mt-16 border-t border-border pt-16">
      <h2 className="font-mono text-sm tracking-widest text-gray-400 uppercase">
        Architecture
      </h2>
      <div className="mt-8 overflow-x-auto rounded-md border border-border bg-surface-1 p-6">
        <ArchitectureDiagram architecture={project.architecture} />
      </div>
    </section>
  );
}
