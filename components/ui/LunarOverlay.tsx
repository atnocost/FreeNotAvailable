'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type Moon = {
  id: string
  label: string
  displayTitle?: string
  desc: string
  src: string
  href?: string
  locked?: boolean
}

const MOONS: Moon[] = [
  {
    id: 'owjv',
    label: 'OWJV',
    desc: 'The container for every project, every phase, every chapter.',
    src: '/images/moon-owjv.png',
    href: '/',
  },
  {
    id: 'finexme',
    label: 'FINExME',
    desc: 'Blood moon. The collision of craft and self.',
    src: '/images/moon-finexme.png',
    href: '/finexme',
  },
  {
    id: 'sinenoctis',
    label: 'SINE NOCTIS',
    displayTitle: 'SINENOCTIS',
    desc: 'Without night. Light through the dark.',
    src: '/images/moon-sinenoctis.png',
    href: '/sinenoctis',
  },
  {
    id: 'sn2',
    label: 'SN2',
    desc: 'The golden continuation. A second orbit.',
    src: '/images/moon-sn2.png',
    locked: true,
  },
  {
    id: 'otherland',
    label: 'OTHERLAND',
    desc: 'A world seen from elsewhere.',
    src: '/images/moon-otherland.png',
    locked: true,
  },
  {
    id: 'sexsymbol',
    label: 'SEX SYMBOL',
    desc: 'Steel and night. The blue hour.',
    src: '/images/moon-sexsymbol.png',
    locked: true,
  },
]

function getMoonForPath(pathname: string): string {
  if (pathname === '/') return 'owjv'
  if (pathname.startsWith('/finexme')) return 'finexme'
  if (pathname.startsWith('/sinenoctis')) return 'sinenoctis'
  return ''
}

export default function LunarOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()
  const activeMoonId = getMoonForPath(pathname)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const displayMoon = MOONS.find((m) => m.id === (hoveredId ?? activeMoonId)) ?? MOONS[0]

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavigate = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/85 backdrop-blur-md transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Phase navigation"
        aria-modal="true"
        className={`fixed inset-x-0 bottom-0 md:inset-y-0 md:left-0 md:right-auto md:w-[420px] z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/8 transition-transform duration-300 ease-[cubic-bezier(0.25,0,0,1)] ${
          open
            ? 'translate-y-0 md:translate-x-0'
            : 'translate-y-full md:-translate-x-full md:translate-y-0'
        }`}
      >
        <div className="flex flex-col h-full max-h-[85vh] md:max-h-full p-6 md:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <span className="text-[9px] tracking-[0.24em] uppercase text-white/25">
              Select a Phase
            </span>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/60 transition-colors p-1"
              aria-label="Close navigation"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2l12 12M14 2L2 14" />
              </svg>
            </button>
          </div>

          {/* Moon grid */}
          <div className="flex items-center gap-2 md:gap-3 mb-8 md:mb-10 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {MOONS.map((m) => {
              const isCurrent = m.id === activeMoonId
              const isLocked = !!m.locked

              return isLocked ? (
                <div
                  key={m.id}
                  className="flex flex-col items-center gap-2 shrink-0"
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative">
                    <div className="relative w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full overflow-hidden opacity-[0.25]">
                      <Image
                        src={m.src}
                        alt={m.label}
                        fill
                        className="object-cover rounded-full brightness-[0.3] saturate-[0.4]"
                        sizes="56px"
                      />
                      <div className="absolute inset-0 rounded-full shadow-[inset_0_0_12px_4px_rgba(0,0,0,0.6)]" />
                    </div>
                  </div>
                  <span className="text-[7px] tracking-[0.2em] uppercase text-white/12 whitespace-nowrap">
                    {m.label}
                  </span>
                </div>
              ) : (
                <Link
                  key={m.id}
                  href={m.href!}
                  onClick={handleNavigate}
                  className="flex flex-col items-center gap-2 shrink-0 group"
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative">
                    {/* Active ring */}
                    <div
                      className={`absolute -inset-[5px] rounded-full border transition-colors duration-300 ${
                        isCurrent ? 'border-white/50' : 'border-transparent group-hover:border-white/20'
                      }`}
                    />
                    <div className="relative w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full overflow-hidden">
                      <Image
                        src={m.src}
                        alt={m.label}
                        fill
                        className={`object-cover rounded-full transition-all duration-300 ${
                          isCurrent
                            ? 'brightness-100 saturate-100'
                            : 'brightness-[0.45] saturate-[0.6] group-hover:brightness-[0.7] group-hover:saturate-[0.85]'
                        }`}
                        sizes="56px"
                      />
                      <div className="absolute inset-0 rounded-full shadow-[inset_0_0_12px_4px_rgba(0,0,0,0.6)]" />
                    </div>
                  </div>
                  <span
                    className={`text-[7px] tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 ${
                      isCurrent ? 'text-white/80' : 'text-white/25 group-hover:text-white/50'
                    }`}
                  >
                    {m.label}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <hr className="border-t border-white/7 mb-6 md:mb-8" />

          {/* Info panel */}
          <div className="flex-1 min-h-0">
            <p className="text-[8px] tracking-[0.22em] uppercase text-white/18 mb-3">
              {displayMoon.locked ? 'Locked Phase' : 'Current Phase'}
            </p>
            <h3 className="font-big-caesar text-3xl md:text-4xl text-white/85 mb-3 leading-none">
              {displayMoon.displayTitle || displayMoon.label}
            </h3>
            <p className="text-xs font-sans leading-[1.7] text-white/35 max-w-[340px] mb-6">
              {displayMoon.desc}
            </p>
            {displayMoon.href && !displayMoon.locked && displayMoon.id !== activeMoonId && (
              <Link
                href={displayMoon.href}
                onClick={handleNavigate}
                className="text-[9px] tracking-[0.15em] uppercase text-white/35 hover:text-white/60 transition-colors"
              >
                Visit &rarr;
              </Link>
            )}
            {displayMoon.id === activeMoonId && !displayMoon.locked && (
              <span className="text-[9px] tracking-[0.15em] uppercase text-white/20">
                You are here
              </span>
            )}
            {displayMoon.locked && (
              <span className="text-[9px] tracking-[0.15em] uppercase text-white/15">
                Coming Soon
              </span>
            )}
          </div>

          {/* Footer links */}
          <div className="pt-6 border-t border-white/5 flex gap-5">
            <Link
              href="/films"
              onClick={handleNavigate}
              className="text-[8px] tracking-[0.18em] uppercase text-white/20 hover:text-white/45 transition-colors"
            >
              Films
            </Link>
            <Link
              href="/otherworld"
              onClick={handleNavigate}
              className="text-[8px] tracking-[0.18em] uppercase text-white/20 hover:text-white/45 transition-colors"
            >
              Other World
            </Link>
            <Link
              href="/timeline"
              onClick={handleNavigate}
              className="text-[8px] tracking-[0.18em] uppercase text-white/20 hover:text-white/45 transition-colors"
            >
              Timeline
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
