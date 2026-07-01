/**
 * Content type contracts.
 *
 * Every content file under `content/` exports a typed array/object built
 * from the shapes defined here. Optional fields that are naturally lists
 * default to `[]` at the data layer (not `undefined`) so components never
 * need ad-hoc null checks. Genuinely singular optional fields (URLs, single
 * image paths) stay `string | undefined` and are hidden, not disabled, by
 * the components that consume them when absent.
 */

/** A single short key/value row, e.g. "Based in" -> "Remote (US)". */
export interface KeyValueItem {
  key: string;
  value: string;
}

/** A single award/recognition tuple shown in the About sidebar. */
export interface Achievement {
  award: string;
  company: string;
  year: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  x?: string;
  /** Every site needs a contact path, so email is the one required link. */
  email: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  /** One-paragraph pitch shown under the hero headline. */
  pitch: string;
  /** Short monospace stat-row strings, e.g. "EST. 2020", "BUILDS FOR SCALE". */
  metaStats: string[];
  /** Path to a placeholder resume PDF under `public/`. */
  resumeUrl: string;
  social: SocialLinks;
  /** Optional so `ImageFallback` can demonstrate its fallback state. */
  portraitImage?: string;
  toolbox: string[];
  achievements: Achievement[];
  interests: string[];
  keyValues: KeyValueItem[];
  openToWorkBadge: string;
  /** Rotating status strings for the hero's auto-scrolling marquee. */
  marquee: string[];
}

export interface CareerRole {
  id: string;
  yearStart: number;
  /** Omitted (undefined) for the current/ongoing role. */
  yearEnd?: number;
  title: string;
  company: string;
  /** 2-3 sentence impact description. */
  impact: string;
  tags: string[];
  /**
   * Author-assigned seniority/scope score on a 1-10 scale. This is the
   * exact numeric field `CareerSparkline` plots on its Y axis — required
   * and unambiguous, not a vague "progression metric".
   */
  level: number;
}

export interface DiagramNode {
  id: string;
  label: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Architecture {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface StatCallout {
  label: string;
  value: string;
}

export interface TechStackEntry {
  name: string;
  reason: string;
}

export interface TechStackByCategory {
  frontend: TechStackEntry[];
  backend: TechStackEntry[];
  database: TechStackEntry[];
  devops: TechStackEntry[];
  thirdParty: TechStackEntry[];
}

export interface ProjectHighlight {
  title: string;
  description: string;
  metric?: string;
}

export interface ProjectDemo {
  /** Optional demo video URL. */
  videoUrl?: string;
  /** Optional screenshot image paths. */
  screenshots: string[];
}

export type ProjectStatus = "Live" | "Archived";

export interface Project {
  /** Required — used as the `/projects/[slug]` route param. */
  slug: string;
  title: string;
  /** One-line description shown on the grid card. */
  description: string;
  /** Optional — for `ImageFallback` to demonstrate its fallback. */
  coverImage?: string;
  tags: string[];
  role: string;
  timeframe: string;
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
  demo?: ProjectDemo;
  architecture?: Architecture;
  /** 2-3 paragraphs, one entry per paragraph. */
  overview: string[];
  stats: StatCallout[];
  techStackByCategory: TechStackByCategory;
  highlights: ProjectHighlight[];
}

export interface WritingPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string, e.g. "2026-03-14". */
  date: string;
}

export interface DailyLogEntry {
  /** ISO date string, e.g. "2026-06-30". */
  date: string;
  topic: string;
  /** Short description of what was learned/solved. */
  description: string;
}

export interface LibraryEntry {
  title: string;
  author: string;
  /** Integer rating, 1-5. */
  rating: number;
  note: string;
  /** Optional — for `ImageFallback` to demonstrate its fallback. */
  coverImage?: string;
}

export interface Experiment {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}
