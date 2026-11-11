"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Github,
  Lock,
  FileText,
  ArrowRight,
  ArrowLeft,
  Layers,
  Wrench,
  GitBranch,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Project } from "@/types/portfolio";
import { projects, getProjectBySlug } from "@/data/projects";
import { TechBadge, StatusBadge } from "@/components/ui-portfolio/badge";
import { ProjectPoster } from "@/components/ui-portfolio/project-poster";
import { cn } from "@/lib/utils";

interface ProjectCaseStudyDialogProps {
  slug: string | null;
  onOpenChange: (slug: string | null) => void;
}

export function ProjectCaseStudyDialog({
  slug,
  onOpenChange,
}: ProjectCaseStudyDialogProps) {
  const project = slug ? getProjectBySlug(slug) ?? null : null;
  const open = Boolean(project);

  const nextProject: Project | null = React.useMemo(() => {
    if (!project) return null;
    const idx = projects.findIndex((p) => p.slug === project.slug);
    if (idx === -1) return null;
    return projects[(idx + 1) % projects.length] ?? null;
  }, [project]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onOpenChange(null)}>
      <DialogContent
        className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border-token-soft bg-bone p-0 text-ink"
      >
        {project ? (
          <CaseStudyBody
            project={project}
            nextProject={nextProject}
            onClose={() => onOpenChange(null)}
            onOpenNext={(s) => onOpenChange(s)}
          />
        ) : (
          <DialogTitle className="sr-only">Case study</DialogTitle>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CaseStudyBody({
  project,
  nextProject,
  onClose,
  onOpenNext,
}: {
  project: Project;
  nextProject: Project | null;
  onClose: () => void;
  onOpenNext: (slug: string) => void;
}) {
  return (
    <article>
      {/* Header band — bone with giant numeral */}
      <header className="sticky top-0 z-10 border-b border-token-dark bg-bone/95 backdrop-blur">
        <div className="flex items-start justify-between gap-4 px-6 py-4 sm:px-10">
          <div className="flex items-baseline gap-4">
            <span
              aria-hidden
              className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-none text-ink/15"
            >
              {String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <DialogTitle className="font-display text-xl font-semibold text-ink sm:text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-dark">
                {project.summary}
              </DialogDescription>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        {/* Hero block + metadata rail */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <ProjectPoster
              label={project.posterLabel}
              accent={project.posterAccent}
              category={project.category}
              tone="ink"
              className="aspect-[16/10] w-full"
            />
          </div>

          {/* sticky metadata rail */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 rounded-2xl border border-token-dark bg-paper p-5">
                <Meta label="Type" value={project.projectType} />
                <Meta label="Status" value={<StatusBadge status={project.status} />} />
                <Meta label="Dates" value={project.dateLabel} />
                <Meta label="Category" value={project.category} />
                <Meta label="Role" value={project.role} fullWidth />
              </dl>

              <div className="mt-4 rounded-2xl border border-token-dark bg-paper p-5">
                <span className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-muted-dark">
                  Stack
                </span>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <li key={t}>
                      <TechBadge variant="default">{t}</TechBadge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Case-study chapters */}
        <div className="mt-12 flex flex-col gap-12">
          <Chapter eyebrow="01" title="Overview">
            <p className="text-base leading-relaxed text-ink/80">{project.summary}</p>
            <p className="text-base leading-relaxed text-ink/80">
              Role: <span className="text-ink">{project.role}</span>. Type:{" "}
              <span className="text-ink">{project.projectType}</span>. Status:{" "}
              <span className="text-ink">{project.status}</span> ({project.dateLabel}).
            </p>
          </Chapter>

          <Chapter eyebrow="02" title="The problem">
            <p className="text-base leading-relaxed text-ink/80">{project.problem}</p>
          </Chapter>

          <Chapter eyebrow="03" title="The solution">
            <p className="text-base leading-relaxed text-ink/80">{project.solution}</p>
          </Chapter>

          <Chapter eyebrow="04" title="Features">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature.title}
                  className="flex flex-col gap-1.5 rounded-xl border border-token-dark bg-paper p-4"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-ultramarine" aria-hidden />
                    <span className="font-display text-sm font-semibold text-ink">
                      {feature.title}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/70">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter eyebrow="05" title="Architecture">
            <ul className="flex flex-col gap-3">
              {project.architecture.map((layer) => (
                <li
                  key={layer.label}
                  className="grid grid-cols-1 gap-1 rounded-xl border border-token-dark bg-paper p-4 sm:grid-cols-[180px_1fr] sm:gap-4"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-violet" aria-hidden />
                    <span className="font-mono-token text-xs uppercase tracking-[0.18em] text-ultramarine">
                      {layer.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/70">{layer.details}</p>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter eyebrow="06" title="Technology stack">
            <ul className="flex flex-col gap-3">
              {project.stack.map((s) => (
                <li
                  key={s.name}
                  className="flex flex-col gap-1 rounded-xl border border-token-dark bg-paper p-4"
                >
                  <div className="flex items-center gap-2">
                    <GitBranch className="size-4 text-aqua" aria-hidden />
                    <span className="font-display text-sm font-semibold text-ink">
                      {s.name}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/70">{s.why}</p>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter eyebrow="07" title="Challenges & decisions">
            <ul className="flex flex-col gap-3">
              {project.challenges.map((c, idx) => (
                <li
                  key={idx}
                  className="flex flex-col gap-3 rounded-xl border border-token-dark bg-paper p-4"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 size-4 text-tangerine" aria-hidden />
                    <div className="flex flex-col gap-1">
                      <span className="font-mono-token text-[11px] uppercase tracking-[0.18em] text-muted-dark">
                        Challenge
                      </span>
                      <p className="text-sm leading-relaxed text-ink">{c.challenge}</p>
                    </div>
                  </div>
                  <div className="ml-6 flex flex-col gap-1">
                    <span className="font-mono-token text-[11px] uppercase tracking-[0.18em] text-muted-dark">
                      Alternatives
                    </span>
                    <p className="text-sm leading-relaxed text-ink/70">{c.alternatives}</p>
                  </div>
                  <div className="ml-6 flex flex-col gap-1">
                    <span className="font-mono-token text-[11px] uppercase tracking-[0.18em] text-ultramarine">
                      Resolution
                    </span>
                    <p className="text-sm leading-relaxed text-ink/70">{c.resolution}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter eyebrow="08" title="Screenshots & demo">
            <div className="rounded-xl border border-dashed border-token-dark bg-paper p-6 text-center">
              <div className="mx-auto inline-flex items-center justify-center rounded-lg border border-token-dark bg-bone p-3 text-muted-dark">
                <Wrench className="size-5" aria-hidden />
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-ink">
                Annotated screenshots coming soon
              </p>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-dark">
                Public screenshots are added only with the appropriate permissions.
                Live demos are linked below where they exist.
              </p>
            </div>
          </Chapter>

          <Chapter eyebrow="09" title="Outcome">
            <p className="text-base leading-relaxed text-ink/80">{project.outcome}</p>
          </Chapter>

          <Chapter eyebrow="10" title="Links">
            <ul className="flex flex-wrap gap-3">
              {project.links.map((link) => {
                const isPrivate = link.type === "private";
                const Icon =
                  link.type === "live"
                    ? ExternalLink
                    : link.type === "github"
                      ? Github
                      : link.type === "private"
                        ? Lock
                        : FileText;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("#") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                        isPrivate
                          ? "border-token-dark bg-bone text-muted-dark"
                          : "border-violet/40 bg-violet/10 text-violet hover:bg-violet/15",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Chapter>
        </div>

        {/* Next project CTA */}
        {nextProject ? (
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl bg-ink p-6 text-bone sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <span className="font-mono-token text-[11px] uppercase tracking-[0.22em] text-volt">
                Next project
              </span>
              <p className="font-display text-base font-semibold">{nextProject.title}</p>
              <p className="text-sm text-muted-light">{nextProject.summary}</p>
            </div>
            <button
              type="button"
              onClick={() => onOpenNext(nextProject.slug)}
              className="group inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3.5 font-mono-token text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-transform hover:-translate-y-0.5"
            >
              View case study
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between border-t border-token-dark pt-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-dark hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to projects
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-token-dark bg-bone px-4 py-2 text-sm font-medium text-ink hover:bg-paper"
          >
            Close
          </button>
        </div>
      </div>
    </article>
  );
}

function Meta({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-1", fullWidth && "col-span-2")}>
      <dt className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-muted-dark">
        {label}
      </dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}

function Chapter({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-none text-ink/15">
          {eyebrow}
        </span>
        <span aria-hidden className="h-px w-8 bg-ink/15" />
        <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
