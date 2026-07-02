"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSectionMotionProps } from "@/lib/motion-variants";

export type AnimatedSectionProps = {
  children: ReactNode;
};

export function AnimatedSection({ children }: AnimatedSectionProps) {
  const motionProps = useSectionMotionProps();

  return <motion.div {...motionProps}>{children}</motion.div>;
}
