"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger index for grouped reveals */
  index?: number;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  /** distance in px to travel from */
  distance?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "span" | "li" | "section" | "article";
}

const offsetMap: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  index = 0,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 24,
  className,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  const offset = offsetMap[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x ? (offset.x / 24) * distance : 0,
      y: offset.y ? (offset.y / 24) * distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay + index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Reveal a container of children with staggered timing.
 * Children must be motion elements with variants "hidden" / "visible".
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
