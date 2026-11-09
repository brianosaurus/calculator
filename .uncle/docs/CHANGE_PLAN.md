# Change Plan

Omitted sections: data-flow, state, API, schema, concurrency, migration, feature flag, observability (text-only change)

Issue 0

## 1. Selected approach
Edit the string literal in Calculator.jsx and update e2e name lookups.

## 2. Alternatives
None meaningful.

## 3. Why preferred
Minimal; matches request.

## 4. Components to modify
See table.

## 5. Not to modify
CSS, other source, other tests.

## Change-impact table

| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| src/Calculator.jsx:47 | Text to 'Groovy Calculator!' | AC-1 | Low | e2e T-10 |
| tests/e2e/theme.spec.js | Lines 107, 135, 149 lookups to new name; title at 102 reworded optionally | AC-2 | Low | npm run test:e2e |

## Traceability

| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 | S-1 | V-1 | Calculator.jsx | theme.spec.js | View heading |
| AC-2 | S-1 | V-1 | theme.spec.js | npm run test:e2e | None |
| AC-3 | S-2 | V-1 | none | npm test, e2e | None |

The e2e lookups are expected to fail before the change and pass after.

## 16-18. Test strategy
Run baseline commands (npm test; npm run test:e2e). Manual check: view heading in browser.

## Implementation sequence

1. Update heading literal at line 47. Owns: `src/Calculator.jsx`
2. Update e2e heading lookups at lines 107, 135, 149. Owns: `tests/e2e/theme.spec.js`

Steps are independent.

## 14. Rollback plan
Revert both edits via git.

## 21. Scope cuts
None.

## 22. Risks
Low; the Issue number is unknown in the request, so the identity line is 0 only if absent.
