import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { SectionHeading } from "@/components/ui-portfolio/section-heading";
import { PortfolioCard } from "@/components/ui-portfolio/card";
import { PortfolioButton } from "@/components/ui-portfolio/button";
import { SkillIcon } from "@/components/ui-portfolio/skill-icon";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you"
          description="Each engagement starts with a discovery call and a written scope. No guaranteed rankings, perfect security, or guaranteed growth — just honest, scoped delivery."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service) => (
            <PortfolioCard key={service.id} interactive className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-token bg-surface-raised text-primary">
                  <SkillIcon name={service.icon} className="size-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-secondary">{service.tagline}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <span className="font-mono-token text-[11px] uppercase tracking-wide text-accent-secondary">
                    What&apos;s included
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-secondary"
                      >
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[#35C98A]" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono-token text-[11px] uppercase tracking-wide text-accent-secondary">
                    What you receive
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-secondary"
                      >
                        <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-token pt-4">
                <p className="text-xs text-secondary">
                  <span className="font-mono-token uppercase tracking-wide">Who it helps:</span>{" "}
                  {service.audience}
                </p>
                <PortfolioButton asChild size="sm" variant="link">
                  <a href={`#contact?service=${service.id}`}>
                    Enquire
                    <ArrowRight className="size-4" aria-hidden />
                  </a>
                </PortfolioButton>
              </div>
            </PortfolioCard>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-token bg-gradient-to-br from-surface-raised via-surface to-surface p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                Tell me what you need built
              </h3>
              <p className="text-sm text-secondary">
                Share the problem, your timeline, and any constraints. I&apos;ll reply with a
                short scope and a clear yes or no.
              </p>
            </div>
            <PortfolioButton asChild size="lg" variant="primary">
              <a href="#contact">Start an enquiry</a>
            </PortfolioButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
