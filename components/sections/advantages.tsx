"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, FlaskConical, Snowflake, ThermometerSnowflake, Truck, UtensilsCrossed } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ADVANTAGES = [
  {
    icon: ThermometerSnowflake,
    title: "Контроль свіжості",
    description:
      "Кожна партія проходить органолептичний контроль і зберігається суворо при −2…−4°C з моменту надходження на склад.",
  },
  {
    icon: Award,
    title: "Сертифікована продукція",
    description:
      "Уся ікра супроводжується ветеринарними свідоцтвами та деклараціями відповідності ДСТУ. Натисніть, щоб переглянути зразок.",
    hasCertificate: true,
  },
  {
    icon: Truck,
    title: "Термоконтейнери з хладагентом",
    description:
      "Доставка кур'єром у фірмових термосумках з акумуляторами холоду — ікра не нагрівається вище +4°C у дорозі.",
  },
  {
    icon: UtensilsCrossed,
    title: "Дегустація перед покупкою",
    description:
      "У шоу-румі на Печерську можна продегустувати будь-яку позицію каталогу перед оформленням замовлення.",
  },
  {
    icon: FlaskConical,
    title: "Лабораторний контроль",
    description:
      "Регулярні перевірки на відповідність мікробіологічним і органолептичним показникам в акредитованій лабораторії.",
  },
  {
    icon: Snowflake,
    title: "Холодний цех",
    description:
      "Фасування та пакування відбуваються в цеху з постійним температурним режимом, що виключає розморожування та втрату якості.",
  },
];

export function Advantages() {
  const [certOpen, setCertOpen] = useState(false);

  return (
    <section id="quality" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
            Про якість
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
            Чому «Океанаріум»
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ми вибудували повний контроль якості на кожному етапі — від
            вилову до вашого столу.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((item, i) => (
            <motion.button
              key={item.title}
              type="button"
              onClick={() => item.hasCertificate && setCertOpen(true)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-2xl border border-border bg-cream p-6 text-left transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                <item.icon className="size-6" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {item.hasCertificate && (
                <span className="mt-3 inline-block text-xs font-semibold text-gold-dark underline underline-offset-4">
                  Переглянути сертифікат
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={certOpen} onOpenChange={setCertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Сертифікат відповідності ДСТУ</DialogTitle>
            <DialogDescription>
              Декларація про відповідність продукції вимогам ДСТУ 4261:2003
              «Ікра зерниста лососевих риб» та Закону України «Про
              безпечність та якість харчових продуктів».
            </DialogDescription>
          </DialogHeader>
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-border">
            <Image
              src="https://images.unsplash.com/photo-1641477176034-1a3e10c343a8?q=80&w=1000&auto=format&fit=crop"
              alt="Приклад сертифіката якості"
              fill
              sizes="(max-width: 640px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Повний пакет документів на конкретну партію надається за запитом
            разом із замовленням.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
