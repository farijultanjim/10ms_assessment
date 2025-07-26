/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure next-intl config is recognized
  experimental: {
    serverExternalPackages: ["next-intl"],
  },
};

module.exports = nextConfig;
