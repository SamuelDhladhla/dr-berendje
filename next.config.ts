import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/dr-berendje',
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
};

export default nextConfig;
