"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";

import { RequestQuoteDialog } from "@/components/forms/RequestQuote";
import { NavLinks } from "@/components/layout/Navbar/NavLinks";
import { WhatsAppIcon } from "@/components/layout/Navbar/WhatsAppIcon";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/constants/social";
import { cn } from "@/lib/utils";

/**
 * Mobile hamburger + slide-out drawer matching the desktop header actions.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-primary lg:hidden"
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-xs gap-0 p-0">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-left font-semibold tracking-tight text-primary">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-1 flex-col px-3 py-4">
          <NavLinks
            className="flex-col items-stretch gap-1"
            linkClassName="block w-full px-3 py-3 text-base"
            showActiveLine={false}
            onNavigate={() => setOpen(false)}
          />
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
          {navCta ? (
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                setOpen(false);
                setQuoteOpen(true);
              }}
            >
              {navCta.label}
            </Button>
          ) : null}

          {whatsappLink ? (
            <a
              href={whatsappLink.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full border-primary/20 text-primary",
              )}
            >
              <WhatsAppIcon className="size-4 text-[#25D366]" />
              {whatsappLink.label ?? "WhatsApp"}
            </a>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>

    <RequestQuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </>
  );
}
