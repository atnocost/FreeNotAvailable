---
status: pending
priority: p3
issue_id: "010"
tags: [code-review, agent-native, architecture]
dependencies: []
---

# Clarify Agent-Native Scope or Add Capability Surface

Document whether agent-native parity is intentionally out of scope, or add minimal tool/API surface to match key UI capabilities.

## Problem Statement

Per the agent-native review lens, there is no defined agent capability layer corresponding to UI actions/routes.

## Findings

- UI actions exist across routes (`/`, `/films`, `/clips`, `/ekthesis`, `/internal`) and navigation (`components/layout/Nav.tsx`).
- Repository scan found no agent tool definitions, runtime capability registry, or dynamic system prompt construction.
- No `docs/solutions/` corpus exists for institutional learnings integration.

## Proposed Solutions

### Option 1: Explicitly Declare Non-Agent Product Scope

**Approach:** Add architecture note stating this is a user-only marketing site with no agent surface.

**Pros:**
- Removes ambiguity for future reviews.
- Zero product churn.

**Cons:**
- No path toward agent-native features.

**Effort:** <1 hour

**Risk:** Low

---

### Option 2: Add Minimal Read-Only Agent API

**Approach:** Expose route/content metadata via simple endpoint/tool for parity with site navigation.

**Pros:**
- Establishes foundation for future agent workflows.
- Low initial complexity.

**Cons:**
- Adds maintenance surface.

**Effort:** 4-8 hours

**Risk:** Medium

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `components/layout/Nav.tsx` (capability inventory source)
- `app/*` route content modules
- `docs/` architecture notes (new)

**Database changes (if any):**
- Migration needed? No

## Resources

- Agent-native architecture review performed on 2026-02-26.

## Acceptance Criteria

- [ ] Product scope clearly states agent-native in/out-of-scope.
- [ ] If in-scope: at least one documented capability map exists.
- [ ] If in-scope: basic tool/API parity implemented for chosen actions.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Mapped UI actions and searched for corresponding agent capability surface.
- Confirmed no agent tooling/system prompt architecture in repository.

**Learnings:**
- Current app is conventional web UX without agent integration primitives.

## Notes

- This is a strategic architecture item, not a bug.
