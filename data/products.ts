import type { Category, Product } from "@/types";

export const categories: Category[] = [
  { id: "all", label: "Вся икра" },
  { id: "black", label: "Чёрная икра (Осетр)" },
  { id: "red", label: "Красная икра" },
  { id: "sets", label: "Подарочные наборы" },
];

function packs(base: number, overrides?: Partial<Record<100 | 250 | 500 | 1000, number>>) {
  const table = {
    100: Math.round(base),
    250: Math.round(base * 2.3),
    500: Math.round(base * 4.3),
    1000: Math.round(base * 8),
    ...overrides,
  };
  return [
    { weight: 100, label: "100 г", price: table[100] },
    { weight: 250, label: "250 г", price: table[250] },
    { weight: 500, label: "500 г", price: table[500] },
    { weight: 1000, label: "1 кг", price: table[1000] },
  ];
}

export const products: Product[] = [
  {
    id: "beluga-royal",
    slug: "ikra-beluga-royal",
    name: "Икра белуги «Royal»",
    category: "black",
    species: "Белуга",
    short: "Крупная икринка, ореховое послевкусие, редкий улов",
    description:
      "Самая редкая и дорогая икра в мире. Крупная икринка серо-стального оттенка с деликатным сливочно-ореховым вкусом. Вылов и переработка производятся по строгим квотам, каждая партия сопровождается сертификатом CITES.",
    texture: "Плотная, икринка не слипается, лопается мягко",
    grainSize: "3.2–3.6 мм",
    image:
      "https://images.unsplash.com/photo-1784983421537-4561b9ffd65f?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1784983421537-4561b9ffd65f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1757961048219-df1bbd0be167?q=80&w=1200&auto=format&fit=crop",
    ],
    badges: ["premium"],
    packs: packs(12900, { 1000: 108000 }),
    rating: 5,
    reviewsCount: 18,
  },
  {
    id: "osetr-classic",
    slug: "ikra-osetra-classic",
    name: "Икра осетра классическая",
    category: "black",
    species: "Осётр",
    short: "Янтарно-коричневая икра с насыщенным вкусом моря",
    description:
      "Классика чёрной икры от компании «Океанариум»: икринка среднего размера, янтарно-коричневого цвета с плотной оболочкой. Выраженный маслянистый вкус с лёгкой ореховой ноткой. Один из самых популярных деликатесов у постоянных клиентов.",
    texture: "Упругая икринка, ощутимый «хруст» при раскусывании",
    grainSize: "2.8–3.0 мм",
    image:
      "https://images.unsplash.com/photo-1757961048219-df1bbd0be167?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1757961048219-df1bbd0be167?q=80&w=1200&auto=format&fit=crop",
    ],
    badges: ["bestseller", "premium"],
    packs: packs(6900, { 1000: 52000 }),
    rating: 4.9,
    reviewsCount: 54,
  },
  {
    id: "sevruga-select",
    slug: "ikra-sevruga-select",
    name: "Икра севрюги «Select»",
    category: "black",
    species: "Севрюга",
    short: "Мелкая икринка, насыщенный вкус, тёмный оттенок",
    description:
      "Севрюжья икра отличается более мелкой икринкой и насыщенным, слегка пикантным вкусом с йодистой ноткой. Идеальна для истинных ценителей выраженного морского вкуса и классической подачи на льду.",
    texture: "Мелкозернистая, нежная оболочка",
    grainSize: "2.2–2.5 мм",
    image:
      "https://images.unsplash.com/photo-1761095596585-8540d4901e27?q=80&w=1200&auto=format&fit=crop",
    badges: ["fresh"],
    packs: packs(5900, { 1000: 44000 }),
    rating: 4.8,
    reviewsCount: 27,
  },
  {
    id: "keta-classic",
    slug: "ikra-keta-classic",
    name: "Икра кеты классическая",
    category: "red",
    species: "Кета",
    short: "Крупная янтарная икра с мягким сливочным вкусом",
    description:
      "Икра кеты — крупная, ярко-янтарного цвета, с плотной, но нежной оболочкой. Мягкий сливочный вкус без излишней солёности. Один из самых сбалансированных вариантов красной икры для повседневного и праздничного стола.",
    texture: "Крупная икринка, плотная оболочка, минимум «лопанца»",
    grainSize: "5.0–6.5 мм",
    image:
      "https://images.unsplash.com/photo-1742968922546-9685538d1e06?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1742968922546-9685538d1e06?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761095596580-c96bd32f84a2?q=80&w=1200&auto=format&fit=crop",
    ],
    badges: ["bestseller"],
    packs: packs(1450, { 1000: 9800 }),
    rating: 4.9,
    reviewsCount: 132,
  },
  {
    id: "gorbusha-fresh",
    slug: "ikra-gorbusha-fresh",
    name: "Икра горбуши свежий улов",
    category: "red",
    species: "Горбуша",
    short: "Классический вкус, доступная цена, свежий посол",
    description:
      "Икра горбуши — самая узнаваемая и востребованная красная икра. Ярко-оранжевые икринки среднего размера с классическим сбалансированным вкусом. Лёгкий посол подчёркивает естественный вкус, не забивая его солью.",
    texture: "Среднезернистая, умеренно плотная",
    grainSize: "4.0–5.0 мм",
    image:
      "https://images.unsplash.com/photo-1761095596580-c96bd32f84a2?q=80&w=1200&auto=format&fit=crop",
    badges: ["fresh", "bestseller"],
    packs: packs(890, { 1000: 6200 }),
    rating: 4.7,
    reviewsCount: 211,
  },
  {
    id: "nerka-premium",
    slug: "ikra-nerka-premium",
    name: "Икра нерки premium",
    category: "red",
    species: "Нерка",
    short: "Тёмно-рубиновая икра с ярким насыщенным вкусом",
    description:
      "Икра нерки выделяется глубоким рубиново-красным цветом и самым насыщенным вкусом среди лососёвых видов. Икринка чуть мельче, чем у горбуши, но плотнее и ароматнее. Выбор тех, кто ищет по-настоящему яркий вкус.",
    texture: "Мелкозернистая, плотная, выраженный «хруст»",
    grainSize: "3.5–4.2 мм",
    image:
      "https://images.unsplash.com/photo-1728335026927-8ee0382ada94?q=80&w=1200&auto=format&fit=crop",
    badges: ["premium"],
    packs: packs(1690, { 1000: 12400 }),
    rating: 4.8,
    reviewsCount: 76,
  },
  {
    id: "chavycha-royal",
    slug: "ikra-chavycha-royal",
    name: "Икра чавычи «Императорская»",
    category: "red",
    species: "Чавыча",
    short: "Самая редкая красная икра, крупная и маслянистая",
    description:
      "Чавыча — король лососёвых, а её икра считается самой редкой среди красной икры. Крупная, насыщенно-оранжевая, с выраженной маслянистостью и мягким, почти сливочным вкусом без горчинки.",
    texture: "Крупная, мягкая оболочка, тающая консистенция",
    grainSize: "6.0–7.0 мм",
    image:
      "https://images.unsplash.com/photo-1746728789444-b7a4eb7caec7?q=80&w=1200&auto=format&fit=crop",
    badges: ["premium", "new"],
    packs: packs(2450, { 1000: 18500 }),
    rating: 5,
    reviewsCount: 12,
  },
  {
    id: "set-novogodniy",
    slug: "set-novogodniy",
    name: "Набор «Новогодний стол»",
    category: "sets",
    species: "Ассорти",
    short: "Осётр, кета и горбуша в подарочном коробе",
    description:
      "Праздничный набор для новогоднего стола: чёрная икра осетра 100 г, икра кеты 250 г и икра горбуши 250 г в фирменном подарочном коробе с охлаждающим вкладышем. Дополнен блинчиками и рецептом подачи.",
    texture: "Ассорти трёх текстур и вкусов",
    grainSize: "Смешанный набор",
    image:
      "https://images.unsplash.com/photo-1577906096429-f73c2c312435?q=80&w=1200&auto=format&fit=crop",
    badges: ["bestseller", "premium"],
    packs: [
      { weight: 600, label: "Набор 600 г", price: 14900 },
    ],
    rating: 5,
    reviewsCount: 41,
  },
  {
    id: "set-business",
    slug: "set-business-partner",
    name: "Набор «Бизнес-партнёру»",
    category: "sets",
    species: "Ассорти",
    short: "Икра осетра и нерки в деревянном ларце с гравировкой",
    description:
      "Статусный подарочный набор в деревянном ларце ручной работы: икра осетра 100 г и икра нерки 250 г. Доступна персональная гравировка логотипа или инициалов на крышке. Идеально для деловых подарков.",
    texture: "Ассорти двух текстур",
    grainSize: "Смешанный набор",
    image:
      "https://images.unsplash.com/photo-1755765673008-b2c5b77ba25a?q=80&w=1200&auto=format&fit=crop",
    badges: ["premium"],
    packs: [
      { weight: 350, label: "Набор 350 г", price: 16900 },
    ],
    rating: 4.9,
    reviewsCount: 23,
  },
  {
    id: "set-family",
    slug: "set-family-dinner",
    name: "Набор «Семейный ужин»",
    category: "sets",
    species: "Ассорти",
    short: "Горбуша, кета и блинная станция для всей семьи",
    description:
      "Уютный набор для семейного ужина: икра горбуши 250 г, икра кеты 250 г, набор для блинов и сливочное масло. Всё, что нужно для вкусного вечера дома, в одной коробке.",
    texture: "Ассорти лососёвых видов",
    grainSize: "Смешанный набор",
    image:
      "https://images.unsplash.com/photo-1770802806478-61aa255ae0eb?q=80&w=1200&auto=format&fit=crop",
    badges: ["fresh"],
    packs: [
      { weight: 500, label: "Набор 500 г", price: 5900 },
    ],
    rating: 4.8,
    reviewsCount: 37,
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}
