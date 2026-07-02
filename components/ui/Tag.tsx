import type { HTMLAttributes, ReactNode } from "react";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function Tag({ children, className = "", ...props }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-gray-400 ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
