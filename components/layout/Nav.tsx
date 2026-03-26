'use client'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import LunarOverlay from '@/components/ui/LunarOverlay'

/* ------------------------------------------------------------------ */
/*  Nav links — reduced to 3 per audit                                 */
/* ------------------------------------------------------------------ */

type NavLink = { label: string; href: string }

const NAV_LINKS: NavLink[] = [
  { label: 'OTHERWORLD', href: '/otherworld' },
  { label: 'FILMS', href: '/films' },
  { label: 'HEAR', href: '/#links' },
]

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lunarOpen, setLunarOpen] = useState(false)
  const closeLunar = useCallback(() => setLunarOpen(false), [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const resolveHref = (link: NavLink) => {
    if (link.href.startsWith('/#')) {
      return isHome ? link.href.replace('/', '') : link.href
    }
    return link.href
  }

  const isActive = (link: NavLink) => {
    if (link.href.startsWith('/#')) return false
    return pathname.startsWith(link.href)
  }

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-5 transition-all duration-300 border-b ${
        scrolled
          ? 'backdrop-blur-lg bg-black/70 border-white/5'
          : 'border-white/7'
      }`}
    >
      {/* OWJV cherub logo — opens lunar phase nav */}
      <button
        onClick={() => setLunarOpen(true)}
        className="relative w-11 h-11 cursor-pointer"
        aria-label="Open phase navigation"
      >
        <Image
          src="/images/owjv-logo.png"
          alt="OWJV"
          fill
          className="object-contain"
          sizes="44px"
          priority
        />
      </button>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-[30px]">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={resolveHref(link)}
            className={`text-[9px] tracking-[0.18em] uppercase font-sans transition-colors ${
              isActive(link)
                ? 'text-white/70'
                : 'text-white/45 hover:text-white/70'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Visit CTA */}
      <Link
        href="/otherworld"
        className="hidden md:block text-[9px] tracking-[0.14em] uppercase py-1.5 px-[18px] border border-white/22 text-white/55 rounded-[2px] font-sans hover:text-white/80 hover:border-white/40 transition-all"
      >
        Visit
      </Link>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white/70 hover:text-white"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-menu"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {menuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <path d="M3 12h18" />
              <path d="M3 6h18" />
              <path d="M3 18h18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-nav-menu" className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 md:hidden">
          <ul className="flex flex-col p-6 gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={resolveHref(link)}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-[0.15em] uppercase text-white/70 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="h-px bg-white/10" aria-hidden="true" />
            <li>
              <Link
                href="/otherworld"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-white/45 hover:text-white"
              >
                Visit
              </Link>
            </li>
          </ul>
        </div>
      )}

    </nav>
    <LunarOverlay open={lunarOpen} onClose={closeLunar} />
    </>
  )
}
