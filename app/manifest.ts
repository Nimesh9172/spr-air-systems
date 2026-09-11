import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/** Static so crawlers and installs never hit a cold-start failure. */
export const dynamic = "force-static";

/**
 * Web app manifest — install metadata and the icon set Android/Chrome prefer.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "SPR",
    description: siteConfig.description,
    lang: "en-IN",
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    // The rounded icons have transparent corners, so they are not valid
    // full-bleed `maskable` sources; the square apple-touch-icon covers that.
    icons: [
      { src: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { src: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      {
        src: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
        purpose: "maskable",
      },
    ],
  };
}
