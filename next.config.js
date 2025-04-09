// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true, // Required for static export
  },
  webpack: (config, { isServer }) => {
    // Enable aggressive code splitting to reduce bundle size
    config.optimization.splitChunks = {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 20000,
      maxSize: 24000000, // Just under Cloudflare's 25MB limit
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Add null check for module.context
            if (!module.context) return "vendor";

            const match = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            );
            // Add null check for match
            if (!match) return "vendor";

            const packageName = match[1];
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    };
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
