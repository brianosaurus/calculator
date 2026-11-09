# Change Request: Heading text

## Change Type
Text change

## Summary
Change the calculator heading from 'Groovy...' to 'Groovy Calculator!'.

## Motivation
Operator request.

## Observed Current Behavior
The h1 with class 'title' in src/Calculator.jsx shows 'Groovy...'.

## Desired Behavior
The h1 shows exactly 'Groovy Calculator!'. Styling and placement stay unchanged.

## Reproduction
Open the app; the heading above the calculator reads 'Groovy...'.

## Constraints
Change the text only; keep the styling and centering as they are.

## Known Relevant Files
- src/Calculator.jsx (line 47)
- tests/e2e/theme.spec.js (lines 102, 107, 135 and 149 look up the heading by the name 'Groovy...')

## Out of Scope
Any styling, layout or other behavior changes.

## Success Criteria
- The h1 text is exactly 'Groovy Calculator!'.
- The e2e tests that look up the heading are updated to the new text and pass.
- No other behavior changes.