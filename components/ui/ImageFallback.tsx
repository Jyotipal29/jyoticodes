import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

export type ImageFallbackProps = Omit<ImageProps, "src" | "alt"> & {
  /** Falsy (undefined/null/"") renders the bordered placeholder block instead. */
  src?: string | null;
  alt: string;
  /** Initials or an icon to show inside the placeholder block. */
  fallback: ReactNode;
  className?: string;
};

// Wraps next/image; when `src` is missing/falsy (portrait, project
// thumbnail, library cover, etc.) renders a bordered placeholder block with
// initials/an icon instead of ever attempting a broken <img>.
export function ImageFallback({
  src,
  alt,
  fallback,
  className = "",
  ...imageProps
}: ImageFallbackProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center border border-border bg-surface-2 font-mono text-sm text-gray-400 ${className}`.trim()}
      >
        {fallback}
      </div>
    );
  }

  return <Image src={src} alt={alt} className={className} {...imageProps} />;
}
