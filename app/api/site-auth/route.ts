import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const next = req.nextUrl.searchParams.get('next') ?? '/'

  const validTokens = new Set(
    (process.env.SITE_TOKENS ?? '').split(',').map((t) => t.trim()).filter(Boolean)
  )

  if (!token || !validTokens.has(token)) {
    return NextResponse.json({
      error: 'invalid token',
      received: token,
      SITE_TOKENS: process.env.SITE_TOKENS ?? '(empty)',
      validTokens: [...validTokens],
    })
  }

  const res = NextResponse.redirect(new URL(next, req.url))
  res.cookies.set('site_access', 'granted', {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })
  return res
}
