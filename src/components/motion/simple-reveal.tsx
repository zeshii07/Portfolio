"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SimpleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Simple opacity + translateY reveal.
 * Content is ALWAYS visible — animation just enhances the entrance.
 * No clip-path that could trap content invisibly.
 */
export function SimpleReveal({
  children,
  className,
  delay = 0,
}: SimpleRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
