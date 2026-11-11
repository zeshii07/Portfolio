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
