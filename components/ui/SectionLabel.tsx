export type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
};

// Renders the "§ 0N — LABEL" monospace section marker used above every
// major section heading (see app/page.tsx's "§ 01 — Scaffold" placeholder).
export function SectionLabel({ index, label, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-sm tracking-widest text-gray-400 uppercase ${className}`.trim()}
    >
      § {index} — {label}
    </p>
  );
}
