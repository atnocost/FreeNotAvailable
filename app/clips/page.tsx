'use client'

import Image from 'next/image'
import { type ReactNode } from 'react'

type Clip = {
  id: string
  title: string
  description: ReactNode
  format: string
  duration: string
  platforms: readonly string[]
  era: 'finexme' | 'sinenoctis' | 'neutral'
  thumbnail: string
  video: string
  aspectClass: string
}

const CLIPS: readonly Clip[] = [
  {
    id: 'WelcomeHero',
    title: 'Welcome to the Other World',
    description: <>Crossfade cuts from all six films. Text fades in over silence. Thirty seconds to set the <em className="text-[#d4a574]">entire mythology</em> in motion.</>,
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'neutral',
    thumbnail: '/images/hero-cover.avif',
    video: 'https://ttymkvave4pkwaku.public.blob.vercel-storage.com/clips/WelcomeHero.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'FinexmeHighlight',
    title: 'FINExME Highlight',
    description: <>The red wash, the BMW, the night drives. <a href="/#finexme" className="text-[#c0392b] italic hover:underline focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none rounded-sm">Act I</a> distilled into its sharpest thirty seconds.</>,
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'finexme',
    thumbnail: '/images/red-portrait.avif',
    video: 'https://ttymkvave4pkwaku.public.blob.vercel-storage.com/clips/FinexmeHighlight.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'SineNoctisTeaser',
    title: 'SINE NOCTIS Teaser',
    description: <>The three-part descent: <a href="/films#ante" className="text-[#d0d0d0] italic hover:underline focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:outline-none rounded-sm">ANTE</a>, <a href="/films#vespera" className="text-[#d0d0d0] italic hover:underline focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:outline-none rounded-sm">VESPERA</a>, <a href="/films#noctem" className="text-[#d0d0d0] italic hover:underline focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:outline-none rounded-sm">NOCTEM</a>. Grayscale cuts from the <em className="text-[#d0d0d0]">SINE NOCTIS</em> trilogy, recut for short-form.</>,
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'sinenoctis',
    thumbnail: '/images/crouching-smoke.avif',
    video: 'https://ttymkvave4pkwaku.public.blob.vercel-storage.com/clips/SineNoctisTeaser.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'ArtistIntro',
    title: 'Artist Introduction',
    description: <>Portrait footage over bio text. Detroit. The <em className="text-[#d4a574]">cold croon</em> of the early 2010s. Where deflection meets self-reflection.</>,
    format: '9:16 Vertical',
    duration: '45s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'neutral',
    thumbnail: '/images/jacket-portrait.avif',
    video: 'https://ttymkvave4pkwaku.public.blob.vercel-storage.com/clips/ArtistIntro.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'Manifesto',
    title: 'The Manifesto',
    description: <>Full screen. One statement. Blurred background, minimal type. &ldquo;<em className="text-[#d4a574]">Men rarely make music that yearns anymore.</em>&rdquo;</>,
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'neutral',
    thumbnail: '/images/bokeh-night.avif',
    video: 'https://ttymkvave4pkwaku.public.blob.vercel-storage.com/clips/Manifesto.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'FilmReel',
    title: 'Film Reel',
    description: <>Hard cuts, slow zoom, no text. Sixty seconds across all <a href="/films" className="text-[#d4a574] italic hover:underline focus-visible:ring-1 focus-visible:ring-warm/50 focus-visible:outline-none rounded-sm">six source films</a>. Let the work speak.</>,
    format: '16:9 Landscape',
    duration: '60s',
    platforms: ['YouTube', 'Website'],
    era: 'neutral',
    thumbnail: '/images/fine-by-me-still.avif',
    video: 'https://ttymkvave4pkwaku.public.blob.vercel-storage.com/clips/FilmReel.mp4',
    aspectClass: 'aspect-video',
  },
]

function ClipCard({ clip }: { clip: Clip }) {
  const borderColor = clip.era === 'finexme'
    ? 'border-[#c0392b]/30 hover:border-[#c0392b]/60'
    : clip.era === 'sinenoctis'
      ? 'border-white/10 hover:border-white/30'
      : 'border-[#d4a574]/20 hover:border-[#d4a574]/50'

  const accentColor = clip.era === 'finexme'
    ? 'text-[#c0392b]'
    : clip.era === 'sinenoctis'
      ? 'text-[#d0d0d0]'
      : 'text-[#d4a574]'

  return (
    <div className={`border ${borderColor} pointer-events-none cursor-default`}>
      {/* Thumbnail only — no video player */}
      <div className={`relative ${clip.aspectClass} overflow-hidden bg-black`}>
        <Image
          src={clip.thumbnail}
          alt={clip.title}
          fill
          className={`object-cover ${
            clip.era === 'sinenoctis' ? 'grayscale' : ''
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Info */}
      <div className="p-5 md:p-6">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-sans text-lg text-heading">{clip.title}</h3>
          <span className={`text-[10px] font-sans tracking-[0.2em] uppercase ${accentColor} shrink-0 ml-3`}>
            {clip.duration}
          </span>
        </div>
        <p className="font-sans text-sm text-muted leading-relaxed mb-4">{clip.description}</p>

        {/* Platforms */}
        <div className="flex flex-wrap gap-2">
          {clip.platforms.map((platform) => (
            <span
              key={platform}
              className="text-[10px] font-sans tracking-[0.15em] uppercase text-white/30 border border-white/10 px-2 py-1"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ClipsPage() {
  return (
    <div className="bg-canvas min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end pb-12 md:pb-16">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cover.avif"
            alt=""
            fill
            className="object-cover object-center opacity-10"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/80 to-canvas/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 w-full">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#d4a574] block mb-4">
            Short-Form Content
          </span>
          <h1 className="font-pixel text-4xl md:text-5xl lg:text-6xl text-heading mb-4">
            Clips
          </h1>
          <p className="font-sans text-sm text-muted max-w-lg">
            Six compositions for TikTok, Instagram, and YouTube.
            Each clip draws from the Other World film catalog.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-10">
        <p className="text-center text-sm font-sans tracking-[0.12em] italic opacity-35">
          Short visual works — coming with SINE NOCTIS.
        </p>
      </section>

      {/* Film Reel - Full Width Feature (disabled) */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-12 opacity-40 pointer-events-none cursor-default">
        <div className="border border-[#d4a574]/20">
          <div className="relative aspect-video overflow-hidden bg-black">
            <Image
              src="/images/fine-by-me-still.avif"
              alt="Film Reel"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="p-5 md:p-6">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-sans text-lg text-heading">Film Reel</h3>
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#d4a574]">16:9 / 60s</span>
            </div>
            <p className="font-sans text-sm text-muted">Hard cuts, slow zoom, no text. Sixty seconds across all six source films. Let the work speak.</p>
          </div>
        </div>
      </section>

      {/* Vertical Clips Grid (disabled) */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24 opacity-40">
        <h2 className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 mb-8">Vertical Clips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIPS.filter(c => c.id !== 'FilmReel').map((clip) => (
            <ClipCard key={clip.id} clip={clip} />
          ))}
        </div>
      </section>

    </div>
  )
}
