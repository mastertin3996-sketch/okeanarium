"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Camera, MapPin, Phone, Mail, Send, Share2, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FOOTER_LINKS = [
  { href: "#catalog", label: "Каталог" },
  { href: "#quality", label: "Про якість" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#faq", label: "Доставка та оплата" },
  { href: "#contacts", label: "Контакти" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Ви підписалися на спецпропозиції");
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
              <span className="font-serif text-xl font-bold text-white">Океанаріум</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Преміальна ікра прямих постачань з 2009 року. ТОВ «Океанаріум»,
              код ЄДРПОУ 40123456.
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
              Навігація
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
                  Політика конфіденційності
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white/80">
              Контакти
            </h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/55">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href="tel:+380441234567" className="hover:text-gold">
                  +380 (44) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href="mailto:info@okeanarium.ua" className="hover:text-gold">
                  info@okeanarium.ua
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  Київ, вул. Печерський узвіз, 12 · Зона доставки: Київ і область до 50 км від міста
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white/80">
              Спецпропозиції
            </h4>
            <p className="mt-4 text-sm text-white/55">
              Підпишіться і дізнавайтеся першими про нові надходження та знижки.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш e-mail"
                className="h-11 flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
              />
              <Button type="submit" size="icon" className="shrink-0">
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40 sm:text-left">
          © {new Date().getFullYear()} Океанаріум. Усі права захищені.
        </div>
      </div>
    </footer>
  );
}
