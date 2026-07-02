import type { Project } from "@/content/types";
import { ProjectArchitecture } from "./ProjectArchitecture";
import { ProjectDemo } from "./ProjectDemo";
import { ProjectHighlights } from "./ProjectHighlights";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectTechStack } from "./ProjectTechStack";
import { shouldShowArchitecture, shouldShowDemo } from "./section-visibility";

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
