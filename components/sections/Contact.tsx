import { siteConfig } from "@/content/site-config";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <SectionLabel index="08" label="Contact" />
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            Want to <span className="text-accent italic">talk</span>?
          </h2>
          <p className="text-sm text-gray-400 sm:text-base">
            Whether it&apos;s a project idea, a role worth considering, or just a
            question about something I&apos;ve built — no pitch is too rough and
            no question is too small. I read every message myself and try to
            reply within a couple of days.
          </p>
          <Button variant="primary" href={`mailto:${siteConfig.social.email}`}>
            Say hello →
          </Button>
        </div>
      </div>
    </section>
  );
}
