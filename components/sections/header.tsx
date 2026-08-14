"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#catalog", label: "Каталог" },
  { href: "#quality", label: "Про якість" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#delivery", label: "Доставка та оплата" },
  { href: "#contacts", label: "Контакти" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  // Chromium doesn't composite backdrop-filter over the hero <video>
  // correctly (the blur samples a blank frame instead of the video), so
  // blur is only enabled once we've scrolled past the video-heavy part of
  // the hero. Plain alpha transparency (no blur) always renders correctly.
  const [pastVideo, setPastVideo] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const itemsCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const toggleCart = useCartStore((s) => s.toggleCart);
  const setCallbackOpen = useUIStore((s) => s.setCallbackOpen);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setPastVideo(y > 400);

      if (y < 120) {
        setHidden(false);
      } else if (y > lastScrollY.current) {
        setHidden(true);
      } else if (y < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden && !mobileOpen ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full border-b transition-all duration-300",
        pastVideo && "backdrop-blur-sm",
        scrolled
          ? "bg-navy/70 border-white/10 shadow-lg"
          : "bg-navy/45 border-white/5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo-mark.png"
            alt=""
            width={683}
            height={392}
            priority
            className="h-10 w-auto shrink-0"
          />
          <span className="font-serif text-xl font-bold tracking-wide text-white">
            Океанаріум
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+380441234567"
            className="hidden xl:flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors"
          >
            <Phone className="size-4 text-gold" />
            +380 (44) 123-45-67
          </a>
          <Button
            variant="outlineLight"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => setCallbackOpen(true)}
          >
            Замовити дзвінок
          </Button>

          <button
            data-cart-icon
            aria-label="Кошик"
            onClick={toggleCart}
            className="relative flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <ShoppingBag className="size-5" />
            {itemsCount > 0 && (
              <motion.span
                key={itemsCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy"
              >
                {itemsCount}
              </motion.span>
            )}
          </button>

          <button
            aria-label="Меню"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden border-t border-white/10 bg-navy/80 backdrop-blur-sm px-4 pb-6 pt-2"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-4">
            <a
              href="tel:+380441234567"
              className="flex items-center gap-2 text-sm font-semibold text-white"
            >
              <Phone className="size-4 text-gold" />
              +380 (44) 123-45-67
            </a>
            <Button
              variant="default"
              onClick={() => {
                setCallbackOpen(true);
                setMobileOpen(false);
              }}
            >
              Замовити дзвінок
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
