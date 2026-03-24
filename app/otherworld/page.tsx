import Image from 'next/image'
import Link from 'next/link'
import ScrollController from '@/components/ui/ScrollController'
import GrainOverlay from '@/components/ui/GrainOverlay'
import FadeInView from '@/components/ui/FadeInView'
import Footer from '@/components/layout/Footer'

const SECTIONS = [
  {
    label: 'Act I',
    title: 'FINExME',
    desc: 'Seven tracks. Warm reds. Romantic fatalism.',
    href: '/finexme',
    image: '/images/finexme-cover.avif',
    accent: '#c0392b',
  },
  {
    label: 'Act II',
    title: 'SINENOCTIS',
    desc: 'Three movements. Monochrome. One descent.',
    href: '/sinenoctis',
    image: '/images/sinenoctis-cover.avif',
    accent: '#d0d0d0',
    grayscale: true,
  },
]

const NAV_LINKS = [
  { label: 'Mythos', href: '/#mythos', desc: 'The mythology behind the Other World.' },
  { label: 'Timeline', href: '/timeline', desc: 'Every release in chronological order.' },
  { label: 'Films', href: '/films', desc: 'Visual works — ANTE, VESPERA, NOCTEM, Fine By Me.' },
  { label: 'Clips', href: '/clips', desc: 'Short visual works — coming with SINE NOCTIS.' },
]

export default function OtherworldPage() {
  return (
    <ScrollController>
      <GrainOverlay />
      <main className="pt-20">
        <section className="relative section-padding" aria-label="Other World">
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
            {/* Heading */}
            <div className="mb-16 md:mb-24">
              <span className="text-xs font-pixel tracking-[0.2em] uppercase text-[#c0392b] block mb-6">
                Other World Mythos
              </span>
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl italic text-[#f2ede8] leading-[0.95] mb-6">
                The Other World
              </h1>
              <p className="font-sans text-sm md:text-base leading-[1.8] text-white/45 max-w-[55ch]">
                Everything lives here.
              </p>
            </div>

            {/* Act cards — album covers */}
            <FadeInView className="mb-20 md:mb-28">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {SECTIONS.map((s) => (
                  <Link key={s.title} href={s.href} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-sm">
                      <Image
                        src={s.image}
                        alt={`${s.title} cover art`}
                        fill
                        className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${s.grayscale ? 'grayscale' : ''}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 vignette" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <span
                          className="text-[9px] font-pixel tracking-[0.2em] uppercase block mb-2"
                          style={{ color: s.accent }}
                        >
                          {s.label}
                        </span>
                        <h2 className="font-big-caesar text-3xl md:text-4xl text-white/90 tracking-wide mb-2">
                          {s.title}
                        </h2>
                        <p className="font-sans text-xs md:text-sm text-white/50">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeInView>

            {/* Navigation links */}
            <FadeInView>
              <div className="border-t border-white/7 pt-12">
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/22 block mb-8">
                  Explore
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group flex items-baseline gap-4 py-4 border-b border-white/5 hover:border-white/15 transition-colors"
                    >
                      <span className="font-sans text-lg italic text-white/70 group-hover:text-white/90 transition-colors">
                        {link.label}
                      </span>
                      <span className="font-sans text-xs text-white/30">
                        {link.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeInView>
          </div>
        </section>
      </main>
      <Footer />
    </ScrollController>
  )
}
