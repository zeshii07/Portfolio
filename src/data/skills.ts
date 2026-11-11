import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend",
    icon: "backend",
    skills: ["Node.js", "Express", "REST API design", "Authentication", "Third-party integrations"],
  },
  {
    title: "Databases",
    icon: "database",
    skills: ["MySQL", "Oracle", "Schema design", "Query optimization"],
  },
  {
    title: "AI / Automation",
    icon: "ai",
    skills: ["LLM integration", "Retrieval-augmented generation", "Conversation flows", "Structured data extraction"],
  },
  {
    title: "Security / Networking",
    icon: "security",
    skills: ["Cybersecurity fundamentals", "Networking", "Ethical hacking concepts", "Secure coding practices"],
  },
];

/**
 * Orbital skill map data for the constellation scene.
 * Each group has a position angle (deg) on the orbit.
 */
export interface OrbitalSkillGroup {
  id: string;
  label: string;
  angle: number;
  title: string;
  description: string;
  skills: string[];
}

export const orbitalSkillGroups: OrbitalSkillGroup[] = [
  {
    id: "fe",
    label: "Frontend",
    angle: -90,
    title: "Frontend engineering",
    description:
      "Component-driven React and Next.js apps with TypeScript. Mobile-first, accessible, and fast — design system thinking applied to product UI.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "be",
    label: "Backend",
    angle: -18,
    title: "Backend engineering",
    description:
      "Node.js APIs with clear boundaries: routes, auth, validation, and persistence kept separate so behavior is easy to reason about and test.",
    skills: ["Node.js", "REST APIs", "Authentication", "Integrations"],
  },
  {
    id: "ai",
    label: "AI",
    angle: 54,
    title: "AI & automation",
    description:
      "Practical AI: retrieval-augmented assistants, structured prompt pipelines, and automation that is grounded and verifiable rather than free-form chat.",
    skills: ["LLM integration", "RAG", "Conversation flows", "Business automation"],
  },
  {
    id: "sec",
    label: "Security",
    angle: 126,
    title: "Security & networking",
    description:
      "Cybersecurity fundamentals and networking basics applied to real code: input validation, authorization, secrets handling, and safe defaults.",
    skills: ["Networking", "Ethical hacking concepts", "Secure coding"],
  },
  {
    id: "tools",
    label: "Tools",
    angle: 198,
    title: "Tools & workflow",
    description:
      "A pragmatic toolkit: Git workflows, deployment, automated testing, and design tools used to ship and maintain software reliably.",
    skills: ["Git", "Deployment", "Testing", "Design tools"],
  },
];

export const credibilityHighlights: { label: string; sub: string }[] = [
  { label: "BS Information Technology", sub: "University of the Punjab" },
  { label: "Deployed client websites", sub: "Responsive, SEO-ready, with handover" },
  { label: "Full-stack development", sub: "React · Node · MySQL · Oracle" },
  { label: "AI automation projects", sub: "Nova · Hirely AI · RAG pipelines" },
  { label: "Security & networking labs", sub: "Hands-on, documented practice" },
];

export const workingProcess: { step: string; title: string; description: string }[] = [
  {
    step: "01",
    title: "Understand the problem",
    description: "Define what is actually broken or missing, and who is affected. No solution before the problem is clear.",
  },
  {
    step: "02",
    title: "Plan the solution and scope",
    description: "Decide what is in scope, what is out, and what the first useful version looks like. Write it down.",
  },
  {
    step: "03",
    title: "Build, test, and refine",
    description: "Ship small, verify behavior, and refine against real usage. Test the edges, not just the happy path.",
  },
  {
    step: "04",
    title: "Deploy and support",
    description: "Deploy safely, document handover, and stay available for fixes and improvements after launch.",
  },
];

export const marqueePhrases = [
  { text: "BUILD", outline: false },
  { text: "AUTOMATE", outline: true },
  { text: "EXPLORE", outline: false },
  { text: "SHIP", outline: false },
  { text: "SECURE", outline: true },
  { text: "ITERATE", outline: false },
];

export const rotatingHeroWords = ["software", "AI", "automation", "digital products"];
