# Baseline Report

Omitted sections: Existing failures (none documented); Reproduction (not a bug); API/schema contracts (none affected)

## 1. Change-request summary
See CHANGE_REQUEST.md: h1 "Groovy" becomes "Groovy..."; styling unchanged.

## 2. Repository architecture
Vite + React 19 SPA. Vitest unit tests (tests/engine.test.js, keymap.test.js), Playwright e2e (tests/e2e/*.spec.js), mutation scripts in tests/mutations.

## 3. Relevant code paths
- src/Calculator.jsx:47 `<h1 className="title">Groovy</h1>`
- tests/e2e/theme.spec.js:107, 135, 149 use heading name 'Groovy' (line 102 is test title)

## 4. Current observable behavior
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B-1 | Load page | h1 text "Groovy" | Calculator.jsx:47 | No (modified) |
| B-2 | Load page | h1 styled via .title (font, color, centered) | Calculator.jsx:47; theme.spec.js:102-150 | Yes |

## 5. Existing invariants
| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I-1 | h1 is level-1 heading, visible, centered above calculator | className title | theme.spec.js T-10 | High |
| I-2 | Calculator arithmetic/keyboard unchanged | engine/keymap | engine.test.js, keymap.test.js, e2e | High |

## 7. Existing automated-test coverage
Playwright getByRole name matching is case-insensitive substring by default, so 'Groovy' would likely still match "Groovy..."; tests are still updated per the request. Commands run sequentially (e2e starts its own dev server via playwright config; shared port 5173), so no parallel groups.

## 9. Baseline test results
Commands derived from package.json scripts. No pre-existing failures documented. Driver baseline is authoritative.

## 12. Likely change surface
Calculator.jsx:47; theme.spec.js assertions.

## 13. Regression-sensitive components
Theme e2e heading tests (centering, visibility).

## 14. Out of scope
All other visuals/behavior.

## 15. Unknowns and assumptions
Assume playwright.config.js launches the server for e2e (not read). No `Seeded from` link or issue number in the request metadata.

## 16. Initial risk
Low.

## Exact build and test commands executed

```sh
npm test
npm run build
npx playwright test
```

