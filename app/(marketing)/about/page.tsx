import type { Metadata } from "next";

import {
  AboutCTA,
  AboutCredentials,
  AboutHero,
  AboutIndustries,
  // AboutJourney,
  AboutMission,
  AboutStats,
  AboutStory,
  AboutWhyChoose,
} from "@/components/marketing/About";
import { JsonLd } from "@/components/seo";
import { breadcrumbJsonLd, pageSeo, webPageJsonLd } from "@/lib/seo";

const TITLE = "Compressed Air Experts in Vasai East, Palghar";
const DESCRIPTION =
  "SPR Air Systems has supplied industrial compressed air equipment from Vasai East, Palghar since 2011 — compressors, dryers, filters, piping, and genuine service support across Maharashtra.";

export const metadata: Metadata = pageSeo({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={[
          webPageJsonLd({
            type: "AboutPage",
            path: "/about",
            name: TITLE,
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
        ]}
      />
      <AboutHero />
      <AboutStory />
      {/* <AboutJourney /> */}
      <AboutMission />
      <AboutStats />
      <AboutIndustries />
      <AboutWhyChoose />
      <AboutCredentials />
      <AboutCTA />
    </main>
  );
}
