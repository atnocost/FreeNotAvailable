---
status: pending
priority: p2
issue_id: "005"
tags: [code-review, performance, media, frontend]
dependencies: []
---

# Optimize Large Video Asset Delivery

Reduce bandwidth and startup cost for large clip assets, especially Film Reel.

## Problem Statement

Current video distribution includes very large static MP4 files, increasing load time/cost and degrading mobile experience.

## Findings

- `public/clips/FilmReel.mp4` is ~40MB.
- Total `public/clips` footprint is ~80MB (`du -sh public/clips`).
- `/clips` page exposes multiple local videos (`app/clips/page.tsx:112`, `:193`).
- Large media currently ships from app static assets without adaptive bitrate.

## Proposed Solutions

### Option 1: Encode and Replace with Web-Optimized MP4/AV1 Profiles

**Approach:** Re-encode clips to smaller bitrates/resolutions and update assets.

**Pros:**
- Fastest measurable win.
- Minimal app code changes.

**Cons:**
- Quality tradeoff decisions needed.

**Effort:** 3-6 hours

**Risk:** Low

---

### Option 2: Use Adaptive Streaming (HLS/DASH)

**Approach:** Host variants and stream adaptively based on network/device.

**Pros:**
- Best user experience at scale.
- Handles poor networks gracefully.

**Cons:**
- Requires media pipeline and hosting updates.

**Effort:** 1-2 days

**Risk:** Medium

---

### Option 3: Offload Video Hosting/CDN + Lazy Strategies

**Approach:** Move heavy media to video CDN/platform, keep lightweight posters locally.

**Pros:**
- Reduces app artifact size and origin load.

**Cons:**
- External dependency and migration work.

**Effort:** 4-8 hours

**Risk:** Medium

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `public/clips/*.mp4`
- `app/clips/page.tsx`

**Database changes (if any):**
- Migration needed? No

## Resources

- File-size inventory captured on 2026-02-26.

## Acceptance Criteria

- [ ] Largest clip payload reduced to agreed threshold.
- [ ] `/clips` route initial transfer reduced measurably.
- [ ] Playback works on mobile and desktop.
- [ ] Visual quality validated against baseline.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Measured clip directory size and identified files >1MB.
- Confirmed 40MB `FilmReel.mp4` is currently shipped.

**Learnings:**
- Media size is a top performance lever for this app.

## Notes

- Revisit poster strategy to ensure instant paint while video initializes.
