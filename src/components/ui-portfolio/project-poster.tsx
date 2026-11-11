import { cn } from "@/lib/utils";

interface ProjectPosterProps {
  label: string;
  accent: string;
  category: string;
  className?: string;
  /** background tone */
  tone?: "ink" | "bone" | "violet";
}

/**
 * A self-contained SVG "screenshot stand-in" for a project.
 * Stylized engineering composition using the portfolio palette.
 * The aspect ratio is controlled by the parent via className.
 */
export function ProjectPoster({
  label,
  accent,
  category,
  className,
  tone = "ink",
}: ProjectPosterProps) {
  const bgColor = tone === "ink" ? "var(--ink)" : tone === "violet" ? "var(--violet)" : "var(--bone)";
  const surfaceColor = tone === "ink" ? "var(--ink-soft)" : "rgba(16,16,22,0.04)";
  const borderColor = tone === "ink" ? "rgba(246,241,232,0.10)" : "rgba(16,16,22,0.10)";
  const textColor = tone === "ink" ? "var(--bone)" : "var(--ink)";
  const mutedColor = tone === "ink" ? "var(--muted-light)" : "var(--muted-dark)";
  const slug = label.toLowerCase().replace(/\s+/g, "-");
  const id = `${slug}-${tone}`;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border",
        className,
      )}
      style={{ backgroundColor: bgColor, borderColor }}
      aria-hidden
    >
      {/* grid + glow */}
      <svg
        className="absolute inset-0 size-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 400 250"
      >
        <defs>
          <pattern id={`grid-${id}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <path
              d="M 22 0 L 0 0 0 22"
              fill="none"
              stroke={tone === "ink" ? "rgba(246,241,232,0.08)" : "rgba(16,16,22,0.05)"}
              strokeWidth="0.5"
            />
          </pattern>
          <radialGradient id={`glow-${id}`} cx="70%" cy="30%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
            <stop offset="55%" stopColor={accent} stopOpacity="0.10" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="250" fill={`url(#grid-${id})`} />
        <rect width="400" height="250" fill={`url(#glow-${id})`} />
      </svg>

      {/* faux code panel */}
      <div
        className="absolute left-5 right-5 top-5 rounded-lg backdrop-blur"
        style={{ backgroundColor: surfaceColor, borderColor, border: `1px solid ${borderColor}` }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          <span className="size-2 rounded-full" style={{ background: "var(--tangerine)", opacity: 0.7 }} />
          <span className="size-2 rounded-full" style={{ background: "var(--volt)", opacity: 0.7 }} />
          <span className="size-2 rounded-full" style={{ background: "var(--aqua)", opacity: 0.7 }} />
          <span
            className="ml-2 font-mono-token text-[10px]"
            style={{ color: mutedColor }}
          >
            {slug}.ts
          </span>
        </div>
        <div className="space-y-1 px-3 py-3 font-mono-token text-[10px] leading-relaxed">
          <div style={{ color: mutedColor }}>
            <span style={{ color: accent }}>const</span>{" "}
            <span style={{ color: textColor }}>
              {label.toLowerCase().replace(/\s+/g, "")}
            </span>{" "}
            <span style={{ color: mutedColor }}>=</span>{" "}
            <span style={{ color: accent }}>async</span>{" "}
            <span style={{ color: mutedColor }}>=&gt; {"{"}</span>
          </div>
          <div className="pl-3" style={{ color: mutedColor }}>
            <span style={{ color: "var(--aqua)" }}>await</span>{" "}
            <span style={{ color: textColor }}>build</span>
            <span style={{ color: mutedColor }}>();</span>
          </div>
          <div className="pl-3" style={{ color: mutedColor }}>
            {"// "}{category}
          </div>
          <div style={{ color: mutedColor }}>
            <span style={{ color: mutedColor }}>{"}"}</span>
            <span style={{ color: mutedColor }}>;</span>
          </div>
        </div>
      </div>

      {/* label chip */}
      <div
        className="absolute bottom-4 left-5 rounded-md px-2.5 py-1 font-display text-sm font-semibold backdrop-blur"
        style={{ backgroundColor: "rgba(0,0,0,0.4)", color: textColor, borderColor, border: `1px solid ${borderColor}` }}
      >
        {label}
      </div>
      <div
        className="absolute right-5 bottom-4 size-2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
      />
    </div>
  );
}
