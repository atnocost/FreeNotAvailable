'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { motion, useSpring, useTransform, useMotionValue, useReducedMotion } from 'motion/react'

/* ─── Types ─── */
type Scenario = 'conservative' | 'base' | 'aggressive'
type YearPeriod = 'year1' | 'year23'

interface StreamData {
  conservative: number
  base: number
  aggressive: number
}

/* ─── Revenue data (numeric, from RevenueTable.tsx) ─── */
const REVENUE: Record<YearPeriod, Record<string, StreamData>> = {
  year1: {
    'Streaming':        { conservative: 500,   base: 2000,   aggressive: 8000 },
    'YouTube ad rev':   { conservative: 200,   base: 1000,   aggressive: 5000 },
    'Short-form video': { conservative: 50,    base: 200,    aggressive: 1000 },
    'Merch sales':      { conservative: 500,   base: 2500,   aggressive: 10000 },
    'Live performance': { conservative: 1000,  base: 5000,   aggressive: 15000 },
    'Sync licensing':   { conservative: 0,     base: 2500,   aggressive: 10000 },
    'Brand deals':      { conservative: 0,     base: 1500,   aggressive: 5000 },
    'Patreon / direct': { conservative: 200,   base: 1000,   aggressive: 4000 },
    'Physical / vinyl': { conservative: 0,     base: 1500,   aggressive: 5000 },
  },
  year23: {
    'Streaming':        { conservative: 2000,  base: 10000,  aggressive: 50000 },
    'YouTube ad rev':   { conservative: 1000,  base: 5000,   aggressive: 25000 },
    'Short-form video': { conservative: 200,   base: 1000,   aggressive: 5000 },
    'Merch (IP-driven)':{ conservative: 2000,  base: 10000,  aggressive: 40000 },
    'Live performance': { conservative: 5000,  base: 20000,  aggressive: 75000 },
    'Sync licensing':   { conservative: 2000,  base: 10000,  aggressive: 50000 },
    'Brand deals':      { conservative: 2000,  base: 10000,  aggressive: 50000 },
    'Patreon / direct': { conservative: 1000,  base: 5000,   aggressive: 20000 },
    'Film festival':    { conservative: 500,   base: 2000,   aggressive: 10000 },
    'Physical / vinyl': { conservative: 3000,  base: 15000,  aggressive: 50000 },
  },
}

const SCENARIOS: Scenario[] = ['conservative', 'base', 'aggressive']

const SCENARIO_LABELS: Record<Scenario, string> = {
  conservative: 'Conservative',
  base: 'Base',
  aggressive: 'Aggressive',
}

/* Short labels for override pill on tight layouts */
const SCENARIO_SHORT: Record<Scenario, string> = {
  conservative: 'Low',
  base: 'Mid',
  aggressive: 'High',
}

/* ─── Currency formatter ─── */
function fmt(n: number): string {
  if (n === 0) return '$0'
  return '$' + n.toLocaleString('en-US')
}

