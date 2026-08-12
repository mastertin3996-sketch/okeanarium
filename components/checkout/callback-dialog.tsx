"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUIStore } from "@/lib/store/ui-store";

export function CallbackDialog() {
  const open = useUIStore((s) => s.callbackOpen);
  const setOpen = useUIStore((s) => s.setCallbackOpen);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="size-14 text-emerald" />
            <DialogTitle>Спасибо!</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Наш менеджер перезвонит вам в ближайшее время.
            </p>
            <Button className="mt-2" onClick={() => handleClose(false)}>
              Закрыть
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PhoneCall className="size-5 text-gold-dark" />
                Заказать звонок
              </DialogTitle>
              <DialogDescription>
                Оставьте номер телефона — мы перезвоним в течение 15 минут.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="callback-name">Имя</Label>
                <input
                  id="callback-name"
                  required
                  placeholder="Иван Иванов"
                  className="h-11 rounded-full border border-border bg-white px-4 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="callback-phone">Телефон</Label>
                <input
                  id="callback-phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="h-11 rounded-full border border-border bg-white px-4 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <Button type="submit" size="lg" className="mt-1">
                Жду звонка
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
