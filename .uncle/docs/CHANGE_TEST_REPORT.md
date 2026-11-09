# Change test report

## Command results

| Command | Status | Meaningful output | Requirements |
|---|---|---|---|
| baseline: npx vitest run | PASS | 2 files, 18 tests passed | AC-4 |
| npx playwright test tests/e2e/theme.spec.js | PASS | T-10, T-10b, T-10c, T-10d passed (part of 26 passed run) | AC-1, AC-2, AC-3, AC-4 |
| npx playwright test | PASS | 26 passed | AC-4 |
| full suite | DRIVER PENDING | Driver runs the regression block after this stage | AC-4 |
| npm run build | PASS | built in 165ms | AC-4 |
| formatting / lint / type check | N/A | No such tooling configured | None stated |
| integration, migration, rollback, performance, security | N/A | Static UI change; none applicable | None stated |
| new warnings / pre-existing failures | PASS | None observed; npm ci was needed because node_modules was absent | None stated |

## Coverage gaps

- Subjective legibility over the animated background (AC-3 manual check) not observed by a person.
- Key contrast 3.85:1/4.08:1 (C, =) pre-existing, untested here.

## Next action

Driver runs full regression; human visual check of title legibility if desired.
