import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CareerSparkline, type CareerSparklinePoint } from "./CareerSparkline";

afterEach(() => {
  cleanup();
});

function getPolylinePoints(container: HTMLElement): string[] {
  const polyline = container.querySelector("polyline");
  expect(polyline).not.toBeNull();
  const pointsAttr = polyline?.getAttribute("points") ?? "";
  return pointsAttr.trim().split(/\s+/).filter(Boolean);
}

describe("CareerSparkline", () => {
  it("renders without crashing for the minimum case of a single entry", () => {
    const entries: CareerSparklinePoint[] = [{ level: 5 }];

    const { container } = render(<CareerSparkline entries={entries} />);

    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("polyline")).toBeInTheDocument();
  });

  it("renders without crashing for a typical 4+ entry data set", () => {
    const entries: CareerSparklinePoint[] = [
      { level: 2 },
      { level: 5 },
      { level: 7 },
      { level: 9 },
    ];

    const { container } = render(<CareerSparkline entries={entries} />);

    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("polyline")).toBeInTheDocument();
  });

  it("plots exactly one point per career entry for a single-entry data set", () => {
    const entries: CareerSparklinePoint[] = [{ level: 5 }];

    const { container } = render(<CareerSparkline entries={entries} />);

    expect(getPolylinePoints(container)).toHaveLength(entries.length);
  });

  it("plots exactly one point per career entry for a typical data set", () => {
    const entries: CareerSparklinePoint[] = [
      { level: 2 },
      { level: 5 },
      { level: 7 },
      { level: 9 },
    ];

    const { container } = render(<CareerSparkline entries={entries} />);

    expect(getPolylinePoints(container)).toHaveLength(entries.length);
  });

  it("renders nothing when given an empty entries array", () => {
    const { container } = render(<CareerSparkline entries={[]} />);

    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});
