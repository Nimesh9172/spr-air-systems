import type { Metadata } from "next";

import {
  ContactHero,
  ContactMap,
  ContactSection,
} from "@/components/marketing/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SPR Air Systems for sales enquiries, support, and project quotes.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactSection />
      <ContactMap />
    </main>
  );
}
