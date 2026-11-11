import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono-token text-[10px] font-medium uppercase tracking-[0.18em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-token-dark bg-ink/5 text-ink/70",
        accent: "border-violet/30 bg-violet/10 text-violet",
        teal: "border-aqua/30 bg-aqua/10 text-aqua",
        success: "border-[#35C98A]/30 bg-[#35C98A]/10 text-[#1F9D6B]",
        warning: "border-tangerine/30 bg-tangerine/10 text-tangerine",
        danger: "border-tangerine/30 bg-tangerine/10 text-tangerine",
        outline: "border-ink/15 text-ink/60",
        dark: "border-token-soft bg-ink-soft text-bone",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface TechBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function TechBadge({ className, variant, ...props }: TechBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

const statusVariantMap: Record<string, NonNullable<TechBadgeProps["variant"]>> = {
  Live: "success",
  "In Progress": "warning",
  Prototype: "outline",
};

const statusDotColor: Record<string, string> = {
  Live: "bg-aqua",
  "In Progress": "bg-tangerine",
  Prototype: "bg-ink/40",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <TechBadge variant={statusVariantMap[status] ?? "default"} aria-label={`Status: ${status}`}>
      <span
        className={cn("size-1.5 rounded-full", statusDotColor[status] ?? "bg-ink/40")}
        aria-hidden
      />
      {status}
    </TechBadge>
  );
}
