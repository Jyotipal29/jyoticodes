import type { ReactNode } from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeToggle } from "@/components/nav/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.className = "";
    window.localStorage.clear();
  });

  it("clicking the toggle calls setTheme and updates the <html> class", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    // enableSystem={false}, defaultTheme="dark" -> starts dark with no
    // OS preference consulted.
    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    // next-themes persists the new value under the default storage key.
    expect(window.localStorage.getItem("theme")).toBe("light");
  });

  it("mocked next-themes theme of light shows the sun icon, not the moon", async () => {
    vi.resetModules();
    vi.doMock("next-themes", () => ({
      useTheme: () => ({
        theme: "light",
        resolvedTheme: "light",
        setTheme: vi.fn(),
        themes: ["light", "dark"],
      }),
    }));

    const { ThemeToggle: MockedThemeToggle } = await import(
      "@/components/nav/ThemeToggle"
    );

    const { container } = render(<MockedThemeToggle />);

    // Mounted-state effect flips synchronously enough for RTL's act-wrapped
    // render, but wait to be safe against the mount effect's microtask.
    await waitFor(() => {
      expect(container.querySelector(".lucide-sun")).not.toBeNull();
    });
    expect(container.querySelector(".lucide-moon")).toBeNull();

    vi.doUnmock("next-themes");
    vi.resetModules();
  });

  it("configures next-themes with enableSystem=false and defaultTheme=dark, so an absent localStorage.theme resolves to dark rather than the OS preference", async () => {
    expect(window.localStorage.getItem("theme")).toBeNull();

    vi.resetModules();
    const receivedProps: Array<Record<string, unknown>> = [];
    vi.doMock("next-themes", () => ({
      ThemeProvider: (props: { children: ReactNode }) => {
        receivedProps.push(props);
        return props.children;
      },
      useTheme: () => ({
        theme: "dark",
        resolvedTheme: "dark",
        setTheme: vi.fn(),
        themes: ["light", "dark"],
      }),
    }));

    const { ThemeProvider: MockedThemeProvider } = await import(
      "@/components/providers/ThemeProvider"
    );

    render(
      <MockedThemeProvider>
        <div>child</div>
      </MockedThemeProvider>,
    );

    // This is the config-level guarantee that makes "no localStorage.theme
    // -> dark, never OS prefers-color-scheme" true: enableSystem disables
    // the matchMedia lookup entirely, and defaultTheme is the sole fallback.
    expect(receivedProps[0]).toMatchObject({
      attribute: "class",
      defaultTheme: "dark",
      enableSystem: false,
    });

    vi.doUnmock("next-themes");
    vi.resetModules();
  });
});
