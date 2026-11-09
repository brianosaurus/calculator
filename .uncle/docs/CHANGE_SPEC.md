# Change Spec
Omitted sections: Migration, Security, Performance, Prototype isolation (CSS-only change)

## 1. Change type
Feature (visual restyle).

## 2-4. Problem / current / desired
Current theme is earthy retro (baseline B-2, B-3). Desired: clearly 60s psychedelic look (vivid saturated accents, swirling gradients, groovy rounded type, bold contrasting buttons), legible.

## 5. Observable behavior
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| SB-1 | MODIFY | Page load | Earthy gradient, plain keys | Vivid saturated swirl backgrounds, neon/glow accents, bold contrasting button styling | Manual screenshot + AC-1 |
| SB-2 | PRESERVE | All calculator interaction | B-1 | Identical behavior | npm test, calculator/keyboard specs |
| SB-3 | PRESERVE | Heading render | B-3 | One line, no overflow | T-10b/c/d |
| SB-4 | ADD | Hover/focus on keys | none | Visible hover and focus-visible styling | Manual |

## 6. Invariants
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| SI-1 | EXISTING | I-1..I-6 from baseline hold | theme.css | theme.css | T-9, T-9b, T-9f, T-10b-d |
| SI-2 | NEW | Text/background contrast on keys and display >= 4.5:1 | .key, .display, .title | theme.css | Manual contrast check |
| SI-3 | EXISTING | Animation disabled under prefers-reduced-motion | body | theme.css | Inspection |

No RELAXED or REMOVED invariants.

## 7. Compatibility
No class-name, markup or test changes.

## 14. Non-goals
Logic changes, new features, dependencies, web fonts, test edits.

## 15. Assumptions
Existing theme tests stay unmodified and must pass; thus palette colors, Fredoka font stack and gold title remain, and new colors are additive.

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | UI has a clearly psychedelic 60s appearance: additional vivid saturated accent colors (e.g. magenta, cyan, purple) beyond the original palette, swirling gradient background, and bold contrasting key styling. | Screenshot review at default viewport; grep theme.css for new accent variables |
| AC-2 | All calculator functions behave as before; src/engine.js, src/keymap.js and src/Calculator.jsx are unchanged. | npm test; npx playwright test; git diff --stat |
| AC-3 | Heading stays on one line with no horizontal overflow at 320px and passes title style tests. | npx playwright test tests/e2e/theme.spec.js |
| AC-4 | Key labels, display text and heading remain legible (contrast >= 4.5:1 for key and display text). | Manual contrast check of computed colors |
| AC-5 | All existing unit and e2e tests pass unmodified, and the build succeeds with no new dependencies. | npm test; npm run build; npx playwright test; git diff package.json |

