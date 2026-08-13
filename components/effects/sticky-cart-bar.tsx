"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useCartTotals } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function StickyCartBar() {
  const [scrolled, setScrolled] = useState(false);
  const items = useCartStore((s) => s.items);
  const isCartOpen = useCartStore((s) => s.isOpen);
  const openCart = useCartStore((s) => s.openCart);
  const { total, itemsCount } = useCartTotals();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = scrolled && items.length > 0 && !isCartOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-navy/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.3)]"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <button
              onClick={openCart}
              data-cursor-hover
              className="flex items-center gap-3 text-left"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <ShoppingBag className="size-5" />
              </span>
              <span>
                <span className="block text-xs text-white/55">
                  {itemsCount} {itemsCount === 1 ? "товар" : "товари"} у кошику
                </span>
                <span className="block font-serif text-lg font-bold text-white">
                  {formatPrice(total)}
                </span>
              </span>
            </button>
            <Button size="lg" onClick={openCart} data-cursor-hover>
              Оформити замовлення
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
