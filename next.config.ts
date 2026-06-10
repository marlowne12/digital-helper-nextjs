import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Modern image formats for better compression
    formats: ["image/avif", "image/webp"],
    // Optimize images on-demand
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Enable React strict mode for better development warnings
  reactStrictMode: true,

  // Experimental features for performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-slot",
      "@radix-ui/react-toast",
    ],
  },

  // Compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Trailing slash consistency
  trailingSlash: false,

  // Powered by header (disable for security)
  poweredByHeader: false,

  // 301 redirects for duplicate routes
  // Canonical URLs match sitemap: /web-design, /seo, /ai-agency
  async redirects() {
    return [
      {
        source: '/work/case-studies',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/services/web-design',
        destination: '/web-design',
        permanent: true,
      },
      {
        source: '/services/seo',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/services/ai-automation',
        destination: '/ai-agency',
        permanent: true,
      },
      // Thin /locations/{city} pages 301 to the richer keyword-targeted *-wa pages.
      // West Richland has no *-wa twin, so /locations/west-richland stays canonical.
      {
        source: '/locations/richland',
        destination: '/richland-wa',
        permanent: true,
      },
      {
        source: '/locations/kennewick',
        destination: '/kennewick-wa',
        permanent: true,
      },
      {
        source: '/locations/pasco',
        destination: '/pasco-wa',
        permanent: true,
      },
    ];
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
