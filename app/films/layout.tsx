import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Films — FREE',
  description: 'The Other World in motion. Short films and trailers from FREE.',
  openGraph: {
    title: 'Films — FREE',
    description: 'The Other World in motion.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'FREE — Films' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Films — FREE',
    description: 'The Other World in motion.',
    images: ['/opengraph-image.png'],
  },
}

export default function FilmsLayout({ children }: { children: React.ReactNode }) {
  return children
}
