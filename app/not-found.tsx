"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Bubbles({ count = 14, speed = 7 }: { count?: number; speed?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        xPct: 4 + ((i * 137) % 92),
        delay: (i / count) * speed,
        size: 3 + (i % 4),
        drift: 6 + (i % 3) * 4,
      })),
    [count, speed]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold-light/40"
          style={{ width: b.size, height: b.size, left: `${b.xPct}%`, bottom: "-8%" }}
          animate={{
            y: ["0%", "-1400%"],
            x: [0, b.drift, 0, -b.drift, 0],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{ duration: speed, repeat: Infinity, delay: b.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  // Must start `false` on both server and client (matching SSR output) — the real
  // prefers-reduced-motion check can only run after mount, so it's applied inside an
  // effect rather than as the initial state, to avoid a hydration mismatch.
  const [motionOk, setMotionOk] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing a client-only value post-mount, see comment above
      setMotionOk(true);
    }
  }, []);

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy">
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-[#070d1e]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-noise opacity-40" aria-hidden />
      <div
        className="absolute -top-40 -right-40 size-[560px] rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-40 size-[480px] rounded-full bg-emerald/10 blur-3xl"
        aria-hidden
      />
      {motionOk && <Bubbles />}

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-2xl"
            style={{ width: 280, height: 280 }}
            animate={
              motionOk
                ? { scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }
                : { scale: 1, opacity: 0.6 }
            }
            transition={{ duration: 3.2, repeat: motionOk ? Infinity : 0, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.img
            src="/logo-mark.png"
            alt="Океанаріум"
            className="relative w-32 sm:w-40"
            animate={
              motionOk
                ? { x: [0, 26, -10, 0], y: [0, -10, 6, 0], rotate: [0, 6, -4, 0] }
                : undefined
            }
            transition={{ duration: 7, repeat: motionOk ? Infinity : 0, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-8 font-serif text-7xl font-bold tracking-tight text-gold sm:text-8xl"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
          className="mt-4 font-serif text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl"
        >
          Ця сторінка запливла кудись не туди
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Навіть найкращі вилови іноді губляться в дорозі. Посилання, за яким
          ви прийшли, більше не існує — та наша ікра нікуди не зникла і чекає
          на вас у каталозі.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" asChild>
            <Link href="/">На головну</Link>
          </Button>
          <Button size="lg" variant="outlineLight" asChild>
            <Link href="/#catalog">До каталогу</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
