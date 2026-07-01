"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * Thin wrapper around next-themes' provider.
 *
 * - `attribute="class"` toggles a `dark`/`light` class on `<html>`, which the
 *   `@custom-variant dark` rule in app/globals.css hooks into for Tailwind's
 *   `dark:` utilities.
 * - `defaultTheme="dark"` + `enableSystem={false}` means the site is dark by
 *   default and never auto-switches based on OS `prefers-color-scheme` --
 *   only an explicit user toggle changes it.
 * - next-themes injects its own pre-hydration blocking script and owns
 *   localStorage persistence, so no custom script/resolution logic is needed
 *   here.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
