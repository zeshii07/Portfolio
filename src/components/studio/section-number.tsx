import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionNumberProps {
  /** e.g. "01", "02" */
  value: string;
  className?: string;
  /** outlined style (transparent fill, stroke only) */
  outline?: boolean;
}

/**
 * Giant outlined numeral used as a chapter marker.
 */
export function SectionNumber({ value, className, outline = true }: SectionNumberProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "numeral-mega select-none",
        outline ? "text-outline-light" : "text-bone",
        className,
      )}
    >
      {value}
    </span>
  );
}
