import { describe, expect, it } from "vitest";
import type { Project } from "@/content/types";
import { projects } from "@/content/projects";
import {
  shouldShowArchitecture,
  shouldShowDemo,
  shouldShowLiveLink,
  shouldShowSourceLink,
} from "./section-visibility";

const baseProject: Project = {
  slug: "test-project",
  title: "Test Project",
  description: "A project used only for section-visibility unit tests.",
  tags: ["TypeScript"],
  role: "Engineer",
  timeframe: "2024",
  status: "Live",
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/example/example",
  demo: { screenshots: ["/images/example.png"] },
  architecture: { nodes: [{ id: "a", label: "A" }], edges: [] },
  overview: ["An overview paragraph."],
  stats: [],
  techStackByCategory: {
    frontend: [],
    backend: [],
    database: [],
    devops: [],
    thirdParty: [],
  },
  highlights: [],
};

describe("section-visibility: happy path (all optional data present)", () => {
  it("shows the live link, source link, demo, and architecture sections", () => {
    expect(shouldShowLiveLink(baseProject)).toBe(true);
    expect(shouldShowSourceLink(baseProject)).toBe(true);
    expect(shouldShowDemo(baseProject)).toBe(true);
    expect(shouldShowArchitecture(baseProject)).toBe(true);
  });
});

describe("section-visibility: edge cases (each optional field missing independently)", () => {
  it("hides the live link when liveUrl is absent, without affecting other sections", () => {
    const project: Project = { ...baseProject, liveUrl: undefined };
    expect(shouldShowLiveLink(project)).toBe(false);
    expect(shouldShowSourceLink(project)).toBe(true);
    expect(shouldShowDemo(project)).toBe(true);
    expect(shouldShowArchitecture(project)).toBe(true);
  });

  it("hides the source link when githubUrl is absent, without affecting other sections", () => {
    const project: Project = { ...baseProject, githubUrl: undefined };
    expect(shouldShowSourceLink(project)).toBe(false);
    expect(shouldShowLiveLink(project)).toBe(true);
    expect(shouldShowDemo(project)).toBe(true);
    expect(shouldShowArchitecture(project)).toBe(true);
  });

  it("hides the demo section when demo is absent, without affecting other sections", () => {
    const project: Project = { ...baseProject, demo: undefined };
    expect(shouldShowDemo(project)).toBe(false);
    expect(shouldShowLiveLink(project)).toBe(true);
    expect(shouldShowSourceLink(project)).toBe(true);
    expect(shouldShowArchitecture(project)).toBe(true);
  });

  it("hides the architecture section when architecture is absent, without affecting other sections", () => {
    const project: Project = { ...baseProject, architecture: undefined };
    expect(shouldShowArchitecture(project)).toBe(false);
    expect(shouldShowLiveLink(project)).toBe(true);
    expect(shouldShowSourceLink(project)).toBe(true);
    expect(shouldShowDemo(project)).toBe(true);
  });

  it("never resolves a missing field to a truthy/empty-render state", () => {
    const project: Project = {
      ...baseProject,
      liveUrl: undefined,
      githubUrl: undefined,
      demo: undefined,
      architecture: undefined,
    };
    expect(shouldShowLiveLink(project)).toBe(false);
    expect(shouldShowSourceLink(project)).toBe(false);
    expect(shouldShowDemo(project)).toBe(false);
    expect(shouldShowArchitecture(project)).toBe(false);
  });
});

describe("generateStaticParams proxy: content/projects.ts slug integrity", () => {
  // `generateStaticParams()` lives inside `app/projects/[slug]/page.tsx`, an
  // async Server Component Vitest cannot render (see Testing stack KTD).
  // This asserts the property that actually matters for it to behave
  // correctly: every project has a non-empty slug, and no slug repeats --
  // without invoking Next's route machinery in a unit test.
  it("has no duplicate slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a non-empty string slug for every project", () => {
    for (const project of projects) {
      expect(typeof project.slug).toBe("string");
      expect(project.slug.length).toBeGreaterThan(0);
    }
  });
});
