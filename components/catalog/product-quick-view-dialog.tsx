"use client";

import { useMemo, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatedPrice } from "@/components/effects/animated-price";
import { useCartStore } from "@/lib/store/cart-store";
import { useUIStore } from "@/lib/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { toast } from "sonner";

export function ProductQuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [packWeight, setPackWeight] = useState(product.packs[0].weight);
  const [zoomStyle, setZoomStyle] = useState<{ transform: string; transformOrigin: string }>({
    transform: "scale(1)",
    transformOrigin: "center",
  });
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const openQuickOrder = useUIStore((s) => s.openQuickOrder);

  const activePack = useMemo(
    () => product.packs.find((p) => p.weight === packWeight) ?? product.packs[0],
    [packWeight, product.packs]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({ transform: "scale(1.8)", transformOrigin: `${x}% ${y}%` });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: "scale(1)", transformOrigin: "center" });
  };

  const handleAddToCart = () => {
    addItem(product.id, activePack.weight, 1);
    toast.success(`${product.name} додано в кошик`, {
      description: `${activePack.label} · ${formatPrice(activePack.price)}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
            {product.species}
          </p>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 sm:grid-cols-2">
          <div
            ref={imgWrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-cream-dark"
          >
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover transition-transform duration-200 ease-out"
              style={zoomStyle}
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-border p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Текстура
                </p>
                <p className="mt-0.5 font-semibold text-navy">{product.texture}</p>
              </div>
              <div className="rounded-xl border border-border p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Розмір ікринки
                </p>
                <p className="mt-0.5 font-semibold text-navy">{product.grainSize}</p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy/50">
                Фасування
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.packs.map((pack) => (
                  <button
                    key={pack.weight}
                    onClick={() => setPackWeight(pack.weight)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
                      pack.weight === packWeight
                        ? "border-navy bg-navy text-white"
                        : "border-border text-navy/70 hover:border-gold/60 hover:text-navy"
                    )}
                  >
                    {pack.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Ціна за {activePack.label}
              </p>
              <p className="font-serif text-2xl font-bold text-navy">
                <AnimatedPrice value={activePack.price} />
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
                У кошик
              </Button>
              <Button
                variant="navy"
                className="flex-1"
                onClick={() => {
                  onOpenChange(false);
                  openQuickOrder({ productId: product.id, packWeight: activePack.weight });
                }}
              >
                <Zap className="size-4" />
                В 1 клік
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
