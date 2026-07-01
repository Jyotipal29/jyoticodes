import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { career } from "@/content/career";
import { siteConfig } from "@/content/site-config";
import { About } from "./About";

afterEach(() => {
  cleanup();
});

describe("About", () => {
  it("renders all four sidebar blocks from content data", () => {
    render(<About />);

    expect(screen.getByText("Toolbox")).toBeInTheDocument();
    siteConfig.toolbox.forEach((tool) => {
      expect(screen.getByText(tool)).toBeInTheDocument();
    });

    expect(screen.getByText("Achievements")).toBeInTheDocument();
    const firstAchievement = siteConfig.achievements[0];
    expect(
      screen.getByText(
        `${firstAchievement.award} — ${firstAchievement.company} — ${firstAchievement.year}`
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Interests & Hobbies")).toBeInTheDocument();
    siteConfig.interests.forEach((interest) => {
      expect(screen.getByText(interest)).toBeInTheDocument();
    });

    siteConfig.keyValues.forEach((item) => {
      expect(screen.getByText(item.key)).toBeInTheDocument();
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });
  });

  it("renders exactly 3 stat callouts derived from career data", () => {
    render(<About />);

    expect(screen.getByText("Roles held")).toBeInTheDocument();
    expect(screen.getByText(String(career.length))).toBeInTheDocument();
    expect(screen.getByText("Companies")).toBeInTheDocument();
    expect(screen.getByText("Years experience")).toBeInTheDocument();
  });

  it("sets an #about id on the section root for nav anchor scrolling", () => {
    const { container } = render(<About />);
    expect(container.querySelector("section#about")).toBeInTheDocument();
  });
});
