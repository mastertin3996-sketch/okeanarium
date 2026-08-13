"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface Step {
  num: string;
  title: string;
  desc: string;
  image: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Вилов",
    desc: "Прямі постачання з промислових господарств Далекого Сходу та Каспію. Кожна партія — під суворим контролем від першого дня.",
    image: "https://images.unsplash.com/photo-1761095596585-8540d4901e27?q=80&w=1400&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "Холодовий цех",
    desc: "Фасування та пакування в цеху з постійним температурним режимом −2…−4°C. Жодного розморожування на шляху до вас.",
    image: "https://images.unsplash.com/photo-1742968922546-9685538d1e06?q=80&w=1400&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "Термоконтейнери",
    desc: "Доставка у фірмових термосумках з акумуляторами холоду. Холодовий ланцюг не переривається жодної хвилини в дорозі.",
    image: "https://images.unsplash.com/photo-1728335026927-8ee0382ada94?q=80&w=1400&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "Ваш стіл",
    desc: "Свіжа преміальна ікра — день у день. Від промислу до вашого столу за лічені години, без посередників.",
    image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?q=80&w=1400&auto=format&fit=crop",
  },
];

function JourneyPanel({
  step,
  index,
  total,
  scrollYProgress,
}: {
  step: Step;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const fade = Math.min(0.08, 1 / total / 3);

  const opacity = useTransform(
    scrollYProgress,
    [segStart, segStart + fade, segEnd - fade, segEnd],
    [0, 1, 1, 0]
  );
  const yText = useTransform(scrollYProgress, [segStart, segEnd], [50, -50]);
  const yImage = useTransform(scrollYProgress, [segStart, segEnd], [-36, 36]);
  const scaleImage = useTransform(scrollYProgress, [segStart, segEnd], [1.08, 1.16]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div style={{ y: yText }}>
          <span className="font-serif text-7xl font-bold text-gold/20 sm:text-8xl">{step.num}</span>
          <h3 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">{step.title}</h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">{step.desc}</p>
        </motion.div>
        <motion.div
          style={{ y: yImage }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        >
          <motion.img
            src={step.image}
            alt={step.title}
            style={{ scale: scaleImage }}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function JourneyDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const width = useTransform(
    scrollYProgress,
    [segStart, (segStart + segEnd) / 2, segEnd],
    [6, 28, 6]
  );
  const opacity = useTransform(
    scrollYProgress,
    [segStart, (segStart + segEnd) / 2, segEnd],
    [0.35, 1, 0.35]
  );
  return <motion.div style={{ width, opacity }} className="h-1.5 rounded-full bg-gold" />;
}

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative bg-navy" style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {STEPS.map((step, i) => (
          <JourneyPanel key={step.title} step={step} index={i} total={STEPS.length} scrollYProgress={scrollYProgress} />
        ))}

        <div className="absolute inset-x-0 bottom-10 z-10 flex items-center justify-center gap-2">
          {STEPS.map((step, i) => (
            <JourneyDot key={step.title} index={i} total={STEPS.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <p className="absolute top-8 left-1/2 z-10 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest text-gold">
          Шлях ікри
        </p>
      </div>
    </section>
  );
}
