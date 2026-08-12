import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CartSheet } from "@/components/cart/cart-sheet";
import { QuickOrderDialog } from "@/components/checkout/quick-order-dialog";
import { CallbackDialog } from "@/components/checkout/callback-dialog";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Океанариум — Премиальная икра с доставкой день в день",
  description:
    "Икра осетра, кеты, горбуши и нерки прямых поставок. Контроль свежести, сертификация ГОСТ, доставка в термоконтейнерах по Москве и области.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartSheet />
        <QuickOrderDialog />
        <CallbackDialog />
        <Toaster />
      </body>
    </html>
  );
}
