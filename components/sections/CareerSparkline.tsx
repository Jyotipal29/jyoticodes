/**
 * Minimal hand-rolled sparkline plotting `CareerRole.level` (the 1-10
 * author-assigned seniority/scope score defined in content/types.ts)
 * against each entry's position. No axes, gridlines, or labels -- this is
 * a glanceable trend line, not a full chart.
 *
 * Callers should pass entries in chronological (oldest-first) order so the
 * line reads left-to-right as career progression over time.
 */
export type CareerSparklinePoint = {
  level: number;
};

export type CareerSparklineProps = {
  entries: CareerSparklinePoint[];
  className?: string;
};

const WIDTH = 240;
const HEIGHT = 64;
const PADDING = 4;

export function CareerSparkline({ entries, className = "" }: CareerSparklineProps) {
  if (entries.length === 0) {
    return null;
  }

  const levels = entries.map((entry) => entry.level);
  const min = Math.min(...levels);
  const max = Math.max(...levels);
  // Guard against a flat/single-point series where max === min, which
  // would otherwise divide by zero.
  const range = max - min || 1;

  const points = entries.map((entry, index) => {
    const x =
      entries.length === 1
        ? WIDTH / 2
        : PADDING + (index / (entries.length - 1)) * (WIDTH - PADDING * 2);
    const y =
      HEIGHT - PADDING - ((entry.level - min) / range) * (HEIGHT - PADDING * 2);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      height={HEIGHT}
      preserveAspectRatio="none"
      className={`text-accent ${className}`.trim()}
      role="img"
      aria-label="Career seniority trend over time"
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
