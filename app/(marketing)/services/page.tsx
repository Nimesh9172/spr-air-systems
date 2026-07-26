import type { Metadata } from "next";

import { SamplePage } from "@/components/layout/SamplePage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Installation, maintenance, air audits, and technical support from SPR Air Systems.",
};

export default function ServicesPage() {
  return (
    <SamplePage
      title="Services"
      description="From installation and AMC to 24/7 support and air audits — our service offering will be detailed on this page."
    />
  );
}
