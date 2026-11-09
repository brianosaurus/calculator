# Baseline

Omitted sections: API contracts (none); reproduction (enhancement, not bug); baseline results (driver supplies)

## 1. Change-request summary
See .uncle/docs/CHANGE_REQUEST.md: animate the page background in a 70s groovy style, pure CSS, honor prefers-reduced-motion.

## 2. Repository architecture
Vite + React 19 calculator. Styles in src/theme.css; unit tests via vitest (tests/*.test.js); e2e via Playwright (tests/e2e/*.spec.js, playwright.config.js webServer).

## 3. Relevant code paths
- src/theme.css:1-8 palette variables; :12-25 body rule with static radial+conic gradient and background-attachment fixed.
- tests/e2e/theme.spec.js:21-22 asserts body backgroundImage matches /conic-gradient|radial-gradient/.

## 4. Current observable behavior
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B-1 | Load page | Static fixed gradient background in brown/cream/gold/green/orange | src/theme.css:21-24 | No (modify) |
| B-2 | Inspect calculator/keys/display colors | Palette colors present on .calculator/.display/.key | theme.spec.js:33-43 | Yes |
| B-3 | Load page | Font Fredoka stack, radii >=12, no console errors, no external requests | theme.spec.js | Yes |

## 5. Existing invariants
| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I-1 | Palette colors used by calculator and keys | theme.css | theme.spec.js T-9 | High |
| I-2 | No external requests | local CSS only | theme.spec.js T-9 | High |
| I-3 | Calculator logic unchanged | engine/keymap modules | engine.test.js, keymap.test.js, calculator.spec.js, keyboard.spec.js | High |

## 7. Existing automated-test coverage
vitest unit tests; Playwright e2e for calculator, keyboard, theme. Unit and e2e suites use separate processes; e2e starts its own webServer. Run sequentially (single shared dev-server port), no parallel group.

## 9. Baseline test results
Commands come from package.json scripts. No pre-existing failures documented. Driver baseline is authoritative.

## 12. Likely change surface
src/theme.css, tests/e2e/theme.spec.js.

## 13. Regression-sensitive components
theme.spec.js backgroundImage regex; key/display contrast.

## 14. Outside the change
Calculator logic, key layout, button colors, index.html.

## 15. Unknowns
None blocking.

## 16. Risk
Low. Main risk: animated bg hurting readability (mitigated by opaque brown calculator) and reduced-motion handling.

## Exact build and test commands executed

```sh
npm test
npm run test:e2e
```

