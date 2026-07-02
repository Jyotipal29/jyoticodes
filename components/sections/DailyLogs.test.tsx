import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { dailyLogs } from "@/content/daily-logs";
import { DailyLogs } from "@/components/sections/DailyLogs";

afterEach(() => {
  cleanup();
  vi.resetModules();
});

describe("DailyLogs", () => {
  it("renders one entry per item in content/daily-logs.ts", () => {
    render(<DailyLogs />);

    for (const entry of dailyLogs) {
      expect(screen.getByText(entry.topic)).toBeInTheDocument();
      expect(screen.getByText(entry.description)).toBeInTheDocument();
    }

    expect(screen.getAllByRole("listitem")).toHaveLength(dailyLogs.length);
  });

  it("renders EmptyState instead of a blank section when the content array is empty", async () => {
    vi.doMock("@/content/daily-logs", () => ({ dailyLogs: [] }));

    const { DailyLogs: EmptyDailyLogs } = await import(
      "@/components/sections/DailyLogs"
    );

    render(<EmptyDailyLogs />);

    expect(
      screen.getByText("No log entries yet — check back soon.")
    ).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

    vi.doUnmock("@/content/daily-logs");
  });
});
