"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FlyItem {
  id: number;
  imageSrc: string;
  fromRect: DOMRect;
  toRect: DOMRect;
}

let nextId = 0;

export function FlyToCartLayer() {
  const [items, setItems] = useState<FlyItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ imageSrc: string; fromRect: DOMRect }>).detail;
      if (!detail?.fromRect) return;
      const cartIcon = document.querySelector("[data-cart-icon]");
      if (!cartIcon) return;
      const toRect = cartIcon.getBoundingClientRect();
      setItems((prev) => [
        ...prev,
        { id: nextId++, imageSrc: detail.imageSrc, fromRect: detail.fromRect, toRect },
      ]);
    };
    window.addEventListener("fly-to-cart", handler);
    return () => window.removeEventListener("fly-to-cart", handler);
  }, []);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[998]" aria-hidden>
      {items.map((item) => {
        const fromCx = item.fromRect.left + item.fromRect.width / 2;
        const fromCy = item.fromRect.top + item.fromRect.height / 2;
        const toCx = item.toRect.left + item.toRect.width / 2;
        const toCy = item.toRect.top + item.toRect.height / 2;
        const size = 64;
        return (
          <motion.img
            key={item.id}
            src={item.imageSrc}
            alt=""
            initial={{
              x: fromCx - size / 2,
              y: fromCy - size / 2,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: toCx - size / 2,
              y: toCy - size / 2,
              scale: 0.15,
              opacity: 0,
            }}
            transition={{ duration: 0.65, ease: "easeIn" }}
            onAnimationComplete={() => removeItem(item.id)}
            className="absolute left-0 top-0 rounded-xl object-cover shadow-lg"
            style={{ width: size, height: size }}
          />
        );
      })}
    </div>
  );
}
