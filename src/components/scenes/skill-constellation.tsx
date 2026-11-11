"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { orbitalSkillGroups } from "@/data/skills";
import { Eyebrow } from "@/components/studio/eyebrow";
import { SectionNumber } from "@/components/studio/section-number";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { OrbitalGraphic } from "@/components/visuals/orbital-graphic";
import { AmbientGlow } from "@/components/visuals/ambient-glow";
import { GridLines } from "@/components/visuals/grid-lines";
import { cn } from "@/lib/utils";

export function SkillConstellation() {
  const reduce = useReducedMotion();
  const [selectedId, setSelectedId] = React.useState(orbitalSkillGroups[0].id);
  const selected = orbitalSkillGroups.find((g) => g.id === selectedId) ?? orbitalSkillGroups[0];

  return (
    <section
      id="skills"
      aria-label="Capabilities"
      className="relative isolate overflow-hidden bg-ink text-bone"
    >
      <AmbientGlow variant="violet" className="left-[20%] top-[10%] h-[460px] w-[460px] opacity-40" />
      <GridLines variant="dark" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow color="aqua">Capabilities</Eyebrow>
            <SplitText
              as="h2"
              text="A technical constellation."
              className="mt-5 font-display text-page-title font-bold text-bone"
              from="bottom"
            />
            <Reveal delay={0.3} className="mt-4 max-w-md text-base leading-relaxed text-muted-light">
              Grouped by what I can actually do, not by an arbitrary percentage. Tap a node
              to expand the group.
            </Reveal>
          </div>
          <div className="hidden items-end justify-end lg:col-span-5 lg:flex">
            <SectionNumber value="05" outline className="text-bone/30" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          {/* Mobile: segmented selector */}
          <div className="lg:hidden">
            <div
              role="tablist"
              aria-label="Select capability group"
              className="flex flex-wrap gap-1.5"
            >
              {orbitalSkillGroups.map((g) => {
                const isActive = g.id === selectedId;
                return (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setSelectedId(g.id)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 font-mono-token text-[10px] uppercase tracking-[0.18em] transition-all",
                      isActive
                        ? "border-volt bg-volt text-ink"
                        : "border-token-soft text-muted-light hover:text-bone",
                    )}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop: orbital map */}
          <div className="hidden lg:col-span-7 lg:block">
            <OrbitalGraphic
              groups={orbitalSkillGroups.map((g) => ({
                id: g.id,
                label: g.label,
                angle: g.angle,
                skills: g.skills,
              }))}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* Detail panel — changes with selection */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-token-soft bg-ink-soft p-6 sm:p-8">
              <span
                aria-hidden
                className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-volt to-transparent"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-token text-[11px] uppercase tracking-[0.22em] text-volt">
                      {selected.label}
                    </span>
                    <span className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-muted-light">
                      {String(orbitalSkillGroups.indexOf(selected) + 1).padStart(2, "0")} / 0{orbitalSkillGroups.length}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-bone sm:text-3xl">
                    {selected.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-light">
                    {selected.description}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {selected.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-md border border-token-soft bg-ink px-2.5 py-1 font-mono-token text-[10px] uppercase tracking-[0.18em] text-bone"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* pagination dots */}
              <div className="mt-6 flex items-center gap-1.5 border-t border-token-soft pt-4">
                {orbitalSkillGroups.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedId(g.id)}
                    aria-label={`Select ${g.label}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      g.id === selectedId ? "w-8 bg-volt" : "w-1.5 bg-muted-light/40 hover:bg-muted-light",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
