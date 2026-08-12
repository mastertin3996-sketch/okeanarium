export type CategoryId = "black" | "red" | "sets";

export interface Category {
  id: CategoryId | "all";
  label: string;
}

export interface PackOption {
  weight: number; // in grams
  label: string; // "100 г"
  price: number; // price in UAH for this pack
}

export type ProductBadge = "bestseller" | "premium" | "fresh" | "new";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  species: string; // e.g. "Осётр", "Кета"
  short: string;
  description: string;
  texture: string;
  grainSize: string;
  image: string;
  gallery?: string[];
  badges: ProductBadge[];
  packs: PackOption[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  productId: string;
  packWeight: number;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  role?: string;
  rating: number;
  date: string;
  text: string;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type DeliveryMethod = "courier" | "pickup";
export type PaymentMethod = "card-courier" | "cash" | "online";

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  payment: PaymentMethod;
  comment?: string;
}

export interface QuickOrderFormData {
  name: string;
  phone: string;
}
