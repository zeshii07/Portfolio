import Link from "next/link";
import { Shield } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { SocialLinks } from "@/components/ui-portfolio/social-links";
import { navLinks, socialLinks, person, contactInfo } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-token bg-surface/60">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="#top" className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-lg border border-token bg-surface-raised font-mono-token text-sm font-bold text-primary"
              >
                Z
              </span>
              <span className="font-display text-base font-semibold text-foreground">
                {person.shortName}
                <span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-secondary">
              {person.role}
            </p>
            <SocialLinks
              links={socialLinks}
              className="flex items-center gap-2"
              iconClassName="size-4"
            />
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h2 className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
              Navigation
            </h2>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h2 className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
              Contact
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-secondary">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>{contactInfo.location}</li>
            </ul>
          </div>

          {/* Meta */}
          <div className="flex flex-col gap-3">
            <h2 className="font-mono-token text-[11px] uppercase tracking-wide text-secondary">
              Resources
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  href="#privacy"
                  className="text-secondary transition-colors hover:text-foreground"
                >
                  Privacy notice
                </Link>
              </li>
              <li>
                <a
                  href="/resume/zeeshan-cv.pdf"
                  download
                  className="text-secondary transition-colors hover:text-foreground"
                >
                  Download CV
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-secondary">
                <Shield className="size-3.5 text-accent-secondary" aria-hidden />
                HTTPS · No secrets in client code
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-token py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-secondary">
            © {year} {person.name}. All rights reserved.
          </p>
          <p className="font-mono-token text-[11px] text-secondary">
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}
