import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
  },
  redirects: async () => [
    { source: '/seo', destination: '/services/seo', permanent: true },
    { source: '/web-design', destination: '/services/web-design', permanent: true },
    { source: '/ai-agency', destination: '/services/ai-automation', permanent: true },
    { source: '/case-studies', destination: '/work', permanent: true },
    { source: '/booking', destination: '/contact', permanent: true },
    { source: '/features', destination: '/', permanent: true },
  ],
};

export default nextConfig;
