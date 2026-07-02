import type { Project, TechStackByCategory } from "@/content/types";
import { Tag } from "@/components/ui/Tag";

const CATEGORY_LABELS: Record<keyof TechStackByCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  thirdParty: "Third-party",
};

export function ProjectTechStack({ project }: { project: Project }) {
  const categories = (
    Object.keys(CATEGORY_LABELS) as Array<keyof TechStackByCategory>
  )
    .map((key) => ({
      key,
      label: CATEGORY_LABELS[key],
      entries: project.techStackByCategory[key],
    }))
    .filter((category) => category.entries.length > 0);

  if (categories.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-16">
      <h2 className="font-mono text-sm tracking-widest text-gray-400 uppercase">
        Tech stack
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {categories.map((category) => (
          <div key={category.key} className="flex flex-col gap-3">
            <h3 className="font-mono text-xs tracking-widest text-gray-400 uppercase">
              {category.label}
            </h3>
            <ul className="flex flex-col gap-3">
              {category.entries.map((entry) => (
                <li key={entry.name} className="flex flex-col gap-1">
                  <Tag className="w-fit">{entry.name}</Tag>
                  <p className="text-sm text-gray-400">{entry.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
