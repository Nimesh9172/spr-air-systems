import type { Metadata } from "next";

import {
  ContactHero,
  ContactMap,
  ContactSection,
} from "@/components/marketing/Contact";
import { JsonLd } from "@/components/seo";
import { breadcrumbJsonLd, pageSeo, webPageJsonLd } from "@/lib/seo";

const TITLE = "Contact Us in Vasai East, Palghar";
const DESCRIPTION =
  "Contact SPR Air Systems in Vasai East, Palghar for compressor quotes, dryer and filter enquiries, PPR piping, and genuine spares. Call +91 90491 25142 or email info@spr-airsystems.in.";

export const metadata: Metadata = pageSeo({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        data={[
          webPageJsonLd({
            type: "ContactPage",
            path: "/contact",
            name: TITLE,
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <ContactHero />
      <ContactSection />
      <ContactMap />
    </main>
  );
}
