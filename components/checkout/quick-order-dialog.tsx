"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getProductById } from "@/data/products";
import { useUIStore } from "@/lib/store/ui-store";
import { formatPrice } from "@/lib/utils";

export function QuickOrderDialog() {
  const target = useUIStore((s) => s.quickOrderTarget);
  const closeQuickOrder = useUIStore((s) => s.closeQuickOrder);
  const [submitted, setSubmitted] = useState(false);

  const product = target ? getProductById(target.productId) : null;
  const pack = product?.packs.find((p) => p.weight === target?.packWeight) ?? product?.packs[0];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      closeQuickOrder();
      setTimeout(() => setSubmitted(false), 300);
    }
  };

  return (
    <Dialog open={!!target} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="size-14 text-emerald" />
            <DialogTitle>Заявку прийнято!</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Ми передзвонимо вам протягом 15 хвилин для підтвердження
              замовлення.
            </p>
            <Button className="mt-2" onClick={() => handleClose(false)}>
              Добре
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Zap className="size-5 text-gold-dark" />
                Швидке замовлення
              </DialogTitle>
              <DialogDescription>
                Залиште ім’я та телефон — ми самі передзвонимо й оформимо
                замовлення.
              </DialogDescription>
            </DialogHeader>

            {product && pack && (
              <div className="flex items-center gap-3 rounded-xl bg-cream-dark/60 p-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-14 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-serif text-sm font-semibold text-navy">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {pack.label} · {formatPrice(pack.price)}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="quick-name">Ім’я</Label>
                <input
                  id="quick-name"
                  required
                  placeholder="Іван Іванов"
                  className="h-11 rounded-full border border-border bg-white px-4 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="quick-phone">Телефон</Label>
                <input
                  id="quick-phone"
                  type="tel"
                  required
                  placeholder="+380 (__) ___-__-__"
                  className="h-11 rounded-full border border-border bg-white px-4 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <Button type="submit" size="lg" className="mt-1">
                Замовити в 1 клік
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
