import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  typedRoutes: false,
  async redirects() {
    return [
      {
        source: '/zkvm-tracker',
        destination: '/track',
        permanent: false, // Use 307 temporary redirect during transition
      },
    ];
  },
};

export default nextConfig;
