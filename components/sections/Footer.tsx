import { Mail } from "lucide-react";
import type { ReactNode, SVGProps } from "react";
import { siteConfig } from "@/content/site-config";

// lucide-react ships no brand glyphs (GitHub/LinkedIn/X were removed
// upstream), so these three are small hand-rolled outline icons kept
// local to this file -- same stroke weight/size as the lucide `Mail`
// icon used for email, so the row reads as one consistent set.
function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91.65S17.73.35 15 2.19a13.38 13.38 0 0 0-6 0C6.27.35 5.09.65 5.09.65A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.75c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      <path d="M9 21c-3 0-3.5-1.5-5-1.5" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const iconClasses = "h-4 w-4";

// Copyright/tagline line plus the same social icon row the Hero uses,
// gracefully omitting any social link left undefined in site-config.
export function Footer() {
  const year = new Date().getFullYear();
  const { name, social } = siteConfig;

  const links = [
    social.github && {
      href: social.github,
      label: "GitHub",
      icon: <GithubIcon className={iconClasses} />,
    },
    social.linkedin && {
      href: social.linkedin,
      label: "LinkedIn",
      icon: <LinkedinIcon className={iconClasses} />,
    },
    social.x && {
      href: social.x,
      label: "X",
      icon: <XIcon className={iconClasses} />,
    },
    social.email && {
      href: `mailto:${social.email}`,
      label: "Email",
      icon: <Mail className={iconClasses} />,
    },
  ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs text-gray-400">
            © {year} {name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-gray-600">
            Handcrafted with Next.js &amp; a little chaos.
          </p>
        </div>

        {links.length > 0 && (
          <div className="flex items-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                aria-label={link.label}
                className="text-gray-400 transition-colors hover:text-white"
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
