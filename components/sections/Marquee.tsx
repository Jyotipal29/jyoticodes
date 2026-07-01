"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { siteConfig } from "@/content/site-config";

// How long one full loop of the (duplicated) track takes when playing.
// Slow enough to read comfortably, fast enough not to feel stalled.
const LOOP_SECONDS = 26;

// Below-the-fold accent-bar status ticker (R5). Scrolls the rotating
// `siteConfig.marquee` strings infinitely by animating a doubled content
// track from 0% to -50% -- since both halves are identical/equal width,
// the loop point is invisible.
//
// Per R4 + the plan's doc-review pass, this respects `useReducedMotion()`
// (renders a static, non-animating track) AND gives every input method a
// way to stop the motion: hover/focus pause it (mouse/keyboard), and a
// small always-visible pause/play button pauses it independent of
// hover/focus (touch, where there is no hover state to rely on).
export function Marquee() {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  const isPaused = isHovered || isFocused || isManuallyPaused;
  const shouldAnimate = !prefersReducedMotion && !isPaused;

  const items = siteConfig.marquee;
  // Render the array twice back-to-back so the track can scroll a full
  // 50% and loop seamlessly.
  const track = [...items, ...items];

  const trackContent = track.map((item, index) => (
    <span key={index} className="flex items-center gap-3 px-3">
      <span>{item}</span>
      <span aria-hidden="true">•</span>
    </span>
  ));

  return (
    <div
      data-testid="marquee-root"
      className="relative flex items-center overflow-hidden border-y border-black/20 bg-accent text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <button
        type="button"
        onClick={() => setIsManuallyPaused((paused) => !paused)}
        aria-pressed={isManuallyPaused}
        aria-label={isManuallyPaused ? "Play status ticker" : "Pause status ticker"}
        className="z-10 flex shrink-0 items-center justify-center border-r border-black/20 bg-accent px-3 py-2 text-white hover:bg-black/10"
      >
        {isManuallyPaused ? (
          <Play className="size-4" aria-hidden="true" />
        ) : (
          <Pause className="size-4" aria-hidden="true" />
        )}
      </button>

      {prefersReducedMotion ? (
        <div
          data-testid="marquee-track"
          className="flex items-center overflow-hidden font-mono text-sm whitespace-nowrap"
        >
          {trackContent}
        </div>
      ) : (
        <motion.div
          data-testid="marquee-track"
          className="flex items-center font-mono text-sm whitespace-nowrap"
          animate={shouldAnimate ? { x: ["0%", "-50%"] } : { x: "0%" }}
          transition={
            shouldAnimate
              ? { repeat: Infinity, ease: "linear", duration: LOOP_SECONDS }
              : { duration: 0 }
          }
        >
          {trackContent}
        </motion.div>
      )}
    </div>
  );
}
