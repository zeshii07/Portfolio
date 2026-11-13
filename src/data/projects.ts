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
    /**
     * Headline metrics shown on the Nova case study. Every figure
     * is illustrative dashboard / projected data — NOT a real
     * production measurement. `isDemoData: true` forces the UI
     * to render a visible "Demo Data" disclaimer badge alongside
     * these numbers so they are never mistaken for customer results.
     */
    stats: [
      { label: "Conversations handled", value: "1,284", isDemoData: true, note: "Illustrative dashboard volume — not a live customer figure." },
      { label: "Deflection rate", value: "62%", isDemoData: true, note: "Simulated metric shown on the demo dashboard." },
      { label: "Leads captured", value: "84", isDemoData: true, note: "Illustrative lead count from the demo tenant." },
      { label: "Active tenants (demo)", value: "5", isDemoData: true, note: "Demo tenants configured for the showcase build." },
      { label: "Projected growth", value: "+62%", isDemoData: true, note: "Projected, not measured. Shown only as a target." },
    ],
    screenshots: [
      { src: "/projects/nova/dashboard.png", caption: "Operator dashboard inbox — per-tenant conversations, status, lead tags.", placeholder: true },
      { src: "/projects/nova/tenant-config.png", caption: "Tenant configuration panel — branding tokens, escalation contacts, response tone.", placeholder: true },
      { src: "/projects/nova/lead-detail.png", caption: "Lead detail drawer — captured structured fields and forward action.", placeholder: true },
    ],
    showArchitectureDiagram: true,
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
    screenshots: [
      { src: "/projects/hirely/practice.png", caption: "Practice flow — role selection, question card, answer input.", placeholder: true },
      { src: "/projects/hirely/feedback.png", caption: "Structured answer feedback — strengths, gaps, suggested rewrite.", placeholder: true },
      { src: "/projects/hirely/resume.png", caption: "Resume review module — role alignment and concrete wording suggestions.", placeholder: true },
    ],
    showArchitectureDiagram: true,
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
    screenshots: [
      { src: "/projects/inventory/dashboard.png", caption: "Stock dashboard — current levels, low-stock alerts, recent movements.", placeholder: true },
      { src: "/projects/inventory/movement.png", caption: "Stock movement form — quantity, reason, responsible user, audit trail.", placeholder: true },
      { src: "/projects/inventory/reports.png", caption: "Movement summary report — filter by date and category, export.", placeholder: true },
    ],
    showArchitectureDiagram: true,
    links: [
      { label: "Repository", href: "#", type: "github" },
    ],
  },
  /**
   * Client website — ZAIS Technologies.
   * Live at https://zaishtech.vercel.app
   * One of three concrete client deliveries shown on the portfolio
   * (replaces the previous generic "Client Websites" card that
   * the audit flagged as needing specific evidence).
   */
  {
    slug: "client-zaishtech",
    title: "ZAIS Technologies — Business Website",
    summary:
      "Delivered responsive business website for ZAIS Technologies with deployment, on-page SEO, and handover. Live at zaishtech.vercel.app.",
    category: "Full-stack",
    projectType: "client",
    status: "Live",
    dateLabel: "2024",
    role: "Frontend developer · Design implementation, deployment, SEO",
    isFeatured: true,
    posterLabel: "ZAIS",
    posterAccent: "#FF603D",
    posterVariant: "terminal",
    technologies: ["Next.js", "React", "Tailwind CSS", "SEO", "Vercel"],
    problem:
      "ZAIS Technologies needed a fast, mobile-friendly business website they could maintain in-house, with meta tags, sitemap, and contact routes configured from day one.",
    solution:
      "Delivered a responsive Next.js + Tailwind site deployed on Vercel. On-page SEO (titles, meta descriptions, Open Graph, semantic headings) was set up per page, plus a working contact route with server-side validation.",
    features: [
      {
        title: "Responsive layouts",
        description:
          "Mobile-first layouts tested at common breakpoints; no horizontal overflow on small screens.",
      },
      {
        title: "On-page SEO",
        description:
          "Per-page titles, meta descriptions, Open Graph tags, semantic headings, and a generated sitemap.",
      },
      {
        title: "Contact route",
        description:
          "Working contact form with server-side validation and a safe submission flow.",
      },
      {
        title: "Deployment + handover",
        description:
          "Deployed on Vercel with TLS; documentation covers content updates so the client can edit copy without a developer.",
      },
      {
        title: "Performance hygiene",
        description:
          "Image optimization, lazy loading below the fold, and limited client-side JavaScript.",
      },
    ],
    architecture: [
      { label: "Frontend", details: "Next.js App Router with Tailwind CSS for maintainable styling." },
      { label: "SEO", details: "Metadata, sitemap, robots, Open Graph, and semantic HTML landmarks." },
      { label: "Deployment", details: "Hosted on Vercel with TLS and CI-friendly builds." },
    ],
    stack: [
      { name: "Next.js + Tailwind", why: "Fast to deliver responsive, SEO-friendly sites the client can extend later." },
      { name: "Vercel", why: "Zero-config Next.js hosting with edge TLS, image optimization, and PR previews." },
    ],
    challenges: [
      {
        challenge: "Balancing a polished visual identity with mobile load time.",
        alternatives: "Considered shipping heavier animations as originally requested.",
        resolution:
          "Proposed lightweight motion for key interactions and explained the trade-off in plain language. Client accepted the lighter approach once they saw the mobile speed difference.",
      },
    ],
    outcome:
      "ZAIS Technologies' site is live, mobile-fast, SEO-configured, and maintainable in-house. The live deployment is linked below.",
    screenshots: [
      { src: "/projects/zaishtech/home.png", caption: "Homepage — hero, services overview, primary CTA.", placeholder: true },
      { src: "/projects/zaishtech/services.png", caption: "Services page — capability sections and contact route.", placeholder: true },
      { src: "/projects/zaishtech/mobile.png", caption: "Mobile view — responsive layout at common breakpoints.", placeholder: true },
    ],
    links: [
      { label: "Live website", href: "https://zaishtech.vercel.app", type: "live" },
    ],
  },
  /**
   * Client website — Lucky Crystal.
   * Live at https://lucky-crystal.infinityfree.me
   */
  {
    slug: "client-lucky-crystal",
    title: "Lucky Crystal — E-commerce Frontend",
    summary:
      "Delivered e-commerce frontend for Lucky Crystal with product browsing, responsive layout, and deployment. Live at lucky-crystal.infinityfree.me.",
    category: "Full-stack",
    projectType: "client",
    status: "Live",
    dateLabel: "2023",
    role: "Frontend developer · Product UI, responsive layout, deployment",
    isFeatured: true,
    posterLabel: "Crystal",
    posterAccent: "#5BE6D1",
    posterVariant: "cards",
    technologies: ["React", "Tailwind CSS", "Responsive UI", "PHP host", "SEO basics"],
    problem:
      "Lucky Crystal needed an online product catalog that worked on low-end mobile devices and loaded quickly on shared hosting.",
    solution:
      "Built a lightweight product catalog frontend with React + Tailwind, optimized for low-bandwidth mobile access. Deployed on a shared PHP host with handover documentation for content updates.",
    features: [
      {
        title: "Product catalog UI",
        description:
          "Browseable product grid with categories, search, and detail pages optimized for mobile.",
      },
      {
        title: "Low-bandwidth mobile UX",
        description:
          "Compressed images, minimal client JS, and deferred non-critical assets so pages load on slow connections.",
      },
      {
        title: "Responsive layout",
        description:
          "Mobile-first layout that adapts cleanly from small phones to desktop.",
      },
      {
        title: "Shared-host deployment",
        description:
          "Static-build output deployed to a PHP shared host with handover notes for content edits.",
      },
    ],
    architecture: [
      { label: "Frontend", details: "React + Tailwind CSS compiled to a static build for shared-host deployment." },
      { label: "Hosting", details: "Deployed on InfinityFree shared PHP hosting with TLS where available." },
    ],
    stack: [
      { name: "React + Tailwind", why: "Lightweight component UI that compiles to static assets suitable for shared hosting." },
      { name: "Static build", why: "No server runtime required — keeps cost low and works on shared PHP hosts." },
    ],
    challenges: [
      {
        challenge: "Shared hosting constraints — no Node.js runtime, limited server config.",
        alternatives: "Considered a Node-based server deployment.",
        resolution:
          "Compiled the frontend to static assets so it could be served from a PHP shared host without runtime requirements, while still keeping the React component model for the build.",
      },
    ],
    outcome:
      "Lucky Crystal's catalog is live on shared hosting, accessible on low-end mobile devices, and maintainable by the client. The live deployment is linked below.",
    screenshots: [
      { src: "/projects/lucky-crystal/catalog.png", caption: "Product catalog — grid with category filter.", placeholder: true },
      { src: "/projects/lucky-crystal/detail.png", caption: "Product detail page with image, description, and inquiry CTA.", placeholder: true },
      { src: "/projects/lucky-crystal/mobile.png", caption: "Mobile catalog view — low-bandwidth optimized.", placeholder: true },
    ],
    links: [
      { label: "Live website", href: "https://lucky-crystal.infinityfree.me", type: "live" },
    ],
  },
  /**
   * Client website — BYT Clean.
   * Live at https://bytclean.ae
   */
  {
    slug: "client-bytclean",
    title: "BYT Clean — Services Website",
    summary:
      "Delivered services website for BYT Clean (UAE) with booking contact flow, responsive layout, and deployment. Live at bytclean.ae.",
    category: "Full-stack",
    projectType: "client",
    status: "Live",
    dateLabel: "2024",
    role: "Frontend developer · Services UI, booking route, deployment",
    isFeatured: true,
    posterLabel: "BYT",
    posterAccent: "#D8FF3E",
    posterVariant: "mobile",
    technologies: ["Next.js", "React", "Tailwind CSS", "SEO", "Vercel"],
    problem:
      "BYT Clean (a UAE cleaning services business) needed a mobile-first services website that turned visitors into booking inquiries, with Arabic-English audience considerations and proper SEO for the .ae market.",
    solution:
      "Delivered a responsive Next.js + Tailwind services website deployed on Vercel. Service pages, an inquiry contact route with server-side validation, per-page SEO for the .ae market, and handover documentation for content updates.",
    features: [
      {
        title: "Services pages",
        description:
          "Per-service pages with clear scope, pricing tier guidance, and an inquiry CTA — designed mobile-first.",
      },
      {
        title: "Booking inquiry route",
        description:
          "Working contact/inquiry form with server-side validation and a safe submission flow.",
      },
      {
        title: "Local SEO (.ae)",
        description:
          "Per-page titles, meta descriptions, Open Graph, semantic headings, sitemap, and region-aware metadata.",
      },
      {
        title: "Deployment + handover",
        description:
          "Deployed on Vercel with TLS; documentation covers content updates so the client can edit copy without a developer.",
      },
    ],
    architecture: [
      { label: "Frontend", details: "Next.js App Router + Tailwind CSS for maintainable, mobile-first styling." },
      { label: "SEO", details: "Metadata, sitemap, robots, Open Graph, semantic HTML, and .ae region-aware tags." },
      { label: "Deployment", details: "Hosted on Vercel with TLS and CI-friendly builds." },
    ],
    stack: [
      { name: "Next.js + Tailwind", why: "Mobile-first services UI with fast initial load and clean per-page SEO." },
      { name: "Vercel", why: "Edge TLS, image optimization, and PR previews for an iterative launch." },
    ],
    challenges: [
      {
        challenge: "Designing a booking flow that worked for both quick mobile visitors and detail-oriented desktop users.",
        alternatives: "Considered a long single-page form.",
        resolution:
          "Split into a short inquiry form (mobile-friendly) plus a service-detail page (desktop-friendly), with the same server route behind both — so submissions are validated consistently regardless of entry point.",
      },
    ],
    outcome:
      "BYT Clean's services site is live on bytclean.ae, mobile-fast, SEO-configured for the UAE market, and maintainable in-house. The live deployment is linked below.",
    screenshots: [
      { src: "/projects/bytclean/home.png", caption: "Homepage — services overview, hero, primary booking CTA.", placeholder: true },
      { src: "/projects/bytclean/service.png", caption: "Service detail page — scope, pricing tier, inquiry form.", placeholder: true },
      { src: "/projects/bytclean/mobile.png", caption: "Mobile view — short inquiry form optimized for touch.", placeholder: true },
    ],
    links: [
      { label: "Live website", href: "https://bytclean.ae", type: "live" },
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
