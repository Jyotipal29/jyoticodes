import type { ReactNode } from "react";

export type StatCalloutProps = {
  value: ReactNode;
  label: ReactNode;
  className?: string;
};

export function StatCallout({ value, label, className = "" }: StatCalloutProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`.trim()}>
      <span className="text-3xl font-semibold text-white sm:text-4xl">{value}</span>
      <span className="font-mono text-xs tracking-wide text-gray-400 uppercase">
        {label}
      </span>
    </div>
  );
}
