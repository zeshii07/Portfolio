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

/**
 * Headline stat shown in project cards / case studies.
 * `isDemoData: true` MUST be set when the value is illustrative
 * (dashboard mock, projected/expected number, lab figure) rather than
 * a real production measurement. The UI renders a visible "Demo Data"
 * badge whenever this flag is true so recruiters are not misled.
 */
export interface ProjectStat {
  label: string;
  value: string;
  /** Illustrative / simulated metric — NOT a real customer result. */
  isDemoData?: boolean;
  /** Optional one-line note explaining how the figure is derived. */
  note?: string;
}

/**
 * Screenshot slot for a case study. `placeholder: true` means the
 * file is not yet dropped into /public; the UI renders a clearly
 * labelled placeholder frame instead of a broken image. When the
 * file is added, set placeholder:false and the path resolves.
 */
export interface ProjectScreenshot {
  /** Path under /public, e.g. "/projects/nova/dashboard.png" */
  src: string;
  caption: string;
  /** When true, render a labelled placeholder frame instead of <img>. */
  placeholder?: boolean;
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
  posterVariant?: "terminal" | "dashboard" | "mobile" | "network" | "cards";
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
  /** Optional headline metrics. Mark illustrative figures with isDemoData. */
  stats?: ProjectStat[];
  /** Optional annotated screenshots for the case study. */
  screenshots?: ProjectScreenshot[];
  /**
   * Whether the case study renders an inline architecture diagram.
   * Defaults to true when the project has an `architecture` array.
   */
  showArchitectureDiagram?: boolean;
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

/**
 * Role the candidate is open to. Rendered in the
 * "Open to Opportunities" section so recruiters see role targets
 * at a glance.
 */
export interface OpenRole {
  title: string;
  level: "Junior" | "Mid" | "Internship" | "Any";
  note?: string;
}
