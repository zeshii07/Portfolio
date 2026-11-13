/**
 * Inline SVG architecture diagram for the Nova case study.
 *
 * Pure SVG (no external assets) so it renders in print / SSR /
 * reduced-motion contexts. Diagram is illustrative of the
 * multi-tenant RAG-assistant architecture described in the
 * Nova case study — not a deployment-specific network map.
 */
export type ArchitectureDiagramVariant = "nova" | "hirely" | "inventory" | "client" | "generic";

interface ArchitectureDiagramProps {
  variant?: ArchitectureDiagramVariant;
  className?: string;
  /** Accessible label for screen readers. */
  title?: string;
}

export function ArchitectureDiagram({
  variant = "generic",
  className,
  title,
}: ArchitectureDiagramProps) {
  const label =
    title ?? `${variant === "generic" ? "Project" : variant} architecture diagram`;

  if (variant === "nova") return <NovaArch className={className} title={label} />;
  if (variant === "hirely") return <HirelyArch className={className} title={label} />;
  if (variant === "inventory") return <InventoryArch className={className} title={label} />;
  if (variant === "client") return <ClientArch className={className} title={label} />;
  return <GenericArch className={className} title={label} />;
}

// ─── Nova ────────────────────────────────────────────────────────
// Multi-tenant assistant platform: channels → tenant resolution →
// conversation engine (intent → RAG → LLM fallback) → MySQL +
// dashboard inbox.
function NovaArch({ className, title }: { className?: string; title: string }) {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 920 480"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="nova-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B4DFF" />
          <stop offset="100%" stopColor="#5BE6D1" />
        </linearGradient>
        <marker id="arrow-nova" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#8B4DFF" />
        </marker>
      </defs>

      {/* Layer labels */}
      <LayerLabel x={20} y={50} text="Channels" />
      <LayerLabel x={210} y={50} text="Tenant router" />
      <LayerLabel x={420} y={50} text="Conversation engine" />
      <LayerLabel x={720} y={50} text="Persistence" />
      <LayerLabel x={20} y={300} text="Dashboard" />

      {/* Channel nodes */}
      <Node x={30} y={90} w={140} h={70} fill="#1B1B26" stroke="#8B4DFF" label="Web widget" sub="per-tenant embed" />
      <Node x={30} y={180} w={140} h={70} fill="#1B1B26" stroke="#8B4DFF" label="WhatsApp" sub="provider webhook" />
      <Node x={30} y={270} w={140} h={70} fill="#1B1B26" stroke="#8B4DFF" label="Other channels" sub="pluggable adapters" />

      {/* Tenant router */}
      <Node x={220} y={170} w={160} h={100} fill="#2A2A3A" stroke="#8B4DFF" label="Tenant resolver" sub="resolve tenant_id\nbranding tokens\nescalation rules" multiline />

      {/* Conversation engine — vertical column */}
      <Node x={430} y={80} w={260} h={60} fill="#2A2A3A" stroke="#5BE6D1" label="Intent classifier" sub="deterministic paths first" />
      <Node x={430} y={160} w={260} h={60} fill="#2A2A3A" stroke="#5BE6D1" label="FAQ + RAG retrieval" sub="tenant-scoped knowledge" />
      <Node x={430} y={240} w={260} h={60} fill="#2A2A3A" stroke="#5BE6D1" label="LLM fallback" sub="only when retrieval empty" />
      <Node x={430} y={320} w={260} h={60} fill="#2A2A3A" stroke="#F16B75" label="Human handoff" sub="escalation queue" />

      {/* Persistence */}
      <Node x={730} y={90} w={170} h={70} fill="#101016" stroke="#D8FF3E" label="MySQL" sub="tenants · conversations\nleads · audit log" multiline />
      <Node x={730} y={200} w={170} h={70} fill="#101016" stroke="#D8FF3E" label="Knowledge store" sub="per-tenant FAQ + docs" />
      <Node x={730} y={310} w={170} h={70} fill="#101016" stroke="#D8FF3E" label="Audit log" sub="state transitions" />

      {/* Dashboard inbox */}
      <Node x={30} y={340} w={340} h={70} fill="#1B1B26" stroke="#5BE6D1" label="Operator dashboard — per-tenant inbox, lead review, escalation" sub="Next.js App Router · role-based access" />

      {/* Flow arrows */}
      <Flow x1={170} y1={125} x2={220} y2={200} />
      <Flow x1={170} y1={215} x2={220} y2={220} />
      <Flow x1={170} y1={305} x2={220} y2={245} />
      <Flow x1={380} y1={210} x2={430} y2={110} />
      <Flow x1={380} y1={220} x2={430} y2={190} />
      <Flow x1={380} y1={230} x2={430} y2={270} />
      <Flow x1={560} y1={140} x2={560} y2={160} />
      <Flow x1={560} y1={220} x2={560} y2={240} />
      <Flow x1={560} y1={300} x2={560} y2={320} />
      <Flow x1={690} y1={110} x2={730} y2={125} />
      <Flow x1={690} y1={190} x2={730} y2={235} />
      <Flow x1={690} y1={270} x2={730} y2={345} />
      <Flow x1={370} y1={375} x2={430} y2={375} dashed />
    </svg>
  );
}

