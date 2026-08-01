---
title: "feat: Add Vibe project to portfolio"
date: 2026-07-31
type: feat
depth: lightweight
---

# feat: Add Vibe project to portfolio

## Summary

Add a new project entry for **Vibe** (an AI portfolio-generation SaaS) to the portfolio site's Projects section, using the provided README as source content and `public/projects/vibe-project.png` (already on disk) as the cover image. This is a pure content addition to an existing, fully-generic data-driven system — no new components, routes, or schema changes are needed.

## Problem Frame

The site's Projects section (`components/sections/ProjectsGrid.tsx`) renders every entry in the `projects` array (`content/projects.ts`) as a card, and each card links to a fully generic detail page at `/projects/[slug]` that renders whichever optional sections a project's data provides (demo, architecture, overview, tech stack, highlights). Currently only one project — AnswerMyDocs — exists in that array. The user wants a second entry, Vibe, populated from a README they supplied, with a thumbnail already saved to `public/projects/vibe-project.png`.

## Requirements

- Add a `Project` object for Vibe to `content/projects.ts`, conforming to the `Project` interface in `content/types.ts`.
- Use `public/projects/vibe-project.png` as `coverImage` (file already exists, confirmed present).
- Populate `description`, `overview`, `tags`, `techStackByCategory`, and `highlights` from the supplied README content.
- `status: "Live"`, `liveUrl: "https://ai-saas-nine-plum.vercel.app/"` (confirmed with user).
- No `githubUrl` — explicitly excluded per user instruction.
- Include an `architecture` diagram summarizing the request/generation flow described in the README (confirmed with user).
- No other files change — the grid, card, and detail-page components already render any array entry generically.

## Key Technical Decisions

**Architecture diagram scope.** `components/project-detail/ArchitectureDiagram.tsx` lays out `Architecture.nodes` as a single left-to-right row: edges between adjacent-index nodes draw as straight forward arrows, and any other edge pair draws as a big arc. It has no support for parallel branches or backward/cyclic edges rendering cleanly. Vibe's actual LangGraph agent graph has internal cycles (`coder ⇄ coder_tools`, `reviewer ⇄ reviewer_tools`), which would render badly in this component. Decision: model the **outer request/response flow** (browser → BFF → FastAPI → sandbox → agent → live preview) as a clean 6-node linear chain instead of the inner cyclic agent graph — this matches the component's supported shape and still conveys the system's real architecture. (see origin: README's "Request flow" numbered list)

**Field mapping source.** Follow the existing AnswerMyDocs entry in `content/projects.ts` as the structural template (paragraph count in `overview`, ~4 `tags`, 3 `highlights`, empty `stats`) so the two cards read consistently in the grid.

## Scope Boundaries

**In scope:** one new `Project` object appended to the `projects` array in `content/projects.ts`.

**Out of scope:**
- No `githubUrl` (explicitly excluded by user).
- No demo video/screenshots (`demo` field) — none supplied.
- No `stats` callouts — no metrics were supplied in the README; matches the existing AnswerMyDocs entry, which also has an empty `stats: []`.
- No changes to `ProjectCard`, `ProjectsGrid`, detail-page components, or `content/types.ts` — the existing generic rendering pipeline already supports everything this entry needs.

## Implementation Units

### U1. Add Vibe entry to project data

**Goal:** Append a fully-populated `Project` object for Vibe to the `projects` array so it appears in the grid and renders correctly on its detail page.

**Requirements:** All items under Requirements above.

**Dependencies:** None.

**Files:**
- `content/projects.ts` (modify — add new array entry; no test file, see Test scenarios below)

**Approach:**

Map the supplied README to the `Project` shape (`content/types.ts`) as follows:

| Field | Value |
|---|---|
| `slug` | `"vibe"` |
| `title` | `"Vibe"` |
| `description` | One-sentence pitch: an AI portfolio generator that turns a resume + prompt into a live, running Next.js site via a multi-agent LangGraph pipeline in an E2B sandbox |
| `coverImage` | `"/projects/vibe-project.png"` |
| `tags` | 4 tags surfacing the distinctive stack: TanStack Start, FastAPI, LangGraph, E2B |
| `role` | `"Solo project"` (matches the sibling entry) |
| `timeframe` | `"2026"` |
| `status` | `"Live"` |
| `liveUrl` | `"https://ai-saas-nine-plum.vercel.app/"` |
| `githubUrl` | omitted |
| `architecture` | 6-node linear flow per the Key Technical Decision above |
| `overview` | 3 paragraphs: (1) product pitch, (2) BFF/agent request flow, (3) stack + publishing summary — drawn directly from the README's prose |
| `stats` | `[]` |
| `techStackByCategory` | `frontend`, `backend`, `database`, `devops`, `thirdParty` arrays built from the README's tech stack table and architecture prose, each entry as `{ name, reason }` |
| `highlights` | 3 entries: resume-to-live-site flow, multi-agent build pipeline, real publishing (GitHub/Vercel/Netlify with encrypted tokens) |

**Technical design (directional, not literal):**

```
architecture.nodes:
  browser        "Browser"
  bff            "BFF Route"
  fastapi        "FastAPI"
  sandbox        "E2B Sandbox"
  agent          "LangGraph"
  preview        "Live Preview"

architecture.edges (all forward, index i -> i+1, so each renders as a straight arrow):
  browser -> bff       "POST /api/projects"
  bff -> fastapi        "HMAC-signed"
  fastapi -> sandbox    "background task"
  sandbox -> agent      "runs graph"
  agent -> preview      "SSE + iframe"
```

**Patterns to follow:** the existing AnswerMyDocs object in `content/projects.ts` (lines 4-63) for overall shape, tone, and field density; `content/types.ts` for exact field/type conformance.

**Test scenarios:**

`Test expectation: none -- this is a pure data addition into an existing, generic rendering pipeline (ProjectCard, ProjectsGrid, the [slug] detail page, and ArchitectureDiagram) that is already exercised by the AnswerMyDocs entry. No new component logic, branching, or route is introduced.`

Manual verification (see Verification below) substitutes for automated coverage on this unit.

**Verification:**
- `npm run lint` (or equivalent project lint script) passes with no new errors.
- TypeScript compiles cleanly — the new object satisfies the `Project` interface with no `any`/type errors.
- On the running site: the Vibe card appears in the Projects grid with the correct thumbnail, title, description, and tags.
- Navigating to `/projects/vibe` (and the intercepted modal route) renders overview, tech stack, highlights, and the architecture diagram without visual overlap or missing labels.
- The card's "live" link points to `https://ai-saas-nine-plum.vercel.app/`; no GitHub/source link is rendered (confirms `shouldShowSourceLink` correctly returns false with `githubUrl` omitted).
