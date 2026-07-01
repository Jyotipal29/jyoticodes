import type { DailyLogEntry } from "./types";

/** Placeholder daily-log entries, most-recent first. */
export const dailyLogs: DailyLogEntry[] = [
  {
    date: "2026-06-30",
    topic: "Next.js intercepting routes",
    description:
      "Wired up a `(.)` intercepting route behind a `@modal` parallel slot to get a shared `layoutId` transition working without unmounting the grid underneath it.",
  },
  {
    date: "2026-06-24",
    topic: "Tailwind v4 `@theme`",
    description:
      "Migrated design tokens from `tailwind.config.ts` to a CSS-first `@theme` block — fewer moving parts, and the palette now lives in one file.",
  },
  {
    date: "2026-06-15",
    topic: "Postgres partial indexes",
    description:
      "Learned that a partial index on `WHERE status = 'active'` cut a hot query's planning time in half versus indexing the full table.",
  },
  {
    date: "2026-06-02",
    topic: "Focus trapping in modals",
    description:
      "Implemented a small focus-trap utility for a mobile menu — Escape and outside-click both needed to restore focus to the original trigger element.",
  },
];
