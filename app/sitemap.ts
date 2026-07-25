import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Programmatic sitemap for search engine indexing.
 * Extend with marketing routes and dynamic entries from services as pages are added.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
