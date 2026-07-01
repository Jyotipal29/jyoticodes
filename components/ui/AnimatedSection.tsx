"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSectionMotionProps } from "@/lib/motion-variants";

export type AnimatedSectionProps = {
  children: ReactNode;
};

/**
 * Thin client-component wrapper that gives a section a shared
 * scroll-triggered fade/slide entrance (R4) without each section component
 * needing to know about Motion itself. Wraps in a plain `div` (not another
 * `<section>`) since every section already renders its own `<section id="...">`
 * -- the `id` anchors nav links target live one level in, unaffected by this
 * wrapper.
 *
 * Deliberately NOT used for every section in `app/page.tsx`:
 * - Hero is excluded so it feels immediately present on load rather than
 *   fading in.
 * - Career is excluded because its sticky sidebar (`md:sticky`) would break
 *   if an ancestor ever animates a non-identity `transform` -- any
 *   `transform` on an ancestor (even a settled `translateY(0px)` after the
 *   entrance finishes) creates a new containing block and silently disables
 *   `position: sticky` in descendants across Chrome/Firefox/Safari. Career
 *   already reveals its own timeline entries via per-item `whileInView`
 *   motion, so it doesn't need this wrapper anyway.
 */
export function AnimatedSection({ children }: AnimatedSectionProps) {
  const motionProps = useSectionMotionProps();

  return <motion.div {...motionProps}>{children}</motion.div>;
}
