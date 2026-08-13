"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  depth: number;
  color: string;
  alphaBase: number;
  /** Base upward drift speed (px/frame) before depth scaling. */
  baseSpeed: number;
  /** Per-particle phase/frequency for the sine-driven "current" wobble. */
  wobblePhase: number;
  wobbleFreqX: number;
  wobbleFreqY: number;
  wobbleAmp: number;
  /** Slow independent breathing cycle. */
  pulsePhase: number;
  pulseFreq: number;
}

const COLORS = ["#c5a059", "#e2c078", "#e21c01", "#e36941"];

// Distance under which two foreground particles get a faint connecting thread.
const THREAD_DISTANCE = 70;
// Only particles at/above this depth participate in the connecting-thread mesh.
const THREAD_DEPTH_THRESHOLD = 0.55;
const THREAD_COLOR = "226, 192, 120"; // gold, as an rgb triple for use in rgba()

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function ParticleCanvas({ count = 42 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      particles = Array.from({ length: count }).map(() => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1.3 + Math.random() * 2.3,
          depth,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alphaBase: 0.35 + Math.random() * 0.45,
          baseSpeed: 0.08 + Math.random() * 0.18,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleFreqX: 0.15 + Math.random() * 0.35,
          wobbleFreqY: 0.1 + Math.random() * 0.25,
          wobbleAmp: 0.18 + Math.random() * 0.32,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseFreq: 0.8 + Math.random() * 1.0,
        };
      });
    }

    function step() {
      const now = performance.now() / 1000;
      ctx!.clearRect(0, 0, width, height);

      // Depth-scaled per-particle motion + repulsion.
      for (const p of particles) {
        // Parallax scaling: deeper (low depth) particles are smaller, dimmer,
        // slower and less reactive to the cursor; foreground particles are
        // bigger, brighter, faster and more reactive.
        const speedScale = lerp(0.35, 1.35, p.depth);
        const mouseScale = lerp(0.25, 1.3, p.depth);

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        const radius = 100;
        if (dist < radius) {
          const force = ((radius - dist) / radius) * mouseScale;
          p.x += (dx / (dist || 1)) * force * 2.4;
          p.y += (dy / (dist || 1)) * force * 2.4;
        }

        // Organic "water current" drift: layered sine waves with a
        // per-particle phase/frequency, plus a gentle upward bias, instead
        // of a constant straight-line vx/vy.
        const vx = Math.sin(now * p.wobbleFreqX + p.wobblePhase) * p.wobbleAmp * speedScale;
        const vy =
          -p.baseSpeed * speedScale +
          Math.cos(now * p.wobbleFreqY + p.wobblePhase) * p.wobbleAmp * 0.5 * speedScale;

        p.x += vx;
        p.y += vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      }

      // Soft connecting threads between nearby foreground particles — a
      // subtle fluid mesh rather than isolated dots. Cheap O(n^2) scan is
      // fine given the modest particle count.
      ctx!.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        if (a.depth < THREAD_DEPTH_THRESHOLD) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (b.depth < THREAD_DEPTH_THRESHOLD) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < THREAD_DISTANCE) {
            const alpha = 0.04 + (1 - dist / THREAD_DISTANCE) * 0.04;
            ctx!.strokeStyle = `rgba(${THREAD_COLOR}, ${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // Draw particles with depth-based size/opacity and a slow pulse.
      for (const p of particles) {
        const sizeScale = lerp(0.55, 1.3, p.depth);
        const opacityScale = lerp(0.3, 1.0, p.depth);
        const pulse = 0.5 + 0.5 * Math.sin(now * p.pulseFreq + p.pulsePhase);
        const r = p.r * sizeScale * (0.85 + pulse * 0.3);
        const alpha = Math.min(1, p.alphaBase * opacityScale * (0.7 + pulse * 0.3));

        ctx!.beginPath();
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = alpha;
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    resize();
    init();
    step();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 size-full" aria-hidden />;
}
