import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCallout } from "@/components/ui/StatCallout";
import { Tag } from "@/components/ui/Tag";
import { career } from "@/content/career";
import { siteConfig } from "@/content/site-config";

const earliestYearStart = Math.min(...career.map((role) => role.yearStart));
const yearsExperience = new Date().getFullYear() - earliestYearStart;
const companyCount = new Set(career.map((role) => role.company)).size;

// Two-column About section: a sidebar Card (Toolbox / Achievements /
// Interests / key-value list) alongside a bio column with an accent-italic
// headline, two narrative paragraphs, and 3 derived stat callouts.
export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border px-6 py-24 sm:px-10 lg:px-16"
    >
      <SectionLabel index="01" label="About" />

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <Card className="h-fit p-6">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-mono text-xs tracking-wide text-gray-400 uppercase">
                Toolbox
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {siteConfig.toolbox.map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs tracking-wide text-gray-400 uppercase">
                Achievements
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
                {siteConfig.achievements.map((achievement) => (
                  <li key={`${achievement.award}-${achievement.year}`}>
                    {achievement.award} — {achievement.company} — {achievement.year}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs tracking-wide text-gray-400 uppercase">
                Interests &amp; Hobbies
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
                {siteConfig.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 border-t border-border pt-6">
              {siteConfig.keyValues.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-mono text-gray-400">{item.key}</span>
                  <span className="text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Building software that&rsquo;s built to{" "}
            <span className="text-accent italic">last</span>.
          </h2>

          <div className="flex flex-col gap-4 text-base leading-relaxed text-gray-300">
            <p>{siteConfig.pitch}</p>
            <p>
              Over the past decade I&rsquo;ve moved from shipping internal tooling as an
              intern to setting technical direction for multiple product lines as a staff
              engineer — leading rearchitectures, mentoring engineers, and building the
              systems teams actually want to work in. I care as much about the developer
              experience of a codebase as I do about the experience of the product it
              ships.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
            <StatCallout value={`${yearsExperience}+`} label="Years experience" />
            <StatCallout value={String(career.length)} label="Roles held" />
            <StatCallout value={String(companyCount)} label="Companies" />
          </div>
        </div>
      </div>
    </section>
  );
}
