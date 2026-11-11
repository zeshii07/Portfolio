"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** arrow variant */
  arrow?: "up-right" | "right";
  /** underline style */
  underline?: "none" | "thin" | "marker";
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Inline link with a sliding directional arrow.
 * Used for case-study links, "view all" CTAs, etc.
 */
export function ArrowLink({
  href,
  children,
  className,
  arrow = "up-right",
  underline = "thin",
  target,
  rel,
  onClick,
}: ArrowLinkProps) {
  const Arrow = arrow === "up-right" ? ArrowUpRight : ArrowUpRight;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-1.5 font-mono-token text-xs uppercase tracking-[0.18em] transition-colors",
        className,
      )}
    >
      <span
        className={cn(
          "relative",
          underline === "thin" &&
            "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:opacity-30 after:transition-all after:duration-300 group-hover:after:opacity-100",
          underline === "marker" && "marker-underline",
        )}
      >
        {children}
      </span>
      <Arrow
        aria-hidden
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
