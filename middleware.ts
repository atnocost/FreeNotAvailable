import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/* ── KV token check ── */
async function kvHasToken(gate: string, token: string): Promise<boolean> {
  const url = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN
  if (!url || !kvToken) return false

  try {
    const res = await fetch(`${url}/hexists/gate:${gate}/${encodeURIComponent(token)}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
    })
    const data = await res.json()
    return data.result === 1
  } catch {
    return false
  }
}

/* ── Validate token: env vars read at call time, then KV ── */
async function isValidToken(gate: 'ekthesis' | 'brief' | 'site', token: string): Promise<boolean> {
  const envKey = gate === 'ekthesis' ? 'EKTHESIS_TOKENS' : gate === 'brief' ? 'BRIEF_TOKENS' : 'SITE_TOKENS'
  const envTokens = new Set(
    (process.env[envKey] ?? '').split(',').map((t) => t.trim()).filter(Boolean)
  )
  if (envTokens.has(token)) return true
  return kvHasToken(gate, token)
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  /* ── Internal auth ── */
  if (pathname.startsWith('/internal')) {
    const token = req.cookies.get('internal_auth')?.value
    const validToken = process.env.INTERNAL_AUTH_TOKEN

    if (!validToken || token !== validToken) {
      const loginUrl = new URL('/internal/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }

  /* ── Ekthesis token gate ── */
  if (pathname.startsWith('/ekthesis')) {
    if (pathname === '/ekthesis/gate') return NextResponse.next()

    const token = req.nextUrl.searchParams.get('token')
    if (token && await isValidToken('ekthesis', token)) return NextResponse.next()

    return NextResponse.rewrite(new URL('/ekthesis/gate', req.url))
  }

  /* ── Brief token gate ── */
  if (pathname.startsWith('/brief')) {
    if (pathname === '/brief/gate') return NextResponse.next()

    const token = req.nextUrl.searchParams.get('token')
    if (token && await isValidToken('brief', token)) return NextResponse.next()

    return NextResponse.rewrite(new URL('/brief/gate', req.url))
  }

  /* ── Site-wide gate ── */
  if (process.env.SITE_GATE_ENABLED === 'true') {
    // Always allow: gate page, subscribe API, Next.js internals, static assets
    const bypass =
      pathname === '/gate' ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/textures/') ||
      pathname.startsWith('/fonts/') ||
      pathname === '/favicon.ico' ||
      pathname === '/icon.png' ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml'

    if (!bypass) {
      // Check cookie first (set on prior valid token visit)
      const cookieToken = req.cookies.get('site_access')?.value
      if (cookieToken && await isValidToken('site', cookieToken)) {
        return NextResponse.next()
      }

      // Check URL param
      const urlToken = req.nextUrl.searchParams.get('token')
      if (urlToken && await isValidToken('site', urlToken)) {
        const res = NextResponse.next()
        res.cookies.set('site_access', urlToken, {
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: '/',
        })
        return res
      }

      return NextResponse.rewrite(new URL('/gate', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/internal/((?!login).*)',
    '/ekthesis/:path*',
    '/brief/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
