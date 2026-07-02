"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PlayCircle } from "lucide-react";
import type { Project } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { getInitials } from "@/lib/get-initials";
import {
  shouldShowDemo,
  shouldShowLiveLink,
  shouldShowSourceLink,
} from "./section-visibility";

export type ProjectHeaderProps = {
  project: Project;
  /**
   * Present only on the `@modal` intercepting overlay route -- shares the
   * grid card's `layoutId` so Motion can FLIP-animate the thumbnail into
   * this hero image. Omitted on the canonical route (direct load/refresh/
   * shared link has no prior grid element to animate from), which instead
   * plays a plain opacity fade-in.
   */
  heroLayoutId?: string;
};

// Header + meta + CTA row + hero image, shared by both the canonical
// `/projects/[slug]` page and the `@modal` intercepting overlay.
export function ProjectHeader({ project, heroLayoutId }: ProjectHeaderProps) {
  const initials = getInitials(project.title);

  const statusDotClass = project.status === "Live" ? "bg-accent" : "bg-gray-600";

  const heroImage = (
    <ImageFallback
      src={project.coverImage}
      alt={`${project.title} hero image`}
      fallback={initials}
      fill
      sizes="(min-width: 1024px) 960px, 100vw"
      className="object-cover"
    />
  );

  return (
    <header className="flex flex-col gap-8">
      <Link
        href="/#projects"
        className="w-fit font-mono text-sm text-gray-400 transition-colors hover:text-white"
      >
        ← All projects
      </Link>

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {project.title}
        </h1>
        <p className="max-w-2xl text-lg text-gray-400">{project.description}</p>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-wide text-gray-400 uppercase">
          <span>{project.role}</span>
          <span aria-hidden="true">·</span>
          <span>{project.timeframe}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full ${statusDotClass}`} aria-hidden="true" />
            {project.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {shouldShowLiveLink(project) && (
            <Button variant="primary" href={project.liveUrl!} target="_blank" rel="noreferrer">
              View live →
            </Button>
          )}
          {shouldShowDemo(project) && (
            <Button variant="outline" href="#demo">
              <PlayCircle className="size-4" aria-hidden="true" />
              Watch demo
            </Button>
          )}
          {shouldShowSourceLink(project) && (
            <Button variant="outline" href={project.githubUrl!} target="_blank" rel="noreferrer">
              <GithubIcon className="size-4" />
              View source
            </Button>
          )}
        </div>
      </div>

      {heroLayoutId ? (
        <motion.div
          layoutId={heroLayoutId}
          className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-surface-2"
        >
          {heroImage}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-surface-2"
        >
          {heroImage}
        </motion.div>
      )}
    </header>
  );
}
