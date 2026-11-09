# Change Request: 60s psychedelic styling

## Change Type
Feature (visual restyle)

## Summary
Restyle the calculator with a 1960s psychedelic look.

## Motivation
The operator asked for the project to have 60s psychedelic styling.

## Observed Current Behavior
The calculator uses its current theme, defined mainly in src/theme.css.

## Desired Behavior
The calculator looks 60s psychedelic: for example vivid saturated colors, swirling or gradient backgrounds, groovy rounded or retro display fonts, and bold contrasting button colors. Exact design choices are left to the implementer.

## Reproduction
None

## Constraints
Calculator behavior must not change. The heading must stay on one line. Existing unit and e2e tests must keep passing. Buttons and display must stay readable.

## Known Relevant Files
- src/theme.css
- src/Calculator.jsx
- index.html

## Out of Scope
Changes to calculator logic (src/engine.js, src/keymap.js), new features, new dependencies.

## Success Criteria
- The UI has a clearly 60s psychedelic appearance.
- All calculator functions behave as before.
- Text and buttons remain legible.
- Existing tests pass.