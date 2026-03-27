import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { PRESS_CONTACTS } from '@/lib/press-contacts'

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
}

function checkAuth(req: NextRequest): boolean {
  const token = req.cookies.get('internal_auth')?.value
  const valid = process.env.INTERNAL_AUTH_TOKEN
  return Boolean(valid && token === valid)
}

/** POST { contactId, body } — send email via Resend */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
  }

  const { contactId, body: customBody } = await req.json()
  const contact = PRESS_CONTACTS.find((c) => c.id === contactId)
  if (!contact) {
    return NextResponse.json({ error: 'contact not found' }, { status: 404 })
  }

  // T1-T3: artist voice, T4: label voice
  const fromAddress =
    contact.tier <= 3
      ? 'FREE <free@atnocost.cc>'
      : 'FREE / OWJV <freeisavailable@atnocost.cc>'

  // Use custom body if provided (e.g. with ekthesis link attached), otherwise use template
  const emailBody = customBody || contact.body

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: contact.emails,
        subject: contact.subject,
        text: emailBody,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'send failed', details: data }, { status: res.status })
    }

    // Auto-update status to sent
    const KV_KEY = 'outreach:status'
    try {
      const existing = await kv.hget(KV_KEY, contactId) as string | Record<string, unknown> | null
      const record = existing
        ? (typeof existing === 'string' ? JSON.parse(existing) : existing)
        : {}
      record.status = 'sent'
      record.sentAt = new Date().toISOString()
      record.resendId = data.id
      await kv.hset(KV_KEY, { [contactId]: JSON.stringify(record) })
    } catch {
      // KV error — email still sent
    }

    return NextResponse.json({ success: true, resendId: data.id })
  } catch (err) {
    return NextResponse.json({ error: 'failed to reach Resend API' }, { status: 500 })
  }
}
