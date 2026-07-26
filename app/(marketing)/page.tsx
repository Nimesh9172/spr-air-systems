import { GetInTouch } from "@/components/marketing/CTA";
import { Hero, HeroStats } from "@/components/marketing/Hero";
import { Precision } from "@/components/marketing/Precision";
import { Process } from "@/components/marketing/Process";
import { ProductCategories } from "@/components/marketing/Products";
import { ValuePillars } from "@/components/marketing/ValuePillars";

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroStats />
      <Precision />
      <ValuePillars />
      <ProductCategories />
      <Process />
      <GetInTouch />
    </main>
  );
}
