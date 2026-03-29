'use client'

import { useState, useEffect, useCallback } from 'react'

type TokenMeta = {
  token: string
  gate: 'ekthesis' | 'brief' | 'site'
  contact: string
  created: string
}

const GATES = ['ekthesis', 'brief', 'site'] as const
const BASE_URLS: Record<string, string> = {
  ekthesis: 'https://atnocost.cc/ekthesis?token=',
  brief: 'https://atnocost.cc/brief?token=',
  site: 'https://atnocost.cc/?token=',
}

export default function TokensPage() {
  const [gate, setGate] = useState<'ekthesis' | 'brief' | 'site'>('ekthesis')
  const [tokens, setTokens] = useState<TokenMeta[]>([])
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const fetchTokens = useCallback(async () => {
    const res = await fetch(`/api/tokens?gate=${gate}`)
    if (res.ok) {
      const data = await res.json()
      setTokens(data.tokens)
    }
  }, [gate])

  useEffect(() => {
    fetchTokens()
  }, [fetchTokens])

  async function create() {
    if (!contact.trim()) return
    setLoading(true)
    const res = await fetch('/api/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gate, contact: contact.trim() }),
    })
    if (res.ok) {
      setContact('')
      fetchTokens()
    }
    setLoading(false)
  }

  async function revoke(token: string) {
    await fetch('/api/tokens', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gate, token }),
    })
    fetchTokens()
  }

  function copyUrl(token: string) {
    navigator.clipboard.writeText(BASE_URLS[gate] + token)
    setCopied(token)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 max-w-3xl mx-auto">
      <p className="text-[8px] tracking-[0.3em] uppercase text-white/25 mb-2">Internal</p>
      <h1 className="text-2xl font-light tracking-wide mb-8">Token Generator</h1>

      {/* Gate selector */}
      <div className="flex gap-2 mb-8">
        {GATES.map((g) => (
          <button
            key={g}
            onClick={() => setGate(g)}
            className={`text-[10px] tracking-[0.12em] uppercase px-4 py-2 rounded-[2px] border transition-colors ${
              gate === g
                ? 'border-white/30 text-white/80'
                : 'border-white/10 text-white/30 hover:text-white/50'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Create */}
      <div className="flex gap-3 mb-10">
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && create()}
          placeholder="Contact name (e.g. Alphonse Pierre)"
          className="flex-1 bg-white/5 border border-white/10 rounded-[2px] px-3 py-2 text-[12px] text-white/80 placeholder:text-white/20 outline-none focus:border-white/25"
        />
        <button
          onClick={create}
          disabled={loading || !contact.trim()}
          className="text-[10px] tracking-[0.12em] uppercase px-5 py-2 border border-white/20 rounded-[2px] text-white/60 hover:text-white/80 hover:border-white/30 transition-colors disabled:opacity-30"
        >
          Generate
        </button>
      </div>

      {/* Token list */}
      <p className="text-[8px] tracking-[0.2em] uppercase text-white/25 mb-4">
        Active Tokens &middot; {gate} &middot; {tokens.length}
      </p>

      <div className="flex flex-col gap-2">
        {tokens.length === 0 && (
          <p className="text-[11px] text-white/20">No tokens yet. Generate one above.</p>
        )}
        {tokens.map((t) => (
          <div
            key={t.token}
            className="flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-[4px] px-4 py-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-white/70 truncate">{t.contact}</p>
              <p className="text-[10px] text-white/25 font-mono mt-0.5">{t.token} &middot; {t.created}</p>
            </div>
            <button
              onClick={() => copyUrl(t.token)}
              className="text-[9px] tracking-[0.1em] uppercase text-white/30 hover:text-white/60 transition-colors shrink-0"
            >
              {copied === t.token ? 'copied' : 'copy url'}
            </button>
            <button
              onClick={() => revoke(t.token)}
              className="text-[9px] tracking-[0.1em] uppercase text-red-400/50 hover:text-red-400/80 transition-colors shrink-0"
            >
              revoke
            </button>
          </div>
        ))}
      </div>

      {/* URL preview */}
      <div className="mt-10 pt-6 border-t border-white/6">
        <p className="text-[8px] tracking-[0.2em] uppercase text-white/20 mb-2">URL Format</p>
        <p className="text-[11px] text-white/30 font-mono">
          {BASE_URLS[gate]}{'<token>'}
        </p>
      </div>
    </div>
  )
}
