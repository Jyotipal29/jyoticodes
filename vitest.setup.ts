import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement matchMedia. next-themes (used by
// components/providers/ThemeProvider) calls it unconditionally to listen
// for OS theme changes, even when enableSystem={false}, so this polyfill is
// required for any test that mounts the real ThemeProvider. Guarded so it's
// a no-op if a future setup already provides one.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
