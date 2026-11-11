import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "nova",
    title: "Nova",
    summary:
      "Multi-business assistant and automation platform that handles inbound messages, FAQ responses, and lead collection across configured businesses.",
    category: "AI & Automation",
    projectType: "personal",
    status: "In Progress",
    dateLabel: "2024 — Present",
    role: "Solo developer · Architecture, backend, dashboard, integrations",
    isFeatured: true,
    posterLabel: "Nova",
    posterAccent: "#8B4DFF",
    posterVariant: "dashboard",
    technologies: ["Next.js", "Node.js", "TypeScript", "LLM Integration", "REST API", "MySQL"],
    problem:
      "Small and growing businesses receive large volumes of repetitive customer questions across multiple channels. Owners spend hours answering the same FAQs, miss leads outside business hours, and lack a single view of every conversation.",
    solution:
      "Nova is a multi-tenant automation platform where each business can configure its own assistant behavior, FAQ knowledge, response tone, and escalation rules. Inbound messages are routed through a structured conversation flow that answers known questions, captures lead details, and escalates to a human when needed. A dashboard provides a unified inbox of conversations per business.",
    features: [
      {
        title: "Multi-tenant business configuration",
        description:
          "Each business is an isolated tenant with its own knowledge base, branding tokens, response templates, and escalation contacts.",
      },
      {
        title: "Structured conversation flow",
        description:
          "Messages are classified against intents and routed through a deterministic flow before any LLM generation, which keeps responses controllable and avoids hallucination on critical paths.",
      },
      {
        title: "FAQ + knowledge retrieval",
        description:
          "Business-specific FAQs and documents are indexed and retrieved as context for the model so answers are grounded in real information rather than invented.",
      },
      {
        title: "Lead capture and forwarding",
        description:
          "When a conversation qualifies a lead, structured details are saved and can be forwarded to the owner's preferred channel.",
      },
      {
        title: "Human handoff",
        description:
          "Conversations that exceed automated confidence thresholds or are flagged by the visitor are handed off to a human and surfaced in the dashboard inbox.",
      },
      {
        title: "Dashboard inbox",
        description:
          "Operators see open, pending, and resolved conversations per business, with conversation history and lead details.",
      },
      {
        title: "Audit logging",
        description:
          "Key state transitions, escalations, and configuration changes are logged for review and debugging.",
      },
      {
        title: "Roadmap: analytics and scheduling",
        description:
          "Analytics on conversation volume, deflection rate, and lead conversion are planned. Appointment scheduling is on the roadmap but not yet shipped.",
      },
    ],
    architecture: [
      {
        label: "Frontend",
        details:
          "Next.js App Router dashboard with role-based access. Operator UI for conversations, configuration, and lead review.",
      },
      {
        label: "Backend",
        details:
          "Node.js API layer handling inbound webhooks, conversation orchestration, tenant resolution, and dashboard endpoints.",
      },
      {
        label: "Conversation engine",
        details:
          "Intent classification followed by retrieval-augmented generation. Deterministic paths for known intents, LLM generation only for open-ended follow-ups.",
      },
      {
        label: "Database",
        details:
          "MySQL stores tenants, conversation state, leads, audit logs, and FAQ knowledge. Sensitive fields are access-controlled.",
      },
      {
        label: "Integrations",
        details:
          "Inbound channels via provider webhooks. Outbound notifications via the configured provider for the tenant.",
      },
      {
        label: "Hosting",
        details:
          "Deployed as a Node service behind a reverse proxy with TLS. Environment-locked secrets per deployment.",
      },
    ],
    stack: [
      {
        name: "Next.js + TypeScript",
        why: "App Router supports the dashboard and SSR pages; TypeScript keeps tenant and conversation models type-safe end-to-end.",
      },
      {
        name: "Node.js API layer",
        why: "A separate backend keeps webhooks and orchestration logic isolated from the dashboard bundle and easier to reason about.",
      },
      {
        name: "LLM integration with retrieval",
        why: "Pure generation risks hallucination; grounding responses in tenant FAQ knowledge keeps answers verifiable and safe.",
      },
      {
        name: "MySQL",
        why: "Relational structure fits tenants, conversations, leads, and audit logs cleanly and supports the access patterns we need today.",
      },
    ],
    challenges: [
      {
        challenge:
          "Preventing the assistant from inventing answers when a question is outside the business's configured knowledge.",
        alternatives:
          "Considered fully generative responses, prompt-only guardrails, and a rules-only engine with no LLM at all.",
        resolution:
          "Adopted retrieval-augmented generation with explicit confidence checks. When retrieval returns no usable context, the flow falls back to a safe message and human escalation rather than generating.",
      },
      {
        challenge:
          "Keeping tenant data isolated across a shared codebase and database.",
        alternatives:
          "Considered a database-per-tenant model and a separate deployment per business.",
        resolution:
          "Used a shared database with strict tenant_id scoping on every query and a repository layer that enforces tenant filtering. This keeps operations simple today and still allows splitting later if a tenant outgrows the shared model.",
      },
    ],
    outcome:
      "Nova currently supports multi-tenant configuration, structured conversation flows, FAQ retrieval, lead capture, and a dashboard inbox. Analytics, scheduling, and additional channel integrations are on the roadmap and clearly labeled as planned. The architecture is designed so each new channel or capability can be added without rewriting the conversation engine.",
    links: [
      { label: "Case study", href: "#", type: "article" },
      { label: "Repository (private)", href: "#", type: "private" },
    ],
  },
  {
    slug: "hirely-ai",
    title: "Hirely AI",
    summary:
      "Interview preparation and CV/resume tooling that helps candidates practice role-specific questions and improve their application materials. Built mobile-first.",
    category: "Mobile",
    projectType: "personal",
    status: "In Progress",
    dateLabel: "2024",
    role: "Solo developer · UX, frontend, AI integration",
    isFeatured: true,
    posterLabel: "Hirely",
    posterAccent: "#5BE6D1",
    posterVariant: "mobile",
    technologies: ["Next.js", "React", "TypeScript", "LLM Integration", "Tailwind CSS"],
    problem:
      "Candidates preparing for interviews struggle to find role-specific practice questions, get limited feedback on their answers, and rarely receive structured suggestions for improving their CV before applying.",
    solution:
      "Hirely AI provides a guided interview practice flow where candidates select a role, receive tailored questions, submit answers, and get structured feedback. A resume module reviews a candidate's CV against the target role and surfaces concrete improvement suggestions.",
    features: [
      {
        title: "Role-specific question bank",
        description:
          "Questions are organized by role and seniority, so candidates practice what they will actually be asked.",
      },
      {
        title: "Answer feedback",
        description:
          "Submitted answers receive structured feedback covering clarity, technical depth, and gaps to address.",
      },
      {
        title: "Resume review",
        description:
          "The CV module checks structure, role alignment, and concrete wording improvements, with suggestions the candidate can accept or ignore.",
      },
      {
        title: "Practice history",
        description:
          "Candidates can revisit past answers and feedback to track improvement over time.",
      },
      {
        title: "Responsive mobile UX",
        description:
          "Designed mobile-first so candidates can practice on the go without losing context.",
      },
      {
        title: "Roadmap: mock interview simulation",
        description:
          "A back-and-forth conversational mock interview mode is planned but not yet shipped.",
      },
    ],
    architecture: [
      {
        label: "Frontend",
        details:
          "Next.js App Router with mobile-first responsive UI. Practice and resume flows are designed as guided steps.",
      },
      {
        label: "AI layer",
        details:
          "Structured prompts generate question sets and answer feedback. Prompts are versioned so feedback quality is reproducible.",
      },
      {
        label: "Data handling",
        details:
          "Candidate-submitted CVs and answers are stored only as long as needed for the session and clearly disclosed in the in-app privacy notice.",
      },
      {
        label: "Hosting",
        details:
          "Deployed on a Next.js-compatible host with environment-isolated API keys.",
      },
    ],
    stack: [
      {
        name: "Next.js + TypeScript",
        why: "App Router supports both marketing and product flows in one project, and TypeScript keeps the question and feedback models consistent.",
      },
      {
        name: "Tailwind CSS",
        why: "Utility-first styling keeps the practice UI consistent across mobile and desktop without bespoke CSS per screen.",
      },
      {
        name: "LLM integration",
        why: "Used for question generation and answer feedback with structured prompts; never as a free-form chat that could leak candidate data.",
      },
    ],
    challenges: [
      {
        challenge:
          "Generating feedback that is actually useful rather than generic.",
        alternatives:
          "Considered rule-based scoring and fully free-form LLM feedback.",
        resolution:
          "Used structured prompts that force the model to return feedback in a fixed shape (strengths, gaps, suggested rewrite). This makes feedback actionable and reviewable.",
      },
      {
        challenge:
          "Handling candidate CV data responsibly.",
        alternatives:
          "Considered storing every submission indefinitely for analytics.",
        resolution:
          "CVs are processed for the session and not retained beyond what the candidate needs. The in-app privacy notice is explicit about this.",
      },
    ],
    outcome:
      "Hirely AI currently ships role-specific question banks, structured answer feedback, resume review, and practice history. The conversational mock interview mode is planned and clearly labeled. The product is built so new roles can be added without changing the practice engine.",
    links: [
      { label: "Live demo", href: "#", type: "live" },
      { label: "Repository (private)", href: "#", type: "private" },
    ],
  },
  {
    slug: "inventory-management-system",
    title: "Inventory Management System",
    summary:
      "Business software for tracking products, stock movements, and reporting with role-based access for store and admin users.",
    category: "Business Software",
    projectType: "academic",
    status: "Live",
    dateLabel: "2023",
    role: "Developer · Database design, backend, dashboard UI",
    isFeatured: true,
    posterLabel: "InvSys",
    posterAccent: "#D8FF3E",
    posterVariant: "cards",
    technologies: ["Node.js", "Express", "MySQL", "Oracle", "React", "REST API"],
    problem:
      "A small business tracked inventory manually in spreadsheets. Stock counts were often wrong, movements were not logged, and there was no clear separation between staff who could view stock and those who could adjust it.",
    solution:
      "A web-based inventory system with product records, stock movement history, role-based access, and reports. Staff can view and log movements; admins can adjust stock and manage products.",
    features: [
      {
        title: "Product records",
        description:
          "Each product has SKU, name, category, unit, and current stock level, with full edit history.",
      },
      {
        title: "Stock movements",
        description:
          "Every in/out movement is logged with quantity, reason, and responsible user, so the stock ledger is always traceable.",
      },
      {
        title: "Role-based access",
        description:
          "Staff can log movements and view stock. Admins can manage products, perform stock adjustments, and run reports.",
      },
      {
        title: "Low-stock alerts",
        description:
          "Products below their configured threshold are flagged on the dashboard and in reports.",
      },
      {
        title: "Reports and exports",
        description:
          "Movement summaries and current stock reports can be filtered by date and category and exported.",
      },
      {
        title: "Audit trail",
        description:
          "Critical actions (product edits, stock adjustments, role changes) are recorded with user and timestamp.",
      },
    ],
    architecture: [
      {
        label: "Frontend",
        details:
          "React dashboard with role-aware navigation. Forms are validated both client and server side.",
      },
      {
        label: "Backend",
        details:
          "Node.js + Express REST API. Routes enforce authorization based on the user's role.",
      },
      {
        label: "Database",
        details:
          "MySQL primary store for products, movements, users, and audit log. An Oracle schema mirror was used in an academic module for SQL coursework.",
      },
      {
        label: "Auth",
        details:
          "Session-based auth with HTTP-only cookies. Passwords hashed with a modern hashing algorithm.",
      },
    ],
    stack: [
      {
        name: "Node.js + Express",
        why: "A small REST API with clear routes fits inventory operations and lets the dashboard and future integrations share one backend.",
      },
      {
        name: "MySQL",
        why: "Relational tables map cleanly to products, movements, users, and audit logs; transactions keep stock updates consistent.",
      },
      {
        name: "React",
        why: "Component-based UI keeps forms, tables, and reports consistent and easy to maintain.",
      },
    ],
    challenges: [
      {
        challenge:
          "Keeping stock counts correct when multiple movements happen close together.",
        alternatives:
          "Considered updating stock with a single UPDATE statement per movement without a transaction.",
        resolution:
          "Wrapped each movement in a transaction that inserts the movement row and updates the product's stock atomically, so partial failures cannot leave the ledger inconsistent.",
      },
      {
        challenge:
          "Enforcing that staff can log movements but only admins can adjust stock.",
        alternatives:
          "Considered hiding UI elements only.",
        resolution:
          "Authorization is enforced on the backend on every route, not just hidden in the UI. The UI reflects permissions, but cannot grant them.",
      },
    ],
    outcome:
      "The system replaced spreadsheet tracking with a traceable stock ledger, role-based access, and reports. Manual counting errors dropped, and stock movements became auditable. The project also served as the basis for academic database coursework using Oracle SQL.",
    links: [
      { label: "Repository", href: "#", type: "github" },
    ],
  },
  {
    slug: "client-websites",
    title: "Client Websites & E-commerce",
    summary:
      "Delivered responsive business websites and e-commerce frontends for clients, including deployment, SEO basics, and handover.",
    category: "Full-stack",
    projectType: "client",
    status: "Live",
    dateLabel: "2022 — 2024",
    role: "Frontend developer · Design implementation, deployment, SEO basics",
    isFeatured: true,
    posterLabel: "Web",
    posterAccent: "#FF603D",
    posterVariant: "terminal",
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO", "Deployment"],
    problem:
      "Small businesses needed fast, mobile-friendly websites they could maintain, with basics like meta tags, sitemaps, and contact routes set up correctly from day one.",
    solution:
      "Delivered responsive websites built with React/Next.js and Tailwind. Each site was deployed, configured with sitemap and robots, basic on-page SEO, and handed over with documentation.",
    features: [
      {
        title: "Responsive layouts",
        description:
          "Mobile-first layouts tested at common breakpoints; no horizontal overflow on small screens.",
      },
      {
        title: "On-page SEO basics",
        description:
          "Per-page titles, meta descriptions, Open Graph tags, semantic headings, and a sitemap.",
      },
      {
        title: "Contact routes",
        description:
          "Working contact forms with validation and a safe submission flow.",
      },
      {
        title: "Deployment and handover",
        description:
          "Sites deployed with TLS; documentation covers content updates so the client can edit copy without a developer.",
      },
      {
        title: "Performance hygiene",
        description:
          "Image optimization, lazy loading below the fold, and limited client-side JavaScript.",
      },
    ],
    architecture: [
      {
        label: "Frontend",
        details: "React / Next.js with Tailwind CSS for maintainable styling.",
      },
      {
        label: "SEO",
        details: "Metadata, sitemap, robots, Open Graph, and semantic HTML landmarks.",
      },
      {
        label: "Deployment",
        details: "Hosted on a Next.js-compatible platform with TLS and CI-friendly builds.",
      },
    ],
    stack: [
      {
        name: "Next.js + Tailwind",
        why: "Fast to deliver responsive, SEO-friendly sites that clients can extend later.",
      },
      {
        name: "Static + server routes",
        why: "Marketing pages stay static for speed; the contact form uses a small server route.",
      },
    ],
    challenges: [
      {
        challenge:
          "Clients wanting heavy animations that would hurt performance and mobile usability.",
        alternatives:
          "Considered shipping the animations as requested.",
        resolution:
          "Proposed lightweight motion for key interactions and explained the trade-off in plain language. Clients accepted the lighter approach once they saw the speed difference on mobile.",
      },
    ],
    outcome:
      "Client sites load fast, work on mobile, and are easy to maintain. Specific client names and screenshots are not displayed publicly without permission; this card summarizes the type of work delivered. Live public links are shared only where the client has agreed.",
    links: [
      { label: "Contact for references", href: "#contact", type: "live" },
    ],
  },
  {
    slug: "network-security-lab",
    title: "Network & Security Lab Work",
    summary:
      "Hands-on lab work in networking, vulnerability scanning, and ethical hacking concepts in controlled environments.",
    category: "Cybersecurity / Networking",
    projectType: "personal",
    status: "Prototype",
    dateLabel: "2023 — 2024",
    role: "Practitioner · Lab exercises, write-ups",
    isFeatured: false,
    posterLabel: "Sec",
    posterAccent: "#F16B75",
    posterVariant: "network",
    technologies: ["Networking", "Nmap", "Wireshark", "Linux", "Bash"],
    problem:
      "Theory alone does not build operational security intuition. To genuinely understand networking and security, hands-on practice in controlled environments is essential.",
    solution:
      "A personal practice lab covering network scanning, packet analysis, common vulnerability identification, and hardening basics — all in isolated environments with no real targets.",
    features: [
      {
        title: "Network mapping",
        description:
          "Used Nmap in lab VMs to map hosts, identify services, and document findings.",
      },
      {
        title: "Packet analysis",
        description:
          "Captured and analyzed traffic with Wireshark to understand protocols and spot anomalies.",
      },
      {
        title: "Vulnerability identification",
        description:
          "Identified common misconfigurations and known vulnerabilities in lab targets and wrote short remediation notes.",
      },
      {
        title: "Hardening basics",
        description:
          "Practiced baseline hardening on Linux hosts: SSH config, firewall rules, user management.",
      },
      {
        title: "Write-ups",
        description:
          "Each exercise is documented with what was tested, what was found, and what was learned.",
      },
    ],
    architecture: [
      {
        label: "Environment",
        details: "Isolated lab VMs on a private host-only network. No production or third-party targets.",
      },
      {
        label: "Tools",
        details: "Nmap, Wireshark, Burp basics, Linux command-line utilities.",
      },
      {
        label: "Documentation",
        details: "Markdown write-ups per exercise with methodology, findings, and remediation notes.",
      },
    ],
    stack: [
      {
        name: "Linux + Bash",
        why: "Standard environment for security work; scripting automates repetitive scans and parses output.",
      },
      {
        name: "Nmap + Wireshark",
        why: "Industry-standard tooling for network discovery and packet-level analysis.",
      },
    ],
    challenges: [
      {
        challenge:
          "Translating theoretical vulnerabilities into actual hands-on understanding.",
        alternatives:
          "Considered reading only, without practicing.",
        resolution:
          "Built a repeatable lab where each concept is practiced and documented. The write-ups turned each exercise into a reference for future review.",
      },
    ],
    outcome:
      "The lab work built practical intuition for networking and security that complements the development work. It directly informs how I write and review application code: input validation, authorization, secrets handling, and safe defaults.",
    links: [
      { label: "Notes (private)", href: "#", type: "private" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories = [
  "All",
  "Full-stack",
  "AI & Automation",
  "Mobile",
  "Business Software",
  "Cybersecurity / Networking",
] as const;
