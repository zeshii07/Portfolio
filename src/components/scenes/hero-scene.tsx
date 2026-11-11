"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { person, contactInfo } from "@/data/site";
import { rotatingHeroWords } from "@/data/skills";
import { Eyebrow } from "@/components/studio/eyebrow";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { AmbientGlow } from "@/components/visuals/ambient-glow";
import { GridLines } from "@/components/visuals/grid-lines";
import { NoiseOverlay } from "@/components/visuals/noise-overlay";
import { HeroVisual } from "./hero-visual";
import { ScrollCue } from "./scroll-cue";

export function HeroScene() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Hero typography scales/moves as it leaves viewport
  const yCopy = useTransform(scrollY, [0, 600], [0, -80]);
  const opacityCopy = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] flex-col justify-center overflow-hidden bg-ink noise-overlay"
      aria-label="Hero"
    >
      {/* Ambient lighting */}
      <AmbientGlow
        variant="violet"
        className="left-[-10%] top-[-20%] h-[640px] w-[640px]"
        drift
        pointer
      />
      <AmbientGlow
        variant="ultramarine"
        className="right-[-15%] top-[10%] h-[480px] w-[480px] opacity-70"
        drift
      />
      <GridLines variant="dark" />

      {/* Top role label */}
      <div className="absolute left-0 right-0 top-24 z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Eyebrow color="volt">Full-stack · AI · Secure engineering</Eyebrow>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-32 pb-24 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pt-24">
        {/* Headline + CTAs */}
        <motion.div
          style={reduce ? undefined : { y: yCopy, opacity: opacityCopy }}
          className="lg:col-span-7"
        >
          <h1 className="font-display text-hero text-bone text-balance">
            <Line delay={0.2}>I build</Line>
            <Line delay={0.32}>
              <span className="text-volt">digital</span> experiences
            </Line>
            <Line delay={0.44}>
              that turn complex
            </Line>
            <Line delay={0.56}>
              ideas into <RotatingWord />
            </Line>
          </h1>

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 max-w-md text-base leading-relaxed text-muted-light sm:text-lg"
          >
            {person.supportingCopy}
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              as="a"
              href="#projects"
              strength={0.25}
              className="group rounded-full bg-volt px-6 py-3.5 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              Explore selected work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#about"
              strength={0.2}
              className="rounded-full border border-token-soft px-6 py-3.5 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-bone transition-colors hover:bg-ink-soft"
            >
              About me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-token text-[11px] uppercase tracking-[0.18em] text-muted-light"
          >
            <span>{contactInfo.location}</span>
            <span aria-hidden>·</span>
            <a
              href={`mailto:${contactInfo.email}`}
              className="transition-colors hover:text-bone"
            >
              {contactInfo.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Interactive visual */}
        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      <ScrollCue />

      {/* Floating corner crosshair labels */}
      <CornerMark className="left-6 top-28 hidden lg:block" label="01 — STAGE" />
      <CornerMark className="right-6 top-28 hidden lg:block" label="2024" align="right" />
    </section>
  );
}

function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? { opacity: 0 } : { y: "110%" }}
        animate={reduce ? { opacity: 1 } : { y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function RotatingWord() {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % rotatingHeroWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) {
    return <span className="text-violet">software</span>;
  }

  return (
    <span className="relative inline-block min-w-[6ch] align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingHeroWords[index]}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-violet"
        >
          {rotatingHeroWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CornerMark({
  className,
  label,
  align = "left",
}: {
  className?: string;
  label: string;
  align?: "left" | "right";
}) {
  return (
    <span
      aria-hidden
      className={`absolute font-mono-token text-[10px] uppercase tracking-[0.22em] text-muted-light ${className}`}
      style={{ textAlign: align }}
    >
      {label}
    </span>
  );
}
