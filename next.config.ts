import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
