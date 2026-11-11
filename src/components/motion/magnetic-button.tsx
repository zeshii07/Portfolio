"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Strength of the magnetic pull (0–1) */
  strength?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

/**
 * Magnetic button — subtly follows the cursor on fine-pointer devices.
 * Falls back to a normal button when reduced-motion is set or on touch.
 */
export function MagneticButton({
  strength = 0.3,
  className,
  children,
  as = "button",
  href,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sharedProps = {
    ref: ref as React.Ref<HTMLElement>,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x: sx, y: sy },
    className: cn(
      "inline-flex items-center justify-center gap-2 will-change-transform",
      className,
    ),
    ...props,
  } as const;

  if (as === "a") {
    const MotionA = motion.a;
    return (
      <MotionA href={href} target={target} rel={rel} {...sharedProps}>
        {children}
      </MotionA>
    );
  }

  const MotionButton = motion.button;
  return <MotionButton {...sharedProps}>{children}</MotionButton>;
}
