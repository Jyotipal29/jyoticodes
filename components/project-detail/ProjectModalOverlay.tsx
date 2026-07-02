"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { X } from "lucide-react";
import type { Project } from "@/content/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ProjectDetailContent } from "./ProjectDetailContent";
import { ProjectHeader } from "./ProjectHeader";

export function ProjectModalOverlay({ project }: { project: Project }) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  function close() {
    router.back();
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `close` reads from `router`, which is stable across renders.
  }, []);

  return (
    <motion.div
      key="overlay"
      className="fixed inset-0 z-50 flex justify-center overflow-y-auto px-4 py-8 sm:py-16"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
    >
      <div
        className="fixed inset-0 -z-10 bg-black/80 backdrop-blur-sm"
        aria-hidden="true"
        onClick={close}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        className="relative h-fit w-full max-w-4xl rounded-md border border-border bg-black"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-sm border border-border bg-black/80 text-gray-400 transition-colors hover:border-accent hover:text-accent"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="px-6 py-10 sm:px-10">
          <ProjectHeader project={project} heroLayoutId={`project-${project.slug}`} />
          <ProjectDetailContent project={project} />
        </div>
      </div>
    </motion.div>
  );
}
