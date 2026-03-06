---
status: pending
priority: p3
issue_id: "009"
tags: [code-review, simplicity, frontend]
dependencies: []
---

# Simplify ScrollController State Usage

Remove unused state updates in scroll controller to reduce unnecessary rerenders and complexity.

## Problem Statement

`ScrollController` tracks `activeSection` state but never reads it. State updates add render churn without functional value.

## Findings

- `components/ui/ScrollController.tsx:14` declares `const [, setActiveSection] = useState('hero')`.
- `components/ui/ScrollController.tsx:37` calls `setActiveSection(winner)`.
- Render output only depends on CSS variables written directly to `document.documentElement`.

## Proposed Solutions

### Option 1: Remove Unused React State

**Approach:** Drop `useState` and rely solely on observer + CSS variable writes.

**Pros:**
- Simplest implementation.
- Avoids needless rerenders.

**Cons:**
- No in-component state debugging hook.

**Effort:** <1 hour

**Risk:** Low

---

### Option 2: Keep State and Use It for Debug/UX

**Approach:** Actually consume `activeSection` (e.g., class names, analytics, debug overlay).

**Pros:**
- Makes state meaningful.

**Cons:**
- Adds complexity and likely unnecessary.

**Effort:** 1-2 hours

**Risk:** Low

## Recommended Action

To be filled during triage.

## Technical Details

**Affected files:**
- `components/ui/ScrollController.tsx`

**Database changes (if any):**
- Migration needed? No

## Resources

- Simplicity review pass (`code-simplicity-reviewer`) findings.

## Acceptance Criteria

- [ ] Unused state removed or justified by real usage.
- [ ] Behavior remains unchanged for section color transitions.
- [ ] No new lint/type warnings introduced.

## Work Log

### 2026-02-26 - Initial Discovery

**By:** Codex

**Actions:**
- Traced control flow in `ScrollController`.
- Confirmed `activeSection` is write-only.

**Learnings:**
- CSS variable mutation path already provides required behavior.

## Notes

- Low-risk quick win suitable for opportunistic cleanup.
