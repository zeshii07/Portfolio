import * as React from "react";
import { cn } from "@/lib/utils";

interface NoiseOverlayProps {
  className?: string;
  /** Override default opacity */
  opacity?: number;
}

/**
 * Static SVG noise overlay. Low-opacity, blend-mode overlay.
 * Used to add subtle texture to solid color sections.
 */
export function NoiseOverlay({ className, opacity = 0.05 }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  );
}
