import type { NavigationConfig } from "@/types/navigation";

/**
 * Primary navigation matching the marketing site UI.
 * CTA items (`kind: "cta"`) render as header actions, not center links.
 */
export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Request Quote", href: "/contact", kind: "cta" },
] as const satisfies NavigationConfig;

export const navLinks = mainNavigation.filter((item) => item.kind !== "cta");

export const navCta = mainNavigation.find((item) => item.kind === "cta");
