"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { ThemeToggle } from "@/components/nav/ThemeToggle";
import { ChatButton } from "@/components/nav/ChatButton";
import { MobileMenu } from "@/components/nav/MobileMenu";

export type NavLink = { label: string; href: string };

/**
 * Section anchors per R2. The sections themselves (`id="about"`, etc.) are
 * built in later units -- until then these just point at anchors that don't
 * exist yet, which is expected (see U5 plan notes).
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Career", href: "#career" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Daily Logs", href: "#daily-logs" },
  { label: "Library", href: "#library" },
  { label: "Experiments", href: "#experiments" },
  { label: "Contact", href: "#contact" },
];

/**
 * Sticky top nav: logo/name, section links (active one tracked via
 * IntersectionObserver and highlighted in the accent color), a theme
 * toggle, and the chat CTA. Below `md`, section links collapse into
 * `MobileMenu` behind a hamburger trigger.
 */
export function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // The section elements are built in later units -- gracefully do
    // nothing (no IntersectionObserver, no crash) until they exist.
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function closeMobileMenu() {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }

  const initial = siteConfig.name.trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-black/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2 font-mono text-sm font-semibold text-white"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-accent"
            aria-hidden="true"
          >
            {initial}
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-6">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeId === id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`font-mono text-sm transition-colors ${
                  isActive ? "text-accent" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ChatButton />
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-gray-400 transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={closeMobileMenu} links={NAV_LINKS} />
    </header>
  );
}
