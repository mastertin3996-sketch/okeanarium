"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { reviews, galleryImages } from "@/data/reviews";
import { cn } from "@/lib/utils";

export function Reviews() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % reviews.length);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const review = reviews[index];

  return (
    <section id="reviews" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
            Відгуки
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
            Нам довіряють
          </h2>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <Quote className="mx-auto size-10 text-gold/40" />
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="mt-4 text-center"
            >
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i < review.rating ? "fill-gold text-gold" : "text-border"
                    )}
                  />
                ))}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-navy sm:text-xl text-balance">
                «{review.text}»
              </p>
              <p className="mt-6 font-serif text-base font-semibold text-navy">
                {review.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {review.role ? `${review.role} · ` : ""}
                {review.date}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              aria-label="Попередній відгук"
              className="flex size-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold-dark"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Відгук ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-gold" : "w-1.5 bg-navy/15"
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Наступний відгук"
              className="flex size-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold-dark"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {galleryImages.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={cn(
                "overflow-hidden rounded-xl",
                i === 0 && "col-span-2 row-span-2"
              )}
            >
              <img
                src={src}
                alt="Ікра Океанаріум"
                loading="lazy"
                className="size-full aspect-square object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
