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
import { OpenToOpportunities } from "@/components/scenes/open-to-opportunities";
import { ContactScene } from "@/components/scenes/contact-scene";
import { ProjectCaseStudyDialog } from "@/components/projects/project-case-study-dialog";

export default function Home() {
  const [activeProjectSlug, setActiveProjectSlug] = React.useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col bg-ink">
      <ScrollProgress edge="top" color="var(--volt)" />
      <SiteHeader />
      <main className="relative flex-1">
        {/* 01 — Hero: name, role target, primary CTAs */}
        <HeroScene />
        {/* 02 — Kinetic marquee transition */}
        <KineticStatement />
        {/* 03 — Featured project: Nova */}
        <FeaturedNova onOpenProject={setActiveProjectSlug} />
        {/* 04 — All projects wall (Nova, Hirely AI, Inventory, 3 client sites, security lab) */}
        <ProjectWall onOpenProject={setActiveProjectSlug} />
        {/* 05 — Capabilities constellation */}
        <SkillConstellation />
        {/* 06 — About preview (portrait, location Multan, education) */}
        <AboutPreview />
        {/* 07 — Experience timeline (work, freelance, internship, education, training) */}
        <ExperienceTimeline />
        {/* 08 — Open to Opportunities — recruiter-targeted role list */}
        <OpenToOpportunities />
        {/* 09 — Contact form (Nodemailer + Gmail SMTP) */}
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
