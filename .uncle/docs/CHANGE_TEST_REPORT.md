# Change test report

## Command results

| Command | Status | Meaningful output | Requirements |
|---|---|---|---|
| baseline (npm test; npm run test:e2e) before edit | NOT RUN | node_modules absent in worktree; ran after npm ci. After text-only edit, T-10c failed (362 > 320), fixed via theme.css. | AC-3 |
| npm run test:e2e | PASS | 26 passed (heading lookups with new name, T-10/T-10b/T-10c/T-10d) | AC-1, AC-2, AC-3 |
| npm test | PASS | 18 passed | AC-3 |
| regression tests | PASS | covered by the two commands above | AC-3 |
| full test suite | DRIVER PENDING | driver runs it after this stage | AC-3 |
| formatting | N/A | no formatter configured | None stated |
| compiler or type checker | N/A | plain JS, none configured | None stated |
| linting | N/A | no linter configured | None stated |
| integration tests | PASS | e2e run above | AC-2 |
| frontend build | NOT RUN | vite build not run; dev server used by e2e | None stated |
| migration tests | N/A | no migration | None stated |
| rollback test | N/A | git revert of edits | None stated |
| performance checks | N/A | text change | None stated |
| security checks | N/A | text change | None stated |
| newly introduced warnings | N/A | none observed in tail output | None stated |
| pre-existing failures | N/A | none known | None stated |

## Coverage gaps

- No human visual check of wrapped heading at narrow widths
- Heading wrap below ~360px asserted only by T-10c/T-10d overflow checks

## Next action

Driver runs full regression; reviewer inspects theme.css deviation.
