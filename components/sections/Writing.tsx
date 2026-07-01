import { writing } from "@/content/writing";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionLabel } from "@/components/ui/SectionLabel";

// List/excerpt-only per the plan's scope -- no `/writing/[slug]` detail
// route, so entries render as non-linked rows (title, excerpt, date).
export function Writing() {
  return (
    <section id="writing" className="scroll-mt-24 border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionLabel index="04" label="Writing" className="mb-8" />

        {writing.length === 0 ? (
          <EmptyState message="No posts yet — check back soon." />
        ) : (
          <ul className="flex flex-col gap-4">
            {writing.map((post) => (
              <li key={post.slug}>
                <Card className="flex flex-col gap-2 p-6">
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs tracking-wide text-gray-400 uppercase"
                  >
                    {post.date}
                  </time>
                  <h3 className="text-lg font-semibold text-white">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-400">{post.excerpt}</p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
