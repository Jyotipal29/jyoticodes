import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { career } from "@/content/career";
import { Career } from "./Career";

// jsdom doesn't implement IntersectionObserver, which Motion's
// `whileInView` (used for the timeline's reduced-motion-aware entry
// reveal) requires at mount time. Stubbed locally, scoped to this test
// file only, rather than touching the shared vitest.setup.ts.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  // @ts-expect-error -- minimal test stub, not a full IntersectionObserver implementation.
  globalThis.IntersectionObserver = IntersectionObserverStub;
}

afterEach(() => {
  cleanup();
});

describe("Career", () => {
  it("renders every role/company heading in most-recent-first order", () => {
    render(<Career />);

    // content/career.ts is authored most-recent-first already, but this
    // assertion is independent of that authoring order: it derives the
    // expected order by sorting `yearStart` descending, matching Career.tsx's
    // own defensive sort, so it still catches a regression if either the
    // component's sort or the content file's order changes.
    const expectedOrder = [...career]
      .sort((a, b) => b.yearStart - a.yearStart)
      .map((role) => role.title);

    const headings = screen.getAllByRole("heading", { level: 3 });
    const renderedOrder = headings.map((heading) => heading.textContent ?? "");

    expectedOrder.forEach((title, index) => {
      expect(renderedOrder[index]).toContain(title);
    });
  });

  it("renders the most recent role (no yearEnd) as 'Present'", () => {
    render(<Career />);

    const mostRecent = [...career].sort((a, b) => b.yearStart - a.yearStart)[0];
    expect(mostRecent.yearEnd).toBeUndefined();

    expect(screen.getByText(new RegExp(`${mostRecent.yearStart} — Present`))).toBeInTheDocument();
  });
});
