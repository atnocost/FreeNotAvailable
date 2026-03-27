'use client'

import { useState, useEffect, useCallback } from 'react'
import { PRESS_CONTACTS, type PressContact } from '@/lib/press-contacts'

type OutreachRecord = {
  token?: string
  status: 'pending' | 'sent' | 'bounced' | 'opened'
  generatedAt?: string
}

type ConfirmState = {
  contact: PressContact
  body: string
  fromAddress: string
} | null

const TIER_LABELS: Record<number, string> = {
  0: 'VIP', 1: 'Tier 1', 2: 'Tier 2', 3: 'Tier 3', 4: 'Tier 4',
}
const TIER_NAMES: Record<number, string> = {
  0: 'VIP — First Access',
  1: 'Tier 1 — Major Press',
  2: 'Tier 2 — Mid Press',
  3: 'Tier 3 — Indie / Blogs',
  4: 'Tier 4 — Industry / A&R',
}
const TIER_COLORS: Record<number, string> = {
  0: 'rgba(255,215,0,0.7)',
  1: 'rgba(255,255,255,0.6)',
  2: 'rgba(255,255,255,0.4)',
  3: 'rgba(255,255,255,0.3)',
  4: 'rgba(100,180,255,0.5)',
}
const STATUS_STYLES: Record<string, string> = {
  pending: 'text-white/30 border-white/10',
  sent: 'text-green-400/80 border-green-400/30',
  bounced: 'text-red-400/80 border-red-400/30',
  opened: 'text-blue-400/80 border-blue-400/30',
}

