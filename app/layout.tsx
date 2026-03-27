import type { Metadata } from 'next'
import { displayFont, bodyFont, monoFont, pixelFont } from './fonts'
import Nav from '@/components/layout/Nav'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://atnocost.cc'),
  title: {
    template: '%s | FREE',
    default: 'FREE — Other World Mythos',
  },
  description: 'Welcome to the Other World. FREE is a Detroit R&B artist whose sound thrives in the grey area where deflection meets self-reflection.',
  keywords: ['FREE', 'R&B', 'Detroit', 'FINExME', 'SINE NOCTIS', 'Other World Mythos'],
  authors: [{ name: 'FREE' }],
  openGraph: {
    title: 'FREE — Other World Mythos',
    description: 'Welcome to the Other World.',
    url: 'https://atnocost.vercel.app',
    siteName: 'FREE',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 1804, alt: 'FREE — Other World Mythos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FREE — Other World Mythos',
    description: 'Welcome to the Other World.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} ${pixelFont.variable} dark`}
    >
      <head>
        <link rel="preload" as="image" href="/textures/grain-200x200.png" />
      </head>
      <body className="bg-canvas text-body antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-canvas focus:text-heading focus:border focus:border-white/20">
          Skip to main content
        </a>
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
