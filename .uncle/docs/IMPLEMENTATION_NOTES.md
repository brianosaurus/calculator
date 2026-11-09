# Implementation notes

## Step 1

### Files changed

- `src/theme.css` — Psychedelic restyle: --magenta/--cyan/--violet/--lime vars; retuned two-layer body gradients; rainbow conic ring on calculator via border-box background layers; neon glows; gradient keys with thick borders; hover/focus-visible/active/disabled states; reduced-motion transition off; Step 1 (D-1..D-7); Body keeps exactly 2 layers at 200% 200% and unchanged groovy keyframe; key/calculator/display computed colors and gold title preserved; no url()/@import; states change only box-shadow/outline/filter/background-image; orange and green keys use #000 labels (4.86:1, 4.58:1 by hand calculation) because cream was 4.2:1/4.06:1
- `.uncle/launch.json` — Launch metadata (dev server); Driver requirement; None

### Deviations

- `.uncle/launch.json`: Driver-required launch metadata, not product code.
- `theme.spec.js`: Listed in frozen scope but not modified; the real file is tests/e2e/theme.spec.js and the spec forbids test edits.

### Unresolved concerns

- Contrast was computed by hand on flat colors and gradient end stops, not by an automated check; hover saturate filter not measured.
- Visual psychedelic appearance (AC-1 screenshot review) not observed by a person; no human sign-off claimed.

## Driver-recorded scope deviations

### Deviations

- `.gitignore`: Changed outside the plan's change-impact table. Recorded by the driver because this run was unattended and the implementation did not record it; the implementation notes may explain it in prose. Review it in the diff.

## Acceptance delivery

| ID | Status | Changed code | Observed targeted verification |
|---|---|---|---|
| AC-1 | IMPLEMENTED | src/theme.css: four accent vars each used in gradients/box-shadows, swirl body gradients, bold bordered gradient keys | grep of theme.css confirms vars defined and referenced; T-9 and body-gradient tests pass in playwright (27 passed). Screenshot not reviewed. |
| AC-2 | IMPLEMENTED | No change to engine.js, keymap.js, Calculator.jsx | git diff --stat on those files empty; npm test 18 passed; npx playwright test 27 passed |
| AC-3 | IMPLEMENTED | src/theme.css: .title nowrap kept, borders border-box | npx playwright test: T-10b/c/d/e pass (320px no overflow) |
| AC-4 | IMPLEMENTED | src/theme.css: orange/green key labels #000; cream/gold keys keep brown labels; display cream with light gradient | Hand-calculated ratios: black on #CC5500 ~4.86, on #568203 ~4.58, brown on cream/gold >6; no automated contrast test run |
| AC-5 | IMPLEMENTED | No test or package changes | npm test 18 passed; npm run build succeeded; npx playwright test 27 passed; git diff package.json package-lock.json empty |