export default function OutreachPage() {
  const [records, setRecords] = useState<Record<string, OutreachRecord>>({})
  const [filter, setFilter] = useState<'all' | 0 | 1 | 2 | 3 | 4 | 'pending' | 'sent'>('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [attaching, setAttaching] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState>(null)
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null)

  const fetchRecords = useCallback(async () => {
    const res = await fetch('/api/outreach')
    if (res.ok) {
      const data = await res.json()
      setRecords(data.records)
    }
  }, [])

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  async function updateStatus(contactId: string, status: string) {
    setRecords((prev) => ({
      ...prev,
      [contactId]: { ...prev[contactId], status: status as OutreachRecord['status'] },
    }))
    await fetch('/api/outreach', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId, status }),
    })
  }

  async function attachEkthesis(contactId: string) {
    setAttaching(contactId)
    const res = await fetch('/api/outreach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId }),
    })
    if (res.ok) {
      const data = await res.json()
      setRecords((prev) => ({
        ...prev,
        [contactId]: { ...prev[contactId], token: data.token, generatedAt: data.generatedAt },
      }))
    }
    setAttaching(null)
  }

  async function revokeEkthesis(contactId: string) {
    await fetch('/api/outreach', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId }),
    })
    setRecords((prev) => {
      const next = { ...prev }
      if (next[contactId]) {
        delete next[contactId].token
        delete next[contactId].generatedAt
      }
      return next
    })
  }

  function getEmailBody(contact: PressContact) {
    let body = contact.body
    const record = records[contact.id]
    if (record?.token) {
      body = body.replace(
        'https://atnocost.cc/epk',
        `https://atnocost.cc/epk\nEkthesis (full deck): https://atnocost.cc/ekthesis?token=${record.token}`
      )
    }
    return body
  }

  function getFromAddress(contact: PressContact) {
    return contact.tier <= 3 ? 'free@atnocost.cc' : 'freeisavailable@atnocost.cc'
  }

  function requestSend(contact: PressContact) {
    const body = getEmailBody(contact)
    const fromAddress = getFromAddress(contact)
    setConfirm({ contact, body, fromAddress })
    setSendResult(null)
  }

  async function confirmSend() {
    if (!confirm) return
    setSending(true)
    setSendResult(null)

    const res = await fetch('/api/outreach/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contactId: confirm.contact.id,
        body: confirm.body,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setSendResult({ success: true, message: `Sent to ${confirm.contact.emails.join(', ')}` })
      setRecords((prev) => ({
        ...prev,
        [confirm.contact.id]: {
          ...prev[confirm.contact.id],
          status: 'sent',
        },
      }))
    } else {
      setSendResult({ success: false, message: data.error || 'Send failed' })
    }

    setSending(false)
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  // Filter
  const filtered = PRESS_CONTACTS.filter((c) => {
    if (filter === 'pending') {
      const r = records[c.id]
      return !r || r.status === 'pending'
    }
    if (filter === 'sent') return records[c.id]?.status === 'sent'
    if (filter !== 'all') return c.tier === filter
    return true
  }).filter((c) => {
    if (!search) return true
    const s = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(s) ||
      c.outlet.toLowerCase().includes(s) ||
      c.beat.toLowerCase().includes(s) ||
      c.emails.some((e) => e.toLowerCase().includes(s))
    )
  })

  // Stats
  const totalSent = Object.values(records).filter((r) => r.status === 'sent').length
  const totalBounced = Object.values(records).filter((r) => r.status === 'bounced').length
  const withEkthesis = Object.values(records).filter((r) => r.token).length
  const t1Sent = PRESS_CONTACTS.filter((c) => c.tier <= 1 && records[c.id]?.status === 'sent').length

  const tiers = [0, 1, 2, 3, 4] as const

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Confirmation Modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-white/10 rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="px-5 py-4 border-b border-white/8">
              <p className="text-[8px] tracking-[0.2em] uppercase text-white/25 mb-2">
                Confirm Send
              </p>
              <p className="text-[13px] font-medium">{confirm.contact.name}</p>
              <p className="text-[10px] text-white/35">{confirm.contact.outlet}</p>
            </div>

            <div className="px-5 py-4 space-y-3">
              {/* From */}
              <div>
                <span className="text-[8px] tracking-[0.12em] uppercase text-white/25 block mb-1">From</span>
                <span className="text-[11px] font-mono text-white/60">{confirm.fromAddress}</span>
              </div>

              {/* To */}
              <div>
                <span className="text-[8px] tracking-[0.12em] uppercase text-white/25 block mb-1">To</span>
                <div className="flex gap-1.5 flex-wrap">
                  {confirm.contact.emails.map((e) => (
                    <span key={e} className="text-[11px] font-mono text-white/60">{e}</span>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <span className="text-[8px] tracking-[0.12em] uppercase text-white/25 block mb-1">Subject</span>
                <span className="text-[11px] text-white/70">{confirm.contact.subject}</span>
              </div>

              {/* Body */}
              <div>
                <span className="text-[8px] tracking-[0.12em] uppercase text-white/25 block mb-1">Body</span>
                <div className="bg-black/40 border border-white/6 rounded px-3 py-3 max-h-48 overflow-y-auto">
                  <pre className="text-[10px] text-white/50 whitespace-pre-wrap font-sans leading-[1.7]">
                    {confirm.body}
                  </pre>
                </div>
              </div>

              {/* Result */}
              {sendResult && (
                <div
                  className={`rounded px-3 py-2 text-[11px] ${
                    sendResult.success
                      ? 'bg-green-400/10 border border-green-400/20 text-green-400/80'
                      : 'bg-red-400/10 border border-red-400/20 text-red-400/80'
                  }`}
                >
                  {sendResult.message}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-5 py-4 border-t border-white/8 flex gap-3">
              {!sendResult?.success ? (
                <>
                  <button
                    onClick={confirmSend}
                    disabled={sending}
                    className="text-[10px] tracking-[0.1em] uppercase px-5 py-2 bg-white/10 border border-white/20 rounded text-white/80 hover:bg-white/15 transition-colors disabled:opacity-30"
                  >
                    {sending ? 'Sending...' : 'Send Email'}
                  </button>
                  <button
                    onClick={() => { setConfirm(null); setSendResult(null) }}
                    className="text-[10px] tracking-[0.1em] uppercase px-5 py-2 border border-white/10 rounded text-white/30 hover:text-white/50 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setConfirm(null); setSendResult(null) }}
                  className="text-[10px] tracking-[0.1em] uppercase px-5 py-2 border border-white/10 rounded text-white/40 hover:text-white/60 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-white/8 px-6 md:px-10 py-6 max-w-5xl mx-auto">
        <p className="text-[8px] tracking-[0.3em] uppercase text-white/20 mb-2">Internal</p>
        <h1 className="text-2xl font-light tracking-wide mb-1">Press Outreach</h1>
        <p className="text-[10px] text-white/25 tracking-wide">
          SINE NOCTIS &middot; Spring 2026 &middot; {PRESS_CONTACTS.length} contacts &middot; EPK: atnocost.cc/epk
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-6">
        {/* Stats */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            [PRESS_CONTACTS.length, 'Total'],
            [totalSent, 'Sent'],
            [totalBounced, 'Bounced'],
            [t1Sent, 'T1 Sent'],
            [withEkthesis, 'w/ Ekthesis'],
          ].map(([n, label]) => (
            <div
              key={label as string}
              className="bg-white/[0.03] border border-white/8 rounded-md px-4 py-2.5 min-w-[70px]"
            >
              <div className="text-lg font-light">{n}</div>
              <div className="text-[8px] tracking-[0.12em] uppercase text-white/30">{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, outlet..."
            className="bg-white/[0.03] border border-white/10 rounded px-3 py-1.5 text-[11px] text-white/70 placeholder:text-white/20 outline-none focus:border-white/25 w-48"
          />
          {(
            [
              ['all', 'All'],
              [0, 'VIP'],
              [1, 'T1'],
              [2, 'T2'],
              [3, 'T3'],
              [4, 'T4'],
              ['pending', 'Pending'],
              ['sent', 'Sent'],
            ] as const
          ).map(([f, label]) => (
            <button
              key={String(f)}
              onClick={() => setFilter(f as typeof filter)}
              className={`text-[9px] tracking-[0.08em] uppercase px-3 py-1.5 rounded border transition-colors ${
                filter === f
                  ? 'border-white/25 text-white/70 bg-white/[0.05]'
                  : 'border-white/8 text-white/25 hover:text-white/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contact list */}
        {filter === 'all' && !search ? (
          tiers.map((tier) => {
            const tierContacts = filtered.filter((c) => c.tier === tier)
            if (tierContacts.length === 0) return null
            const tierSent = tierContacts.filter((c) => records[c.id]?.status === 'sent').length
            return (
              <div key={tier} className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase font-medium"
                    style={{ color: TIER_COLORS[tier] }}
                  >
                    {TIER_NAMES[tier]}
                  </span>
                  <span className="text-[9px] text-white/20">
                    {tierContacts.length} contacts &middot; {tierSent} sent
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {tierContacts.map((c) => (
                    <ContactCard
                      key={c.id}
                      contact={c}
                      record={records[c.id]}
                      isExpanded={expanded === c.id}
                      copied={copied}
                      attaching={attaching === c.id}
                      onToggle={() => setExpanded(expanded === c.id ? null : c.id)}
                      onUpdateStatus={(s) => updateStatus(c.id, s)}
                      onAttachEkthesis={() => attachEkthesis(c.id)}
                      onRevokeEkthesis={() => revokeEkthesis(c.id)}
                      onCopy={copyToClipboard}
                      onSend={() => requestSend(c)}
                      getEmailBody={() => getEmailBody(c)}
                      getFromAddress={() => getFromAddress(c)}
                    />
                  ))}
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex flex-col gap-1.5">
            {filtered.map((c) => (
              <ContactCard
                key={c.id}
                contact={c}
                record={records[c.id]}
                isExpanded={expanded === c.id}
                copied={copied}
                attaching={attaching === c.id}
                onToggle={() => setExpanded(expanded === c.id ? null : c.id)}
                onUpdateStatus={(s) => updateStatus(c.id, s)}
                onAttachEkthesis={() => attachEkthesis(c.id)}
                onRevokeEkthesis={() => revokeEkthesis(c.id)}
                onCopy={copyToClipboard}
                onSend={() => requestSend(c)}
                getEmailBody={() => getEmailBody(c)}
                getFromAddress={() => getFromAddress(c)}
              />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-[11px] text-white/20 py-10 text-center">No contacts match your filter.</p>
        )}
      </div>
    </div>
  )
}

function ContactCard({
  contact,
  record,
  isExpanded,
  copied,
  attaching,
  onToggle,
  onUpdateStatus,
  onAttachEkthesis,
  onRevokeEkthesis,
  onCopy,
  onSend,
  getEmailBody,
  getFromAddress,
}: {
  contact: PressContact
  record?: OutreachRecord
  isExpanded: boolean
  copied: string | null
  attaching: boolean
  onToggle: () => void
  onUpdateStatus: (status: string) => void
  onAttachEkthesis: () => void
  onRevokeEkthesis: () => void
  onCopy: (text: string, label: string) => void
  onSend: () => void
  getEmailBody: () => string
  getFromAddress: () => string
}) {
  const status = record?.status
  const hasEkthesis = Boolean(record?.token)
  const tierColor = TIER_COLORS[contact.tier]
  const emailBody = getEmailBody()
  const fromAddress = getFromAddress()
  const isSent = status === 'sent'

  return (
    <div
      className={`bg-white/[0.02] border rounded-md overflow-hidden transition-colors ${
        contact.tier === 0 ? 'border-yellow-500/20' : 'border-white/6'
      } ${isExpanded ? 'border-white/15' : ''}`}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={onToggle}
      >
        <span
          className="text-[8px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-sm border shrink-0"
          style={{ color: tierColor, borderColor: tierColor }}
        >
          {TIER_LABELS[contact.tier]}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-medium truncate">{contact.name}</div>
          <div className="text-[9px] text-white/30 truncate">
            {contact.outlet} &middot; {contact.beat}
          </div>
        </div>
        {hasEkthesis && (
          <span className="text-[8px] tracking-[0.08em] uppercase text-yellow-500/40 shrink-0">
            ekthesis
          </span>
        )}
        {status && (
          <span
            className={`text-[8px] tracking-[0.08em] uppercase px-2 py-0.5 border rounded-sm shrink-0 ${STATUS_STYLES[status]}`}
          >
            {status}
          </span>
        )}
        <span
          className={`text-[10px] text-white/25 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </div>

      {/* Expanded */}
      {isExpanded && (
        <div className="border-t border-white/6 px-4 py-4 bg-white/[0.01]">
          {/* From + Emails */}
          <div className="flex gap-6 mb-3">
            <div>
              <span className="text-[8px] tracking-[0.12em] uppercase text-white/25 block mb-1">From</span>
              <span className="text-[10px] font-mono text-white/40">{fromAddress}</span>
            </div>
            <div>
              <span className="text-[8px] tracking-[0.12em] uppercase text-white/25 block mb-1">To</span>
              <div className="flex gap-1.5 flex-wrap">
                {contact.emails.map((e) => (
                  <span
                    key={e}
                    className="text-[10px] font-mono bg-white/[0.04] border border-white/8 rounded px-2 py-0.5 text-white/50"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {contact.note && (
            <p className="text-[9px] text-yellow-500/40 mb-3">{contact.note}</p>
          )}

          {/* Subject */}
          <div className="bg-white/[0.03] border border-white/8 rounded px-3 py-2 mb-2 flex items-center gap-2">
            <span className="text-[11px] text-white/70 flex-1">{contact.subject}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCopy(contact.subject, `subj-${contact.id}`)
              }}
              className="text-[8px] tracking-[0.08em] uppercase text-white/30 hover:text-white/60 shrink-0"
            >
              {copied === `subj-${contact.id}` ? 'copied' : 'copy'}
            </button>
          </div>

          {/* Body */}
          <div className="bg-white/[0.03] border border-white/8 rounded px-3 py-3 mb-3">
            <pre className="text-[10px] text-white/55 whitespace-pre-wrap font-sans leading-[1.7]">
              {emailBody}
            </pre>
          </div>

          {/* Ekthesis attachment */}
          {hasEkthesis && (
            <div className="bg-yellow-500/[0.04] border border-yellow-500/15 rounded px-3 py-2 mb-3 flex items-center gap-2">
              <span className="text-[8px] tracking-[0.1em] uppercase text-yellow-500/50">
                Ekthesis attached
              </span>
              <span className="text-[10px] font-mono text-yellow-500/30 flex-1 truncate">
                atnocost.cc/ekthesis?token={record?.token}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onCopy(`https://atnocost.cc/ekthesis?token=${record?.token}`, `ek-${contact.id}`)
                }}
                className="text-[8px] tracking-[0.08em] uppercase text-yellow-500/40 hover:text-yellow-500/60 shrink-0"
              >
                {copied === `ek-${contact.id}` ? 'copied' : 'copy link'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRevokeEkthesis()
                }}
                className="text-[8px] tracking-[0.08em] uppercase text-red-400/40 hover:text-red-400/60 shrink-0"
              >
                revoke
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            {/* Send button — primary action */}
            {!isSent ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSend()
                }}
                className="text-[9px] tracking-[0.1em] uppercase px-4 py-1.5 bg-white/10 border border-white/25 rounded text-white/80 hover:bg-white/15 transition-colors"
              >
                Send
              </button>
            ) : (
              <span className="text-[9px] tracking-[0.08em] uppercase px-4 py-1.5 border border-green-400/20 rounded text-green-400/50">
                Sent
              </span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation()
                onCopy(emailBody, `body-${contact.id}`)
              }}
              className="text-[9px] tracking-[0.08em] uppercase px-3 py-1.5 border border-white/15 rounded text-white/40 hover:text-white/60 transition-colors"
            >
              {copied === `body-${contact.id}` ? 'copied' : 'copy body'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCopy(contact.subject + '\n\n' + emailBody, `all-${contact.id}`)
              }}
              className="text-[9px] tracking-[0.08em] uppercase px-3 py-1.5 border border-white/15 rounded text-white/40 hover:text-white/60 transition-colors"
            >
              {copied === `all-${contact.id}` ? 'copied' : 'copy all'}
            </button>
            {!hasEkthesis && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAttachEkthesis()
                }}
                disabled={attaching}
                className="text-[9px] tracking-[0.08em] uppercase px-3 py-1.5 border border-yellow-500/20 rounded text-yellow-500/40 hover:text-yellow-500/60 transition-colors disabled:opacity-30"
              >
                {attaching ? 'generating...' : 'attach ekthesis'}
              </button>
            )}
            {isSent && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onUpdateStatus('pending')
                }}
                className="text-[9px] tracking-[0.08em] uppercase px-3 py-1.5 border border-white/10 rounded text-white/25 hover:text-white/40 transition-colors"
              >
                undo sent
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onUpdateStatus('bounced')
              }}
              className="text-[9px] tracking-[0.08em] uppercase px-3 py-1.5 border border-red-400/15 rounded text-red-400/30 hover:text-red-400/50 transition-colors"
            >
              bounced
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
