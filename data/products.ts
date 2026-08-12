import type { Category, Product } from "@/types";

export const categories: Category[] = [
  { id: "all", label: "Вся ікра" },
  { id: "black", label: "Чорна ікра (Осетер)" },
  { id: "red", label: "Червона ікра" },
  { id: "sets", label: "Подарункові набори" },
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
    name: "Ікра білуги «Royal»",
    category: "black",
    species: "Білуга",
    short: "Велика ікринка, горіховий післясмак, рідкісний вилов",
    description:
      "Найрідкісніша та найдорожча ікра у світі. Велика ікринка сіро-сталевого відтінку з делікатним вершково-горіховим смаком. Вилов і переробка здійснюються за суворими квотами, кожна партія супроводжується сертифікатом CITES.",
    texture: "Щільна, ікринка не злипається, лопається м'яко",
    grainSize: "3.2–3.6 мм",
    image:
      "https://images.unsplash.com/photo-1784983421537-4561b9ffd65f?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1784983421537-4561b9ffd65f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1757961048219-df1bbd0be167?q=80&w=1200&auto=format&fit=crop",
    ],
    badges: ["premium"],
    packs: packs(11000, { 1000: 92000 }),
    rating: 5,
    reviewsCount: 18,
  },
  {
    id: "osetr-classic",
    slug: "ikra-osetra-classic",
    name: "Ікра осетра класична",
    category: "black",
    species: "Осетер",
    short: "Бурштиново-коричнева ікра з насиченим смаком моря",
    description:
      "Класика чорної ікри від компанії «Океанаріум»: ікринка середнього розміру, бурштиново-коричневого кольору зі щільною оболонкою. Виражений маслянистий смак з легкою горіховою ноткою. Один із найпопулярніших делікатесів у наших постійних клієнтів.",
    texture: "Пружна ікринка, відчутний «хрускіт» при розкушуванні",
    grainSize: "2.8–3.0 мм",
    image:
      "https://images.unsplash.com/photo-1757961048219-df1bbd0be167?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1757961048219-df1bbd0be167?q=80&w=1200&auto=format&fit=crop",
    ],
    badges: ["bestseller", "premium"],
    packs: packs(6200, { 1000: 47000 }),
    rating: 4.9,
    reviewsCount: 54,
  },
  {
    id: "sevruga-select",
    slug: "ikra-sevruga-select",
    name: "Ікра севрюги «Select»",
    category: "black",
    species: "Севрюга",
    short: "Дрібна ікринка, насичений смак, темний відтінок",
    description:
      "Севрюжа ікра відрізняється дрібнішою ікринкою та насиченим, злегка пікантним смаком з йодистою ноткою. Ідеальна для справжніх поціновувачів вираженого морського смаку та класичної подачі на льоду.",
    texture: "Дрібнозерниста, ніжна оболонка",
    grainSize: "2.2–2.5 мм",
    image:
      "https://images.unsplash.com/photo-1761095596585-8540d4901e27?q=80&w=1200&auto=format&fit=crop",
    badges: ["fresh"],
    packs: packs(5300, { 1000: 40000 }),
    rating: 4.8,
    reviewsCount: 27,
  },
  {
    id: "keta-classic",
    slug: "ikra-keta-classic",
    name: "Ікра кети класична",
    category: "red",
    species: "Кета",
    short: "Велика бурштинова ікра з м'яким вершковим смаком",
    description:
      "Ікра кети — велика, яскраво-бурштинового кольору, зі щільною, але ніжною оболонкою. М'який вершковий смак без зайвої солоності. Один із найзбалансованіших варіантів червоної ікри для повсякденного та святкового столу.",
    texture: "Велика ікринка, щільна оболонка, мінімум «лопанця»",
    grainSize: "5.0–6.5 мм",
    image:
      "https://images.unsplash.com/photo-1742968922546-9685538d1e06?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1742968922546-9685538d1e06?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761095596580-c96bd32f84a2?q=80&w=1200&auto=format&fit=crop",
    ],
    badges: ["bestseller"],
    packs: packs(480, { 1000: 3300 }),
    rating: 4.9,
    reviewsCount: 132,
  },
  {
    id: "gorbusha-fresh",
    slug: "ikra-gorbusha-fresh",
    name: "Ікра горбуші свіжого вилову",
    category: "red",
    species: "Горбуша",
    short: "Класичний смак, доступна ціна, свіжий посол",
    description:
      "Ікра горбуші — найпізнаваніша та найзатребуваніша червона ікра. Яскраво-оранжеві ікринки середнього розміру з класичним збалансованим смаком. Легкий посол підкреслює природний смак, не забиваючи його сіллю.",
    texture: "Середньозерниста, помірно щільна",
    grainSize: "4.0–5.0 мм",
    image:
      "https://images.unsplash.com/photo-1761095596580-c96bd32f84a2?q=80&w=1200&auto=format&fit=crop",
    badges: ["fresh", "bestseller"],
    packs: packs(320, { 1000: 2200 }),
    rating: 4.7,
    reviewsCount: 211,
  },
  {
    id: "nerka-premium",
    slug: "ikra-nerka-premium",
    name: "Ікра нерки преміум",
    category: "red",
    species: "Нерка",
    short: "Темно-рубінова ікра з яскравим насиченим смаком",
    description:
      "Ікра нерки вирізняється глибоким рубіново-червоним кольором і найнасиченішим смаком серед лососевих видів. Ікринка трохи дрібніша, ніж у горбуші, але щільніша й ароматніша. Вибір тих, хто шукає по-справжньому яскравий смак.",
    texture: "Дрібнозерниста, щільна, виражений «хрускіт»",
    grainSize: "3.5–4.2 мм",
    image:
      "https://images.unsplash.com/photo-1728335026927-8ee0382ada94?q=80&w=1200&auto=format&fit=crop",
    badges: ["premium"],
    packs: packs(560, { 1000: 4100 }),
    rating: 4.8,
    reviewsCount: 76,
  },
  {
    id: "chavycha-royal",
    slug: "ikra-chavycha-royal",
    name: "Ікра чавичі «Імператорська»",
    category: "red",
    species: "Чавича",
    short: "Найрідкісніша червона ікра, велика й масляниста",
    description:
      "Чавича — король лососевих, а її ікра вважається найрідкіснішою серед червоної ікри. Велика, насичено-оранжева, з вираженою маслянистістю і м'яким, майже вершковим смаком без гіркоти.",
    texture: "Велика, м'яка оболонка, консистенція, що тане",
    grainSize: "6.0–7.0 мм",
    image:
      "https://images.unsplash.com/photo-1746728789444-b7a4eb7caec7?q=80&w=1200&auto=format&fit=crop",
    badges: ["premium", "new"],
    packs: packs(820, { 1000: 6100 }),
    rating: 5,
    reviewsCount: 12,
  },
  {
    id: "set-novogodniy",
    slug: "set-novogodniy",
    name: "Набір «Новорічний стіл»",
    category: "sets",
    species: "Асорті",
    short: "Осетер, кета та горбуша у подарунковому коробі",
    description:
      "Святковий набір для новорічного столу: чорна ікра осетра 100 г, ікра кети 250 г та ікра горбуші 250 г у фірмовому подарунковому коробі з охолоджувальним вкладишем. Доповнений млинцями та рецептом подачі.",
    texture: "Асорті трьох текстур і смаків",
    grainSize: "Змішаний набір",
    image:
      "https://images.unsplash.com/photo-1577906096429-f73c2c312435?q=80&w=1200&auto=format&fit=crop",
    badges: ["bestseller", "premium"],
    packs: [
      { weight: 600, label: "Набір 600 г", price: 5900 },
    ],
    rating: 5,
    reviewsCount: 41,
  },
  {
    id: "set-business",
    slug: "set-business-partner",
    name: "Набір «Бізнес-партнеру»",
    category: "sets",
    species: "Асорті",
    short: "Ікра осетра та нерки у дерев'яній скриньці з гравіюванням",
    description:
      "Статусний подарунковий набір у дерев'яній скриньці ручної роботи: ікра осетра 100 г та ікра нерки 250 г. Доступне персональне гравіювання логотипа чи ініціалів на кришці. Ідеально для ділових подарунків.",
    texture: "Асорті двох текстур",
    grainSize: "Змішаний набір",
    image:
      "https://images.unsplash.com/photo-1755765673008-b2c5b77ba25a?q=80&w=1200&auto=format&fit=crop",
    badges: ["premium"],
    packs: [
      { weight: 350, label: "Набір 350 г", price: 6900 },
    ],
    rating: 4.9,
    reviewsCount: 23,
  },
  {
    id: "set-family",
    slug: "set-family-dinner",
    name: "Набір «Сімейна вечеря»",
    category: "sets",
    species: "Асорті",
    short: "Горбуша, кета та млинцева станція для всієї родини",
    description:
      "Затишний набір для сімейної вечері: ікра горбуші 250 г, ікра кети 250 г, набір для млинців та вершкове масло. Усе, що потрібно для смачного вечора вдома, в одній коробці.",
    texture: "Асорті лососевих видів",
    grainSize: "Змішаний набір",
    image:
      "https://images.unsplash.com/photo-1770802806478-61aa255ae0eb?q=80&w=1200&auto=format&fit=crop",
    badges: ["fresh"],
    packs: [
      { weight: 500, label: "Набір 500 г", price: 2200 },
    ],
    rating: 4.8,
    reviewsCount: 37,
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}
