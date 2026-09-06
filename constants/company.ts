import type { CompanyInfo } from "@/types/site";

const EMAILS = [
  "info@spr-airsystems.in",
  "sprairsystems@gmail.com",
] as const;

/**
 * Canonical company identity and placeholder contact details.
 */
export const COMPANY = {
  name: "SPR Air Systems",
  legalName: "SPR Air Systems",
  email: EMAILS[0],
  emails: EMAILS,
  phone: "+91 90491 25142",
  address: {
    street: "Shop No.7, Chauhan Chawl, Vijay Nagar Road",
    city: "Vasai East, Palghar",
    region: "Maharashtra",
    postalCode: "401209",
    country: "India",
    lines: [
      "Shop No.7, Chauhan Chawl",
      "Vijay Nagar Road, Vasai East Palghar, Maharashtra - 401209",
    ],
    coordinates: {
      lat: 19.423777625162142,
      lng: 72.85055875759778,
    },
  },
} as const satisfies CompanyInfo;

export const COMPANY_ADDRESS_TEXT = COMPANY.address.lines.join(", ");

/**
 * Public-facing scale claims used across the site.
 * Keep these in one place so journey, stats, and trust copy stay aligned.
 */
export const COMPANY_STATS = {
  foundedYear: 2011,
  yearsExperience: 15,
  systemsInstalled: 300,
  happyClients: 250,
} as const;
