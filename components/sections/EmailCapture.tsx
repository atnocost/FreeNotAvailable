'use client'
import { useState, FormEvent } from 'react'
import FadeInView from '@/components/ui/FadeInView'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="relative py-20 md:py-28 border-t border-white/5">
      <div className="relative z-10 max-w-md mx-auto px-6 md:px-10">
        <FadeInView>
          <div className="border border-white/8 p-8 md:p-10 text-center">
            {submitted ? (
              <p className="font-serif text-2xl md:text-3xl italic font-light text-white/85 leading-[1.35]">
                You&rsquo;re in.
              </p>
            ) : (
              <>
                <h2 className="font-serif text-2xl md:text-3xl italic font-light text-white/85 leading-[1.35] mb-8">
                  Don&rsquo;t Just Visit, Stay.
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2.5"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your email"
                    required
                    className="flex-1 py-2.5 px-4 bg-transparent border border-white/10 text-white/65 text-[11px] placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-white text-black text-[9px] tracking-[0.16em] uppercase border-none cursor-pointer hover:bg-white/90 transition-colors whitespace-nowrap"
                  >
                    Enter
                  </button>
                </form>
              </>
            )}
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
