"use client";

import { motion } from "framer-motion";
import { Award, Snowflake, Sparkles, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { icon: Waves, label: "Дикий вылов", sub: "Прямые поставки с промысла" },
  { icon: Award, label: "ГОСТ", sub: "Сертифицированная продукция" },
  { icon: Snowflake, label: "−2…−4°C", sub: "Непрерывная холодовая цепь" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        className="absolute inset-0 bg-noise opacity-40"
        aria-hidden
      />
      <div
        className="absolute -top-40 -right-40 size-[560px] rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-40 size-[480px] rounded-full bg-emerald/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            <Sparkles className="size-3.5" />
            Премиальная морепродукция с 2009 года
          </span>

          <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
            Премиальная икра с доставкой{" "}
            <span className="text-gold">день в день</span> от компании «Океанариум»
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Гарантированное качество, холодный цех и прямые поставки от вылова
            до вашего стола. Чёрная и красная икра, отобранная вручную и
            хранящаяся в строгом температурном режиме на каждом этапе.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="#catalog">Выбрать икру</a>
            </Button>
            <Button size="lg" variant="outlineLight" asChild>
              <a href="#quick-order">Быстрый заказ</a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4"
              >
                <f.icon className="size-5 text-gold" />
                <p className="mt-2 text-sm font-bold text-white">{f.label}</p>
                <p className="mt-0.5 text-xs text-white/55 leading-snug">{f.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/20 shadow-2xl sm:max-w-lg">
            <img
              src="https://images.unsplash.com/photo-1757961048219-df1bbd0be167?q=80&w=1200&auto=format&fit=crop"
              alt="Премиальная чёрная икра Океанариум"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -bottom-6 -left-4 rounded-2xl border border-border bg-white p-4 shadow-xl sm:-left-8 sm:p-5"
          >
            <p className="font-serif text-2xl font-bold text-navy">12+ лет</p>
            <p className="text-xs text-muted-foreground">на рынке премиальных морепродуктов</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
