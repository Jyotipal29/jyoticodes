import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  surface?: "surface-1" | "surface-2";
};

// Subtle background (surface-1/2) with a 1px border in the shared border
// token -- the base container every card-shaped block in the app builds on.
export function Card({
  children,
  className = "",
  surface = "surface-1",
  ...props
}: CardProps) {
  const surfaceClass = surface === "surface-2" ? "bg-surface-2" : "bg-surface-1";

  return (
    <div
      className={`rounded-md border border-border ${surfaceClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
