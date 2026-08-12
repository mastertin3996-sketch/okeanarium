"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Camera, MapPin, Phone, Mail, Send, Share2, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FOOTER_LINKS = [
  { href: "#catalog", label: "Каталог" },
  { href: "#quality", label: "О качестве" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "Доставка и оплата" },
  { href: "#contacts", label: "Контакты" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Вы подписались на спецпредложения");
    setEmail("");
  };

  return (
    <footer id="contacts" className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/40">
                <Waves className="size-5" />
              </span>
              <span className="font-serif text-xl font-bold text-white">Океанариум</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Премиальная икра прямых поставок с 2009 года. ООО «Океанариум»,
              ИНН 7712345678, ОГРН 1097712345678.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-gold hover:text-navy"
              >
                <Camera className="size-4" />
              </a>
              <a
                href="#"
                aria-label="VKontakte"
                className="flex size-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-gold hover:text-navy"
              >
                <Share2 className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="flex size-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-gold hover:text-navy"
              >
                <Send className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white/80">
              Навигация
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-sm text-white/55 transition-colors hover:text-gold"
                >
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white/80">
              Контакты
            </h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/55">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href="tel:+74951234567" className="hover:text-gold">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href="mailto:info@okeanarium.ru" className="hover:text-gold">
                  info@okeanarium.ru
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  Москва, Кутузовский проспект, 45 · Зона доставки: Москва и МО до 50 км от МКАД
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white/80">
              Спецпредложения
            </h4>
            <p className="mt-4 text-sm text-white/55">
              Подпишитесь и узнавайте первыми о новых поступлениях и скидках.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="h-11 flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
              />
              <Button type="submit" size="icon" className="shrink-0">
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40 sm:text-left">
          © {new Date().getFullYear()} Океанариум. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
