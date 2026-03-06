---
status: pending
priority: p2
issue_id: "004"
tags: [code-review, performance, frontend, architecture]
dependencies: []
---

# Reduce Heavy Route Client Bundles

Lower JS shipped to large content routes by moving static content out of client bundles.

## Problem Statement

Large text-heavy pages are fully client components, pushing substantial JavaScript to users for primarily static content.

## Findings

- `app/ekthesis/page.tsx:1` is `'use client'` and spans 824 lines of mostly static content/data.
- `app/internal/page.tsx:1` is `'use client'` and spans 1139 lines.
- Route manifest links `/ekthesis` to `static/chunks/18af2f3cb318757d.js` (177K) plus shared nav chunk.
- Route manifest links `/internal` to `static/chunks/6400f19d42dd5d30.js` (40K) plus shared nav chunk.

## Proposed Solutions

### Option 1: Split Static Sections into Server Components

**Approach:** Keep only interactive widgets as client islands (`RevenueChart`, small motion wrappers), render narrative content server-side.

**Pros:**
- Largest JS reduction.
- Better TTI and lower hydration cost.

**Cons:**
- Requires component boundary refactor.

**Effort:** 1-2 days

**Risk:** Medium

---

### Option 2: Dynamic Import Heavy Interactive Blocks

**Approach:** Lazy-load non-critical interactive modules below fold.

**Pros:**
- Faster initial payload without full refactor.

**Cons:**
- Adds loading-state complexity.
- Less impactful than server split.

**Effort:** 4-8 hours

**Risk:** Low

---

### Option 3: Keep Architecture, Add Performance Budget + Monitoring

**Approach:** Document current costs, set hard budget thresholds.

**Pros:**
- Minimal code churn.

**Cons:**
- Does not improve user performance.

**Effort:** 2-3 hours

**Risk:** Medium

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `app/ekthesis/page.tsx`
- `app/internal/page.tsx`
- `app/ekthesis/RevenueChart.tsx`
- Route manifests under `.next/server/app/*/page_client-reference-manifest.js` (verification)

**Database changes (if any):**
- Migration needed? No

## Resources

- Build artifacts inspected on 2026-02-26 for chunk sizes.

## Acceptance Criteria

- [ ] Route-specific JS for `/ekthesis` reduced by agreed target (e.g., >=30%).
- [ ] Route-specific JS for `/internal` reduced by agreed target.
- [ ] No behavior regressions in interactions/animations.
- [ ] Performance measurements documented before/after.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Measured static chunk sizes from `.next/static/chunks`.
- Mapped route-to-chunk associations via client-reference manifests.

**Learnings:**
- Most page content is static but currently hydrated.

## Notes

- Coordinate with issue `001` if `/internal` route is removed/protected.
