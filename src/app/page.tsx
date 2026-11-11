"use client";

import * as React from "react";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/shell/site-footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { HeroScene } from "@/components/scenes/hero-scene";
import { KineticStatement } from "@/components/scenes/kinetic-statement";
import { FeaturedNova } from "@/components/scenes/featured-nova";
import { ProjectWall } from "@/components/scenes/project-wall";
import { SkillConstellation } from "@/components/scenes/skill-constellation";
import { AboutPreview } from "@/components/scenes/about-preview";
import { ExperienceTimeline } from "@/components/scenes/experience-timeline";
import { ContactScene } from "@/components/scenes/contact-scene";
import { ProjectCaseStudyDialog } from "@/components/projects/project-case-study-dialog";

export default function Home() {
  const [activeProjectSlug, setActiveProjectSlug] = React.useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col bg-ink">
      <ScrollProgress edge="top" color="var(--volt)" />
      <SiteHeader />
      <main className="relative flex-1">
        <HeroScene />
        <KineticStatement />
        <FeaturedNova onOpenProject={setActiveProjectSlug} />
        <ProjectWall onOpenProject={setActiveProjectSlug} />
        <SkillConstellation />
        <AboutPreview />
        <ExperienceTimeline />
        <ContactScene />
      </main>
      <SiteFooter />

      <ProjectCaseStudyDialog
        slug={activeProjectSlug}
        onOpenChange={setActiveProjectSlug}
      />
    </div>
  );
}
