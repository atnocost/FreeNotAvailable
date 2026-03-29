import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    SITE_GATE_ENABLED: process.env.SITE_GATE_ENABLED,
    SITE_TOKENS: process.env.SITE_TOKENS,
  })
}
