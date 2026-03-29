'use client'
import { useState, FormEvent } from 'react'
import Image from 'next/image'

export default function GatePage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || loading) return
    setLoading(true)

    await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6">
      <div className="max-w-xs w-full text-center flex flex-col items-center gap-10">
        <div className="relative w-16 h-16 opacity-90">
          <Image
            src="/images/owjv-logo.png"
            alt="OWJV"
            fill
            className="object-contain"
            sizes="64px"
            priority
          />
        </div>

        {submitted ? (
          <p className="font-serif text-lg italic text-white/60">
            come bacc soon.
          </p>
        ) : (
          <>
            <p className="font-serif text-xl italic text-white/70 leading-relaxed">
              thanks for the visit.
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your email"
                required
                className="w-full py-3 px-4 bg-transparent border border-white/10 text-white/65 text-[11px] placeholder:text-white/20 outline-none focus:border-white/30 transition-colors text-center"
              />
              <button
                type="submit"
                disabled={loading}
                className="py-3 px-6 bg-white text-black text-[9px] tracking-[0.16em] uppercase hover:bg-white/90 transition-colors disabled:opacity-40"
              >
                {loading ? '...' : "so you'll know when to come bacc"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
