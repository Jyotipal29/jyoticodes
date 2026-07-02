import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

export type ImageFallbackProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallback: ReactNode;
  className?: string;
};

export function ImageFallback({
  src,
  alt,
  fallback,
  className = "",
  ...imageProps
}: ImageFallbackProps) {
  if (!src) {
    const fillClasses = imageProps.fill ? "absolute inset-0 h-full w-full" : "";
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center border border-border bg-surface-2 font-mono text-sm text-gray-400 ${fillClasses} ${className}`.trim()}
      >
        {fallback}
      </div>
    );
  }

  return <Image src={src} alt={alt} className={className} {...imageProps} />;
}
