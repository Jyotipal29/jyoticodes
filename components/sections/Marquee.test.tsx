import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// `transition.repeat` is `Infinity`, which `JSON.stringify` collapses to
// `null` -- so assertions on it read the mock's recorded call arguments
// directly (real object references, not the DOM's JSON-serialized
// data-attribute) rather than round-tripping through JSON.
function getLastMotionProps() {
  const lastCall = motionDivRender.mock.calls.at(-1);
  return lastCall?.[0] as { animate?: unknown; transition?: Record<string, unknown> };
}

const mockUseReducedMotion = vi.fn<() => boolean>();

vi.mock("@/lib/use-reduced-motion", () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

// Swap Motion's `motion.div` for a plain `div` that forwards the `animate`
// and `transition` props as JSON data-attributes, so assertions can inspect
// exactly what Marquee asks Motion to do (loop vs. parked/static) without
// depending on Motion's real animation engine inside jsdom. This mirrors
// the existing `next/image` mocking pattern in ImageFallback.test.tsx.
const motionDivRender = vi.fn(
  ({
    animate,
    transition,
    ...rest
  }: {
    animate?: unknown;
    transition?: unknown;
    children?: ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <div
      data-animate={JSON.stringify(animate)}
      data-transition={JSON.stringify(transition)}
      {...rest}
    />
  )
);

vi.mock("motion/react", () => ({
  motion: {
    div: (props: Record<string, unknown>) => motionDivRender(props),
  },
}));

vi.mock("@/content/site-config", () => ({
  siteConfig: {
    marquee: ["Status one", "Status two", "Status three"],
  },
}));

import { Marquee } from "./Marquee";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  mockUseReducedMotion.mockReset();
  motionDivRender.mockClear();
});

describe("Marquee", () => {
  it("renders the rotating status track duplicated back-to-back", () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(<Marquee />);

    const track = screen.getByTestId("marquee-track");
    expect(within(track).getAllByText("Status one")).toHaveLength(2);
    expect(within(track).getAllByText("Status two")).toHaveLength(2);
    expect(within(track).getAllByText("Status three")).toHaveLength(2);
  });

  it("renders the static, non-animating track when useReducedMotion() is true", () => {
    mockUseReducedMotion.mockReturnValue(true);

    render(<Marquee />);

    // The reduced-motion branch never reaches Motion at all.
    expect(motionDivRender).not.toHaveBeenCalled();
    expect(screen.getByTestId("marquee-track")).toHaveTextContent("Status one");
  });

  it("animates via Motion with an infinite loop when motion is allowed and nothing is paused", () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(<Marquee />);

    const track = screen.getByTestId("marquee-track");
    expect(JSON.parse(track.getAttribute("data-animate") ?? "null")).toEqual({
      x: ["0%", "-50%"],
    });
    expect(getLastMotionProps().transition).toMatchObject({
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    });
  });

  it("pauses the scroll animation on hover and resumes on mouse leave", () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(<Marquee />);

    const root = screen.getByTestId("marquee-root");
    const track = screen.getByTestId("marquee-track");

    fireEvent.mouseEnter(root);
    expect(JSON.parse(track.getAttribute("data-transition") ?? "null")).toEqual({
      duration: 0,
    });

    fireEvent.mouseLeave(root);
    expect(getLastMotionProps().transition).toMatchObject({
      repeat: Number.POSITIVE_INFINITY,
    });
  });

  it("pauses the scroll animation on focus and resumes on blur", () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(<Marquee />);

    const toggle = screen.getByRole("button", { name: /pause status ticker/i });
    const track = screen.getByTestId("marquee-track");

    act(() => {
      toggle.focus();
    });
    expect(JSON.parse(track.getAttribute("data-transition") ?? "null")).toEqual({
      duration: 0,
    });

    act(() => {
      toggle.blur();
    });
    expect(getLastMotionProps().transition).toMatchObject({
      repeat: Number.POSITIVE_INFINITY,
    });
  });

  it("tapping the pause control toggles the animation independent of hover/focus", () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(<Marquee />);

    const track = screen.getByTestId("marquee-track");
    const toggle = screen.getByRole("button", { name: /pause status ticker/i });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /play status ticker/i })).toBe(toggle);
    expect(JSON.parse(track.getAttribute("data-transition") ?? "null")).toEqual({
      duration: 0,
    });

    // Toggling again resumes, and it isn't relying on hover/focus state at all.
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(getLastMotionProps().transition).toMatchObject({
      repeat: Number.POSITIVE_INFINITY,
    });
  });
});
