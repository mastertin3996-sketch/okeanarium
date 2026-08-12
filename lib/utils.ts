import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number) {
  // Format the number only (locale-consistent grouping) and append a fixed
  // currency symbol ourselves — Intl's currency-display resolution for UAH
  // differs between Node's and some browsers' bundled ICU/CLDR data
  // ("₴" vs "грн"), which causes SSR/CSR hydration mismatches.
  const formatted = new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 0,
  }).format(value);
  return `${formatted} ₴`;
}
