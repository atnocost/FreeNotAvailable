import Image from 'next/image'
import FadeInView from '@/components/ui/FadeInView'

const MEDIA_ITEMS = [
  { num: '1', title: 'FINExME (vinyl)', status: 'TBD' },
  { num: '2', title: 'SINE NOCTIS (vinyl)', status: 'TBD' },
]

export default function OtherMediaSection() {
  return (
    <section
      id="other-media"
      data-section-id="other-media"
      className="relative section-padding"
      aria-label="Other Media"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
        {/* Section heading */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-pixel tracking-[0.2em] uppercase text-warm block mb-6">
            Physical
          </span>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl italic text-[#f2ede8] leading-[0.95]">
            Other Media
          </h2>
        </div>

        {/* Vinyl image */}
        <FadeInView className="mb-16 md:mb-20">
          <div className="relative aspect-square max-w-lg mx-auto">
            <Image
              src="/images/vinyl-records.avif"
              alt="FINExME and SINE NOCTIS vinyl records"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
            />
            <div className="absolute inset-0 vignette" />
          </div>
        </FadeInView>

        {/* Media list */}
        <FadeInView>
          <ol className="space-y-4 max-w-md mx-auto">
            {MEDIA_ITEMS.map(({ num, title, status }) => (
              <li key={num} className="flex items-baseline gap-4">
                <span className="text-xs font-sans text-warm/40 tabular-nums">{num}.</span>
                <span className="font-sans text-lg md:text-xl italic text-[#f2ede8]/80">
                  {title}
                </span>
                <span className="flex-1 border-b border-white/5" />
                <span className="font-mono text-xs text-white/30 uppercase">{status}</span>
              </li>
            ))}
          </ol>
        </FadeInView>
      </div>
    </section>
  )
}
