import type { Project } from "./types";

/**
 * Placeholder project data, in display/array order (the plan's chosen
 * ordering convention — no implicit date sort; the grid and prev/next nav
 * both follow this declaration order).
 *
 * Notes on the deliberate gaps below:
 * - "acme-devtools-cli" intentionally omits `liveUrl` (stays `undefined`)
 *   to exercise the "hide, don't disable" rule for optional CTAs.
 * - "fleet-telemetry-hub" intentionally omits `coverImage` to exercise
 *   `ImageFallback`'s missing-src fallback.
 * - The other cover images point at `/images/projects/<slug>.png` paths
 *   that do not exist yet under `public/images/`, to exercise the
 *   broken/missing-asset path once real images are added.
 */
export const projects: Project[] = [
  {
    slug: "nimbus-dashboard",
    title: "Nimbus Dashboard",
    description: "A real-time analytics dashboard for tracking customer usage across products.",
    coverImage: "/images/projects/nimbus-dashboard.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Chart rendering"],
    role: "Lead engineer",
    timeframe: "2021 — 2023",
    status: "Live",
    liveUrl: "https://nimbus-dashboard-placeholder.vercel.app",
    githubUrl: "https://github.com/jordanvale-placeholder/nimbus-dashboard",
    demo: {
      videoUrl: "https://example.com/demo/nimbus-dashboard.mp4",
      screenshots: [
        "/images/projects/nimbus-dashboard-1.png",
        "/images/projects/nimbus-dashboard-2.png",
      ],
    },
    architecture: {
      nodes: [
        { id: "client", label: "Next.js Client" },
        { id: "api", label: "API Routes" },
        { id: "queue", label: "Ingest Queue" },
        { id: "db", label: "Postgres" },
      ],
      edges: [
        { from: "client", to: "api", label: "fetch" },
        { from: "api", to: "queue", label: "enqueue events" },
        { from: "queue", to: "db", label: "batch write" },
        { from: "db", to: "api", label: "query" },
      ],
    },
    overview: [
      "Nimbus Dashboard replaced a set of static, once-daily CSV exports with a live view into product usage, giving the customer success team same-day visibility into account health for the first time.",
      "The hardest part of the build was designing an ingest pipeline that could absorb bursty event traffic without dropping data or blocking the UI — a queue-backed batching layer solved both, at the cost of a few seconds of eventual consistency the team was happy to accept.",
      "Post-launch, the dashboard became the most-visited internal tool at the company, and the underlying event schema was later reused by two other teams.",
    ],
    stats: [
      { label: "Daily active users", value: "1,200+" },
      { label: "Query latency (p95)", value: "180ms" },
      { label: "Data freshness", value: "< 10s" },
    ],
    techStackByCategory: {
      frontend: [
        { name: "Next.js", reason: "Server-rendered dashboard shell with fast client navigation." },
        { name: "TypeScript", reason: "Shared types between the ingest schema and the UI." },
      ],
      backend: [
        { name: "Node.js", reason: "API routes and the batching worker." },
      ],
      database: [
        { name: "PostgreSQL", reason: "Time-series event storage with materialized rollups." },
      ],
      devops: [
        { name: "Docker", reason: "Consistent local and CI environments for the worker service." },
      ],
      thirdParty: [
        { name: "Recharts", reason: "Charting primitives for the usage graphs." },
      ],
    },
    highlights: [
      {
        title: "Real-time ingest pipeline",
        description: "Built a queue-backed batching layer that absorbs bursty event traffic without data loss.",
        metric: "10s freshness",
      },
      {
        title: "Adopted company-wide",
        description: "The event schema was reused by two other internal teams within a year of launch.",
      },
    ],
  },
  {
    slug: "fleet-telemetry-hub",
    title: "Fleet Telemetry Hub",
    description: "A service boundary rearchitecture for ingesting and querying robot fleet telemetry.",
    tags: ["Go", "Kafka", "Distributed Systems"],
    role: "Staff engineer",
    timeframe: "2023 — Present",
    status: "Live",
    liveUrl: "https://fleet-telemetry-placeholder.acme-robotics.example",
    githubUrl: "https://github.com/jordanvale-placeholder/fleet-telemetry-hub",
    overview: [
      "Fleet Telemetry Hub replaced a monolithic telemetry service that had become a single point of failure for the entire robotics fleet, splitting it into independently deployable, typed service boundaries.",
      "The migration was done incrementally behind a shared interface, allowing the old and new systems to run in parallel for three months while confidence was built up, with zero fleet downtime during the cutover.",
    ],
    stats: [
      { label: "Incident MTTR", value: "-40%" },
      { label: "Services split out", value: "5" },
    ],
    techStackByCategory: {
      frontend: [],
      backend: [
        { name: "Go", reason: "Low-latency telemetry ingestion with strong concurrency primitives." },
        { name: "Kafka", reason: "Durable, replayable event streaming between services." },
      ],
      database: [
        { name: "TimescaleDB", reason: "Time-series storage for high-volume sensor data." },
      ],
      devops: [
        { name: "Kubernetes", reason: "Independent deploys and scaling per service boundary." },
      ],
      thirdParty: [],
    },
    highlights: [
      {
        title: "Zero-downtime migration",
        description: "Ran old and new systems in parallel behind a shared interface for a clean cutover.",
      },
      {
        title: "Faster incident response",
        description: "Clear service boundaries cut mean time to resolution significantly.",
        metric: "40% faster MTTR",
      },
    ],
  },
  {
    slug: "acme-devtools-cli",
    title: "Acme Devtools CLI",
    description: "An internal CLI that scaffolds services, runs local environments, and automates releases.",
    coverImage: "/images/projects/acme-devtools-cli.png",
    tags: ["Node.js", "CLI", "Developer Experience"],
    role: "Solo project",
    timeframe: "2022",
    status: "Archived",
    // Intentionally no liveUrl — internal tool with no public URL, used to
    // exercise the "hide, don't disable" rule for the optional live-link CTA.
    githubUrl: "https://github.com/jordanvale-placeholder/acme-devtools-cli",
    overview: [
      "Acme Devtools CLI grew out of a handful of one-off shell scripts engineers kept copy-pasting between projects, consolidating them into a single, documented, versioned tool.",
      "Adoption was driven almost entirely by word of mouth — no mandate was ever issued — which the team took as the clearest signal that it solved a real problem.",
    ],
    stats: [
      { label: "Weekly active users", value: "35" },
      { label: "Setup time saved", value: "~20 min/dev" },
    ],
    techStackByCategory: {
      frontend: [],
      backend: [
        { name: "Node.js", reason: "Cross-platform CLI runtime shared with the rest of the stack." },
      ],
      database: [],
      devops: [
        { name: "GitHub Actions", reason: "Automated npm publish on tagged releases." },
      ],
      thirdParty: [
        { name: "Commander.js", reason: "Command parsing and help-text generation." },
      ],
    },
    highlights: [
      {
        title: "Organic adoption",
        description: "Spread across the engineering org without a top-down mandate.",
      },
    ],
  },
  {
    slug: "brightpath-status-page",
    title: "Brightpath Status Page",
    description: "A public status page and incident-history site for Brightpath's customer-facing services.",
    coverImage: "/images/projects/brightpath-status-page.png",
    tags: ["React", "Node.js", "Webhooks"],
    role: "Software engineer",
    timeframe: "2019",
    status: "Live",
    liveUrl: "https://status-brightpath-placeholder.example",
    overview: [
      "Brightpath's support team was manually posting incident updates to a shared doc; this project replaced that with a public status page fed by the same alerting webhooks the on-call team already used.",
      "Keeping the update flow effortless for engineers was the design priority — an update posted to the existing incident Slack channel is mirrored to the public page automatically, with no extra step.",
    ],
    stats: [
      { label: "Manual update time saved", value: "~15 min/incident" },
    ],
    techStackByCategory: {
      frontend: [
        { name: "React", reason: "Simple, fast-loading public status UI." },
      ],
      backend: [
        { name: "Node.js", reason: "Webhook receiver mirroring incident updates from Slack." },
      ],
      database: [],
      devops: [],
      thirdParty: [
        { name: "Slack API", reason: "Source of truth for incident updates, mirrored automatically." },
      ],
    },
    highlights: [
      {
        title: "Zero-effort updates",
        description: "Incident updates mirror automatically from the existing on-call Slack workflow.",
      },
    ],
  },
];

/** Returns the project matching `slug`, or `undefined` if none matches. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
