"use client";

import { useState } from "react";
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
    title: "Контроль свежести",
    description:
      "Каждая партия проходит органолептический контроль и хранится строго при −2…−4°C с момента поступления на склад.",
  },
  {
    icon: Award,
    title: "Сертифицированная продукция",
    description:
      "Вся икра сопровождается ветеринарными свидетельствами и декларациями соответствия ГОСТ. Нажмите, чтобы посмотреть образец.",
    hasCertificate: true,
  },
  {
    icon: Truck,
    title: "Термоконтейнеры с хладагентом",
    description:
      "Доставка курьером в фирменных термосумках с аккумуляторами холода — икра не нагревается выше +4°C в пути.",
  },
  {
    icon: UtensilsCrossed,
    title: "Дегустация перед покупкой",
    description:
      "В шоу-руме на Кутузовском проспекте можно продегустировать любую позицию каталога перед оформлением заказа.",
  },
  {
    icon: FlaskConical,
    title: "Лабораторный контроль",
    description:
      "Регулярные проверки на соответствие микробиологическим и органолептическим показателям в аккредитованной лаборатории.",
  },
  {
    icon: Snowflake,
    title: "Холодный цех",
    description:
      "Фасовка и упаковка происходят в цехе с постоянным температурным режимом, что исключает разморозку и потерю качества.",
  },
];

export function Advantages() {
  const [certOpen, setCertOpen] = useState(false);

  return (
    <section id="quality" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
            О качестве
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
            Почему «Океанариум»
          </h2>
          <p className="mt-4 text-muted-foreground">
            Мы выстроили полный контроль качества на каждом этапе — от вылова
            до вашего стола.
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
                  Смотреть сертификат
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={certOpen} onOpenChange={setCertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Сертификат соответствия ГОСТ</DialogTitle>
            <DialogDescription>
              Декларация о соответствии продукции требованиям технического
              регламента Таможенного союза «О безопасности рыбы и рыбной
              продукции» (ТР ТС 021/2011, ТР ЕАЭС 040/2016).
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src="https://images.unsplash.com/photo-1641477176034-1a3e10c343a8?q=80&w=1000&auto=format&fit=crop"
              alt="Пример сертификата качества"
              className="w-full object-cover"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Полный пакет документов на конкретную партию предоставляется по
            запросу вместе с заказом.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
