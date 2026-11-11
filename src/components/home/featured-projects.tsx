"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { SectionHeading } from "@/components/ui-portfolio/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { PortfolioButton } from "@/components/ui-portfolio/button";
import { projects } from "@/data/projects";

interface FeaturedProjectsProps {
  onOpenProject: (slug: string) => void;
}

export function FeaturedProjects({ onOpenProject }: FeaturedProjectsProps) {
  const featured = projects.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section id="featured" className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured work"
            title="Selected projects"
            description="A focused sample of what I build: full-stack applications, AI automation, business software, and security lab work."
          />
          <PortfolioButton asChild variant="link" size="sm" className="self-start sm:self-end">
            <a href="#projects">
              View all projects
              <ArrowRight aria-hidden />
            </a>
          </PortfolioButton>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={onOpenProject} />
          ))}
        </div>
      </Container>
    </section>
  );
}
