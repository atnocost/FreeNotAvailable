'use client'
import { useState } from 'react'
import Image from 'next/image'

/* ------------------------------------------------------------------ */
/*  Moon data                                                          */
/* ------------------------------------------------------------------ */

type Moon = {
  id: string
  label: string
  fullname: string
  desc: string
  src: string
  href?: string        // clickable moons link somewhere
  locked?: boolean     // dimmed, no interaction
}

const MOONS: Moon[] = [
  {
    id: 'owjv',
    label: 'OWJV',
    fullname: 'Other Worldly, Just Visiting.',
    desc: 'The dark moon. The container for every project, every phase, every chapter.',
    src: '/images/moon-owjv.png',
    href: '/',
  },
  {
    id: 'finexme',
    label: 'FINExME',
    fullname: 'Fine x Me.',
    desc: 'Blood moon. The collision of craft and self. Where the personal becomes undeniable.',
    src: '/images/moon-finexme.png',
    href: '/#finexme',
  },
  {
    id: 'sinenoctis',
    label: 'SINE NOCTIS',
    fullname: 'Sine Noctis.',
    desc: 'Without night. Light through the dark. Sound that exists between the silences.',
    src: '/images/moon-sinenoctis.png',
    href: '/#sinenoctis',
  },
  {
    id: 'sn2',
    label: 'SN2',
    fullname: 'Sine Noctis II.',
    desc: 'The golden continuation. Warmth held against the cold. A second orbit.',
    src: '/images/moon-sn2.png',
    locked: true,
  },
  {
    id: 'otherland',
    label: 'OTHERLAND',
    fullname: 'Otherland.',
    desc: 'A world seen from elsewhere. Everything familiar made strange.',
    src: '/images/moon-otherland.png',
    locked: true,
  },
  {
    id: 'sexsymbol',
    label: 'SEX SYMBOL',
    fullname: 'Sex Symbol.',
    desc: 'Steel and night. The blue hour. Presence as its own kind of power.',
    src: '/images/moon-sexsymbol.png',
    locked: true,
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LunarNav() {
  const [active, setActive] = useState<string>('owjv')

  const activeMoon = MOONS.find((m) => m.id === active)!

  return (
    <div className="w-full">
      {/* Eyebrow */}
      <p className="text-center text-[10px] tracking-[0.26em] uppercase text-white/22 mb-10 md:mb-12">
        Other World Mythos &mdash; Select a Phase
      </p>

      {/* Moon row */}
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-10 flex-wrap">
        {MOONS.map((m) => {
          const isActive = m.id === active
          const isLocked = !!m.locked
          return (
            <button
              key={m.id}
              onClick={() => !isLocked && setActive(m.id)}
              aria-label={m.label}
              className={`
                flex flex-col items-center gap-3 px-3 md:px-5 py-2 bg-transparent border-none outline-none
                ${isLocked ? 'cursor-default' : 'cursor-pointer'}
                group
              `}
            >
              {/* Moon sphere + ring wrapper */}
              <div className="relative">
                {/* Ring */}
                <div
                  className={`
                    absolute -inset-[7px] rounded-full border transition-colors duration-300
                    ${isActive ? 'border-white/60' : 'border-transparent'}
                  `}
                />
                {/* Sphere */}
                <div
                  className={`
                    relative w-[72px] h-[72px] md:w-[118px] md:h-[118px] rounded-full overflow-hidden
                    ${isLocked ? 'opacity-[0.28]' : ''}
                  `}
                >
                  <Image
                    src={m.src}
                    alt={m.label}
                    fill
                    className={`
                      object-cover rounded-full transition-all duration-300
                      ${isActive
                        ? 'brightness-100 saturate-100 contrast-[1.03]'
                        : isLocked
                          ? 'brightness-[0.35] saturate-[0.5]'
                          : 'brightness-50 saturate-[0.7] group-hover:brightness-[0.72] group-hover:saturate-[0.9]'
                      }
                    `}
                    sizes="118px"
                    draggable={false}
                  />
                  {/* Inset shadow for sphere effect */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_6px_rgba(0,0,0,0.6)] pointer-events-none z-[2]" />
                </div>
              </div>
              {/* Label */}
              <span
                className={`
                  text-[9px] tracking-[0.24em] uppercase whitespace-nowrap transition-colors duration-300
                  ${isActive
                    ? 'text-white/90'
                    : isLocked
                      ? 'text-white/15'
                      : 'text-white/22 group-hover:text-white/50'
                  }
                `}
              >
                {m.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Rule */}
      <hr className="border-t border-white/7 mx-4 md:mx-16 mb-0" />

      {/* Info panel */}
      <div className="relative min-h-[220px] md:min-h-[260px]">
        {MOONS.map((m) => {
          const isVisible = m.id === active
          return (
            <div
              key={m.id}
              className={`
                absolute top-10 left-4 right-4 md:left-16 md:right-16
                transition-all duration-300 ease-out
                ${isVisible
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2 pointer-events-none'
                }
              `}
            >
              <p className="text-[9px] tracking-[0.26em] uppercase text-white/22 mb-3">
                Other World Mythos
              </p>
              <h3 className="font-big-caesar text-5xl md:text-7xl lg:text-[80px] leading-[0.95] text-white/90 mb-5">
                {m.label}
              </h3>
              <p className="text-sm md:text-[14.5px] font-light leading-[1.68] text-white/50 max-w-[600px] mb-6">
                {m.fullname} {m.desc}
              </p>
              {m.href && (
                <a
                  href={m.href}
                  className="text-[10px] tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors"
                >
                  Explore &rarr;
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
