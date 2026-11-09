# Groovy Animated 70s Background

## Change Type
Enhancement (visual theme)

## Summary
Make the calculator page background really super 70s groovy and moving.

## Motivation
The operator wants a bolder, animated 1970s look for the page background.

## Observed Current Behavior
The body background is defined in src/theme.css (around lines 21-24) as a static fixed background using the existing brown, cream, gold, green and orange palette.

## Desired Behavior
The page background is animated in a distinctly 70s groovy style, for example flowing psychedelic waves, concentric rainbow or retro stripes, and warm earthy colors (orange, gold, brown, green, cream), in continuous smooth motion. The calculator stays fully readable and usable on top of it.

## Reproduction
Open the app in a browser and look at the page background: it is static.

## Constraints
Pure CSS preferred, no new dependencies. Respect prefers-reduced-motion by disabling or greatly reducing the animation. Keep calculator keys and display contrast and layout unchanged. Existing tests must keep passing; tests/e2e/theme.spec.js checks the body backgroundImage and may need updating to match.

## Known Relevant Files
- src/theme.css
- tests/e2e/theme.spec.js
- index.html

## Out of Scope
Calculator logic, key layout, and button colors.

## Success Criteria
- Background visibly animates continuously with a 70s groovy look.
- Calculator remains readable and all existing tests pass (theme test updated if needed).
- Animation is disabled or reduced under prefers-reduced-motion.