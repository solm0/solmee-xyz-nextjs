import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      new URL('https://images.unsplash.com/**')
    ],
  },
};

export default nextConfig;