// ─── Hirely AI ───────────────────────────────────────────────────
function HirelyArch({ className, title }: { className?: string; title: string }) {
  return (
    <svg role="img" aria-label={title} viewBox="0 0 920 360" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <marker id="arrow-hirely" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#5BE6D1" />
        </marker>
      </defs>

      <LayerLabel x={20} y={40} text="Candidate UI" />
      <LayerLabel x={260} y={40} text="Guided flows" />
      <LayerLabel x={560} y={40} text="AI layer" />
      <LayerLabel x={780} y={40} text="Session store" />

      <Node x={30} y={70} w={180} h={60} fill="#2A2A3A" stroke="#5BE6D1" label="Practice flow" sub="role + question card" />
      <Node x={30} y={150} w={180} h={60} fill="#2A2A3A" stroke="#5BE6D1" label="Resume review" sub="CV upload + role target" />
      <Node x={30} y={230} w={180} h={60} fill="#2A2A3A" stroke="#5BE6D1" label="Practice history" sub="past answers + feedback" />

      <Node x={270} y={110} w={200} h={80} fill="#1B1B26" stroke="#8B4DFF" label="Guided flow router" sub="structured step\norchestration" multiline />
      <Node x={560} y={70} w={180} h={70} fill="#101016" stroke="#8B4DFF" label="Prompt: question gen" sub="versioned" />
      <Node x={560} y={160} w={180} h={70} fill="#101016" stroke="#8B4DFF" label="Prompt: feedback" sub="strengths · gaps · rewrite" />
      <Node x={560} y={250} w={180} h={70} fill="#101016" stroke="#8B4DFF" label="Prompt: CV review" sub="role alignment" />
      <Node x={780} y={130} w={120} h={100} fill="#101016" stroke="#D8FF3E" label="Session data" sub="cleared after\nsession" multiline />

      <Flow x1={210} y1={100} x2={270} y2={140} />
      <Flow x1={210} y1={180} x2={270} y2={170} />
      <Flow x1={210} y1={260} x2={270} y2={190} />
      <Flow x1={470} y1={130} x2={560} y2={105} />
      <Flow x1={470} y1={150} x2={560} y2={195} />
      <Flow x1={470} y1={170} x2={560} y2={285} />
      <Flow x1={740} y1={105} x2={780} y2={160} />
      <Flow x1={740} y1={195} x2={780} y2={180} />
    </svg>
  );
}

// ─── Inventory ───────────────────────────────────────────────────
function InventoryArch({ className, title }: { className?: string; title: string }) {
  return (
    <svg role="img" aria-label={title} viewBox="0 0 920 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <marker id="arrow-inv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#D8FF3E" />
        </marker>
      </defs>

      <LayerLabel x={20} y={40} text="Client" />
      <LayerLabel x={210} y={40} text="Frontend" />
      <LayerLabel x={460} y={40} text="REST API" />
      <LayerLabel x={720} y={40} text="Database" />

      <Node x={30} y={70} w={150} h={80} fill="#2A2A3A" stroke="#5BE6D1" label="React dashboard" sub="role-aware nav\nclient+server validation" multiline />
      <Node x={210} y={70} w={220} h={80} fill="#1B1B26" stroke="#8B4DFF" label="Role-aware UI" sub="staff view · admin view" />
      <Node x={460} y={70} w={240} h={80} fill="#101016" stroke="#FF603D" label="Express REST API" sub="authz enforced per route\nHTTP-only session cookie" multiline />
      <Node x={720} y={70} w={180} h={80} fill="#101016" stroke="#D8FF3E" label="MySQL" sub="products · movements\nusers · audit" multiline />

      <Node x={30} y={200} w={870} h={60} fill="#1B1B26" stroke="#5BE6D1" label="Transactional movement write: INSERT movement row + UPDATE product stock — atomic, all-or-nothing" />

      <Flow x1={180} y1={110} x2={210} y2={110} />
      <Flow x1={430} y1={110} x2={460} y2={110} />
      <Flow x1={700} y1={110} x2={720} y2={110} />
      <Flow x1={580} y1={150} x2={460} y2={200} dashed />
    </svg>
  );
}

