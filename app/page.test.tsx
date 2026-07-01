import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { NAV_LINKS } from "@/components/nav/Nav";
import Home from "./page";

// jsdom doesn't implement IntersectionObserver, which Motion's
// `whileInView` (used by AnimatedSection and Career's own timeline reveal)
// requires at mount time. Stubbed locally, same as Career.test.tsx.
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

describe("Home", () => {
  it("provides a matching id anchor for every Nav link (#home, #about, ...)", () => {
    const { container } = render(<Home />);

    expect(NAV_LINKS.length).toBeGreaterThan(0);

    NAV_LINKS.forEach((link) => {
      const id = link.href.slice(1);
      expect(
        container.querySelector(`#${id}`),
        `expected an element with id="${id}" for nav link "${link.label}" (${link.href})`
      ).not.toBeNull();
    });
  });

  it("renders every section exactly once, in brief order", () => {
    const { container } = render(<Home />);

    const expectedOrder = [
      "home",
      "about",
      "career",
      "projects",
      "writing",
      "daily-logs",
      "library",
      "experiments",
      "contact",
    ];

    const sections = Array.from(container.querySelectorAll("section[id]"));
    const renderedIds = sections.map((section) => section.id);

    expect(renderedIds).toEqual(expectedOrder);
  });
});
