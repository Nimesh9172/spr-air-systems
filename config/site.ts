import { COMPANY } from "@/constants/company";
import type { SiteConfig } from "@/types/site";

/**
 * Public site identity and environment-facing settings.
 */
export const siteConfig = {
  name: COMPANY.name,
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.spr-airsystems.in",
  description:
    "SPR Air Systems in Vasai East, Palghar supplies industrial air compressors, refrigerated and desiccant dryers, compressed air filters, PPR piping, and genuine compressor and dryer spares.",
  company: COMPANY,
} as const satisfies SiteConfig;
