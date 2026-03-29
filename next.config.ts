import type { NextConfig } from 'next'

const cspHeader = `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; media-src 'self' blob: https://*.public.blob.vercel-storage.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;`.replace(/\n/g, '')

const config: NextConfig = {
  env: {
    SITE_GATE_ENABLED: process.env.SITE_GATE_ENABLED ?? '',
    SITE_TOKENS: process.env.SITE_TOKENS ?? '',
    EKTHESIS_TOKENS: process.env.EKTHESIS_TOKENS ?? '',
    BRIEF_TOKENS: process.env.BRIEF_TOKENS ?? '',
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspHeader },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ]
  },
}

export default config
