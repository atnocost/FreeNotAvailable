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
          <span className="text-xs font-pixel tracking-[0.2em] uppercase text-[#c0392b] block mb-6">
            Mythos
          </span>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl italic text-[#f2ede8] leading-[0.95]">
            Other World Mythos
          </h2>
        </div>

        {/* Mythology explanation */}
        <FadeInView className="max-w-2xl mb-20 md:mb-28 space-y-8">
          <p className="font-sans text-sm md:text-base leading-[1.8] text-[#b5afa5] max-w-[65ch]">
            Every FREE project is a Greek vignette dressed in modern skin.
            FREE is <span className="text-warm">Prometheus</span>&mdash;the one who steals fire not for the sake of
            mankind, but to burn through every intimate encounter without
            restraint. He overindulges, gives too much of himself, and gets
            punished for it. Then he reincarnates and does it again.
          </p>
          <p className="font-sans text-sm md:text-base leading-[1.8] text-[#b5afa5] max-w-[65ch]">
            The Lady In Black is the <span className="text-warm">Eagle</span>. She is consequence personified&mdash;the
            figure who arrives when the bill comes due. She doesn&rsquo;t speak. She
            doesn&rsquo;t negotiate. She executes. In every era she wears a
            different face but the same intent: to collect what FREE owes
            for loving recklessly.
          </p>
          <p className="font-sans text-sm md:text-base leading-[1.8] text-[#b5afa5] max-w-[65ch]">
            The visual law follows accordingly. Voyeuristic framing, faces
            partially obscured, intimacy shot from a distance that feels like
            surveillance. Each project moves through a color logic&mdash;FINExME in
            hot reds, SINE NOCTIS in strict monochrome&mdash;as if reincarnation
            resets the palette along with the protagonist.
          </p>
        </FadeInView>

        {/* Lunar navigation */}
        <div className="mb-20 md:mb-28">
          <LunarNav />
        </div>

        {/* What Comes Next — built as HTML */}
        <FadeInView>
          <div className="max-w-2xl mx-auto text-center pointer-events-none select-none">
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-sans">
                What Comes Next
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <h3 className="font-big-caesar text-2xl md:text-3xl lg:text-4xl tracking-wide text-white/15">
                SINENOCTIS 2
              </h3>
              <h3 className="font-big-caesar text-2xl md:text-3xl lg:text-4xl tracking-wide text-white/15">
                OTHERLAND
              </h3>
              <h3 className="font-big-caesar text-2xl md:text-3xl lg:text-4xl tracking-wide text-white/15">
                SEX SYMBOL
              </h3>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
