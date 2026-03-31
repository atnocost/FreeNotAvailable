import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cinema — FREE',
  description: 'Other World in motu. Short films and trailers from FREE.',
  openGraph: {
    title: 'Cinema — FREE',
    description: 'Other World in motu.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'FREE — Cinema' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cinema — FREE',
    description: 'Other World in motu.',
    images: ['/opengraph-image.png'],
  },
}

export default function FilmsLayout({ children }: { children: React.ReactNode }) {
  return children
}
