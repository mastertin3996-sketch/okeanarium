"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const EMERALD = "#0f766e";
const GOLD_LIGHT = "#e2c078";
const CAVIAR = "#e21c01";
const CAVIAR_LIGHT = "#e36941";

const BLOB_SHAPES = [
  "42% 58% 60% 40% / 45% 40% 60% 55%",
  "58% 42% 40% 60% / 55% 60% 40% 45%",
  "42% 58% 60% 40% / 45% 40% 60% 55%",
];

function OrganicRings({ color, rings = 3, speed = 6.5 }: { color: string; rings?: number; speed?: number }) {
  return (
    <>
      {Array.from({ length: rings }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-2"
          style={{ inset: "4%", borderColor: color }}
          animate={{ scale: [1, 1.32], opacity: [0.7, 0], borderRadius: BLOB_SHAPES }}
          transition={{ duration: speed, repeat: Infinity, ease: "easeOut", delay: (speed / rings) * i }}
        />
      ))}
    </>
  );
}

function PulseSatellites({
  colors,
  count = 6,
  orbitSpeed = 9,
  pulseSpeed = 1.6,
  radiusPct = 44,
}: {
  colors: string[];
  count?: number;
  orbitSpeed?: number;
  pulseSpeed?: number;
  radiusPct?: number;
}) {
  const positions = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = ((360 / count) * i * Math.PI) / 180;
        return {
          left: 50 + radiusPct * Math.cos(angle),
          top: 50 + radiusPct * Math.sin(angle),
          delay: (i / count) * pulseSpeed,
          color: colors[i % colors.length],
        };
      }),
    [count, radiusPct, colors, pulseSpeed]
  );
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: orbitSpeed, repeat: Infinity, ease: "linear" }}
    >
      {positions.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${p.left}%`, top: `${p.top}%`, transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            className="rounded-full"
            style={{ width: "8px", height: "8px", background: p.color }}
            animate={{ scale: [0.55, 1.35, 0.55], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: pulseSpeed, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        </div>
      ))}
    </motion.div>
  );
}

function Bubbles({ color = GOLD_LIGHT, count = 9, speed = 5 }: { color?: string; count?: number; speed?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        xPct: 10 + ((i * 187) % 80),
        delay: (i / count) * speed,
        size: 3 + (i % 3),
      })),
    [count, speed]
  );
  return (
    <div className="absolute inset-0 overflow-hidden rounded-full">
      {items.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: b.size, height: b.size, background: color, left: `${b.xPct}%`, bottom: "-6%" }}
          animate={{ y: ["0%", "-620%"], opacity: [0, 0.85, 0] }}
          transition={{ duration: speed, repeat: Infinity, delay: b.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export function HeroPhotoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md sm:max-w-lg">
      <div className="absolute inset-0 rounded-full bg-gold/15 blur-3xl" aria-hidden />
      <Bubbles />
      <OrganicRings color={EMERALD} rings={3} speed={6.5} />
      <PulseSatellites colors={[CAVIAR, CAVIAR_LIGHT]} count={6} orbitSpeed={9} pulseSpeed={1.6} />
      <div className="absolute inset-[12%] flex items-center justify-center">{children}</div>
    </div>
  );
}
