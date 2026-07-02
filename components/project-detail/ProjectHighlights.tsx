import type { Project } from "@/content/types";
import { Card } from "@/components/ui/Card";

export function ProjectHighlights({ project }: { project: Project }) {
  if (project.highlights.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-16">
      <h2 className="font-mono text-sm tracking-widest text-gray-400 uppercase">
        Highlights
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {project.highlights.map((highlight) => (
          <Card key={highlight.title} className="flex flex-col gap-2 p-6">
            <h3 className="text-lg font-semibold text-white">{highlight.title}</h3>
            <p className="text-sm text-gray-400">{highlight.description}</p>
            {highlight.metric && (
              <p className="mt-2 font-mono text-sm text-accent">{highlight.metric}</p>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
