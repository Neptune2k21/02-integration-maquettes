import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.starbucks.fr',
      },
    ],
  },
};

export default nextConfig;