/* ─── Main component ─── */
export default function RevenueChart() {
  const [year, setYear] = useState<YearPeriod>('year23')
  const [scenario, setScenario] = useState<Scenario>('base')
  const [overrides, setOverrides] = useState<Record<string, Scenario | null>>({})
  const barListRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const streams = REVENUE[year]
  const streamNames = useMemo(() => Object.keys(streams), [year])

  /* Compute each stream's active scenario + value */
  const computed = useMemo(() => {
    const result: Record<string, { value: number; scenario: Scenario }> = {}
    for (const name of streamNames) {
      const sc = overrides[name] ?? scenario
      result[name] = { value: streams[name][sc], scenario: sc }
    }
    return result
  }, [streamNames, streams, scenario, overrides])

  /* Sort by value descending */
  const sorted = useMemo(
    () => [...streamNames].sort((a, b) => computed[b].value - computed[a].value),
    [streamNames, computed],
  )

  const total = useMemo(
    () => Object.values(computed).reduce((sum, { value }) => sum + value, 0),
    [computed],
  )

  const maxValue = useMemo(
    () => Math.max(...Object.values(computed).map(({ value }) => value), 1),
    [computed],
  )

  const hasAggressive = useMemo(
    () => streamNames.some((name) => (overrides[name] ?? scenario) === 'aggressive'),
    [streamNames, overrides, scenario],
  )

  const hasAnyOverride = useMemo(
    () => Object.values(overrides).some((v) => v !== null),
    [overrides],
  )

  /* Reset overrides on year change */
  const handleYearChange = useCallback((y: YearPeriod) => {
    setYear(y)
    setOverrides({})
  }, [])

  /* Cycle: null → conservative → base → aggressive → null */
  const cycleOverride = useCallback((name: string) => {
    setOverrides((prev) => {
      const current = prev[name] ?? null
      const cycle: (Scenario | null)[] = [null, 'conservative', 'base', 'aggressive']
      const idx = cycle.indexOf(current)
      const next = cycle[(idx + 1) % cycle.length]
      return { ...prev, [name]: next }
    })
  }, [])

  /* Arrow key navigation within bar list */
  const handleBarKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const buttons = barListRef.current?.querySelectorAll<HTMLButtonElement>('[data-bar-row]')
    if (!buttons) return
    const next = e.key === 'ArrowDown' ? idx + 1 : idx - 1
    const target = buttons[((next % buttons.length) + buttons.length) % buttons.length]
    target?.focus()
  }, [])

  return (
    <div className="space-y-10">
      {/* ── Controls ── */}
      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl
          label="Year period"
          options={[
            { key: 'year1' as YearPeriod, label: 'Year 1' },
            { key: 'year23' as YearPeriod, label: 'Year 2\u20133' },
          ]}
          value={year}
          onChange={handleYearChange}
        />

        <SegmentedControl
          label="Scenario"
          options={SCENARIOS.map((s) => ({ key: s, label: SCENARIO_LABELS[s] }))}
          value={scenario}
          onChange={setScenario}
          accentKey="aggressive"
        />

        {hasAnyOverride && (
          <button
            onClick={() => setOverrides({})}
            className="px-3 py-2 text-[10px] font-mono text-white/60 hover:text-white/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
          >
            Reset overrides
          </button>
        )}
      </div>

      {/* ── Animated total ── */}
      <AnimatedTotal value={total} hasAggressive={hasAggressive || scenario === 'aggressive'} />

      {/* ── Bar chart ── */}
      <div
        ref={barListRef}
        role="group"
        aria-orientation="vertical"
        className="space-y-px"
        aria-label="Revenue streams breakdown"
      >
        {sorted.map((name, idx) => {
          const { value, scenario: active } = computed[name]
          const pct = maxValue > 0 ? (value / maxValue) * 100 : 0
          const override = overrides[name] ?? null
          const isOverridden = override !== null
          const isZero = value === 0

          return (
            <motion.button
              key={name}
              data-bar-row
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => cycleOverride(name)}
              onKeyDown={(e) => handleBarKeyDown(e, idx)}
              className={`
                w-full group items-center gap-x-3 py-2 text-left
                duration-200 cursor-pointer
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:ring-inset
                hover:bg-white/[0.04]
                grid grid-cols-[minmax(90px,130px)_1fr_auto] sm:grid-cols-[minmax(90px,130px)_1fr_auto_auto]
                border-l-2 pl-2
                ${isOverridden ? 'border-l-accent/40' : 'border-l-transparent'}
              `}
              style={{ transition: 'background-color 0.15s ease, border-color 0.3s ease' }}
              aria-label={`${name}: ${fmt(value)}${isZero ? ' (none in this scenario)' : ''}, ${isOverridden ? `overridden to ${override}` : `following ${scenario}`}. Click to change scenario.`}
            >
              {/* Label */}
              <span className={`font-sans text-[11px] truncate leading-none transition-colors duration-200 ${isOverridden ? 'text-heading' : 'text-muted'}`}>
                {name}
              </span>

              {/* Bar */}
              <div className="h-8 relative bg-white/[0.04]">
                {isZero ? (
                  <span className="absolute inset-0 flex items-center pl-3 font-mono text-[10px] text-white/50">
                    {'\u2014'}
                  </span>
                ) : (
                  <>
                    <div
                      className={`absolute inset-y-0 left-0 ${barColor(active)}`}
                      style={{
                        width: `${Math.max(pct, 1.5)}%`,
                        transition: 'width 0.5s var(--ease-out-expo), background-color 0.3s ease',
                      }}
                    />
                    {/* Percentage — revealed on hover/focus */}
                    <span className="absolute inset-y-0 right-2 flex items-center font-mono text-[9px] text-white/0 group-hover:text-white/30 group-focus-visible:text-white/30 transition-colors duration-200 tabular-nums">
                      {total > 0 ? `${Math.round((value / total) * 100)}%` : ''}
                    </span>
                  </>
                )}
              </div>

              {/* Value */}
              <span className={`font-mono text-[11px] text-right min-w-[62px] tabular-nums leading-none transition-colors duration-200 ${isZero ? 'text-white/50' : valueColor(active)}`}>
                {fmt(value)}
              </span>

              {/* Override indicator — visible on sm+ */}
              <span className={`hidden sm:inline-flex text-[9px] font-mono tracking-wider uppercase min-w-[28px] justify-center transition-colors duration-200 ${
                isOverridden ? pillColor(active) : 'text-transparent'
              }`}>
                {isOverridden ? SCENARIO_SHORT[active] : '\u00A0'}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* ── Legend ── */}
      <p className="font-mono text-[10px] text-white/60">
        Click a row to adjust its projection independently.
      </p>
    </div>
  )
}

/* ─── Segmented control ─── */
function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  accentKey,
}: {
  label: string
  options: { key: T; label: string }[]
  value: T
  onChange: (v: T) => void
  accentKey?: T
}) {
  const groupRef = useRef<HTMLDivElement>(null)

  /* Arrow key navigation within radiogroup */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      const keys = ['ArrowRight', 'ArrowLeft']
      if (!keys.includes(e.key)) return
      e.preventDefault()
      const dir = e.key === 'ArrowRight' ? 1 : -1
      const next = (idx + dir + options.length) % options.length
      onChange(options[next].key)
      const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      buttons?.[next]?.focus()
    },
    [onChange, options],
  )

  return (
    <div ref={groupRef} className="flex border border-white/10" role="radiogroup" aria-label={label}>
      {options.map(({ key, label: text }, idx) => (
        <button
          key={key}
          role="radio"
          aria-checked={value === key}
          tabIndex={value === key ? 0 : -1}
          onClick={() => onChange(key)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className={`
            px-5 py-2.5 text-xs font-sans tracking-[0.12em] uppercase
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:ring-inset
            ${value === key
              ? key === accentKey
                ? 'bg-accent/15 text-accent'
                : 'bg-white/10 text-heading'
              : 'text-white/50 hover:text-white/70'
            }
          `}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

/* ─── Animated total counter ─── */
function AnimatedTotal({ value, hasAggressive }: { value: number; hasAggressive: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  const mv = useMotionValue(value)
  const spring = useSpring(mv, prefersReducedMotion
    ? { stiffness: 1000, damping: 100 }
    : { stiffness: 100, damping: 30 },
  )

  useEffect(() => {
    mv.set(value)
  }, [value, mv])

  const display = useTransform(spring, (v) => fmt(Math.round(v)))

  return (
    <div>
      <motion.span
        aria-hidden="true"
        className={`font-display text-5xl md:text-6xl lg:text-7xl tabular-nums block leading-none transition-colors duration-300 ${
          hasAggressive ? 'text-accent' : 'text-heading'
        }`}
      >
        {display}
      </motion.span>
      <span className="sr-only" aria-live="polite">
        {fmt(value)}
      </span>
      <span className="font-sans text-[11px] text-muted mt-2 block tracking-[0.12em] uppercase">
        projected annual revenue
      </span>
    </div>
  )
}

/* ─── Color helpers ─── */
function barColor(s: Scenario): string {
  switch (s) {
    case 'aggressive': return 'bg-accent/60'
    case 'base': return 'bg-white/20'
    case 'conservative': return 'bg-warm/12'
  }
}

function valueColor(s: Scenario): string {
  switch (s) {
    case 'aggressive': return 'text-accent'
    case 'base': return 'text-heading'
    case 'conservative': return 'text-warm/70'
  }
}

function pillColor(s: Scenario): string {
  switch (s) {
    case 'aggressive': return 'text-accent'
    case 'base': return 'text-heading/60'
    case 'conservative': return 'text-warm/50'
  }
}
