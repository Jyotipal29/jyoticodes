import type { Project } from "@/content/types";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { shouldShowDemo } from "./section-visibility";

// Renders the Demo section only when project.demo has a video or at least
// one screenshot -- omitted entirely otherwise, per the "hide, don't
// disable" rule (a demo object with neither would otherwise render an empty
// section). `id="demo"` is the anchor target for ProjectHeader's "Watch
// demo" CTA.
export function ProjectDemo({ project }: { project: Project }) {
  if (!shouldShowDemo(project)) return null;
  // Safe: shouldShowDemo already confirmed project.demo exists.
  const { videoUrl, screenshots } = project.demo!;

  return (
    <section id="demo" className="mt-16 scroll-mt-24 border-t border-border pt-16">
      <h2 className="font-mono text-sm tracking-widest text-gray-400 uppercase">Demo</h2>
      <div className="mt-8 flex flex-col gap-6">
        {videoUrl && (
          <video
            controls
            className="w-full rounded-md border border-border bg-surface-2"
            src={videoUrl}
          />
        )}

        {screenshots.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot}
                className="relative aspect-video overflow-hidden rounded-md border border-border bg-surface-2"
              >
                <ImageFallback
                  src={screenshot}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fallback={`${index + 1}`}
                  fill
                  sizes="(min-width: 640px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
