import * as React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  /** color of the leading dot */
  color?: "volt" | "aqua" | "violet" | "tangerine" | "ultramarine" | "ink" | "bone";
  as?: "span" | "p" | "div";
}

const dotColorMap: Record<NonNullable<EyebrowProps["color"]>, string> = {
  volt: "bg-volt",
  aqua: "bg-aqua",
  violet: "bg-violet",
  tangerine: "bg-tangerine",
  ultramarine: "bg-ultramarine",
  ink: "bg-ink",
  bone: "bg-bone",
};

/**
 * Small monospace eyebrow label with a leading dot.
 */
export function Eyebrow({
  children,
  className,
  color = "volt",
  as = "span",
}: EyebrowProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2 font-mono-token text-[11px] uppercase tracking-[0.22em]",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", dotColorMap[color])} />
      {children}
    </Tag>
  );
}
