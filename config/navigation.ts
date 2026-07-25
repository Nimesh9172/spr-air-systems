import type { NavigationConfig } from "@/types/navigation";

/**
 * Ordered primary navigation consumed by future site layouts.
 */
export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Request Quote", href: "/contact", kind: "cta" },
] as const satisfies NavigationConfig;
