import type { ReactNode } from "react";
import { Card } from "./Card";

export type EmptyStateProps = {
  message?: ReactNode;
  className?: string;
};

const DEFAULT_MESSAGE = "Nothing here yet — check back soon.";

// Shared across Writing, Daily Logs, Library, and Experiments (R8) whenever
// their content array is empty, so every section fails the same way instead
// of rendering a blank gap.
export function EmptyState({
  message = DEFAULT_MESSAGE,
  className = "",
}: EmptyStateProps) {
  return (
    <Card
      className={`flex items-center justify-center px-6 py-12 text-center ${className}`.trim()}
    >
      <p className="font-mono text-sm text-gray-400">{message}</p>
    </Card>
  );
}
