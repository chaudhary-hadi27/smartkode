import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@smartauth/auth", "@smartauth/database"],
};

export default nextConfig;
