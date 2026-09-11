import type { Metadata, MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { COMPANY, COMPANY_STATS } from "@/constants/company";

/** Default social/share image (hero photography). */
export const SEO_IMAGE = {
  url: "/images/hero.png",
  width: 1536,
  height: 1024,
  alt: "SPR Air Systems industrial compressed air compressor and receiver",
} as const;

export const HOME_TITLE =
  "Air Compressors, Dryers & Filters in Vasai | SPR Air Systems";

export const MARKETING_ROUTES: readonly {
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/solutions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
];

/** Absolute URL for a site path. Home has no trailing slash. */
export function absoluteUrl(path = "/"): string {
  if (path === "/") return siteConfig.url;
  return `${siteConfig.url}${path}`;
}

export function pageSeo({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [SEO_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SEO_IMAGE.url],
    },
  };
}

function telephoneE164(): string {
  return COMPANY.phone.replace(/[^\d+]/g, "");
}

/**
 * Organization + local business graph for Google Search / Maps.
 * Social `sameAs` omitted until real profile URLs replace placeholders.
 */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    foundingDate: String(COMPANY_STATS.foundedYear),
    telephone: telephoneE164(),
    email: COMPANY.email,
    image: absoluteUrl(SEO_IMAGE.url),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logos/logo-light.png"),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      postalCode: COMPANY.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.address.coordinates.lat,
      longitude: COMPANY.address.coordinates.lng,
    },
    areaServed: [
      { "@type": "State", name: "Maharashtra" },
      { "@type": "Country", name: "India" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: telephoneE164(),
      contactType: "sales",
      email: COMPANY.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    hasMap: `https://www.google.com/maps?q=${COMPANY.address.coordinates.lat},${COMPANY.address.coordinates.lng}`,
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: COMPANY.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageJsonLd({
  type = "WebPage",
  path,
  name,
  description,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
  };
}

function withoutContext(data: Record<string, unknown>): Record<string, unknown> {
  const rest = { ...data };
  delete rest["@context"];
  return rest;
}

export function siteJsonLdGraph(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [withoutContext(organizationJsonLd()), withoutContext(websiteJsonLd())],
  };
}
