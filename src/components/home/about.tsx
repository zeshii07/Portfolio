import { GraduationCap, Code2, Bot, ShieldCheck, Lightbulb, Heart } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { SectionHeading } from "@/components/ui-portfolio/section-heading";
import { PortfolioCard } from "@/components/ui-portfolio/card";
import { PortfolioButton } from "@/components/ui-portfolio/button";
import { Download } from "lucide-react";

const focusAreas = [
  {
    icon: Code2,
    title: "Full-stack development",
    body: "End-to-end web applications: React/Next.js frontends, Node.js APIs, and relational databases designed for the actual access pattern.",
  },
  {
    icon: Bot,
    title: "AI-enabled products",
    body: "Practical AI: retrieval-augmented assistants, structured prompt pipelines, and automation that is grounded and verifiable.",
  },
  {
    icon: ShieldCheck,
    title: "Secure engineering",
    body: "Input validation, authorization on every route, secrets server-side, and security-conscious defaults from the first commit.",
  },
];

const currentLearning = [
  "Software architecture and modular system design",
  "Cloud deployment and observability",
  "AI/ML: retrieval pipelines and evaluation",
  "Networking and security: deeper hands-on practice",
];

const personalInterests = [
  "Writing technical notes and case studies",
  "Reading engineering postmortems",
];

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: intro + education */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About"
              title="A focused engineer who ships useful software"
              description="My background is in Information Technology, and my day-to-day work is building web applications, AI automation, and secure engineering tooling. I care more about working software than buzzwords."
            />

            <div className="mt-8 space-y-4 text-base leading-relaxed text-secondary">
              <p>
                I'm a software developer with a practical IT background and a focus on
                full-stack web applications, AI automation, and security-conscious engineering.
                I work best when a problem is concrete and the goal is shipped, maintainable software.
              </p>
              <p>
                My projects span multi-tenant automation platforms, AI-assisted interview tools,
                business software like inventory systems, and hands-on security lab work. Each one
                is built to be explainable: I can walk through the architecture, the trade-offs,
                and what I would do differently next time.
              </p>
              <p>
                I write code I can hand over. Clear structure, typed models where it pays off,
                tests for the edges, and documentation so the next person — including future me —
                can pick it up without guesswork.
              </p>
            </div>

            {/* Education */}
            <PortfolioCard className="mt-8 flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-token bg-surface-raised text-accent-secondary">
                <GraduationCap className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
                  Education
                </span>
                <h3 className="font-display text-base font-semibold text-foreground">
                  BS Information Technology
                </h3>
                <p className="text-sm text-secondary">
                  University of the Punjab — coursework spanning software engineering,
                  databases (MySQL &amp; Oracle), networking, and cybersecurity fundamentals.
                </p>
              </div>
            </PortfolioCard>

            <div className="mt-6 flex flex-wrap gap-3">
              <PortfolioButton asChild size="default" variant="primary">
                <a href="#projects">View projects</a>
              </PortfolioButton>
              <PortfolioButton asChild size="default" variant="secondary">
                <a href="/resume/zeeshan-cv.pdf" download>
                  <Download aria-hidden />
                  Download CV
                </a>
              </PortfolioButton>
            </div>
          </div>

          {/* Right: focus, how I work, current learning */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-lg font-semibold text-foreground">
                What I focus on
              </h2>
              <ul className="flex flex-col gap-3">
                {focusAreas.map((area) => (
                  <li key={area.title}>
                    <PortfolioCard className="flex items-start gap-3 p-4">
                      <area.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-sm font-semibold text-foreground">
                          {area.title}
                        </span>
                        <p className="text-sm leading-relaxed text-secondary">{area.body}</p>
                      </div>
                    </PortfolioCard>
                  </li>
                ))}
              </ul>
            </div>

            <PortfolioCard className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="size-4 text-accent-secondary" aria-hidden />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Currently learning
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {currentLearning.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-secondary"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 rounded-full bg-accent-secondary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </PortfolioCard>

            <PortfolioCard className="flex flex-col gap-3 border-dashed">
              <div className="flex items-center gap-2">
                <Heart className="size-4 text-[#F16B75]" aria-hidden />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Outside the editor
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {personalInterests.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-secondary"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 rounded-full bg-[#F16B75]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </PortfolioCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
