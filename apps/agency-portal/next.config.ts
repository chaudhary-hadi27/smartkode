import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@smartkode/ui"],
  serverExternalPackages: ["@prisma/client", "@smartkode/database"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
