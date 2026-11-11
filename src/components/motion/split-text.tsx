"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Per-word stagger */
  stagger?: number;
  delay?: number;
  duration?: number;
  /** Direction the words slide in from */
  from?: "bottom" | "top" | "left";
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Word-by-word reveal using a vertical mask. Lines wrap naturally.
 * Use for hero and section headlines.
 */
export function SplitText({
  text,
  className,
  stagger = 0.08,
  delay = 0,
  duration = 0.7,
  from = "bottom",
  once = true,
  as = "h2",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as];

  const initial =
    from === "bottom"
      ? { y: "110%" }
      : from === "top"
        ? { y: "-110%" }
        : { x: "-110%" };

  const wordVariants: Variants = {
    hidden: reduce ? { opacity: 0 } : initial,
    visible: {
      ...(reduce ? { opacity: 1 } : { x: 0, y: 0 }),
      transition: {
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: reduce ? 0 : stagger } } }}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{
            paddingBottom: from === "bottom" ? "0.05em" : undefined,
            paddingTop: from === "top" ? "0.05em" : undefined,
          }}
        >
          <motion.span
            variants={wordVariants}
            className={cn(
              "inline-block",
              from === "left" && "whitespace-nowrap",
            )}
            style={{ willChange: "transform" }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
