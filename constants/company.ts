import type { CompanyInfo } from "@/types/site";

/**
 * Canonical company identity and placeholder contact details.
 */
export const COMPANY = {
  name: "SPR Air Systems",
  legalName: "SPR Air Systems",
  email: "info@sprair.com",
  phone: "+91 98765 43210",
  address: {
    street: "Industrial Hub, Block 42",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110001",
    country: "India",
  },
} as const satisfies CompanyInfo;
