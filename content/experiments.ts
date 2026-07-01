import type { Experiment } from "./types";

/** Placeholder experiments — decorative/tag-only, no detail page. */
export const experiments: Experiment[] = [
  {
    slug: "svg-sparkline-generator",
    title: "SVG sparkline generator",
    description: "A tiny script that turns a numeric array into a single-path inline SVG sparkline.",
    tags: ["SVG", "TypeScript"],
  },
  {
    slug: "terminal-theme-previewer",
    title: "Terminal theme previewer",
    description: "A local tool for previewing terminal color schemes against real command output.",
    tags: ["CLI", "Node.js"],
  },
  {
    slug: "css-only-marquee",
    title: "CSS-only marquee",
    description: "An exploration of building a pausable marquee with pure CSS animations, no JS.",
    tags: ["CSS", "Accessibility"],
  },
  {
    slug: "local-first-notes",
    title: "Local-first notes prototype",
    description: "A weekend prototype exploring IndexedDB-backed, offline-first note syncing.",
    tags: ["IndexedDB", "React"],
  },
];
