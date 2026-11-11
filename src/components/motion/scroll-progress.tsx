"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  /** Anchor the bar to top or left edge */
  edge?: "top" | "left";
  color?: string;
}

/**
 * Thin scroll progress line. Fixed to the viewport edge.
 * Disabled under reduced-motion.
 */
export function ScrollProgress({
  className,
  edge = "top",
  color = "var(--volt)",
}: ScrollProgressProps) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
  });

  if (reduce) return null;

  if (edge === "left") {
    return (
      <motion.div
        aria-hidden
        className={cn(
          "fixed left-0 top-0 z-[60] h-full w-[3px] origin-top",
          className,
        )}
        style={{ backgroundColor: color, scaleY: scaleX }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className={cn(
        "fixed top-0 left-0 z-[60] h-[3px] w-full origin-left",
        className,
      )}
      style={{ backgroundColor: color, scaleX }}
    />
  );
}
