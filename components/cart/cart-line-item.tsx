"use client";

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

  if (!product) return null;
  const pack = product.packs.find((p) => p.weight === item.packWeight) ?? product.packs[0];
  const lineTotal = getCartLineTotal(item);

  return (
    <div className="flex gap-3 py-4">
      <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-cream-dark">
        <img src={product.image} alt={product.name} className="size-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <p className="font-serif text-sm font-semibold leading-snug text-navy">
            {product.name}
          </p>
          <button
            onClick={() => removeItem(item.productId, item.packWeight)}
            aria-label="Удалить товар"
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
              aria-label="Уменьшить количество"
              className="flex size-7 items-center justify-center rounded-full text-navy transition-colors hover:bg-cream-dark"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-4 text-center text-sm font-semibold text-navy">
              {item.quantity}
            </span>
            <button
              onClick={() => setQuantity(item.productId, item.packWeight, item.quantity + 1)}
              aria-label="Увеличить количество"
              className="flex size-7 items-center justify-center rounded-full text-navy transition-colors hover:bg-cream-dark"
            >
              <Plus className="size-3" />
            </button>
          </div>
          <p className="font-serif text-sm font-bold text-navy">{formatPrice(lineTotal)}</p>
        </div>
        <p className="text-[11px] text-muted-foreground">{formatPrice(pack.price)} / шт</p>
      </div>
    </div>
  );
}
