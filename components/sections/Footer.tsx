import { Mail } from "lucide-react";
import type { ReactNode } from "react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/SocialIcons";
import { siteConfig } from "@/content/site-config";

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
