# Residual code review findings — main @ b1b710f

Recorded from the Tier 2 `ce-code-review` pass run against the full plan
implementation (`docs/plans/2026-07-01-001-feat-vercel-style-portfolio-plan.md`),
run ID `20260701-184845-ef0b7e98`. Nine reviewers dispatched (correctness,
testing, maintainability, project-standards, performance, adversarial,
julik-frontend-races, ce-agent-native-reviewer, ce-learnings-researcher).
Eight actionable findings were applied and committed in `b1b710f`. The
items below were reviewed and explicitly accepted as known, low-priority
gaps rather than fixed, per user decision.

## Accepted residuals

- **Project-detail subsection components lack dedicated tests** (P2,
  `testing`, owner: human). `ProjectHeader.tsx`, `ProjectFooterNav.tsx`,
  and `ArchitectureDiagram.tsx` are plain sync components taking a
  resolved `Project` prop and are fully RTL-testable, but have no test
  files. Coverage today comes from `section-visibility.test.ts` (the pure
  logic they call) plus manual/build verification.
- **`ProjectModalOverlay` dismiss behavior is untested** (P2, `testing`,
  owner: human). No test asserts Escape/backdrop-click/close-button all
  call `router.back()`, unlike the structurally identical `ChatModal` and
  `MobileMenu`, which do have this coverage.
- **`MobileMenu` doesn't release its focus trap on a breakpoint-crossing
  resize** (P3, `adversarial`, owner: human). If the menu is open and the
  viewport is resized past `md` without closing it first, the trap
  listeners stay live. Narrow edge case.
- **`Career.tsx` re-sorts its array on every render** (residual risk,
  `performance`). No `useMemo` around the two `.sort()` calls. Harmless at
  the current ~4-entry scale.
- **No `@modal`-scoped `not-found.tsx`** (residual risk, `adversarial`).
  `app/@modal/(.)projects/[slug]/page.tsx`'s `notFound()` would bubble to
  the root `not-found.tsx` and replace the whole page rather than just the
  modal slot. Currently unreachable since the grid always sources valid
  slugs from `content/projects.ts`; would only matter if a stale cached
  grid render outlived a content edit.
- **No bundle-size/Lighthouse budget check** for Motion usage across the
  many client-side animation surfaces (Marquee, Career reveals, the
  intercepting-route transition). The plan's own Risks section already
  flagged this as an accepted risk to monitor post-launch, not a
  pre-launch blocker.
- **Marquee's `text-white`-on-`bg-accent` combination has borderline
  WCAG-AA contrast in light mode** (residual risk, `adversarial`) — the
  marquee was designed against the dark theme's white-on-blue look; light
  mode inherits the same theme-invariant accent background.

## Applied (for context — not residual, already fixed in `b1b710f`)

- `ProjectModalOverlay`'s exit animation never played (`AnimatePresence`
  was nested inside the subtree that unmounts on `router.back()`) — fixed
  by lifting it to a new `ModalPresence` wrapper in `app/layout.tsx`.
- `ImageFallback`'s placeholder ignored the `fill` prop and collapsed to a
  thin strip in fill-mode callers.
- `shouldShowDemo`/`shouldShowArchitecture` rendered an empty section when
  the `demo`/`architecture` object was present but its content fields
  were empty.
- `About.tsx`'s `text-gray-300` bypassed the light-mode token system
  entirely (not a themed token), staying illegible after toggling themes.
- Three divergent GitHub/LinkedIn/X icon implementations consolidated into
  `components/icons/SocialIcons.tsx`.
- Duplicated initials-derivation logic extracted to `lib/get-initials.ts`.
- `DailyLogs.test.tsx` empty-state coverage added (the plan's own U10 test
  scenarios named this explicitly; only `Writing.test.tsx` had shipped it).
