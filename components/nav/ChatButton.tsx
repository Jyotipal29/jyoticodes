"use client";

import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ChatModal } from "@/components/nav/ChatModal";

/**
 * Accent-colored, right-aligned "Chat with me" CTA (R2). Opens the static
 * `ChatModal` placeholder on click and returns focus to itself when the
 * modal closes.
 */
export function ChatButton() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  function handleOpen(event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <Button type="button" variant="primary" onClick={handleOpen}>
        Chat with me
      </Button>
      <ChatModal open={open} onClose={handleClose} />
    </>
  );
}
