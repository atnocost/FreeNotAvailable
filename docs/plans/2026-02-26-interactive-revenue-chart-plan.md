# Interactive Revenue Path Chart Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static Year 1 / Year 2-3 projection tables in ekthesis Section 12 with an interactive revenue chart featuring global scenario selector, per-stream overrides, animated bars, and spring-physics total counter.

**Architecture:** Single `'use client'` React component (`RevenueChart.tsx`) using `useState` for scenario/override state, CSS transitions for bar animations, and `motion`'s `useSpring`/`useMotionValue` for the animated total counter. No new dependencies. Data hardcoded as typed numeric constants (extracted from the existing string-based `RevenueTable.tsx` data).

**Tech Stack:** Next.js 16.1, React 19.1, TypeScript 5.9, Tailwind CSS v4, motion@12.6 (already in project)

---

### Task 1: Create RevenueChart component with data and state

**Files:**
- Create: `app/ekthesis/RevenueChart.tsx`

**Step 1: Create the component file with data model and basic state**

```tsx
'use client'

import { useState, useMemo } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react'

/* ─── Types ─── */
type Scenario = 'conservative' | 'base' | 'aggressive'
type YearPeriod = 'year1' | 'year23'

interface StreamData {
  conservative: number
  base: number
  aggressive: number
}

/* ─── Revenue data (numeric, extracted from RevenueTable.tsx) ─── */
const REVENUE: Record<YearPeriod, Record<string, StreamData>> = {
  year1: {
    'Streaming':       { conservative: 500,   base: 2000,   aggressive: 8000 },
    'YouTube ad rev':  { conservative: 200,   base: 1000,   aggressive: 5000 },
    'Short-form video':{ conservative: 50,    base: 200,    aggressive: 1000 },
    'Merch sales':     { conservative: 500,   base: 2500,   aggressive: 10000 },
    'Live performance':{ conservative: 1000,  base: 5000,   aggressive: 15000 },
    'Sync licensing':  { conservative: 0,     base: 2500,   aggressive: 10000 },
    'Brand deals':     { conservative: 0,     base: 1500,   aggressive: 5000 },
    'Patreon / direct':{ conservative: 200,   base: 1000,   aggressive: 4000 },
  },
  year23: {
    'Streaming':       { conservative: 2000,  base: 10000,  aggressive: 50000 },
    'YouTube ad rev':  { conservative: 1000,  base: 5000,   aggressive: 25000 },
    'Short-form video':{ conservative: 200,   base: 1000,   aggressive: 5000 },
    'Merch (IP-driven)':{ conservative: 2000, base: 10000,  aggressive: 40000 },
    'Live performance':{ conservative: 5000,  base: 20000,  aggressive: 75000 },
    'Sync licensing':  { conservative: 2000,  base: 10000,  aggressive: 50000 },
    'Brand deals':     { conservative: 2000,  base: 10000,  aggressive: 50000 },
    'Patreon / direct':{ conservative: 1000,  base: 5000,   aggressive: 20000 },
    'Film festival':   { conservative: 500,   base: 2000,   aggressive: 10000 },
  },
}

const SCENARIO_LABELS: Record<Scenario, string> = {
  conservative: 'Con',
  base: 'Base',
  aggressive: 'Aggr',
}

const SCENARIOS: Scenario[] = ['conservative', 'base', 'aggressive']

export default function RevenueChart() {
  const [year, setYear] = useState<YearPeriod>('year23')
  const [global, setGlobal] = useState<Scenario>('base')
  const [overrides, setOverrides] = useState<Record<string, Scenario | null>>({})

  const streams = REVENUE[year]
  const streamNames = Object.keys(streams)

  // Compute each stream's active value
  const values = useMemo(() => {
    const result: Record<string, number> = {}
    for (const name of streamNames) {
      const scenario = overrides[name] ?? global
      result[name] = streams[name][scenario]
    }
    return result
  }, [year, global, overrides, streamNames, streams])

  // Sort streams by value descending
  const sorted = useMemo(
    () => [...streamNames].sort((a, b) => values[b] - values[a]),
    [streamNames, values]
  )

  const total = useMemo(
    () => Object.values(values).reduce((sum, v) => sum + v, 0),
    [values]
  )

  const maxValue = useMemo(
    () => Math.max(...Object.values(values), 1),
    [values]
  )

  // Per-stream override cycle: null -> conservative -> base -> aggressive -> null
  function cycleOverride(name: string) {
    setOverrides((prev) => {
      const current = prev[name] ?? null
      const cycle: (Scenario | null)[] = [null, 'conservative', 'base', 'aggressive']
      const idx = cycle.indexOf(current)
      const next = cycle[(idx + 1) % cycle.length]
      return { ...prev, [name]: next }
    })
  }

  // Reset overrides when switching year or global scenario
  function handleYearChange(y: YearPeriod) {
    setYear(y)
    setOverrides({})
  }

  return (
    <div className="space-y-8">
      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Year toggle */}
        <div className="flex border border-white/10" role="radiogroup" aria-label="Year period">
          {(['year1', 'year23'] as YearPeriod[]).map((y) => (
            <button
              key={y}
              role="radio"
              aria-checked={year === y}
              onClick={() => handleYearChange(y)}
              className={`px-4 py-2 text-xs font-sans tracking-[0.12em] uppercase transition-colors duration-200 ${
                year === y
                  ? 'bg-white/10 text-heading'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              {y === 'year1' ? 'Year 1' : 'Year 2-3'}
            </button>
          ))}
        </div>

        {/* Global scenario toggle */}
        <div className="flex border border-white/10" role="radiogroup" aria-label="Scenario">
          {SCENARIOS.map((s) => (
            <button
              key={s}
              role="radio"
              aria-checked={global === s}
              onClick={() => setGlobal(s)}
              className={`px-4 py-2 text-xs font-sans tracking-[0.12em] uppercase transition-colors duration-200 ${
                global === s
                  ? s === 'aggressive'
                    ? 'bg-accent/15 text-accent'
                    : 'bg-white/10 text-heading'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              {SCENARIO_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Animated total */}
      <AnimatedTotal value={total} scenario={global} />

      {/* Bar chart */}
      <div
        className="space-y-1"
        role="img"
        aria-label={`Revenue projection: ${formatCurrency(total)} total in ${year === 'year1' ? 'Year 1' : 'Year 2-3'}, ${global} scenario`}
      >
        {sorted.map((name, i) => {
          const value = values[name]
          const pct = maxValue > 0 ? (value / maxValue) * 100 : 0
          const override = overrides[name] ?? null
          const activeScenario = override ?? global

          return (
            <div
              key={name}
              className="group grid items-center gap-3"
              style={{
                gridTemplateColumns: 'minmax(100px, 140px) 1fr auto auto',
                transitionProperty: 'transform',
                transitionDuration: '0.5s',
                transitionTimingFunction: 'var(--ease-out-expo)',
              }}
            >
              {/* Stream name */}
              <span className="font-sans text-xs text-muted truncate">{name}</span>

              {/* Bar */}
              <div className="h-7 relative bg-white/[0.03] overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                    activeScenario === 'aggressive'
                      ? 'bg-accent/70'
                      : activeScenario === 'base'
                        ? 'bg-white/25'
                        : 'bg-white/10'
                  }`}
                  style={{
                    width: `${Math.max(pct, 1)}%`,
                    transitionTimingFunction: 'var(--ease-out-expo)',
                  }}
                />
              </div>

              {/* Value */}
              <span
                className={`font-mono text-xs text-right min-w-[70px] tabular-nums ${
                  activeScenario === 'aggressive' ? 'text-accent' : activeScenario === 'base' ? 'text-heading' : 'text-white/40'
                }`}
              >
                {formatCurrency(value)}
              </span>

              {/* Override dots */}
              <div className="flex gap-1 items-center">
                {SCENARIOS.map((s) => {
                  const isActive = override === s
                  const isGlobalMatch = override === null && global === s
                  return (
                    <button
                      key={s}
                      onClick={() => cycleOverride(name)}
                      aria-label={`${name}: ${override ? `override ${override}` : `following global (${global})`}`}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        isActive
                          ? s === 'aggressive'
                            ? 'bg-accent'
                            : s === 'base'
                              ? 'bg-white/60'
                              : 'bg-white/30'
                          : isGlobalMatch
                            ? 'bg-white/15'
                            : 'bg-white/[0.06]'
                      }`}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] font-mono text-white/20">
        <span>Dots: click stream name to override scenario</span>
        <span>Filled dot = active scenario</span>
      </div>
    </div>
  )
}

/* ─── Animated total counter ─── */
function AnimatedTotal({ value, scenario }: { value: number; scenario: Scenario }) {
  const motionValue = useMotionValue(value)
  const spring = useSpring(motionValue, { stiffness: 100, damping: 30 })

  // Update the motion value when the target changes
  useMemo(() => {
    motionValue.set(value)
  }, [value, motionValue])

  return (
    <div>
      <motion.span
        className={`font-display text-5xl md:text-6xl lg:text-7xl tabular-nums block leading-none ${
          scenario === 'aggressive' ? 'text-accent' : 'text-heading'
        }`}
      >
        <SpringNumber spring={spring} />
      </motion.span>
      <span className="font-sans text-xs text-white/30 mt-2 block tracking-[0.1em] uppercase">
        projected annual revenue
      </span>
    </div>
  )
}

/* ─── Spring-driven number display ─── */
function SpringNumber({ spring }: { spring: ReturnType<typeof useSpring> }) {
  const display = useTransform(spring, (v) => formatCurrency(Math.round(v)))
  return <motion.span>{display}</motion.span>
}

/* ─── Currency formatter ─── */
function formatCurrency(n: number): string {
  if (n >= 1000) {
    return '$' + n.toLocaleString('en-US')
  }
  return '$' + n
}
```

**Step 2: Verify the file compiles**

Run: `cd /Users/damon/free-not-available && npx next build --no-lint 2>&1 | tail -20`

Or start the dev server: `npm run dev` and check the console for TypeScript errors.

---

### Task 2: Wire RevenueChart into ekthesis page

**Files:**
- Modify: `app/ekthesis/page.tsx` (lines 9, 734-737)

**Step 1: Add import**

At line 9 of `app/ekthesis/page.tsx`, replace:
```tsx
import { StreamingRatesTable, SyncRangesTable, Year1Projections, Year23Projections } from './RevenueTable'
```
with:
```tsx
import { StreamingRatesTable, SyncRangesTable } from './RevenueTable'
import RevenueChart from './RevenueChart'
```

**Step 2: Replace projection tables with chart**

At lines 734-737 of `app/ekthesis/page.tsx`, replace:
```tsx
        <motion.div variants={fadeUp} custom={2}>
          <Year1Projections />
          <Year23Projections />
        </motion.div>
```
with:
```tsx
        <motion.div variants={fadeUp} custom={2}>
          <RevenueChart />
        </motion.div>
```

**Step 3: Verify in browser**

Run: `npm run dev`
Navigate to: `http://localhost:3000/ekthesis`
Scroll to Section 12 "Revenue Path" — should see interactive chart instead of static tables.

Verify:
- Year toggle switches datasets
- Global scenario toggle changes all bars
- Override dots cycle per-stream scenarios
- Total counter animates with spring physics
- Bars animate smoothly with expo easing
- Bars re-sort by value on scenario change

---

### Task 3: Clean up unused exports from RevenueTable

**Files:**
- Modify: `app/ekthesis/RevenueTable.tsx` (lines 147-165, 167-180)

**Step 1: Remove Year1Projections and Year23Projections exports**

Delete the `Year1Projections` and `Year23Projections` export functions (lines 147-165).

Update the default export (lines 167-180) to only render `StreamingRatesTable` and `SyncRangesTable`:

```tsx
export default function RevenueTable() {
  return (
    <div>
      <StreamingRatesTable />
      <SyncRangesTable />
      <p className="font-mono text-[10px] text-white/20 mt-4">
        All projections are modeled estimates. Sources: Spotify Loud &amp; Clear 2024, IFPI 2024, RIAA 2024, industry benchmarks.
        Actual results depend on release cadence, audience growth, and market conditions.
      </p>
    </div>
  )
}
```

Also remove the `year1` and `year23` data arrays and the `ProjectionTable` component if they are no longer used by any other export.

**Step 2: Verify nothing broke**

Run: `npm run dev`
Navigate to `http://localhost:3000/ekthesis` — verify Monetization section still shows streaming rates and sync ranges, and Revenue Path section shows the interactive chart.

---

### Task 4: Responsive polish and reduced-motion support

**Files:**
- Modify: `app/ekthesis/RevenueChart.tsx`

**Step 1: Add mobile responsive adjustments**

Update the bar grid to stack on small screens. Change the grid template:

```tsx
style={{
  gridTemplateColumns: 'minmax(100px, 140px) 1fr auto auto',
}}
```

Add a wrapping div with responsive behavior — on mobile (<640px), the stream name sits above the bar instead of beside it.

**Step 2: Verify reduced-motion**

The existing `globals.css` handles `prefers-reduced-motion` globally, setting all transition durations to 0.01ms. Verify the chart still functions (values update, just instantly).

---

### Task 5: Final verification and commit

**Step 1: Full page test**

Run: `npm run dev`
Test the full ekthesis page flow:
- All 12 sections render
- Revenue Path chart is interactive
- No console errors
- Mobile viewport works
- Reduced motion works

**Step 2: Build check**

Run: `npx next build`
Ensure clean build with no errors.

**Step 3: Commit**

```bash
git add app/ekthesis/RevenueChart.tsx app/ekthesis/page.tsx app/ekthesis/RevenueTable.tsx
git commit -m "feat(ekthesis): replace static revenue tables with interactive chart

Interactive Revenue Path chart with global scenario selector (conservative/
base/aggressive), per-stream overrides, year toggle, animated horizontal
bars (CSS transitions), and spring-physics total counter. Zero new deps.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```
