'use client'
import { useState } from 'react'
import FadeInView from '@/components/ui/FadeInView'

export default function EmailCapture() {
  const [email, setEmail] = useState('')

  return (
    <section className="relative py-20 md:py-28 border-t border-white/5">
      <div className="relative z-10 max-w-lg mx-auto px-6 md:px-10 text-center">
        <FadeInView>
          <p className="text-[9px] tracking-[0.26em] uppercase text-[#c85a23]/80 mb-4">
            Stay
          </p>
          <h2 className="font-serif text-2xl md:text-3xl italic font-light text-white/85 leading-[1.35] mb-3">
            Don&rsquo;t Just Visit, Stay.
          </h2>
          <p className="font-sans text-xs md:text-sm text-white/35 leading-[1.75] mb-8 max-w-[42ch] mx-auto">
            Early access when SINE NOCTIS drops. Exclusive world-building content. Ongoing mythology drops through the entire arc.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Beehiiv embed will replace this
            }}
            className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email"
              required
              className="flex-1 py-2.5 px-4 bg-transparent border border-white/12 text-white/65 text-[11px] placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="py-2.5 px-6 bg-white text-black text-[9px] tracking-[0.16em] uppercase border-none cursor-pointer hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Join
            </button>
          </form>
          <p className="text-[9px] text-white/14 mt-3">
            No noise. First access only. Unsubscribe anytime.
          </p>
        </FadeInView>
      </div>
    </section>
  )
}
