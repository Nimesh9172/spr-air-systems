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
    ];
  },
};

export default nextConfig;
