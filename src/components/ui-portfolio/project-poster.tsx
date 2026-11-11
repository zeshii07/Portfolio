import { cn } from "@/lib/utils";

interface ProjectPosterProps {
  label: string;
  accent: string;
  category: string;
  className?: string;
  tone?: "ink" | "bone" | "violet" | "ultramarine";
  /** visual art style — each project gets unique art */
  variant?: "terminal" | "dashboard" | "mobile" | "network" | "cards";
}

/**
 * Fancy digital SVG art for each project.
 * No real images needed — each variant is a unique visual composition.
 * Always renders (no animation trapping).
 */
export function ProjectPoster({
  label,
  accent,
  category,
  className,
  tone = "ink",
  variant = "terminal",
}: ProjectPosterProps) {
  const bg =
    tone === "ink" ? "#101016"
    : tone === "violet" ? "#8B4DFF"
    : tone === "ultramarine" ? "#344BFF"
    : "#F6F1E8";
  const isDark = tone === "ink" || tone === "violet" || tone === "ultramarine";
  const text = isDark ? "#F6F1E8" : "#101016";
  const muted = isDark ? "rgba(246,241,232,0.5)" : "rgba(16,16,22,0.5)";
  const border = isDark ? "rgba(246,241,232,0.12)" : "rgba(16,16,22,0.10)";

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-xl border", className)}
      style={{ backgroundColor: bg, borderColor: border }}
      aria-hidden
    >
      {variant === "terminal" && <TerminalArt accent={accent} text={text} muted={muted} border={border} label={label} category={category} />}
      {variant === "dashboard" && <DashboardArt accent={accent} text={text} muted={muted} border={border} label={label} />}
      {variant === "mobile" && <MobileArt accent={accent} text={text} muted={muted} border={border} label={label} />}
      {variant === "network" && <NetworkArt accent={accent} text={text} muted={muted} border={border} label={label} />}
      {variant === "cards" && <CardsArt accent={accent} text={text} muted={muted} border={border} label={label} />}
    </div>
  );
}

/* === Terminal style — code editor mockup === */
function TerminalArt({ accent, text, muted, border, label, category }: any) {
  return (
    <>
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 400 300">
        <defs>
          <radialGradient id={`tg-${label}`} cx="70%" cy="20%" r="70%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#tg-${label})`} />
      </svg>
      {/* Window chrome */}
      <div className="absolute left-4 right-4 top-4 rounded-lg border" style={{ borderColor: border, background: "rgba(0,0,0,0.3)" }}>
        <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: border }}>
          <span className="size-2 rounded-full" style={{ background: "#FF603D" }} />
          <span className="size-2 rounded-full" style={{ background: "#D8FF3E" }} />
          <span className="size-2 rounded-full" style={{ background: "#5BE6D1" }} />
          <span className="ml-2 font-mono text-[10px]" style={{ color: muted }}>{label.toLowerCase().replace(/\s/g, "")}.ts</span>
        </div>
        <div className="space-y-1.5 px-3 py-3 font-mono text-[10px] leading-relaxed">
          <div style={{ color: muted }}><span style={{ color: accent }}>const</span> <span style={{ color: text }}>{label.toLowerCase().replace(/\s/g, "")}</span> <span style={{ color: muted }}>=</span> <span style={{ color: accent }}>async</span> () =&gt; {"{"}</div>
          <div className="pl-3" style={{ color: muted }}><span style={{ color: "#5BE6D1" }}>await</span> <span style={{ color: text }}>build</span>();</div>
          <div className="pl-3" style={{ color: muted }}>{"// "}{category}</div>
          <div style={{ color: muted }}>{"}"};</div>
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-3 left-4 rounded-md px-2 py-0.5 font-display text-xs font-bold" style={{ background: accent, color: "#101016" }}>{label}</div>
    </>
  );
}

