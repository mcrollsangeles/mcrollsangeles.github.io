import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mc-angeles",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
