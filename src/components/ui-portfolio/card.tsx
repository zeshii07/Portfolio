import * as React from "react";
import { cn } from "@/lib/utils";

interface PortfolioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a hover lift and border highlight */
  interactive?: boolean;
}

/**
 * Card surface matching the design tokens: surface bg, subtle border, soft corners.
 */
export function PortfolioCard({
  className,
  interactive = false,
  children,
  ...props
}: PortfolioCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-token bg-surface p-6",
        interactive &&
          "transition-all duration-200 hover:border-primary/40 hover:bg-surface-raised hover:-translate-y-0.5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
