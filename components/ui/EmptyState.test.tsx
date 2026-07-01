import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

afterEach(() => {
  cleanup();
});

describe("EmptyState", () => {
  it("renders the default message when passed no items/children", () => {
    render(<EmptyState />);

    expect(
      screen.getByText("Nothing here yet — check back soon.")
    ).toBeInTheDocument();
  });

  it("renders a custom message when one is provided", () => {
    render(<EmptyState message="No projects yet." />);

    expect(screen.getByText("No projects yet.")).toBeInTheDocument();
    expect(
      screen.queryByText("Nothing here yet — check back soon.")
    ).not.toBeInTheDocument();
  });
});
