import type { Project } from "@/content/types";
import { ProjectArchitecture } from "./ProjectArchitecture";
import { ProjectDemo } from "./ProjectDemo";
import { ProjectHighlights } from "./ProjectHighlights";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectTechStack } from "./ProjectTechStack";
import { shouldShowArchitecture, shouldShowDemo } from "./section-visibility";

/**
 * The body content shared by BOTH `/projects/[slug]` routes -- the canonical
 * page and the `@modal` intercepting overlay -- so this JSX exists once
 * instead of being copy-pasted across the two entry points. Deliberately
 * excludes `ProjectHeader` (its hero image needs a different `layoutId`
 * wiring per route) and `ProjectFooterNav` (canonical-route-only; prev/next
 * links to another detail page via a plain `<Link>`, no interception
 * concern between two detail pages).
 */
export function ProjectDetailContent({ project }: { project: Project }) {
  return (
    <>
      <ProjectOverview project={project} />
      {shouldShowArchitecture(project) && <ProjectArchitecture project={project} />}
      <ProjectTechStack project={project} />
      <ProjectHighlights project={project} />
      {shouldShowDemo(project) && <ProjectDemo project={project} />}
      <ProjectLinks project={project} />
    </>
  );
}
