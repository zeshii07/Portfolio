import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Portfolio button variants built on top of the design tokens.
 * Larger and more design-forward than the default shadcn button,
 * matching the "Modern Engineering Studio" direction.
 */
const portfolioButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium font-sans transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_8px_30px_-12px_rgba(108,99,255,0.55)] hover:bg-primary/90 hover:shadow-[0_10px_36px_-12px_rgba(108,99,255,0.7)]",
        secondary:
          "bg-surface-raised text-foreground border border-token hover:border-primary/60 hover:bg-surface-raised/70",
        outline:
          "border border-token bg-transparent text-foreground hover:border-primary/60 hover:bg-surface-raised/50",
        ghost:
          "text-foreground hover:bg-surface-raised/60 hover:text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline px-0",
        accent:
          "bg-accent-secondary text-[#0B1020] font-semibold hover:bg-accent-secondary/90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface PortfolioButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof portfolioButtonVariants> {
  asChild?: boolean;
}

export function PortfolioButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: PortfolioButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="portfolio-button"
      className={cn(portfolioButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { portfolioButtonVariants };
