import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { writing } from "@/content/writing";
import { siteConfig } from "@/content/site-config";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

afterEach(() => {
  cleanup();
  vi.resetModules();
});

describe("Writing", () => {
  it("renders one card per entry in content/writing.ts", () => {
    render(<Writing />);

    for (const post of writing) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.excerpt)).toBeInTheDocument();
      expect(screen.getByText(post.date)).toBeInTheDocument();
    }

    // One list row per entry -- not more, not fewer.
    expect(screen.getAllByRole("listitem")).toHaveLength(writing.length);
  });

  it("renders EmptyState instead of a blank section when the content array is empty", async () => {
    vi.doMock("@/content/writing", () => ({ writing: [] }));

    const { Writing: EmptyWriting } = await import(
      "@/components/sections/Writing"
    );

    render(<EmptyWriting />);

    expect(
      screen.getByText("No posts yet — check back soon.")
    ).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

    vi.doUnmock("@/content/writing");
  });
});

describe("Contact", () => {
  it('renders a "Say hello" CTA as a mailto: link to the site-config address', () => {
    render(<Contact />);

    const link = screen.getByRole("link", { name: /say hello/i });
    expect(link).toHaveAttribute("href", `mailto:${siteConfig.social.email}`);
  });
});
