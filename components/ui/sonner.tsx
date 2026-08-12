"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-white! text-navy! border! border-border! shadow-xl! rounded-2xl!",
          description: "text-muted-foreground!",
          actionButton: "bg-gold! text-navy!",
          cancelButton: "bg-cream-dark! text-navy!",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
