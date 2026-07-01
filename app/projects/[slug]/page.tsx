import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { ProjectDetailContent } from "@/components/project-detail/ProjectDetailContent";
import { ProjectFooterNav } from "@/components/project-detail/ProjectFooterNav";
import { ProjectHeader } from "@/components/project-detail/ProjectHeader";

// Statically generates a route for every project slug in content/projects.ts
// at build time (R10/R11).
export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

// Canonical `/projects/[slug]` route: direct loads, refreshes, and shared
// links all land here (bypassing the `@modal` intercepting route entirely,
// since interception only fires for a same-origin client-side navigation
// from a previously-mounted page). Necessarily an async Server Component
// (the dynamic `params` must be awaited) -- see the Testing stack KTD for
// why this file has no direct Vitest/RTL coverage.
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
    <main className="mx-auto max-w-5xl px-6 py-24">
      {/* No `heroLayoutId` here -- a direct load has no prior grid element
          to animate from, so ProjectHeader falls back to a plain fade-in. */}
      <ProjectHeader project={project} />
      <ProjectDetailContent project={project} />
      <ProjectFooterNav previous={previous} next={next} />
    </main>
  );
}
