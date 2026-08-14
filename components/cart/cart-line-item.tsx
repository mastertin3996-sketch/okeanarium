"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProductById } from "@/data/products";
import { getCartLineTotal, useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types";

export function CartLineItem({ item }: { item: CartItem }) {
  const product = getProductById(item.productId);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const changePack = useCartStore((s) => s.changePack);
  const [removing, setRemoving] = useState(false);

  if (!product) return null;
  const pack = product.packs.find((p) => p.weight === item.packWeight) ?? product.packs[0];
  const lineTotal = getCartLineTotal(item);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => removeItem(item.productId, item.packWeight), 220);
  };

  return (
    <AnimatePresence>
      {!removing && (
        <motion.div
          layout
          exit={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-end bg-destructive px-6">
            <Trash2 className="size-5 text-white" />
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: -96, right: 0 }}
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 28 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) handleRemove();
            }}
            whileDrag={{ cursor: "grabbing" }}
            className="relative flex touch-pan-y gap-3 bg-cream py-4"
          >
            <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-cream-dark">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="size-full object-cover"
                draggable={false}
              />
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-serif text-sm font-semibold leading-snug text-navy">
                  {product.name}
                </p>
                <button
                  onClick={handleRemove}
                  aria-label="Видалити товар"
                  className="shrink-0 text-navy/30 transition-colors hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <Select
                value={String(item.packWeight)}
                onValueChange={(v) => changePack(item.productId, item.packWeight, Number(v))}
              >
                <SelectTrigger className="h-8 w-fit min-w-24 px-3 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.packs.map((p) => (
                    <SelectItem key={p.weight} value={String(p.weight)}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-border">
                  <button
                    onClick={() => setQuantity(item.productId, item.packWeight, item.quantity - 1)}
                    aria-label="Зменшити кількість"
                    className="flex size-7 items-center justify-center rounded-full text-navy transition-colors hover:bg-cream-dark"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold text-navy">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(item.productId, item.packWeight, item.quantity + 1)}
                    aria-label="Збільшити кількість"
                    className="flex size-7 items-center justify-center rounded-full text-navy transition-colors hover:bg-cream-dark"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
                <p className="font-serif text-sm font-bold text-navy">{formatPrice(lineTotal)}</p>
              </div>
              <p className="text-[11px] text-muted-foreground">{formatPrice(pack.price)} / шт.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
