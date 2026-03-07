---
title: "fix: Correct FINExME gallery and timeline imagery"
type: fix
status: completed
date: 2026-03-07
---

# Correct FINExME Gallery and Timeline Imagery

## Overview

Fix a content-mapping regression across two surfaces:

1. The FINExME gallery on the homepage is showing the wrong image/caption pairing in the tile currently labeled `Smoke`.
2. The `/timeline` page is showing the wrong thumbnail for `ZODIAC KILLER`.

This is a targeted content correction, not a layout or animation change. The affected data lives in two small arrays and flows directly into existing `next/image` renderers.

## Problem Statement / Motivation

The current site no longer matches the approved visual direction shown in the user-provided screenshots:

- The FINExME gallery tile that currently renders `crouching-smoke.avif` with caption `Smoke` should instead use the approved dusk/sunset silhouette image.
- The tile already using `dusk-silhouette-two.avif` should keep its image but change its visible caption from `Dusk silhouette` to `Sunset`.
- The `ZODIAC KILLER` timeline card should no longer use `red-bokeh-portrait.avif`; it should use the approved still from the feedback thread.

This appears to have been introduced by commit `d6dc6eb` on March 6, 2026, which explicitly:

- replaced `fine-by-me-sunset.webp` with `crouching-smoke.avif` in `components/sections/FineXMeSection.tsx`
- reassigned `ZODIAC KILLER` to `red-bokeh-portrait.avif` in `app/timeline/timelineData.ts`

Because the site is image-led and the captions are always visible on touch devices, the mismatch is immediately noticeable on mobile.

## Proposed Solution

Make a narrow data correction rather than reverting the full March 6 commit:

- Update the FINExME gallery array in `components/sections/FineXMeSection.tsx`.
- Update the `ZODIAC KILLER` entry in `app/timeline/timelineData.ts`.
- Update `alt` text anywhere the visual meaning changed.
- If the approved `ZODIAC KILLER` still is not already available in `public/images`, add it to the image pipeline through `assets/` and `scripts/optimize-images.mjs`.

This preserves the unrelated fixes that shipped in `d6dc6eb` while undoing only the image assignments that do not match the approved references.

## Technical Approach

### 1. Correct homepage gallery data

**File:** `components/sections/FineXMeSection.tsx`

Update the `GALLERY` array so the fourth and fifth FINExME tiles match the approved pairing:

```tsx
// components/sections/FineXMeSection.tsx
const GALLERY = [
  { src: '/images/fine-by-me-still.avif', caption: 'Fine By Me' },
  { src: '/images/dusk-silhouette-two.avif', caption: 'Sunset' },
  { src: '/images/fine-by-me-sunset.webp', caption: 'Dusk silhouette' },
]
```

Implementation notes:

- Keep `dusk-silhouette-two.avif` in place but relabel it.
- Restore `fine-by-me-sunset.webp` for the tile currently occupied by `crouching-smoke.avif`.
- Update `alt` text so it describes the actual visual content instead of the old `Smoke` label.
- Leave the rest of the gallery ordering unchanged.

### 2. Correct timeline thumbnail mapping

**File:** `app/timeline/timelineData.ts`

Replace the `image` value for the `ZODIAC KILLER` entry with the approved still from the feedback thread.

```ts
// app/timeline/timelineData.ts
{
  title: 'ZODIAC KILLER',
  image: 'zodiac-killer-still.avif',
}
```

Implementation notes:

- Do not change entry ordering, IDs, dates, or links.
- Do not alter how `TimelineNode` renders images; the renderer already consumes `entry.image` correctly.
- Keep the aspect ratio and motion behavior unchanged.

### 3. Only touch the asset pipeline if the final still is missing

**Files:** `assets/<source-file>`, `scripts/optimize-images.mjs`, `public/images/<generated-file>`

If the approved `ZODIAC KILLER` image is not already present in `public/images`:

- add the source image to `assets/`
- add a semantic filename entry to `IMAGE_MAP` in `scripts/optimize-images.mjs`
- run `npm run optimize-images`
- reference the generated output from `app/timeline/timelineData.ts`

If the approved still already exists in `public/images`, skip pipeline changes and only update the data mapping.

### 4. Verify both affected routes

**Files to verify:** `components/sections/FineXMeSection.tsx`, `app/timeline/timelineData.ts`, `app/timeline/TimelineNode.tsx`

Manual QA should cover:

- homepage FINExME gallery on mobile and desktop
- `/timeline` `ZODIAC KILLER` card on mobile and desktop
- caption visibility on coarse pointers, since `app/globals.css` forces `.gallery-caption` visible on touch devices

## Spec Flow Findings & Assumptions

