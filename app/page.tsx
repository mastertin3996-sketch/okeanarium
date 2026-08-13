import { Hero } from "@/components/sections/hero";
import { Catalog } from "@/components/sections/catalog";
import { Advantages } from "@/components/sections/advantages";
import { Journey } from "@/components/sections/journey";
import { OccasionPicker } from "@/components/sections/occasion-picker";
import { Reviews } from "@/components/sections/reviews";
import { Faq } from "@/components/sections/faq";
import { WaveDivider } from "@/components/effects/wave-divider";

export default function Home() {
  return (
    <>
      <Hero />
      {/* navy (Hero) -> cream (Catalog) */}
      <WaveDivider color="var(--cream)" />
      <Catalog />
      <Advantages />
      {/* white (Advantages) -> navy (Journey) */}
      <WaveDivider color="var(--navy)" flip />
      <Journey />
      <OccasionPicker />
      {/* navy (OccasionPicker) -> cream (Reviews) */}
      <WaveDivider color="var(--cream)" />
      <Reviews />
      <Faq />
    </>
  );
}
