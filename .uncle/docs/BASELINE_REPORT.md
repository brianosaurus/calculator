# Baseline report

Omitted sections: Reproduction (new feature, no bug); Flaky behavior (none documented)

## 1. Change-request summary
Add a centered, 70s-styled "Groovy" heading above the calculator (.uncle/docs/CHANGE_REQUEST.md). No calculator logic or background change.

## 2. Repository architecture
Vite + React 19 SPA. `index.html` mounts `#root` and loads `src/main.jsx`. `src/Calculator.jsx` (69 lines) renders the UI, `src/engine.js` is the arithmetic, `src/keymap.js` maps keys, `src/theme.css` (89 lines) holds all styles. Tests: vitest (`tests/*.test.js`), Playwright e2e (`tests/e2e/*.spec.js`, including `theme.spec.js`), plus `tests/mutations`.

## 3. Relevant code paths
- `src/Calculator.jsx:43-68` returns a single `div.calculator` containing `.display` and `.keypad`.
- `src/theme.css:1-8` defines palette vars (--orange, --gold, --green, --brown, --cream) and `--font` (Fredoka, Baloo 2, Comfortaa, Trebuchet MS).
- `src/theme.css:12-31` `body` is a flex row, centered, with an animated multi-color background.
- `src/theme.css:40-46` `.calculator` is a brown card, width min(92vw, 360px).

## 4. Current observable behavior
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B1 | Open app | Calculator centered on animated groovy background, no title | theme.css:12-31, Calculator.jsx:43 | Yes (background, centering) |
| B2 | Click keys / keyboard | Arithmetic works, display updates | tests/e2e/calculator.spec.js, keyboard.spec.js | Yes |
| B3 | Display text length grows | Font shrinks 2.6/2/1.6rem | Calculator.jsx:42 | Yes |

## 5. Existing invariants
| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I1 | Calculator logic unchanged | engine.js, keymap.js | tests/engine.test.js, keymap.test.js | High |
| I2 | Calculator card stays centered with theme styling | theme.css body/.calculator | tests/e2e/theme.spec.js | Medium (not read in detail) |
| I3 | Display exposes data-testid=display and keys data-key | Calculator.jsx:46-62 | e2e specs | High |

## 6. Interface contracts
No API or schema. DOM hooks: `[data-testid=display]`, `[data-key]`, `.calculator`.

## 7. Existing automated-test coverage
vitest unit tests for engine and keymap; Playwright e2e for calculator, keyboard and theme. Commands are independent only in that vitest and the build use no ports; e2e uses the Playwright webServer, so it runs alone.

## 9. Baseline test results
Commands come from package.json scripts. No pre-existing failures documented in the repository. The driver baseline is authoritative.

## 12. Likely change surface
`src/Calculator.jsx`, `src/theme.css`, `tests/e2e/theme.spec.js`.

## 13. Regression-sensitive components
Body flex layout: a second child beside `.calculator` would place it side by side. e2e specs that assume `.calculator` is the root child or measure its position.

## 14. Outside the change
engine.js, keymap.js, main.jsx, background CSS, button behavior.

## 15. Unknowns and assumptions
- Fredoka is not bundled (font stack falls back). Assumption: reuse `--font` rather than add a font download.
- theme.spec.js and the other e2e specs were not read in detail.
- CHANGE_REQUEST.md has no Seeded-from link or issue number.

## 16. Initial risk assessment
Low. Main risk is layout regression from adding a sibling in a flex row, and low contrast against the moving background.

## Exact build and test commands executed

```sh
npx vitest run
npm run build
npx playwright test
```

