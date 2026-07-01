import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects";
import { ProjectModalOverlay } from "@/components/project-detail/ProjectModalOverlay";

type InterceptedProjectPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * The intercepting overlay route (`(.)projects/[slug]` intercepts from the
 * same URL segment level, per Next.js's Intercepting Routes convention),
 * wired through the `@modal` parallel-route slot in app/layout.tsx.
 *
 * When a project card is clicked from the still-mounted ProjectsGrid, Next
 * renders THIS route in the `@modal` slot as an overlay -- the grid's
 * component tree is never unmounted, so its card's `layoutId={`project-
 * ${slug}`}` element and this route's hero image (same `layoutId`, wired via
 * <ProjectHeader heroLayoutId>) briefly coexist in the tree, which is
 * exactly what lets Motion FLIP-animate the thumbnail into the hero image.
 * A direct URL load, refresh, or shared link bypasses interception
 * entirely (there's no "previous page" for Next to intercept from) and
 * renders the canonical app/projects/[slug]/page.tsx instead.
 *
 * Async Server Component (same params-Promise + notFound() pattern as the
 * canonical route) that hands the resolved project to the client-owned
 * `ProjectModalOverlay` for the Motion/backdrop/dismiss behavior.
 */
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
