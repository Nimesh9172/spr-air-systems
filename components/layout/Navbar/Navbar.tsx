"use client";

import Image from "next/image";
import Link from "next/link";

import { RequestQuoteDialog } from "@/components/forms/RequestQuote";
import { MobileNav } from "@/components/layout/Navbar/MobileNav";
import { NavLinks } from "@/components/layout/Navbar/NavLinks";
import { NavbarBottomLine } from "@/components/layout/Navbar/NavbarBottomLine";
import { WhatsAppIcon } from "@/components/layout/Navbar/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import { navCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/constants/social";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";

/**
 * Sticky marketing header — solid white bar with sliding bottom line on scroll.
 */
export function Navbar() {
  const { scrolled } = useScroll({ threshold: 12 });

  return (
    <header
      data-slot="navbar"
      className={cn(
        "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-shadow duration-300",
        scrolled &&
          "shadow-[0_8px_24px_oklch(0.26_0.09_260_/_8%)]",
      )}
    >
      <div className="relative mx-auto flex h-[4.25rem] w-full max-w-[var(--token-container-xl)] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="relative z-10 shrink-0"
        >
          <Image
            src="/logos/logo-dark1.png"
            alt={siteConfig.name}
            width={1850}
            height={973}
            priority
            className="h-11 w-auto object-contain scale-[2]"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <NavLinks />
        </nav>

        <div className="relative z-10 flex items-center gap-2.5">
          {navCta ? (
            <RequestQuoteDialog
              trigger={
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "hidden h-9 cursor-pointer rounded-md px-4 text-sm font-medium lg:inline-flex",
                  )}
                >
                  {navCta.label}
                </button>
              }
            />
          ) : null}

          {whatsappLink ? (
            <a
              href={whatsappLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "hidden h-9 rounded-md border-primary/15 bg-white px-3.5 text-sm font-medium text-primary hover:bg-secondary lg:inline-flex",
              )}
            >
              <WhatsAppIcon className="size-4 text-[#25D366]" />
              {whatsappLink.label ?? "WhatsApp"}
            </a>
          ) : null}

          <MobileNav />
        </div>
      </div>

      <NavbarBottomLine visible={scrolled} />
    </header>
  );
}
