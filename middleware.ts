import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID_TOKENS = new Set(
  (process.env.EKTHESIS_TOKENS ?? '').split(',').map((t) => t.trim()).filter(Boolean)
)

const BRIEF_TOKENS = new Set(
  (process.env.BRIEF_TOKENS ?? '').split(',').map((t) => t.trim()).filter(Boolean)
)

export function middleware(req: NextRequest) {
  /* ── Internal auth (existing) ── */
  if (req.nextUrl.pathname.startsWith('/internal')) {
    const token = req.cookies.get('internal_auth')?.value
    const validToken = process.env.INTERNAL_AUTH_TOKEN

    if (!validToken || token !== validToken) {
      const loginUrl = new URL('/internal/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }

  /* ── Ekthesis token gate ── */
  if (req.nextUrl.pathname.startsWith('/ekthesis')) {
    // Gate page is always accessible
    if (req.nextUrl.pathname === '/ekthesis/gate') {
      return NextResponse.next()
    }

    const token = req.nextUrl.searchParams.get('token')

    if (token && VALID_TOKENS.has(token)) {
      return NextResponse.next()
    }

    // No token or invalid token — show the gate page
    return NextResponse.rewrite(new URL('/ekthesis/gate', req.url))
  }

  /* ── Brief token gate ── */
  if (req.nextUrl.pathname.startsWith('/brief')) {
    if (req.nextUrl.pathname === '/brief/gate') {
      return NextResponse.next()
    }

    const token = req.nextUrl.searchParams.get('token')

    if (token && BRIEF_TOKENS.has(token)) {
      return NextResponse.next()
    }

    return NextResponse.rewrite(new URL('/brief/gate', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/internal/((?!login).*)', '/ekthesis/:path*', '/brief/:path*'],
}
