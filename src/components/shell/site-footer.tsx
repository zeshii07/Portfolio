"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navLinks, socialLinks, person, contactInfo } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Footer"
      className="relative isolate overflow-hidden bg-ink text-bone"
    >
      {/* top accent line */}
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-violet via-ultramarine to-aqua opacity-60" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Wordmark + role */}
          <div className="md:col-span-5">
            <Link
              href="#top"
              className="inline-flex items-baseline gap-2"
              aria-label={`${person.name} — back to top`}
            >
              <span className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-bone">
                {person.wordmark}
              </span>
              <span aria-hidden className="text-volt">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-light">
              {person.role}
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="mt-4 inline-block font-mono-token text-[11px] uppercase tracking-[0.22em] text-bone underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-volt"
            >
              {contactInfo.email}
            </a>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="md:col-span-3">
            <span className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-muted-light">
              Navigation
            </span>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 font-display text-base text-bone/80 transition-colors hover:text-bone"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="md:col-span-4">
            <span className="font-mono-token text-[10px] uppercase tracking-[0.22em] text-muted-light">
              Elsewhere
            </span>
            <ul className="mt-4 flex flex-col gap-2">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.icon === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-display text-base text-bone/80 transition-colors hover:text-bone"
                  >
                    {s.label}
                    <ArrowUpRight
                      className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume/zeeshan-cv.pdf"
                  download
                  className="group inline-flex items-center gap-1 font-display text-base text-bone/80 transition-colors hover:text-bone"
                >
                  Download CV
                  <ArrowUpRight
                    className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-token-soft pt-6 sm:flex-row sm:items-center">
          <p className="font-mono-token text-[11px] uppercase tracking-[0.18em] text-muted-light">
            © {year} {person.name}
          </p>
          <p className="font-mono-token text-[11px] uppercase tracking-[0.18em] text-muted-light">
            Built with Next.js · TypeScript · Tailwind · Motion
          </p>
          <Link
            href="#top"
            className="group inline-flex items-center gap-2 font-mono-token text-[11px] uppercase tracking-[0.18em] text-bone/80 transition-colors hover:text-bone"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </footer>
  );
}
