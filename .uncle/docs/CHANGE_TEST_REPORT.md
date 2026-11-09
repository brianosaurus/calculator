# Change test report

## Command results

| Command | Status | Meaningful output | Requirements |
|---|---|---|---|
| baseline (npm test; npx playwright test) before edit | NOT RUN | node_modules absent; the first post-edit run failed T-9, T-9d, T-10b because of a splice bug in my edit, fixed before the final run | AC-5 |
| npx playwright test | PASS | 27 passed (includes T-9, T-9b, T-9d, T-9e, T-9f, T-10b-e) | AC-1, AC-2, AC-3, AC-5 |
| npm test | PASS | 18 passed | AC-2, AC-5 |
| regression tests | PASS | covered by the two commands above | AC-2 |
| full test suite | DRIVER PENDING | driver runs it after this stage | AC-5 |
| formatting | N/A | no formatter configured | None stated |
| compiler or type checker | N/A | plain JS/CSS | None stated |
| linting | N/A | no linter configured | None stated |
| integration tests | PASS | e2e run above | AC-2 |
| npm run build | PASS | vite build succeeded | AC-5 |
| migration tests | N/A | no migration | None stated |
| rollback test | N/A | git checkout src/theme.css | None stated |
| performance checks | N/A | CSS only | None stated |
| security checks | N/A | grep for url(/@import in theme.css returns 0 | None stated |
| newly introduced warnings | N/A | none observed | None stated |
| pre-existing failures | N/A | none known | None stated |

## Coverage gaps

- No automated contrast test; ratios hand-calculated
- Hover/focus-visible visuals and overall psychedelic appearance not observed by a person
- Untested: reduced-motion transition rule

## Next action

Driver runs the full regression block; a person may review a screenshot for AC-1 if desired.
