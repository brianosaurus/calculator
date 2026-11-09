# Implementation notes

### Files changed

- `src/theme.css` — Animated body background: rings + conic swirl, 200% size, @keyframes groovy 20s linear infinite, reduced-motion none. Unchanged in this repair: the 100% keyframe (200%/-200% at 200% size) already shifts each layer exactly one tile (|p|*(s-100)/s = 1), so the loop is seamless.; Change-impact row 1; S-1, S-2, I-2
- `tests/e2e/theme.spec.js` — T-9b..T-9e plus new T-9f: reads the groovy 100% keyframe and body background-size and asserts each layer shifts by a whole number (>=1) of tiles. Addresses TEST_REVIEW ASSERTIONS/COVERAGE/NEGATIVE seamless-loop gap (AR-001).; Change-impact row 2; AC-1..AC-4
- `.uncle/launch.json` — Launch metadata (dev server); Stage launch requirement; None

### Deviations

- `.uncle/launch.json`: Required launch metadata; outside frozen scope
- `.gitignore`: Pre-existing uncommitted user change, untouched by this work

### Unresolved concerns

- Default npm run test:e2e fails here only because port 5173 is held by another worktree's vite (pid cwd calculator-change-the-calculator-s-page-background-3); not fixable in scope. Environmental, same before the change.
- 4.5:1 text contrast is not tested: calculator keeps its own opaque brown panel, so text never sits on the animated body background.

## Acceptance delivery

| ID | Status | Changed code | Observed targeted verification |
|---|---|---|---|
| AC-1 | IMPLEMENTED | src/theme.css body rule; theme.spec.js T-9, T-9b | Playwright on port 5199: gradient present, animation not none, iteration infinite; pass |
| AC-2 | IMPLEMENTED | src/theme.css @keyframes groovy; theme.spec.js T-9b, T-9f | backgroundPosition differs across 500ms samples; T-9f seamless-loop check passes; pass |
| AC-3 | IMPLEMENTED | src/theme.css reduced-motion block; theme.spec.js T-9c | reduce: animationName none, stable base position, live re-enable; pass |
| AC-4 | IMPLEMENTED | Only theme.css and theme.spec.js (plus launch.json); package.json untouched | Full e2e 22 passed on port 5199; npm test 18 passed earlier (driver green-check: FIXED) |
