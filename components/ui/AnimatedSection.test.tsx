import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockUseReducedMotion = vi.fn<() => boolean>();

vi.mock("@/lib/use-reduced-motion", () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

// Swap Motion's `motion.div` for a plain `div` that forwards the
// initial/whileInView/transition props as JSON data-attributes and renders
// children unconditionally (no real IntersectionObserver gating), mirroring
// the existing Marquee.test.tsx pattern. This lets the "reduced motion"
// assertion below prove the thing that actually matters -- content is in
// the DOM and un-gated -- without depending on Motion's real viewport
// detection inside jsdom.
const motionDivRender = vi.fn(
  ({
    initial,
    whileInView,
    transition,
    children,
    ...rest
  }: {
    initial?: unknown;
    whileInView?: unknown;
    transition?: unknown;
    children?: ReactNode;
    [key: string]: unknown;
  }) => (
    <div
      data-initial={JSON.stringify(initial)}
      data-while-in-view={JSON.stringify(whileInView)}
      data-transition={JSON.stringify(transition)}
      {...rest}
    >
      {children}
    </div>
  )
);

vi.mock("motion/react", () => ({
  motion: {
    div: (props: Record<string, unknown>) => motionDivRender(props),
  },
}));

import { AnimatedSection } from "./AnimatedSection";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  mockUseReducedMotion.mockReset();
  motionDivRender.mockClear();
});

describe("AnimatedSection", () => {
  it("passes a fade/slide-up entrance to motion.div when motion is allowed", () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(
      <AnimatedSection>
        <p>Section content</p>
      </AnimatedSection>
    );

    const wrapper = screen.getByText("Section content").parentElement;
    expect(JSON.parse(wrapper?.getAttribute("data-initial") ?? "null")).toEqual({
      opacity: 0,
      y: 24,
    });
    expect(JSON.parse(wrapper?.getAttribute("data-transition") ?? "null").duration).toBeGreaterThan(
      0
    );
  });

  it("renders content immediately, un-gated, when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);

    render(
      <AnimatedSection>
        <p>Section content</p>
      </AnimatedSection>
    );

    // Content is present in the DOM right away -- not stuck waiting on an
    // animation frame or intersection callback to become visible.
    expect(screen.getByText("Section content")).toBeInTheDocument();

    const wrapper = screen.getByText("Section content").parentElement;
    // `initial: false` is Motion's convention for "skip the animated
    // starting state, mount already in the end state" -- as opposed to
    // relying on a zero-duration transition to merely *look* instant.
    expect(JSON.parse(wrapper?.getAttribute("data-initial") ?? "null")).toBe(false);
    expect(JSON.parse(wrapper?.getAttribute("data-transition") ?? "null").duration).toBe(0);
  });
});
