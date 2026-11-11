import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/**
 * Consistent section heading block: small eyebrow, title, supporting description.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: TitleTag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="font-mono-token text-xs uppercase tracking-[0.18em] text-accent-secondary">
          {eyebrow}
        </span>
      ) : null}
      <TitleTag
        className={cn(
          "font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl",
          align === "center" && "max-w-3xl text-balance",
        )}
      >
        {title}
      </TitleTag>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed text-secondary sm:text-lg",
            align === "center" && "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
