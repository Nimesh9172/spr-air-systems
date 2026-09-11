import type { Metadata } from "next";

import { GetInTouch } from "@/components/marketing/CTA";
import { Hero, HeroStats } from "@/components/marketing/Hero";
import { Precision } from "@/components/marketing/Precision";
import { Process } from "@/components/marketing/Process";
import { ProductCategories } from "@/components/marketing/Products";
import { ValuePillars } from "@/components/marketing/ValuePillars";
import { JsonLd } from "@/components/seo";
import { siteConfig } from "@/config/site";
import { HOME_TITLE, pageSeo, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: HOME_TITLE,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: HOME_TITLE,
          description: siteConfig.description,
        })}
      />
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
