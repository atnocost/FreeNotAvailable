import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()
  const secret = process.env.INTERNAL_AUTH_TOKEN

  if (!secret) {
    return NextResponse.json({ error: 'not configured' }, { status: 500 })
  }

  if (password === secret) {
    const res = NextResponse.json({ success: true })
    res.cookies.set('internal_auth', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })
    return res
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
