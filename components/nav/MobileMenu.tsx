"use client";

import { useEffect, useRef } from "react";
import type { NavLink } from "@/components/nav/Nav";

export type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Below-`md` nav panel. A lightweight, hand-rolled focus trap: focuses the
 * first link on open, cycles Tab/Shift+Tab within the panel, and closes on
 * Escape or link selection -- the caller (`Nav`) is responsible for
 * returning focus to the hamburger trigger when `onClose` fires.
 */
export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const initialFocusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    initialFocusable[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        panel!.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="border-t border-border bg-black md:hidden"
    >
      <nav aria-label="Mobile" className="flex flex-col px-6 py-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-sm px-2 py-3 font-mono text-sm text-gray-400 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
