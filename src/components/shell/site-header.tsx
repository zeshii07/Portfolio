"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, person } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { cn } from "@/lib/utils";

const sectionIds = ["top", "about", "projects", "skills", "experience", "contact"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5",
        )}
        aria-label="Site header"
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6",
            scrolled
              ? "max-w-3xl rounded-full border border-token-soft bg-ink/80 px-4 py-2.5 backdrop-blur-xl"
              : "max-w-6xl",
          )}
        >
          {/* Wordmark */}
          <Link
            href="#top"
            aria-label={`${person.name} — home`}
            className="group inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-full border border-token-soft bg-violet font-mono-token text-sm font-bold text-white"
            >
              Z
            </span>
            <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-bone">
              {person.wordmark}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 font-mono-token text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "text-bone"
                      : "text-muted-light hover:text-bone",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-ink-soft"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CV action */}
          <div className="hidden items-center md:flex">
            <MagneticButton
              as="a"
              href="/resume/zeeshan-cv.pdf"
              download
              strength={0.25}
              className="group rounded-full bg-volt px-4 py-2 font-mono-token text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-volt/90"
            >
              CV
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </MagneticButton>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-token-soft bg-ink-soft text-bone transition-colors hover:bg-ink md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] flex flex-col bg-ink md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-bone">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-token-soft bg-ink-soft text-bone"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center gap-2 px-6"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-token-soft py-4"
                  >
                    <span className="font-mono-token text-xs text-muted-light">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl font-semibold text-bone transition-transform group-hover:translate-x-2">
                      {link.label}
                    </span>
                    <ArrowUpRight className="ml-auto size-5 text-muted-light transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-volt" aria-hidden />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.a
              href="/resume/zeeshan-cv.pdf"
              download
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="m-6 inline-flex items-center justify-center gap-2 rounded-full bg-volt px-6 py-4 font-mono-token text-sm font-semibold uppercase tracking-[0.18em] text-ink"
            >
              Download CV
              <ArrowUpRight className="size-4" aria-hidden />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
