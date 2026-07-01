import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { siteConfig } from "@/content/site-config";
import { Marquee } from "./Marquee";

// lucide-react ships generic/UI icons only (no brand/logo marks), so GitHub
// and LinkedIn use small inline brand SVGs (official simple-icons paths)
// sized and colored to match the lucide icon set (`currentColor`, square
// bounding box). The "X" social link is genuinely a lucide icon -- the
// platform's logo is a plain X glyph, which lucide already ships.
function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.303-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Social links pulled from `siteConfig.social`. Every field except `email`
// is optional (per content/types.ts) -- entries whose URL is missing are
// omitted entirely rather than rendered as a disabled/broken link.
const socialLinks: Array<{
  key: string;
  href: string | undefined;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}> = [
  { key: "github", href: siteConfig.social.github, label: "GitHub", Icon: GithubIcon },
  { key: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { key: "x", href: siteConfig.social.x, label: "X", Icon: XIcon },
  {
    key: "email",
    href: `mailto:${siteConfig.social.email}`,
    label: "Email",
    Icon: Mail,
  },
];

// Hero section (R5): status badge, oversized name headline, one-paragraph
// pitch, monospace stat row, resume CTA, social icon row, and a bordered
// portrait frame -- followed by the below-the-fold status Marquee.
// Purely presentational/server-renderable; the only client-side piece is
// the Marquee it renders beneath itself.
export function Hero() {
  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section className="flex flex-col">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 items-start gap-12 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-sm border border-border px-3 py-1 font-mono text-xs tracking-wide text-gray-400 uppercase">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {siteConfig.openToWorkBadge} · {siteConfig.role} · {siteConfig.location}
            </span>

            <h1 className="text-6xl leading-[0.95] font-semibold tracking-tight text-white sm:text-8xl">
              {siteConfig.name}
            </h1>

            <p className="max-w-2xl text-lg text-gray-400">{siteConfig.pitch}</p>

            <p className="font-mono text-xs tracking-wide text-gray-400 uppercase">
              {siteConfig.metaStats.join(" — ")}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" href={siteConfig.resumeUrl}>
                Download resume →
              </Button>

              <div className="flex items-center gap-2">
                {socialLinks
                  .filter(
                    (social): social is typeof social & { href: string } =>
                      Boolean(social.href)
                  )
                  .map(({ key, href, label, Icon }) => (
                    <Button
                      key={key}
                      variant="outline"
                      href={href}
                      aria-label={label}
                      className="px-2.5 py-2.5"
                    >
                      <Icon className="size-4" />
                    </Button>
                  ))}
              </div>
            </div>
          </div>

          <div className="border border-border bg-surface-2 p-2 sm:justify-self-end">
            <ImageFallback
              src={siteConfig.portraitImage}
              alt={`Portrait of ${siteConfig.name}`}
              fallback={initials}
              width={220}
              height={220}
              className="size-[220px] object-cover"
            />
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
