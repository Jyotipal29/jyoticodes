import type { CareerRole } from "./types";

export const career: CareerRole[] = [
  {
    id: "briq-fullstack",
    yearStart: 2025,
    title: "Full Stack Engineer",
    company: "BRIQ",
    impact:
      "Helped modernize a configurable document-processing workflow, improving UX by ~30% as part of a migration from a legacy stack to Vue 3, TypeScript, Tailwind CSS, and Pinia. Coordinated an AI-powered support chatbot that cut manual support requests by ~25%, and integrated third-party AI services with prompt-engineering tuning that reduced document matching time by ~40%.",
    tags: ["Vue 3", "TypeScript", "Tailwind CSS", "AI Integration"],
    level: 8,
  },
  {
    id: "spaiderspace-founding-fullstack",
    yearStart: 2024,
    yearEnd: 2025,
    title: "Founding Full Stack Engineer",
    company: "SpaiderSpace",
    impact:
      "Owned end-to-end development of the company's webapp and core AI product, Sagan, leading architecture, implementation, and production deployment. Built AI-driven social media agents (LangChain, SmolAgents) automating 500+ posts and interactions per week, and independently drove 10+ features from concept to production.",
    tags: ["React", "Python", "FastAPI", "LangChain", "AI Agents"],
    level: 7,
  },
  {
    id: "esstart-fullstack",
    yearStart: 2023,
    yearEnd: 2024,
    title: "Full Stack Engineer",
    company: "ESSTART",
    impact:
      "Built an event seating chart application and management dashboards that cut manual seating-assignment time by ~60%, plus a desktop image-management tool (Electron.js, Sharp) handling 1,000+ images a day. Integrated Stripe payments and AWS services (SNS, SES, Lambda, Comprehend) for guest communication and text moderation.",
    tags: ["React", "TypeScript", "Redux Toolkit", "AWS"],
    level: 4,
  },
];
