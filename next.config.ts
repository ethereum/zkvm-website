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
  // Improve dev server stability
  onDemandEntries: {
    // Keep pages in memory longer to reduce recompilation
    maxInactiveAge: 60 * 1000,
    // More pages kept in memory
    pagesBufferLength: 5,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use consistent chunk IDs to avoid missing module errors
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
        chunkIds: 'named',
      };
    }
    return config;
  },
};

export default nextConfig;
