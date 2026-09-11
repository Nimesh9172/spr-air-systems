import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo";
import { siteJsonLdGraph } from "@/lib/seo";

/**
 * Marketing route-group layout — shared chrome only (no page content).
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={siteJsonLdGraph()} />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
