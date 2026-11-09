# Add 'Groovy' heading above the calculator

## Change Type
Feature (visual enhancement)

## Summary
Display the word "Groovy" above the calculator, styled with a font and color that match the groovy 70s look of the page.

## Motivation
The page background was recently made groovy and 70s themed. The operator wants a matching title above the calculator to reinforce that look.

## Observed Current Behavior
The calculator is shown with the groovy 70s animated background and no title above it.

## Desired Behavior
The word "Groovy" appears above the calculator. It uses a font and color(s) in keeping with a 70s style (for example a rounded, bold, retro display typeface and a warm 70s palette such as orange, gold, or brown that fits the existing background). It is readable against the background and centered above the calculator.

## Reproduction
None. This is a new addition. Open the app and observe that no title appears above the calculator.

## Constraints
- Font and color must match the existing groovy 70s look of the page.
- The text must be legible against the moving background.
- Existing calculator behavior and layout must not break.

## Known Relevant Files
index.html and the files under src/ (the exact stylesheet and component files are to be determined during planning).

## Out of Scope
- Changes to calculator logic or buttons.
- Changes to the background design.

## Success Criteria
- The word "Groovy" is visible above the calculator.
- Its font and color visibly fit the 70s groovy theme and are readable.
- The existing tests still pass and the calculator works as before.