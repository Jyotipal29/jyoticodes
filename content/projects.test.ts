import { describe, expect, it } from "vitest";
import { getProjectBySlug, projects } from "./projects";

describe("projects content", () => {
  it("exports a non-empty array of projects", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("has exactly one project with liveUrl left undefined (hide, don't disable)", () => {
    const withoutLiveUrl = projects.filter((project) => project.liveUrl === undefined);
    expect(withoutLiveUrl).toHaveLength(1);
    expect(withoutLiveUrl[0]?.slug).toBe("acme-devtools-cli");
    expect(withoutLiveUrl[0]?.liveUrl).toBeUndefined();
  });

  it("never uses an empty string as a stand-in for a missing liveUrl", () => {
    for (const project of projects) {
      expect(project.liveUrl).not.toBe("");
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns the matching project for a valid slug", () => {
    const project = getProjectBySlug("nimbus-dashboard");
    expect(project).toBeDefined();
    expect(project?.title).toBe("Nimbus Dashboard");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("this-slug-does-not-exist")).toBeUndefined();
  });
});
