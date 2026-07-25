import type { CompanyInfo } from "@/types/site";

/**
 * Canonical company identity and placeholder contact details.
 */
export const COMPANY = {
  name: "SPR Air Systems",
  legalName: "SPR Air Systems",
  email: "contact@example.com",
  phone: "+00 00000 00000",
  address: {
    street: "123 Industrial Avenue",
    city: "Placeholder City",
    region: "Placeholder State",
    postalCode: "000000",
    country: "India",
  },
} as const satisfies CompanyInfo;
