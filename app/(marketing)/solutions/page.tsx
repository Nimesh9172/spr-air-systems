import type { Metadata } from "next";

import { AboutCTA } from "@/components/marketing/About";
import {
  SolutionsCategories,
  SolutionsFilters,
  SolutionsHero,
  SolutionsLines,
  SolutionsService,
  SolutionsWhy,
} from "@/components/marketing/Solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Complete compressed air solutions from SPR Air Systems — SPR-SC screw compressors, dryers, filters, PPR piping, and genuine service support.",
};

export default function SolutionsPage() {
  return (
    <main>
      <SolutionsHero />
      <SolutionsCategories />
      <SolutionsLines />
      <SolutionsFilters />
      <SolutionsService />
      <SolutionsWhy />
      <AboutCTA />
    </main>
  );
}
