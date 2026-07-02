export interface KeyValueItem {
  key: string;
  value: string;
}

export interface Achievement {
  award: string;
  company: string;
  year: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  x?: string;
  email: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  pitch: string;
  metaStats: string[];
  resumeUrl: string;
  social: SocialLinks;
  portraitImage?: string;
  toolbox: string[];
  achievements: Achievement[];
  interests: string[];
  keyValues: KeyValueItem[];
  openToWorkBadge: string;
}

export interface CareerRole {
  id: string;
  yearStart: number;
  yearEnd?: number;
  title: string;
  company: string;
  impact: string;
  tags: string[];
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
  videoUrl?: string;
  screenshots: string[];
}

export type ProjectStatus = "Live" | "Archived";

export interface Project {
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  tags: string[];
  role: string;
  timeframe: string;
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
  demo?: ProjectDemo;
  architecture?: Architecture;
  overview: string[];
  stats: StatCallout[];
  techStackByCategory: TechStackByCategory;
  highlights: ProjectHighlight[];
}
