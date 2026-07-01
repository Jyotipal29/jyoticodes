import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockUseReducedMotion = vi.fn<() => boolean>();

vi.mock("./use-reduced-motion", () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

import { useSectionMotionProps } from "./motion-variants";

beforeEach(() => {
  mockUseReducedMotion.mockReset();
});

describe("useSectionMotionProps", () => {
  it("returns a fade/slide-up entrance when motion is allowed", () => {
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useSectionMotionProps());

    expect(result.current.initial).toEqual({ opacity: 0, y: 24 });
    expect(result.current.whileInView).toEqual({ opacity: 1, y: 0 });
    expect(result.current.viewport).toEqual({ once: true, margin: "-80px" });
    expect(result.current.transition.duration).toBeGreaterThan(0);
  });

  it("skips the animated starting state and zeroes the duration when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);

    const { result } = renderHook(() => useSectionMotionProps());

    // `initial: false` is Motion's own convention for "mount already in the
    // end state" -- content is visible immediately, never stuck at
    // `opacity: 0` waiting on a transition that a reduced-motion user
    // wouldn't perceive as instant anyway.
    expect(result.current.initial).toBe(false);
    expect(result.current.transition.duration).toBe(0);
    // The end state itself is unaffected -- fully opaque, no offset.
    expect(result.current.whileInView).toEqual({ opacity: 1, y: 0 });
  });
});
