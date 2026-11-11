import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui-portfolio/container";
import { SectionHeading } from "@/components/ui-portfolio/section-heading";
import { PortfolioCard } from "@/components/ui-portfolio/card";
import { SkillIcon } from "@/components/ui-portfolio/skill-icon";
import { services } from "@/data/services";

export function ServicesPreview() {
  return (
    <section id="services-preview" className="border-y border-token bg-surface/30 py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="What I can help with"
          title="Services"
          description="Honest, scoped engagements. Each service states what is included, who it helps, and what you receive."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <PortfolioCard key={service.id} interactive className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-token bg-surface-raised text-primary">
                  <SkillIcon name={service.icon} className="size-5" />
                </span>
                <h3 className="font-display text-base font-semibold leading-tight text-foreground">
                  {service.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-secondary">{service.tagline}</p>
              <Link
                href="#services"
                className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Learn more
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </PortfolioCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
