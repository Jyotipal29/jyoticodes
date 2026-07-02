import type { Project } from "@/content/types";
import { StatCallout } from "@/components/ui/StatCallout";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[1fr_280px]">
      <div className="flex flex-col gap-4">
        <h2 className="font-mono text-sm tracking-widest text-gray-400 uppercase">
          Overview
        </h2>
        {project.overview.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-gray-400">
            {paragraph}
          </p>
        ))}
      </div>

      {project.stats.length > 0 && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
          {project.stats.map((stat) => (
            <StatCallout key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      )}
    </section>
  );
}
