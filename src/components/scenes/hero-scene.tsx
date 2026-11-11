"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { person, contactInfo } from "@/data/site";
import { rotatingHeroWords } from "@/data/skills";
import { Eyebrow } from "@/components/studio/eyebrow";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { AmbientGlow } from "@/components/visuals/ambient-glow";
import { FallingDigits } from "@/components/visuals/falling-digits";
import { NoiseOverlay } from "@/components/visuals/noise-overlay";
import { HeroPortrait } from "./hero-portrait";
import { ScrollCue } from "./scroll-cue";

export function HeroScene() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yCopy = useTransform(scrollY, [0, 600], [0, -80]);
  const opacityCopy = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] flex-col justify-center overflow-hidden bg-ink"
      aria-label="Hero"
    >
      <AmbientGlow variant="violet" className="left-[-10%] top-[-20%] h-[640px] w-[640px]" drift pointer />
      <AmbientGlow variant="ultramarine" className="right-[-15%] top-[10%] h-[480px] w-[480px] opacity-70" drift />
      {/* Falling digits background — low opacity, doesn't affect readability */}
      <FallingDigits opacity={0.35} />
      <NoiseOverlay opacity={0.03} />

      {/* Top role label */}
      <div className="absolute left-0 right-0 top-16 z-10 mx-auto max-w-6xl px-5 sm:top-24 sm:px-8">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Eyebrow color="volt">Full-stack · AI · Secure engineering</Eyebrow>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-5 pt-36 pb-16 sm:px-8 sm:pt-40 sm:pb-20 lg:grid-cols-12 lg:gap-6 lg:pt-24">
        {/* Headline + CTAs */}
        <motion.div
          style={reduce ? undefined : { y: yCopy, opacity: opacityCopy }}
          className="lg:col-span-7"
        >
          <h1 className="font-display text-[clamp(1.6rem,7vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-bone text-balance">
            <Line delay={0.2}>I build</Line>
            <Line delay={0.32}>
              <span className="text-gradient-animated">digital</span> experiences
            </Line>
            <Line delay={0.44}>that turn complex</Line>
            <Line delay={0.56}>ideas into <RotatingWord /></Line>
          </h1>

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-muted-light sm:mt-8 sm:text-lg"
          >
            {person.supportingCopy}
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-6 flex flex-wrap items-center gap-3 sm:mt-9"
          >
            <MagneticButton
              as="a"
              href="#projects"
              strength={0.25}
              className="group rounded-full bg-volt px-5 py-3 font-mono-token text-[11px] font-semibold uppercase tracking-[0.18em] text-ink sm:px-6 sm:py-3.5 sm:text-xs"
            >
              Explore selected work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#about"
              strength={0.2}
              className="rounded-full border border-token-soft px-5 py-3 font-mono-token text-[11px] font-semibold uppercase tracking-[0.18em] text-bone transition-colors hover:bg-ink-soft sm:px-6 sm:py-3.5 sm:text-xs"
            >
              About me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-token text-[10px] uppercase tracking-[0.18em] text-muted-light sm:mt-8 sm:gap-x-6 sm:text-[11px]"
          >
            <span>{contactInfo.location}</span>
            <span aria-hidden>·</span>
            <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-bone break-all">
              {contactInfo.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <div className="lg:col-span-5">
          <HeroPortrait />
        </div>
      </div>

      <ScrollCue />
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

  if (reduce) return <span className="text-violet">software</span>;

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
