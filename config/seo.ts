import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/**
 * Shared SEO defaults for marketing pages.
 * Page-level metadata should merge/override these values.
 */
export const defaultSeo: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};
