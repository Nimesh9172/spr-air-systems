import type { Metadata } from "next";

import { AboutCTA } from "@/components/marketing/About";
import {
  SolutionsCategories,
  SolutionsFilters,
  SolutionsHero,
  SolutionsLines,
  SolutionsPiping,
  SolutionsService,
  SolutionsWhy,
} from "@/components/marketing/Solutions";
import { JsonLd } from "@/components/seo";
import { breadcrumbJsonLd, pageSeo, webPageJsonLd } from "@/lib/seo";

const TITLE = "Compressed Air System Solutions in Maharashtra";
const DESCRIPTION =
  "Specify a complete compressed air system with SPR-SC screw compressors (5–500 HP), refrigerated and desiccant dryers, SPR-XF filters, PPR piping, and after-sales support from Vasai.";

export const metadata: Metadata = pageSeo({
  title: TITLE,
  description: DESCRIPTION,
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <main>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/solutions",
            name: TITLE,
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ]),
        ]}
      />
      <SolutionsHero />
      <SolutionsCategories />
      <SolutionsPiping />
      <SolutionsLines />
      <SolutionsFilters />
      <SolutionsService />
      <SolutionsWhy />
      <AboutCTA />
    </main>
  );
}
