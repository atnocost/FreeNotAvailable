'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Discriminated-union link types                                     */
/* ------------------------------------------------------------------ */

type AnchorLink = { kind: 'anchor'; label: string; hash: string }
type RouteLink = { kind: 'route'; label: string; href: string }


const ANCHOR_LINKS: AnchorLink[] = [
  { kind: 'anchor', label: 'ACT I', hash: '#finexme' },
  { kind: 'anchor', label: 'ACT II', hash: '#sinenoctis' },
  { kind: 'anchor', label: 'MYTHOS', hash: '#mythos' },
]

const ROUTE_LINKS: RouteLink[] = [
  { kind: 'route', label: 'FILMS', href: '/films' },
  { kind: 'route', label: 'CLIPS', href: '/clips' },
  { kind: 'route', label: 'TIMELINE', href: '/timeline' },
  { kind: 'route', label: 'EKTHESIS', href: '/ekthesis' },
]

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /** Resolve anchor href: on home page use hash directly, on sub-pages prefix with / */
  const anchorHref = (link: AnchorLink) =>
    isHome ? link.hash : `/${link.hash}`

  /** Check if a route link is the active page */
  const isActiveRoute = (link: RouteLink) => pathname.startsWith(link.href)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-lg bg-black/70 border-b border-white/5' : ''
      }`}
    >
      <Link href="/" className="relative w-20 h-8">
        <Image
          src="/images/logotype-free.png"
          alt="FREE"
          fill
          className="object-contain mix-blend-screen"
          sizes="80px"
          priority
        />
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-6 lg:gap-8">
        {ANCHOR_LINKS.map((link) => (
          <li key={link.hash}>
            <Link
              href={anchorHref(link)}
              className="text-xs font-sans tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="w-px h-4 bg-white/10 self-center" aria-hidden="true" />
        {ROUTE_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-xs font-sans tracking-[0.15em] uppercase transition-colors ${
                isActiveRoute(link)
                  ? 'text-accent'
                  : 'text-accent/70 hover:text-accent'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

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
            {ANCHOR_LINKS.map((link) => (
              <li key={link.hash}>
                <Link
                  href={anchorHref(link)}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-[0.15em] uppercase text-white/70 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="h-px bg-white/10" aria-hidden="true" />
            {ROUTE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm tracking-[0.15em] uppercase ${
                    isActiveRoute(link)
                      ? 'text-accent'
                      : 'text-accent/70 hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
