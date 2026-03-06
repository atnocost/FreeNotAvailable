---
status: pending
priority: p2
issue_id: "006"
tags: [code-review, ci, quality, reliability]
dependencies: ["002"]
---

# Add CI Quality Gates for Build and Lint

Establish automated checks to prevent regressions from merging.

## Problem Statement

There is no repository CI workflow to enforce lint/build quality in pull requests.

## Findings

- No workflow directory: `NO_GITHUB_WORKFLOWS` from `.github/workflows` check.
- Existing lint command is currently broken (tracked in issue `002`).
- Quality checks are manual and easy to skip.

## Proposed Solutions

### Option 1: GitHub Actions for Lint + Build

**Approach:** Add CI workflow running `npm ci`, `npm run lint`, `npm run build`.

**Pros:**
- Standard and visible PR checks.
- Immediate merge protection.

**Cons:**
- Slight maintenance overhead.

**Effort:** 2-4 hours

**Risk:** Low

---

### Option 2: Add Typecheck + Build Gate First, Lint After Fix

**Approach:** Ship a two-step gate now, add lint after issue `002` resolved.

**Pros:**
- Quick guardrail now.

**Cons:**
- Incomplete static checks until follow-up.

**Effort:** 1-2 hours

**Risk:** Low

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `.github/workflows/ci.yml` (new)
- `package.json`

**Database changes (if any):**
- Migration needed? No

## Resources

- Lint/build command outputs from 2026-02-26 review session.

## Acceptance Criteria

- [ ] PRs run automated CI checks.
- [ ] Failing lint/build blocks merge.
- [ ] CI runtime and failure logs are visible in GitHub checks.
- [ ] README/dev docs describe required checks.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Verified absence of `.github/workflows`.
- Linked CI gap to current manual-only verification flow.

**Learnings:**
- Tooling regression can slip through without enforced gates.

## Notes

- Keep workflow minimal to avoid flakiness on first adoption.
