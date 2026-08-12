import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-navy hover:bg-gold-light shadow-[0_8px_24px_-8px_rgba(197,160,89,0.6)] hover:shadow-[0_12px_28px_-8px_rgba(197,160,89,0.75)] hover:-translate-y-0.5",
        navy:
          "bg-navy text-white hover:bg-navy-light shadow-[0_8px_24px_-8px_rgba(11,19,43,0.5)] hover:-translate-y-0.5",
        outline:
          "border border-gold/60 text-navy bg-transparent hover:bg-gold/10",
        outlineLight:
          "border border-white/40 text-white bg-transparent hover:bg-white/10",
        ghost: "text-navy hover:bg-navy/5",
        link: "text-gold-dark underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-5",
        sm: "h-9 px-4 text-xs has-[>svg]:px-3.5",
        lg: "h-13 px-8 text-base has-[>svg]:px-7",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
