"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FallingDigitsProps {
  columns?: number;
  className?: string;
  opacity?: number;
}

const DIGIT_CHARS = ["0", "1", "0", "1", "{", "}", "<", ">", "/", ";", "0", "1"];
const COLORS = ["#8B4DFF", "#D8FF3E", "#5BE6D1", "#344BFF", "#F6F1E8"];

/**
 * Matrix-style falling digits background.
 * HIGHLY VISIBLE — colorful, larger digits that create a digital rain effect.
 */
export function FallingDigits({
  columns = 16,
  className = "",
  opacity = 0.35,
}: FallingDigitsProps) {
  const reduce = useReducedMotion();
  const [cols, setCols] = React.useState(columns);

  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setCols(10);
      else if (w < 768) setCols(14);
      else if (w < 1024) setCols(20);
      else setCols(24);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
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
  const speed = 6 + (index % 5) * 2;
  const delay = (index * 0.5) % 3;
  const left = `${(index / 24) * 100}%`;
  const fontSize = 14 + (index % 3) * 3;
  const length = 12 + (index % 5);
  const color = COLORS[index % COLORS.length];

  const digits = React.useMemo(() => {
    return Array.from({ length }).map((_, i) => ({
      char: DIGIT_CHARS[(index + i * 3) % DIGIT_CHARS.length],
      opacity: Math.max(0.15, 1 - (i / length) * 0.8),
    }));
  }, [index, length]);

  if (reduce) {
    return (
      <div className="absolute top-0 font-mono-token leading-tight" style={{ left, fontSize: `${fontSize}px`, color }}>
        {digits.map((d, i) => (
          <div key={i} style={{ opacity: d.opacity * 0.4 }}>{d.char}</div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute font-mono-token leading-tight"
      style={{ left, fontSize: `${fontSize}px`, color }}
      initial={{ y: "-50%" }}
      animate={{ y: "100%" }}
      transition={{ duration: speed, delay, repeat: Infinity, ease: "linear" }}
    >
      {digits.map((d, i) => (
        <div key={i} style={{ opacity: d.opacity, textShadow: `0 0 8px ${color}` }}>
          {d.char}
        </div>
      ))}
    </motion.div>
  );
}
