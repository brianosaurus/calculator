# Change Request

## Change Type
Feature (small text change)

## Summary
Add '...' (three periods) immediately after the word "Groovy" in the heading above the calculator, so it reads "Groovy...".

## Motivation
Requested by the operator.

## Observed Current Behavior
The h1 heading above the calculator reads "Groovy".

## Desired Behavior
The heading reads "Groovy..." with the ellipsis directly after the word, keeping the existing styling.

## Reproduction
Open the calculator page and look at the heading above the calculator.

## Constraints
Keep existing font, color and centering. Update existing tests that match the heading name "Groovy" so they still pass.

## Known Relevant Files
- src/Calculator.jsx (line 47, h1 className=title)
- tests/e2e/theme.spec.js (heading name 'Groovy' assertions)

## Out of Scope
Any other visual or behavior changes.

## Success Criteria
The heading displays "Groovy..." and the test suite passes.