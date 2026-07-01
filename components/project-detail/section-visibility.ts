import type { Project } from "@/content/types";

/**
 * Pure, independently-testable optional-field visibility logic for the
 * project detail page. Every optional CTA/section (live link, source link,
 * demo, architecture diagram) is *omitted entirely* when its backing data is
 * absent -- never rendered disabled or empty (see the "hide, don't disable"
 * KTD). Page/header/subsection components call these instead of inlining
 * `project.liveUrl && (...)` checks scattered across JSX.
 *
 * This is the only part of U9's new logic Vitest can exercise directly --
 * `app/projects/[slug]/page.tsx` and its subsections are (or are rendered
 * from) async Server Components, which Vitest/RTL cannot render (see the
 * Testing stack KTD).
 */

export function shouldShowLiveLink(project: Project): boolean {
  return Boolean(project.liveUrl);
}

export function shouldShowSourceLink(project: Project): boolean {
  return Boolean(project.githubUrl);
}

export function shouldShowDemo(project: Project): boolean {
  return Boolean(project.demo);
}

export function shouldShowArchitecture(project: Project): boolean {
  return Boolean(project.architecture);
}
