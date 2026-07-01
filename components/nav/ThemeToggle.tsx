"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

/**
 * True only once the component has hydrated on the client. Backed by
 * useSyncExternalStore (server snapshot `false`, client snapshot `true`)
 * rather than a useEffect+setState pair, so there's no extra client-only
 * setState-in-effect render pass -- just the standard
 * server-renders-a-stable-default / client-reads-the-real-value pattern
 * next-themes consumers need to avoid a hydration mismatch.
 */
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Icon button that toggles between dark and light theme via next-themes.
 *
 * Renders the icon for the *current* theme (moon while dark, sun while
 * light) -- clicking it switches to the other theme. Styled with the shared
 * design tokens: small radius, `--color-border` border, accent color
 * reserved for hover/active state per the "accent sparingly" rule.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  const isDark = mounted ? resolvedTheme !== "light" : true;

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-gray-400 transition-colors hover:border-accent hover:text-accent"
    >
      {isDark ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
