"use client";

import { AnimatePresence } from "motion/react";

/**
 * Wraps the `@modal` parallel-route slot in `app/layout.tsx` with
 * `AnimatePresence`. This must live at the layout level, not inside
 * `ProjectModalOverlay` itself: `AnimatePresence` only plays a child's exit
 * animation when it survives long enough to observe that child disappear
 * from *its own* next render. When the `@modal` slot swaps from the
 * intercepted route to `app/@modal/default.tsx` (which returns `null`) on
 * `router.back()`, the whole `ProjectModalOverlay` subtree -- including an
 * `AnimatePresence` nested inside it -- unmounts in one commit, so a nested
 * `AnimatePresence` never gets the chance to hold the child back. Lifting it
 * here, above the slot swap, is what makes the exit transition (and the
 * reverse `layoutId` FLIP into the grid thumbnail) actually play.
 */
export function ModalPresence({ children }: { children: React.ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
