import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/* ── Env-var fallback tokens (still work if KV isn't set up) ── */
const ENV_EKTHESIS = new Set(
  (process.env.EKTHESIS_TOKENS ?? '').split(',').map((t) => t.trim()).filter(Boolean)
)
const ENV_BRIEF = new Set(
  (process.env.BRIEF_TOKENS ?? '').split(',').map((t) => t.trim()).filter(Boolean)
)

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

/* ── Validate token: KV first, then env vars ── */
async function isValidToken(gate: 'ekthesis' | 'brief', token: string): Promise<boolean> {
  const envSet = gate === 'ekthesis' ? ENV_EKTHESIS : ENV_BRIEF
  if (envSet.has(token)) return true
  return kvHasToken(gate, token)
}

export async function middleware(req: NextRequest) {
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
    if (req.nextUrl.pathname === '/ekthesis/gate') {
      return NextResponse.next()
    }

    const token = req.nextUrl.searchParams.get('token')

    if (token && await isValidToken('ekthesis', token)) {
      return NextResponse.next()
    }

    return NextResponse.rewrite(new URL('/ekthesis/gate', req.url))
  }

  /* ── Brief token gate ── */
  if (req.nextUrl.pathname.startsWith('/brief')) {
    if (req.nextUrl.pathname === '/brief/gate') {
      return NextResponse.next()
    }

    const token = req.nextUrl.searchParams.get('token')

    if (token && await isValidToken('brief', token)) {
      return NextResponse.next()
    }

    return NextResponse.rewrite(new URL('/brief/gate', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/internal/((?!login).*)', '/ekthesis/:path*', '/brief/:path*'],
}
