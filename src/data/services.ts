import type { ServiceItem } from "@/types/portfolio";

export const services: ServiceItem[] = [
  {
    id: "web-apps",
    title: "Website & Web Application Development",
    tagline: "Responsive business websites and full-stack web applications.",
    audience: "Small businesses, startups, and teams that need a real online presence or an internal tool.",
    includes: [
      "Responsive business websites",
      "React / Next.js interfaces",
      "API and database integration",
      "Admin dashboards and forms",
      "Deployment and handover",
    ],
    deliverables: [
      "Live, deployed website with HTTPS",
      "Source code and a handover walkthrough",
      "Basic on-page SEO and sitemap",
      "Documentation for content edits",
    ],
    icon: "website",
  },
  {
    id: "ai-automation",
    title: "AI Assistants & Workflow Automation",
    tagline: "Practical AI assistants and automation for repetitive business tasks.",
    audience: "Businesses losing time to repetitive customer questions, lead intake, or manual workflows.",
    includes: [
      "Website chat assistants grounded in your content",
      "Lead and booking collection",
      "FAQ and support workflows",
      "Business-specific response logic",
      "Human handoff and escalation paths",
      "Integrations where supported and authorized",
    ],
    deliverables: [
      "Configured assistant with your knowledge base",
      "Conversation logging and a simple inbox",
      "Escalation routing to your team",
      "A clear boundary of what is automated vs. human",
    ],
    icon: "ai",
  },
  {
    id: "custom-software",
    title: "Custom Business Software",
    tagline: "Process-specific tools for inventory, orders, and internal operations.",
    audience: "Teams running operations on spreadsheets or disconnected tools.",
    includes: [
      "Inventory and order workflows",
      "Internal dashboards",
      "Role-based access",
      "Reporting and exports",
      "Process-specific tools",
    ],
    deliverables: [
      "Working software with role-based accounts",
      "Audit trail for critical actions",
      "Reports and exports",
      "Handover and operational documentation",
    ],
    icon: "software",
  },
  {
    id: "maintenance",
    title: "Technical Improvement & Maintenance",
    tagline: "Bug fixes, performance, security hygiene, and reliable updates.",
    audience: "Teams with an existing site or app that needs reliable, ongoing technical care.",
    includes: [
      "Bug fixes and feature updates",
      "Performance and accessibility improvements",
      "Security hygiene and dependency updates",
      "Deployment troubleshooting",
    ],
    deliverables: [
      "Diagnosis and fix notes per engagement",
      "Performance and accessibility quick wins",
      "Updated dependencies with regression checks",
      "Clear, time-boxed scope per task",
    ],
    icon: "maintenance",
  },
];
