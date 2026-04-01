import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, source } = await req.json()

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'valid email required' }, { status: 400 })
  }

  const tag = source === 'presave' ? ' (presave)' : ''

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'email service not configured' }, { status: 503 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'OTHER WORLD <freeisavailable@atnocost.cc>',
      to: 'freeisavailable@atnocost.cc',
      subject: `new subscriber${tag}`,
      text: `new subscriber${tag}: ${email}`,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'failed to forward' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
