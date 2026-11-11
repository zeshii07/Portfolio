import { cn } from "@/lib/utils";

interface ProjectPosterProps {
  label: string;
  accent: string;
  category: string;
  className?: string;
}

/**
 * A self-contained SVG "screenshot stand-in" for a project.
 * Avoids fake dashboards and stock imagery; instead renders a stylized
 * engineering composition with the project name and accent color.
 */
export function ProjectPoster({ label, accent, category, className }: ProjectPosterProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-token bg-[#0B1020]",
        className,
      )}
      aria-hidden
    >
      {/* grid background */}
      <svg
        className="absolute inset-0 size-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 400 250"
      >
        <defs>
          <pattern id={`grid-${label}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#263550" strokeWidth="0.5" />
          </pattern>
          <radialGradient id={`glow-${label}`} cx="65%" cy="30%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="55%" stopColor={accent} stopOpacity="0.08" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="250" fill={`url(#grid-${label})`} />
        <rect width="400" height="250" fill={`url(#glow-${label})`} />
      </svg>

      {/* faux terminal window */}
      <div className="absolute left-5 right-5 top-5 rounded-lg border border-token bg-[#111A2E]/95 backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-token px-3 py-2">
          <span className="size-2 rounded-full bg-[#F16B75]/80" />
          <span className="size-2 rounded-full bg-[#F5B942]/80" />
          <span className="size-2 rounded-full bg-[#35C98A]/80" />
          <span className="ml-2 font-mono-token text-[10px] text-secondary">
            {label.toLowerCase().replace(/\s+/g, "-")}.ts
          </span>
        </div>
        <div className="space-y-1 px-3 py-3 font-mono-token text-[10px] leading-relaxed">
          <div className="text-secondary">
            <span style={{ color: accent }}>const</span>{" "}
            <span className="text-[#F3F6FC]">{label.toLowerCase().replace(/\s+/g, "")}</span>{" "}
            <span className="text-secondary">=</span>{" "}
            <span style={{ color: accent }}>async</span>{" "}
            <span className="text-secondary">() =&gt; {"{"}</span>
          </div>
          <div className="pl-3 text-secondary">
            <span style={{ color: "#22D3C5" }}>await</span>{" "}
            <span className="text-[#F3F6FC]">build</span>
            <span className="text-secondary">();</span>
          </div>
          <div className="pl-3 text-secondary">
            <span className="text-[#A7B3C8]">{"// "}{category}</span>
          </div>
          <div className="text-secondary">
            <span className="text-secondary">{"}"}</span>
            <span className="text-secondary">;</span>
          </div>
        </div>
      </div>

      {/* label chip */}
      <div className="absolute bottom-4 left-5 rounded-md border border-token bg-[#0B1020]/80 px-2.5 py-1 font-display text-sm font-semibold text-foreground backdrop-blur">
        {label}
      </div>
      <div
        className="absolute right-5 bottom-4 size-2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
      />
    </div>
  );
}
