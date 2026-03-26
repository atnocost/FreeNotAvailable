'use client'
import { useState, FormEvent } from 'react'
import Image from 'next/image'
import FadeInView from '@/components/ui/FadeInView'

/* ------------------------------------------------------------------ */
/*  Vinyl product data                                                 */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  {
    act: 'Act I · 2024',
    title: 'FINExME',
    color: '#cc1a1a',
    colorLabel: 'P206 Translucent Red · 12″ LP',
    src: '/images/finexme-vinyl.png',
    coverSrc: '/images/finexme-cover.avif',
    sleeve: [
      '12″ vinyl — P206 Translucent Red',
      'Gatefold / Standard jacket — TBC',
      'Liner notes — TBC',
      'OWJV cherub label, both sides',
    ],
  },
  {
    act: 'Act II · 2026',
    title: 'SINENOCTIS',
    color: '#9a9a98',
    colorLabel: 'Cool Gray 8 Opaque · 12″ LP',
    src: '/images/sinenoctis-vinyl.png',
    coverSrc: '/images/sinenoctis-cover.avif',
    sleeve: [
      '12″ vinyl — Cool Gray 8 Opaque',
      'Gatefold / Standard jacket — TBC',
      'Liner notes — TBC',
      'OWJV cherub label, both sides',
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function OtherMediaSection() {
  const [tapped, setTapped] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  const handleWaitlist = (e: FormEvent) => {
    e.preventDefault()
    if (!waitlistEmail || !selected) return
    setWaitlistSubmitted(true)
  }

  return (
    <section
      id="other-media"
      data-section-id="other-media"
      className="relative section-padding"
      aria-label="Physical / Other Media"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <p className="text-[9px] tracking-[0.22em] uppercase text-white/22 mb-10 md:mb-11">
          Physical / Other Media
        </p>

        {/* Interaction hint */}
        <p className="md:hidden text-center text-[8px] tracking-[0.18em] uppercase text-white/25 mb-7">
          Tap each record to see what&rsquo;s inside
        </p>
        <p className="hidden md:block text-center text-[8px] tracking-[0.18em] uppercase text-white/25 mb-7">
          Hover each record to see what&rsquo;s inside
        </p>

        {/* Product cards — two vinyl mockups side by side */}
        <FadeInView className="mb-12 md:mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PRODUCTS.map((p) => {
              const isOpen = tapped === p.title
              return (
              <div
                key={p.title}
                className="relative group cursor-default md:cursor-default"
                onClick={() => setTapped(isOpen ? null : p.title)}
              >
                {/* Vinyl mockup image */}
                <div className="relative aspect-square">
                  <Image
                    src={p.src}
                    alt={`${p.title} vinyl record`}
                    fill
                    className={`object-contain transition-all duration-[600ms] ease-[cubic-bezier(0.25,0,0,1)] md:group-hover:scale-[1.02] md:group-hover:-translate-y-1 md:group-hover:brightness-[0.45] ${
                      isOpen ? 'scale-[1.02] -translate-y-1 brightness-[0.45]' : ''
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Hover/tap overlay */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-7 md:p-8 transition-all duration-400 ease-[cubic-bezier(0.25,0,0,1)] pointer-events-none md:group-hover:opacity-100 md:group-hover:translate-y-0 ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'
                  }`}
                >
                  <p className="text-[8px] tracking-[0.22em] uppercase text-white/40 mb-1">
                    {p.act}
                  </p>
                  <h3 className="font-big-caesar text-[42px] tracking-[0.06em] text-white leading-none mb-3">
                    {p.title}
                  </h3>
                  {/* Color chip */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span
                      className="w-[9px] h-[9px] rounded-full shrink-0"
                      style={{ background: p.color }}
                    />
                    <span className="text-[8px] tracking-[0.16em] uppercase text-white/55">
                      {p.colorLabel}
                    </span>
                  </div>
                  {/* Rule */}
                  <div className="w-full h-px bg-white/10 mb-4" />
                  {/* Sleeve contents */}
                  <p className="text-[8px] tracking-[0.18em] uppercase text-white/28 mb-2">
                    What&rsquo;s in the sleeve
                  </p>
                  <div className="flex flex-col gap-1 mb-5">
                    {p.sleeve.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] text-white/45 tracking-[0.03em] flex items-center gap-2"
                      >
                        <span className="text-[9px] text-white/25 shrink-0">&mdash;</span>
                        {item}
                      </span>
                    ))}
                  </div>
                  {/* Badge */}
                  <span className="inline-block text-[8px] tracking-[0.14em] uppercase py-1 px-3 border border-white/20 text-white/38 w-fit">
                    Waitlist open
                  </span>
                </div>
              </div>
              )
            })}
          </div>
        </FadeInView>

        {/* What Comes Next */}
        <FadeInView className="mb-12 md:mb-14">
          <div className="max-w-2xl mx-auto text-center pointer-events-none select-none">
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/25 font-sans">
                What Comes Next
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <h3 className="font-big-caesar text-2xl md:text-3xl lg:text-4xl tracking-wide text-white/25">
                SINENOCTIS 2
              </h3>
              <h3 className="font-big-caesar text-2xl md:text-3xl lg:text-4xl tracking-wide text-white/25">
                OTHERLAND
              </h3>
              <h3 className="font-big-caesar text-2xl md:text-3xl lg:text-4xl tracking-wide text-white/25">
                SEX SYMBOL
              </h3>
            </div>
          </div>
        </FadeInView>

        {/* Bottom grid: record list + waitlist panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left — record list + stats */}
          <div>
            <div className="flex flex-col">
              {PRODUCTS.map((p) => (
                <div
                  key={p.title}
                  className="flex items-stretch border-t border-white/6 last:border-b"
                >
                  {/* Mini cover */}
                  <div className="w-[88px] h-[88px] shrink-0 overflow-hidden relative">
                    <Image
                      src={p.coverSrc}
                      alt={p.title}
                      fill
                      className="object-cover brightness-[0.88]"
                      sizes="88px"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-center px-5 py-4">
                    <span className="text-[8px] tracking-[0.14em] uppercase text-white/25 mb-1">
                      {p.act}
                    </span>
                    <span className="font-big-caesar text-xl tracking-[0.06em] text-white/88 mb-0.5">
                      {p.title}
                    </span>
                    <span className="text-[10px] text-white/25 tracking-[0.04em]">
                      Vinyl · 12&quot;
                    </span>
                  </div>
                  {/* Status */}
                  <div className="flex items-center px-5">
                    <span className="text-[8px] tracking-[0.12em] uppercase py-1 px-2.5 border border-white/14 text-white/28 whitespace-nowrap">
                      Waitlist open
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Stats row */}
            <div className="flex gap-7 mt-6 pt-5 border-t border-white/6">
              {[
                { num: 'Limited', label: 'Press run' },
                { num: 'First access', label: 'For insiders' },
                { num: 'OWJV', label: 'Label' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-big-caesar text-base text-white/55 tracking-[0.04em]">
                    {s.num}
                  </p>
                  <p className="text-[8px] tracking-[0.1em] uppercase text-white/25 mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — waitlist panel */}
          <div className="border border-white/8 bg-white/[0.018] p-8">
            {waitlistSubmitted ? (
              <div className="text-center py-6">
                <p className="font-serif text-xl italic font-light text-white/82 leading-[1.45] mb-3">
                  You&rsquo;re on the list.
                </p>
                <p className="text-[11px] text-white/28 leading-[1.75]">
                  We&rsquo;ll reach out when it&rsquo;s time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlist}>
                <p className="text-[8px] tracking-[0.2em] uppercase text-[#c85a23]/85 mb-2.5">
                  Vinyl Waitlist
                </p>
                <p className="font-serif text-xl italic font-light text-white/82 leading-[1.45] mb-2">
                  &ldquo;Be The First Visitor.&rdquo;
                </p>
                <p className="text-[11px] text-white/28 leading-[1.75] mb-6">
                  Not yet pressed. Claim yours before it exists.
                </p>
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="your email"
                  required
                  className="w-full py-2.5 px-3.5 bg-transparent border border-white/10 text-white/65 text-[11px] placeholder:text-white/25 outline-none focus:border-white/30 transition-colors mb-2.5"
                />
                <p className="text-[8px] tracking-[0.14em] uppercase text-white/22 mb-2">
                  I want
                </p>
                <div className="flex gap-1.5 mb-5">
                  {['FINExME', 'SINE NOCTIS', 'Both'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelected(selected === opt ? null : opt)}
                      className={`py-1.5 px-3.5 border text-[8px] tracking-[0.12em] uppercase transition-all cursor-pointer ${
                        selected === opt
                          ? 'border-white/50 text-white/90 bg-white/[0.08]'
                          : 'border-white/10 text-white/28 hover:border-white/35 hover:text-white/70 hover:bg-white/[0.04]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={!selected}
                  className="w-full py-3 bg-white text-black text-[9px] tracking-[0.16em] uppercase border-none cursor-pointer hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-default"
                >
                  Join the Waitlist
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
