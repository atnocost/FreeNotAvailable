---
status: pending
priority: p2
issue_id: "003"
tags: [code-review, seo, metadata, reliability]
dependencies: []
---

# Align Canonical Domain Across Metadata

Standardize metadata, robots, and sitemap URLs to the actual deployed domain.

## Problem Statement

Canonical host values currently use `freenotavailable.vercel.app`, while the deployed app is `free-not-available.vercel.app`. This can fragment SEO signals and break social/share canonical consistency.

## Findings

- `app/layout.tsx:7` sets `metadataBase` to `https://freenotavailable.vercel.app`.
- `app/layout.tsx:18` sets OpenGraph URL to same host.
- `app/robots.ts:9` sets sitemap URL with same host.
- `app/sitemap.ts:6`, `:12`, `:18`, `:24` use same host for route URLs.

## Proposed Solutions

### Option 1: Replace with Correct Production Domain

**Approach:** Update all metadata URLs to `https://free-not-available.vercel.app`.

**Pros:**
- Fast and explicit.
- Eliminates immediate mismatch.

**Cons:**
- Hardcoded host remains environment-specific.

**Effort:** <1 hour

**Risk:** Low

---

### Option 2: Use Env-Driven Site URL

**Approach:** Centralize site origin in env/config and generate metadata from one source.

**Pros:**
- Prevents future drift.
- Works for preview/staging environments.

**Cons:**
- Slightly more setup.

**Effort:** 1-2 hours

**Risk:** Low

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`

**Database changes (if any):**
- Migration needed? No

## Resources

- Deployed target under review: `https://free-not-available.vercel.app`

## Acceptance Criteria

- [ ] Metadata canonical/OpenGraph URLs use correct host.
- [ ] `robots.txt` sitemap URL matches canonical host.
- [ ] `sitemap.xml` entries all use canonical host.
- [ ] URL host comes from single source of truth.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Reviewed metadata files for URL host consistency.
- Cross-checked against deployment target supplied in review command.

**Learnings:**
- Multiple duplicated host literals increase drift risk.

## Notes

- Verify whether custom domain will replace Vercel subdomain before finalizing.
