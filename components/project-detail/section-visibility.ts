import type { Project } from "@/content/types";

export function shouldShowLiveLink(project: Project): boolean {
  return Boolean(project.liveUrl);
}

export function shouldShowSourceLink(project: Project): boolean {
  return Boolean(project.githubUrl);
}

export function shouldShowDemo(project: Project): boolean {
  return Boolean(project.demo?.videoUrl) || Boolean(project.demo?.screenshots.length);
}

export function shouldShowArchitecture(project: Project): boolean {
  return Boolean(project.architecture) && project.architecture!.nodes.length > 0;
}
