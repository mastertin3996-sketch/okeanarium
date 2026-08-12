"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/catalog/product-card";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

export function Catalog() {
  const [active, setActive] = useState<Category["id"]>("all");

  const filtered = useMemo(() => {
    if (active === "all") return products;
    return products.filter((p) => p.category === active);
  }, [active]);

  return (
    <section id="catalog" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
            Каталог
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
            Икра высшей категории
          </h2>
          <p className="mt-4 text-muted-foreground">
            Отбираем лучшее с промысла: чёрная икра осетровых, красная икра
            лососёвых видов и подарочные наборы для любого повода.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                active === cat.id
                  ? "border-navy bg-navy text-white shadow-md"
                  : "border-navy/15 text-navy/70 hover:border-gold/50 hover:text-navy"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
