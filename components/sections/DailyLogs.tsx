import { dailyLogs } from "@/content/daily-logs";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionLabel } from "@/components/ui/SectionLabel";

// A compact feed -- date, topic, short description per entry. No pagination
// or year-grouping in this plan (see Scope Boundaries).
export function DailyLogs() {
  return (
    <section id="daily-logs" className="scroll-mt-24 border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionLabel index="05" label="Daily Logs" className="mb-8" />

        {dailyLogs.length === 0 ? (
          <EmptyState message="No log entries yet — check back soon." />
        ) : (
          <ul className="flex flex-col gap-3">
            {dailyLogs.map((entry) => (
              <li key={`${entry.date}-${entry.topic}`}>
                <Card className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-4">
                  <time
                    dateTime={entry.date}
                    className="shrink-0 font-mono text-xs tracking-wide text-gray-400 uppercase sm:w-28"
                  >
                    {entry.date}
                  </time>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-white">
                      {entry.topic}
                    </p>
                    <p className="text-sm text-gray-400">{entry.description}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
