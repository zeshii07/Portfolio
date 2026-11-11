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
import { ImageMaskReveal } from "@/components/motion/image-mask-reveal";
import { NoiseOverlay } from "@/components/visuals/noise-overlay";

export function AboutPreview() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background outlined text drifts slowly as you scroll (parallax)
  const yBgText = useTransform(scrollYProgress, [0, 1], [60, -60]);
  // Portrait subtle counter-drift
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About"
      className="relative isolate overflow-hidden bg-tangerine text-ink"
    >
      <NoiseOverlay opacity={0.08} />

      {/* Oversized outlined background text — sits behind everything */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: yBgText }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <span className="select-none font-display text-[clamp(8rem,28vw,28rem)] font-bold uppercase leading-none text-outline-ink opacity-[0.12]">
          ZEESHAN
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20 sm:px-8 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
        {/* Top header strip */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <Eyebrow color="ink">About</Eyebrow>
          <SectionNumber value="06" outline={false} className="text-ink/30" />
        </div>

        {/* Portrait at the top — large, centered, with mask reveal + float */}
        <div className="mb-16 flex justify-center">
          <motion.div
            style={reduce ? undefined : { y: yPortrait }}
            className="relative w-full max-w-[320px] sm:max-w-[360px]"
          >
            <ImageMaskReveal from="bottom" duration={1.1}>
              <motion.div
                animate={
                  reduce
                    ? undefined
                    : { y: [0, -8, 0] }
                }
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink/15 bg-bone shadow-[0_24px_60px_-20px_rgba(16,16,22,0.45)]"
              >
                <PortraitImage />
              </motion.div>
            </ImageMaskReveal>

            {/* Floating annotation labels around the portrait */}
            <motion.span
              initial={reduce ? undefined : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -left-3 top-6 rounded-full bg-ink px-3 py-1 font-mono-token text-[10px] uppercase tracking-[0.22em] text-bone sm:-left-6"
            >
              {contactInfo.location}
            </motion.span>
            <motion.span
              initial={reduce ? undefined : { opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="absolute -right-3 bottom-10 rounded-full bg-volt px-3 py-1 font-mono-token text-[10px] uppercase tracking-[0.22em] text-ink sm:-right-6"
            >
              Software / AI
            </motion.span>
            {/* Crosshair markers */}
            <span aria-hidden className="absolute -top-2 -left-2 size-3 border-l-2 border-t-2 border-ink" />
            <span aria-hidden className="absolute -top-2 -right-2 size-3 border-r-2 border-t-2 border-ink" />
            <span aria-hidden className="absolute -bottom-2 -left-2 size-3 border-l-2 border-b-2 border-ink" />
            <span aria-hidden className="absolute -bottom-2 -right-2 size-3 border-r-2 border-b-2 border-ink" />
          </motion.div>
        </div>

        {/* Editorial text below the portrait */}
        <div className="mx-auto max-w-4xl text-center">
          <SplitText
            as="h2"
            text="A focused engineer who ships useful software."
            className="font-display text-page-title font-bold text-ink text-balance"
            from="bottom"
            stagger={0.04}
          />

          <Reveal delay={0.4} direction="up" className="mt-8 mx-auto max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">
            {person.aboutPreview}
          </Reveal>

          <Reveal delay={0.5} direction="up" className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6 text-left sm:max-w-2xl sm:mx-auto">
            <Annotation label="Education" value="BS Information Technology" sub="University of the Punjab" />
            <Annotation label="Focus" value="Full-stack · AI · Security" sub="Practical, grounded delivery" />
          </Reveal>

          <Reveal delay={0.6} direction="up" className="mt-8 flex flex-wrap items-center justify-center gap-4">
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

          <Reveal delay={0.7} direction="up" className="mt-8 flex items-center justify-center gap-2 font-mono-token text-[11px] uppercase tracking-[0.22em] text-ink/60">
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
 * Portrait image with graceful fallback.
 *
 * Drop your real portrait at:  public/images/profile/portrait.png
 * Recommended aspect ratio: 4:5 (e.g. 800x1000).
 *
 * If the image fails to load, a stylized "Z" placeholder is shown.
 */
function PortraitImage() {
  const [errored, setErrored] = React.useState(false);

  if (errored) {
    return <PortraitFallback />;
  }

  return (
    <Image
      src="/images/profile/portrait.png"
      alt="Portrait of Zeeshan Ahmad"
      fill
      sizes="(max-width: 640px) 320px, 360px"
      className="object-cover"
      priority
      onError={() => setErrored(true)}
    />
  );
}

function PortraitFallback() {
  return (
    <div className="relative size-full">
      <svg
        aria-hidden
        className="absolute inset-0 size-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="portrait-bg-fb" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#F6F1E8" />
            <stop offset="100%" stopColor="#E8DEC8" />
          </radialGradient>
          <linearGradient id="portrait-z-fb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#101016" />
            <stop offset="100%" stopColor="#1B1B26" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#portrait-bg-fb)" />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="200"
          fontWeight="700"
          fill="url(#portrait-z-fb)"
          opacity="0.85"
        >
          Z
        </text>
      </svg>
      <span className="absolute bottom-4 left-4 font-mono-token text-[10px] uppercase tracking-[0.22em] text-ink/50">
        portrait · placeholder
      </span>
    </div>
  );
}
