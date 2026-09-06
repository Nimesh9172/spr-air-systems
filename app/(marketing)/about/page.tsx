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

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SPR Air Systems — engineering excellence in compressed air technology.",
};

export default function AboutPage() {
  return (
    <main>
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
