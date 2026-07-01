"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { Tag } from "@/components/ui/Tag";

// Derives a coarse category label for the card's top monospace tag row
// (e.g. "WEB APP · 2023") -- there's no explicit `category` field on
// `Project`, so this reasons over the fields that do exist (tags,
// techStackByCategory) rather than inventing new content-schema surface.
function deriveCategory(project: Project): string {
  if (project.tags.some((tag) => /cli/i.test(tag))) return "CLI TOOL";
  if (project.techStackByCategory.frontend.length > 0) return "WEB APP";
  if (project.techStackByCategory.backend.length > 0) return "BACKEND";
  return "PROJECT";
}

// `timeframe` is a free-form string ("2021 — 2023", "2023 — Present",
// "2022"); the card wants one compact year, so this pulls the last 4-digit
// year found (the more recent one for a range) and falls back to the raw
// string if none is found.
function deriveYear(project: Project): string {
  const matches = project.timeframe.match(/\d{4}/g);
  if (!matches || matches.length === 0) return project.timeframe;
  return matches[matches.length - 1];
}

// Entire card is a `<Link>` to the detail route. The cover-image wrapper
// carries `layoutId={`project-${slug}`}`, shared with the detail page's hero
// image, so Motion can FLIP-animate between them when the grid stays
// mounted underneath the `@modal` intercepting overlay (see
// app/@modal/(.)projects/[slug]/page.tsx). Needs "use client" for Motion.
export function ProjectCard({ project }: { project: Project }) {
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const cardTags = project.tags.slice(0, 4);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface-1 transition-colors hover:border-gray-400"
    >
      <motion.div
        layoutId={`project-${project.slug}`}
        className="relative aspect-video w-full overflow-hidden border-b border-border bg-surface-2"
      >
        <ImageFallback
          src={project.coverImage}
          alt={`${project.title} cover image`}
          fallback={initials}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </motion.div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
          {deriveCategory(project)} · {deriveYear(project)}
        </p>
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="line-clamp-1 text-sm text-gray-400">{project.description}</p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-2">
            {cardTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <ArrowUpRight
            className="size-4 shrink-0 text-gray-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
