import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono-token text-[11px] font-medium uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-token bg-surface-raised/60 text-secondary",
        accent: "border-primary/40 bg-primary/10 text-primary",
        teal: "border-accent-secondary/30 bg-accent-secondary/10 text-accent-secondary",
        success: "border-[#35C98A]/30 bg-[#35C98A]/10 text-[#35C98A]",
        warning: "border-[#F5B942]/30 bg-[#F5B942]/10 text-[#F5B942]",
        danger: "border-[#F16B75]/30 bg-[#F16B75]/10 text-[#F16B75]",
        outline: "border-token text-secondary",
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

export function StatusBadge({ status }: { status: string }) {
  return (
    <TechBadge variant={statusVariantMap[status] ?? "default"} aria-label={`Status: ${status}`}>
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "Live" && "bg-[#35C98A]",
          status === "In Progress" && "bg-[#F5B942]",
          status === "Prototype" && "bg-[#A7B3C8]",
        )}
        aria-hidden
      />
      {status}
    </TechBadge>
  );
}
