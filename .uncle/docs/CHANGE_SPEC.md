# Change Spec

Omitted sections: Performance, Security, Migration, Prototype isolation (none apply)

## 1. Change type
Text change.

## 2. Problem statement
Heading should read 'Groovy Calculator!'.

## 3. Current behavior
B-1: 'Groovy...'.

## 4. Desired behavior
h1 text exactly 'Groovy Calculator!'; styling and placement unchanged.

## 5. Observable behavior table
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| S-1 | MODIFY | Load app | 'Groovy...' | 'Groovy Calculator!' | e2e heading lookup by exact name |
| S-2 | PRESERVE | Load app | Heading centered, styled (B-2) | Unchanged | T-10 e2e |

## 6. Invariant table
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| V-1 | EXISTING | h1 keeps class 'title' and styling | Calculator.jsx | className | e2e T-10 |

No RELAXED or REMOVED invariants.

## 7. Compatibility
None beyond updated e2e lookups.

## 12. Rollback
Revert the text edits.

## 14. Non-goals
Styling, layout, other behavior.

## 15. Assumptions
None unresolved.

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | The h1 text is exactly 'Groovy Calculator!'. | Playwright getByRole heading level 1 name 'Groovy Calculator!' exact |
| AC-2 | e2e tests that look up the heading use the new text and pass. | npm run test:e2e |
| AC-3 | No styling, centering or other behavior changes. | npm test and npm run test:e2e pass; diff limited to heading text |

