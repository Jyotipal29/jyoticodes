import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Site-wide 404 (R12's sibling case) -- catches any unmatched route outside
// the `/projects/[slug]` segment, which has its own on-brand not-found.tsx.
// The root Nav from app/layout.tsx still renders above this, so the sticky
// nav and its section anchors remain reachable even from a dead link.
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      <SectionLabel index="404" label="Not found" />
      <h1 className="text-4xl font-semibold sm:text-6xl">
        This page doesn&apos;t <span className="text-accent italic">exist</span>.
      </h1>
      <p className="max-w-md text-gray-400">
        The page you&apos;re looking for may have been moved, renamed, or never
        existed. Head back home to find your way around.
      </p>
      <Button variant="primary" href="/">
        ← Back home
      </Button>
    </main>
  );
}
