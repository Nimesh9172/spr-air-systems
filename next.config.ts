import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/solutions",
        permanent: true,
      },
      {
        source: "/products/pre-filter",
        destination: "/products/compressed-air-filters",
        permanent: true,
      },
      {
        source: "/products/after-filter",
        destination: "/products/compressed-air-filters",
        permanent: true,
      },
      {
        source: "/products/carbon-filter",
        destination: "/products/compressed-air-filters",
        permanent: true,
      },
      {
        source: "/products/micro-filter",
        destination: "/products/compressed-air-filters",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
