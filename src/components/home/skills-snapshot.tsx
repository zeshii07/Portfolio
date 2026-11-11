import { Container } from "@/components/ui-portfolio/container";
import { SectionHeading } from "@/components/ui-portfolio/section-heading";
import { PortfolioCard } from "@/components/ui-portfolio/card";
import { SkillIcon } from "@/components/ui-portfolio/skill-icon";
import { skillGroups } from "@/data/skills";

export function SkillsSnapshot() {
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="Capability map"
          title="Skills, grouped by what I can do"
          description="Only technologies I can discuss and demonstrate. No arbitrary percentage bars."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {skillGroups.map((group) => (
            <PortfolioCard key={group.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-token bg-surface-raised text-accent-secondary">
                  <SkillIcon name={group.icon} className="size-4" />
                </span>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {group.title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-token bg-surface-raised/60 px-2 py-1 font-mono-token text-[11px] text-secondary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </PortfolioCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
