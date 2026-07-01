"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PlayCircle } from "lucide-react";
import type { Project } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { ImageFallback } from "@/components/ui/ImageFallback";
import {
  shouldShowDemo,
  shouldShowLiveLink,
  shouldShowSourceLink,
} from "./section-visibility";

// lucide-react ships generic/UI icons only (no brand/logo marks) -- same
// approach as components/sections/Hero.tsx's social row. Exported so
// ProjectLinks.tsx can reuse the identical mark for the "View source" /
// "Source code" CTA instead of duplicating the path data.
export function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.303-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

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
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

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
