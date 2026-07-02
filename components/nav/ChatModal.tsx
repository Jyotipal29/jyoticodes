"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/content/site-config";

export type ChatModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ChatModal({ open, onClose }: ChatModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black/80"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chat with me"
        className="relative z-10 w-full max-w-sm rounded-md border border-border bg-surface-1 p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-gray-400 transition-colors hover:border-accent hover:text-accent"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="font-mono text-sm tracking-widest text-gray-400 uppercase">
          Chat
        </p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          AI chat is <span className="text-accent italic">coming soon</span>
        </h2>
        <p className="mt-3 text-sm text-gray-400">
          Email me in the meantime and I&apos;ll get back to you.
        </p>
        <a
          href={`mailto:${siteConfig.social.email}`}
          className="mt-4 inline-block font-mono text-sm text-accent hover:underline"
        >
          {siteConfig.social.email}
        </a>
      </div>
    </div>
  );
}
