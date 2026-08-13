import { Hero } from "@/components/sections/hero";
import { Catalog } from "@/components/sections/catalog";
import { Advantages } from "@/components/sections/advantages";
import { Journey } from "@/components/sections/journey";
import { OccasionPicker } from "@/components/sections/occasion-picker";
import { Reviews } from "@/components/sections/reviews";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Catalog />
      <Advantages />
      <Journey />
      <OccasionPicker />
      <Reviews />
      <Faq />
    </>
  );
}
