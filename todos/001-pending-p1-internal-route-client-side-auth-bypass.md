---
status: pending
priority: p1
issue_id: "001"
tags: [code-review, security, privacy, frontend]
dependencies: []
---

# Secure Internal Route Access Control

Replace client-only password gating for `/internal` with real server-side protection.

## Problem Statement

The route labeled as private is publicly deployable and protected only by client state. Anyone can bypass it by reading bundled code or setting session state locally.

## Findings

- `app/internal/page.tsx:18` compares input against hardcoded password `'free'`.
- `app/internal/page.tsx:19` and `app/internal/page.tsx:1129` use `sessionStorage` for auth state.
- `components/layout/Nav.tsx:25` exposes `(INTERNAL)` route in global navigation.
- `next build` output confirms `/internal` is statically generated and shipped.

## Proposed Solutions

### Option 1: Add Middleware + Server-Side Auth

**Approach:** Protect `/internal` in `middleware.ts` using HTTP basic auth or signed cookie + environment secret.

**Pros:**
- Real access control.
- Works before page code loads.

**Cons:**
- Requires env var management.
- Slight implementation overhead.

**Effort:** 2-4 hours

**Risk:** Low

---

### Option 2: Vercel Edge Protection for `/internal`

**Approach:** Use deployment platform route protection for `/internal`.

**Pros:**
- Fastest secure fix.
- Minimal code change.

**Cons:**
- Platform-coupled configuration.
- Harder local parity.

**Effort:** 1-2 hours

**Risk:** Low

---

### Option 3: Remove `/internal` from Public App

**Approach:** Move internal content to a non-public repository/site.

**Pros:**
- Eliminates exposure risk entirely.
- Reduces production bundle size.

**Cons:**
- Requires content migration.
- Workflow changes for team.

**Effort:** 4-8 hours

**Risk:** Medium

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `app/internal/page.tsx`
- `components/layout/Nav.tsx`
- `app/sitemap.ts` (verify routing policy)
- `middleware.ts` (new)

**Database changes (if any):**
- Migration needed? No

## Resources

- Build evidence: `npm run build` route list includes `/internal`
- Security reference: OWASP Broken Access Control

## Acceptance Criteria

- [ ] `/internal` is blocked server-side when unauthenticated.
- [ ] Hardcoded password and `sessionStorage` auth logic removed.
- [ ] `(INTERNAL)` nav link visibility follows auth policy.
- [ ] Unauthorized access attempts are verifiable in logs.
- [ ] Manual test confirms private content is not readable without auth.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Reviewed auth flow in `app/internal/page.tsx`.
- Verified hardcoded credential and client-side session gate.
- Confirmed `/internal` route is statically generated in production build output.

**Learnings:**
- Current implementation is obfuscation, not authentication.
- This is a merge-blocking risk if content is truly private.

## Notes

- If `/internal` is intentionally public, rename and remove “private” framing to avoid false security assumptions.
