"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlowVariant = "violet" | "ultramarine" | "volt" | "tangerine";

interface AmbientGlowProps {
  variant?: GlowVariant;
  className?: string;
  /** gentle drift animation */
  drift?: boolean;
  /** pointer-reactive parallax (desktop only) */
  pointer?: boolean;
}

const variantClass: Record<GlowVariant, string> = {
  violet: "glow-violet",
  ultramarine: "glow-ultramarine",
  volt: "glow-volt",
  tangerine: "glow-tangerine",
};

/**
 * Large blurred radial glow used as ambient lighting behind scenes.
 */
export function AmbientGlow({
  variant = "violet",
  className,
  drift = true,
  pointer = false,
}: AmbientGlowProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!pointer || reduce || !ref.current) return;
    const el = ref.current;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translate3d(${x * 40}px, ${y * 40}px, 0)`;
    };

    parent.addEventListener("pointermove", onMove);
    return () => parent.removeEventListener("pointermove", onMove);
  }, [pointer, reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full",
        variantClass[variant],
        drift && !reduce && "animate-pulse-slow",
        className,
      )}
      style={{ willChange: "transform" }}
    />
  );
}
