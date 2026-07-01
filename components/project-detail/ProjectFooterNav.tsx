import Link from "next/link";
import type { Project } from "@/content/types";

export type ProjectFooterNavProps = {
  /** `undefined` at the first project in content/projects.ts order. */
  previous?: Project;
  /** `undefined` at the last project in content/projects.ts order. */
  next?: Project;
};

// Prev/next navigation computed from array position in content/projects.ts.
// Hides whichever side is out of bounds (no wraparound) rather than
// disabling it. Links via a plain <Link> to the canonical route -- no
// interception needed between two detail pages.
export function ProjectFooterNav({ previous, next }: ProjectFooterNavProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Adjacent projects"
      className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-8 font-mono text-sm"
    >
      {previous ? (
        <Link
          href={`/projects/${previous.slug}`}
          className="flex flex-col gap-1 text-gray-400 transition-colors hover:text-white"
        >
          <span>← Previous project</span>
          <span className="text-white">{previous.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="flex flex-col items-end gap-1 text-right text-gray-400 transition-colors hover:text-white"
        >
          <span>Next project →</span>
          <span className="text-white">{next.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
