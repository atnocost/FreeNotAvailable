import FadeInView from '@/components/ui/FadeInView'
import LunarNav from '@/components/LunarNav'

export default function MythosSection() {
  return (
    <section
      id="mythos"
      data-section-id="mythos"
      className="relative section-padding"
      aria-label="The Mythos"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
        {/* Section heading */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-pixel tracking-[0.2em] uppercase text-[#c0392b] block">
            Canon
          </span>
        </div>

        {/* Manuscript excerpt */}
        <FadeInView className="max-w-2xl mb-20 md:mb-28 space-y-6">
          <p className="font-sans text-sm md:text-base leading-[1.9] text-[#b5afa5]/70 italic max-w-[65ch]">
            He crosses the same streets, carrying light that doesn&rsquo;t belong to him.
            Puts it to skin. Watches it spread.
          </p>
          <p className="font-sans text-sm md:text-base leading-[1.9] text-[#b5afa5]/70 italic max-w-[65ch]">
            Until she&rsquo;s there. At the edge. Silent. Certain.
            Face borrowed from another time.
          </p>
          <p className="font-sans text-sm md:text-base leading-[1.9] text-[#b5afa5]/70 italic max-w-[65ch]">
            Eyes stay half-shut. Moments stolen through glass, shadow, distance.
            Red bleeds in. White fades out. Black holds.
          </p>
          <p className="font-sans text-sm md:text-base leading-[1.9] text-[#b5afa5]/50 italic max-w-[65ch]">
            What breaks once&hellip; waits only for the next hand to reach.
          </p>
        </FadeInView>

        {/* Lunar navigation */}
        <div className="mb-20 md:mb-28">
          <LunarNav />
        </div>

      </div>
    </section>
  )
}
