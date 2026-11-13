"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { person, contactInfo } from "@/data/site";
import { Eyebrow } from "@/components/studio/eyebrow";
import { SectionNumber } from "@/components/studio/section-number";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { NoiseOverlay } from "@/components/visuals/noise-overlay";

export function AboutPreview() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBgText = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About"
      className="relative isolate overflow-hidden bg-tangerine text-ink"
    >
      <NoiseOverlay opacity={0.06} />

      {/* Background outlined text */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: yBgText }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <span className="select-none font-display text-[clamp(5rem,24vw,24rem)] font-bold uppercase leading-none text-outline-ink opacity-[0.10]">
          ZEESHAN
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 pb-14 sm:px-8 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between gap-6 sm:mb-10">
          <Eyebrow color="ink">About</Eyebrow>
          <SectionNumber value="06" outline={false} className="text-ink/30" />
        </div>

        {/* Portrait — visible on all screen sizes */}
        <div className="mb-6 flex justify-center sm:mb-8">
          <motion.div
            style={reduce ? undefined : { y: yPortrait }}
            className="relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[340px]"
          >
            <div className="animate-reveal-clip-bottom">
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink/15 bg-bone shadow-[0_16px_40px_-16px_rgba(16,16,22,0.5)] animate-glow-pulse"
              >
                <PortraitImage />
              </motion.div>
            </div>

            {/* Floating labels — positioned inside on mobile to prevent overflow */}
            <motion.span
              initial={reduce ? undefined : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute left-2 top-2 rounded-full bg-ink px-2.5 py-1 font-mono-token text-[9px] uppercase tracking-[0.18em] text-bone sm:left-3 sm:top-3 sm:text-[10px]"
            >
              {contactInfo.location}
            </motion.span>
            <motion.span
              initial={reduce ? undefined : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="absolute right-2 bottom-2 rounded-full bg-volt px-2.5 py-1 font-mono-token text-[9px] uppercase tracking-[0.18em] text-ink sm:right-3 sm:bottom-3 sm:text-[10px]"
            >
              Software / AI
            </motion.span>
          </motion.div>
        </div>

        {/* Text */}
        <div className="mx-auto max-w-3xl text-center">
          <SplitText
            as="h2"
            text="A focused engineer who ships useful software."
            className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink text-balance"
            from="bottom"
            stagger={0.04}
          />

          <Reveal delay={0.3} direction="up" className="mt-5 mx-auto max-w-2xl text-sm leading-relaxed text-ink/80 sm:mt-6 sm:text-lg">
            {person.aboutPreview}
          </Reveal>

          <Reveal delay={0.4} direction="up" className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/15 pt-5 text-left sm:mt-8 sm:gap-6 sm:pt-6 sm:max-w-2xl sm:mx-auto">
            <Annotation label="Education" value="BS Information Technology · 2025" sub="University of the Punjab — Completed" />
            <Annotation label="Focus" value="Full-Stack · AI · Automation" sub="Security as a secondary specialization" />
          </Reveal>

          <Reveal delay={0.5} direction="up" className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-mono-token text-[11px] font-semibold uppercase tracking-[0.18em] text-bone transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-xs"
            >
              View projects
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 font-mono-token text-[11px] font-semibold uppercase tracking-[0.18em] text-ink sm:text-xs"
            >
              Get in touch
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </Reveal>

          <Reveal delay={0.6} direction="up" className="mt-5 flex items-center justify-center gap-2 font-mono-token text-[10px] uppercase tracking-[0.22em] text-ink/60 sm:mt-6 sm:text-[11px]">
            <MapPin className="size-3.5" aria-hidden />
            {contactInfo.locationDetail}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Annotation({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 sm:gap-1">
      <span className="font-mono-token text-[9px] uppercase tracking-[0.22em] text-ink/50 sm:text-[10px]">
        {label}
      </span>
      <span className="font-display text-xs font-semibold text-ink sm:text-base">{value}</span>
      <span className="text-[11px] text-ink/60 sm:text-sm">{sub}</span>
    </div>
  );
}

function PortraitImage() {
  const [errored, setErrored] = React.useState(false);

  if (errored) {
    return <PortraitFallback />;
  }

  return (
    <Image
      src="/images/profile/portrait.png"
      alt="Portrait of Muhammad Zeeshan"
      fill
      sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 340px"
      className="object-cover"
      priority
      onError={() => setErrored(true)}
    />
  );
}

function PortraitFallback() {
  return (
    <div className="relative size-full">
      <svg aria-hidden className="absolute inset-0 size-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="pfb" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#F6F1E8" />
            <stop offset="100%" stopColor="#E8DEC8" />
          </radialGradient>
          <linearGradient id="pz" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#101016" />
            <stop offset="100%" stopColor="#1B1B26" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#pfb)" />
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontFamily="Space Grotesk, sans-serif" fontSize="200" fontWeight="700" fill="url(#pz)" opacity="0.85">Z</text>
      </svg>
      <span className="absolute bottom-3 left-3 font-mono-token text-[9px] uppercase tracking-[0.22em] text-ink/50">
        portrait · placeholder
      </span>
    </div>
  );
}
