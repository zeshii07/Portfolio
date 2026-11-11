"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/**
 * Pulsing scroll cue at the bottom of the hero.
 */
export function ScrollCue() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href="#statement"
      aria-label="Scroll to content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-bone/70 transition-colors hover:text-bone"
    >
      <span className="font-mono-token text-[10px] uppercase tracking-[0.22em]">
        Scroll
      </span>
      <motion.span
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={reduce ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="grid size-8 place-items-center rounded-full border border-token-soft"
      >
        <ArrowDown className="size-3.5" aria-hidden />
      </motion.span>
    </motion.a>
  );
}
