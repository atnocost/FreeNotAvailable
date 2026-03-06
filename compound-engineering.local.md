review_agents: [kieran-typescript-reviewer, code-simplicity-reviewer, security-sentinel, performance-oracle]
plan_review_agents: [kieran-typescript-reviewer, code-simplicity-reviewer]

# Review Context

- Treat this as a production Next.js app; prioritize reliability and user-facing quality.
- Prefer smallest viable fixes with explicit file-level evidence.
- Do not flag files in docs/plans/ or docs/solutions/ for deletion/cleanup.
