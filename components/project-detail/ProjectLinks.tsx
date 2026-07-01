import { ExternalLink } from "lucide-react";
import type { Project } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "./ProjectHeader";
import { shouldShowLiveLink, shouldShowSourceLink } from "./section-visibility";

// Summary row of the same live/source links surfaced in ProjectHeader's CTA
// row -- omitted entirely when neither field is present.
export function ProjectLinks({ project }: { project: Project }) {
  if (!shouldShowLiveLink(project) && !shouldShowSourceLink(project)) return null;

  return (
    <section className="mt-16 border-t border-border pt-16">
      <h2 className="font-mono text-sm tracking-widest text-gray-400 uppercase">Links</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {shouldShowLiveLink(project) && (
          <Button variant="outline" href={project.liveUrl!} target="_blank" rel="noreferrer">
            <ExternalLink className="size-4" aria-hidden="true" />
            Live site
          </Button>
        )}
        {shouldShowSourceLink(project) && (
          <Button variant="outline" href={project.githubUrl!} target="_blank" rel="noreferrer">
            <GithubIcon className="size-4" />
            Source code
          </Button>
        )}
      </div>
    </section>
  );
}
