"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Code2, Bot, GraduationCap, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/studio/eyebrow";
import { SectionNumber } from "@/components/studio/section-number";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { AmbientGlow } from "@/components/visuals/ambient-glow";
import { NoiseOverlay } from "@/components/visuals/noise-overlay";
import { profileUrls } from "@/data/site";
import type { OpenRole } from "@/types/portfolio";

/**
 * Roles the candidate is open to and actively interviewing for.
 * Do NOT list roles you would not actually accept an interview for.
 */
const openRoles: OpenRole[] = [
  { title: "Junior Software Engineer", level: "Junior", note: "Full-stack or backend focus." },
  { title: "Full-Stack Developer", level: "Junior", note: "React / Next.js + Node.js." },
  { title: "React / Next.js Developer", level: "Junior", note: "Frontend-heavy product work." },
  { title: "AI Application Developer", level: "Junior", note: "LLM integration, RAG, automation." },
  { title: "Software Engineering Internship", level: "Internship", note: "Available for structured internships." },
];

export function OpenToOpportunities() {
  const reduce = useReducedMotion();

  return (
    <section
      id="open-to-opportunities"
      aria-label="Open to opportunities"
      className="relative isolate overflow-hidden bg-ultramarine text-white"
    >
      <AmbientGlow variant="volt" className="left-[-10%] top-[-20%] h-[420px] w-[420px] opacity-50" />
      <AmbientGlow variant="aqua" className="right-[-10%] bottom-[-20%] h-[360px] w-[360px] opacity-40" />
      <NoiseOverlay opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <Eyebrow color="volt">Open to opportunities</Eyebrow>
            <SplitText
              as="h2"
              text="Currently interviewing for these roles."
              className="mt-5 font-display text-[clamp(1.6rem,4vw,3rem)] font-bold text-white text-balance"
              from="bottom"
            />
            <Reveal delay={0.25} className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              Based in Multan, Pakistan · Open to remote and on-site
              opportunities. Receptive to international relocation for the
              right role.
            </Reveal>
          </div>
          <SectionNumber value="08" outline={false} className="text-white/30" />
        </div>

        {/* Role grid */}
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {openRoles.map((role, i) => {
            const Icon = roleIcon(role.title);
            return (
              <Reveal
                key={role.title}
                index={i}
                delay={0.1 + i * 0.05}
                direction="up"
                className="group rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur transition-colors hover:border-volt/50 hover:bg-white/10"
              >
                <li className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-full bg-volt/15 text-volt">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="font-mono-token text-[10px] uppercase tracking-[0.18em] text-white/60">
                      {role.level}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {role.title}
                  </h3>
                  {role.note ? (
                    <p className="text-sm leading-relaxed text-white/70">{role.note}</p>
                  ) : null}
                </li>
              </Reveal>
            );
          })}
        </ul>

        {/* CTA row */}
        <Reveal delay={0.5} direction="up" className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-volt px-6 py-3.5 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-transform hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
          <a
            href={profileUrls.cv}
            download
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
          >
            Download CV
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function roleIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("internship")) return GraduationCap;
  if (t.includes("ai")) return Bot;
  if (t.includes("react") || t.includes("next")) return Code2;
  return Briefcase;
}
