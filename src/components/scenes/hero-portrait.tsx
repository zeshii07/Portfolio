"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { HeroVisual } from "./hero-visual";

/**
 * Hero visual slot.
 *
 * If a transparent-background portrait PNG is present at:
 *
 *     public/images/profile/hero-portrait.png
 *
 * it is displayed large on the right side of the hero with a clip-path
 * mask reveal + subtle float. The interactive orb moves behind it as
 * a decorative backdrop.
 *
 * If the PNG is missing (or fails to load), the orb is shown alone as
 * the hero visual — so the site never looks broken while you prepare
 * the portrait.
 *
 * Recommended PNG:
 *   - Transparent background (cutout / portrait subject only)
 *   - Tall aspect ratio (3:4 or 2:3), e.g. 600x800 or 800x1200
 *   - PNG format (for transparency)
 *   - Under 600KB
 */
export function HeroPortrait() {
  const reduce = useReducedMotion();
  const [hasPortrait, setHasPortrait] = React.useState(true);

  // Pointer parallax for the portrait (desktop only)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 20, mass: 0.5 });
  const sy = useSpring(ry, { stiffness: 120, damping: 20, mass: 0.5 });

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!hasPortrait || reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rx.set(px * 16);
      ry.set(py * 16);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [hasPortrait, reduce, rx, ry]);

  if (!hasPortrait) {
    return <HeroVisual />;
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[3/4] w-full max-w-[440px]"
    >
      {/* Orb as decorative backdrop behind the portrait */}
      <div className="pointer-events-none absolute inset-0 scale-110 opacity-70">
        <HeroVisual />
      </div>

      {/* Portrait PNG with clip-path reveal + float */}
      <motion.div
        style={reduce ? undefined : { rotateX: sy, rotateY: sx }}
        className="absolute inset-0 grid place-items-center"
      >
        <motion.div
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          animate={
            reduce
              ? { opacity: 1 }
              : { clipPath: "inset(0% 0 0 0)", opacity: 1 }
          }
          transition={{
            duration: reduce ? 0 : 1.1,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-full w-full"
        >
          <motion.div
            animate={
              reduce
                ? undefined
                : { y: [0, -10, 0] }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="relative size-full"
          >
            <Image
              src="/images/profile/hero-portrait.png"
              alt="Portrait of Zeeshan Ahmad"
              fill
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 440px"
              className="object-contain object-center drop-shadow-[0_24px_60px_rgba(139,77,255,0.45)]"
              priority
              onError={() => setHasPortrait(false)}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating labels around the portrait */}
      <motion.span
        initial={reduce ? undefined : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute left-0 top-1/4 font-mono-token text-[10px] uppercase tracking-[0.22em] text-muted-light"
      >
        portrait · 01
      </motion.span>
      <motion.span
        initial={reduce ? undefined : { opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.15, duration: 0.5 }}
        className="absolute right-0 bottom-1/4 font-mono-token text-[10px] uppercase tracking-[0.22em] text-volt"
      >
        zeeshan
      </motion.span>
    </div>
  );
}
