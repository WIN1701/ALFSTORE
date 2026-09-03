import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ALFSTORE_1",
  assetPrefix: "/ALFSTORE_1/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;