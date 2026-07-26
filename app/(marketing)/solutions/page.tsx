import type { Metadata } from "next";

import { SamplePage } from "@/components/layout/SamplePage";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Industry solutions from SPR Air Systems for manufacturing, process, and high-demand environments.",
};

export default function SolutionsPage() {
  return (
    <SamplePage
      title="Solutions"
      description="Discover how SPR Air Systems supports industries with tailored compressed air solutions. Case studies and applications will live here."
    />
  );
}
