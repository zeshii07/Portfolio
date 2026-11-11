"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { person, contactInfo } from "@/data/site";
import { Eyebrow } from "@/components/studio/eyebrow";
import { SectionNumber } from "@/components/studio/section-number";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ImageMaskReveal } from "@/components/motion/image-mask-reveal";
import { NoiseOverlay } from "@/components/visuals/noise-overlay";

export function AboutPreview() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About"
      className="relative isolate overflow-hidden bg-tangerine text-ink"
    >
      <NoiseOverlay opacity={0.08} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="mb-12 flex items-end justify-between gap-6">
          <Eyebrow color="ink">About</Eyebrow>
          <SectionNumber value="06" outline={false} className="text-ink/30" />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait stand-in — replace with real image later */}
          <div className="lg:col-span-5">
            <ImageMaskReveal from="bottom" duration={1}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink/15 bg-bone">
                <PortraitStandIn />
              </div>
            </ImageMaskReveal>

            {/* floating annotation labels */}
            <motion.span
              initial={reduce ? undefined : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -left-2 top-4 rounded-full bg-ink px-3 py-1 font-mono-token text-[10px] uppercase tracking-[0.22em] text-bone"
            >
              {contactInfo.location}
            </motion.span>
            <motion.span
              initial={reduce ? undefined : { opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -right-2 bottom-8 rounded-full bg-volt px-3 py-1 font-mono-token text-[10px] uppercase tracking-[0.22em] text-ink"
            >
              Software / AI
            </motion.span>
          </div>

          {/* Editorial copy */}
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              text="A focused engineer who ships useful software."
              className="font-display text-page-title font-bold text-ink text-balance"
              from="bottom"
              stagger={0.04}
            />

            <Reveal delay={0.4} direction="up" className="mt-8 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
              {person.aboutPreview}
            </Reveal>

            <Reveal delay={0.5} direction="up" className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6">
              <Annotation label="Education" value="BS Information Technology" sub="University of the Punjab" />
              <Annotation label="Focus" value="Full-stack · AI · Security" sub="Practical, grounded delivery" />
            </Reveal>

            <Reveal delay={0.6} direction="up" className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-bone transition-transform hover:-translate-y-0.5"
              >
                View projects
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-ink"
              >
                Get in touch
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            </Reveal>

            <Reveal delay={0.7} direction="up" className="mt-8 flex items-center gap-2 font-mono-token text-[11px] uppercase tracking-[0.22em] text-ink/60">
              <MapPin className="size-3.5" aria-hidden />
              {contactInfo.locationDetail}
            </Reveal>
          </div>
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
    <div className="flex flex-col gap-1">
      <span className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-ink/50">
        {label}
      </span>
      <span className="font-display text-base font-semibold text-ink">{value}</span>
      <span className="text-sm text-ink/60">{sub}</span>
    </div>
  );
}

/**
 * Stylized portrait stand-in. Replace with a real photo when ready
 * — keep the aspect ratio and the warm tint consistent.
 */
function PortraitStandIn() {
  return (
    <div className="relative size-full">
      <svg
        aria-hidden
        className="absolute inset-0 size-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="portrait-bg" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#F6F1E8" />
            <stop offset="100%" stopColor="#E8DEC8" />
          </radialGradient>
          <linearGradient id="portrait-z" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#101016" />
            <stop offset="100%" stopColor="#1B1B26" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#portrait-bg)" />
        {/* "Z" mark — placeholder for portrait */}
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="200"
          fontWeight="700"
          fill="url(#portrait-z)"
          opacity="0.85"
        >
          Z
        </text>
        {/* corner ticks */}
        <line x1="20" y1="20" x2="40" y2="20" stroke="#101016" strokeWidth="1.5" />
        <line x1="20" y1="20" x2="20" y2="40" stroke="#101016" strokeWidth="1.5" />
        <line x1="360" y1="20" x2="380" y2="20" stroke="#101016" strokeWidth="1.5" />
        <line x1="380" y1="20" x2="380" y2="40" stroke="#101016" strokeWidth="1.5" />
        <line x1="20" y1="460" x2="40" y2="460" stroke="#101016" strokeWidth="1.5" />
        <line x1="20" y1="460" x2="20" y2="480" stroke="#101016" strokeWidth="1.5" />
        <line x1="360" y1="460" x2="380" y2="460" stroke="#101016" strokeWidth="1.5" />
        <line x1="380" y1="460" x2="380" y2="480" stroke="#101016" strokeWidth="1.5" />
      </svg>
      <span className="absolute bottom-4 left-4 font-mono-token text-[10px] uppercase tracking-[0.22em] text-ink/50">
        portrait · placeholder
      </span>
    </div>
  );
}
