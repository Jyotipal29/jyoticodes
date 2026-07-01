"use client";

import { useReducedMotion as useMotionReducedMotion } from "motion/react";

/**
 * Shared reduced-motion policy for the whole app.
 *
 * Wraps Motion's own `useReducedMotion()` hook exactly once so every
 * animated component (hero entrance, marquee speed, timeline reveals, the
 * projects grid->detail `layoutId` transition, etc.) reads from this single
 * hook instead of importing Motion's hook directly in multiple places.
 *
 * Motion's hook returns `boolean | null` (`null` before the media query has
 * resolved on the client); this wrapper normalizes that to a plain
 * `boolean` so consumers never have to handle the `null` case.
 */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}
