"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Gift, PartyPopper, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";

const OCCASIONS = [
  {
    id: "newyear",
    label: "Новогодний стол",
    icon: PartyPopper,
    productId: "set-novogodniy",
    note: "Яркое ассорти из трёх видов икры для праздничного застолья",
  },
  {
    id: "business",
    label: "Подарок бизнес-партнёру",
    icon: Briefcase,
    productId: "set-business",
    note: "Статусный набор в деревянном ларце с гравировкой",
  },
  {
    id: "family",
    label: "Семейный ужин",
    icon: Gift,
    productId: "set-family",
    note: "Уютный набор для тёплого вечера в кругу семьи",
  },
] as const;

export function OccasionPicker() {
  const [activeId, setActiveId] = useState<(typeof OCCASIONS)[number]["id"]>("newyear");
  const addItem = useCartStore((s) => s.addItem);

  const active = OCCASIONS.find((o) => o.id === activeId)!;
  const product = getProductById(active.productId);

  if (!product) return null;
  const pack = product.packs[0];

  return (
    <section className="bg-navy py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            <Sparkle className="size-3.5" />
            Подборщик
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Подберите икру к вашему столу
          </h2>
          <p className="mt-4 text-white/60">
            Расскажите, для какого повода нужна икра — мы подберём готовый
            набор.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {OCCASIONS.map((o) => (
            <button
              key={o.id}
              onClick={() => setActiveId(o.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300",
                activeId === o.id
                  ? "border-gold bg-gold text-navy shadow-lg"
                  : "border-white/15 text-white/75 hover:border-gold/50 hover:text-white"
              )}
            >
              <o.icon className="size-4" />
              {o.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm sm:grid-cols-2"
          >
            <div className="aspect-[4/3] sm:aspect-auto">
              <img
                src={product.image}
                alt={product.name}
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
              <span className="w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                Рекомендуем
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">{product.name}</h3>
              <p className="text-sm leading-relaxed text-white/65">{active.note}</p>
              <p className="text-sm text-white/50">{product.description}</p>
              <div className="mt-2 flex items-center justify-between gap-4">
                <p className="font-serif text-2xl font-bold text-gold">
                  {formatPrice(pack.price)}
                </p>
                <Button
                  onClick={() => {
                    addItem(product.id, pack.weight, 1);
                    toast.success(`${product.name} добавлен в корзину`);
                  }}
                >
                  Добавить в корзину
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
