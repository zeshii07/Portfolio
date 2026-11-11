"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { SectionHeading } from "@/components/ui-portfolio/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { Input } from "@/components/ui/input";
import { projects, projectCategories } from "@/data/projects";
import type { ProjectCategory } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectsGalleryProps {
  onOpenProject: (slug: string) => void;
}

export function ProjectsGallery({ onOpenProject }: ProjectsGalleryProps) {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = active === "All" || (p.category as ProjectCategory) === active;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          description="Full-stack applications, AI automation, business software, and security lab work. Filter by category or search by technology."
        />

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Filters */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
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
                    "rounded-full border px-3.5 py-1.5 font-mono-token text-[11px] uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-token bg-surface text-secondary hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary"
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech…"
              aria-label="Search projects"
              className="h-10 border-token bg-surface pl-9 text-sm text-foreground placeholder:text-secondary"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} onOpen={onOpenProject} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-token bg-surface/40 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-foreground">
              No projects match that filter.
            </p>
            <p className="mt-1 text-sm text-secondary">
              Try a different category or clear the search.
            </p>
            <button
              type="button"
              onClick={() => {
                setActive("All");
                setQuery("");
              }}
              className="mt-4 text-sm font-medium text-primary hover:text-primary/80"
            >
              Reset filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
