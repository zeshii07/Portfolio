import { Briefcase, GraduationCap, Award, BookOpen, Building2, Wrench } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { SectionHeading } from "@/components/ui-portfolio/section-heading";
import { TechBadge } from "@/components/ui-portfolio/badge";
import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const kindMeta: Record<
  ExperienceItem["kind"],
  { label: string; icon: typeof Briefcase }
> = {
  work: { label: "Work", icon: Briefcase },
  internship: { label: "Internship", icon: Building2 },
  freelance: { label: "Freelance", icon: Briefcase },
  education: { label: "Education", icon: GraduationCap },
  certification: { label: "Certification", icon: Award },
  training: { label: "Training", icon: BookOpen },
};

const orderedKinds: ExperienceItem["kind"][] = [
  "work",
  "freelance",
  "internship",
  "education",
  "certification",
  "training",
];

export function ExperienceTimeline() {
  const grouped = orderedKinds
    .map((kind) => ({
      kind,
      items: experience.filter((e) => e.kind === kind),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="experience" className="border-y border-token bg-surface/30 py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="Experience"
          title="Work, education &amp; certifications"
          description="A condensed, honest record. Each entry includes role, dates, achievements, and technologies used."
        />

        <div className="mt-10 flex flex-col gap-10">
          {grouped.map((group) => {
            const meta = kindMeta[group.kind];
            const Icon = meta.icon;
            return (
              <div key={group.kind} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl border border-token bg-surface-raised text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <h3 className="font-display text-base font-semibold uppercase tracking-wide text-foreground">
                    {meta.label}
                  </h3>
                  <span aria-hidden className="h-px flex-1 bg-token" />
                </div>

                <ol className="relative ml-4 flex flex-col gap-6 border-l border-token pl-6">
                  {group.items.map((item) => (
                    <li key={item.id} className="relative">
                      <span
                        aria-hidden
                        className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-primary bg-background"
                      />
                      <div className="rounded-2xl border border-token bg-surface p-5">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <h4 className="font-display text-base font-semibold text-foreground">
                            {item.role}
                          </h4>
                          <span className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
                            {item.dateLabel}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-accent-secondary">
                          {item.organization}
                        </p>
                        <ul className="mt-3 flex flex-col gap-1.5">
                          {item.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm leading-relaxed text-secondary"
                            >
                              <span
                                aria-hidden
                                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        {item.technologies && item.technologies.length > 0 ? (
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {item.technologies.map((t) => (
                              <li key={t}>
                                <TechBadge variant="default">{t}</TechBadge>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {item.evidence && item.evidence.length > 0 ? (
                          <ul className="mt-3 flex flex-wrap gap-3">
                            {item.evidence.map((e) => (
                              <li key={e.label}>
                                <a
                                  href={e.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                                >
                                  <Wrench className="size-3.5" aria-hidden />
                                  {e.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
