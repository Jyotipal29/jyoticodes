import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const motionUseReducedMotion = vi.fn<() => boolean | null>();

// Mock Motion's own hook directly (an accepted alternative to mocking
// window.matchMedia per the plan) so this test asserts the wrapper's
// contract -- exposing Motion's reduced-motion preference as a plain
// boolean -- without depending on Motion's internal, module-scoped,
// lazily-initialized matchMedia listener.
vi.mock("motion/react", () => ({
  useReducedMotion: () => motionUseReducedMotion(),
}));

import { useReducedMotion } from "./use-reduced-motion";

describe("useReducedMotion", () => {
  beforeEach(() => {
    motionUseReducedMotion.mockReset();
  });

  it("returns false when Motion's hook has no preference yet (null)", () => {
    motionUseReducedMotion.mockReturnValue(null);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  it("returns true when the OS prefers-reduced-motion: reduce media query matches", () => {
    motionUseReducedMotion.mockReturnValue(true);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });
});
