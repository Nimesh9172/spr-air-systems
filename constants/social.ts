import type { SocialLink } from "@/types/site";

/**
 * External profiles and chat channels used by navbar / footer actions.
 */
export const SOCIAL_LINKS = [
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
  },
  {
    platform: "facebook",
    href: "https://www.facebook.com/",
    label: "Facebook",
  },
  {
    platform: "instagram",
    href: "https://www.instagram.com/",
    label: "Instagram",
  },
  {
    platform: "whatsapp",
    href: "https://wa.me/919876543210",
    label: "WhatsApp",
  },
] as const satisfies readonly SocialLink[];

export const whatsappLink = SOCIAL_LINKS.find(
  (link) => link.platform === "whatsapp",
);

/** Public social profiles shown in the footer (excludes WhatsApp chat). */
export const footerSocialLinks: readonly SocialLink[] = SOCIAL_LINKS.filter(
  (link) => link.platform !== "whatsapp",
);
