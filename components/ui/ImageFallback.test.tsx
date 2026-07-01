import { cleanup, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

// next/image renders through an optimization pipeline that isn't relevant
// here; swap in a plain <img> so we can assert on the props ImageFallback
// forwards to it.
vi.mock("next/image", () => ({
  default: (props: ComponentProps<"img">) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- alt is forwarded via spread
    return <img {...props} />;
  },
}));

import { ImageFallback } from "./ImageFallback";

afterEach(() => {
  cleanup();
});

describe("ImageFallback", () => {
  it("renders the underlying next/image when a valid src is provided", () => {
    const { container } = render(
      <ImageFallback
        src="/images/portrait.jpg"
        alt="Portrait of Jyoti"
        fallback="JP"
        width={200}
        height={200}
      />
    );

    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/portrait.jpg");
    expect(img).toHaveAttribute("alt", "Portrait of Jyoti");
    expect(screen.queryByText("JP")).not.toBeInTheDocument();
  });

  it("renders the initials/placeholder block when src is undefined", () => {
    const { container } = render(
      <ImageFallback alt="Portrait of Jyoti" fallback="JP" width={200} height={200} />
    );

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByText("JP")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Portrait of Jyoti" })).toBeInTheDocument();
  });

  it("renders the initials/placeholder block when src is an empty string", () => {
    const { container } = render(
      <ImageFallback src="" alt="Portrait of Jyoti" fallback="JP" width={200} height={200} />
    );

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByText("JP")).toBeInTheDocument();
  });
});
