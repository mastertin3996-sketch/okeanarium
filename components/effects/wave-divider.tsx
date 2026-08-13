"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaveDividerProps {
  /** Mirrors the wave vertically — use when the fill should crest from the top instead of the bottom. */
  flip?: boolean;
  /** CSS color (hex, rgb, or `var(--token)`) the wave shape fills with — should match the section BELOW the divider. */
  color?: string;
  className?: string;
}

/**
 * Decorative full-width wave crest that sits at the bottom edge of a section, pulled up via a
 * negative margin so it overlays the section above while being filled with the color of the
 * section below — creating the illusion that the upper section's bottom edge curves into a wave.
 */
export function WaveDivider({ flip = false, color = "#faf7f2", className }: WaveDividerProps) {
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
    <div
      aria-hidden
      className={cn(
        "relative z-10 -mt-16 block w-full overflow-hidden leading-none sm:-mt-24",
        className
      )}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-16 w-full sm:h-24"
      >
        <motion.g
          animate={motionOk ? { x: [0, -18, 0] } : undefined}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M-40,46 C160,92 320,-6 560,38 C800,82 940,4 1180,42 C1300,60 1400,64 1480,50 L1480,100 L-40,100 Z"
            fill={color}
            opacity={0.55}
          />
          <path
            d="M-40,62 C240,18 420,90 700,56 C940,28 1100,82 1320,54 C1380,46 1420,48 1480,52 L1480,100 L-40,100 Z"
            fill={color}
          />
        </motion.g>
      </svg>
    </div>
  );
}
