import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider w-fit whitespace-nowrap",
  {
    variants: {
      variant: {
        gold: "bg-gold text-navy border-transparent",
        navy: "bg-navy text-white border-transparent",
        emerald: "bg-emerald text-white border-transparent",
        outline: "border-gold/50 text-gold-dark bg-transparent",
        soft: "bg-cream-dark text-navy border-transparent",
      },
    },
    defaultVariants: {
      variant: "gold",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
