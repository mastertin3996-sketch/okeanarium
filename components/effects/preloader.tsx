"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppReadyStore } from "@/lib/store/app-ready-store";

export function Preloader() {
  // Must start `true` on both server and client (matching SSR output) — the real
  // prefers-reduced-motion check can only run after mount, so it's applied inside the
  // effect below rather than as the initial state, to avoid a hydration mismatch.
  const [loading, setLoading] = useState(true);
  const setReady = useAppReadyStore((s) => s.setReady);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing a client-only value post-mount, see comment above
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={setReady}>
      {loading && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center bg-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-2xl"
              style={{ width: 340, height: 340 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <img src="/logo-mark.png" alt="" className="relative w-56" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
