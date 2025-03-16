import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ev-database.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
