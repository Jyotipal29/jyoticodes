"use client";

import { useReducedMotion } from "./use-reduced-motion";

export type SectionMotionProps = {
  initial: false | { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  viewport: { once: boolean; margin: string };
  transition: { duration: number; ease: "easeOut" };
};

/**
 * Shared scroll-triggered entrance animation (R4) for section wrappers.
 *
 * Structured as a hook (rather than a static variants object) because it
 * needs to read the live value of `useReducedMotion()` -- Motion's
 * `whileInView` variants are just plain prop values, not something that can
 * branch internally on a media query, so the branching has to happen here
 * and be spread onto the `motion.*` element by the caller.
 *
 * When reduced motion is preferred: `initial` is `false` (Motion's own
 * convention for "skip the animated starting state entirely and render
 * already in the end state" -- as opposed to `initial={{ opacity: 1 }}`,
 * which would still mount the element mid-transition-eligible and rely on
 * the zero-duration transition below to *look* instant) and the transition
 * duration is `0`, so content is visible immediately on mount/scroll
 * instead of looking stuck at a partially-animated state.
 */
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
