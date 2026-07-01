import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Nav, NAV_LINKS } from "./Nav";

afterEach(() => {
  cleanup();
});

function renderNav() {
  return render(
    <ThemeProvider>
      <Nav />
    </ThemeProvider>,
  );
}

describe("Nav", () => {
  it("renders a link for every section pointing at the correct anchor", () => {
    renderNav();

    const desktopNav = screen.getByRole("navigation", { name: "Primary" });
    NAV_LINKS.forEach((link) => {
      const anchor = within(desktopNav).getByRole("link", { name: link.label });
      expect(anchor).toHaveAttribute("href", link.href);
    });
  });

  it("hides the desktop links and shows the hamburger trigger at narrow viewports", () => {
    renderNav();

    // Desktop links are `hidden` (display: none) until the `md` breakpoint,
    // where they switch to `flex`; the hamburger is the inverse (visible by
    // default, `md:hidden`). Asserted via the applied classes, matching the
    // plan's "CSS class assertion" allowance for this scenario.
    const desktopNav = screen.getByRole("navigation", { name: "Primary" });
    expect(desktopNav.className).toMatch(/\bhidden\b/);
    expect(desktopNav.className).toMatch(/md:flex/);

    const trigger = screen.getByRole("button", { name: "Toggle menu" });
    expect(trigger).toBeInTheDocument();
    expect(trigger.className).toMatch(/md:hidden/);
  });

  it("does not render the mobile menu until the hamburger is triggered", () => {
    renderNav();
    expect(screen.queryByRole("dialog", { name: "Mobile navigation" })).not.toBeInTheDocument();
  });

  it("traps focus in the mobile menu, closes on Escape, and returns focus to the hamburger trigger", () => {
    renderNav();

    const trigger = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Mobile navigation" });
    const links = within(dialog).getAllByRole("link");

    // Focus lands on the first link on open.
    expect(document.activeElement).toBe(links[0]);

    // Shift+Tab from the first focusable element wraps to the last.
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(links[links.length - 1]);

    // Tab from the last focusable element wraps back to the first.
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(links[0]);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(
      screen.queryByRole("dialog", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes the mobile menu and returns focus to the trigger when a link is selected", () => {
    renderNav();

    const trigger = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Mobile navigation" });
    const firstLink = within(dialog).getAllByRole("link")[0];
    fireEvent.click(firstLink);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });
});
