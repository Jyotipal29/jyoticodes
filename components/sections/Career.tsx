"use client";

import { motion } from "motion/react";
import { career } from "@/content/career";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { CareerSparkline } from "./CareerSparkline";

function formatYearRange(yearStart: number, yearEnd?: number): string {
  return yearEnd ? `${yearStart} — ${yearEnd}` : `${yearStart} — Present`;
}

export function Career() {
  const prefersReducedMotion = useReducedMotion();

  // content/career.ts documents its array order as "cosmetic for authoring
  // convenience" and leaves reverse-chronological ordering as this
  // component's responsibility -- sort defensively rather than trusting
  // declaration order.
  const reverseChronological = [...career].sort(
    (a, b) => b.yearStart - a.yearStart
  );
  const chronological = [...career].sort((a, b) => a.yearStart - b.yearStart);

  const latestRole = reverseChronological[0];

  return (
    <section id="career" className="scroll-mt-24 border-border border-t px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="02" label="Career" />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          A track record of <span className="text-accent italic">ownership</span>.
        </h2>

        <div className="mt-16 grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_280px]">
          {/* Timeline */}
          <ol className="border-border relative list-none border-l pl-10">
            {reverseChronological.map((role, index) => (
              <motion.li
                key={role.id}
                className="relative pb-12 last:pb-0"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                }}
              >
                <span
                  aria-hidden="true"
                  className="border-accent bg-black absolute -left-[45px] top-1.5 h-2 w-2 rounded-full border"
                />
                <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                  {formatYearRange(role.yearStart, role.yearEnd)}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {role.title} <span className="text-gray-400">· {role.company}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-gray-400">{role.impact}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Sticky sidebar -- only sticky from md up; stacks inline below it. */}
          <aside className="md:sticky md:top-24 md:self-start">
            <div className="border-border rounded-md border p-6">
              <blockquote className="text-accent text-lg italic leading-relaxed">
                &ldquo;Every role since has been about doing more with less
                oversight.&rdquo;
              </blockquote>

              <div className="mt-8">
                <CareerSparkline entries={chronological} />
              </div>

              <dl className="border-border mt-8 space-y-3 border-t pt-6 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-gray-400">Building with</dt>
                  <dd className="font-mono text-white">{latestRole.tags[0]}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-gray-400">Designing in</dt>
                  <dd className="font-mono text-white">
                    {latestRole.tags[1] ?? latestRole.tags[0]}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-gray-400">Learning now</dt>
                  <dd className="font-mono text-white">Applied ML for infra tooling</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
