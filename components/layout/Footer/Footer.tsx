import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { Container } from "@/components/core/Container";
import { FloatingWhatsApp } from "@/components/layout/Footer/FloatingWhatsApp";
import { NewsletterForm } from "@/components/layout/Footer/NewsletterForm";
import { SocialIcon } from "@/components/layout/Footer/SocialIcon";
import { siteConfig } from "@/config/site";
import { COMPANY } from "@/constants/company";
import { footerSocialLinks } from "@/constants/social";

const ACCENT = "oklch(0.55 0.16 255)";

const QUICK_LINKS_LEFT = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
] as const;

const QUICK_LINKS_RIGHT = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Request Quote", href: "/contact" },
] as const;

/**
 * Site footer — brand blurb, quick links, newsletter, copyright bar.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer
        data-slot="footer"
        className="relative bg-[#0c1524] text-white"
      >
        <Container className="pt-14 pb-10 md:pt-16 md:pb-12">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_0.95fr] lg:gap-10 xl:gap-16">
            {/* Brand */}
            <div className="max-w-sm">
              <Link
                href="/"
                aria-label={`${siteConfig.name} home`}
                className="inline-block"
              >
                <Image
                  src="/logos/logo-light.png"
                  alt={siteConfig.name}
                  width={1850}
                  height={973}
                  className="h-12 w-auto object-contain object-left sm:h-14 zoom-[2]"
                />
              </Link>

              <p className="mt-5 text-sm leading-relaxed text-white/65">
                Engineering air. Empowering industry. Advanced compressed air
                solutions designed for energy efficiency, reliability and
                performance.
              </p>

              <ul className="mt-6 flex items-center gap-3">
                {footerSocialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label ?? link.platform}
                      className="flex size-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.16_255)]"
                    >
                      <SocialIcon platform={link.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h2 className="text-base font-bold tracking-tight text-white">
                Quick Links
              </h2>
              <div
                className="mt-3 h-px w-10"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:gap-x-10">
                <ul className="flex flex-col gap-3">
                  {QUICK_LINKS_LEFT.map((item) => (
                    <li key={item.label}>
                      <QuickLink href={item.href} label={item.label} />
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-3">
                  {QUICK_LINKS_RIGHT.map((item) => (
                    <li key={item.label}>
                      <QuickLink href={item.href} label={item.label} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2 lg:col-span-1">
              <h2 className="text-base font-bold tracking-tight text-white">
                Newsletter
              </h2>
              <div
                className="mt-3 h-px w-10"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />
              <p className="mt-5 text-sm leading-relaxed text-white/65">
                Join our newsletter for latest updates.
              </p>
              <NewsletterForm className="mt-5" />
            </div>
          </div>
        </Container>

        <div className="border-t border-white/10">
          <Container className="py-5">
            <p className="text-center text-sm text-white/55">
              © {year}{" "}
              <span className="font-medium text-[oklch(0.62_0.14_255)]">
                {COMPANY.name}
              </span>
              . All Rights Reserved.
            </p>
          </Container>
        </div>
      </footer>

      <FloatingWhatsApp />
    </>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
    >
      <ChevronRightIcon
        className="size-3.5 shrink-0 text-[oklch(0.58_0.16_255)] transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden
        strokeWidth={2.5}
      />
      {label}
    </Link>
  );
}
