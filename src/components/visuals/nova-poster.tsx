"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Custom visual for the Nova showcase — a stylized multi-tenant
 * dashboard composition (not a real screenshot). Clearly labeled as
 * a design poster rather than shipped product UI in the surrounding copy.
 */
export function NovaPoster() {
  const reduce = useReducedMotion();
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0E1230]">
      {/* background grid */}
      <svg
        aria-hidden
        className="absolute inset-0 size-full opacity-50"
        viewBox="0 0 800 550"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="nova-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="nova-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8FF3E" />
            <stop offset="100%" stopColor="#8B4DFF" />
          </linearGradient>
        </defs>
        <rect width="800" height="550" fill="url(#nova-grid)" />
      </svg>

      {/* faux dashboard chrome */}
      <div className="absolute inset-0 flex flex-col">
        {/* top bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-2 rounded-full bg-[#FF603D]/80" />
          <span className="size-2 rounded-full bg-[#D8FF3E]/80" />
          <span className="size-2 rounded-full bg-[#5BE6D1]/80" />
          <div className="ml-3 flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded bg-[#8B4DFF] font-mono-token text-[9px] font-bold text-white">
              N
            </span>
            <span className="font-mono-token text-[10px] uppercase tracking-[0.18em] text-white/70">
              nova · dashboard
            </span>
          </div>
          <span className="ml-auto rounded-full border border-white/15 px-2 py-0.5 font-mono-token text-[9px] uppercase tracking-[0.18em] text-white/60">
            tenant: acme
          </span>
        </div>

        {/* main split */}
        <div className="grid flex-1 grid-cols-[180px_1fr] gap-3 p-4">
          {/* sidebar */}
          <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="font-mono-token text-[9px] uppercase tracking-[0.18em] text-white/40">
              Inbox
            </div>
            {["Acme · 3", "Bloom · 1", "Coast · 5", "Dune · 0"].map((item, i) => (
              <motion.div
                key={item}
                initial={reduce ? undefined : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[10px] ${
                  i === 0 ? "bg-[#8B4DFF]/30 text-white" : "text-white/60"
                }`}
              >
                <span>{item.split(" · ")[0]}</span>
                <span className="font-mono-token text-[9px] text-white/40">
                  {item.split(" · ")[1]}
                </span>
              </motion.div>
            ))}
            <div className="mt-auto font-mono-token text-[9px] uppercase tracking-[0.18em] text-white/30">
              5 tenants
            </div>
          </div>

          {/* conversation panel */}
          <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono-token text-[10px] uppercase tracking-[0.18em] text-white/70">
                Conversation · #acme-1284
              </span>
              <span className="rounded-full bg-[#D8FF3E] px-2 py-0.5 font-mono-token text-[9px] uppercase tracking-[0.18em] text-ink">
                Lead captured
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 overflow-hidden">
              <ChatBubble side="visitor" text="Do you ship outside Lahore?" />
              <ChatBubble side="bot" text="Yes — nationwide, 2–3 days. Want a quote?" highlight />
              <ChatBubble side="visitor" text="Yes, please." />
              <ChatBubble side="bot" text="Forwarding to the team. Reply within 1h." />
            </div>
            <div className="flex items-center gap-2 border-t border-white/10 pt-2">
              <div className="h-6 flex-1 rounded-full border border-white/10 bg-white/[0.03]" />
              <span className="rounded-md bg-[#8B4DFF] px-3 py-1 font-mono-token text-[9px] uppercase tracking-[0.18em] text-white">
                Send
              </span>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="grid grid-cols-3 gap-3 border-t border-white/10 px-4 py-3">
          {[
            { label: "Conversations", value: "1,284", color: "#5BE6D1" },
            { label: "Deflection", value: "62%", color: "#D8FF3E" },
            { label: "Leads", value: "84", color: "#FF603D" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-mono-token text-[9px] uppercase tracking-[0.18em] text-white/50">
                  {stat.label}
                </span>
                <span className="font-display text-base font-semibold text-white">
                  {stat.value}
                </span>
              </div>
              <span
                className="mt-2 h-1 w-12 rounded-full"
                style={{ background: stat.color }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>

      {/* corner labels */}
      <span className="absolute left-4 top-3 font-mono-token text-[9px] uppercase tracking-[0.22em] text-white/40">
        design preview
      </span>
      <span className="absolute right-4 bottom-3 font-mono-token text-[9px] uppercase tracking-[0.22em] text-white/40">
        nova · 2024
      </span>
    </div>
  );
}

function ChatBubble({
  side,
  text,
  highlight,
}: {
  side: "visitor" | "bot";
  text: string;
  highlight?: boolean;
}) {
  const isBot = side === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[78%] rounded-lg px-2.5 py-1.5 text-[10px] leading-snug ${
          isBot
            ? highlight
              ? "bg-[#8B4DFF] text-white"
              : "bg-white/[0.06] text-white/80"
            : "bg-white/[0.10] text-white/80"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
