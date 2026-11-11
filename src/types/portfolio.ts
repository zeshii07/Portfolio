export type ProjectCategory =
  | "Full-stack"
  | "AI & Automation"
  | "Mobile"
  | "Business Software"
  | "Cybersecurity / Networking";

export type ProjectType = "personal" | "client" | "academic";
export type ProjectStatus = "Live" | "In Progress" | "Prototype";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectChallenge {
  challenge: string;
  alternatives: string;
  resolution: string;
}

export interface ProjectArchitectureLayer {
  label: string;
  details: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  type: "live" | "github" | "article" | "private";
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  projectType: ProjectType;
  status: ProjectStatus;
  dateLabel: string;
  role: string;
  isFeatured: boolean;
  /** Used for the listing card thumbnail (emoji or short label to render in SVG poster). */
  posterLabel: string;
  posterAccent: string;
  technologies: string[];
  /** Used in the case study. */
  problem: string;
  solution: string;
  features: ProjectFeature[];
  architecture: ProjectArchitectureLayer[];
  stack: { name: string; why: string }[];
  challenges: ProjectChallenge[];
  outcome: string;
  links: ProjectLink[];
}

export interface SkillGroup {
  title: string;
  icon: "frontend" | "backend" | "database" | "ai" | "security";
  skills: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  audience: string;
  includes: string[];
  deliverables: string[];
  icon: "website" | "ai" | "software" | "maintenance";
}

export interface ExperienceItem {
  id: string;
  kind: "work" | "internship" | "freelance" | "education" | "certification" | "training";
  role: string;
  organization: string;
  dateLabel: string;
  bullets: string[];
  technologies?: string[];
  evidence?: { label: string; href: string }[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email" | "whatsapp";
}