### User Flows

1. A visitor lands on the homepage, scrolls to FINExME, and sees the gallery with either hover captions (desktop) or always-visible captions (mobile).
2. A visitor opens `/timeline`, scrolls horizontally through the FINExME era, and sees the `ZODIAC KILLER` card image before clicking through to Apple Music.

### Key Edge Cases

- On mobile, the wrong caption is more obvious because captions do not hide behind hover.
- The restored gallery asset currently exists as `.webp`, while most other gallery images are `.avif`.
- The approved `ZODIAC KILLER` still may exist only in the feedback thread and not yet in `public/images`.
- If a new asset is introduced, `TimelineNode` will render it immediately as long as the generated filename is valid under `/images/`.

### Assumptions

- Use the existing `/images/fine-by-me-sunset.webp` file for the gallery replacement unless a newer approved export is provided.
- Treat the currently displayed `dusk-silhouette-two.avif` tile as the one that should be relabeled to `Sunset`.
- Treat the approved `ZODIAC KILLER` screenshot as the source of truth even if it requires a new asset import.

### Resolution

- The `ZODIAC KILLER` still was resolved as `zodiac-killer-still` and generated from a matching frame in local `AT NO COST` footage.

## Technical Considerations

- **Framework/context:** Next.js 16, React 19, `next/image`, static asset references from `public/images`
- **Risk level:** low; changes are isolated to content arrays and optional asset pipeline mapping
- **Regression source:** `d6dc6eb` is the likely introduction point and should be referenced during implementation review
- **Accessibility:** `alt` text must change with the imagery so screen-reader output is not misleading
- **Performance:** prefer reusing existing optimized assets; only generate a new asset if the approved timeline still is missing
- **Change isolation:** do not revert unrelated copy, logo, or ordering changes from the same March 6 commit

## Acceptance Criteria

- [x] `components/sections/FineXMeSection.tsx` no longer renders `crouching-smoke.avif` in the FINExME tile the user flagged.
- [x] The FINExME tile using `dusk-silhouette-two.avif` displays the caption `Sunset`.
- [x] The restored/replacement FINExME tile displays the caption `Dusk silhouette`.
- [x] Updated FINExME gallery `alt` text describes the actual approved imagery instead of the old `Smoke` content.
- [x] `app/timeline/timelineData.ts` no longer maps `ZODIAC KILLER` to `red-bokeh-portrait.avif`.
- [x] The `ZODIAC KILLER` card on `/timeline` renders the approved still from the feedback thread.
- [x] If the approved timeline still was missing, `scripts/optimize-images.mjs` contains the new semantic asset mapping and generated output exists in `public/images/`.
- [x] Homepage and timeline visuals are verified on both desktop and mobile widths.
- [x] `npm run lint`, `npm run typecheck`, and `npm run build` pass after the change.

## Success Metrics

- The homepage FINExME gallery matches the requested screenshot direction without caption/image mismatches.
- The `/timeline` `ZODIAC KILLER` card matches the approved still.
- No unrelated content or chronology changes are introduced.
- The user no longer needs follow-up image correction requests for these two surfaces.

## Dependencies & Risks

- The only meaningful dependency is the final approved `ZODIAC KILLER` source asset.
- If the asset exists only in chat and not in the repo, implementation must include asset ingestion and optimization before the data update.
- `fine-by-me-sunset.webp` currently has no visible `.avif` companion in `public/images`; if consistency matters, a future cleanup can normalize formats, but that is not required for this fix.

## References & Research

### Internal References

- `components/sections/FineXMeSection.tsx:15` - current FINExME gallery data
- `app/timeline/timelineData.ts:18` - current timeline entries
- `app/timeline/TimelineNode.tsx:24` - timeline image renderer
- `app/globals.css:115` - gallery captions and mobile visibility behavior
- `scripts/optimize-images.mjs:11` - asset pipeline semantic mapping
- `app/internal/page.tsx:480` - existing `fine-by-me-sunset.webp` usage in the internal reference page
- `docs/plans/2026-02-25-feat-free-artist-website-plan.md:327` - original FINExME image map reference
- `git show d6dc6eb` - regression source for the March 6, 2026 content update

### Repo Conventions

- No matching brainstorm was found in `docs/brainstorms/`.
- No `docs/solutions/` knowledge base was present for institutional learnings.
- No issue templates were found under `.github/ISSUE_TEMPLATE/`.
- CI currently verifies `npm run lint`, `npm run typecheck`, and `npm run build` via `.github/workflows/ci.yml`.

### External Research

No external research performed. Local repo context was sufficient because this is a low-risk content-mapping regression, not a framework or API design problem.
