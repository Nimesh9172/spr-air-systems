import type { MetadataRoute } from "next";

import { absoluteUrl, MARKETING_ROUTES } from "@/lib/seo";

/** Build the XML at deploy time so crawlers never hit a cold-start 500. */
export const dynamic = "force-static";

/**
 * Programmatic sitemap for search engine indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return MARKETING_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
