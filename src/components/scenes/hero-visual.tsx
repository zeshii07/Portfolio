"use client";

import * as React from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";

/**
 * Interactive abstract visual for the hero.
 * - Layered rotating arcs + orbiting nodes.
 * - Subtle pointer parallax on desktop.
 * - Reduced-motion: static composition.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // pointer parallax
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 20, mass: 0.5 });
  const sy = useSpring(ry, { stiffness: 120, damping: 20, mass: 0.5 });

  React.useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rx.set(px * 20);
      ry.set(py * 20);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduce, rx, ry]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[440px]"
      aria-hidden
    >
      {/* glow halo */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-3/4 w-3/4 rounded-full glow-violet opacity-80" />
      </div>

      {/* main orb structure */}
      <motion.div
        style={reduce ? undefined : { rotateX: sy, rotateY: sx }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 400 400" className="size-full">
          <defs>
            <radialGradient id="orb-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B4DFF" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#344BFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#101016" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="arc-violet" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8B4DFF" />
              <stop offset="100%" stopColor="#5BE6D1" />
            </linearGradient>
          </defs>

          {/* core */}
          <circle cx="200" cy="200" r="60" fill="url(#orb-core)" />

          {/* concentric arcs */}
          <motion.g
            animate={reduce ? undefined : { rotate: 360 }}
            transition={reduce ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          >
            <circle cx="200" cy="200" r="100" fill="none" stroke="url(#arc-violet)" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.7" />
          </motion.g>
          <motion.g
            animate={reduce ? undefined : { rotate: -360 }}
            transition={reduce ? undefined : { duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          >
            <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(216,255,62,0.45)" strokeWidth="1" strokeDasharray="2 10" />
          </motion.g>
          <motion.g
            animate={reduce ? undefined : { rotate: 360 }}
            transition={reduce ? undefined : { duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          >
            <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(246,241,232,0.10)" strokeWidth="1" />
          </motion.g>

          {/* crosshair */}
          <line x1="200" y1="14" x2="200" y2="40" stroke="rgba(246,241,232,0.20)" strokeWidth="1" />
          <line x1="200" y1="360" x2="200" y2="386" stroke="rgba(246,241,232,0.20)" strokeWidth="1" />
          <line x1="14" y1="200" x2="40" y2="200" stroke="rgba(246,241,232,0.20)" strokeWidth="1" />
          <line x1="360" y1="200" x2="386" y2="200" stroke="rgba(246,241,232,0.20)" strokeWidth="1" />

          {/* center marker */}
          <circle cx="200" cy="200" r="4" fill="#D8FF3E" />
        </svg>

        {/* orbiting nodes */}
        <OrbitingNode angle={0} radius={100} color="#D8FF3E" size={6} duration={20} reduce={reduce} />
        <OrbitingNode angle={120} radius={140} color="#5BE6D1" size={5} duration={28} reduce={reduce} />
        <OrbitingNode angle={240} radius={180} color="#FF603D" size={4} duration={36} reduce={reduce} />
      </motion.div>

      {/* floating labels */}
      <motion.span
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-2 top-1/3 font-mono-token text-[10px] uppercase tracking-[0.22em] text-muted-light"
      >
        orb.v1
      </motion.span>
      <motion.span
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-6 right-2 font-mono-token text-[10px] uppercase tracking-[0.22em] text-aqua"
      >
        interactive
      </motion.span>
    </div>
  );
}

function OrbitingNode({
  angle,
  radius,
  color,
  size,
  duration,
  reduce,
}: {
  angle: number;
  radius: number;
  color: string;
  size: number;
  duration: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      animate={reduce ? undefined : { rotate: 360 }}
      transition={reduce ? undefined : { duration, repeat: Infinity, ease: "linear" }}
      style={{ position: "absolute", inset: 0, transformOrigin: "50% 50%" }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          transform: `rotate(${angle}deg) translateX(${radius}px)`,
          backgroundColor: color,
          borderRadius: "9999px",
          boxShadow: `0 0 12px ${color}`,
        }}
      />
    </motion.div>
  );
}
