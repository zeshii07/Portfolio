"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { CredibilityStrip } from "@/components/home/credibility-strip";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesPreview } from "@/components/home/services-preview";
import { SkillsSnapshot } from "@/components/home/skills-snapshot";
import { Process } from "@/components/home/process";
import { About } from "@/components/home/about";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { ProjectCaseStudyDialog } from "@/components/projects/project-case-study-dialog";
import { ServicesSection } from "@/components/home/services-section";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { ContactSection } from "@/components/contact/contact-section";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  const [activeProjectSlug, setActiveProjectSlug] = React.useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CredibilityStrip />
        <FeaturedProjects onOpenProject={setActiveProjectSlug} />
        <About />
        <ProjectsGallery onOpenProject={setActiveProjectSlug} />
        <ServicesSection />
        <ServicesPreview />
        <SkillsSnapshot />
        <Process />
        <ExperienceTimeline />
        <FinalCTA />
        <ContactSection />
      </main>
      <Footer />

      <ProjectCaseStudyDialog
        slug={activeProjectSlug}
        onOpenChange={setActiveProjectSlug}
      />
    </div>
  );
}
