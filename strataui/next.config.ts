import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "briffnfmhjyngtjcbemp.supabase.co",
      },
    ],
  },
};

export default nextConfig;
