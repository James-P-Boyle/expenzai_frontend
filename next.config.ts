import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Only run ESLint on these directories during production builds
    dirs: ['app'],
    // Don't fail build on ESLint errors
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Don't fail build on TypeScript errors (temporary)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;