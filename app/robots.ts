import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt generation for crawler access control.
 * Adjust rules when private or staging routes are introduced.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
