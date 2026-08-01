import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "answermydocs",
    title: "AnswerMyDocs",
    description: "A PDF chat SaaS that turns documents into a natural-language Q&A experience, with every answer backed by exact page citations.",
    coverImage: "/projects/answeremydocs.png",
    tags: ["Next.js 16", "FastAPI", "LangGraph", "RAG"],
    role: "Solo project",
    timeframe: "2026",
    status: "Live",
    liveUrl: "https://answermydocs.vercel.app",
    githubUrl: "https://github.com/Jyotipal29/answermydocs",
    overview: [
      "AnswerMyDocs lets users upload PDFs — research papers, reports, contracts, books, manuals — and ask questions in plain English, getting answers backed by exact page citations formatted as [filename, p.N].",
      "The retrieval pipeline is a five-stage LangGraph StateGraph: hybrid search combining PGVector cosine similarity and BM25 fused via Reciprocal Rank Fusion, gpt-4o-mini reranking of candidate chunks, a router that decides between retry/generate/fallback, query rewriting when relevance is low, and a final streamed generation step with citations.",
      "The backend is FastAPI + LangChain/LangGraph on a Supabase (Postgres + pgvector) data layer, with JWT and Google OAuth, Stripe billing, and SlowAPI rate limiting. The frontend is Next.js 16 with React 19, streaming answers over SSE with react-pdf for inline document viewing.",
    ],
    stats: [],
    techStackByCategory: {
      frontend: [
        { name: "Next.js 16", reason: "App Router frontend with React 19 and TypeScript." },
        { name: "Tailwind CSS v4 + shadcn/ui", reason: "Styling and component primitives." },
        { name: "TanStack React Query", reason: "Server-state management for documents and conversations." },
        { name: "Zustand", reason: "Client-side auth state." },
        { name: "react-pdf", reason: "Inline PDF rendering alongside cited answers." },
      ],
      backend: [
        { name: "FastAPI", reason: "Async Python web service powering the API and SSE streaming." },
        { name: "LangGraph", reason: "Orchestrates the five-stage RAG pipeline as a state graph (retrieve, rerank, route, rewrite, generate)." },
        { name: "LangChain", reason: "Retrieval, prompt, and LLM integration layer feeding the LangGraph pipeline." },
        { name: "SlowAPI", reason: "Plan-based rate limiting on document, storage, and message quotas." },
      ],
      database: [
        { name: "Supabase (Postgres)", reason: "Primary data store for users, workspaces, documents, and conversation history." },
        { name: "pgvector", reason: "Vector similarity search over document embeddings, combined with BM25 via Reciprocal Rank Fusion." },
      ],
      devops: [
        { name: "Vercel", reason: "Frontend hosting and deployment for the Next.js app." },
        { name: "uv", reason: "Python package management for the FastAPI backend." },
      ],
      thirdParty: [
        { name: "OpenAI (gpt-4o / gpt-4o-mini / text-embedding-3-small)", reason: "Answer generation, reranking, query rewriting, and document embeddings." },
        { name: "Stripe", reason: "Subscription billing across plan tiers." },
        { name: "Google OAuth", reason: "Social sign-in alongside JWT-based auth." },
      ],
    },
    highlights: [
      {
        title: "Cited answers, not guesses",
        description: "Every answer traces back to [filename, p.N] citations pulled from the exact source chunk, not a generic summary.",
      },
      {
        title: "Hybrid retrieval with self-correction",
        description: "Combines vector similarity and BM25 via Reciprocal Rank Fusion, reranks with gpt-4o-mini, and rewrites low-relevance queries before falling back.",
      },
      {
        title: "Production-grade guardrails",
        description: "Prompt injection detection, PII masking, and plan-based rate limiting protect the pipeline end to end.",
      },
    ],
  },
  {
    slug: "vibe",
    title: "Vibe",
    description: "An AI portfolio-generation SaaS that turns a resume PDF and a prompt into a live, running Next.js site, built by a multi-agent LangGraph pipeline inside an E2B sandbox.",
    coverImage: "/projects/vibe-project.png",
    tags: ["TanStack Start", "FastAPI", "LangGraph", "E2B"],
    role: "Solo project",
    timeframe: "2026",
    status: "Live",
    liveUrl: "https://ai-saas-nine-plum.vercel.app/",
    architecture: {
      nodes: [
        { id: "browser", label: "Browser" },
        { id: "bff", label: "BFF Route" },
        { id: "fastapi", label: "FastAPI" },
        { id: "sandbox", label: "E2B Sandbox" },
        { id: "agent", label: "LangGraph" },
        { id: "preview", label: "Live Preview" },
      ],
      edges: [
        { from: "browser", to: "bff", label: "POST /api/projects" },
        { from: "bff", to: "fastapi", label: "HMAC-signed" },
        { from: "fastapi", to: "sandbox", label: "background task" },
        { from: "sandbox", to: "agent", label: "runs graph" },
        { from: "agent", to: "preview", label: "SSE + iframe" },
      ],
    },
    overview: [
      "Vibe lets users upload a resume PDF and describe the portfolio they want, then a multi-agent LangGraph pipeline plans, writes, and runs a real Next.js site inside an E2B sandbox — returning a live preview URL the user keeps iterating on by chatting.",
      "The request flow is a BFF-fronted pipeline: the browser talks only to TanStack Start server routes, which resolve a session token and relay HMAC-signed requests to FastAPI. FastAPI consumes a credit, creates the message, and runs the agent as a background task against a fresh or reconnected E2B sandbox, while the frontend polls for messages and listens on SSE for completion.",
      "Inside the sandbox, a LangGraph graph moves the build through planner, coder, reviewer, and response/title-generator stages, with the coder and reviewer each able to loop back through their own tool calls before handing off. The stack pairs TanStack Start (Vite + Nitro) and shadcn/ui on the frontend with FastAPI and Beanie/MongoDB on the backend, and supports publishing generated sites straight to GitHub and Vercel/Netlify with user-supplied, encrypted deploy tokens.",
    ],
    stats: [],
    techStackByCategory: {
      frontend: [
        { name: "TanStack Start", reason: "File-based routing and server routes on Vite + Nitro powering the app shell and BFF layer." },
        { name: "TanStack Query", reason: "Client-side data fetching and polling for project and message state." },
        { name: "shadcn/ui (on @base-ui/react)", reason: "Accessible component primitives styled with Tailwind v4." },
      ],
      backend: [
        { name: "FastAPI", reason: "Core API service handling auth, projects, messages, usage, and payments." },
        { name: "Beanie + Motor", reason: "Async MongoDB ODM and driver backing every persisted document." },
        { name: "Backend-for-Frontend (BFF)", reason: "Opaque httpOnly session cookie with HMAC-signed, JWT-scoped calls from the frontend to FastAPI." },
      ],
      database: [
        { name: "MongoDB (Atlas)", reason: "Primary data store for users, projects, messages, fragments, and sessions." },
      ],
      devops: [
        { name: "E2B Sandboxes", reason: "Isolated, disposable environments where the agent writes and runs a real Next.js app per project." },
        { name: "Vercel / Netlify", reason: "User-supplied, encrypted-at-rest deploy tokens let generated portfolios publish directly from the app." },
      ],
      thirdParty: [
        { name: "LangGraph + OpenAI", reason: "Multi-agent pipeline (planner, coder, reviewer, response/title generators) that plans, writes, and reviews the generated site." },
        { name: "Google + GitHub OAuth", reason: "Social sign-in alongside JWT-based session auth." },
        { name: "Razorpay", reason: "Credit-based subscription billing for generation usage." },
      ],
    },
    highlights: [
      {
        title: "Resume-to-live-site in one flow",
        description: "Upload a resume PDF, describe the portfolio, and get back a real, running Next.js site with a live preview URL — not a mockup.",
      },
      {
        title: "Multi-agent build pipeline",
        description: "A LangGraph graph of planner, coder, and reviewer agents writes, runs, and critiques the site inside an E2B sandbox before responding.",
      },
      {
        title: "Publish for real",
        description: "Generated portfolios can be pushed straight to GitHub and deployed to Vercel or Netlify using the user's own encrypted API tokens.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
