import type { NextConfig } from "next";

// Import next-pwa using require (since it's CJS)
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // you can add more Next.js options here if needed
};

export default withPWA(nextConfig);
