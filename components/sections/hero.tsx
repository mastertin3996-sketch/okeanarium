"use client";

import { motion } from "framer-motion";
import { Award, Snowflake, Sparkles, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { icon: Waves, label: "Дикий вилов", sub: "Прямі постачання з промислу" },
  { icon: Award, label: "ДСТУ", sub: "Сертифікована продукція" },
  { icon: Snowflake, label: "−2…−4°C", sub: "Безперервний холодовий ланцюг" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <video
        className="hero-video absolute inset-0 size-full object-cover"
        poster="/video/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/80 to-navy"
        aria-hidden
      />
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

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8 lg:pt-40 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            <Sparkles className="size-3.5" />
            Преміальні морепродукти з 2009 року
          </span>

          <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
            Преміальна ікра з доставкою{" "}
            <span className="text-gold">день у день</span> від компанії «Океанаріум»
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Гарантована якість, холодний цех і прямі постачання від вилову до
            вашого столу. Чорна та червона ікра, відібрана вручну та збережена
            в суворому температурному режимі на кожному етапі.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="#catalog">Обрати ікру</a>
            </Button>
            <Button size="lg" variant="outlineLight" asChild>
              <a href="#quick-order">Швидке замовлення</a>
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
              alt="Преміальна чорна ікра Океанаріум"
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
            <p className="font-serif text-2xl font-bold text-navy">12+ років</p>
            <p className="text-xs text-muted-foreground">на ринку преміальних морепродуктів</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
