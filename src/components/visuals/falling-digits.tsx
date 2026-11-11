"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FallingDigitsProps {
  /** number of digit columns */
  columns?: number;
  className?: string;
  /** opacity of the digits (keep low for readability) */
  opacity?: number;
}

const DIGITS = ["0", "1", "0", "1", "0", "1", "0", "1"];

/**
 * Matrix-style falling digits background.
 * Low opacity so text on top stays fully readable.
 * Respects prefers-reduced-motion (static fallback).
 */
export function FallingDigits({
  columns = 14,
  className = "",
  opacity = 0.08,
}: FallingDigitsProps) {
  const reduce = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [cols, setCols] = React.useState(columns);

  // Adjust columns based on viewport width
  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setCols(8);
      else if (w < 768) setCols(12);
      else if (w < 1024) setCols(16);
      else setCols(20);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <DigitColumn key={i} index={i} reduce={reduce} />
      ))}
    </div>
  );
}

function DigitColumn({ index, reduce }: { index: number; reduce: boolean | null }) {
  // Each column has different speed, delay, and position
  const speed = 8 + (index % 5) * 3; // 8-20 seconds
  const delay = (index * 0.7) % 4;
  const left = `${(index / 20) * 100}%`;
  const fontSize = 11 + (index % 3) * 2; // 11-15px
  const length = 14 + (index % 6);

  // Generate the digit string for this column
  const digits = React.useMemo(() => {
    return Array.from({ length }).map((_, i) => ({
      char: DIGITS[(index + i) % DIGITS.length],
      opacity: Math.max(0.2, 1 - i / length),
    }));
  }, [index, length]);

  if (reduce) {
    // Static fallback — just show faint digits without animation
    return (
      <div
        className="absolute top-0 font-mono-token leading-tight"
        style={{ left, fontSize: `${fontSize}px` }}
      >
        {digits.map((d, i) => (
          <div key={i} style={{ opacity: d.opacity * 0.5 }} className="text-bone">
            {d.char}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute font-mono-token leading-tight"
      style={{ left, fontSize: `${fontSize}px` }}
      initial={{ y: "-100%" }}
      animate={{ y: "100%" }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {digits.map((d, i) => (
        <div key={i} style={{ opacity: d.opacity }} className="text-bone">
          {d.char}
        </div>
      ))}
    </motion.div>
  );
}
