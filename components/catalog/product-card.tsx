"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductBadges } from "@/components/catalog/product-badges";
import { ProductQuickViewDialog } from "@/components/catalog/product-quick-view-dialog";
import { AnimatedPrice } from "@/components/effects/animated-price";
import { Tilt } from "@/components/effects/tilt";
import { useCartStore } from "@/lib/store/cart-store";
import { useUIStore } from "@/lib/store/ui-store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [packWeight, setPackWeight] = useState(product.packs[0].weight);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const openQuickOrder = useUIStore((s) => s.openQuickOrder);

  const activePack = useMemo(
    () => product.packs.find((p) => p.weight === packWeight) ?? product.packs[0],
    [packWeight, product.packs]
  );

  const handleAddToCart = () => {
    if (imgRef.current) {
      window.dispatchEvent(
        new CustomEvent("fly-to-cart", {
          detail: { imageSrc: product.image, fromRect: imgRef.current.getBoundingClientRect() },
        })
      );
    }
    addItem(product.id, activePack.weight, 1);
    toast.success(`${product.name} додано в кошик`, {
      description: `${activePack.label} · ${formatPrice(activePack.price)}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.06 }}
    >
      <Card className="group flex h-full flex-col overflow-hidden py-0 transition-shadow hover:shadow-xl">
        <Tilt maxTilt={6} glare className="aspect-[4/3] overflow-hidden bg-cream-dark">
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <ProductBadges badges={product.badges} />
          </div>
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-navy shadow-sm backdrop-blur-sm">
            <Star className="size-3.5 fill-gold text-gold" />
            {product.rating}
          </div>
          <button
            onClick={() => setQuickViewOpen(true)}
            aria-label="Швидкий перегляд"
            className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white group-hover:opacity-100"
          >
            <Eye className="size-4" />
          </button>
        </Tilt>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
              {product.species}
            </p>
            <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-navy">
              {product.name}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {product.short}
            </p>
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

          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Ціна за {activePack.label}
              </p>
              <p className="font-serif text-2xl font-bold text-navy">
                <AnimatedPrice value={activePack.price} />
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
              У кошик
            </Button>
            <Button
              variant="navy"
              className="flex-1"
              onClick={() => openQuickOrder({ productId: product.id, packWeight: activePack.weight })}
            >
              <Zap className="size-4" />
              В 1 клік
            </Button>
          </div>
        </div>
      </Card>

      <ProductQuickViewDialog
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </motion.div>
  );
}
