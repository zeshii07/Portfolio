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
  BarChart3,
} from "lucide-react";
import type { Project } from "@/types/portfolio";
import { projects, getProjectBySlug } from "@/data/projects";
import { TechBadge, StatusBadge } from "@/components/ui-portfolio/badge";
import { ProjectPoster } from "@/components/ui-portfolio/project-poster";
import {
  ArchitectureDiagram,
  type ArchitectureDiagramVariant,
} from "@/components/visuals/architecture-diagram";
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
            {project.showArchitectureDiagram !== false ? (
              <ArchitectureDiagramBlock slug={project.slug} />
            ) : null}
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

          {project.stats && project.stats.length > 0 ? (
            <Chapter eyebrow="08" title="Headline metrics">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-tangerine/40 bg-tangerine/10 px-3 py-1.5">
                <AlertCircle className="size-3.5 text-tangerine" aria-hidden />
                <span className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-tangerine">
                  Demo data — illustrative, not real customer results
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {project.stats.map((stat) => (
                  <li
                    key={stat.label}
                    className="flex flex-col gap-1 rounded-xl border border-token-dark bg-paper p-4"
                  >
                    <BarChart3 className="size-4 text-ultramarine" aria-hidden />
                    <span className="font-display text-lg font-bold text-ink">{stat.value}</span>
                    <span className="font-mono-token text-[10px] uppercase tracking-[0.18em] text-muted-dark">
                      {stat.label}
                    </span>
                    {stat.isDemoData ? (
                      <span className="mt-1 inline-block w-fit rounded bg-tangerine/15 px-1.5 py-0.5 font-mono-token text-[9px] uppercase tracking-[0.18em] text-tangerine">
                        demo
                      </span>
                    ) : null}
                    {stat.note ? (
                      <p className="mt-1 text-[11px] leading-snug text-muted-dark">{stat.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Chapter>
          ) : null}

          <Chapter eyebrow={project.stats ? "09" : "08"} title="Screenshots & demo">
            {project.screenshots && project.screenshots.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.screenshots.map((shot, i) => (
                  <li key={i}>
                    <ScreenshotFrame src={shot.src} caption={shot.caption} placeholder={shot.placeholder} />
                  </li>
                ))}
              </ul>
            ) : (
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
            )}
          </Chapter>

          <Chapter eyebrow={project.stats ? "10" : "09"} title="Outcome">
            <p className="text-base leading-relaxed text-ink/80">{project.outcome}</p>
          </Chapter>

          <Chapter eyebrow={project.stats ? "11" : "10"} title="Links">
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

/**
 * Inline SVG architecture diagram shown in the Architecture chapter
 * when the project opts in (showArchitectureDiagram !== false).
 * Variant is derived from the project slug.
 */
function ArchitectureDiagramBlock({ slug }: { slug: string }) {
  const variantMap: Record<string, ArchitectureDiagramVariant> = {
    nova: "nova",
    "hirely-ai": "hirely",
    "inventory-management-system": "inventory",
    "client-zaishtech": "client",
    "client-lucky-crystal": "client",
    "client-bytclean": "client",
    "network-security-lab": "generic",
  };
  const variant = variantMap[slug] ?? "generic";
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-token-dark bg-ink p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-volt">
          Architecture diagram
        </span>
        <span className="font-mono-token text-[9px] uppercase tracking-[0.22em] text-muted-light">
          illustrative · not deployment-specific
        </span>
      </div>
      <ArchitectureDiagram
        variant={variant}
        className="w-full h-auto text-bone"
        title={`${slug} architecture diagram`}
      />
    </div>
  );
}

/**
 * Screenshot frame. When `placeholder: true` (or the file is not yet
 * present), renders a labelled browser-frame mock with the project
 * path clearly shown — so it is obvious that a real screenshot needs
 * to be dropped in, but the layout is not broken.
 *
 * When the screenshot file is added to /public, set placeholder:false
 * in the data file and the image renders.
 */
function ScreenshotFrame({
  src,
  caption,
  placeholder,
}: {
  src: string;
  caption: string;
  placeholder?: boolean;
}) {
  const [errored, setErrored] = React.useState(false);
  const showPlaceholder = placeholder || errored;

  if (showPlaceholder) {
    return (
      <figure className="overflow-hidden rounded-xl border border-token-dark bg-ink">
        {/* Browser frame mock */}
        <div className="flex items-center gap-2 border-b border-token-soft bg-ink-soft px-3 py-2">
          <span className="size-2.5 rounded-full bg-tangerine/70" aria-hidden />
          <span className="size-2.5 rounded-full bg-volt/70" aria-hidden />
          <span className="size-2.5 rounded-full bg-aqua/70" aria-hidden />
          <span className="ml-2 truncate font-mono-token text-[10px] text-muted-light">
            {src}
          </span>
        </div>
        {/* Placeholder body */}
        <div className="relative aspect-[16/10] w-full">
          <svg
            aria-hidden
            className="absolute inset-0 size-full"
            viewBox="0 0 400 250"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="shot-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#101016" />
                <stop offset="100%" stopColor="#1B1B26" />
              </linearGradient>
            </defs>
            <rect width="400" height="250" fill="url(#shot-bg)" />
            {/* Grid */}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`v-${i}`} x1={(i + 1) * 55} y1={0} x2={(i + 1) * 55} y2={250} stroke="#1B1B26" strokeWidth={1} />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <line key={`h-${i}`} x1={0} y1={(i + 1) * 50} x2={400} y2={(i + 1) * 50} stroke="#1B1B26" strokeWidth={1} />
            ))}
            {/* Center icon — simple inline SVG, no React component */}
            <circle cx="200" cy="115" r="22" fill="none" stroke="#8B4DFF" strokeWidth={1.5} strokeDasharray="3 3" />
            {/* Mountain + sun pictogram (image icon) */}
            <circle cx="194" cy="109" r="3" fill="#8B4DFF" />
            <path d="M186 124 L196 113 L206 124 Z" fill="none" stroke="#8B4DFF" strokeWidth={1.5} strokeLinejoin="round" />
            <text x="200" y="160" textAnchor="middle" fill="#F6F1E8" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="600">
              Screenshot placeholder
            </text>
            <text x="200" y="180" textAnchor="middle" fill="#9CA3B0" fontFamily="JetBrains Mono, monospace" fontSize="10">
              drop PNG at /public{src}
            </text>
          </svg>
        </div>
        <figcaption className="border-t border-token-soft px-3 py-2 text-xs text-muted-light">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-token-dark bg-ink">
      <div className="flex items-center gap-2 border-b border-token-soft bg-ink-soft px-3 py-2">
        <span className="size-2.5 rounded-full bg-tangerine/70" aria-hidden />
        <span className="size-2.5 rounded-full bg-volt/70" aria-hidden />
        <span className="size-2.5 rounded-full bg-aqua/70" aria-hidden />
        <span className="ml-2 truncate font-mono-token text-[10px] text-muted-light">
          {src}
        </span>
      </div>
      {/* Static screenshot image — not using next/image because these
          are user-dropped PNGs of unknown dimensions and we want the
          onError fallback to swap to the placeholder frame. */}
      <img
        src={src}
        alt={caption}
        onError={() => setErrored(true)}
        className="block aspect-[16/10] w-full object-cover object-top"
        loading="lazy"
      />
      <figcaption className="border-t border-token-soft px-3 py-2 text-xs text-muted-light">
        {caption}
      </figcaption>
    </figure>
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
