"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Circle } from "lucide-react";
import { Container } from "@/components/ui-portfolio/container";
import { PortfolioButton } from "@/components/ui-portfolio/button";
import { person, contactInfo } from "@/data/site";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background grid + accent glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full glow-accent opacity-70 sm:right-[5%]"
      />
      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
          {/* Left: copy */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-token bg-surface/80 px-3 py-1.5 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#35C98A] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#35C98A]" />
              </span>
              <span className="font-mono-token text-xs text-secondary">
                {person.availability}
              </span>
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              {person.headline}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
              {person.supportingCopy}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PortfolioButton asChild size="lg" variant="primary">
                <a href="#projects" className="group">
                  Explore Projects
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>
              </PortfolioButton>
              <PortfolioButton asChild size="lg" variant="outline">
                <a href="#contact">
                  <Mail aria-hidden />
                  Contact Me
                </a>
              </PortfolioButton>
            </div>

            <dl className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-token text-xs text-secondary">
              <div className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-accent-secondary" aria-hidden />
                <dt className="sr-only">Location</dt>
                <dd>{contactInfo.location}</dd>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Circle className="size-2 fill-[#35C98A] text-[#35C98A]" aria-hidden />
                <dt className="sr-only">Availability</dt>
                <dd>Open to roles &amp; freelance</dd>
              </div>
            </dl>
          </motion.div>

          {/* Right: terminal panel */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5"
          >
            <HeroTerminal />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function HeroTerminal() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-primary/20 via-accent-secondary/10 to-transparent blur-2xl"
      />
      <div className="overflow-hidden rounded-2xl border border-token bg-[#0B1020] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-token bg-surface px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#F16B75]/80" />
          <span className="size-2.5 rounded-full bg-[#F5B942]/80" />
          <span className="size-2.5 rounded-full bg-[#35C98A]/80" />
          <span className="ml-2 font-mono-token text-xs text-secondary">
            zeeshan@portfolio: ~/dev
          </span>
        </div>
        <pre className="overflow-x-auto px-4 py-5 font-mono-token text-[12px] leading-relaxed text-secondary sm:text-[13px]">
          <code>
            <span className="text-[#22D3C5]">~$</span>{" "}
            <span className="text-foreground">whoami</span>
            {"\n"}
            <span className="text-[#A7B3C8]">zeeshan ahmad — full-stack dev</span>
            {"\n\n"}
            <span className="text-[#22D3C5]">~$</span>{" "}
            <span className="text-foreground">cat stack.json</span>
            {"\n"}
            <span className="text-[#A7B3C8]">{"{"}</span>
            {"\n"}
            {"  "}
            <span className="text-[#6C63FF]">"frontend"</span>
            <span className="text-[#A7B3C8]">: </span>
            <span className="text-[#35C98A]">["React", "Next.js", "TS"]</span>
            <span className="text-[#A7B3C8]">,</span>
            {"\n"}
            {"  "}
            <span className="text-[#6C63FF]">"backend"</span>
            <span className="text-[#A7B3C8]">: </span>
            <span className="text-[#35C98A]">["Node", "REST", "MySQL"]</span>
            <span className="text-[#A7B3C8]">,</span>
            {"\n"}
            {"  "}
            <span className="text-[#6C63FF]">"ai"</span>
            <span className="text-[#A7B3C8]">: </span>
            <span className="text-[#35C98A]">["LLM", "RAG", "Automation"]</span>
            <span className="text-[#A7B3C8]">,</span>
            {"\n"}
            {"  "}
            <span className="text-[#6C63FF]">"security"</span>
            <span className="text-[#A7B3C8]">: </span>
            <span className="text-[#35C98A]">["Networking", "AppSec"]</span>
            {"\n"}
            <span className="text-[#A7B3C8]">{"}"}</span>
            {"\n\n"}
            <span className="text-[#22D3C5]">~$</span>{" "}
            <span className="text-foreground">build --ship</span>
            {"\n"}
            <span className="text-[#35C98A]">✓ shipping useful software</span>
            <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-foreground align-middle" />
          </code>
        </pre>
      </div>
    </div>
  );
}
