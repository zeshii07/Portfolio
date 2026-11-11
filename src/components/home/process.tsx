import { Container } from "@/components/ui-portfolio/container";
import { SectionHeading } from "@/components/ui-portfolio/section-heading";
import { workingProcess } from "@/data/skills";

export function Process() {
  return (
    <section id="process" className="border-y border-token bg-surface/30 py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="How I work"
          title="A simple, four-step process"
          description="No mystery. Every engagement follows the same disciplined path from problem to deployment."
        />

        <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workingProcess.map((item) => (
            <li key={item.step}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-token bg-surface p-6">
                <span className="font-mono-token text-xs uppercase tracking-[0.18em] text-accent-secondary">
                  Step {item.step}
                </span>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
