"use client";

import { useId, useMemo, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const IMG = "/images/hero-jar-cutout.png";

const GOLD = "#c5a059";
const GOLD_LIGHT = "#e2c078";
const GOLD_DARK = "#a8823f";
const EMERALD = "#0f766e";
const CAVIAR = "#e21c01";
const CAVIAR_LIGHT = "#e36941";

const SIZE = 220;
const BAND = 24; // outer ring band width
const PHOTO_INSET = BAND;

function ringMask(thickness: number): CSSProperties {
  const m = `radial-gradient(farthest-side, transparent calc(50% - ${thickness}px), #000 calc(50% - ${thickness}px))`;
  return { WebkitMask: m, mask: m };
}

function wavyPath(cx: number, cy: number, r: number, amp: number, freq: number, points = 140) {
  let d = "";
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * Math.PI * 2;
    const rr = r + amp * Math.sin(freq * t);
    const x = cx + rr * Math.cos(t);
    const y = cy + rr * Math.sin(t);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)} `;
  }
  return d + "Z";
}

function Photo() {
  return (
    <div className="absolute rounded-full overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" style={{ inset: PHOTO_INSET }}>
      <Image src={IMG} alt="" fill sizes="220px" className="object-cover object-[50%_36%]" />
    </div>
  );
}

function Card({ id, name, children }: { id: number | string; name: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-navy-light/60 p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        {children}
        <Photo />
      </div>
      <p className="text-center text-xs font-semibold text-white/80">
        <span className="text-gold">#{id}</span> {name}
      </p>
    </div>
  );
}

// ---------- engines ----------

function ConicRing({
  c1,
  c2,
  c3,
  speed,
  reverse,
  thickness = BAND - 4,
}: {
  c1: string;
  c2: string;
  c3?: string;
  speed: number;
  reverse?: boolean;
  thickness?: number;
}) {
  return (
    <div
      className="absolute inset-0 rounded-full animate-spin"
      style={{
        background: `conic-gradient(from 0deg, ${c1}, ${c2}, ${c3 ?? c1}, ${c1})`,
        animationDuration: `${speed}s`,
        animationDirection: reverse ? "reverse" : "normal",
        ...ringMask(thickness),
      }}
    />
  );
}

function DashedRing({
  color,
  speed,
  reverse,
  dash = 8,
  gap = 6,
  sw = 3,
  cap = "round",
  r = SIZE / 2 - BAND / 2,
}: {
  color: string;
  speed: number;
  reverse?: boolean;
  dash?: number;
  gap?: number;
  sw?: number;
  cap?: "round" | "butt" | "square";
  r?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="absolute inset-0 animate-spin"
      style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeDasharray={`${dash} ${gap}`}
        strokeLinecap={cap}
      />
    </svg>
  );
}

function PulseRing({ color, speed = 2.2 }: { color: string; speed?: number }) {
  return (
    <>
      <div className="absolute inset-[8px] rounded-full border-2" style={{ borderColor: color }} />
      <motion.div
        className="absolute inset-[8px] rounded-full border-2"
        style={{ borderColor: color }}
        animate={{ scale: [1, 1.2], opacity: [0.65, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "easeOut" }}
      />
    </>
  );
}

function OrbitDots({
  color,
  colors,
  count = 6,
  speed = 7,
  reverse,
  dotSize = 5,
}: {
  color?: string;
  colors?: string[];
  count?: number;
  speed?: number;
  reverse?: boolean;
  dotSize?: number;
}) {
  const radius = SIZE / 2 - BAND / 2;
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const dotColor = colors ? colors[i % colors.length] : color;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              background: dotColor,
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translate(${radius}px) translate(-50%, -50%)`,
            }}
          />
        );
      })}
    </motion.div>
  );
}

function SonarPing({ color, speed = 2.6, rings = 3 }: { color: string; speed?: number; rings?: number }) {
  return (
    <>
      {Array.from({ length: rings }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-[10px] rounded-full border-2"
          style={{ borderColor: color }}
          animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
          transition={{ duration: speed, repeat: Infinity, ease: "easeOut", delay: (speed / rings) * i }}
        />
      ))}
    </>
  );
}

