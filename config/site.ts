import { COMPANY } from "@/constants/company";
import type { SiteConfig } from "@/types/site";

/**
 * Public site identity and environment-facing settings.
 */
export const siteConfig = {
  name: COMPANY.name,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sprairsystems.com",
  description:
    "SPR Air Systems delivers industrial air systems, compressed air solutions, and process equipment for modern manufacturing.",
  company: COMPANY,
} as const satisfies SiteConfig;
