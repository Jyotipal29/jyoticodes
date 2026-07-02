export type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
};

export function SectionLabel({ index, label, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-sm tracking-widest text-gray-400 uppercase ${className}`.trim()}
    >
      § {index} — {label}
    </p>
  );
}
