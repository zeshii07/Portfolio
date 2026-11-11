import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { PortfolioButton } from "@/components/ui-portfolio/button";
import { socialLinks, contactInfo } from "@/data/site";
import { SocialLinks } from "@/components/ui-portfolio/social-links";

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-3xl border border-token bg-surface px-6 py-12 sm:px-12 sm:py-16">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-[-10%] h-[360px] w-[360px] rounded-full glow-accent opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid-bg opacity-40"
          />

          <div className="relative flex flex-col items-start gap-6 sm:items-center sm:text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="flex max-w-2xl flex-col gap-3">
              <span className="font-mono-token text-xs uppercase tracking-[0.18em] text-accent-secondary">
                Have a project or role in mind?
              </span>
              <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl text-balance">
                Let&apos;s talk about what you&apos;re building.
              </h2>
              <p className="text-base leading-relaxed text-secondary">
                Whether it&apos;s a full-stack role, a freelance engagement, or a specific
                problem to solve — share the context and I&apos;ll reply with a clear next step.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:items-center lg:items-end">
              <div className="flex flex-col gap-2 sm:flex-row">
                <PortfolioButton asChild size="lg" variant="primary">
                  <a href="#contact" className="group">
                    <Mail aria-hidden />
                    Get in touch
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </PortfolioButton>
                <PortfolioButton asChild size="lg" variant="secondary">
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </PortfolioButton>
              </div>
              <SocialLinks
                links={socialLinks}
                className="flex items-center gap-2"
                iconClassName="size-4"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
