import FadeInView from '@/components/ui/FadeInView'

const LINKS = [
  { label: 'Spotify', href: 'https://open.spotify.com/artist/13Z1MsZ0A9Ddox3DZcu9zk' },
  { label: 'Apple Music', href: 'https://music.apple.com/us/artist/free/1715333809' },
  { label: 'TIDAL', href: 'https://tidal.com/artist/45010274' },
  { label: 'YouTube', href: 'https://www.youtube.com/@OWJV/videos' },
  { label: 'Instagram', href: 'https://www.instagram.com/freenotavailable/' },
]

export default function LinksSection() {
  return (
    <section
      id="links"
      data-section-id="links"
      className="relative section-padding"
      aria-label="Listen"
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 text-center">
        {/* Heading */}
        <FadeInView>
          <span className="text-xs font-pixel tracking-[0.2em] uppercase text-warm block mb-6">
            Listen
          </span>
          <h2 className="font-sans text-3xl md:text-4xl italic text-[#f2ede8] mb-4">
            Find FREE somewhere
          </h2>
          <p className="font-sans text-sm text-white/40 mb-12 md:mb-16">
            Streaming on all platforms.
          </p>
        </FadeInView>

        {/* Link buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/70 hover:text-[#e74c3c] hover:border-[#c0392b]/40 hover:bg-[#c0392b]/5 transition-all duration-300 min-w-[160px]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
