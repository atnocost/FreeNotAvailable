import { NextRequest, NextResponse } from 'next/server'
import { createToken, listTokens, revokeToken } from '@/lib/tokens'

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
}

function checkAuth(req: NextRequest): boolean {
  const token = req.cookies.get('internal_auth')?.value
  const valid = process.env.INTERNAL_AUTH_TOKEN
  return Boolean(valid && token === valid)
}

/** GET /api/tokens?gate=ekthesis */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  const gate = req.nextUrl.searchParams.get('gate') as 'ekthesis' | 'brief'
  if (!gate || !['ekthesis', 'brief'].includes(gate)) {
    return NextResponse.json({ error: 'gate must be ekthesis or brief' }, { status: 400 })
  }

  const tokens = await listTokens(gate)
  return NextResponse.json({ gate, tokens })
}

/** POST /api/tokens { gate, contact } */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  const body = await req.json()
  const { gate, contact } = body

  if (!gate || !['ekthesis', 'brief'].includes(gate)) {
    return NextResponse.json({ error: 'gate must be ekthesis or brief' }, { status: 400 })
  }
  if (!contact || typeof contact !== 'string') {
    return NextResponse.json({ error: 'contact name required' }, { status: 400 })
  }

  const token = await createToken(gate, contact.trim())
  return NextResponse.json(token, { status: 201 })
}

/** DELETE /api/tokens { gate, token } */
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized()

  const body = await req.json()
  const { gate, token } = body

  if (!gate || !['ekthesis', 'brief'].includes(gate)) {
    return NextResponse.json({ error: 'gate must be ekthesis or brief' }, { status: 400 })
  }
  if (!token) {
    return NextResponse.json({ error: 'token required' }, { status: 400 })
  }

  await revokeToken(gate, token)
  return NextResponse.json({ revoked: true })
}
