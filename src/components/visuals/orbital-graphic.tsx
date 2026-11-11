"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillGroupDatum {
  id: string;
  label: string;
  skills: string[];
  /** angle in degrees where this group sits on the orbit */
  angle: number;
}

interface OrbitalGraphicProps {
  groups: SkillGroupDatum[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

/**
 * Interactive orbital skills map.
 * - Groups are placed around a circle.
 * - The selected group is enlarged and highlighted.
 * - Lines connect the center to each node; the selected line is brighter.
 * - On mobile this is replaced by a list selector in the parent scene.
 */
export function OrbitalGraphic({
  groups,
  selectedId,
  onSelect,
  className,
}: OrbitalGraphicProps) {
  const reduce = useReducedMotion();
  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 180;

  return (
    <div
      className={cn("relative mx-auto aspect-square w-full max-w-[520px]", className)}
      role="radiogroup"
      aria-label="Skill groups"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="size-full"
        aria-hidden
      >
        {/* Concentric rings */}
        <circle cx={cx} cy={cy} r={radius + 30} fill="none" stroke="rgba(246,241,232,0.06)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(246,241,232,0.10)" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx={cx} cy={cy} r={70} fill="none" stroke="rgba(246,241,232,0.10)" strokeWidth="1" />

        {/* Center core */}
        <circle cx={cx} cy={cy} r={6} fill="var(--volt)" />
        <circle cx={cx} cy={cy} r={14} fill="none" stroke="var(--volt)" strokeWidth="1" opacity="0.4" />

        {/* Crosshair marks */}
        <line x1={cx} y1={20} x2={cx} y2={36} stroke="rgba(246,241,232,0.20)" strokeWidth="1" />
        <line x1={cx} y1={size - 36} x2={cx} y2={size - 20} stroke="rgba(246,241,232,0.20)" strokeWidth="1" />
        <line x1={20} y1={cy} x2={36} y2={cy} stroke="rgba(246,241,232,0.20)" strokeWidth="1" />
        <line x1={size - 36} y1={cy} x2={size - 20} y2={cy} stroke="rgba(246,241,232,0.20)" strokeWidth="1" />
      </svg>

      {/* Group nodes positioned over the SVG */}
      {groups.map((group) => {
        const rad = (group.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const isSelected = group.id === selectedId;

        return (
          <button
            key={group.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={group.label}
            onClick={() => onSelect(group.id)}
            className="group absolute left-1/2 top-1/2 flex flex-col items-center gap-1.5 focus-visible:outline-none"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            {/* connector line */}
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 hidden -z-10 sm:block"
              style={{
                width: radius,
                height: 1,
                transform: `translate(calc(-100% - 8px), -50%) rotate(${group.angle + 180}deg)`,
                transformOrigin: "100% 50%",
                background: isSelected ? "var(--volt)" : "rgba(246,241,232,0.15)",
                transition: "background 0.3s ease",
              }}
            />
            <motion.span
              initial={false}
              animate={{
                scale: isSelected ? 1.15 : 1,
                backgroundColor: isSelected ? "var(--volt)" : "rgba(246,241,232,0.08)",
              }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid size-12 place-items-center rounded-full border border-token-soft font-mono-token text-[10px] font-bold uppercase tracking-wide text-ink"
              style={{
                color: isSelected ? "var(--ink)" : "var(--bone)",
                backgroundColor: isSelected ? "var(--volt)" : "rgba(246,241,232,0.06)",
              }}
            >
              {group.id.slice(0, 2)}
            </motion.span>
            <span
              className={cn(
                "font-mono-token text-[10px] uppercase tracking-[0.18em] transition-colors",
                isSelected ? "text-volt" : "text-muted-light",
              )}
            >
              {group.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
