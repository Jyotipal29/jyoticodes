import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/SocialIcons";
import { siteConfig } from "@/content/site-config";

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

export function Hero() {
  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section id="home" className="flex scroll-mt-24 flex-col">
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
    </section>
  );
}
