import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects";
import { ProjectModalOverlay } from "@/components/project-detail/ProjectModalOverlay";

type InterceptedProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InterceptedProjectPage({
  params,
}: InterceptedProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectModalOverlay project={project} />;
}
