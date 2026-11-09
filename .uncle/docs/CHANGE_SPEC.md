# Change Spec

Omitted sections: Performance, Security, Migration, Prototype isolation (trivial text change)

## 1. Change type
Feature (small text change).

## 2-4. Problem / current / desired
h1 reads "Groovy" (B-1); must read "Groovy..." with the three periods directly after the word, no space.

## 5. Observable behavior
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| S-1 | MODIFY | Load page | h1 "Groovy" | h1 "Groovy..." | e2e heading name check |
| S-2 | PRESERVE | Load page | h1 font, color, centering (B-2) | Unchanged | theme.spec.js T-10 |
| S-3 | PRESERVE | Calculator use | Arithmetic/keyboard | Unchanged | npm test, e2e |

## 6. Invariants
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| I-1 | EXISTING | h1 visible, centered, styled | heading | className title | T-10 |
| I-2 | EXISTING | Calculator behavior unchanged | app | engine/keymap | suites |
No RELAXED or REMOVED invariants.

## 7. Compatibility
None beyond tests referencing the heading name.

## 8. Error behavior
None.

## 12. Rollback
Revert the text and test edits.

## 14. Non-goals
Any other visual or behavior change.

## 15. Assumptions
Use literal ASCII "..." (three periods), not the Unicode ellipsis character.

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | The h1 above the calculator has text exactly "Groovy..." (three ASCII periods, no space). | Playwright getByRole('heading',{level:1,name:'Groovy...'}) visible |
| AC-2 | Heading font, color, and centering are unchanged; no other files than Calculator.jsx and theme.spec.js change. | theme.spec.js T-10 passes; git diff review |
| AC-3 | Existing tests referencing heading name 'Groovy' are updated to 'Groovy...' and the full suite passes. | npm test; npx playwright test |

