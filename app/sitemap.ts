import type { MetadataRoute } from "next";

import { catalogProducts } from "@/data/products";
import { absoluteUrl, MARKETING_ROUTES } from "@/lib/seo";

/** Build the XML at deploy time so crawlers never hit a cold-start 500. */
export const dynamic = "force-static";

/**
 * Programmatic sitemap for search engine indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const marketing = MARKETING_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const products = catalogProducts.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...marketing, ...products];
}
