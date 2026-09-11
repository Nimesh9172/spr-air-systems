import type { Metadata } from "next";

import { ProductCatalog, ProductsHero } from "@/components/marketing/Products";
import { JsonLd } from "@/components/seo";
import { breadcrumbJsonLd, pageSeo, webPageJsonLd } from "@/lib/seo";

const TITLE = "Industrial Air Compressors, Dryers & Filters";
const DESCRIPTION =
  "Browse SPR Air Systems industrial equipment: reciprocating and screw compressors, refrigerated and desiccant dryers, four-grade compressed air filters, PPR piping, and genuine spares.";

export const metadata: Metadata = pageSeo({
  title: TITLE,
  description: DESCRIPTION,
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main>
      <JsonLd
        data={[
          webPageJsonLd({
            type: "CollectionPage",
            path: "/products",
            name: TITLE,
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
        ]}
      />
      <ProductsHero />
      <ProductCatalog />
    </main>
  );
}
