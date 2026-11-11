"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HeroVisual } from "./hero-visual";

/**
 * Hero portrait slot with modern 3D-tilt + glow-follow + scale-entrance.
 * Falls back to the interactive orb if no PNG.
 */
export function HeroPortrait() {
  const reduce = useReducedMotion();
  const [hasPortrait, setHasPortrait] = React.useState(true);

  // 3D tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 20, mass: 0.4 });
  const sy = useSpring(ry, { stiffness: 150, damping: 20, mass: 0.4 });

  const rotateX = useTransform(sy, [-20, 20], [12, -12]);
  const rotateY = useTransform(sx, [-20, 20], [-12, 12]);
  const glowX = useTransform(sx, [-20, 20], ["20%", "80%"]);
  const glowY = useTransform(sy, [-20, 20], ["20%", "80%"]);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(139,77,255,0.5), transparent 60%)`,
  );

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!hasPortrait || reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rx.set(px * 40);
      ry.set(py * 40);
    };
    const onLeave = () => {
      rx.set(0);
      ry.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [hasPortrait, reduce, rx, ry]);

  if (!hasPortrait) {
    return <HeroVisual />;
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[3/4] w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px]"
      style={{ perspective: 1000 }}
    >
      {/* Glow that follows pointer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
        style={{ background: glowBg }}
      />

      {/* Orb backdrop */}
      <div className="pointer-events-none absolute inset-0 scale-90 opacity-50 sm:scale-100 sm:opacity-70">
        <HeroVisual />
      </div>

      {/* Portrait with 3D tilt + clip reveal + float */}
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute inset-0 grid place-items-center"
      >
        <motion.div
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", opacity: 0, scale: 0.9 }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)", opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full"
          style={{ transform: "translateZ(40px)" }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative size-full"
          >
            <Image
              src="/images/profile/hero-portrait.png"
              alt="Portrait of Zeeshan Ahmad"
              fill
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
              className="object-contain object-center drop-shadow-[0_20px_50px_rgba(139,77,255,0.5)]"
              priority
              onError={() => setHasPortrait(false)}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating labels */}
      <motion.span
        initial={reduce ? undefined : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute left-0 top-1/4 font-mono-token text-[9px] uppercase tracking-[0.22em] text-muted-light sm:text-[10px]"
      >
        portrait · 01
      </motion.span>
      <motion.span
        initial={reduce ? undefined : { opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.15, duration: 0.5 }}
        className="absolute right-0 bottom-1/4 font-mono-token text-[9px] uppercase tracking-[0.22em] text-volt sm:text-[10px]"
      >
        zeeshan
      </motion.span>
    </div>
  );
}
