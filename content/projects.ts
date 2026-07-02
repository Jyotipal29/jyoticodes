import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "vibe",
    title: "VIBE",
    description: "An AI-driven SaaS that generates production-ready Next.js applications from natural language.",
    tags: ["Next.js 15", "TypeScript", "tRPC", "AI"],
    role: "Solo project",
    timeframe: "2025",
    status: "Live",
    overview: [
      "VIBE turns a natural-language prompt into a production-ready Next.js application, aiming to compress the gap between describing an app and having a working version of it.",
      "Generated code runs in E2B sandboxed environments so it can be previewed and interacted with safely, while Inngest handles the async processing pipeline behind generation and background jobs.",
      "The app ships with real-time updates and subscription-based rate limiting, built on Next.js 15, TypeScript, tRPC, and a PostgreSQL/Prisma data layer.",
    ],
    stats: [],
    techStackByCategory: {
      frontend: [
        { name: "Next.js 15", reason: "App Router for the SaaS shell and generated-app previews." },
        { name: "TypeScript", reason: "End-to-end type safety across the tRPC boundary." },
      ],
      backend: [
        { name: "tRPC", reason: "Typed API layer between the Next.js frontend and backend without a separate schema." },
      ],
      database: [
        { name: "PostgreSQL", reason: "Primary data store." },
        { name: "Prisma", reason: "Type-safe ORM and migrations for the Postgres schema." },
      ],
      devops: [
        { name: "Inngest", reason: "Async/background job processing for app generation and rate-limited workflows." },
      ],
      thirdParty: [
        { name: "E2B", reason: "Sandboxed environments for safely running AI-generated code." },
      ],
    },
    architecture: {
      nodes: [
        { id: "client", label: "Next.js 15 Client" },
        { id: "trpc", label: "tRPC API" },
        { id: "inngest", label: "Inngest Queue" },
        { id: "e2b", label: "E2B Sandbox" },
        { id: "db", label: "Postgres (Prisma)" },
      ],
      edges: [
        { from: "client", to: "trpc", label: "typed calls" },
        { from: "trpc", to: "inngest", label: "enqueue generation job" },
        { from: "inngest", to: "e2b", label: "run generated app" },
        { from: "trpc", to: "db", label: "read / write" },
        { from: "e2b", to: "client", label: "live preview" },
      ],
    },
    highlights: [
      {
        title: "Natural-language to working app",
        description: "Generates a production-ready Next.js application directly from a plain-language prompt.",
      },
      {
        title: "Sandboxed code execution",
        description: "Generated code runs in isolated E2B sandboxes rather than executing directly in the host environment.",
      },
      {
        title: "Real-time, rate-limited by design",
        description: "Real-time updates paired with subscription-based rate limiting to manage usage per plan.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
