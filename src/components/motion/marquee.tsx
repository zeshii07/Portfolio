"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeItem {
  text: string;
  /** Optional outlined word */
  outline?: boolean;
}

interface MarqueeProps {
  items: MarqueeItem[];
  /** seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  separator?: string;
  className?: string;
  /** Render items as oversized display text */
  variant?: "display" | "mono";
}

/**
 * Pure CSS marquee. Pauses on hover for accessibility (gives users a
 * chance to read). Disabled entirely under reduced-motion.
 */
export function Marquee({
  items,
  duration = 28,
  reverse = false,
  separator = "/",
  className,
  variant = "mono",
}: MarqueeProps) {
  // Duplicate the list so the translateX(-50%) loop is seamless.
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        className,
      )}
      aria-hidden={false}
    >
      <div
        className={cn(
          "marquee-track gap-x-8 px-4 group-hover:[animation-play-state:paused]",
          reverse && "marquee-reverse",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item.text}-${i}`}
            className={cn(
              "flex shrink-0 items-center gap-x-8",
              variant === "display"
                ? "font-display font-bold uppercase tracking-tight text-[clamp(2rem,5vw,4rem)]"
                : "font-mono-token text-xs uppercase tracking-[0.25em]",
            )}
          >
            <span
              className={cn(
                variant === "display" && item.outline && "text-outline-ink",
              )}
            >
              {item.text}
            </span>
            <span
              className={cn(
                variant === "display" ? "opacity-50" : "opacity-40",
                variant === "display" ? "text-ink" : "text-current",
              )}
              aria-hidden
            >
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
