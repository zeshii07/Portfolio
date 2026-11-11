"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Layers, Users, Bot } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { Eyebrow } from "@/components/studio/eyebrow";
import { SectionNumber } from "@/components/studio/section-number";
import { ArrowLink } from "@/components/studio/arrow-link";
import { Reveal } from "@/components/motion/reveal";
import { AmbientGlow } from "@/components/visuals/ambient-glow";
import { NoiseOverlay } from "@/components/visuals/noise-overlay";
import { NovaPoster } from "@/components/visuals/nova-poster";

interface FeaturedNovaProps {
  onOpenProject: (slug: string) => void;
}

export function FeaturedNova({ onOpenProject }: FeaturedNovaProps) {
  const project = getProjectBySlug("nova");
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // background shapes move at slower scroll rate (parallax)
  const yShapes = useTransform(scrollYProgress, [0, 1], [40, -40]);
  // project title shifts slightly while scrolling
  const yTitle = useTransform(scrollYProgress, [0, 1], [30, -30]);

  if (!project) return null;

  return (
    <section
      ref={sectionRef}
      id="featured"
      aria-label="Featured project: Nova"
      className="relative isolate overflow-hidden bg-ultramarine text-white noise-overlay"
    >
      <AmbientGlow variant="violet" className="right-[-15%] top-[-10%] h-[520px] w-[520px] opacity-60" />
      <AmbientGlow variant="tangerine" className="bottom-[-20%] left-[10%] h-[260px] w-[260px] opacity-40" />

      {/* parallax background shapes */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: yShapes }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[8%] top-[20%] size-32 rounded-full border border-white/10" />
        <div className="absolute right-[12%] bottom-[15%] size-48 rounded-full border border-white/10" />
        <div className="absolute right-[28%] top-[12%] font-mono-token text-[10px] uppercase tracking-[0.22em] text-white/40">
          multi-tenant
        </div>
        <div className="absolute left-[18%] bottom-[10%] font-mono-token text-[10px] uppercase tracking-[0.22em] text-white/40">
          automation
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8 lg:py-10">
        {/* Section heading row */}
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <Eyebrow color="volt">Featured project</Eyebrow>
            <div className="mt-4 flex items-baseline gap-6">
              <SectionNumber value="03" outline={false} className="text-white/30" />
              <h2 className="font-display text-section font-semibold text-white text-balance">
                Nova
              </h2>
            </div>
          </div>
          <ArrowLink
            href="#projects"
            className="hidden text-white sm:inline-flex"
            underline="thin"
          >
            All work
          </ArrowLink>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Poster */}
          <div className="lg:col-span-7">
            <div className="animate-reveal-clip-left">
              <button
                type="button"
                onClick={() => onOpenProject(project.slug)}
                aria-label="Open Nova case study"
                className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-ultramarine card-hover-lift rounded-2xl"
              >
                <NovaPoster />
              </button>
            </div>

            {/* Sliding sequence of small interface panels */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Inbox", desc: "Per-tenant conversations" },
                { label: "FAQ", desc: "Retrieval-grounded answers" },
                { label: "Leads", desc: "Capture + forward" },
              ].map((panel, i) => (
                <Reveal
                  key={panel.label}
                  index={i}
                  delay={0.4 + i * 0.12}
                  direction="up"
                  className="rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur"
                >
                  <div className="flex items-center gap-2 font-mono-token text-[10px] uppercase tracking-[0.18em] text-volt">
                    <span className="size-1.5 rounded-full bg-volt" aria-hidden />
                    {panel.label}
                  </div>
                  <p className="mt-1.5 text-xs leading-snug text-white/80">{panel.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Title overlapping + content */}
          <div className="lg:col-span-5">
            <motion.h3
              style={reduce ? undefined : { y: yTitle }}
              className="font-display text-[clamp(1.8rem,5vw,3rem)] font-bold leading-[0.95] text-white"
            >
              <span className="block">Multi-business</span>
              <span className="block text-volt">automation.</span>
            </motion.h3>

            <Reveal delay={0.2} direction="up" className="mt-6">
              <p className="text-base leading-relaxed text-white/85">
                {project.problem}
              </p>
            </Reveal>

            <Reveal delay={0.3} direction="up" className="mt-4">
              <p className="text-base leading-relaxed text-white/85">
                {project.solution}
              </p>
            </Reveal>

            <Reveal delay={0.4} direction="up" className="mt-6">
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/20 px-3 py-1 font-mono-token text-[10px] uppercase tracking-[0.18em] text-white"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.5} direction="up" className="mt-8">
              <button
                type="button"
                onClick={() => onOpenProject(project.slug)}
                className="group inline-flex items-center gap-3 rounded-full bg-volt px-6 py-3.5 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-transform hover:-translate-y-0.5"
              >
                Explore Nova case study
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </button>
            </Reveal>

            <Reveal delay={0.6} direction="up" className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <Stat icon={Users} value="Multi-tenant" label="Per business" />
              <Stat icon={Bot} value="RAG" label="Grounded answers" />
              <Stat icon={Layers} value="Inbox" label="Unified view" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Users;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Icon className="size-4 text-volt" aria-hidden />
      <span className="font-display text-sm font-semibold text-white">{value}</span>
      <span className="font-mono-token text-[10px] uppercase tracking-[0.18em] text-white/60">
        {label}
      </span>
    </div>
  );
}
