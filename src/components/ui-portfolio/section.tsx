import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "article" | "div";
  /** Vertical padding control */
  spacing?: "default" | "compact" | "relaxed";
  /** Optional id for in-page navigation */
  id?: string;
}

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  default: "py-16 sm:py-20 lg:py-24",
  compact: "py-10 sm:py-12",
  relaxed: "py-20 sm:py-28 lg:py-32",
};

/**
 * Page section with consistent vertical rhythm.
 */
export function Section({
  as: Tag = "section",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </Component>
  );
}
