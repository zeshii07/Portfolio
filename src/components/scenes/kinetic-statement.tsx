"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Marquee } from "@/components/motion/marquee";
import { marqueePhrases } from "@/data/skills";
import { NoiseOverlay } from "@/components/visuals/noise-overlay";

export function KineticStatement() {
  const reduce = useReducedMotion();

  return (
    <section
      id="statement"
      aria-label="Statement of intent"
      className="relative isolate overflow-hidden bg-volt text-ink"
    >
      <NoiseOverlay opacity={0.08} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <motion.h2
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-display font-bold uppercase tracking-[-0.03em] text-balance"
        >
          <span className="block">I turn complex</span>
          <span className="block">
            problems into <span className="text-outline-ink">products</span>
          </span>
          <span className="block">people can use.</span>
        </motion.h2>

        {/* metadata strip */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-ink/20 pt-6 font-mono-token text-[11px] uppercase tracking-[0.22em] text-ink/70"
        >
          <span>Build</span>
          <span aria-hidden>·</span>
          <span>Automate</span>
          <span aria-hidden>·</span>
          <span>Secure</span>
          <span aria-hidden>·</span>
          <span>Ship</span>
        </motion.div>
      </div>

      {/* Marquee at the bottom */}
      <div className="relative z-10 border-t border-ink/20 bg-volt py-4">
        <Marquee
          items={marqueePhrases}
          variant="display"
          duration={32}
          separator="/"
          className="text-ink"
        />
      </div>
    </section>
  );
}
