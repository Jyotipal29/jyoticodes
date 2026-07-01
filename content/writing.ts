import type { WritingPost } from "./types";

/**
 * Placeholder writing list. List/excerpt-only per the plan's scope — there
 * is no `/writing/[slug]` detail route in this plan, so no body content
 * field is modeled here.
 */
export const writing: WritingPost[] = [
  {
    slug: "typed-content-over-cms",
    title: "Why I stopped reaching for a CMS",
    excerpt:
      "For a personal site with a handful of content types, a typed TypeScript file is faster to change, safer to refactor, and one less service to run than any headless CMS.",
    date: "2026-05-12",
  },
  {
    slug: "designing-a-sparkline-by-hand",
    title: "Designing a sparkline by hand, no charting library",
    excerpt:
      "A short walkthrough of building a single-series SVG polyline chart from scratch, and why it was less code than wiring up a library for one line.",
    date: "2026-03-02",
  },
  {
    slug: "shared-element-transitions-app-router",
    title: "Shared-element transitions with the App Router",
    excerpt:
      "Intercepting routes and parallel route slots make grid-to-detail animations possible without unmounting the page underneath — here's how the pieces fit together.",
    date: "2026-01-20",
  },
  {
    slug: "reduced-motion-as-a-first-class-policy",
    title: "Treating reduced motion as a first-class policy, not an afterthought",
    excerpt:
      "Centralizing every animated component behind one `useReducedMotion` hook instead of scattering media-query checks across the codebase.",
    date: "2025-11-08",
  },
];
