# Change test report

## Command results

| Command | Status | Meaningful output | Requirements |
|---|---|---|---|
| npx vitest run | PASS | 18 passed | AC-3 |
| npx playwright test | PASS | 26 passed, incl. exact heading 'Groovy...' and T-10 series | AC-1, AC-2, AC-3 |
| full suite | DRIVER PENDING | Driver runs regression block | AC-3 |
| formatting/lint/typecheck | N/A | No tooling configured | None stated |
| build, integration, migration, rollback, performance, security | N/A | Static text change; build run by driver | None stated |
| warnings / pre-existing failures | PASS | None observed; npm ci needed as node_modules was absent | None stated |

## Coverage gaps

- Visual look not observed by a person

## Next action

Driver runs regression block.
