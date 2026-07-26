import type { Metadata } from "next";

import { SamplePage } from "@/components/layout/SamplePage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SPR Air Systems for sales enquiries, support, and project quotes.",
};

export default function ContactPage() {
  return (
    <SamplePage
      title="Contact"
      description="Reach our sales and support teams, or submit a project enquiry. The contact form and details will live here."
    />
  );
}
