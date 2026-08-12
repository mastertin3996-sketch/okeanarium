"use client";

import { useState } from "react";
import { ShoppingBag, Tag, Truck, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CheckoutDialog } from "@/components/checkout/checkout-dialog";
import { useCartStore, useCartTotals } from "@/lib/store/cart-store";
import { useUIStore } from "@/lib/store/ui-store";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";

export function CartSheet() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const promo = useCartStore((s) => s.promo);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const clearPromo = useCartStore((s) => s.clearPromo);
  const [promoInput, setPromoInput] = useState("");
  const setCheckoutOpen = useUIStore((s) => s.setCheckoutOpen);

  const { subtotal, discount, shipping, total, amountToFreeShipping, freeShippingThreshold } =
    useCartTotals();

  const progress = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountToFreeShipping) / freeShippingThreshold) * 100)
  );

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    if (ok) {
      toast.success(`Промокод застосовано: −${useCartStore.getState().promo.discountPercent}%`);
    } else {
      toast.error("Промокод не знайдено");
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-gold-dark" />
              Кошик
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <ShoppingBag className="size-10 text-navy/20" />
              <p className="text-sm text-muted-foreground">Ваш кошик порожній</p>
              <Button variant="outline" onClick={closeCart}>
                Перейти до каталогу
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6">
                <div className="rounded-xl bg-cream-dark/60 p-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-navy">
                    <Truck className="size-3.5 text-gold-dark" />
                    {amountToFreeShipping > 0 ? (
                      <span>
                        До безкоштовної доставки: {formatPrice(amountToFreeShipping)}
                      </span>
                    ) : (
                      <span>Безкоштовну доставку активовано</span>
                    )}
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <CartLineItem key={`${item.productId}-${item.packWeight}`} item={item} />
                  ))}
                </div>
              </div>

              <SheetFooter>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-navy/40" />
                    <input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Промокод"
                      className="h-10 w-full rounded-full border border-border bg-white pl-9 pr-3 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-10" onClick={handleApplyPromo}>
                    Застосувати
                  </Button>
                </div>

                {promo.code && (
                  <div className="flex items-center justify-between rounded-full bg-emerald/10 px-3.5 py-2 text-xs font-semibold text-emerald">
                    <span>
                      Промокод {promo.code} (−{promo.discountPercent}%)
                    </span>
                    <button onClick={clearPromo} aria-label="Прибрати промокод">
                      <X className="size-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Сума</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald">
                      <span>Знижка</span>
                      <span>−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Доставка</span>
                    <span className={cn(shipping === 0 && "text-emerald font-semibold")}>
                      {shipping === 0 ? "Безкоштовно" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between border-t border-border pt-2 font-serif text-base font-bold text-navy">
                    <span>Разом</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button size="lg" onClick={() => setCheckoutOpen(true)}>
                  Оформити замовлення
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog />
    </>
  );
}