function WaveRing({
  color,
  amp = 6,
  freq = 14,
  speed,
  sw = 2,
}: {
  color: string;
  amp?: number;
  freq?: number;
  speed?: number;
  sw?: number;
}) {
  const r = SIZE / 2 - BAND / 2;
  const d = useMemo(() => wavyPath(SIZE / 2, SIZE / 2, r, amp, freq), [r, amp, freq]);
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={speed ? "absolute inset-0 animate-spin" : "absolute inset-0"}
      style={speed ? { animationDuration: `${speed}s` } : undefined}
    >
      <path d={d} fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  );
}

function TextRing({
  text,
  color,
  speed,
  reverse,
  fontSize = 9,
}: {
  text: string;
  color: string;
  speed: number;
  reverse?: boolean;
  fontSize?: number;
}) {
  const id = useId();
  const r = SIZE / 2 - BAND / 2;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const d = `M ${cx - r},${cy} a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`;
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="absolute inset-0 animate-spin"
      style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      <defs>
        <path id={id} d={d} />
      </defs>
      <text fontSize={fontSize} fill={color} letterSpacing="2" style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700 }}>
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </svg>
  );
}

function SparkleRing({ color, count = 10, speed = 1.6 }: { color: string; count?: number; speed?: number }) {
  const radius = SIZE / 2 - BAND / 2;
  const points = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / count;
        return {
          x: SIZE / 2 + radius * Math.cos(angle),
          y: SIZE / 2 + radius * Math.sin(angle),
          delay: (i / count) * speed,
        };
      }),
    [count, radius, speed]
  );
  return (
    <>
      {points.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: 4, height: 4, background: color, left: p.x - 2, top: p.y - 2 }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }}
          transition={{ duration: speed, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </>
  );
}

function TicksRing({
  color,
  count = 16,
  speed,
  reverse,
  len = 7,
  sw = 2,
  boldEvery = 4,
}: {
  color: string;
  count?: number;
  speed: number;
  reverse?: boolean;
  len?: number;
  sw?: number;
  boldEvery?: number;
}) {
  const radius = SIZE / 2 - BAND / 2;
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const bold = boldEvery && i % boldEvery === 0;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: sw,
              height: bold ? len * 1.7 : len,
              background: color,
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${radius - len}px)`,
            }}
          />
        );
      })}
    </motion.div>
  );
}

function ShimmerSweep({
  base,
  highlight,
  speed,
  thickness = BAND - 4,
}: {
  base: string;
  highlight: string;
  speed: number;
  thickness?: number;
}) {
  return (
    <>
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: base, opacity: 0.35, ...ringMask(thickness) }}
      />
      <div
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${highlight} 20deg, transparent 50deg)`,
          animationDuration: `${speed}s`,
          ...ringMask(thickness),
        }}
      />
    </>
  );
}

function DoubleRing({
  c1,
  c2,
  speed1,
  speed2,
  reverse2,
}: {
  c1: string;
  c2: string;
  speed1: number;
  speed2: number;
  reverse2?: boolean;
}) {
  return (
    <>
      <DashedRing color={c1} speed={speed1} dash={3} gap={5} sw={2} r={SIZE / 2 - 6} />
      <DashedRing color={c2} speed={speed2} reverse={reverse2} dash={10} gap={4} sw={2} r={SIZE / 2 - 16} />
    </>
  );
}

