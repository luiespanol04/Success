/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'capital-city.s3.amazonaws.com',
        pathname: '/resources/**',
      },
    ],
  },
};

module.exports = nextConfig;
