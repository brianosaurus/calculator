# Change spec

Omitted sections: migration, security, performance (trivial CSS-only); compatibility (none)

## 1. Change type
Enhancement (visual theme).

## 2-4. Problem / current / desired
Body background is static (B-1). Desired: continuous smooth 70s groovy animation (concentric rainbow rings / waves in orange, gold, brown, green, cream), pure CSS, calculator readable.

## 5. Observable behavior
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| S-1 | MODIFY | Load page, normal motion | Static background | Body background animates continuously via CSS animation | AC-1, AC-2 |
| S-2 | ADD | prefers-reduced-motion: reduce | n/a | Animation is none | AC-3 |
| S-3 | PRESERVE | Any | Calculator/key/display colors, layout, logic | Unchanged | AC-4 |

## 6. Invariants
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| I-1 | EXISTING | Palette colors on calculator/keys | theme | theme.css | T-9 |
| I-2 | EXISTING | No external requests or new dependencies | repo | package.json | T-9, diff |
| I-3 | EXISTING | Calculator logic untouched | src logic | n/a | full suites |

No RELAXED or REMOVED invariants.

## 8. Error behavior
If animation unsupported, static gradient still renders.

## 12. Rollback
Revert src/theme.css and theme.spec.js.

## 14. Non-goals
Calculator logic, key layout, button colors.

## 15. Assumptions
tests/e2e/theme.spec.js may be edited (stated in request) only to extend background assertions.

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | Body computed backgroundImage still contains a radial-gradient or conic-gradient and body has a non-none CSS animation with infinite iteration under normal motion. | Playwright theme.spec.js assertions on getComputedStyle(body).animationName/animationIterationCount |
| AC-2 | Background visibly changes over time (body backgroundPosition or rendered value differs between two samples ~500ms apart). | Playwright sampling in theme.spec.js |
| AC-3 | With reducedMotion emulated as 'reduce', body animationName is 'none'. | Playwright page.emulateMedia({reducedMotion:'reduce'}) test |
| AC-4 | Calculator, display and key styles/layout and logic are unchanged and all existing unit and e2e tests pass; no new dependencies. | npm test; npm run test:e2e; git diff limited to src/theme.css and tests/e2e/theme.spec.js |

