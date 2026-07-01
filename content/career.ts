import type { CareerRole } from "./types";

/**
 * Placeholder career history, most-recent role first. Order here is
 * cosmetic for authoring convenience — `Career.tsx` (U8) is responsible
 * for the reverse-chronological render order specified by the plan.
 */
export const career: CareerRole[] = [
  {
    id: "acme-robotics-staff",
    yearStart: 2023,
    title: "Staff Software Engineer",
    company: "Acme Robotics",
    impact:
      "Led the rearchitecture of the fleet-telemetry platform from a monolith to typed service boundaries, cutting incident response time by 40%. Mentored a team of six engineers and set the technical direction for three product lines.",
    tags: ["TypeScript", "Distributed Systems", "Leadership", "Postgres"],
    level: 9,
  },
  {
    id: "nimbus-analytics-senior",
    yearStart: 2020,
    yearEnd: 2023,
    title: "Senior Software Engineer",
    company: "Nimbus Analytics",
    impact:
      "Owned the customer-facing dashboard rebuild, moving from server-rendered jQuery to a React/Next.js stack and improving Core Web Vitals scores from failing to passing across the board. Shipped the company's first public API.",
    tags: ["React", "Next.js", "API Design", "Performance"],
    level: 7,
  },
  {
    id: "brightpath-software-engineer",
    yearStart: 2018,
    yearEnd: 2020,
    title: "Software Engineer",
    company: "Brightpath Systems",
    impact:
      "Built and maintained internal tooling for a 40-person engineering org, including a deploy pipeline dashboard that became the team's most-used internal tool. Reduced onboarding time for new hires by writing the first developer handbook.",
    tags: ["Node.js", "DevOps", "Internal Tools"],
    level: 5,
  },
  {
    id: "brightpath-intern",
    yearStart: 2017,
    yearEnd: 2018,
    title: "Software Engineering Intern",
    company: "Brightpath Systems",
    impact:
      "Contributed to the marketing site rebuild and shipped a handful of small internal automation scripts, learning the fundamentals of code review and production deploys.",
    tags: ["JavaScript", "CSS", "Learning"],
    level: 2,
  },
];
