import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Jordan Vale",
  role: "Senior Full-Stack Engineer",
  location: "Remote (US)",
  pitch:
    "I build fast, accessible web products end to end — from data modeling and API design through to pixel-level UI polish. Most recently I've been focused on developer tooling and performance at scale, with a soft spot for typed systems and hand-rolled visualizations over heavyweight libraries.",
  metaStats: ["EST. 2018", "BUILDS FOR SCALE", "TYPE-SAFE BY DEFAULT", "12+ SHIPS/YR"],
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/jordanvale-placeholder",
    linkedin: "https://linkedin.com/in/jordanvale-placeholder",
    x: "https://x.com/jordanvale_dev",
    email: "hello@jordanvale.dev",
  },
  portraitImage: "/images/portrait.jpg",
  toolbox: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "Go",
    "Docker",
  ],
  achievements: [
    { award: "Engineering Excellence Award", company: "Acme Robotics", year: "2023" },
    { award: "Hackathon Grand Prize", company: "Nimbus Analytics", year: "2021" },
    { award: "Top Contributor", company: "Open Source Guild", year: "2020" },
  ],
  interests: [
    "Mechanical keyboards",
    "Long-distance running",
    "Generative art",
    "Coffee brewing",
  ],
  keyValues: [
    { key: "Based in", value: "Remote (US)" },
    { key: "Open to", value: "Full-time & contract roles" },
    { key: "Available", value: "September 2026" },
    { key: "Studied", value: "B.S. Computer Science, Rutherglen State" },
  ],
  openToWorkBadge: "OPEN TO WORK",
};
