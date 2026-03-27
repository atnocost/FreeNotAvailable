import { kv } from '@vercel/kv'

export type TokenMeta = {
  token: string
  gate: 'ekthesis' | 'brief'
  contact: string
  created: string
}

/**
 * Check if a token is valid for a given gate.
 * Falls back to env vars if KV is not configured.
 */
export async function isValidToken(gate: 'ekthesis' | 'brief', token: string): Promise<boolean> {
  try {
    const exists = await kv.hexists(`gate:${gate}`, token)
    if (exists) return true
  } catch {
    // KV not configured — fall through to env vars
  }

  // Fallback: check env vars
  const envKey = gate === 'ekthesis' ? 'EKTHESIS_TOKENS' : 'BRIEF_TOKENS'
  const envTokens = new Set(
    (process.env[envKey] ?? '').split(',').map((t) => t.trim()).filter(Boolean)
  )
  return envTokens.has(token)
}

/** Generate a random token */
export function generateToken(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789'
  let token = ''
  for (let i = 0; i < 12; i++) {
    token += chars[Math.floor(Math.random() * chars.length)]
  }
  return token
}

/** Create a token for a gate */
export async function createToken(gate: 'ekthesis' | 'brief', contact: string): Promise<TokenMeta> {
  const token = generateToken()
  const meta: TokenMeta = { token, gate, contact, created: new Date().toISOString().split('T')[0] }

  await kv.hset(`gate:${gate}`, { [token]: JSON.stringify(meta) })
  return meta
}

/** List all tokens for a gate */
export async function listTokens(gate: 'ekthesis' | 'brief'): Promise<TokenMeta[]> {
  const data = await kv.hgetall(`gate:${gate}`) as Record<string, string> | null
  if (!data) return []

  return Object.values(data).map((v) => {
    if (typeof v === 'string') return JSON.parse(v)
    return v
  })
}

/** Revoke a token */
export async function revokeToken(gate: 'ekthesis' | 'brief', token: string): Promise<void> {
  await kv.hdel(`gate:${gate}`, token)
}
