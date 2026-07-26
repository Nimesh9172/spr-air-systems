import type { Metadata } from "next";

import { ProductCatalog, ProductsHero } from "@/components/marketing/Products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore SPR Air Systems product portfolio — compressors, dryers, and industrial air equipment.",
};

export default function ProductsPage() {
  return (
    <main>
      <ProductsHero />
      <ProductCatalog />
    </main>
  );
}
