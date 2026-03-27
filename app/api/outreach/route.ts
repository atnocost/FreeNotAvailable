import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { generateToken } from '@/lib/tokens'
import { PRESS_CONTACTS } from '@/lib/press-contacts'

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
}

function checkAuth(req: NextRequest): boolean {
  const token = req.cookies.get('internal_auth')?.value
  const valid = process.env.INTERNAL_AUTH_TOKEN
  return Boolean(valid && token === valid)
}

export type OutreachRecord = {
  token?: string
  status: 'pending' | 'sent' | 'bounced' | 'opened'
  generatedAt?: string
}

const KV_KEY = 'outreach:status'

/** GET — returns all outreach records */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  try {
    const data = (await kv.hgetall(KV_KEY)) as Record<string, string | OutreachRecord> | null
    const records: Record<string, OutreachRecord> = {}

    if (data) {
      for (const [key, val] of Object.entries(data)) {
        records[key] = typeof val === 'string' ? JSON.parse(val) : val as OutreachRecord
      }
    }

    return NextResponse.json({ records })
  } catch {
    return NextResponse.json({ records: {} })
  }
}

/** POST { contactId } — generate ekthesis token for a specific contact */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  const { contactId } = await req.json()
  const contact = PRESS_CONTACTS.find((c) => c.id === contactId)
  if (!contact) {
    return NextResponse.json({ error: 'contact not found' }, { status: 404 })
  }

  // Check existing record
  let record: OutreachRecord = { status: 'pending' }
  try {
    const existing = await kv.hget(KV_KEY, contactId) as string | OutreachRecord | null
    if (existing) {
      record = typeof existing === 'string' ? JSON.parse(existing) : existing
      // Already has a token — return it
      if (record.token) {
        return NextResponse.json({ token: record.token, generatedAt: record.generatedAt, existing: true })
      }
    }
  } catch {
    // proceed
  }

  // Generate new ekthesis token
  const token = generateToken()
  const now = new Date().toISOString().split('T')[0]
  record.token = token
  record.generatedAt = now

  // Save outreach record
  await kv.hset(KV_KEY, { [contactId]: JSON.stringify(record) })

  // Register as valid ekthesis gate token
  const meta = {
    token,
    gate: 'ekthesis',
    contact: `${contact.name} (${contact.outlet})`,
    created: now,
  }
  await kv.hset('gate:ekthesis', { [token]: JSON.stringify(meta) })

  return NextResponse.json({ token, generatedAt: now, existing: false }, { status: 201 })
}

/** PATCH { contactId, status } — update sent/bounced/opened status */
export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  const { contactId, status } = await req.json()
  if (!['pending', 'sent', 'bounced', 'opened'].includes(status)) {
    return NextResponse.json({ error: 'invalid status' }, { status: 400 })
  }

  try {
    const existing = await kv.hget(KV_KEY, contactId) as string | OutreachRecord | null
    const record: OutreachRecord = existing
      ? (typeof existing === 'string' ? JSON.parse(existing) : existing)
      : { status: 'pending' }

    record.status = status
    await kv.hset(KV_KEY, { [contactId]: JSON.stringify(record) })
    return NextResponse.json({ record })
  } catch {
    return NextResponse.json({ error: 'kv error' }, { status: 500 })
  }
}

/** DELETE { contactId } — revoke ekthesis token for a contact */
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  const { contactId } = await req.json()

  try {
    const existing = await kv.hget(KV_KEY, contactId) as string | OutreachRecord | null
    if (existing) {
      const record: OutreachRecord = typeof existing === 'string' ? JSON.parse(existing) : existing
      if (record.token) {
        await kv.hdel('gate:ekthesis', record.token)
      }
      delete record.token
      delete record.generatedAt
      await kv.hset(KV_KEY, { [contactId]: JSON.stringify(record) })
    }
    return NextResponse.json({ revoked: true })
  } catch {
    return NextResponse.json({ error: 'kv error' }, { status: 500 })
  }
}
