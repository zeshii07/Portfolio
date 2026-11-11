"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { projectCategories } from "@/data/projects";
import { Eyebrow } from "@/components/studio/eyebrow";
import { SectionNumber } from "@/components/studio/section-number";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ImageMaskReveal } from "@/components/motion/image-mask-reveal";
import { ProjectPoster } from "@/components/ui-portfolio/project-poster";
import { StatusBadge } from "@/components/ui-portfolio/badge";
import { useState, useMemo } from "react";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectWallProps {
  onOpenProject: (slug: string) => void;
}

export function ProjectWall({ onOpenProject }: ProjectWallProps) {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    return projects.filter(
      (p) => active === "All" || (p.category as ProjectCategory) === active,
    );
  }, [active]);

  return (
    <section
      id="projects"
      aria-label="Selected work"
      className="relative isolate bg-bone text-ink"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:py-32">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow color="violet">Selected work / 01—</Eyebrow>
            <SplitText
              as="h2"
              text="Things I have built."
              className="mt-5 font-display text-page-title font-bold text-ink"
              from="bottom"
              stagger={0.08}
            />
            <Reveal delay={0.4} className="mt-4 max-w-md text-sm leading-relaxed text-muted-dark">
              Full-stack applications, AI automation, business software, and security
              lab work. Each project gets its own composition — no identical card grid.
            </Reveal>
          </div>

          {/* Filters */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-1.5"
          >
            {projectCategories.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 font-mono-token text-[10px] uppercase tracking-[0.18em] transition-all",
                    isActive
                      ? "border-ink bg-ink text-bone"
                      : "border-ink/15 bg-transparent text-ink/60 hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric editorial layout — render each project with its own composition */}
        <div className="flex flex-col gap-20 sm:gap-28">
          {filtered.map((project, i) => (
            <ProjectFeature
              key={project.slug}
              project={project}
              index={i}
              onOpen={() => onOpenProject(project.slug)}
              reduce={reduce}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-ink/20 bg-paper px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              No projects match that filter.
            </p>
            <button
              type="button"
              onClick={() => setActive("All")}
              className="mt-3 font-mono-token text-[11px] uppercase tracking-[0.18em] text-violet hover:text-ink"
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Each project gets a distinct composition driven by its index.
 */
function ProjectFeature({
  project,
  index,
  onOpen,
  reduce,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
  reduce: boolean | null;
}) {
  // rotate through a small set of accent + layout combinations
  const layoutVariant = index % 4;

  return (
    <article
      className="relative"
      aria-labelledby={`project-title-${project.slug}`}
    >
      {/* giant numeral */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-8 right-0 select-none font-display text-[clamp(4rem,10vw,9rem)] font-bold leading-none",
          layoutVariant === 0 && "text-ink/5",
          layoutVariant === 1 && "text-violet/15",
          layoutVariant === 2 && "text-ultramarine/15",
          layoutVariant === 3 && "text-tangerine/20",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {layoutVariant === 0 ? (
        // Layout A: image left, text right (portrait-feel poster)
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ImageMaskReveal from="left" duration={0.9}>
              <button
                onClick={onOpen}
                aria-label={`Open case study: ${project.title}`}
                className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
              >
                <ProjectPoster
                  label={project.posterLabel}
                  accent={project.posterAccent}
                  category={project.category}
                  className="aspect-[16/10] w-full"
                />
              </button>
            </ImageMaskReveal>
          </div>
          <div className="lg:col-span-5">
            <ProjectCopyBlock project={project} onOpen={onOpen} reduce={reduce} />
          </div>
        </div>
      ) : layoutVariant === 1 ? (
        // Layout B: text left, image right
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ProjectCopyBlock project={project} onOpen={onOpen} reduce={reduce} />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <ImageMaskReveal from="right" duration={0.9}>
              <button
                onClick={onOpen}
                aria-label={`Open case study: ${project.title}`}
                className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
              >
                <ProjectPoster
                  label={project.posterLabel}
                  accent={project.posterAccent}
                  category={project.category}
                  className="aspect-[16/10] w-full"
                />
              </button>
            </ImageMaskReveal>
          </div>
        </div>
      ) : layoutVariant === 2 ? (
        // Layout C: tangerine label strip + wide landscape
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-tangerine px-3 py-1 font-mono-token text-[10px] uppercase tracking-[0.18em] text-white">
              {project.category}
            </span>
            <span className="font-mono-token text-[10px] uppercase tracking-[0.18em] text-ink/50">
              {project.dateLabel}
            </span>
          </div>
          <button
            onClick={onOpen}
            aria-label={`Open case study: ${project.title}`}
            className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
          >
            <ImageMaskReveal from="bottom" duration={1}>
              <ProjectPoster
                label={project.posterLabel}
                accent={project.posterAccent}
                category={project.category}
                className="aspect-[21/9] w-full"
              />
            </ImageMaskReveal>
          </button>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8">
            <h3
              id={`project-title-${project.slug}`}
              className="font-display text-project-title font-bold text-ink sm:col-span-7"
            >
              {project.title}
            </h3>
            <div className="sm:col-span-5">
              <p className="text-base leading-relaxed text-muted-dark">
                {project.summary}
              </p>
              <button
                onClick={onOpen}
                className="group mt-4 inline-flex items-center gap-2 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-ink"
              >
                View case study
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Layout D: text-led editorial entry with floating poster
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal direction="up">
              <span className="font-mono-token text-[11px] uppercase tracking-[0.22em] text-ink/40">
                Project {String(index + 1).padStart(2, "0")}
              </span>
            </Reveal>
            <Reveal delay={0.1} direction="up">
              <h3
                id={`project-title-${project.slug}`}
                className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] text-ink"
              >
                {project.title}
              </h3>
            </Reveal>
            <Reveal delay={0.2} direction="up">
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-dark">
                {project.summary}
              </p>
            </Reveal>
            <Reveal delay={0.3} direction="up" className="mt-5">
              <ul className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 5).map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-ink/15 px-2.5 py-1 font-mono-token text-[10px] uppercase tracking-[0.18em] text-ink/70"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.4} direction="up" className="mt-8">
              <button
                onClick={onOpen}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-bone transition-transform hover:-translate-y-0.5"
              >
                View case study
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </button>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <ImageMaskReveal from="right" duration={1}>
              <button
                onClick={onOpen}
                aria-label={`Open case study: ${project.title}`}
                className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
              >
                <ProjectPoster
                  label={project.posterLabel}
                  accent={project.posterAccent}
                  category={project.category}
                  className="aspect-[4/3] w-full"
                />
              </button>
            </ImageMaskReveal>
          </div>
        </div>
      )}
    </article>
  );
}

function ProjectCopyBlock({
  project,
  onOpen,
  reduce,
}: {
  project: Project;
  onOpen: () => void;
  reduce: boolean | null;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Reveal direction="up">
        <div className="flex items-center gap-3">
          <span className="font-mono-token text-[11px] uppercase tracking-[0.22em] text-ink/40">
            Project
          </span>
          <StatusBadge status={project.status} />
        </div>
      </Reveal>
      <Reveal delay={0.1} direction="up">
        <h3
          id={`project-title-${project.slug}`}
          className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] text-ink"
        >
          {project.title}
        </h3>
      </Reveal>
      <Reveal delay={0.2} direction="up">
        <p className="text-base leading-relaxed text-muted-dark">{project.summary}</p>
      </Reveal>
      <Reveal delay={0.3} direction="up" className="mt-1">
        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((t) => (
            <li
              key={t}
              className="rounded-md border border-ink/15 px-2.5 py-1 font-mono-token text-[10px] uppercase tracking-[0.18em] text-ink/70"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.4} direction="up" className="mt-6">
        <button
          onClick={onOpen}
          className="group inline-flex items-center gap-2 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-ink"
        >
          View case study
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </button>
      </Reveal>
    </div>
  );
}
