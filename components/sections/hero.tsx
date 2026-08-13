"use client";

import { motion } from "framer-motion";
import { Award, Snowflake, Sparkles, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPhotoFrame } from "@/components/sections/hero-photo-frame";
import { Magnetic } from "@/components/effects/magnetic";
import { Tilt } from "@/components/effects/tilt";
import { ParticleCanvas } from "@/components/effects/particle-canvas";
import { CountUp } from "@/components/effects/count-up";
import { useAppReadyStore } from "@/lib/store/app-ready-store";
import { cn } from "@/lib/utils";

const FEATURES = [
  { icon: Waves, label: "Дикий вилов", sub: "Прямі постачання з промислу" },
  { icon: Award, label: "ДСТУ", sub: "Сертифікована продукція" },
  { icon: Snowflake, label: "−2…−4°C", sub: "Безперервний холодовий ланцюг" },
];

const TITLE_PARTS = [
  { text: "Преміальна", gold: false },
  { text: "ікра", gold: false },
  { text: "з", gold: false },
  { text: "доставкою", gold: false },
  { text: "день", gold: true },
  { text: "у", gold: true },
  { text: "день", gold: true },
  { text: "від", gold: false },
  { text: "компанії", gold: false },
  { text: "«Океанаріум»", gold: false },
];

export function Hero() {
  const ready = useAppReadyStore((s) => s.ready);

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
      <ParticleCanvas />
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
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            <Sparkles className="size-3.5" />
            Преміальні морепродукти з 2009 року
          </span>

          <h1
            className="mt-6 font-serif text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl"
            style={{ perspective: 800 }}
          >
            {TITLE_PARTS.map((part, i) => (
              <motion.span
                key={i}
                className={cn("inline-block", part.gold && "shimmer-text")}
                initial={{ opacity: 0, y: 26 }}
                animate={ready ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.06, ease: "easeOut" }}
              >
                {part.text}&nbsp;
              </motion.span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Гарантована якість, холодний цех і прямі постачання від вилову до
            вашого столу. Чорна та червона ікра, відібрана вручну та збережена
            в суворому температурному режимі на кожному етапі.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button size="lg" asChild data-cursor-hover>
                <a href="#catalog">Обрати ікру</a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="outlineLight" asChild data-cursor-hover>
                <a href="#quick-order">Швидке замовлення</a>
              </Button>
            </Magnetic>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                animate={ready ? { opacity: 1, y: 0 } : undefined}
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
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <Tilt maxTilt={7} className="w-full">
            <HeroPhotoFrame>
              <img
                src="/images/hero-jar-cutout.png"
                alt="Банка ікри форелі Океанаріум"
                className="relative h-full w-auto max-w-full object-contain drop-shadow-2xl"
              />
            </HeroPhotoFrame>
          </Tilt>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-4 -left-4 rounded-2xl border border-border bg-white p-4 shadow-xl sm:left-0 sm:p-5"
          >
            <p className="font-serif text-2xl font-bold text-navy">
              <CountUp to={12} suffix="+" start={ready} /> років
            </p>
            <p className="text-xs text-muted-foreground">на ринку преміальних морепродуктів</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