function BlobMorph({ color, speed = 7 }: { color: string; speed?: number }) {
  return (
    <motion.div
      className="absolute inset-[4px] border-2"
      style={{ borderColor: color }}
      animate={{
        borderRadius: [
          "42% 58% 60% 40% / 45% 40% 60% 55%",
          "58% 42% 40% 60% / 55% 60% 40% 45%",
          "42% 58% 60% 40% / 45% 40% 60% 55%",
        ],
      }}
      transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Bubbles({ color, count = 8, speed = 5 }: { color: string; count?: number; speed?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        x: 12 + ((i * 187) % (SIZE - 24)),
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
          style={{ width: b.size, height: b.size, background: color, left: b.x, bottom: -10 }}
          animate={{ y: [0, -(SIZE + 20)], opacity: [0, 0.85, 0] }}
          transition={{ duration: speed, repeat: Infinity, delay: b.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function Breathe({ color, ring2, speed = 3.4 }: { color: string; ring2?: string; speed?: number }) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ scale: [1, 1.035, 1] }}
      transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-[6px] rounded-full border-2" style={{ borderColor: color }} />
      {ring2 && <div className="absolute inset-[13px] rounded-full border" style={{ borderColor: ring2 }} />}
    </motion.div>
  );
}

function PulseSatellites({
  colors,
  count = 6,
  orbitSpeed = 9,
  pulseSpeed = 1.6,
  reverse,
  dotSize = 6,
}: {
  colors: string[];
  count?: number;
  orbitSpeed?: number;
  pulseSpeed?: number;
  reverse?: boolean;
  dotSize?: number;
}) {
  const radius = SIZE / 2 - BAND / 2;
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: orbitSpeed, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translate(${radius}px) translate(-50%, -50%)`,
            }}
          >
            <motion.div
              className="rounded-full"
              style={{ width: dotSize, height: dotSize, background: color }}
              animate={{ scale: [0.55, 1.35, 0.55], opacity: [0.65, 1, 0.65] }}
              transition={{
                duration: pulseSpeed,
                repeat: Infinity,
                delay: (i / count) * pulseSpeed,
                ease: "easeInOut",
              }}
            />
          </div>
        );
      })}
    </motion.div>
  );
}

function OrganicSonar({
  color,
  colors,
  rings = 3,
  speed = 3,
  organic = true,
}: {
  color?: string;
  colors?: string[];
  rings?: number;
  speed?: number;
  organic?: boolean;
}) {
  const blobShapes = [
    "42% 58% 60% 40% / 45% 40% 60% 55%",
    "58% 42% 40% 60% / 55% 60% 40% 45%",
    "42% 58% 60% 40% / 45% 40% 60% 55%",
  ];
  return (
    <>
      {Array.from({ length: rings }).map((_, i) => (
        <motion.div
          key={i}
          className={organic ? "absolute inset-[10px] border-2" : "absolute inset-[10px] rounded-full border-2"}
          style={{
            borderColor: colors ? colors[i % colors.length] : color,
            borderRadius: organic ? undefined : undefined,
          }}
          animate={
            organic
              ? { scale: [1, 1.32], opacity: [0.7, 0], borderRadius: blobShapes }
              : { scale: [1, 1.32], opacity: [0.7, 0] }
          }
          transition={{ duration: speed, repeat: Infinity, ease: "easeOut", delay: (speed / rings) * i }}
        />
      ))}
    </>
  );
}

function ComboOrganicSonarSatellites({
  ringColor = GOLD,
  ringColors,
  bubbleColor = GOLD_LIGHT,
  dotColors = [CAVIAR, CAVIAR_LIGHT],
  rings = 3,
  dotCount = 6,
  dotSize = 6,
  orbitSpeed = 9,
  pulseSpeed = 1.6,
  sonarSpeed = 3,
  bubbleCount = 7,
  bubbleSpeed = 5,
  organic = true,
  reverse,
  breathe = true,
}: {
  ringColor?: string;
  ringColors?: string[];
  bubbleColor?: string;
  dotColors?: string[];
  rings?: number;
  dotCount?: number;
  dotSize?: number;
  orbitSpeed?: number;
  pulseSpeed?: number;
  sonarSpeed?: number;
  bubbleCount?: number;
  bubbleSpeed?: number;
  organic?: boolean;
  reverse?: boolean;
  breathe?: boolean;
}) {
  const content = (
    <>
      <Bubbles color={bubbleColor} count={bubbleCount} speed={bubbleSpeed} />
      {rings > 0 && (
        <OrganicSonar color={ringColor} colors={ringColors} rings={rings} speed={sonarSpeed} organic={organic} />
      )}
      <PulseSatellites
        colors={dotColors}
        count={dotCount}
        dotSize={dotSize}
        orbitSpeed={orbitSpeed}
        pulseSpeed={pulseSpeed}
        reverse={reverse}
      />
    </>
  );
  if (!breathe) return content;
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: sonarSpeed * 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {content}
    </motion.div>
  );
}

// ---------- 50 variants ----------

const COMBO_GROUP = {
  title: "Комбо: бульбашки + сонар + супутники (колір ікри)",
  items: [
    {
      id: "C1",
      name: "Органічний сонар, помірний темп",
      node: <ComboOrganicSonarSatellites />,
    },
    {
      id: "C2",
      name: "Швидкі супутники, часті бульбашки",
      node: (
        <ComboOrganicSonarSatellites
          orbitSpeed={5}
          pulseSpeed={1.1}
          bubbleCount={10}
          bubbleSpeed={3.5}
          dotCount={8}
        />
      ),
    },
    {
      id: "C3",
      name: "Сонар без органічної форми (чисті кола)",
      node: <ComboOrganicSonarSatellites organic={false} sonarSpeed={2.6} rings={3} />,
    },
    {
      id: "C4",
      name: "Повільне дихання, великі супутники",
      node: (
        <ComboOrganicSonarSatellites
          orbitSpeed={14}
          pulseSpeed={2.4}
          sonarSpeed={4.5}
          dotCount={5}
          bubbleSpeed={7}
        />
      ),
    },
    {
      id: "C5",
      name: "Супутники проти годинникової",
      node: <ComboOrganicSonarSatellites reverse orbitSpeed={7} dotCount={7} rings={4} sonarSpeed={3.6} />,
    },
    {
      id: "C6",
      name: "Без дихання картки, тільки внутрішній рух",
      node: <ComboOrganicSonarSatellites breathe={false} orbitSpeed={6} pulseSpeed={1.3} bubbleCount={9} />,
    },
    {
      id: "C7",
      name: "Чисті кола, базовий темп",
      node: <ComboOrganicSonarSatellites organic={false} sonarSpeed={3} orbitSpeed={9} pulseSpeed={1.6} />,
    },
    {
      id: "C8",
      name: "Чисті кола, швидкі супутники й бульбашки",
      node: (
        <ComboOrganicSonarSatellites
          organic={false}
          orbitSpeed={5}
          pulseSpeed={1}
          sonarSpeed={2}
          bubbleCount={10}
          bubbleSpeed={3.5}
          dotCount={8}
        />
      ),
    },
    {
      id: "C9",
      name: "Чисті кола, повільний спокійний сонар (2 кільця)",
      node: (
        <ComboOrganicSonarSatellites
          organic={false}
          rings={2}
          sonarSpeed={4.5}
          orbitSpeed={13}
          pulseSpeed={2.2}
          bubbleSpeed={7}
        />
      ),
    },
    {
      id: "C10",
      name: "Чисті кола, 4 кільця, проти годинникової",
      node: (
        <ComboOrganicSonarSatellites
          organic={false}
          rings={4}
          reverse
          orbitSpeed={7}
          dotCount={7}
          sonarSpeed={3.4}
        />
      ),
    },
    {
      id: "C11",
      name: "Чисті кола, без дихання картки, густі бульбашки",
      node: (
        <ComboOrganicSonarSatellites
          organic={false}
          breathe={false}
          bubbleCount={12}
          bubbleSpeed={4}
          orbitSpeed={8}
          pulseSpeed={1.4}
        />
      ),
    },
    {
      id: "C12",
      name: "Чисті кола, мінімалістичний (мало елементів)",
      node: (
        <ComboOrganicSonarSatellites
          organic={false}
          rings={2}
          dotCount={4}
          bubbleCount={4}
          orbitSpeed={10}
          pulseSpeed={1.8}
          bubbleSpeed={6}
        />
      ),
    },
  ],
};

const NO_RINGS_GROUP = {
  title: "Без сонарних кілець — швидкі супутники + бульбашки",
  items: [
    {
      id: "D1",
      name: "Як C2, але без кілець",
      node: (
        <ComboOrganicSonarSatellites
          rings={0}
          orbitSpeed={5}
          pulseSpeed={1.1}
          bubbleCount={10}
          bubbleSpeed={3.5}
          dotCount={8}
        />
      ),
    },
    {
      id: "D2",
      name: "Ще швидше, більше бульбашок",
      node: (
        <ComboOrganicSonarSatellites
          rings={0}
          orbitSpeed={3.5}
          pulseSpeed={0.8}
          bubbleCount={14}
          bubbleSpeed={2.5}
          dotCount={10}
        />
      ),
    },
    {
      id: "D3",
      name: "Проти годинникової стрілки",
      node: (
        <ComboOrganicSonarSatellites
          rings={0}
          reverse
          orbitSpeed={5}
          pulseSpeed={1.1}
          bubbleCount={10}
          bubbleSpeed={3.5}
          dotCount={8}
        />
      ),
    },
    {
      id: "D4",
      name: "Великі супутники",
      node: (
        <ComboOrganicSonarSatellites
          rings={0}
          orbitSpeed={5}
          pulseSpeed={1.2}
          bubbleCount={10}
          bubbleSpeed={3.5}
          dotCount={6}
          dotSize={9}
        />
      ),
    },
    {
      id: "D5",
      name: "Без дихання картки",
      node: (
        <ComboOrganicSonarSatellites
          rings={0}
          breathe={false}
          orbitSpeed={5}
          pulseSpeed={1.1}
          bubbleCount={10}
          bubbleSpeed={3.5}
          dotCount={8}
        />
      ),
    },
    {
      id: "D6",
      name: "Максимум бульбашок, супутники рідше",
      node: (
        <ComboOrganicSonarSatellites
          rings={0}
          orbitSpeed={6}
          pulseSpeed={1.4}
          bubbleCount={16}
          bubbleSpeed={2.8}
          dotCount={5}
        />
      ),
    },
  ],
};

const C6_TONES_GROUP = {
  title: "C6 — колір органічних кілець у тон сайту",
  items: [
    {
      id: "E1",
      name: "Золото (основний тон сайту)",
      node: (
        <ComboOrganicSonarSatellites
          breathe={false}
          orbitSpeed={6}
          pulseSpeed={1.3}
          bubbleCount={9}
          ringColor={GOLD}
        />
      ),
    },
    {
      id: "E2",
      name: "Темне золото (глибший відтінок)",
      node: (
        <ComboOrganicSonarSatellites
          breathe={false}
          orbitSpeed={6}
          pulseSpeed={1.3}
          bubbleCount={9}
          ringColor={GOLD_DARK}
        />
      ),
    },
    {
      id: "E3",
      name: "Світле золото (шампань)",
      node: (
        <ComboOrganicSonarSatellites
          breathe={false}
          orbitSpeed={6}
          pulseSpeed={1.3}
          bubbleCount={9}
          ringColor={GOLD_LIGHT}
        />
      ),
    },
    {
      id: "E4",
      name: "Смарагд (другий акцент сайту)",
      node: (
        <ComboOrganicSonarSatellites
          breathe={false}
          orbitSpeed={6}
          pulseSpeed={1.3}
          bubbleCount={9}
          ringColor={EMERALD}
        />
      ),
    },
    {
      id: "E5",
      name: "Дует золото + смарагд (кільця чергуються)",
      node: (
        <ComboOrganicSonarSatellites
          breathe={false}
          orbitSpeed={6}
          pulseSpeed={1.3}
          bubbleCount={9}
          ringColors={[GOLD, EMERALD, GOLD_LIGHT]}
        />
      ),
    },
    {
      id: "E6",
      name: "Градієнт золота (світле → темне)",
      node: (
        <ComboOrganicSonarSatellites
          breathe={false}
          orbitSpeed={6}
          pulseSpeed={1.3}
          bubbleCount={9}
          ringColors={[GOLD_LIGHT, GOLD, GOLD_DARK]}
        />
      ),
    },
  ],
};

const GROUPS: { title: string; items: { id: number | string; name: string; node: ReactNode }[] }[] = [
  COMBO_GROUP,
  C6_TONES_GROUP,
  NO_RINGS_GROUP,
  {
    title: "Обертові кільця",
    items: [
      { id: 1, name: "Золоте сяйво", node: <ConicRing c1={GOLD} c2={GOLD_LIGHT} speed={7} /> },
      { id: 2, name: "Смарагдовий вихор", node: <ConicRing c1={EMERALD} c2={GOLD} speed={5} reverse /> },
      { id: 3, name: "Тонке кільце", node: <ConicRing c1={GOLD} c2={GOLD_LIGHT} speed={4} thickness={8} /> },
      { id: 4, name: "Товсте кільце", node: <ConicRing c1={GOLD_DARK} c2={GOLD} speed={10} thickness={18} /> },
      { id: 5, name: "Дует золото-смарагд", node: <ConicRing c1={GOLD} c2={EMERALD} c3={GOLD_LIGHT} speed={8} /> },
      { id: 6, name: "Швидкий вихор", node: <ConicRing c1={GOLD_LIGHT} c2={GOLD_DARK} speed={2.5} reverse /> },
    ],
  },
  {
    title: "Пунктирні кільця",
    items: [
      { id: 7, name: "Пунктир класичний", node: <DashedRing color={GOLD} dash={8} gap={6} speed={10} /> },
      { id: 8, name: "Дрібний пунктир", node: <DashedRing color={GOLD} dash={3} gap={4} speed={14} reverse /> },
      { id: 9, name: "Великий пунктир", node: <DashedRing color={EMERALD} dash={16} gap={10} speed={12} /> },
      { id: 10, name: "Крапки по колу", node: <DashedRing color={GOLD} dash={1} gap={6} sw={4} speed={9} /> },
      { id: 11, name: "Морзянка", node: <DashedRing color={GOLD_LIGHT} dash={12} gap={3} speed={6} reverse /> },
      { id: 12, name: "Смарагдовий пунктир", node: <DashedRing color={EMERALD} dash={6} gap={6} speed={4} /> },
    ],
  },
  {
    title: "Пульсація",
    items: [
      { id: 13, name: "Пульсуюче золото", node: <PulseRing color={GOLD} speed={2.2} /> },
      { id: 14, name: "Пульс смарагд", node: <PulseRing color={EMERALD} speed={2.8} /> },
      { id: 15, name: "М'який пульс", node: <PulseRing color={GOLD_LIGHT} speed={3.6} /> },
      { id: 16, name: "Швидкий пульс", node: <PulseRing color={GOLD} speed={1.4} /> },
    ],
  },
  {
    title: "Супутники навколо кола",
    items: [
      { id: 17, name: "Золоті супутники", node: <OrbitDots color={GOLD} count={6} speed={7} /> },
      { id: 18, name: "Дрібні супутники", node: <OrbitDots color={GOLD} count={14} speed={10} dotSize={3} /> },
      { id: 19, name: "Великі супутники", node: <OrbitDots color={EMERALD} count={4} speed={12} dotSize={8} reverse /> },
      { id: 20, name: "Різнокольорові супутники", node: <OrbitDots colors={[GOLD, EMERALD]} count={8} speed={9} /> },
      { id: 21, name: "Швидкі супутники", node: <OrbitDots color={GOLD} count={6} speed={3} reverse /> },
    ],
  },
  {
    title: "Сонар",
    items: [
      { id: 22, name: "Сонар золотий", node: <SonarPing color={GOLD} speed={2.6} rings={3} /> },
      { id: 23, name: "Сонар смарагдовий", node: <SonarPing color={EMERALD} speed={3.2} rings={2} /> },
      { id: 24, name: "Потрійний сонар", node: <SonarPing color={GOLD_LIGHT} speed={3.4} rings={4} /> },
    ],
  },
  {
    title: "Хвилі",
    items: [
      { id: 25, name: "Хвиля статична", node: <WaveRing color={GOLD} amp={6} freq={14} /> },
      { id: 26, name: "Хвиля обертова", node: <WaveRing color={GOLD} amp={5} freq={10} speed={16} /> },
      { id: 27, name: "Смарагдова хвиля", node: <WaveRing color={EMERALD} amp={7} freq={18} speed={20} /> },
      { id: 28, name: "Дрібна хвиля", node: <WaveRing color={GOLD_LIGHT} amp={3} freq={26} speed={12} /> },
    ],
  },
  {
    title: "Напис по колу",
    items: [
      { id: 29, name: "ОКЕАНАРІУМ по колу", node: <TextRing text="ОКЕАНАРІУМ • ПРЕМІУМ ІКРА • " color={GOLD} speed={18} /> },
      { id: 30, name: "Текст швидкий", node: <TextRing text="ОКЕАНАРІУМ • " color={GOLD_LIGHT} speed={9} reverse /> },
      { id: 31, name: "З 2009 року", node: <TextRing text="З 2009 РОКУ • ОКЕАНАРІУМ • " color={EMERALD} speed={22} /> },
      { id: 32, name: "Вінтажна печатка", node: <TextRing text="✦ ОКЕАНАРІУМ ✦ ПРЕМІУМ ✦ " color={GOLD} speed={26} /> },
    ],
  },
  {
    title: "Мерехтіння",
    items: [
      { id: 33, name: "Мерехтіння золоте", node: <SparkleRing color={GOLD} count={10} speed={1.8} /> },
      { id: 34, name: "Мерехтіння часте", node: <SparkleRing color={GOLD_LIGHT} count={16} speed={1.2} /> },
      { id: 35, name: "Мерехтіння смарагдове", node: <SparkleRing color={EMERALD} count={8} speed={2.2} /> },
    ],
  },
  {
    title: "Компас",
    items: [
      { id: 36, name: "Компас", node: <TicksRing color={GOLD} count={16} speed={20} boldEvery={4} /> },
      { id: 37, name: "Компас дрібний", node: <TicksRing color={GOLD} count={32} speed={26} boldEvery={8} /> },
      { id: 38, name: "Компас смарагдовий", node: <TicksRing color={EMERALD} count={12} speed={14} reverse boldEvery={3} /> },
      { id: 39, name: "Компас швидкий", node: <TicksRing color={GOLD_LIGHT} count={20} speed={8} boldEvery={5} /> },
    ],
  },
  {
    title: "Відблиск",
    items: [
      { id: 40, name: "Відблиск золотий", node: <ShimmerSweep base={GOLD} highlight={GOLD_LIGHT} speed={3} /> },
      { id: 41, name: "Відблиск повільний", node: <ShimmerSweep base={GOLD_DARK} highlight={GOLD} speed={6} /> },
      { id: 42, name: "Відблиск смарагдовий", node: <ShimmerSweep base={EMERALD} highlight={GOLD_LIGHT} speed={4} /> },
    ],
  },
  {
    title: "Подвійні кільця",
    items: [
      { id: 43, name: "Подвійне золото", node: <DoubleRing c1={GOLD} c2={GOLD_LIGHT} speed1={14} speed2={9} reverse2 /> },
      { id: 44, name: "Золото + смарагд", node: <DoubleRing c1={GOLD} c2={EMERALD} speed1={10} speed2={16} /> },
      { id: 45, name: "Контраст кілець", node: <DoubleRing c1={GOLD_DARK} c2={GOLD} speed1={20} speed2={6} reverse2 /> },
      { id: 46, name: "Швидке подвійне", node: <DoubleRing c1={GOLD} c2={GOLD_LIGHT} speed1={5} speed2={5} reverse2 /> },
    ],
  },
  {
    title: "Органічні форми",
    items: [
      { id: 47, name: "Органічна рамка", node: <BlobMorph color={GOLD} speed={7} /> },
      { id: 48, name: "Смарагдова органіка", node: <BlobMorph color={EMERALD} speed={9} /> },
    ],
  },
  {
    title: "Інше",
    items: [
      { id: 49, name: "Бульбашки", node: <Bubbles color={GOLD_LIGHT} count={8} speed={5} /> },
      { id: 50, name: "Дихання", node: <Breathe color={GOLD} ring2={GOLD_LIGHT} speed={3.4} /> },
    ],
  },
];

export default function FrameLabPage() {
  return (
    <div className="min-h-screen bg-navy pt-28 pb-24" style={{ background: "#0b132b" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Frame Lab</p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            50 варіантів рамки для фото
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
            Кругові анімовані рамки в стилі сайту «Океанаріум» — оберіть номер, і я застосую його в хіро-блоці.
          </p>
        </div>

        {GROUPS.map((group) => (
          <div key={group.title} className="mb-14">
            <h2 className="mb-6 font-serif text-lg font-semibold text-gold-light">{group.title}</h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {group.items.map((item) => (
                <Card key={item.id} id={item.id} name={item.name}>
                  {item.node}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
