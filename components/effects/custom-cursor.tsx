"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  // Must start `false` on both server and client (matching SSR output) — the real
  // pointer-type check can only run after mount, so it's applied inside the effect
  // below rather than as the initial state, to avoid a hydration mismatch.
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing a client-only value post-mount, see comment above
    setEnabled(true);

    document.body.classList.add("custom-cursor-active");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onLeaveWindow = () => setVisible(false);
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, [role='button'], [data-cursor-hover]"));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full bg-gold"
        style={{ x, y, width: 6, height: 6, marginLeft: -3, marginTop: -3, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full border border-gold/70"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: hovering ? 1.6 : 1,
          backgroundColor: hovering ? "rgba(197,160,89,0.15)" : "rgba(197,160,89,0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
