"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageMaskRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay */
  delay?: number;
  /** Clip-path direction */
  from?: "left" | "right" | "bottom" | "top";
  duration?: number;
}

const clipMap = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  bottom: "inset(100% 0 0 0)",
  top: "inset(0 0 100% 0)",
};

/**
 * Reveals an image/visual with a clip-path mask tied to scroll.
 * Used for project screenshots and the Nova showcase.
 */
export function ImageMaskReveal({
  children,
  className,
  delay = 0,
  from = "left",
  duration = 0.9,
}: ImageMaskRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={reduce ? { opacity: 0 } : { clipPath: clipMap[from] }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { scale: 1.15 }}
        whileInView={reduce ? { opacity: 1 } : { scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: reduce ? 0 : duration + 0.2,
          delay: reduce ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="size-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
