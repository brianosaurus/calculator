# Baseline Report

Omitted sections: API contracts (none); Reproduction (text change, not a bug); Parallel groups (single suite each, not grouped)

## 1. Change-request summary
See CHANGE_REQUEST.md: h1 text 'Groovy...' becomes 'Groovy Calculator!'.

## 2. Repository architecture
Vite + React 19 app. Vitest unit tests, Playwright e2e (tests/e2e).

## 3. Relevant code paths
- src/Calculator.jsx:47 h1.title literal.
- tests/e2e/theme.spec.js:102 (title), 107, 135, 149 (lookups by name 'Groovy...').

## 4. Current observable behavior
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B-1 | Load app | h1 reads 'Groovy...' | Calculator.jsx:47 | No (changes) |
| B-2 | Load app | h1 centered above calculator, themed styling | theme.spec.js T-10 | Yes |

## 5. Existing invariants
| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I-1 | h1 class 'title' keeps styling/centering | className unchanged | theme.spec.js:102-149 | High |

## 7. Existing automated-test coverage
Vitest (npm test) and Playwright (npm run test:e2e); e2e assert heading by exact name.

## 9. Baseline test results
Commands from package.json scripts. Not run in this stage; driver baseline is authority. No documented pre-existing failures.

## 12. Likely change surface
Src/Calculator.jsx line 47; theme.spec.js lines 107, 135, 149 (and optionally title at 102).

## 13. Regression-sensitive components
Playwright theme/heading tests.

## 14. Outside the change
Styling, layout, other behavior.

## 15. Unknowns and assumptions
Assume Vitest tests do not reference heading text (grep of tests found only theme.spec.js).

## 16. Initial risk assessment
Low.

## Exact build and test commands executed

```sh
npm test
npm run test:e2e
```

