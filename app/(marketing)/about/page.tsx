import type { Metadata } from "next";

import { SamplePage } from "@/components/layout/SamplePage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SPR Air Systems — engineering excellence in compressed air technology.",
};

export default function AboutPage() {
  return (
    <SamplePage
      title="About Us"
      description="Our company story, certifications, and engineering values will be presented on this page."
    />
  );
}
