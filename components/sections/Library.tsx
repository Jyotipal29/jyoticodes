import { library } from "@/content/library";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { SectionLabel } from "@/components/ui/SectionLabel";

const MAX_RATING = 5;

// Renders a fixed 1-5 star rating as filled/outline star glyphs -- a plain
// text representation keeps this server-renderable with no icon dependency.
function StarRating({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(MAX_RATING, rating));
  const stars = Array.from({ length: MAX_RATING }, (_, i) => i < clamped);

  return (
    <span
      className="font-mono text-sm text-accent"
      role="img"
      aria-label={`${clamped} out of ${MAX_RATING} stars`}
    >
      {stars.map((filled) => (filled ? "★" : "☆")).join("")}
    </span>
  );
}

// Title, author, star rating, short note, and an optional cover via
// `ImageFallback` -- one entry (see content/library.ts) intentionally omits
// `coverImage` to exercise the fallback block.
export function Library() {
  return (
    <section id="library" className="scroll-mt-24 border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionLabel index="06" label="Library" className="mb-8" />

        {library.length === 0 ? (
          <EmptyState message="No entries yet — check back soon." />
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {library.map((entry) => (
              <li key={`${entry.title}-${entry.author}`}>
                <Card className="flex gap-4 p-4">
                  <ImageFallback
                    src={entry.coverImage}
                    alt={`Cover of ${entry.title}`}
                    fallback={entry.title.charAt(0).toUpperCase()}
                    width={64}
                    height={96}
                    className="h-24 w-16 shrink-0 rounded-sm object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-white">
                      {entry.title}
                    </h3>
                    <p className="font-mono text-xs text-gray-400">
                      {entry.author}
                    </p>
                    <StarRating rating={entry.rating} />
                    <p className="text-sm text-gray-400">{entry.note}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
