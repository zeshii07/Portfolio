"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Award, BookOpen, Building2 } from "lucide-react";
import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/types/portfolio";
import { Eyebrow } from "@/components/studio/eyebrow";
import { SectionNumber } from "@/components/studio/section-number";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { GridLines } from "@/components/visuals/grid-lines";
import { cn } from "@/lib/utils";

const kindMeta: Record<
  ExperienceItem["kind"],
  { label: string; icon: typeof Briefcase }
> = {
  work: { label: "Work", icon: Briefcase },
  internship: { label: "Internship", icon: Building2 },
  freelance: { label: "Freelance", icon: Briefcase },
  education: { label: "Education", icon: GraduationCap },
  certification: { label: "Certification", icon: Award },
  training: { label: "Training", icon: BookOpen },
};

const orderedKinds: ExperienceItem["kind"][] = [
  "work",
  "freelance",
  "internship",
  "education",
  "certification",
  "training",
];

export function ExperienceTimeline() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const beamScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const grouped = orderedKinds
    .map((kind) => ({
      kind,
      items: experience.filter((e) => e.kind === kind),
    }))
    .filter((group) => group.items.length > 0);

  // Flatten for the moving dot — one position per item, in order
  const flatItems = grouped.flatMap((g) => g.items);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Experience"
      className="relative isolate bg-bone text-ink"
    >
      <GridLines variant="light" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <Eyebrow color="ultramarine">Experience</Eyebrow>
            <SplitText
              as="h2"
              text="Work, education & credentials."
              className="mt-5 font-display text-page-title font-bold text-ink"
              from="bottom"
            />
            <Reveal delay={0.3} className="mt-4 max-w-md text-sm leading-relaxed text-muted-dark">
              A condensed, honest record. Freelance and personal projects are
              labeled as such — no implied full-time employment.
            </Reveal>
          </div>
          <SectionNumber value="07" outline className="text-ink/20" />
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* track + progress beam */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-ink/15 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              aria-hidden
              style={reduce ? undefined : { scaleY: beamScale }}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-violet via-ultramarine to-aqua"
            />
            {/* moving dot */}
            {!reduce && (
              <motion.div
                aria-hidden
                style={{ y: dotY }}
                className="absolute left-1/2 size-3 -translate-x-1/2 rounded-full bg-volt shadow-[0_0_16px_var(--volt)]"
              />
            )}
          </div>

          <ol className="flex flex-col gap-8">
            {flatItems.map((item, i) => {
              const meta = kindMeta[item.kind];
              const Icon = meta.icon;
              const side = i % 2 === 0 ? "left" : "right";
              return (
                <li
                  key={item.id}
                  className="relative pl-10 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
                >
                  {/* node marker */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 grid size-3.5 place-items-center rounded-full border-2 border-violet bg-bone md:left-1/2 md:-translate-x-1/2"
                  />

                  <Reveal
                    direction={side === "left" ? "right" : "left"}
                    delay={0.05}
                    className={cn(
                      "md:col-span-1",
                      side === "right" && "md:col-start-2",
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded-full bg-ink text-bone">
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <span className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-ink/50">
                          {meta.label}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                        {item.role}
                      </h3>
                      <p className="font-mono-token text-[11px] uppercase tracking-[0.18em] text-ultramarine">
                        {item.organization}
                      </p>
                      <p className="font-mono-token text-[11px] uppercase tracking-[0.18em] text-ink/40">
                        {item.dateLabel}
                      </p>

                      <ul className="mt-2 flex flex-col gap-1.5">
                        {item.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="flex items-start gap-2 text-sm leading-relaxed text-ink/70"
                          >
                            <span
                              aria-hidden
                              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {item.technologies && item.technologies.length > 0 ? (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {item.technologies.map((t) => (
                            <li
                              key={t}
                              className="rounded-md border border-ink/15 px-2.5 py-1 font-mono-token text-[10px] uppercase tracking-[0.18em] text-ink/70"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
