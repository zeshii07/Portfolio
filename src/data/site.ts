import type { NavLink, SocialLink } from "@/types/portfolio";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Capabilities", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Open Roles", href: "#open-to-opportunities" },
  { label: "Contact", href: "#contact" },
];

/** Canonical profile URLs — reused across hero, footer, SEO, JSON-LD. */
export const profileUrls = {
  github: "https://github.com/zeshii07",
  linkedin: "https://www.linkedin.com/in/hafiz-muhammad-zeeshan-718a03410",
  email: "zeeshansultan785@gmail.com",
  whatsapp: "https://wa.me/+923019299608",
  /** Live CV PDF shipped in /public/resume/. */
  cv: "/resume/zeeshan-cv.pdf",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profileUrls.github, icon: "github" },
  { label: "LinkedIn", href: profileUrls.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profileUrls.email}`, icon: "email" },
];

export const contactInfo = {
  email: profileUrls.email,
  /** Consistent across hero, about, footer — single source of truth. */
  location: "Based in Multan, Pakistan",
  locationDetail: "Multan, Pakistan · UTC+5",
  whatsapp: profileUrls.whatsapp,
};

/**
 * Recruiter-oriented identity per portfolio audit:
 * Lead with a concrete role target, not a broad trio.
 * Cybersecurity stays as a secondary specialization.
 */
export const person = {
  /** Full legal/preferred name used in CV, JSON-LD, metadata. */
  name: "Muhammad Zeeshan",
  shortName: "Zeeshan",
  wordmark: "ZEESHAN",
  role: "Full-Stack Software Engineer | AI Applications & Automation",
  /** One-line positioning shown under the name on the homepage. */
  headline:
    "I build scalable web applications, AI-powered products, and business automation systems using modern frontend and backend technologies.",
  /**
   * Secondary supporting copy. Keeps the broad capability story
   * without diluting the primary full-stack positioning.
   */
  supportingCopy:
    "Full-stack developer specializing in AI-powered applications and automation. I ship production web apps with React/Next.js, Node.js, and grounded LLM integrations — with security as a secondary specialization.",
  availability:
    "Open to Junior Software Engineer, Full-Stack Developer, and AI Application Developer roles.",
  /** Short About preview copy */
  aboutPreview:
    "I'm Muhammad Zeeshan — a full-stack software engineer who turns real business problems into reliable, usable software. I work across React/Next.js frontends, Node.js backends, and AI-powered automation, with security-conscious engineering as a secondary focus.",
};
