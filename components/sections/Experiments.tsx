import { experiments } from "@/content/experiments";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";

// Cards showing title, one-line description, and a row of tech-stack `Tag`
// pills. Decorative/tag-only in this plan -- no detail page, not clickable.
export function Experiments() {
  return (
    <section id="experiments" className="mx-auto max-w-3xl px-6 py-24">
      <SectionLabel index="07" label="Experiments" className="mb-8" />

      {experiments.length === 0 ? (
        <EmptyState message="No experiments yet — check back soon." />
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {experiments.map((experiment) => (
            <li key={experiment.slug}>
              <Card className="flex flex-col gap-3 p-6">
                <h3 className="text-base font-semibold text-white">
                  {experiment.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {experiment.description}
                </p>
                {experiment.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {experiment.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
