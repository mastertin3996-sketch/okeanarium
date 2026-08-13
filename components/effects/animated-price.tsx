"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { formatPrice } from "@/lib/utils";

export function AnimatedPrice({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    const controls = animate(prevValue.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplayed(Math.round(v)),
    });
    prevValue.current = value;
    return () => controls.stop();
  }, [value]);

  return <span>{formatPrice(displayed)}</span>;
}
