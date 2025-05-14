/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['ielmooer5oi2a4tr.public.blob.vercel-storage.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  // Disable all experimental features
  experimental: {},
  // Completely disable the App Router
  useFileSystemPublicRoutes: true,
  // Force the use of the Pages Router for 404s
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite any 404 to the custom 404 page
        {
          source: '/:path*',
          destination: '/404',
          has: [
            {
              type: 'header',
              key: 'x-matched-path',
              value: '(.*)',
            },
          ],
          missing: [
            {
              type: 'header',
              key: 'x-middleware-rewrite',
              value: '(.*)',
            },
          ],
        },
      ],
    }
  },
  // Add headers for additional security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/:path*.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
