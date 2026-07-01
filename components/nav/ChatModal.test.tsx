import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatButton } from "./ChatButton";
import { ChatModal } from "./ChatModal";

afterEach(() => {
  cleanup();
});

describe("ChatModal", () => {
  it("opens when the chat CTA is clicked, showing the static message and no input field", () => {
    render(<ChatButton />);

    fireEvent.click(screen.getByRole("button", { name: "Chat with me" }));

    expect(screen.getByRole("dialog", { name: "Chat with me" })).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.getByText(/hello@jordanvale\.dev/)).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("returns focus to the chat CTA after the modal closes", () => {
    render(<ChatButton />);

    const cta = screen.getByRole("button", { name: "Chat with me" });
    fireEvent.click(cta);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(document.activeElement).toBe(cta);
  });

  it("renders nothing when closed", () => {
    render(<ChatModal open={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on the Escape key", () => {
    const onClose = vi.fn();
    render(<ChatModal open onClose={onClose} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on backdrop click", () => {
    const onClose = vi.fn();
    const { container } = render(<ChatModal open onClose={onClose} />);

    const backdrop = container.querySelector('[aria-hidden="true"]');
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop as Element);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes via the explicit close button", () => {
    const onClose = vi.fn();
    render(<ChatModal open onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
