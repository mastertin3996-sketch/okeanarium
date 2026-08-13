"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

function ReplayableCard({
  id,
  name,
  children,
}: {
  id: number | string;
  name: string;
  children: (playKey: number) => ReactNode;
}) {
  const [playKey, setPlayKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-navy-light/60 p-5">
      <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-xl bg-navy">
        {children(playKey)}
        <button
          onClick={() => setPlayKey((k) => k + 1)}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-gold/30 bg-navy/80 px-3 py-1.5 text-xs font-semibold text-gold backdrop-blur-sm hover:bg-navy"
          data-cursor-hover
        >
          <RotateCw className="size-3.5" />
          Повторити
        </button>
      </div>
      <p className="text-center text-xs font-semibold text-white/80">
        <span className="text-gold">#{id}</span> {name}
      </p>
    </div>
  );
}

function Glow({ size, opacity = [0.5, 0.9, 0.5] }: { size: number; opacity?: number[] }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold/20 blur-2xl"
      style={{ width: size, height: size }}
      animate={{ scale: [1, 1.3, 1], opacity }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}

export default function PreloaderLabPage() {
  return (
    <div className="min-h-screen bg-navy pt-28 pb-24" style={{ background: "#0b132b" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Preloader Lab</p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Варіанти розміру прелоадера
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
            Натисніть «Повторити», щоб побачити анімацію появи ще раз. Оберіть номер — застосую до сайту.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ReplayableCard id={1} name="128px (у 1.6× більше)">
            {(key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative"
              >
                <Glow size={220} />
                <img src="/logo-mark.png" alt="" className="relative w-32" />
              </motion.div>
            )}
          </ReplayableCard>

          <ReplayableCard id={2} name="160px (у 2× більше)">
            {(key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative"
              >
                <Glow size={260} />
                <img src="/logo-mark.png" alt="" className="relative w-40" />
              </motion.div>
            )}
          </ReplayableCard>

          <ReplayableCard id={3} name="192px (у 2.4× більше)">
            {(key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative"
              >
                <Glow size={300} />
                <img src="/logo-mark.png" alt="" className="relative w-48" />
              </motion.div>
            )}
          </ReplayableCard>

          <ReplayableCard id={4} name="224px (максимальний)">
            {(key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative"
              >
                <Glow size={340} />
                <img src="/logo-mark.png" alt="" className="relative w-56" />
              </motion.div>
            )}
          </ReplayableCard>

          <ReplayableCard id={5} name="160px + напис «ОКЕАНАРІУМ»">
            {(key) => (
              <motion.div key={key} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="relative"
                >
                  <Glow size={260} />
                  <img src="/logo-mark.png" alt="" className="relative w-40" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-4 font-serif text-lg font-bold tracking-widest text-white"
                >
                  ОКЕАНАРІУМ
                </motion.p>
              </motion.div>
            )}
          </ReplayableCard>

          <ReplayableCard id={6} name="192px + напис + підзаголовок">
            {(key) => (
              <motion.div key={key} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="relative"
                >
                  <Glow size={300} />
                  <img src="/logo-mark.png" alt="" className="relative w-48" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-4 font-serif text-xl font-bold tracking-widest text-white"
                >
                  ОКЕАНАРІУМ
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold"
                >
                  Преміальна ікра
                </motion.p>
              </motion.div>
            )}
          </ReplayableCard>

          <ReplayableCard id={7} name="160px, яскравіше світіння">
            {(key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative"
              >
                <Glow size={300} opacity={[0.7, 1, 0.7]} />
                <img src="/logo-mark.png" alt="" className="relative w-40" />
              </motion.div>
            )}
          </ReplayableCard>

          <ReplayableCard id={8} name="192px, з обертовим золотим кільцем">
            {(key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative flex items-center justify-center"
                style={{ width: 240, height: 240 }}
              >
                <Glow size={300} />
                <motion.div
                  className="absolute rounded-full border-2 border-gold/40 border-t-gold"
                  style={{ width: 220, height: 220 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />
                <img src="/logo-mark.png" alt="" className="relative w-48" />
              </motion.div>
            )}
          </ReplayableCard>

          <ReplayableCard id={9} name="160px, без обертання при вході">
            {(key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
                <Glow size={260} />
                <img src="/logo-mark.png" alt="" className="relative w-40" />
              </motion.div>
            )}
          </ReplayableCard>
        </div>
      </div>
    </div>
  );
}
