import * as React from "react";
import { cn } from "@/lib/utils";

interface GridLinesProps {
  variant?: "light" | "dark" | "violet";
  className?: string;
  /** fade the grid toward the edges */
  fade?: boolean;
}

const variantClass: Record<NonNullable<GridLinesProps["variant"]>, string> = {
  light: "grid-lines-light",
  dark: "grid-lines-dark",
  violet: "grid-lines-violet",
};

/**
 * Thin technical grid background. Optional radial fade mask.
 */
export function GridLines({ variant = "dark", className, fade = true }: GridLinesProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0",
        variantClass[variant],
        fade &&
          "[mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_80%)]",
        className,
      )}
    />
  );
}