/* === Dashboard style — charts and stats === */
function DashboardArt({ accent, text, muted, border, label }: any) {
  return (
    <>
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 400 300">
        <defs>
          <linearGradient id={`dg-${label}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#dg-${label})`} />
        {/* bar chart */}
        <g opacity="0.8">
          <rect x="30" y="180" width="24" height="80" fill={accent} rx="3" />
          <rect x="64" y="140" width="24" height="120" fill={accent} rx="3" opacity="0.8" />
          <rect x="98" y="100" width="24" height="160" fill={accent} rx="3" opacity="0.6" />
          <rect x="132" y="160" width="24" height="100" fill={accent} rx="3" opacity="0.5" />
        </g>
        {/* line chart */}
        <polyline points="180,220 220,180 260,200 300,120 340,160" fill="none" stroke="#D8FF3E" strokeWidth="2" opacity="0.7" />
        {/* dots */}
        <circle cx="180" cy="220" r="3" fill="#D8FF3E" opacity="0.7" />
        <circle cx="300" cy="120" r="4" fill="#D8FF3E" opacity="0.9" />
      </svg>
      {/* stats cards */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <div className="rounded-lg border px-3 py-2" style={{ borderColor: border, background: "rgba(0,0,0,0.3)" }}>
          <div className="font-mono text-[8px] uppercase tracking-wide" style={{ color: muted }}>Users</div>
          <div className="font-display text-sm font-bold" style={{ color: text }}>1,284</div>
        </div>
        <div className="rounded-lg border px-3 py-2" style={{ borderColor: border, background: "rgba(0,0,0,0.3)" }}>
          <div className="font-mono text-[8px] uppercase tracking-wide" style={{ color: muted }}>Growth</div>
          <div className="font-display text-sm font-bold" style={{ color: "#D8FF3E" }}>+62%</div>
        </div>
      </div>
      <div className="absolute bottom-3 left-4 rounded-md px-2 py-0.5 font-display text-xs font-bold" style={{ background: accent, color: "#101016" }}>{label}</div>
    </>
  );
}

/* === Mobile app style — phone mockup === */
function MobileArt({ accent, text, muted, border, label }: any) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 400 300">
        <defs>
          <radialGradient id={`mg-${label}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#mg-${label})`} />
      </svg>
      {/* Phone frame */}
      <div className="relative" style={{ width: "120px", height: "220px" }}>
        <div className="absolute inset-0 rounded-3xl border-2" style={{ borderColor: border, background: "rgba(0,0,0,0.4)" }}>
          {/* notch */}
          <div className="absolute left-1/2 top-2 h-1 w-12 -translate-x-1/2 rounded-full" style={{ background: muted }} />
          {/* screen content */}
          <div className="absolute inset-x-2 top-6 bottom-2 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="flex flex-col gap-2 p-2">
              <div className="h-8 rounded-lg" style={{ background: accent, opacity: 0.8 }} />
              <div className="space-y-1">
                <div className="h-2 rounded" style={{ background: muted }} />
                <div className="h-2 rounded w-3/4" style={{ background: muted }} />
                <div className="h-2 rounded w-1/2" style={{ background: muted }} />
              </div>
              <div className="mt-1 flex gap-1">
                <div className="h-6 flex-1 rounded-lg" style={{ background: "#D8FF3E", opacity: 0.7 }} />
                <div className="h-6 flex-1 rounded-lg" style={{ background: accent, opacity: 0.5 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-4 rounded-md px-2 py-0.5 font-display text-xs font-bold" style={{ background: accent, color: "#101016" }}>{label}</div>
    </div>
  );
}

/* === Network/security style — nodes and connections === */
function NetworkArt({ accent, text, muted, border, label }: any) {
  return (
    <>
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 400 300">
        <defs>
          <radialGradient id={`ng-${label}`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#ng-${label})`} />
        {/* connections */}
        <g opacity="0.4" stroke={accent} strokeWidth="1" fill="none">
          <line x1="80" y1="80" x2="200" y2="150" />
          <line x1="200" y1="150" x2="320" y2="80" />
          <line x1="200" y1="150" x2="120" y2="240" />
          <line x1="200" y1="150" x2="300" y2="240" />
          <line x1="80" y1="80" x2="120" y2="240" />
          <line x1="320" y1="80" x2="300" y2="240" />
        </g>
        {/* nodes */}
        <circle cx="80" cy="80" r="8" fill={accent} opacity="0.9" />
        <circle cx="200" cy="150" r="12" fill="#D8FF3E" opacity="0.9" />
        <circle cx="320" cy="80" r="8" fill="#5BE6D1" opacity="0.8" />
        <circle cx="120" cy="240" r="6" fill={accent} opacity="0.6" />
        <circle cx="300" cy="240" r="6" fill="#FF603D" opacity="0.7" />
        {/* pulse rings around center */}
        <circle cx="200" cy="150" r="24" fill="none" stroke="#D8FF3E" strokeWidth="1" opacity="0.3" />
        <circle cx="200" cy="150" r="40" fill="none" stroke="#D8FF3E" strokeWidth="1" opacity="0.15" />
      </svg>
      <div className="absolute bottom-3 left-4 rounded-md px-2 py-0.5 font-display text-xs font-bold" style={{ background: accent, color: "#101016" }}>{label}</div>
      <div className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-wide" style={{ color: muted }}>SECURE</div>
    </>
  );
}

/* === Cards style — bento grid === */
function CardsArt({ accent, text, muted, border, label }: any) {
  return (
    <>
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 400 300">
        <defs>
          <linearGradient id={`cg-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#cg-${label})`} />
      </svg>
      {/* bento grid */}
      <div className="absolute inset-4 grid grid-cols-3 gap-2">
        <div className="col-span-2 rounded-lg border" style={{ borderColor: border, background: "rgba(0,0,0,0.25)" }}>
          <div className="p-2">
            <div className="font-mono text-[8px] uppercase" style={{ color: muted }}>MAIN</div>
            <div className="mt-1 font-display text-sm font-bold" style={{ color: text }}>{label}</div>
          </div>
        </div>
        <div className="rounded-lg border" style={{ borderColor: border, background: accent, opacity: 0.8 }}>
          <div className="p-2"><div className="font-display text-lg font-bold" style={{ color: "#101016" }}>01</div></div>
        </div>
        <div className="rounded-lg border" style={{ borderColor: border, background: "rgba(0,0,0,0.25)" }}>
          <div className="p-2">
            <div className="font-mono text-[8px]" style={{ color: muted }}>API</div>
            <div className="mt-0.5 flex gap-0.5">
              <div className="h-1.5 w-full rounded" style={{ background: "#D8FF3E" }} />
              <div className="h-1.5 w-full rounded" style={{ background: muted }} />
              <div className="h-1.5 w-full rounded" style={{ background: muted }} />
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-lg border" style={{ borderColor: border, background: "rgba(0,0,0,0.25)" }}>
          <div className="flex h-full items-center justify-between p-2">
            <div className="font-mono text-[8px]" style={{ color: muted }}>DEPLOY</div>
            <div className="size-3 rounded-full" style={{ background: "#D8FF3E", boxShadow: "0 0 8px #D8FF3E" }} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-4 rounded-md px-2 py-0.5 font-display text-xs font-bold" style={{ background: accent, color: "#101016" }}>{label}</div>
    </>
  );
}
