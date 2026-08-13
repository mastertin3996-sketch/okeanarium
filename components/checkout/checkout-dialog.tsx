"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, CreditCard, Wallet, Landmark } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCartStore, useCartTotals } from "@/lib/store/cart-store";
import { useUIStore } from "@/lib/store/ui-store";
import { formatPrice, cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: "card-courier", label: "Карткою кур’єру", icon: CreditCard },
  { id: "cash", label: "Готівкою", icon: Wallet },
  { id: "online", label: "Онлайн-оплата", icon: Landmark },
];

export function CheckoutDialog() {
  const open = useUIStore((s) => s.checkoutOpen);
  const setOpen = useUIStore((s) => s.setCheckoutOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const { total } = useCartTotals();

  const [payment, setPayment] = useState<PaymentMethod>("card-courier");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      if (submitted) {
        clearCart();
        closeCart();
      }
      setTimeout(() => setSubmitted(false), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="size-14 text-emerald" />
            <DialogTitle>Замовлення оформлено!</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Наш менеджер зв’яжеться з вами протягом 15 хвилин для
              підтвердження деталей доставки.
            </p>
            <Button className="mt-2" onClick={() => handleClose(false)}>
              Чудово
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Оформлення замовлення</DialogTitle>
              <DialogDescription>
                Заповніть дані для доставки — ми зв’яжемося для підтвердження.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 flex flex-col gap-1.5">
                  <Label htmlFor="checkout-name">Ім’я</Label>
                  <input
                    id="checkout-name"
                    required
                    placeholder="Іван Іванов"
                    className="h-11 rounded-full border border-border bg-white px-4 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <Label htmlFor="checkout-phone">Телефон</Label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    placeholder="+380 (__) ___-__-__"
                    className="h-11 rounded-full border border-border bg-white px-4 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <Label htmlFor="checkout-address">Адреса доставки</Label>
                  <input
                    id="checkout-address"
                    required
                    placeholder="Місто, вулиця, будинок, квартира"
                    className="h-11 rounded-full border border-border bg-white px-4 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="checkout-date">Дата</Label>
                  <input
                    id="checkout-date"
                    type="date"
                    required
                    className="h-11 rounded-full border border-border bg-white px-4 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="checkout-time">Час</Label>
                  <input
                    id="checkout-time"
                    type="time"
                    required
                    className="h-11 rounded-full border border-border bg-white px-4 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <Label>Спосіб оплати</Label>
                <RadioGroup
                  value={payment}
                  onValueChange={(v) => setPayment(v as PaymentMethod)}
                  className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3"
                >
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors",
                        payment === opt.id
                          ? "border-gold bg-gold/10 text-navy"
                          : "border-border text-navy/60 hover:border-gold/40"
                      )}
                    >
                      <RadioGroupItem value={opt.id} />
                      <opt.icon className="size-3.5" />
                      {opt.label}
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div className="flex items-center justify-between font-serif text-lg font-bold text-navy">
                <span>Разом до оплати</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button type="submit" size="lg">
                Підтвердити замовлення
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
