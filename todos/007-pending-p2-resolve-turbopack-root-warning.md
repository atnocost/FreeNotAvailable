---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, build, tooling, reliability]
dependencies: []
---

# Resolve Turbopack Workspace Root Warning

Eliminate ambiguous workspace-root detection during production builds.

## Problem Statement

Build currently infers workspace root from a lockfile outside this repository, which can cause non-deterministic behavior across environments.

## Findings

- `npm run build` warning: inferred root selected `/Users/damon` because of external `pnpm-lock.yaml`.
- Build also detected this repo lockfile `package-lock.json` as additional lockfile.
- `next.config.ts` does not set explicit `turbopack.root`.

## Proposed Solutions

### Option 1: Set `turbopack.root` Explicitly

**Approach:** Configure root in `next.config.ts` to `/Users/damon/free-not-available` equivalent via path resolution.

**Pros:**
- Deterministic build behavior.
- Removes warning noise.

**Cons:**
- Requires careful path expression for portability.

**Effort:** <1 hour

**Risk:** Low

---

### Option 2: Normalize Lockfiles in Parent Workspace

**Approach:** Remove/relocate unrelated parent lockfile causing conflict.

**Pros:**
- Cleans broader dev environment.

**Cons:**
- May affect other projects in parent workspace.

**Effort:** 1-2 hours

**Risk:** Medium

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `next.config.ts`

**Database changes (if any):**
- Migration needed? No

## Resources

- Build warning text captured from `npm run build` on 2026-02-26.

## Acceptance Criteria

- [ ] Build runs without workspace-root warning.
- [ ] Output is stable across local and CI environments.
- [ ] Documented root strategy for future contributors.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Captured warning from production build.
- Confirmed missing explicit root configuration.

**Learnings:**
- Warning indicates environment-coupled build behavior risk.

## Notes

- Pair with CI issue (`006`) to confirm behavior in clean runner.
