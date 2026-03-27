import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EPK — FREE',
  description: 'Electronic Press Kit for FREE, 2026. Press, booking, and editorial inquiries.',
}

const STREAMING = [
  { label: 'Spotify', href: 'https://open.spotify.com/artist/13Z1MsZ0A9Ddox3DZcu9zk' },
  { label: 'Apple Music', href: 'https://music.apple.com/us/artist/free/1724039693' },
  { label: 'TIDAL', href: 'https://tidal.com/artist/45010274' },
]

const PRESS_PHOTOS = [
  { src: '/images/epk-act1-1.jpg', alt: 'FREE — Act I', era: 'Act I' },
  { src: '/images/epk-interlude-1.jpg', alt: 'FREE — Interlude', era: 'Interlude' },
  { src: '/images/epk-act2-1.jpg', alt: 'FREE — Act II', era: 'Act II' },
  { src: '/images/epk-act1-2.jpg', alt: 'FREE — Act I', era: 'Act I' },
  { src: '/images/epk-interlude-2.jpg', alt: 'FREE — Interlude', era: 'Interlude' },
  { src: '/images/epk-act2-2.jpg', alt: 'FREE — Act II', era: 'Act II' },
]

export default function EPKPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="text-[9px] tracking-[0.3em] uppercase text-white/22 mb-6">
          Electronic Press Kit &middot; 2026
        </p>
        <div className="relative w-[min(45vw,200px)] mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/free-logotype.svg"
            alt="FREE"
            className="w-full h-auto [filter:brightness(0)_invert(1)]"
          />
        </div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">
          atnocost.cc
        </p>
      </section>

      <hr className="border-t border-white/6 mx-6 md:mx-10 max-w-4xl md:mx-auto" />

      {/* Current Release — SINE NOCTIS leads */}
      <section className="py-14 md:py-18 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="text-[8px] tracking-[0.22em] uppercase text-white/22 mb-8">
          Current Release
        </p>

        <div className="flex gap-5 md:gap-7">
          <div className="w-[110px] h-[110px] md:w-[140px] md:h-[140px] shrink-0 relative">
            <Image
              src="/images/sinenoctis-cover.avif"
              alt="SINE NOCTIS"
              fill
              className="object-cover"
              sizes="140px"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[8px] tracking-[0.16em] uppercase text-white/25 mb-1">
              Act II &middot; Spring 2026
            </p>
            <h3 className="font-big-caesar text-3xl md:text-4xl tracking-[0.04em] text-white/85 mb-2">
              SINENOCTIS
            </h3>
            <p className="text-[10px] text-white/30 mb-3">
              3 tracks &middot; The second project &middot; First installment of a series
            </p>
            <Link
              href="/sinenoctis"
              className="text-[9px] tracking-[0.14em] uppercase text-white/30 hover:text-white/55 transition-colors"
            >
              View &rarr;
            </Link>
          </div>
        </div>

        <p className="text-[13px] font-light leading-[1.75] text-white/38 max-w-[540px] mt-6">
          Short, concise, and deliberate. SINE NOCTIS is the score to its accompanying short film
          and only the beginning of what comes next.
        </p>
      </section>

      <hr className="border-t border-white/6 mx-6 md:mx-10 max-w-4xl md:mx-auto" />

      {/* Bio */}
      <section className="py-14 md:py-18 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="text-[8px] tracking-[0.22em] uppercase text-white/22 mb-5">
          Artist
        </p>
        <blockquote className="font-serif text-lg md:text-xl italic font-light text-white/60 leading-[1.6] mb-5 max-w-[540px]">
          &ldquo;In today&rsquo;s R&amp;B landscape, men rarely make music that yearns anymore.&rdquo;
        </blockquote>
        <div className="text-[13px] font-light leading-[1.75] text-white/40 max-w-[540px] space-y-4">
          <p>
            Yet in 2026, we&rsquo;re just as bruised, conflicted, and love-worn as our
            female counterparts. Heartbreak is universal&thinsp;&mdash;&thinsp;duality sits at the core of
            everyone navigating love and life.
          </p>
          <p>
            As a songwriter, FREE thrives in that grey area where deflection meets
            self-reflection. His sound doesn&rsquo;t chase the glossy nostalgia of
            old-school love ballads, but instead embraces the cold croon of the early
            2010s&thinsp;&mdash;&thinsp;a shadowy echo that still resonates.
          </p>
        </div>
      </section>

      <hr className="border-t border-white/6 mx-6 md:mx-10 max-w-4xl md:mx-auto" />

      {/* Catalog — FINExME */}
      <section className="py-14 md:py-18 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="text-[8px] tracking-[0.22em] uppercase text-white/22 mb-8">
          Catalog
        </p>

        <div className="flex gap-5">
          <div className="w-[100px] h-[100px] shrink-0 relative">
            <Image
              src="/images/finexme-cover.avif"
              alt="FINExME"
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[8px] tracking-[0.16em] uppercase text-white/25 mb-1">
              Act I &middot; January 11, 2024
            </p>
            <h3 className="font-big-caesar text-2xl tracking-[0.04em] text-white/85 mb-1">
              FINExME
            </h3>
            <p className="text-[10px] text-white/30 mb-2">
              7 tracks &middot; Streaming now
            </p>
            <Link
              href="/finexme"
              className="text-[9px] tracking-[0.14em] uppercase text-white/30 hover:text-white/55 transition-colors"
            >
              View &rarr;
            </Link>
          </div>
        </div>

        {/* Streaming row */}
        <div className="flex gap-5 mt-8 pt-6 border-t border-white/6">
          {STREAMING.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-[0.14em] uppercase text-white/28 hover:text-white/55 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>

      <hr className="border-t border-white/6 mx-6 md:mx-10 max-w-4xl md:mx-auto" />

      {/* Visual Works */}
      <section className="py-14 md:py-18 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="text-[8px] tracking-[0.22em] uppercase text-white/22 mb-5">
          Visual Works
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-3">
            <span className="font-big-caesar text-lg text-white/55">Fine By Me</span>
            <span className="text-[9px] text-white/22">Film &middot; 2024</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-big-caesar text-lg text-white/55">ANTE &middot; VESPERA &middot; NOCTEM</span>
            <span className="text-[9px] text-white/22">Teasers &middot; 2025</span>
          </div>
        </div>
        <Link
          href="/films"
          className="inline-block mt-5 text-[9px] tracking-[0.14em] uppercase text-white/30 hover:text-white/55 transition-colors"
        >
          Watch &rarr;
        </Link>
      </section>

      <hr className="border-t border-white/6 mx-6 md:mx-10 max-w-4xl md:mx-auto" />

      {/* Press Photos */}
      <section className="py-14 md:py-18 px-6 md:px-10 max-w-4xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-[8px] tracking-[0.22em] uppercase text-white/22">
            Press Photography
          </p>
          <p className="text-[8px] tracking-[0.14em] text-white/18">
            Cleared for editorial use
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {PRESS_PHOTOS.map((p) => (
            <div key={p.src} className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover brightness-[0.9]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-[7px] tracking-[0.16em] uppercase text-white/40">
                  {p.era}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/22 mt-5">
          Hi-res available on request &middot; freeisavailable@atnocost.cc
        </p>
      </section>

      <hr className="border-t border-white/6 mx-6 md:mx-10 max-w-4xl md:mx-auto" />

      {/* Press Coverage */}
      <section className="py-14 md:py-18 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="text-[8px] tracking-[0.22em] uppercase text-white/22 mb-5">
          Press
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-[13px] text-white/50">Norbu Magazine</span>
            <span className="text-[11px] text-white/22 ml-2">&middot; Feature</span>
          </div>
          <div>
            <span className="text-[13px] text-white/50">Tennessee Highlighter</span>
            <span className="text-[11px] text-white/22 ml-2">&middot; Coverage</span>
          </div>
        </div>
        <p className="text-[11px] text-white/25 mt-6 max-w-[440px] leading-[1.7]">
          Be the first to cover this project at scale. Editorial exclusives and early access available.
        </p>
      </section>

      <hr className="border-t border-white/6 mx-6 md:mx-10 max-w-4xl md:mx-auto" />

      {/* Contact */}
      <section className="py-14 md:py-18 px-6 md:px-10 max-w-4xl mx-auto">
        <p className="text-[8px] tracking-[0.22em] uppercase text-white/22 mb-8">
          Contact
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="space-y-5">
            <div>
              <p className="text-[8px] tracking-[0.14em] uppercase text-white/22 mb-1">Email</p>
              <a
                href="mailto:freeisavailable@atnocost.cc"
                className="text-[13px] text-white/50 hover:text-white/70 transition-colors"
              >
                freeisavailable@atnocost.cc
              </a>
            </div>
            <div>
              <p className="text-[8px] tracking-[0.14em] uppercase text-white/22 mb-1">Website</p>
              <Link href="/" className="text-[13px] text-white/50 hover:text-white/70 transition-colors">
                atnocost.cc
              </Link>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-[8px] tracking-[0.14em] uppercase text-white/22 mb-1">Instagram</p>
              <a
                href="https://instagram.com/freenotavailable"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/50 hover:text-white/70 transition-colors"
              >
                @freenotavailable
              </a>
            </div>
            <div>
              <p className="text-[8px] tracking-[0.14em] uppercase text-white/22 mb-1">Label</p>
              <p className="text-[13px] text-white/50">
                OWJV
              </p>
            </div>
          </div>
        </div>

        {/* Analytics disclaimer */}
        <div className="mt-8 pt-6 border-t border-white/6">
          <p className="text-[10px] text-white/22 leading-[1.7]">
            Streaming analytics and business data available upon request.{' '}
            <Link
              href="/ekthesis/gate"
              className="text-white/35 hover:text-white/55 transition-colors underline underline-offset-2"
            >
              Request access
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="pb-14 px-6 md:px-10 max-w-4xl mx-auto">
        <hr className="border-t border-white/6 mb-6" />
        <p className="text-[8px] tracking-[0.14em] uppercase text-white/15">
          OWJV 2026
        </p>
      </div>
    </main>
  )
}
