"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Must start `false` on both server and client (matching SSR output) — the real
// prefers-reduced-motion check can only run after mount, so it's applied inside an
// effect rather than as the initial state, to avoid a hydration mismatch.
function useMotionOk() {
  const [motionOk, setMotionOk] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing a client-only value post-mount, see comment above
      setMotionOk(true);
    }
  }, []);
  return motionOk;
}

const GOLD_LIGHT = "#e2c078";

/**
 * Faint bubbles drifting upward and fading, for use as subtle background texture on dark
 * (navy/ink) sections. Positions are deterministic (index-based), not `Math.random()`, to avoid
 * SSR/hydration mismatches.
 */
export function AmbientBubbles({
  count = 14,
  color = GOLD_LIGHT,
}: {
  count?: number;
  color?: string;
}) {
  const motionOk = useMotionOk();
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        xPct: 4 + ((i * 137) % 92),
        size: 2 + (i % 4),
        duration: 9 + (i % 5) * 2.4,
        delay: (i * 1.7) % 12,
      })),
    [count]
  );

  if (!motionOk) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${b.xPct}%`,
            bottom: "-5%",
            width: b.size,
            height: b.size,
            background: color,
          }}
          animate={{ y: ["0%", "-2200%"], opacity: [0, 0.22, 0] }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function FishSilhouette({ color }: { color: string }) {
  return (
    <svg width="52" height="22" viewBox="0 0 52 22" fill="none" aria-hidden>
      <path d="M0 11 L-12 1 L-12 21 Z" fill={color} />
      <ellipse cx="24" cy="11" rx="20" ry="7.5" fill={color} />
      <circle cx="38" cy="8" r="1.4" fill="#0b132b" opacity={0.4} />
    </svg>
  );
}

/**
 * A couple of low-opacity fish silhouettes that slowly drift across the section once in a while,
 * staggered so it doesn't feel mechanical. Very subtle background texture, not a focal point.
 */
export function SwimmingFish({
  count = 2,
  color = GOLD_LIGHT,
}: {
  count?: number;
  color?: string;
}) {
  const motionOk = useMotionOk();
  const fishes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        topPct: 15 + ((i * 233) % 60),
        duration: 18 + (i % 3) * 4,
        delay: i * 7 + ((i * 53) % 6),
        repeatDelay: 6 + (i % 3) * 3,
        scale: 0.8 + (i % 3) * 0.25,
        flip: i % 2 === 0,
      })),
    [count]
  );

  if (!motionOk) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {fishes.map((f, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: `${f.topPct}%` }}
          initial={{ x: "-10%", opacity: 0 }}
          animate={{ x: "110%", opacity: [0, 0.22, 0.22, 0] }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            repeatDelay: f.repeatDelay,
            ease: "easeInOut",
          }}
        >
          <div
            style={{
              transform: `scale(${f.scale})${f.flip ? " scaleX(-1)" : ""}`,
            }}
          >
            <FishSilhouette color={color} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
