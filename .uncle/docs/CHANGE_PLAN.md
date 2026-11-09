# Change Plan

Omitted sections: Schema, Concurrency, Migration, Feature flag, Observability, Data/state flow (text-only change)

## 1-3. Approach
Edit the literal h1 text and update test assertions. Alternative: CSS ::after pseudo-element; rejected because the accessible name would not include the periods and it is needless indirection. Literal text is simplest and testable.

## 4. Components to modify
See change-impact table.

## 5. Not to modify
CSS, engine, keymap, other specs, config.

## 10. Compatibility
No API change. Decision D-1: use ASCII "...".

## 12. Error and recovery
None.

## 14. Rollback plan
Revert the commit/edits to the two files.

## 16-17. Test strategy
Update theme.spec.js name assertions to 'Groovy...'. Regression: npm test, npx playwright test (baseline commands). No bug-fix regression test applies.

## 18. Manual verification
Load page; confirm heading shows "Groovy..." with same look.

## Restrictions
| ID | Source | Location | Reqs | Property | Mechanism | Phase |
|---|---|---|---|---|---|---|
| R-1 | USER | CHANGE_REQUEST Constraints | AC-2 | Keep font/color/centering | Change only text node | CODING |
| R-2 | USER | CHANGE_REQUEST Constraints | AC-3 | Update tests matching 'Groovy' | Edit theme.spec.js lines 107,135,149 | CODING |

## Change-impact table
| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| src/Calculator.jsx:47 | Text "Groovy" -> "Groovy..." | AC-1 | Low | theme.spec.js |
| tests/e2e/theme.spec.js | Heading name 'Groovy' -> 'Groovy...' (and title at 102 optionally) | AC-3 | Low | itself |

## Traceability
| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 | S-1 | I-1 | Calculator.jsx | theme.spec.js | View heading |
| AC-2 | S-2 | I-1 | Calculator.jsx | T-10 | View look |
| AC-3 | S-3 | I-2 | theme.spec.js | full suites | None |

## Implementation sequence
1. Change h1 text at src/Calculator.jsx:47 to "Groovy...". Owns: `src/Calculator.jsx`
2. Update heading-name assertions in tests/e2e/theme.spec.js to 'Groovy...'. Owns: `tests/e2e/theme.spec.js`

Steps are independent (no shared files); step 2 expectations match step 1's text.

## Scope cuts
None needed.

## Risks
Low. Live e2e run requires Playwright browsers installed (LIVE_VERIFICATION only; does not block coding).
