"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { PortfolioButton } from "@/components/ui-portfolio/button";
import { navLinks, person } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-token bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background/0",
      )}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          {/* Wordmark */}
          <Link
            href="#top"
            className="group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`${person.name} — home`}
          >
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-lg border border-token bg-surface-raised font-mono-token text-sm font-bold text-primary"
            >
              Z
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-foreground">
              {person.shortName}
              <span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-secondary transition-colors hover:bg-surface-raised/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <PortfolioButton asChild size="sm" variant="primary">
              <a href="#contact" aria-label="Get in touch">
                Get in touch
              </a>
            </PortfolioButton>
            <PortfolioButton asChild size="sm" variant="secondary">
              <a
                href="/resume/zeeshan-cv.pdf"
                download
                aria-label="Download CV (PDF)"
              >
                <Download aria-hidden />
                Download CV
              </a>
            </PortfolioButton>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-token bg-surface text-foreground transition-colors hover:bg-surface-raised md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed right-0 top-0 z-50 h-full w-[min(86%,360px)] border-l border-token bg-surface shadow-2xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-token px-5">
              <span className="font-display text-base font-semibold text-foreground">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-token bg-surface-raised text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-secondary transition-colors hover:bg-surface-raised hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 px-1">
                <PortfolioButton
                  asChild
                  size="default"
                  variant="primary"
                  className="w-full"
                >
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Get in touch
                  </a>
                </PortfolioButton>
                <PortfolioButton
                  asChild
                  size="default"
                  variant="secondary"
                  className="w-full"
                >
                  <a
                    href="/resume/zeeshan-cv.pdf"
                    download
                    onClick={() => setOpen(false)}
                  >
                    <Download aria-hidden />
                    Download CV
                  </a>
                </PortfolioButton>
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
