"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppReadyStore } from "@/lib/store/app-ready-store";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const setReady = useAppReadyStore((s) => s.setReady);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
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
              className="absolute inset-0 rounded-full bg-gold/20 blur-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <img src="/logo-mark.png" alt="" className="relative w-20 sm:w-24" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
