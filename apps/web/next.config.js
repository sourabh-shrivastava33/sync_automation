/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@sync-automations/ui",
    "@sync-automations/utils",
    "@sync-automations/types",
  ],
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
