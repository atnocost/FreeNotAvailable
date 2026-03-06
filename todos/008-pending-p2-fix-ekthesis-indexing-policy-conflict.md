---
status: pending
priority: p2
issue_id: "008"
tags: [code-review, seo, metadata, quality]
dependencies: []
---

# Resolve Ekthesis Indexing Policy Conflict

Make indexing intent for `/ekthesis` consistent across metadata and sitemap.

## Problem Statement

`/ekthesis` is marked `noindex,nofollow` in route metadata but still included in `sitemap.xml`, sending mixed crawl/index signals.

## Findings

- `app/ekthesis/layout.tsx:6` sets `robots: { index: false, follow: false }`.
- `app/sitemap.ts:24-28` includes `/ekthesis` in public sitemap.

## Proposed Solutions

### Option 1: Keep Noindex, Remove from Sitemap

**Approach:** Exclude `/ekthesis` from `app/sitemap.ts`.

**Pros:**
- Consistent non-index policy.
- Clear crawler intent.

**Cons:**
- Route will not surface via sitemap discovery.

**Effort:** <1 hour

**Risk:** Low

---

### Option 2: Make Route Indexable and Keep in Sitemap

**Approach:** Change robots metadata to index/follow if this page is meant to rank.

**Pros:**
- Public discoverability preserved.

**Cons:**
- Must ensure content is intended for indexing.

**Effort:** <1 hour

**Risk:** Low

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `app/ekthesis/layout.tsx`
- `app/sitemap.ts`

**Database changes (if any):**
- Migration needed? No

## Resources

- Metadata and sitemap source lines captured during review.

## Acceptance Criteria

- [ ] Indexing policy is internally consistent.
- [ ] Sitemap reflects intended crawl surface.
- [ ] Robots directives match product intent for `/ekthesis`.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Compared route metadata robots policy against sitemap route list.

**Learnings:**
- Current configuration sends contradictory crawl signals.

## Notes

- Confirm whether `/ekthesis` is investor-only, campaign-only, or publicly indexable.
