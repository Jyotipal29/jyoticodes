import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { ProjectDetailContent } from "@/components/project-detail/ProjectDetailContent";
import { ProjectFooterNav } from "@/components/project-detail/ProjectFooterNav";
import { ProjectHeader } from "@/components/project-detail/ProjectHeader";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  return (
    <main className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
      <ProjectHeader project={project} />
      <ProjectDetailContent project={project} />
      <ProjectFooterNav previous={previous} next={next} />
    </main>
  );
}
