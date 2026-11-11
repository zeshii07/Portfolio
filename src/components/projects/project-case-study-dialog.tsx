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
import { PortfolioButton } from "@/components/ui-portfolio/button";
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

  // Pre-compute next project for the CTA at the bottom
  const nextProject: Project | null = React.useMemo(() => {
    if (!project) return null;
    const idx = projects.findIndex((p) => p.slug === project.slug);
    if (idx === -1) return null;
    const next = projects[(idx + 1) % projects.length];
    return next ?? null;
  }, [project]);

  // Lock scroll while open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onOpenChange(null)}>
      <DialogContent
        className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border-token bg-background p-0 sm:max-w-5xl"
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
      {/* Header band */}
      <header className="sticky top-0 z-10 border-b border-token bg-background/95 backdrop-blur">
        <div className="flex items-start justify-between gap-4 px-6 py-4 sm:px-8">
          <div className="flex flex-col gap-1">
            <DialogTitle className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-secondary">
              {project.summary}
            </DialogDescription>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        {/* Overview meta + poster */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ProjectPoster
              label={project.posterLabel}
              accent={project.posterAccent}
              category={project.category}
              className="aspect-[16/10] w-full"
            />
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 self-start lg:col-span-5">
            <Meta label="Project type" value={project.projectType} />
            <Meta label="Status" value={<StatusBadge status={project.status} />} />
            <Meta label="Dates" value={project.dateLabel} />
            <Meta label="Category" value={project.category} />
            <Meta label="Role" value={project.role} fullWidth />
          </dl>
        </div>

        {/* Sections */}
        <div className="mt-10 flex flex-col gap-10">
          <CaseStudySection eyebrow="01" title="Overview">
            <p className="text-base leading-relaxed text-secondary">{project.summary}</p>
            <p className="text-base leading-relaxed text-secondary">
              Role: <span className="text-foreground">{project.role}</span>. Type:{" "}
              <span className="text-foreground">{project.projectType}</span>. Status:{" "}
              <span className="text-foreground">{project.status}</span> ({project.dateLabel}).
            </p>
          </CaseStudySection>

          <CaseStudySection eyebrow="02" title="The problem">
            <p className="text-base leading-relaxed text-secondary">{project.problem}</p>
          </CaseStudySection>

          <CaseStudySection eyebrow="03" title="The solution">
            <p className="text-base leading-relaxed text-secondary">{project.solution}</p>
          </CaseStudySection>

          <CaseStudySection eyebrow="04" title="Features">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature.title}
                  className="flex flex-col gap-1.5 rounded-xl border border-token bg-surface p-4"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-accent-secondary" aria-hidden />
                    <span className="font-display text-sm font-semibold text-foreground">
                      {feature.title}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection eyebrow="05" title="Architecture">
            <ul className="flex flex-col gap-3">
              {project.architecture.map((layer) => (
                <li
                  key={layer.label}
                  className="grid grid-cols-1 gap-1 rounded-xl border border-token bg-surface p-4 sm:grid-cols-[180px_1fr] sm:gap-4"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-primary" aria-hidden />
                    <span className="font-mono-token text-xs uppercase tracking-wide text-accent-secondary">
                      {layer.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">{layer.details}</p>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection eyebrow="06" title="Technology stack">
            <ul className="flex flex-col gap-3">
              {project.stack.map((s) => (
                <li
                  key={s.name}
                  className="flex flex-col gap-1 rounded-xl border border-token bg-surface p-4"
                >
                  <div className="flex items-center gap-2">
                    <GitBranch className="size-4 text-accent-secondary" aria-hidden />
                    <span className="font-display text-sm font-semibold text-foreground">
                      {s.name}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">{s.why}</p>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <TechBadge variant="accent">{tech}</TechBadge>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection eyebrow="07" title="Challenges &amp; decisions">
            <ul className="flex flex-col gap-3">
              {project.challenges.map((c, idx) => (
                <li
                  key={idx}
                  className="flex flex-col gap-3 rounded-xl border border-token bg-surface p-4"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 size-4 text-[#F5B942]" aria-hidden />
                    <div className="flex flex-col gap-1">
                      <span className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
                        Challenge
                      </span>
                      <p className="text-sm leading-relaxed text-foreground">
                        {c.challenge}
                      </p>
                    </div>
                  </div>
                  <div className="ml-6 flex flex-col gap-1">
                    <span className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
                      Alternatives
                    </span>
                    <p className="text-sm leading-relaxed text-secondary">{c.alternatives}</p>
                  </div>
                  <div className="ml-6 flex flex-col gap-1">
                    <span className="font-mono-token text-[11px] uppercase tracking-wide text-accent-secondary">
                      Resolution
                    </span>
                    <p className="text-sm leading-relaxed text-secondary">{c.resolution}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection eyebrow="08" title="Screenshots &amp; demo">
            <div className="rounded-xl border border-dashed border-token bg-surface/40 p-6 text-center">
              <div className="mx-auto inline-flex items-center justify-center rounded-lg border border-token bg-surface-raised p-3 text-secondary">
                <Wrench className="size-5" aria-hidden />
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-foreground">
                Annotated screenshots coming soon
              </p>
              <p className="mx-auto mt-1 max-w-md text-sm text-secondary">
                Public screenshots are added only with the appropriate permissions. Live demos
                are linked below where they exist.
              </p>
            </div>
          </CaseStudySection>

          <CaseStudySection eyebrow="09" title="Outcome">
            <p className="text-base leading-relaxed text-secondary">{project.outcome}</p>
          </CaseStudySection>

          <CaseStudySection eyebrow="10" title="Links">
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
                        "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                        isPrivate
                          ? "border-token bg-surface text-secondary"
                          : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </CaseStudySection>
        </div>

        {/* Next project CTA */}
        {nextProject ? (
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-token bg-surface p-6 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <span className="font-mono-token text-[11px] uppercase tracking-wide text-accent-secondary">
                Next project
              </span>
              <p className="font-display text-base font-semibold text-foreground">
                {nextProject.title}
              </p>
              <p className="text-sm text-secondary">{nextProject.summary}</p>
            </div>
            <PortfolioButton
              variant="outline"
              onClick={() => onOpenNext(nextProject.slug)}
              className="group"
            >
              View case study
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </PortfolioButton>
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to projects
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-token bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-raised"
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
      <dt className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

function CaseStudySection({
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
        <span className="font-mono-token text-xs text-accent-secondary">{eyebrow}</span>
        <span aria-hidden className="h-px w-8 bg-token" />
        <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
