"use client";

import { ArrowUpRight, FolderGit2 } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { PortfolioCard } from "@/components/ui-portfolio/card";
import { ProjectPoster } from "@/components/ui-portfolio/project-poster";
import { TechBadge, StatusBadge } from "@/components/ui-portfolio/badge";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onOpen?: (slug: string) => void;
  className?: string;
}

export function ProjectCard({ project, onOpen, className }: ProjectCardProps) {
  return (
    <PortfolioCard
      interactive
      className={cn("group flex flex-col gap-4 p-0 overflow-hidden", className)}
    >
      <button
        type="button"
        onClick={() => onOpen?.(project.slug)}
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open case study: ${project.title}`}
      >
        <div className="p-5 pb-0">
          <ProjectPoster
            label={project.posterLabel}
            accent={project.posterAccent}
            category={project.category}
          />
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <FolderGit2 className="size-4 text-primary" aria-hidden />
            <h3 className="font-display text-lg font-semibold leading-tight text-foreground">
              {project.title}
            </h3>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-sm leading-relaxed text-secondary">{project.summary}</p>

        <ul className="mt-1 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <li key={tech}>
              <TechBadge variant="default">{tech}</TechBadge>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
            {project.category}
          </span>
          <button
            type="button"
            onClick={() => onOpen?.(project.slug)}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:underline"
          >
            View case study
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </button>
        </div>
      </div>
    </PortfolioCard>
  );
}
