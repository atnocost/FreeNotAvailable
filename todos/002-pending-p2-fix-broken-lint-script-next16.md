---
status: pending
priority: p2
issue_id: "002"
tags: [code-review, quality, tooling, ci]
dependencies: []
---

# Restore Working Lint Command

Fix linting so `npm run lint` is executable and usable in CI.

## Problem Statement

Current lint command fails immediately, so static quality checks are effectively disabled.

## Findings

- `package.json:9` defines `"lint": "next lint"`.
- Running `npm run lint` fails with: `Invalid project directory provided, no such directory: .../lint`.
- This blocks quality gates and automated enforcement.

## Proposed Solutions

### Option 1: Move to ESLint CLI

**Approach:** Use `eslint . --max-warnings=0` and add/confirm `eslint` + `eslint-config-next` config.

**Pros:**
- Version-stable lint command.
- CI-friendly behavior.

**Cons:**
- Requires explicit ESLint setup if missing.

**Effort:** 1-2 hours

**Risk:** Low

---

### Option 2: Pin/Adjust Next Lint-Compatible Version

**Approach:** Change Next version or command syntax to restored compatibility.

**Pros:**
- Smaller tooling change.

**Cons:**
- Couples linting behavior to framework CLI quirks.

**Effort:** 1-3 hours

**Risk:** Medium

---

### Option 3: Temporary Typecheck-Only Gate

**Approach:** Add `npm run typecheck` as interim gate until lint migration lands.

**Pros:**
- Immediate minimal guardrail.

**Cons:**
- Misses style and best-practice lint rules.

**Effort:** <1 hour

**Risk:** Medium

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `package.json`
- `.eslintrc.*` (new/updated)
- `tsconfig.json` (verify lint parser integration)

**Database changes (if any):**
- Migration needed? No

## Resources

- Command output: `npm run lint` error on 2026-02-26

## Acceptance Criteria

- [ ] `npm run lint` exits 0 on clean tree.
- [ ] Lint command exits non-zero on violations.
- [ ] Lint can run in CI without interactive behavior.
- [ ] Team docs/scripts reference the corrected command.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Executed lint script and captured failure.
- Mapped failure to script definition in `package.json`.

**Learnings:**
- Quality gate currently non-functional.

## Notes

- Pair with issue `006` (CI gates) for end-to-end enforcement.
