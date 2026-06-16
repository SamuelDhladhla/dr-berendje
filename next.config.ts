import type { NextConfig } from "next";

// basePath is only needed for GitHub Pages (production).
// In local dev the public/ folder is served at root, so no prefix needed.
const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/dr-berendje' : '',
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
};

export default nextConfig;
