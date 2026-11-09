# Baseline Report
Omitted sections: Reproduction (feature, not bug); Existing failures (none documented)

## 1. Change-request summary
See .uncle/docs/CHANGE_REQUEST.md: 60s psychedelic restyle; logic untouched; heading one line; tests keep passing.

## 2. Repository architecture
Vite + React 19 SPA. `index.html` -> `src/main.jsx` -> `src/Calculator.jsx` (72 lines). Styling is one file `src/theme.css` (113 lines). Logic in `src/engine.js`, `src/keymap.js`. Tests: vitest (`tests/engine.test.js`, `tests/keymap.test.js`), Playwright e2e (`tests/e2e/*.spec.js`, webServer `npm run dev` on 127.0.0.1:5173, reuseExistingServer).

## 3. Relevant code paths
- `src/theme.css`: `:root` vars (--orange #CC5500, --gold #E1AD01, --green #568203, --brown #3B2314, --cream #FFF1D0, --font Fredoka stack); `body` double gradient + `@keyframes groovy` animation (reduced-motion disabled); `.app`, `.title` (nowrap, clamp(1.5rem,9vw,2.5rem), gold, brown outline shadow); `.calculator` (brown bg); `.display` (cream bg); `.key` + `.key-digit/.key-op/.key-equals/.key-clear`.
- `src/Calculator.jsx`, `index.html`: markup/class names; no change needed.

## 4/5. Current behavior and invariants
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B-1 | Calculator operations/keyboard | Correct arithmetic, Error state | calculator.spec.js, keyboard.spec.js, engine/keymap tests | Yes |
| B-2 | Load page | Animated gradient body bg, Fredoka font stack, no external requests, no console errors | theme.spec.js T-9, T-9b, T-9f | Yes |
| B-3 | Load page | Heading 'Groovy Calculator!' one line, gold, brown shadow, 40-64px | theme.spec.js T-10b/c/d | Yes |

| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I-1 | Computed bg/color of .calculator,.display,.key collectively include all 5 palette hexes | theme.css | T-9 | High |
| I-2 | body font-family begins Fredoka and contains Baloo 2, Comfortaa, Trebuchet MS, sans-serif | --font | T-9 | High |
| I-3 | body background-image contains conic/radial-gradient; keyframe `groovy` 100% shifts each layer by whole tiles; animation changes position over time | body rule | T-9, T-9b, T-9f | High |
| I-4 | All buttons radius >= 12px | .key | T-9 | High |
| I-5 | h1 color #E1AD01, text-shadow contains #3B2314, same font as calculator, size 40-64px, no overflow at 320px | .title | T-10b/c | High |
| I-6 | No external network requests (no web fonts/CDN) | none loaded | T-9 | High |

## 6. Interface contracts
CSS class names and `data-testid`/`data-key` attributes used by tests; unchanged.

## 7. Test coverage
vitest unit (logic) and Playwright e2e (behavior + theme computed styles). Playwright e2e needs port 5173, so it is not grouped; no parallel groups.

## 9. Baseline test results
Commands derived from package.json scripts. No documented pre-existing failures. Driver baseline is authoritative.

## 12. Likely change surface
`src/theme.css` only.

## 13. Regression-sensitive components
T-9 palette/font/radii/gradient assertions, T-9f keyframe math, T-10b title color/size, T-10c/d layout and overflow.

## 14. Outside the change
`src/engine.js`, `src/keymap.js`, new features, new dependencies, test edits.

## 15. Unknowns and assumptions
- Existing theme tests already pin a retro palette; assume they must remain unmodified, so the psychedelic look is added on top (new accent colors, gradients, borders, glows) while the 5 palette colors stay as computed bg/color values.
- Playwright browsers assumed installed.

## 16. Risk
Low-medium: CSS-only, but theme tests are tightly coupled to computed styles; legibility of text on vivid backgrounds.

## Exact build and test commands executed

```sh
npm test
npm run build
npx playwright test
```

