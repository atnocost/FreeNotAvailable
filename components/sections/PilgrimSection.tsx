import Image from 'next/image'
import Link from 'next/link'
import FadeInView from '@/components/ui/FadeInView'

const GALLERY = [
  { src: '/images/pilgrim-snow-1.avif', alt: 'Pilgrim in snow — silhouette', caption: 'Snow I' },
  { src: '/images/pilgrim-snow-2.avif', alt: 'Pilgrim in snow — crouching', caption: 'Snow II' },
  { src: '/images/pilgrim-snow-3.avif', alt: 'Pilgrim in snow — standing', caption: 'Snow III' },
  { src: '/images/pilgrim-snow-4.avif', alt: 'Pilgrim in snow — action', caption: 'Snow IV' },
]

export default function PilgrimSection() {
  return (
    <section
      id="pilgrim"
      data-section-id="pilgrim"
      className="relative section-padding"
      aria-label="PILGRIM"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Chapter label */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-pixel tracking-[0.2em] uppercase text-[#8899aa]/80 block mb-6">
            Interlude
          </span>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl italic text-[#e0e8f0] tracking-wide">
            Pilgrim
          </h2>
        </div>

        {/* Manuscript excerpt */}
        <FadeInView className="max-w-2xl mb-20 md:mb-28">
          <div className="border-l border-[#8899aa]/20 pl-6 space-y-6">
            <p className="font-sans text-sm md:text-base leading-[1.9] text-[#e0e8f0]/40 italic">
              The world is static. The lake sleeps beneath glass, unbroken. FREE kneels&mdash;hands buried in frost, eyes gone somewhere else. Her words linger.
            </p>
            <div className="space-y-4 text-sm md:text-base leading-[1.9]">
              <p>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#8899aa]/80 not-italic mr-3">Her</span>
                <span className="font-sans italic text-[#e0e8f0]/30">(echo)</span>
                <span className="font-sans italic text-[#e0e8f0]/40 ml-2">You always said the night never ended out here.</span>
              </p>
              <p>
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 not-italic mr-3">Free</span>
                <span className="font-sans italic text-[#e0e8f0]/40">Maybe it didn&rsquo;t. Maybe I just outlasted it.</span>
              </p>
            </div>
            <p className="font-sans text-sm md:text-base leading-[1.9] text-[#e0e8f0]/30 italic">
              Wind flattens the horizon&mdash;no color now, only white folded into white. He traces the shape of something unseen in the ice, a memory or a promise.
            </p>
            <p className="font-sans text-sm md:text-base leading-[1.9] text-[#e0e8f0]/25 italic">
              A glow beneath the surface&mdash;red and blue, the last breath of summer trying to wake. Then stillness.
            </p>
          </div>
        </FadeInView>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
          {GALLERY.map(({ src, alt, caption }) => (
            <div key={src} className="gallery-item aspect-[3/4]">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 50vw"
              />
              <div className="gallery-caption">
                <span className="text-xs font-sans tracking-[0.1em] uppercase text-white/80">
                  {caption}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 font-sans mb-20 md:mb-28">
          Photography by Brandon Brown · Wardrobe by Raf Simons, Nike NOCTA, Heliot Emil
        </p>

        {/* Continue */}
        <div className="flex justify-between items-center">
          <Link
            href="/finexme"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-white/25 hover:text-white/40 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M10 6H2M5 3L2 6l3 3" />
            </svg>
            Act I &mdash; FINExME
          </Link>
          <Link
            href="/films"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-white/25 hover:text-white/40 transition-colors"
          >
            Films
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
