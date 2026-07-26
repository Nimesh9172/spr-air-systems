import type { Metadata } from "next";

import { SamplePage } from "@/components/layout/SamplePage";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore SPR Air Systems product portfolio — compressors, dryers, and industrial air equipment.",
};

export default function ProductsPage() {
  return (
    <SamplePage
      title="Products"
      description="Browse our portfolio of compressed air systems and industrial equipment. Detailed product pages will live here."
    />
  );
}
