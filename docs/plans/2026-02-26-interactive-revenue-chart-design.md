# Interactive Revenue Path Chart

**Date:** 2026-02-26
**Status:** Approved
**Scope:** Replace static Year 1 / Year 2-3 projection tables in ekthesis with an interactive chart

## Context

The ekthesis pitch deck (Section 12: Projections / Revenue Path) currently renders two static HTML tables showing 8-9 revenue streams across conservative / base / aggressive scenarios. The data is compelling but passive. An interactive chart lets viewers explore the revenue model and build conviction by seeing how different assumptions compound.

## Design Decisions

- **Approach:** Pure CSS bars + motion spring counter. Zero new dependencies.
- **Interaction model:** Global scenario selector + per-stream overrides + year toggle
- **Visual style:** Editorial continuum. Matches existing ekthesis dark palette.
- **Replaces:** `Year1Projections` and `Year23Projections` table components

## Component: `RevenueChart.tsx`

**Location:** `app/ekthesis/RevenueChart.tsx`

### Data Model

Revenue data parsed from existing `RevenueTable.tsx` string values into numeric form:

```typescript
type Scenario = 'conservative' | 'base' | 'aggressive'

interface StreamData {
  conservative: number
  base: number
  aggressive: number
}

const revenueData: Record<'year1' | 'year23', Record<string, StreamData>> = {
  year1: {
    'Streaming':      { conservative: 500,   base: 2000,   aggressive: 8000 },
    'YouTube ad rev': { conservative: 200,   base: 1000,   aggressive: 5000 },
    'Short-form video': { conservative: 50,  base: 200,    aggressive: 1000 },
    'Merch sales':    { conservative: 500,   base: 2500,   aggressive: 10000 },
    'Live performance': { conservative: 1000, base: 5000,  aggressive: 15000 },
    'Sync licensing': { conservative: 0,     base: 2500,   aggressive: 10000 },
    'Brand deals':    { conservative: 0,     base: 1500,   aggressive: 5000 },
    'Patreon / direct': { conservative: 200, base: 1000,   aggressive: 4000 },
  },
  year23: {
    'Streaming':           { conservative: 2000,  base: 10000, aggressive: 50000 },
    'YouTube ad rev':      { conservative: 1000,  base: 5000,  aggressive: 25000 },
    'Short-form video':    { conservative: 200,   base: 1000,  aggressive: 5000 },
    'Merch (IP-driven)':   { conservative: 2000,  base: 10000, aggressive: 40000 },
    'Live performance':    { conservative: 5000,  base: 20000, aggressive: 75000 },
    'Sync licensing':      { conservative: 2000,  base: 10000, aggressive: 50000 },
    'Brand deals':         { conservative: 2000,  base: 10000, aggressive: 50000 },
    'Patreon / direct':    { conservative: 1000,  base: 5000,  aggressive: 20000 },
    'Film festival':       { conservative: 500,   base: 2000,  aggressive: 10000 },
  },
}
```

### State

```typescript
const [yearPeriod, setYearPeriod] = useState<'year1' | 'year23'>('year23')
const [globalScenario, setGlobalScenario] = useState<Scenario>('base')
const [overrides, setOverrides] = useState<Record<string, Scenario | null>>({})
```

### Layout

```
┌──────────────────────────────────────────────────┐
│  ┌────────────┐  ┌─────────────────────────┐     │
│  │ Y1 │ Y2-3  │  │ CON  │ BASE │ AGGR     │     │
│  └────────────┘  └─────────────────────────┘     │
│                                                   │
│  $73,000                   (animated counter)     │
│  projected annual revenue  (muted label)          │
│                                                   │
│  Live ·····  ████████████████████  $20,000   ○○● │
│  Streaming · █████████████████     $10,000   ●○○ │
│  Sync ·····  █████████████████     $10,000   ○●○ │
│  Merch ····  █████████████████     $10,000   ●○○ │
│  Brand ····  █████████████████     $10,000   ○●○ │
│  YouTube ··  ██████████            $5,000    ●○○ │
│  Patreon ··  ██████████            $5,000    ●○○ │
│  Film Fest · ████                  $2,000    ●○○ │
│  Short-form  ██                    $1,000    ●○○ │
│                                                   │
│  ● = override (con/base/aggr)  filled = active   │
└──────────────────────────────────────────────────┘
```

### Controls

1. **Year toggle** — segmented `Y1 | Y2-3`, switches dataset
2. **Global scenario** — segmented `CON | BASE | AGGR`, sets all non-overridden streams
3. **Per-stream override** — 3 tiny dots at row end; click to cycle: inherit -> conservative -> base -> aggressive -> inherit. Muted when inheriting global, colored when overridden.
4. **Hover** — row highlights, shows percentage of total

### Animation

- Bar widths: `transition: width 0.5s var(--ease-out-expo)`
- Total counter: motion `useSpring` with `stiffness: 100, damping: 30`
- Row sort: bars re-sort by value with `transform: translateY()` transition
- Row entrance: staggered fade-up matching existing FadeInView pattern

### Color

| Element | Conservative | Base | Aggressive |
|---|---|---|---|
| Bar fill | `white/15` | `white/35` | `#c0392b` |
| Override dot | `white/20` | `white/40` | `#c0392b` |
| Value text | `text-white/40` | `text-heading` | `text-accent` |

Total counter: `text-heading` normally, `text-accent` when any aggressive streams active.

### Responsive

- Desktop: as diagrammed above
- Mobile (<640px): full-width bars, override dots below each stream label, year/scenario toggles stack vertically
- Container query on chart wrapper

### Accessibility

- `role="img"` with `aria-label` describing current scenario and total
- Segmented controls: `role="radiogroup"` with `aria-checked`
- All values in text (not decoration-only)
- `prefers-reduced-motion`: instant transitions, no spring physics

## Files Changed

1. **New:** `app/ekthesis/RevenueChart.tsx` — interactive chart component
2. **Edit:** `app/ekthesis/page.tsx` — replace `Year1Projections`/`Year23Projections` with `RevenueChart`
3. **Edit (optional):** `app/ekthesis/RevenueTable.tsx` — keep `StreamingRatesTable` and `SyncRangesTable` exports, remove `Year1Projections`/`Year23Projections` exports if no longer used elsewhere

## Performance Budget

- No new npm dependencies
- Component JS: <5KB gzipped (pure state + CSS transitions)
- Motion spring is already bundled (motion@12.6.0 in use)
- No layout shift: chart dimensions fixed via CSS grid
