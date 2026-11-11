import { Container } from "@/components/ui-portfolio/container";
import { credibilityHighlights } from "@/data/skills";

export function CredibilityStrip() {
  return (
    <section aria-label="Quick highlights" className="border-y border-token bg-surface/40">
      <Container size="wide">
        <ul className="grid grid-cols-1 divide-y divide-token sm:grid-cols-2 sm:divide-x lg:grid-cols-5 lg:divide-y-0">
          {credibilityHighlights.map((item) => (
            <li
              key={item.label}
              className="flex flex-col gap-0.5 px-5 py-5 text-center sm:text-left"
            >
              <span className="font-display text-sm font-semibold text-foreground sm:text-[15px]">
                {item.label}
              </span>
              <span className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
                {item.sub}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
