import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";
import { HOME_TITLE, SEO_IMAGE } from "@/lib/seo";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/**
 * Shared SEO and viewport defaults for the root layout.
 * Page-level metadata should merge or override these values.
 */
export const defaultSeo: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: HOME_TITLE,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/favicon-512x512.png", type: "image/png" }],
  },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: HOME_TITLE,
    description: siteConfig.description,
    images: [SEO_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: siteConfig.description,
    images: [SEO_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

/**
 * Viewport configuration (Next.js Metadata API — separate from `metadata`).
 */
export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};
