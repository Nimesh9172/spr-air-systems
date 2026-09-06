import type { Metadata } from "next";

import { ProductCatalog, ProductsHero } from "@/components/marketing/Products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "SPR Air Systems product range — reciprocating and screw compressors, refrigerated and desiccant dryers, compressed air filters, PPR piping, and genuine spares.",
};

export default function ProductsPage() {
  return (
    <main>
      <ProductsHero />
      <ProductCatalog />
    </main>
  );
}
