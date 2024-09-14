/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-10c4fb0995fc4a61bdb8cdf3dd5de86f.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pub-8dc1d3e5c3304446b3c8ff7ebf402881.r2.dev",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
