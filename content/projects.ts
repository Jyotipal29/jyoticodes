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
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
