# Change spec

Omitted sections: Migration, Performance, Security, Prototype isolation (not applicable to a static heading)

## 1. Change type
Feature (visual enhancement).

## 2. Problem statement
The groovy 70s page has no title; the operator wants a matching one.

## 3. Current behavior
See baseline B1.

## 4. Desired behavior
The word "Groovy" appears centered above the calculator, in a bold rounded retro font and warm 70s colors, legible on the moving background.

## 5. Observable behavior table
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| S1 | ADD | Open app | No title | Visible h1 "Groovy" above the calculator, horizontally centered over it | AC-1, AC-2 |
| S2 | ADD | View title | n/a | Font from theme --font, bold; warm palette color with a dark outline/shadow for legibility | AC-3 |
| S3 | PRESERVE | Use calculator (B2, B3) | Works | Unchanged | AC-4 |
| S4 | PRESERVE | Open app (B1) | Animated background, centered calculator | Unchanged background; calculator still centered as a group with the title | AC-4 |

## 6. Invariant table
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| V1 | EXISTING | Calculator logic unchanged (I1) | engine, keymap | existing tests | AC-4 |
| V2 | EXISTING | DOM hooks display/data-key preserved (I3) | Calculator.jsx | e2e | AC-4 |
| V3 | NEW | Title text is exactly "Groovy" and sits above `.calculator` | UI | theme.spec.js | AC-1, AC-2 |

No RELAXED or REMOVED invariants.

## 7. Compatibility
No API change. Narrow viewports (min width 320px) must not overflow horizontally.

## 8. Error behavior
If the preferred font is unavailable the existing fallback stack applies.

## 12. Rollback
Revert the heading markup and its CSS.

## 14. Non-goals
Calculator logic, buttons, background design.

## 15. Assumptions
A text-shadow or outline in --brown gives sufficient contrast; no new font asset is added.

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | A visible heading with the text "Groovy" is rendered in the page. | Playwright test asserts getByRole('heading', {name:'Groovy'}) is visible. |
| AC-2 | The heading is above the calculator and horizontally centered over it. | Playwright test compares bounding boxes: heading bottom <= calculator top and center x within 2px of calculator center x. |
| AC-3 | The heading uses the theme font stack, bold weight, and a warm palette color (gold/cream/orange) with a dark text-shadow or outline for legibility. | Playwright test checks computed font-weight >= 600, a non-empty text-shadow, and that color is not brown; manual visual check against the animated background. |
| AC-4 | Existing calculator behavior and tests are unaffected, and the page has no horizontal overflow at 320px width. | npx vitest run, npx playwright test, npm run build pass; a 320px viewport check asserts scrollWidth <= clientWidth. |