// ─── Client website ──────────────────────────────────────────────
function ClientArch({ className, title }: { className?: string; title: string }) {
  return (
    <svg role="img" aria-label={title} viewBox="0 0 920 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <marker id="arrow-client" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#FF603D" />
        </marker>
      </defs>

      <LayerLabel x={20} y={40} text="Visitor" />
      <LayerLabel x={210} y={40} text="Frontend" />
      <LayerLabel x={520} y={40} text="Server route" />
      <LayerLabel x={760} y={40} text="Hosting" />

      <Node x={30} y={70} w={160} h={80} fill="#2A2A3A" stroke="#5BE6D1" label="Browser" sub="mobile-first" />
      <Node x={210} y={70} w={290} h={80} fill="#1B1B26" stroke="#8B4DFF" label="Next.js + Tailwind" sub="responsive layout\nlazy-loaded images" multiline />
      <Node x={520} y={70} w={220} h={80} fill="#101016" stroke="#FF603D" label="Contact route" sub="server-side validation\nhoneypot · rate-limited" multiline />
      <Node x={760} y={70} w={140} h={80} fill="#101016" stroke="#D8FF3E" label="Vercel" sub="TLS · CDN\nimage opt" multiline />

      <Node x={30} y={190} w={870} h={60} fill="#1B1B26" stroke="#5BE6D1" label="Per-page SEO: titles · meta · OG · semantic HTML · sitemap · robots" />

      <Flow x1={190} y1={110} x2={210} y2={110} />
      <Flow x1={500} y1={110} x2={520} y2={110} />
      <Flow x1={740} y1={110} x2={760} y2={110} />
    </svg>
  );
}

// ─── Generic fallback ────────────────────────────────────────────
function GenericArch({ className, title }: { className?: string; title: string }) {
  return (
    <svg role="img" aria-label={title} viewBox="0 0 920 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <Node x={30} y={80} w={180} h={80} fill="#1B1B26" stroke="#8B4DFF" label="Frontend" sub="React / Next.js" />
      <Node x={370} y={80} w={180} h={80} fill="#1B1B26" stroke="#FF603D" label="Backend" sub="Node.js · REST API" />
      <Node x={710} y={80} w={180} h={80} fill="#1B1B26" stroke="#D8FF3E" label="Database" sub="MySQL / PostgreSQL" />
      <Flow x1={210} y1={120} x2={370} y2={120} />
      <Flow x1={550} y1={120} x2={710} y2={120} />
    </svg>
  );
}

// ─── Primitives ──────────────────────────────────────────────────
function Node({
  x, y, w, h, fill, stroke, label, sub, multiline,
}: {
  x: number; y: number; w: number; h: number;
  fill: string; stroke: string;
  label: string; sub?: string; multiline?: boolean;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + (sub ? 28 : h / 2 + 5)} textAnchor="middle" fill="#F6F1E8" fontFamily="Space Grotesk, sans-serif" fontSize={14} fontWeight={600}>
        {label}
      </text>
      {sub ? (
        multiline ? (
          <MultiLineText x={x + w / 2} y={y + 50} text={sub} />
        ) : (
          <text x={x + w / 2} y={y + 48} textAnchor="middle" fill="#9CA3B0" fontFamily="JetBrains Mono, monospace" fontSize={10}>
            {sub}
          </text>
        )
      ) : null}
    </g>
  );
}

function MultiLineText({ x, y, text }: { x: number; y: number; text: string }) {
  const lines = text.split("\n");
  return (
    <text x={x} y={y} textAnchor="middle" fill="#9CA3B0" fontFamily="JetBrains Mono, monospace" fontSize={10}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>{line}</tspan>
      ))}
    </text>
  );
}

function LayerLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fill="#6b6b6b" fontFamily="JetBrains Mono, monospace" fontSize={9} fontWeight={500} letterSpacing={2}>
      {text.toUpperCase()}
    </text>
  );
}

function Flow({ x1, y1, x2, y2, dashed }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="#8B4DFF"
      strokeWidth={1.5}
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd="url(#arrow-nova)"
      opacity={0.7}
    />
  );
}
