"use client";

import { useReducedMotion } from "./use-reduced-motion";

export type SectionMotionProps = {
  initial: false | { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  viewport: { once: boolean; margin: string };
  transition: { duration: number; ease: "easeOut" };
};

export function useSectionMotionProps(): SectionMotionProps {
  const prefersReducedMotion = useReducedMotion();

  return {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.5,
      ease: "easeOut" as const,
    },
  };
}
