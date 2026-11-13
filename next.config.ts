import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nesx",
  cacheComponents: true,
  // partialPrefetching is left off on purpose: with it on, unknown /tjanster/* and
  // /malarguide/* addresses start streaming a shell and answer 200 instead of 404.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
