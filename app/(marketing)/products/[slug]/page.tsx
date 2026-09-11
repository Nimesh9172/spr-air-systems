import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/marketing/Products";
import { JsonLd } from "@/components/seo";
import { catalogProducts, getCatalogProductBySlug } from "@/data/products";
import {
  breadcrumbJsonLd,
  pageSeo,
  webPageJsonLd,
} from "@/lib/seo";
import { getProductBySlug } from "@/services/product.service";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalogProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getCatalogProductBySlug(slug);

  if (!product) {
    return pageSeo({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      path: `/products/${slug}`,
    });
  }

  return pageSeo({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <JsonLd
        data={[
          webPageJsonLd({
            type: "WebPage",
            path: `/products/${product.slug}`,
            name: product.name,
            description: product.description,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      <ProductDetail product={product} />
    </main>
  );
}
