import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID_TOKENS = new Set(
  (process.env.EKTHESIS_TOKENS ?? '').split(',').map((t) => t.trim()).filter(Boolean)
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
    const token = req.nextUrl.searchParams.get('token')

    if (token && VALID_TOKENS.has(token)) {
      return NextResponse.next()
    }

    // No token or invalid token — redirect silently to homepage
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/internal/((?!login).*)', '/ekthesis/:path*'],
}
